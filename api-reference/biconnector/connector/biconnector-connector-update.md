# Обновить коннектор biconnector.connector.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

Метод `biconnector.connector.update` обновляет существующий коннектор.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и изменяет только те коннекторы, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

Обновление частичное: поля, которые вы не передали, сохраняют прежние значения. Исключение — массив `settings`: он заменяется целиком, поэтому передавайте в нем все параметры подключения, а не только измененные.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор коннектора, можно получить методами [biconnector.connector.list](./biconnector-connector-list.md) и [biconnector.connector.add](./biconnector-connector-add.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий обновляемые данные. Формат объекта:

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
|| **title**
[`string`](../../data-types.md) | Новое название коннектора, максимальная длина — 512 символов ||
|| **logo**
[`string`](../../data-types.md) | Новый логотип коннектора. Может передаваться ссылкой на изображение или строкой формата base64, например `data:image/svg+xml;base64,PHN2ZyB3...` ||
|| **description**
[`string`](../../data-types.md) | Новое описание коннектора ||
|| **urlCheck**
[`string`](../../data-types.md) | Новый эндпоинт для проверки доступности коннектора, максимальная длина — 2048 символов, [(подробное описание)](./index.md#urlCheck) ||
|| **urlTableList**
[`string`](../../data-types.md) | Новый эндпоинт для получения списка таблиц, максимальная длина — 2048 символов, [(подробное описание)](./index.md#urlTableList) ||
|| **urlTableDescription**
[`string`](../../data-types.md) | Новый эндпоинт для получения описания конкретной таблицы, максимальная длина — 2048 символов, [(подробное описание)](./index.md#urlTableDescription) ||
|| **urlData**
[`string`](../../data-types.md) | Новый эндпоинт для получения данных по выбранной таблице, максимальная длина — 2048 символов, [(подробное описание)](./index.md#urlData) ||
|| **settings**
[`array`](../../data-types.md) | Новый массив параметров подключения. Заменяет прежний целиком [(подробное описание)](#settings) ||
|| **supportMapping**
[`boolean`](../../data-types.md) | Поддержка сопоставления полей таблицы с полями внешней системы. Если поле не передать, у коннектора останется прежнее значение.

Значение проверяется строгим сравнением с булевым типом, поэтому в запросе с типом `application/x-www-form-urlencoded` оно не пройдет — передавайте его с заголовком `Content-Type: application/json` ||
|| **sourceCode**
[`string`](../../data-types.md) | Символьный код внешней системы, максимальная длина — 64 символа ||
|| **sort**
[`integer`](../../data-types.md) | Новый параметр сортировки коннектора ||
|#

### Параметр settings {#settings}

Каждый элемент массива `settings` — объект с тремя обязательными полями.

#|
|| **Название**
`тип` | **Описание** ||
|| **code***
[`string`](../../data-types.md) | Код параметра. С этим названием параметр уходит во внешнюю систему в объекте `connection`. Максимальная длина — 512 символов ||
|| **name***
[`string`](../../data-types.md) | Название параметра, которое видит пользователь в разделе «Рабочее место аналитика». Максимальная длина — 512 символов ||
|| **type***
[`string`](../../data-types.md) | Тип параметра, определяет поле ввода в интерфейсе. Допустимые значения: `STRING`, `INT`. Значение регистрозависимо: `string` в нижнем регистре вызовет ошибку `VALIDATION_SETTINGS_INVALID_TYPE` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "id": 4,
             "fields": {
                 "title": "UPDATED REST CONNECTOR",
                 "logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjMkZDN0Y3IiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPgo=",
                 "description": "Updated description",
                 "urlCheck": "http://example.com/api/new_check",
                 "urlTableList": "http://example.com/api/new_table_list",
                 "urlTableDescription": "http://example.com/api/new_table_description",
                 "urlData": "http://example.com/api/new_data",
                 "settings": [
                    {
                        "name": "Идентификатор сотрудника",
                        "type": "STRING",
                        "code": "id"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                 ],
                 "sort": 200
             },
             "auth": "**put_access_token_here**"
             }' \
         https://**put_your_bitrix24_address**/rest/biconnector.connector.update
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

    try {
      const response = await $b24.actions.v2.call.make<boolean | BiconnectorError>({
        method: 'biconnector.connector.update',
        params: {
          id: 4,
          fields: {
            title: 'UPDATED REST CONNECTOR',
            logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjMkZDN0Y3IiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPgo=',
            description: 'Updated description',
            urlCheck: 'http://example.com/api/new_check',
            urlTableList: 'http://example.com/api/new_table_list',
            urlTableDescription: 'http://example.com/api/new_table_description',
            urlData: 'http://example.com/api/new_data',
            settings: [
              {
                name: 'Идентификатор сотрудника',
                type: 'STRING',
                code: 'id',
              },
              {
                name: 'Пароль',
                type: 'STRING',
                code: 'password',
              },
            ],
            sort: 200,
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
        if (typeof result === 'object' && result !== null && 'error' in result) {
          console.error(result.error.error, result.error.error_description)
        } else {
          console.info('Connector updated:', result)
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
      async function updateConnector() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.connector.update',
            params: {
              id: 4,
              fields: {
                title: 'UPDATED REST CONNECTOR',
                logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjMkZDN0Y3IiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPgo=',
                description: 'Updated description',
                urlCheck: 'http://example.com/api/new_check',
                urlTableList: 'http://example.com/api/new_table_list',
                urlTableDescription: 'http://example.com/api/new_table_description',
                urlData: 'http://example.com/api/new_data',
                settings: [
                  {
                    name: 'Идентификатор сотрудника',
                    type: 'STRING',
                    code: 'id',
                  },
                  {
                    name: 'Пароль',
                    type: 'STRING',
                    code: 'password',
                  },
                ],
                sort: 200,
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

          console.info('Connector updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateConnector)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.connector.update(
            bitrix_id=4,
            fields={
                "title": "UPDATED REST CONNECTOR",
                "logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjMkZDN0Y3IiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPgo=",
                "description": "Updated description",
                "urlCheck": "http://example.com/api/new_check",
                "urlTableList": "http://example.com/api/new_table_list",
                "urlTableDescription": "http://example.com/api/new_table_description",
                "urlData": "http://example.com/api/new_data",
                "settings": [
                    {
                        "name": "Идентификатор сотрудника",
                        "type": "STRING",
                        "code": "id",
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password",
                    },
                ],
                "sort": 200,
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
                'biconnector.connector.update',
                [
                    'id' => 4,
                    'fields' => [
                        "title"               => "UPDATED REST CONNECTOR",
                        "logo"                => "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjMkZDN0Y3IiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPgo=",
                        "description"         => "Updated description",
                        "urlCheck"            => "http://example.com/api/new_check",
                        "urlTableList"        => "http://example.com/api/new_table_list",
                        "urlTableDescription" => "http://example.com/api/new_table_description",
                        "urlData"             => "http://example.com/api/new_data",
                        "settings"            => [
                            [
                                "name" => "Идентификатор сотрудника",
                                "type" => "STRING",
                                "code" => "id"
                            ],
                            [
                                "name" => "Пароль",
                                "type" => "STRING",
                                "code" => "password"
                            ]
                        ],
                        "sort"                => 200
                    ]
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
                echo 'Success: ' . print_r($data, true);
            }
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating connector: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.connector.update',
        {
            id: 4,
            fields: {
                "title": "UPDATED REST CONNECTOR",
                "logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjMkZDN0Y3IiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPgo=",
                "description": "Updated description",
                "urlCheck": "http://example.com/api/new_check",
                "urlTableList": "http://example.com/api/new_table_list",
                "urlTableDescription": "http://example.com/api/new_table_description",
                "urlData": "http://example.com/api/new_data",
                "settings": [
                    {
                        "name": "Идентификатор сотрудника",
                        "type": "STRING",
                        "code": "id"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                ],
                "sort": 200
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
        'biconnector.connector.update',
        [
            'id' => 4,
            'fields' => [
                'title' => 'UPDATED REST CONNECTOR',
                'logo' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjMkZDN0Y3IiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPgo=',
                'description' => 'Updated description',
                'urlCheck' => 'http://example.com/api/new_check',
                'urlTableList' => 'http://example.com/api/new_table_list',
                'urlTableDescription' => 'http://example.com/api/new_table_description',
                'urlData' => 'http://example.com/api/new_data',
                'settings' => [
                    [
                        'name' => 'Идентификатор сотрудника',
                        'type' => 'STRING',
                        'code' => 'id'
                    ],
                    [
                        'name' => 'Пароль',
                        'type' => 'STRING',
                        'code' => 'password'
                    ]
                ],
                'sort' => 200
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
    res, err := client.Core().Call(ctx, "biconnector.connector.update", b24.Params{
    	"id": 4,
    	"fields": b24.Params{
    		"title":               "UPDATED REST CONNECTOR",
    		"logo":                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjMkZDN0Y3IiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPgo=",
    		"description":         "Updated description",
    		"urlCheck":            "http://example.com/api/new_check",
    		"urlTableList":        "http://example.com/api/new_table_list",
    		"urlTableDescription": "http://example.com/api/new_table_description",
    		"urlData":             "http://example.com/api/new_data",
    		"settings": []b24.Params{
    			{
    				"name": "Идентификатор сотрудника",
    				"type": "STRING",
    				"code": "id",
    			},
    			{
    				"name": "Пароль",
    				"type": "STRING",
    				"code": "password",
    			},
    		},
    		"sort": 200,
    	},
    })
    if err != nil {
    	return fmt.Errorf("biconnector.connector.update: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.connector.update: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1725365418.056843,
        "finish": 1725365419.671506,
        "duration": 1.6146628856658936,
        "processing": 1.3475170135498047,
        "date_start": "2024-09-03T14:10:18+02:00",
        "date_finish": "2024-09-03T14:10:19+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа. При успешном обновлении содержит `true` — объекта с данными коннектора в ответе нет. Чтобы увидеть новые значения полей, вызовите [biconnector.connector.get](./biconnector-connector-get.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `VALIDATION_ID_NOT_PROVIDED` | ID is missing. | Идентификатор не указан ||
|| `VALIDATION_INVALID_ID_FORMAT` | ID has to be a positive integer. | Неверный формат ID ||
|| `VALIDATION_FIELDS_NOT_PROVIDED` | Fields not provided. | Поля не переданы в запросе ||
|| `VALIDATION_UNKNOWN_PARAMETERS` | Unknown parameters: #LIST_OF_PARAMS# | Обнаружены неизвестные параметры: перечень ||
|| `VALIDATION_READ_ONLY_FIELD` | Field "#TITLE#" is read only. | Поле #TITLE# доступно только для чтения и не может быть изменено ||
|| `VALIDATION_INVALID_FIELD_TYPE` | Field "#TITLE#" must be of type #TYPE#. | Поле #TITLE# должно быть типа #TYPE# ||
|| `CONNECTOR_NOT_FOUND` | Connector was not found. | Коннектора нет или он принадлежит другому приложению ||
|| `VALIDATION_SETTINGS_MISSING_REQUIRED_FIELDS` | Settings must include "type", "name" and "code" fields. | В настройках должны быть указаны поля `type`, `name` и `code` ||
|| `VALIDATION_SETTINGS_INVALID_TYPE` | Parameter "type" is not correct. | Недопустимое значение параметра `type` ||
|| `VALIDATION_SETTINGS_NAME_TOO_LONG` | Parameter "name" must be less than 512 characters. | Значение параметра `name` не должно превышать 512 символов ||
|| `VALIDATION_SETTINGS_CODE_TOO_LONG` | Parameter "code" must be less than 512 characters. | Значение параметра `code` не должно превышать 512 символов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-connector-add.md)
- [{#T}](./biconnector-connector-get.md)
- [{#T}](./biconnector-connector-list.md)
- [{#T}](./biconnector-connector-delete.md)
- [{#T}](./biconnector-connector-fields.md)
