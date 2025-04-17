# Обновить элемент хранилища entity.item.update

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

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `entity.item.update` обновляет элемент хранилища. Пользователь должен обладать хотя бы правами на запись (**W**) в хранилище.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **ENTITY^*^**
[`string`](../../data-types.md) | Обязательный. Строковой идентификатор хранилища. ||
|| **ID^*^**
[`integer`](../../data-types.md) | Обязательный. Идентификатор элемента. ||
|| **NAME**
[`string`](../../data-types.md) | Наименование элемента. ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | Флаг активности элемента (Y\|N). ||
|| **DATE_ACTIVE_FROM**
[`unknown`](../../data-types.md) | Дата начала активности элемента. ||
|| **DATE_ACTIVE_TO**
[`unknown`](../../data-types.md) | Дата окончания активности элемента. ||
|| **SORT**
[`unknown`](../../data-types.md) | Сортировочный вес элемента. ||
|| **PREVIEW_PICTURE**
[`unknown`](../../data-types.md) | Картинка анонса элемента. ||
|| **PREVIEW_TEXT**
[`unknown`](../../data-types.md) | Анонс элемента. ||
|| **DETAIL_PICTURE**
[`unknown`](../../data-types.md) | Детальная картинка элемента. ||
|| **DETAIL_TEXT**
[`unknown`](../../data-types.md) | Детальный текст элемента. ||
|| **CODE**
[`unknown`](../../data-types.md) | Символьный код элемента. ||
|| **SECTION**
[`unknown`](../../data-types.md) | Идентификатор раздела хранилища. ||
|| **PROPERTY_VALUES^*^**
[`unknown`](../../data-types.md) | Обязательный. ассоциативный список значений свойств элемента. Свойства хранилища создаются при помощи [entity.item.property.add](./properties/entity-item-property-add.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'entity.item.update',
        {
            ENTITY: 'menu_new',
            ID: 842,
            DATE_ACTIVE_FROM: new Date(),
            DETAIL_PICTURE: '',
            NAME: 'Goodbye Cruel World',
            PROPERTY_VALUES: {
                test: 11,
                test1: 22,
                test_file: ''
            },
            SECTION: 219
        }
    );
    ```

- HTTP

    ```http
    https://my.bitrix24.ru/rest/entity.item.update.json?DATE_ACTIVE_FROM=2013-06-26T12%3A03%3A31.653Z&DETAIL_PICTURE=&ENTITY=menu_new&ID=842&NAME=Goodbye%20Cruel%20World&PROPERTY_VALUES%5Btest1%5D=22&PROPERTY_VALUES%5Btest%5D=11&PROPERTY_VALUES%5Btest_file%5D=&SECTION=219&auth=9affe382af74d9c5caa588e28096e872
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{"result":true}
```