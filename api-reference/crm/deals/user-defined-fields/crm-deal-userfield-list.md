# Получить список пользовательских полей сделок crm.deal.userfield.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «чтения» сделок

Метод `crm.deal.userfield.list` возвращает список пользовательских полей сделок по фильтру: имена, типы и настройки полей.

## Параметры метода

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

- `field_n` — поле для фильтрации
- `value_n` — значение фильтра

Если `filter` не передан, метод вернет все пользовательские поля сделок.

Все условия по отдельным полям соединяются с помощью `AND`. Поддерживается только точное совпадение: условия с префиксами `>`, `<`, `!`, `%` и условия с массивом значений метод игнорирует без ошибки. Смотрите ниже [список доступных полей для фильтрации](#filterable) ||
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

- `field_n` — поле для сортировки
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список доступных полей для сортировки:
- `ID` — идентификатор пользовательского поля
- `FIELD_NAME` — имя поля с префиксом `UF_CRM_`
- `USER_TYPE_ID` — тип пользовательского поля
- `XML_ID` — внешний код
- `SORT` — индекс сортировки

По умолчанию:
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
[`string`](../../../data-types.md) | Имя поля с префиксом `UF_CRM_` ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Тип пользовательского поля. Возможные значения:
- `string` — строка
- `integer` — целое число
- `double` — число
- `boolean` — да/нет
- `datetime` — дата/время
- `date` — дата
- `money` — деньги
- `url` — ссылка
- `address` — адрес
- `enumeration` — список
- `file` — файл
- `employee` — привязка к сотруднику
- `crm_status` — привязка к справочнику CRM
- `iblock_section` — привязка к разделам информационных блоков
- `iblock_element` — привязка к элементам информационных блоков
- `crm` — привязка к элементам CRM
- [пользовательские типы полей](../../universal/user-defined-fields/userfield-type.md)

Полный список типов, доступных в Битрикс24, возвращает метод [crm.userfield.types](../../universal/user-defined-fields/crm-userfield-types.md) ||
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
[`string`](../../../data-types.md) | [Языковой идентификатор](../../data-types.md#lang-ids). Если передать `LANG`, метод вернет подписи поля на этом языке:
- `EDIT_FORM_LABEL` — подпись в форме редактирования
- `LIST_COLUMN_LABEL` — заголовок в списке
- `LIST_FILTER_LABEL` — подпись фильтра в списке
- `ERROR_MESSAGE` — сообщение об ошибке
- `HELP_MESSAGE` — помощь ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Получить список пользовательских полей, которые:
- являются множественными
- являются обязательными
- имеют подписи пользовательского поля на русском языке

Благодаря фильтру по параметру `LANG` дополнительно получим в ответе названия полей.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"MULTIPLE":"Y","MANDATORY":"Y","LANG":"ru"},"order":{"USER_TYPE_ID":"ASC","SORT":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.userfield.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"MULTIPLE":"Y","MANDATORY":"Y","LANG":"ru"},"order":{"USER_TYPE_ID":"ASC","SORT":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.userfield.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each userfield returned in result[]
    type CrmDealUserfieldListItem = {
      ID: string
      ENTITY_ID: string
      FIELD_NAME: string
      USER_TYPE_ID: string
      XML_ID: string | null
      SORT: string
      MULTIPLE: string
      MANDATORY: string
      SHOW_FILTER: string
      SHOW_IN_LIST: string
      EDIT_IN_LIST: string
      IS_SEARCHABLE: string
    }

    try {
      // crm.deal.userfield.list has no pagination: all matching fields come in one response
      const response = await $b24.actions.v2.call.make<CrmDealUserfieldListItem[]>({
        method: 'crm.deal.userfield.list',
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
        console.info('Userfields found:', result.length, result)
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
      async function listDealUserfields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.deal.userfield.list has no pagination: all matching fields come in one response
          const response = await $b24.actions.v2.call.make({
            method: 'crm.deal.userfield.list',
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
          console.info('Userfields found:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listDealUserfields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException
    try:
        bitrix_response = client.crm.deal.userfield.list(filter={
            "MULTIPLE": "Y",
            "MANDATORY": "Y",
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
                'crm.deal.userfield.list',
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
        'crm.deal.userfield.list',
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
        'crm.deal.userfield.list',
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
    res, err := client.Core().Call(ctx, "crm.deal.userfield.list", b24.Params{
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
    	return fmt.Errorf("crm.deal.userfield.list: %w", err)
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

    // Метод отдает все поля одним ответом, Total равен их количеству.
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
            "ID": "5815",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1713790573",
            "USER_TYPE_ID": "crm_status",
            "XML_ID": null,
            "SORT": "100",
            "MULTIPLE": "Y",
            "MANDATORY": "Y",
            "SHOW_FILTER": "I",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "ENTITY_TYPE": "INDUSTRY"
            },
            "EDIT_FORM_LABEL": "Справочник",
            "LIST_COLUMN_LABEL": "Справочник",
            "LIST_FILTER_LABEL": "Справочник",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "6799",
            "ENTITY_ID": "CRM_DEAL",
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
                },
                {
                    "ID": "3161",
                    "SORT": "30",
                    "VALUE": "Love Радио",
                    "DEF": "N",
                    "XML_ID": "dff769fa19d7d7ce8d0677341d221161"
                },
                {
                    "ID": "3163",
                    "SORT": "40",
                    "VALUE": "Радио Монте-Карло",
                    "DEF": "N",
                    "XML_ID": "1f22e5c818ce336a42bd0ec94eb69b9e"
                },
                {
                    "ID": "3181",
                    "SORT": "130",
                    "VALUE": "DFM Юрьев-Польский",
                    "DEF": "N",
                    "XML_ID": "fc1c5e6b4a9fd20b4749240b8dbac41a"
                }
            ]
        },
        {
            "ID": "6791",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1722578010",
            "USER_TYPE_ID": "file",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "Y",
            "MANDATORY": "Y",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "SIZE": 20,
                "LIST_WIDTH": 0,
                "LIST_HEIGHT": 0,
                "MAX_SHOW_SIZE": 0,
                "MAX_ALLOWED_SIZE": 0,
                "EXTENSIONS": [],
                "TARGET_BLANK": "Y"
            },
            "EDIT_FORM_LABEL": "КП (файлы)",
            "LIST_COLUMN_LABEL": "КП (файлы)",
            "LIST_FILTER_LABEL": "КП (файлы)",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "5567",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1709565075",
            "USER_TYPE_ID": "resourcebooking",
            "XML_ID": null,
            "SORT": "1",
            "MULTIPLE": "Y",
            "MANDATORY": "Y",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "USE_USERS": "N",
                "USE_RESOURCES": "Y",
                "RESOURCES": {
                    "resource": {
                        "XML_ID": "resource",
                        "NAME": "resource",
                        "SECTIONS": [
                            {
                                "ID": "7",
                                "CAL_TYPE": "resource",
                                "NAME": "Зал музея"
                            },
                            {
                                "ID": "49",
                                "CAL_TYPE": "resource",
                                "NAME": "ресурс 1"
                            },
                            {
                                "ID": "51",
                                "CAL_TYPE": "resource",
                                "NAME": "ресурс 2"
                            },
                            {
                                "ID": "53",
                                "CAL_TYPE": "resource",
                                "NAME": "1"
                            },
                            {
                                "ID": "57",
                                "CAL_TYPE": "resource",
                                "NAME": "Ресурс"
                            },
                            {
                                "ID": "59",
                                "CAL_TYPE": "resource",
                                "NAME": "Ресурс 2"
                            }
                        ]
                    }
                },
                "SELECTED_RESOURCES": [
                    {
                        "type": "resource",
                        "id": "7",
                        "title": "Зал музея"
                    }
                ],
                "SELECTED_USERS": [],
                "FULL_DAY": "N",
                "ALLOW_OVERBOOKING": "Y",
                "USE_SERVICES": "N",
                "SERVICE_LIST": [
                    {
                        "name": "",
                        "duration": "60"
                    }
                ],
                "RESOURCE_LIMIT": -1,
                "TIMEZONE": "Europe/Kaliningrad",
                "USE_USER_TIMEZONE": "N"
            },
            "EDIT_FORM_LABEL": "БРОНИРОВАНИЕ ПЕРЕГОВОРОК",
            "LIST_COLUMN_LABEL": "БРОНИРОВАНИЕ ПЕРЕГОВОРОК",
            "LIST_FILTER_LABEL": "БРОНИРОВАНИЕ ПЕРЕГОВОРОК",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        }
    ],
    "total": 4,
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
[`object[]`](../../../data-types.md) | Массив пользовательских полей сделок [(подробное описание)](#result). Если подходящих полей нет — пустой массив `[]`.

Постраничной навигации у метода нет: все подходящие поля приходят одним ответом, параметр `start` не учитывается ||
|| **total**
[`integer`](../../../data-types.md) | Количество найденных пользовательских полей. Совпадает с длиной массива `result` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

Числовые значения `ID` и `SORT` приходят строками.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../../data-types.md) | Идентификатор пользовательского поля. Используется в методах [crm.deal.userfield.get](./crm-deal-userfield-get.md), [crm.deal.userfield.update](./crm-deal-userfield-update.md) и [crm.deal.userfield.delete](./crm-deal-userfield-delete.md) ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Объект, к которому привязано поле. Для сделок всегда `CRM_DEAL` ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Имя поля с префиксом `UF_CRM_`. По этому имени значение поля записывают и читают в методах сделок, например [crm.deal.update](../crm-deal-update.md) и [crm.deal.get](../crm-deal-get.md). Сам метод значения полей в сделках не возвращает ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Тип поля, значения — в [списке для фильтрации](#filterable) ||
|| **USER_TYPE_OWNER**
[`string`](../../../data-types.md) | Идентификатор приложения, которое зарегистрировало [пользовательский тип поля](../../universal/user-defined-fields/userfield-type.md). Возвращается только для полей пользовательского типа ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний код. Если не задан — `null` ||
|| **SORT**
[`string`](../../../data-types.md) | Индекс сортировки ||
|| **MULTIPLE**, **MANDATORY**, **SHOW_IN_LIST**, **EDIT_IN_LIST**, **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Флаги поля со значениями `Y` или `N`, смысл — в [списке полей для фильтрации](#filterable) ||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Режим фильтра: `N`, `I`, `E` или `S`, расшифровка — в [списке полей для фильтрации](#filterable) ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Настройки типа поля, например `DEFAULT_VALUE` или `PRECISION`. Набор ключей зависит от `USER_TYPE_ID`. Список ключей для типа возвращает метод [crm.userfield.settings.fields](../../universal/user-defined-fields/crm-userfield-settings-fields.md). Значение по умолчанию у полей типа `datetime` приходит в формате ISO 8601 ||
|| **EDIT_FORM_LABEL**, **LIST_COLUMN_LABEL**, **LIST_FILTER_LABEL**, **ERROR_MESSAGE**, **HELP_MESSAGE**
[`string`](../../../data-types.md) | Подписи поля на языке из `filter.LANG`. Возвращаются, только если в фильтре передан `LANG`. Если подписи на этом языке нет — `null`.

Подписи на всех языках сразу возвращает метод [crm.deal.userfield.get](./crm-deal-userfield-get.md) ||
|| **LIST**
[`object[]`](../../../data-types.md) | Элементы списка. Возвращаются только для полей типа `enumeration`, отсортированы по `SORT`. Каждый элемент содержит:
- `ID` — идентификатор элемента, его передают в значении поля при записи в сделку
- `SORT` — индекс сортировки
- `VALUE` — значение элемента
- `DEF` — значение по умолчанию: `Y` или `N`
- `XML_ID` — внешний код элемента ||
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
|| `400` | Пустое значение | `Parameter 'order' must be array.` | Переданный `order` не является объектом ||
|| `400` | Пустое значение | `Parameter 'filter' must be array.` | Переданный `filter` не является объектом ||
|| `400` | Пустое значение | `Access denied.` | У пользователя нет права «чтения» сделок ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-userfield-add.md)
- [{#T}](./crm-deal-userfield-update.md)
- [{#T}](./crm-deal-userfield-get.md)
- [{#T}](./crm-deal-userfield-delete.md)
- [{#T}](../crm-deal-get.md)
- [{#T}](../crm-deal-update.md)
- [{#T}](./index.md)
- [{#T}](../../../../tutorials/field-types/how-to-add-precision-to-user-field.md)
- [{#T}](../../../../tutorials/crm/how-to-edit-crm-objects/how-to-set-paid-date-to-deal.md)
