# Объект Страница: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Методы помогают работать со страницей и связанными с ней действиями. С помощью методов можно:

- изменять страницу,
- управлять ее блоками,
- назначать странице специальную роль на сайте.

Например, можно создать страницу акции, наполнить ее блоками и опубликовать. Когда акция закончится, страницу можно снять с публикации, перенести в другую папку или удалить.

Поля страницы описаны в отдельной статье [Поля страницы](./fields.md).

> Быстрый переход: [все методы](#all-methods)

## Как работать со страницей

Работа со страницей начинается с сайта. Сначала получите идентификатор сайта методом [landing.site.getList](../site/landing-site-get-list.md). Если страницу нужно разместить в папке, дополнительно получите идентификатор папки методом [landing.site.getFolders](../site/landing-site-get-folders.md).

После этого выберите метод для создания страницы:

- [landing.landing.add](./methods/landing-landing-add.md), если нужна новая страница,
- [landing.landing.addByTemplate](./methods/landing-landing-add-by-template.md), если нужна страница с готовой структурой,
- [landing.landing.copy](./methods/landing-landing-copy.md), если нужно взять за основу существующую страницу.

Когда страница будет создана, можно настроить ее параметры методами [landing.landing.update](./methods/landing-landing-update.md) и [landing.landing.move](./methods/landing-landing-move.md).

Готовую страницу можно опубликовать или скрыть. Для публикации используйте [landing.landing.publication](./methods/landing-landing-publication.md), а чтобы снять страницу с публикации — [landing.landing.unpublic](./methods/landing-landing-unpublic.md).


## Когда передавать scope

Параметр `scope` показывает, в каком типе сайта или страницы должен работать метод. Это внутренний параметр лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Если `scope` не указать, метод будет работать только в обычном контексте. Для непубличных типов, например `knowledge`, `group` и `vibe`, этого недостаточно. В таком случае сайт или страница могут не найтись, хотя они существуют.

Параметр `scope` нужен в методах, которые ищут страницу, меняют ее видимость или работают с содержимым. Например, в [landing.landing.getList](./methods/landing-landing-get-list.md), [landing.landing.publication](./methods/landing-landing-publication.md), [landing.landing.unpublic](./methods/landing-landing-unpublic.md) и в методах раздела [Работа с блоками страницы](./block-methods/index.md).

Например, если страница относится к базе знаний, в вызове нужно передать `scope=knowledge`. Тогда метод будет искать и изменять страницу внутри базы знаний. Без этого параметра страница может не найтись. Правила выбора значения и связь с типами сайтов описаны в статье [Работа с типами сайтов и скоупами](../types.md).

## Связь с другими объектами

Страница в Битрикс24 всегда связана с другими объектами. Сайт задает общий контекст, блоки — содержимое, а специальные страницы — назначение страницы на сайте.

**Сайт.** Каждая страница относится к определенному сайту. Поэтому при создании страницы нужно передать `SITE_ID`. Идентификатор сайта можно получить методами [landing.site.getList](../site/landing-site-get-list.md) или [landing.site.add](../site/landing-site-add.md).

**Папка.** Страницу можно разместить в папке, чтобы упорядочить структуру сайта. Для этого используют `FOLDER_ID`. Список папок сайта возвращает [landing.site.getFolders](../site/landing-site-get-folders.md), а перенести страницу в другую папку или в другой сайт позволяет [landing.landing.move](./methods/landing-landing-move.md).

**Шаблон представления.** При создании или обновлении страницы можно передать `TPL_ID`, чтобы сразу задать ее оформление и структуру. Список шаблонов возвращает [landing.template.getlist](../template/landing-template-get-list.md). Подробнее о них рассказано в разделе [Шаблон представления](../template/index.md).

**Блоки.** Содержимое страницы состоит из блоков. Методы этого раздела позволяют управлять блоками на странице: добавлять, удалять и менять их порядок. Чтобы изменить содержимое блока, используют методы раздела [Работа с блоками страницы](./block-methods/index.md).

**Специальные страницы.** Страницу можно назначить специальной страницей сайта. Например, сделать ее главной страницей или служебной страницей для отдельного сценария. Для этого используют методы из раздела [Специальные страницы](./special-pages/index.md).

## Обзор методов {#all-methods}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Работа со страницей

#|
|| **Метод** | **Описание** ||
|| [landing.landing.add](./methods/landing-landing-add.md) | Добавляет страницу ||
|| [landing.landing.addByTemplate](./methods/landing-landing-add-by-template.md) | Создает страницу по шаблону ||
|| [landing.landing.copy](./methods/landing-landing-copy.md) | Копирует страницу ||
|| [landing.landing.update](./methods/landing-landing-update.md) | Изменяет параметры страницы ||
|| [landing.landing.move](./methods/landing-landing-move.md) | Перемещает страницу в другой сайт или папку ||
|| [landing.landing.getList](./methods/landing-landing-get-list.md) | Получает список страниц ||
|| [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md) | Получает дополнительные поля страницы ||
|| [landing.landing.getpreview](./methods/landing-landing-get-preview.md) | Возвращает путь к превью страницы ||
|| [landing.landing.getpublicurl](./methods/landing-landing-get-public-url.md) | Возвращает публичный URL страницы ||
|| [landing.landing.resolveIdByPublicUrl](./methods/landing-landing-resolve-id-by-public-url.md) | Возвращает идентификатор страницы по публичному URL ||
|| [landing.landing.publication](./methods/landing-landing-publication.md) | Делает страницу доступной в текущем контексте ||
|| [landing.landing.unpublic](./methods/landing-landing-unpublic.md) | Скрывает страницу в текущем контексте ||
|| [landing.landing.markDelete](./methods/landing-landing-mark-delete.md) | Помечает страницу как удаленную ||
|| [landing.landing.markUnDelete](./methods/landing-landing-mark-undelete.md) | Восстанавливает страницу из удаленных ||
|| [landing.landing.removeEntities](./methods/landing-landing-remove-entities.md) | Удаляет блоки и изображения страницы ||
|| [landing.landing.delete](./methods/landing-landing-delete.md) | Удаляет страницу ||
|#

### Работа с блоками

#|
|| **Метод** | **Описание** ||
|| [landing.landing.addblock](./block-methods/landing-landing-add-block.md) | Добавляет новый блок на страницу ||
|| [landing.landing.copyblock](./block-methods/landing-landing-copy-block.md) | Копирует блок со страницы на страницу ||
|| [landing.landing.deleteblock](./block-methods/landing-landing-delete-block.md) | Удаляет блок со страницы ||
|| [landing.landing.downblock](./block-methods/landing-landing-down-block.md) | Опускает блок на одну позицию вниз ||
|| [landing.landing.favoriteBlock](./block-methods/landing-landing-favorite-block.md) | Сохраняет блок в «Мои блоки» ||
|| [landing.landing.hideblock](./block-methods/landing-landing-hide-block.md) | Скрывает блок на странице ||
|| [landing.landing.markdeletedblock](./block-methods/landing-landing-mark-deleted-block.md) | Помечает блок как удаленный без физического удаления ||
|| [landing.landing.markundeletedblock](./block-methods/landing-landing-mark-undeleted-block.md) | Восстанавливает блок из удаленных ||
|| [landing.landing.moveblock](./block-methods/landing-landing-move-block.md) | Перемещает блок со страницы на страницу ||
|| [landing.landing.showblock](./block-methods/landing-landing-show-block.md) | Показывает блок на странице ||
|| [landing.landing.unFavoriteBlock](./block-methods/landing-landing-unfavorite-block.md) | Удаляет блок из «Моих блоков» ||
|| [landing.landing.upblock](./block-methods/landing-landing-up-block.md) | Поднимает блок на одну позицию вверх ||
|#

### Специальные страницы

#|
|| **Метод** | **Описание** ||
|| [landing.syspage.deleteForLanding](./special-pages/landing-syspage-delete-for-landing.md) | Удаляет привязки страницы как специальной ||
|| [landing.syspage.deleteForSite](./special-pages/landing-syspage-delete-for-site.md) | Удаляет все специальные страницы сайта ||
|| [landing.syspage.getSpecialPage](./special-pages/landing-syspage-get-special-page.md) | Получает адрес специальной страницы сайта ||
|| [landing.syspage.get](./special-pages/landing-syspage-get.md) | Получает список специальных страниц ||
|| [landing.syspage.set](./special-pages/landing-syspage-set.md) | Назначает специальную страницу для сайта ||
|#
