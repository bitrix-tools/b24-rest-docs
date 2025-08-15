# Обновить поля группы свойств sale.propertygroup.update

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет поля группы свойств.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_property_group.id`](../data-types.md) | Идентификатор группы свойств ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления группы свойств ||
|#

## Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **personTypeId***
[`sale_person_type.id`](../data-types.md) | Идентификатор типа плательщика. Так как свойство отмечено индикатором `isImmutable`, то изменить его не получится. Значение свойства же передавать обязательно ||
|| **name***
[`string`](../../data-types.md) | Название группы свойств ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":10,"fields":{"personTypeId":3,"name":"Обновленная группа свойств","sort":100}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.propertygroup.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":10,"fields":{"personTypeId":3,"name":"Обновленная группа свойств","sort":100},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.propertygroup.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.propertygroup.update", {
    			"id": 10,
    			"fields": {
    				"personTypeId": 3,
    				"name": "Обновленная группа свойств",
    				"sort": 100,
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
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
                'sale.propertygroup.update',
                [
                    'id' => 10,
                    'fields' => [
                        'personTypeId' => 3,
                        'name' => 'Обновленная группа свойств',
                        'sort' => 100,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating property group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.propertygroup.update", {
            "id": 10,
            "fields": {
                "personTypeId": 3,
                "name": "Обновленная группа свойств",
                "sort": 100,
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.propertygroup.update',
        [
            'id' => 10,
            'fields' => [
                'personTypeId' => 3,
                'name' => 'Обновленная группа свойств',
                'sort' => 100,
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
    "result":{
        "propertyGroup":{
            "id":10,
            "name":"Обновленная группа свойств",
            "personTypeId":3,
            "sort":100
        }
    },
    "time":{
        "start":1711451989.729911,
        "finish":1711451989.907491,
        "duration":0.1775798797607422,
        "processing":0.008534908294677734,
        "date_start":"2024-03-26T14:19:49+03:00",
        "date_finish":"2024-03-26T14:19:49+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **propertyGroup**
[`sale_order_property_group`](../data-types.md) | Объект с информацией об обновленной группе свойств ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"Required fields: name"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200940400001` | Обновляемая группа свойств не найдена ||
|| `200040300020` | Недостаточно прав для обновления группы свойств ||
|| `200950000008` | Передано пустое значение одного из обязательных полей ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля структуры `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-group-add.md)
- [{#T}](./sale-property-group-get.md)
- [{#T}](./sale-property-group-list.md)
- [{#T}](./sale-property-group-delete.md)
- [{#T}](./sale-property-group-get-fields.md)