# Список обзвона: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Список обзвона — набор контактов или компаний, которым сотрудник звонит по очереди. Например, приглашает на вебинар всех клиентов из одного города.

В CRM обзвон виден как дело — запланированное действие, как звонок, встреча или письмо. Из этого дела сотрудник и звонит. Результаты обзвона автоматически сохраняются в карточках клиентов:

- в прикрепленном деле звонка и комментарии к нему
- в заполненной CRM-форме и полях карточки
- в созданной из обзвона сделке или счете

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Обзвон в Битрикс24](https://helpdesk.bitrix24.ru/open/24945678/)

## Как начать работу

1. Получите идентификаторы участников обзвона — контактов или компаний — методом [crm.item.list](../universal/crm-item-list.md)

2. Создайте обзвон методом [crm.calllist.add](./crm-calllist-add.md): передайте тип объекта в параметре `ENTITY_TYPE` и массив идентификаторов в параметре `ENTITIES`. Чтобы сотрудник заполнял данные клиента во время звонка, прикрепите CRM-форму параметром `WEBFORM_ID`

3. Проверьте состав обзвона методом [crm.calllist.items.get](./crm-calllist-items-get.md), а параметры самого обзвона — методом [crm.calllist.get](./crm-calllist-get.md)

4. Дальше сотрудник обзванивает участников в интерфейсе Битрикс24. Следить за ходом обзвона можно тем же методом [crm.calllist.items.get](./crm-calllist-items-get.md): он вернет статус звонка по каждому участнику. Участник в ответе выглядит так:

    ```json
    {
        "ID": 9,
        "STATUS": "IN_WORK",
        "ENTITY_TYPE": 3
    }
    ```

    `ID` — идентификатор контакта или компании. `ENTITY_TYPE` — тип участника: `3` — контакт, `4` — компания. `STATUS` — код статуса звонка. Все коды вернет метод [crm.calllist.statuslist](./crm-calllist-statuslist.md)

5. Измените состав участников методом [crm.calllist.update](./crm-calllist-update.md). Метод заменяет список целиком: передайте всех, кто должен остаться, вместе с новыми. Если к обзвону прикреплена CRM-форма, передайте и `WEBFORM_ID` — без него метод открепит форму

## Связь с другими объектами

**Контакт и компания.** Участников обзвона задает массив `ID` контактов или компаний в методе [создания](./crm-calllist-add.md) или [изменения](./crm-calllist-update.md) обзвона. Получить `ID` можно методом [crm.item.list](../universal/crm-item-list.md): для контактов — с параметром `entityTypeId = 3`, для компаний — `entityTypeId = 4`.

**CRM-форма.** К обзвону можно прикрепить CRM-форму: во время звонка сотрудник может заполнить в ней данные клиента. После звонка форма появится в карточке клиента, и данные из нее сохранятся в полях карточки. Чтобы прикрепить форму, укажите ее `ID` в методе [создания](./crm-calllist-add.md) или [изменения](./crm-calllist-update.md) обзвона. `ID` формы вернет метод [crm.form.list](../form/crm-form-list.md), его также видно в списке форм Битрикс24 `https://your-domain.ru/crm/webform/`.

**Справочник.** Статусы звонка, например `IN_WORK`, хранятся в [справочнике](../status/index.md) с `ENTITY_ID = CALL_LIST` — с ним работают методы [crm.status.*](../status/index.md). Все статусы вернет метод [crm.calllist.statuslist](./crm-calllist-statuslist.md), изменить статус можно методом [crm.status.update](../status/crm-status-update.md) по `ID`.

**Пользователь.** Поле `CREATED_BY_ID` в ответе методов [crm.calllist.get](./crm-calllist-get.md) и [crm.calllist.list](./crm-calllist-list.md) содержит числовой идентификатор пользователя, который создал обзвон. Данные этого пользователя вернет метод [user.get](../../user/user-get.md).

## Как убрать обзвон из таймлайна

Метода удаления у списка обзвона нет. Убрать обзвон из таймлайна можно, если удалить его дело методом [crm.activity.delete](../timeline/activities/activity-base/crm-activity-delete.md). Сам обзвон при этом останется: методы [crm.calllist.get](./crm-calllist-get.md), [crm.calllist.list](./crm-calllist-list.md) и [crm.calllist.items.get](./crm-calllist-items-get.md) продолжат его возвращать. Ответственный за дело после удаления дела потеряет доступ к обзвону, если он не создатель обзвона и не администратор.

1. Найдите дело обзвона методом [crm.activity.list](../timeline/activities/activity-base/crm-activity-list.md) с фильтром `PROVIDER_ID` = `CALL_LIST` и `ASSOCIATED_ENTITY_ID` = идентификатор обзвона. Идентификатор обзвона возвращают методы [crm.calllist.add](./crm-calllist-add.md) и [crm.calllist.list](./crm-calllist-list.md)

2. Передайте `ID` дела из результата в метод удаления [crm.activity.delete](../timeline/activities/activity-base/crm-activity-delete.md)

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
            PROVIDER_ID: 'CALL_LIST',
            ASSOCIATED_ENTITY_ID: 13,
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
          console.info('No activity found for call list 13.')
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
                PROVIDER_ID: 'CALL_LIST',
                ASSOCIATED_ENTITY_ID: 13,
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
            console.info('No activity found for call list 13.')
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
                "PROVIDER_ID": "CALL_LIST",
                "ASSOCIATED_ENTITY_ID": 13,
            },
            select=[
                "ID",
            ],
        ).response
        result = bitrix_response.result

        if not result:
            print("Дело обзвона 13 не найдено.")
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
                        'PROVIDER_ID' => 'CALL_LIST',
                        'ASSOCIATED_ENTITY_ID' => 13,
                    ],
                    'select' => ['ID']
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        $deals = $result;

        // Если дел нет, выходим
        if (count($deals) === 0) {
            echo "Дело обзвона 13 не найдено.";
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

        echo "Дело ID " . $dealId . " успешно удалено.";
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "crm.activity.list",
        {
            filter: {
                "PROVIDER_ID": "CALL_LIST",
                "ASSOCIATED_ENTITY_ID": 13,
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
                console.log("Дело обзвона 13 не найдено.");
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

    // 1. Находим дело обзвона по идентификатору обзвона
    $result = CRest::call(
        'crm.activity.list',
        [
            'filter' => [
                'PROVIDER_ID' => 'CALL_LIST',
                'ASSOCIATED_ENTITY_ID' => 13
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
        echo "Дело обзвона 13 не найдено.\n";
        exit;
    }

    // Берем ID первого дела
    $dealId = $deals[0]['ID'];

    // 2. Удаляем дело по ID
    $result = CRest::call(
        'crm.activity.delete',
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

## Права доступа

Права зависят от операции:

- создавать обзвон может любой пользователь: контакты или компании, которые он не может читать, в обзвон не попадут
- изменять обзвон и получать его параметры может администратор, создатель обзвона или ответственный за дело обзвона. Нужно еще право на чтение контактов или компаний — по типу участников обзвона
- получать участников может администратор, создатель обзвона или ответственный за дело обзвона. Метод [crm.calllist.items.get](./crm-calllist-items-get.md) вернет только тех, кого пользователь может читать
- список обзвонов может получить любой пользователь: администратор получит все обзвоны, остальные — только созданные ими

## Обзор методов {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [crm.calllist.add](./crm-calllist-add.md) | Создает новый список обзвона ||
|| [crm.calllist.update](./crm-calllist-update.md) | Меняет участников и CRM-форму обзвона ||
|| [crm.calllist.get](./crm-calllist-get.md) | Возвращает параметры обзвона без участников ||
|| [crm.calllist.list](./crm-calllist-list.md) | Возвращает список обзвонов ||
|| [crm.calllist.items.get](./crm-calllist-items-get.md) | Возвращает участников списка обзвона ||
|| [crm.calllist.statuslist](./crm-calllist-statuslist.md) | Возвращает возможные статусы звонка в обзвоне ||
|#
