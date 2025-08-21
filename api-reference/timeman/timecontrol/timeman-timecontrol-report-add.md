# Добавить отчет об отсутствии timeman.timecontrol.report.add

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.timecontrol.report.add` отправляет отчет об отсутствии и добавляет его в календарь.

По умолчанию пользователь может отправить отчет только для себя. Администратор портала может отправить отчет любому — для этого в параметре `USER_ID` нужно указать идентификатор пользователя.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **REPORT_ID*** \| **ID***
[`integer`](../../data-types.md) | Идентификатор записи об отсутствии.

Получить идентификаторы записей можно методом [timeman.timecontrol.reports.get](./timeman-timecontrol-reports-get.md#reports) ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя. Может указать только администратор.

Получить идентификатор пользователя можно методом [user.get](../../user/user-get.md) ||
|| **TEXT***
[`string`](../../data-types.md) | Текст отчета ||
|| **TYPE**
[`string`](../../data-types.md) | Тип отчета:
- `WORK` — рабочий
- `PRIVATE` — личный

Значение по умолчанию — `PRIVATE` ||
|| **CALENDAR**
[`string`](../../data-types.md) | Добавлять событие в календарь:
- `Y` — да
- `N` — нет

Значение по умолчанию — `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"REPORT_ID":123,"TEXT":"Работал над проектом","TYPE":"WORK","CALENDAR":"Y"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/timeman.timecontrol.report.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"REPORT_ID":123,"TEXT":"Работал над проектом","TYPE":"WORK","CALENDAR":"Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/timeman.timecontrol.report.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'timeman.timecontrol.report.add',
    		{
    			'REPORT_ID': 123,
    			'TEXT': 'Работал над проектом',
    			'TYPE': 'WORK',
    			'CALENDAR': 'Y'
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
                'timeman.timecontrol.report.add',
                [
                    'REPORT_ID' => 123,
                    'TEXT'      => 'Работал над проектом',
                    'TYPE'      => 'WORK',
                    'CALENDAR'  => 'Y',
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
        echo 'Error adding time control report: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'timeman.timecontrol.report.add',
        {
            'REPORT_ID': 123,
            'TEXT': 'Работал над проектом',
            'TYPE': 'WORK',
            'CALENDAR': 'Y'
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
        'timeman.timecontrol.report.add',
        [
            'REPORT_ID' => 123,
            'TEXT' => 'Работал над проектом',
            'TYPE' => 'WORK',
            'CALENDAR' => 'Y'
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
        "start": 1743056587.6559751,
        "finish": 1743056587.8529301,
        "duration": 0.19695496559143066,
        "processing": 0.16714906692504883,
        "date_start": "2025-03-27T09:23:07+03:00",
        "date_finish": "2025-03-27T09:23:07+03:00",
        "operating_reset_at": 1743057187,
        "operating": 0.1671299934387207
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат выполнения. Возвращает `true`, если отчет добавлен успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "TEXT_EMPTY",
    "error_description": "Text can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_ERROR` | You don't have access for this report | У вас нет доступа к этому отчету ||
|| `TEXT_EMPTY` | Text can't be empty | Текст отчета не может быть пустым ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./timeman-timecontrol-reports-get.md)
- [{#T}](./timeman-timecontrol-reports-users-get.md) 