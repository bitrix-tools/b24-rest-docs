# Добавить пользовательское поле task.item.userfield.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `task.item.userfield.add` создает пользовательское поле задачи.

При создании пользовательского поля обязательно использовать префикс `UF_` в названии поля `FIELD_NAME`. Если не указать префикс, система автоматически добавит его в начало названия.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PARAMS***
[`object`](../../data-types.md) | Набор параметров создаваемого поля [(подробное описание)](#params) ||
|#

### Параметр PARAMS {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_TYPE_ID***
[`string`](../../data-types.md) | Тип данных пользовательского поля.

Поддерживаются значения:
- `string` — строка
- `double` — число
- `datetime` — дата и время
- `boolean` — да/нет ||
|| **FIELD_NAME***
[`string`](../../data-types.md) | Код пользовательского поля ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор ||
|| **EDIT_FORM_LABEL**
[`object`](../../data-types.md) | Подпись в форме редактирования [(подробное описание)](#edit_form_label) ||
|| **LABEL**
[`string`](../../data-types.md) | Название пользовательского поля ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка
||
|| **MULTIPLE**
[`string`](../../data-types.md) | Множественное значение. Возможные значения:
- `Y` — множественное
- `N` — единственное

Применяется для типов `string`, `double`, `datetime`. Для типа `boolean` всегда используется `N` ||
|| **MANDATORY**
[`string`](../../data-types.md) | Обязательное значение. Возможные значения:
- `Y` — обязательно
- `N` — не обязательное
||
|| **SETTINGS**
[`object`](../../data-types.md) | Дополнительные настройки типа поля [(подробное описание)](#settings) ||
|#

### Параметр EDIT_FORM_LABEL {#edit_form_label}

#|
|| **Название**
`тип` | **Описание** ||
|| **ru**
[`string`](../../data-types.md) | Подпись на русском языке ||
|| **en**
[`string`](../../data-types.md) | Подпись на английском языке ||
|#

### Параметр SETTINGS {#settings}

Поля объекта `SETTINGS` зависят от типа `USER_TYPE_ID`.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../data-types.md) | Значение по умолчанию ||
    || **ROWS**
    [`integer`](../../data-types.md) | Количество строк в поле ввода ||
    |#

- double

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`double`](../../data-types.md) | Значение по умолчанию ||
    |#

- datetime

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
     | Значение по умолчанию. Описывается как объект с двумя параметрами:
    1. `TYPE` [`string`](../../data-types.md) —  режим заполнения значения по умолчанию
        - `NONE` — значение по умолчанию не задается
        - `FIXED` — используется значение из `VALUE`
        - `NOW` — используется текущее время
    2. `VALUE` [`datetime`](../../data-types.md) — значение для типа `FIXED`
    
    ```js
    DEFAULT_VALUE: {
        TYPE: 'NOW',
        VALUE: ''
    },
    ```
    
    ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../data-types.md) | Значение по умолчанию:
    - `0` — нет
    - `1` — да ||
    || **DISPLAY**
    [`string`](../../data-types.md) | Вариант отображения значения:
    - `CHECKBOX` — флажок
    - `RADIO` — радиокнопки
    - `DROPDOWN` — выпадающий список ||
    |#

{% endlist %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "PARAMS": {
        "USER_TYPE_ID": "string",
        "FIELD_NAME": "UF_TASK_CLIENT_REQUEST",
        "XML_ID": "UF_TASK_CLIENT_REQUEST",
        "EDIT_FORM_LABEL": {
          "ru": "Запрос клиента",
          "en": "Client request"
        },
        "LABEL": "Запрос клиента",
        "SORT": 220,
        "MULTIPLE": "N",
        "MANDATORY": "Y",
        "SETTINGS": {
          "DEFAULT_VALUE": "Уточнить цель и ожидаемый результат",
          "ROWS": 10
        }
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.item.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "PARAMS": {
        "USER_TYPE_ID": "string",
        "FIELD_NAME": "UF_TASK_CLIENT_REQUEST",
        "XML_ID": "UF_TASK_CLIENT_REQUEST",
        "EDIT_FORM_LABEL": {
          "ru": "Запрос клиента",
          "en": "Client request"
        },
        "LABEL": "Запрос клиента",
        "SORT": 220,
        "MULTIPLE": "N",
        "MANDATORY": "Y",
        "SETTINGS": {
          "DEFAULT_VALUE": "Уточнить цель и ожидаемый результат",
          "ROWS": 10
        }
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/task.item.userfield.add
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'task.item.userfield.add',
        params: {
          PARAMS: {
            USER_TYPE_ID: 'string',
            FIELD_NAME: 'UF_TASK_CLIENT_REQUEST',
            XML_ID: 'UF_TASK_CLIENT_REQUEST',
            EDIT_FORM_LABEL: {
              ru: 'Запрос клиента',
              en: 'Client request',
            },
            LABEL: 'Client request',
            SORT: 220,
            MULTIPLE: 'N',
            MANDATORY: 'Y',
            SETTINGS: {
              DEFAULT_VALUE: 'Clarify the goal and expected result',
              ROWS: 10,
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
        console.info('Created user field ID:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- UMD

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addTaskUserField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.item.userfield.add',
            params: {
              PARAMS: {
                USER_TYPE_ID: 'string',
                FIELD_NAME: 'UF_TASK_CLIENT_REQUEST',
                XML_ID: 'UF_TASK_CLIENT_REQUEST',
                EDIT_FORM_LABEL: {
                  ru: 'Запрос клиента',
                  en: 'Client request',
                },
                LABEL: 'Client request',
                SORT: 220,
                MULTIPLE: 'N',
                MANDATORY: 'Y',
                SETTINGS: {
                  DEFAULT_VALUE: 'Clarify the goal and expected result',
                  ROWS: 10,
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
          console.info('Created user field ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTaskUserField)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.item.userfield.add',
                [
                    'PARAMS' => [
                        'USER_TYPE_ID' => 'string',
                        'FIELD_NAME' => 'UF_TASK_CLIENT_REQUEST',
                        'XML_ID' => 'UF_TASK_CLIENT_REQUEST',
                        'EDIT_FORM_LABEL' => [
                            'ru' => 'Запрос клиента',
                            'en' => 'Client request'
                        ],
                        'LABEL' => 'Запрос клиента',
                        'SORT' => 220,
                        'MULTIPLE' => 'N',
                        'MANDATORY' => 'Y',
                        'SETTINGS' => [
                            'DEFAULT_VALUE' => 'Уточнить цель и ожидаемый результат',
                            'ROWS' => 10
                        ]
                    ]
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
        'task.item.userfield.add',
        {
            PARAMS: {
                USER_TYPE_ID: 'string',
                FIELD_NAME: 'UF_TASK_CLIENT_REQUEST',
                XML_ID: 'UF_TASK_CLIENT_REQUEST',
                LABEL: 'Запрос клиента',
                EDIT_FORM_LABEL: {
                    ru: 'Запрос клиента',
                    en: 'Client request'
                },
                SORT: 220,
                MULTIPLE: 'N',
                MANDATORY: 'Y',
                SETTINGS: {
                    DEFAULT_VALUE: 'Уточнить цель и ожидаемый результат',
                    ROWS: 10
                }
            }
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
        'task.item.userfield.add',
        [
            'PARAMS' => [
                'USER_TYPE_ID' => 'string',
                'FIELD_NAME' => 'UF_TASK_CLIENT_REQUEST',
                'XML_ID' => 'UF_TASK_CLIENT_REQUEST',
                'EDIT_FORM_LABEL' => [
                    'ru' => 'Запрос клиента',
                    'en' => 'Client request'
                ],
                'LABEL' => 'Запрос клиента',
                'SORT' => 220,
                'MULTIPLE' => 'N',
                'MANDATORY' => 'Y',
                'SETTINGS' => [
                    'DEFAULT_VALUE' => 'Уточнить цель и ожидаемый результат',
                    'ROWS' => 10
                ]
            ]
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 1325,
    "time": {
        "start": 1772711476,
        "finish": 1772711476.284127,
        "duration": 0.28412699699401855,
        "processing": 0,
        "date_start": "2026-03-05T14:51:16+03:00",
        "date_finish": "2026-03-05T14:51:16+03:00",
        "operating_reset_at": 1772712076,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного пользовательского поля ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "The 'USER_TYPE_ID' field is not found."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | The 'USER_TYPE_ID' field is not found | Не передан параметр `USER_TYPE_ID` или передано пустое значение ||
|| `400` | `ERROR_CORE` | Указан неверный пользовательский тип. | В параметре `USER_TYPE_ID` указан неверный или несуществующий тип пользовательского поля ||
|| `400` | `ERROR_CORE` | The 'FIELD_NAME' field is not found | Не передан параметр `FIELD_NAME` или передано пустое значение ||
|| `400` | `ERROR_CORE` | Поле UF_TASK_CLIENT_REQUEST для объекта TASKS_TASK уже существует. | В параметре `FIELD_NAME` указано название пользовательского поля, которое уже есть в системе ||
|| `400` | `ERROR_CORE` | Access denied | Недостаточно прав для создания пользовательского поля ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-item-user-field-update.md)
- [{#T}](./task-item-user-field-get.md)
- [{#T}](./task-item-user-field-get-list.md)
- [{#T}](./task-item-user-field-delete.md)
- [{#T}](./task-item-user-field-get-types.md)
- [{#T}](./task-item-user-field-get-fields.md)
