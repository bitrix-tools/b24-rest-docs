# Получить список стадий процесса rpa.stage.listForType

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `rpa.stage.listForType` вернёт список стадий процесса, отсотированный в порядке сортировки, с финальными стадиями в конце.

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId**^*^ 
[`number`](../../../data-types.md) | Идентификатор процесса. ||
|| **start** | Сдвиг для постраничной навигации. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Ответ в случае успеха

> 200 OK

В информации о каждой стадии будут только основные данные, без `tasks`, `robotsCount`, `possibleNextStages`, `permissions`:

```json
{
    "stages": [
        {
            "id": 1,
            "name": "Запуск",
            "code": "",
            "color": "22B9FF",
            "sort": 1000,
            "semantic": null,
            "typeId": 1,
            "isFirst": true,
            "isSuccess": false,
            "isFail": false,
        }
    ]
}
```