# Создать источник biconnector.source.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

Метод `biconnector.source.add` создает новый источник данных, связанный с коннектором.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md) и только с теми коннекторами, которые приложение создало само. При вызове вебхуком метод возвращает ошибку `ACCESS_DENIED`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект, содержащий данные для создания нового источника. Формат объекта:

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
[`string`](../../data-types.md) | Название источника ||
|| **description**
[`string`](../../data-types.md) | Описание источника ||
|| **active**
[`boolean`](../../data-types.md) | Активность источника.
Метод игнорирует переданное значение: созданный источник всегда активен ||
|| **connectorId***
[`integer`](../../data-types.md) | Идентификатор коннектора, можно получить методами [biconnector.connector.list](../connector/biconnector-connector-list.md) или [biconnector.connector.add](../connector/biconnector-connector-add.md) ||
|| **settings***
[`object`](../../data-types.md) | Значения параметров авторизации [(подробное описание)](#settings) ||
|#

При создании источника Битрикс24 обращается к эндпоинту проверки подключения коннектора. Если внешняя система не ответит, метод вернет ошибку `SOURCE_CREATE_CONNECTION_ERROR` и источник не создастся.

#### Параметр settings {#settings}

Передавайте `settings` объектом, где ключ — это `code` параметра, объявленного коннектором, а значение — то, что нужно подставить при подключении. Коды параметров можно получить методами [biconnector.connector.list](../connector/biconnector-connector-list.md) или [biconnector.connector.get](../connector/biconnector-connector-get.md). Ключи, которых нет в описании коннектора, отбрасываются без ошибки.

Если коннектор объявил параметры с кодами `login` и `password`, поле выглядит так:

```json
{
    "settings": {
        "login": "admin",
        "password": "qwerty"
    }
}
```

В ответе методов [biconnector.source.get](./biconnector-source-get.md) и [biconnector.source.list](./biconnector-source-list.md) то же поле приходит массивом объектов с полями `id`, `code`, `name`, `type` и `value`. Обе формы разобраны в разделе [Поле settings](./index.md#settings).

Метод [biconnector.source.fields](./biconnector-source-fields.md) объявляет `settings` типом `array`, но на вход метод `biconnector.source.add` принимает его объектом.

{% note warning "" %}

Значения параметров авторизации методы [biconnector.source.get](./biconnector-source-get.md) и [biconnector.source.list](./biconnector-source-list.md) возвращают в открытом виде, включая пароли и токены

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"CRM Source","description":"Источник данных CRM","connectorId":123,"settings":{"login":"admin","password":"qwerty"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/biconnector.source.add
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
    type SourceAddResult = {
      id: number
    }

    try {
      const response = await $b24.actions.v2.call.make<SourceAddResult | BiconnectorError>({
        method: 'biconnector.source.add',
        params: {
          fields: {
            title: 'CRM Source',
            description: 'Источник данных CRM',
            connectorId: 123,
            settings: {
              login: 'admin',
              password: 'qwerty',
            },
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
          console.info('Created source id:', result.id)
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
      async function addSource() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.source.add',
            params: {
              fields: {
                title: 'CRM Source',
                description: 'Источник данных CRM',
                connectorId: 123,
                settings: {
                  login: 'admin',
                  password: 'qwerty',
                },
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

          console.info('Created source id:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addSource)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.biconnector.source.add(
            fields={
                "title": "CRM Source",
                "description": "Источник данных CRM",
                "connectorId": 123,
                "settings": {
                    "login": "admin",
                    "password": "qwerty",
                },
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
                'biconnector.source.add',
                [
                    'fields' => [
                        "title"       => "CRM Source",
                        "description" => "Источник данных CRM",
                        "connectorId" => 123,
                        "settings"    => [
                            "login"    => "admin",
                            "password" => "qwerty"
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        $data = $result;

        // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200
        if (isset($data['error'])) {
            echo 'BIconnector error: ' . $data['error']['error'] . ': ' . $data['error']['error_description'];
        } else {
            echo 'Success: ' . print_r($data, true);
        }
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.source.add',
        {
            fields: {
                "title": "CRM Source",
                "description": "Источник данных CRM",
                "connectorId": 123,
                "settings": {
                    "login": "admin",
                    "password": "qwerty"
                }
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
        'biconnector.source.add',
        [
            'fields' => [
                'title' => 'CRM Source',
                'description' => 'Источник данных CRM',
                'connectorId' => 123,
                'settings' => [
                    'login' => 'admin',
                    'password' => 'qwerty'
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
    res, err := client.Core().Call(ctx, "biconnector.source.add", b24.Params{
    	"fields": b24.Params{
    		"title":       "CRM Source",
    		"description": "Источник данных CRM",
    		"connectorId": 123,
    		"settings": b24.Params{
    			"login":    "admin",
    			"password": "qwerty",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("biconnector.source.add: %w", err)
    }

    // Методы раздела кладут ошибку внутрь result и отвечают со статусом 200.
    var apiErr struct {
    	Error *struct {
    		Error       string `json:"error"`
    		Description string `json:"error_description"`
    	} `json:"error"`
    }
    if err := json.Unmarshal(res.Result, &apiErr); err == nil && apiErr.Error != nil {
    	return fmt.Errorf("biconnector.source.add: %s: %s", apiErr.Error.Error, apiErr.Error.Description)
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
      "id": 7
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
[`integer`](../../data-types.md) | Идентификатор созданного источника. Используйте его в методах [biconnector.source.get](./biconnector-source-get.md), [biconnector.source.update](./biconnector-source-update.md) и [biconnector.source.delete](./biconnector-source-delete.md) ||
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
|| `CONNECTOR_NOT_FOUND` | Connector was not found. | Коннектора нет или он принадлежит другому приложению ||
|| `SOURCE_CREATE_CONNECTION_ERROR` | Cannot create connection. | Внешняя система не ответила на запрос к эндпоинту проверки подключения — источник не создан ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-source-update.md)
- [{#T}](./biconnector-source-get.md)
- [{#T}](./biconnector-source-list.md)
- [{#T}](./biconnector-source-delete.md)
- [{#T}](./biconnector-source-fields.md)
