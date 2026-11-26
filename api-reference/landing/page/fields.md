# Поля страницы

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Поля страницы используются в методе [landing.landing.getList](./methods/landing-landing-get-list.md).

Часть полей можно передавать при создании и изменении страницы через методы [landing.landing.add](./methods/landing-landing-add.md) и [landing.landing.update](./methods/landing-landing-update.md).

Дополнительные поля страницы не хранятся вместе с основными. Их передают отдельно в объекте `fields.ADDITIONAL_FIELDS` метода [landing.landing.update](./methods/landing-landing-update.md) и читают через [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md).

## Как получить поля страницы

Нужные поля перечислите в `params.select` метода [landing.landing.getList](./methods/landing-landing-get-list.md). Публичный адрес и превью страницы метод добавит по флагам `get_urls` и `get_preview`, если `select` не передан или в нем есть `ID`. Пример запроса страниц сайта с адресом и превью:

```json
{
    "params": {
        "select": ["ID", "TITLE", "ACTIVE"],
        "filter": {
            "SITE_ID": 273
        },
        "get_urls": true,
        "get_preview": true
    }
}
```

Каждый элемент массива `result` в ответе содержит поля из `select`, `DOMAIN_ID` и поля, которые добавили флаги:

```json
{
    "ID": "2513",
    "TITLE": "Весенняя акция",
    "ACTIVE": "Y",
    "DOMAIN_ID": "225",
    "PUBLIC_URL": "https://mysite.bitrix24site.ru/spring-sale/",
    "PREVIEW": "https://mysite.bitrix24site.ru/spring-sale/preview.jpg"
}
```

Если `select` не передан, метод возвращает все [основные поля](#main) и служебные поля, например `VERSION` и `SEARCH_CONTENT`. [Вычисляемые поля](#calculated), кроме `DOMAIN_ID`, метод добавляет только по флагам.

## Что нужно знать

- REST-методы объекта страницы относятся к скоупу `landing`
- новая страница через [landing.landing.add](./methods/landing-landing-add.md) и [landing.landing.addByTemplate](./methods/landing-landing-add-by-template.md) создается неопубликованной со значением `ACTIVE = N`
- если страницу поместить в корзину, она автоматически снимается с публикации
- для публикации и снятия с публикации используйте [landing.landing.publication](./methods/landing-landing-publication.md) и [landing.landing.unpublic](./methods/landing-landing-unpublic.md)

## Основные поля {#main}

#|
|| **Поле**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор страницы. Если в [landing.landing.getList](./methods/landing-landing-get-list.md) передан `select`, укажите в нем `ID`: без него метод вернет только одну страницу, а флаги `get_urls`, `get_preview` и `check_area` не сработают ||
|| **TITLE**
[`string`](../../data-types.md) | Название страницы. Поле обязательно при создании через [landing.landing.add](./methods/landing-landing-add.md) ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код страницы. Формирует адрес страницы внутри сайта. При создании, если поле не передать или передать строку из пробелов, код генерируется из `TITLE`.

Если сформированный адрес совпадет с адресом уже существующей страницы в том же разделе сайта, система автоматически добавит к `CODE` суффикс из 4 случайных символов, например `my-page_a1b2`. Итоговое значение `CODE` может отличаться от переданного ||
|| **SITE_ID**
[`integer`](../../data-types.md) | Идентификатор сайта, к которому относится страница. Поле обязательно при создании через [landing.landing.add](./methods/landing-landing-add.md) ||
|| **FOLDER_ID**
[`integer`](../../data-types.md) | Идентификатор папки, в которой находится страница. Если значение пустое или равно `0`, страница находится в корне сайта ||
|| **TPL_ID**
[`integer`](../../data-types.md) | Идентификатор [шаблона представления](../template/index.md) страницы. Если значение пустое, страница использует шаблон сайта ||
|| **ACTIVE**
[`string`](../../data-types.md) | Статус публикации страницы.

Возможные значения:
`Y` — страница опубликована
`N` — страница не опубликована

Новая страница создается со значением `N`. Для изменения статуса используйте [landing.landing.publication](./methods/landing-landing-publication.md) и [landing.landing.unpublic](./methods/landing-landing-unpublic.md) ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг корзины.

Возможные значения:
`Y` — страница находится в корзине
`N` — страница не находится в корзине

Поместить страницу в корзину и восстановить ее можно методами [landing.landing.markDelete](./methods/landing-landing-mark-delete.md) и [landing.landing.markUnDelete](./methods/landing-landing-mark-undelete.md). При переводе в корзину страница получает `ACTIVE = "N"` ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Произвольное описание страницы. Выводится в списке страниц ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор страницы ||
|| **SITEMAP**
[`string`](../../data-types.md) | Флаг включения страницы в карту сайта.

Возможные значения:
`Y` — страница входит в `sitemap.xml`
`N` — страница не входит в `sitemap.xml` ||
|| **FOLDER**
[`string`](../../data-types.md) | Признак папки-страницы — так папки были устроены раньше.

Возможные значения:
`Y` — папка-страница
`N` — обычная страница

Сейчас папки — отдельный объект, их возвращает метод [landing.site.getFolders](../site/landing-site-get-folders.md). Если передать `FOLDER = Y` без `FOLDER_ID` в метод [landing.landing.add](./methods/landing-landing-add.md), Битрикс24 в том же вызове создаст папку с названием и кодом страницы. Новая страница станет индексной страницей папки: у нее будет `FOLDER = N`, а в `FOLDER_ID` — идентификатор новой папки ||
|| **RULE**
[`string`](../../data-types.md) | Регулярное выражение для вывода страницы по маске. Например, правило `section/([\d]+)` для страницы в корне сайта будет соответствовать адресам вида `/section/<n>/`, где `<n>` — любое число. Методы [landing.landing.add](./methods/landing-landing-add.md) и [landing.landing.update](./methods/landing-landing-update.md) это поле не записывают ||
|| **CREATED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал страницу ||
|| **MODIFIED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил страницу ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата и время создания страницы. Формат зависит от настроек Битрикс24 ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата и время последнего изменения страницы. Формат зависит от настроек Битрикс24 ||
|| **DATE_PUBLIC**
[`datetime`](../../data-types.md) \| `null` | Дата и время публикации страницы. Изменение этого поля само по себе не публикует страницу. В ответе значение возвращается строкой в формате, заданном в настройках Битрикс24, или `null` для страницы, которая ни разу не публиковалась ||
|#

## Вычисляемые и связанные поля {#calculated}

Эти поля не хранятся в таблице страницы. Метод [landing.landing.getList](./methods/landing-landing-get-list.md) возвращает их автоматически или добавляет по отдельным флагам выборки.

#|
|| **Поле**
`тип` | **Описание** ||
|| **DOMAIN_ID**
[`string`](../../data-types.md) | Идентификатор домена сайта, к которому привязана страница. Метод [landing.landing.getList](./methods/landing-landing-get-list.md) добавляет это поле в результат всегда ||
|| **PUBLIC_URL**
[`string`](../../data-types.md) \| `null` | Полный публичный URL страницы. Возвращается в [landing.landing.getList](./methods/landing-landing-get-list.md), если включен флаг `get_urls`, и отдельным значением в методе [landing.landing.getpublicurl](./methods/landing-landing-get-public-url.md) ||
|| **PREVIEW**
[`string`](../../data-types.md) \| `null` | Ссылка на изображение превью страницы. Возвращается в [landing.landing.getList](./methods/landing-landing-get-list.md), если включен флаг `get_preview`, и отдельным значением в методе [landing.landing.getpreview](./methods/landing-landing-get-preview.md) ||
|| **IS_AREA**
[`boolean`](../../data-types.md) | Признак того, что страница используется как включаемая область. Возвращается в [landing.landing.getList](./methods/landing-landing-get-list.md), если включен флаг `check_area` ||
|#

## Продолжите изучение

- [{#T}](./methods/landing-landing-add.md)
- [{#T}](./methods/landing-landing-add-by-template.md)
- [{#T}](./methods/landing-landing-update.md)
- [{#T}](./methods/landing-landing-get-list.md)
- [{#T}](./methods/landing-landing-get-additional-fields.md)
- [{#T}](./methods/landing-landing-get-preview.md)
- [{#T}](./methods/landing-landing-get-public-url.md)
- [{#T}](./methods/landing-landing-mark-delete.md)
- [{#T}](./methods/landing-landing-mark-undelete.md)
- [{#T}](./additional-fields.md)
