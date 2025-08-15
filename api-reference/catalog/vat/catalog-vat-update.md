# Изменить ставку НДС catalog.vat.update

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет ставку НДС.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_vat.id`](../data-types.md#catalog_vat) | Идентификатор ставки НДС ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления ставки НДС ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название ставки НДС ||
|| **active**
[`string`](../../data-types.md) | Индикатор активности ставки НДС. Возможные значения:
- `Y` — активен
- `N` — неактивен
||
|| **rate***
[`double`](../../data-types.md) | Величина ставки НДС ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6,"fields":{"name":"Налог 23%","rate":23,"sort":20,"active":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.vat.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6,"fields":{"name":"Налог 23%","rate":23,"sort":20,"active":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.vat.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.vat.update', 
    		{
    			id: 6,
    			fields: {
    				name: "Налог 23%",
    				rate: 23,
    				sort: 20,
    				active: "Y"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.vat.update',
                [
                    'id' => 6,
                    'fields' => [
                        'name'   => "Налог 23%",
                        'rate'   => 23,
                        'sort'   => 20,
                        'active' => "Y"
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating VAT: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.vat.update', 
        {
            id: 6,
            fields: {
                name: "Налог 23%",
                rate: 23,
                sort: 20,
                active: "Y"
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

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.vat.update',
        [
            'id' => 6,
            'fields' => [
                'name' => 'Налог 23%',
                'rate' => 23,
                'sort' => 20,
                'active' => "Y"
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
        "vat": {
            "active": "Y",
            "id": 6,
            "name": "Налог 23%",
            "rate": 23,
            "sort": 20,
            "timestampX": "2024-09-16T11:53:04+02:00"
        }
    },
    "time": {
        "start": 1712327086.69665,
        "finish": 1712327086.95303,
        "duration": 0.256376028060913,
        "processing": 0.0112268924713135,
        "date_start": "2024-04-05T16:24:46+02:00",
        "date_finish": "2024-04-05T16:24:46+02:00",
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
|| **vat**
[`catalog_vat`](../data-types.md#catalog_vat) | Объект с информацией об обновленной ставке НДС
||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description":"Required fields: code"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для редактирования
||
|| `200800000000` | Ставки НДС с таким идентификатором не существует
||
|| `100` | Не указан параметр `id`
||
|| `100` | Не указан или пустой параметр `fields`
||
|| `0` | Не переданы обязательные поля структуры `fields`
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-vat-add.md)
- [{#T}](./catalog-vat-get.md)
- [{#T}](./catalog-vat-list.md)
- [{#T}](./catalog-vat-delete.md)
- [{#T}](./catalog-vat-get-fields.md)