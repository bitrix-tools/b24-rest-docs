# Получить список стран для шаблона crm.requisite.preset.countries

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает возможный список стран для [шаблонов реквизита](./index.md) Идентификаторы стран используются в качестве значений поля `COUNTRY_ID` шаблона.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.requisite.preset.countries
    ```

- cURL (OAuth) 

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.countries
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.requisite.preset.countries",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.preset.countries',
        []
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
    "result": [
        {
            "ID": 1,
            "CODE": "RU",
            "TITLE": "Россия"
        },
        {
            "ID": 4,
            "CODE": "BY",
            "TITLE": "Беларусь"
        },
        {
            "ID": 6,
            "CODE": "KZ",
            "TITLE": "Казахстан"
        },
        {
            "ID": 14,
            "CODE": "UA",
            "TITLE": "Украина"
        },
        {
            "ID": 34,
            "CODE": "BR",
            "TITLE": "Бразилия"
        },
        {
            "ID": 46,
            "CODE": "DE",
            "TITLE": "Германия"
        },
        {
            "ID": 77,
            "CODE": "CO",
            "TITLE": "Колумбия"
        },
        {
            "ID": 110,
            "CODE": "PL",
            "TITLE": "Польша"
        },
        {
            "ID": 122,
            "CODE": "US",
            "TITLE": "США"
        },
        {
            "ID": 132,
            "CODE": "FR",
            "TITLE": "Франция"
        }
    ],
    "time": {
        "start": 1716549490.84839,
        "finish": 1716549491.239788,
        "duration": 0.39139795303344727,
        "processing": 0.017835140228271484,
        "date_start": "2024-05-24T13:18:10+02:00",
        "date_finish": "2024-05-24T13:18:11+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Массив объектов, описывающих страны ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Поля объекта, описывающего страну

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код по стандарту [ISO 3166-1](https://www.iso.org/iso-3166-country-codes.html) ||
|| **TITLE**
[`string`](../../../data-types.md) | Название ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-add.md)
- [{#T}](./crm-requisite-preset-update.md)
- [{#T}](./crm-requisite-preset-get.md)
- [{#T}](./crm-requisite-preset-list.md)
- [{#T}](./crm-requisite-preset-delete.md)
- [{#T}](./crm-requisite-preset-fields.md)
