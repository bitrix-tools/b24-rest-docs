# Получить таблицу по id biconnector.table.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

Метод `biconnector.table.get` возвращает информацию о таблице по идентификатору.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и возвращает только те таблицы, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор таблицы, можно получить методами [biconnector.table.list](./biconnector-table-list.md) и [biconnector.table.add](./biconnector-table-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/biconnector.table.get
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
    type TableGetResult = {
      item: {
        id: number
        type: string
        name: string
        description: string
        externalCode: string
        externalName: string
        dateCreate: string
        dateUpdate: string
        createdById: number
        updatedById: number
        externalId: number
        csvDelimiter: string
        csvEncoding: string
        csvHasHeaders: boolean
        fields: Array<{
          id: number
          datasetId: number
          type: string
          name: string
          externalCode: string
          visible: boolean
          description: string
        }>
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<TableGetResult | BiconnectorError>({
        method: 'biconnector.table.get',
        params: {
          id: 2,
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
          console.info(result.item.id, result.item.name, result.item.type)
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
      async function getTable() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.table.get',
            params: {
              id: 2,
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

          console.info(result.item.id, result.item.name, result.item.type)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTable)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        # В b24pysdk нет готовой обертки для biconnector.table.*, поэтому метод
        # вызывается напрямую через bitrix_token.call_method()
        response = bitrix_token.call_method(
            api_method="biconnector.table.get",
            params={
                "id": 2,
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
                'biconnector.table.get',
                [
                    'id' => 2,
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
        echo 'Error getting table: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.table.get',
        {
            id: 2,
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
        'biconnector.table.get',
        [
            'id' => 2
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
    res, err := client.Core().Call(ctx, "biconnector.table.get", b24.Params{
    	"id": 2,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("biconnector.table.get: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.table.get: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID           b24.ID `json:"id"`
    	Type         string `json:"type"`
    	Name         string `json:"name"`
    	Description  string `json:"description"`
    	ExternalCode string `json:"externalCode"`
    	ExternalName string `json:"externalName"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Type)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
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
            "externalId": 0,
            "csvDelimiter": "",
            "csvEncoding": "",
            "csvHasHeaders": false,
            "fields": [
                {"id": 43, "datasetId": 27, "type": "int", "name": "ID", "externalCode": "id", "visible": true, "description": ""},
                {"id": 45, "datasetId": 27, "type": "string", "name": "CUSTOMER", "externalCode": "customer", "visible": true, "description": ""},
                {"id": 47, "datasetId": 27, "type": "money", "name": "AMOUNT", "externalCode": "amount", "visible": true, "description": ""},
                {"id": 49, "datasetId": 27, "type": "date", "name": "ORDER_DATE", "externalCode": "order_date", "visible": true, "description": ""}
            ]
        }
    },
    "time": {
        "start": 1789549489,
        "finish": 1789549489.125967,
        "duration": 0.12596702575683594,
        "processing": 0,
        "date_start": "2026-09-16T12:04:49+03:00",
        "date_finish": "2026-09-16T12:04:49+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит единственный ключ `item` с объектом [table](#table) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект table {#table}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор таблицы ||
|| **type**
[`string`](../../data-types.md) | Тип таблицы, у таблиц REST-источника значение всегда `rest` ||
|| **name**
[`string`](../../data-types.md) | Название таблицы ||
|| **description**
[`string`](../../data-types.md) | Описание таблицы ||
|| **externalCode**
[`string`](../../data-types.md) | Внешний код таблицы ||
|| **externalName**
[`string`](../../data-types.md) | Внешнее имя таблицы ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания в формате `Y-m-d H:i:s` ||
|| **dateUpdate**
[`datetime`](../../data-types.md) | Дата обновления в формате `Y-m-d H:i:s`. У таблицы, которую ни разу не обновляли, значение `null` ||
|| **createdById**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего таблицу ||
|| **updatedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, обновившего таблицу. У таблицы, которую ни разу не обновляли, значение `0` ||
|| **externalId**
[`integer`](../../data-types.md) | Идентификатор датасета BI-Конструктора, созданного вместе с объектом устаревшим методом `biconnector.dataset.add`. У таблиц, созданных методом [biconnector.table.add](./biconnector-table-add.md), значение всегда `0` ||
|| **csvDelimiter**, **csvEncoding**, **csvHasHeaders**
[`string`](../../data-types.md), [`string`](../../data-types.md), [`boolean`](../../data-types.md) | Параметры разбора CSV-файла. У таблиц REST-источника всегда пустые ||
|| **fields**
[`array`](../../data-types.md) | Массив [колонок](#field) таблицы ||
|#

Поля `sourceId` в ответе нет — идентификатор источника возвращает только метод [biconnector.table.list](./biconnector-table-list.md). Состав колонок, наоборот, доступен только здесь: в выборке [biconnector.table.list](./biconnector-table-list.md) массива `fields` не будет.

#### Элемент массива fields {#field}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор колонки ||
|| **datasetId**
[`integer`](../../data-types.md) | Идентификатор таблицы, к которой относится колонка. Ключ назван так исторически ||
|| **type**
[`string`](../../data-types.md) | [Тип данных](./index.md#fields) колонки ||
|| **name**
[`string`](../../data-types.md) | Название колонки ||
|| **externalCode**
[`string`](../../data-types.md) | Внешний код колонки ||
|| **visible**
[`boolean`](../../data-types.md) | Флаг видимости колонки ||
|| **description**
[`string`](../../data-types.md) | Описание колонки. Через REST API не заполняется ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "result": {
        "error": {
            "error": "VALIDATION_ID_NOT_PROVIDED",
            "error_description": "ID is missing."
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
|| `VALIDATION_ID_NOT_PROVIDED` | ID is missing. | Идентификатор не указан ||
|| `VALIDATION_INVALID_ID_FORMAT` | ID has to be a positive integer. | Неверный формат ID ||
|| `DATASET_NOT_FOUND` | Dataset was not found. | Таблицы нет или она принадлежит другому приложению ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-table-add.md)
- [{#T}](./biconnector-table-update.md)
- [{#T}](./biconnector-table-list.md)
- [{#T}](./biconnector-table-delete.md)
- [{#T}](./biconnector-table-fields-update.md)
- [{#T}](./biconnector-table-fields.md)
