# Назначить права доступа на папку disk.folder.sharetouser

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Делиться» для нужной папки

Метод `disk.folder.sharetouser` назначает права доступа на папку.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор папки.

Идентификатор можно получить с помощью метода [disk.storage.getchildren](../storage/disk-storage-get-children.md), если папка находится в корне хранилища, и с помощью метода [disk.folder.getchildren](./disk-folder-get-children.md), если папка находится в другой папке ||
|| **userId***
[`integer`](../../data-types.md) | Идентификатор пользователя, которому выдается доступ.

Идентификатор можно получить с помощью метода [user.get](../../user/user-get.md) ||
|| **taskName***
[`string`](../../data-types.md) | Уровень прав, который выдается пользователю. Возможные значения:

- `disk_access_read` — чтение
- `disk_access_add` — добавление
- `disk_access_edit` — редактирование
- `disk_access_full` — полный доступ ||
|#

{% note info "" %}

Текущий пользователь не может выдать права выше своего уровня. Например, если у текущего пользователля только право «Чтение» для нужной папки, он не сможет выдать другому пользователю права «Редактирование» или «Полный доступ»

{% endnote %} 

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8994,"userId":1271,"taskName":"disk_access_read"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/disk.folder.sharetouser
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8994,"userId":1271,"taskName":"disk_access_read","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.folder.sharetouser
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.folder.sharetouser',
            {
                id: 8994,
                userId: 1271,
                taskName: 'disk_access_read',
            }
        );
        
        const result = response.getData().result;
        console.log('Folder shared to user with ID:', result);
        
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
                'disk.folder.sharetouser',
                [
                    'id' => 8994,
                    'userId' => 1271,
                    'taskName' => 'disk_access_read'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sharing folder to user: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.folder.sharetouser",
        {
            id: 8994,              
            userId: 1271,           
            taskName: 'disk_access_read'
        },
        function (result) 
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'disk.folder.sharetouser',
        [
            'id' => 8994,
            'userId' => 1271,
            'taskName' => 'disk_access_read'
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
        "start": 1768921227,
        "finish": 1768921228.02202,
        "duration": 1.0220201015472412,
        "processing": 1,
        "date_start": "2026-01-20T17:00:27+03:00",
        "date_finish": "2026-01-20T17:00:28+03:00",
        "operating_reset_at": 1768921827,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если права назначены успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_ARGUMENT",
    "error_description":"Invalid value of parameter {Parameter #1}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Invalid value of parameter {Parameter #1} | Не указан обязательный параметр ||
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Папка с указанным `id` не найдена ||
|| `ACCESS_DENIED` | Access denied | Попытка задать уровень прав выше, чем у текущего пользователя ||
|| `ACCESS_DENIED` | Access denied | Неверно передано значение параметра `taskName` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-folder-add-subfolder.md)
- [{#T}](./disk-folder-copy-to.md)
- [{#T}](./disk-folder-delete-tree.md)
- [{#T}](./disk-folder-get-children.md)
- [{#T}](./disk-folder-get-external-link.md)
- [{#T}](./disk-folder-get-fields.md)
- [{#T}](./disk-folder-get.md)
- [{#T}](./disk-folder-move-to.md)
- [{#T}](./disk-folder-rename.md)
- [{#T}](./disk-folder-restore.md)
- [{#T}](./disk-folder-upload-file.md)