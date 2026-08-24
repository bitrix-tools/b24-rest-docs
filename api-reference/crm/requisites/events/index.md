# Обзор событий при работе с реквизитами

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

События дают возможность приложениям реагировать на изменения практически в реальном времени. Доступны уведомления о добавлении, изменении и удалении реквизитов, банковских реквизитов и пользовательских полей реквизита, а также о регистрации и удалении адресов. Методы для работы с этими объектами собраны в разделе [Реквизиты](../index.md).

Подробно работа с событиями описана в статье [Концепция и преимущества обработки событий](../../../events/index.md).

> Быстрый переход: [все события](#all-events)

## Как получать события

Подписаться на события реквизитов можно через:

- [исходящий вебхук](../../../../local-integrations/local-webhooks.md)
- [приложение](../../../../settings/app-installation/index.md) и метод [event.bind](../../../events/event-bind.md)

Пример кода обработчика для события описан в статье [Как проверить свой обработчик для обработки событий Битрикс24](../../../events/test-handler.md).

## Что приходит в обработчик

События реквизитов не передают данные объекта целиком — в обработчик приходит только ключ, по которому объект можно запросить методом.

**События реквизита и банковского реквизита.** В поле `data.FIELDS.ID` приходит идентификатор объекта. Остальные данные возвращают методы [crm.requisite.get](../universal/crm-requisite-get.md) и [crm.requisite.bankdetail.get](../bank-detail/crm-requisite-bank-detail-get.md). После удаления объекта данные по идентификатору получить уже нельзя.

**События адресов.** У адреса нет собственного идентификатора, поэтому в `data.FIELDS` приходит составной ключ: тип адреса `TYPE_ID`, тип родительского объекта `ENTITY_TYPE_ID` и его идентификатор `ENTITY_ID`. По этому ключу адрес можно найти методом [crm.address.list](../addresses/crm-address-list.md). Дополнительно приходят служебные поля `ANCHOR_ID` и `ANCHOR_TYPE_ID` с основным владельцем адреса: для адреса реквизита это контакт или компания, для адреса лида — сам лид.

**События пользовательских полей.** В `data.FIELDS` приходят идентификатор поля `ID`, символьный идентификатор объекта `ENTITY_ID` и код поля `FIELD_NAME`. Описание поля возвращает метод [crm.requisite.userfield.get](../user-fields/crm-requisite-userfield-get.md).

## Доступность серверов для отправки и получения событий

{% include notitle [Доступность серверов для отправки и получения событий](../../../../_includes/events-index.md) %}

## Обзор событий {#all-events}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

#|
|| **Событие** | **Вызывается** ||
|| [onCrmRequisiteAdd](./on-crm-requisite-add.md) | При добавлении реквизита вручную или методом [crm.requisite.add](../universal/crm-requisite-add.md) ||
|| [onCrmRequisiteUpdate](./on-crm-requisite-update.md) | При изменении реквизита вручную или методом [crm.requisite.update](../universal/crm-requisite-update.md) ||
|| [onCrmRequisiteDelete](./on-crm-requisite-delete.md) | При удалении реквизита вручную или методом [crm.requisite.delete](../universal/crm-requisite-delete.md) ||
|| [onCrmAddressRegister](./on-crm-address-register.md) | При регистрации адреса вручную или методом [crm.address.add](../addresses/crm-address-add.md) ||
|| [onCrmAddressUnregister](./on-crm-address-unregister.md) | При удалении адреса вручную или методом [crm.address.delete](../addresses/crm-address-delete.md) ||
|| [onCrmBankDetailAdd](./on-crm-bank-detail-add.md) | При добавлении банковского реквизита вручную или методом [crm.requisite.bankdetail.add](../bank-detail/crm-requisite-bank-detail-add.md) ||
|| [onCrmBankDetailUpdate](./on-crm-bank-detail-update.md) | При изменении банковского реквизита вручную или методом [crm.requisite.bankdetail.update](../bank-detail/crm-requisite-bank-detail-update.md) ||
|| [onCrmBankDetailDelete](./on-crm-bank-detail-delete.md) | При удалении банковского реквизита вручную или методом [crm.requisite.bankdetail.delete](../bank-detail/crm-requisite-bank-detail-delete.md) ||
|| [onCrmRequisiteUserFieldAdd](./on-crm-requisite-user-field-add.md) | При добавлении пользовательского поля реквизита вручную или методом [crm.requisite.userfield.add](../user-fields/crm-requisite-userfield-add.md) ||
|| [onCrmRequisiteUserFieldUpdate](./on-crm-requisite-user-field-update.md) | При изменении пользовательского поля реквизита вручную или методом [crm.requisite.userfield.update](../user-fields/crm-requisite-userfield-update.md) ||
|| [onCrmRequisiteUserFieldDelete](./on-crm-requisite-user-field-delete.md) | При удалении пользовательского поля реквизита вручную или методом [crm.requisite.userfield.delete](../user-fields/crm-requisite-userfield-delete.md) ||
|| [onCrmRequisiteUserFieldSetEnumValues](./on-crm-requisite-user-field-set-enum-values.md) | При изменении набора значений пользовательского поля списочного типа вручную или методом [crm.requisite.userfield.update](../user-fields/crm-requisite-userfield-update.md) ||
|#
