# Изменить настройки видимости полей rpa.fields.setVisibilitySettings

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод обновляет настройки видимости `visibility` полей `fields` для процесса с идентификатором `typeId` на стадии с идентификатором `stageId`. Остальные настройки при этом не меняются.

Метод необходимо использовать, когда надо изменить настройки видимости только одного типа.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId***
[`integer`](../../../data-types.md) | Идентификатор процесса ||
|| **visibility***
[`string`](../../../data-types.md) | Идентификатор видимости, для которого меняются настройки ||
|| **stageId** 
[`integer`](../../../data-types.md) | Идентификатор стадии.

По умолчанию имеет значение `0`, то есть — общие настройки ||
|| **fields***
[`array`](../../../data-types.md) | Массив с полями, для которых необходимо поменять настройку ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'rpa.comment.add',
        {
            "typeId": 1,
            "visibility": "kanban",
            "fields": [
                "createdBy", 
                "UF_RPA_1_NAME"
            ]
        },
        function(result) {
            console.log('response', result.answer);
            if(result.error())
                alert("Error: " + result.error());
            else
            console.log(result.data());
        }
    )
    ```

{% endlist %}

## Обработка ответа

Метод вернет результат аналогичный запросу [rpa.fields.getSettings](./rpa-fields-get-settings.md).

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-fields-get-settings.md)
- [{#T}](./rpa-fields-set-settings.md)