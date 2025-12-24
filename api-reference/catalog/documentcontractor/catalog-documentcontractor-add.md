# Добавить поставщика к документу складского учета catalog.documentcontractor.add

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами:
> — «Просмотр» и «Cоздание и редактирование» на тип документа «Приход»,
> — «Просмотр раздела Складской учет»
> — «Просмотр каталога товаров»  

Метод `catalog.documentcontractor.add` создает привязку поставщика, контакта или компании, к документу складского учета.

## Параметры метода  

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}  

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](#fields) | Поля привязки ([подробное описание](#fields)) ||
|# 

## Параметр fields {#fields}  

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}  

#|
|| **Название**
`тип` | **Описание** || 
|| **documentId*** 
[`catalog_document.id`](../data-types.md#catalog_document) | Идентификатор документа складского учета типа «Приход» `A`.  
Получить можно методом [catalog.document.list](../document/catalog-document-list.md) ||  
|| **entityTypeId***  
[`integer`](../../crm/data-types.md#object_type) | Тип объекта CRM:  
`3` — контакт 
`4` — компания ||  
|| **entityId***  
[`integer`](../../data-types.md) | Идентификатор элемента CRM, контакта или компании, из категории «Поставщик».
 
Чтобы получить идентификаторы поставщиков:  
1. Получите идентификатор категории с кодом `CATALOG_CONTRACTOR_CONTACT` для контактов или `CATALOG_CONTRACTOR_COMPANY` для компаний методом [crm.category.list](../../crm/universal/category/crm-category-list.md).  
2. Используйте полученный `categoryId` в фильтре запроса [crm.item.list](../../crm/universal/crm-item-list.md) ||  
|#  

## Примеры кода  

{% include [Сноска о примерах](../../../_includes/examples.md) %}  

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"documentId":42,"entityTypeId":3,"entityId":101}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.documentcontractor.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"documentId":42,"entityTypeId":3,"entityId":101},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.documentcontractor.add
    ```

- JS

    ```js  
    try
    {
        const response = await $b24.callMethod(
            'catalog.documentcontractor.add',
            {
                fields: {
                    documentId: 42,
                    entityTypeId: 3,
                    entityId: 101
                }
            }
        );

        const result = response.getData().result;
        console.log('Created binding:', result);
    }
    catch (error)
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
                'catalog.documentcontractor.add',
                [
                    'fields' => [
                        'documentId' => 42,
                        'entityTypeId' => 3,
                        'entityId' => 101
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result) {
            echo 'Success: ' . print_r($result, true);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding contractor binding: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.documentcontractor.add',
        {
            fields: {
                documentId: 42,
                entityTypeId: 3,
                entityId: 101
            }
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```	

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.documentcontractor.add',
        [
            'fields' => [
                'documentId' => 42,
                'entityTypeId' => 3,
                'entityId' => 101
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "documentContractor": {
            "documentId": 73,
            "entityId": 2185,
            "entityTypeId": 3,
            "id": 15
        }
    },
    "time": {
        "start": 1766469835,
        "finish": 1766469835.824666,
        "duration": 0.8246660232543945,
        "processing": 0,
        "date_start": "2025-12-23T09:03:55+03:00",
        "date_finish": "2025-12-23T09:03:55+03:00",
        "operating_reset_at": 1766470435,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **documentContractor**
[`catalog_documentContractor`](../data-types.md#catalog_documentContractor) | Объект с данными созданной привязки поставщика к документу складского учета ||  
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок 

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}  

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Store document was not found"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Store document was not found | Указан несуществующий или недоступный идентификатор документа ||  
|| `0` | Type of store document is wrong | Документ не является типом «Приход» `A` ||  
|| `0` | Unable to edit conducted document | Документ уже проведен и не может быть изменен ||  
|| `0` | Wrong entity type id | Передан недопустимый `entityTypeId`, должен быть 3 или 4 ||  
|| `0` | Wrong entity id | Указан недопустимый или несуществующий `entityId` ||  
|| `0` | This contractor has been already bound to this document | Такая привязка уже существует ||  
|| `0` | This document already has a Company contractor | К документу уже привязана компания. Повторная привязка компаний запрещена ||  
|| `0` | Access denied | Недостаточно прав для изменения документа ||  
|| `0` | Contractors should be provided by CRM | Модуль CRM не активен как поставщик контрагентов ||  
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}  

## Продолжите изучение

- [{#T}](./catalog-documentcontractor-list.md)  
- [{#T}](./catalog-documentcontractor-delete.md)  
- [{#T}](./catalog-documentcontractor-get-fields.md)