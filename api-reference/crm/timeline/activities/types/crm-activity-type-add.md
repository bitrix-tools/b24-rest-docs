# Добавить пользовательский тип дела crm.activity.type.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод `crm.activity.type.add` регистрирует пользовательский тип дела с указанием названия и иконки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../../data-types.md#object_type) | Значения полей для добавления нового пользовательского типа дела в виде структуры:

```json
fields:
{
    "TYPE_ID": 'значение',
    "NAME": 'значение',
    "ICON_FILE": 'значение',
    "IS_CONFIGURABLE_TYPE": 'значение',
}
```

Подробное описание приведено [ниже](#parametr-fields)
|#

### Параметр fields {#parametr-fields}

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE_ID***
[`string`](../../../../data-types.md) | Строковое значение типа дела, например `1C`. При создании дела это поле `PROVIDER_TYPE_ID` ||
|| **NAME**
[`string`](../../../../data-types.md) | Название типа дела, например `Дело 1с` для сделки. По умолчанию пустая строка ||
|| **ICON_FILE**
[`attached_diskfile`](../../../../data-types.md) | Файл иконки типа дела, описанный по [правилам](../../../../files/how-to-upload-files.md) ||
|| **IS_CONFIGURABLE_TYPE**
[`string`](../../../../data-types.md) | Значение по умолчанию - `N`. Значение `Y` - признак того, что тип будет использоваться для [конфигурируемых дел](../configurable/crm-activity-configurable-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TYPE_ID":"1C","NAME":"Дело 1C","ICON_FILE":"@type-icon","IS_CONFIGURABLE_TYPE":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.type.add
    ```

    После этого достаточно при создании дела указывать свой тип, иконка и название будут подгружаться автоматически.
    
    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"OWNER_TYPE_ID":1,"OWNER_ID":selectedEntityId,"PROVIDER_ID":"REST_APP","PROVIDER_TYPE_ID":"1C","SUBJECT":"Новое дело","COMPLETED":"N","RESPONSIBLE_ID":1,"DESCRIPTION":"Описание нового дела"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'crm.activity.type.add',
        params: {
          fields: {
            TYPE_ID: '1C',
            NAME: '1C activity',
            ICON_FILE: document.getElementById('type-icon'), // file input node
            IS_CONFIGURABLE_TYPE: 'N',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Activity type added:', result)
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
      async function addActivityType() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.type.add',
            params: {
              fields: {
                TYPE_ID: '1C',
                NAME: '1C activity',
                ICON_FILE: document.getElementById('type-icon'), // file input node
                IS_CONFIGURABLE_TYPE: 'N',
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
          console.info('Activity type added:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addActivityType)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.type.add',
                [
                    'fields' => [
                        'TYPE_ID'            => '1C',
                        'NAME'               => 'Дело 1C',
                        'ICON_FILE'          => $_FILES['type-icon'], // file input node
                        'IS_CONFIGURABLE_TYPE' => 'N',
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
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding activity type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.type.add",
        {
            fields:
            {
                "TYPE_ID": '1C',
                "NAME": "Дело 1C",
                'ICON_FILE': document.getElementById('type-icon'), // file input node
                "IS_CONFIGURABLE_TYPE": "N"
            }
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

    После этого достаточно при создании дела указывать свой тип, иконка и название будут подгружаться автоматически. 

    ```js
    BX24.callMethod(
        'crm.activity.add',
        {
            fields:
            {
                "OWNER_TYPE_ID": 1,
                "OWNER_ID": selectedEntityId,
                "PROVIDER_ID": 'REST_APP',
                "PROVIDER_TYPE_ID": '1C',
                "SUBJECT": "Новое дело",
                "COMPLETED": "N",
                "RESPONSIBLE_ID": 1,
                "DESCRIPTION": "Описание нового дела"
            }
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.type.add',
        [
            'fields' => [
                'TYPE_ID' => '1C',
                'NAME' => 'Дело 1C',
                'ICON_FILE' => $_FILES['type-icon'], // Assuming file input is handled
                'IS_CONFIGURABLE_TYPE' => 'N'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

    После этого достаточно при создании дела указывать свой тип, иконка и название будут подгружаться автоматически. 

     ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.add',
        [
            'fields' => [
                'OWNER_TYPE_ID' => 1,
                'OWNER_ID' => $selectedEntityId, // Assuming this variable is defined
                'PROVIDER_ID' => 'REST_APP',
                'PROVIDER_TYPE_ID' => '1C',
                'SUBJECT' => 'Новое дело',
                'COMPLETED' => 'N',
                'RESPONSIBLE_ID' => 1,
                'DESCRIPTION' => 'Описание нового дела'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.activity.type.add(
            fields={
                "TYPE_ID": "CUSTOM_CALL",
                "NAME": "Custom call",
                "ICON_FILE": {
                    "fileData": [
                        "activity-type.svg",
                        "PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjwvc3ZnPg==",
                    ],
                },
                "IS_CONFIGURABLE_TYPE": "N",
            },
        ).response
        result = bitrix_response.result
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | Корневой элемент ответа. Содержит:
- `true` — в случае успеха
- `false` — в случае неудачи (произошла ошибка)
||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнения операции ||
|| `Access denied! Application context required` | Метод работает только в контексте приложений ||
|| `INVALID_ARG_VALUE` | Не заполнено обязательное поле `TYPE_ID` ||
|| `INVALID_ARG_VALUE` | Пользовательский тип дела с указанным `TYPE_ID` уже существует ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-type-list.md)
- [{#T}](./crm-activity-type-delete.md)
