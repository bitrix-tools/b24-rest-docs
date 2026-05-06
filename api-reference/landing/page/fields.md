# Поля страницы

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Поля страницы используются в методе [landing.landing.getList](./methods/landing-landing-get-list.md).

Часть полей можно передавать при создании и изменении страницы через методы [landing.landing.add](./methods/landing-landing-add.md) и [landing.landing.update](./methods/landing-landing-update.md).

Дополнительные поля страницы не хранятся вместе с основными. Их передают отдельно в массиве `ADDITIONAL_FIELDS` и читают через [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md).

## Что нужно знать

- REST-методы объекта страницы относятся к скоупу `landing`
- новая страница через `landing.landing.add` и `landing.landing.addByTemplate` создается неопубликованной со значением `ACTIVE = N`
- если страницу поместить в корзину, она автоматически снимается с публикации
- для публикации и снятия с публикации используйте [landing.landing.publication](./methods/landing-landing-publication.md) и [landing.landing.unpublic](./methods/landing-landing-unpublic.md)

## Основные поля

#|
|| **Поле**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор страницы. В `landing.landing.getList` поле всегда присутствует в ответе ||
|| **TITLE**
[`string`](../../data-types.md) | Название страницы. Поле обязательно при создании через `landing.landing.add` ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код страницы. Формирует адрес страницы внутри сайта. При создании, если поле не передать или передать строку из пробелов, код генерируется из `TITLE`.

Если сформированный адрес совпадет с адресом уже существующей страницы в том же разделе сайта, система автоматически добавит к `CODE` суффикс из 4 случайных символов, например `my-page_a1b2`. Итоговое значение `CODE` может отличаться от переданного ||
|| **SITE_ID**
[`integer`](../../data-types.md) | Идентификатор сайта, к которому относится страница ||
|| **FOLDER_ID**
[`integer`](../../data-types.md) | Идентификатор папки, в которой находится страница. Если значение пустое или равно `0`, страница находится в корне сайта ||
|| **TPL_ID**
[`integer`](../../data-types.md) | Идентификатор [шаблона представления](../template/index.md) страницы. Если значение пустое, страница использует шаблон сайта ||
|| **ACTIVE**
[`string`](../../data-types.md) | Статус публикации страницы.

Возможные значения:
`Y`  страница опубликована
`N`  страница не опубликована

Новая страница создается со значением `N`. Для изменения статуса используйте [landing.landing.publication](./methods/landing-landing-publication.md) и [landing.landing.unpublic](./methods/landing-landing-unpublic.md) ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг корзины.

Возможные значения:
`Y`  страница находится в корзине
`N`  страница не находится в корзине

При переводе в корзину страница автоматически получает `ACTIVE = "N"`. Для удаления и восстановления используйте [landing.landing.markDelete](./methods/landing-landing-mark-delete.md) и [landing.landing.markUnDelete](./methods/landing-landing-mark-undelete.md) ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Произвольное описание страницы. Выводится в списке страниц ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор страницы ||
|| **SITEMAP**
[`string`](../../data-types.md) | Флаг включения страницы в карту сайта.

Возможные значения:
`Y`  страница входит в `sitemap.xml`
`N`  страница не входит в `sitemap.xml` ||
|| **FOLDER**
[`string`](../../data-types.md) | Признак того, что объект используется как папка в структуре сайта, а не как обычная страница.

Возможные значения:
`Y`  объект является папкой
`N`  объект является страницей

Папка нужна для группировки страниц внутри сайта. Создать ее можно методом [landing.landing.add](./methods/landing-landing-add.md), передав `FOLDER = Y` ||
|| **RULE**
[`string`](../../data-types.md) | Регулярное выражение для вывода страницы по маске. Например, правило `section/([\d]+)` для страницы в корне сайта будет соответствовать адресам вида `/section/<n>/`, где `<n>` — любое число ||
|| **CREATED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал страницу ||
|| **MODIFIED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил страницу ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата и время создания страницы. Формат зависит от настроек Битрикс24 ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата и время последнего изменения страницы. Формат зависит от настроек Битрикс24 ||
|| **DATE_PUBLIC**
[`datetime`](../../data-types.md) \| `null` | Дата и время публикации страницы. Изменение этого поля само по себе не публикует страницу. В ответе значение возвращается строкой в формате портала или `null` для страницы, которая ни разу не публиковалась ||
|#

## Вычисляемые и связанные поля

Эти поля не хранятся в таблице страницы. Метод `landing.landing.getList` возвращает их автоматически или добавляет по отдельным флагам выборки.

#|
|| **Поле**
`тип` | **Описание** ||
|| **DOMAIN_ID**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор домена сайта, к которому привязана страница. Метод `landing.landing.getList` добавляет это поле в результат всегда ||
|| **PUBLIC_URL**
[`string`](../../data-types.md) \| `null` | Полный публичный URL страницы. Возвращается в `landing.landing.getList`, если включен флаг `get_urls`, и отдельным значением в методе [landing.landing.getpublicurl](./methods/landing-landing-get-public-url.md) ||
|| **PREVIEW**
[`string`](../../data-types.md) \| `null` | URL или относительный путь к превью страницы. Возвращается в `landing.landing.getList`, если включен флаг `get_preview`, и отдельным значением в методе [landing.landing.getpreview](./methods/landing-landing-get-preview.md) ||
|| **IS_AREA**
[`boolean`](../../data-types.md) | Признак того, что страница используется как включаемая область. Возвращается в `landing.landing.getList`, если включен флаг `check_area` ||
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
