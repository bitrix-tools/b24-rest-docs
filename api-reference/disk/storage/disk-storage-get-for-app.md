# Получить описание хранилища приложения disk.storage.getforapp

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `disk.storage.getforapp` возвращает описание хранилища, привязанного к приложению. Если хранилища нет — создает его.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.storage.getforapp
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.storage.getforapp',
            {}
        );
        
        const result = response.getData().result;
        console.log('Storage data:', result);
        
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
                'disk.storage.getforapp',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching storage: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.storage.getforapp",
        {},
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
        'disk.storage.getforapp',
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
        "ID": "1366",
        "NAME": "bitrix.restapi",
        "CODE": null,
        "MODULE_ID": "disk",
        "ENTITY_TYPE": "restapp",
        "ENTITY_ID": "3",
        "ROOT_OBJECT_ID": "8910"
    },
    "time": {
        "start": 1770028927,
        "finish": 1770028927.990697,
        "duration": 0.990696907043457,
        "processing": 0,
        "date_start": "2026-02-02T10:42:07+03:00",
        "date_finish": "2026-02-02T10:42:07+03:00",
        "operating_reset_at": 1770029527,
        "operating": 0
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
    "error":"ACCESS_DENIED",
    "error_description":"Access denied! Application context required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %} 

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | Access denied! Application context required | Метод вызван вне контекста приложения ||
|| `ERROR_NOT_FOUND` | Could not find application by app_id | Приложение не найдено по идентификатору ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-storage-add-folder.md)
- [{#T}](./disk-storage-get-children.md)
- [{#T}](./disk-storage-get-fields.md)
- [{#T}](./disk-storage-get-list.md)
- [{#T}](./disk-storage-get-types.md)
- [{#T}](./disk-storage-get.md)
- [{#T}](./disk-storage-rename.md)
- [{#T}](./disk-storage-upload-file.md)