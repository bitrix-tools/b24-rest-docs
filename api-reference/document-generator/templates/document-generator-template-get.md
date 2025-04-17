# Получить шаблон по идентификатору documentgenerator.template.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `documentgenerator.template.get` возвращает информацию о шаблоне по его идентификатору.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор шаблона. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Ответ в случае успеха

> 200 OK

```json
"template": {
    "id": "202", // id шаблона
    "name": "Rest Template", // название
    "region": "ru", // страна
    "code": "", // код
    "download": '', // ссылка на скачивание для пользователя
    "downloadMachine": '', // ссылка на скачивание для приложения
    "active": "Y", // активность
    "moduleId": "rest", // ид модуля
    "numeratorId": "20", // ид нумератора
    "withStamps": "N", // ставить печати по умолчанию
    "isDeleted": "N", // удален или нет
    "sort": "100", // сортировка
    "createTime": "2018-06-05T13:07:12+02:00",
    "updateTime": "2018-09-06T14:26:24+02:00",
    "providers": [ // провайдеры
        "bitrix\\documentgenerator\\dataprovider\\rest": "bitrix\\documentgenerator\\dataprovider\\rest"
    ],
    "users": [ // привязанные пользователи
        "0": "UA"
    ]
}
```