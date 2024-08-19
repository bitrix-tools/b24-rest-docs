# Получение списка доступных партнерских шаблонов

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

{% note info "landing.demos.getList" %}

**Scope**: [`landing`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

## Описание

Метод `landing.demos.getList` получает список доступных партнерских шаблонов текущего приложения.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **params**
[`unknown`](../../data-types.md) | Опциональный массив, с опциональными ключами:
- select
- filter
- order
- group
которые содержат значения таблицы основных полей сущности. Таблица размещена ниже. ||
|#

## Поля сущности

#|
|| **Поле** | **Описание** ||
|| **ID**
[`unknown`](../../data-types.md) | Идентификатор записи. ||
|| **XML_ID**
[`unknown`](../../data-types.md) | Уникальный код записи. ||
|| **APP_CODE**
[`unknown`](../../data-types.md) | Код текущего приложения. ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | Активность (Y / N). ||
|| **TITLE**
[`unknown`](../../data-types.md) | Название. ||
|| **DESCRIPTION**
[`unknown`](../../data-types.md) | Описание. ||
|| **PREVIEW_URL**
[`unknown`](../../data-types.md) | URL предварительного просмотра. ||
|| **TYPE**
[`unknown`](../../data-types.md) | Тип создаваемого сайта (STORE, PAGE). ||
|| **TPL_TYPE**
[`unknown`](../../data-types.md) | Размещается в мастере создания сайта / магазина (S) или страницы (P). ||
|| **MANIFEST**
[`unknown`](../../data-types.md) | Манифест. ||
|| **SHOW_IN_LIST**
[`unknown`](../../data-types.md) | Показывать ли в списке шаблонов. ||
|| **PREVIEW / PREVIEW2X / PREVIEW3X**
[`unknown`](../../data-types.md) | Разноразмерные превью. ||
|| **CREATED_BY_ID**
[`unknown`](../../data-types.md) | Идентификатор пользователя создавшего запись ||
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
    'landing.demos.getList',
    {
        params: {
            select: [
                'ID', 'TITLE', 'MANIFEST'
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