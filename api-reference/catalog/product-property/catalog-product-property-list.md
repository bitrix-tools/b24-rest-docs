# Получить список свойств товаров или вариаций catalog.productProperty.list

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр каталога

Метод `catalog.productProperty.list` возвращает список свойств товаров и вариаций по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать (смотрите поля объекта [catalog_product_property](../data-types.md#catalog_product_property)).

Если параметр не передан, будут выбраны все поля ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных свойств в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property](../data-types.md#catalog_product_property).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Если `iblockId` не передан, метод выбирает свойства всех торговых каталогов. Если передан `iblockId`, который не является каталогом, метод вернет пустой список ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных свойств в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [catalog_product_property](../data-types.md#catalog_product_property).

Возможные значения для `order`:
- `ASC` — в порядке возрастания
- `DESC` — в порядке убывания

Если параметр не передан, применяется сортировка `id ASC` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — `100` и так далее.

Формула расчета значения параметра `start`: `start = (N - 1) * 50`, где `N` — номер нужной страницы.

Если передать значение `-1`, в ответе не будет поля `total` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["id","name","iblockId","propertyType"],"filter":{"iblockId":19},"order":{"id":"ASC"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productProperty.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["id","name","iblockId","propertyType"],"filter":{"iblockId":19},"order":{"id":"ASC"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productProperty.list
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod('catalog.productProperty.list', {
            select: ['id', 'name', 'iblockId', 'propertyType'],
            filter: { iblockId: 19 },
            order: { id: 'ASC' }
        });

        console.log(response.getData().result);
    } catch (error) {
        console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productProperty.list',
                [
                    'select' => ['id', 'name', 'iblockId', 'propertyType'],
                    'filter' => [
                        'iblockId' => 19,
                    ],
                    'order' => ['id' => 'ASC'],
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
        'catalog.productProperty.list',
        {
            select: ['id', 'name', 'iblockId', 'propertyType'],
            filter: {
                iblockId: 19
            },
            order: { id: 'ASC' }
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
        'catalog.productProperty.list',
        [
            'select' => ['id', 'name', 'iblockId', 'propertyType'],
            'filter' => ['iblockId' => 19],
            'order' => ['id' => 'ASC'],
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
        "productProperties": [
            {
                "iblockId": 19,
                "id": 115,
                "name": "Марка",
                "propertyType": "L"
            },
            {
                "iblockId": 19,
                "id": 659,
                "name": "Рубрика",
                "propertyType": "S"
            },
            ... // описание для каждого свойства
        ]
    },
    "next": 50,
    "total": 51,
    "time": {
        "start": 1773933226,
        "finish": 1773933226.400275,
        "duration": 0.40027499198913574,
        "processing": 0,
        "date_start": "2026-03-19T18:13:46+03:00",
        "date_finish": "2026-03-19T18:13:46+03:00",
        "operating_reset_at": 1773933826,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа ||
|| **productProperties**
[`catalog_product_property[]`](../data-types.md#catalog_product_property) | Массив объектов с информацией о выбранных свойствах ||
|| **next**
[`integer`](../../data-types.md) | Смещение для следующей страницы. Поле возвращается, если есть еще записи ||
|| **total**
[`integer`](../../data-types.md) | Общее число записей. Поле не возвращается, если запрос выполнен со `start = -1` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Access Denied | Недостаточно прав для просмотра каталога ||
|| `400` | `100` | Invalid value {`...`} to match with parameter {filter}. Should be value of type array | Неверный тип данных у значения параметра `filter` ||
|| `400` | `100` | Invalid value {`...`} to match with parameter {select}. Should be value of type array | Неверный тип данных у значения параметра `select` ||
|| `400` | `100` | Invalid value {`...`} to match with parameter {order}. Should be value of type array | Неверный тип данных у значения параметра `order` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-add.md)
- [{#T}](./catalog-product-property-update.md)
- [{#T}](./catalog-product-property-get.md)
- [{#T}](./catalog-product-property-delete.md)
- [{#T}](./catalog-product-property-get-fields.md)
