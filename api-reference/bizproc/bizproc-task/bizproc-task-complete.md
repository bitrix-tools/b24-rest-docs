# Выполнить задание бизнес-процесса bizproc.task.complete

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод выполняет задание бизнес-процесса:
- Утверждение документа
- Ознакомление с документом
- Запрос дополнительной информации
- Запрос дополнительной информации с отклонением
  
Выполнить можно только свое задание.

{% note tip "Пользовательская документация" %}

- [Действия: Задания](https://helpdesk.bitrix24.ru/open/7451037/)

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASK_ID***
[`integer`](../../data-types.md) | Идентификатор задания.

Получить идентификатор можно методом [bizproc.task.list](./bizproc-task-list.md) ||
|| **STATUS***
[`integer` \| `string` ](../../data-types.md) | Целевой статус задания. Возможные значения: 

- `1` или `yes` — да, утвержден
- `2` или `no` — нет, отклонен
- `3` или `ok` — ок, ознакомлен
- `4` или `cancel` — отмена

Набор допустимых значений меняется в зависимости от типа задания:
- Утверждение документа — `1` или `2`
- Ознакомление с документом — `3`
- Запрос дополнительной информации — `3`
- Запрос дополнительной информации с отклонением — `3` или `4`
||
|| **COMMENT**
[`string`](../../data-types.md) | Комментарий пользователя.

Обязательность параметра зависит от настроек задания ||
|| **FIELDS**
[`object`](../../data-types.md) | Объект с описанием полей для выполнения заданий с запросом дополнительной информации в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — символьный идентификатор поля задания
- `value_N` — значение поля

Получить описания полей в задании можно методом [bizproc.task.list](./bizproc-task-list.md) в объекте `"PARAMETERS": "Fields"` ответа. Структура описания объекта поля:

```json
"PARAMETERS": {
    ...
    "Fields": [
        {
            "Id": "field_id",
            "Type": "type",
            "Name": "name",
            "Description": "description",
            "Multiple": false,
            "Required": true,
            "Options": null,
            "Settings": null,
            "Default": "default_value"
        }
```

`Id` — символьный идентификатор поля задания.

В `Default` хранятся значения по умолчанию, которые можно передать для выполнения задания. Эти значения сконвертированы во внешнее представление:
- для дат — в формат rest ATOM ISO-8601
- для файлов — в ссылку на файл 

В таком формате значения передаются в метод `bizproc.task.complete`. Затем они конвертируются во внутреннее представление:
- даты из rest формата конвертируются во внутренний
- файлы сохраняются и прикрепляются к бизнес-процессу

Чтобы передать значение в поле типа Файл укажите:
- для типа Файл — base64 или массив с названием и base64
- для типа Файл (Диск) — идентификатор файла с Диска

Подробнее о работе с файлами в статье [{#T}](../../files/how-to-upload-files.md)

||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_ID":1501,"STATUS":1,"COMMENT":"Добавлено","Fields":{"contractor":"C_607","phone_number":"89991234567"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.task.complete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASK_ID":1501,"STATUS":1,"COMMENT":"Добавлено","Fields":{"contractor":"C_607","phone_number":"89991234567"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.task.complete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'bizproc.task.complete',
    		{
    			'TASK_ID': 1501,
    			'STATUS': 1,
    			'COMMENT': 'Добавлено',
    			"Fields": {
    				'contractor': 'C_607',
    				'phone_number': '89991234567'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	alert("Error: " + error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'bizproc.task.complete',
                [
                    'TASK_ID' => 1501,
                    'STATUS' => 1,
                    'COMMENT' => 'Добавлено',
                    'Fields' => [
                        'contractor' => 'C_607',
                        'phone_number' => '89991234567'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error completing task: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.task.complete',
        {
            'TASK_ID': 1501,
            'STATUS': 1,
            'COMMENT': 'Добавлено',
            "Fields": {
                'contractor': 'C_607',
                'phone_number': '89991234567'
            }
        },
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.task.complete',
        [
            'TASK_ID' => 1501,
            'STATUS' => 1,
            'COMMENT' => 'Добавлено',
            'Fields' => [
                'contractor' => 'C_607',
                'phone_number' => '89991234567'
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
        "start": 1738746693.9218969,
        "finish": 1738746694.1367991,
        "duration": 0.21490216255187988,
        "processing": 0.19237995147705078,
        "date_start": "2025-02-05T12:11:33+03:00",
        "date_finish": "2025-02-05T12:11:34+03:00",
        "operating_reset_at": 1738747293,
        "operating": 0.19236207008361816
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если задание выполнено успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_TASK_VALIDATION",
    "error_description": "incorrect STATUS"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок
 
#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ERROR_TASK_VALIDATION` | empty TASK_ID | Не укзан `ID` задания ||
|| `ERROR_TASK_VALIDATION` | incorrect STATUS | Указан некорректный статус задания ||
|| `ERROR_TASK_NOT_FOUND` | Task not found | Не найдено задание с заданным `ID` ||
|| `ERROR_TASK_COMPLETED` | Task already completed | Задание уже выполнено ранее ||
|| `ERROR_TASK_TYPE` | Incorrect task type | Некорректный тип задания. Такое задание нельзя выполнить через рест ||
|| `ERROR_TASK_EXECUTION` | текст ошибки из задания | В процессе выполнения задания случилась указанная ошибка ||
|#
 
 {% include [системные ошибки](../../../_includes/system-errors.md) %}

 ## Продолжите изучение 
 
 - [{#T}](./index.md)
 - [{#T}](./bizproc-task-list.md)
 - [{#T}](./bizproc-task-delegate.md)
