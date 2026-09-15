# Получить ресурс booking.v1.resource.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.get` возвращает информацию о ресурсе по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор ресурса.

Можно получить в методах [booking.v1.resource.add](./booking-v1-resource-add.md) и [booking.v1.resource.list](./booking-v1-resource-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.resource.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.get
    ```

- JS (TS)

    ```ts
    // Сниппет — ES-модуль: для top-level await нужен type="module" или сборщик
    // $b24 — уже инициализированный экземпляр SDK, смотрите руководство по началу работы с SDK
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Структура данных в result — совпадает с разделом «Обработка ответа» этой страницы
    type ResourceResult = {
      resource: {
        cancellationNotificationDelay: number | null,
        confirmationCounterDelay: number | null,
        confirmationNotificationDelay: number | null,
        confirmationNotificationRepetitions: number | null,
        confirmationNotificationRepetitionsInterval: number | null,
        delayedCounterDelay: number | null,
        delayedNotificationDelay: number | null,
        description: string | null,
        id: number,
        infoNotificationDelay: number | null,
        isCancellationNotificationOn: string,
        isConfirmationNotificationOn: string,
        isDelayedNotificationOn: string,
        isFeedbackNotificationOn: string,
        isInfoNotificationOn: string,
        isMain: string,
        isReminderNotificationOn: string,
        name: string | null,
        reminderNotificationDelay: number | null,
        senderCode: string,
        templateTypeConfirmation: string,
        templateTypeDelayed: string,
        templateTypeFeedback: string,
        templateTypeInfo: string,
        templateTypeReminder: string,
        typeId: number,
      },
    }

    try {
      const response = await $b24.actions.v2.call.make<ResourceResult>({
        method: 'booking.v1.resource.get',
        params: {
          id: 15,
        },
        requestId: Text.getUuidRfc4122()
      })

      // Данные доступны только при успешном ответе
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.resource.id, result.resource.name, result.resource.typeId)
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
      async function getResource() {
        try {
          // Инициализируем SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.resource.get',
            params: {
              id: 15,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // Данные доступны только при успешном ответе
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.resource.id, result.resource.name, result.resource.typeId)
        } catch (error) {
          // Возникает при ошибках транспорта или SDK: AjaxError, SdkError и других
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getResource)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.booking.v1.resource.get(
            bitrix_id=15,
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
                'booking.v1.resource.get',
                [
                    'id' => 15,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting resource: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resource.get",
        {
            id: 15
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
        'booking.v1.resource.get',
        [
            'id' => 15
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "booking.v1.resource.get", b24.Params{
    	"id": 15,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("booking.v1.resource.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "resource".
    raw, ok := b24.Unwrap(res.Result, "resource")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа resource")
    }

    var item struct {
    	ConfirmationCounterDelay                    int    `json:"confirmationCounterDelay"`
    	ConfirmationNotificationDelay               int    `json:"confirmationNotificationDelay"`
    	ConfirmationNotificationRepetitionsInterval int    `json:"confirmationNotificationRepetitionsInterval"`
    	DelayedCounterDelay                         int    `json:"delayedCounterDelay"`
    	DelayedNotificationDelay                    int    `json:"delayedNotificationDelay"`
    	ID                                          b24.ID `json:"id"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ConfirmationCounterDelay, item.ConfirmationNotificationDelay)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "resource": {
            "cancellationNotificationDelay": 600,
            "confirmationCounterDelay": 10800,
            "confirmationNotificationDelay": 86400,
            "confirmationNotificationRepetitions": null,
            "confirmationNotificationRepetitionsInterval": 10800,
            "delayedCounterDelay": 300,
            "delayedNotificationDelay": 300,
            "description": null,
            "id": 15,
            "infoNotificationDelay": null,
            "isCancellationNotificationOn": "Y",
            "isConfirmationNotificationOn": "Y",
            "isDelayedNotificationOn": "N",
            "isFeedbackNotificationOn": "N",
            "isInfoNotificationOn": "Y",
            "isMain": "Y",
            "isReminderNotificationOn": "Y",
            "name": "Название",
            "reminderNotificationDelay": -1,
            "senderCode": "bitrix24",
            "templateTypeConfirmation": "animate",
            "templateTypeDelayed": "animate",
            "templateTypeFeedback": "animate",
            "templateTypeInfo": "inanimate",
            "templateTypeReminder": "base",
            "typeId": 1
        }
    },
    "time": {
        "start": 1746539524.292041,
        "finish": 1746539524.356627,
        "duration": 0.06458592414855957,
        "processing": 0.018703937530517578,
        "date_start": "2025-05-06T16:52:04+03:00",
        "date_finish": "2025-05-06T16:52:04+03:00",
        "operating_reset_at": 1746540124,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит единственное поле `resource` — объект с информацией о ресурсе, структура описана [ниже](#resource) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Ресурс {#resource}

Числовые и строковые поля возвращаются как `null`, если значение не задано. Например, при задержке уведомления `0` в ответе придет `null`. Флаги `is*`, поля `templateType*` и `senderCode` приходят заполненными всегда.

#|
|| **Название**
`тип` | **Описание** ||
|| **cancellationNotificationDelay**
[`integer`](../../data-types.md) | Время в секундах после отмены записи, через которое клиенту приходит сообщение об отмене ||
|| **confirmationCounterDelay**
[`integer`](../../data-types.md) | Время до записи в секундах, после которого включается счетчик неподтвержденной записи ||
|| **confirmationNotificationDelay**
[`integer`](../../data-types.md) | Время до записи в секундах, когда клиенту приходит первое сообщение для подтверждения записи ||
|| **confirmationNotificationRepetitions**
[`integer`](../../data-types.md) | Количество сообщений, которые приходят клиенту для подтверждения записи, без учета первого ||
|| **confirmationNotificationRepetitionsInterval**
[`integer`](../../data-types.md) | Интервал между сообщениями о подтверждении записи, в секундах ||
|| **delayedCounterDelay**
[`integer`](../../data-types.md) | Время в секундах, через которое в календаре включается счетчик ||
|| **delayedNotificationDelay**
[`integer`](../../data-types.md) | Время в секундах, через которое клиенту отправляется сообщение об опоздании ||
|| **description**
[`string`](../../data-types.md) | Описание ресурса ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор ресурса ||
|| **infoNotificationDelay**
[`integer`](../../data-types.md) | Время в секундах, через которое клиенту приходит сообщение о записи ||
|| **isCancellationNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту после отмены записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isConfirmationNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту с запросом подтвердить запись. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isDelayedNotificationOn**
[`string`](../../data-types.md) | Напоминание, когда клиент опаздывает. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isFeedbackNotificationOn**
[`string`](../../data-types.md) | Запрос обратной связи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isInfoNotificationOn**
[`string`](../../data-types.md) | Сообщение клиенту о записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **isMain**
[`string`](../../data-types.md) | Как показывать ресурс. Возможные значения:
- `Y` — в колонках расписания
- `N` — при пересечении ресурсов ||
|| **isReminderNotificationOn**
[`string`](../../data-types.md) | Напоминание о записи. Возможные значения:
- `Y` — включено
- `N` — выключено ||
|| **name**
[`string`](../../data-types.md) | Название ресурса ||
|| **reminderNotificationDelay**
[`integer`](../../data-types.md) | Время до записи в секундах, за которое клиенту приходит напоминание.

Значение `-1` — напоминание приходит утром в день записи ||
|| **senderCode**
[`string`](../../data-types.md) | Код сервиса, который отправляет клиенту сообщения. Возможные значения:
- `bitrix24` — уведомления Битрикс24
- `ai_call` — звонок AI-агента ||
|| **templateTypeConfirmation**
[`string`](../../data-types.md) | Тип шаблона сообщения о подтверждении записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам
- `inanimate_long` — шаблон для многодневного бронирования ||
|| **templateTypeDelayed**
[`string`](../../data-types.md) | Тип шаблона сообщения об опоздании. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeFeedback**
[`string`](../../data-types.md) | Тип шаблона сообщения для запроса обратной связи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам ||
|| **templateTypeInfo**
[`string`](../../data-types.md) | Тип шаблона сообщения о записи. Возможные значения:
- `inanimate` — шаблон для бронирования оборудования и помещений
- `animate` — шаблон для записи к специалистам
- `inanimate_long` — шаблон для многодневного бронирования ||
|| **templateTypeReminder**
[`string`](../../data-types.md) | Тип шаблона сообщения для напоминания. Единственное значение — `base` ||
|| **typeId**
[`integer`](../../data-types.md) | Идентификатор типа ресурса.

Получить информацию о типе можно с помощью метода [booking.v1.resourceType.get](./resource-type/booking-v1-resourcetype-get.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "1009",
    "error_description": "Resource not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1009` | `Resource not found` | Ресурс с таким `id` не найден ||
|| `100` | `Could not find value for parameter {id}` | Не передан обязательный параметр ||
|| `0` | `Booking tool is disabled. Please contact your administrator.` | В настройках Битрикс24 отключен инструмент «Бронирование» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./booking-v1-resource-add.md)
- [{#T}](./booking-v1-resource-update.md)
- [{#T}](./booking-v1-resource-list.md)
- [{#T}](./booking-v1-resource-delete.md)
- [{#T}](./resource-type/index.md)
- [{#T}](./slots/index.md)
