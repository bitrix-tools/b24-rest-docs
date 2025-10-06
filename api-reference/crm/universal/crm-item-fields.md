# Получить поля элемента crm.item.fields

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «чтения» элементов объекта CRM

Метод получает список полей и их конфигурацию для элементов типа `entityTypeId`.

{% note warning %}

У элементов, принадлежащих разным типам объектов CRM, будут разные наборы полей.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](./index.md) или [пользовательского типа](./user-defined-object-types/index.md), чьи поля мы хотим получить ||
|| **useOriginalUfNames**
[`boolean`][1] | Параметр используется для управления форматом имен пользовательских полей в ответе.   
Возможные значения:

- `Y` — оригинальные имена пользовательских полей, например `UF_CRM_2_1639669411830`
- `N` — имена пользовательских полей в camelCase, например `ufCrm2_1639669411830`

По умолчанию — `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список полей у элементов смарт-процесса с `entityTypeId = 1268`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1268,"useOriginalUfNames":"N"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1268,"useOriginalUfNames":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.fields',
    		{
    			entityTypeId: 1268,
    			useOriginalUfNames: 'N',
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
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
                'crm.item.fields',
                [
                    'entityTypeId'      => 1268,
                    'useOriginalUfNames' => 'N',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            return;
        }
    
        echo 'Success: ' . print_r($result->data(), true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching CRM item fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
        BX24.callMethod(
            'crm.item.fields',
            {
                entityTypeId: 1268,
                useOriginalUfNames: 'N',
            },
            (result) => {
                if (result.error())
                {
                    console.error(result.error());

                    return;
                }

                console.info(result.data());
            },
        );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.fields',
        [
            'entityTypeId' => 1268,
            'useOriginalUfNames' => 'N',
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
    "result": {
        "fields": {
            "id": {
                "type": "integer",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "ID",
                "upperName": "ID"
            },
            "title": {
                "type": "string",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Название",
                "upperName": "TITLE"
            },
            "xmlId": {
                "type": "string",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Внешний код",
                "upperName": "XML_ID"
            },
            "createdTime": {
                "type": "datetime",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Когда создан",
                "upperName": "CREATED_TIME"
            },
            "updatedTime": {
                "type": "datetime",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Когда обновлен",
                "upperName": "UPDATED_TIME"
            },
            "createdBy": {
                "type": "user",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Кем создан",
                "upperName": "CREATED_BY"
            },
            "updatedBy": {
                "type": "user",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Кем обновлен",
                "upperName": "UPDATED_BY"
            },
            "assignedById": {
                "type": "user",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Ответственный",
                "upperName": "ASSIGNED_BY_ID"
            },
            "opened": {
                "type": "boolean",
                "isRequired": true,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Доступно для всех",
                "upperName": "OPENED"
            },
            "webformId": {
                "type": "integer",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Создано CRM-формой",
                "upperName": "WEBFORM_ID"
            },
            "begindate": {
                "type": "date",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Дата начала",
                "upperName": "BEGINDATE"
            },
            "closedate": {
                "type": "date",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Дата завершения",
                "upperName": "CLOSEDATE"
            },
            "companyId": {
                "type": "crm_company",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Компания",
                "settings": {
                    "parentEntityTypeId": 4
                },
                "upperName": "COMPANY_ID"
            },
            "contactId": {
                "type": "crm_contact",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "isDeprecated": true,
                "title": "Контакт",
                "upperName": "CONTACT_ID"
            },
            "contactIds": {
                "type": "crm_contact",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": true,
                "isDynamic": false,
                "title": "CONTACT_IDS",
                "upperName": "CONTACT_IDS"
            },
            "contacts": {
                "type": "crm_contact",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": true,
                "isDynamic": false,
                "title": "CONTACTS",
                "upperName": "CONTACTS"
            },
            "observers": {
                "type": "user",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": true,
                "isDynamic": false,
                "title": "Наблюдатели",
                "upperName": "OBSERVERS"
            },
            "categoryId": {
                "type": "crm_category",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Воронка",
                "upperName": "CATEGORY_ID"
            },
            "movedTime": {
                "type": "datetime",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Когда передвинут",
                "upperName": "MOVED_TIME"
            },
            "movedBy": {
                "type": "user",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Кем передвинут",
                "upperName": "MOVED_BY"
            },
            "stageId": {
                "type": "crm_status",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "statusType": "DYNAMIC_1268_STAGE_52",
                "title": "Стадия",
                "upperName": "STAGE_ID"
            },
            "previousStageId": {
                "type": "crm_status",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "statusType": "DYNAMIC_1268_STAGE_52",
                "title": "Предыдущая стадия",
                "upperName": "PREVIOUS_STAGE_ID"
            },
            "sourceId": {
                "type": "crm_status",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "statusType": "SOURCE",
                "title": "Источник",
                "upperName": "SOURCE_ID"
            },
            "sourceDescription": {
                "type": "text",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Дополнительно об источнике",
                "upperName": "SOURCE_DESCRIPTION"
            },
            "currencyId": {
                "type": "crm_currency",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Валюта",
                "upperName": "CURRENCY_ID"
            },
            "isManualOpportunity": {
                "type": "boolean",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Режим расчета суммы",
                "upperName": "IS_MANUAL_OPPORTUNITY"
            },
            "opportunity": {
                "type": "double",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Сумма",
                "upperName": "OPPORTUNITY"
            },
            "taxValue": {
                "type": "double",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Сумма налога",
                "upperName": "TAX_VALUE"
            },
            "mycompanyId": {
                "type": "crm_company",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Реквизиты вашей компании",
                "settings": {
                    "isMyCompany": true,
                    "parentEntityTypeId": 4,
                    "isEmbeddedEditorEnabled": true
                },
                "upperName": "MYCOMPANY_ID"
            },
            "lastActivityBy": {
                "type": "user",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Кем осуществлена последняя активность в таймлайне",
                "upperName": "LAST_ACTIVITY_BY"
            },
            "lastActivityTime": {
                "type": "datetime",
                "isRequired": false,
                "isReadOnly": true,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Последняя активность",
                "upperName": "LAST_ACTIVITY_TIME"
            },
            "parentId1": {
                "type": "crm_entity",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Лид",
                "settings": {
                    "parentEntityTypeId": 1
                },
                "upperName": "PARENT_ID_1"
            },
            "parentId2": {
                "type": "crm_entity",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Сделка",
                "settings": {
                    "parentEntityTypeId": 2
                },
                "upperName": "PARENT_ID_2"
            },
            "parentId1248": {
                "type": "crm_entity",
                "isRequired": false,
                "isReadOnly": false,
                "isImmutable": false,
                "isMultiple": false,
                "isDynamic": false,
                "title": "Смарт-процесс #16",
                "settings": {
                    "parentEntityTypeId": 1248
                },
                "upperName": "PARENT_ID_1248"
            }
        }
    },
    "time": {
        "start": 1721038185.626335,
        "finish": 1721038186.072804,
        "duration": 0.4464690685272217,
        "processing": 0.17344903945922852,
        "date_start": "2024-07-15T12:09:45+02:00",
        "date_finish": "2024-07-15T12:09:46+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа. Содержит единственный ключ `fields` ||
|| **fields**
[`object`][1] | Объект в формате:
```
{
    field_1: value_1,
    field_2: value_2,
    ...
    field_n: value_n,
}
```

где: 
- `field_n` — поле элемента
- `value_n` — информация о поле в формате [`crm_rest_field_description`](../data-types.md#crm_rest_field_description)

||
|| **time**
[`time`][1]   | Информация о времени выполнения запроса ||
|#

{% note info " " %}

По умолчанию имена пользовательских полей возвращаются в camelCase, например `ufCrm2_1639669411830`.
При передаче параметра `useOriginalUfNames` со значением `Y` пользовательские поля будут возвращаться с оригинальными именами, например `UF_CRM_2_1639669411830`.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "NOT_FOUND", 
    "error_description": "Смарт-процесс не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}


### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403`      | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям | Пользователь не является интранет-пользователем                 ||
|| `400`      | `NOT_FOUND` | Смарт-процесс не найден                          | Возникает, при передаче невалидного `entityTypeId`              ||
|| `400`      | `ACCESS_DENIED` | У Вас нет прав на просмотр этого элемента        | У пользователя нет прав на чтение элементов типа `entityTypeId` ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](crm-item-add.md)
- [{#T}](crm-item-update.md)
- [{#T}](crm-item-get.md)
- [{#T}](crm-item-list.md)
- [{#T}](crm-item-delete.md)
- [{#T}](./object-fields.md)

[1]: ../../data-types.md
