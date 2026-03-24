# Добавить привязку типа цен к группе покупателей catalog.priceTypeGroup.add

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Управление типами цен»

Метод `catalog.priceTypeGroup.add` добавляет привязку типа цены к группе покупателей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания привязки типа цены к группе покупателей ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId***
[`catalog_price_type.id`](../../data-types.md#catalog_price_type) | Идентификатор типа цены. Можно получить методом [catalog.priceType.list](../catalog-price-type-list.md) ||
|| **groupId***
[`integer`](../../data-types.md) | Идентификатор группы покупателей ||
|| **access***
[`char`](../../data-types.md) | Тип доступа к цене. Возможные значения:
- `Y` — право на покупку по этому типу цены
- `N` — право на просмотр этого типа цены ||
|#

{% note info "" %}

Перед добавлением проверьте существующую запись методом [catalog.priceTypeGroup.list](./catalog-price-type-group-list.md) с фильтром по `catalogGroupId`, `groupId` и `access`. Если запись уже существует, метод вернет ошибку: `The specified access type for this group already exists`

{% endnote %}


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":9,"groupId":23,"access":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.priceTypeGroup.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":9,"groupId":23,"access":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceTypeGroup.add
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.priceTypeGroup.add',
    		{
    			fields: {
    				catalogGroupId: 9,
    				groupId: 23,
    				access: "Y"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.priceTypeGroup.add',
                [
                    'fields' => [
                        'catalogGroupId' => 9,
                        'groupId'        => 23,
                        'access'         => 'Y',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding price type group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceTypeGroup.add',
        {
            fields: {
                catalogGroupId: 9,
                groupId: 23,
                access: 'Y'
            }
        },
        function(result) {
            if (result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.priceTypeGroup.add',
        [
            'fields' => [
                'catalogGroupId' => 9,
                'groupId' => 23,
                'access' => 'Y'
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
        "priceTypeGroup": {
        "access": "Y",
        "catalogGroupId": 9,
        "groupId": 23,
        "id": 109
        }
    },
    "time": {
        "start": 1774260171,
        "finish": 1774260171.438073,
        "duration": 0.43807291984558105,
        "processing": 0,
        "date_start": "2026-03-23T13:02:51+03:00",
        "date_finish": "2026-03-23T13:02:51+03:00",
        "operating_reset_at": 1774260771,
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
|| **priceTypeGroup**
[`catalog_price_type_group`](../../data-types.md#catalog_price_type_group) | Объект с информацией о созданной привязке типа цены к группе покупателей ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300020,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `200040300020` | Access Denied | Недостаточно прав для редактирования типов цен ||
|| `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `0` | The specified price type does not exist | Указанный тип цены не существует ||
|| `0` | The specified group does not exist | Указанная группа покупателей не существует ||
|| `0` | Invalid access type provided. The available values are: Y, N | Передан недопустимый тип доступа. Допустимые значения: `Y`, `N` ||
|| `0` | The specified access type for this group already exists | Такая привязка для этого типа цены и группы уже существует ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-group-delete.md)
- [{#T}](./catalog-price-type-group-get-fields.md)
- [{#T}](./catalog-price-type-group-list.md)

