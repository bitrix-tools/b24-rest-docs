# Как получить список поставщиков

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом просмотра контактов или компаний в CRM

Поставщики — это контакты и компании CRM с признаком системной категории:

- `CATALOG_CONTRACTOR_CONTACT` — для контакта,
- `CATALOG_CONTRACTOR_COMPANY` — для компании.

Чтобы получить список поставщиков, последовательно выполним два метода:

1. [crm.category.list](../../../api-reference/crm/universal/category/crm-category-list.md) — получим идентификатор категории для контакта или компании.
2. [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) — получим список поставщиков по фильтру.

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

## 2. Получим список поставщиков

Отфильтруем элементы методом [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md) с параметрами:

- `entityTypeId` — идентификатор [типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Укажем `3` для контактов. Для компаний используйте `4`.

- `select` — список полей для вывода. Все доступные поля можно получить методом [crm.item.fields](../../../api-reference/crm/universal/crm-item-fields.md).

- `filter[categoryId]` - идентификатор системной категории из шага 1. В примере `15`.

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'crm.item.list',
        {
            entityTypeId: 3,
            select: ['id', 'name', 'lastName', 'categoryId'],
            filter: {
                categoryId: 15
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
        'crm.item.list',
        [
            'entityTypeId' => 3,
            'select' => ['id', 'name', 'lastName', 'categoryId'],
            'filter' => [
                'categoryId' => 15
            ]
        ]
    );
    ```

{% endlist %}

В результате получим список контактов, которые являются поставщиками.

```json
{
  "result": {
    "items": [
      {
        "id": 2185,
        "name": "Он",
        "lastName": null,
        "categoryId": 15
      },
      {
        "id": 2443,
        "name": "Иван",
        "lastName": "Иванов",
        "categoryId": 15
      }
    ]
  },
  "total": 2
}
```

Идентификаторы поставщиков, в примере `id`: `2185` и `id`: `2443`, используйте в методе складского учета [catalog.documentcontractor.add](../../../api-reference/catalog/documentcontractor/catalog-documentcontractor-add.md).

## Пример кода

{% list tabs %}

- JS
  
    ```javascript
    var entityTypeId = 3; // 3 - контакт; для компании укажите 4
    var categoryCode = 'CATALOG_CONTRACTOR_CONTACT'; // для компании укажите CATALOG_CONTRACTOR_COMPANY

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

            var categoryId = categories[0].id;

            BX24.callMethod(
                'crm.item.list',
                {
                    entityTypeId: entityTypeId,
                    select: ['id', 'name', 'lastName', 'categoryId'],
                    filter: { categoryId: categoryId },
                    order: { ID: 'DESC' }
                },
                function(resultItems) {
                    if (resultItems.error()) {
                        console.error(resultItems.error() + ': ' + resultItems.error_description());
                    } else {
                        console.log(resultItems.data());
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

    $resultItems = CRest::call(
        'crm.item.list',
        [
            'entityTypeId' => $entityTypeId,
            'select' => ['id', 'name', 'lastName', 'categoryId'],
            'filter' => [
                'categoryId' => $categoryId
            ],
            'order' => [
                'ID' => 'DESC'
            ]
        ]
    );

    if (!empty($resultItems['error_description'])) {
        echo $resultItems['error_description'];
    } else {
        print_r($resultItems['result']);
    }
    ```

{% endlist %}
