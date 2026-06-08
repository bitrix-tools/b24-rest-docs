# Обновить пользовательское поле user.userfield.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user.userfield`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `user.userfield.update` обновляет пользовательское поле.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** 
[`integer`](../../data-types.md)| Идентификатор пользовательского поля.

Для получения идентификаторов пользовательских полей используйте метод [user.userfield.list](./user-userfield-list.md)
 ||
|| **fields**
[`object`](../../data-types.md)| Значения полей для обновления пользовательского поля ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **XML_ID**
[`string`](../../data-types.md)| Внешний код ||
|| **SORT**
[`integer`](../../data-types.md)| Порядок сортировки ||
|| **MANDATORY**
[`boolean`](../../data-types.md)| Является ли пользовательское поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SHOW_FILTER**
[`boolean`](../../data-types.md)| Показывать ли поле в фильтре списка. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SHOW_IN_LIST**
[`boolean`](../../data-types.md)| Показывать ли поле в списке. Возможные значения:
- `Y` — да
- `N` — нет ||
- || **EDIT_IN_LIST**
[`boolean`](../../data-types.md)| Редактировать ли поле в списке. Возможные значения:
- `Y` — да
- `N` — нет ||
- || **IS_SEARCHABLE**
[`boolean`](../../data-types.md)| Участвует ли поле в поиске. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SETTINGS**
[`object`](../../data-types.md)| Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}` для передачи дополнительных настроек пользовательских полей. Настройки описаны [ниже](#settings) ||
|| **EDIT_FORM_LABEL**
[`string`](../../data-types.md)| Подпись в форме редактирования. Можно передать строку или объект с подписями по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **LIST_COLUMN_LABEL**
[`string`](../../data-types.md)| Заголовок столбца в списке. Можно передать строку или объект с подписями по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **LIST_FILTER_LABEL**
[`string`](../../data-types.md)| Заголовок фильтра в списке. Можно передать строку или объект с подписями по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **ERROR_MESSAGE**
[`string`](../../data-types.md)| Сообщение об ошибке при невалидном вводе. Можно передать строку или объект с текстами по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **HELP_MESSAGE**
[`string`](../../data-types.md)| Текст подсказки к полю. Можно передать строку или объект с текстами по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **LABEL**
[`string`](../../data-types.md)| Название пользовательского поля по умолчанию. 

Значение будет выставлено в поля `LIST_FILTER_LABEL`, `LIST_COLUMN_LABEL`, `EDIT_FORM_LABEL`, `ERROR_MESSAGE`, `HELP_MESSAGE`, если в них не передано значение ||
|#

### Параметр SETTINGS {#settings}

У каждого типа пользовательских полей существует свой набор дополнительных настроек.

{% list tabs %}

- string

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`string`](../../data-types.md) | Значение по умолчанию.

    По умолчанию `''` ||
    || **ROWS**
    [`integer`](../../data-types.md) | Количество строк в поле ввода. Обязательно больше 0.

    По умолчанию `1` ||
    |#

- integer

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../data-types.md) | Значение по умолчанию ||
    |#

- double

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`double`](../../data-types.md) | Значение по умолчанию ||
    || **PRECISION**
    [`integer`](../../data-types.md) | Точность числа. Обязательно больше или равно 0.

    По умолчанию `2` ||
    |#

- boolean

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`integer`](../../data-types.md) | Значение по умолчанию, где `1` — да, `0` — нет.

    Возможные значения:
    - `>= 1` -> 1
    - `<= 0` -> 0

    По умолчанию `0` ||
    || **DISPLAY**
    [`string`](../../data-types.md) | Внешний вид. Возможные значения:
    - `CHECKBOX` — флажок
    - `RADIO` — радиокнопки
    - `DROPDOWN` — выпадающий список

    По умолчанию `CHECKBOX` ||
    |#

- datetime

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`object`](../../data-types.md)  | Значение по умолчанию.

    Объект формата:

    ```
    {
        VALUE: datetime|date,
        TYPE: 'NONE'|'NOW'|'FIXED',
    }
    ```

    где:
    - `VALUE` — значение по умолчанию типа `datetime` или `date`
    - `TYPE` — тип значения по умолчанию:
      - `NONE` — не выставлять значение по умолчанию
      - `NOW` — использовать текущее время/дату
      - `FIXED` — использовать время/дату из `VALUE`

    Значение по умолчанию:

    ```
    {
        VALUE: '',
        TYPE: 'NONE',
    }
    ```
    ||
    |#

- enumeration

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DISPLAY**
    [`string`](../../data-types.md) | Внешний вид. Возможные значения:
    - `LIST` — список
    - `UI` — набираемый список
    - `CHECKBOX` — флажки
    - `DIALOG` — диалог выбора сущностей

    По умолчанию `LIST` ||
    || **LIST_HEIGHT** | Высота списка. Обязательно больше 0.

    Доступен только при `DISPLAY = LIST` или `DISPLAY = UI`.

    По умолчанию `1` ||
    |#

- iblock_section|iblock_element

    #|
    || **Название**
    `тип` | **Описание** ||
    || **IBLOCK_TYPE_ID**
    [`string`](../../data-types.md) | Идентификатор типа инфоблока.

    По умолчанию `''` ||
    || **IBLOCK_ID**
    [`string`](../../data-types.md) | Идентификатор инфоблока.

    По умолчанию `0` ||
    || **DEFAULT_VALUE**
    [`string`](../../data-types.md) | Значение по умолчанию.

    По умолчанию `''` ||
    || **DISPLAY**
    [`string`](../../data-types.md) | Внешний вид. Возможные значения:
    - `DIALOG` — диалог
    - `UI` — набираемый список
    - `LIST` — список
    - `CHECKBOX` — флажки

    По умолчанию `LIST` ||
    || **LIST_HEIGHT**
    [`integer`](../../data-types.md) | Высота списка. Обязательно больше 0.

    По умолчанию `1` ||
    || **ACTIVE_FILTER**
    [`boolean`](../../data-types.md) | Показывать ли элементы с включенным флагом активности. Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    |#

- crm_status

    #|
    || **Название**
    `тип` | **Описание** ||
    || **ENTITY_TYPE**
    [`string`](../../data-types.md) | Идентификатор типа справочника.

    Используйте [`crm.status.entity.types`](../../crm/status/crm-status-entity-types.md), чтобы узнать возможные значения.

    По умолчанию `''` ||
    |#

- crm

    Если не передать ни одну из следующих опций, то по умолчанию будет включена привязка к лидам (`LEAD = Y`).

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`boolean`](../../data-types.md) | Включена ли привязка к [Лидам](../../crm/leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **CONTACT**
    [`boolean`](../../data-types.md) | Включена ли привязка к [Контактам](../../crm/contacts/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **COMPANY**
    [`boolean`](../../data-types.md) | Включена ли привязка к [Компаниям](../../crm/companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **DEAL**
    [`boolean`](../../data-types.md) | Включена ли привязка к [Сделкам](../../crm/deals/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    |#

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    bitrix_id = 176
    fields = {
        "XML_ID": "UF_USR_SKILLS_PROFILE_V2",
        "SORT": 200,
        "MANDATORY": "N",
        "SHOW_FILTER": "Y",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "Y",
        "SETTINGS": {
            "DEFAULT_VALUE": "Senior Python integration engineer",
            "ROWS": 4,
        },
        "EDIT_FORM_LABEL": {
            "en": "Skills profile",
        },
        "LIST_COLUMN_LABEL": {
            "en": "Skills profile",
        },
        "LIST_FILTER_LABEL": {
            "en": "Skills profile",
        },
        "ERROR_MESSAGE": {
            "en": "Skills profile is invalid",
        },
        "HELP_MESSAGE": {
            "en": "Update the short integration skills summary.",
        },
        "LABEL": "Skills profile",
    }

    try:
        bitrix_response = client.user.userfield.update(
            bitrix_id=bitrix_id,
            fields=fields,
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
        print("Bitrix SDK error", error.message, sep="\n")
    except Exception as error:
        print("Unexpected error", error, sep="\n")
    ```
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
        "id": 42,
        "fields": {
            "SORT": 150,
            "LIST_FILTER_LABEL": "New Title",
            "LIST_COLUMN_LABEL": "New List Title"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.userfield.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "id": 42,
        "fields": {
            "SORT": 150,
            "LIST_FILTER_LABEL": "New Title",
            "LIST_COLUMN_LABEL": "New List Title"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.userfield.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UpdateUserFieldResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<UpdateUserFieldResult>({
        method: 'user.userfield.update',
        params: {
          id: 42,
          fields: {
            SORT: 150,
            LIST_FILTER_LABEL: 'New Title',
            LIST_COLUMN_LABEL: 'New List Title',
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
      async function updateUserField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'user.userfield.update',
            params: {
              id: 42,
              fields: {
                SORT: 150,
                LIST_FILTER_LABEL: 'New Title',
                LIST_COLUMN_LABEL: 'New List Title',
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

      document.addEventListener('DOMContentLoaded', updateUserField)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'user.userfield.update',
                [
                    'id' => 42,
                    'fields' => [
                        'SORT' => 150,
                        'LIST_FILTER_LABEL' => 'New Title',
                        'LIST_COLUMN_LABEL' => 'New List Title',
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'user.userfield.update', 
        {
            id: 42,
            fields: {
                SORT: 150,
                LIST_FILTER_LABEL: 'New Title',
                LIST_COLUMN_LABEL: 'New List Title',
            },
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.userfield.update',
        [
            'id' => 42,
            'fields' => [
                'SORT' => 150,
                'LIST_FILTER_LABEL' => 'New Title',
                'LIST_COLUMN_LABEL' => 'New List Title',
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
        "start":1747311864.008399,
        "finish":1747311865.063292,
        "duration":1.0548930168151855,
        "processing":0.17107510566711426,
        "date_start":"2025-05-15T14:24:24+02:00",
        "date_finish":"2025-05-15T14:24:25+02:00",
        "operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Cодержит `true` в случае успешного обновления пользовательского поля||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"",
    "error_description":"Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Поле с таким `id` не существует или доступ запрещен ||
|| Пустая строка | ID is not defined or invalid | Не задан или введен неверный `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-userfield-add.md)
- [{#T}](./user-userfield-list.md)
- [{#T}](./user-userfield-delete.md)
