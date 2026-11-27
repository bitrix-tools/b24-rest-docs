# Виджеты в телефонии: обзор точек встраивания

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Точки встраивания раздела добавляют интерфейс приложения в телефонию: вкладку в карточку звонка во время разговора и отчет в меню аналитики звонков. Обеим точкам нужен скоуп `telephony` в дополнение к `placement`.

Для регистрации виджета используйте метод [placement.bind](../placement-bind.md) и передавайте нужный код в параметре `PLACEMENT`.

Внешний WebRTC-клиент встраивается иначе. Своего кода встраивания у него нет: клиент загружается в точку [PAGE_BACKGROUND_WORKER](../universal/background-worker.md), а телефония подключается методами раздела [{#T}](../../telephony/index.md). Сценарий описан на странице [{#T}](./webrtc.md).

> Быстрый переход: [все точки встраивания](#all-placements)

## Как выбрать точку встраивания

Выбирайте точку по задаче, которую решает приложение:

- показать данные клиента прямо во время разговора — [CALL_CARD](./call-card.md)
- добавить свой отчет к встроенной аналитике звонков — [TELEPHONY_ANALYTICS_MENU](./analytics-menu.md)

Точки различаются условием вызова. Обработчик `CALL_CARD` вызывается, когда пользователь открывает вкладку приложения в карточке звонка. Если других вкладок в карточке нет, он вызывается сразу при ее открытии. Обработчик получает контекст звонка. Точка работает только в открытой карточке — при звонке или в обзвоне. Без звонка или обзвона виджет не проверить.

Обработчик `TELEPHONY_ANALYTICS_MENU` вызывается, когда пользователь выбирает пункт в меню статистики звонков. Собственного контекста у точки нет, зато она доступна в любой момент.

## Как начать работу

1. Выберите точку встраивания под сценарий.
2. Зарегистрируйте обработчик методом [placement.bind](../placement-bind.md) и передайте код в параметре `PLACEMENT`. При успешной регистрации метод возвращает `result: true` — разбор ответа и коды ошибок есть на его странице. Метод работает только от имени приложения, через вебхук точку не зарегистрировать. Зарегистрировать виджет может администратор Битрикс24, а в локальном приложении — еще и сотрудник с правом создавать приложения.
3. Завершите установку приложения. До этого виджет в интерфейсе не отображается.
4. Перезагрузите страницу Битрикс24. Списки вкладок карточки звонка и пунктов меню аналитики собираются при загрузке страницы.
5. Вызовите виджет. Для `TELEPHONY_ANALYTICS_MENU` откройте страницу `/report/telephony/` и выберите пункт приложения. Для `CALL_CARD` нужен звонок: зарегистрируйте внешний вызов методом [telephony.externalCall.register](../../telephony/telephony-external-call-register.md) с параметром `SHOW` = 1.
6. Разберите в обработчике `PLACEMENT_OPTIONS` — в нем приходит контекст вызова.

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

Обе точки передают обработчику один и тот же набор стандартных параметров. Пример показан для вкладки в карточке звонка: у меню аналитики меняются значение `PLACEMENT` и контекст вызова в `PLACEMENT_OPTIONS`.

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 588b8a98e848778a4ffb38fbcf70f2b9
    [AUTH_ID] => 4172bb6600705a0700005a4b00000001f0f107c42ca5bd5f61030c5d9c3e4d60d11b5a
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 31f1e26600705a0700005a4b00000001f0f107b1918506d8a2ed9ecf76e8fdac962471
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => telephony,crm,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => CALL_CARD
    [PLACEMENT_OPTIONS] => {"CALL_ID":"externalCall.c3ee67f1a63f6e6117c230ab59cc49ea.1723556778","PHONE_NUMBER":"+79001234567","LINE_NUMBER":"+7 495 000-00-00","LINE_NAME":"+7 495 000-00-00","CRM_ENTITY_TYPE":"COMPANY","CRM_ENTITY_ID":"17","CRM_ACTIVITY_ID":"undefined","CRM_BINDINGS":[{"ENTITY_TYPE":"DEAL","ENTITY_ID":"25"},{"ENTITY_TYPE":"COMPANY","ENTITY_ID":"17"}],"CALL_DIRECTION":"incoming","CALL_STATE":"connected","CALL_LIST_MODE":"false","URI":"\/crm\/company\/details\/17\/"}
)
```

Строка `PLACEMENT_OPTIONS` из этого примера после разбора выглядит так:

```json
{
    "CALL_ID": "externalCall.c3ee67f1a63f6e6117c230ab59cc49ea.1723556778",
    "PHONE_NUMBER": "+79001234567",
    "LINE_NUMBER": "+7 495 000-00-00",
    "LINE_NAME": "+7 495 000-00-00",
    "CRM_ENTITY_TYPE": "COMPANY",
    "CRM_ENTITY_ID": "17",
    "CRM_ACTIVITY_ID": "undefined",
    "CRM_BINDINGS": [
        { "ENTITY_TYPE": "DEAL", "ENTITY_ID": "25" },
        { "ENTITY_TYPE": "COMPANY", "ENTITY_ID": "17" }
    ],
    "CALL_DIRECTION": "incoming",
    "CALL_STATE": "connected",
    "CALL_LIST_MODE": "false",
    "URI": "/crm/company/details/17/"
}
```

Значения приходят строками, включая `CALL_LIST_MODE` и `CRM_ACTIVITY_ID`: сравнивайте их со строками `"true"`, `"false"` и `"undefined"`, а не с логическим типом.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова. Универсальный ключ `URI` приходит обеим точкам на общих условиях, описанных выше, а собственные ключи есть только у карточки звонка.

#|
|| **Точка встраивания** | **Собственные ключи** | **Что передается** ||
|| [CALL_CARD](./call-card.md) | Разговор: `CALL_ID`, `CALL_DIRECTION`, `CALL_STATE`, `CALL_LIST_MODE`

Линия и номер: `PHONE_NUMBER`, `LINE_NUMBER`, `LINE_NAME`

Связи с CRM: `CRM_ENTITY_TYPE`, `CRM_ENTITY_ID`, `CRM_BINDINGS`, `CRM_ACTIVITY_ID` | Контекст звонка, во время которого открыт виджет.

`CRM_BINDINGS` — массив объектов. Он приходит не всегда: при звонке — если звонок связан с элементами CRM, в обзвоне — только по сделкам, предложениям и счетам, у которых указан клиент. Остальные ключи приходят всегда и строками, даже числа и логические значения: `CRM_ENTITY_ID` — `"0"`, `CALL_LIST_MODE` — `"false"`.

Описание каждого ключа и его значения в разных случаях — на [странице точки](./call-card.md#placement-options) ||
|| [TELEPHONY_ANALYTICS_MENU](./analytics-menu.md) | нет | Только адрес страницы аналитики в `URI` ||
|#

## OPTIONS при регистрации через placement.bind

Ни одна из точек раздела не поддерживает параметр `OPTIONS` метода [placement.bind](../placement-bind.md): переданные значения не сохраняются, в ответе [placement.get](../placement-get.md) поле `options` такой регистрации — пустой массив.

На сценарий WebRTC это правило не распространяется. Он работает не на точке телефонии, а на [PAGE_BACKGROUND_WORKER](../universal/background-worker.md), и там `OPTIONS[errorHandlerUrl]` обязателен: без него [placement.bind](../placement-bind.md) возвращает ошибку `EMPTY_ERROR_HANDLER_URL`.

## Связь с другими объектами

**Звонок.** Идентификатор `CALL_ID` из контекста `CALL_CARD` — тот же, который возвращает [telephony.externalCall.register](../../telephony/telephony-external-call-register.md). По нему обработчик завершает звонок методом [telephony.externalCall.finish](../../telephony/telephony-external-call-finish.md) и прикрепляет запись разговора.

**Элементы CRM.** Ключи `CRM_ENTITY_TYPE` и `CRM_ENTITY_ID` указывают на элемент, к которому привязан звонок, а `CRM_BINDINGS` — на все связанные элементы. Данные возвращают методы соответствующих разделов CRM.

**Дело CRM.** Идентификатор `CRM_ACTIVITY_ID` указывает на дело, созданное для звонка. Данные дела возвращает метод [crm.activity.get](../../crm/timeline/activities/activity-base/crm-activity-get.md). У внешнего звонка в `CRM_ACTIVITY_ID` приходит строка `undefined`: дело создает метод [telephony.externalCall.finish](../../telephony/telephony-external-call-finish.md) после звонка.

**Телефонные линии.** У внешнего звонка в `LINE_NAME` приходит название линии, которую добавили методом [telephony.externalLine.add](../../telephony/telephony-external-line-add.md).

## Типовые ошибки

#|
|| **Ошибка** | **Как решить** ||
|| [placement.bind](../placement-bind.md) возвращает `WRONG_AUTH_TYPE` с описанием `Application context required` | Регистрируйте точку от имени приложения. Вебхуком точку не привязать ||
|| [placement.bind](../placement-bind.md) возвращает `ERROR_PLACEMENT_NOT_FOUND` | Код точки указан неверно или приложению не выдан скоуп `telephony` ||
|| [placement.bind](../placement-bind.md) возвращает `ERROR_ARGUMENT` | Передайте обязательные параметры `PLACEMENT` и `HANDLER`. Какой параметр не передан, сказано в `error_description`, например `Argument 'The URL of the placement handler is not specified' is null or empty` при пустом `HANDLER` ||
|| Виджет зарегистрирован, но в интерфейсе не появляется | Завершите [установку приложения](../../../settings/app-installation/installation-finish.md) и перезагрузите страницу Битрикс24: списки вкладок карточки звонка и пунктов меню аналитики собираются при загрузке ||
|| Обработчик получил не те данные звонка, которые ожидались | Описание каждого ключа контекста и его особенности — на странице [CALL_CARD](./call-card.md): там же описаны `CRM_ACTIVITY_ID` со строкой `undefined`, символьный код в `CRM_ENTITY_TYPE` и полный список связей в `CRM_BINDINGS` ||
|#

Ошибка приходит в теле ответа — код в поле `error`, текст в `error_description`:

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../placement-bind.md).

## Обзор точек встраивания {#all-placements}

> Scope: [`placement, telephony`](../../scopes/permissions.md)

#|
|| **Точка встраивания** | **Когда использовать** ||
|| [CALL_CARD](./call-card.md) | Показать данные клиента из внешней системы прямо во время разговора: вкладка открывается в карточке звонка и получает контекст разговора ||
|| [TELEPHONY_ANALYTICS_MENU](./analytics-menu.md) | Добавить свой отчет по звонкам к встроенной аналитике: пункт открывается в меню статистики звонков и доступен в любой момент ||
|#

Третий материал раздела — [{#T}](./webrtc.md) — в таблице не значится: своего кода встраивания у него нет, клиент работает поверх точки [PAGE_BACKGROUND_WORKER](../universal/background-worker.md).

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](../placements.md)
- [{#T}](./webrtc.md)
- [{#T}](../placement-bind.md)
- [{#T}](../placement-get.md)
- [{#T}](../placement-list.md)
- [{#T}](../placement-unbind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../telephony/index.md)
- [{#T}](../../../settings/interactivity/index.md)
