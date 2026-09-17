# Получить список коннекторов biconnector.connector.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

Метод `biconnector.connector.list` возвращает список коннекторов по фильтру.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и возвращает только те коннекторы, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

Размер страницы результатов — 50 записей. Метод не возвращает ни общее количество коннекторов, ни ссылку на следующую страницу, поэтому [обход списка](../index.md#pagination) строится по номеру страницы: выборка закончилась, когда в ответе пришло меньше 50 записей.

## Параметры метода

Все параметры необязательные: метод можно вызвать с пустым телом запроса.

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей, которые должны быть заполнены у коннекторов в выборке. Допустимые значения — названия полей из таблицы [элемента выборки](#connector) и `*`. Значение `["*"]` возвращает все поля, оно же используется по умолчанию ||
|| **filter**
[`object`](../../data-types.md) | Фильтр для выборки коннекторов. Пример формата:

```json
{
    "field_1": "value_1",
    "field_2": "value_2"
}
```

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра. Возможные значения префикса:

- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Список доступных полей для фильтрации можно узнать с помощью метода [biconnector.connector.fields](./biconnector-connector-fields.md).

Ключ `logic` задает, как объединяются условия фильтра:

- `AND` — коннектор попадает в выборку, если выполнены все условия. Используется по умолчанию
- `OR` — достаточно одного выполненного условия

Любое другое значение ключа `logic` приводит к ошибке `VALIDATION_INVALID_FILTER_LOGIC`. Группы условий можно вкладывать друг в друга.

```json
{
    "logic": "AND",
    "!description": "",
    "0": {
        "logic": "OR",
        "%=title": "MyConnector%",
        "@id": [9, 11]
    }
}
```
||
|| **order**
[`object`](../../data-types.md) | Параметры сортировки. Пример формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет произведена сортировка выборки коннекторов
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Без этого параметра сортировка не применяется и порядок записей в выборке не гарантирован.

Значение направления регистронезависимо, но других значений поле не принимает. Пустая строка, число или любое слово кроме `ASC` и `DESC` обрываются на уровне ORM: ответ приходит с HTTP-статусом **400** и ошибкой `ERROR_ARGUMENT` в корне, а не [внутри `result`](../index.md#errors), как остальные ошибки раздела
||
|| **page**
[`integer`](../../data-types.md) | Номер страницы результатов. Нумерация начинается с единицы, значение по умолчанию — 1. Нечисловое, нулевое или отрицательное значение ошибки не вызывает: метод молча отдает первую страницу. Параметр `start`, общий для большинства списочных методов REST API, здесь не работает ||
|#

Поле `settings` хранится как строка JSON, поэтому отбирать и сортировать коннекторы по отдельным параметрам настроек нельзя: фильтр и сортировка работают с этой строкой целиком.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список коннекторов, у которых:

- название начинается на `MyConnector`
- описание не пустое

Вернуть только нужные поля:

- идентификатор `id`
- название `title`
- эндпоинт для проверки доступности источника `urlCheck`
- дата создания `dateCreate`

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "select": [
                 "id",
                 "title",
                 "urlCheck",
                 "dateCreate"
             ],
             "filter": {
                 "%=title": "MyConnector%",
                 "!description": ""
             },
             "order": {
                 "dateCreate": "DESC"
             },
             "page": 1,
             "auth": "**put_access_token_here**"
             }' \
         https://**put_your_bitrix24_address**/rest/biconnector.connector.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Methods of this section put errors inside result and answer with HTTP 200
    type BiconnectorError = {
      error: {
        error: string
        error_description: string
      }
    }

    // Shape of each connector returned in result[]
    type ConnectorItem = {
      id: number
      title: string
      urlCheck: string
      dateCreate: string | null // Y-m-d H:i:s, not ISO 8601
    }

    try {
      // biconnector.connector.list returns a single page (max 50 records). The list helpers
      // ($b24.actions.v2.callList.make, fetchList.make) do not work here: this method uses
      // its own `page` navigation and returns neither `total` nor `next`. Walk the pages
      // yourself, increasing `page` until a response comes back with fewer than 50 records.
      const response = await $b24.actions.v2.call.make<ConnectorItem[] | BiconnectorError>({
        method: 'biconnector.connector.list',
        params: {
          select: [
            'id',
            'title',
            'urlCheck',
            'dateCreate',
          ],
          filter: {
            '%=title': 'MyConnector%',
            '!description': '',
          },
          order: {
            dateCreate: 'DESC',
          },
          page: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result

        // The SDK sees HTTP 200 as success, so check the error inside result yourself
        if (!Array.isArray(result)) {
          console.error(result.error.error, result.error.error_description)
        } else {
          console.info('Connectors:', result.length, result)
        }
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
      async function loadConnectorList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // biconnector.connector.list returns a single page (max 50 records). The list helpers
          // ($b24.actions.v2.callList.make, fetchList.make) do not work here: this method uses
          // its own `page` navigation and returns neither `total` nor `next`. Walk the pages
          // yourself, increasing `page` until a response comes back with fewer than 50 records.
          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.connector.list',
            params: {
              select: [
                'id',
                'title',
                'urlCheck',
                'dateCreate',
              ],
              filter: {
                '%=title': 'MyConnector%',
                '!description': '',
              },
              order: {
                dateCreate: 'DESC',
              },
              page: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result

          // The SDK sees HTTP 200 as success, so check the error inside result yourself
          if (result && result.error) {
            console.error(result.error.error, result.error.error_description)
            return
          }

          console.info('Connectors:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', loadConnectorList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.connector.list(
            select=[
                "id",
                "title",
                "urlCheck",
                "dateCreate",
            ],
            filter={
                "%=title": "MyConnector%",
                "!description": "",
            },
            order={
                "dateCreate": "DESC",
            },
            page=1,
        ).response
        result = bitrix_response.result

        # Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
        if isinstance(result, dict) and "error" in result:
            print(
                "Ошибка BIconnector",
                f"error: {result['error']['error']}",
                f"error_description: {result['error']['error_description']}",
                sep="\n",
            )
        else:
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
                'biconnector.connector.list',
                [
                    'select' => [
                        "id",
                        "title",
                        "urlCheck",
                        "dateCreate"
                    ],
                    'filter' => [
                        '%=title'      => "MyConnector%",
                        '!description' => ''
                    ],
                    'order' => [
                        'dateCreate' => "DESC"
                    ],
                    'page' => 1
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            $data = $result->data();

            // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
            if (isset($data['error'])) {
                echo 'BIconnector error: ' . $data['error']['error'] . ': ' . $data['error']['error_description'];
            } else {
                echo 'Data: ' . print_r($data, true);
            }
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling biconnector.connector.list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.connector.list',
        {
            select: [
                "id",
                "title",
                "urlCheck",
                "dateCreate"
            ],
            filter: {
                '%=title': "MyConnector%",
                '!description': ''
            },
            order: {
                dateCreate: "DESC"
            },
            page: 1
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            const data = result.data();

            // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
            if (data && data.error) {
                console.error(data.error.error, data.error.error_description);
                return;
            }

            console.info(data);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.connector.list',
        [
            'select' => [
                "id",
                "title",
                "urlCheck",
                "dateCreate"
            ],
            'filter' => [
                '%=title' => "MyConnector%",
                '!description' => ''
            ],
            'order' => [
                'dateCreate' => "DESC"
            ],
            'page' => 1
        ]
    );

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
    if (isset($result['result']['error'])) {
        echo 'BIconnector error: ' . $result['result']['error']['error']
            . ': ' . $result['result']['error']['error_description'];
    } else {
        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "biconnector.connector.list", b24.Params{
    	"select": []string{"id", "title", "urlCheck", "dateCreate"},
    	"filter": b24.Params{
    		"%=title":      "MyConnector%",
    		"!description": "",
    	},
    	"order": b24.Params{
    		"dateCreate": "DESC",
    	},
    	"page": 1,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("biconnector.connector.list: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.connector.list: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
    }

    var items []struct {
    	ID         b24.ID `json:"id"`
    	Title      string `json:"title"`
    	UrlCheck   string `json:"urlCheck"`
    	DateCreate string `json:"dateCreate"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Title)
    }

    // Total и Next этот метод не возвращает: постраничный обход
    // строится по параметру page, пока в ответе приходит 50 записей.
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "id": 11,
            "title": "MyConnector_2",
            "urlCheck": "https://new_example.com/check",
            "dateCreate": "2025-03-24 07:25:59"
        },
        {
            "id": 9,
            "title": "MyConnector",
            "urlCheck": "https://example.com/check",
            "dateCreate": "2025-03-21 12:22:32"
        }
    ],
    "time": {
        "start": 1742804947.923552,
        "finish": 1742804947.995446,
        "duration": 0.07189393043518066,
        "processing": 0.0017020702362060547,
        "date_start": "2025-03-24T08:29:07+00:00",
        "date_finish": "2025-03-24T08:29:07+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Корневой элемент ответа. Массив коннекторов без дополнительной обертки [(подробное описание)](#connector) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#connector}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор коннектора ||
|| **title**
[`string`](../../data-types.md) | Название коннектора ||
|| **logo**
[`string`](../../data-types.md) | URL логотипа или строка base64 ||
|| **description**
[`string`](../../data-types.md) | Описание коннектора ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки ||
|| **urlCheck**
[`string`](../../data-types.md) | [URL для проверки соединения](./index.md#urlCheck) ||
|| **urlData**
[`string`](../../data-types.md) | [URL для получения данных](./index.md#urlData) ||
|| **urlTableList**
[`string`](../../data-types.md) | [URL для списка таблиц](./index.md#urlTableList) ||
|| **urlTableDescription**
[`string`](../../data-types.md) | [URL для описания таблицы](./index.md#urlTableDescription) ||
|| **settings**
[`array`](../../data-types.md) | Параметры авторизации коннектора. Структура элемента — в разделе [Поле settings](./index.md#settings). Значения параметров хранит источник, коннектор возвращает только их описание ||
|| **supportMapping**
[`boolean`](../../data-types.md) | Поддержка сопоставления полей таблицы с полями внешней системы ||
|| **sourceCode**
[`string`](../../data-types.md) | Символьный код внешней системы ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания коннектора в формате `Y-m-d H:i:s` ||
|#

Если задан параметр `select`, в элементах остаются только перечисленные поля.

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "result": {
        "error": {
            "error": "VALIDATION_SELECT_TYPE",
            "error_description": "Parameter \"select\" must be array."
        }
    }
}
```

{% note warning "" %}

Метод возвращает ошибку [внутри поля `result`](../index.md#errors) и с HTTP-статусом 200. Проверяйте `result.error`: обертки SDK разбирают только верхний уровень ответа и такую ошибку считают успехом

{% endnote %}

Одна ошибка метода приходит иначе. Если в параметре `order` передать направление сортировки, отличное от `ASC` и `DESC`, запрос обрывается на уровне ORM: ответ получает HTTP-статус **400**, а код ошибки лежит в корне, а не внутри `result`.

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Invalid order \"UPWARDS\""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | Access denied. | Нет одного из двух прав, либо метод вызван вебхуком или вне контекста приложения ||
|| `VALIDATION_SELECT_TYPE` | Parameter "select" must be array. | Параметр `select` должен быть массивом ||
|| `VALIDATION_FILTER_TYPE` | Parameter "filter" must be array. | Параметр `filter` должен быть массивом ||
|| `VALIDATION_ORDER_TYPE` | Parameter "order" must be array. | Параметр `order` должен быть массивом ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_SELECT` | Field "#TITLE#" is not allowed in the "select". | Данные поля недопустимы в выборке ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_FILTER` | Field "#TITLE#" is not allowed in the "filter". | Данные поля недопустимы в фильтре ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_ORDER` | Field "#TITLE#" is not allowed in the "order". | Данные поля недопустимы для сортировки ||
|| `VALIDATION_INVALID_FILTER_LOGIC` | Field "logic" must be either "AND" or "OR". | Поле `logic` может иметь значение только "AND" или "OR" ||
|| `ERROR_ARGUMENT` | Invalid order "#VALUE#". | Направление сортировки в `order` отличается от `ASC` и `DESC`. Вместо `#VALUE#` подставляется переданное значение в верхнем регистре. Единственная ошибка метода с HTTP-статусом 400: код приходит в корне ответа, а не внутри `result` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-connector-add.md)
- [{#T}](./biconnector-connector-update.md)
- [{#T}](./biconnector-connector-get.md)
- [{#T}](./biconnector-connector-delete.md)
- [{#T}](./biconnector-connector-fields.md)
