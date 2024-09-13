# Сохранить файл на свой диск im.disk.file.save

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

Метод `im.disk.file.save` сохраняет файл в свой Битрикс24.Диск.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **DISK_ID^*^**
[`unknown`](../../data-types.md) | `112` | Идентификатор файла | 21 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- cURL

    // пример для cURL

- JS

    ```javascript
    BX24.callMethod(
        'im.disk.file.save',
        {
            'DISK_ID': 112,
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

- PHP

    {% include [Пояснение о restCommand](../_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.disk.file.save',
        Array(
            'DISK_ID' => 112,
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
"result": {
    "folder": {
        "id": 130,
        "name": "Сохраненные файлы"
        },
    "file": {
        "id": 578,
        "name": "image.png"
        }
    }
}
```

## Ответ в случае ошибки

```json
{
    "error": "FILE_ID_EMPTY",
    "error_description": "File ID can't be empty"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **FILE_SAVE_ERROR** | Файл не удалось сохранить ||
|| **FILE_ID_EMPTY** | Не передан идентификатор файла ||
|#

