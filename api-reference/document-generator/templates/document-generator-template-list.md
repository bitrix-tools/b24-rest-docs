# Получить список шаблонов documentgenerator.template.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `documentgenerator.template.list` возвращает список шаблонов по фильтру.

#|
|| **Параметр** | **Описание** ||
|| **select** | Массив полей для вывода. По умолчанию выводит все поля шаблона, кроме *users* и *providers*. Чтобы они появились, надо добавить дополнительно. Например, `['*', 'providers', 'users']`. ||
|| **order** | Массив для указания порядка вывода `{"id": "desc"}`. ||
|| **filter** | Массив для фильтрации. ||
|| **start** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Пример

```json
templates: {
    202: {
        "id": "202",
        "active": "Y",
        "name": "Rest Template",
        "code": "",
        "region": "ru",
        "sort": "100",
        "createTime": "2018-06-05T13:07:12+02:00",
        "updateTime": "2018-09-06T14:26:24+02:00",
        "moduleId": "rest",
        "numeratorId": "20",
        "withStamps": "N",
        "isDeleted": "N",
        "download": "",
        "downloadMachine": "",
        "providers": [
            "bitrix\\documentgenerator\\dataprovider\\rest": "bitrix\\documentgenerator\\dataprovider\\rest"
        ],
        "users": [
            "0": "UA"
        ]
    }
}
```

## Примеры фильтра

```json
filter: {
"numeratorId": "20",
"region": "ru",
"active": "Y"
}
```

По умолчанию фильтр имеет следующие значения:

```json
filter: {
"moduleId": "rest", // изменить нельзя, метод всегда вернет шаблоны только для реста
"isDeleted": "N" // если нужен список шаблонов без учета isDeleted, необходимо передать "@isDeleted": ["Y", "N"]
}
```
## Ответ в случае успеха

Метод вернет список шаблонов с их полями.