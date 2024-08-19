# Получение массива записей таймлайна для элемента с идентификатором itemId процесса с идентификатором itemId

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

{% note info "rpa.timeline.listForItem" %}

**Scope**: [`rpa`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `rpa.timeline.listForItem` возвращает массив записей таймлайна для элемента с идентификатором itemId процесса с идентификатором itemId, отсортированные по убыванию даты создания (сверху самые новые).

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **typeId** 
[`number`](../../../data-types.md) | Идентификатор процесса. ||
|| **itemId** 
[`number`](../../../data-types.md) | Идентификатор элемента. ||
|| **start** | Сдвиг для постраничной навигации. ||
|#

## Ответ в случае успеха

> 200 OK

```json
{
    "timeline": [
        {
            "id": 321,
            "typeId": 24,
            "itemId": 10,
            "createdTime": "2020-03-26T20:28:57+02:00",
            "userId": 1,
            "title": "Выполнено задание",
            "description": "",
            "action": "task_complete",
            "isFixed": false,
            "data": {
                "item": {
                    "name": "New name"
                },
                "scope": "task",
                "stageFrom": {
                    "id": 30,
                    "name": "Утверждение бухгалтером"
                },
                "stageTo": {
                    "id": 31,
                    "name": "Утверждено"
                },
                "fields": [
                    {
                        "name": "UF_RPA_24_NAME",
                        "title": "Название"
                    }
                ],
                "task": {
                    "ID": "91",
                    "USER_ID": "1",
                    "WORKFLOW_ID": "5e7cf3e91ef413.27314358",
                    "ACTIVITY": "RpaRequestActivity",
                    "ACTIVITY_NAME": "A79985_79846_49104_50661",
                    "NAME": "Task",
                    "DESCRIPTION": "",
                    "PARAMETERS": {
                        "DOCUMENT_ID": [
                            "rpa",
                            "Bitrix\\Rpa\\Integration\\Bizproc\\Document\\Item",
                            "24:10"
                        ],
                        "TASK_EDIT_URL": "/rpa/task/id/#ID#/",
                        "ACTIONS": [
                            {
                                "color": "3bc8f5",
                                "stageId": "31",
                                "label": "Сохранить"
                            }
                        ],
                        "FIELDS_TO_SHOW": [
                            "UF_RPA_24_NAME",
                            "UF_RPA_24_STRING_MANDATORY"
                        ],
                        "RESPONSIBLE_TYPE": null,
                        "APPROVE_TYPE": null,
                        "FIELDS_TO_SET": [
                            "UF_RPA_24_NAME"
                        ]
                    },
                    "USERS": [
                        1
                    ],
                    "INCOMPLETE_USERS": []
                }
            },
            "createdTimestamp": 1585247337000,
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
        },
    ]
}
```

- `id` - идентификатор записи
- `typeId` - идентификатор процесса
- `itemId` - идентификатор элемента
- `createdTime` - время создания записи
- `userId` - идентификатор пользователя, который инициировал действие
- `title` - заголовок записи
- `description` - текстовое содержимое записи
- `action` - код типа действия
- `isFixed` - флаг прикрепления записи
- `data` - сериализованные данные о выполненном действии и связанных сущностях на момент создания записи. В зависимости от типа действия может содержать разный набор данных. Основные параметры это:
- `item` - данные об элементе
    - `item[name]` - название элемента на момент выполнения действия
- `scope` - код источника действия, может принимать одно из следующих значений:
    - `manual` - вручную
    - `task` - при выполнении задания
    - `automation` - роботом
    - `rest` - приложением
- `stageFrom` - данные об исходной стадии на момент выполнения действия
    - `id` - идентификатор
    - `name` - название
- `stageTo` - данные о новой стадии (если она была изменена при выполнении действия)
- `fields` - массив данных о полях, значения которых были изменены при выполнении действия
    - `name` - код поля
    - `title` - заголовок поля
- `task` - данные о задании (если действие было выполнено при выполнении задания)
- `users` - данные о пользователях, которые имели отношение к действию