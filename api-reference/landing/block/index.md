# Объект Блоки: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Блок — это готовый фрагмент страницы сайта: обложка, текстовая колонка, форма, галерея или меню. Страница собирается из блоков, а методы `landing.block.*` читают и меняют уже размещенный блок — его контент, ноды, атрибуты, стили и карточки. Исключение — методы репозитория: они работают с шаблонами блоков до размещения, и страница им не нужна.

Например, на странице акции можно заменить заголовок и картинку, добавить карточки товаров и опубликовать страницу, не открывая визуальный редактор.

Объект Блоки — часть раздела [Сайты и магазины](../index.md).

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как создать и настроить сайт в Битрикс24](https://helpdesk.bitrix24.ru/open/25309314/)

## Как выбрать раздел

#|
|| **Если вам нужно** | **Открывайте раздел** ||
|| Прочитать или изменить блок на странице: контент, атрибуты, стили, карточки | [Работа с блоками](./methods/index.md) ||
|| Добавить блок на страницу, переместить, скрыть или удалить его | [Работа с блоками страницы](../page/block-methods/index.md) ||
|| Разобрать структуру описания блока | [Файл манифеста](./manifest.md) ||
|| Понять, как описываются редактируемые элементы блока | [Типы нод](./node-types.md) ||
|| Добавить блоку настройки, которые хранятся в DOM-атрибутах | [Атрибуты](./attributes.md) ||
|| Собрать в одном списке карточки разного вида | [Расширенное описание карточек](./extended-description.md) ||
|| Перевести подписи блока на другие языки | [Локализация блока](./localization.md) ||
|| Настроить меню, карту, поиск или CRM-форму внутри блока | [Специальные блоки](./special/index.md) ||
|| Подключить слайдер, галерею или счетчик обратного отсчета | [Интерактивные блоки](./interactive/index.md) ||
|| Добавить в Битрикс24 собственный блок из приложения | [Пользовательские блоки](../user-blocks/index.md) ||
|| Работать с блоком базы знаний или главной страницы | [Параметр scope](#scope) ||
|| Разобрать ошибку метода | [Коды ошибок раздела](#error-codes), [Коды ошибок REST](../../../error-codes.md) ||
|#

## Как начать работу с блоком

1. Получите список блоков страницы методом [landing.block.getlist](./methods/landing-block-get-list.md) с параметром `params.edit_mode = true` и найдите нужный блок по коду или названию.
2. Получите манифест блока методом [landing.block.getmanifest](./methods/landing-block-get-manifest.md) с тем же `params.edit_mode = true` и посмотрите, какие селекторы описаны в `nodes`, `cards`, `attrs` и `style`.
3. Измените блок: контент нод — методом [landing.block.updatenodes](./methods/landing-block-update-nodes.md), атрибуты — [landing.block.updateattrs](./methods/landing-block-update-attrs.md), стили — [landing.block.updateStyles](./methods/landing-block-update-styles.md), карточки — [landing.block.updateCards](./methods/landing-block-update-cards.md).
4. Опубликуйте страницу методом [landing.landing.publication](../page/methods/landing-landing-publication.md), чтобы изменения появились на опубликованной версии.

## Идентификатор блока

Методы, которые работают с блоком на странице, адресуют его парой значений: идентификатор страницы `lid` и идентификатор блока `block`. Методам [landing.block.getbyid](./methods/landing-block-get-by-id.md), [landing.block.uploadfile](./methods/landing-block-upload-file.md) и методам репозитория страница не нужна. Идентификатор страницы возвращает [landing.landing.getList](../page/methods/landing-landing-get-list.md), идентификатор блока — [landing.block.getlist](./methods/landing-block-get-list.md).

В режиме редактирования Битрикс24 хранит отдельную копию блоков страницы, и у блока черновика идентификатор свой. Поэтому перед изменением запрашивайте список блоков с параметром `params.edit_mode = true`. Идентификатор блока из опубликованной версии методам изменения не подходит: они вернут ошибку `BLOCK_NOT_FOUND`.

Режим редактирования методы чтения включают по-разному. У [landing.block.getlist](./methods/landing-block-get-list.md) и [landing.block.getmanifest](./methods/landing-block-get-manifest.md) это `params.edit_mode = true`, а у [landing.block.getcontent](./methods/landing-block-get-content.md) — отдельный параметр `editMode = true`. Если вы правите блок и хотите увидеть результат до публикации, передавайте режим редактирования в каждый вызов чтения.

## Параметр scope {#scope}

Параметр `scope` задает тип сайта, с которым работает вызов. Он не связан с REST-скоупом `landing`, который дает приложению доступ к методам раздела.

Блоки обычных сайтов и магазинов доступны без дополнительных параметров. Если же блок стоит на странице базы знаний, базы знаний группы или на главной странице Битрикс24, каждому вызову нужен параметр `scope` со значением, которое соответствует типу сайта. Типы перечислены в статье [Типы сайтов](../types.md).

Параметр задают отдельно в каждом вызове: значение не переносится с предыдущего запроса и не наследуется соседними командами внутри `batch`. Без `scope` метод работает с обычными сайтами и нужный блок не найдет.

## Связь с другими объектами

**Страница.** Блок живет на странице: без `lid` его нельзя ни прочитать, ни изменить. Размещением блока управляют методы раздела [Работа с блоками страницы](../page/block-methods/index.md): добавляет блок [landing.landing.addblock](../page/block-methods/landing-landing-add-block.md), перемещают [landing.landing.upblock](../page/block-methods/landing-landing-up-block.md) и [landing.landing.downblock](../page/block-methods/landing-landing-down-block.md), скрывает [landing.landing.hideblock](../page/block-methods/landing-landing-hide-block.md), удаляет [landing.landing.deleteblock](../page/block-methods/landing-landing-delete-block.md).

**Репозиторий блоков.** До размещения на странице блок существует как шаблон с символьным кодом, например `01.big_with_text`. Список шаблонов возвращает [landing.block.getrepository](./methods/landing-block-get-repository.md), исходный манифест по коду — [landing.block.getmanifestfile](./methods/landing-block-get-manifest-file.md), исходный HTML — [landing.block.getContentFromRepository](./methods/landing-block-get-content-from-repository.md). Этот же код передают в `landing.landing.addblock`, когда добавляют блок на страницу.

**Манифест.** Манифест описывает, какие элементы блока редактируются и какие настройки доступны в редакторе. Манифест размещенного блока возвращает [landing.block.getmanifest](./methods/landing-block-get-manifest.md), исходный манифест шаблона — [landing.block.getmanifestfile](./methods/landing-block-get-manifest-file.md). Структура файла описана в статье [Файл манифеста](./manifest.md).

**Пользовательские блоки.** Приложение может добавить в Битрикс24 собственный блок вместе с манифестом — методом [landing.repo.register](../user-blocks/landing-repo-register.md) из раздела [Пользовательские блоки](../user-blocks/index.md). Менять описание штатного блока через REST нельзя, подробнее: [Файл манифеста](./manifest.md).

## Как устроен блок

Блок выводится на странице не в исходном виде. Во время рендеринга система добавляет служебный контейнер `<div id="{anchor}" class="block-wrapper block-{code}">...</div>`.

В служебном контейнере:

- **`{anchor}`** — якорь блока. Если пользователь не менял его вручную, он имеет вид `block123`, где `123` — идентификатор блока
- **`block-wrapper`** — общий класс для всех блоков
- **`block-{code}`** — класс, зависящий от кода блока, где `code` — безопасно преобразованный код блока

## Формат ответа

Что приходит в `result`, зависит от метода:

- данные возвращают методы чтения: список блоков страницы, объект блока, его контент, манифест, список шаблонов репозитория и исходный контент шаблона
- объект с полями `id` и `src` возвращает [landing.block.uploadfile](./methods/landing-block-upload-file.md)
- остальные методы изменения возвращают `true`. Исключение — [landing.block.updatecontent](./methods/landing-block-update-content.md): если в Битрикс24 недоступен дизайнер блоков, вызов с параметром `designed = true` ничего не меняет и возвращает `null`. Доступность дизайнера определяется тарифом, а не конкретным блоком

Точное значение указано в разделе «Обработка ответа» на странице метода.

## Лимиты

Постраничной навигации в разделе нет. [landing.block.getlist](./methods/landing-block-get-list.md) возвращает все блоки страницы одним ответом, [landing.block.getrepository](./methods/landing-block-get-repository.md) — весь репозиторий, остальные методы работают с одним блоком. Полей `next` и `total` в ответе не бывает.

Если блоков на странице много, ответ `getlist` заметно растет при `params.get_content = 1`: к каждому блоку добавляются его HTML, CSS и JS.

## Права доступа

Право проверяется на уровне сайта, которому принадлежит страница:

- доступ к разделу «Сайты и магазины» нужен для любого вызова `landing.*`. Без него метод вернет `ACCESS_DENIED`
- методы чтения блока на странице дополнительно требуют право «просмотр» сайта
- методы изменения — право «редактирование» сайта

Конкретное право указано в шапке страницы каждого метода, а настраивают права методами раздела [Права доступа](../rights/index.md).

## Коды ошибок {#error-codes}

Методы раздела возвращают код ошибки в поле `error`. Чаще всего встречаются:

- `MISSING_PARAMS` — не передан обязательный параметр
- `LANDING_NOT_EXIST` — страница с идентификатором `lid` не найдена или недоступна
- `BLOCK_NOT_FOUND` — блок не найден в выбранной версии страницы. У методов репозитория такой ошибки нет: они не работают со страницей
- `ACCESS_DENIED` — у пользователя нет нужного права
- `TYPE_ERROR` — параметр передан в неподходящем формате
- `SYSTEM_ERROR` — внутренняя ошибка при выполнении метода

У отдельных методов есть свои коды: `CARD_NOT_FOUND` у [landing.block.addcard](./methods/landing-block-add-card.md), [landing.block.clonecard](./methods/landing-block-clone-card.md) и [landing.block.removecard](./methods/landing-block-remove-card.md), `NODES_NOT_FOUND` у [landing.block.updatenodes](./methods/landing-block-update-nodes.md) и [landing.block.changeNodeName](./methods/landing-block-change-node-name.md), `INCORRECT_AFFECTED` у [landing.block.updatenodes](./methods/landing-block-update-nodes.md) и только при включенной в Битрикс24 строгой проверке результата, `BAD_ANCHOR` у [landing.block.changeAnchor](./methods/landing-block-change-anchor.md), `FILE_ERROR` у [landing.block.uploadfile](./methods/landing-block-upload-file.md).

Полный перечень с кодами, специфичными для метода, приведен на странице метода. Общие ошибки REST описаны в статье [Коды ошибок](../../../error-codes.md).

## Обзор методов {#all-methods}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Чтение данных блока

#|
|| **Метод** | **Описание** ||
|| [landing.block.getlist](./methods/landing-block-get-list.md) | Получает список блоков страницы ||
|| [landing.block.getbyid](./methods/landing-block-get-by-id.md) | Получает блок по его идентификатору ||
|| [landing.block.getcontent](./methods/landing-block-get-content.md) | Получает контент блока ||
|| [landing.block.getmanifest](./methods/landing-block-get-manifest.md) | Получает манифест блока, размещенного на странице ||
|#

### Изменение блока

#|
|| **Метод** | **Описание** ||
|| [landing.block.updatenodes](./methods/landing-block-update-nodes.md) | Изменяет контент нод блока ||
|| [landing.block.updateattrs](./methods/landing-block-update-attrs.md) | Изменяет атрибуты нод блока ||
|| [landing.block.updateStyles](./methods/landing-block-update-styles.md) | Изменяет стили блока ||
|| [landing.block.updatecontent](./methods/landing-block-update-content.md) | Полностью заменяет контент блока ||
|| [landing.block.changeNodeName](./methods/landing-block-change-node-name.md) | Изменяет название тега ноды ||
|| [landing.block.changeAnchor](./methods/landing-block-change-anchor.md) | Изменяет символьный код якоря блока ||
|| [landing.block.uploadfile](./methods/landing-block-upload-file.md) | Загружает файл и привязывает его к блоку ||
|| [landing.block.publication](./methods/landing-block-publication.md) | Публикует один блок страницы ||
|#

### Карточки блока

#|
|| **Метод** | **Описание** ||
|| [landing.block.addcard](./methods/landing-block-add-card.md) | Добавляет карточку блока с измененным контентом ||
|| [landing.block.clonecard](./methods/landing-block-clone-card.md) | Клонирует карточку блока ||
|| [landing.block.updateCards](./methods/landing-block-update-cards.md) | Массово изменяет карточки блока ||
|| [landing.block.removecard](./methods/landing-block-remove-card.md) | Удаляет карточку блока ||
|#

### Репозиторий блоков

#|
|| **Метод** | **Описание** ||
|| [landing.block.getrepository](./methods/landing-block-get-repository.md) | Получает список шаблонов блоков из репозитория ||
|| [landing.block.getmanifestfile](./methods/landing-block-get-manifest-file.md) | Получает манифест шаблона блока из репозитория ||
|| [landing.block.getContentFromRepository](./methods/landing-block-get-content-from-repository.md) | Получает контент шаблона блока до его добавления на страницу ||
|#
