# Получить данные о текущих заданиях элемента rpa.item.getTasks

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает данные о текущих заданиях элемента с идентификатором `id` процесса с идентификатором `typeId`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId** 
[`integer`](../../../data-types.md) | Идентификатор процесса ||
|| **id** 
[`integer`](../../../data-types.md) | Идентификатор элемента ||
|#

## Обработка ответа

HTTP-статус: **200**

```json
{
    "tasks": [
        {
            "id": "93",
            "title": "asdf",
            "description": "",
            "userId": 1,
            "data": {
                "participantJoint": "or",
                "isMine": true,
                "controls": {
                    "BUTTONS": [
                        {
                            "TYPE": "submit",
                            "TARGET_USER_STATUS": 3,
                            "NAME": "complete",
                            "VALUE": "Y",
                            "TEXT": "Сохранить",
                            "COLOR": "3bc8f5"
                        }
                    ]
                },
                "type": "RpaRequestActivity",
                "url": "/rpa/task/id/93/",
                "fieldsToShow": null,
                "fieldsToSet": [
                    "Название"
                ],
                "users": [
                    {
                        "id": 1,
                        "status": 0
                    }
                ]
            },
            "itemClassName": "BX.Rpa.Timeline.Task",
            "users": {
                "1": {
                    "id": "1",
                    "name": "Anton",
                    "secondName": "",
                    "lastName": "Gorbylev",
                    "title": null,
                    "workPosition": "",
                    "fullName": "Anton Gorbylev",
                    "link": "/company/personal/user/1/"
                }
            }    
        }
    ]
}
```

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-item-add.md)
- [{#T}](./rpa-item-update.md)
- [{#T}](./rpa-item-get.md)
- [{#T}](./rpa-item-list.md)
- [{#T}](./rpa-item-delete.md)