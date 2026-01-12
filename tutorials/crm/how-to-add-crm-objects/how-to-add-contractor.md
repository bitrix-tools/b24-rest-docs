# Как создать поставщика в CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на создание контактов или компаний в CRM

Поставщики — это контакты и компании CRM с признаком системной категории:

- `CATALOG_CONTRACTOR_CONTACT` — для контакта,
- `CATALOG_CONTRACTOR_COMPANY` — для компании.

Чтобы создать поставщика, последовательно выполним два метода:

1. [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — получим идентификатор категории для контакта или компании.
2. [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) — создадим контакт или компанию как поставщика.

## 1. Получим идентификатор категории поставщика

Используем метод [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Укажем `3` для контактов. Для компаний используйте `4`.
- `filter[code]` — фильтр по коду категории. Укажем `CATALOG_CONTRACTOR_CONTACT` для контакта. Для компаний используйте `CATALOG_CONTRACTOR_COMPANY`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'crm.category.list',
        {
            entityTypeId: 3, 
            filter: {
                code: 'CATALOG_CONTRACTOR_CONTACT'
            }
        },
        function(result) {
            console.log(result.data());
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.category.list',
        [
            'entityTypeId' => 3,
            'filter' => [
                'code' => 'CATALOG_CONTRACTOR_CONTACT'
            ]
        ]
    );
    ```

{% endlist %}

В результате получим идентификатор категории. В примере `id`:`15`. Идентификатор может отличаться на разных Битрикс24.

```json
{
  "result": {
    "categories": [
      {
        "id": 15,
        "name": "Контакты поставщика",
        "entityTypeId": 3,
        "isSystem": "Y",
        "code": "CATALOG_CONTRACTOR_CONTACT"
      }
    ]
  }
}
```

## 2. Создадим поставщика

Используем метод [crm.item.add](../../../api-reference/crm/universal/crm-item-add.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Укажем `3` для контактов. Для компаний используйте `4`.

- `fields[categoryId]` — идентификатор системной категории из шага 1. В примере `15`.

- `fields[name]` — имя.
- `fields[lastName]` — фамилия. Для компании вместо имени и фамилии можно передать поле `fields[title]` — название.

- `fields[fm]` — массив мультиполей [crm_multifield](../../../api-reference/crm/data-types.md#crm_multifield) для телефона и email.
- `fields[comments]` — комментарий.
 
Телефон и email система хранит как массив мультиполей `fm`. Каждый элемент массива содержит:

- `typeId` — тип мультиполя, `PHONE` или `EMAIL`,
- `valueType` — тип значения, например `WORK` или `MOBILE`,
- `value` — значение поля.

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'crm.item.add',
        {
            entityTypeId: 3, 
            fields: {
                name: 'Иван',
                lastName: 'Иванов',
                categoryId: 15,  // id из шага 1
                fm: [
                    { typeId: 'PHONE', valueType: 'WORK', value: '+7 900 000 00 00' },
                    { typeId: 'PHONE', valueType: 'MOBILE', value: '+7 495 111 22 33' },
                    { typeId: 'EMAIL', valueType: 'WORK', value: 'supplier@example.ru' }
                ],
                comments: 'Поставщик электроники'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error() + ': ' + result.error_description());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.add',
        [
            'entityTypeId' => 3,
            'fields' => [
                'name' => 'Иван',
                'lastName' => 'Иванов',
                'categoryId' => 15, // id из шага 1
                'fm' => [
                    [ 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => '+7 900 000 00 00' ],
                    [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+7 495 111 22 33' ],
                    [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'supplier@example.ru' ]
                ],
                'comments' => 'Поставщик электроники'
            ]
        ]
    );
    ```

{% endlist %}

В результате метод вернет объект `item` с данными созданного поставщика.

```json
{
    "result": {
        "item": {
            "id": 2449,
            "createdTime": "2025-12-29T13:18:40+03:00",
            "updatedTime": "2025-12-29T13:18:40+03:00",
            "createdBy": 1,
            "updatedBy": 1,
            "assignedById": 1,
            "opened": "Y",
            "companyId": null,
            "name": "Иван",
            "lastName": "Иванов",
            "secondName": null,
            "shortName": null,
            "photo": null,
            "post": null,
            "address": null,
            "comments": "Поставщик электроники",
            "leadId": null,
            "export": "Y",
            "webformId": null,
            "originatorId": null,
            "originId": null,
            "originVersion": null,
            "birthdate": null,
            "honorific": null,
            "hasPhone": "Y",
            "hasEmail": "Y",
            "hasImol": "N",
            "searchContent": null,
            "categoryId": 15,
            "lastActivityBy": 1,
            "lastActivityTime": "2025-12-29T13:18:40+03:00",
            "login": null,
            "emailHome": null,
            "emailWork": null,
            "emailMailing": null,
            "phoneMobile": null,
            "phoneWork": null,
            "phoneMailing": null,
            "imol": null,
            "email": null,
            "phone": null,
            "lastCommunicationTime": null,
            "lastCommunicationCallTime": null,
            "lastCommunicationEmailTime": null,
            "lastCommunicationImolTime": null,
            "lastCommunicationWebformTime": null,
            "observers": [],
            "companyIds": [],
            "entityTypeId": 3,
            "fm": [
                {
                    "id": 8297,
                    "valueType": "WORK",
                    "value": "+7 900 000 00 00",
                    "typeId": "PHONE"
                },
                {
                    "id": 8299,
                    "valueType": "MOBILE",
                    "value": "+7 495 111 22 33",
                    "typeId": "PHONE"
                },
                {
                    "id": 8301,
                    "valueType": "WORK",
                    "value": "supplier@example.ru",
                    "typeId": "EMAIL"
                }
            ]
        }
    },
    "time": {
        "start": 1767003520,
        "finish": 1767003520.776535,
        "duration": 0.7765350341796875,
        "processing": 0,
        "date_start": "2025-12-29T13:18:40+03:00",
        "date_finish": "2025-12-29T13:18:40+03:00",
        "operating_reset_at": 1767004120,
        "operating": 0.4402291774749756
    }
}
```

Идентификатор поставщика, в примере `id`: `2449`, используйте в методе складского учета [catalog.documentcontractor.add](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-add.md).

## Пример кода

{% list tabs %}

- JS
  
    ```javascript
    var entityTypeId = 3; // 3 - контакт; для компании укажите 4
    var categoryCode = 'CATALOG_CONTRACTOR_CONTACT'; // для компании укажите CATALOG_CONTRACTOR_COMPANY
    var categoryId = null;

    BX24.callMethod(
        'crm.category.list',
        {
            entityTypeId: entityTypeId,
            filter: { code: categoryCode }
        },
        function(resultCategory) {
            if (resultCategory.error()) {
                console.error(resultCategory.error() + ': ' + resultCategory.error_description());
                return;
            }

            var categories = resultCategory.data().categories || [];
            if (!categories.length) {
                console.error('Категория поставщиков не найдена');
                return;
            }

            categoryId = categories[0].id;

            BX24.callMethod(
                'crm.item.add',
                {
                    entityTypeId: entityTypeId,
                    fields: {
                        name: 'Иван',
                        lastName: 'Иванов',
                        categoryId: categoryId,
                        fm: [
                            { typeId: 'PHONE', valueType: 'WORK', value: '+7 900 000 00 00' },
                            { typeId: 'PHONE', valueType: 'MOBILE', value: '+7 495 111 22 33' },
                            { typeId: 'EMAIL', valueType: 'WORK', value: 'supplier@example.ru' }
                        ],
                        comments: 'Поставщик электроники'
                    }
                },
                function(resultItem) {
                    if (resultItem.error()) {
                        console.error(resultItem.error() + ': ' + resultItem.error_description());
                    } else {
                        console.log(resultItem.data());
                    }
                }
            );
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $entityTypeId = 3; // 3 - контакт; для компании укажите 4
    $categoryCode = 'CATALOG_CONTRACTOR_CONTACT'; // для компании укажите CATALOG_CONTRACTOR_COMPANY

    $resultCategory = CRest::call(
        'crm.category.list',
        [
            'entityTypeId' => $entityTypeId,
            'filter' => [
                'code' => $categoryCode
            ]
        ]
    );

    if (!empty($resultCategory['error_description'])) {
        echo $resultCategory['error_description'];
        return;
    }

    $categories = $resultCategory['result']['categories'] ?? [];
    if (empty($categories)) {
        echo 'Категория поставщиков не найдена';
        return;
    }

    $categoryId = $categories[0]['id'];

    $resultItem = CRest::call(
        'crm.item.add',
        [
            'entityTypeId' => $entityTypeId,
            'fields' => [
                'name' => 'Иван',
                'lastName' => 'Иванов',
                'categoryId' => $categoryId,
                'fm' => [
                    [ 'typeId' => 'PHONE', 'valueType' => 'WORK', 'value' => '+7 900 000 00 00' ],
                    [ 'typeId' => 'PHONE', 'valueType' => 'MOBILE', 'value' => '+7 495 111 22 33' ],
                    [ 'typeId' => 'EMAIL', 'valueType' => 'WORK', 'value' => 'supplier@example.ru' ]
                ],
                'comments' => 'Поставщик электроники'
            ]
        ]
    );

    if (!empty($resultItem['error_description'])) {
        echo $resultItem['error_description'];
    } else {
        print_r($resultItem['result']);
    }
    ```

{% endlist %}
