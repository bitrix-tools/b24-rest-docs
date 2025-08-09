# Добавить реквизит crm.requisite.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет новый реквизит.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей — объект вида `{"поле": "значение"[, ...]}` для добавления реквизита ||
|#

## Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа родительской сущности. 

Сейчас это может быть только:
- `3` — контакт
- `4` — компания

Идентификаторы всех типов сущностей CRM отдает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md)
||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор родительской сущности (контакта либо компании).

Идентификатор можно получить методом [crm.company.list](../../companies/crm-company-list.md) для компании и методом [crm.contact.list](../../contacts/crm-contact-list.md) для контакта ||
|| **PRESET_ID***
[`integer`](../../../data-types.md) | Идентификатор шаблона реквизитов.

Идентификаторы шаблонов можно получить методом [crm.requisite.preset.list](../presets/crm-requisite-preset-list.md) ||
|| **NAME***
[`string`](../../../data-types.md) | Название реквизита ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ, используется для операций обмена.

Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор внешней информационной базы.

Назначение поля может меняться конечным разработчиком ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности.

Используются значения `Y` или `N`.

Сейчас поле фактически ни на что не влияет ||
|| **ADDRESS_ONLY**
[`char`](../../../data-types.md) | Признак состояния, когда реквизит используется только для хранения адреса.

Используются значения `Y` или `N`. При значении `Y` реквизиты не показываются в карточке сущности, но отображается адрес ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка.

Порядок в списке реквизитов сущности, когда их несколько ||
|| **RQ_NAME**
[`string`](../../../data-types.md) | ФИО ||
|| **RQ_FIRST_NAME**
[`string`](../../../data-types.md) | Имя ||
|| **RQ_LAST_NAME**
[`string`](../../../data-types.md) | Фамилия ||
|| **RQ_SECOND_NAME**
[`string`](../../../data-types.md) | Отчество ||
|| **RQ_COMPANY_ID**
[`string`](../../../data-types.md) | Идентификатор организации ||
|| **RQ_COMPANY_NAME**
[`string`](../../../data-types.md) | Сокращенное наименование организации ||
|| **RQ_COMPANY_FULL_NAME**
[`string`](../../../data-types.md) | Полное наименование организации ||
|| **RQ_COMPANY_REG_DATE**
[`string`](../../../data-types.md) | Дата государственной регистрации ||
|| **RQ_DIRECTOR**
[`string`](../../../data-types.md) | Генеральный директор ||
|| **RQ_ACCOUNTANT**
[`string`](../../../data-types.md) | Главный бухгалтер ||
|| **RQ_CEO_NAME**
[`string`](../../../data-types.md) | ФИО первого руководителя ||
|| **RQ_CEO_WORK_POS**
[`string`](../../../data-types.md) | Должность первого руководителя ||
|| **RQ_CONTACT**
[`string`](../../../data-types.md) | Контактное лицо ||
|| **RQ_EMAIL**
[`string`](../../../data-types.md) | E-Mail ||
|| **RQ_PHONE**
[`string`](../../../data-types.md) | Телефон ||
|| **RQ_FAX**
[`string`](../../../data-types.md) | Факс ||
|| **RQ_IDENT_TYPE**
[`crm_status`](../../../data-types.md) | Способ идентификации ||
|| **RQ_IDENT_DOC**
[`string`](../../../data-types.md) | Вид документа ||
|| **RQ_IDENT_DOC_SER**
[`string`](../../../data-types.md) | Серия ||
|| **RQ_IDENT_DOC_NUM**
[`string`](../../../data-types.md) | Номер ||
|| **RQ_IDENT_DOC_PERS_NUM**
[`string`](../../../data-types.md) | Личный номер ||
|| **RQ_IDENT_DOC_DATE**
[`string`](../../../data-types.md) | Дата выдачи ||
|| **RQ_IDENT_DOC_ISSUED_BY**
[`string`](../../../data-types.md) | Кем выдан ||
|| **RQ_IDENT_DOC_DEP_CODE**
[`string`](../../../data-types.md) | Код подразделения ||
|| **RQ_INN**
[`string`](../../../data-types.md) | ИНН ||
|| **RQ_KPP**
[`string`](../../../data-types.md) | КПП ||
|| **RQ_USRLE**
[`string`](../../../data-types.md) | Handelsregisternummer (для страны DE) ||
|| **RQ_IFNS**
[`string`](../../../data-types.md) | ИФНС ||
|| **RQ_OGRN**
[`string`](../../../data-types.md) | ОГРН ||
|| **RQ_OGRNIP**
[`string`](../../../data-types.md) | ОГРНИП ||
|| **RQ_OKPO**
[`string`](../../../data-types.md) | ОКПО ||
|| **RQ_OKTMO**
[`string`](../../../data-types.md) | ОКТМО ||
|| **RQ_OKVED**
[`string`](../../../data-types.md) | ОКВЭД ||
|| **RQ_EDRPOU**
[`string`](../../../data-types.md) | ЄДРПОУ ||
|| **RQ_DRFO**
[`string`](../../../data-types.md) | ДРФО ||
|| **RQ_KBE**
[`string`](../../../data-types.md) | КБЕ ||
|| **RQ_IIN**
[`string`](../../../data-types.md) | ИИН ||
|| **RQ_BIN**
[`string`](../../../data-types.md) | БИН ||
|| **RQ_ST_CERT_SER**
[`string`](../../../data-types.md) | Серия свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_NUM**
[`string`](../../../data-types.md) | Номер свидетельства о государственной регистрации ||
|| **RQ_ST_CERT_DATE**
[`string`](../../../data-types.md) | Дата свидетельство о государственной регистрации ||
|| **RQ_VAT_PAYER**
[`char`](../../../data-types.md) | Платник ПДВ (для страны UA).

Используются значения `Y` или `N` ||
|| **RQ_VAT_ID**
[`string`](../../../data-types.md) | VAT ID (идентификационный номер (плательщика) НДС) ||
|| **RQ_VAT_CERT_SER**
[`string`](../../../data-types.md) | Серия свидетельства по НДС ||
|| **RQ_VAT_CERT_NUM**
[`string`](../../../data-types.md) | Номер свидетельства по НДС ||
|| **RQ_VAT_CERT_DATE**
[`string`](../../../data-types.md) | Дата свидетельства по НДС ||
|| **RQ_RESIDENCE_COUNTRY**
[`string`](../../../data-types.md) | Страна резидента ||
|| **RQ_BASE_DOC**
[`string`](../../../data-types.md) | Основание действия ||
|| **RQ_REGON**
[`string`](../../../data-types.md) | REGON (для страны PL) ||
|| **RQ_KRS**
[`string`](../../../data-types.md) | KRS (для страны PL) ||
|| **RQ_PESEL**
[`string`](../../../data-types.md) | PESEL (для страны PL) ||
|| **RQ_LEGAL_FORM**
[`string`](../../../data-types.md) | Forme juridique (для страны FR) ||
|| **RQ_SIRET**
[`string`](../../../data-types.md) | Numéro Siret (для страны FR) ||
|| **RQ_SIREN**
[`string`](../../../data-types.md) | Numéro Siren (для страны FR) ||
|| **RQ_CAPITAL**
[`string`](../../../data-types.md) | Capital social (для страны FR) ||
|| **RQ_RCS**
[`string`](../../../data-types.md) | RCS (для страны FR) ||
|| **RQ_CNPJ**
[`string`](../../../data-types.md) | CNPJ (для страны BR) ||
|| **RQ_STATE_REG**
[`string`](../../../data-types.md) | Inscrição Estadual (IE) (для страны BR) ||
|| **RQ_MNPL_REG**
[`string`](../../../data-types.md) | Inscrição Municipal (IM) (для страны BR) ||
|| **RQ_CPF**
[`string`](../../../data-types.md) | CPF (для страны BR) ||
|| **UF_CRM_...** | Пользовательские поля. Например, `UF_CRM_1694526604`.

У реквизитов может быть набор пользовательских полей с типами: `string`, `boolean`, `double`, `datetime`.

Добавить пользовательское поле реквизитов можно методом [crm.requisite.userfield.add](../user-fields/crm-requisite-userfield-add.md) ||
|#

{% note info "Какие поля с префиксом `RQ_` можно указывать?" %}

При создании реквизита указываются только те поля с префиксом `RQ_`, которые есть в шаблоне реквизитов, привязанном к создаваемому реквизиту (смотрите поле `PRESET_ID`). Значения остальных полей будут сохранены, но не будут видны пользователю.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_TYPE_ID":4,"ENTITY_ID":1,"PRESET_ID":1,"NAME":"Организация","ACTIVE":"Y","ADDRESS_ONLY":"N","SORT":500,"RQ_COMPANY_NAME":"ООО \"1С-БИТРИКС\"","RQ_COMPANY_FULL_NAME":"ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"1С-БИТРИКС\"","RQ_COMPANY_REG_DATE":"06.04.2007","RQ_DIRECTOR":"РЫЖИКОВ СЕРГЕЙ ВЛАДИМИРОВИЧ","RQ_INN":"7717586110","RQ_KPP":"770501001","RQ_OGRN":"5077746476209","UF_CRM_1707997209":"56","UF_CRM_1708012333":"Категория 1","XML_ID":"5e4641fd-1dd9-11e6-b2f2-005056c00008"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.requisite.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_TYPE_ID":4,"ENTITY_ID":1,"PRESET_ID":1,"NAME":"Организация","ACTIVE":"Y","ADDRESS_ONLY":"N","SORT":500,"RQ_COMPANY_NAME":"ООО \"1С-БИТРИКС\"","RQ_COMPANY_FULL_NAME":"ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"1С-БИТРИКС\"","RQ_COMPANY_REG_DATE":"06.04.2007","RQ_DIRECTOR":"РЫЖИКОВ СЕРГЕЙ ВЛАДИМИРОВИЧ","RQ_INN":"7717586110","RQ_KPP":"770501001","RQ_OGRN":"5077746476209","UF_CRM_1707997209":"56","UF_CRM_1708012333":"Категория 1","XML_ID":"5e4641fd-1dd9-11e6-b2f2-005056c00008","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.add",
    		{
    			fields:
    			{
    				"ENTITY_TYPE_ID": 4,
    				"ENTITY_ID": 1,
    				"PRESET_ID": 1,
    				"NAME": "Организация",
    				"ACTIVE": "Y",
    				"ADDRESS_ONLY": "N",
    				"SORT": 500,
    				"RQ_COMPANY_NAME": "ООО \"1С-БИТРИКС\"",
    				"RQ_COMPANY_FULL_NAME": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"1С-БИТРИКС\"",
    				"RQ_COMPANY_REG_DATE": "06.04.2007",
    				"RQ_DIRECTOR": "РЫЖИКОВ СЕРГЕЙ ВЛАДИМИРОВИЧ",
    				"RQ_INN": "7717586110",
    				"RQ_KPP": "770501001",
    				"RQ_OGRN": "5077746476209",
    				"UF_CRM_1707997209": "56",
    				"UF_CRM_1708012333": "Категория 1",
    				"XML_ID": "5e4641fd-1dd9-11e6-b2f2-005056c00008"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info("Создан реквизит с ID " + result);
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.add',
                [
                    'fields' => [
                        'ENTITY_TYPE_ID'        => 4,
                        'ENTITY_ID'             => 1,
                        'PRESET_ID'             => 1,
                        'NAME'                  => 'Организация',
                        'ACTIVE'                => 'Y',
                        'ADDRESS_ONLY'          => 'N',
                        'SORT'                  => 500,
                        'RQ_COMPANY_NAME'       => 'ООО "1С-БИТРИКС"',
                        'RQ_COMPANY_FULL_NAME'  => 'ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ "1С-БИТРИКС"',
                        'RQ_COMPANY_REG_DATE'   => '06.04.2007',
                        'RQ_DIRECTOR'           => 'РЫЖИКОВ СЕРГЕЙ ВЛАДИМИРОВИЧ',
                        'RQ_INN'                => '7717586110',
                        'RQ_KPP'                => '770501001',
                        'RQ_OGRN'               => '5077746476209',
                        'UF_CRM_1707997209'     => '56',
                        'UF_CRM_1708012333'     => 'Категория 1',
                        'XML_ID'                => '5e4641fd-1dd9-11e6-b2f2-005056c00008',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Создан реквизит с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating requisite: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "crm.requisite.add",
        {
            fields:
            {
                "ENTITY_TYPE_ID": 4,
                "ENTITY_ID": 1,
                "PRESET_ID": 1,
                "NAME": "Организация",
                "ACTIVE": "Y",
                "ADDRESS_ONLY": "N",
                "SORT": 500,
                "RQ_COMPANY_NAME": "ООО \"1С-БИТРИКС\"",
                "RQ_COMPANY_FULL_NAME": "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"1С-БИТРИКС\"",
                "RQ_COMPANY_REG_DATE": "06.04.2007",
                "RQ_DIRECTOR": "РЫЖИКОВ СЕРГЕЙ ВЛАДИМИРОВИЧ",
                "RQ_INN": "7717586110",
                "RQ_KPP": "770501001",
                "RQ_OGRN": "5077746476209",
                "UF_CRM_1707997209": "56",
                "UF_CRM_1708012333": "Категория 1",
                "XML_ID": "5e4641fd-1dd9-11e6-b2f2-005056c00008"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создан реквизит с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.add',
        [
            'fields' => [
                "ENTITY_TYPE_ID" => 4,
                "ENTITY_ID" => 1,
                "PRESET_ID" => 1,
                "NAME" => "Организация",
                "ACTIVE" => "Y",
                "ADDRESS_ONLY" => "N",
                "SORT" => 500,
                "RQ_COMPANY_NAME" => "ООО \"1С-БИТРИКС\"",
                "RQ_COMPANY_FULL_NAME" => "ОБЩЕСТВО С ОГРАНИЧЕННОЙ ОТВЕТСТВЕННОСТЬЮ \"1С-БИТРИКС\"",
                "RQ_COMPANY_REG_DATE" => "06.04.2007",
                "RQ_DIRECTOR" => "РЫЖИКОВ СЕРГЕЙ ВЛАДИМИРОВИЧ",
                "RQ_INN" => "7717586110",
                "RQ_KPP" => "770501001",
                "RQ_OGRN" => "5077746476209",
                "UF_CRM_1707997209" => "56",
                "UF_CRM_1708012333" => "Категория 1",
                "XML_ID" => "5e4641fd-1dd9-11e6-b2f2-005056c00008"
            ]
        ]
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
    "result": 27,
    "time": {
        "start": 1716998748.040801,
        "finish": 1716998749.444508,
        "duration": 1.4037070274353027,
        "processing": 0.32904696464538574,
        "date_start": "2024-05-29T18:05:48+02:00",
        "date_finish": "2024-05-29T18:05:49+02:00",
        "operating": 0.32897305488586426
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданного реквизита ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Ответ в случае ошибки

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "ENTITY_TYPE_ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Текст ошибки** | **Описание** ||
|| Пустая строка | ENTITY_TYPE_ID is not defined or invalid. | Идентификатор типа родительской сущности не определён или имеет недопустимое значение ||
|| Пустая строка | ENTITY_ID is not defined or invalid. | Идентификатор родительской сущности не определён или имеет недопустимое значение ||
|| Пустая строка | PRESET_ID is not defined or invalid. | Идентификатор шаблона реквизитов не определён или имеет недопустимое значение ||
|| Пустая строка | Entity not found. | Не найдена сущность, для которой создаётся реквизит ||
|| Пустая строка | Access denied. | Недостаточно прав доступа для добавления реквизита ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-requisite-update.md)
- [{#T}](./crm-requisite-get.md)
- [{#T}](./crm-requisite-list.md)
- [{#T}](./crm-requisite-delete.md)
- [{#T}](./crm-requisite-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-company-with-requisite.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contact-with-requisite.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-deal-with-choice-of-requisite.md)