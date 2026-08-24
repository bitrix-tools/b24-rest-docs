# Пользовательские поля в CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательские поля позволяют расширять карточки CRM под собственные процессы: добавлять дополнительные атрибуты, хранить внутренние классификаторы и передавать данные между CRM и внешними системами.

Методы `crm.userfield.*` помогают понять структуру пользовательского поля: какие у него характеристики, типы, настройки и формат значений списков. Поле в карточке объекта они не создают, а возвращают справочную информацию для его настройки.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)

## Как выбрать раздел

В документации есть несколько разделов про пользовательские поля. Выберите нужный по задаче.

#|
|| **Если вам нужно** | **Открывайте раздел** ||
|| Узнать типы, характеристики, настройки и формат списков | Текущий раздел ||
|| Создать, изменить или удалить поле для любого объекта | [Настройки пользовательских полей](../userfieldconfig/index.md) ||
|| Создать поле для конкретного объекта его собственными методами | Разделы `crm.*.userfield.*`: [лиды](../../leads/userfield/index.md), [сделки](../../deals/user-defined-fields/index.md), [контакты](../../contacts/userfield/index.md), [компании](../../companies/userfields/index.md), [предложения](../../quote/user-field/index.md), [реквизиты](../../requisites/user-fields/index.md) ||
|| Вывести в поле интерфейс своего приложения | [Пользовательские типы полей в CRM](./userfield-type.md) ||
|#

## Связь пользовательских полей с объектами CRM

**Объекты CRM.** Объектные методы `crm.*.userfield.*` используют справочную информацию из этого раздела для [лидов](../../leads/userfield/index.md), [сделок](../../deals/user-defined-fields/index.md), [контактов](../../contacts/userfield/index.md), [компаний](../../companies/userfields/index.md), [предложений](../../quote/user-field/index.md) и [реквизитов](../../requisites/user-fields/index.md).

## Ключевые термины

- `ENTITY_ID` — код CRM-объекта, к которому привязано поле
- `FIELD_NAME` — код пользовательского поля в формате `UF_CRM_*`
- `USER_TYPE_ID` — тип данных пользовательского поля, полный список значений возвращает [crm.userfield.types](./crm-userfield-types.md)
- `SETTINGS` — настройки поля, которые зависят от выбранного типа
- `LIST` — набор элементов для поля типа `enumeration`

## Как начать работу

1. Определите объект CRM, для которого нужно добавить поле, и откройте его раздел `crm.*.userfield.*`. Например, [crm.lead.userfield.*](../../leads/userfield/index.md), [crm.deal.userfield.*](../../deals/user-defined-fields/index.md), [crm.contact.userfield.*](../../contacts/userfield/index.md).
2. Получите доступные типы через [crm.userfield.types](./crm-userfield-types.md) и выберите подходящий `USER_TYPE_ID`.
3. Получите структуру поля через [crm.userfield.fields](./crm-userfield-fields.md), чтобы проверить обязательные характеристики.
4. Для выбранного типа получите настройки через [crm.userfield.settings.fields](./crm-userfield-settings-fields.md), где параметр `type` для стандартных типов совпадает с `USER_TYPE_ID`.
5. Если тип `enumeration`, проверьте формат элементов списка через [crm.userfield.enumeration.fields](./crm-userfield-enumeration-fields.md).
6. После этого создайте или обновите поле в объектном разделе.

{% note tip "Дополнительно" %}

- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-user-field-to-spa.md)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.userfield.types](./crm-userfield-types.md) | Возвращает список типов пользовательских полей ||
|| [crm.userfield.fields](./crm-userfield-fields.md) | Возвращает описание характеристик пользовательских полей ||
|| [crm.userfield.settings.fields](./crm-userfield-settings-fields.md) | Возвращает описание полей настроек для указанного типа ||
|| [crm.userfield.enumeration.fields](./crm-userfield-enumeration-fields.md) | Возвращает описание полей для пользовательского поля типа `enumeration` ||
|#

## Продолжите изучение

- [{#T}](./userfield-type.md)
- [{#T}](../userfieldconfig/index.md)
- [{#T}](../index.md)
