# Обновить ресурс booking.v1.resource.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.update` обновляет существующий ресурс.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор ресурса.

Можно получить в методах [booking.v1.resource.add](./booking-v1-resource-add.md) и [booking.v1.resource.list](./booking-v1-resource-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий значения полей для обновления ресурса [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название ресурса ||
|| **description**
[`string`](../../data-types.md) | Описание ресурса ||
|| **typeId**
[`integer`](../../data-types.md) | Идентификатор типа ресурса.

Список доступных типов можно узнать с помощью метода [booking.v1.resourceType.list](./resource-type/booking-v1-resourcetype-list.md) ||
|| **isMain**
[`string`](../../data-types.md) | Как показывать ресурс. Возможные значения:
- `Y` — в колонках расписания
- `N` — при пересечении ресурсов ||
|| **isInfoNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту о записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **templateTypeInfo**
[`string`](../../data-types.md) | Тип шаблона сообщения о записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам
- `inanimate_long` — шаблон для многодневного бронирования ||
|| **isConfirmationNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту с запросом подтвердить запись. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **templateTypeConfirmation**
[`string`](../../data-types.md) | Тип шаблона сообщения о подтверждении записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам
- `inanimate_long` — шаблон для многодневного бронирования ||
|| **isReminderNotificationOn**
[`string`](../../data-types.md) | Напоминание о записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **templateTypeReminder**
[`string`](../../data-types.md) | Тип шаблона сообщения для напоминания. Единственное значение — `base` ||
|| **isFeedbackNotificationOn**
[`string`](../../data-types.md) | Запрос обратной связи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **templateTypeFeedback**
[`string`](../../data-types.md) | Тип шаблона сообщения для запроса обратной связи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **isDelayedNotificationOn**
[`string`](../../data-types.md) | Напоминание, когда клиент опаздывает. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **templateTypeDelayed**
[`string`](../../data-types.md) | Тип шаблона сообщения об опоздании. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **isCancellationNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту после отмены записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **cancellationNotificationDelay**
[`integer`](../../data-types.md) | Время после отмены записи, через которое клиенту приходит сообщение об отмене. Указывается в секундах ||
|| **infoNotificationDelay**
[`integer`](../../data-types.md) | Время, через которое клиенту приходит сообщение о записи. Указывается в секундах ||
|| **reminderNotificationDelay**
[`integer`](../../data-types.md) | Время до записи, за которое клиенту приходит напоминание. Указывается в секундах.

Значение `-1` — напоминание приходит утром в день записи ||
|| **delayedNotificationDelay**
[`integer`](../../data-types.md) | Время, через которое клиенту отправляется сообщение об опоздании. Указывается в секундах ||
|| **delayedCounterDelay**
[`integer`](../../data-types.md) | Время, через которое в календаре включается счетчик. Указывается в секундах ||
|| **confirmationNotificationDelay**
[`integer`](../../data-types.md) | Время до записи, когда клиенту приходит первое сообщение для подтверждения записи. Указывается в секундах ||
|| **confirmationNotificationRepetitions**
[`integer`](../../data-types.md) | Количество сообщений, которые приходят клиенту для подтверждения записи, без учета первого ||
|| **confirmationNotificationRepetitionsInterval**
[`integer`](../../data-types.md) | Интервал между сообщениями о подтверждении записи. Указывается в секундах ||
|| **confirmationCounterDelay**
[`integer`](../../data-types.md) | Время до записи, после которого включается счетчик неподтвержденной записи. Указывается в секундах ||
|| **senderCode**
[`string`](../../data-types.md) | Код сервиса, который отправляет клиенту сообщения. Возможные значения:
- `bitrix24` — уведомления Битрикс24
- `ai_call` — звонок AI-агента

Метод не проверяет значение: перечислены коды, которые поддерживает Битрикс24 ||
|#

Поля с флагами `Y` и `N` принимают только строки. Метод игнорирует без ошибки значения других типов, например `true`, и поля, которых нет в таблице.

Метод обновляет только переданные поля, остальные сохраняют прежние значения.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":10,"fields":{"name":"Новое название","description":"Новое описание","typeId":1,"isMain":"N","isInfoNotificationOn":"Y","templateTypeInfo":"inanimate","isConfirmationNotificationOn":"Y","templateTypeConfirmation":"animate","isReminderNotificationOn":"Y","templateTypeReminder":"base","isFeedbackNotificationOn":"N","templateTypeFeedback":"animate","isDelayedNotificationOn":"N","templateTypeDelayed":"animate","infoNotificationDelay":300,"reminderNotificationDelay":-1,"delayedNotificationDelay":300,"delayedCounterDelay":7200,"confirmationNotificationDelay":86400,"confirmationNotificationRepetitions":0,"confirmationNotificationRepetitionsInterval":0,"confirmationCounterDelay":7200}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.resource.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":10,"fields":{"name":"Новое название","description":"Новое описание","typeId":1,"isMain":"N","isInfoNotificationOn":"Y","templateTypeInfo":"inanimate","isConfirmationNotificationOn":"Y","templateTypeConfirmation":"animate","isReminderNotificationOn":"Y","templateTypeReminder":"base","isFeedbackNotificationOn":"N","templateTypeFeedback":"animate","isDelayedNotificationOn":"N","templateTypeDelayed":"animate","infoNotificationDelay":300,"reminderNotificationDelay":-1,"delayedNotificationDelay":300,"delayedCounterDelay":7200,"confirmationNotificationDelay":86400,"confirmationNotificationRepetitions":0,"confirmationNotificationRepetitionsInterval":0,"confirmationCounterDelay":7200},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.update
    ```

- JS (TS)

    ```ts
    // Сниппет — ES-модуль: для top-level await нужен type="module" или сборщик
    // $b24 — уже инициализированный экземпляр SDK, смотрите руководство по началу работы с SDK
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'booking.v1.resource.update',
        params: {
          id: 10,
          fields: {
            name: 'New name',
            description: 'New description',
            typeId: 1,
            isMain: 'N',
            isInfoNotificationOn: 'Y',
            templateTypeInfo: 'inanimate',
            isConfirmationNotificationOn: 'Y',
            templateTypeConfirmation: 'animate',
            isReminderNotificationOn: 'Y',
            templateTypeReminder: 'base',
            isFeedbackNotificationOn: 'N',
            templateTypeFeedback: 'animate',
            isDelayedNotificationOn: 'N',
            templateTypeDelayed: 'animate',
            infoNotificationDelay: 300,
            reminderNotificationDelay: -1,
            delayedNotificationDelay: 300,
            delayedCounterDelay: 7200,
            confirmationNotificationDelay: 86400,
            confirmationNotificationRepetitions: 0,
            confirmationNotificationRepetitionsInterval: 0,
            confirmationCounterDelay: 7200,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // Данные доступны только при успешном ответе
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Resource updated:', result)
      }
    } catch (error) {
      // Возникает при ошибках транспорта или SDK: AjaxError, SdkError и других
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Подключаем SDK в UMD-сборке, он доступен как глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateResource() {
        try {
          // Инициализируем SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.resource.update',
            params: {
              id: 10,
              fields: {
                name: 'New name',
                description: 'New description',
                typeId: 1,
                isMain: 'N',
                isInfoNotificationOn: 'Y',
                templateTypeInfo: 'inanimate',
                isConfirmationNotificationOn: 'Y',
                templateTypeConfirmation: 'animate',
                isReminderNotificationOn: 'Y',
                templateTypeReminder: 'base',
                isFeedbackNotificationOn: 'N',
                templateTypeFeedback: 'animate',
                isDelayedNotificationOn: 'N',
                templateTypeDelayed: 'animate',
                infoNotificationDelay: 300,
                reminderNotificationDelay: -1,
                delayedNotificationDelay: 300,
                delayedCounterDelay: 7200,
                confirmationNotificationDelay: 86400,
                confirmationNotificationRepetitions: 0,
                confirmationNotificationRepetitionsInterval: 0,
                confirmationCounterDelay: 7200,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // Данные доступны только при успешном ответе
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Resource updated:', result)
        } catch (error) {
          // Возникает при ошибках транспорта или SDK: AjaxError, SdkError и других
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateResource)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException
    try:
        bitrix_response = client.booking.v1.resource.update(bitrix_id=123, fields={
            "name": "Updated name",
            "description": "Updated description",
            "typeId": 1,
            "isMain": "N",
            "isInfoNotificationOn": "Y",
            "templateTypeInfo": "inanimate",
            "isConfirmationNotificationOn": "Y",
            "templateTypeConfirmation": "animate",
            "isReminderNotificationOn": "Y",
            "templateTypeReminder": "base",
            "isFeedbackNotificationOn": "N",
            "templateTypeFeedback": "animate",
            "isDelayedNotificationOn": "N",
            "templateTypeDelayed": "animate",
            "infoNotificationDelay": 300,
            "reminderNotificationDelay": -1,
            "delayedNotificationDelay": 300,
            "delayedCounterDelay": 7200,
            "confirmationNotificationDelay": 86400,
            "confirmationNotificationRepetitions": 0,
            "confirmationNotificationRepetitionsInterval": 0,
            "confirmationCounterDelay": 7200,
        }).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print('Ошибка Bitrix API', f'error: {error.error}', f'error_description: {error.error_description}', sep='\n')
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
                'booking.v1.resource.update',
                [
                    'id' => 10,
                    'fields' => [
                        'name' => 'Новое название',
                        'description' => 'Новое описание',
                        'typeId' => 1,
                        'isMain' => 'N',
                        'isInfoNotificationOn' => 'Y',
                        'templateTypeInfo' => 'inanimate',
                        'isConfirmationNotificationOn' => 'Y',
                        'templateTypeConfirmation' => 'animate',
                        'isReminderNotificationOn' => 'Y',
                        'templateTypeReminder' => 'base',
                        'isFeedbackNotificationOn' => 'N',
                        'templateTypeFeedback' => 'animate',
                        'isDelayedNotificationOn' => 'N',
                        'templateTypeDelayed' => 'animate',
                        'infoNotificationDelay' => 300,
                        'reminderNotificationDelay' => -1,
                        'delayedNotificationDelay' => 300,
                        'delayedCounterDelay' => 7200,
                        'confirmationNotificationDelay' => 86400,
                        'confirmationNotificationRepetitions' => 0,
                        'confirmationNotificationRepetitionsInterval' => 0,
                        'confirmationCounterDelay' => 7200,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating resource: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resource.update",
        {
            id: 10,
            fields: {
                name: "Новое название",
                description: "Новое описание",
                typeId: 1,
                isMain: "N",
                isInfoNotificationOn: "Y",
                templateTypeInfo: "inanimate",
                isConfirmationNotificationOn: "Y",
                templateTypeConfirmation: "animate",
                isReminderNotificationOn: "Y",
                templateTypeReminder: "base",
                isFeedbackNotificationOn: "N",
                templateTypeFeedback: "animate",
                isDelayedNotificationOn: "N",
                templateTypeDelayed: "animate",
                infoNotificationDelay: 300,
                reminderNotificationDelay: -1,
                delayedNotificationDelay: 300,
                delayedCounterDelay: 7200,
                confirmationNotificationDelay: 86400,
                confirmationNotificationRepetitions: 0,
                confirmationNotificationRepetitionsInterval: 0,
                confirmationCounterDelay: 7200
            }
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'booking.v1.resource.update',
        [
            'id' => 10,
            'fields' => [
                'name' => 'Новое название',
                'description' => 'Новое описание',
                'typeId' => 1,
                'isMain' => 'N',
                'isInfoNotificationOn' => 'Y',
                'templateTypeInfo' => 'inanimate',
                'isConfirmationNotificationOn' => 'Y',
                'templateTypeConfirmation' => 'animate',
                'isReminderNotificationOn' => 'Y',
                'templateTypeReminder' => 'base',
                'isFeedbackNotificationOn' => 'N',
                'templateTypeFeedback' => 'animate',
                'isDelayedNotificationOn' => 'N',
                'templateTypeDelayed' => 'animate',
                'infoNotificationDelay' => 300,
                'reminderNotificationDelay' => -1,
                'delayedNotificationDelay' => 300,
                'delayedCounterDelay' => 7200,
                'confirmationNotificationDelay' => 86400,
                'confirmationNotificationRepetitions' => 0,
                'confirmationNotificationRepetitionsInterval' => 0,
                'confirmationCounterDelay' => 7200
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "booking.v1.resource.update", b24.Params{
    	"id": 10,
    	"fields": b24.Params{
    		"name":                                        "Новое название",
    		"description":                                 "Новое описание",
    		"typeId":                                      1,
    		"isMain":                                      "N",
    		"isInfoNotificationOn":                        "Y",
    		"templateTypeInfo":                            "inanimate",
    		"isConfirmationNotificationOn":                "Y",
    		"templateTypeConfirmation":                    "animate",
    		"isReminderNotificationOn":                    "Y",
    		"templateTypeReminder":                        "base",
    		"isFeedbackNotificationOn":                    "N",
    		"templateTypeFeedback":                        "animate",
    		"isDelayedNotificationOn":                     "N",
    		"templateTypeDelayed":                         "animate",
    		"infoNotificationDelay":                       300,
    		"reminderNotificationDelay":                   -1,
    		"delayedNotificationDelay":                    300,
    		"delayedCounterDelay":                         7200,
    		"confirmationNotificationDelay":               86400,
    		"confirmationNotificationRepetitions":         0,
    		"confirmationNotificationRepetitionsInterval": 0,
    		"confirmationCounterDelay":                    7200,
    	},
    })
    if err != nil {
    	return fmt.Errorf("booking.v1.resource.update: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "1007",
    "error_description": "Resource not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | `Could not find value for parameter` | Не передан обязательный параметр ||
|| `1007` | `Resource not found` | Указан несуществующий `id` ресурса ||
|| `1007` | `Failed updating resource` | Ресурс не удалось сохранить ||
|| `1013` | `Resource type with id {id} does not exist` | Указан несуществующий `typeId` ||
|| `422` | `Invalid value of the {field} field` | Недопустимое значение поля из перечисления, например `templateTypeInfo` ||
|| `0` | `Feature is not available` | Инструмент «Бронирование» недоступен на текущем тарифе ||
|| `0` | `Booking tool is disabled. Please contact your administrator.` | В настройках Битрикс24 отключен инструмент «Бронирование» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./booking-v1-resource-add.md)
- [{#T}](./booking-v1-resource-get.md)
- [{#T}](./booking-v1-resource-list.md)
- [{#T}](./booking-v1-resource-delete.md)
- [{#T}](./resource-type/index.md)
- [{#T}](./slots/index.md)
- [{#T}](./events/on-booking-resource-update.md)
