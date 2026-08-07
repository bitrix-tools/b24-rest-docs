# Каталог точек встраивания

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Точка встраивания — это место в интерфейсе Битрикс24, куда приложение добавляет свой интерфейс: вкладку в карточке, пункт меню, кнопку на панели или отдельную страницу. Когда пользователь открывает виджет, Битрикс24 открывает адрес обработчика приложения и передает ему данные вызова — авторизацию приложения и контекст того места, откуда виджет вызван.

Обработчик регистрируется методом [placement.bind](./placement-bind.md): код нужного места передается в параметре `PLACEMENT`. Одно приложение может зарегистрировать несколько виджетов, в том числе несколько в одном месте — например, две вкладки в карточке сделки или два пункта контекстного меню в списке задач. У [универсальных точек](./universal/index.md) действует ограничение в один обработчик.

Эта страница — полный каталог точек встраивания. Порядок регистрации, права, состав данных обработчика и типовые ошибки описаны в статье [Механизм встраивания виджетов](./index.md).

> Быстрый переход: [все точки встраивания](#all-placements)

## Как выбрать точку встраивания

Одинаковые по смыслу точки есть в разных инструментах Битрикс24, поэтому выбирайте точку по задаче, а не по разделу:

- показать свой экран внутри карточки объекта — `CRM_XXX_DETAIL_TAB`, `TASK_VIEW_TAB`, `TASK_VIEW_SIDEBAR`, `SONET_GROUP_DETAIL_TAB`, `CALL_CARD`
- добавить действие к отдельному элементу списка — `CRM_XXX_LIST_MENU`, `TASK_LIST_CONTEXT_MENU`
- добавить действие ко всему списку — `CRM_XXX_LIST_TOOLBAR`, `TASK_USER_LIST_TOOLBAR`, `TASK_GROUP_LIST_TOOLBAR`, `SONET_GROUP_TOOLBAR`, `CRM_FUNNELS_TOOLBAR`
- добавить кнопку на панель карточки — `CRM_XXX_DETAIL_TOOLBAR`, `CRM_XXX_DETAIL_ACTIVITY`, `CRM_XXX_DOCUMENTGENERATOR_BUTTON`, `TASK_VIEW_TOP_PANEL`
- занять рабочую область целиком под свой раздел или отчет — `LEFT_MENU`, `IM_NAVIGATION`, `CRM_ANALYTICS_MENU`, `BI_ANALYTICS_MENU`, `TELEPHONY_ANALYTICS_MENU`
- работать с текущей перепиской — `IM_TEXTAREA`, `IM_SIDEBAR`, `IM_CONTEXT_MENU`, `IMMOBILE_CONTEXT_MENU`
- расширить автоматизацию — `CRM_XXX_ROBOT_DESIGNER_TOOLBAR`, `TASK_ROBOT_DESIGNER_TOOLBAR`, `SONET_GROUP_ROBOT_DESIGNER_TOOLBAR`
- подставить в карточку данные из внешнего источника — `CRM_DETAIL_SEARCH`, `CRM_REQUISITE_AUTOCOMPLETE`, `CRM_BANK_DETAIL_AUTOCOMPLETE`
- подключить свой канал связи — `CONTACT_CENTER`, `SETTING_CONNECTOR`
- добавить свой вид отображения — `CALENDAR_GRIDVIEW`
- дополнить меню пользователя или карточку сотрудника — `USER_PROFILE_MENU`, `USER_PROFILE_TOOLBAR`
- работать без видимого элемента интерфейса — `PAGE_BACKGROUND_WORKER`, `REST_APP_URI`

## Как собрать код точки

Часть кодов содержит имя типа объекта. Вместо `XXX` подставьте нужное значение.

#|
|| **Шаблон кода** | **Что подставить** ||
|| `CRM_XXX_...` | `LEAD`, `DEAL`, `CONTACT`, `COMPANY`, `QUOTE`, `SMART_INVOICE`, `ORDER`. Для [пользовательского типа объектов](../crm/universal/index.md) — `DYNAMIC_` и числовой идентификатор типа: `CRM_DYNAMIC_183_DETAIL_TAB` ||
|| `TASK_XXX_LIST_TOOLBAR` | `USER` для списка задач пользователя, `GROUP` для списка задач проекта ||
|#

Набор поддержанных типов у точек разный. Дизайнер роботов работает только с лидами, сделками, новыми счетами и пользовательскими типами объектов, а вкладку в карточке поддерживает еще и заказ интернет-магазина. Точный список кодов приведен на странице каждой точки.

Фактический список мест, доступных приложению на конкретном Битрикс24, возвращает метод [placement.list](./placement-list.md). Сверяйте код вызовом, а не подбором.

## Что подключается другим способом

Часть встроек регистрируется не методом `placement.bind`.

#|
|| **Что встраиваем** | **Чем подключается** ||
|| Пункт в главном меню, открывающий основную страницу приложения | Настройки приложения, без вызовов REST API. Где их указать, описано в статье [Механизм встраивания виджетов](./index.md). Точка [LEFT_MENU](./left-menu.md) нужна, чтобы пункт открывал зарегистрированный обработчик, а не основной адрес приложения ||
|| [Страница настройки коннектора](./setting-connector.md) | Параметр `PLACEMENT_HANDLER` метода [imconnector.register](../imopenlines/imconnector/imconnector-register.md). Привязку создает сам Битрикс24, когда регистрирует коннектор ||
|| [Пользовательский тип поля в карточке CRM](./user-field/index.md) | Метод [userfieldtype.add](./user-field/userfieldtype-add.md). Приложение регистрирует не поле, а его тип, и указывает адрес обработчика, который откроется по месту вывода поля ||
|| [Сценарий WebRTC](./telephony/webrtc.md) | Отдельной точки нет: сценарий работает поверх [PAGE_BACKGROUND_WORKER](./universal/background-worker.md) ||
|#

## Все точки встраивания {#all-placements}

Обработчик регистрируется методом `placement.bind`, поэтому приложению всегда нужен скоуп [`placement`](../scopes/permissions.md). В колонке указан второй скоуп пары, которая приведена в шапке страницы точки. Значение «не требуется» означает, что точка объявлена в глобальном скоупе `placement` и второго скоупа не требует.

Исключение — `SETTING_CONNECTOR`: он подключается методом `imconnector.register` и требует только скоуп `imopenlines`. У точек мессенджера скоуп `im` нужен не для регистрации, а обработчику — чтобы работать с чатом по полученному `dialogId`.

#|
|| **Код** | **Где появляется в интерфейсе** | **Дополнительный scope** ||
|| [BI_ANALYTICS_MENU](./crm/bi-analytics-menu.md) | Пункт в меню BI-аналитики. Единственная точка, обработчик которой открывается GET-запросом без данных вызова | не требуется ||
|| [CALENDAR_GRIDVIEW](./calendar.md) | Свой вид отображения в календаре | `calendar` ||
|| [CALL_CARD](./telephony/call-card.md) | Вкладка в карточке звонка | `telephony` ||
|| [CONTACT_CENTER](./contact-center.md) | Плитка в контакт-центре | `contact_center` ||
|| [CRM_ANALYTICS_MENU](./crm/analytics-menu.md) | Отчет приложения в левом меню CRM-аналитики | `crm` ||
|| [CRM_ANALYTICS_TOOLBAR](./crm/analytics-toolbar.md) | Кнопка в шапке CRM-аналитики | `crm` ||
|| [CRM_BANK_DETAIL_AUTOCOMPLETE](./crm/requisites-autocomplete/bank-detail-autocomplete.md) | Источник поиска в поле банковских реквизитов карточки CRM | `crm` ||
|| [CRM_DETAIL_SEARCH](./crm/detail-search.md) | Источник поиска клиента в карточке CRM | `crm` ||
|| [CRM_FUNNELS_TOOLBAR](./crm/funnels-toolbar.md) | Кнопка в воронках и туннелях продаж | `crm` ||
|| [CRM_REQUISITE_AUTOCOMPLETE](./crm/requisites-autocomplete/requisite-autocomplete.md) | Источник поиска в поле реквизитов карточки CRM | `crm` ||
|| [CRM_XXX_ACTIVITY_TIMELINE_MENU](./crm/activity-timeline-menu.md) | Пункт контекстного меню записи дела в таймлайне карточки | `crm` ||
|| [CRM_XXX_DETAIL_ACTIVITY](./crm/detail-activity.md) | Кнопка в панели над таймлайном карточки | `crm` ||
|| [CRM_XXX_DETAIL_TAB](./crm/detail-tab.md) | Вкладка в карточке элемента CRM | `crm` ||
|| [CRM_XXX_DETAIL_TOOLBAR](./crm/detail-toolbar.md) | Пункт меню верхней кнопки карточки | `crm` ||
|| [CRM_XXX_DOCUMENTGENERATOR_BUTTON](./crm/document-generator-button.md) | Пункт меню генератора документов в карточке | `crm` ||
|| [CRM_XXX_LIST_MENU](./crm/list-menu.md) | Пункт контекстного меню элемента в списке | `crm` ||
|| [CRM_XXX_LIST_TOOLBAR](./crm/list-toolbar.md) | Пункт меню над списком элементов | `crm` ||
|| [CRM_XXX_ROBOT_DESIGNER_TOOLBAR](./crm/robot-designer-toolbar.md) | Кнопка в дизайнере роботов CRM | `crm` ||
|| [IM_CONTEXT_MENU](./im/context-menu.md) | Пункт в контекстном меню сообщения | `im` ||
|| [IM_NAVIGATION](./im/navigation.md) | Пункт в меню навигации мессенджера | `im` ||
|| [IM_SIDEBAR](./im/sidebar.md) | Пункт в боковой панели чата | `im` ||
|| [IM_SMILES_SELECTOR](./im/smile-selector.md) | Архивная точка для коллекции смайлов. Не используйте для новых интеграций | не требуется ||
|| [IM_TEXTAREA](./im/textarea.md) | Пункт в панели над полем ввода чата | `im` ||
|| [IMMOBILE_CONTEXT_MENU](./mobile-app.md) | Пункт меню *Приложения* в чате мобильного приложения | `im` ||
|| [LEFT_MENU](./left-menu.md) | Пункт в главном меню Битрикс24 | не требуется ||
|| [PAGE_BACKGROUND_WORKER](./universal/background-worker.md) | Фоновый обработчик на всех страницах, без видимого элемента интерфейса | не требуется ||
|| [REST_APP_URI](./universal/app-url.md) | Открытие приложения слайдером по ссылке в сообщении, комментарии или задаче | не требуется ||
|| [SETTING_CONNECTOR](./setting-connector.md) | Страница настройки коннектора открытых линий. Единственная точка, которая подключается методом `imconnector.register`, а не `placement.bind` | только `imopenlines` ||
|| [SONET_GROUP_DETAIL_TAB](./workgroups/detail-tab.md) | Пункт меню рабочей группы или проекта | `sonet_group` ||
|| [SONET_GROUP_ROBOT_DESIGNER_TOOLBAR](./workgroups/robot-designer-toolbar.md) | Кнопка в дизайнере роботов группы | `sonet_group` ||
|| [SONET_GROUP_TOOLBAR](./workgroups/toolbar.md) | Пункт меню расширений рабочей группы или проекта | `sonet_group` ||
|| [TASK_GROUP_LIST_TOOLBAR](./task/list-toolbar.md) | Пункт меню над списком задач проекта | `task` ||
|| [TASK_LIST_CONTEXT_MENU](./task/list-context-menu.md) | Пункт контекстного меню задачи в списке | `task` ||
|| [TASK_ROBOT_DESIGNER_TOOLBAR](./task/robot-designer-toolbar.md) | Кнопка в дизайнере роботов задач | `task` ||
|| [TASK_USER_LIST_TOOLBAR](./task/list-toolbar.md) | Пункт меню над списком задач пользователя | `task` ||
|| [TASK_VIEW_SIDEBAR](./task/view-sidebar.md) | Виджет в карточке задачи, в прежней карточке — правая панель | `task` ||
|| [TASK_VIEW_TAB](./task/view-tab.md) | Виджет в карточке задачи, в прежней карточке — отдельная вкладка | `task` ||
|| [TASK_VIEW_TOP_PANEL](./task/view-top-panel.md) | Виджет в карточке задачи, в прежней карточке — кнопка верхней панели | `task` ||
|| [TELEPHONY_ANALYTICS_MENU](./telephony/analytics-menu.md) | Пункт меню в аналитике звонков | `telephony` ||
|| [USER_PROFILE_MENU](./user-profile/profile-menu.md) | Пункт в меню пользователя, доступном с любой страницы | `user` ||
|| [USER_PROFILE_TOOLBAR](./user-profile/profile-toolbar.md) | Пункт в меню карточки сотрудника | `user` ||
|#

## Обзоры разделов

В обзоре раздела точки разобраны по сценариям, там же описан общий порядок работы и контекст вызова:

- [Виджеты в CRM](./crm/index.md) — карточка и списки элементов, аналитика, автоматизация, [автозаполнение реквизитов](./crm/requisites-autocomplete/index.md)
- [Виджеты в задачах](./task/index.md) — карточка задачи, списки задач, дизайнер роботов
- [Виджеты в рабочих группах и проектах](./workgroups/index.md) — меню группы и дизайнер роботов группы
- [Виджеты в мессенджере](./im/index.md) — чат, сообщение, навигация мессенджера
- [Виджеты в телефонии](./telephony/index.md) — карточка звонка и аналитика звонков
- [Виджеты в профиле пользователя](./user-profile/index.md) — меню пользователя и карточка сотрудника
- [Универсальные виджеты](./universal/index.md) — работа без привязки к разделу: по ссылке и в фоне
- [Пользовательские типы полей](./user-field/index.md) — свой интерфейс показа и редактирования поля в карточке CRM

Одиночные точки своих разделов не имеют: [главное меню](./left-menu.md), [календарь](./calendar.md), [контакт-центр](./contact-center.md), [настройка коннектора](./setting-connector.md), [чат мобильного приложения](./mobile-app.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./placement-bind.md)
- [{#T}](./placement-get.md)
- [{#T}](./placement-list.md)
- [{#T}](./placement-unbind.md)
- [{#T}](./ui-interaction/index.md)
- [{#T}](./bx24-widget-methods.md)
