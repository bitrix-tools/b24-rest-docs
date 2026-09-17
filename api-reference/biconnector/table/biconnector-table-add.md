# Создать таблицу biconnector.table.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

Метод `biconnector.table.add` создает новую таблицу, связанную с источником данных.

Созданная таблица сразу появляется в BI-Конструкторе, в разделе «Рабочее место аналитика > Таблицы». Метод делает ровно то же, что и создание таблицы вручную в интерфейсе: сохраняет таблицу, ее поля и связь с источником.

{% note info "" %}

Метод не создает датасет для отчетов: датасеты — отдельные объекты BI-Конструктора и через REST API не создаются. Чем таблица отличается от датасета — в разделе [Таблица и датасет — разные объекты](./index.md#table-vs-dataset)

{% endnote %}

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и только с источниками, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий данные для создания новой таблицы. Формат объекта:

```
{
    "field_1": "value_1",
    "field_2": "value_2",
    ...,
    "field_n": "value_n"
}
```

- `field_n` — название поля
- `value_n` — значение поля

[Подробное описание ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название таблицы. Название должно начинаться с буквы, можно использовать только строчные латинские буквы `a-z`, цифры и знак `_`. Максимальная длина названия 230 символов ||
|| **externalName***
[`string`](../../data-types.md) | Название таблицы во внешнем источнике, в приложении. Максимальная длина 512 символов ||
|| **externalCode***
[`string`](../../data-types.md) | Уникальный код таблицы во внешнем источнике, используется при выборке данных. Максимальная длина 512 символов ||
|| **sourceId***
[`integer`](../../data-types.md) | Идентификатор источника, можно получить методами [biconnector.source.list](../source/biconnector-source-list.md) или [biconnector.source.add](../source/biconnector-source-add.md). Источник должен принадлежать коннектору текущего приложения, иначе метод вернет `SOURCE_NOT_FOUND` ||
|| **description**
[`string`](../../data-types.md) | Описание таблицы ||
|| **fields***
[`array`](../../data-types.md) | Массив колонок таблицы [(подробное описание)](#field) ||
|#

### Элемент массива fields {#field}

Каждый элемент массива `fields` — объект с тремя обязательными полями. Видимость колонки при создании не задается: все колонки создаются видимыми, скрыть их можно потом методом [biconnector.table.fields.update](./biconnector-table-fields-update.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название колонки. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `A-Z`, цифры и знак `_`. Максимальная длина названия 32 символа ||
|| **externalCode***
[`string`](../../data-types.md) | Внешний код колонки — имя, под которым колонку знает приложение. Именно его Битрикс24 передает в запросе данных ||
|| **type***
[`string`](../../data-types.md) | Тип данных колонки. Допустимые значения:
`int` — число целое
`string` — строка
`double` — число дробное, разделитель точка
`date` — дата, формат `Y-m-d`
`datetime` — дата со временем, формат `Y-m-d H:i:s`
`money` — денежное значение, хранится как число, валюта не сохраняется
`timezone` — идентификатор часового пояса

Значение регистрозависимо: `INT` в верхнем регистре вызовет ошибку `VALIDATION_FIELD_INVALID_TYPE` ||
|#

Названия колонок и внешние коды не должны повторяться внутри одного запроса: на повтор `name` метод вернет ошибку `DUPLICATE_FIELDS`, на повтор `externalCode` — `VALIDATION_DUPLICATE_FIELD_CODE`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "fields": {
            "sourceId": 3,
            "name": "sales_orders",
            "externalName": "Sales orders",
            "externalCode": "sales_orders",
            "description": "Описание таблицы",
            "fields": [
                { "type": "int", "name": "ID", "externalCode": "ID" },
                { "type": "string", "name": "NAME", "externalCode": "NAME" },
                { "type": "string", "name": "SURNAME", "externalCode": "SURNAME" },
                { "type": "double", "name": "SCORE", "externalCode": "SCORE" },
                { "type": "date", "name": "DATA", "externalCode": "DATA" },
                { "type": "datetime", "name": "TIME", "externalCode": "TIME" }
            ]
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/biconnector.table.add
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

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TableAddResult = {
      id: number
    }

    try {
      const response = await $b24.actions.v2.call.make<TableAddResult | BiconnectorError>({
        method: 'biconnector.table.add',
        params: {
          fields: {
            sourceId: 3,
            name: 'sales_orders',
            externalName: 'Sales orders',
            externalCode: 'sales_orders',
            description: 'Table description',
            fields: [
              { type: 'int', name: 'ID', externalCode: 'ID' },
              { type: 'string', name: 'NAME', externalCode: 'NAME' },
              { type: 'string', name: 'SURNAME', externalCode: 'SURNAME' },
              { type: 'double', name: 'SCORE', externalCode: 'SCORE' },
              { type: 'date', name: 'DATA', externalCode: 'DATA' },
              { type: 'datetime', name: 'TIME', externalCode: 'TIME' },
            ],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result

        // The SDK sees HTTP 200 as success, so check the error inside result yourself
        if ('error' in result) {
          console.error(result.error.error, result.error.error_description)
        } else {
          console.info('Created table id:', result.id)
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
      async function addTable() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.table.add',
            params: {
              fields: {
                sourceId: 3,
                name: 'sales_orders',
                externalName: 'Sales orders',
                externalCode: 'sales_orders',
                description: 'Table description',
                fields: [
                  { type: 'int', name: 'ID', externalCode: 'ID' },
                  { type: 'string', name: 'NAME', externalCode: 'NAME' },
                  { type: 'string', name: 'SURNAME', externalCode: 'SURNAME' },
                  { type: 'double', name: 'SCORE', externalCode: 'SCORE' },
                  { type: 'date', name: 'DATA', externalCode: 'DATA' },
                  { type: 'datetime', name: 'TIME', externalCode: 'TIME' },
                ],
              },
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

          console.info('Created table id:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTable)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        # В b24pysdk нет готовой обертки для biconnector.table.*, поэтому метод
        # вызывается напрямую через bitrix_token.call_method()
        response = bitrix_token.call_method(
            api_method="biconnector.table.add",
            params={
                "fields": {
                    "sourceId": 3,
                    "name": "sales_orders",
                    "externalName": "Sales orders",
                    "externalCode": "sales_orders",
                    "description": "Table description",
                    "fields": [
                        {"type": "int", "name": "ID", "externalCode": "ID"},
                        {"type": "string", "name": "NAME", "externalCode": "NAME"},
                        {"type": "string", "name": "SURNAME", "externalCode": "SURNAME"},
                        {"type": "double", "name": "SCORE", "externalCode": "SCORE"},
                        {"type": "date", "name": "DATA", "externalCode": "DATA"},
                        {"type": "datetime", "name": "TIME", "externalCode": "TIME"},
                    ],
                },
            },
        )
        result = response["result"]

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
                'biconnector.table.add',
                [
                    'fields' => [
                        'sourceId'      => 3,
                        'name'          => 'sales_orders',
                        'externalName'  => 'Sales orders',
                        'externalCode'  => 'sales_orders',
                        'description'   => 'Описание таблицы',
                        'fields'        => [
                            ['type' => 'int', 'name' => 'ID', 'externalCode' => 'ID'],
                            ['type' => 'string', 'name' => 'NAME', 'externalCode' => 'NAME'],
                            ['type' => 'string', 'name' => 'SURNAME', 'externalCode' => 'SURNAME'],
                            ['type' => 'double', 'name' => 'SCORE', 'externalCode' => 'SCORE'],
                            ['type' => 'date', 'name' => 'DATA', 'externalCode' => 'DATA'],
                            ['type' => 'datetime', 'name' => 'TIME', 'externalCode' => 'TIME'],
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            $data = $result->data();

            // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
            if (isset($data['error'])) {
                echo 'BIconnector error: ' . $data['error']['error'] . ': ' . $data['error']['error_description'];
            } else {
                echo 'Success: ' . print_r($data, true);
            }
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding table: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.table.add',
        {
            fields: {
                "sourceId": 3,
                "name": "sales_orders",
                "externalName": "Sales orders",
                "externalCode": "sales_orders",
                "description": "Описание таблицы",
                "fields": [
                    { "type": "int", "name": "ID", "externalCode": "ID" },
                    { "type": "string", "name": "NAME", "externalCode": "NAME" },
                    { "type": "string", "name": "SURNAME", "externalCode": "SURNAME" },
                    { "type": "double", "name": "SCORE", "externalCode": "SCORE" },
                    { "type": "date", "name": "DATA", "externalCode": "DATA" },
                    { "type": "datetime", "name": "TIME", "externalCode": "TIME" }
                ]
            }
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
        'biconnector.table.add',
        [
            'fields' => [
                'sourceId' => 3,
                'name' => 'sales_orders',
                'externalName' => 'Sales orders',
                'externalCode' => 'sales_orders',
                'description' => 'Описание таблицы',
                'fields' => [
                    [ 'type' => 'int', 'name' => 'ID', 'externalCode' => 'ID' ],
                    [ 'type' => 'string', 'name' => 'NAME', 'externalCode' => 'NAME' ],
                    [ 'type' => 'string', 'name' => 'SURNAME', 'externalCode' => 'SURNAME' ],
                    [ 'type' => 'double', 'name' => 'SCORE', 'externalCode' => 'SCORE' ],
                    [ 'type' => 'date', 'name' => 'DATA', 'externalCode' => 'DATA' ],
                    [ 'type' => 'datetime', 'name' => 'TIME', 'externalCode' => 'TIME' ]
                ]
            ]
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
    res, err := client.Core().Call(ctx, "biconnector.table.add", b24.Params{
    	"fields": b24.Params{
    		"sourceId":     3,
    		"name":         "sales_orders",
    		"externalName": "Sales orders",
    		"externalCode": "sales_orders",
    		"description":  "Описание таблицы",
    		"fields": []b24.Params{
    			{
    				"type":         "int",
    				"name":         "ID",
    				"externalCode": "ID",
    			},
    			{
    				"type":         "string",
    				"name":         "NAME",
    				"externalCode": "NAME",
    			},
    			{
    				"type":         "string",
    				"name":         "SURNAME",
    				"externalCode": "SURNAME",
    			},
    			{
    				"type":         "double",
    				"name":         "SCORE",
    				"externalCode": "SCORE",
    			},
    			{
    				"type":         "date",
    				"name":         "DATA",
    				"externalCode": "DATA",
    			},
    			{
    				"type":         "datetime",
    				"name":         "TIME",
    				"externalCode": "TIME",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("biconnector.table.add: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.table.add: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
    }

    var item struct {
    	ID b24.ID `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
      "id": 10
    },
    "time": {
        "start": 1725013197.635808,
        "finish": 1725013198.580873,
        "duration": 0.9450650215148926,
        "processing": 0.6822988986968994,
        "date_start": "2024-08-30T12:19:57+02:00",
        "date_finish": "2024-08-30T12:19:58+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор созданной таблицы. Используйте его в методах [biconnector.table.get](./biconnector-table-get.md), [biconnector.table.update](./biconnector-table-update.md) и [biconnector.table.fields.update](./biconnector-table-fields-update.md) ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "result": {
        "error": {
            "error": "VALIDATION_FIELDS_NOT_PROVIDED",
            "error_description": "Fields not provided."
        }
    }
}
```

{% note warning "" %}

Метод возвращает ошибку [внутри поля `result`](../index.md#errors) и с HTTP-статусом 200. Проверяйте `result.error`: обертки SDK разбирают только верхний уровень ответа и такую ошибку считают успехом

{% endnote %}

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | Access denied. | Нет одного из двух прав, либо метод вызван вебхуком или вне контекста приложения ||
|| `VALIDATION_FIELDS_NOT_PROVIDED` | Fields not provided. | Поля не переданы в запросе ||
|| `VALIDATION_UNKNOWN_PARAMETERS` | Unknown parameters: #LIST_OF_PARAMS# | Обнаружены неизвестные параметры: перечень ||
|| `VALIDATION_REQUIRED_FIELD_MISSING` | Field "#TITLE#" is required. | Обязательное поле #TITLE# не передано ||
|| `VALIDATION_READ_ONLY_FIELD` | Field "#TITLE#" is read only. | Поле #TITLE# доступно только для чтения и не может быть изменено ||
|| `VALIDATION_INVALID_FIELD_TYPE` | Field "#TITLE#" must be of type #TYPE#. | Поле #TITLE# должно быть типа #TYPE# ||
|| `SOURCE_NOT_FOUND` | Source was not found. | Источника нет или он принадлежит другому приложению ||
|| `DATASET_ALREADY_EXIST` | Table with this name already exists. | Имя занято таблицей, которая уже есть в самом BI-Конструкторе ||
|| `NAME_EXISTS` | A table named "#NAME#" already exists. | Название #NAME# уже занято другой таблицей Битрикс24. Имя проверяется по всему Битрикс24, а не в пределах источника ||
|| `FIELDS_EMPTY` | $fields is empty | Передан пустой массив `fields` ||
|| `DUPLICATE_FIELDS` | Duplicate column names: #FIELD_NAMES#. | В параметре `name` полей есть повторы: перечень ||
|| `VALIDATION_DATASET_NAME_INVALID` | Dataset name has to start with a lowercase Latin character. Possible entry includes lowercase Latin characters (a-z), numbers (0-9) and underscores. | Неправильный формат названия таблицы. Название должно начинаться с буквы, можно использовать только строчные латинские буквы `a-z`, цифры и знак `_` ||
|| `VALIDATION_DATASET_NAME_TOO_LONG` | Dataset name must not exceed 230 characters. | Название таблицы не должно превышать 230 символов ||
|| `VALIDATION_DUPLICATE_FIELD_CODE` | Duplicate values found in the "code" parameter: #LIST_CODES# | Обнаружены дубликаты в параметре `externalCode` полей таблицы ||
|| `VALIDATION_FIELD_MISSING_REQUIRED_PARAMETERS` | Field must include the required parameters: "name", "externalCode" and "type". | Поле должно включать параметры `name`, `externalCode` и `type` ||
|| `VALIDATION_FIELD_NAME_INVALID_FORMAT` | Field "name" has to start with an uppercase Latin character. Possible entry includes uppercase Latin characters (A-Z), numbers (0-9) and underscores. | Неправильный формат названия поля. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `A-Z`, цифры и знак `_` ||
|| `VALIDATION_FIELD_NAME_TOO_LONG` | Field "name" must not exceed 32 characters. | Название поля не должно превышать 32 символа ||
|| `VALIDATION_FIELD_INVALID_TYPE` | Invalid field type. | Некорректный тип поля ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-table-update.md)
- [{#T}](./biconnector-table-get.md)
- [{#T}](./biconnector-table-list.md)
- [{#T}](./biconnector-table-delete.md)
- [{#T}](./biconnector-table-fields-update.md)
- [{#T}](./biconnector-table-fields.md)
