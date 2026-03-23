# Роли в генераторе документов: обзор методов

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на изменение настроек генератора документов

Роли определяют доступ к настройкам, шаблонам и документам в Генераторе документов.

В параметре запроса `permissions` методов [documentgenerator.role.add](./document-generator-role-add.md) и [documentgenerator.role.update](./document-generator-role-update.md) используйте ключи в верхнем регистре:
- `SETTINGS.MODIFY`
- `TEMPLATES.MODIFY`
- `DOCUMENTS.MODIFY`
- `DOCUMENTS.VIEW`

В ответе метода `documentgenerator.role.get` эти же параметры возвращаются в нижнем регистре:
- `settings.modify`
- `templates.modify`
- `documents.modify`
- `documents.view`

Уровни доступа:
- `""` — нет доступа
- `A` — только свои элементы
- `D` — свои и коллег по отделу
- `X` — полный доступ

Уровни `A` и `D` применяются только к `templates.modify`. Для остальных действий используется `""` или `X`.

Привязка роли к пользователям и группам выполняется методом `documentgenerator.role.fillaccesses` через массив `accesses` с кодами доступа `accessCode` Например:
- `U1` — пользователь с ID `1`
- `D1` — отдел с ID `1`
- `UA` — все авторизованные пользователи

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.role.add](./document-generator-role-add.md) | Добавляет роль и возвращает ее данные с правами ||
|| [documentgenerator.role.update](./document-generator-role-update.md) | Обновляет роль и возвращает актуальные данные роли ||
|| [documentgenerator.role.get](./document-generator-role-get.md) | Возвращает роль по идентификатору вместе с правами ||
|| [documentgenerator.role.list](./document-generator-role-list.md) | Возвращает список ролей без детального состава прав ||
|| [documentgenerator.role.delete](./document-generator-role-delete.md) | Удаляет роль по идентификатору ||
|| [documentgenerator.role.fillaccesses](./document-generator-role-fill-accesses.md) | Полностью перезаписывает привязки ролей к кодам доступа ||
|#
