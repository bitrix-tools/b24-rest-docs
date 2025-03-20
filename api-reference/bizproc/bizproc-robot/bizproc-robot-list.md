# Получить список зарегистрированных приложением роботов bizproc.robot.list

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод возвращает список роботов, зарегистрированных приложением.

Работает только в контексте [приложения](../../app-installation/index.md).

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.robot.list
    ```

- JS

    ```js
    BX24.callMethod(
        'bizproc.robot.list',
        {},
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                alert("Успешно: " + result.data().join(', '));
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.robot.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- PHP (B24PhpSdk)

	```php
    try {
        $result = $serviceBuilder
            ->getBizProcScope()
            ->robot()
            ->list();

        foreach ($result->getRobots() as $robot) {
            print($robot->code);
            print($robot->name);
            print($robot->handlerUrl);
            print($robot->authUserId);
            print($robot->isUseSubscription ? 'Yes' : 'No');
            print($robot->isUsePlacement ? 'Yes' : 'No');
            if ($robot->createdDate instanceof DateTime) {
                print($robot->createdDate->format(DateTime::ATOM));
            }
        }
    } catch (Throwable $e) {
        // Handle the exception
        print('Error: ' . $e->getMessage());
    }
	```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        "test_robot",
        "sms_robot"
    ],
    "time": {
        "start": 1738151724.710429,
        "finish": 1738151724.7319269,
        "duration": 0.021497964859008789,
        "processing": 0.0011229515075683594,
        "date_start": "2025-01-29T14:55:24+03:00",
        "date_finish": "2025-01-29T14:55:24+03:00",
        "operating_reset_at": 1738152324,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список идентификаторов роботов приложения ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ACCESS_DENIED` | Application context required | Необходим контекст приложения ||
|| `ACCESS_DENIED` | Access denied! | Метод выполнил не администратор ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-robot-add.md)
- [{#T}](./bizproc-robot-update.md)
- [{#T}](./bizproc-robot-delete.md)
- [{#T}](./bizproc-event-send.md)