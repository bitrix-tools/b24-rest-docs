# Получить список оценок imopenlines.v2.Session.Rating.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к отчетам открытых линий

Метод `imopenlines.v2.Session.Rating.list` получает список сессий, которым клиент поставил оценку.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **dateVoteFrom***
[`string`](../../data-types.md) | Начало периода клиентской оценки в формате ISO 8601 ||
|| **dateVoteTo***
[`string`](../../data-types.md) | Конец периода клиентской оценки в формате ISO 8601.

Максимальный период: 366 дней ||
|| **configId**
[`integer`](../../data-types.md) | Идентификатор открытой линии.

Идентификатор можно получить методом [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md) ||
|| **configIdList**
[`integer[]`](../../data-types.md) | Список идентификаторов открытых линий.

Идентификаторы можно получить методом [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md).

Если переданы `configIdList` и `configId`, используется `configIdList`.

Максимум: 1000 элементов ||
|| **operatorId**
[`integer`](../../data-types.md) | Идентификатор оператора.

Идентификатор можно получить методом [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md) ||
|| **operatorIdList**
[`integer[]`](../../data-types.md) | Список идентификаторов операторов.

Идентификаторы можно получить методом [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md).

Если переданы `operatorIdList` и `operatorId`, используется `operatorIdList`.

Максимум: 1000 элементов ||
|| **source**
[`string`](../../data-types.md) | Код канала.

Код можно получить методом [imconnector.list](../imconnector/imconnector-list.md) ||
|| **sourceList**
[`string[]`](../../data-types.md) | Список кодов каналов.

Коды можно получить методом [imconnector.list](../imconnector/imconnector-list.md).

Если переданы `sourceList` и `source`, используется `sourceList`.

Максимум: 1000 элементов ||
|| **vote**
[`string`](../../data-types.md) | Клиентская оценка.

Возможные значения:

- `like` — клиент поставил лайк
- `dislike` — клиент поставил дизлайк ||
|| **hasVoteHead**
[`boolean`](../../data-types.md) | Фильтр по наличию оценки руководителя.

Возможные значения:

- `true`, `Y`, `1` — есть оценка руководителя
- `false`, `N`, `0` — оценки руководителя нет ||
|| **offset**
[`integer`](../../data-types.md) | Смещение для пагинации.

По умолчанию: `0` ||
|| **limit**
[`integer`](../../data-types.md) | Размер страницы.

Возможные значения: от `1` до `200`.

По умолчанию: `50` ||
|#

{% note info "" %}

Метод возвращает только сессии с клиентской оценкой.

Сессии со значением `vote: none` в ответ не попадают.

Поля `voteHead` и `commentHead` в элементах `rating` возвращаются как `null`, если тариф или права пользователя не позволяют видеть оценку руководителя.

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
        "vote": "like",
        "dateVoteFrom": "2026-06-01T00:00:00+03:00",
        "dateVoteTo": "2026-06-30T23:59:59+03:00"
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.v2.Session.Rating.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "configId": 3,
        "vote": "like",
        "dateVoteFrom": "2026-06-01T00:00:00+03:00",
        "dateVoteTo": "2026-06-30T23:59:59+03:00",
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.v2.Session.Rating.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make({
        method: 'imopenlines.v2.Session.Rating.list',
        params: {
          configId: 3,
          vote: 'like',
          dateVoteFrom: '2026-06-01T00:00:00+03:00',
          dateVoteTo: '2026-06-30T23:59:59+03:00',
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result.ratings)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getOpenlinesRatings() {
        try {
          const $b24 = await B24Js.initializeB24Frame()
          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.v2.Session.Rating.list',
            params: {
              configId: 3,
              vote: 'like',
              dateVoteFrom: '2026-06-01T00:00:00+03:00',
              dateVoteTo: '2026-06-30T23:59:59+03:00',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info(response.getData().result.ratings)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOpenlinesRatings)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.call(
            "imopenlines.v2.Session.Rating.list",
            {
                "configId": 3,
                "vote": "like",
                "dateVoteFrom": "2026-06-01T00:00:00+03:00",
                "dateVoteTo": "2026-06-30T23:59:59+03:00",
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
                'imopenlines.v2.Session.Rating.list',
                [
                    'configId' => 3,
                    'vote' => 'like',
                    'dateVoteFrom' => '2026-06-01T00:00:00+03:00',
                    'dateVoteTo' => '2026-06-30T23:59:59+03:00',
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
        'imopenlines.v2.Session.Rating.list',
        {
            configId: 3,
            vote: 'like',
            dateVoteFrom: '2026-06-01T00:00:00+03:00',
            dateVoteTo: '2026-06-30T23:59:59+03:00',
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
        'imopenlines.v2.Session.Rating.list',
        [
            'configId' => 3,
            'vote' => 'like',
            'dateVoteFrom' => '2026-06-01T00:00:00+03:00',
            'dateVoteTo' => '2026-06-30T23:59:59+03:00',
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    res, err := client.Core().Call(ctx, "imopenlines.v2.Session.Rating.list", b24.Params{
    	"configId":     3,
    	"vote":         "like",
    	"dateVoteFrom": "2026-06-01T00:00:00+03:00",
    	"dateVoteTo":   "2026-06-30T23:59:59+03:00",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imopenlines.v2.Session.Rating.list: %w", err)
    }

    fmt.Println(string(res.Result))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ratings": [
            {
                "sessionId": 1024,
                "configId": 3,
                "operatorId": 42,
                "source": "livechat",
                "vote": "like",
                "voteHead": 5,
                "commentHead": "Хорошая работа",
                "dateVote": "2026-06-15T14:53:00+03:00",
                "dateSessionClose": "2026-06-15T14:52:10+03:00"
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
|| **result.ratings**
[`rating[]`](./data-types.md#rating) | Список сессий с клиентской оценкой.

Все поля типа [`rating`](./data-types.md#rating) смотрите в разделе [Типы данных статистики открытых линий](./data-types.md#rating) ||
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
    "error_description": "Invalid vote filter value"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `TARIFF_RESTRICTION` | Statistics reports are not available on the current tariff plan | Тариф не позволяет использовать отчеты открытых линий ||
|| `400` | `PERIOD_REQUIRED` | dateVoteFrom and dateVoteTo are required | Не передан `dateVoteFrom` или `dateVoteTo` ||
|| `400` | `INVALID_FILTER` | Invalid filter value | Передан некорректный фильтр, дата или список больше 1000 элементов ||
|| `400` | `PERIOD_TOO_LARGE` | The requested period exceeds the maximum of 1 year | Период больше 366 дней ||
|| `400` | `OFFSET_TOO_LARGE` | Offset is too large | `offset` больше `10000` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [imopenlines.v2.Stat.get](./imopenlines-v2-stat-get.md)
- [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md)
- [Типы данных статистики открытых линий](./data-types.md)
