# Список обзвона: обзор методов

Список обзвона — это дело CRM, из которого можно позвонить нескольким клиентам подряд. Сотрудник работает с одним делом, в котором собраны выбранные контакты или компании. Результаты обзвона автоматически сохранятся в карточках клиентов:
- в прикрепленном деле звонка и комментарии к нему,
- заполненной CRM-форме и полях карточки,
- созданной из обзвона сделке или счете.

> Быстрый переход: [все методы](#all-methods)
> 
> Пользовательская документация: [Обзвон в Битрикс24](https://helpdesk.bitrix24.ru/open/24945678/)

## Связь с другими объектами

**Контакт**. Для обзвона нескольких контактов укажите массив из `ID` контактов в методе [создания](./crm-calllist-add.md) или [изменения](./crm-calllist-update.md) обзвона. Получить `ID` контактов можно методом [crm.item.list](../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 3`.

**Компания**. Для обзвона нескольких компаний укажите массив из `ID` компаний в методе [создания](./crm-calllist-add.md) или [изменения](./crm-calllist-update.md) обзвона. Получить `ID` компаний можно методом [crm.item.list](../../crm/universal/crm-item-list.md) с параметром `entityTypeId = 4`.

**CRM-форма**. Во время звонка сотрудник может заполнять информацию о клиенте в прикрепленной к обзвону CRM-форме. После завершения звонка форма будет доступна в карточке клиента, информация из формы будет сохранена в полях карточки. Чтобы прикрепить форму к обзвону, укажите ее `ID` в методе [создания](./crm-calllist-add.md) или [изменения](./crm-calllist-update.md) обзвона. `ID` формы можно найти в списке форм Битрикс24 `https://your-domain.ru/crm/webform/`.

**Справочник**. Статус звонка в карточка обзвона — это элемент [справочника](../status/index.md). Чтобы изменить статусы обзвона, используйте методы справочников [crm.status.*](../status/index.md) с параметром `ENTITY_ID = CALL_LIST`.

**Пользователь**. Лист обзвона имеет привязку к пользователю по числовому идентификатору в поле `createdBy` — кем создан. Получить данные пользователя по идентификатору можно с помощью метода [user.get](../../user/user-get.md).

## Как удалить список обзвона

Среди методов списка обзвона нет метода удаления. Удалить список обзвона можно через удаление дела методом [crm.activity.delete](../timeline/activities/activity-base/crm-activity-delete.md).

1. Используйте метод [crm.activity.list](../timeline/activities/activity-base/crm-activity-list.md) с фильтром по названию дела `SUBJECT`. В значении поля укажите `Обзвон #ID`. На место `ID` подставьте `ID` обзвона, полученное методами [crm.calllist.add](./crm-calllist-add) или [crm.calllist.list](./crm-calllist-list).

2. Передайте `ID` дела из результата в метод удаления [crm.activity.delete](../timeline/activities/activity-base/crm-activity-delete.md).

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.activity.list',
        {
          filter: {
            "SUBJECT": "Обзвон #13",
          },
          select: ["ID"]
        }
      )
      const deals = response.getData() || []
    
      if (deals.length === 0) {
        console.log("Дел с названием 'Обзвон #13' не найдено.");
        return;
      }
    
      let dealId = deals[0].ID;
    
      await $b24.callMethod(
        'crm.activity.delete',
        {
          id: dealId,
        }
      )
      console.log("Дело ID " + dealId + " успешно удалено.");
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.activity.list', {
        filter: {
          "SUBJECT": "Обзвон #13",
        },
        select: ["ID"]
      }, 'ID')
    
      for await (const page of generator) {
        if (page.length === 0) {
          console.log("Дел с названием 'Обзвон #13' не найдено.");
          return;
        }
    
        let dealId = page[0].ID;
    
        await $b24.callMethod(
          'crm.activity.delete',
          {
            id: dealId,
          }
        )
        console.log("Дело ID " + dealId + " успешно удалено.");
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.activity.list', {
        filter: {
          "SUBJECT": "Обзвон #13",
        },
        select: ["ID"]
      }, 0)
    
      const deals = response.getData().result || []
    
      if (deals.length === 0) {
        console.log("Дел с названием 'Обзвон #13' не найдено.");
        return;
      }
    
      let dealId = deals[0].ID;
    
      await $b24.callMethod(
        'crm.activity.delete',
        {
          id: dealId,
        }
      )
      console.log("Дело ID " + dealId + " успешно удалено.");
    } catch (error) {
      console.error('Request failed', error)
    }
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


## Обзор методов {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правами на чтение элементов CRM

#|
|| **Метод** | **Описание** ||
|| [crm.calllist.add](./crm-calllist-add.md) | Создает новый список обзвона ||
|| [crm.calllist.get](./crm-calllist-get.md) | Возвращает информацию о списке обзвона ||
|| [crm.calllist.items.get](./crm-calllist-items-get.md) | Возвращает участников списка обзвона ||
|| [crm.calllist.list](./crm-calllist-list.md) | Возвращает список всех обзвонов ||
|| [crm.calllist.statuslist](./crm-calllist-statuslist.md) | Возвращает список статусов обзвона ||
|| [crm.calllist.update](./crm-calllist-update.md) | Обновляет состав списка обзвона ||
|# 