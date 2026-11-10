# Работа с блоками: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Методы `landing.block.*` читают и меняют блок, который уже стоит на странице сайта: его контент, ноды, атрибуты, стили и карточки. Отдельная группа методов работает с шаблонами блоков из репозитория — до того, как блок добавлен на страницу.

Например, можно заменить текст и картинку в блоке обложки, добавить карточку в список услуг и загрузить новое изображение.

Блок описан в разделе [Объект Блоки](../index.md), там же собраны статьи о манифесте, нодах, карточках и атрибутах.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как создать и настроить сайт в Битрикс24](https://helpdesk.bitrix24.ru/open/25309314/)

## Как изменить блок

1. Получите идентификатор страницы `lid` методом [landing.landing.getList](../../page/methods/landing-landing-get-list.md).
2. Получите список блоков страницы методом [landing.block.getlist](./landing-block-get-list.md) с параметром `params.edit_mode = true`. Так вернутся идентификаторы блоков черновика — именно они нужны методам изменения.
3. Посмотрите, что в блоке можно менять: манифест вернет [landing.block.getmanifest](./landing-block-get-manifest.md) с параметром `params.edit_mode = true`, текущий HTML — [landing.block.getcontent](./landing-block-get-content.md) с параметром `editMode = true`. Режим редактирования у этих методов задается по-разному: у `getmanifest` это `params.edit_mode`, у `getcontent` — отдельный параметр `editMode`. Без него метод вернет опубликованную версию блока.
4. Измените блок подходящим методом из таблицы ниже.
5. Опубликуйте страницу методом [landing.landing.publication](../../page/methods/landing-landing-publication.md), чтобы изменения стали видны посетителям.

## Как выбрать метод {#how-to-choose}

#|
|| **Если вам нужно** | **Используйте метод** ||
|| Найти блоки на странице и узнать их идентификаторы | [landing.block.getlist](./landing-block-get-list.md) ||
|| Получить данные одного блока по его идентификатору | [landing.block.getbyid](./landing-block-get-by-id.md) ||
|| Посмотреть текущий HTML блока | [landing.block.getcontent](./landing-block-get-content.md) ||
|| Узнать, какие селекторы и настройки доступны у блока | [landing.block.getmanifest](./landing-block-get-manifest.md) ||
|| Заменить текст, изображение или ссылку в блоке | [landing.block.updatenodes](./landing-block-update-nodes.md) ||
|| Изменить значение настройки, которая хранится в DOM-атрибуте | [landing.block.updateattrs](./landing-block-update-attrs.md) ||
|| Поменять оформление блока или отдельного элемента | [landing.block.updateStyles](./landing-block-update-styles.md) ||
|| Заменить весь HTML блока целиком | [landing.block.updatecontent](./landing-block-update-content.md) ||
|| Добавить, скопировать или удалить элемент повторяемого списка | Методы группы [Карточки блока](#cards) ||
|| Загрузить в блок новое изображение | [landing.block.uploadfile](./landing-block-upload-file.md), затем [landing.block.updatenodes](./landing-block-update-nodes.md) ||
|| Сменить тег ноды, например `h2` на `h3` | [landing.block.changeNodeName](./landing-block-change-node-name.md) ||
|| Сменить якорь блока для ссылок на странице | [landing.block.changeAnchor](./landing-block-change-anchor.md) ||
|| Опубликовать один блок, не публикуя остальные правки страницы | [landing.block.publication](./landing-block-publication.md) ||
|| Найти подходящий шаблон блока до его добавления на страницу | [landing.block.getrepository](./landing-block-get-repository.md) ||
|| Посмотреть исходный манифест или HTML шаблона блока | [landing.block.getmanifestfile](./landing-block-get-manifest-file.md), [landing.block.getContentFromRepository](./landing-block-get-content-from-repository.md) ||
|#

Селекторы для всех методов изменения берут из манифеста блока: ноды описаны в статье [Типы нод](../node-types.md), атрибуты — в статье [Атрибуты](../attributes.md), карточки и пресеты — в статье [Расширенное описание карточек](../extended-description.md), переводы подписей — в статье [Локализация блока](../localization.md).

Точечные методы меняют только переданные селекторы, поэтому им не нужен полный HTML блока. Метод [landing.block.updatecontent](./landing-block-update-content.md) заменяет контент целиком: все, что не передано в запросе, из блока пропадет. Если в Битрикс24 недоступен дизайнер блоков — это ограничение тарифа, а не свойство конкретного блока, — вызов с параметром `designed = true` ничего не меняет и возвращает `null`.

Метод [landing.block.uploadfile](./landing-block-upload-file.md) только загружает файл и привязывает его к блоку. Чтобы изображение появилось в блоке, подставьте полученный `src` в нужную ноду методом [landing.block.updatenodes](./landing-block-update-nodes.md).

## Связь с другими объектами

**Страница.** Идентификатор страницы `lid` нужен всем методам, которые работают с блоком на странице. Получить его можно методом [landing.landing.getList](../../page/methods/landing-landing-get-list.md). Изменения сохраняются в черновике страницы и появляются на сайте только после вызова [landing.landing.publication](../../page/methods/landing-landing-publication.md).

**Размещение блока.** Методы раздела [Работа с блоками страницы](../../page/block-methods/index.md) добавляют блок на страницу, перемещают, скрывают и удаляют его. Методы `landing.block.*` размещением не управляют — они меняют уже добавленный блок.

**Манифест.** Какие селекторы можно передать в методы изменения, определяет манифест блока. Манифест размещенного блока возвращает [landing.block.getmanifest](./landing-block-get-manifest.md), структура файла разобрана в статье [Файл манифеста](../manifest.md).

**Репозиторий блоков.** До добавления на страницу блок существует как шаблон с символьным кодом, например `01.big_with_text`. Как устроен репозиторий и какими методами его читают, описано на странице [Объект Блоки](../index.md).

## Общие правила раздела

Правила одинаковы для всех методов `landing.block.*` и подробно разобраны на странице [Объект Блоки](../index.md):

- **Права.** Доступ к разделу «Сайты и магазины» нужен для любого вызова, а на уровне сайта чтение требует права «просмотр», изменение — «редактирование». Точная формулировка есть в шапке каждого метода
- **Параметр `scope`.** Для блоков баз знаний, баз знаний групп и главной страницы Битрикс24 его передают в каждом вызове, иначе метод не найдет блок
- **Лимиты.** Постраничной навигации нет: `getlist` отдает все блоки страницы, `getrepository` — весь репозиторий
- **Формат ответа.** Методы чтения возвращают данные, [landing.block.uploadfile](./landing-block-upload-file.md) — объект с полями `id` и `src`, остальные методы изменения — `true`. Единственное исключение у `updatecontent` описано в разделе [Как выбрать метод](#how-to-choose)
- **Коды ошибок.** Чаще всего встречаются `ACCESS_DENIED`, `MISSING_PARAMS`, `LANDING_NOT_EXIST` и `BLOCK_NOT_FOUND`. Точный перечень для каждого метода — на его странице, общие ошибки REST — в статье [Коды ошибок](../../../../error-codes.md)

## Обзор методов {#all-methods}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Чтение данных блока

#|
|| **Метод** | **Описание** ||
|| [landing.block.getlist](./landing-block-get-list.md) | Получает список блоков страницы ||
|| [landing.block.getbyid](./landing-block-get-by-id.md) | Получает блок по его идентификатору ||
|| [landing.block.getcontent](./landing-block-get-content.md) | Получает контент блока ||
|| [landing.block.getmanifest](./landing-block-get-manifest.md) | Получает манифест блока, размещенного на странице ||
|#

### Изменение блока

#|
|| **Метод** | **Описание** ||
|| [landing.block.updatenodes](./landing-block-update-nodes.md) | Изменяет контент нод блока ||
|| [landing.block.updateattrs](./landing-block-update-attrs.md) | Изменяет атрибуты нод блока ||
|| [landing.block.updateStyles](./landing-block-update-styles.md) | Изменяет стили блока ||
|| [landing.block.updatecontent](./landing-block-update-content.md) | Полностью заменяет контент блока ||
|| [landing.block.changeNodeName](./landing-block-change-node-name.md) | Изменяет название тега ноды ||
|| [landing.block.changeAnchor](./landing-block-change-anchor.md) | Изменяет символьный код якоря блока ||
|| [landing.block.uploadfile](./landing-block-upload-file.md) | Загружает файл и привязывает его к блоку ||
|| [landing.block.publication](./landing-block-publication.md) | Публикует один блок страницы ||
|#

### Карточки блока {#cards}

#|
|| **Метод** | **Описание** ||
|| [landing.block.addcard](./landing-block-add-card.md) | Добавляет карточку блока с измененным контентом ||
|| [landing.block.clonecard](./landing-block-clone-card.md) | Клонирует карточку блока ||
|| [landing.block.updateCards](./landing-block-update-cards.md) | Массово изменяет карточки блока ||
|| [landing.block.removecard](./landing-block-remove-card.md) | Удаляет карточку блока ||
|#

### Репозиторий блоков

#|
|| **Метод** | **Описание** ||
|| [landing.block.getrepository](./landing-block-get-repository.md) | Получает список шаблонов блоков из репозитория ||
|| [landing.block.getmanifestfile](./landing-block-get-manifest-file.md) | Получает манифест шаблона блока из репозитория ||
|| [landing.block.getContentFromRepository](./landing-block-get-content-from-repository.md) | Получает контент шаблона блока до его добавления на страницу ||
|#
