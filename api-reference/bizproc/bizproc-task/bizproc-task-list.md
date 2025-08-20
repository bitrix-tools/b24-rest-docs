# Получить список заданий бизнес-процесса bizproc.task.list

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список заданий бизнес-процессов.

Администратор портала может запросить все задания или задания любого пользователя. Обычный пользователь — свои задания или подчиненного.

Для запроса своих заданий можно не указывать фильтр по `USER_ID`.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SELECT**
[`array`](../../data-types.md) | Массив содержит список [полей](#fields), которые необходимо выбрать.

Можно указать только те поля, которые необходимы.

По умолчанию возвращает поля `ENTITY`, `DOCUMENT_ID`, `ID`, `WORKFLOW_ID`, `DOCUMENT_NAME`, `NAME`, `DOCUMENT_URL` ||
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации списка заданий в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#fields) задания для фильтра
- `value_N` — значение поля

Если в фильтре присутствует `USER_ID`, то проверяется субординация пользователей:
- руководитель может запросить список заданий своих подчиненных
- администратор может запрашивать задания любых пользователей без ограничений 

Если метод вызывает не администратор и фильтр по `USER_ID` не указан, то по умолчанию выбираются задания текущего пользователя
||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки списка заданий в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где
- `field_N` — [поле](#fields) задания для сортировки
- `value_N` — направление сортировки

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию
  
Можно указать несколько полей для сортировки, например, `{NAME: 'ASC', ID: 'DESC'}` ||
|| **START**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["ID","WORKFLOW_ID","DOCUMENT_NAME","DESCRIPTION","NAME","MODIFIED","WORKFLOW_STARTED","WORKFLOW_STARTED_BY","OVERDUE_DATE","WORKFLOW_TEMPLATE_ID","WORKFLOW_TEMPLATE_NAME","WORKFLOW_STATE","STATUS","USER_ID","USER_STATUS","MODULE_ID","ENTITY","DOCUMENT_ID","ACTIVITY","ACTIVITY_NAME","DOCUMENT_URL","PARAMETERS"],"order":{"ID":"DESC"},"filter":{"USER_ID":1,"STATUS":0,"ACTIVITY":"RequestInformationOptionalActivity"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.task.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["ID","WORKFLOW_ID","DOCUMENT_NAME","DESCRIPTION","NAME","MODIFIED","WORKFLOW_STARTED","WORKFLOW_STARTED_BY","OVERDUE_DATE","WORKFLOW_TEMPLATE_ID","WORKFLOW_TEMPLATE_NAME","WORKFLOW_STATE","STATUS","USER_ID","USER_STATUS","MODULE_ID","ENTITY","DOCUMENT_ID","ACTIVITY","ACTIVITY_NAME","DOCUMENT_URL","PARAMETERS"],"order":{"ID":"DESC"},"filter":{"USER_ID":1,"STATUS":0,"ACTIVITY":"RequestInformationOptionalActivity"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.task.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const parameters = {
        select: [
            'ID',
            'WORKFLOW_ID',
            'DOCUMENT_NAME',
            'DESCRIPTION',
            'NAME',
            'MODIFIED',
            'WORKFLOW_STARTED',
            'WORKFLOW_STARTED_BY',
            'OVERDUE_DATE',
            'WORKFLOW_TEMPLATE_ID',
            'WORKFLOW_TEMPLATE_NAME',
            'WORKFLOW_STATE',
            'STATUS',
            'USER_ID',
            'USER_STATUS',
            'MODULE_ID',
            'ENTITY',
            'DOCUMENT_ID',
            'ACTIVITY',
            'ACTIVITY_NAME',
            'DOCUMENT_URL',
            'PARAMETERS'
        ],
        order: {
            ID: 'DESC'
        },
        filter: {
            'USER_ID': 1,
            'STATUS': 0,
            'ACTIVITY': 'RequestInformationOptionalActivity'
        }
    };
    
    try {
        const response = await $b24.callListMethod('bizproc.task.list', parameters);
        const items = response.getData() || [];
        for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    const parameters = {
        select: [
            'ID',
            'WORKFLOW_ID',
            'DOCUMENT_NAME',
            'DESCRIPTION',
            'NAME',
            'MODIFIED',
            'WORKFLOW_STARTED',
            'WORKFLOW_STARTED_BY',
            'OVERDUE_DATE',
            'WORKFLOW_TEMPLATE_ID',
            'WORKFLOW_TEMPLATE_NAME',
            'WORKFLOW_STATE',
            'STATUS',
            'USER_ID',
            'USER_STATUS',
            'MODULE_ID',
            'ENTITY',
            'DOCUMENT_ID',
            'ACTIVITY',
            'ACTIVITY_NAME',
            'DOCUMENT_URL',
            'PARAMETERS'
        ],
        order: {
            ID: 'DESC'
        },
        filter: {
            'USER_ID': 1,
            'STATUS': 0,
            'ACTIVITY': 'RequestInformationOptionalActivity'
        }
    };
    
    try {
        const generator = $b24.fetchListMethod('bizproc.task.list', parameters, 'ID');
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity); }
        }
    } catch (error) {
        console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    const parameters = {
        select: [
            'ID',
            'WORKFLOW_ID',
            'DOCUMENT_NAME',
            'DESCRIPTION',
            'NAME',
            'MODIFIED',
            'WORKFLOW_STARTED',
            'WORKFLOW_STARTED_BY',
            'OVERDUE_DATE',
            'WORKFLOW_TEMPLATE_ID',
            'WORKFLOW_TEMPLATE_NAME',
            'WORKFLOW_STATE',
            'STATUS',
            'USER_ID',
            'USER_STATUS',
            'MODULE_ID',
            'ENTITY',
            'DOCUMENT_ID',
            'ACTIVITY',
            'ACTIVITY_NAME',
            'DOCUMENT_URL',
            'PARAMETERS'
        ],
        order: {
            ID: 'DESC'
        },
        filter: {
            'USER_ID': 1,
            'STATUS': 0,
            'ACTIVITY': 'RequestInformationOptionalActivity'
        }
    };
    
    try {
        const response = await $b24.callMethod('bizproc.task.list', parameters, 0);
        const result = response.getData().result || [];
        for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
        console.error('Request failed', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'bizproc.task.list',
                [
                    'select' => [
                        'ID',
                        'WORKFLOW_ID',
                        'DOCUMENT_NAME',
                        'DESCRIPTION',
                        'NAME',
                        'MODIFIED',
                        'WORKFLOW_STARTED',
                        'WORKFLOW_STARTED_BY',
                        'OVERDUE_DATE',
                        'WORKFLOW_TEMPLATE_ID',
                        'WORKFLOW_TEMPLATE_NAME',
                        'WORKFLOW_STATE',
                        'STATUS',
                        'USER_ID',
                        'USER_STATUS',
                        'MODULE_ID',
                        'ENTITY',
                        'DOCUMENT_ID',
                        'ACTIVITY',
                        'ACTIVITY_NAME',
                        'DOCUMENT_URL',
                        'PARAMETERS'
                    ],
                    'order' => [
                        'ID' => 'DESC'
                    ],
                    'filter' => [
                        'USER_ID'  => 1,
                        'STATUS'   => 0,
                        'ACTIVITY' => 'RequestInformationOptionalActivity'
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
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.task.list',
        {
            select: [
                'ID',
                'WORKFLOW_ID',
                'DOCUMENT_NAME',
                'DESCRIPTION',
                'NAME',
                'MODIFIED',
                'WORKFLOW_STARTED',
                'WORKFLOW_STARTED_BY',
                'OVERDUE_DATE',
                'WORKFLOW_TEMPLATE_ID',
                'WORKFLOW_TEMPLATE_NAME',
                'WORKFLOW_STATE',
                'STATUS',
                'USER_ID',
                'USER_STATUS',
                'MODULE_ID',
                'ENTITY',
                'DOCUMENT_ID',
                'ACTIVITY',
                'ACTIVITY_NAME',
                'DOCUMENT_URL',
                'PARAMETERS'
            ],
            order: {
                ID: 'DESC'
            },
            filter: {
                'USER_ID': 1,
                'STATUS': 0,
                'ACTIVITY': 'RequestInformationOptionalActivity'
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
        'bizproc.task.list',
        [
            'select' => [
                'ID',
                'WORKFLOW_ID',
                'DOCUMENT_NAME',
                'DESCRIPTION',
                'NAME',
                'MODIFIED',
                'WORKFLOW_STARTED',
                'WORKFLOW_STARTED_BY',
                'OVERDUE_DATE',
                'WORKFLOW_TEMPLATE_ID',
                'WORKFLOW_TEMPLATE_NAME',
                'WORKFLOW_STATE',
                'STATUS',
                'USER_ID',
                'USER_STATUS',
                'MODULE_ID',
                'ENTITY',
                'DOCUMENT_ID',
                'ACTIVITY',
                'ACTIVITY_NAME',
                'DOCUMENT_URL',
                'PARAMETERS'
            ],
            'order' => [
                'ID' => 'DESC'
            ],
            'filter' => [
                'USER_ID' => 1,
                'STATUS' => 0,
                'ACTIVITY' => 'RequestInformationOptionalActivity'
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
    "result": [
        {
            "ENTITY": "BizprocDocument",
            "DOCUMENT_ID": "2249",
            "ID": "1477",
            "WORKFLOW_ID": "67a2ffdb2c57a3.35276854",
            "DOCUMENT_NAME": "Партнерская конференция",
            "DESCRIPTION": "",
            "NAME": "Добавить информацию о подрядчике",
            "MODIFIED": "2025-02-05T09:06:19+03:00",
            "WORKFLOW_STARTED": "2025-02-05T09:06:19+03:00",
            "WORKFLOW_STARTED_BY": "1",
            "OVERDUE_DATE": null,
            "WORKFLOW_TEMPLATE_ID": "565",
            "WORKFLOW_TEMPLATE_NAME": "Организация мероприятия",
            "WORKFLOW_STATE": "Ожидание дополнительной информации",
            "STATUS": "0",
            "USER_ID": "1",
            "USER_STATUS": "0",
            "MODULE_ID": "lists",
            "ACTIVITY": "RequestInformationActivity",
            "ACTIVITY_NAME": "A3651_68033_56029_16413",
            "PARAMETERS": {
                "CommentLabel": "Комментарий",
                "CommentRequired": "Y",
                "ShowComment": "Y",
                "StatusOkLabel": "Сохранить результат",
                "Fields": [
                    {
                        "Id": "contractor",
                        "Type": "E:ECrm",
                        "Name": "Подрядчик",
                        "Description": "Кто выполняет работы",
                        "Multiple": false,
                        "Required": true,
                        "Options": {
                            "LEAD": "N",
                            "CONTACT": "Y",
                            "COMPANY": "Y",
                            "DEAL": "N",
                            "SMART_INVOICE": "N",
                            "DYNAMIC_136": "N",
                            "DYNAMIC_1038": "N"
                        },
                        "Settings": null,
                        "Default": [
                            "C_607"
                        ]
                    },
                    {
                        "Id": "phone_number",
                        "Type": "string",
                        "Name": "Номер телефона",
                        "Description": "",
                        "Multiple": false,
                        "Required": true,
                        "Options": null,
                        "Settings": null,
                        "Default": ""
                    }
                ]
            },
            "DOCUMENT_URL": "/bizproc/processes/?livefeed=y&list_id=171&element_id=2249"
        },
        {
            "ENTITY": "BizprocDocument",
            "DOCUMENT_ID": "2237",
            "ID": "1471",
            ...
        }
    ],
    "total": 2,
    "time": {
        "start": 1738735796.4730229,
        "finish": 1738735796.510215,
        "duration": 0.037192106246948242,
        "processing": 0.0080459117889404297,
        "date_start": "2025-02-05T09:09:56+03:00",
        "date_finish": "2025-02-05T09:09:56+03:00",
        "operating_reset_at": 1738736396,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. 

Cодержит массив объектов с информацией о заданиях бизнес-процессов.

Каждый объект содержит [поля](#fields) задания, указанные в параметре `SELECT` ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля задания {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор задания ||
|| **WORKFLOW_ID**
[`integer`](../../data-types.md) | Идентификатор бизнес-процесса ||
|| **DOCUMENT_NAME**
[`string`](../../data-types.md) | Название документа ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание задания ||
|| **NAME**
[`string`](../../data-types.md) | Название задания ||
|| **MODIFIED**
[`datetime`](../../data-types.md) | Дата изменения ||
|| **WORKFLOW_STARTED**
[`datatime`](../../data-types.md) | Дата запуска бизнес-процесса ||
|| **WORKFLOW_STARTED_BY**
[`user`](../../data-types.md) | Кем запущен бизнес-процесс ||
|| **OVERDUE_DATE**
[`datetime`](../../data-types.md) | Крайний срок ||
|| **WORKFLOW_TEMPLATE_ID**
[`integer`](../../data-types.md) | Идентификатор шаблона бизнес-процесса ||
|| **WORKFLOW_TEMPLATE_NAME**
[`string`](../../data-types.md) | Название шаблона бизнес-процесса ||
|| **WORKFLOW_STATE**
[`string`](../../data-types.md) | Статус бизнес-процесса ||
|| **STATUS**
[`integer`](../../data-types.md) | Статус задания. Возможные значения:

- `0` — выполняется
- `1` — утверждено
- `2` — отклонено
- `3` — выполнено
- `4` — истек срок выполнения задания ||

|| **USER_ID**
[`user`](../../data-types.md) | Идентификатор пользователя ||
|| **USER_STATUS**
[`integer`](../../data-types.md) | Ответ пользователя. Возможные значения:

- `0` — ожидание ответа
- `1` — утвердил
- `2` — отклонил
- `3` — выполнил ||

|| **MODULE_ID**
[`string`](../../data-types.md) | Идентификатор модуля по документу ||
|| **ENTITY**
[`string`](../../data-types.md) | Символьный идентификатор объекта по документу ||
|| **DOCUMENT_ID**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **ACTIVITY**
[`string`](../../data-types.md) | Идентификатор типа задания. Возможные значения:

- `ApproveActivity` — утверждение документа
- `ReviewActivity` — ознакомление с документом
- `RequestInformationActivity` — запрос дополнительной информации
- `RequestInformationOptionalActivity` — запрос дополнительной информации (с отклонением)
||
|| **ACTIVITY_NAME**
[`string`](../../data-types.md) | Идентификатор действия в шаблоне ||
|| **PARAMETERS**
[`object`](../../data-types.md) | Объект с описанием [параметров задания](#parameters) ||
|| **DOCUMENT_URL**
[`object`](../../data-types.md) | Ссылка на документ ||
|#

#### Объект PARAMETERS {#parameters}

#|
|| **Название**
`тип` | **Описание** ||
|| **CommentLabel**
[`string`](../../data-types.md) | Название поля Комментарий ||
|| **CommentRequired**
[`string`](../../data-types.md) | Обязательность комментария. Допустимые значения:
- `N` — нет
- `Y` — да
- `YA` — да, при утверждении
- `YR` — да, при отклонении
||
|| **ShowComment**
[`boolean`](../../data-types.md) | Показывать комментарий. Допустимые значения:
- `N` — нет
- `Y` — да
||
|| **StatusOkLabel**
[`string`](../../data-types.md) | Текст кнопки Ознакомлен ||
|| **StatusYesLabel**
[`string`](../../data-types.md) | Текст кнопки Утвердить ||
|| **StatusNoLabel**
[`string`](../../data-types.md) | Текст кнопки Отклонить ||
|| **Fields**
[`array`](../../data-types.md) | Массив объектов. Каждый объект содержит описание [поля в задании](#task-fields) ||
|#

#### Объект Fields {#task-fields}

#|
|| **Название**
`тип` | **Описание**||
|| **Id**
[`string`](../../data-types.md) | Символьный идентификатор параметра задания ||
|| **Type**
[`string`](../../data-types.md) | Тип параметра. Базовые значения: 
  - `bool` — да или нет
  - `date` — дата
  - `datetime` — дата и время
  - `double` — число
  - `int` — целое число 
  - `select` — список
  - `string` — строка
  - `text` — текст
  - `user` — пользователь  

Остальные типы зависят от документа, с которым работает бизнес-процесс ||
|| **Name**
[`string` \| `object`](../../data-types.md) | Наименование параметра ||
|| **Description**
[`string` \| `object`](../../data-types.md) | Описание параметра ||
|| **Multiple**
[`boolean`](../../data-types.md) | Множественность параметра. Возможные значения:
- `true` — да
- `false` — нет ||
|| **Required**
[`boolean`](../../data-types.md) | Обязательность параметра. Возможные значения:
- `true` — да
- `false` — нет ||
|| **Options**
[`object`](../../data-types.md) | Настройки поля.

Значения зависят от типа параметра. Примеры:
- для типа Список `select` это варианты значений списка
```json
"Options": {
    "1": "Первый вариант",
    "2": "Второй вариант",
    "3": "Третий вариант",
},
```
- для типа Привязка к CRM `'E:ECrm'` это доступные типы объектов
```json
"Options": {
    "LEAD": "N",
    "CONTACT": "Y",
    "COMPANY": "Y",
    "DEAL": "N",
    "SMART_INVOICE": "N",
    "DYNAMIC_136": "N",
    "DYNAMIC_1038": "N"
},
```
||
|| **Settings**
[`object`](../../data-types.md) | Дополнительные настройки поля ||
|| **Default**
[`any`](../../data-types.md) | Значение параметра по умолчанию ||
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
|| `ACCESS_DENIED` | Access denied! | Метод запустил не администратор или вы не можете просматривать задания указанного сотрудника ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-task-complete.md)
- [{#T}](./bizproc-task-delegate.md)
- [{#T}](../../../tutorials/bizproc/how-to-kill-workflows.md)
- [{#T}](../../../tutorials/bizproc/how-to-filter-and-kill-workflows.md)