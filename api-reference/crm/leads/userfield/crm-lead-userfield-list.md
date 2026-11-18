# Получить список пользовательских полей лидов crm.lead.userfield.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения лидов

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.lead.field.custom.list](../../rest-v3/fields/crm-entity-field-custom-list-rest-v3.md).

{% endnote %}

Метод `crm.lead.userfield.list` возвращает список пользовательских полей лидов по фильтру.

Метод возвращает все поля, подходящие под фильтр, одним ответом без постраничности. Параметр `start` игнорируется, `next` не возвращается.

## Параметры метода

Все параметры необязательные. Без `filter` метод возвращает все пользовательские поля лидов.

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`](../../../data-types.md) | Объект формата:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет отфильтрована выборка пользовательских полей
- `value_n` — значение фильтра

Поддерживается только точное равенство. Условия соединяются с помощью `AND`. Ключи с префиксами `>`, `!`, `%`, неизвестные ключи, значения-массивы и пустые строки игнорируются. Смотрите ниже [список доступных полей для фильтрации](#filterable) ||
|| **order**
[`object`](../../../data-types.md) | Объект формата:
```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет произведена сортировка выборки элементов
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Направление сравнивается без учета регистра. Если передано значение, отличное от `ASC`, используется `DESC`.

Список доступных полей для сортировки:
- `ID` — идентификатор пользовательского поля
- `ENTITY_ID` — объект поля: `CRM_LEAD`
- `FIELD_NAME` — код пользовательского поля
- `USER_TYPE_ID` — тип пользовательского поля
- `XML_ID` — внешний код
- `SORT` — индекс сортировки

Если `order` не задан или не содержит доступных полей сортировки, используется порядок:
```
{
    "SORT": "ASC",
    "ID": "ASC"
}
```
||
|#

### Доступные для фильтрации поля {#filterable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Код пользовательского поля ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Идентификатор типа поля. Доступные типы возвращает [crm.userfield.types](../../universal/user-defined-fields/crm-userfield-types.md) ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Является ли пользовательское поле множественным.
Возможные значения:
- `Y` — да
- `N` — нет ||
|| **MANDATORY**
[`char`](../../../data-types.md) | Является ли пользовательское поле обязательным. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Показывать ли в фильтре списка. Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока ||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать ли в списке. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **LANG**
[`string`](../../../data-types.md) | [Языковой идентификатор](../../data-types.md#lang-ids). Выбирает язык подписей, не отбирает поля по наличию перевода. При передаче `LANG` ответ дополнительно содержит подписи на указанном языке (строки или `null`):
- `EDIT_FORM_LABEL` — подпись в форме редактирования
- `LIST_COLUMN_LABEL` — заголовок в списке
- `LIST_FILTER_LABEL` — подпись фильтра в списке
- `ERROR_MESSAGE` — сообщение об ошибке
- `HELP_MESSAGE` — помощь ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Получить множественные обязательные поля с подписями на русском языке. Отсортировать по типу и индексу сортировки.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"MULTIPLE":"Y","MANDATORY":"Y","LANG":"ru"},"order":{"USER_TYPE_ID":"ASC","SORT":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.userfield.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"MULTIPLE":"Y","MANDATORY":"Y","LANG":"ru"},"order":{"USER_TYPE_ID":"ASC","SORT":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.userfield.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each user field returned in result[] (filter.LANG adds translated labels)
    type CrmLeadUserFieldListItem = {
      ID: string
      ENTITY_ID: string
      FIELD_NAME: string
      USER_TYPE_ID: string
      XML_ID: string | null
      SORT: string
      MULTIPLE: string
      MANDATORY: string
      SHOW_IN_LIST: string
      EDIT_FORM_LABEL: string | null
      LIST_COLUMN_LABEL: string | null
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmLeadUserFieldListItem[]>({
        method: 'crm.lead.userfield.list',
        params: {
          filter: {
            MULTIPLE: 'Y',
            MANDATORY: 'Y',
            LANG: 'ru',
          },
          order: {
            USER_TYPE_ID: 'ASC',
            SORT: 'ASC',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('User fields:', result.length, result)
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
      async function listLeadUserFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.lead.userfield.list',
            params: {
              filter: {
                MULTIPLE: 'Y',
                MANDATORY: 'Y',
                LANG: 'ru',
              },
              order: {
                USER_TYPE_ID: 'ASC',
                SORT: 'ASC',
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
          console.info('User fields:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listLeadUserFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException
    try:
        bitrix_response = client.crm.lead.userfield.list(filter={
            "MANDATORY": "Y",
            "MULTIPLE": "Y",
            "LANG": "ru",
        }, order={
            "USER_TYPE_ID": "ASC",
            "SORT": "ASC",
        }).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print('Ошибка Bitrix API', f'error: {error.error}', f'error_description: {error.error_description}', sep='\n')
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
                'crm.lead.userfield.list',
                [
                    'filter' => [
                        'MULTIPLE' => 'Y',
                        'MANDATORY' => 'Y',
                        'LANG' => 'ru',
                    ],
                    'order' => [
                        'USER_TYPE_ID' => 'ASC',
                        'SORT' => 'ASC',
                    ],
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
        'crm.lead.userfield.list',
        {
            filter: {
                MULTIPLE: "Y",
                MANDATORY: "Y",
                LANG: "ru",
            },
            order: {
                USER_TYPE_ID: "ASC",
                SORT: "ASC",
            },
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
        'crm.lead.userfield.list',
        [
            'filter' => [
                'MULTIPLE' => "Y",
                'MANDATORY' => "Y",
                'LANG' => "ru",
            ],
            'order' => [
                'USER_TYPE_ID' => "ASC",
                'SORT' => "ASC",
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
    res, err := client.Core().Call(ctx, "crm.lead.userfield.list", b24.Params{
    	"filter": b24.Params{
    		"MULTIPLE":  "Y",
    		"MANDATORY": "Y",
    		"LANG":      "ru",
    	},
    	"order": b24.Params{
    		"USER_TYPE_ID": "ASC",
    		"SORT":         "ASC",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.lead.userfield.list: %w", err)
    }

    var items []struct {
    	ID         b24.ID `json:"ID"`
    	EntityID   string `json:"ENTITY_ID"`
    	FieldName  string `json:"FIELD_NAME"`
    	UserTypeID string `json:"USER_TYPE_ID"`
    	Sort       string `json:"SORT"`
    	Multiple   string `json:"MULTIPLE"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.EntityID)
    }

    if res.Total != nil {
    	fmt.Println("всего:", *res.Total)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "6799",
            "ENTITY_ID": "CRM_LEAD",
            "FIELD_NAME": "UF_CRM_1724077760",
            "USER_TYPE_ID": "enumeration",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "Y",
            "MANDATORY": "Y",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "DISPLAY": "LIST",
                "LIST_HEIGHT": 1,
                "CAPTION_NO_VALUE": "",
                "SHOW_NO_VALUE": "Y"
            },
            "EDIT_FORM_LABEL": "Радио",
            "LIST_COLUMN_LABEL": "Радио",
            "LIST_FILTER_LABEL": "Радио",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "LIST": [
                {
                    "ID": "3157",
                    "SORT": "10",
                    "VALUE": "Детское радио",
                    "DEF": "N",
                    "XML_ID": "79b4c576f96e65eb40f390e45c0dc802"
                },
                {
                    "ID": "3159",
                    "SORT": "20",
                    "VALUE": "Радио Шансон",
                    "DEF": "N",
                    "XML_ID": "d3ffd89a825f218f5efd79dffd38fbbf"
                }
            ]
        }
    ],
    "total": 1,
    "time": {
        "start": 1753793143.219832,
        "finish": 1753793143.529472,
        "duration": 0.30964016914367676,
        "processing": 0.06361007690429688,
        "date_start": "2025-07-29T15:45:43+03:00",
        "date_finish": "2025-07-29T15:45:43+03:00",
        "operating_reset_at": 1753793743,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Массив описаний полей. Основные характеристики перечислены в [таблице ответа crm.lead.userfield.get](./crm-lead-userfield-get.md#result). Без `filter.LANG` языковые подписи отсутствуют, с `filter.LANG` это строки или `null`, а не объекты. Для типа `enumeration` элементы `LIST` дополнительно содержат `XML_ID` — внешний код варианта ||
|| **total**
[`integer`](../../../data-types.md) | Количество найденных пользовательских полей ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'filter' must be array."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Parameter 'order' must be array. | Переданный `order` не является объектом или массивом ||
|| `400` | Пустое значение | Parameter 'filter' must be array. | Переданный `filter` не является объектом или массивом ||
|| `400` | Пустое значение | Access denied. | Нет права чтения лидов ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-lead-userfield-add.md)
- [{#T}](./crm-lead-userfield-update.md)
- [{#T}](./crm-lead-userfield-get.md)
- [{#T}](./crm-lead-userfield-delete.md)
