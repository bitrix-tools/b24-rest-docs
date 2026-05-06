# Объект Блоки: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Блоки — это основные элементы страницы сайта в Битрикс24. Например, блок может содержать текст, изображение, форму обратной связи или список новостей.

Методы `landing.block.*` управляют содержимым уже размещенных блоков и работают с шаблонами из репозитория. Можно менять текст, изображения, стили, добавлять карточки и загружать файлы.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как создать и настроить сайт в Битрикс24](https://helpdesk.bitrix24.ru/open/25309314/)

## Как работать с блоками

1. Получите список блоков страницы методом [landing.block.getlist](./landing-block-get-list.md). Для этого нужен идентификатор страницы `lid`.
2. Выберите нужный блок и получите его данные методом [landing.block.getbyid](./landing-block-get-by-id.md) или [landing.block.getcontent](./landing-block-get-content.md).
3. Внесите изменения. Используйте точечные методы (`updatenodes`, `updateattrs`) для частичного обновления или `updatecontent` для полной замены контента.
4. Если нужно добавить или изменить карточки, например элементы списка, используйте методы группы [Карточки блока](#cards).
5. Опубликуйте страницу методом [landing.landing.publication](../../page/methods/landing-landing-publication.md), чтобы изменения стали видны посетителям.

## Связь с другими объектами

**Страница.** Идентификатор страницы `lid` обязателен для всех операций. Получить его можно методом [landing.landing.getList](../../page/methods/landing-landing-get-list.md).

**Методы страницы.** Методы раздела [Блоки на странице](../../page/block-methods/index.md) добавляют, перемещают, скрывают и удаляют блоки на странице. Методы `landing.block.*` изменяют содержимое и настраивают конкретный блок.

**Манифест.** Структура блока, доступные поля и настройки описаны в манифесте. Получить манифест размещенного блока можно методом [landing.block.getmanifest](./landing-block-get-manifest.md), а шаблон из репозитория — методом [landing.block.getmanifestfile](./landing-block-get-manifest-file.md).

## Особенности работы

**Черновики.** Большинство методов изменения работают с черновиком страницы. Для опубликованных страниц используйте идентификаторы блоков из режима редактирования `edit_mode`.

**Публикация.** Изменения в черновике не видны на сайте до публикации страницы методом [landing.landing.publication](../../page/methods/landing-landing-publication.md).

**Файлы.** Метод [landing.block.uploadfile](./landing-block-upload-file.md) только загружает файл и привязывает его к блоку. Чтобы отобразить файл в контенте, дополнительно вызовите [landing.block.updatenodes](./landing-block-update-nodes.md).

**Точечное обновление.** Для изменения отдельных элементов используйте `updatenodes`, `updateattrs` или `updateStyles`. Полная замена через `updatecontent` требует передачи всего контента блока.

## Обзор методов {#all-methods}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Карточки блока {#cards}

#|
|| **Метод** | **Описание** ||
|| [landing.block.addcard](./landing-block-add-card.md) | Добавляет карточку в блок ||
|| [landing.block.clonecard](./landing-block-clone-card.md) | Клонирует карточку блока ||
|| [landing.block.updateCards](./landing-block-update-cards.md) | Массово обновляет карточки блока ||
|| [landing.block.removecard](./landing-block-remove-card.md) | Удаляет карточку из блока ||
|#

### Контент и параметры блока

#|
|| **Метод** | **Описание** ||
|| [landing.block.updatenodes](./landing-block-update-nodes.md) | Изменяет контент узлов блока ||
|| [landing.block.updateattrs](./landing-block-update-attrs.md) | Изменяет атрибуты узлов блока ||
|| [landing.block.updateStyles](./landing-block-update-styles.md) | Изменяет стили блока ||
|| [landing.block.updatecontent](./landing-block-update-content.md) | Полностью заменяет контент блока ||
|| [landing.block.changeNodeName](./landing-block-change-node-name.md) | Меняет тег узла ||
|| [landing.block.changeAnchor](./landing-block-change-anchor.md) | Изменяет якорную ссылку блока ||
|| [landing.block.uploadfile](./landing-block-upload-file.md) | Загружает и привязывает файл к блоку ||
|#

### Получение данных блока

#|
|| **Метод** | **Описание** ||
|| [landing.block.getlist](./landing-block-get-list.md) | Возвращает список блоков страницы ||
|| [landing.block.getbyid](./landing-block-get-by-id.md) | Возвращает данные блока по ID ||
|| [landing.block.getcontent](./landing-block-get-content.md) | Возвращает контент блока ||
|| [landing.block.getmanifest](./landing-block-get-manifest.md) | Возвращает манифест размещенного блока ||
|#

### Репозиторий блоков

#|
|| **Метод** | **Описание** ||
|| [landing.block.getrepository](./landing-block-get-repository.md) | Возвращает список шаблонов из репозитория ||
|| [landing.block.getmanifestfile](./landing-block-get-manifest-file.md) | Возвращает манифест шаблона из репозитория ||
|| [landing.block.getContentFromRepository](./landing-block-get-content-from-repository.md) | Возвращает контент шаблона до добавления на страницу ||
|#
