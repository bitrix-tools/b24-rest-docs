# Получить поля источника biconnector.source.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

Метод `biconnector.source.fields` возвращает описание полей источника.

Назначение каждого поля описано в таблице [полей источника](./index.md#fields).

{% note warning "" %}

Метод возвращает статическую схему полей источника: она одинакова в любом Битрикс24 и не зависит от того, какие источники созданы. В отличие от остальных методов семейства, метод доступен вебхуку, но оба права проверяет и без них возвращает ошибку `ACCESS_DENIED`

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/biconnector.source.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/biconnector.source.fields
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

    type FieldDescription = {
      title: string
      type: string
      isRequired: boolean
      isReadOnly: boolean
      isImmutable: boolean
      isMultiple: boolean
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type SourceFieldsResult = {
      fields: FieldDescription[]
    }

    try {
      const response = await $b24.actions.v2.call.make<SourceFieldsResult | BiconnectorError>({
        method: 'biconnector.source.fields',
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
          console.info('Source fields:', result.fields)
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
      async function getSourceFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.source.fields',
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

          console.info('Source fields:', result.fields)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSourceFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.source.fields().response
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
                'biconnector.source.fields',
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
        echo 'Error fetching source fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.source.fields',
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
        'biconnector.source.fields',
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
    res, err := client.Core().Call(ctx, "biconnector.source.fields", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("biconnector.source.fields: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.source.fields: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
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
        "title": "title",
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
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
        "title": "code",
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
        "title": "active",
        "type": "boolean",
        "isRequired": false,
        "isReadOnly": false,
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
        "title": "connectorId",
        "type": "integer",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": true,
        "isMultiple": false
      },
      {
        "title": "settings",
        "type": "array",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true
      }
    ]
  },
  "time": {
    "start": 1742896156.448294,
    "finish": 1742896156.503291,
    "duration": 0.05499696731567383,
    "processing": 0.0004570484161376953,
    "date_start": "2025-03-25T09:49:16+00:00",
    "date_finish": "2025-03-25T09:49:16+00:00"
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
[`object[]`](../../data-types.md) | Массив дескрипторов полей источника, один элемент — одно поле [(подробное описание)](#field) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива fields {#field}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название поля источника. Полный список полей и их назначение — в таблице [полей источника](./index.md#fields) ||
|| **type**
[`string`](../../data-types.md) | Тип поля. Метод возвращает значения `integer`, `string`, `array`, `boolean` и `datetime` ||
|| **isRequired**
[`boolean`](../../data-types.md) | Признак обязательности поля в схеме объекта. Передавать при создании нужно только те поля, у которых `isRequired` равно `true`, а `isReadOnly` — `false`: у полей только для чтения признак тоже равен `true`, но передать их нельзя ||
|| **isReadOnly**
[`boolean`](../../data-types.md) | Поле доступно только для чтения ||
|| **isImmutable**
[`boolean`](../../data-types.md) | Установить значение поля можно только один раз и только при создании нового элемента. У источника такое поле одно — `connectorId` ||
|| **isMultiple**
[`boolean`](../../data-types.md) | Множественное поле. Если равно `true`, значения в поле передаются в виде массива ||
|#

Поле `active` метод отдает с `isReadOnly: false`, но методы [biconnector.source.add](./biconnector-source-add.md) и [biconnector.source.update](./biconnector-source-update.md) его значение не читают.

У поля `settings` признак `isMultiple` равен `true`, однако на вход методы `add` и `update` принимают его объектом, а не массивом. Обе формы разобраны в разделе [Поле settings](./index.md#settings).

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
- [{#T}](./biconnector-source-add.md)
- [{#T}](./biconnector-source-update.md)
- [{#T}](./biconnector-source-get.md)
- [{#T}](./biconnector-source-list.md)
- [{#T}](./biconnector-source-delete.md)
