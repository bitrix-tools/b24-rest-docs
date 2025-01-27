# О рабочих группах и проектах

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- что это, где лежит, чем проект отличается от рабочей группы, как отличить простой проект от скрам-проекта

{% endnote %}

{% endif %}


{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [socialnetwork.api.workgroup.get](./socialnetwork-api-workgroup-get.md) | Получает данные по рабочей группе ||
    || [socialnetwork.api.workgroup.list](./socialnetwork-api-workgroup-list.md) | Получает список рабочих групп ||
    || [sonet_group.create](./sonet-group-create.md) | Создает группу соцсети ||
    || [sonet_group.update](./sonet-group-update.md) | Изменяет параметры группы соцсети ||
    || [sonet_group.get](./sonet-group-get.md) | Получает список групп соцсети ||
    || [sonet_group.delete](./sonet-group-delete.md) | Удаляет группу соцсети ||
    || [sonet_group.setowner](./sonet-group-setowner.md) | Изменяет владельца группы ||
    || [sonet_group.feature.access](./sonet-group-feature-access.md) | Проверяет права текущего пользователя ||
    || [sonet_group.user.groups](./sonet-group-user-groups.md) | Получает список групп текущего пользователя ||
    |#

- События

    #|
    || **Событие** | **Описание** ||
    || [onSonetGroupAdd](./events/on-sonet-group-add.md) | Вызывается после добавления новой рабочей группы. Прокси к событию `OnSocNetGroupAdd` ||
    || [onSonetGroupDelete](./events/on-sonet-group-delete.md) | Вызывается в момент удаления рабочей группы. Прокси к событию `OnSocNetGroupDelete` ||
    || [onSonetGroupSubjectAdd](./events/on-sonet-group-subject-add.md) | Вызывается после создания темы рабочей группы. Прокси к событию `OnSocNetGroupSubjectAdd` ||
    || [onSonetGroupSubjectDelete](./events/on-sonet-group-subject-delete.md) | Вызывается перед удалением темы рабочей группы. Прокси к событию `OnSocNetGroupSubjectDelete` ||
    || [onSonetGroupSubjectUpdate](./events/on-sonet-group-subject-update.md) | Вызывается после изменения темы рабочей группы. Прокси к событию `OnSocNetGroupSubjectUpdate` ||
    || [onSonetGroupUpdate](./events/on-sonet-group-update.md) | Вызывается после изменения рабочей группы. Прокси к событию `OnSocNetGroupUpdate` ||
    |#

{% endlist %}

## Участники

#|
|| [sonet_group.user.add](./members/sonet-group-user-add.md) | Добавляет пользователей в группу ||
|| [sonet_group.user.delete](./members/sonet-group-user-delete.md) | Удаляет пользователей из группы ||
|| [участников](./members/sonet-group-user-get-expanded.md) | Получает расширенный список ||
|| [sonet_group.user.get](./members/sonet-group-user-get.md) | Получает список участников группы ||
|| [sonet_group.user.invite](./members/sonet-group-user-invite.md) | Приглашает пользователей в группу ||
|| [sonet_group.user.request](./members/sonet-group-user-request.md) | Отправляет запрос на вступление в группу ||
|| [sonet_group.user.update](./members/sonet-group-user-update.md) | Изменяет роль пользователя в группе ||
|#