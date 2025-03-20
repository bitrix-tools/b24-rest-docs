# Добавить соответствие физическому или юридическому лицу sale.businessValuePersonDomain.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.businessValuePersonDomain.add` добавляет для выбранного типа плательщика соответствие физическому или юридическому лицу. Это необходимо для работы механизма бизнес-смыслов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания соответствия физическому или юридическому лицу ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **personTypeId***
[`sale_person_type.id`](../data-types.md) | Идентификатор типа плательщика. 

Получить идентификаторы типов плательщиков можно с помощью метода [sale.persontype.list](../person-type/sale-person-type-list.md) ||
|| **domain***
[`string`](../../data-types.md) | Значение, которому соответствует тип плательщика: физическое или юридическое лицо.
- `I` — физическое лицо
- `E` — юридическое лицо ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"personTypeId":3,"domain":"I"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.businessValuePersonDomain.add
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"personTypeId":3,"domain":"I"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.businessValuePersonDomain.add
    ```

- JS

    ```js
    B24.callMethod(
        'sale.businessValuePersonDomain.add',
        {
            fields: {
                personTypeId: 3,
                domain: 'I'
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
        'sale.businessValuePersonDomain.add',
        [
            'fields' =>
            [
                'personTypeId' => 3,
                'domain' => 'I'
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
    "businessValuePersonDomain": {
        "domain": "I",
        "personTypeId": 3
    },
    "time": {
        "start": 1712325642.686926,
        "finish": 1712325642.949075,
        "duration": 0.2621490955352783,
        "processing": 0.004400968551635742,
        "date_start": "2024-04-05T16:00:42+02:00",
        "date_finish": "2024-04-05T16:00:42+02:00",
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
|| **businessValuePersonDomain**
[`sale_business_value_person_domain`](../data-types.md) | Объект с информацией о добавленном соответствии типа плательщика физическому или юридическому лицу ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 201450000001,
    "error_description": "Duplicate entry for key [personTypeId]"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201250000001` | Соответствие для указанного идентификатора типа плательщика уже существует ||
|| `201240400002` | Тип плательщика с указанным идентификатором не существует ||
|| `200040300020` | Ошибка доступа к записи ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-business-value-person-domain-list.md)
- [{#T}](./sale-business-value-person-domain-delete-by-filter.md)
- [{#T}](./sale-business-value-person-domain-get-fields.md)