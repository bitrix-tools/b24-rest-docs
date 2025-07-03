# Получить список страниц landing.landing.getList

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.landing.getList` получает список страниц.

{% note warning %}

Помеченные как удаленные страницы не фигурируют в выборках. Чтобы получить их явно, необходимо при фильтрации указать ключ `DELETED` со значением Y или N.

{% endnote %}

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **params**
[`unknown`](../../../data-types.md) | Опциональный массив, с опциональными ключами: **select**, **filter**, **order**, **group**, которые содержат значения таблицы [основных полей](../index.md) сущности.
Дополнительно можно передать флаги `get_preview = 1` (вернуть превью страниц), `get_urls = 1` (вернуть публичные адреса страниц), `check_area` (вернуть флаг IS_AREA является ли страница включаемой областью). ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.landing.getList',
        {
            params: {
                select: [
                    'ID', 'TITLE'
                ],
                filter: {
                    TITLE: '%услуги%',
                    SITE_ID: 205
                },
                order: {
                    ID: 'DESC'
                }
            }
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}