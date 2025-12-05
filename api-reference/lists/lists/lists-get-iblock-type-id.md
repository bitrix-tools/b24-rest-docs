# Получить идентификатор типа инфоблока lists.get.iblock.type.id

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для списков

Метод `lists.get.iblock.type.id` возвращает идентификатор типа инфоблока.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_ID":87}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/lists.get.iblock.type.id
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_ID":87,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.get.iblock.type.id
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'lists.get.iblock.type.id',
            {
                IBLOCK_ID: 87,
            }
        );
        
        const result = response.getData().result;
        console.log('Data:', result);
        
        processResult(result);
    }
    catch( error )
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
                'lists.get.iblock.type.id',
                [
                    'IBLOCK_ID' => 87
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
     'lists.get.iblock.type.id',
     {
        IBLOCK_ID: 87
     },
        function(res) {
            if (res.error()) {
                console.error(res.error());
            } else {
                console.log(res.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.get.iblock.type.id',
        [
            'IBLOCK_ID' => 87
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
    "result": "lists",
    "time": {
        "start": 1764775444,
        "finish": 1764775444.66342,
        "duration": 0.6634199619293213,
        "processing": 0,
        "date_start": "2025-12-03T18:24:04+03:00",
        "date_finish": "2025-12-03T18:24:04+03:00",
        "operating_reset_at": 1764776044,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string`](../../data-types.md) | Идентификатор типа инфоблока.

Возвращает `null`, если инфоблок не найден или параметры неверны ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-add.md)
- [{#T}](./lists-update.md)
- [{#T}](./lists-get.md)
- [{#T}](./lists-delete.md)