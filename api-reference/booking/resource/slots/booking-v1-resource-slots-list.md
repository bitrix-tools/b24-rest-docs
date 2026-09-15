# Получить настройку слотов для ресурса booking.v1.resource.slots.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`booking`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `booking.v1.resource.slots.list` возвращает настройку временных слотов для указанного ресурса.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **resourceId***
[`integer`](../../../data-types.md) | Идентификатор ресурса.

Можно получить методами [booking.v1.resource.add](../booking-v1-resource-add.md) и [booking.v1.resource.list](../booking-v1-resource-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"resourceId":15}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/booking.v1.resource.slots.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"resourceId":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/booking.v1.resource.slots.list
    ```

- JS (TS)

    ```ts
    // Сниппет — ES-модуль: для top-level await нужен type="module" или сборщик
    // $b24 — уже инициализированный экземпляр SDK, смотрите руководство по началу работы с SDK
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Структура данных в result — совпадает с разделом «Обработка ответа» этой страницы
    type SlotsListResult = {
      slots: {
        id: number
        from: number
        to: number
        timezone: string
        weekDays: string[]
        slotSize: number
      }[]
    }

    try {
      // Метод отдает все слоты ресурса сразу: постраничной навигации у него нет
      const response = await $b24.actions.v2.call.make<SlotsListResult>({
        method: 'booking.v1.resource.slots.list',
        params: {
          resourceId: 15,
        },
        requestId: Text.getUuidRfc4122()
      })

      // Данные доступны только при успешном ответе
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Slots:', result.slots, 'Count:', result.slots.length)
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
      async function listResourceSlots() {
        try {
          // Инициализируем SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          // Метод отдает все слоты ресурса сразу: постраничной навигации у него нет
          const response = await $b24.actions.v2.call.make({
            method: 'booking.v1.resource.slots.list',
            params: {
              resourceId: 15,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // Данные доступны только при успешном ответе
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Slots:', result.slots, 'Count:', result.slots.length)
        } catch (error) {
          // Возникает при ошибках транспорта или SDK: AjaxError, SdkError и других
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listResourceSlots)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.booking.v1.resource.slots.list(
            resource_id=15,
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
                'booking.v1.resource.slots.list',
                [
                    'resourceId' => 15,
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
        echo 'Error listing resource slots: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "booking.v1.resource.slots.list",
        {
            resourceId: 15,
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
        'booking.v1.resource.slots.list',
        [
            'resourceId' => 15
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "booking.v1.resource.slots.list", b24.Params{
    	"resourceId": 15,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("booking.v1.resource.slots.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "slots".
    raw, ok := b24.Unwrap(res.Result, "slots")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа slots")
    }

    // Числовые поля со значением 0 приходят как null, поэтому указатели
    var items []struct {
    	From     *int     `json:"from"`
    	ID       b24.ID   `json:"id"`
    	SlotSize *int     `json:"slotSize"`
    	Timezone string   `json:"timezone"`
    	To       int      `json:"to"`
    	WeekDays []string `json:"weekDays"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Timezone, it.WeekDays)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "slots": [
            {
                "from": 540,
                "id": 11,
                "slotSize": 60,
                "timezone": "Europe/Moscow",
                "to": 1080,
                "weekDays": [
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri"
                ]
            }
        ]
    },
    "total": 0,
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
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит единственное поле `slots` — массив настроек слотов, структура объекта описана [ниже](#slots) ||
|| **total**
[`integer`](../../../data-types.md) | Служебное поле. Метод всегда возвращает `0` и отдает все настройки ресурса сразу, без постраничной навигации ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Слот {#slots}

Если ресурсу не заданы слоты, метод возвращает пустой массив.

Числовые поля со значением `0` возвращаются как `null`. Это касается и `from` для слота с начала суток, и `slotSize`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор настройки слотов ||
|| **from**
[`integer`](../../../data-types.md) | Время в минутах от начала суток, с которого доступна бронь. Значение в диапазоне от 0 до 1440. Например, `540` — бронь доступна с 9:00 ||
|| **to**
[`integer`](../../../data-types.md) | Время в минутах от начала суток, до которого доступна бронь. Значение в диапазоне от 0 до 1440 и строго больше `from`. Например, `1080` — бронь доступна до 18:00 ||
|| **timezone**
[`string`](../../../data-types.md) | Часовой пояс в формате IANA, относительно которого настроено время слота. Например, `Europe/Moscow` ||
|| **weekDays**
[`array`](../../../data-types.md) | Массив доступных дней недели для слота. Возможные значения:
- `Mon` — понедельник
- `Tue` — вторник
- `Wed` — среда
- `Thu` — четверг
- `Fri` — пятница
- `Sat` — суббота
- `Sun` — воскресенье ||
|| **slotSize**
[`integer`](../../../data-types.md) | Длительность записи в минутах ||
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
|| `100` | `Could not find value for parameter {resourceId}` | Не передан обязательный параметр `resourceId` ||
|| `0` | `Booking tool is disabled. Please contact your administrator.` | В настройках Битрикс24 отключен инструмент «Бронирование» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./booking-v1-resource-slots-set.md)
- [{#T}](./booking-v1-resource-slots-unset.md)
- [{#T}](../index.md)
- [{#T}](../booking-v1-resource-get.md)
