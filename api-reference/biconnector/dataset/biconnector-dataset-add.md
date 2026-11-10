# Создать датасет biconnector.dataset.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [biconnector.table.add](../table/biconnector-table-add.md).

{% endnote %}

Метод `biconnector.dataset.add` создает новый датасет, связанный с источником данных.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и только с источниками, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий данные для создания нового датасета. Формат объекта:

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
[`string`](../../data-types.md) | Название датасета. Название должно начинаться с буквы, можно использовать только строчные латинские буквы `a-z`, цифры и знак `_`. Максимальная длина названия 230 символов ||
|| **externalName***
[`string`](../../data-types.md) | Название датасета во внешнем источнике, в приложении. Максимальная длина 512 символов ||
|| **externalCode***
[`string`](../../data-types.md) | Уникальный код датасета во внешнем источнике, используется при выборке данных. Максимальная длина 512 символов ||
|| **sourceId***
[`integer`](../../data-types.md) | Идентификатор источника, можно получить методами [biconnector.source.list](../source/biconnector-source-list.md) или [biconnector.source.add](../source/biconnector-source-add.md). Источник должен принадлежать коннектору текущего приложения, иначе метод вернет `SOURCE_NOT_FOUND` ||
|| **verboseName**
[`string`](../../data-types.md) | Понятное пользователю название датасета, например `Заказы`. Максимальная длина 255 символов ||
|| **description**
[`string`](../../data-types.md) | Описание датасета ||
|| **tableGroupIds**
[`array`](../../data-types.md) | Массив идентификаторов групп таблиц, в которые нужно добавить таблицу датасета. Каждый идентификатор — положительное целое число, группа должна существовать.

Если параметр не передан или передан пустой массив, таблица попадает в группу пользовательских таблиц.

Получить список групп таблиц через REST API нельзя. Методы [biconnector.dataset.get](./biconnector-dataset-get.md) и [biconnector.dataset.list](./biconnector-dataset-list.md) группы не возвращают ||
|| **fields***
[`array`](../../data-types.md) | Массив полей датасета, [(подробное описание)](#field) ||
|#

### Элемент массива fields {#field}

Каждый элемент массива `fields` — объект с тремя обязательными полями и необязательным описанием поля. Видимость поля при создании не задается: все поля создаются видимыми, скрыть их можно потом методом [biconnector.dataset.fields.update](./biconnector-dataset-fields-update.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название поля. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `A-Z`, цифры и знак `_`. Максимальная длина названия 32 символа ||
|| **externalCode***
[`string`](../../data-types.md) | Внешний код поля — имя, под которым поле знает приложение. Именно его Битрикс24 передает в запросе данных ||
|| **type***
[`string`](../../data-types.md) | Тип данных поля. Допустимые значения:
`int` — число целое
`string` — строка
`double` — число дробное, разделитель точка
`date` — дата, формат `Y-m-d`
`datetime` — дата со временем, формат `Y-m-d H:i:s`
`money` — денежное значение, хранится как число, валюта не сохраняется
`timezone` — идентификатор часового пояса

Значение регистрозависимо: `INT` в верхнем регистре вызовет ошибку `VALIDATION_FIELD_INVALID_TYPE` ||
|| **description**
[`string`](../../data-types.md) | Описание поля. Если параметр не передан, описание остается пустым ||
|#

Названия полей и внешние коды не должны повторяться внутри одного запроса: на повтор `name` метод вернет ошибку `DUPLICATE_FIELDS`, на повтор `externalCode` — `VALIDATION_DUPLICATE_FIELD_CODE`.

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
            "name": "rest_dataset",
            "externalName": "Sales orders",
            "externalCode": "sales_orders",
            "description": "Описание датасета",
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
    https://**put_your_bitrix24_address**/rest/biconnector.dataset.add
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
    type DatasetAddResult = {
      id: number
    }

    try {
      const response = await $b24.actions.v2.call.make<DatasetAddResult | BiconnectorError>({
        method: 'biconnector.dataset.add',
        params: {
          fields: {
            sourceId: 3,
            name: 'rest_dataset',
            externalName: 'Sales orders',
            externalCode: 'sales_orders',
            description: 'Описание датасета',
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
          console.info('Created dataset id:', result.id)
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
      async function addDataset() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.dataset.add',
            params: {
              fields: {
                sourceId: 3,
                name: 'rest_dataset',
                externalName: 'Sales orders',
                externalCode: 'sales_orders',
                description: 'Описание датасета',
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

          console.info('Created dataset id:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addDataset)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.dataset.add(
            fields={
                "sourceId": 3,
                "name": "rest_dataset",
                "externalName": "Sales orders",
                "externalCode": "sales_orders",
                "description": "Описание датасета",
                "fields": [
                    {
                        "type": "int",
                        "name": "ID",
                        "externalCode": "ID",
                    },
                    {
                        "type": "string",
                        "name": "NAME",
                        "externalCode": "NAME",
                    },
                    {
                        "type": "string",
                        "name": "SURNAME",
                        "externalCode": "SURNAME",
                    },
                    {
                        "type": "double",
                        "name": "SCORE",
                        "externalCode": "SCORE",
                    },
                    {
                        "type": "date",
                        "name": "DATA",
                        "externalCode": "DATA",
                    },
                    {
                        "type": "datetime",
                        "name": "TIME",
                        "externalCode": "TIME",
                    },
                ],
            },
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
                'biconnector.dataset.add',
                [
                    'fields' => [
                        'sourceId'      => 3,
                        'name'          => 'rest_dataset',
                        'externalName'  => 'Sales orders',
                        'externalCode'  => 'sales_orders',
                        'description'   => 'Описание датасета',
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
        echo 'Error adding dataset: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.dataset.add',
        {
            fields: {
                "sourceId": 3,
                "name": "rest_dataset",
                "externalName": "Sales orders",
                "externalCode": "sales_orders",
                "description": "Описание датасета",
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
        'biconnector.dataset.add',
        [
            'fields' => [
                'sourceId' => 3,
                'name' => 'rest_dataset',
                'externalName' => 'Sales orders',
                'externalCode' => 'sales_orders',
                'description' => 'Описание датасета',
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
    res, err := client.Core().Call(ctx, "biconnector.dataset.add", b24.Params{
    	"fields": b24.Params{
    		"sourceId":     3,
    		"name":         "rest_dataset",
    		"externalName": "Sales orders",
    		"externalCode": "sales_orders",
    		"description":  "Описание датасета",
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
    	return fmt.Errorf("biconnector.dataset.add: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.dataset.add: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
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
[`integer`](../../data-types.md) | Идентификатор созданного датасета. Используйте его в методах [biconnector.dataset.get](./biconnector-dataset-get.md), [biconnector.dataset.update](./biconnector-dataset-update.md) и [biconnector.dataset.fields.update](./biconnector-dataset-fields-update.md) ||
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
|| `ACCESS_DENIED` | Access denied. | Нет одного из двух прав, на Битрикс24 недоступны внешние источники данных BI Конструктора, либо метод вызван вебхуком или вне контекста приложения ||
|| `VALIDATION_FIELDS_NOT_PROVIDED` | Fields not provided. | Поля не переданы в запросе ||
|| `VALIDATION_UNKNOWN_PARAMETERS` | Unknown parameters: #LIST_OF_PARAMS# | Обнаружены неизвестные параметры: перечень ||
|| `VALIDATION_REQUIRED_FIELD_MISSING` | Field "#TITLE#" is required. | Обязательное поле #TITLE# не передано ||
|| `VALIDATION_READ_ONLY_FIELD` | Field "#TITLE#" is read only. | Поле #TITLE# доступно только для чтения и не может быть изменено ||
|| `VALIDATION_INVALID_FIELD_TYPE` | Field "#TITLE#" must be of type #TYPE#. | Поле #TITLE# должно быть типа #TYPE# ||
|| `VALIDATION_INVALID_FIELD_TYPE` | Field "tableGroupIds" must be an array of positive integers. | В массиве `tableGroupIds` есть значение, которое не является положительным целым числом ||
|| `VALIDATION_INVALID_FIELD_TYPE` | Field "description" must be of type string. | Описание поля в массиве `fields` передано не строкой ||
|| `VALIDATION_TABLE_GROUP_NOT_FOUND` | Table group was not found. | Группы таблиц с одним из идентификаторов из `tableGroupIds` нет ||
|| `BX_INVALID_VALUE` | The length of "VERBOSE_NAME" should not exceed 255 characters. | Значение `verboseName` длиннее 255 символов ||
|| `SOURCE_NOT_FOUND` | Source was not found. | Источника нет или он принадлежит другому приложению ||
|| `DATASET_ALREADY_EXIST` | Table with this name already exists. | Имя занято таблицей, которая уже есть в самом BI-Конструкторе ||
|| `VALIDATION_DATASET_NAME_RESERVED` | Dataset name is reserved by a system table. | Название датасета занято системной таблицей BI Конструктора ||
|| `NAME_EXISTS` | A table named "#NAME#" already exists. | Название #NAME# уже занято другим датасетом Битрикс24. Имя проверяется по всему Битрикс24, а не в пределах источника ||
|| `FIELDS_EMPTY` | $fields is empty | Передан пустой массив `fields` ||
|| `DUPLICATE_FIELDS` | Duplicate column names: #FIELD_NAMES#. | В параметре `name` полей есть повторы: перечень ||
|| `VALIDATION_DATASET_NAME_INVALID` | Dataset name has to start with a lowercase Latin character. Possible entry includes lowercase Latin characters (a-z), numbers (0-9) and underscores. | Неправильный формат названия датасета. Название должно начинаться с буквы, можно использовать только строчные латинские буквы `a-z`, цифры и знак `_` ||
|| `VALIDATION_DATASET_NAME_TOO_LONG` | Dataset name must not exceed 230 characters. | Название датасета не должно превышать 230 символов ||
|| `VALIDATION_DUPLICATE_FIELD_CODE` | Duplicate values found in the "code" parameter: #LIST_CODES# | Обнаружены дубликаты в параметре `externalCode` полей датасета ||
|| `VALIDATION_FIELD_MISSING_REQUIRED_PARAMETERS` | Field must include the required parameters: "name", "externalCode" and "type". | Поле должно включать параметры `name`, `externalCode` и `type` ||
|| `VALIDATION_FIELD_NAME_INVALID_FORMAT` | Field "name" has to start with an uppercase Latin character. Possible entry includes uppercase Latin characters (A-Z), numbers (0-9) and underscores. | Неправильный формат названия поля. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `A-Z`, цифры и знак `_` ||
|| `VALIDATION_FIELD_NAME_TOO_LONG` | Field "name" must not exceed 32 characters. | Название поля не должно превышать 32 символа ||
|| `VALIDATION_FIELD_INVALID_TYPE` | Invalid field type. | Некорректный тип поля ||
|| Пустое значение | Error creating table. или Error adding dataset | Не удалось создать датасет в BI-Конструкторе. Собственного строкового кода у этой ошибки нет: в поле `error` приходит числовой ноль. Таблица при этом не остается — уже созданная запись удаляется ||
|#

{% note info "" %}

Метод создает сразу два объекта: таблицу — тот же объект, что и [biconnector.table.add](../table/biconnector-table-add.md), — и датасет BI-Конструктора поверх нее. Если второй шаг не удался, первый откатывается: частично созданной таблицы не остается. У метода [biconnector.table.add](../table/biconnector-table-add.md) этого шага нет, поэтому такой ошибки у него не бывает

{% endnote %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-dataset-update.md)
- [{#T}](./biconnector-dataset-get.md)
- [{#T}](./biconnector-dataset-list.md)
- [{#T}](./biconnector-dataset-delete.md)
- [{#T}](./biconnector-dataset-fields-update.md)
- [{#T}](./biconnector-dataset-fields.md)
