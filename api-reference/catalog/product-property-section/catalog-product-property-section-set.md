# Установить секционные настройки свойства catalog.productPropertySection.set

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.productPropertySection.set` устанавливает секционные настройки свойства товара или вариации.

Если записи секционных настроек для свойства нет, метод создает ее. Если запись уже существует, метод обновляет ее.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **propertyId***
[`catalog_product_property.id`](../data-types.md#catalog_product_property) | Идентификатор свойства товара или вариации.

Идентификаторы свойств можно получить методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Поля секционных настроек свойства [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **smartFilter**
[`char`](../../data-types.md) | Показывать ли свойство в умном фильтре. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **displayType**
[`char`](../../data-types.md) | Вид свойства в умном фильтре. Возможные значения:
- `F` — флажки
- `K` — радиокнопки
- `P` — выпадающий список ||
|| **displayExpanded**
[`char`](../../data-types.md) | Показывать ли свойство развернутым в фильтре. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **filterHint**
[`string`](../../data-types.md) | Подсказка в умном фильтре для посетителей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"propertyId":901,"fields":{"smartFilter":"Y","displayType":"F","displayExpanded":"N","filterHint":"Подсказка для фильтра"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertySection.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"propertyId":901,"fields":{"smartFilter":"Y","displayType":"F","displayExpanded":"N","filterHint":"Подсказка для фильтра"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertySection.set
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod('catalog.productPropertySection.set', {
            propertyId: 901,
            fields: {
                smartFilter: 'Y',
                displayType: 'F',
                displayExpanded: 'N',
                filterHint: 'Подсказка для фильтра'
            }
        });

        console.log(response.getData().result);
    }
    catch (error) {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productPropertySection.set',
                [
                    'propertyId' => 901,
                    'fields' => [
                        'smartFilter' => 'Y',
                        'displayType' => 'F',
                        'displayExpanded' => 'N',
                        'filterHint' => 'Подсказка для фильтра',
                    ]
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productPropertySection.set',
        {
            propertyId: 901,
            fields: {
                smartFilter: 'Y',
                displayType: 'F',
                displayExpanded: 'N',
                filterHint: 'Подсказка для фильтра'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.productPropertySection.set',
        [
            'propertyId' => 901,
            'fields' => [
                'smartFilter' => 'Y',
                'displayType' => 'F',
                'displayExpanded' => 'N',
                'filterHint' => 'Подсказка для фильтра',
            ]
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "productPropertySection": {
        "displayExpanded": "N",
        "displayType": "F",
        "filterHint": "Подсказка для фильтра",
        "iblockId": "25",
        "propertyId": "901",
        "sectionId": "0",
        "smartFilter": "Y"
        }
    },
    "time": {
        "start": 1774265022,
        "finish": 1774265022.693577,
        "duration": 0.6935770511627197,
        "processing": 0,
        "date_start": "2026-03-23T14:23:42+03:00",
        "date_finish": "2026-03-23T14:23:42+03:00",
        "operating_reset_at": 1774265622,
        "operating": 0.10450911521911621
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа ||
|| **productPropertySection**
[`catalog_product_property_section`](../data-types.md#catalog_product_property_section) | Объект секционных настроек свойства ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "productPropertySection does not exist."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для изменения секционных настроек свойства ||
|| `0` | productPropertySection does not exist. | Свойство с переданным `propertyId` не найдено или не относится к торговому каталогу ||
|| `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `0` | Error setting section properties | Внутренняя ошибка при сохранении секционных настроек свойства ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-section-get.md)
- [{#T}](./catalog-product-property-section-list.md)
