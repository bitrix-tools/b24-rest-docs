# Получить информацию о документе по Id crm.documentgenerator.document.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm.documentgenerator`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.documentgenerator.document.get` возвращает информацию о документе по его идентификатору.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | ID документа. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

### Почему в результате **crm.documentgenerator.document.add** нет ссылки на **pdf**

- Конвертация в **pdf** – операция асинхронная. На момент окончания генерации документа еще нет **pdf**-файла. Минимальное время конвертации – 8 секунд.
- Если для документа очень нужен **pdf**, то сейчас единственный вариант – сделать повторный запрос **crm.documentgenerator.document.get** через 20-30 секунд, чтобы считать ссылку на **pdf**. Если она там не появилась – попробовать повторить.

## Ответ в случае успеха

```json
"document": {
    "id": 1,
    "title": "Счет (Россия) 1",
    "number": "1",
    "createTime": "2018-06-05T16:04:40+02:00",
    "updateTime": "2018-06-05T16:04:40+02:00",
    "createdBy": "1",
    "updatedBy": "1",
    "stampsEnabled": true,
    "downloadUrl": "",
    "downloadUrlMachine": "",
    "imageUrl": "",
    "imageUrlMachine": "",
    "pdfUrl": "",
    "pdfUrlMachine": "",
    "publicUrl": "",
    "isTransformationError": false,
    "templateId": "1",
    "entityTypeId": 1,
    "entityId": "1",
    "values": {}
}
```