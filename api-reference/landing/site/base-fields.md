# Поля сайта

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Поля сайта используются в методе [landing.site.getList](./landing-site-get-list.md).

Часть полей можно передавать при создании и изменении сайта через методы [landing.site.add](./landing-site-add.md) и [landing.site.update](./landing-site-update.md).

Дополнительные поля сайта передают отдельно в массиве `ADDITIONAL_FIELDS` и читают через [landing.site.getadditionalfields](./landing-site-get-additional-fields.md).

## Что нужно знать

- при создании через `landing.site.add` сайт создается неопубликованным со значением `ACTIVE = N`
- если сайт поместить в корзину, он автоматически снимается с публикации
- для удаления и восстановления сайта используйте [landing.site.markDelete](./landing-site-mark-delete.md) и [landing.site.markUnDelete](./landing-site-mark-undelete.md)
- служебные поля могут приходить в ответе `landing.site.getList`, но их не задают вручную

## Основные поля

#|
|| **Поле**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор сайта. В `landing.site.getList` поле всегда присутствует в ответе ||
|| **TITLE**
[`string`](../../data-types.md) | Название сайта. Поле обязательно при создании ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код сайта. В ответе `landing.site.getList` возвращается в формате `/code/`. При создании и изменении можно передавать значение без крайних `/`. Если передать пустую строку, код сгенерируется из `TITLE` или из строки `site`. Код из одних цифр получает префикс `site` ||
|| **TYPE**
[`string`](../../data-types.md) | Тип сайта.

Возможные значения:
`PAGE`  сайт
`STORE`  магазин
`SMN`  проект
`KNOWLEDGE`  база знаний
`GROUP`  сайт группы
`MAINPAGE`  главная страница или вайб

По умолчанию `PAGE`

Подробно о типах и внутренних scope читайте в статье [Работа с типами сайтов и скоупами](../types.md) ||
|| **ACTIVE**
[`string`](../../data-types.md) | Статус публикации сайта.

Возможные значения:
`Y`  сайт опубликован
`N`  сайт не опубликован

При создании через `landing.site.add` сайт получает значение `N`. Для публикации и снятия с публикации используйте [landing.site.publication](./landing-site-publication.md) и [landing.site.unpublic](./landing-site-unpublic.md) ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг корзины.

Возможные значения:
`Y`  сайт находится в корзине
`N`  сайт не находится в корзине

По умолчанию `landing.site.getList` возвращает только сайты со значением `DELETED = "N"` ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Краткое описание сайта. Выводится в списке сайтов ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор сайта ||
|| **DOMAIN_ID**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор домена ||
|| **LANG**
[`string`](../../data-types.md) | Двухсимвольный код языковой зоны сайта, например `ru`, `en`, `de`, `by`, `kz`, `in` ||
|| **TPL_ID**
[`integer`](../../data-types.md) | Идентификатор [шаблона представления](../template/index.md) сайта ||
|| **LANDING_ID_INDEX**
[`integer`](../../data-types.md) | Идентификатор главной страницы сайта. Это поле также используется для получения `PREVIEW_PICTURE` ||
|| **LANDING_ID_404**
[`integer`](../../data-types.md) | Идентификатор страницы ошибки `404` ||
|| **LANDING_ID_503**
[`integer`](../../data-types.md) | Идентификатор страницы ошибки `503` ||
|| **CREATED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал сайт ||
|| **MODIFIED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил сайт ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата и время создания сайта. В ответе REST возвращается строкой. Формат зависит от региональных настроек портала, например `04/20/2020 12:48:10 pm` ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата и время последнего изменения сайта. В ответе REST возвращается строкой. Формат зависит от региональных настроек портала, например `04/20/2020 12:48:10 pm` ||
|#

## Вычисляемые поля

Эти поля не хранятся в таблице сайта. Метод `landing.site.getList` возвращает их при запросе в `select`.

#|
|| **Поле**
`тип` | **Описание** ||
|| **DOMAIN_NAME**
[`string`](../../data-types.md) | Доменное имя сайта ||
|| **PUBLIC_URL**
[`string`](../../data-types.md) | Полный публичный URL сайта. Может быть пустой строкой, если URL не удалось определить ||
|| **PREVIEW_PICTURE**
[`string`](../../data-types.md) | URL превью главной страницы сайта. Может быть пустой строкой, если превью недоступно ||
|| **PHONE**
[`string`](../../data-types.md) \| `null` | Телефон CRM-контакта, связанного с сайтом ||
|#

## Продолжите изучение

- [{#T}](./landing-site-add.md)
- [{#T}](./landing-site-update.md)
- [{#T}](./landing-site-get-list.md)
- [{#T}](./landing-site-get-public-url.md)
- [{#T}](./landing-site-get-preview.md)
- [{#T}](./landing-site-get-additional-fields.md)
- [{#T}](./additional-fields.md)
