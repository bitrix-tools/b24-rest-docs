# Получить список доступных хранилищ disk.storage.getlist

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- нет подробного примера в случае успеха

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.storage.getlist` возвращает список доступных хранилищ.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **filter**
[`unknown`](../../data-types.md) | Необязательный параметр. Поддерживает фильтрацию по полям, которые указаны в [disk.storage.getfields](./disk-storage-get-fields.md) как `USE_IN_FILTER: true`. ||
|| **START** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../../how-to-call-rest-api/list-methods-pecularities.md) ||
|#

{% note info %}

Cм. также описание [списочных методов](../../how-to-call-rest-api/list-methods-pecularities.md).

{% endnote %}

## Пример

{% list tabs %}

- JS

```js
//поиск хранилища группы с именем содержащем "Фут"
BX24.callMethod(
    "disk.storage.getlist",
    {
        filter: {
            'ENTITY_TYPE': 'group',
            '%NAME': 'Фут'
        }
    },
    function (result)
    {
        if (result.error())
            console.error(result.error());
        else
            console.dir(result.data());
    }
);
```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

В ответе массив объектов, структура которых аналогична [disk.storage.get](./disk-storage-get.md).