# Получить поля сделки crm.deal.fields

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.fields` возвращает описание полей сделки, в том числе пользовательских.
Таблицу с описанием стандартных полей можно найти в статье [Поля основных объектов CRM](../main-entities-fields.md).

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result)
    	;
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php        
    try {
        $id = 123; // Example deal ID
        $dealService = $serviceBuilder->getCRMScope()->deal();
        $dealResult = $dealService->get($id);
        $itemResult = $dealResult->deal();
        print("ID: " . $itemResult->ID . PHP_EOL);
        print("Title: " . $itemResult->TITLE . PHP_EOL);
        print("Type ID: " . $itemResult->TYPE_ID . PHP_EOL);
        print("Category ID: " . $itemResult->CATEGORY_ID . PHP_EOL);
        print("Stage ID: " . $itemResult->STAGE_ID . PHP_EOL);
        print("Is New: " . ($itemResult->IS_NEW ? 'Yes' : 'No') . PHP_EOL);
        print("Is Recurring: " . ($itemResult->IS_RECURRING ? 'Yes' : 'No') . PHP_EOL);
        print("Probability: " . $itemResult->PROBABILITY . PHP_EOL);
        print("Currency ID: " . $itemResult->CURRENCY_ID . PHP_EOL);
        print("Opportunity: " . $itemResult->OPPORTUNITY . PHP_EOL);
        print("Lead ID: " . $itemResult->LEAD_ID . PHP_EOL);
        print("Company ID: " . $itemResult->COMPANY_ID . PHP_EOL);
        print("Begin Date: " . ($itemResult->BEGINDATE ? $itemResult->BEGINDATE->format(DATE_ATOM) : 'N/A') . PHP_EOL);
        print("Close Date: " . ($itemResult->CLOSEDATE ? $itemResult->CLOSEDATE->format(DATE_ATOM) : 'N/A') . PHP_EOL);
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
        BX24.callMethod(
            'crm.deal.fields',
            {},
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
        'crm.deal.fields',
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
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Название"
        },
        "TYPE_ID": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "DEAL_TYPE",
            "title": "Тип"
        },
        "CATEGORY_ID": {
            "type": "crm_category",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Воронка"
        },
        "STAGE_ID": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "DEAL_STAGE",
            "title": "Стадия сделки"
        },
        "STAGE_SEMANTIC_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Группа стадии"
        },
        "IS_NEW": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Новая сделка"
        },
        "IS_RECURRING": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Регулярная сделка"
        },
        "IS_RETURN_CUSTOMER": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Повторная сделка"
        },
        "IS_REPEATED_APPROACH": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Повторное обращение"
        },
        "PROBABILITY": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Вероятность"
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
        "OPPORTUNITY": {
            "type": "double",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Сумма"
        },
        "IS_MANUAL_OPPORTUNITY": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "IS_MANUAL_OPPORTUNITY"
        },
        "TAX_VALUE": {
            "type": "double",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Ставка налога"
        },
        "COMPANY_ID": {
            "type": "crm_company",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Компания",
            "settings": {
                "parentEntityTypeId": 4
            }
        },
        "CONTACT_ID": {
            "type": "crm_contact",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "isDeprecated": true,
            "title": "Контакт"
        },
        "CONTACT_IDS": {
            "type": "crm_contact",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": true,
            "isDynamic": false,
            "title": "Контакты"
        },
        "QUOTE_ID": {
            "type": "crm_quote",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Предложение",
            "settings": {
                "parentEntityTypeId": 7
            }
        },
        "BEGINDATE": {
            "type": "date",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата начала"
        },
        "CLOSEDATE": {
            "type": "date",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата завершения"
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
        "CLOSED": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Закрыта"
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
        "MOVED_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "MOVED_BY_ID"
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
        "MOVED_TIME": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "MOVED_TIME"
        },
        "SOURCE_ID": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": "SOURCE",
            "title": "Источник"
        },
        "SOURCE_DESCRIPTION": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дополнительно об источнике"
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
        "ADDITIONAL_INFO": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дополнительная информация"
        },
        "LOCATION_ID": {
            "type": "location",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Местоположение"
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
        "LAST_ACTIVITY_TIME": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "LAST_ACTIVITY_TIME"
        },
        "LAST_ACTIVITY_BY": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "LAST_ACTIVITY_BY"
        }
    },
    "time": {
        "start": 1724857659.824873,
        "finish": 1724857660.790877,
        "duration": 0.9660041332244873,
        "processing": 0.3691408634185791,
        "date_start": "2024-08-28T17:07:39+02:00",
        "date_finish": "2024-08-28T17:07:40+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект в формате:

```
{
    field_1: value_1,
    field_2: value_2,
    ...
    field_n: value_n,
}
```

где:
- `field_n` — поле сделки
- `value_n` — информация о поле в формате [crm_rest_field_description](../data-types.md#crm_rest_field_description) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-add.md)
- [{#T}](./crm-deal-update.md)
- [{#T}](./crm-deal-get.md)
- [{#T}](./crm-deal-list.md)
- [{#T}](./crm-deal-delete.md)
