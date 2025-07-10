# Получить список нестандартных полей, участвующих в поиске дубликатов crm.duplicate.volatileType.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `crm.duplicate.volatileType.list` возвращает список нестандартных полей, которые уже используются для поиска дубликатов в лидах, контактах и компаниях.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "crm.duplicate.volatileType.list",
        {},
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.duplicate.volatileType.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.duplicate.volatileType.list
    ```   

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.duplicate.volatileType.list',
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
            "id": 3355,
            "entityTypeId": 1,
            "fieldCode": "TITLE"
        }
    ],
    "time": {
        "start": 1750934651.513455,
        "finish": 1750934651.578262,
        "duration": 0.06480717658996582,
        "processing": 0.017321109771728516,
        "date_start": "2025-06-26T13:44:11+03:00",
        "date_finish": "2025-06-26T13:44:11+03:00",
        "operating_reset_at": 1750935251,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор записи ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Тип объекта ||
|| **fieldCode**
[`string`](../../../data-types.md) | Код поля ||
|| **time**[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

Метод не возвращает ошибки.

{% include [системные ошибки](./../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md)
- [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md)
- [crm.duplicate.volatileType.unregister](./crm-duplicate-volatile-type-unregister.md) 