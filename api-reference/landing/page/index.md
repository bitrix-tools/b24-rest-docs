# Объект Страница: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы объекта Страница создают страницы сайта и папки, меняют параметры страницы, управляют ее блоками, публикуют страницу и назначают ей специальную роль на сайте.

Например, можно создать страницу акции, наполнить ее блоками и опубликовать. Когда акция закончится, страницу можно снять с публикации, перенести в другую папку или удалить.

Объект Страница — часть раздела [Сайты и магазины](../index.md).

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как создать и настроить сайт в Битрикс24](https://helpdesk.bitrix24.ru/open/25309314/)

## Как выбрать раздел

#|
|| **Если вам нужно** | **Открывайте раздел** ||
|| Создать страницу, изменить ее параметры, опубликовать, переместить или удалить | [Работа со страницей](./methods/index.md) ||
|| Разместить блок на странице, скрыть, переместить или удалить его | [Работа с блоками страницы](./block-methods/index.md) ||
|| Изменить текст, изображения и настройки уже размещенного блока | [Блоки](../block/index.md) ||
|| Назначить страницу главной или служебной страницей сайта | [Специальные страницы](./special-pages/index.md) ||
|| Посмотреть состав полей страницы | [Поля страницы](./fields.md) ||
|| Найти значение для `ADDITIONAL_FIELDS` или `THEME_CODE` | [Дополнительные поля страницы](./additional-fields.md), [Цветовые темы страницы](./color-themes.md) ||
|| Понять, какой `scope` передавать и какие бывают типы сайтов | [Работа с типами сайтов и скоупами](../types.md) ||
|| Разобрать ошибку метода | [Коды ошибок](../../../error-codes.md) ||
|#

## Как работать со страницей

1. Получите идентификатор сайта методом [landing.site.getList](../site/landing-site-get-list.md) или создайте новый сайт методом [landing.site.add](../site/landing-site-add.md). Все методы объекта Сайт собраны в разделе [Сайты](../site/index.md)
2. Если страница должна лежать в папке, получите идентификатор папки методом [landing.site.getFolders](../site/landing-site-get-folders.md) или создайте папку методом [landing.site.addFolder](../site/landing-site-add-folder.md)
3. Создайте страницу одним из трех методов. [landing.landing.add](./methods/landing-landing-add.md) добавляет пустую страницу. [landing.landing.addByTemplate](./methods/landing-landing-add-by-template.md) создает страницу по готовому шаблону из мастера, код шаблона дает метод [landing.demos.getPageList](../demos/landing-demos-get-page-list.md). [landing.landing.copy](./methods/landing-landing-copy.md) копирует существующую страницу. В ответе придет идентификатор страницы `lid`
4. Наполните страницу блоками методами раздела [Работа с блоками страницы](./block-methods/index.md)
5. Настройте параметры страницы методом [landing.landing.update](./methods/landing-landing-update.md) или перенесите ее в другую папку или на другой сайт методом [landing.landing.move](./methods/landing-landing-move.md)
6. Опубликуйте страницу методом [landing.landing.publication](./methods/landing-landing-publication.md). Чтобы снять страницу с публикации, используйте [landing.landing.unpublic](./methods/landing-landing-unpublic.md)
7. Ненужную страницу отправьте в корзину методом [landing.landing.markDelete](./methods/landing-landing-mark-delete.md) и при необходимости верните обратно методом [landing.landing.markUnDelete](./methods/landing-landing-mark-undelete.md). Метод [landing.landing.delete](./methods/landing-landing-delete.md) удаляет страницу окончательно и работает только со страницей вне корзины

Изменения страницы и блоков сохраняются в черновике. В публичной версии они появляются только после вызова `landing.landing.publication`, поэтому публикуйте страницу после каждой правки.

## Идентификатор страницы

Идентификатор `lid` требуется методам, которые работают с конкретной страницей и ее блоками. Найти `lid` существующей страницы можно методами [landing.landing.getList](./methods/landing-landing-get-list.md) и [landing.landing.resolveIdByPublicUrl](./methods/landing-landing-resolve-id-by-public-url.md).

## Формат ответа

Что приходит в `result`, зависит от метода:

- идентификатор объекта возвращают методы создания и копирования — `add`, `addByTemplate`, `copy`, `addblock`, `copyblock`, `moveblock`, `favoriteBlock`, — а также `markDelete` и `markUnDelete`. Исключение — блочные методы с признаком `RETURN_CONTENT`: `landing.landing.addblock` возвращает данные блока, а `landing.landing.copyblock` и `landing.landing.moveblock` — объект с признаком успеха и данными блока. Где передавать признак, указано на странице метода
- данные возвращают методы чтения: список страниц, публичный адрес страницы, адрес изображения превью, идентификатор страницы по публичному URL или набор полей
- остальные методы изменения, публикации и удаления возвращают `true`

Точное значение указано в разделе «Возвращаемые данные» на странице метода. Объект страницы приходит только из [landing.landing.getList](./methods/landing-landing-get-list.md), состав его полей описан в статье [Поля страницы](./fields.md).

## Лимиты

Количество опубликованных страниц ограничено тарифом Битрикс24. Лимит проверяется при публикации: если он исчерпан, метод [landing.landing.publication](./methods/landing-landing-publication.md) возвращает ошибку `PUBLIC_PAGE_REACHED`. Ошибки по лимитам сайта перечислены на странице этого метода.

## Когда передавать scope

Параметр `scope` показывает, в каком типе сайта или страницы должен работать метод. Это внутренний параметр сайтов и страниц. Он не связан с REST-скоупом `landing` в названии метода.

Параметр `scope` нужен, если страница относится к непубличному типу сайта: базе знаний, базе знаний группы или главной странице Битрикс24, которую еще называют вайбом. Значение `scope` совпадает с кодом типа сайта, полный перечень кодов приведен в статье [Работа с типами сайтов и скоупами](../types.md). Без `scope` такая страница не найдется, хотя она существует. Типичный признак пропущенного `scope` — пустой результат у методов поиска и ошибка `LANDING_NOT_EXIST` у методов, которые работают с конкретной страницей.

Параметр передавайте верхним уровнем, рядом с параметрами метода: он действует на весь вызов. В batch-запросе `scope` указывают в каждой команде — от соседней команды он не наследуется. `scope` нужен в любом методе, который обращается к такой странице: в поиске, при изменении, перемещении, удалении и в методах работы с блоками.

## Связь с другими объектами

Страница связана с сайтом и папкой, шаблоном представления, блоками, специальными страницами и правами доступа.

**Сайт и папка.** Страница всегда относится к сайту и может лежать в его папке. Идентификаторы `SITE_ID` и `FOLDER_ID` получают на первом шаге работы со страницей, а перенести страницу в другую папку или на другой сайт позволяет [landing.landing.move](./methods/landing-landing-move.md).

**Шаблон представления.** Оформление страницы задает `TPL_ID` — идентификатор шаблона представления из раздела [Шаблон представления](../template/index.md). Не путайте его с кодом шаблона страницы: его передают в `landing.landing.addByTemplate` параметром `code`.

**Блок.** Содержимое страницы состоит из блоков. Блок живет на странице и адресуется парой «идентификатор страницы и идентификатор блока». Идентификатор блока возвращают методы раздела [Работа с блоками страницы](./block-methods/index.md) и метод [landing.block.getlist](../block/methods/landing-block-get-list.md) — для блоков черновика его вызывают с `params.edit_mode = 1`.

**Специальная страница.** Обычную страницу можно назначить служебной страницей сайта, например корзиной или страницей оформления заказа. Привязку создает метод [landing.syspage.set](./special-pages/landing-syspage-set.md): в нем передают идентификатор сайта, тип специальной страницы и идентификатор обычной страницы.

**Права доступа.** Методы раздела проверяют права дважды. Сначала — общий доступ пользователя к разделу Сайты и магазины: без него метод вернет `ACCESS_DENIED` независимо от прав на конкретный сайт. Эта проверка не выполняется только при работе в скоупе главной страницы. Затем проверяется право на сам сайт: просмотр, редактирование, публикация, изменение настроек или удаление — в зависимости от метода. Конкретное право указано в шапке страницы каждого метода, а настраивают права методами раздела [Права доступа](../rights/index.md).

## Обзор методов {#all-methods}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Работа со страницей

#|
|| **Метод** | **Описание** ||
|| [landing.landing.add](./methods/landing-landing-add.md) | Добавляет страницу или папку ||
|| [landing.landing.addByTemplate](./methods/landing-landing-add-by-template.md) | Создает страницу по шаблону ||
|| [landing.landing.copy](./methods/landing-landing-copy.md) | Копирует страницу ||
|| [landing.landing.update](./methods/landing-landing-update.md) | Обновляет параметры страницы ||
|| [landing.landing.move](./methods/landing-landing-move.md) | Перемещает страницу в другой сайт или папку ||
|| [landing.landing.getList](./methods/landing-landing-get-list.md) | Получает список страниц ||
|| [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md) | Получает дополнительные поля страницы ||
|| [landing.landing.getpreview](./methods/landing-landing-get-preview.md) | Возвращает URL превью страницы ||
|| [landing.landing.getpublicurl](./methods/landing-landing-get-public-url.md) | Возвращает публичный URL страницы ||
|| [landing.landing.resolveIdByPublicUrl](./methods/landing-landing-resolve-id-by-public-url.md) | Возвращает идентификатор страницы по публичному URL ||
|| [landing.landing.publication](./methods/landing-landing-publication.md) | Публикует страницу ||
|| [landing.landing.unpublic](./methods/landing-landing-unpublic.md) | Снимает страницу с публикации ||
|| [landing.landing.markDelete](./methods/landing-landing-mark-delete.md) | Помечает страницу как удаленную ||
|| [landing.landing.markUnDelete](./methods/landing-landing-mark-undelete.md) | Восстанавливает страницу из корзины ||
|| [landing.landing.removeEntities](./methods/landing-landing-remove-entities.md) | Удаляет блоки страницы и отвязывает от нее файлы изображений ||
|| [landing.landing.delete](./methods/landing-landing-delete.md) | Удаляет страницу ||
|#

### Работа с блоками страницы

#|
|| **Метод** | **Описание** ||
|| [landing.landing.addblock](./block-methods/landing-landing-add-block.md) | Добавляет новый блок на страницу ||
|| [landing.landing.copyblock](./block-methods/landing-landing-copy-block.md) | Копирует блок на страницу ||
|| [landing.landing.moveblock](./block-methods/landing-landing-move-block.md) | Перемещает блок со страницы на страницу ||
|| [landing.landing.upblock](./block-methods/landing-landing-up-block.md) | Поднимает блок на одну позицию вверх ||
|| [landing.landing.downblock](./block-methods/landing-landing-down-block.md) | Опускает блок на одну позицию вниз ||
|| [landing.landing.showblock](./block-methods/landing-landing-show-block.md) | Показывает блок на странице ||
|| [landing.landing.hideblock](./block-methods/landing-landing-hide-block.md) | Скрывает блок на странице ||
|| [landing.landing.favoriteBlock](./block-methods/landing-landing-favorite-block.md) | Сохраняет блок в «Мои блоки» ||
|| [landing.landing.unFavoriteBlock](./block-methods/landing-landing-unfavorite-block.md) | Удаляет блок из «Моих блоков» ||
|| [landing.landing.markdeletedblock](./block-methods/landing-landing-mark-deleted-block.md) | Помечает блок как удаленный без физического удаления ||
|| [landing.landing.markundeletedblock](./block-methods/landing-landing-mark-undeleted-block.md) | Восстанавливает блок из удаленных ||
|| [landing.landing.deleteblock](./block-methods/landing-landing-delete-block.md) | Удаляет блок со страницы ||
|#

### Специальные страницы

#|
|| **Метод** | **Описание** ||
|| [landing.syspage.set](./special-pages/landing-syspage-set.md) | Назначает специальную страницу для сайта ||
|| [landing.syspage.get](./special-pages/landing-syspage-get.md) | Получает список специальных страниц сайта ||
|| [landing.syspage.getSpecialPage](./special-pages/landing-syspage-get-special-page.md) | Получает URL специальной страницы сайта ||
|| [landing.syspage.deleteForLanding](./special-pages/landing-syspage-delete-for-landing.md) | Удаляет все привязки страницы как специальной ||
|| [landing.syspage.deleteForSite](./special-pages/landing-syspage-delete-for-site.md) | Удаляет все привязки специальных страниц сайта ||
|#
