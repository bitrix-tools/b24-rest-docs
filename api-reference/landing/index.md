# Сайты и магазины: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы группы `landing` создают и настраивают сайты, магазины, страницы и блоки. С их помощью управляют публикацией, шаблонами, правами доступа и местами встраивания приложений.

> Быстрый переход: [все разделы и методы](#all-methods)
>
> Пользовательская документация: [Как создать и настроить сайт в Битрикс24](https://helpdesk.bitrix24.ru/open/25309314/)

## Как устроены сайты и магазины

Сайт объединяет страницы, папки, настройки, права доступа и публикацию. Тип сайта определяет, какие страницы, блоки и настройки доступны в методах `landing`.

Страница принадлежит сайту и состоит из блоков. Методы страниц создают, копируют, перемещают и публикуют страницу, а методы работы с блоками на странице добавляют, скрывают, перемещают или удаляют блоки.

Блок — часть страницы с HTML-структурой, нодами, карточками, атрибутами и стилями. Ноды хранят редактируемый контент, карточки описывают повторяющиеся элементы блока, атрибуты и стили отвечают за разметку и оформление.

Манифест блока показывает, какие ноды, карточки, атрибуты и стили доступны для изменения через API.

Изменения страниц и блоков сохраняются в черновике. Метод публикации переносит изменения в публичную версию страницы или сайта.

{% note tip "Пользовательская документация" %}

- [Как создать многостраничный сайт](https://helpdesk.bitrix24.ru/open/7183935/)
- [Настройки сайтов и страниц](https://helpdesk.bitrix24.ru/open/6527585/)
- [Права на сайты и магазины](https://helpdesk.bitrix24.ru/open/9375089/)

{% endnote %}

## Как начать работу

1. Создайте сайт методом [landing.site.add](./site/landing-site-add.md) или получите существующий сайт методом [landing.site.getList](./site/landing-site-get-list.md)
2. Создайте страницу методом [landing.landing.add](./page/methods/landing-landing-add.md), выберите существующую методом [landing.landing.getList](./page/methods/landing-landing-get-list.md) или создайте страницу по шаблону методом [landing.landing.addByTemplate](./page/methods/landing-landing-add-by-template.md)
3. Добавьте блок на страницу методом [landing.landing.addblock](./page/block-methods/landing-landing-add-block.md)
4. Измените содержимое блока методами [landing.block.*](./block/index.md)
5. Опубликуйте страницу методом [landing.landing.publication](./page/methods/landing-landing-publication.md) или весь сайт методом [landing.site.publication](./site/landing-site-publication.md)

## Как выбрать методы для работы с блоками

Для блоков страницы есть две группы методов. Методы [работы с блоками на странице](./page/block-methods/index.md) управляют размещением блока на конкретной странице: добавляют, копируют, перемещают, скрывают, удаляют и сохраняют блок в «Мои блоки». Методы [объекта Блоки](./block/index.md) изменяют содержимое уже размещенного блока: ноды, карточки, атрибуты, стили, контент и файлы.

#|
|| **Задача** | **Что использовать** ||
|| Добавить блок из репозитория на страницу | [landing.landing.addblock](./page/block-methods/landing-landing-add-block.md) ||
|| Изменить порядок, видимость или состояние блока на странице | Методы [работы с блоками на странице](./page/block-methods/index.md) ||
|| Изменить текст, изображения, ссылки, карточки или стили блока | Методы [landing.block.*](./block/index.md) ||
|| Получить код стандартного или пользовательского блока до добавления | [landing.block.getrepository](./block/methods/landing-block-get-repository.md) ||
|| Получить идентификатор уже размещенного блока | [landing.block.getlist](./block/methods/landing-block-get-list.md) с `params.edit_mode = true` ||
|#

## Дополнительные сценарии

#|
|| **Задача** | **Что использовать** ||
|| Настроить повторяющиеся части страниц | [Шаблоны представления](./template/index.md) и методы [landing.template.*](./template/index.md) ||
|| Добавить свои блоки в редактор | [Пользовательские блоки](./user-blocks/index.md) и методы [landing.repo.*](./user-blocks/index.md) ||
|| Добавить свои шаблоны в мастер создания сайтов и страниц | [Пользовательские шаблоны](./demos/index.md) и методы [landing.demos.*](./demos/index.md) ||
|| Настроить доступ к сайтам и магазинам | [Права: расширенная или ролевая модель](./rights/index.md) ||
|| Встроить приложение в интерфейс сайтов и страниц | [Места встраивания](./embedding/index.md) ||
|#

## Места встраивания

Места встраивания выводят пункт приложения в интерфейсе сайтов. [LANDING_SETTINGS](./embedding/settings.md) добавляет его в меню настроек сайта или страницы, [LANDING_BLOCK_*](./embedding/block.md) — в меню действий блока. Регистрирует места встраивания только приложение.

`LANDING_SETTINGS` регистрируют методом [landing.repo.bind](./embedding/landing-repo-bind.md) или [placement.bind](../widgets/placement-bind.md), `LANDING_BLOCK_*` — только методом [landing.repo.bind](./embedding/landing-repo-bind.md). С кодом `LANDING_BLOCK_*` метод [placement.bind](../widgets/placement-bind.md) вернет ошибку `ERROR_PLACEMENT_NOT_FOUND`.

Место встраивания снимают тем же способом, каким регистрировали: методом [landing.repo.unbind](./embedding/landing-repo-unbind.md) или [placement.unbind](../widgets/placement-unbind.md).

## Типы сайтов и scope

Методы группы `landing` работают с разными типами сайтов: обычными сайтами, магазинами, служебными сайтами Сайты24, Базами знаний, Базами знаний групп, главной страницей и вайбом. Для некоторых типов нужно передавать параметр `scope` в корне запроса.

Этот параметр не связан со скоупом доступа [`landing`](../scopes/permissions.md), который вы выдаете приложению или вебхуку. Правила выбора значения `scope` и примеры запросов описаны в статье [Работа с типами сайтов и скоупами](./types.md).

## Ключевые идентификаторы

#|
|| **Идентификатор** | **Что обозначает** | **Где взять** ||
|| `SITE_ID`, `siteId` или `id` | Идентификатор сайта, например `253` | `result` метода [landing.site.add](./site/landing-site-add.md) или `result[].ID` метода [landing.site.getList](./site/landing-site-get-list.md) ||
|| `LID` или `lid` | Идентификатор страницы, например `2227` | `result` методов [landing.landing.add](./page/methods/landing-landing-add.md), [landing.landing.addByTemplate](./page/methods/landing-landing-add-by-template.md) и [landing.landing.copy](./page/methods/landing-landing-copy.md) или `result[].ID` метода [landing.landing.getList](./page/methods/landing-landing-get-list.md) ||
|| `FOLDER_ID`, `PARENT_ID`, `folderId` или `id` | Идентификатор папки, например `89` | `result` метода [landing.site.addFolder](./site/landing-site-add-folder.md) или `result[].ID` метода [landing.site.getFolders](./site/landing-site-get-folders.md) ||
|| `ID` блока | Идентификатор блока на странице, например `28597` | `result` метода [landing.landing.addblock](./page/block-methods/landing-landing-add-block.md) или `result[].id` метода [landing.block.getlist](./block/methods/landing-block-get-list.md) с `params.edit_mode = true`, если нужен блок из черновика ||
|| `CODE` блока | Код блока в репозитории, например `02.three_cols_big_1` или `repo_385` | Ключ блока в списке `items` нужного раздела в ответе метода [landing.block.getrepository](./block/methods/landing-block-get-repository.md). Пользовательский блок получает код `repo_<ID>`, где `<ID>` — `result` метода [landing.repo.register](./user-blocks/landing-repo-register.md) ||
|#

Идентификатор сайта в разных методах называется по-разному:

- `id` — в методах объекта [Сайты](./site/index.md), например [landing.site.update](./site/landing-site-update.md)
- `siteId` — в методах папок, например [landing.site.addFolder](./site/landing-site-add-folder.md), и в [landing.landing.addByTemplate](./page/methods/landing-landing-add-by-template.md)
- `fields.SITE_ID` — в [landing.landing.add](./page/methods/landing-landing-add.md)
- `params.filter.SITE_ID` — в фильтре [landing.landing.getList](./page/methods/landing-landing-get-list.md)

Точное имя параметра указано на странице каждого метода.

## Ограничения и особенности {#restrictions}

- Метод [landing.landing.addblock](./page/block-methods/landing-landing-add-block.md) по умолчанию возвращает идентификатор созданного блока числом, например `28597`. Если передать `fields.RETURN_CONTENT = "Y"`, метод вернет объект блока, а идентификатор будет в поле `result.id`
- Метод [landing.repo.unbind](./embedding/landing-repo-unbind.md) снимает и место встраивания, зарегистрированное через [placement.bind](../widgets/placement-bind.md), но отвечает ошибкой `PLACEMENT_NO_EXIST`: успехом он считает только снятие места, зарегистрированного через [landing.repo.bind](./embedding/landing-repo-bind.md)
- Все методы раздела, кроме [landing.repo.bind](./embedding/landing-repo-bind.md) и [landing.repo.unbind](./embedding/landing-repo-unbind.md), можно вызывать и через вебхук. Пользовательские блоки через вебхук регистрирует и удаляет только администратор портала или сайтов. Способ авторизации поможет выбрать статья [Авторизация](../../settings/how-to-call-rest-api/authorization.md)
- Общие ограничения REST API, включая время выполнения запроса и интенсивность запросов, описаны в статье [Лимиты REST API](../../limits.md)

## Обзор разделов и методов {#all-methods}

> Scope: [`landing`](../scopes/permissions.md)
>
> Кто может выполнять методы: зависит от метода

### Основные объекты

#|
|| **Раздел** | **Описание** ||
|| [Сайты](./site/index.md) | Методы создания, настройки, публикации и удаления сайтов, магазинов и папок ||
|| [Страницы](./page/index.md) | Методы работы со страницами, блоками на странице и специальными страницами ||
|| [Блоки](./block/index.md) | Методы изменения содержимого блоков: нод, карточек, атрибутов, стилей и файлов ||
|| [Шаблоны представления](./template/index.md) | Методы получения шаблонов и настройки включаемых областей сайта или страницы ||
|#

### Расширение сайтов

#|
|| **Раздел** | **Описание** ||
|| [Пользовательские блоки](./user-blocks/index.md) | Методы регистрации собственных блоков в репозитории ||
|| [Пользовательские шаблоны](./demos/index.md) | Методы добавления шаблонов в мастер создания сайтов и страниц ||
|| [Места встраивания](./embedding/index.md) | Места встраивания приложений в настройки сайта, страницы и действия блока ||
|| [Встраивание Базы знаний](./embedding/knowledge-base/index.md) | Методы привязки Баз знаний к группам и меню ||
|#

### Настройки и доступ

#|
|| **Раздел** | **Описание** ||
|| [Работа с типами сайтов и скоупами](./types.md) | Правила выбора внутреннего параметра `scope` для сайтов, магазинов, Баз знаний, главной страницы и вайба ||
|| [Права](./rights/index.md) | Методы расширенной и ролевой модели прав доступа к сайтам и магазинам ||
|#
