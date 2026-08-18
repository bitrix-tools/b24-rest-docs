# Событие при добавлении типа цены CATALOG.PRICE.TYPE.ON.ADD

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

Событие `CATALOG.PRICE.TYPE.ON.ADD` срабатывает при добавлении типа цены.

{% note info "" %}

События не будут отправляться в приложение, пока установка не завершена. [Проверьте установку приложения](../../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```json
{
    "event": "CATALOG.PRICE.TYPE.ON.ADD",
    "event_handler_id": 1,
    "data": {
        "FIELDS": {
            "ID": 1
        }
    },
    "ts": 1714649632,
    "auth": {
        "access_token": "s6p6eclrvim6da22ft9ch94ekreb52lv",
        "expires_in": 3600,
        "scope": "catalog",
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

## Параметры

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **event***
[`string`](../../../data-types.md) | Символьный код события.

В данном случае — `CATALOG.PRICE.TYPE.ON.ADD` ||
|| **event_handler_id***
[`integer`](../../../data-types.md) | Идентификатор обработчика события ||
|| **data***
[`object`](../../../data-types.md) | Объект, содержащий информацию о добавленном типе цены.

Содержит единственный ключ `FIELDS` ||
|| **data.FIELDS***
[`object`](../../../data-types.md) | Объект, содержащий информацию о полях типа цены.

Структура описана [ниже](#fields) ||
|| **ts***
[`timestamp`](../../../data-types.md) | Дата и время отправки события из [очереди событий](../../../events/index.md) ||
|| **auth***
[`object`](../../../data-types.md) | Объект, содержащий параметры авторизации и данные о портале, на котором произошло событие.

Структура описана [ниже](#auth) ||
|#

### Параметр FIELDS {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`catalog_price_type.id`](../../data-types.md#catalog_price_type) | Идентификатор типа цены. Получить все поля типа цены по его идентификатору можно с помощью метода [catalog.priceType.get](../catalog-price-type-get.md) ||
|#

### Параметр auth {#auth}

{% include notitle [Таблица с ключами в массиве auth](../../../../_includes/auth-params-in-events.md) %}

## Продолжите изучение

- [{#T}](../../../events/index.md)
- [{#T}](../../../events/event-bind.md)
- [{#T}](./catalog-price-type-on-update.md)
- [{#T}](./catalog-price-type-on-delete.md)