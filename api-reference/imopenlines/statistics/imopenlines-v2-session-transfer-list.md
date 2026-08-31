# Получить историю переводов imopenlines.v2.Session.Transfer.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к отчетам открытых линий

Метод `imopenlines.v2.Session.Transfer.list` получает историю переводов по сессиям открытых линий.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **sessionId***
[`integer[]`](../../data-types.md) | Массив идентификаторов сессий.

Идентификаторы можно получить методом [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md).

Максимум: `50` уникальных идентификаторов ||
|#

{% note info "" %}

Дубликаты в `sessionId` удаляются.

Если сессия не существует или недоступна пользователю, записей по ней не будет в массиве `transfers`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "sessionId": [1024, 1025]
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.v2.Session.Transfer.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "sessionId": [1024, 1025],
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.v2.Session.Transfer.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make({
        method: 'imopenlines.v2.Session.Transfer.list',
        params: {
          sessionId: [1024, 1025],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result.transfers)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getOpenlinesTransfers() {
        try {
          const $b24 = await B24Js.initializeB24Frame()
          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.v2.Session.Transfer.list',
            params: {
              sessionId: [1024, 1025],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info(response.getData().result.transfers)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOpenlinesTransfers)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.call(
            "imopenlines.v2.Session.Transfer.list",
            {
                "sessionId": [
                    1024,
                    1025,
                ],
            },
        ).response
        print(bitrix_response.result)
    except BitrixAPIError as error:
        print(f"error: {error.error}", f"error_description: {error.error_description}", sep="\n")
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.v2.Session.Transfer.list',
                [
                    'sessionId' => [1024, 1025],
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.v2.Session.Transfer.list',
        {
            sessionId: [1024, 1025],
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imopenlines.v2.Session.Transfer.list',
        [
            'sessionId' => [1024, 1025],
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    res, err := client.Core().Call(ctx, "imopenlines.v2.Session.Transfer.list", b24.Params{
    	"sessionId": []int{1024, 1025},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imopenlines.v2.Session.Transfer.list: %w", err)
    }

    fmt.Println(string(res.Result))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "transfers": [
            {
                "sessionId": 1024,
                "date": "2026-06-15T14:30:05+03:00",
                "fromOperatorId": null,
                "toOperatorId": 42,
                "fromConfigId": 3,
                "toConfigId": null,
                "reason": "auto",
                "mode": "AUTO",
                "type": "USER",
                "initiatorId": null
            },
            {
                "sessionId": 1024,
                "date": "2026-06-15T14:40:00+03:00",
                "fromOperatorId": 42,
                "toOperatorId": 51,
                "fromConfigId": 3,
                "toConfigId": null,
                "reason": "manual",
                "mode": "MANUAL",
                "type": "USER",
                "initiatorId": 42
            }
        ]
    },
    "time": {
        "start": 1782810000,
        "finish": 1782810000.2,
        "duration": 0.2,
        "processing": 0,
        "date_start": "2026-06-30T10:00:00+03:00",
        "date_finish": "2026-06-30T10:00:00+03:00",
        "operating_reset_at": 1782810600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа ||
|| **result.transfers**
[`transfer[]`](./data-types.md#transfer) | История переводов по запрошенным сессиям.

Все поля типа [`transfer`](./data-types.md#transfer) смотрите в разделе [Типы данных статистики открытых линий](./data-types.md#transfer) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BATCH_LIMIT_EXCEEDED",
    "error_description": "sessionId batch must not exceed 50 items"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `TARIFF_RESTRICTION` | Statistics reports are not available on the current tariff plan | Тариф не позволяет использовать отчеты открытых линий ||
|| `400` | `100` | Could not find value for parameter {sessionId} | Не передан обязательный параметр `sessionId` ||
|| `400` | `100` | Invalid value {value} to match with parameter {sessionId}. Should be value of type array. | `sessionId` передан не как массив ||
|| `400` | `BATCH_LIMIT_EXCEEDED` | sessionId batch must not exceed 50 items | Передано больше 50 уникальных идентификаторов сессий ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md)
- [imopenlines.v2.Session.Stat.get](./imopenlines-v2-session-stat-get.md)
- [Типы данных статистики открытых линий](./data-types.md)
