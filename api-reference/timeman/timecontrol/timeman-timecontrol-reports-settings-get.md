# Получить настройки отчетов timeman.timecontrol.reports.settings.get

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.timecontrol.reports.settings.get` получает настройки отчетов для построения интерфейса отчетов инструмента контроля времени.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.timecontrol.reports.settings.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.timecontrol.reports.settings.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'timeman.timecontrol.reports.settings.get',
    		{}
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
                'timeman.timecontrol.reports.settings.get',
                []
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
        echo 'Error getting time control reports settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.timecontrol.reports.settings.get',
        {},
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
        'timeman.timecontrol.reports.settings.get',
        []
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
        "active": true,
        "user_id": 547,
        "user_admin": false,
        "user_head": true,
        "departments": [
            {
                "id": "9",
                "name": "Отдел маркетинга и рекламы"
            }
        ],
        "minimum_idle_for_report": 15,
        "report_view_type": "head"
    },
    "time": {
        "start": 1749211142.210397,
        "finish": 1749211142.280698,
        "duration": 0.07030105590820312,
        "processing": 0.03640604019165039,
        "date_start": "2025-06-06T14:59:02+03:00",
        "date_finish": "2025-06-06T14:59:02+03:00",
        "operating_reset_at": 1749211742,
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
|| **active**
[`boolean`](../../data-types.md) | Активен ли модуль контроля времени ||
|| **user_id**
[`integer`](../../data-types.md) | Идентификатор текущего пользователя ||
|| **user_admin**
[`boolean`](../../data-types.md) | Является ли пользователь администратором ||
|| **user_head**
[`boolean`](../../data-types.md) | Является ли пользователь руководителем ||
|| **departments**
[`array`](../../data-types.md) | Список объектов с информацией о [подразделениях](#departments). Содержимое массива зависит от роли пользователя:
- Администратор — описание всех подразделений,
- Руководитель — описание своего подразделения,
- Обычный сотрудник — пустой массив ||
|| **minimum_idle_for_report**
[`integer`](../../data-types.md) | Минимальное время отсутствия в минутах, после которого требуется отчет ||
|| **report_view_type**
[`string`](../../data-types.md) | Тип просмотра отчетов. Возможные значения:
- `none` — нет доступа к отчетам
- `head` — руководитель
- `full` — полный доступ
- `simple` — упрощенный доступ ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект departments {#departments}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор подразделения ||
- || **name**
[`string`](../../data-types.md) | Название подразделения ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-timecontrol-report-add.md)
- [{#T}](./timeman-timecontrol-reports-get.md)
- [{#T}](./timeman-timecontrol-reports-users-get.md)