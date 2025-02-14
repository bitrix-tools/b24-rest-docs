# Получить информацию о процессе по id rpa.type.get

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает информацию о процессе по его `id`.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`number`](../../../data-types.md) | Идентификатор процесса ||
|#

## Обработка ответа

HTTP-статус: **200**

```json
{
    "type": {
        "id":1,
        "title":"Название процесса",
        "image":"list",
        "createdBy":1,
        "settings":[],
        "permissions":[
            {
                "id":"1",
                "entity":"TYPE",
                "entityId":"1",
                "accessCode":"UA",
                "action":"ITEMS_CREATE",
                "permission":"X"
            }
        ]
    }
}
```

### Возвращаемые данные

#|
|| **Название** | **Описание** ||
|| **id** | Идентификатор процесса ||
|| **title** | Название процесса ||
|| **image** | Идентификатор иконки из списка ||
|| **createdBy** | Идентификатор пользователя, который создал процесс ||
|| **settings** | Набор настроек процесса ||
|| **permissions** | Набор настроек прав доступа этого процесса ||
|#

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-type-add.md)
- [{#T}](./rpa-type-update.md)
- [{#T}](./rpa-type-list.md)
- [{#T}](./rpa-type-delete.md)