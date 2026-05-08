# Сайты и магазины: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Методы группы `landing` создают и настраивают сайты, магазины, страницы и блоки. С их помощью управляют публикацией, шаблонами, правами доступа и местами встраивания приложений.

Порядок вызовов похож на работу в редакторе сайтов: сначала создают или выбирают сайт, затем страницу, добавляют блоки, настраивают содержимое и публикуют результат.

> Быстрый переход: [все методы](#all-methods)
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
|| Получить идентификатор уже размещенного блока | [landing.block.getList](./block/methods/landing-block-get-list.md) с `params.edit_mode = true` ||
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

Места встраивания позволяют добавить приложение в интерфейс сайтов и страниц. Приложение может открываться из настроек сайта или страницы и из действий редактирования блока.

**Настройки сайта или страницы.** Место встраивания [LANDING_SETTINGS](./embedding/settings.md) добавляет пункт приложения в меню настроек сайта или страницы. В обработчик передаются идентификаторы сайта и страницы в `PLACEMENT_OPTIONS`.

**Действия с блоком.** Место встраивания [LANDING_BLOCK_*](./embedding/block.md) добавляет пункт приложения в меню действий блока. В обработчик передаются идентификатор блока, код блока и идентификатор страницы.

**База знаний.** Привязка Базы знаний к меню или группе описана в подразделе [Встраивание Базы знаний](./embedding/knowledge-base/index.md). Этими привязками управляют методы `landing.site.*`, потому что База знаний представлена как отдельный сайт.

В модуле `landing` места встраивания регистрируют внутренним методом `landing.repo.bind`, а не [placement.bind](../widgets/placement-bind.md). Удалить место встраивания текущего приложения можно методом [landing.repo.unbind](./embedding/landing-repo-unbind.md).

## Типы сайтов и scope

Методы группы `landing` работают с разными типами сайтов: обычными сайтами, магазинами, служебными сайтами Сайты24, Базами знаний, Базами знаний групп, главной страницей и вайбом. Для некоторых типов нужно передавать параметр `scope` в корне запроса.

Этот параметр не связан со скоупом доступа [`landing`](../scopes/permissions.md), который вы выдаете приложению или вебхуку. Правила выбора значения `scope` и примеры запросов описаны в статье [Работа с типами сайтов и скоупами](./types.md).

## Ключевые идентификаторы

#|
|| **Идентификатор** | **Где используется** | **Как получить** ||
|| `SITE_ID` или `siteId` | Методы страниц, папок, прав, шаблонов, публикации сайта и привязок Базы знаний | Из результата [landing.site.add](./site/landing-site-add.md) или [landing.site.getList](./site/landing-site-get-list.md) ||
|| `LID` или `lid` | Методы страниц, блоков, публикации страницы и места встраивания `LANDING_SETTINGS` | Из результата [landing.landing.add](./page/methods/landing-landing-add.md), [landing.landing.addByTemplate](./page/methods/landing-landing-add-by-template.md), [landing.landing.copy](./page/methods/landing-landing-copy.md) или [landing.landing.getList](./page/methods/landing-landing-get-list.md) ||
|| `FOLDER_ID`, `PARENT_ID` или `ID` папки | Размещение страниц в папках и управление структурой сайта | Из результата [landing.site.addFolder](./site/landing-site-add-folder.md) или [landing.site.getFolders](./site/landing-site-get-folders.md) ||
|| `ID` блока | Изменение, перемещение, копирование, скрытие и удаление блока на странице | Из результата [landing.landing.addblock](./page/block-methods/landing-landing-add-block.md) или [landing.block.getlist](./block/methods/landing-block-get-list.md) с `params.edit_mode = true`, если нужен блок из черновика ||
|| `CODE` блока | Добавление стандартного или пользовательского блока на страницу | Из [landing.block.getrepository](./block/methods/landing-block-get-repository.md) или после регистрации блока методом [landing.repo.register](./user-blocks/landing-repo-register.md) ||
|#

## Обзор методов {#all-methods}

> Scope: [`landing`](../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

### Пользовательские блоки

#|
|| **Метод** | **Описание** ||
|| [landing.repo.register](./user-blocks/landing-repo-register.md) | Регистрирует пользовательский блок в репозитории ||
|| [landing.repo.checkContent](./user-blocks/landing-repo-check-content.md) | Проверяет контент блока через санитайзер ||
|| [landing.repo.getList](./user-blocks/landing-repo-get-list.md) | Получает список пользовательских блоков из репозитория ||
|| [landing.repo.unregister](./user-blocks/landing-repo-unregister.md) | Удаляет пользовательский блок из репозитория по его коду ||
|#

### Шаблоны представления

#|
|| **Метод** | **Описание** ||
|| [landing.template.getlist](./template/landing-template-get-list.md) | Получает список шаблонов представления ||
|| [landing.template.getSiteRef](./template/landing-template-get-site-ref.md) | Получает список включаемых областей для сайта ||
|| [landing.template.setSiteRef](./template/landing-template-set-site-ref.md) | Устанавливает включаемые области для сайта ||
|| [landing.template.getLandingRef](./template/landing-template-get-landing-ref.md) | Получает список включаемых областей для страницы ||
|| [landing.template.setLandingRef](./template/landing-template-set-landing-ref.md) | Устанавливает включаемые области для страницы ||
|#

### Пользовательские шаблоны

#|
|| **Метод** | **Описание** ||
|| [landing.demos.register](./demos/landing-demos-register.md) | Регистрирует шаблон в мастере создания сайта и страницы ||
|| [landing.demos.getList](./demos/landing-demos-get-list.md) | Получает список зарегистрированных шаблонов ||
|| [landing.demos.getSiteList](./demos/landing-demos-get-site-list.md) | Получает список шаблонов для создания сайтов ||
|| [landing.demos.getPageList](./demos/landing-demos-get-page-list.md) | Получает список шаблонов для создания страниц ||
|| [landing.demos.unregister](./demos/landing-demos-unregister.md) | Удаляет зарегистрированный пользовательский шаблон ||
|#

### Сайты

#|
|| **Метод** | **Описание** ||
|| [landing.site.add](./site/landing-site-add.md) | Добавляет сайт ||
|| [landing.site.addFolder](./site/landing-site-add-folder.md) | Добавляет папку в сайт ||
|| [landing.site.update](./site/landing-site-update.md) | Обновляет параметры сайта ||
|| [landing.site.updateFolder](./site/landing-site-update-folder.md) | Обновляет параметры папки ||
|| [landing.site.getList](./site/landing-site-get-list.md) | Получает список сайтов ||
|| [landing.site.getFolders](./site/landing-site-get-folders.md) | Получает папки сайта ||
|| [landing.site.getPreview](./site/landing-site-get-preview.md) | Возвращает URL превью сайта ||
|| [landing.site.getPublicUrl](./site/landing-site-get-public-url.md) | Возвращает публичный URL сайта ||
|| [landing.site.getadditionalfields](./site/landing-site-get-additional-fields.md) | Получает дополнительные поля сайта ||
|| [landing.site.publication](./site/landing-site-publication.md) | Публикует сайт и все его страницы ||
|| [landing.site.publicationFolder](./site/landing-site-publication-folder.md) | Публикует папку сайта ||
|| [landing.site.unpublic](./site/landing-site-unpublic.md) | Снимает с публикации сайт и все его страницы ||
|| [landing.site.unPublicFolder](./site/landing-site-unpublic-folder.md) | Снимает с публикации папку сайта ||
|| [landing.site.markDelete](./site/landing-site-mark-delete.md) | Помечает сайт как удаленный ||
|| [landing.site.markFolderDelete](./site/landing-site-mark-folder-delete.md) | Помечает папку как удаленную ||
|| [landing.site.markFolderUnDelete](./site/landing-site-mark-folder-undelete.md) | Восстанавливает папку из корзины ||
|| [landing.site.markUnDelete](./site/landing-site-mark-undelete.md) | Восстанавливает сайт из корзины ||
|| [landing.site.delete](./site/landing-site-delete.md) | Удаляет сайт ||
|| [landing.site.fullExport](./site/landing-site-full-export.md) | Экспортирует сайт и его страницы в массив ||
|#

### Права

#|
|| **Метод** | **Описание** ||
|| [landing.role.enable](./rights/landing-role-enable.md) | Включает или выключает ролевую модель прав ||
|| [landing.role.isEnabled](./rights/landing-role-is-enabled.md) | Проверяет, включена ли ролевая модель прав ||
|#

#### Расширенная модель прав

#|
|| **Метод** | **Описание** ||
|| [landing.site.getRights](./rights/extended-model/landing-site-get-rights.md) | Получает права текущего пользователя для сайта ||
|| [landing.site.setRights](./rights/extended-model/landing-site-set-rights.md) | Устанавливает права доступа для сайта ||
|#

#### Ролевая модель прав

#|
|| **Метод** | **Описание** ||
|| [landing.role.getList](./rights/role-model/landing-role-get-list.md) | Получает список ролей текущего типа сайтов ||
|| [landing.role.getRights](./rights/role-model/landing-role-get-rights.md) | Возвращает права роли по сайтам ||
|| [landing.role.setAccessCodes](./rights/role-model/landing-role-set-access-codes.md) | Задает коды доступа для роли ||
|| [landing.role.setRights](./rights/role-model/landing-role-set-rights.md) | Устанавливает права роли по сайтам ||
|#

### Страницы

#|
|| **Метод** | **Описание** ||
|| [landing.landing.add](./page/methods/landing-landing-add.md) | Добавляет страницу ||
|| [landing.landing.addByTemplate](./page/methods/landing-landing-add-by-template.md) | Создает страницу по шаблону ||
|| [landing.landing.copy](./page/methods/landing-landing-copy.md) | Копирует страницу ||
|| [landing.landing.update](./page/methods/landing-landing-update.md) | Изменяет параметры страницы ||
|| [landing.landing.move](./page/methods/landing-landing-move.md) | Перемещает страницу в другой сайт или папку ||
|| [landing.landing.getList](./page/methods/landing-landing-get-list.md) | Получает список страниц ||
|| [landing.landing.getadditionalfields](./page/methods/landing-landing-get-additional-fields.md) | Получает дополнительные поля страницы ||
|| [landing.landing.getpreview](./page/methods/landing-landing-get-preview.md) | Возвращает путь к превью страницы ||
|| [landing.landing.getpublicurl](./page/methods/landing-landing-get-public-url.md) | Возвращает публичный URL страницы ||
|| [landing.landing.resolveIdByPublicUrl](./page/methods/landing-landing-resolve-id-by-public-url.md) | Возвращает идентификатор страницы по публичному URL ||
|| [landing.landing.publication](./page/methods/landing-landing-publication.md) | Публикует страницу ||
|| [landing.landing.unpublic](./page/methods/landing-landing-unpublic.md) | Снимает страницу с публикации ||
|| [landing.landing.markDelete](./page/methods/landing-landing-mark-delete.md) | Помечает страницу как удаленную ||
|| [landing.landing.markUnDelete](./page/methods/landing-landing-mark-undelete.md) | Восстанавливает страницу из удаленных ||
|| [landing.landing.removeEntities](./page/methods/landing-landing-remove-entities.md) | Удаляет блоки и изображения страницы ||
|| [landing.landing.delete](./page/methods/landing-landing-delete.md) | Удаляет страницу ||
|#

#### Работа с блоками на странице

#|
|| **Метод** | **Описание** ||
|| [landing.landing.addblock](./page/block-methods/landing-landing-add-block.md) | Добавляет новый блок на страницу ||
|| [landing.landing.copyblock](./page/block-methods/landing-landing-copy-block.md) | Копирует блок со страницы на страницу ||
|| [landing.landing.deleteblock](./page/block-methods/landing-landing-delete-block.md) | Удаляет блок со страницы ||
|| [landing.landing.downblock](./page/block-methods/landing-landing-down-block.md) | Опускает блок на одну позицию вниз ||
|| [landing.landing.favoriteBlock](./page/block-methods/landing-landing-favorite-block.md) | Сохраняет блок в «Мои блоки» ||
|| [landing.landing.hideblock](./page/block-methods/landing-landing-hide-block.md) | Скрывает блок на странице ||
|| [landing.landing.markdeletedblock](./page/block-methods/landing-landing-mark-deleted-block.md) | Помечает блок как удаленный без физического удаления ||
|| [landing.landing.markundeletedblock](./page/block-methods/landing-landing-mark-undeleted-block.md) | Восстанавливает блок из удаленных ||
|| [landing.landing.moveblock](./page/block-methods/landing-landing-move-block.md) | Перемещает блок со страницы на страницу ||
|| [landing.landing.showblock](./page/block-methods/landing-landing-show-block.md) | Показывает блок на странице ||
|| [landing.landing.unFavoriteBlock](./page/block-methods/landing-landing-unfavorite-block.md) | Удаляет блок из «Моих блоков» ||
|| [landing.landing.upblock](./page/block-methods/landing-landing-up-block.md) | Поднимает блок на одну позицию вверх ||
|#

#### Специальные страницы

#|
|| **Метод** | **Описание** ||
|| [landing.syspage.deleteForLanding](./page/special-pages/landing-syspage-delete-for-landing.md) | Удаляет привязки страницы как специальной ||
|| [landing.syspage.deleteForSite](./page/special-pages/landing-syspage-delete-for-site.md) | Удаляет все специальные страницы сайта ||
|| [landing.syspage.getSpecialPage](./page/special-pages/landing-syspage-get-special-page.md) | Получает адрес специальной страницы сайта ||
|| [landing.syspage.get](./page/special-pages/landing-syspage-get.md) | Получает список специальных страниц ||
|| [landing.syspage.set](./page/special-pages/landing-syspage-set.md) | Назначает специальную страницу для сайта ||
|#

### Блоки

#|
|| **Метод** | **Описание** ||
|| [landing.block.getlist](./block/methods/landing-block-get-list.md) | Получает список блоков страницы ||
|| [landing.block.getbyid](./block/methods/landing-block-get-by-id.md) | Получает блок по его идентификатору ||
|| [landing.block.getcontent](./block/methods/landing-block-get-content.md) | Получает контент блока ||
|| [landing.block.getmanifest](./block/methods/landing-block-get-manifest.md) | Получает манифест блока, уже размещенного на странице ||
|| [landing.block.updatenodes](./block/methods/landing-block-update-nodes.md) | Изменяет контент нод блока ||
|| [landing.block.updateattrs](./block/methods/landing-block-update-attrs.md) | Изменяет атрибуты нод блока ||
|| [landing.block.updateStyles](./block/methods/landing-block-update-styles.md) | Изменяет стили блока ||
|| [landing.block.updatecontent](./block/methods/landing-block-update-content.md) | Обновляет содержимое размещенного на странице блока произвольным контентом ||
|| [landing.block.changeNodeName](./block/methods/landing-block-change-node-name.md) | Изменяет название тега ноды ||
|| [landing.block.changeAnchor](./block/methods/landing-block-change-anchor.md) | Изменяет символьный код якоря блока ||
|| [landing.block.uploadfile](./block/methods/landing-block-upload-file.md) | Загружает файл и привязывает его к блоку ||
|| [landing.block.clonecard](./block/methods/landing-block-clone-card.md) | Клонирует карточку блока ||
|| [landing.block.addcard](./block/methods/landing-block-add-card.md) | Добавляет карточку блока с измененным контентом ||
|| [landing.block.removecard](./block/methods/landing-block-remove-card.md) | Удаляет карточку блока ||
|| [landing.block.updateCards](./block/methods/landing-block-update-cards.md) | Массово изменяет карточки блока ||
|| [landing.block.getrepository](./block/methods/landing-block-get-repository.md) | Получает список блоков из репозитория ||
|| [landing.block.getmanifestfile](./block/methods/landing-block-get-manifest-file.md) | Получает манифест блока из репозитория ||
|| [landing.block.getContentFromRepository](./block/methods/landing-block-get-content-from-repository.md) | Получает контент блока из репозитория до его добавления на страницу ||
|#

### Места встраивания

#|
|| **Метод или место встраивания** | **Описание** ||
|| [LANDING_SETTINGS](./embedding/settings.md) | Добавляет пункт приложения в меню настроек сайта или страницы ||
|| [LANDING_BLOCK_*](./embedding/block.md) | Добавляет пункт приложения в действия редактирования блока ||
|| [landing.repo.unbind](./embedding/landing-repo-unbind.md) | Удаляет место встраивания текущего приложения ||
|#

#### Встраивание Базы знаний

#|
|| **Метод** | **Описание** ||
|| [landing.site.bindingToGroup](./embedding/knowledge-base/landing-site-binding-to-group.md) | Привязывает Базу знаний к группе Социальной сети ||
|| [landing.site.bindingToMenu](./embedding/knowledge-base/landing-site-binding-to-menu.md) | Привязывает Базу знаний к меню ||
|| [landing.site.getGroupBindings](./embedding/knowledge-base/landing-site-get-group-bindings.md) | Получает привязки Баз знаний к группам ||
|| [landing.site.getMenuBindings](./embedding/knowledge-base/landing-site-get-menu-bindings.md) | Получает привязки Баз знаний к меню ||
|| [landing.site.unbindingFromGroup](./embedding/knowledge-base/landing-site-unbinding-from-group.md) | Отвязывает Базу знаний от группы Социальной сети ||
|| [landing.site.unbindingFromMenu](./embedding/knowledge-base/landing-site-unbinding-from-menu.md) | Отвязывает Базу знаний от меню ||
|#
