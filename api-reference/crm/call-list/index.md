# Список обзвона: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Список обзвона — это дело CRM, из которого можно позвонить нескольким клиентам подряд. Сотрудник работает с одним делом, в котором собраны выбранные контакты или компании. Результаты обзвона автоматически сохранятся в карточках клиентов:

- в прикрепленном деле звонка и комментарии к нему
- в заполненной CRM-форме и полях карточки
- в созданной из обзвона сделке или счете

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Обзвон в Битрикс24](https://helpdesk.bitrix24.ru/open/24945678/)

## Как начать работу

1. Получите идентификаторы участников обзвона — контактов или компаний — методом [crm.item.list](../universal/crm-item-list.md)

2. Создайте обзвон методом [crm.calllist.add](./crm-calllist-add.md): передайте тип объекта в параметре `ENTITY_TYPE` и массив идентификаторов в параметре `ENTITIES`. При необходимости прикрепите CRM-форму параметром `WEBFORM_ID`

3. Проверьте состав обзвона методом [crm.calllist.items.get](./crm-calllist-items-get.md), а параметры самого обзвона — методом [crm.calllist.get](./crm-calllist-get.md)

4. Дальше сотрудник обзванивает участников в интерфейсе Битрикс24. Статусы участников по ходу обзвона возвращает тот же метод [crm.calllist.items.get](./crm-calllist-items-get.md), список возможных статусов — метод [crm.calllist.statuslist](./crm-calllist-statuslist.md)

5. Чтобы добавить или убрать участников уже созданного обзвона, используйте метод [crm.calllist.update](./crm-calllist-update.md)

## Связь с другими объектами

**Контакт**. Для обзвона нескольких контактов укажите массив из `ID` контактов в методе [создания](./crm-calllist-add.md) или [изменения](./crm-calllist-update.md) обзвона. Получить `ID` контактов можно методом [crm.item.list](../universal/crm-item-list.md) с параметром `entityTypeId = 3`.

**Компания**. Для обзвона нескольких компаний укажите массив из `ID` компаний в методе [создания](./crm-calllist-add.md) или [изменения](./crm-calllist-update.md) обзвона. Получить `ID` компаний можно методом [crm.item.list](../universal/crm-item-list.md) с параметром `entityTypeId = 4`.

**CRM-форма**. Во время звонка сотрудник может заполнять информацию о клиенте в прикрепленной к обзвону CRM-форме. После завершения звонка форма будет доступна в карточке клиента, информация из формы будет сохранена в полях карточки. Чтобы прикрепить форму к обзвону, укажите ее `ID` в методе [создания](./crm-calllist-add.md) или [изменения](./crm-calllist-update.md) обзвона. `ID` формы можно найти в списке форм Битрикс24 `https://your-domain.ru/crm/webform/`.

**Справочник**. Статус звонка в карточке обзвона — это элемент [справочника](../status/index.md). Список статусов, доступных участникам обзвона, возвращает метод [crm.calllist.statuslist](./crm-calllist-statuslist.md). Чтобы изменить сами статусы, используйте методы справочников [crm.status.*](../status/index.md) с параметром `ENTITY_ID = CALL_LIST`.

**Пользователь**. Обзвон привязан к создателю по числовому идентификатору в поле `CREATED_BY_ID`. Поле возвращают методы [crm.calllist.get](./crm-calllist-get.md) и [crm.calllist.list](./crm-calllist-list.md). Получить данные пользователя по идентификатору можно методом [user.get](../../user/user-get.md).

## Как удалить список обзвона

Среди методов списка обзвона нет метода удаления. Удалить список обзвона можно через удаление дела методом [crm.activity.delete](../timeline/activities/activity-base/crm-activity-delete.md).

1. Используйте метод [crm.activity.list](../timeline/activities/activity-base/crm-activity-list.md) с фильтром по названию дела `SUBJECT`. В значении поля укажите `Обзвон #ID`. На место `ID` подставьте идентификатор обзвона, полученный методами [crm.calllist.add](./crm-calllist-add.md) или [crm.calllist.list](./crm-calllist-list.md)

2. Передайте `ID` дела из результата в метод удаления [crm.activity.delete](../timeline/activities/activity-base/crm-activity-delete.md)

## Права доступа

{% list tabs %}

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each activity item returned in result[]
    type ActivityItem = {
      ID: string,
    }

    try {
      // crm.activity.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const listResponse = await $b24.actions.v2.call.make<ActivityItem[]>({
        method: 'crm.activity.list',
        params: {
          filter: {
            SUBJECT: 'Call list #13',
          },
          select: ['ID'],
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!listResponse.isSuccess) {
        console.error(listResponse.getErrorMessages().join('; '))
      } else {
        const activities = listResponse.getData()!.result
        if (activities.length === 0) {
          console.info('No activities named "Call list #13" found.')
        } else {
          const activityId = activities[0].ID

          const deleteResponse = await $b24.actions.v2.call.make<boolean>({
            method: 'crm.activity.delete',
            params: {
              id: activityId,
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!deleteResponse.isSuccess) {
            console.error(deleteResponse.getErrorMessages().join('; '))
          } else {
            const deleted = deleteResponse.getData()!.result
            console.info('Activity ID', activityId, 'deleted:', deleted)
          }
        }
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function findAndDeleteActivity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.activity.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const listResponse = await $b24.actions.v2.call.make({
            method: 'crm.activity.list',
            params: {
              filter: {
                SUBJECT: 'Call list #13',
              },
              select: ['ID'],
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!listResponse.isSuccess) {
            console.error(listResponse.getErrorMessages().join('; '))
            return
          }

          const activities = listResponse.getData().result
          if (activities.length === 0) {
            console.info('No activities named "Call list #13" found.')
            return
          }

          const activityId = activities[0].ID

          const deleteResponse = await $b24.actions.v2.call.make({
            method: 'crm.activity.delete',
            params: {
              id: activityId,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!deleteResponse.isSuccess) {
            console.error(deleteResponse.getErrorMessages().join('; '))
            return
          }

          const deleted = deleteResponse.getData().result
          console.info('Activity ID', activityId, 'deleted:', deleted)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', findAndDeleteActivity)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.list(
            filter={
                "SUBJECT": "Обзвон #13",
            },
            select=[
                "ID",
            ],
        ).response
        result = bitrix_response.result

        if not result:
            print("Дело с названием 'Обзвон #13' не найдено.")
        else:
            activity_id = int(result[0]["ID"])
            delete_response = client.crm.activity.delete(
                bitrix_id=activity_id,
            ).response
            delete_result = delete_response.result
            print(delete_result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.list',
                [
                    'filter' => [
                        'SUBJECT' => 'Обзвон #13',
                    ],
                    'select' => ['ID']
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            return;
        }
    
        $deals = $result->data();
    
        // Если дел нет, выходим
        if (count($deals) === 0) {
            echo "Дел с названием 'Обзвон #13' не найдено.";
            return;
        }
    
        // Берем ID первого дела
        $dealId = $deals[0]['ID'];
    
        // Вызываем метод удаления
        $deleteResponse = $b24Service
            ->core
            ->call(
                'crm.activity.delete',
                [
                    'id' => $dealId,
                ]
            );
    
        $deleteResult = $deleteResponse
            ->getResponseData()
            ->getResult();
    
        if ($deleteResult->error()) {
            error_log("Ошибка при удалении дела ID " . $dealId . ": " . $deleteResult->error());
        } else {
            echo "Дело ID " . $dealId . " успешно удалено.";
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "crm.activity.list",
        {
            filter: {
                "SUBJECT": "Обзвон #13",
            },
            select: ["ID"]
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            let deals = result.data();

            // Если дел нет, выходим
            if (deals.length === 0) {
                console.log("Дел с названием 'Обзвон #13' не найдено.");
                return;
            }

            // Берем ID первого дела
            let dealId = deals[0].ID;

            // Вызываем метод удаления
            BX24.callMethod(
                'crm.activity.delete',
                {
                    id: dealId,
                },
                function(deleteResult) {
                    if (deleteResult.error()) {
                        console.error("Ошибка при удалении дела ID " + dealId + ": " + deleteResult.error());
                    } else {
                        console.log("Дело ID " + dealId + " успешно удалено.");
                    }
                }
            );
        }
    );
    ```

- PHP CRest

    ```php
    <?php
    require_once('crest.php');

    // 1. Получаем список дел по названию
    $result = CRest::call(
        'crm.deal.list',
        [
            'filter' => [
                'TITLE' => 'Обзвон #13'
            ],
            'select' => ['ID']
        ]
    );

    if ($result['error']) {
        echo 'Ошибка: ' . $result['error_description'];
        exit;
    }

    $deals = $result['result'];

    // Если дел нет, выходим
    if (empty($deals)) {
        echo "Дел с названием 'Обзвон #13' не найдено.\n";
        exit;
    }

    // Берем ID первого дела
    $dealId = $deals[0]['ID'];

    // 2. Удаляем дело по ID
    $result = CRest::call(
        'crm.deal.delete',
        [
            'id' => $dealId
        ]
    );

    if ($result['error']) {
        echo "Ошибка при удалении дела ID $dealId: " . $result['error_description'] . "\n";
    } else {
        echo "Дело ID $dealId успешно удалено.\n";
    }
    ```

{% endlist %}
Права зависят от операции:

- создавать и изменять обзвон, а также получать его участников может пользователь с правом на чтение указанных контактов или компаний: недоступные ему объекты в обзвон не попадут, а метод [crm.calllist.items.get](./crm-calllist-items-get.md) вернет только доступные
- получать параметры обзвона и список обзвонов может любой пользователь

## Обзор методов {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.calllist.add](./crm-calllist-add.md) | Создает новый список обзвона ||
|| [crm.calllist.update](./crm-calllist-update.md) | Обновляет состав списка обзвона ||
|| [crm.calllist.get](./crm-calllist-get.md) | Возвращает информацию о списке обзвона ||
|| [crm.calllist.list](./crm-calllist-list.md) | Возвращает список всех обзвонов ||
|| [crm.calllist.items.get](./crm-calllist-items-get.md) | Возвращает участников списка обзвона ||
|| [crm.calllist.statuslist](./crm-calllist-statuslist.md) | Возвращает список статусов участников обзвона ||
|#
