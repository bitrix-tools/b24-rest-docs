# Установить настройки контроля времени timeman.timecontrol.settings.set

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `timeman.timecontrol.settings.set` устанавливает настройки для модуля контроля времени.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTIVE**
[`boolean`](../../data-types.md) | Активировать модуль контроля времени. Возможные значения:
- `true` или `1` — включить модуль
- `0` — отключить модуль. Вариант `'ACTIVE': false` модуль не отключает
||
|| **MINIMUM_IDLE_FOR_REPORT**
[`integer`](../../data-types.md) | Минимальное время отсутствия в минутах, после которого требуется отчет ||
|| **REGISTER_OFFLINE**
[`boolean`](../../data-types.md) | Регистрировать офлайн статус ||
|| **REGISTER_IDLE**
[`boolean`](../../data-types.md) | Регистрировать статус Отошел ||
|| **REGISTER_DESKTOP**
[`boolean`](../../data-types.md) | Регистрировать статус десктоп приложения ||
|| **REPORT_REQUEST_TYPE**
[`string`](../../data-types.md) | Тип запроса отчетов. Возможные значения:
- `all` — для всех
- `user` — для конкретных пользователей
- `none` — ни для кого ||
|| **REPORT_REQUEST_USERS**
[`array`](../../data-types.md) | Массив идентификаторов пользователей, для которых требуется запрос отчетов.

Заполняется, если `REPORT_REQUEST_USERS` имеет значение `user` ||
|| **REPORT_SIMPLE_TYPE**
[`string`](../../data-types.md) | Тип простого отчета. Возможные значения:
- `all` — для всех
- `user` — для конкретных пользователей
- `none` — ни для кого ||
|| **REPORT_SIMPLE_USERS**
[`array`](../../data-types.md) | Массив идентификаторов пользователей с доступом к простому отчету.

Заполняется, если `REPORT_SIMPLE_USERS` имеет значение `user` ||
|| **REPORT_FULL_TYPE**
[`string`](../../data-types.md) | Тип полного отчета. Возможные значения:
- `all` — для всех
- `user` — для конкретных пользователей
- `none` — ни для кого ||
|| **REPORT_FULL_USERS**
[`array`](../../data-types.md) | Массив идентификаторов пользователей с доступом к полному отчету.

Заполняется, если `REPORT_FULL_USERS` имеет значение `user`  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ACTIVE":true,"MINIMUM_IDLE_FOR_REPORT":15,"REGISTER_OFFLINE":true,"REGISTER_IDLE":true,"REGISTER_DESKTOP":true,"REPORT_REQUEST_TYPE":"all","REPORT_SIMPLE_TYPE":"all","REPORT_FULL_TYPE":"all"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.timecontrol.settings.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ACTIVE":true,"MINIMUM_IDLE_FOR_REPORT":15,"REGISTER_OFFLINE":true,"REGISTER_IDLE":true,"REGISTER_DESKTOP":true,"REPORT_REQUEST_TYPE":"all","REPORT_SIMPLE_TYPE":"all","REPORT_FULL_TYPE":"all","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.timecontrol.settings.set
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'timeman.timecontrol.settings.set',
    		{
    			'ACTIVE': true,
    			'MINIMUM_IDLE_FOR_REPORT': 15,
    			'REGISTER_OFFLINE': true,
    			'REGISTER_IDLE': true,
    			'REGISTER_DESKTOP': true,
    			'REPORT_REQUEST_TYPE': 'all',
    			'REPORT_SIMPLE_TYPE': 'all',
    			'REPORT_FULL_TYPE': 'all'
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
                'timeman.timecontrol.settings.set',
                [
                    'ACTIVE'                 => true,
                    'MINIMUM_IDLE_FOR_REPORT' => 15,
                    'REGISTER_OFFLINE'        => true,
                    'REGISTER_IDLE'           => true,
                    'REGISTER_DESKTOP'        => true,
                    'REPORT_REQUEST_TYPE'     => 'all',
                    'REPORT_SIMPLE_TYPE'      => 'all',
                    'REPORT_FULL_TYPE'        => 'all',
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
        echo 'Error setting time control settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.timecontrol.settings.set',
        {
            'ACTIVE': true,
            'MINIMUM_IDLE_FOR_REPORT': 15,
            'REGISTER_OFFLINE': true,
            'REGISTER_IDLE': true,
            'REGISTER_DESKTOP': true,
            'REPORT_REQUEST_TYPE': 'all',
            'REPORT_SIMPLE_TYPE': 'all',
            'REPORT_FULL_TYPE': 'all'
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
        'timeman.timecontrol.settings.set',
        [
            'ACTIVE' => true,
            'MINIMUM_IDLE_FOR_REPORT' => 15,
            'REGISTER_OFFLINE' => true,
            'REGISTER_IDLE' => true,
            'REGISTER_DESKTOP' => true,
            'REPORT_REQUEST_TYPE' => 'all',
            'REPORT_SIMPLE_TYPE' => 'all',
            'REPORT_FULL_TYPE' => 'all'
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
        "start": 1748526089.625516,
        "finish": 1748526089.656787,
        "duration": 0.03127098083496094,
        "processing": 0.008746147155761719,
        "date_start": "2025-05-29T16:41:29+03:00",
        "date_finish": "2025-05-29T16:41:29+03:00",
        "operating_reset_at": 1748526689,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат выполнения.

Возвращает `true`, если настройки успешно сохранены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_ERROR",
    "error_description": "You don't have access to use this method"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_ERROR` | You don't have access to use this method | У вас нет доступа к этому методу ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-timecontrol-report-add.md)
- [{#T}](./timeman-timecontrol-reports-get.md)
- [{#T}](./timeman-timecontrol-reports-users-get.md)