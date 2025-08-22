# Добавить файл в чат im.disk.file.commit

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.disk.file.commit` публикует загруженный файл в чат.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **CHAT_ID^*^**
[`unknown`](../../data-types.md) | `17` | Идентификатор чата | 18 ||
|| **UPLOAD_ID^*^**
[`unknown`](../../data-types.md) | `213` | Идентификатор загруженного файла через методы модуля DISK | 18 ||
|| **DISK_ID^*^**
[`unknown`](../../data-types.md) | `112` | Идентификатор файла, доступного из локального диска | 18 ||
|| **MESSAGE**
[`unknown`](../../data-types.md) | `Важный документ` | Описание файла будет опубликовано в чате | 18 ||
|| **SILENT_MODE**
[`unknown`](../../data-types.md) | `N` | Параметр для чата Открытых линий, обозначает, будет ли отправлена информация о файле клиенту или нет | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

Для успешного вызова API нужно указать `CHAT_ID` и **одно из двух** полей – `UPLOAD_ID` или `DISK_ID`.

{% note warning %}

Файл должен быть предварительно загружен через метод [disk.folder.uploadfile](../../disk/folder/disk-folder-upload-file.md).

{% endnote %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'im.disk.file.commit',
    		{
    			'CHAT_ID': 17,
    			'UPLOAD_ID': 112,
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.disk.file.commit',
                [
                    'CHAT_ID'  => 17,
                    'UPLOAD_ID' => 112,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error committing file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.disk.file.commit',
        {
            'CHAT_ID': 17,
            'UPLOAD_ID': 112,
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    {% include [Пояснение о restCommand](../_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.disk.file.commit',
        Array(
            'CHAT_ID' => 17,
            'UPLOAD_ID' => 112,
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

- cURL

    // пример для cURL

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

## Ответ в случае ошибки

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Chat ID can't be empty"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **CHAT_ID_EMPTY** | Не передан идентификатор чата ||
|| **ACCESS_ERROR** | Текущий пользователь не имеет прав доступа к диалогу ||
|| **FILES_ERROR** | Не переданы идентификаторы файлов ||
|#

