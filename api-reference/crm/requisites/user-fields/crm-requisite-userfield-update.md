# Изменить пользовательское поле реквизита crm.requisite.userfield.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод изменяет существующее пользовательское поле реквизита.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля. Можно получить с помощью метода [crm.requisite.userfield.list](./crm-requisite-userfield-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей — объект вида `{"поле": "значение"[, ...]}`, значения которых нужно изменить ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Признак множественности. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **MANDATORY**
[`char`](../../../data-types.md) | Признак обязательности. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Показывать ли в фильтре списка. Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока 
||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать ли в списке. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **EDIT_FORM_LABEL**
[`string`](../../../data-types.md) | Подпись в форме редактирования ||
|| **LIST_COLUMN_LABEL**
[`string`](../../../data-types.md) | Заголовок в списке ||
|| **LIST_FILTER_LABEL**
[`string`](../../../data-types.md) | Подпись фильтра в списке ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md) | Сообщение об ошибке ||
|| **HELP_MESSAGE**
[`string`](../../../data-types.md) | Помощь ||
|| **LIST**
[`uf_enum_element`](../../../data-types.md) | Элементы списка. Для получения подробной информации смотрите раздел [{#T}](../../universal/user-defined-fields/crm-userfield-enumeration-fields.md) ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные настройки (зависят от типа). Для получения подробной информации смотрите раздел [{#T}](../../universal/user-defined-fields/crm-userfield-settings-fields.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":235,"fields":{"EDIT_FORM_LABEL":"Категория","LIST_COLUMN_LABEL":"Категория","LIST_FILTER_LABEL":"Категория"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.userfield.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":235,"fields":{"EDIT_FORM_LABEL":"Категория","LIST_COLUMN_LABEL":"Категория","LIST_FILTER_LABEL":"Категория"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.userfield.update
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
        method: 'crm.requisite.userfield.update',
        params: {
          id: 235,
          fields: {
            EDIT_FORM_LABEL: 'Category',
            LIST_COLUMN_LABEL: 'Category',
            LIST_FILTER_LABEL: 'Category',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('User field updated:', result)
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
      async function updateRequisiteUserField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.requisite.userfield.update',
            params: {
              id: 235,
              fields: {
                EDIT_FORM_LABEL: 'Category',
                LIST_COLUMN_LABEL: 'Category',
                LIST_FILTER_LABEL: 'Category',
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
          console.info('User field updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateRequisiteUserField)
    </script>
    ```

- PHP


    ```php
    $title = "Категория";
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.userfield.update',
                [
                    'id' => 235,
                    'fields' => [
                        'EDIT_FORM_LABEL'   => $title,
                        'LIST_COLUMN_LABEL' => $title,
                        'LIST_FILTER_LABEL' => $title
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const title = "Категория";
    BX24.callMethod(
        "crm.requisite.userfield.update",
        {
            id: 235,
            fields:
            {
                "EDIT_FORM_LABEL": title,
                "LIST_COLUMN_LABEL": title,
                "LIST_FILTER_LABEL": title
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $title = "Категория";

    $result = CRest::call(
        'crm.requisite.userfield.update',
        [
            'id' => 235,
            'fields' =>
            [
                'EDIT_FORM_LABEL' => $title,
                'LIST_COLUMN_LABEL' => $title,
                'LIST_FILTER_LABEL' => $title
            ]
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
    "result": true,
    "time": {
        "start": 1717769551.504986,
        "finish": 1717769551.817433,
        "duration": 0.31244707107543945,
        "processing": 0.04784202575683594,
        "date_start": "2024-06-07T16:12:31+02:00",
        "date_finish": "2024-06-07T16:12:31+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат изменения пользовательского поля реквизита:
- true — изменено
- false — не изменено 
||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The entity with ID '235' is not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Текст ошибки** | **Описание** ||
|| Пустая строка | `Operation is not allowed. Entity ID is not defined` | Пользовательское поле с указанным идентификатором не найдено ||
|| Пустая строка | `The entity with ID '235' is not found` | Пользовательское поле с указанным идентификатором не найдено ||
|| Пустая строка | `ID is not defined or invalid` | Идентификатор пользовательского поля не указан или имеет недопустимое значение ||
|| Пустая строка | `Access denied` | Недостаточно прав доступа для изменения пользовательского поля ||
|| `ERROR_CORE` | `Fail to update user field` |  Не удалось изменить пользовательское поле ||
|| `ERROR_CORE` | `Fail to save enumeration field values` | Не удалось сохранить значения пользовательского поля списочного типа (например, когда произошло дублирование внешнего ключа одного из значений) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-userfield-add.md)
- [{#T}](./crm-requisite-userfield-get.md)
- [{#T}](./crm-requisite-userfield-list.md)
- [{#T}](./crm-requisite-userfield-delete.md)
