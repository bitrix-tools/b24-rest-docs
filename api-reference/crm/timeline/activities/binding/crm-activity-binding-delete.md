# Удалить связь дела с элементом CRM crm.activity.binding.delete

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь c правом редактирования элементов CRM

Метод `crm.activity.binding.delete` удаляет cвязь дела с элементом CRM. Если дело привязано только к одному элементу, удалить эту привязку нельзя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **activityId***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор дела в таймлайне, например `999` ||
|| **entityTypeId***
[`integer`](../../../../data-types.md) | [Целочисленный идентификатор типа объекта CRM](../../../data-types.md#object_type), с которым удаляем связь дела, например `2` для сделки ||
|| **entityId***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор элемента CRM, с которым удаляем связь дела, например `1`  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":999, "entityTypeId":2, entityId: 1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.binding.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":999, "entityTypeId":2, "entityId": 1, "auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.binding.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.activity.binding.delete',
    		{
    			activityId: 999, // ID дела
    			entityTypeId: 2, // ID типа объекта CRM
    			entityId: 1 // ID элемента CRM
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log('Результат:', result);
    }
    catch( error )
    {
    	console.error('Ошибка:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.binding.delete',
                [
                    'activityId'   => 999, // ID дела
                    'entityTypeId' => 2, // ID типа объекта CRM
                    'entityId'     => 1 // ID элемента CRM
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Результат: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.activity.binding.delete',
        {
            activityId: 999, // ID дела
            entityTypeId: 2, // ID типа объекта CRM
            entityId: 1 // ID элемента CRM
        },
        function(result) {
            if (result.error()) {
                console.error('Ошибка:', result.error()); 
            } else {
                console.log('Результат:', result.data()); 
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.binding.delete',
        [
            'activityId' => 999, // ID дела
            'entityTypeId' => 2, // ID типа объекта CRM
            'entityId' => 1 // ID элемента CRM
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
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | Результат операции. Возвращает `true` если связь успешно создана, иначе — `false` ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | Не переданы обязательные поля ||
|| `NOT_FOUND` | Элемент не найден ||
|| `OWNER_NOT_FOUND` | Владелец элемента не найден ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнении операции ||
|| `BINDING_NOT_FOUND` | Дело не привязано к этому элементу ||
|| `LAST_BINDING_CANNOT_BE_DELETED` | Нельзя удалять единственную привязку дела к сущности ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-activity-binding-list.md)
- [{#T}](./crm-activity-binding-add.md)
- [{#T}](./crm-activity-binding-move.md)
- [{#T}](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity-between-objects.md)