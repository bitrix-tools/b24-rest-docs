# Установить слоты для ресурса booking.v1.resource.slots.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.slots.set` устанавливает временные слоты для указанного ресурса.

Метод заменяет весь набор слотов ресурса целиком: слоты, которых нет в запросе, удаляются. Пустой массив `slots` удаляет все слоты ресурса — так же, как [booking.v1.resource.slots.unset](./booking-v1-resource-slots-unset.md).

После успешного вызова срабатывает событие [onBookingResourceUpdate](../events/on-booking-resource-update.md): слоты хранятся в самом ресурсе.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **resourceId***
[`integer`](../../../data-types.md) | Идентификатор ресурса.

Можно получить методами [booking.v1.resource.add](../booking-v1-resource-add.md) и [booking.v1.resource.list](../booking-v1-resource-list.md) ||
|| **slots***
[`array`](../../../data-types.md) | Массив объектов, содержащий значения полей для установки временных слотов [(подробное описание)](#slots) ||
|#

### Параметр slots {#slots}

#|
|| **Название**
`тип` | **Описание** ||
|| **from***
[`integer`](../../../data-types.md) | Время в минутах от начала суток, с которого доступна бронь. Значение в диапазоне от 0 до 1440. Например, `540` — бронь доступна с 9:00 ||
|| **to***
[`integer`](../../../data-types.md) | Время в минутах от начала суток, до которого доступна бронь. Значение в диапазоне от 0 до 1440 и строго больше `from`. Например, `1080` — бронь доступна до 18:00 ||
|| **timezone***
[`string`](../../../data-types.md) | Часовой пояс в формате IANA, относительно которого настроено время слота. Например, `Europe/Moscow`.

Неизвестный часовой пояс метод молча заменяет на `UTC` ||
|| **weekDays***
[`array`](../../../data-types.md) | Массив доступных дней недели для слота. Возможные значения:
- `Mon` — понедельник
- `Tue` — вторник
- `Wed` — среда
- `Thu` — четверг
- `Fri` — пятница
- `Sat` — суббота
- `Sun` — воскресенье ||
|| **slotSize***
[`integer`](../../../data-types.md) | Длительность записи в минутах. Значение не может быть отрицательным ||
|#

Все пять полей слота обязательны. Поле `id` метод игнорирует: идентификаторы слотов назначает Битрикс24.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример настройки временных слотов для ресурса:

- доступность с понедельника по пятницу с 9:00 до 18:00 по часовому поясу `Europe/Kaliningrad`
- длительность слота 30 минут

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"resourceId":15,"slots":[{"from":540,"to":1080,"timezone":"Europe/Kaliningrad","weekDays":["Mon","Tue","Wed","Thu","Fri"],"slotSize":30}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.resource.slots.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"resourceId":15,"slots":[{"from":540,"to":1080,"timezone":"Europe/Kaliningrad","weekDays":["Mon","Tue","Wed","Thu","Fri"],"slotSize":30}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.slots.set
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
        method: 'booking.v1.resource.slots.set',
        params: {
          resourceId: 15,
          slots: [
            {
              from: 540,
              to: 1080,
              timezone: 'Europe/Kaliningrad',
              weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
              slotSize: 30,
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // Данные доступны только при успешном ответе
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Slots set successfully:', result)
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
      async function setResourceSlots() {
        try {
          // Инициализируем SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.resource.slots.set',
            params: {
              resourceId: 15,
              slots: [
                {
                  from: 540,
                  to: 1080,
                  timezone: 'Europe/Kaliningrad',
                  weekDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                  slotSize: 30,
                },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // Данные доступны только при успешном ответе
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Slots set successfully:', result)
        } catch (error) {
          // Возникает при ошибках транспорта или SDK: AjaxError, SdkError и других
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setResourceSlots)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.booking.v1.resource.slots.set(
            resource_id=15,
            slots=[
                {
                    "from": 540,
                    "to": 1080,
                    "timezone": "Europe/Kaliningrad",
                    "weekDays": [
                        "Mon",
                        "Tue",
                        "Wed",
                        "Thu",
                        "Fri",
                    ],
                    "slotSize": 30,
                },
            ],
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
                'booking.v1.resource.slots.set',
                [
                    'resourceId' => 15,
                    'slots'      => [
                        [
                            'from'     => 540,
                            'to'       => 1080,
                            'timezone' => 'Europe/Kaliningrad',
                            'weekDays' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                            'slotSize' => 30
                        ]
                    ]
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
        echo 'Error setting resource slots: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resource.slots.set",
        {
            resourceId: 15,
            slots: [
                {
                    from: 540,
                    to: 1080,
                    timezone: "Europe/Kaliningrad",
                    weekDays: ["Mon", "Tue", "Wed", "Thu", "Fri"],
                    slotSize: 30
                }
            ]
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
        'booking.v1.resource.slots.set',
        [
            'resourceId' => 15,
            'slots' => [
                [
                    'from' => 540,
                    'to' => 1080,
                    'timezone' => 'Europe/Kaliningrad',
                    'weekDays' => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                    'slotSize' => 30
                ]
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
    res, err := client.Core().Call(ctx, "booking.v1.resource.slots.set", b24.Params{
    	"resourceId": 15,
    	"slots": []b24.Params{
    		{
    			"from":     540,
    			"to":       1080,
    			"timezone": "Europe/Kaliningrad",
    			"weekDays": []string{"Mon", "Tue", "Wed", "Thu", "Fri"},
    			"slotSize": 30,
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("booking.v1.resource.slots.set: %w", err)
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
[`boolean`](../../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "1009",
    "error_description": "Resource not found"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `1009` | `Resource not found` | Ресурс с указанным `resourceId` не найден ||
|| `0` | `Required fields: timezone, weekDays, slotSize` | В объекте слота не переданы обязательные поля. В сообщении перечислены только отсутствующие ||
|| `422` | `Invalid range fields` | Недопустимые значения в объекте слота: `from` или `to` вне диапазона 0–1440, `from` больше или равно `to`, пустой или неизвестный день недели, отрицательный `slotSize`. Метод не указывает, какое поле и какой слот вызвали ошибку ||
|| `422` | `Array's element must be array, string given` | Элемент массива `slots` — не объект ||
|| `100` | `Could not find value for parameter {resourceId}` | Не передан параметр `resourceId` ||
|| `100` | `Could not find value for parameter {slots}` | Не передан параметр `slots` ||
|| `0` | `Booking tool is disabled. Please contact your administrator.` | В настройках Битрикс24 отключен инструмент «Бронирование» ||
|| `1007` | `Failed updating resource` | Ресурс не удалось сохранить ||
|| `0` | `Feature is not available` | Инструмент «Бронирование» недоступен на текущем тарифе ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./booking-v1-resource-slots-list.md)
- [{#T}](./booking-v1-resource-slots-unset.md)
- [{#T}](../index.md)
- [{#T}](../booking-v1-resource-get.md)
- [{#T}](../events/on-booking-resource-update.md)
