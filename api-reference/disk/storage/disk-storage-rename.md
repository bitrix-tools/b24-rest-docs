# Переименовать хранилище приложения disk.storage.rename

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `disk.storage.rename` переименовывает хранилище приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор хранилища приложения.

Идентификатор можно получить с помощью метода [disk.storage.getforapp](./disk-storage-get-for-app.md) || 
|| **newName***
[`string`](../../data-types.md) | Новое имя хранилища ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1366,"newName":"Bitrix REST API","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.storage.rename
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.storage.rename',
            {
                id: 1366,
                newName: 'Bitrix REST API'
            }
        );
        
        const result = response.getData().result;
        console.log('Renamed storage:', result);
        
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
                'disk.storage.rename',
                [
                    'id' => 1366,
                    'newName' => 'Bitrix REST API'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error renaming storage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.storage.rename",
        {
            id: 1366,
            newName: 'Bitrix REST API'
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
        'disk.storage.rename',
        [
            'id' => 1366,
            'newName' => 'Bitrix REST API'
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
        "ID": "1366",
        "NAME": "Bitrix REST API",
        "CODE": null,
        "MODULE_ID": "disk",
        "ENTITY_TYPE": "restapp",
        "ENTITY_ID": "3",
        "ROOT_OBJECT_ID": "8910"
    },
    "time": {
        "start": 1770048169,
        "finish": 1770048169.935598,
        "duration": 0.9355978965759277,
        "processing": 0,
        "date_start": "2026-02-02T14:02:49+03:00",
        "date_finish": "2026-02-02T14:02:49+03:00",
        "operating_reset_at": 1770048769,
        "operating": 0.11735081672668457
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив с описанием полей хранилища ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор хранилища ||
|| **NAME**
[`string`](../../data-types.md) | Имя хранилища ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код хранилища ||
|| **MODULE_ID**
[`string`](../../data-types.md) | Идентификатор модуля, которому принадлежит хранилище ||
|| **ENTITY_TYPE**
[`string`](../../data-types.md) | Тип объекта, с которым связано хранилище ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор объекта, с которым связано хранилище ||
|| **ROOT_OBJECT_ID**
[`integer`](../../data-types.md) | Идентификатор корневой папки хранилища ||
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
|| `ERROR_NOT_FOUND` | Could not find entity with id `X` | Хранилище с указанным `id` не найдено ||
|| — | Access denied (invalid type of storage) | Хранилище не связано с приложением ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для переименования хранилища ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-storage-add-folder.md)
- [{#T}](./disk-storage-get-children.md)
- [{#T}](./disk-storage-get-fields.md)
- [{#T}](./disk-storage-get-for-app.md)
- [{#T}](./disk-storage-get-list.md)
- [{#T}](./disk-storage-get-types.md)
- [{#T}](./disk-storage-get.md)
- [{#T}](./disk-storage-upload-file.md)