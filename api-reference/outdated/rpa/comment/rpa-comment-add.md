# Создать новый комментарий в таймлайне rpa.comment.add

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

Метод `rpa.comment.add` создаст новый комментарий в таймлайне элемента с идентификатором itemId процесса с идентификатором typeId.

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId** 
[`number`](../../../data-types.md) | Идентификатор процесса. ||
|| **itemId** 
[`number`](../../../data-types.md) | Идентификатор элемента. ||
|| **fields** 
[`array`](../../../data-types.md) | Поля комментария. ||
|#

## Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **description** | Описание записи (можно использовать html и BB-code). ||
|| **files** | Массив прикрепленных файлов, где каждый элемент - это массив с именем и закодированным в base64 содержимым. ||
|#

## Пример

{% list tabs %}

- JS

    ```json
    {
        "typeId": 24,
        "itemId": 10,
        "fields": {
            "description": "Упоминание пользователя с ид 1 ",
            "files": [
                [
                    "document.pdf", "...base64_decoded_content..."
                ]
            ]    
        }
    }
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

```json
{
    "comment": {
        "id": 350,
        "createdTime": "2020-03-27T16:00:59+02:00",
        "isFixed": false,
        "typeId": 24,
        "itemId": 10,
        "action": "comment",
        "description": "Упоминание пользователя с ид 1 ",
        "userId": 1,
        "title": "Комментарий",
        "data": {
            "files": [
                15
            ]
        },
        "createdTimestamp": 1585317659000,
        "htmlDescription": "Упоминание пользователя с ид 1 <a class=\"blog-p-user-name\" id=\"bp_K6r6vvp7\" href=\"/company/personal/user/1/\" bx-tooltip-user-id=\"1\">Anton Gorbylev</a> ",
        "textDescription": "Упоминание пользователя с ид 1 Anton",
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