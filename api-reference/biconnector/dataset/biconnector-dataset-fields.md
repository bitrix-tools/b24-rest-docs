# Получить поля датасета biconnector.dataset.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [biconnector.table.fields](../table/biconnector-table-fields.md).

{% endnote %}

Метод `biconnector.dataset.fields` возвращает описание полей объекта «датасет»: имя поля, тип, обязательность и признаки «только для чтения», «неизменяемое», «множественное». Параметров у метода нет — он не принимает идентификатор и не описывает поля конкретного датасета. Состав колонок конкретного датасета возвращает метод [biconnector.dataset.get](./biconnector-dataset-get.md).

Назначение каждого поля описано в таблице [полей датасета](./index.md#dataset). Схема совпадает с ней не полностью: параметров разбора CSV — `csvDelimiter`, `csvEncoding` и `csvHasHeaders` — в схеме нет, хотя в ответах `get` и `list` они приходят. Именно по этой схеме проверяются `select`, `filter` и `order` метода [biconnector.dataset.list](./biconnector-dataset-list.md).

{% note warning "" %}

Метод возвращает статическую схему полей датасета — она одинакова в любом Битрикс24 и не зависит от созданных датасетов. В отличие от остальных методов семейства, метод доступен вебхуку, но оба права проверяет и без них возвращает ошибку `ACCESS_DENIED`

{% endnote %}

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/biconnector.dataset.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/biconnector.dataset.fields
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
    type DatasetFieldsResult = {
      fields: {
        title: string
        type: string
        isRequired: boolean
        isReadOnly: boolean
        isImmutable: boolean
        isMultiple: boolean
      }[]
    }

    try {
      const response = await $b24.actions.v2.call.make<DatasetFieldsResult | BiconnectorError>({
        method: 'biconnector.dataset.fields',
        params: {},
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
          console.info('Dataset fields count:', result.fields.length, result.fields)
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
      async function getDatasetFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.dataset.fields',
            params: {},
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

          console.info('Dataset fields count:', result.fields.length, result.fields)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDatasetFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.dataset.fields().response
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
                'biconnector.dataset.fields',
                []
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
                echo 'Success: ' . print_r($data, true);
            }
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling biconnector.dataset.fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.dataset.fields',
        {},
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
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.dataset.fields',
        []
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
    res, err := client.Core().Call(ctx, "biconnector.dataset.fields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("biconnector.dataset.fields: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.dataset.fields: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
    }

    // Метод заворачивает ответ в объект с ключом "fields".
    raw, ok := b24.Unwrap(res.Result, "fields")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа fields")
    }

    var items []struct {
    	Title       string `json:"title"`
    	Type        string `json:"type"`
    	IsRequired  bool   `json:"isRequired"`
    	IsReadOnly  bool   `json:"isReadOnly"`
    	IsImmutable bool   `json:"isImmutable"`
    	IsMultiple  bool   `json:"isMultiple"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Title)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": {
    "fields": [
      {
        "title": "id",
        "type": "integer",
        "isRequired": true,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "sourceId",
        "type": "integer",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": true,
        "isMultiple": false
      },
      {
        "title": "name",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": true,
        "isMultiple": false
      },
      {
        "title": "type",
        "type": "string",
        "isRequired": true,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "description",
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "externalName",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": true,
        "isMultiple": false
      },
      {
        "title": "externalCode",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": true,
        "isMultiple": false
      },
      {
        "title": "externalId",
        "type": "integer",
        "isRequired": true,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "dateCreate",
        "type": "datetime",
        "isRequired": true,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "dateUpdate",
        "type": "datetime",
        "isRequired": true,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "createdById",
        "type": "integer",
        "isRequired": true,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "updatedById",
        "type": "integer",
        "isRequired": true,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false
      },
      {
        "title": "fields",
        "type": "array",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true
      }
    ]
  },
  "time": {
    "start": 1740757652.264398,
    "finish": 1740757652.343882,
    "duration": 0.0794839859008789,
    "processing": 2.002716064453125e-5,
    "date_start": "2025-02-28T15:47:32+00:00",
    "date_finish": "2025-02-28T15:47:32+00:00"
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит единственный ключ `fields` ||
|| **result.fields**
[`object[]`](../../data-types.md) | Массив дескрипторов полей датасета, один элемент — одно поле [(подробное описание)](#field) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива fields {#field}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название поля датасета. Назначение полей — в таблице [полей датасета](./index.md#dataset) ||
|| **type**
[`string`](../../data-types.md) | Тип поля. Метод возвращает значения `integer`, `string`, `array` и `datetime` ||
|| **isRequired**
[`boolean`](../../data-types.md) | Признак обязательности поля в схеме объекта. Передавать при создании нужно только те поля, у которых `isRequired` равно `true`, а `isReadOnly` — `false`: у полей только для чтения признак тоже равен `true`, но передать их нельзя ||
|| **isReadOnly**
[`boolean`](../../data-types.md) | Поле доступно только для чтения, передать его в `add` или `update` нельзя ||
|| **isImmutable**
[`boolean`](../../data-types.md) | Значение задается один раз при создании датасета и потом не меняется ||
|| **isMultiple**
[`boolean`](../../data-types.md) | Множественное поле. Если равно `true`, значение передается массивом ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "result": {
        "error": {
            "error": "ACCESS_DENIED",
            "error_description": "Access denied."
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
|| `ACCESS_DENIED` | Access denied. | Нет одного из двух прав ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-dataset-add.md)
- [{#T}](./biconnector-dataset-update.md)
- [{#T}](./biconnector-dataset-get.md)
- [{#T}](./biconnector-dataset-list.md)
- [{#T}](./biconnector-dataset-delete.md)
- [{#T}](./biconnector-dataset-fields-update.md)
