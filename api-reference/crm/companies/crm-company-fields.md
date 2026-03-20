# Получить описание полей компании crm.company.fields

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.company.fields` продолжает работать, но у него есть более актуальный аналог [crm.item.fields](../universal/crm-item-fields.md).

{% endnote %}

Метод `crm.company.fields` возвращает описание полей компании, в том числе [пользовательских](./userfields/index.md).

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.fields
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.company.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.fields',
                []
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
        echo 'Error fetching company fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.fields",
        {},
        function(result)
        {
            if(result.error())
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
        'crm.company.fields',
        []
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
        "ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID"
        },
        "TITLE": {
            "type": "string",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Название компании"
        },
        "COMPANY_TYPE": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "COMPANY_TYPE",
            "title": "Тип компании"
        },
        "LOGO": {
            "type": "file",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Логотип"
        },
        "ADDRESS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Фактический адрес"
        },
        "ADDRESS_2": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Адрес (стр. 2)"
        },
        "ADDRESS_CITY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Город"
        },
        "ADDRESS_POSTAL_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Почтовый индекс"
        },
        "ADDRESS_REGION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Район"
        },
        "ADDRESS_PROVINCE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Область"
        },
        "ADDRESS_COUNTRY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Страна"
        },
        "ADDRESS_COUNTRY_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Код страны"
        },
        "ADDRESS_LOC_ADDR_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Идентификатор адреса местоположения"
        },
        "ADDRESS_LEGAL": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес"
        },
        "REG_ADDRESS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес"
        },
        "REG_ADDRESS_2": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес (стр. 2)"
        },
        "REG_ADDRESS_CITY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес город"
        },
        "REG_ADDRESS_POSTAL_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес почтовый индекс "
        },
        "REG_ADDRESS_REGION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес район"
        },
        "REG_ADDRESS_PROVINCE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес область"
        },
        "REG_ADDRESS_COUNTRY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес страна"
        },
        "REG_ADDRESS_COUNTRY_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес код страны"
        },
        "REG_ADDRESS_LOC_ADDR_ID": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Юридический адрес идентификатор адреса местоположения"
        },
        "BANKING_DETAILS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Банковские реквизиты"
        },
        "INDUSTRY": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "INDUSTRY",
            "title": "Сфера деятельности"
        },
        "EMPLOYEES": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "EMPLOYEES",
            "title": "Кол-во сотрудников"
        },
        "CURRENCY_ID": {
            "type": "crm_currency",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Валюта"
        },
        "REVENUE": {
            "type": "double",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Годовой оборот"
        },
        "OPENED": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Доступна для всех"
        },
        "COMMENTS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Комментарий"
        },
        "HAS_PHONE": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Задан телефон"
        },
        "HAS_EMAIL": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Задан e-mail"
        },
        "HAS_IMOL": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Задана открытая линия"
        },
        "IS_MY_COMPANY": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Моя компания"
        },
        "ASSIGNED_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Ответственный"
        },
        "CREATED_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Кем создана"
        },
        "MODIFY_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Кем изменена"
        },
        "DATE_CREATE": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата создания"
        },
        "DATE_MODIFY": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата изменения"
        },
        "CONTACT_ID": {
            "type": "crm_contact",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Контакт"
        },
        "LEAD_ID": {
            "type": "crm_lead",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Лид",
            "settings": {
                "parentEntityTypeId": 1
            }
        },
        "ORIGINATOR_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Внешний источник"
        },
        "ORIGIN_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Идентификатор элемента во внешнем источнике"
        },
        "ORIGIN_VERSION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Версия оригинала"
        },
        "UTM_SOURCE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Рекламная система"
        },
        "UTM_MEDIUM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Тип трафика"
        },
        "UTM_CAMPAIGN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Обозначение рекламной кампании"
        },
        "UTM_CONTENT": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Содержание кампании"
        },
        "UTM_TERM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Условие поиска кампании"
        },
        "PARENT_ID_156": {
            "type": "crm_entity",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Закупка",
            "settings": {
                "parentEntityTypeId": 156
            }
        },
        "LAST_ACTIVITY_TIME": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Последняя активность"
        },
        "LAST_ACTIVITY_BY": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Автор последней активности в таймлайне"
        },
        "LAST_COMMUNICATION_TIME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата последней коммуникации"
        },
        "PHONE": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Телефон"
        },
        "EMAIL": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "E-mail"
        },
        "WEB": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Сайт"
        },
        "IM": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Мессенджер"
        },
        "LINK": {
            "type": "crm_multifield",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "LINK"
        },
        "UF_CRM_1687188367": {
            "type": "crm",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1687188367",
            "listLabel": "Дочерняя компания",
            "formLabel": "Дочерняя компания",
            "filterLabel": "Дочерняя компания",
            "settings": {
                "COMPANY": "Y",
                "LEAD": null
            }
        },
        "UF_CRM_64A29A1CD5CC2": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_64A29A1CD5CC2",
            "listLabel": "Новое поле",
            "formLabel": "Новое поле",
            "filterLabel": "Новое поле",
            "settings": {
                "SIZE": 20,
                "ROWS": 1,
                "REGEXP": "",
                "MIN_LENGTH": 0,
                "MAX_LENGTH": 0,
                "DEFAULT_VALUE": ""
            }
        }
    },
    "time": {
        "start": 1769494687,
        "finish": 1769494687.641697,
        "duration": 0.6416969299316406,
        "processing": 0,
        "date_start": "2026-01-27T09:18:07+03:00",
        "date_finish": "2026-01-27T09:18:07+03:00",
        "operating_reset_at": 1769495287,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор компании ||
|| **TITLE**
[`string`](../../data-types.md) | Название компании ||
|| **COMPANY_TYPE**
[`crm_status`](../../data-types.md) | Тип компании. Значения можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=COMPANY_TYPE` ||
|| **LOGO**
[`file`](../../data-types.md) | Логотип ||
|| **ADDRESS**
[`string`](../../data-types.md) | Фактический адрес. Устарел, используется для совместимости. Для работы с адресом используйте [реквизиты](../requisites/index.md).

Устаревшие адресные поля:
- `ADDRESS_2` — адрес (стр. 2)
- `ADDRESS_CITY` — город
- `ADDRESS_POSTAL_CODE` — почтовый индекс
- `ADDRESS_REGION` — район
- `ADDRESS_PROVINCE` — область
- `ADDRESS_COUNTRY` — страна
- `ADDRESS_COUNTRY_CODE` — код страны
- `ADDRESS_LOC_ADDR_ID` — идентификатор адреса местоположения
- `ADDRESS_LEGAL` — юридический адрес
- `REG_ADDRESS` — юридический адрес
- `REG_ADDRESS_2` — юридический адрес (стр. 2)
- `REG_ADDRESS_CITY` — юридический адрес город
- `REG_ADDRESS_POSTAL_CODE` — юридический адрес почтовый индекс
- `REG_ADDRESS_REGION` — юридический адрес район
- `REG_ADDRESS_PROVINCE` — юридический адрес область
- `REG_ADDRESS_COUNTRY` — юридический адрес страна
- `REG_ADDRESS_COUNTRY_CODE` — юридический адрес код страны
- `REG_ADDRESS_LOC_ADDR_ID` — юридический адрес идентификатор адреса местоположения ||
|| **BANKING_DETAILS**
[`string`](../../data-types.md) | Банковские реквизиты ||
|| **INDUSTRY**
[`crm_status`](../../data-types.md) | Сфера деятельности. Значения можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=INDUSTRY` ||
|| **EMPLOYEES**
[`crm_status`](../../data-types.md) | Количество сотрудников. Значения можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=EMPLOYEES` ||
|| **CURRENCY_ID**
[`crm_currency`](../../data-types.md) | Валюта ||
|| **REVENUE**
[`double`](../../data-types.md) | Годовой оборот ||
|| **OPENED**
[`char`](../../data-types.md) | Доступна ли компания для всех. Возможные значения: `Y` или `N` ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарий ||
|| **HAS_PHONE**
[`char`](../../data-types.md) | Задан телефон ||
|| **HAS_EMAIL**
[`char`](../../data-types.md) | Задан e-mail ||
|| **HAS_IMOL**
[`char`](../../data-types.md) | Задана открытая линия ||
|| **IS_MY_COMPANY**
[`char`](../../data-types.md) | Признак «Моя компания». Возможные значения: `Y` или `N` ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный ||
|| **CREATED_BY_ID**
[`user`](../../data-types.md) | Кем создана ||
|| **MODIFY_BY_ID**
[`user`](../../data-types.md) | Кем изменена ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения ||
|| **CONTACT_ID**
[`crm_contact`](../../data-types.md) | Контакт. Множественное ||
|| **LEAD_ID**
[`crm_lead`](../../data-types.md) | Идентификатор лида, связанного с компанией ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_VERSION**
[`string`](../../data-types.md) | Оригинальная версия. Используется для защиты данных от случайного перетирания внешней системой ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система. Yandex-Direct, Google-Adwords и другие ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. Возможные значения:
- `CPC` — объявления
- `CPM` — баннеры ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
||**PARENT_ID_...** | Поля связей.

Если на портале есть смарт-процессы, связанные с компаниями, для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и компанией. Само поле хранит идентификатор элемента такого смарт-процесса ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../../data-types.md) | Последняя активность ||
|| **LAST_ACTIVITY_BY**
[`user`](../../data-types.md) | Автор последней активности в таймлайне ||
|| **LAST_COMMUNICATION_TIME**
[`string`](../../data-types.md) | Дата последней коммуникации ||
|| **PHONE**
[`crm_multifield`](../../data-types.md) | Телефон. Множественное ||
|| **EMAIL**
[`crm_multifield`](../../data-types.md) | E-mail. Множественное ||
|| **WEB**
[`crm_multifield`](../../data-types.md) | Сайт. Множественное ||
|| **IM**
[`crm_multifield`](../../data-types.md) | Мессенджер. Множественное ||
|| **LINK**
[`crm_multifield`](../../data-types.md) | LINK. Множественное ||
||**UF_...**  | Пользовательские поля. Например, `UF_CRM_25534736`.

В зависимости от настроек портала у компаний может быть набор пользовательских полей определенных типов.

Добавить пользовательское поле в компанию можно с помощью метода [crm.company.userfield.add](./userfields/crm-company-userfield-add.md) ||
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
|| **Код** | **Описание** | **Значение** ||
|| `-` | `Access denied` | У пользователя нет прав на «Чтение» компаний ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-add.md)
- [{#T}](./crm-company-get.md)
- [{#T}](./crm-company-list.md)
- [{#T}](./crm-company-update.md)
- [{#T}](./crm-company-delete.md)
