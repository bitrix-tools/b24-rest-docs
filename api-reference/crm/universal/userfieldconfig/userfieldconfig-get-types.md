# Получить доступные типы пользовательских полей userfieldconfig.getTypes

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`userfieldconfig`](../../../scopes/permissions.md), scope модуля из `moduleId` (например, [`crm`](../../../scopes/permissions.md))
>
> Кто может выполнять метод: пользователь с правом чтения объекта, которому принадлежит поле, в модуле `moduleId`

Метод `userfieldconfig.getTypes` возвращает набор доступных типов пользовательских полей для модуля.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **moduleId***
[`string`](../../../data-types.md) | Идентификатор модуля, для которого нужно получить доступные типы полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/userfieldconfig.getTypes
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"moduleId":"crm","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userfieldconfig.getTypes
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type TypeItem = {
      userTypeId: string
      description: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type GetTypesResult = {
      types: Record<string, TypeItem>
    }

    try {
      const response = await $b24.actions.v2.call.make<GetTypesResult>({
        method: 'userfieldconfig.getTypes',
        params: {
          moduleId: 'crm',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.types)
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
      async function getTypes() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'userfieldconfig.getTypes',
            params: {
              moduleId: 'crm',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.types)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTypes)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'userfieldconfig.getTypes',
                [
                    'moduleId' => 'crm',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Result: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'userfieldconfig.getTypes',
        {
            moduleId: 'crm',
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userfieldconfig.getTypes',
        [
            'moduleId' => 'crm',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "types": {
            "crm": {
                "userTypeId": "crm",
                "description": "Привязка к элементам CRM"
            },
            "crm_status": {
                "userTypeId": "crm_status",
                "description": "Привязка к справочникам CRM"
            },
            "money": {
                "userTypeId": "money",
                "description": "Деньги"
            },
            "employee": {
                "userTypeId": "employee",
                "description": "Привязка к сотруднику"
            },
            "rest_219_test": {
                "userTypeId": "rest_219_test",
                "description": "Test type"
            },
            "string": {
                "userTypeId": "string",
                "description": "Строка"
            },
            "integer": {
                "userTypeId": "integer",
                "description": "Целое число"
            },
            "double": {
                "userTypeId": "double",
                "description": "Число"
            },
            "datetime": {
                "userTypeId": "datetime",
                "description": "Дата со временем"
            },
            "date": {
                "userTypeId": "date",
                "description": "Дата"
            },
            "boolean": {
                "userTypeId": "boolean",
                "description": "Да/Нет"
            },
            "address": {
                "userTypeId": "address",
                "description": "Адрес"
            },
            "url": {
                "userTypeId": "url",
                "description": "Ссылка"
            },
            "file": {
                "userTypeId": "file",
                "description": "Файл"
            },
            "enumeration": {
                "userTypeId": "enumeration",
                "description": "Список"
            },
            "iblock_section": {
                "userTypeId": "iblock_section",
                "description": "Привязка к разделам инф. блоков"
            },
            "iblock_element": {
                "userTypeId": "iblock_element",
                "description": "Привязка к элементам инф. блоков"
            }
        }
    },
    "time": {
        "start": 1774356634,
        "finish": 1774356634.880673,
        "duration": 0.8806729316711426,
        "processing": 0,
        "date_start": "2026-03-24T15:50:34+03:00",
        "date_finish": "2026-03-24T15:50:34+03:00",
        "operating_reset_at": 1774357234,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **types**
[`object`](../../../data-types.md) | Словарь доступных типов, где ключом является идентификатор типа, а значением объект с полями `userTypeId` и `description` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The current method required more scopes. (crm)"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | The current method required more scopes. (crm) | У приложения нет нужного scope для модуля из `moduleId` ||
|| `-` | No settings for UserFieldAccess | Для переданного `moduleId` не настроен доступ к пользовательским полям ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./userfieldconfig-add.md)
- [{#T}](./userfieldconfig-update.md)
- [{#T}](./userfieldconfig-get.md)
- [{#T}](./userfieldconfig-list.md)
- [{#T}](./userfieldconfig-delete.md)
