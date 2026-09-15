# Добавить новый тип ресурса booking.v1.resourceType.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resourceType.add` добавляет новый тип ресурса.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект, содержащий значения полей для создания типа ресурса [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Название типа ресурса ||
|| **code***
[`string`](../../../data-types.md) | Символьный код типа ресурса. Должен быть уникальным среди типов модуля `booking`.

Коды предустановленных типов: `doctor`, `equipment`, `expert`, `car`, `room` ||
|| **isInfoNotificationOn**
[`string`](../../../data-types.md) | Сообщение клиенту о записи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **isConfirmationNotificationOn**
[`string`](../../../data-types.md) | Сообщение клиенту с запросом подтвердить запись. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeConfirmation**
[`string`](../../../data-types.md) | Тип шаблона сообщения о подтверждении записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам
- `inanimate_long` — шаблон для многодневного бронирования

По умолчанию `inanimate` ||
|| **isReminderNotificationOn**
[`string`](../../../data-types.md) | Напоминание о записи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeReminder**
[`string`](../../../data-types.md) | Тип шаблона сообщения для напоминания. Единственное значение — `base` ||
|| **isFeedbackNotificationOn**
[`string`](../../../data-types.md) | Запрос обратной связи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeFeedback**
[`string`](../../../data-types.md) | Тип шаблона сообщения для запроса обратной связи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **isDelayedNotificationOn**
[`string`](../../../data-types.md) | Напоминание, когда клиент опаздывает. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **templateTypeDelayed**
[`string`](../../../data-types.md) | Тип шаблона сообщения об опоздании. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам

По умолчанию `inanimate` ||
|| **isCancellationNotificationOn**
[`string`](../../../data-types.md) | Сообщение клиенту после отмены записи. Возможные значения:
- `Y` — включено
- `N` — выключено

По умолчанию `Y` ||
|| **cancellationNotificationDelay**
[`integer`](../../../data-types.md) | Время после отмены записи, через которое клиенту приходит сообщение об отмене. Указывается в секундах.

По умолчанию 600 ||
|| **infoNotificationDelay**
[`integer`](../../../data-types.md) | Время, через которое клиенту приходит сообщение о записи. Указывается в секундах.

По умолчанию 0 ||
|| **reminderNotificationDelay**
[`integer`](../../../data-types.md) | Время до записи, за которое клиенту приходит напоминание. Указывается в секундах.

Значение `-1` — напоминание приходит утром в день записи.

По умолчанию `-1` ||
|| **delayedNotificationDelay**
[`integer`](../../../data-types.md) | Время, через которое клиенту отправляется сообщение об опоздании. Указывается в секундах.

По умолчанию 300 ||
|| **delayedCounterDelay**
[`integer`](../../../data-types.md) | Время, через которое в календаре включается счетчик. Указывается в секундах.

По умолчанию 300 ||
|| **confirmationNotificationDelay**
[`integer`](../../../data-types.md) | Время до записи, когда клиенту приходит первое сообщение для подтверждения записи. Указывается в секундах.

По умолчанию 86400 ||
|| **confirmationNotificationRepetitions**
[`integer`](../../../data-types.md) | Количество сообщений, которые приходят клиенту для подтверждения записи, без учета первого.

По умолчанию 0 ||
|| **confirmationNotificationRepetitionsInterval**
[`integer`](../../../data-types.md) | Интервал между сообщениями о подтверждении записи. Указывается в секундах.

По умолчанию 10800 ||
|| **confirmationCounterDelay**
[`integer`](../../../data-types.md) | Время до записи, после которого включается счетчик неподтвержденной записи. Указывается в секундах.

По умолчанию 10800 ||
|| **senderCode**
[`string`](../../../data-types.md) | Код сервиса, который отправляет клиенту сообщения. Возможные значения:
- `bitrix24` — уведомления Битрикс24
- `ai_call` — звонок AI-агента

Метод не проверяет значение: перечислены коды, которые поддерживает Битрикс24.

Поле сохраняется у типа, но на отправку не влияет: Битрикс24 выбирает отправителя по полю `senderCode` ресурса. Задавайте его методом [booking.v1.resource.add](../booking-v1-resource-add.md).

По умолчанию поле не заполнено ||
|#

Поля с флагами `Y` и `N` принимают только строки. Метод игнорирует без ошибки значения других типов, например `true`, и поля, которых нет в таблице.

Шаблон сообщения о записи `templateTypeInfo` через REST у типа ресурса задать нельзя: поле не входит в состав типа ресурса и метод его игнорирует. Задайте шаблон у самого ресурса методом [booking.v1.resource.add](../booking-v1-resource-add.md).

Настройки типа не переносятся в ресурсы этого типа: ресурс при создании получает собственные значения по умолчанию.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Название","code":"meeting-room","isInfoNotificationOn":"Y","isConfirmationNotificationOn":"Y","templateTypeConfirmation":"animate","isReminderNotificationOn":"N","templateTypeReminder":"base","isFeedbackNotificationOn":"Y","templateTypeFeedback":"inanimate","isDelayedNotificationOn":"Y","templateTypeDelayed":"inanimate","infoNotificationDelay":300,"reminderNotificationDelay":-1,"delayedNotificationDelay":300,"delayedCounterDelay":7200,"confirmationNotificationDelay":86400,"confirmationNotificationRepetitions":0,"confirmationNotificationRepetitionsInterval":0,"confirmationCounterDelay":7200}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.resourceType.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Название","code":"meeting-room","isInfoNotificationOn":"Y","isConfirmationNotificationOn":"Y","templateTypeConfirmation":"animate","isReminderNotificationOn":"N","templateTypeReminder":"base","isFeedbackNotificationOn":"Y","templateTypeFeedback":"inanimate","isDelayedNotificationOn":"Y","templateTypeDelayed":"inanimate","infoNotificationDelay":300,"reminderNotificationDelay":-1,"delayedNotificationDelay":300,"delayedCounterDelay":7200,"confirmationNotificationDelay":86400,"confirmationNotificationRepetitions":0,"confirmationNotificationRepetitionsInterval":0,"confirmationCounterDelay":7200},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resourceType.add
    ```

- JS (TS)

    ```ts
    // Сниппет — ES-модуль: для top-level await нужен type="module" или сборщик
    // $b24 — уже инициализированный экземпляр SDK, смотрите руководство по началу работы с SDK
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Метод возвращает идентификатор созданного типа ресурса числом, без объекта-обертки
    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'booking.v1.resourceType.add',
        params: {
          fields: {
            name: 'Equipment Room',
            code: 'meeting-room',
            isInfoNotificationOn: 'Y',
            isConfirmationNotificationOn: 'Y',
            templateTypeConfirmation: 'animate',
            isReminderNotificationOn: 'N',
            templateTypeReminder: 'base',
            isFeedbackNotificationOn: 'Y',
            templateTypeFeedback: 'inanimate',
            isDelayedNotificationOn: 'Y',
            templateTypeDelayed: 'inanimate',
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
        console.info('Идентификатор нового типа ресурса:', result)
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
      async function addResourceType() {
        try {
          // Инициализируем SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.resourceType.add',
            params: {
              fields: {
                name: 'Equipment Room',
                code: 'meeting-room',
                isInfoNotificationOn: 'Y',
                isConfirmationNotificationOn: 'Y',
                templateTypeConfirmation: 'animate',
                isReminderNotificationOn: 'N',
                templateTypeReminder: 'base',
                isFeedbackNotificationOn: 'Y',
                templateTypeFeedback: 'inanimate',
                isDelayedNotificationOn: 'Y',
                templateTypeDelayed: 'inanimate',
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
          console.info('Идентификатор нового типа ресурса:', result)
        } catch (error) {
          // Возникает при ошибках транспорта или SDK: AjaxError, SdkError и других
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addResourceType)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.booking.v1.resource_type.add(
            fields={
                "name": "Название",
                "code": "meeting-room",
                "isInfoNotificationOn": "Y",
                "isConfirmationNotificationOn": "Y",
                "templateTypeConfirmation": "animate",
                "isReminderNotificationOn": "N",
                "templateTypeReminder": "base",
                "isFeedbackNotificationOn": "Y",
                "templateTypeFeedback": "inanimate",
                "isDelayedNotificationOn": "Y",
                "templateTypeDelayed": "inanimate",
                "infoNotificationDelay": 300,
                "reminderNotificationDelay": -1,
                "delayedNotificationDelay": 300,
                "delayedCounterDelay": 7200,
                "confirmationNotificationDelay": 86400,
                "confirmationNotificationRepetitions": 0,
                "confirmationNotificationRepetitionsInterval": 0,
                "confirmationCounterDelay": 7200,
            },
        ).response
        result = bitrix_response.result
        print(result)
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
                'booking.v1.resourceType.add',
                [
                    'fields' => [
                        'name'                          => 'Название',
                        'code'                          => 'code',
                        'isInfoNotificationOn'          => 'Y',
                        'isConfirmationNotificationOn'  => 'Y',
                        'templateTypeConfirmation'      => 'animate',
                        'isReminderNotificationOn'      => 'N',
                        'templateTypeReminder'          => 'base',
                        'isFeedbackNotificationOn'      => 'Y',
                        'templateTypeFeedback'          => 'inanimate',
                        'isDelayedNotificationOn'       => 'Y',
                        'templateTypeDelayed'           => 'inanimate',
                        'infoNotificationDelay'                     => 300,
                        'reminderNotificationDelay'                 => -1,
                        'delayedNotificationDelay'                  => 300,
                        'delayedCounterDelay'           => 7200,
                        'confirmationNotificationDelay'             => 86400,
                        'confirmationNotificationRepetitions'       => 0,
                        'confirmationNotificationRepetitionsInterval' => 0,
                        'confirmationCounterDelay'      => 7200,
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
        echo 'Error adding resource type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resourceType.add",
        {
            fields: {
                name: "Название",
                code: "meeting-room",
                isInfoNotificationOn: "Y",
                isConfirmationNotificationOn: "Y",
                templateTypeConfirmation: "animate",
                isReminderNotificationOn: "N",
                templateTypeReminder: "base",
                isFeedbackNotificationOn: "Y",
                templateTypeFeedback: "inanimate",
                isDelayedNotificationOn: "Y",
                templateTypeDelayed: "inanimate",
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
        'booking.v1.resourceType.add',
        [
            'fields' => [
                'name' => 'Название',
                'code' => 'meeting-room',
                'isInfoNotificationOn' => 'Y',
                'isConfirmationNotificationOn' => 'Y',
                'templateTypeConfirmation' => 'animate',
                'isReminderNotificationOn' => 'N',
                'templateTypeReminder' => 'base',
                'isFeedbackNotificationOn' => 'Y',
                'templateTypeFeedback' => 'inanimate',
                'isDelayedNotificationOn' => 'Y',
                'templateTypeDelayed' => 'inanimate',
                'infoNotificationDelay' => 300,
                'reminderNotificationDelay' => -1,
                'delayedNotificationDelay' => 300,
                'delayedCounterDelay' => 7200,
                'confirmationNotificationDelay' => 86400,
                'confirmationNotificationRepetitions' => 0,
                'confirmationNotificationRepetitionsInterval' => 0,
                'confirmationCounterDelay' => 7200,
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
    res, err := client.Core().Call(ctx, "booking.v1.resourceType.add", b24.Params{
    	"fields": b24.Params{
    		"name":                                        "Название",
    		"code":                                        "meeting-room",
    		"isInfoNotificationOn":                        "Y",
    		"isConfirmationNotificationOn":                "Y",
    		"templateTypeConfirmation":                    "animate",
    		"isReminderNotificationOn":                    "N",
    		"templateTypeReminder":                        "base",
    		"isFeedbackNotificationOn":                    "Y",
    		"templateTypeFeedback":                        "inanimate",
    		"isDelayedNotificationOn":                     "Y",
    		"templateTypeDelayed":                         "inanimate",
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
    	return fmt.Errorf("booking.v1.resourceType.add: %w", err)
    }

    // Метод возвращает идентификатор числом, без объекта-обертки
    var id b24.ID
    if err := json.Unmarshal(res.Result, &id); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(id)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 17,
    "time": {
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating_reset_at": 1724068628,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданного типа ресурса ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required fields: code"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | `Required fields: name, code` | В `fields` не переданы обязательные поля. В сообщении перечислены только отсутствующие. Код `0` общий для нескольких ошибок — различайте их по тексту ||
|| `100` | `Could not find value for parameter {fields}` | Не передан параметр `fields` ||
|| `422` | `Invalid value of the {field} field` | Недопустимое значение поля из перечисления, например `templateTypeConfirmation` ||
|| `1010` | `Resource type with code "X" already exists` | Тип ресурса с таким `code` уже существует ||
|| `0` | `Booking tool is disabled. Please contact your administrator.` | В настройках Битрикс24 отключен инструмент «Бронирование» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./booking-v1-resourcetype-update.md)
- [{#T}](./booking-v1-resourcetype-get.md)
- [{#T}](./booking-v1-resourcetype-list.md)
- [{#T}](./booking-v1-resourcetype-delete.md)
- [{#T}](../index.md)
- [{#T}](./events/on-booking-resource-type-add.md)
