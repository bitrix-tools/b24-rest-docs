# Получить список пользователей подразделения timeman.timecontrol.reports.users.get

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.timecontrol.reports.users.get` получает список пользователей подразделения.

Данные в ответе метода зависят от роли:
- сотрудник получит только свои данные,
- руководитель — данные своего департамента,
- администратор — любого департамента.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **DEPARTMENT_ID**
[`integer`](../../data-types.md) | Идентификатор подразделения. Параметр нужно указывать только руководителю или администратору.

Получить идентификатор департамента можно методом [получения списка подразделений](../../departments/department-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DEPARTMENT_ID":15}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.timecontrol.reports.users.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DEPARTMENT_ID":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.timecontrol.reports.users.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'timeman.timecontrol.reports.users.get',
    		{
    			'DEPARTMENT_ID': 15
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
                'timeman.timecontrol.reports.users.get',
                [
                    'DEPARTMENT_ID' => 15
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
        echo 'Error getting time control reports: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.timecontrol.reports.users.get',
        {
            'DEPARTMENT_ID': 15
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
        'timeman.timecontrol.reports.users.get',
        [
            'DEPARTMENT_ID' => 15
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
    "result": [
        {
            "id": 3,
            "name": "Мария Ившина",
            "first_name": "Мария",
            "last_name": "Ившина",
            "work_position": "IT-специалист",
            "avatar": "http://test.bitrix24.com/upload/resize_cache/45749/7acf4ca766af5d8/main/c89/c89c6b73470635c/4R5A1256.png",
            "personal_gender": "F",
            "last_activity_date": "2025-05-29T16:41:00+03:00"
        }
    ],
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
[`array`](../../data-types.md) | Массив пользователей ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../data-types.md) | Полное имя пользователя ||
|| **first_name**
[`string`](../../data-types.md) | Имя ||
|| **last_name**
[`string`](../../data-types.md) | Фамилия ||
|| **work_position**
[`string`](../../data-types.md) | Должность ||
|| **avatar**
[`string`](../../data-types.md) | URL аватара пользователя.

Если значение пустое, у пользователя нет аватара ||
|| **personal_gender**
[`string`](../../data-types.md) | Пол ||
|| **last_activity_date**
[`string`](../../data-types.md) | Дата последнего действия пользователя в формате [ATOM](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-timecontrol-report-add.md)
- [{#T}](./timeman-timecontrol-reports-get.md) 