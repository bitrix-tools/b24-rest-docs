# Получить список комментариев task.commentitem.getlist

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа на чтение задачи или выше

Метод `task.commentitem.getlist` получает список комментариев задачи.

{% note warning "Развитие метода остановлено с версии модуля `tasks 25.700.0` " %}

Метод `task.commentitem.getlist` не работает в [новой карточке задач](../tasks-new.md), используйте метод [im.dialog.messages.get](../../chats/messages/im-dialog-messages-get.md) для работы с чатом задач.

{% endnote %}

## Параметры метода

{% note warning "" %}

Передавайте параметры в запросе в соответствии с порядком в таблице. Если нарушить порядок, запрос вернет ошибку.

{% endnote %}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ORDER**
[`object`](../../data-types.md) | Объект для сортировки результата вида `{"поле": "значение сортировки", ... }`.

Сортировать можно по полям:
- `ID` — идентификатор комментария 
- `AUTHOR_ID` — идентификатор автора комментария 
- `AUTHOR_NAME` — имя автора
- `AUTHOR_EMAIL` — почтовый адрес автора
- `POST_DATE` — дата публикации комментария 

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию результат сортируется по убыванию идентификатора комментария ||
|| **FILTER**
[`object`](../../data-types.md) | Объект для фильтрации результата вида `{"поле": "значение фильтра", ... }`. Значением фильтруемого поля может быть одиночное значение или массив значений.

Фильтровать можно по полям: 
- `ID` — идентификатор комментария
- `AUTHOR_ID` — идентификатор автора комментария
- `AUTHOR_NAME` — имя автора
- `POST_DATE` — дата публикации комментария

Перед названием фильтруемого поля можно указать префикс с типом фильтрации:
- `!` — не равно
- `<=`— меньше либо равно
- `<` — меньше
- `>=`— больше либо равно
- `>` — больше
 
По умолчанию записи не фильтруются ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ORDER":{"POST_DATE":"asc"},"FILTER":{"AUTHOR_ID":503,">=POST_DATE":"2025-01-01"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.commentitem.getlist
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ORDER":{"POST_DATE":"asc"},"FILTER":{"AUTHOR_ID":503,">=POST_DATE":"2025-01-01"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.commentitem.getlist
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'task.commentitem.getlist',
        {
          "TASKID": 8017,
          "ORDER": {
            "POST_DATE": "asc",
          },
          "FILTER": {
            "AUTHOR_ID": 503,
            ">=POST_DATE": "2025-01-01",
          }
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('task.commentitem.getlist', {
        "TASKID": 8017,
        "ORDER": {
          "POST_DATE": "asc",
        },
        "FILTER": {
          "AUTHOR_ID": 503,
          ">=POST_DATE": "2025-01-01",
        }
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('task.commentitem.getlist', {
        "TASKID": 8017,
        "ORDER": {
          "POST_DATE": "asc",
        },
        "FILTER": {
          "AUTHOR_ID": 503,
          ">=POST_DATE": "2025-01-01",
        }
      }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.commentitem.getlist',
                [
                    'TASKID' => 8017,
                    'ORDER' => [
                        'POST_DATE' => 'asc',
                    ],
                    'FILTER' => [
                        'AUTHOR_ID' => 503,
                        '>=POST_DATE' => '2025-01-01',
                    ],
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
        echo 'Error getting task comments: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.commentitem.getlist',
        {
            "TASKID": 8017,
            "ORDER": {
                "POST_DATE": "asc",
            },
            "FILTER": {
                "AUTHOR_ID": 503,
                ">=POST_DATE": "2025-01-01",
            }
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.commentitem.getlist',
        [
            'TASKID' => 8017,
            'ORDER' => [
                'POST_DATE' => 'asc',
            ],
            'FILTER' => [
                'AUTHOR_ID' => 503,
                '>=POST_DATE' => '2025-01-01',
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
            "POST_MESSAGE_HTML": null,
            "ID": "3157",
            "AUTHOR_ID": "503",
            "AUTHOR_NAME": "Иван Иванов",
            "AUTHOR_EMAIL": "",
            "POST_DATE": "2025-07-15T14:31:00+03:00",
            "POST_MESSAGE": "Фотографии во вложении",
            "ATTACHED_OBJECTS": {
                "973": {
                    "ATTACHMENT_ID": "973",
                    "NAME": "photo1.png",
                    "SIZE": "1495700",
                    "FILE_ID": "4755",
                    "DOWNLOAD_URL": "/bitrix/tools/disk/uf.php?attachedId=973&auth%5Bauth%5D=3edf7ca92&action=download&ncc=1",
                    "VIEW_URL": "/bitrix/tools/disk/uf.php?attachedId=973&auth%5Bauth%5D=3edf7ca92&action=show&ncc=1"
                },
                "975": {
                    "ATTACHMENT_ID": "975",
                    "NAME": "photo2.png",
                    "SIZE": "1017053",
                    "FILE_ID": "4753",
                    "DOWNLOAD_URL": "/bitrix/tools/disk/uf.php?attachedId=975&auth%5Bauth%5D=3edf7ca92&action=download&ncc=1",
                    "VIEW_URL": "/bitrix/tools/disk/uf.php?attachedId=975&auth%5Bauth%5D=3edf7ca92&action=show&ncc=1"
                }
            }
        },
        {
            "POST_MESSAGE_HTML": null,
            "ID": "3155",
            "AUTHOR_ID": "503",
            "AUTHOR_NAME": "Иван Иванов",
            "AUTHOR_EMAIL": "",
            "POST_DATE": "2025-07-15T14:30:00+03:00",
            "POST_MESSAGE": "Подготовил новые фотографии",
            "ATTACHED_OBJECTS": {}
        }
    ],
    "time": {
        "start": 1753270901.224447,
        "finish": 1753270901.343166,
        "duration": 0.11871910095214844,
        "processing": 0.06380701065063477,
        "date_start": "2025-07-23T14:41:41+03:00",
        "date_finish": "2025-07-23T14:41:41+03:00",
        "operating_reset_at": 1753271501,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов. Каждый объект содержит описание комментария ||
|| **POST_MESSAGE_HTML**
[`string`](../../data-types.md) | HTML-код комментария ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор комментария ||
|| **AUTHOR_ID**
[`string`](../../data-types.md) | Идентификатор автора комментария ||
|| **AUTHOR_NAME**
[`string`](../../data-types.md) | Имя автора комментария ||
|| **AUTHOR_EMAIL**
[`string`](../../data-types.md) | Email автора комментария ||
|| **POST_DATE**
[`string`](../../data-types.md) | Дата и время создания комментария ||
|| **POST_MESSAGE**
[`string`](../../data-types.md) | Текст комментария ||
|| **ATTACHED_OBJECTS**
[`object`](../../data-types.md) | Объект, содержащий информацию о вложениях. Ключ объекта — идентификатор вложения, а значение — объект с [описанием файла](#attached-objects) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект ATTACHED_OBJECTS {#attached-objects}

#|
|| **Название**
`тип` | **Описание** ||
|| **ATTACHMENT_ID**
[`string`](../../data-types.md) | Идентификатор вложения ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла ||
|| **SIZE**
[`string`](../../data-types.md) | Размер файла в байтах ||
|| **FILE_ID**
[`string`](../../data-types.md) | Идентификатор файла на Диске ||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | URL для скачивания файла ||
|| **VIEW_URL**
[`string`](../../data-types.md) | URL для просмотра файла ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#256; Param #1 (arOrder) for method ctaskcommentitem::getlist() must not contain key ">=POST_DATE".; 256/TE/WRONG_ARGUMENTS.<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание**  | **Значение** ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Action failed; 8/TE/ACTION_FAILED_TO_BE_PROCESSED | Указано неверное значение параметра или нет прав доступа к задаче ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskcommentitem::getlist() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS | Указан неверный тип значения для параметра, например, для `TASKID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (arOrder) for method ctaskcommentitem::getlist() must not contain key ">=POST_DATE".; 256/TE/WRONG_ARGUMENTS | Параметры указаны в неверном порядке ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #2 (arFilter) for method ctaskcommentitem::getlist() must not contain key "%POST_DATE".; 256/TE/WRONG_ARGUMENTS | Неверно указано название параметра или префикс для фильтра ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./task-comment-item-add.md)
- [{#T}](./task-comment-item-update.md)
- [{#T}](./task-comment-item-get.md)
- [{#T}](./task-comment-item-delete.md)