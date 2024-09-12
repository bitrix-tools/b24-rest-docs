# Добавить секцию в торговый каталог catalog.section.add

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `catalog.section.add` добавляет секцию каталога. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания новой секции каталога ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **iblockId***
[`catalog_catalog.id`](../data-types.md#catalog_catalog) | Идентификатор инфоблока.

Для получения существующих идентификаторов необходимо использовать [catalog.catalog.list](../catalog/catalog-catalog-list.md) ||
|| **iblockSectionId**
[`catalog_section.id`](../data-types.md#catalog_section) | Идентификатор родительской секции.

Для получения существующих идентификаторов необходимо использовать [catalog.section.list](./catalog-section-list.md). 

По умолчанию выбирается верхний уровень ||
|| **name***
[`string`](../data-types.md) | Название секции каталога ||
|| **xmlId**
[`string`](../data-types.md) | Внешний идентификатор.

Можно использовать для синхронизации текущей секции каталога с аналогичной позицией во внешней системе ||
|| **code**
[`string`](../data-types.md) | Код секции каталога. Должен быть уникальным ||
|| **sort**
[`integer`](../data-types.md) | Сортировка.

По умолчанию 500 ||
|| **active**
[`string`](../data-types.md) | Индикатор активности секции каталога:
- `Y` — активен
- `N` — неактивен

По умолчанию `Y` ||
|| **description**
[`string`](../data-types.md) | Описание ||
|| **descriptionType**
[`string`](../data-types.md) | Тип описания. Доступные типы: `text`, `html` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "fields": {
            "name": "Детские игрушки",
            "iblockId": 14,
            "iblockSectionId": 13,
            "sort": "100",
            "active": "Y",
            "code": "toys",
            "xmlId": "myXmlId",
            "description": "Товары для детей - игрушки",
            "descriptionType": "text"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.section.add
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "fields": {
            "name": "Детские игрушки",
            "iblockId": 14,
            "iblockSectionId": 13,
            "sort": "100",
            "active": "Y",
            "code": "toys",
            "xmlId": "myXmlId",
            "description": "Товары для детей - игрушки",
            "descriptionType": "text"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/catalog.section.add
    ```

- JS

    ```js
    BX24.callMethod(
        'catalog.section.add', 
        {
            fields: {
                name: 'Детские игрушки',
                iblockId: 14,
                iblockSectionId: 13,
                sort: '100',
                active: 'Y',
                code: 'toys',
                xmlId: 'myXmlId',
                description: "Товары для детей - игрушки",
                descriptionType: "text"
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.section.add',
        [
            'fields' => [
                'name' => 'Детские игрушки',
                'iblockId' => 14,
                'iblockSectionId' => 13,
                'sort' => '100',
                'active' => 'Y',
                'code' => 'toys',
                'xmlId' => 'myXmlId',
                'description' => 'Товары для детей - игрушки',
                'descriptionType' => 'text'
            ]
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
        "section": {
            "active": "Y",
            "code": "toys",
            "description": "Товары для детей - игрушки",
            "descriptionType": "text",
            "iblockId": 14,
            "iblockSectionId": 13,
            "id": 31,
            "name": "Детские игрушки",
            "sort": 100,
            "xmlId": "myXmlId"
        }
    },
    "time": {
        "start": 1716552521.40908,
        "finish": 1716552521.69852,
        "duration": 0.289434909820557,
        "processing": 0.011207103729248,
        "date_start": "2024-05-24T14:08:41+02:00",
        "date_finish": "2024-05-24T14:08:41+02:00",
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
|| **section**
[`catalog_section`](../data-types.md#catalog_section) | Объект с информацией о добавленной секции каталога ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300040,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300040` | Нет доступа к редактированию ||
|| `200700300000` | Ошибки при добавлении, например, идентификатор инфоблока создаваемой секции не совпадает с идентификатором инфоблока секции-родителя ||
|| `200700300040` | Нарушение уникальности поля `code` ||
|| `200700300050` | Инфоблока с заданным `iblockId` не существует ||
|| `100` | Не передан обязательный параметр  `fields` ||
|| `0` | Не установлены обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-section-update.md)
- [{#T}](./catalog-section-get.md)
- [{#T}](./catalog-section-list.md)
- [{#T}](./catalog-section-delete.md)
- [{#T}](./catalog-section-get-fields.md)