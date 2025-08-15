# Получить поля реквизита crm.requisite.fields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает описание полей реквизита.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.requisite.fields',
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
                'crm.requisite.fields',
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
        echo 'Error fetching requisite fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "crm.requisite.fields",
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
        'crm.requisite.fields',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

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
        "ENTITY_TYPE_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID типа сущности"
        },
        "ENTITY_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID сущности"
        },
        "PRESET_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": true,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ID пресета"
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
        "CREATED_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Создал"
        },
        "MODIFY_BY_ID": {
            "type": "user",
            "isRequired": false,
            "isReadOnly": true,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Изменил"
        },
        "NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Название"
        },
        "CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Код"
        },
        "XML_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Внешний код"
        },
        "ORIGINATOR_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ORIGINATOR_ID"
        },
        "ACTIVE": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Активен"
        },
        "ADDRESS_ONLY": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ADDRESS_ONLY"
        },
        "SORT": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Сортировка"
        },
        "RQ_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Ф.И.О."
        },
        "RQ_FIRST_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Имя"
        },
        "RQ_LAST_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Фамилия"
        },
        "RQ_SECOND_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Отчество"
        },
        "RQ_COMPANY_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_COMPANY_ID"
        },
        "RQ_COMPANY_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Сокращенное наименование организации"
        },
        "RQ_COMPANY_FULL_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Полное наименование организации"
        },
        "RQ_COMPANY_REG_DATE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата государственной регистрации"
        },
        "RQ_DIRECTOR": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Ген. директор"
        },
        "RQ_ACCOUNTANT": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Гл. бухгалтер"
        },
        "RQ_CEO_NAME": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CEO_NAME"
        },
        "RQ_CEO_WORK_POS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CEO_WORK_POS"
        },
        "RQ_CONTACT": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Контактное лицо"
        },
        "RQ_EMAIL": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "E-Mail"
        },
        "RQ_PHONE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Телефон"
        },
        "RQ_FAX": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Факс"
        },
        "RQ_IDENT_TYPE": {
            "type": "crm_status",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "statusType": [
                "RQ_IDENT_TYPE_CO"
            ],
            "title": "RQ_IDENT_TYPE"
        },
        "RQ_IDENT_DOC": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Вид документа"
        },
        "RQ_IDENT_DOC_SER": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "серия"
        },
        "RQ_IDENT_DOC_NUM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "номер"
        },
        "RQ_IDENT_DOC_PERS_NUM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_IDENT_DOC_PERS_NUM"
        },
        "RQ_IDENT_DOC_DATE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "дата выдачи"
        },
        "RQ_IDENT_DOC_ISSUED_BY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "кем выдан"
        },
        "RQ_IDENT_DOC_DEP_CODE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "код подразделения"
        },
        "RQ_INN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ИНН"
        },
        "RQ_KPP": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "КПП"
        },
        "RQ_USRLE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_USRLE"
        },
        "RQ_IFNS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ИФНС"
        },
        "RQ_OGRN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОГРН"
        },
        "RQ_OGRNIP": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОГРНИП"
        },
        "RQ_OKPO": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОКПО"
        },
        "RQ_OKTMO": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОКТМО"
        },
        "RQ_OKVED": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "ОКВЭД"
        },
        "RQ_EDRPOU": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_EDRPOU"
        },
        "RQ_DRFO": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_DRFO"
        },
        "RQ_KBE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_KBE"
        },
        "RQ_IIN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_IIN"
        },
        "RQ_BIN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_BIN"
        },
        "RQ_ST_CERT_SER": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Серия св. о гос. регистрации"
        },
        "RQ_ST_CERT_NUM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Номер св. о гос. регистрации"
        },
        "RQ_ST_CERT_DATE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Дата св. о гос. регистрации"
        },
        "RQ_VAT_PAYER": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_PAYER"
        },
        "RQ_VAT_ID": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_ID"
        },
        "RQ_VAT_CERT_SER": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_CERT_SER"
        },
        "RQ_VAT_CERT_NUM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_CERT_NUM"
        },
        "RQ_VAT_CERT_DATE": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_VAT_CERT_DATE"
        },
        "RQ_RESIDENCE_COUNTRY": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_RESIDENCE_COUNTRY"
        },
        "RQ_BASE_DOC": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_BASE_DOC"
        },
        "RQ_REGON": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_REGON"
        },
        "RQ_KRS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_KRS"
        },
        "RQ_PESEL": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_PESEL"
        },
        "RQ_LEGAL_FORM": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_LEGAL_FORM"
        },
        "RQ_SIRET": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_SIRET"
        },
        "RQ_SIREN": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_SIREN"
        },
        "RQ_CAPITAL": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CAPITAL"
        },
        "RQ_RCS": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_RCS"
        },
        "RQ_CNPJ": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CNPJ"
        },
        "RQ_STATE_REG": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_STATE_REG"
        },
        "RQ_MNPL_REG": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_MNPL_REG"
        },
        "RQ_CPF": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "RQ_CPF"
        },
        "UF_CRM_1694526604": {
            "type": "string",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1694526604",
            "listLabel": "ПП - Строка",
            "formLabel": "ПП - Строка",
            "filterLabel": "ПП - Строка",
            "settings": {
                "SIZE": 20,
                "ROWS": 1,
                "REGEXP": "",
                "MIN_LENGTH": 0,
                "MAX_LENGTH": 0,
                "DEFAULT_VALUE": null
            }
        },
        "UF_CRM_1707997209": {
            "type": "double",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1707997209",
            "listLabel": "ПП - Число",
            "formLabel": "ПП - Число",
            "filterLabel": "ПП - Число",
            "settings": {
                "PRECISION": 2,
                "SIZE": 20,
                "MIN_VALUE": 0,
                "MAX_VALUE": 0,
                "DEFAULT_VALUE": null
            }
        },
        "UF_CRM_1707997236": {
            "type": "boolean",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1707997236",
            "listLabel": "ПП - Да/Нет",
            "formLabel": "ПП - Да/Нет",
            "filterLabel": "ПП - Да/Нет",
            "settings": {
                "DEFAULT_VALUE": 0,
                "DISPLAY": "CHECKBOX",
                "LABEL": [
                    "",
                    ""
                ],
                "LABEL_CHECKBOX": "ПП - Да/Нет"
            }
        },
        "UF_CRM_1707997253": {
            "type": "datetime",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": true,
            "title": "UF_CRM_1707997253",
            "listLabel": "ПП - Дата",
            "formLabel": "ПП - Дата",
            "filterLabel": "ПП - Дата",
            "settings": {
                "DEFAULT_VALUE": {
                    "TYPE": "NONE",
                    "VALUE": ""
                },
                "USE_SECOND": "Y",
                "USE_TIMEZONE": "N"
            }
        }
    },
    "time": {
        "start": 1716902185.003805,
        "finish": 1716902185.379388,
        "duration": 0.3755831718444824,
        "processing": 0.016958951950073242,
        "date_start": "2024-05-28T15:16:25+02:00",
        "date_finish": "2024-05-28T15:16:25+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — идентификатор [поля реквизита](./index.md#fields), а `value` — объект с [атрибутами поля](#attributes) ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#


### Описание атрибутов {#attributes}
#|
|| Назначение атрибута | Описание ||
|| type
[`string`](../../../data-types.md) | Тип поля ||
|| isRequired
[`boolean`](../../../data-types.md) | Атрибут «обязательное»
- `true` — да
- `false` — нет

||
|| isReadOnly
[`boolean`](../../../data-types.md) | Атрибут «только для чтения»
- `true` — да
- `false` — нет

||
|| isImmutable
[`boolean`](../../../data-types.md) | Атрибут «неизменяемое»
- `true` — да
- `false` — нет

||
|| isMultiple
[`boolean`](../../../data-types.md) | Атрибут «мультиполе»
- `true` — да
- `false` — нет

||
|| isDynamic
[`boolean`](../../../data-types.md) | Атрибут «пользовательское»
- `true` — да
- `false` — нет

||
|| title
[`string`](../../../data-types.md) | Идентификатор поля ||
|| listLabel
[`string`](../../../data-types.md) | Атрибут пользовательского поля. Содержит название поля в списках ||
|| formLabel
[`string`](../../../data-types.md) | Атрибут пользовательского поля. Содержит название поля в карточке ||
|| filterLabel
[`string`](../../../data-types.md) | Атрибут пользовательского поля. Содержит название поля в фильтре ||
|| settings
[`object`](../../../data-types.md) | Атрибут пользовательского поля. Объект со специфическими настройками для конкретного типа поля. Смотрите [пользовательские поля реквизитов](../user-fields/index.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-requisite-add.md)
- [{#T}](./crm-requisite-update.md)
- [{#T}](./crm-requisite-get.md)
- [{#T}](./crm-requisite-list.md)
- [{#T}](./crm-requisite-delete.md)


