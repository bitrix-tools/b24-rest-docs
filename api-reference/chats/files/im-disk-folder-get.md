# Получить папку хранения файлов чата im.disk.folder.get

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата

Метод `im.disk.folder.get` получает идентификатор папки, в которой хранятся файлы чата.

Идентификатор из ответа можно использовать в методах Диска:
- [disk.folder.uploadfile](../../disk/folder/disk-folder-upload-file.md) для загрузки файла в папку чата
- [disk.folder.getchildren](../../disk/folder/disk-folder-get-children.md) для получения списка файлов папки

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата. Обязателен, если не передан `DIALOG_ID` ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор диалога в формате `chatXXX`, где `XXX` — идентификатор. Обязателен, если не передан `CHAT_ID` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1489"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.disk.folder.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat1489","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.disk.folder.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.disk.folder.get',
            {
                DIALOG_ID: 'chat1489'
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
                'im.disk.folder.get',
                [
                    'DIALOG_ID' => 'chat1489',
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
        'im.disk.folder.get',
        {
            DIALOG_ID: 'chat1489'
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
        'im.disk.folder.get',
        [
            'DIALOG_ID' => 'chat1489',
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
        "ID": 5153
    },
    "time": {
        "start": 1772192121,
        "finish": 1772192121.447936,
        "duration": 0.4479360580444336,
        "processing": 0,
        "date_start": "2026-02-27T14:35:21+03:00",
        "date_finish": "2026-02-27T14:35:21+03:00",
        "operating_reset_at": 1772192721,
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
|| **result.ID**
[`integer`](../../data-types.md) | Идентификатор папки хранения файлов чата ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Chat ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID_EMPTY` | Chat ID can't be empty | Возможные причины:
- не передан один из обязательных параметров: `CHAT_ID` или `DIALOG_ID`
- передан пустой `CHAT_ID` ||
|| `400` | `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Передан неверный или пустой `DIALOG_ID` ||
|| `403` | `ACCESS_ERROR` | You do not have access to the specified dialog | Недостаточно прав на просмотр диалога или передан несуществующий диалог ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-disk-file-commit.md)
- [{#T}](./im-disk-file-save.md)
- [{#T}](./im-disk-file-delete.md)
