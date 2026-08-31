# Получить список сессий imopenlines.v2.Session.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к отчетам открытых линий

Метод `imopenlines.v2.Session.list` получает список сессий открытых линий с фильтрами и пагинацией.

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
|| **status**
[`string`](../../data-types.md) | Статус сессии.

Возможные значения:

- `new` — сессия в очереди или пропущена
- `answered` — оператор ведет диалог
- `closed` — сессия закрыта
- `spam` — сессия помечена как спам
- `paused` — сессия на паузе ||
|| **closeReason**
[`string`](../../data-types.md) | Причина закрытия.

Нельзя передавать вместе со `status`.

Возможные значения:

- `operator` — сессию закрыл оператор
- `auto` — сессия закрыта автоматически по таймауту
- `spam` — сессия закрыта как спам
- `client` — сессия закрыта по неактивности клиента
- `replyLimit` — сессия закрыта после истечения окна ответа канала ||
|| **dateCreateFrom**
[`string`](../../data-types.md) | Начало периода создания в формате ISO 8601 ||
|| **dateCreateTo**
[`string`](../../data-types.md) | Конец периода создания в формате ISO 8601.

Максимальный период: 366 дней ||
|| **dateCloseFrom**
[`string`](../../data-types.md) | Начало периода закрытия в формате ISO 8601 ||
|| **dateCloseTo**
[`string`](../../data-types.md) | Конец периода закрытия в формате ISO 8601.

Максимальный период: 366 дней ||
|| **vote**
[`string`](../../data-types.md) | Клиентская оценка.

Возможные значения:

- `like` — клиент поставил лайк
- `dislike` — клиент поставил дизлайк
- `none` — оценки нет
- `any` — есть любая клиентская оценка ||
|| **hasVoteHead**
[`boolean`](../../data-types.md) | Фильтр по наличию оценки руководителя.

Возможные значения:

- `true`, `Y`, `1` — есть оценка руководителя
- `false`, `N`, `0` — оценки руководителя нет ||
|| **kpiFirstAnswer**
[`boolean`](../../data-types.md) | Фильтр по выполнению KPI первого ответа.

Требует полного периода `dateCreateFrom` и `dateCreateTo` или `dateCloseFrom` и `dateCloseTo`.

Возможные значения:

- `true`, `Y`, `1` — KPI первого ответа выполнен
- `false`, `N`, `0` — KPI первого ответа не выполнен ||
|| **hasCrm**
[`boolean`](../../data-types.md) | Фильтр по наличию доступной связи с CRM.

Возможные значения:

- `true`, `Y`, `1` — есть доступная связь с CRM
- `false`, `N`, `0` — доступной связи с CRM нет ||
|| **waitAnswerFrom**
[`integer`](../../data-types.md) | Минимальное время до первого ответа, секунды ||
|| **waitAnswerTo**
[`integer`](../../data-types.md) | Максимальное время до первого ответа, секунды ||
|| **waitCloseFrom**
[`integer`](../../data-types.md) | Минимальное время до закрытия, секунды ||
|| **waitCloseTo**
[`integer`](../../data-types.md) | Максимальное время до закрытия, секунды ||
|| **order**
[`string`](../../data-types.md) | Поле сортировки.

Возможные значения:

- `dateCreate` — дата создания сессии
- `dateClose` — дата закрытия сессии
- `waitAnswer` — время до первого ответа
- `waitClose` — время до закрытия

По умолчанию: `dateCreate` ||
|| **orderDirection**
[`string`](../../data-types.md) | Направление сортировки.

Возможные значения:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: `desc` ||
|| **offset**
[`integer`](../../data-types.md) | Смещение для пагинации.

По умолчанию: `0` ||
|| **limit**
[`integer`](../../data-types.md) | Размер страницы.

Возможные значения: от `1` до `200`.

По умолчанию: `50` ||
|#

{% note info "" %}

Фильтры комбинируются логическим И.

Сортировки `dateClose`, `waitAnswer` и `waitClose` применяются только при полном периоде создания или закрытия, иначе метод сортирует по `dateCreate`.

Поля `voteHead` и `commentHead` в элементах `session` возвращаются как `null`, если тариф или права пользователя не позволяют видеть оценку руководителя. Фильтр `hasVoteHead` применяется только к линиям, где у пользователя есть право на оценку руководителя.

Поля `crmEntityType` и `crmEntityId` в элементах `session` возвращаются как `null`, если у пользователя нет права чтения связанного объекта CRM. Фильтр `hasCrm` учитывает только доступные пользователю связи с CRM.

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
        "status": "closed",
        "dateCreateFrom": "2026-06-01T00:00:00+03:00",
        "dateCreateTo": "2026-06-30T23:59:59+03:00",
        "limit": 50
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.v2.Session.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "configId": 3,
        "status": "closed",
        "dateCreateFrom": "2026-06-01T00:00:00+03:00",
        "dateCreateTo": "2026-06-30T23:59:59+03:00",
        "limit": 50,
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.v2.Session.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SessionListResult = {
      sessions: Array<{ id: number, configId: number, status: string }>
      hasNextPage: boolean
    }

    try {
      const response = await $b24.actions.v2.call.make<SessionListResult>({
        method: 'imopenlines.v2.Session.list',
        params: {
          configId: 3,
          status: 'closed',
          dateCreateFrom: '2026-06-01T00:00:00+03:00',
          dateCreateTo: '2026-06-30T23:59:59+03:00',
          limit: 50,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result.sessions)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getOpenlinesSessions() {
        try {
          const $b24 = await B24Js.initializeB24Frame()
          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.v2.Session.list',
            params: {
              configId: 3,
              status: 'closed',
              dateCreateFrom: '2026-06-01T00:00:00+03:00',
              dateCreateTo: '2026-06-30T23:59:59+03:00',
              limit: 50,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info(response.getData().result.sessions)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getOpenlinesSessions)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.call(
            "imopenlines.v2.Session.list",
            {
                "configId": 3,
                "status": "closed",
                "dateCreateFrom": "2026-06-01T00:00:00+03:00",
                "dateCreateTo": "2026-06-30T23:59:59+03:00",
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
                'imopenlines.v2.Session.list',
                [
                    'configId' => 3,
                    'status' => 'closed',
                    'dateCreateFrom' => '2026-06-01T00:00:00+03:00',
                    'dateCreateTo' => '2026-06-30T23:59:59+03:00',
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
        'imopenlines.v2.Session.list',
        {
            configId: 3,
            status: 'closed',
            dateCreateFrom: '2026-06-01T00:00:00+03:00',
            dateCreateTo: '2026-06-30T23:59:59+03:00',
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
        'imopenlines.v2.Session.list',
        [
            'configId' => 3,
            'status' => 'closed',
            'dateCreateFrom' => '2026-06-01T00:00:00+03:00',
            'dateCreateTo' => '2026-06-30T23:59:59+03:00',
            'limit' => 50,
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    res, err := client.Core().Call(ctx, "imopenlines.v2.Session.list", b24.Params{
    	"configId":        3,
    	"status":          "closed",
    	"dateCreateFrom":  "2026-06-01T00:00:00+03:00",
    	"dateCreateTo":    "2026-06-30T23:59:59+03:00",
    	"limit":           50,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("imopenlines.v2.Session.list: %w", err)
    }

    fmt.Println(string(res.Result))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "sessions": [
            {
                "id": 1024,
                "configId": 3,
                "source": "livechat",
                "operatorId": 42,
                "userId": 501,
                "userCode": "site_visitor_88a1",
                "chatId": 2048,
                "dateCreate": "2026-06-15T14:30:00+03:00",
                "dateClose": "2026-06-15T14:52:10+03:00",
                "dateFirstAnswer": "2026-06-15T14:31:05+03:00",
                "dateOperatorAnswer": "2026-06-15T14:31:05+03:00",
                "status": "closed",
                "closeReason": "operator",
                "vote": "like",
                "voteHead": 5,
                "commentHead": "Хорошая работа",
                "crmEntityType": "deal",
                "crmEntityId": 771,
                "queueTransfers": 1,
                "waitAnswer": 65,
                "waitClose": 1330,
                "kpiFirstAnswer": true,
                "messageCount": 14
            }
        ],
        "hasNextPage": false
    },
    "time": {
        "start": 1782810000,
        "finish": 1782810000.4,
        "duration": 0.4,
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
|| **result.sessions**
[`session[]`](./data-types.md#session) | Список сессий.

Все поля типа [`session`](./data-types.md#session) смотрите в разделе [Типы данных статистики открытых линий](./data-types.md#session) ||
|| **result.hasNextPage**
[`boolean`](../../data-types.md) | Признак следующей страницы ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "PERIOD_TOO_LARGE",
    "error_description": "The requested period exceeds the maximum of 1 year"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `TARIFF_RESTRICTION` | Statistics reports are not available on the current tariff plan | Тариф не позволяет использовать отчеты открытых линий ||
|| `400` | `INVALID_FILTER` | Invalid filter value | Передан некорректный фильтр, дата, порядок дат, сочетание `status` и `closeReason`, список больше 1000 элементов или `kpiFirstAnswer` без полного периода ||
|| `400` | `PERIOD_TOO_LARGE` | The requested period exceeds the maximum of 1 year | Период создания или закрытия больше 366 дней ||
|| `400` | `OFFSET_TOO_LARGE` | Offset is too large | `offset` больше `10000` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [imopenlines.v2.Session.Stat.get](./imopenlines-v2-session-stat-get.md)
- [imopenlines.v2.Session.Rating.list](./imopenlines-v2-session-rating-list.md)
- [imopenlines.v2.Session.Transfer.list](./imopenlines-v2-session-transfer-list.md)
- [Типы данных статистики открытых линий](./data-types.md)
