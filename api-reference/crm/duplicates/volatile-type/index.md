# Настройки поиска дубликатов по любым полям: обзор методов

Когда в CRM много лидов, контактов и компаний, дубликаты появляются из-за неполных или по-разному заполненных  данных.

Методы `crm.duplicate.volatileType.*` расширяют стандартную проверку дубликатов и позволяют настроить дополнительные поля.

Для поиска дубликатов только по телефону и email используйте [crm.duplicate.findbycomm](../crm-duplicate-find-by-comm.md).

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [поиск и обработка дубликатов в Битрикс24](https://helpdesk.bitrix24.ru/open/10649014/) 

## Связь настроек поиска дубликатов с объектами CRM

Параметр `entityTypeId` задает тип объекта CRM и определяет, для каких объектов методы работают с дополнительными полями поиска.

#|
|| **Тип объекта CRM** | **entityTypeId** ||
|| Лид | `1` ||
|| Контакт | `3` ||
|| Компания | `4` ||
|#

## Что важно учесть

- Можно зарегистрировать не более 7 нестандартных полей суммарно для всех типов объектов
- Для удаления поля нужен `id` записи, его возвращает [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md)

## Как настроить поиск по дополнительным полям

1. Получите доступные поля с помощью метода [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md).
2. Проверьте текущие подключения через [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md).
3. Добавьте нужное поле с помощью метода [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md).
4. Повторно вызовите [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md) и проверьте результат.
5. Удалите поле методом [crm.duplicate.volatileType.unregister](./crm-duplicate-volatile-type-unregister.md), если оно больше не нужно.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: администратор

#|
|| **Метод** | **Описание** ||
|| [crm.duplicate.volatileType.fields](./crm-duplicate-volatile-type-fields.md) | Возвращает список стандартных и пользовательских полей для поиска дубликатов ||
|| [crm.duplicate.volatileType.list](./crm-duplicate-volatile-type-list.md) | Возвращает список дополнительных полей, уже подключенных к поиску дубликатов ||
|| [crm.duplicate.volatileType.register](./crm-duplicate-volatile-type-register.md) | Добавляет поле в настройки поиска дубликатов ||
|| [crm.duplicate.volatileType.unregister](./crm-duplicate-volatile-type-unregister.md) | Удаляет поле из настроек поиска дубликатов ||
|#
