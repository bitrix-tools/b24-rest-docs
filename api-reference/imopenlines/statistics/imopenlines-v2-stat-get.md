# Получить агрегированную статистику imopenlines.v2.Stat.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к отчетам открытых линий

Метод `imopenlines.v2.Stat.get` получает агрегированную статистику открытых линий за период.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **dateFrom***
[`string`](../../data-types.md) | Начало периода в формате ISO 8601 ||
|| **dateTo***
[`string`](../../data-types.md) | Конец периода в формате ISO 8601.

Максимальный период: 366 дней ||
|| **configId**
[`integer`](../../data-types.md) | Идентификатор открытой линии.

Идентификатор можно получить методом [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md) ||
|| **configIdList**
[`integer[]`](../../data-types.md) | Список идентификаторов открытых линий.

Идентификаторы можно получить методом [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md).

Если переданы `configIdList` и `configId`, используется `configIdList`.

Максимум: 1000 элементов ||
|| **source**
[`string`](../../data-types.md) | Код канала.

Код можно получить методом [imconnector.list](../imconnector/imconnector-list.md) ||
|| **sourceList**
[`string[]`](../../data-types.md) | Список кодов каналов.

Коды можно получить методом [imconnector.list](../imconnector/imconnector-list.md).

Если переданы `sourceList` и `source`, используется `sourceList`.

Максимум: 1000 элементов ||
|| **operatorId**
[`integer`](../../data-types.md) | Идентификатор оператора.

Идентификатор можно получить методом [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md) ||
|| **operatorIdList**
[`integer[]`](../../data-types.md) | Список идентификаторов операторов.

Идентификаторы можно получить методом [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md).

Если переданы `operatorIdList` и `operatorId`, используется `operatorIdList`.

Максимум: 1000 элементов ||
|#

{% note info "" %}

Если не передать фильтры по линии, каналу или оператору, метод рассчитает статистику по доступным пользователю линиям.

Если за период нет данных, числовые метрики возвращаются со значением `0`, а не `null`.

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
        "dateFrom": "2026-06-01T00:00:00+03:00",
        "dateTo": "2026-06-30T23:59:59+03:00",
        "configId": 3
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.v2.Stat.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "dateFrom": "2026-06-01T00:00:00+03:00",
        "dateTo": "2026-06-30T23:59:59+03:00",
        "configId": 3,
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.v2.Stat.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StatResult = {
      totalSessions: number
      closedSessions: number
      spamSessions: number
      avgWaitAnswer: number
      avgSessionDuration: number
      likeCount: number
      dislikeCount: number
      votedSessions: number
      positiveRate: number
      kpiFirstAnswerOk: number
      kpiFirstAnswerFail: number
      sessionsBySource: Array<{ source: string, count: number }>
      sessionsByHour: number[]
      sessionsByOperator: Array<{ operatorId: number, count: number, avgWaitAnswer: number, positiveRate: number }>
    }

    try {
      const response = await $b24.actions.v2.call.make<StatResult>({
        method: 'imopenlines.v2.Stat.get',
        params: {
          dateFrom: '2026-06-01T00:00:00+03:00',
          dateTo: '2026-06-30T23:59:59+03:00',
          configId: 3,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getOpenlinesStat() {
        try {
          const $b24 = await B24Js.initializeB24Frame()
          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.v2.Stat.get',
            params: {
              dateFrom: '2026-06-01T00:00:00+03:00',
              dateTo: '2026-06-30T23:59:59+03:00',
              configId: 3,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info(response.getData().result)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOpenlinesStat)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.call(
            "imopenlines.v2.Stat.get",
            {
                "dateFrom": "2026-06-01T00:00:00+03:00",
                "dateTo": "2026-06-30T23:59:59+03:00",
                "configId": 3,
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
                'imopenlines.v2.Stat.get',
                [
                    'dateFrom' => '2026-06-01T00:00:00+03:00',
                    'dateTo' => '2026-06-30T23:59:59+03:00',
                    'configId' => 3,
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
        'imopenlines.v2.Stat.get',
        {
            dateFrom: '2026-06-01T00:00:00+03:00',
            dateTo: '2026-06-30T23:59:59+03:00',
            configId: 3,
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
        'imopenlines.v2.Stat.get',
        [
            'dateFrom' => '2026-06-01T00:00:00+03:00',
            'dateTo' => '2026-06-30T23:59:59+03:00',
            'configId' => 3,
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    res, err := client.Core().Call(ctx, "imopenlines.v2.Stat.get", b24.Params{
    	"dateFrom": "2026-06-01T00:00:00+03:00",
    	"dateTo":   "2026-06-30T23:59:59+03:00",
    	"configId": 3,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imopenlines.v2.Stat.get: %w", err)
    }

    fmt.Println(string(res.Result))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "totalSessions": 340,
        "closedSessions": 318,
        "spamSessions": 4,
        "avgWaitAnswer": 42.7,
        "avgSessionDuration": 612.3,
        "likeCount": 210,
        "dislikeCount": 15,
        "votedSessions": 225,
        "positiveRate": 0.9333,
        "kpiFirstAnswerOk": 300,
        "kpiFirstAnswerFail": 18,
        "sessionsBySource": [
            {
                "source": "livechat",
                "count": 200
            }
        ],
        "sessionsByHour": [0, 0, 0, 0, 0, 0, 2, 10, 25, 40, 38, 30, 28, 22, 20, 25, 30, 20, 15, 10, 8, 5, 3, 1],
        "sessionsByOperator": [
            {
                "operatorId": 42,
                "count": 120,
                "avgWaitAnswer": 38.1,
                "positiveRate": 0.95
            }
        ]
    },
    "time": {
        "start": 1782810000,
        "finish": 1782810000.3,
        "duration": 0.3,
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
[`statResult`](./data-types.md#stat-result) | Агрегированная статистика за период.

Все поля типа [`statResult`](./data-types.md#stat-result) смотрите в разделе [Типы данных статистики открытых линий](./data-types.md#stat-result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "PERIOD_REQUIRED",
    "error_description": "dateFrom and dateTo are required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `TARIFF_RESTRICTION` | Statistics reports are not available on the current tariff plan | Тариф не позволяет использовать отчеты открытых линий ||
|| `400` | `PERIOD_REQUIRED` | dateFrom and dateTo are required | Не передан `dateFrom` или `dateTo` ||
|| `400` | `INVALID_FILTER` | Invalid filter value | Передан некорректный фильтр, дата или список больше 1000 элементов ||
|| `400` | `PERIOD_TOO_LARGE` | The requested period exceeds the maximum of 1 year | Период больше 366 дней ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [imopenlines.v2.Operator.list](./imopenlines-v2-operator-list.md)
- [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md)
- [Типы данных статистики открытых линий](./data-types.md)
