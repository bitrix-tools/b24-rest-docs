# Получить датасет по id biconnector.dataset.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [biconnector.table.get](../table/biconnector-table-get.md).

{% endnote %}

Метод `biconnector.dataset.get` возвращает информацию о датасете по идентификатору.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и возвращает только те датасеты, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор датасета, можно получить методами [biconnector.dataset.list](./biconnector-dataset-list.md) и [biconnector.dataset.add](./biconnector-dataset-add.md) ||
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
    https://**put_your_bitrix24_address**/rest/biconnector.dataset.get
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
    type DatasetGetResult = {
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
      const response = await $b24.actions.v2.call.make<DatasetGetResult | BiconnectorError>({
        method: 'biconnector.dataset.get',
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
      async function getDataset() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.dataset.get',
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

      document.addEventListener('DOMContentLoaded', getDataset)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.dataset.get(
            bitrix_id=2,
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
                'biconnector.dataset.get',
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
        echo 'Error getting dataset: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.dataset.get',
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
        'biconnector.dataset.get',
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
    res, err := client.Core().Call(ctx, "biconnector.dataset.get", b24.Params{
    	"id": 2,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("biconnector.dataset.get: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.dataset.get: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
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
            "id": 2,
            "type": "rest",
            "name": "rest_dataset11111",
            "description": "new__2_",
            "externalCode": "sales_orders",
            "externalName": "Sales orders",
            "dateCreate": "2025-03-26 15:28:06",
            "dateUpdate": "2025-03-27 07:47:43",
            "createdById": 1,
            "updatedById": 1,
            "externalId": 275,
            "csvDelimiter": "",
            "csvEncoding": "",
            "csvHasHeaders": false,
            "fields": [
                {"id": 224, "datasetId": 2, "type": "int", "name": "ID", "externalCode": "ID", "visible": true, "description": ""},
                {"id": 225, "datasetId": 2, "type": "string", "name": "NAME", "externalCode": "NAME", "visible": true, "description": ""},
                {"id": 226, "datasetId": 2, "type": "string", "name": "SURNAME", "externalCode": "SURNAME", "visible": true, "description": ""},
                {"id": 227, "datasetId": 2, "type": "double", "name": "SCORE", "externalCode": "SCORE", "visible": true, "description": ""},
                {"id": 228, "datasetId": 2, "type": "date", "name": "DATA", "externalCode": "DATA", "visible": true, "description": ""},
                {"id": 229, "datasetId": 2, "type": "datetime", "name": "TIME", "externalCode": "TIME", "visible": true, "description": ""}
            ]
        }
    },
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
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит единственный ключ `item` — сам датасет вместе с массивом `fields`. Состав полей описан в статье [Датасеты: обзор методов](./index.md#dataset) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Поля `sourceId` в ответе нет — идентификатор источника возвращает только метод [biconnector.dataset.list](./biconnector-dataset-list.md). Состав полей датасета, наоборот, доступен только через `get`: в выборке `list` массива `fields` не будет.

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
|| `DATASET_NOT_FOUND` | Dataset was not found. | Датасета нет или он принадлежит другому приложению ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-dataset-add.md)
- [{#T}](./biconnector-dataset-update.md)
- [{#T}](./biconnector-dataset-list.md)
- [{#T}](./biconnector-dataset-delete.md)
- [{#T}](./biconnector-dataset-fields-update.md)
- [{#T}](./biconnector-dataset-fields.md)
