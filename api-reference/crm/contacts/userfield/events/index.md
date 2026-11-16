# Обзор событий при работе с пользовательскими полями контактов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени: получать уведомления о создании, обновлении или удалении [пользовательских полей контактов](../index.md), а также об установке значений списочных полей.

События сообщают об изменении структуры полей, а не значений в карточках контактов. Чтобы отследить изменение значения поля в контакте, подпишитесь на событие изменения контакта [onCrmContactUpdate](../../events/on-crm-contact-update.md).

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события пользовательских полей контактов можно через:

- [исходящий вебхук](../../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../../settings/app-installation/index.md) и метод [event.bind](../../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../../events/test-handler.md).

## Что получает обработчик

Все четыре события передают в `data.FIELDS` одинаковый набор ключей: идентификатор поля `ID`, тип объекта CRM `ENTITY_ID` со значением `CRM_CONTACT` и код поля `FIELD_NAME`.

```json
{
    "event": "ONCRMCONTACTUSERFIELDSETENUMVALUES",
    "data": {
        "FIELDS": {
            "ID": "553",
            "ENTITY_ID": "CRM_CONTACT",
            "FIELD_NAME": "UF_CRM_1724770216"
        }
    }
}
```

Настройки поля и значения списка в событие не передаются. Чтобы их получить, вызовите метод [crm.contact.userfield.get](../crm-contact-userfield-get.md) с `ID` из события — для этого нужно право чтения контактов. После события удаления поле уже недоступно.

Полный запрос с параметрами `event_handler_id`, `ts` и `auth` приведен на странице каждого события.

Если метод [crm.contact.userfield.add](../crm-contact-userfield-add.md) создает списочное поле с элементами, сначала срабатывает `onCrmContactUserFieldAdd`. После сохранения элементов списка срабатывает `onCrmContactUserFieldSetEnumValues`. Если в [crm.contact.userfield.update](../crm-contact-userfield-update.md) для списочного поля передан массив `LIST`, сначала срабатывает `onCrmContactUserFieldUpdate`, а после сохранения элементов — `onCrmContactUserFieldSetEnumValues`.

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь, для офлайн-событий нужны права администратора

#|
|| **Событие** | **Вызывается** ||
|| [onCrmContactUserFieldAdd](./on-crm-contact-user-field-add.md) | При добавлении пользовательского поля вручную или методом [crm.contact.userfield.add](../crm-contact-userfield-add.md) ||
|| [onCrmContactUserFieldUpdate](./on-crm-contact-user-field-update.md) | При изменении настроек пользовательского поля вручную или методом [crm.contact.userfield.update](../crm-contact-userfield-update.md). Метод вызывает событие при каждом успешном вызове, даже если настройки не изменились ||
|| [onCrmContactUserFieldDelete](./on-crm-contact-user-field-delete.md) | При удалении пользовательского поля вручную или методом [crm.contact.userfield.delete](../crm-contact-userfield-delete.md) ||
|| [onCrmContactUserFieldSetEnumValues](./on-crm-contact-user-field-set-enum-values.md) | При установке значений списочного пользовательского поля вручную или методами [crm.contact.userfield.add](../crm-contact-userfield-add.md) и [crm.contact.userfield.update](../crm-contact-userfield-update.md), в том числе если набор значений не изменился ||
|#
