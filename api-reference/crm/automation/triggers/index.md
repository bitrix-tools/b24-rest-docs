# Триггеры автоматизации CRM: обзор методов

Триггеры автоматизации CRM помогают приложению передавать внешние события в CRM. Если для объекта настроен триггер приложения, событие может перевести его на нужную стадию или в статус.

Группа методов `crm.automation.trigger.*` позволяет зарегистрировать триггер приложения, получить список зарегистрированных триггеров, отправить событие в автоматизацию CRM и удалить ненужный триггер.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Триггеры в CRM](https://helpdesk.bitrix24.ru/open/24473054/)

{% note info "" %}

Методы раздела работают только в контексте [приложения](../../../../settings/app-installation/index.md).

{% endnote %}

## Как начать работу

1. Зарегистрируйте триггер методом [crm.automation.trigger.add](./crm-automation-trigger-add.md)

2. Привяжите зарегистрированный триггер к нужной стадии или статусу в настройках автоматизации Битрикс24

3. При необходимости получите список триггеров приложения методом [crm.automation.trigger.list](./crm-automation-trigger-list.md)

4. Подготовьте идентификаторы объекта CRM: `OWNER_TYPE_ID` и `OWNER_ID`

5. Запустите триггер методом [crm.automation.trigger.execute](./crm-automation-trigger-execute.md)

6. Удалите нужный триггер методом [crm.automation.trigger.delete](./crm-automation-trigger-delete.md)

## Ключевые параметры

**CODE.** Идентификатор триггера внутри приложения. Приложение задает его при регистрации триггера в методе [crm.automation.trigger.add](./crm-automation-trigger-add.md). Затем этот идентификатор используют в методах [crm.automation.trigger.execute](./crm-automation-trigger-execute.md) и [crm.automation.trigger.delete](./crm-automation-trigger-delete.md).

Если передать существующий `CODE` в метод `add`, метод обновит параметр `NAME` триггера.

**OWNER_TYPE_ID.** Идентификатор типа объекта CRM. Используется в методе [crm.automation.trigger.execute](./crm-automation-trigger-execute.md). Тип объекта должен поддерживать автоматизацию CRM.

**OWNER_ID.** Идентификатор конкретного объекта CRM. Используется в методе [crm.automation.trigger.execute](./crm-automation-trigger-execute.md).

## Что важно учитывать

- Метод [crm.automation.trigger.execute](./crm-automation-trigger-execute.md) отправляет событие в автоматизацию CRM, но не подтверждает смену стадии или статуса

- Смена стадии или статуса произойдет, только если для нужного объекта уже настроен триггер текущего приложения с тем же `CODE`

## Связь с другими объектами

**Автоматизация CRM.** После регистрации триггер приложения можно выбрать методами раздела [Автоматизация CRM](../index.md) и привязать к нужной стадии или статусу.

**Объекты CRM.** В методе [crm.automation.trigger.execute](./crm-automation-trigger-execute.md) параметры `OWNER_TYPE_ID` и `OWNER_ID` определяют тип объекта CRM и конкретный объект для запуска триггера. Значение `OWNER_TYPE_ID` можно получить методом [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md). Идентификатор `OWNER_ID` получают универсальным методом [crm.item.list](../../universal/crm-item-list.md).

## Обзор методов  {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор с доступом к CRM в контексте приложения

#|
|| **Метод** | **Описание** ||
|| [crm.automation.trigger.add](./crm-automation-trigger-add.md) | Добавляет триггер приложения ||
|| [crm.automation.trigger.list](./crm-automation-trigger-list.md) | Получает список триггеров приложения ||
|| [crm.automation.trigger.execute](./crm-automation-trigger-execute.md) | Запускает триггер для объекта CRM ||
|| [crm.automation.trigger.delete](./crm-automation-trigger-delete.md) | Удаляет триггер ||
|#
