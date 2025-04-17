# Получить список групп соцсети sonet_group.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках

{% endnote %}

{% endif %}

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает массив групп соцсети, каждая из которых содержит массив полей, осуществляя вызов `CSocNetGroup::GetList()`. При этом возвращаются только те группы, которые доступны пользователю по правам.

## Запрос:

```
https://mydomain.bitrix24.ru/rest/sonet_group.get.json?auth=bbc392f317df617d02c942a78ad43aab&ORDER[NAME]=ASC&FILTER[%25NAME]=Прод
```

## Ответ:

>200 OK

```json
{
"result": [
    {
    "ID": "3",
    "SITE_ID": "s1",
    "NAME": "Продажи",
    "DESCRIPTION": "Маркетинговая группа по продажам",
    "DATE_CREATE": "2013-11-06T07:45:12+04:00",
    "DATE_UPDATE": "2013-11-06T07:45:12+04:00",
    "ACTIVE": "Y",
    "VISIBLE": "Y",
    "OPENED": "N",
    "CLOSED": "N",
    "SUBJECT_ID": "1",
    "OWNER_ID": "1",
    "KEYWORDS": "продажа, товар, маркетинг, рынок",
    "NUMBER_OF_MEMBERS": "1",
    "DATE_ACTIVITY": "2013-11-06T07:45:12+04:00",
    "SUBJECT_NAME": "Рабочие группы",
    "IMAGE": "https://cdn.bitrix24.ru/b211545/socialnetwork/ba9/ba9533b38f60ade077b64f06a60d7082/2.jpg",
    "IS_EXTRANET": "Y"
    }
],
"total": 1
}
```

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ORDER** | Cоответствует параметру arOrder метода `CSocNetGroup::GetList()`. ||
|| **FILTER** | Cоответствует параметру arFilter метода `CSocNetGroup::GetList()`. ||
|| **IS_ADMIN** | При передаче Y, проверяется, является ли текущий пользователь администратором соцсети и, если да, отключается проверка прав при выборке групп. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

Возвращает те же поля, что и `CSocNetGroup::GetList()`, за исключением `INITIATE_PERMS`, `SPAM_PERMS` и `IMAGE_ID` (вместо последнего возвращается поле `IMAGE`, с полями файла, соответствующего `IMAGE_ID`).

## Пример

{% list tabs %}

- JS

    ```js
    // Получим список всех доступных групп соцсети, название которых начинается с подстроки "Прод", отсортированный по названию в алфавитном порядке
    BX24.callMethod('sonet_group.get', {
        'ORDER': {
            'NAME': 'ASC'
        },
        'FILTER': {
            '%NAME': 'Прод'
        }
    });
    ```

{% endlist %}


{% include [Сноска о примерах](../../_includes/examples.md) %}