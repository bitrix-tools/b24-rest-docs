# Получить описание полей хранилища disk.storage.getfields

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.storage.getfields` возвращает описание полей хранилища.

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
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.storage.getfields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.storage.getfields
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.storage.getfields',
            {}
        );
        
        const result = response.getData().result;
        console.log('Retrieved fields:', result);
        
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
                'disk.storage.getfields',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.storage.getfields",
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
        'disk.storage.getfields',
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
        "ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "NAME": {
            "TYPE": "string",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "CODE": {
            "TYPE": "string",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "MODULE_ID": {
            "TYPE": "string",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        },
        "ENTITY_TYPE": {
            "TYPE": "string",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "ENTITY_ID": {
            "TYPE": "string",
            "USE_IN_FILTER": true,
            "USE_IN_SHOW": true
        },
        "ROOT_OBJECT_ID": {
            "TYPE": "integer",
            "USE_IN_FILTER": false,
            "USE_IN_SHOW": true
        }
    },
    "time": {
        "start": 1769541038,
        "finish": 1769541038.113711,
        "duration": 0.11371111869812012,
        "processing": 0,
        "date_start": "2026-01-26T15:10:38+03:00",
        "date_finish": "2026-01-26T15:10:38+03:00",
        "operating_reset_at": 1769541638,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив с описанием полей хранилища.

Структура описания каждого поля:
- `TYPE` — тип данных поля
- `USE_IN_FILTER` — возможность использовать поле при фильтрации
- `USE_IN_SHOW` — доступность поля при получении ответа ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор хранилища ||
|| **NAME**
[`string`](../../data-types.md) | Имя хранилища ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код хранилища ||
|| **MODULE_ID**
[`string`](../../data-types.md) | Идентификатор модуля, которому принадлежит хранилище ||
|| **ENTITY_TYPE**
[`string`](../../data-types.md) | Тип объекта, с которым связано хранилище.

Возможные значения:
- `user` — хранилище пользователя
- `common` — хранилище общих документов
- `group` — хранилище группы  ||
|| **ENTITY_ID**
[`string`](../../data-types.md) | Идентификатор объекта ||
|| **ROOT_OBJECT_ID**
[`integer`](../../data-types.md) | Идентификатор корневой папки хранилища ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./disk-storage-add-folder.md)
- [{#T}](./disk-storage-get-children.md)
- [{#T}](./disk-storage-get-for-app.md)
- [{#T}](./disk-storage-get-list.md)
- [{#T}](./disk-storage-get-types.md)
- [{#T}](./disk-storage-get.md)
- [{#T}](./disk-storage-rename.md)
- [{#T}](./disk-storage-upload-file.md)