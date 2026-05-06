# Объект Блоки: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Блок — это фрагмент страницы с HTML-структурой, контентом, карточками, нодами, атрибутами и стилевыми настройками.

Методы группы позволяют:

- читать структуру и содержимое блока
- изменять состав и оформление блока
- работать с карточками и шаблонами блоков

Структура блока описана в статьях про [атрибуты](./attributes.md), [типы нод](./node-types.md), [расширенное описание карточек](./extended-description.md) и [файл манифеста](./manifest.md).

> Быстрый переход: [все методы](#all-methods)

## Как блок связан со страницей и репозиторием

Блок может существовать в двух состояниях.

**В репозитории.** Это шаблон блока, который еще не добавлен на страницу. Из репозитория можно получить список доступных блоков методом [landing.block.getrepository](./methods/landing-block-get-repository.md), прочитать манифест через [landing.block.getmanifestfile](./methods/landing-block-get-manifest-file.md) и получить исходный контент методом [landing.block.getContentFromRepository](./methods/landing-block-get-content-from-repository.md).

**На странице.** После добавления блока на страницу у него появляется собственный ID. Получить список блоков страницы можно методом [landing.block.getlist](./methods/landing-block-get-list.md), а затем работать с конкретным блоком через [landing.block.getbyid](./methods/landing-block-get-by-id.md), [landing.block.getcontent](./methods/landing-block-get-content.md), [landing.block.getmanifest](./methods/landing-block-get-manifest.md) и методы обновления.

Добавлять блоки на страницу позволяет [landing.landing.addblock](../page/block-methods/landing-landing-add-block.md), перемещать — [landing.landing.upblock](../page/block-methods/landing-landing-up-block.md) и [landing.landing.downblock](../page/block-methods/landing-landing-down-block.md), скрывать — [landing.landing.hideblock](../page/block-methods/landing-landing-hide-block.md), удалять — [landing.landing.deleteblock](../page/block-methods/landing-landing-delete-block.md).

## Как устроен блок

Блок выводится на странице не в исходном виде. Во время рендеринга система оборачивает его в служебный контейнер `<div id="anchor" class="block-wrapper block-code">...</div>`.

```html
<section class="landing-block">
    <div class="text-center g-color-gray-dark-v3 g-pa-10">
        <div class="g-width-600 mx-auto">
            <div class="landing-block-node-text g-font-size-12 ">
                <p>&copy; 2017 All right reserved. Developed by
                <a href="#" class="landing-block-node-link g-color-primary">Bitrix24</a></p>
            </div>
        </div>
    </div>
</section>
```

В этой обертке:

- **anchor** — якорь блока. Если пользователь не менял его вручную, он имеет вид `block123`, где `123` — ID блока
- **block-wrapper** — общий класс для всех блоков
- **block-code** — класс, зависящий от кода блока, где `code` — безопасно преобразованный код блока

{% note warning "" %}

В режиме редактирования система создает копии всех блоков до их публикации. Если вы обращаетесь к блоку по ID, используйте идентификатор блока из черновика страницы. Чтобы изменения появились на опубликованной странице, после редактирования опубликуйте ее методом [landing.landing.publication](../page/methods/landing-landing-publication.md).

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

### Чтение данных блока на странице

#|
|| **Метод** | **Описание** ||
|| [landing.block.getlist](./methods/landing-block-get-list.md) | Получает список блоков страницы ||
|| [landing.block.getbyid](./methods/landing-block-get-by-id.md) | Получает блок по его идентификатору ||
|| [landing.block.getcontent](./methods/landing-block-get-content.md) | Получает контент блока ||
|| [landing.block.getmanifest](./methods/landing-block-get-manifest.md) | Получает манифест блока, уже размещенного на странице ||
|#

### Изменение содержимого и параметров блока

#|
|| **Метод** | **Описание** ||
|| [landing.block.updatenodes](./methods/landing-block-update-nodes.md) | Изменяет контент нод блока ||
|| [landing.block.updateattrs](./methods/landing-block-update-attrs.md) | Изменяет атрибуты нод блока ||
|| [landing.block.updateStyles](./methods/landing-block-update-styles.md) | Изменяет стили блока ||
|| [landing.block.updatecontent](./methods/landing-block-update-content.md) | Обновляет содержимое размещенного на странице блока произвольным контентом ||
|| [landing.block.changeNodeName](./methods/landing-block-change-node-name.md) | Изменяет название тега ноды ||
|| [landing.block.changeAnchor](./methods/landing-block-change-anchor.md) | Изменяет символьный код якоря блока ||
|| [landing.block.uploadfile](./methods/landing-block-upload-file.md) | Загружает файл и привязывает его к блоку ||
|#

### Работа с карточками блока

#|
|| **Метод** | **Описание** ||
|| [landing.block.clonecard](./methods/landing-block-clone-card.md) | Клонирует карточку блока ||
|| [landing.block.addcard](./methods/landing-block-add-card.md) | Добавляет карточку блока с измененным контентом ||
|| [landing.block.removecard](./methods/landing-block-remove-card.md) | Удаляет карточку блока ||
|| [landing.block.updateCards](./methods/landing-block-update-cards.md) | Массово изменяет карточки блока ||
|#

### Работа с репозиторием блоков

#|
|| **Метод** | **Описание** ||
|| [landing.block.getrepository](./methods/landing-block-get-repository.md) | Получает список блоков из репозитория ||
|| [landing.block.getmanifestfile](./methods/landing-block-get-manifest-file.md) | Получает манифест блока из репозитория ||
|| [landing.block.getContentFromRepository](./methods/landing-block-get-content-from-repository.md) | Получает контент блока из репозитория до его добавления на страницу ||
|#
