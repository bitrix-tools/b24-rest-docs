# О REST API в сайтах

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

> Быстрый переход: [все методы](#all-methods) 

Чтобы создать полноценный сайт через REST или внести изменения в существующий, вы должны понимать, что REST копирует логику работы пользователя. То есть, например, чтобы начать менять блок, нужно его сначала добавить, если его нет на странице, а чтобы изменения увидели свет, нужно опубликовать страницу. Но давайте коротко по пунктам.

Итак, "чтобы создать сайт" нужно всего ничего:

1. Создать сайт, или выбрать один из существующих. На выходе вы будете так или иначе иметь идентификатор сайта, с которым работаете. ([Методы](./site/index.md) для работы с сайтом.)
2. Теперь дело за страницей. Аналогичным образом создаем страницу или выбираем из существующих. ([Методы](./page/index.md) для работы со страницей)
3. Блоки. Блоки это молекулы сайтов (ноды – атомы). Вы должны хорошо понимать, что такое [блок](./block/index.md), и что такое его [манифест](./block/manifest.md). Вы можете работать с блоками в понятиях страницы (добавлять, перемещать, удалять) с помощью [данных методов](./page/block-methods/index.md). А вот работать с конкретным блоком с помощью [данных методов](./block/methods/index.md).
4. Не забывайте, после всех действий страницу нужно [опубликовать](./page/methods/landing-landing-publication.md).
5. Если вам не хватает блоков, вы всегда можете [зарегистрировать новые](./demos/index.md).

Это – необходимый вам костяк для работы с блоками. Методов конечно существует намного больше и они достаточно точечны, чтобы охватить максимум ваших кейсов.

**Успехов!**

## Обзор методов {#all-methods}

### Пользовательские блоки

#|
|| **Метод** | **Описание** | **С версии** ||
|| [landing.repo.getList](./user-blocks/landing-repo-get-list.md) | Метод для получения списка блоков текущего приложения. | ||
|| [landing.repo.register](./user-blocks/landing-repo-register.md) | Метод добавления блока в репозиторий. | ||
|| [landing.repo.unregister](./user-blocks/landing-repo-unregister.md) | Метод удаления блока. | ||
|| [landing.repo.checkContent](./user-blocks/landing-repo-check-content.md) | Метод проверяет контент на опасные подстроки. | ||
|#

### Шаблоны

#|
|| **Метод** | **Описание** ||
|| [landing.template.getLandingRef](./template/landing-template-get-landing-ref.md) | Получает список включаемых областей для страницы ||
|| [landing.template.getlist](./template/landing-template-get-list.md) | Получает список шаблонов ||
|| [landing.template.getSiteRef](./template/landing-template-get-site-ref.md) | Получает список включаемых областей для сайта ||
|| [landing.template.setLandingRef](./template/landing-template-set-landing-ref.md) | Устанавливает включаемые области для страницы ||
|| [landing.template.setSiteRef](./template/landing-template-set-site-ref.md) | Устанавливает включаемые области для сайта ||
|#

### Пользовательские шаблоны

#|
|| **Метод** | **Описание** ||
|| [landing.demos.register](./demos/landing-demos-register.md) | Метод регистрирует шаблон в мастере создания сайта и страницы. ||
|| [landing.demos.unregister](./demos/landing-demos-unregister.md) | Метод удаляет зарегистрированный пользовательский шаблон. ||
|| [landing.demos.getList](./demos/landing-demos-get-list.md) | Метод для получения списка доступных пользовательских шаблонов текущего приложения. ||
|| [landing.demos.getSiteList](./demos/landing-demos-get-site-list.md) | Метод для получения списка доступных шаблонов для создания сайтов. ||
|| [landing.demos.getPageList](./demos/landing-demos-get-page-list.md) | Метод для получения списка доступных шаблонов для создания страниц. ||
|#

### Сайты

#|
|| **Метод** | **Описание** | **С версии** ||
|| [landing.site.add](./site/landing-site-add.md) | Добавляет сайт | ||
|| [landing.site.addFolder](./site/landing-site-add-folder.md) | Добавляет папку в сайт | 21.800.0 ||
|| [landing.site.delete](./site/landing-site-delete.md) | Удаляет сайт | ||
|| [landing.site.fullExport](./site/landing-site-full-export.md) | Экспортирует сайт и всего его страницы в специальный массив | ||
|| [landing.site.getFolders](./site/landing-site-get-folders.md) | Получает папки сайта | 21.800.0 ||
|| [landing.site.getList](./site/landing-site-get-list.md) | Получает список сайтов | ||
|| [landing.site.getPreview](./site/landing-site-get-preview.md) | Возвращает URL изображения-превью сайта | 21.800.0 ||
|| [landing.site.getPublicUrl](./site/landing-site-get-public-url.md) | Возвращает полный URL сайтов | 18.7.500 ||
|| [landing.site.getadditionalfields](./site/landing-site-get-additional-fields.md) | Получает дополнительные поля сайта | ||
|| [landing.site.markDelete](./site/landing-site-mark-delete.md) | Помечает сайт как удаленный | ||
|| [landing.site.markFolderDelete](./site/landing-site-mark-folder-delete.md) | Помечает папку как удаленную | 21.800.0 ||
|| [landing.site.markFolderUnDelete](./site/landing-site-mark-folder-undelete.md) | Восстанавливает папку из корзины | 21.800.0 ||
|| [landing.site.markUnDelete](./site/landing-site-mark-undelete.md) | Восстанавливает сайт из корзины | ||
|| [landing.site.publication](./site/landing-site-publication.md) | Публикует сайт и все его страницы | ||
|| [landing.site.publicationFolder](./site/landing-site-publication-folder.md) | Публикует папку сайта | 21.800.0 ||
|| [landing.site.unPublicFolder](./site/landing-site-unpublic-folder.md) | Снимает с публикации папку сайта | 21.800.0 ||
|| [landing.site.unpublic](./site/landing-site-unpublic.md) | Снимает с публикации сайт и все его страницы | ||
|| [landing.site.update](./site/landing-site-update.md) | Обновляет параметры сайта | ||
|| [landing.site.updateFolder](./site/landing-site-update-folder.md) | Обновляет параметры папки | 21.800.0 ||
|#

### Права

#|
|| **Метод** | **Описание** ||
|| [landing.role.enable](./rights/landing-role-enable.md) | Переключает модели ||
|| [landing.role.isEnabled](./rights/landing-role-is-enabled.md) | Определяет модели прав ||
|#

#### Расширенная модель прав

#|
|| **Метод** | **Описание** ||
|| [landing.site.getRights](./rights/extended-model/landing-site-get-rights.md) | Метод вернет права текущего пользователя. ||
|| [landing.site.setRights](./rights/extended-model/landing-site-set-rights.md) | Устанавливает права доступа для сайта. ||
|#

#### Ролевая модель прав

#|
|| **Метод** | **Описание** ||
|| [landing.role.getList](./rights/role-model/landing-role-get-list.md) | Метод позволяет получить список ролей. ||
|| [landing.role.getRights](./rights/role-model/landing-role-get-rights.md) | Метод позволяет получить список сайтов, права на которые установлены в рамках роли. ||
|| [landing.role.setAccessCodes](./rights/role-model/landing-role-set-access-codes.md) | Метод устанавливает для роли коды доступа, для которых будет действовать данная роль. ||
|| [landing.role.setRights](./rights/role-model/landing-role-set-rights.md) | Метод устанавливает необходимые права в рамках роли для списков сайта. ||
|#

### Страницы

#|
|| **Метод** | **Описание** | **С версии** ||
|| [landing.landing.add](./page/methods/landing-landing-add.md) | Метод для добавления страницы. | ||
|| [landing.landing.addByTemplate](./page/methods/landing-landing-add-by-template.md) | Метод для добавления Страницы по шаблону. | ||
|| [landing.landing.copy](./page/methods/landing-landing-copy.md) | Метод копирует указанную страницу. | ||
|| [landing.landing.delete](./page/methods/landing-landing-delete.md) | Метод для удаления страницы. | ||
|| [landing.landing.getadditionalfields](./page/methods/landing-landing-get-additional-fields.md) | Метод для получения дополнительных полей страницы | ||
|| [landing.landing.getlist](./page/methods/landing-landing-get-list.md) | Метод для получения списка страниц. | ||
|| [landing.landing.getpreview](./page/methods/landing-landing-get-preview.md) | Метод возвращает путь до превью страницы. | ||
|| [landing.landing.getpublicurl](./page/methods/landing-landing-get-public-url.md) | Метод возвращает веб-адрес страницы. | ||
|| [landing.landing.markDelete](./page/methods/landing-landing-mark-delete.md) | Метод помечает страницу как удаленную. | ||
|| [landing.landing.markUnDelete](./page/methods/landing-landing-mark-undelete.md) | Метод помечает страницу как не удаленную. | ||
|| [landing.landing.move](./page/methods/landing-landing-move.md) | Метод перемещает страницу в другой сайт и/или папку. | 21.800.0 ||
|| [landing.landing.publication](./page/methods/landing-landing-publication.md) | Метод для публикации страницы. | ||
|| [landing.landing.removeEntities](./page/methods/landing-landing-remove-entities.md) | Метод удаляет связанные сущности лендинга. | ||
|| [landing.landing.resolveIdByPublicUrl](./page/methods/landing-landing-resolve-id-by-public-url.md) | Метод по переданному относительному URL страницы возвращает идентификатор страницы. | 21.800.0 ||
|| [landing.landing.unpublic](./page/methods/landing-landing-unpublic.md) | Метод для снятия с публикации страницы. | ||
|| [landing.landing.update](./page/methods/landing-landing-update.md) | Метод для изменения страницы. | ||
|#

#### Работа с блоками на странице

#|
|| **Метод** | **Описание** | **С версии** ||
|| [landing.landing.addblock](./page/block-methods/landing-landing-add-block.md) | Метод для добавление нового блока на страницу. | ||
|| [landing.landing.copyblock](./page/block-methods/landing-landing-copy-block.md) | Метод для копирования блока со страницы на страницу. | ||
|| [landing.landing.deleteblock](./page/block-methods/landing-landing-delete-block.md) | Метод для удаление блока со страницы. | ||
|| [landing.landing.downblock](./page/block-methods/landing-landing-down-block.md) | Метод для опускания блока на одну позицию вниз на странице. | ||
|| [landing.landing.favoriteBlock](./page/block-methods/landing-landing-favorite-block.md) | Метод сохраняет имеющийся на странице блок в «Мои блоки». | 21.800.0 ||
|| [landing.landing.hideblock](./page/block-methods/landing-landing-hide-block.md) | Метод скрывает блок со страницы. | ||
|| [landing.landing.markdeletedblock](./page/block-methods/landing-landing-mark-deleted-block.md) | Метод помечает блок как удаленный, но не удаляет его физически. | ||
|| [landing.landing.markundeletedblock](./page/block-methods/landing-landing-mark-undeleted-block.md) | Метод восстанавливает блок из помеченных как удаленный | ||
|| [landing.landing.moveblock](./page/block-methods/landing-landing-move-block.md) | Метод для переноса блока со страницы на страницу. | ||
|| [landing.landing.showblock](./page/block-methods/landing-landing-show-block.md) | Метод для показа блока со странице. | ||
|| [landing.landing.unFavoriteBlock](./page/block-methods/landing-landing-unfavorite-block.md) | Метод удаляет блок, который был сохранен в «Мои блоки». | 21.800.0 ||
|| [landing.landing.upblock](./page/block-methods/landing-landing-up-block.md) | Метод для поднятия блока на одну позицию вверх на странице. | ||
|#

#### Специальные страницы

#|
|| **Метод** | **Описание** ||
|| [landing.syspage.deleteForLanding](./page/special-pages/landing-syspage-delete-for-landing.md) | Удаляет все упоминания страницы как специальной ||
|| [landing.syspage.deleteForSite](./page/special-pages/landing-syspage-delete-for-site.md) | Удаляет все специальные страницы ||
|| [landing.syspage.getSpecialPage](./page/special-pages/landing-syspage-get-special-page.md) | Получает адрес специальной страницы сайта ||
|| [landing.syspage.get](./page/special-pages/landing-syspage-get.md) | Получает список специальных страниц ||
|| [landing.syspage.set](./page/special-pages/landing-syspage-set.md) | Устанавливает специальную страницу для сайта ||
|#

### Блоки

#|
|| **Метод** | **Описание** | **С версии** ||
|| [landing.block.clonecard](./block/methods/landing-block-clone-card.md) | Метод для клонирования карточки блока. | ||
|| [landing.block.removecard](./block/methods/landing-block-remove-card.md) | Метод для удаления блока | ||
|| [landing.block.updatenodes](./block/methods/landing-block-update-nodes.md) | Метод для изменения контента блока. | ||
|| [landing.block.changeNodeName](./block/methods/landing-block-change-node-name.md) | Метод изменяет название тега. | ||
|| [landing.block.updateattrs](./block/methods/landing-block-update-attrs.md) | Метод для изменения атрибутов ноды блока. | ||
|| [landing.block.updateStyles](./block/methods/landing-block-update-styles.md) | Метод для изменения стилей блока. | ||
|| [landing.block.getcontent](./block/methods/landing-block-get-content.md) | Метод для получения контента блока. | ||
|| [landing.block.getlist](./block/methods/landing-block-get-list.md) | Метод для получение списка блоков страницы. | ||
|| [landing.block.getbyid](./block/methods/landing-block-get-by-id.md) | Метод для получения блока по его идентификатору. | ||
|| [landing.block.getmanifest](./block/methods/landing-block-get-manifest.md) | Метод для получения манифеста конкретного блока, уже размещенного на странице. | ||
|| [landing.block.getmanifestfile](./block/methods/landing-block-get-manifest-file.md) | Метод для получения манифеста блока из репозитория. | ||
|| [landing.block.getrepository](./block/methods/landing-block-get-repository.md) | Метод возвращает список блоков из репозитория. | ||
|| [landing.block.uploadfile](./block/methods/landing-block-upload-file.md) | Метод загружает картинку и привязывает ее к указанному блоку. | ||
|| [landing.block.updatecontent](./block/methods/landing-block-update-content.md) | Метод обновляет содержимое уже размещенного на странице блока на любой произвольный. | ||
|| [landing.block.addcard](./block/methods/landing-block-add-card.md) | Метод полностью повторяет работу [landing.block.clonecard](./block/methods/landing-block-clone-card.md) но дает возможность вставить карточку сразу с измененным контентом. | ||
|| [landing.block.updateCards](./block/methods/landing-block-update-cards.md) | Метод для массового изменения карточек блока. | ||
|| [landing.block.changeAnchor](./block/methods/landing-block-change-anchor.md) | Метод изменяет символьный код якоря. | ||
|| [landing.block.getContentFromRepository](./block/methods/landing-block-get-content-from-repository.md) | Метод получает контент блока из репозитория «как есть» до добавления блока на какую-либо страницу. | 18.7.500 ||
|#

### Встраивание Базы знаний

#|
|| **Метод** | **Описание** ||
|| [landing.site.bindingToGroup](./embedding/knowledge-base/landing-site-binding-to-group.md) | Привязывает к группе Социальной сети ||
|| [landing.site.bindingToMenu](./embedding/knowledge-base/landing-site-binding-to-menu.md) | Встраивает в меню ||
|| [landing.site.getGroupBindings](./embedding/knowledge-base/landing-site-get-group-bindings.md) | Получает привязки к группам ||
|| [landing.site.getMenuBindings](./embedding/knowledge-base/landing-site-get-menu-bindings.md) | Получает список привязок в меню ||
|| [landing.site.unbindingFromGroup](./embedding/knowledge-base/landing-site-unbinding-from-group.md) | Удаляет привязку к группе Социальной сети ||
|| [landing.site.unbindingFromMenu](./embedding/knowledge-base/landing-site-unbinding-from-menu.md) | Удаляет из меню ||
|#

