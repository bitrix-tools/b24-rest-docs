# Получить пользовательское поле задачи по идентификатору task.item.userfield.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `task.item.userfield.get` получает описание пользовательского поля задачи по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../../data-types.md) | Идентификатор пользовательского поля.

Идентификатор пользовательского поля задачи можно получить при [создании поля](./task-item-user-field-add.md) или методом [получения списка полей](./task-item-user-field-get-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "ID": 1325
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.userfield.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "ID": 1325,
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/task.item.userfield.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the user field object returned in result
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UserFieldResult = {
      ID: string
      ENTITY_ID: string
      FIELD_NAME: string
      USER_TYPE_ID: string
      XML_ID: string
      SORT: string
      MULTIPLE: string
      MANDATORY: string
      SHOW_FILTER: string
      SHOW_IN_LIST: string
      EDIT_IN_LIST: string
      IS_SEARCHABLE: string
      EDIT_FORM_LABEL: Record<string, string>
      LIST_COLUMN_LABEL: Record<string, string>
      LIST_FILTER_LABEL: Record<string, string>
      ERROR_MESSAGE: Record<string, string>
      HELP_MESSAGE: Record<string, string>
      SETTINGS: {
        SIZE: number
        ROWS: number
        REGEXP: string
        MIN_LENGTH: number
        MAX_LENGTH: number
        DEFAULT_VALUE: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<UserFieldResult>({
        method: 'task.item.userfield.get',
        params: {
          ID: 1325,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.ID, result.FIELD_NAME, result.USER_TYPE_ID)
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
      async function getUserField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.item.userfield.get',
            params: {
              ID: 1325,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.ID, result.FIELD_NAME, result.USER_TYPE_ID)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getUserField)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.item.userfield.get',
                [
                    'ID' => 1325
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.item.userfield.get',
        {
            ID: 1325
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.item.userfield.get',
        [
            'ID' => 1325
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "1325",
        "ENTITY_ID": "TASKS_TASK",
        "FIELD_NAME": "UF_TASK_CLIENT_REQUEST",
        "USER_TYPE_ID": "string",
        "XML_ID": "UF_TASK_CLIENT_REQUEST",
        "SORT": "220",
        "MULTIPLE": "N",
        "MANDATORY": "N",
        "SHOW_FILTER": "N",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "SIZE": 20,
            "ROWS": 10,
            "REGEXP": "",
            "MIN_LENGTH": 0,
            "MAX_LENGTH": 0,
            "DEFAULT_VALUE": "Уточнить цель и ожидаемый результат"
        },
        "EDIT_FORM_LABEL": {
            "ar": "",
            "br": "",
            "de": "",
            "en": "Description of client request",
            ...,
            "ru": "Описание запроса клиента",
            ...
        },
        "LIST_COLUMN_LABEL": {
            "ar": "Запрос клиента",
            "br": "Запрос клиента",
            ...
        },
        "LIST_FILTER_LABEL": {
            "ar": "Запрос клиента",
            "br": "Запрос клиента",
            ...
        },
        "ERROR_MESSAGE": {
            "ar": "Запрос клиента",
            "br": "Запрос клиента",
            ...
        },
        "HELP_MESSAGE": {
            "ar": "Запрос клиента",
            "br": "Запрос клиента",
            ...
        }
    },
    "total": 0,
    "time": {
        "start": 1772718119,
        "finish": 1772718119.677154,
        "duration": 0.6771540641784668,
        "processing": 0,
        "date_start": "2026-03-05T16:41:59+03:00",
        "date_finish": "2026-03-05T16:41:59+03:00",
        "operating_reset_at": 1772718719,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект пользовательского поля [(подробное описание)](#result) ||
|| **total**
[`integer`](../../data-types.md) | Сейчас возвращает `0` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор пользовательского поля ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Код объекта, к которому привязано поле ||
|| **FIELD_NAME**
[`string`](../../data-types.md) | Код пользовательского поля ||
|| **USER_TYPE_ID**
[`string`](../../data-types.md) | Тип данных ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **SORT**
[`integer`](../../data-types.md) | Порядок сортировки ||
|| **MULTIPLE**
[`char`](../../data-types.md) | Признак множественного значения. Возможные значения:
- `Y` — множественное
- `N` — единственное ||
|| **MANDATORY**
[`char`](../../data-types.md) | Признак обязательного поля. Возможные значения:
- `Y` — обязательное
- `N` — не обязательное ||
|| **SHOW_FILTER**
[`char`](../../data-types.md) | Показ в фильтре списка ||
|| **SHOW_IN_LIST**
[`char`](../../data-types.md) | Показ в списке ||
|| **EDIT_IN_LIST**
[`char`](../../data-types.md) | Разрешено редактирование в списке ||
|| **IS_SEARCHABLE**
[`char`](../../data-types.md) | Значение участвует в поиске ||
|| **EDIT_FORM_LABEL**
[`object`](../../data-types.md) | Локализованные подписи в форме редактирования ||
|| **LIST_COLUMN_LABEL**
[`object`](../../data-types.md) | Локализованные заголовки колонки в списке ||
|| **LIST_FILTER_LABEL**
[`object`](../../data-types.md) | Локализованные подписи в фильтре списка ||
|| **ERROR_MESSAGE**
[`object`](../../data-types.md) | Локализованные тексты ошибок валидации ||
|| **HELP_MESSAGE**
[`object`](../../data-types.md) | Локализованные подсказки для поля ||
|| **SETTINGS**
[`object`](../../data-types.md) | Дополнительные настройки поля [(подробное описание)](#settings) ||
|#

#### Объект SETTINGS {#settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **SIZE**
[`integer`](../../data-types.md) | Ширина поля ввода ||
|| **ROWS**
[`integer`](../../data-types.md) | Количество строк в поле ввода ||
|| **REGEXP**
[`string`](../../data-types.md) | Регулярное выражение для проверки значения ||
|| **MIN_LENGTH**
[`integer`](../../data-types.md) | Минимальная длина значения ||
|| **MAX_LENGTH**
[`integer`](../../data-types.md) | Максимальная длина значения ||
|| **DEFAULT_VALUE**
[`string`](../../data-types.md) | Значение по умолчанию ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | No parameters found | Не передан обязательный параметр `ID` ||
|| `400` | `ERROR_CORE` | ID is not defined or invalid | В параметре `ID` передано нечисловое значение или значение `<= 0` ||
|| `400` | `ERROR_NOT_FOUND` | The entity with ID '{ID}' is not found | Пользовательское поле с указанным `ID` не найдено ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-item-user-field-add.md)
- [{#T}](./task-item-user-field-update.md)
- [{#T}](./task-item-user-field-get-list.md)
- [{#T}](./task-item-user-field-delete.md)
- [{#T}](./task-item-user-field-get-types.md)
- [{#T}](./task-item-user-field-get-fields.md)
