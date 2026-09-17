# Получить источник по id biconnector.source.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

Метод `biconnector.source.get` возвращает информацию об источнике по идентификатору.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и возвращает только те источники, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор источника, можно получить методами [biconnector.source.list](./biconnector-source-list.md) и [biconnector.source.add](./biconnector-source-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/biconnector.source.get
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
    type SourceGetResult = {
      item: {
        connection: {
          id: number
          type: string
          code: string
          title: string
          description: string
          active: boolean
          // Dates come as "2025-03-20 14:50:06", not as an ISO string
          dateCreate: string | null
          dateUpdate: string | null
          createdById: number
          updatedById: number
        }
        connectorId: number
        settings: Array<{
          code: string
          name: string
          type: string
          value: string
          id: number
        }>
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<SourceGetResult | BiconnectorError>({
        method: 'biconnector.source.get',
        params: {
          id: 6,
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
          console.info(result.item.connection.id, result.item.connection.title, result.item.settings)
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
      async function getSource() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.source.get',
            params: {
              id: 6,
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

          console.info(result.item.connection.id, result.item.connection.title, result.item.settings)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSource)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.source.get(
            bitrix_id=6,
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
                'biconnector.source.get',
                [
                    'id' => 6,
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
        echo 'Error getting source: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.source.get',
        {
            id: 6,
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
        'biconnector.source.get',
        [
            'id' => 6
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
    res, err := client.Core().Call(ctx, "biconnector.source.get", b24.Params{
    	"id": 6,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("biconnector.source.get: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.source.get: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ConnectorID b24.ID `json:"connectorId"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ConnectorID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "connection": {
                "id": 6,
                "type": "rest",
                "code": "rest_1",
                "title": "Rest source SQL",
                "description": "Подключение для работы с mySql",
                "active": true,
                "dateCreate": "2025-03-20 14:50:06",
                "dateUpdate": "2025-03-20 14:50:06",
                "createdById": 1,
                "updatedById": 1
            },
            "connectorId": 1,
            "settings": [
                {
                    "code": "token",
                    "name": "Токен",
                    "type": "STRING",
                    "value": "a1b2c3d4e5",
                    "id": 8
                }
            ]
        }
    },
    "time": {
        "start": 1742929480.368097,
        "finish": 1742929480.449558,
        "duration": 0.08146095275878906,
        "processing": 0.006555080413818359,
        "date_start": "2025-03-25T19:04:40+00:00",
        "date_finish": "2025-03-25T19:04:40+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит единственный ключ `item` ||
|| **result.item**
[`object`](../../data-types.md) | Данные источника [(подробное описание)](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **connection**
[`object`](../../data-types.md) | Данные подключения: собственные поля источника [(подробное описание)](#connection) ||
|| **connectorId**
[`integer`](../../data-types.md) | Идентификатор коннектора, к которому привязан источник ||
|| **settings**
[`array`](../../data-types.md) | Параметры авторизации источника — по одному объекту на каждый параметр коннектора [(подробное описание)](#settings) ||
|#

#### Объект connection {#connection}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор источника ||
|| **type**
[`string`](../../data-types.md) | Тип источника. У источников, созданных через REST, значение всегда равно `rest` ||
|| **code**
[`string`](../../data-types.md) | Код источника. Формируется автоматически по шаблону `rest_<connectorId>` ||
|| **title**
[`string`](../../data-types.md) | Название источника ||
|| **description**
[`string`](../../data-types.md) | Описание источника ||
|| **active**
[`boolean`](../../data-types.md) | Активность источника. Неактивный источник перестает отдавать данные ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания источника в формате `Y-m-d H:i:s` ||
|| **dateUpdate**
[`datetime`](../../data-types.md) | Дата обновления источника в формате `Y-m-d H:i:s` ||
|| **createdById**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего источник ||
|| **updatedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, обновившего источник ||
|#

#### Объект settings {#settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор сохраненного параметра ||
|| **code**
[`string`](../../data-types.md) | Код параметра, заданный коннектором ||
|| **name**
[`string`](../../data-types.md) | Название параметра, которое видит пользователь в интерфейсе ||
|| **type**
[`string`](../../data-types.md) | Тип параметра: `STRING` или `INT` ||
|| **value**
[`string`](../../data-types.md) | Значение, которое указали при создании или обновлении источника. Приходит в открытом виде, включая пароли и токены ||
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
|| `SOURCE_NOT_FOUND` | Source was not found. | Источника нет или он принадлежит другому приложению ||
|| `CONNECTOR_NOT_FOUND` | Connector was not found. | Коннектор, к которому привязан источник, не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-source-add.md)
- [{#T}](./biconnector-source-update.md)
- [{#T}](./biconnector-source-list.md)
- [{#T}](./biconnector-source-delete.md)
- [{#T}](./biconnector-source-fields.md)
