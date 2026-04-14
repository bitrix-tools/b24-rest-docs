# Интерфейс, навигация и контекст: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Дополнительные методы управляют интерфейсом встроенного приложения в Битрикс24. С их помощью можно менять размер фрейма, открывать слайдеры и окна, работать с событиями страницы и вызывать методы мессенджера.

> Быстрый переход: [все методы](#all-methods)

## Как выбрать нужный метод

1. Если нужно управлять окном или фреймом приложения, начните с [BX24.resizeWindow](./bx24-resize-window.md), [BX24.fitWindow](./bx24-fit-window.md), [BX24.setTitle](./bx24-set-title.md), [BX24.openApplication](./bx24-open-application.md) и [BX24.closeApplication](./bx24-close-application.md)
2. Если нужно открыть раздел Битрикс24, чат или звонок из интерфейса приложения, используйте [BX24.openPath](./bx24-open-path.md), [Messenger.openChat](./messenger-open-chat.md), [Messenger.startVideoCall](./messenger-start-video-call.md) или [Messenger.startPhoneCall](./messenger-start-phone-call.md)
3. Если нужно дождаться, пока DOM-структура страницы будет готова, или привязать обработчик события, используйте [BX24.ready](./bx24-ready.md), [BX24.isReady](./bx24-is-ready.md), [BX24.bind](./bx24-bind.md), [BX24.unbind](./bx24-unbind.md), [BX24.proxy](./bx24-proxy.md) и [BX24.proxyContext](./bx24-proxy-context.md)
4. Если нужно получить данные о среде выполнения, проверьте [BX24.isAdmin](./bx24-is-admin.md), [BX24.getLang](./bx24-get-lang.md), [BX24.getDomain](./bx24-get-domain.md) и [BX24.getScrollSize](./bx24-get-scroll-size.md)

## Связь с другими объектами

**Системный интерфейс Битрикс24.** Метод [BX24.openPath](./bx24-open-path.md) использует встроенный слайдер Битрикс24 для открытия страниц и объектов. Методы [Messenger.openChat](./messenger-open-chat.md), [Messenger.startVideoCall](./messenger-start-video-call.md) и [Messenger.startPhoneCall](./messenger-start-phone-call.md) запускают системные элементы интерфейса мессенджера и телефонии Битрикс24.

**Места встраивания.** Для сценариев со встройками зарегистрируйте обработчик через [placement.bind](../../../api-reference/widgets/placement-bind.md) и выберите подходящее место встраивания из [списка мест встраивания](../../../api-reference/widgets/placements.md). Это особенно важно для методов [BX24.reloadWindow](./bx24-reload-window.md) и [BX24.scrollParentWindow](./bx24-scroll-parent-window.md), которые зависят от контекста размещения приложения.

## Обзор методов {#all-methods}

### Управление окном и фреймом

#|
|| **Метод** | **Описание** ||
|| [BX24.resizeWindow](./bx24-resize-window.md) | Изменяет размер фрейма с приложением ||
|| [BX24.fitWindow](./bx24-fit-window.md) | Устанавливает размер фрейма с приложением в соответствии с размерами содержимого фрейма ||
|| [BX24.reloadWindow](./bx24-reload-window.md) | Перезагружает страницу с приложением (всю страницу, не только фрейм) ||
|| [BX24.setTitle](./bx24-set-title.md) | Устанавливает заголовок страницы ||
|| [BX24.openApplication](./bx24-open-application.md) | Открывает приложение ||
|| [BX24.closeApplication](./bx24-close-application.md) | Закрывает открытое модальное окно с приложением ||
|| [BX24.scrollParentWindow](./bx24-scroll-parent-window.md) | Прокручивает родительское окно ||
|#

### События страницы и контекст вызова

#|
|| **Метод** | **Описание** ||
|| [BX24.ready](./bx24-ready.md) | Устанавливает обработчик события «DOM-структура документа готова к работе» ||
|| [BX24.isReady](./bx24-is-ready.md) | Показывает, готова ли DOM-структура документа к работе ||
|| [BX24.proxy](./bx24-proxy.md) | Возвращает прокси-функцию и повторно использует ее при вызове с теми же параметрами ||
|| [BX24.proxyContext](./bx24-proxy-context.md) | При вызове изнутри прокси-функции выдаст ссылку на оригинальный контекст выполнения прокси-функции ||
|| [BX24.bind](./bx24-bind.md) | Устанавливает функцию *func* в качестве обработчика события *eventName* объекта *element* ||
|| [BX24.unbind](./bx24-unbind.md) | Убирает функцию *func* в качестве обработчика события *eventName* объекта *element* ||
|#

### Данные о среде и загрузка ресурсов

#|
|| **Метод** | **Описание** ||
|| [BX24.isAdmin](./bx24-is-admin.md) | Определяет, имеет ли текущий пользователь права на управление приложениями ||
|| [BX24.getLang](./bx24-get-lang.md) | Возвращает идентификатор языка в текущем Битрикс24 ||
|| [BX24.getDomain](./bx24-get-domain.md) | Возвращает значение `PARAMS.DOMAIN`, сохраненное при инициализации библиотеки SDK ||
|| [BX24.getScrollSize](./bx24-get-scroll-size.md) | Возвращает внутренние размеры фрейма приложения ||
|| [BX24.loadScript](./bx24-load-script.md) | Загружает и выполняет клиентский javascript-файл ||
|#

### Навигация и общение

#|
|| **Метод** | **Описание** ||
|| [BX24.openPath](./bx24-open-path.md) | Открывает путь внутри Битрикс24 в слайдере ||
|| [Messenger.startVideoCall](./messenger-start-video-call.md) | Запускает видеозвонок из интерфейса Битрикс24 ||
|| [Messenger.startPhoneCall](./messenger-start-phone-call.md) | Запускает звонок на телефонный номер из интерфейса Битрикс24 ||
|| [Messenger.openChat](./messenger-open-chat.md) | Открывает чат, историю сообщений или список чатов ||
|#
