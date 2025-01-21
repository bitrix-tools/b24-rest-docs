# Получить данные о текущих заданиях элемента rpa.item.getTasks

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `rpa.item.getTasks` вернет данные о текущих заданиях элемента с идентификатором id процесса с идентификатором typeId.

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId** 
[`number`](../../../data-types.md) | Идентификатор процесса. ||
|| **id** 
[`number`](../../../data-types.md) | Идентификатор элемента. ||
|#

## Ответ в случае успеха

> 200 OK

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