# Поля объекта Страница

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не прописаны ссылки на несозданные ещё страницы (шаблон представления)

{% endnote %}

{% endif %}

> Быстрый переход: [все методы](#all-methods) 

#|

|| **Поля** | **Описание** | **Чтение** | **Запись** ||
|| **ID**
[`unknown`](../../data-types.md) | Идентификатор страницы. Создается автоматически и уникален в рамках БД. | Да | Нет ||
|| **CODE^*^**
[`unknown`](../../data-types.md) | Уникальный символьный код страницы. Добавляется к адресу сайта, если это не главная страница. | Да | Да ||
|| **RULE**
[`unknown`](../../data-types.md) | Регулярное выражение для вывода страницы по маске. Например, правило `section/([\d]+)` для страницы в корне сайта будет отвечать всем страницам вида `/section/<n>/`, где <n> - любое число. | Да | Нет ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | Активность страницы: Y / N. | Да | Нет ||
|| **DELETED**
[`unknown`](../../data-types.md) | Флаг [удаленной страницы](*deleted_page): Y / N.  | Да | Да ||
|| **TITLE^*^**
[`unknown`](../../data-types.md) | Название страницы. | Да | Да ||
|| **XML_ID**
[`unknown`](../../data-types.md) | Внешний ключ для нужд разработчика. Не используется сервисом. | Да | Да ||
|| **DESCRIPTION**
[`unknown`](../../data-types.md) | Произвольное описание страницы. Выводится в списке страниц. | Да | Да ||
|| **SITE_ID^*^**
[`unknown`](../../data-types.md) | Идентификатор сайта, к которому привязана страница. | Да | Да ||
|| **CREATED_BY_ID**
[`unknown`](../../data-types.md) | Идентификатор пользователя создавшего страницу. | Да | Нет ||
|| **MODIFIED_BY_ID**
[`unknown`](../../data-types.md) | Идентификатор пользователя изменившего страницу. | Да | Нет ||
|| **DATE_CREATE**
[`unknown`](../../data-types.md) | Дата создания. | Да | Нет ||
|| **DATE_MODIFY**
[`unknown`](../../data-types.md) | Дата изменения. | Да | Нет ||
|| **SITEMAP**
[`unknown`](../../data-types.md) | Страница присутствует в карте сайта (`/sitemap.xml`), Y / N. | Да | Да ||
|| **FOLDER_ID**
[`unknown`](../../data-types.md) | Идентификатор папки, где содержится страница. | Да | Да ||
|| **TPL_ID**
[`unknown`](../../data-types.md) | Идентификатор [шаблона представления](../template/index.md). | Да | Да ||
|| **TPL_CODE**
[`unknown`](../../data-types.md) | Идентификатор шаблона партнерского решения, на основе которого был создан сайт. Например, bitrix.eshop. | Да | Нет ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Обзор методов {#all-methods}

### Работа с блоками

#|
|| **Метод** | **Описание** | **С версии** ||
|| [landing.landing.addblock](./block-methods/landing-landing-add-block.md) | Метод для добавление нового блока на страницу. | ||
|| [landing.landing.copyblock](./block-methods/landing-landing-copy-block.md) | Метод для копирования блока со страницы на страницу. | ||
|| [landing.landing.deleteblock](./block-methods/landing-landing-delete-block.md) | Метод для удаление блока со страницы. | ||
|| [landing.landing.downblock](./block-methods/landing-landing-down-block.md) | Метод для опускания блока на одну позицию вниз на странице. | ||
|| [landing.landing.favoriteBlock](./block-methods/landing-landing-favorite-block.md) | Метод сохраняет имеющийся на странице блок в «Мои блоки». | 21.800.0 ||
|| [landing.landing.hideblock](./block-methods/landing-landing-hide-block.md) | Метод скрывает блок со страницы. | ||
|| [landing.landing.markdeletedblock](./block-methods/landing-landing-mark-deleted-block.md) | Метод помечает блок как удаленный, но не удаляет его физически. | ||
|| [landing.landing.markundeletedblock](./block-methods/landing-landing-mark-undeleted-block.md) | Метод восстанавливает блок из помеченных как удаленный | ||
|| [landing.landing.moveblock](./block-methods/landing-landing-move-block.md) | Метод для переноса блока со страницы на страницу. | ||
|| [landing.landing.showblock](./block-methods/landing-landing-show-block.md) | Метод для показа блока со странице. | ||
|| [landing.landing.unFavoriteBlock](./block-methods/landing-landing-unfavorite-block.md) | Метод удаляет блок, который был сохранен в «Мои блоки». | 21.800.0 ||
|| [landing.landing.upblock](./block-methods/landing-landing-up-block.md) | Метод для поднятия блока на одну позицию вверх на странице. | ||
|#

### Работа со страницей

#|
|| **Метод** | **Описание** | **С версии** ||
|| [landing.landing.add](./methods/landing-landing-add.md) | Метод для добавления страницы. | ||
|| [landing.landing.addByTemplate](./methods/landing-landing-add-by-template.md) | Метод для добавления Страницы по шаблону. | ||
|| [landing.landing.copy](./methods/landing-landing-copy.md) | Метод копирует указанную страницу. | ||
|| [landing.landing.delete](./methods/landing-landing-delete.md) | Метод для удаления страницы. | ||
|| [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md) | Метод для получения дополнительных полей страницы | ||
|| [landing.landing.getlist](./methods/landing-landing-get-list.md) | Метод для получения списка страниц. | ||
|| [landing.landing.getpreview](./methods/landing-landing-get-preview.md) | Метод возвращает путь до превью страницы. | ||
|| [landing.landing.getpublicurl](./methods/landing-landing-get-public-url.md) | Метод возвращает веб-адрес страницы. | ||
|| [landing.landing.markDelete](./methods/landing-landing-mark-delete.md) | Метод помечает страницу как удаленную. | ||
|| [landing.landing.markUnDelete](./methods/landing-landing-mark-undelete.md) | Метод помечает страницу как не удаленную. | ||
|| [landing.landing.move](./methods/landing-landing-move.md) | Метод перемещает страницу в другой сайт и/или папку. | 21.800.0 ||
|| [landing.landing.publication](./methods/landing-landing-publication.md) | Метод для публикации страницы. | ||
|| [landing.landing.removeEntities](./methods/landing-landing-remove-entities.md) | Метод удаляет связанные сущности лендинга. | ||
|| [landing.landing.resolveIdByPublicUrl](./methods/landing-landing-resolve-id-by-public-url.md) | Метод по переданному относительному URL страницы возвращает идентификатор страницы. | 21.800.0 ||
|| [landing.landing.unpublic](./methods/landing-landing-unpublic.md) | Метод для снятия с публикации страницы. | ||
|| [landing.landing.update](./methods/landing-landing-update.md) | Метод для изменения страницы. | ||
|#

### Специальные страницы

#|
|| **Метод** | **Описание** ||
|| [landing.syspage.deleteForLanding](./special-pages/landing-syspage-delete-for-landing.md) | Удаляет все упоминания страницы как специальной ||
|| [landing.syspage.deleteForSite](./special-pages/landing-syspage-delete-for-site.md) | Удаляет все специальные страницы ||
|| [landing.syspage.getSpecialPage](./special-pages/landing-syspage-get-special-page.md) | Получает адрес специальной страницы сайта ||
|| [landing.syspage.get](./special-pages/landing-syspage-get.md) | Получает список специальных страниц ||
|| [landing.syspage.set](./special-pages/landing-syspage-set.md) | Устанавливает специальную страницу для сайта ||
|#

[*deleted_page]: Маркированные как удаленные сущности не фигурируют ни в одном запросе. Система их как бы не видит. Через REST вы сможете добраться до таких сущностей только явно указав в фильтрации DELETED=Y.

