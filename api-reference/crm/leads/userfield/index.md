# Пользовательские поля лидов: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Пользовательские поля хранят информацию о лиде в различных форматах данных: строка, число, ссылка, адрес и другие.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)

## Как создать пользовательское поле

1. Выберите тип поля. Список доступных типов возвращает метод [crm.userfield.types](../../universal/user-defined-fields/crm-userfield-types.md).
2. Посмотрите, какие настройки поддерживает выбранный тип, методом [crm.userfield.settings.fields](../../universal/user-defined-fields/crm-userfield-settings-fields.md).
3. Создайте поле методом [crm.lead.userfield.add](./crm-lead-userfield-add.md). Обязательные параметры — `FIELD_NAME` и `USER_TYPE_ID`.
4. Проверьте результат методом [crm.lead.userfield.list](./crm-lead-userfield-list.md). Полное имя созданного поля начинается с префикса `UF_CRM_`.
5. Заполняйте поле в лидах методами [crm.lead.add](../crm-lead-add.md) и [crm.lead.update](../crm-lead-update.md), передавая его полное имя.

## Типы пользовательских полей

Метод [crm.userfield.types](../../universal/user-defined-fields/crm-userfield-types.md) возвращает доступные типы полей. Значение `ID` передавайте в параметр `USER_TYPE_ID` при создании поля.

```json
[
    {
        "ID": "string",
        "title": "Строка"
    },
    {
        "ID": "double",
        "title": "Число"
    }
]
```

Метод [crm.userfield.fields](../../universal/user-defined-fields/crm-userfield-fields.md) возвращает список характеристик самого пользовательского поля — тех, что описывают поле, а не хранящееся в нем значение.

```json
{
    "FIELD_NAME": {
        "type": "string",
        "title": "Код",
        "isImmutable": true
    },
    "MANDATORY": {
        "type": "char",
        "title": "Обязательное"
    }
}
```

## Настройки пользовательских полей

Набор настроек зависит от типа поля. Метод [crm.userfield.settings.fields](../../universal/user-defined-fields/crm-userfield-settings-fields.md) возвращает настройки, которые поддерживает запрошенный тип. Например, для типа `double`:

```json
{
    "DEFAULT_VALUE": {
        "type": "double",
        "title": "Значение по умолчанию"
    },
    "PRECISION": {
        "type": "int",
        "title": "Точность"
    }
}
```

Полученные ключи передавайте в объекте `SETTINGS` методов [crm.lead.userfield.add](./crm-lead-userfield-add.md) и [crm.lead.userfield.update](./crm-lead-userfield-update.md).

## Права на работу с полями

Создавать, изменять и удалять пользовательские поля может только пользователь с правом «Разрешить изменять настройки» в CRM. Это одно общее право роли на весь модуль CRM, выдать его отдельно для лидов нельзя.

Читать поля методами [crm.lead.userfield.get](./crm-lead-userfield-get.md) и [crm.lead.userfield.list](./crm-lead-userfield-list.md) может любой пользователь с правом на чтение лидов.

## Ошибки при работе с пользовательскими полями

При создании или удалении пользовательских полей запрос может прерваться с ошибкой [INTERNAL_SERVER_ERROR](../../../../error-codes.md). Это внутренняя ошибка сервера. Причину ошибки можно найти в логах сервера на момент выполнения запроса:

* в облачном Битрикс24 напишите обращение в [техническую поддержку](../../../../bitrix-support.md), чтобы получить детали ошибки
* в коробочном Битрикс24 запросите лог ошибок сервера у администратора сервера или администратора хостинга, после напишите в [техническую поддержку](../../../../bitrix-support.md) и приложите лог для анализа

### Частые причины серверных ошибок

1. Для лидов можно создать 1016 пользовательских полей — это ограничение архитектуры базы данных. Если в Битрикс24 уже есть 1016 полей для лидов, при попытке создать новое поле метод [crm.lead.userfield.add](./crm-lead-userfield-add.md) вернет ошибку [INTERNAL_SERVER_ERROR](../../../../error-codes.md).

    Проверить количество пользовательских полей лидов можно методом [crm.lead.userfield.list](./crm-lead-userfield-list.md).

2. На серверах есть ограничение для времени выполнения одного запроса — `max_execution_time`. Стандартное время — 60 секунд. Если запрос выполняется дольше, он прерывается с ошибкой [INTERNAL_SERVER_ERROR](../../../../error-codes.md).

    Время [создания](./crm-lead-userfield-add.md) или [удаления](./crm-lead-userfield-delete.md) пользовательского поля лидов зависит от количества лидов. Когда поле создается, оно добавляется во все карточки лидов. Когда поле удаляется, оно удаляется из всех карточек. Чем меньше лидов в вашем Битрикс24, тем быстрее создаются и удаляются поля.

    Чтобы проверить количество лидов в Битрикс24, используйте метод [crm.lead.list](../crm-lead-list.md).

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.lead.userfield.add](./crm-lead-userfield-add.md) | Создает новое пользовательское поле для лидов ||
    || [crm.lead.userfield.update](./crm-lead-userfield-update.md) | Обновляет существующее пользовательское поле лидов ||
    || [crm.lead.userfield.get](./crm-lead-userfield-get.md) | Возвращает пользовательское поле лидов по идентификатору ||
    || [crm.lead.userfield.list](./crm-lead-userfield-list.md) | Возвращает список пользовательских полей лидов по фильтру ||
    || [crm.lead.userfield.delete](./crm-lead-userfield-delete.md) | Удаляет пользовательское поле лидов ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmLeadUserFieldAdd](./events/on-crm-lead-user-field-add.md) | При добавлении пользовательского поля вручную или методом [crm.lead.userfield.add](./crm-lead-userfield-add.md) ||
    || [onCrmLeadUserFieldUpdate](./events/on-crm-lead-user-field-update.md) | При изменении пользовательского поля вручную или методом [crm.lead.userfield.update](./crm-lead-userfield-update.md) ||
    || [onCrmLeadUserFieldDelete](./events/on-crm-lead-user-field-delete.md) | При удалении пользовательского поля вручную или методом [crm.lead.userfield.delete](./crm-lead-userfield-delete.md) ||
    || [onCrmLeadUserFieldSetEnumValues](./events/on-crm-lead-user-field-set-enum-values.md) | При изменении набора значений для пользовательского поля списочного типа вручную или методом [crm.lead.userfield.update](./crm-lead-userfield-update.md) ||
    |#

{% endlist %}
