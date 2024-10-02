# Получить список пользовательских блоков landing.repo.getList

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

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `landing.repo.getList` получает список блоков текущего приложения.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **params**
[`unknown`](../../data-types.md) | Опциональный массив, с опциональными ключами:
- select,
- filter,
- order,
- group,

которые содержат значения таблицы основных полей сущности. Таблица размещена ниже. ||
|#

## Поля

#|
|| **Поле** | **Описание** ||
|| **ID**
[`unknown`](../../data-types.md) | Идентификатор записи ||
|| **XML_ID**
[`unknown`](../../data-types.md) | Уникальный код записи. ||
|| **APP_CODE**
[`unknown`](../../data-types.md) | Код текущего приложения. ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | Активность (Y / N). ||
|| **NAME**
[`unknown`](../../data-types.md) | Название. ||
|| **DESCRIPTION**
[`unknown`](../../data-types.md) | Описание. ||
|| **SECTIONS**
[`unknown`](../../data-types.md) | Символьные коды категорий. ||
|| **PREVIEW**
[`unknown`](../../data-types.md) | Превью изображение. ||
|| **MANIFEST**
[`unknown`](../../data-types.md) | Манифест. ||
|| **CONTENT**
[`unknown`](../../data-types.md) | Контент. ||
|| **CREATED_BY_ID**
[`unknown`](../../data-types.md) | Идентификатор пользователя создавшего запись. ||
|| **MODIFIED_BY_ID**
[`unknown`](../../data-types.md) | Идентификатор пользователя изменившего запись. ||
|| **DATE_CREATE**
[`unknown`](../../data-types.md) | Дата создания. ||
|| **DATE_MODIFY**
[`unknown`](../../data-types.md) | Дата изменения. ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.repo.getList',
    {
        params: {
            select: [
                'ID', 'NAME', 'MANIFEST'
            ],
            filter: {
                '>ID': '1'
            }
        }
    },
    function(result)
    {
        if(result.error())
            console.error(result.error());
        else
            console.info(result.data());
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}