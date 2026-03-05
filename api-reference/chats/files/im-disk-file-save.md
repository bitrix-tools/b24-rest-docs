# Сохранить файл на свой диск im.disk.file.save

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.disk.file.save` сохраняет файл из чата на личный диск пользователя.

Файл сохраняется в папку *Сохраненные файлы*. Если папки нет, система создаст ее автоматически.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FILE_ID***
[`integer`](../../data-types.md) | Идентификатор файла ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FILE_ID":5155}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.disk.file.save
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FILE_ID":5155,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.disk.file.save
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.disk.file.save',
            {
                FILE_ID: 5155
            }
        );

        console.log(response.getData().result);
    }
    catch (error)
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
                'im.disk.file.save',
                [
                    'FILE_ID' => 5155,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.disk.file.save',
        {
            FILE_ID: 5155
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.disk.file.save',
        [
            'FILE_ID' => 5155,
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
        "folder": {
            "id": 4821,
            "name": "Сохраненные файлы"
        },
        "file": {
            "id": 5159,
            "name": "image.jpg"
        }
    },
    "time": {
        "start": 1772193101,
        "finish": 1772193101.625023,
        "duration": 0.6250228881835938,
        "processing": 0,
        "date_start": "2026-02-27T14:51:41+03:00",
        "date_finish": "2026-02-27T14:51:41+03:00",
        "operating_reset_at": 1772193701,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **result.folder**
[`object`](../../data-types.md) | Папка *Сохраненные файлы* на личном диске [(подробное описание)](#folder) ||
|| **result.file**
[`object`](../../data-types.md) | Сохраненный файл [(подробное описание)](#file) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект folder {#folder}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор папки ||
|| **name**
[`string`](../../data-types.md) | Название папки — *Сохраненные файлы* ||
|#

### Объект file {#file}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор сохраненного файла ||
|| **name**
[`string`](../../data-types.md) | Название сохраненного файла ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "FILE_ID_EMPTY",
    "error_description": "File ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `FILE_ID_EMPTY` | File ID can't be empty | Не передан или передан пустым обязательный параметр `FILE_ID` ||
|| `400` | `FILE_SAVE_ERROR` | File ID can't be saved | Возможные причины:
- у пользователя нет доступа к чату, из которого нужно сохранить файл
- указанный файл не найден
- Диск отлючен
- не удалось сохранить файл в папку *Сохраненные файлы*, например, при отсутствии места
- не удалось создать папку *Сохраненные файлы* ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-disk-file-commit.md)
- [{#T}](./im-disk-file-delete.md)
- [{#T}](./im-disk-folder-get.md)
