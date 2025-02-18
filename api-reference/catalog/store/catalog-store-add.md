# Добавить склад catalog.store.add

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет новый склад.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md)| Значения полей для добавления склада ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **address***
[`string`](../../data-types.md) | Адрес склада ||
|| **title**
[`string`](../../data-types.md) | Название склада ||
|| **active**
[`string`](../../data-types.md) | Активность. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|| **description**
[`string`](../../data-types.md) | Описание ||
|| **gpsN**
[`double`](../../data-types.md) | GPS-широта ||
|| **gpsS**
[`double`](../../data-types.md) | GPS-долгота ||
|| **dateModify**
[`datetime`](../../data-types.md) | Дата изменения ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания ||
|| **userId**
[`user.id`](../../data-types.md) | Кем создан ||
|| **modifiedBy**
[`user.id`](../../data-types.md) | Кем изменен ||
|| **phone**
[`string`](../../data-types.md) | Телефон ||
|| **schedule**
[`string`](../../data-types.md) | График работы ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код.

Можно использовать для синхронизации текущего склада с аналогичной позицией во внешней системе ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка.

По умолчанию `100` ||
|| **email**
[`string`](../../data-types.md) | E-mail ||
|| **issuingCenter**
[`string`](../../data-types.md) | Является ли пунктом выдачи. Возможные значения:
- `Y` – да
- `N` – нет

По умолчанию `N` ||
|| **code**
[`string`](../../data-types.md) | Символьный код ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"address":"пр. Московский д. 52","title":"Склад 1","active":"Y","description":"Описание","gpsN":"54.71411","gpsS":"21.56675","dateModify":"2024-10-21T10:00:00","dateCreate":"2024-10-21T10:00:00","userId":1,"modifiedBy":1,"phone":"8 (495) 212 85 06","schedule":"Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00","xmlId":"","sort":100,"email":"test@test.ru","issuingCenter":"N","code":"store_1"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.store.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"address":"пр. Московский д. 52","title":"Склад 1","active":"Y","description":"Описание","gpsN":"54.71411","gpsS":"21.56675","dateModify":"2024-10-21T10:00:00","dateCreate":"2024-10-21T10:00:00","userId":1,"modifiedBy":1,"phone":"8 (495) 212 85 06","schedule":"Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00","xmlId":"","sort":100,"email":"test@test.ru","issuingCenter":"N","code":"store_1"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.store.add
    ```

- JS

    ```js
    BX24.callMethod(
        'catalog.store.add',
            {
                fields: {
                    'address': 'пр. Московский д. 52',
                    'title': 'Склад 1',
                    'active': 'Y',
                    'description': 'Описание',
                    'gpsN': '54.71411',
                    'gpsS': '21.56675',
                    'dateModify': '2024-10-21T10:00:00',
                    'dateCreate': '2024-10-21T10:00:00',
                    'userId': 1,
                    'modifiedBy': 1,
                    'phone': '8 (495) 212 85 06',
                    'schedule': 'Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00',
                    'xmlId': '',
                    'sort': 100,
                    'email': 'test@test.ru',
                    'issuingCenter': 'N',
                    'code': 'store_1',
                },
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
        'catalog.store.add',
        [
            'fields' => [
                'address' => 'пр. Московский д. 52',
                'title' => 'Склад 1',
                'active' => 'Y',
                'description' => 'Описание',
                'gpsN' => '54.71411',
                'gpsS' => '21.56675',
                'dateModify' => '2024-10-21T10:00:00',
                'dateCreate' => '2024-10-21T10:00:00',
                'userId' => 1,
                'modifiedBy' => 1,
                'phone' => '8 (495) 212 85 06',
                'schedule' => 'Пн.-Пт. с 9:00 до 20:00, Сб.-Вс. с 11:00 до 18:00',
                'xmlId' => '',
                'sort' => 100,
                'email' => 'test@test.ru',
                'issuingCenter' => 'N',
                'code' => 'store_1',
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
    "result": 1,
    "time": {
        "start": 1739774377.1963561,
        "finish": 1739774377.2183349,
        "duration": 0.021978855133056641,
        "processing": 0.0041911602020263672,
        "date_start": "2025-02-17T09:39:37+03:00",
        "date_finish": "2025-02-17T09:39:37+03:00",
        "operating_reset_at": 1739774977,
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
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300020,
    "error_description":"Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для создания склада ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не указан или пустой параметр `address` || 
|| `0` | Другие ошибки (например, фатальные ошибки) || 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-store-update.md)
- [{#T}](./catalog-store-get.md)
- [{#T}](./catalog-store-list.md)
- [{#T}](./catalog-store-delete.md)
- [{#T}](./catalog-store-get-fields.md)

