# Получить список обзвонов crm.calllist.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.calllist.list` возвращает список обзвонов: идентификатор, дату создания, автора, CRM-форму и тип участников.

Администратор получит все обзвоны Битрикс24, остальные пользователи — только созданные ими.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SELECT**
[`array`](../../data-types.md) | Массив полей для выборки. По умолчанию возвращаются все поля.
Список полей для выборки:
- `ID`
- `DATE_CREATE`
- `CREATED_BY_ID`
- `WEBFORM_ID`
- `ENTITY_TYPE_ID` ||
|| **FILTER**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет отфильтрована выборка обзвонов
- `value_n` — значение фильтра

Список полей для фильтрации:
- `ID`
- `CREATED_BY_ID`
- `WEBFORM_ID`
- `ENTITY_TYPE_ID`

Полю может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `=` — равно, точное совпадение, используется по умолчанию

Другие префиксы, например `!` и `!=`, метод не принимает и возвращает ошибку `ERROR_ARGUMENT` ||
|| **ORDER**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет произведена сортировка обзвонов
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список полей для сортировки:
- `ID`
- `DATE_CREATE`
- `CREATED_BY_ID`
- `WEBFORM_ID`
- `ENTITY_TYPE_ID` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Метод не возвращает `total` и `next`. Запрашивайте следующие страницы, пока в ответе не придет меньше 50 записей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"SELECT":["ID","CREATED_BY_ID"],"FILTER":{"ENTITY_TYPE_ID":3},"ORDER":{"ID":"DESC"}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.calllist.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"SELECT":["ID","CREATED_BY_ID"],"FILTER":{"ENTITY_TYPE_ID":3},"ORDER":{"ID":"DESC"},"auth":"**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/crm.calllist.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each item returned in result[]
    type CallListItem = {
      ID: string
      CREATED_BY_ID: string
    }

    // crm.calllist.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    try {
      const response = await $b24.actions.v2.call.make<CallListItem[]>({
        method: 'crm.calllist.list',
        params: {
          SELECT: ['ID', 'CREATED_BY_ID'],
          FILTER: { ENTITY_TYPE_ID: 3 },
          ORDER: { ID: 'DESC' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Call lists fetched:', result.length, result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function fetchCallLists() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.calllist.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.calllist.list',
            params: {
              SELECT: ['ID', 'CREATED_BY_ID'],
              FILTER: { ENTITY_TYPE_ID: 3 },
              ORDER: { ID: 'DESC' },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Call lists fetched:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchCallLists)
    </script>
    ```

- Python

    Пример

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.calllist.list(
            select=[
                "ID",
                "CREATED_BY_ID",
            ],
            filter={
                "ENTITY_TYPE_ID": 3,
            },
            order={
                "ID": "DESC",
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

    Пример `as_list`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.calllist.list(
            select=[
                "ID",
                "CREATED_BY_ID",
            ],
            filter={
                "ENTITY_TYPE_ID": 3,
            },
            order={
                "ID": "DESC",
            },
        ).as_list().response
        result = bitrix_response.result
        for item in result:
            print(item)
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
                'crm.calllist.list',
                [
                    'SELECT' => ['ID', 'CREATED_BY_ID'],
                    'FILTER' => ['ENTITY_TYPE_ID' => 3],
                    'ORDER'  => ['ID' => 'DESC'],
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
        echo 'Error fetching call list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.calllist.list",
        {
            SELECT: ["ID", "CREATED_BY_ID"],
            FILTER: { "ENTITY_TYPE_ID": 3 },
            ORDER: { "ID": "DESC" }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.calllist.list',
        [
            'SELECT' => ['ID', 'CREATED_BY_ID'],
            'FILTER' => ['ENTITY_TYPE_ID' => 3],
            'ORDER' => ['ID' => 'DESC']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.calllist.list", b24.Params{
    	"SELECT": []string{"ID", "CREATED_BY_ID"},
    	"FILTER": map[string]any{"ENTITY_TYPE_ID": 3},
    	"ORDER":  map[string]string{"ID": "DESC"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.calllist.list: %w", err)
    }

    var items []struct {
    	ID          b24.ID `json:"ID"`
    	CreatedByID b24.ID `json:"CREATED_BY_ID"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.CreatedByID)
    }

    // crm.calllist.list не возвращает total и next: следующую страницу
    // запрашивайте с start = 50, 100 и так далее, пока не придет меньше 50 записей.
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "13",
            "CREATED_BY_ID": "29"
        },
        {
            "ID": "9",
            "CREATED_BY_ID": "1"
        },
        {
            "ID": "3",
            "CREATED_BY_ID": "131"
        },
        {
            "ID": "1",
            "CREATED_BY_ID": "131"
        }
    ],
    "time": {
        "start": 1752475786.965766,
        "finish": 1752475787.035008,
        "duration": 0.06924200057983398,
        "processing": 0.016666889190673828,
        "date_start": "2025-07-14T09:49:46+03:00",
        "date_finish": "2025-07-14T09:49:47+03:00",
        "operating_reset_at": 1752476387,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив обзвонов [(подробное описание)](#result). Набор полей зависит от параметра `SELECT` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

Числовые значения приходят строками.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор обзвона ||
|| **DATE_CREATE**
[`string`](../../data-types.md) | Дата и время создания в формате `ГГГГ-ММ-ДД ЧЧ:ММ:СС` ||
|| **CREATED_BY_ID**
[`string`](../../data-types.md) | Идентификатор пользователя, который создал обзвон ||
|| **WEBFORM_ID**
[`string`](../../data-types.md) | Идентификатор CRM-формы обзвона. Если форма не прикреплена — `null` ||
|| **ENTITY_TYPE_ID**
[`string`](../../data-types.md) | Идентификатор типа участников: `3` — контакты, `4` — компании ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Select field not allowed: TITLE"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | `Select field not allowed: FIELD`, `Filter field not allowed: FIELD`, `Order field not allowed: FIELD` | В `SELECT`, `FILTER` или `ORDER` передано поле не из списка доступных ||
|| `400` | `ERROR_ARGUMENT` | `Filter operation not allowed: !=` | В `FILTER` передан неподдерживаемый префикс ||
|| `400` | `ERROR_ARGUMENT` | `The filter is not an array.` | `FILTER` передан не объектом ||
|| `400` | `ERROR_ARGUMENT` | `The order is not an array.` | `ORDER` передан не объектом ||
|| `400` | `ERROR_ARGUMENT` | `Order direction should be one of {ASC\|DESC}` | В `ORDER` передано направление, отличное от `ASC` и `DESC` ||
|| `400` | `ERROR_ARGUMENT` | `Order value should be a field name or a direction` | В `ORDER` передано значение, которое не является строкой ||
|| `400` | `ERROR_ARGUMENT` | `Select should be a list of field names` | `SELECT` передан не списком имен полей ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-add.md)
- [{#T}](./crm-calllist-get.md)
- [{#T}](./crm-calllist-items-get.md)
- [{#T}](./crm-calllist-statuslist.md)
- [{#T}](./crm-calllist-update.md)
- [{#T}](./index.md)