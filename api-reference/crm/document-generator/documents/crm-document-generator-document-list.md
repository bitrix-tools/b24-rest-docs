# Получить список документов crm.documentgenerator.document.list

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

> Scope: [`crm.documentgenerator`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.documentgenerator.document.list` возвращает список документов по фильтру.

#|
|| **Параметр** | **Описание** ||
|| **select** | Массив полей для вывода. ||
|| **order** | Массив для указания порядка вывода `{"id": "desc"}`. ||
|| **filter** | Массив для фильтрации. ||
|| **start** | Offset для постраничной навигации. ||
|#

## Пример фильтра

```json
"filter": {
    "entityTypeId": 2,
    "entityId": 5
}
```

В результате будет список документов, сформированный для сделки с ID=5.

## Ответ в случае успеха

```json
"documents": [
    {
        "id": "1523",
        "title": "Акт (Россия) 1",
        "number": "1",
        "templateId": "115",
        "entityTypeId": "2",
        "fileId": "4315",
        "imageId": "4316",
        "pdfId": "4317",
        "createTime": "2018-06-05T16:04:40+02:00",
        "updateTime": "2018-06-05T16:04:40+02:00",
        "values": {},
        "entityId": "5",
        "downloadUrl": "",
        "downloadUrlMachine": "",
        "imageUrl": "",
        "imageUrlMachine": "",
        "pdfUrl": "",
        "pdfUrlMachine": ""
    }
]
```