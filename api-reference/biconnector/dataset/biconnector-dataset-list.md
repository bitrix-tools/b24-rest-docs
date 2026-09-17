# Получить список датасетов biconnector.dataset.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [biconnector.table.list](../table/biconnector-table-list.md).

{% endnote %}

Метод `biconnector.dataset.list` возвращает список датасетов по фильтру.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и возвращает только те датасеты, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

## Параметры метода

Все параметры необязательные: метод можно вызвать с пустым телом запроса.

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей, которые должны быть заполнены у датасетов в выборке. Допустимые значения — названия полей из схемы метода [biconnector.dataset.fields](./biconnector-dataset-fields.md) и `*`. По умолчанию берутся все поля, допустимо и явное `select: ["*"]`.

Поля `csvDelimiter`, `csvEncoding` и `csvHasHeaders` в схему не входят: в ответе они приходят, но в `select` вызовут ошибку `VALIDATION_FIELD_NOT_ALLOWED_IN_SELECT`.

Единственный метод семейства, который отдает `sourceId`: в `select` это поле работает. Поле `fields` не поддерживается и будет проигнорировано ||
|| **filter**
[`object`](../../data-types.md) | Фильтр для выборки датасетов. Пример формата:

```json
{
    "field_1": "value_1",
    "field_2": "value_2"
}
```

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:

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

Список доступных полей для фильтрации можно узнать с помощью метода [biconnector.dataset.fields](./biconnector-dataset-fields.md).

Ключ `logic` задает, как объединяются условия фильтра:

- `AND` — датасет попадает в выборку, если выполнены все условия. Используется по умолчанию
- `OR` — достаточно одного выполненного условия

Любое другое значение ключа `logic` приводит к ошибке `VALIDATION_INVALID_FILTER_LOGIC`. Группы условий можно вкладывать друг в друга.

Фильтр не поддерживает поле `fields`, оно будет проигнорировано
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

где:

- `field_n` — название поля, по которому будет произведена сортировка выборки датасетов
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Без этого параметра сортировка не применяется и порядок записей в выборке не гарантирован.

Значение направления регистронезависимо, но других значений поле не принимает. Пустая строка, число или любое слово кроме `ASC` и `DESC` обрываются на уровне ORM: ответ приходит с HTTP-статусом **400** и ошибкой `ERROR_ARGUMENT` в корне, а не [внутри `result`](../index.md#errors), как остальные ошибки раздела
||
|| **page**
[`integer`](../../data-types.md) | Номер страницы выборки, нумерация начинается с единицы, значение по умолчанию — 1. Размер страницы фиксированный — 50 записей. Нечисловое, нулевое или отрицательное значение ошибки не вызывает: метод молча отдает первую страницу. Метод не возвращает ни общее количество датасетов, ни ссылку на следующую страницу, поэтому признак конца выборки один: страница вернулась короче 50 элементов, [подробнее о навигации](../index.md#pagination) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список датасетов, у которых:

- название начинается на `sales`
- описание не пустое
- идентификатор источника равен `2` или `4`

Вернуть только нужные поля:

- идентификатор `id`
- название `name`
- описание `description`

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "select": ["id", "name", "description"],
        "filter": {
            "%=name": "sales%",
            "!description": "",
            "@sourceId": [2, 4]
        },
        "order": {
            "dateCreate": "DESC"
        },
        "page": 1,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/biconnector.dataset.list
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

    // Shape of each DatasetItem returned in result[]
    type DatasetItem = {
      id: number
      name: string
      description: string
    }

    try {
      // biconnector.dataset.list returns a single page (max 50 records). The list helpers
      // ($b24.actions.v2.callList.make, fetchList.make) do not work here: this method uses
      // its own `page` navigation and returns neither `total` nor `next`. Walk the pages
      // yourself, increasing `page` until a response comes back with fewer than 50 records.
      const response = await $b24.actions.v2.call.make<DatasetItem[] | BiconnectorError>({
        method: 'biconnector.dataset.list',
        params: {
          select: ['id', 'name', 'description'],
          filter: {
            '%=name': 'sales%',
            '!description': '',
            '@sourceId': [2, 4],
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
          console.info('Datasets page:', result.length, result)
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
      async function listDatasets() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // biconnector.dataset.list returns a single page (max 50 records). The list helpers
          // ($b24.actions.v2.callList.make, fetchList.make) do not work here: this method uses
          // its own `page` navigation and returns neither `total` nor `next`. Walk the pages
          // yourself, increasing `page` until a response comes back with fewer than 50 records.
          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.dataset.list',
            params: {
              select: ['id', 'name', 'description'],
              filter: {
                '%=name': 'sales%',
                '!description': '',
                '@sourceId': [2, 4],
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

          console.info('Datasets page:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listDatasets)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.dataset.list(
            select=[
                "id",
                "name",
                "description",
            ],
            filter={
                "%=name": "sales%",
                "!description": "",
                "@sourceId": [
                    2,
                    4,
                ],
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
                'biconnector.dataset.list',
                [
                    'select' => ["id", "name", "description"],
                    'filter' => [
                        '%=name'      => "sales%",
                        '!description' => "",
                        "@sourceId"   => [2, 4]
                    ],
                    'order'  => [
                        'dateCreate' => "DESC"
                    ],
                    'page'   => 1
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
        echo 'Error calling biconnector.dataset.list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.dataset.list',
        {
            select: ["id", "name", "description"],
            filter: {
                '%=name': "sales%",
                '!description': "",
                "@sourceId": [2, 4]
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
        'biconnector.dataset.list',
        [
            'select' => ["id", "name", "description"],
            'filter' => ['%=name' => "sales%", '!description' => "", '@sourceId' => [2, 4]],
            'order' => ['dateCreate' => "DESC"],
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
    res, err := client.Core().Call(ctx, "biconnector.dataset.list", b24.Params{
    	"select": []string{"id", "name", "description"},
    	"filter": b24.Params{
    		"%=name":       "sales%",
    		"!description": "",
    		"@sourceId":    []int{2, 4},
    	},
    	"order": b24.Params{
    		"dateCreate": "DESC",
    	},
    	"page": 1,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("biconnector.dataset.list: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.dataset.list: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
    }

    var items []struct {
    	ID          b24.ID `json:"id"`
    	Name        string `json:"name"`
    	Description string `json:"description"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Name)
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
            "id": 9,
            "name": "sales_data_main",
            "description": "Monthly sales report"
        },
        {
            "id": 6,
            "name": "sales_data_first_filial",
            "description": "Monthly sales report for first filial"
        },
        {
            "id": 5,
            "name": "sales_data_second_filial",
            "description": "Monthly sales report for second filial"
        }
    ],
    "time": {
        "start": 1743061675.963969,
        "finish": 1743061676.064591,
        "duration": 0.10062193870544434,
        "processing": 0.011152029037475586,
        "date_start": "2025-03-27T07:47:55+00:00",
        "date_finish": "2025-03-27T07:47:56+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Корневой элемент ответа. Плоский массив датасетов без дополнительной обертки [(подробное описание)](#dataset) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#dataset}

Элемент выборки — тот же датасет, что возвращает [biconnector.dataset.get](./biconnector-dataset-get.md), но без массива `fields` и с дополнительным ключом `sourceId`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор датасета ||
|| **sourceId**
[`integer`](../../data-types.md) | Идентификатор источника, к которому привязан датасет. Из методов семейства это поле возвращает только `biconnector.dataset.list` ||
|| **type**
[`string`](../../data-types.md) | Тип датасета. У датасетов, созданных через REST API, значение всегда равно `rest` ||
|| **name**
[`string`](../../data-types.md) | Название датасета ||
|| **description**
[`string`](../../data-types.md) | Описание датасета ||
|| **externalCode**
[`string`](../../data-types.md) | Внешний код датасета — имя, под которым его знает приложение ||
|| **externalName**
[`string`](../../data-types.md) | Внешнее имя датасета ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания датасета в формате `Y-m-d H:i:s` ||
|| **dateUpdate**
[`datetime`](../../data-types.md) | Дата обновления датасета в формате `Y-m-d H:i:s`. У датасета, который ни разу не обновляли, значение `null` ||
|| **createdById**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего датасет ||
|| **updatedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, обновившего датасет. У датасета, который ни разу не обновляли, значение `0` ||
|| **externalId**
[`integer`](../../data-types.md) | Идентификатор датасета BI-Конструктора, созданного вместе с объектом методом [biconnector.dataset.add](./biconnector-dataset-add.md). У объектов, созданных методом [biconnector.table.add](../table/biconnector-table-add.md), значение всегда `0` ||
|| **csvDelimiter**
[`string`](../../data-types.md) | Разделитель колонок в CSV-файле. У датасетов REST-источника приходит пустой строкой ||
|| **csvEncoding**
[`string`](../../data-types.md) | Кодировка CSV-файла. У датасетов REST-источника приходит пустой строкой ||
|| **csvHasHeaders**
[`boolean`](../../data-types.md) | Признак того, что первая строка CSV-файла — заголовки колонок. У датасетов REST-источника приходит значением `false` ||
|#

Так выглядит элемент, когда метод вызван без `select`:

```json
{
    "id": 27,
    "type": "rest",
    "name": "sales_orders",
    "description": "Заказы из внешнего сервиса",
    "externalCode": "sales_orders",
    "externalName": "Sales orders",
    "dateCreate": "2026-09-16 12:00:46",
    "dateUpdate": null,
    "createdById": 1,
    "updatedById": 0,
    "externalId": 31,
    "csvDelimiter": "",
    "csvEncoding": "",
    "csvHasHeaders": false,
    "sourceId": 3
}
```

{% note warning "" %}

Не перечисляйте в `select` поля с датами — `dateCreate` и `dateUpdate`. При точечном выборе дата не форматируется и вместо строки приходит пустой объект `{}`. Чтобы получить даты, вызывайте метод без `select` или с `select: ["*"]`

{% endnote %}

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
- [{#T}](./biconnector-dataset-add.md)
- [{#T}](./biconnector-dataset-update.md)
- [{#T}](./biconnector-dataset-get.md)
- [{#T}](./biconnector-dataset-delete.md)
- [{#T}](./biconnector-dataset-fields-update.md)
- [{#T}](./biconnector-dataset-fields.md)
