# При изменении события OnCalendarEntryUpdate

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `ONCALENDARENTRYUPDATE` срабатывает при изменении события календаря вручную или методом [calendar.event.update](../calendar-event-update.md).

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

Пример payload при изменении события календаря с `id = 1414`.

```json
{
    "event": "ONCALENDARENTRYUPDATE",
    "event_handler_id": "4",
    "data": {
        "id": "1414"
    },
    "ts": "1734608349",
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": "3600",
        "scope": "calendar",
        "domain": "some-domain.bitrix24.com",
        "server_endpoint": "https://oauth.bitrix24.tech/rest/",
        "status": "F",
        "client_endpoint": "https://some-domain.bitrix24.com/rest/",
        "member_id": "a223c6b3710f85df22e9377d6c4f7553",
        "refresh_token": "4s386p3q0tr8dy89xvmt96234v3dljg8",
        "application_token": "51856fefc120afa4b628cc82d3935cce"
    }
}
```

#|
|| **Параметр**
`тип` | **Описание** ||
|| **event**
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `ONCALENDARENTRYUPDATE` ||
|| **event_handler_id**
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data**
[`object`](../../../data-types.md) | Объект, содержащий информацию об измененном событии календаря.

Содержит единственный ключ — `id` ||
|| **data.id**
[`string`](../../../data-types.md) | Идентификатор измененного события календаря.

Поля события по идентификатору возвращает метод [calendar.event.getbyid](../calendar-event-get-by-id.md), ему нужен только `id`.

В примере идентификатор показан строкой; в метод передавайте его как целое число.

Событие не сообщает, какие поля изменились: сохраняйте предыдущее состояние события и сравнивайте его с ответом `calendar.event.getbyid` ||
|| **ts**
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth**
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о Битрикс24, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./index.md)
- [{#T}](./on-calendar-entry-add.md)
- [{#T}](./on-calendar-entry-delete.md)
