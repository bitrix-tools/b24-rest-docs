# Получить информацию о прикрепленном файле disk.attachedObject.get

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для нужного файла

Метод `disk.attachedObject.get` возвращает информацию о прикрепленном файле. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор записи о прикреплении файла, то есть связи, которая соединяет файл диска [с другими объектами](../index.md#diskconnection).

Чтобы получить идентификатор связи, используйте методы, которые возвращают прикрепленные файлы. Например, если файл прикреплен к задаче, то узнать идентификатор связи можно с помощью метода [tasks.task.get](../../tasks/tasks-task-get.md)
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":495}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/disk.attachedObject.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":495,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.attachedObject.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.attachedObject.get',
            {
                id: 495,
            }
        );
        
        const result = response.getData().result;
        console.log('Retrieved object:', result);
        
        processResult(result);
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
                'disk.attachedObject.get',
                [
                    'id' => 495
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving attached object: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'disk.attachedObject.get',
        {
            id: 495
        },
        function (result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'disk.attachedObject.get',
        [
            'id' => 495
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
        "ID": "495",
        "OBJECT_ID": "8903",
        "MODULE_ID": "tasks",
        "ENTITY_TYPE": "tasks_task",
        "ENTITY_ID": "3845",
        "CREATE_TIME": "2025-12-23T10:31:24+03:00",
        "CREATED_BY": "1269",
        "DOWNLOAD_URL": "https://test.bitrix24.ru/bitrix/tools/disk/uf.php?attachedId=495&auth[auth]=d78a4a690000071b006e2cf2000004f5000007746b9ad166e1b9bd67b8848714afc5a7&action=download&ncc=1",
        "NAME": "Picture.png",
        "SIZE": "52486"
    },
    "time": {
        "start": 1766489404,
        "finish": 1766489404.720053,
        "duration": 0.72005295753479,
        "processing": 0,
        "date_start": "2025-12-23T11:30:04+03:00",
        "date_finish": "2025-12-23T11:30:04+03:00",
        "operating_reset_at": 1766490004,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными прикрепленного файла ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор записи о прикреплении файла ||
|| **OBJECT_ID**
[`integer`](../../data-types.md) | Идентификатор файла ||
|| **MODULE_ID**
[`string`](../../data-types.md) | Модуль, в котором используется файл ||
|| **ENTITY_TYPE**
[`string`](../../data-types.md) | Тип привязанного объекта ||
|| **ENTITY_ID**
[`integer`](../../data-types.md) | Идентификатор элемента, к которому прикреплен файл ||
|| **CREATE_TIME**
[`string`](../../data-types.md) | Время создания привязки ||
|| **CREATED_BY**
[`integer`](../../data-types.md) | Идентификатор пользователя, который прикрепил файл||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | Ссылка для скачивания файла ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла ||
|| **SIZE**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_NOT_FOUND",
    "error_description":"Could not find entity with id `X`"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Прикрепленный файл с указанным `id` не найден ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав на чтение прикрепленного файла ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../../tutorials/tasks/how-to-create-comment-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-upload-file-to-task.md)