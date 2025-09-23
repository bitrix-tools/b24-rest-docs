# Удалить зарегистрированного робота bizproc.robot.delete

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет робота, зарегистрированного приложением.

Работает только в контексте [приложения](../../../settings/app-installation/index.md).

При удалении или обновлении приложения связанные с ним роботы удаляются из списка роботов. Если робот используется, он блокируется и может быть только удален из схемы. При повторной установке приложения робот снова становится доступным.

## Параметры метода

#|
|| **Название**
`тип` | **Описание**||
|| **CODE***
[`string`](../../data-types.md) | Символьный идентификатор робота приложения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"test_robot","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.robot.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.robot.delete',
    		{
    			'CODE': 'test_robot'
    		}
    	);
    	
    	const result = response.getData().result;
    	alert("Успешно: " + result);
    }
    catch( error )
    {
    	alert('Error: ' + error);
    }
    ```

- PHP

    ```php
    try {
        $robotCode = 'your_robot_code_here'; // Replace with the actual robot code
        $result = $serviceBuilder
            ->getBizProcScope()
            ->robot()
            ->delete($robotCode);

        if ($result->isSuccess()) {
            print("Robot deleted successfully.");
        } else {
            print("Failed to delete robot.");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.robot.delete',
        {
            'CODE': 'test_robot'
        },
        function(result) {
            if(result.error())
                alert('Error: ' + result.error());
            else
                alert("Успешно: " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.robot.delete',
        [
            'CODE' => 'test_robot'
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
        "start": 1738150149.8462,
        "finish": 1738150149.8894911,
        "duration": 0.043291091918945312,
        "processing": 0.0053689479827880859,
        "date_start": "2025-01-29T14:29:09+03:00",
        "date_finish": "2025-01-29T14:29:09+03:00",
        "operating_reset_at": 1738150749,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если робот успешно удален ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ACTIVITY_NOT_FOUND",
    "error_description": "Activity or Robot not found!"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ACCESS_DENIED` | Application context required | Необходим контекст приложения ||
|| `ACCESS_DENIED` | Access denied! | Метод выполнил не администратор ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Empty activity code! | Не указан код робота ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Wrong activity code! | Некорректный код робота ||
|| `ERROR_ACTIVITY_NOT_FOUND` | Activity or Robot not found! | Робот не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-robot-add.md)
- [{#T}](./bizproc-robot-update.md)
- [{#T}](./bizproc-robot-list.md)
- [{#T}](./bizproc-event-send.md)