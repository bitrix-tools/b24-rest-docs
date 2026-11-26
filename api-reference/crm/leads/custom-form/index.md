# Управление карточками лидов: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Группа методов `crm.lead.details.configuration.*` управляет настройками карточки для двух представлений:

* «Общий вид» — вид карточки для всех сотрудников
* «Мой вид» — личная настройка карточки сотрудника

Для каждого вида карточки можно настроить секции, внутри секции — перечень полей. Например, создать секцию «Контактные данные» и вывести в ней поля «Телефон» и «Почта». Для полей, которые не относятся к контактным данным, создать другую секцию.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Представления CRM](https://helpdesk.bitrix24.ru/open/17914816/)

## Актуальная версия API

Развитие методов `crm.lead.details.configuration.*` остановлено. Для новой разработки используйте [методы видов карточки REST 3.0](../../rest-v3/detail-page-layout/index.md). Методы `crm.lead.details.configuration.*` продолжают работать в существующих интеграциях.

#|
|| **Метод с остановленным развитием** | **Чем заменить** ||
|| `crm.lead.details.configuration.get` | [crm.lead.detailpagelayout.get](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-get-rest-v3.md) ||
|| `crm.lead.details.configuration.set` | [crm.lead.detailpagelayout.update](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-update-rest-v3.md) ||
|| `crm.lead.details.configuration.reset` | [crm.item.details.configuration.reset](../../universal/item-details-configuration/crm-item-details-configuration-reset.md) с `entityTypeId: 1`; в REST 3.0 аналога нет ||
|| `crm.lead.details.configuration.forceCommonScopeForAll` | [crm.lead.detailpagelayout.setcommonforall](../../rest-v3/detail-page-layout/crm-entity-detail-page-layout-set-common-for-all-rest-v3.md) ||
|#

У повторных лидов в REST 3.0 свои виды: `personal_returning_customer` и `common_returning_customer`.

## Как настроить карточку

1. Получите идентификаторы полей, которые нужно вывести в карточку, методом [crm.lead.fields](../crm-lead-fields.md): `TITLE`, `STATUS_ID`, `PHONE` и другие. Кроме полей лида, в карточке есть составные элементы, например `CLIENT` и `OPPORTUNITY_WITH_CURRENCY`, — их имена есть в ответе [crm.lead.details.configuration.get](./crm-lead-details-configuration-get.md).
2. Посмотрите текущую структуру карточки методом [crm.lead.details.configuration.get](./crm-lead-details-configuration-get.md) — она вернет список секций с вложенными полями или `null`, если сохраненной конфигурации нет.
3. Передайте новую структуру методом [crm.lead.details.configuration.set](./crm-lead-details-configuration-set.md). Новая структура заменяет сохраненную конфигурацию выбранного вида целиком.
4. Если результат не подошел, вернитесь к настройкам по умолчанию методом [crm.lead.details.configuration.reset](./crm-lead-details-configuration-reset.md).
5. Чтобы принудительно применить общий вид карточки ко всем сотрудникам и удалить их личные настройки, вызовите [crm.lead.details.configuration.forceCommonScopeForAll](./crm-lead-details-configuration-force-common-scope-for-all.md).

## Структура конфигурации карточки

Конфигурация — массив секций с вложенными полями в `elements`. Пример поля `result` в ответе [crm.lead.details.configuration.get](./crm-lead-details-configuration-get.md) с одной секцией и двумя полями лида:

```json
{
    "result": [
        {
            "name": "lead_info",
            "title": "О лиде",
            "type": "section",
            "elements": [
                {"name": "TITLE"},
                {"name": "STATUS_ID"}
            ]
        }
    ]
}
```

#|
|| **Уровень** | **Поля** | **Описание** ||
|| Секция | `name`, `title`, `type`, `elements` | `name` — имя секции, `title` — заголовок, `type` — тип `section`, `elements` — массив полей лида ||
|| Поле секции | `name` | Идентификатор поля лида из `crm.lead.fields` или имя элемента карточки из ответа `crm.lead.details.configuration.get` ||
|#

Метод [crm.lead.details.configuration.set](./crm-lead-details-configuration-set.md) принимает массив секций из `result` в параметре `data`.

## Область настроек

Вид карточки выбирает параметр `scope`, а сотрудника — `userId`. По умолчанию `scope` равен `P`, то есть методы работают с личными настройками вызывающего пользователя.

#|
|| **Вид карточки** | **Что передать** | **Кто может читать** | **Кто может изменять и сбрасывать** ||
|| Общий вид — карточка для всех сотрудников | `scope = C` | Любой пользователь | Пользователь с правом «Разрешить изменять настройки» или «Управление общим видом карточки» ||
|| Свой личный вид | `scope = P` без `userId` | Любой пользователь | Любой пользователь ||
|| Личный вид другого сотрудника | `scope = P` и `userId` этого сотрудника | Администратор CRM | Администратор CRM ||
|#

Администратор CRM — пользователь с правом «Разрешить изменять настройки». Оба права выдаются на весь CRM, отдельно для лидов их выдать нельзя. Метод `forceCommonScopeForAll` доступен пользователю с любым из этих прав.

## Связь карточки лидов с другими объектами

**Пользователь.** Идентификатор пользователя `userId` используется при установке личных настроек карточки. Получить идентификатор пользователя можно с помощью метода [user.get](../../../user/user-get.md).

**Поля лида.** Идентификаторы полей используются при установке видимых полей в секции карточки. Получить идентификаторы системных и пользовательских полей лида можно с помощью метода [crm.lead.fields](../crm-lead-fields.md).

## Настройка карточки для простых и повторных лидов

Лиды могут быть двух типов: простые и повторные. Лид становится повторным, если у него заполнено поле «Клиент». У повторных лидов нет контактных полей, таких как «Телефон», «Почта», «Адрес» — эта информация хранится в связанных через поле «Клиент» контакте или компании.

Для карточек простых и повторных лидов настройки хранятся отдельно. Тип лида выбирает параметр `leadCustomerType` в объекте `extras`:

#|
|| **Значение** | **Карточка какого лида настраивается** ||
|| `1` | Простой лид ||
|| `2` | Повторный лид ||
|#

Параметр `extras` необязательный. Если не передать `extras` или ключ `leadCustomerType` в нем, методы работают с карточкой простого лида.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

#|
|| **Метод** | **Описание** ||
|| [crm.lead.details.configuration.set](./crm-lead-details-configuration-set.md) | Устанавливает настройки карточки лидов ||
|| [crm.lead.details.configuration.get](./crm-lead-details-configuration-get.md) | Получает настройки карточки лидов ||
|| [crm.lead.details.configuration.reset](./crm-lead-details-configuration-reset.md) | Сбрасывает настройки карточки лидов ||
|| [crm.lead.details.configuration.forceCommonScopeForAll](./crm-lead-details-configuration-force-common-scope-for-all.md) | Принудительно устанавливает общую карточку лидов для всех пользователей ||
|#
