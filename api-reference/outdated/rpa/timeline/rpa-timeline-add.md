# Добавить новую запись таймлайна rpa.timeline.add

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает новую запись таймлайна у элемента `itemId` процесса `typeId`.

Этот метод позволяет изменять только поля `title` и `description`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId** 
[`integer`](../../../data-types.md) | Идентификатор процесса ||
|| **itemId** 
[`integer`](../../../data-types.md) | Идентификатор элемента ||
|| **fields** 
[`object`](../../../data-types.md) | Объект с [полями](#fields) записи ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **title** 
[`string`](../../../data-types.md) | Заголовок записи ||
|| **description** 
[`string`](../../../data-types.md) | Описание записи. Можно использовать HTML теги ||
|#

## Обработка ответа

HTTP-статус: **200**

```json
{
    "timeline": {
        "id": 325,
        "typeId": 24,
        "itemId": 10,
        "createdTime": "2020-03-26T21:55:25+02:00",
        "userId": 1,
        "title": "rest update",
        "description": "<h5>small header</h5>",
        "action": false,
        "isFixed": false,
        "data": {
            "scope": "rest"
        },
        "createdTimestamp": 1585252525000,
        "users": {
            "1": {
                "id": "1",
                "name": "Anton",
                "secondName": "",
                "lastName": "",
                "title": null,
                "workPosition": "",
                "fullName": "Anton",
                "link": "/company/personal/user/1/"
            }
        }
    }
}
```

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-timeline-update.md)
- [{#T}](./rpa-timeline-update-is-fixed.md)
- [{#T}](./rpa-timeline-list-for-item.md)
- [{#T}](./rpa-timeline-delete.md)