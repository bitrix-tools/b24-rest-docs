# Получить полный набор настроек видимости полей rpa.fields.getSettings

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает полный набор настроек видимости полей на стадии с идентификатором `stageId` процесса с идентификатором `typeId`.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId***
[`integer`](../../../data-types.md) | Идентификатор процесса ||
|| **stageId** 
[`integer`](../../../data-types.md) | Идентификатор стадии.

По умолчанию имеет значение `0`, то есть — общие настройки ||
|#

## Обработка ответа

HTTP-статус: **200**

```json
{
    "fields": {
        "kanban": {
            "id": true,
            "UF_RPA_1_NAME": true
        },
        "create": {
            "UF_RPA_1_NAME": true
        }
    }
}
```

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-fields-set-settings.md)
- [{#T}](./rpa-fields-set-visibility-settings.md)