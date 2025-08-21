# Удалить привязку свойства sale.propertyRelation.deleteByFilter

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.propertyRelation.deleteByFilter` удаляет привязку свойства. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для удаления привязки свойства ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **entityId***
[`integer`](../../data-types.md) | Идентификатор сущности ||
|| **entityType***
[`string`](../../data-types.md) | Тип сущности:
- `P` — платежная система
- `D` — доставка
- `L` — лендинг
- `T` — торговая платформа ||
|| **propertyId***
[`sale_order_property.id`](../data-types.md) | Идентификатор свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"entityId":6,"entityType":"D","propertyId":40}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertyRelation.deleteByFilter
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"entityId":6,"entityType":"D","propertyId":40},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertyRelation.deleteByFilter
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.propertyRelation.deleteByFilter', 
    		{
    			fields: {
    				entityId: 6,
    				entityType: 'D',
    				propertyId: 40
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
                'sale.propertyRelation.deleteByFilter',
                [
                    'fields' => [
                        'entityId'    => 6,
                        'entityType'  => 'D',
                        'propertyId'  => 40
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
        echo 'Error deleting property relation: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.propertyRelation.deleteByFilter', 
        {
            fields: {
                entityId: 6,
                entityType: 'D',
                propertyId: 40
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
        'sale.propertyRelation.deleteByFilter',
        [
            'fields' => [
                'entityId' => 6,
                'entityType' => 'D',
                'propertyId' => 40
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
    "result": true,
    "time": {
        "start": 1712301886.43654,
        "finish": 1712301886.884087,
        "duration": 0.44754719734191895,
        "processing": 0.040498971939086914,
        "date_start": "2024-04-05T10:24:46+03:00",
        "date_finish": "2024-04-05T10:24:46+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат удаления привязки свойства ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201640400004,
    "error_description":"property relation is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201640400004` | Привязка свойства с указанными параметрами не найдена ||
|| `200040300010` | Недостаточно прав для удаления привязки свойства ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не указан обязательный параметр ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./sale-property-relation-add.md)
- [{#T}](./sale-property-relation-list.md)
- [{#T}](./sale-property-relation-get-fields.md)