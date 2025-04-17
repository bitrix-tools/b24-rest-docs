# Объект Сайт: обзор методов

Объект Сайт позволяет создавать и настраивать разные веб-страницы: визитную карточку компании, интернет-магазин и многое другое.

Список всех сайтов в Битрикс24 можно получить методом [landing.site.getList](./landing-site-get-list.md). Чтобы добавить новый сайт, используйте метод [landing.site.add](./landing-site-add.md). 

> Быстрый переход: [все методы](#all-methods) 

## Структура сайта

**Страницы**. Хранят контент сайта. Управляются группой методов [landing.landing.*](../page/methods/index.md),
**Папки**. Необязательны. Используются для группировки страниц сайта и упрощают навигацию по сайту:
- создать новую папку — метод [landing.site.addFolder](./landing-site-add-folder.md),
- изменить параметры папки — метод [landing.site.updateFolder](./landing-site-update-folder.md),
- получить список всех папок — метод [landing.site.getFolders](./landing-site-get-folders.md).

{% note tip "Пользовательская документация" %}

- [Как создать многостраничный сайт](https://helpdesk.bitrix24.ru/open/7183935/)
- [Настройки сайтов и страниц](https://helpdesk.bitrix24.ru/open/6527585/)

{% endnote %}

## Связь сайтов с другими объектами

**Пользователь**. Сайт имеет привязку к пользователям по числовым идентификаторам в параметрах `CREATED_BY_ID` и `MODIFIED_BY_ID`. Получить идентификатор пользователя можно с помощью метода [user.get](../../user/user-get.md).

## Действия с сайтами

Сайты можно обновлять методом [landing.site.update](./landing-site-update.md). Метод изменяет название, описание, главную страницу, цветовую палитру и другие параметры. 

Параметры сайта можно экспортировать  в массив методом [landing.site.fullExport](./landing-site-full-export.md). Далее массив следует использовать в методе [landing.demos.register](../demos/landing-demos-register.md).

## Как опубликовать контент сайта

Чтобы сделать сайт доступным, вызовите метод  [landing.site.publication](./landing-site-publication.md). После публикации сайт получает уникальный URL, получить его можно методом [landing.site.getPublicUrl](./landing-site-get-public-url.md).

Когда необходимо опубликовать отдельную папку, используйте метод [landing.site.publicationFolder](./landing-site-publication-folder.md).

## Как снять сайт с публикации

Вы можете снять с публикации:

- весь сайт с помощью метода [landing.site.unpublic](./landing-site-unpublic.md),
- отдельную папку методом [landing.site.unPublicFolder](./landing-site-unpublic-folder.md),
- отдельную страницу методом [landing.landing.unpublic](../page/methods/landing-landing-unpublic.md).

## Как удалить папки и сайт

Отдельную папку можно переместить в корзину методом [landing.site.markFolderDelete](./landing-site-mark-folder-delete.md). Если необходимо переместить весь сайт, используйте метод [landing.site.markDelete](./landing-site-mark-delete.md). Удаленные в корзину папки и сайт можно восстановить с помощью методов [landing.site.markFolderUnDelete](./landing-site-mark-folder-undelete.md) и [landing.site.markUnDelete](./landing-site-mark-undelete.md) в течение 30 дней.

Чтобы удалить сайт без возможности восстановления, нужно использовать метод [landing.site.delete](./landing-site-delete.md). Он уничтожит сайт со всеми папками и страницами навсегда.

{% note tip "Пользовательская документация" %}

- [Отключение и удаление сайтов](https://helpdesk.bitrix24.ru/open/8233899/)

{% endnote %}

## Права на сайты

Права доступа позволяют контролировать, кто может просматривать и изменять контент сайта. Права выдает только администратор портала. Поддерживается две модели прав:  
- ролевая — права настраиваются с помощью метода [landing.role.setRights](../rights/role-model/landing-role-set-rights.md),
- расширенная — права настраиваются с помощью метода [landing.site.setRights](../rights/extended-model/landing-site-set-rights.md).

Определить модель можно методом [landing.role.isEnabled](../rights/landing-role-is-enabled.md). 


{% note tip "Пользовательская документация" %}

- [Права на сайты и магазины](https://helpdesk.bitrix24.ru/open/9375089/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** | **С версии** ||
|| [landing.site.add](./landing-site-add.md) | Добавляет сайт | ||
|| [landing.site.addFolder](./landing-site-add-folder.md) | Добавляет папку в сайт | 21.800.0 ||
|| [landing.site.delete](./landing-site-delete.md) | Удаляет сайт | ||
|| [landing.site.fullExport](./landing-site-full-export.md) | Экспортирует сайт и всего его страницы в специальный массив | ||
|| [landing.site.getFolders](./landing-site-get-folders.md) | Получает папки сайта | 21.800.0 ||
|| [landing.site.getList](./landing-site-get-list.md) | Получает список сайтов | ||
|| [landing.site.getPreview](./landing-site-get-preview.md) | Возвращает URL изображения-превью сайта | 21.800.0 ||
|| [landing.site.getPublicUrl](./landing-site-get-public-url.md) | Возвращает полный URL сайтов | 18.7.500 ||
|| [landing.site.getadditionalfields](./landing-site-get-additional-fields.md) | Получает дополнительные поля сайта | ||
|| [landing.site.markDelete](./landing-site-mark-delete.md) | Помечает сайт как удаленный | ||
|| [landing.site.markFolderDelete](./landing-site-mark-folder-delete.md) | Помечает папку как удаленную | 21.800.0 ||
|| [landing.site.markFolderUnDelete](./landing-site-mark-folder-undelete.md) | Восстанавливает папку из корзины | 21.800.0 ||
|| [landing.site.markUnDelete](./landing-site-mark-undelete.md) | Восстанавливает сайт из корзины | ||
|| [landing.site.publication](./landing-site-publication.md) | Публикует сайт и все его страницы | ||
|| [landing.site.publicationFolder](./landing-site-publication-folder.md) | Публикует папку сайта | 21.800.0 ||
|| [landing.site.unPublicFolder](./landing-site-unpublic-folder.md) | Снимает с публикации папку сайта | 21.800.0 ||
|| [landing.site.unpublic](./landing-site-unpublic.md) | Снимает с публикации сайт и все его страницы | ||
|| [landing.site.update](./landing-site-update.md) | Обновляет параметры сайта | ||
|| [landing.site.updateFolder](./landing-site-update-folder.md) | Обновляет параметры папки | 21.800.0 ||
|#