# Удалить файл из папки чата im.disk.file.delete

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата, который отправил файл

Метод `im.disk.file.delete` удаляет файл из папки чата. Удалить файл может только пользователь — участник чата, который отправил файл. Другие участники чата не могут удалить файл.

После удаления в чате вместо файла отображается текст *Сообщение удалено*.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата ||
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
      -d '{"CHAT_ID":1489,"FILE_ID":5163}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.disk.file.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CHAT_ID":1489,"FILE_ID":5163,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.disk.file.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.disk.file.delete',
            {
                CHAT_ID: 1489,
                FILE_ID: 5163
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
                'im.disk.file.delete',
                [
                    'CHAT_ID' => 1489,
                    'FILE_ID' => 5163,
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
        'im.disk.file.delete',
        {
            CHAT_ID: 1489,
            FILE_ID: 5163
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
        'im.disk.file.delete',
        [
            'CHAT_ID' => 1489,
            'FILE_ID' => 5163,
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
        "start": 1772194631,
        "finish": 1772194631.786718,
        "duration": 0.7867178916931152,
        "processing": 0,
        "date_start": "2026-02-27T15:17:11+03:00",
        "date_finish": "2026-02-27T15:17:11+03:00",
        "operating_reset_at": 1772195231,
        "operating": 0.2657620906829834
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`:
- если файл успешно удален,
- пользователь является участником чата, но не отправлял файл. Файл в этом случае не удалится.

Метод возвращает `false`:
- если у пользователя нет доступа к чату,
- указан неверный `CHAT_ID` или `FILE_ID` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `400` | `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан или передан пустым обязательный параметр `CHAT_ID` ||
|| `400` | `FILE_ID_EMPTY` | File ID can't be empty | Не передан или передан пустым обязательный параметр `FILE_ID` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-disk-file-commit.md)
- [{#T}](./im-disk-file-save.md)
- [{#T}](./im-disk-folder-get.md)
