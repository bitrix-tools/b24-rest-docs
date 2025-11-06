# Обновить цвет универсального дела crm.activity.todo.updateColor

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на редактирование элемента CRM, для которого обновляется дело

Метод `crm.activity.todo.updateColor` обновляет цвет универсального дела.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор обновляемого дела, например  `999` ||
|| **ownerTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), к которому привязано дело, например `2` для сделки ||
|| **ownerId***
[`integer`](../../../../data-types.md) | Идентификатор элемента CRM, к которому привязано дело, например, `1` ||
|| **colorId***
[`string`](../../../../data-types.md) | Идентификатор цвета дела в таймлайне, например `1`. Для выбора доступно 8 цветов, значения от 1 до 7 и цвет по умолчанию, если ничего не указано:

![Доступные цвета](./_images/colors.png)

||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":1,"colorId":"3"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.activity.todo.updateColor
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"ownerTypeId":2,"ownerId":1,"colorId":"3","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.todo.updateColor
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.activity.todo.updateColor',
    		{
    			id: 999,
    			ownerTypeId: 2,
    			ownerId: 1,
    			colorId: '3'
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
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
                'crm.activity.todo.updateColor',
                [
                    'id'          => 999,
                    'ownerTypeId' => 2,
                    'ownerId'     => 1,
                    'colorId'     => '3',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating todo color: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.todo.updateColor",
        {
            id: 999,
            ownerTypeId: 2,
            ownerId: 1,
            colorId: '3'
        }, 
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.todo.updateColor',
        [
            'id' => 999,
            'ownerTypeId' => 2,
            'ownerId' => 1,
            'colorId' => '3'
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
        "id": 999
    },
    "time": {
       "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | В случае успеха возвращает объект, содержащий идентификатор обновлённого дела `id`, в случае ошибки = `null` ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | Не переданы обязательные поля ||
|| `NOT_FOUND` | Элемент CRM не найден ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнения операции ||
|| `OWNER_NOT_FOUND` | Владелец элемента не найден ||
|| `CAN_NOT_UPDATE_COLOR_COMPLETED_TODO` | Невозможно изменить цвет в закрытом деле ||
|| `CAN_NOT_UPDATE_WRONG_COLOR_TODO` | Некорректное значение цвета ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-todo-add.md)
- [{#T}](./crm-activity-todo-update.md)
- [{#T}](./crm-activity-todo-update-deadline.md)
- [{#T}](./crm-activity-todo-update-description.md)
- [{#T}](./crm-activity-todo-update-responsible-user.md)
