# Добавить пользовательское поле user.userfield.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user.userfield`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `user.userfield.add` создает пользовательское поле в профиле сотрудника и возвращает его идентификатор. К коду `FIELD_NAME` автоматически добавляется префикс `UF_USR_`, тип и множественность поля после создания изменить нельзя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md)| Значения полей для добавления нового пользовательского поля ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIELD_NAME***
[`string`](../../data-types.md)| Название (код) поля. Битрикс24 приводит его к верхнему регистру и дополняет префиксом `UF_USR_`:

- `DEALS` и `UF_DEALS` превратятся в `UF_USR_DEALS`
- `UF_USR_DEALS` останется без изменений

Итоговый код поля возвращает метод [user.userfield.list](./user-userfield-list.md) ||
|| **USER_TYPE_ID***
[`string`](../../data-types.md)| Тип пользовательского поля. После создания тип изменить нельзя. Возможные значения:
- `string` — строка
- `integer` — целое число
- `double` — число
- `date` — дата
- `datetime` — дата со временем
- `boolean` — Да / Нет
- `file` — файл
- `enumeration` — список
- `url` — ссылка
- `address` — адрес Google карты
- `money` — деньги
- `iblock_section` — Привязка к разделу инфоблока
- `iblock_element` — Привязка к элементу инфоблока
- `employee` — Привязка к пользователю
- `crm` — Привязка к элементу CRM
- `crm_status` — Привязка к справочнику CRM ||
|| **XML_ID**
[`string`](../../data-types.md)| Внешний код ||
|| **SORT**
[`integer`](../../data-types.md)| Порядок сортировки ||
|| **MULTIPLE**
[`string`](../../data-types.md)| Является ли поле множественным. После создания изменить нельзя. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|| **SHOW_FILTER**
[`string`](../../data-types.md)| Показывать ли поле в фильтре списка. Возможные значения:
- `Y` — да. Метод сохраняет значение `E` — фильтр по маске, его возвращает [user.userfield.list](./user-userfield-list.md)
- `N` — нет

По умолчанию `N` ||
|| **SETTINGS**
[`object`](../../data-types.md)| Дополнительные настройки поля. Набор зависит от типа `USER_TYPE_ID` [(подробное описание)](#settings) ||
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

Параметры `MANDATORY`, `SHOW_IN_LIST`, `EDIT_IN_LIST` и `IS_SEARCHABLE` метод не принимает и игнорирует без ошибки. Поле всегда создается со значениями `MANDATORY` = `N`, `SHOW_IN_LIST` = `Y`, `EDIT_IN_LIST` = `Y`, `IS_SEARCHABLE` = `N`.

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

- date|datetime

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
      - `FIXED` — использовать время/дату из `VALUE`. Для типа `datetime` значение `FIXED` сейчас сохраняется некорректно: метод возвращает дату `1970-01-01`. Используйте `NOW` или `NONE`

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

    Если не передать ни одну из следующих опций, то по умолчанию будет включена привязка к лидам (`LEAD = Y`).

    #|
    || **Название**
    `тип` | **Описание** ||
    || **LEAD**
    [`string`](../../data-types.md) | Включена ли привязка к [Лидам](../../crm/leads/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N`. Если не включена ни одна привязка, включается `LEAD` ||
    || **CONTACT**
    [`string`](../../data-types.md) | Включена ли привязка к [Контактам](../../crm/contacts/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **COMPANY**
    [`string`](../../data-types.md) | Включена ли привязка к [Компаниям](../../crm/companies/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    || **DEAL**
    [`string`](../../data-types.md) | Включена ли привязка к [Сделкам](../../crm/deals/index.md). Возможные значения:
    - `Y` — да
    - `N` — нет

    По умолчанию `N` ||
    |#

{% endlist %}

Для типов `file`, `url`, `address`, `money` и `employee` метод не принимает `SETTINGS`: переданные настройки игнорируются, поле получает системные настройки по умолчанию. Для поля типа `employee` значение `SHOW_FILTER` = `Y` сохраняется как `I` — фильтр по точному совпадению.

### Параметр LIST {#list}

Варианты значений для поля типа `enumeration`. Передается в `fields` как массив объектов.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **VALUE***
[`string`](../../data-types.md) | Текст варианта. Варианты с пустым `VALUE` не сохраняются ||
|| **SORT**
[`integer`](../../data-types.md) | Порядок варианта в списке ||
|| **DEF**
[`string`](../../data-types.md) | Вариант по умолчанию:
- `Y` — да
- `N` — нет

Для поля с `MULTIPLE` = `N` по умолчанию может быть только один вариант — первый с `DEF` = `Y` ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний код варианта. Если не передан, генерируется автоматически ||
|#

{% note info "" %}

Если необходимо через API создать пользовательское поле с добавленным пользовательским типом, в поле `USER_TYPE_ID` необходимо указывать `rest_<номер приложения>_<USER_TYPE_ID добавленного типа>`. Например `rest_436278_test_type`.

{% endnote %}

{% note warning "" %}

Поле добавляется в профили всех сотрудников, поэтому в Битрикс24 с большим числом пользователей запрос выполняется долго и может прерваться по таймауту. Подробнее в разделе [Частые причины серверных ошибок](./index.md#server-errors).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields": {
            "FIELD_NAME": "UF_USR_DEALS",
            "USER_TYPE_ID": "crm",
            "XML_ID": "UF_CRM_DEALS",
            "SORT": 100,
            "MULTIPLE": "Y",
            "SHOW_FILTER": "N",
            "SETTINGS": {
                "DEAL": "Y"
            },
            "LABEL": "Привязка к сделкам CRM",
            "EDIT_FORM_LABEL": {
                "ru": "Привязка к сделкам CRM"
            }
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields": {
            "FIELD_NAME": "UF_USR_DEALS",
            "USER_TYPE_ID": "crm",
            "XML_ID": "UF_CRM_DEALS",
            "SORT": 100,
            "MULTIPLE": "Y",
            "SHOW_FILTER": "N",
            "SETTINGS": {
                "DEAL": "Y"
            },
            "LABEL": "Привязка к сделкам CRM",
            "EDIT_FORM_LABEL": {
                "ru": "Привязка к сделкам CRM"
            }
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.userfield.add
    ```
    
- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AddUserFieldResult = number

    try {
      const response = await $b24.actions.v2.call.make<AddUserFieldResult>({
        method: 'user.userfield.add',
        params: {
          fields: {
            FIELD_NAME: 'UF_USR_DEALS',
            USER_TYPE_ID: 'crm',
            XML_ID: 'UF_CRM_DEALS',
            SORT: 100,
            MULTIPLE: 'Y',
            SHOW_FILTER: 'N',
            SETTINGS: {
              DEAL: 'Y',
            },
            LABEL: 'CRM deals binding',
            EDIT_FORM_LABEL: {
              ru: 'CRM deals binding',
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
        console.info('Created user field with ID:', result)
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
      async function addUserField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'user.userfield.add',
            params: {
              fields: {
                FIELD_NAME: 'UF_USR_DEALS',
                USER_TYPE_ID: 'crm',
                XML_ID: 'UF_CRM_DEALS',
                SORT: 100,
                MULTIPLE: 'Y',
                SHOW_FILTER: 'N',
                SETTINGS: {
                  DEAL: 'Y',
                },
                LABEL: 'CRM deals binding',
                EDIT_FORM_LABEL: {
                  ru: 'CRM deals binding',
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
          console.info('Created user field with ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addUserField)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.userfield.add(
            fields={
                "FIELD_NAME": "UF_USR_DEALS",
                "USER_TYPE_ID": "crm",
                "XML_ID": "UF_CRM_DEALS",
                "SORT": 100,
                "MULTIPLE": "Y",
                "SHOW_FILTER": "N",
                "SETTINGS": {
                    "DEAL": "Y",
                },
                "LABEL": "Привязка к сделкам CRM",
                "EDIT_FORM_LABEL": {
                    "ru": "Привязка к сделкам CRM",
                },
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
                'user.userfield.add',
                [
                    'fields' => [
                        'FIELD_NAME' => 'UF_USR_DEALS',
                        'USER_TYPE_ID' => 'crm',
                        'XML_ID' => 'UF_CRM_DEALS',
                        'SORT' => 100,
                        'MULTIPLE' => 'Y',
                        'SHOW_FILTER' => 'N',
                        'SETTINGS' => [
                            'DEAL' => 'Y',
                        ],
                        'LABEL' => 'Привязка к сделкам CRM',
                        'EDIT_FORM_LABEL' => [
                            'ru' => 'Привязка к сделкам CRM'
                        ],
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
        echo 'Error adding user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'user.userfield.add', 
        {
            fields: {
                FIELD_NAME: "UF_USR_DEALS",
                USER_TYPE_ID: "crm",
                XML_ID: "UF_CRM_DEALS",
                SORT: 100,
                MULTIPLE: "Y",
                SHOW_FILTER: "N",
                SETTINGS: {
                    DEAL: "Y",
                },
                LABEL: "Привязка к сделкам CRM",
                EDIT_FORM_LABEL: {
                    ru: "Привязка к сделкам CRM"
                },
            },
        },
        function(result)
        {
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
        'user.userfield.add',
        [
            'fields' => [
                'FIELD_NAME' => 'UF_USR_DEALS',
                'USER_TYPE_ID' => 'crm',
                'XML_ID' => 'UF_CRM_DEALS',
                'SORT' => 100,
                'MULTIPLE' => 'Y',
                'SHOW_FILTER' => 'N',
                'SETTINGS' => [
                    'DEAL' => 'Y',
                ],
                'LABEL' => 'Привязка к сделкам CRM',
                'EDIT_FORM_LABEL' => [
                    'ru' => 'Привязка к сделкам CRM'
                ],
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
    res, err := client.Core().Call(ctx, "user.userfield.add", b24.Params{
    	"fields": b24.Params{
    		"FIELD_NAME":   "UF_USR_DEALS",
    		"USER_TYPE_ID": "crm",
    		"XML_ID":       "UF_CRM_DEALS",
    		"SORT":         100,
    		"MULTIPLE":     "Y",
    		"SHOW_FILTER":  "N",
    		"SETTINGS": b24.Params{
    			"DEAL": "Y",
    		},
    		"LABEL": "Привязка к сделкам CRM",
    		"EDIT_FORM_LABEL": b24.Params{
    			"ru": "Привязка к сделкам CRM",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("user.userfield.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 6008111,
    "time": {
        "start": 1793288724,
        "finish": 1793288724.469025,
        "duration": 0.4690248966217041,
        "processing": 0,
        "date_start": "2026-10-29T18:45:24+03:00",
        "date_finish": "2026-10-29T18:45:24+03:00",
        "operating_reset_at": 1793289240,
        "operating": 0.11251688003540039
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
   "error":"",
   "error_description":"The \u0027FIELD_NAME\u0027 field is not found."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | Поле UF_USR_\*\*\* для объекта USER уже существует. | Поле с таким `FIELD_NAME` уже есть ||
|| `400` | `ERROR_CORE` | Указан неверный пользовательский тип. | В `USER_TYPE_ID` передан тип не из списка ||
|| `400` | `ERROR_CORE` | Fail to create new user field | Ошибка при создании поля ||
|| `400` | Пустая строка | The \u0027FIELD_NAME\u0027 field is not found. | Не задано обязательное поле `FIELD_NAME` ||
|| `400` | Пустая строка | The \u0027USER_TYPE_ID\u0027 field is not found. | Не задано обязательное поле `USER_TYPE_ID` ||
|| `400` | Пустая строка | Access denied. | У пользователя нет прав администратора ||
|| `401` | `insufficient_scope` | The request requires higher privileges than provided by the webhook token | У вебхука или приложения нет scope `user.userfield` ||
|| `500` | `INTERNAL_SERVER_ERROR` | Internal server error | Превышен лимит в 1016 пользовательских полей или запрос не успел выполниться за время `max_execution_time`. Подробнее в разделе [Частые причины серверных ошибок](./index.md#server-errors) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-userfield-update.md)
- [{#T}](./user-userfield-list.md)
- [{#T}](./user-userfield-delete.md)
- [{#T}](../user-update.md)
- [{#T}](../user-get.md)
