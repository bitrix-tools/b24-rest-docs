# Получить список операторов imopenlines.v2.Operator.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к отчетам открытых линий

Метод `imopenlines.v2.Operator.list` получает список операторов с текущим статусом и нагрузкой.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **configId**
[`integer`](../../data-types.md) | Идентификатор открытой линии.

Идентификатор можно получить методом [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md) ||
|| **configIdList**
[`integer[]`](../../data-types.md) | Список идентификаторов открытых линий.

Идентификаторы можно получить методом [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md).

Если переданы `configIdList` и `configId`, используется `configIdList`.

Максимум: 1000 элементов ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор оператора.

Идентификатор можно получить методом [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md) ||
|| **userIdList**
[`integer[]`](../../data-types.md) | Список идентификаторов операторов.

Идентификаторы можно получить методом [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md).

Если переданы `userIdList` и `userId`, используется `userIdList`.

Максимум: 1000 элементов ||
|| **status**
[`string`](../../data-types.md) | Статус оператора.

Возможные значения:

- `online` — оператор онлайн и не на паузе
- `offline` — оператор не в сети
- `pause` — оператор поставил себя на паузу ||
|| **hasFreeSlots**
[`boolean`](../../data-types.md) | Фильтр по наличию свободных слотов.

Возможные значения:

- `true`, `Y`, `1` — есть свободные слоты
- `false`, `N`, `0` — свободных слотов нет ||
|| **offset**
[`integer`](../../data-types.md) | Смещение для пагинации.

По умолчанию: `0` ||
|| **limit**
[`integer`](../../data-types.md) | Размер страницы.

Возможные значения: от `1` до `200`.

По умолчанию: `50` ||
|#

{% note info "" %}

Данные о статусе и количестве активных сессий могут обновляться не одновременно. Для real-time виджета нагрузки рекомендуется запрашивать метод не чаще одного раза в 30 секунд.

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
        "configId": 3,
        "status": "online",
        "limit": 50
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.v2.Operator.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "configId": 3,
        "status": "online",
        "limit": 50,
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.v2.Operator.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type OperatorListResult = {
      operators: Array<{
        userId: number
        configId: number
        status: string
        activeSessions: number
        maxChat: number
        freeSlots: number
        lastActivityDate: string | null
      }>
      hasNextPage: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<OperatorListResult>({
        method: 'imopenlines.v2.Operator.list',
        params: {
          configId: 3,
          status: 'online',
          limit: 50,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result.operators)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getOpenlinesOperators() {
        try {
          const $b24 = await B24Js.initializeB24Frame()
          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.v2.Operator.list',
            params: {
              configId: 3,
              status: 'online',
              limit: 50,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info(response.getData().result.operators)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOpenlinesOperators)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.call(
            "imopenlines.v2.Operator.list",
            {
                "configId": 3,
                "status": "online",
                "limit": 50,
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
                'imopenlines.v2.Operator.list',
                [
                    'configId' => 3,
                    'status' => 'online',
                    'limit' => 50,
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
        'imopenlines.v2.Operator.list',
        {
            configId: 3,
            status: 'online',
            limit: 50,
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
        'imopenlines.v2.Operator.list',
        [
            'configId' => 3,
            'status' => 'online',
            'limit' => 50,
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    res, err := client.Core().Call(ctx, "imopenlines.v2.Operator.list", b24.Params{
    	"configId": 3,
    	"status":   "online",
    	"limit":    50,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imopenlines.v2.Operator.list: %w", err)
    }

    fmt.Println(string(res.Result))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "operators": [
            {
                "userId": 42,
                "configId": 3,
                "status": "online",
                "activeSessions": 2,
                "maxChat": 5,
                "freeSlots": 3,
                "lastActivityDate": "2026-06-15T15:01:00+03:00"
            }
        ],
        "hasNextPage": false
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
|| **result.operators**
[`operatorLoad[]`](./data-types.md#operator-load) | Список операторов.

Все поля типа [`operatorLoad`](./data-types.md#operator-load) смотрите в разделе [Типы данных статистики открытых линий](./data-types.md#operator-load) ||
|| **result.hasNextPage**
[`boolean`](../../data-types.md) | Признак следующей страницы ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "INVALID_FILTER",
    "error_description": "Invalid status filter value"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `TARIFF_RESTRICTION` | Statistics reports are not available on the current tariff plan | Тариф не позволяет использовать отчеты открытых линий ||
|| `400` | `INVALID_FILTER` | Invalid status filter value | Передан неизвестный `status` или некорректный список значений ||
|| `400` | `OFFSET_TOO_LARGE` | Offset is too large | `offset` больше `10000` при фильтрации по `status` или `hasFreeSlots` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [imopenlines.v2.Stat.get](./imopenlines-v2-stat-get.md)
- [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md)
- [Типы данных статистики открытых линий](./data-types.md)
