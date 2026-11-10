# Обновить пользовательское поле user.userfield.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user.userfield`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `user.userfield.update` изменяет настройки и подписи пользовательского поля профиля. Код `FIELD_NAME`, тип `USER_TYPE_ID` и множественность `MULTIPLE` после создания изменить нельзя.

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
[`object`](../../data-types.md)| Настройки поля, которые нужно изменить [(подробное описание)](#fields). Непереданные настройки и подписи сохраняют текущие значения. Если `fields` не передан, метод ничего не меняет и возвращает `true` ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **XML_ID**
[`string`](../../data-types.md)| Внешний код ||
|| **SORT**
[`integer`](../../data-types.md)| Порядок сортировки ||
|| **SHOW_FILTER**
[`string`](../../data-types.md)| Показывать ли поле в фильтре списка. Возможные значения:
- `Y` — да. Метод сохраняет значение `E` — фильтр по маске, его возвращает [user.userfield.list](./user-userfield-list.md)
- `N` — нет ||
|| **SETTINGS**
[`object`](../../data-types.md)| Дополнительные настройки поля. Набор зависит от типа поля [(подробное описание)](#settings).

Передавайте только настройки, которые нужно изменить: метод дополняет сохраненные настройки, а не заменяет их целиком ||
|| **LIST**
[`object[]`](../../data-types.md)| Варианты значений для поля типа `enumeration` [(подробное описание)](#list) ||
|| **EDIT_FORM_LABEL**
[`string`](../../data-types.md) \| [`object`](../../data-types.md) | Подпись в форме редактирования. Можно передать строку или объект с подписями по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **LIST_COLUMN_LABEL**
[`string`](../../data-types.md) \| [`object`](../../data-types.md) | Заголовок столбца в списке. Можно передать строку или объект с подписями по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **LIST_FILTER_LABEL**
[`string`](../../data-types.md) \| [`object`](../../data-types.md) | Заголовок фильтра в списке. Можно передать строку или объект с подписями по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **ERROR_MESSAGE**
[`string`](../../data-types.md) \| [`object`](../../data-types.md) | Сообщение об ошибке при невалидном вводе. Можно передать строку или объект с текстами по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **HELP_MESSAGE**
[`string`](../../data-types.md) \| [`object`](../../data-types.md) | Текст подсказки к полю. Можно передать строку или объект с текстами по языкам в формате `{"ru": "...", "en": "..."}`. При передаче строки значение будет выставлено для всех языков ||
|| **LABEL**
[`string`](../../data-types.md)| Название пользовательского поля по умолчанию. 

Значение будет выставлено в поля `LIST_FILTER_LABEL`, `LIST_COLUMN_LABEL`, `EDIT_FORM_LABEL`, `ERROR_MESSAGE`, `HELP_MESSAGE`, если в них не передано значение ||
|#

Метод игнорирует без ошибки параметры, которые нельзя изменить: код `FIELD_NAME`, тип `USER_TYPE_ID`, признак множественности `MULTIPLE`, а также `MANDATORY`, `SHOW_IN_LIST`, `EDIT_IN_LIST` и `IS_SEARCHABLE`.

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

    Для поля типа `date` метод не меняет `SETTINGS`: значение по умолчанию задается только при создании методом [user.userfield.add](./user-userfield-add.md).

    #|
    || **Название**
    `тип` | **Описание** ||
    || **DEFAULT_VALUE**
    [`object`](../../data-types.md)  | Значение по умолчанию.

    Объект формата:

    ```json
    {
        "VALUE": "2026-01-15",
        "TYPE": "FIXED"
    }
    ```

    где:
    - `VALUE` — значение по умолчанию типа `datetime` или `date`
    - `TYPE` — тип значения по умолчанию:
      - `NONE` — не выставлять значение по умолчанию
      - `NOW` — использовать текущее время/дату
      - `FIXED` — использовать время/дату из `VALUE`. Сейчас значение `FIXED` сохраняется некорректно: метод возвращает дату `1970-01-01`. Используйте `NOW` или `NONE`

    Значение по умолчанию:

    ```json
    {
        "VALUE": "",
        "TYPE": "NONE"
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
    || **LIST_HEIGHT**
    [`integer`](../../data-types.md) | Высота списка. Обязательно больше 0.

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
    [`string`](../../data-types.md) | Показывать ли элементы с включенным флагом активности. Возможные значения:
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

    Метод меняет только переданные привязки, остальные сохраняют текущие значения.

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`string`](../../data-types.md) | Включена ли привязка к [Лидам](../../crm/leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет ||
    || **CONTACT**
    [`string`](../../data-types.md) | Включена ли привязка к [Контактам](../../crm/contacts/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет ||
    || **COMPANY**
    [`string`](../../data-types.md) | Включена ли привязка к [Компаниям](../../crm/companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет ||
    || **DEAL**
    [`string`](../../data-types.md) | Включена ли привязка к [Сделкам](../../crm/deals/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет ||
    |#

{% endlist %}

Для типов `file`, `url`, `address`, `money` и `employee` метод не меняет `SETTINGS`: переданные настройки игнорируются, сохраненные настройки поля остаются прежними. Для поля типа `employee` значение `SHOW_FILTER` = `Y` сохраняется как `I` — фильтр по точному совпадению.

### Параметр LIST {#list}

Варианты значений для поля типа `enumeration`. Передавайте только варианты, которые нужно изменить, добавить или удалить: остальные варианты сохраняются.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор существующего варианта. Его возвращает метод [user.userfield.list](./user-userfield-list.md) в массиве `LIST`. Без `ID` вариант добавляется как новый ||
|| **VALUE**
[`string`](../../data-types.md) | Текст варианта ||
|| **SORT**
[`integer`](../../data-types.md) | Порядок варианта в списке ||
|| **DEF**
[`string`](../../data-types.md) | Вариант по умолчанию:
- `Y` — да
- `N` — нет ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний код варианта. Если при изменении варианта не передать `XML_ID`, метод сгенерирует новый внешний код ||
|| **DEL**
[`string`](../../data-types.md) | Удалить вариант с указанным `ID`:
- `Y` — удалить ||
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.userfield.update(
            bitrix_id=42,
            fields={
                "SORT": 150,
                "LIST_FILTER_LABEL": "New Title",
                "LIST_COLUMN_LABEL": "New List Title",
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


- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.userfield.update", b24.Params{
    	"id": 42,
    	"fields": b24.Params{
    		"SORT":              150,
    		"LIST_FILTER_LABEL": "New Title",
    		"LIST_COLUMN_LABEL": "New List Title",
    	},
    })
    if err != nil {
    	return fmt.Errorf("user.userfield.update: %w", err)
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
        "start": 1793288729,
        "finish": 1793288730.001057,
        "duration": 1.0010569095611572,
        "processing": 1,
        "date_start": "2026-10-29T18:45:29+03:00",
        "date_finish": "2026-10-29T18:45:30+03:00",
        "operating_reset_at": 1793289300,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если поле обновлено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустая строка | Access denied. | У пользователя нет прав администратора, поле с переданным `id` не найдено или это системное поле профиля без префикса `UF_USR_`. Системные поля через REST менять нельзя ||
|| `400` | Пустая строка | ID is not defined or invalid. | Не передан `id` или передано значение меньше `1` ||
|| `401` | `insufficient_scope` | The request requires higher privileges than provided by the webhook token | У вебхука или приложения нет scope `user.userfield` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-userfield-add.md)
- [{#T}](./user-userfield-list.md)
- [{#T}](./user-userfield-delete.md)
