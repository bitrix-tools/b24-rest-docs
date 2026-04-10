# Работа со страницей: обзор методов

Страница всегда связана с сайтом. Ее можно создать в корне сайта или внутри папки. Методы `landing.landing.*` нужны, чтобы:

- создавать, копировать и перемещать страницы,
- получать список страниц и служебные данные,
- менять параметры страницы,
- публиковать страницу и снимать ее с публикации,
- восстанавливать и удалять страницы.

Например, можно создать страницу акции внутри сайта магазина, опубликовать ее, а когда акция закончится — перенести в другую папку или снять с публикации.

> Быстрый переход: [все методы](#all-methods)

## Как создать страницу сайта

1. Получите идентификатор сайта методами [landing.site.getList](../../site/landing-site-get-list.md) или [landing.site.add](../../site/landing-site-add.md).
2. Если страница должна лежать в папке, получите идентификатор папки методом [landing.site.getFolders](../../site/landing-site-get-folders.md). 
3. Создайте страницу методом [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) или [landing.landing.copy](./landing-landing-copy.md)
4. Для поиска страницы и проверки ее параметров используйте [landing.landing.getList](./landing-landing-get-list.md), [landing.landing.getadditionalfields](./landing-landing-get-additional-fields.md), [landing.landing.getpreview](./landing-landing-get-preview.md) и [landing.landing.getpublicurl](./landing-landing-get-public-url.md).
5. После настройки опубликуйте страницу методом [landing.landing.publication](./landing-landing-publication.md). Если нужно скрыть страницу, используйте [landing.landing.unpublic](./landing-landing-unpublic.md).

## Связь с другими объектами

Страница в Битрикс24 связана с другими объектами. Сайт задает общий контекст, папка показывает место страницы в структуре, шаблон представления определяет оформление, блоки формируют содержимое, а специальные страницы задают ее роль на сайте.

**Сайт.** Каждая страница относится к определенному сайту. Поэтому при создании страницы нужно передать `SITE_ID`, а для поиска страниц — указать фильтр по сайту. Идентификатор сайта можно получить методами [landing.site.getList](../../site/landing-site-get-list.md) или [landing.site.add](../../site/landing-site-add.md).

**Папка.** Страницу можно создать внутри папки. Для этого передают `FOLDER_ID`. Позже страницу можно перенести в другую папку или в другой сайт методом [landing.landing.move](./landing-landing-move.md). Список папок сайта возвращает метод [landing.site.getFolders](../../site/landing-site-get-folders.md).

**Шаблон представления.** При создании или обновлении страницы можно передать `TPL_ID`, чтобы сразу связать ее с шаблоном представления. Это помогает задать нужную структуру и оформление. Список шаблонов возвращает [landing.template.getlist](../../template/landing-template-get-list.md). а сами шаблоны описаны в разделе [Шаблон представления](../../template/index.md).

**Блоки.** Методы этого раздела управляют страницей, но не редактируют структуру и содержимое блоков. Для работы с блоками используйте [Блоки страницы](../block-methods/index.md). 

**Специальные страницы.** Обычную страницу можно назначить специальной страницей сайта, например главной, корзиной или страницей оформления заказа. Для этого используйте методы [Специальные страницы](../special-pages/index.md).

## Обзор методов {#all-methods}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Создание и изменение страницы

#|
|| **Метод** | **Описание** ||
|| [landing.landing.add](./landing-landing-add.md) | Добавляет страницу или папку ||
|| [landing.landing.addByTemplate](./landing-landing-add-by-template.md) | Создает страницу по шаблону ||
|| [landing.landing.copy](./landing-landing-copy.md) | Копирует страницу ||
|| [landing.landing.update](./landing-landing-update.md) | Обновляет параметры страницы ||
|| [landing.landing.move](./landing-landing-move.md) | Перемещает страницу в другой сайт или папку ||
|#

### Получение данных и навигация

#|
|| **Метод** | **Описание** ||
|| [landing.landing.getList](./landing-landing-get-list.md) | Получает список страниц ||
|| [landing.landing.getadditionalfields](./landing-landing-get-additional-fields.md) | Получает дополнительные поля страницы ||
|| [landing.landing.getpreview](./landing-landing-get-preview.md) | Получает URL превью страницы ||
|| [landing.landing.getpublicurl](./landing-landing-get-public-url.md) | Получает публичный URL страницы ||
|| [landing.landing.resolveIdByPublicUrl](./landing-landing-resolve-id-by-public-url.md) | Определяет идентификатор страницы по публичному URL ||
|#

### Публикация

#|
|| **Метод** | **Описание** ||
|| [landing.landing.publication](./landing-landing-publication.md) | Публикует страницу ||
|| [landing.landing.unpublic](./landing-landing-unpublic.md) | Снимает страницу с публикации ||
|#

### Удаление и восстановление

#|
|| **Метод** | **Описание** ||
|| [landing.landing.markDelete](./landing-landing-mark-delete.md) | Помечает страницу как удаленную ||
|| [landing.landing.markUnDelete](./landing-landing-mark-undelete.md) | Восстанавливает страницу из корзины ||
|| [landing.landing.removeEntities](./landing-landing-remove-entities.md) | Удаляет блоки и очищает файловые привязки изображений страницы ||
|| [landing.landing.delete](./landing-landing-delete.md) | Удаляет страницу ||
|#