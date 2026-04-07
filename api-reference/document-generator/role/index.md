# Роли в генераторе документов: обзор методов

Роли задают права доступа к настройкам, шаблонам и документам в Генераторе документов.

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Получите список ролей методом [documentgenerator.role.list](./document-generator-role-list.md)
2. Если нужной роли нет, создайте ее методом [documentgenerator.role.add](./document-generator-role-add.md)
3. Получите состав прав роли методом [documentgenerator.role.get](./document-generator-role-get.md)
4. Назначьте роль пользователям, отделам или рабочим группам методом [documentgenerator.role.fillaccesses](./document-generator-role-fill-accesses.md)
5. При необходимости измените права роли методом [documentgenerator.role.update](./document-generator-role-update.md)
6. Если роль больше не нужна, удалите ее методом [documentgenerator.role.delete](./document-generator-role-delete.md)

{% note info "" %}

Метод [documentgenerator.role.list](./document-generator-role-list.md) не возвращает детальный состав прав для каждой роли. Используйте его, чтобы получить список ролей и выбрать нужный `id`. Подробные данные роли и объект `permissions` получайте методом [documentgenerator.role.get](./document-generator-role-get.md).

{% endnote %}

## Какие права задает роль

В параметре `permissions` права роли сгруппированы в три блока:

- `SETTINGS` — для изменения настроек генератора документов,
- `TEMPLATES` — для работы с шаблонами,
- `DOCUMENTS` — для изменения и просмотра документов.

Внутри этих блоков используются ключи действий `MODIFY` и `VIEW`.

В методах [documentgenerator.role.add](./document-generator-role-add.md) и [documentgenerator.role.update](./document-generator-role-update.md) используйте ключи прав в верхнем регистре, например `SETTINGS.MODIFY`.

```js
permissions: {
    SETTINGS: {
        MODIFY: ''
    },
    TEMPLATES: {
        MODIFY: 'D'
    },
    DOCUMENTS: {
        MODIFY: 'X',
        VIEW: 'X'
    }
}
```

В ответе метода [documentgenerator.role.get](./document-generator-role-get.md) эти же права возвращаются в нижнем регистре, например `settings.modify`.

```json
"permissions": {
    "settings": {
        "modify": ""
    },
    "templates": {
        "modify": "D"
    },
    "documents": {
        "modify": "X",
        "view": "X"
    }
}
```

Для прав используются следующие уровни доступа:
- `""` — нет доступа
- `A` — только свои элементы
- `D` — свои и коллег по отделу
- `X` — полный доступ

Уровни `A` и `D` применяются только к `templates.modify`. Для остальных действий используется `""` или `X`.

## Связь с другими объектами

**Шаблоны документов.** Права роли влияют на работу с шаблонами. Если приложение должно создавать, изменять или просматривать шаблоны, настройте подходящую роль. Затем используйте методы [documentgenerator.template.*](../templates/index.md).

**Документы.** Права роли задают доступ к документам и к методам работы с документами [documentgenerator.document.*](../index.md). Права на документы нужны приложению, если оно создает или читает документы.

**Настройки генератора документов.** Право `SETTINGS.MODIFY` относится к административным настройкам модуля Генератор документов. Если пользователю не нужно менять настройки модуля, это право можно не выдавать даже при доступе к шаблонам и документам.

## Как назначить роль пользователям и группам

Привязка ролей выполняется методом [documentgenerator.role.fillaccesses](./document-generator-role-fill-accesses.md). В массиве `accesses` для каждой привязки передаются:

- `roleId` — идентификатор роли
- `accessCode` — код пользователя, отдела, группы или другой группы доступа

Примеры кодов доступа:

- `U1` — пользователь с идентификатором `1`
- `D1` — отдел с идентификатором `1`
- `AU` — все авторизованные пользователи

Полный список кодов доступа смотрите в описании [метода](./document-generator-role-fill-accesses.md).

Метод [documentgenerator.role.fillaccesses](./document-generator-role-fill-accesses.md) полностью перезаписывает карту привязок роли к кодам доступа. Если нужно сохранить текущие привязки:

1. Получите список ролей методом [documentgenerator.role.list](./document-generator-role-list.md) и выберите нужный `id`
2. Проверьте состав прав роли методом [documentgenerator.role.get](./document-generator-role-get.md)
3. Подготовьте полный список новых привязок и отправьте его в [documentgenerator.role.fillaccesses](./document-generator-role-fill-accesses.md)
4. После изменения еще раз проверьте роль и связанные сценарии доступа

## Что учитывать при изменении прав

Если в `accesses` передать неполные или неверные данные, метод может вернуть `null`, как при успешном выполнении. Нужно дополнительно убедиться, что были отправлены корректные `roleId` и `accessCode`, а затем проверить фактический результат в рабочем сценарии доступа.

Изменение самой роли выполняется методом [documentgenerator.role.update](./document-generator-role-update.md). Он обновляет название, код и права роли. Назначение этой роли пользователям и группам меняется методом [documentgenerator.role.fillaccesses](./document-generator-role-fill-accesses.md).

## Обзор методов {#all-methods}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на изменение настроек генератора документов

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.role.add](./document-generator-role-add.md) | Добавляет роль и возвращает ее данные с правами ||
|| [documentgenerator.role.update](./document-generator-role-update.md) | Обновляет роль и возвращает актуальные данные роли ||
|| [documentgenerator.role.get](./document-generator-role-get.md) | Возвращает роль по идентификатору вместе с правами ||
|| [documentgenerator.role.list](./document-generator-role-list.md) | Возвращает список ролей без детального состава прав ||
|| [documentgenerator.role.delete](./document-generator-role-delete.md) | Удаляет роль по идентификатору ||
|| [documentgenerator.role.fillaccesses](./document-generator-role-fill-accesses.md) | Полностью перезаписывает привязки ролей к кодам доступа ||
|#
