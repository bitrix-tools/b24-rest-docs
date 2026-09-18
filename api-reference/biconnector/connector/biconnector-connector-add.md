# Создать коннектор biconnector.connector.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

Метод `biconnector.connector.add` создает новый коннектор.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md). Созданный коннектор видит только это приложение: другим приложениям он не доступен. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

Коннектор описывает только адреса эндпоинтов и список параметров авторизации — сам по себе он данные не отдает. Чтобы получить данные, после создания коннектора создайте источник методом [biconnector.source.add](../source/biconnector-source-add.md) и передайте в нем `id` коннектора.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий данные для создания нового коннектора. Формат объекта:

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
|| **title***
[`string`](../../data-types.md) | Название коннектора, максимальная длина — 512 символов ||
|| **logo***
[`string`](../../data-types.md) | Логотип коннектора. Может передаваться ссылкой на изображение или строкой формата base64, например `data:image/svg+xml;base64,PHN2ZyB3...` ||
|| **description**
[`string`](../../data-types.md) | Описание коннектора ||
|| **urlCheck***
[`string`](../../data-types.md) | Эндпоинт коннектора для проверки доступности, максимальная длина — 2048 символов, [(подробное описание)](./index.md#urlCheck) ||
|| **urlTableList***
[`string`](../../data-types.md) | Эндпоинт коннектора для получения списка таблиц, максимальная длина — 2048 символов, [(подробное описание)](./index.md#urlTableList) ||
|| **urlTableDescription***
[`string`](../../data-types.md) | Эндпоинт коннектора для получения описания конкретной таблицы, максимальная длина — 2048 символов, [(подробное описание)](./index.md#urlTableDescription) ||
|| **urlData***
[`string`](../../data-types.md) | Эндпоинт коннектора для получения данных по выбранной таблице, максимальная длина — 2048 символов, [(подробное описание)](./index.md#urlData) ||
|| **settings***
[`array`](../../data-types.md) | Массив параметров подключения: коды и названия полей, значения которых пользователь заполнит при создании источника [(подробное описание)](#settings) ||
|| **supportMapping**
[`boolean`](../../data-types.md) | Поддержка сопоставления полей таблицы с полями внешней системы. Значение по умолчанию — `false`.

Значение проверяется строгим сравнением с булевым типом, поэтому в запросе с типом `application/x-www-form-urlencoded` оно не пройдет — передавайте его с заголовком `Content-Type: application/json` ||
|| **sourceCode**
[`string`](../../data-types.md) | Символьный код внешней системы, максимальная длина — 64 символа ||
|| **sort**
[`integer`](../../data-types.md) | Параметр сортировки коннекторов. Значение по умолчанию — `100` ||
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
             "fields": {
                 "title": "SUPER REST CONNECTOR",
                 "logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
                 "description": "Connector with token",
                 "urlCheck": "http://example.com/api/check",
                 "urlTableList": "http://example.com/api/table_list",
                 "urlTableDescription": "http://example.com/api/table_description",
                 "urlData": "http://example.com/api/data",
                 "settings": [
                    {
                        "name": "Логин",
                        "type": "STRING",
                        "code": "login"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                 ],
                 "sort": 100
             },
             "auth": "**put_access_token_here**"
             }' \
         https://**put_your_bitrix24_address**/rest/biconnector.connector.add
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
    type ConnectorAddResult = {
      id: number
    }

    try {
      const response = await $b24.actions.v2.call.make<ConnectorAddResult | BiconnectorError>({
        method: 'biconnector.connector.add',
        params: {
          fields: {
            title: 'SUPER REST CONNECTOR',
            logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==',
            description: 'Connector with token',
            urlCheck: 'http://example.com/api/check',
            urlTableList: 'http://example.com/api/table_list',
            urlTableDescription: 'http://example.com/api/table_description',
            urlData: 'http://example.com/api/data',
            settings: [
              {
                name: 'Логин',
                type: 'STRING',
                code: 'login',
              },
              {
                name: 'Пароль',
                type: 'STRING',
                code: 'password',
              },
            ],
            sort: 100,
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
          console.info('Created connector ID:', result.id)
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
      async function addConnector() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.connector.add',
            params: {
              fields: {
                title: 'SUPER REST CONNECTOR',
                logo: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==',
                description: 'Connector with token',
                urlCheck: 'http://example.com/api/check',
                urlTableList: 'http://example.com/api/table_list',
                urlTableDescription: 'http://example.com/api/table_description',
                urlData: 'http://example.com/api/data',
                settings: [
                  {
                    name: 'Логин',
                    type: 'STRING',
                    code: 'login',
                  },
                  {
                    name: 'Пароль',
                    type: 'STRING',
                    code: 'password',
                  },
                ],
                sort: 100,
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

          console.info('Created connector ID:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addConnector)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.connector.add(
            fields={
                "title": "SUPER REST CONNECTOR",
                "logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
                "description": "Connector with token",
                "urlCheck": "http://example.com/api/check",
                "urlTableList": "http://example.com/api/table_list",
                "urlTableDescription": "http://example.com/api/table_description",
                "urlData": "http://example.com/api/data",
                "settings": [
                    {
                        "name": "Логин",
                        "type": "STRING",
                        "code": "login",
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password",
                    },
                ],
                "sort": 100,
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
                'biconnector.connector.add',
                [
                    'fields' => [
                        "title"               => "SUPER REST CONNECTOR",
                        "logo"                => "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
                        "description"          => "Connector with token",
                        "urlCheck"             => "http://example.com/api/check",
                        "urlTableList"         => "http://example.com/api/table_list",
                        "urlTableDescription"  => "http://example.com/api/table_description",
                        "urlData"              => "http://example.com/api/data",
                        "settings"             => [
                            [
                                "name" => "Логин",
                                "type" => "STRING",
                                "code" => "login"
                            ],
                            [
                                "name" => "Пароль",
                                "type" => "STRING",
                                "code" => "password"
                            ]
                        ],
                        "sort"                => 100
                    ],
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
        echo 'Error adding connector: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.connector.add',
        {
            fields: {
                "title": "SUPER REST CONNECTOR",
                "logo": "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
                "description": "Connector with token",
                "urlCheck": "http://example.com/api/check",
                "urlTableList": "http://example.com/api/table_list",
                "urlTableDescription": "http://example.com/api/table_description",
                "urlData": "http://example.com/api/data",
                "settings": [
                    {
                        "name": "Логин",
                        "type": "STRING",
                        "code": "login"
                    },
                    {
                        "name": "Пароль",
                        "type": "STRING",
                        "code": "password"
                    }
                ],
                "sort": 100
            },
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
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.connector.add',
        [
            'fields' => [
                'title' => 'SUPER REST CONNECTOR',
                'logo' => 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==',
                'description' => 'Connector with token',
                'urlCheck' => 'http://example.com/api/check',
                'urlTableList' => 'http://example.com/api/table_list',
                'urlTableDescription' => 'http://example.com/api/table_description',
                'urlData' => 'http://example.com/api/data',
                'settings' => [
                    [
                        'name' => 'Логин',
                        'type' => 'STRING',
                        'code' => 'login'
                    ],
                    [
                        'name' => 'Пароль',
                        'type' => 'STRING',
                        'code' => 'password'
                    ]
                ],
                'sort' => 100
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
    res, err := client.Core().Call(ctx, "biconnector.connector.add", b24.Params{
    	"fields": b24.Params{
    		"title":               "SUPER REST CONNECTOR",
    		"logo":                "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAyMiAyMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KCTxjaXJjbGUgY3g9IjExIiBjeT0iMTEiIHI9IjEwIiBmaWxsPSIjRkYzQjNCIiAvPgoJPHRleHQgeD0iMTEiIHk9IjEzIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iNiIgZmlsbD0iI0ZGRkZGRiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC13ZWlnaHQ9ImJvbGQiPlJFU1Q8L3RleHQ+Cjwvc3ZnPg==",
    		"description":         "Connector with token",
    		"urlCheck":            "http://example.com/api/check",
    		"urlTableList":        "http://example.com/api/table_list",
    		"urlTableDescription": "http://example.com/api/table_description",
    		"urlData":             "http://example.com/api/data",
    		"settings": []b24.Params{
    			{
    				"name": "Логин",
    				"type": "STRING",
    				"code": "login",
    			},
    			{
    				"name": "Пароль",
    				"type": "STRING",
    				"code": "password",
    			},
    		},
    		"sort": 100,
    	},
    })
    if err != nil {
    	return fmt.Errorf("biconnector.connector.add: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.connector.add: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
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
      "id": 4
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
[`integer`](../../data-types.md) | Идентификатор созданного коннектора. Передавайте его в параметре `id` методов [biconnector.connector.get](./biconnector-connector-get.md) и [biconnector.connector.update](./biconnector-connector-update.md) и в параметре `connectorId` метода [biconnector.source.add](../source/biconnector-source-add.md) ||
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
|| `VALIDATION_SETTINGS_MISSING_REQUIRED_FIELDS` | Settings must include "type", "name" and "code" fields. | В настройках должны быть указаны поля `type`, `name` и `code` ||
|| `VALIDATION_SETTINGS_NAME_TOO_LONG` | Parameter "name" must be less than 512 characters. | Значение параметра `name` не должно превышать 512 символов ||
|| `VALIDATION_SETTINGS_CODE_TOO_LONG` | Parameter "code" must be less than 512 characters. | Значение параметра `code` не должно превышать 512 символов ||
|| `VALIDATION_SETTINGS_INVALID_TYPE` | Parameter "type" is not correct. | Недопустимое значение параметра `type` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-connector-update.md)
- [{#T}](./biconnector-connector-get.md)
- [{#T}](./biconnector-connector-list.md)
- [{#T}](./biconnector-connector-delete.md)
- [{#T}](./biconnector-connector-fields.md)
