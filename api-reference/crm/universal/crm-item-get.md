# Получить элемент по Id crm.item.get

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «чтения» элементов объекта CRM

Метод возвращает информацию об элементе по идентификатору элемента и идентификатору типа объекта CRM

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](./index.md) или [пользовательского типа](./user-defined-object-types/index.md), чей элемент мы хотим получить ||
|| **id***
[`integer`][1] | Идентификатор элемента, чью информацию мы хотим получить.

Можно получить методом [`crm.item.list`](./crm-item-list.md) или при создании элемента с помощью [`crm.item.add`](./crm-item-add.md) ||
|| **useOriginalUfNames**
[`boolean`][1] | Параметр используется для управления форматом имен пользовательских полей в ответе.   
Возможные значения:

- `Y` — оригинальные имена пользовательских полей, например `UF_CRM_2_1639669411830`
- `N` — имена пользовательских полей в camelCase, например `ufCrm2_1639669411830`

По умолчанию — `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить информацию о лиде с `id = 250`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"id":250,"useOriginalUfNames":"N"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"id":250,"useOriginalUfNames":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.item.get',
    		{
    			entityTypeId: 1,
    			id: 250,
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
        $entityTypeId = 1; // Example entity type ID
        $id = 123; // Example item ID
        $itemResult = $serviceBuilder
            ->getCRMScope()
            ->item()
            ->get($entityTypeId, $id);
        $item = $itemResult->item();
        print("ID: " . $item->id . PHP_EOL);
        print("XML ID: " . $item->xmlId . PHP_EOL);
        print("Title: " . $item->title . PHP_EOL);
        print("Created By: " . $item->createdBy . PHP_EOL);
        print("Updated By: " . $item->updatedBy . PHP_EOL);
        print("Moved By: " . $item->movedBy . PHP_EOL);
        print("Created Time: " . $item->createdTime->format(DATE_ATOM) . PHP_EOL);
        print("Updated Time: " . $item->updatedTime->format(DATE_ATOM) . PHP_EOL);
        print("Moved Time: " . $item->movedTime->format(DATE_ATOM) . PHP_EOL);
        print("Category ID: " . $item->categoryId . PHP_EOL);
        print("Opened: " . ($item->opened ? 'true' : 'false') . PHP_EOL);
        print("Previous Stage ID: " . $item->previousStageId . PHP_EOL);
        print("Begin Date: " . $item->begindate->format(DATE_ATOM) . PHP_EOL);
        print("Close Date: " . $item->closedate->format(DATE_ATOM) . PHP_EOL);
        print("Company ID: " . $item->companyId . PHP_EOL);
        print("Contact ID: " . $item->contactId . PHP_EOL);
        print("Opportunity: " . $item->opportunity . PHP_EOL);
        print("Is Manual Opportunity: " . ($item->isManualOpportunity ? 'true' : 'false') . PHP_EOL);
        print("Tax Value: " . $item->taxValue . PHP_EOL);
        print("Currency ID: " . $item->currencyId . PHP_EOL);
        print("Opportunity Account: " . $item->opportunityAccount . PHP_EOL);
        print("Tax Value Account: " . $item->taxValueAccount . PHP_EOL);
        print("Account Currency ID: " . $item->accountCurrencyId . PHP_EOL);
        print("My Company ID: " . $item->mycompanyId . PHP_EOL);
        print("Source ID: " . $item->sourceId . PHP_EOL);
        print("Source Description: " . $item->sourceDescription . PHP_EOL);
        print("Webform ID: " . $item->webformId . PHP_EOL);
        print("Assigned By ID: " . $item->assignedById . PHP_EOL);
        print("Last Activity By: " . $item->lastActivityBy . PHP_EOL);
        print("Last Activity Time: " . $item->lastActivityTime->format(DATE_ATOM) . PHP_EOL);
        print("UTM Source: " . $item->utmSource . PHP_EOL);
        print("UTM Medium: " . $item->utmMedium . PHP_EOL);
        print("UTM Campaign: " . $item->utmCampaign . PHP_EOL);
        print("UTM Content: " . $item->utmContent . PHP_EOL);
        print("UTM Term: " . $item->utmTerm . PHP_EOL);
        print("Observers: " . json_encode($item->observers) . PHP_EOL);
        print("Contact IDs: " . json_encode($item->contactIds) . PHP_EOL);
        print("Entity Type ID: " . $item->entityTypeId . PHP_EOL);
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage() . PHP_EOL);
    }
    ```

- BX24.js

    ```js
        BX24.callMethod(
            'crm.item.get',
            {
                entityTypeId: 1,
                id: 250,
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
        'crm.item.get',
        [
            'entityTypeId' => 1,
            'id' => 250,
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
        "item": {
            "id": 250,
            "createdTime": "2024-07-22T18:00:08+02:00",
            "dateCreateShort": null,
            "updatedTime": "2024-07-22T18:00:08+02:00",
            "dateModifyShort": null,
            "createdBy": 1,
            "updatedBy": 1,
            "assignedById": 1,
            "opened": "Y",
            "companyId": 0,
            "contactId": 0,
            "stageId": "IN_PROCESS",
            "isConvert": null,
            "statusDescription": null,
            "stageSemanticId": "P",
            "productId": null,
            "opportunity": 999.9,
            "currencyId": "RUB",
            "sourceId": "TRADE_SHOW",
            "sourceDescription": "Выставка об админах",
            "title": "Лид #250",
            "name": "Админ",
            "lastName": "Админов",
            "secondName": "Админович",
            "shortName": null,
            "companyTitle": "Административная компания",
            "post": "Админ",
            "address": null,
            "comments": "[B]Комментарий об админе[/B]",
            "webformId": 0,
            "originatorId": null,
            "originId": null,
            "dateClosed": null,
            "birthdate": "2000-01-01T02:00:00+02:00",
            "honorific": "UC_N1LWUS",
            "hasPhone": "Y",
            "hasEmail": "Y",
            "hasImol": "N",
            "login": null,
            "isReturnCustomer": "N",
            "searchContent": "250 Лид #250 Админов Админ Админович Административная компания 999.90 Российский рубль 6111111111 111111111 11111111 1111111 111111 11111 1111 111 nqzva rknzcyr pbz В работе Выставка Выставка об админах г Админ [O]Комментарий об админе[/O] 321",
            "isManualOpportunity": "Y",
            "movedBy": 1,
            "movedTime": "2024-07-22T17:00:08+02:00",
            "lastActivityBy": 1,
            "lastActivityTime": "2024-07-22T17:00:08+02:00",
            "phoneMobile": "",
            "phoneWork": "+6111111111",
            "phoneMailing": "",
            "emailHome": "",
            "emailWork": "admin@example.com",
            "emailMailing": "",
            "skype": null,
            "icq": null,
            "imol": "",
            "email": "admin@example.com",
            "phone": "+6111111111",
            "ufCrm_1720019876534": "321",
            "parentId1222": null,
            "parentId1226": null,
            "parentId1228": null,
            "parentId1236": null,
            "parentId1238": null,
            "parentId1240": null,
            "parentId1244": null,
            "parentId1246": null,
            "parentId1254": null,
            "parentId1256": null,
            "utmSource": null,
            "utmMedium": null,
            "utmCampaign": null,
            "utmContent": null,
            "utmTerm": null,
            "observers": [],
            "contactIds": [],
            "entityTypeId": 1
        }
    },
    "time": {
        "start": 1721660468.931424,
        "finish": 1721660469.416092,
        "duration": 0.4846680164337158,
        "processing": 0.16368508338928223,
        "date_start": "2024-07-22T17:01:08+02:00",
        "date_finish": "2024-07-22T17:01:09+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа. Содержит единственный ключ `item` ||
|| **item**
[`item`](./object-fields.md) | Информация об элементе, [описание полей](./object-fields.md) ||
|| **time**
[`time`][1] | Объект, содержащий в себе информацию о времени выполнения запроса ||
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
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код**                          | **Описание**                                     | **Значение**                                                    ||
|| `403`      | `allowed_only_intranet_user`     | Действие разрешено только интранет-пользователям | Пользователь не является интранет-пользователем                 ||
|| `400`      | `NOT_FOUND`                      | Смарт-процесс не найден                          | Возникает, при передаче невалидного `entityTypeId`              ||
|| `400`      | `NOT_FOUND`                      | Элемент не найден                                | Элемент с переданным `id` типа `entityTypeId` не существует     ||
|| `400`      | `ACCESS_DENIED`                  | У Вас нет прав на просмотр этого элемента        | У пользователя нет прав на чтение элементов типа `entityTypeId` ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-item-add.md)
- [{#T}](./crm-item-update.md)
- [{#T}](./crm-item-list.md)
- [{#T}](./crm-item-delete.md)
- [{#T}](./crm-item-fields.md)
- [{#T}](./object-fields.md)

[1]: ../../data-types.md
