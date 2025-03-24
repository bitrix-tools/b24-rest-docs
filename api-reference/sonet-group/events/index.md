# Рабочие группы и проекты: обзор методов

Рабочие группы и проекты в Битрикс24 помогают организовать командную работу. В группах можно:

-  распределять задачи между участниками, устанавливать сроки выполнения и отслеживать прогресс,

-  обмениваться документами, хранить и совместно редактировать файлы,

-  обсуждать задачи в чатах, оставлять комментарии и проводить онлайн-встречи.

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Рабочие группы и проекты в Битрикс24](https://helpdesk.bitrix24.ru/open/24491358/)

## Чем отличается группа от проекта

Проект — это группа с расширенными возможностями. Его главное отличие от группы — возможность устанавливать сроки. Алгоритм создания группы и проекта идентичен: в обоих случаях используйте метод [sonet_group.create](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-create.html). Для проекта задайте дополнительные параметры:

-  `PROJECT` — указывает, что создаваемый объект является проектом,

-  `PROJECT_DATE_START` — дата начала проекта,

-  `PROJECT_DATE_FINISH` — дата завершения проекта.
  
## Связь рабочих групп и проектов с другими объектами

**Пользователи**. Совместно работают над задачами внутри рабочих групп и проектов. Используйте методы группы sonet_group.user.\*, чтобы управлять участниками рабочих групп: добавлять, удалять, назначать роли и права.

**Задачи**. Нужны, чтобы распределять обязанности между участниками рабочих групп, отслеживать выполнение и контролировать сроки. Создавайте и изменяйте задачи с помощью группы методов [tasks.task.\*](https://apidocs.bitrix24.ru/api-reference/tasks/index.html).

**Диск**. Привязанное к конкретной группе или проекту хранилище с необходимыми для работы материалами. Чтобы управлять хранилищами, используйте группу методов [disk.storage.\*](https://apidocs.bitrix24.ru/api-reference/disk/storage/index.html).

**Универсальные списки**. Структурированные перечни элементов внутри рабочих групп. Нужны, чтобы создавать реестры или хранилища данных, сортировать и фильтровать информацию, автоматизировать учет. Создавайте, обновляйте и удаляйте универсальные списки при помощи методов группы [lists.lists.\*](https://apidocs.bitrix24.ru/api-reference/lists/lists/index.html).

**Лента новостей**. Используйте метод [log.blogpost.add](https://apidocs.bitrix24.ru/api-reference/log/log-blogpost-add.html), чтобы публиковать сообщения, которые будут видны только добавленным в группу пользователям.

> Пользовательская документация
>
> - [Как создать группу и проект](https://helpdesk.bitrix24.ru/open/22699004/)

## Виджеты рабочих групп и проектов

Добавляйте свои пункты в выпадающие меню, чтобы расширить функциональность рабочих групп и проектов:

-  [Пункт основного выпадающего меню проекта SONET_GROUP_DETAIL_TAB](https://apidocs.bitrix24.ru/api-reference/widgets/workgroups/index.html).

-  [Пункт выпадающего меню над списком задач TASK_GROUP_LIST_TOOLBAR](https://apidocs.bitrix24.ru/api-reference/widgets/workgroups/toolbar.html).

-  [Пункт основного выпадающего меню около настроек роботов TASK_ROBOT_DESIGNER_TOOLBAR](https://apidocs.bitrix24.ru/api-reference/widgets/workgroups/robot-designer-toolbar.html).

Код конкретного места встройки виджета указывайте в параметре `PLACEMENT` метода [placement.bind](https://apidocs.bitrix24.ru/api-reference/widgets/placement-bind.html).

## Специализированные рабочие группы: Скрам и Поток

**Скрам в Битрикс24**. Инструмент для организации командной работы по методике Scrum. Позволяет разбивать проекты на спринты — короткие итерации, в течение которых команда выполняет определенный объем задач.

**Поток в Битрикс24**. Инструмент для организации командной работы. Позволяет собирать задачи в одном месте и быстро распределять их между исполнителями.

> Пользовательская документация
> 
> - [Битрикс24 Потоки: начало работы](https://helpdesk.bitrix24.ru/open/21307026/?sphrase_id=145628976)
> 
> - [Битрикс24.Скрам](https://helpdesk.bitrix24.ru/open/13660630/?sphrase_id=145628940)

Скрам и Поток реализованы на базе рабочих групп.

Для создания Скрама используйте метод [создания новой группы](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-create.html). Группа станет Скрамом, если вы заполните поле `SCRUM_MASTER_ID`.

Чтобы привязать Поток к группе, используйте идентификатор `groupId`. Для получения идентификатора используйте метод [создания новой группы](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-create.html) или метод [получения списка групп](https://apidocs.bitrix24.ru/api-reference/sonet-group/socialnetwork-api-workgroup-list.html).

## Обзор методов и событий {#all-methods}

{% list tabs %}

- Методы

    > Scope: [`sonet`](../../scopes/permissions.md)
    >
    > Кто может выполнять метод: любой пользователь

    #|
    || **Метод**                        | **Описание**                                ||
    || [sonet_group.create](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-create.html)              | Создает группу                              ||
    || [sonet_group.update](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-update.html)               | Изменяет параметры группы                   ||
    || [socialnetwork.api.workgroup.get](https://apidocs.bitrix24.ru/api-reference/sonet-group/socialnetwork-api-workgroup-get.html)  | Получает данные по рабочей группе           ||
    || [socialnetwork.api.workgroup.list](https://apidocs.bitrix24.ru/api-reference/sonet-group/socialnetwork-api-workgroup-list.html) | Получает список рабочих групп               ||
    || [sonet_group.get](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-get.html)                  | Получает список групп                       ||
    || [sonet_group.feature.access](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-feature-access.html)       | Проверяет права текущего пользователя       ||
    || [sonet_group.user.groups](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-user-groups.html)          | Получает список групп текущего пользователя ||
    || [sonet_group.setowner](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-setowner.html)             | Изменяет владельца группы                   ||
    || [sonet_group.delete](https://apidocs.bitrix24.ru/api-reference/sonet-group/sonet-group-delete.html)               | Удаляет группу                              ||
    |#

    ### Управление пользователями в группах
    #|
    || **Метод**                        | **Описание**                                ||
    || [sonet_group.user.invite](https://apidocs.bitrix24.ru/api-reference/sonet-group/members/sonet-group-user-invite.html)          | Приглашает пользователей в группу           ||
    || [sonet_group.user.request](https://apidocs.bitrix24.ru/api-reference/sonet-group/members/sonet-group-user-request.html)         | Отправляет запрос на вступление в группу    ||
    || [sonet_group.user.add](https://apidocs.bitrix24.ru/api-reference/sonet-group/members/sonet-group-user-add.html)             | Добавляет пользователей в группу            ||
    || [sonet_group.user.update](https://apidocs.bitrix24.ru/api-reference/sonet-group/members/sonet-group-user-update.html)          | Изменяет роль пользователя в группе         ||
    || [sonet_group.user.get](https://apidocs.bitrix24.ru/api-reference/sonet-group/members/sonet-group-user-get.html)             | Получает список участников группы           ||
    || [sonet_group.user.delete](https://apidocs.bitrix24.ru/api-reference/sonet-group/members/sonet-group-user-delete.html)          | Удаляет пользователей из группы             ||
    |#

- События

    > Scope: [`sonet`](../../scopes/permissions.md)
    >
    > Кто может подписаться: любой пользователь

    #|
    || **Событие**                      | **Вызывается**                              ||
    || [onSonetGroupAdd](https://apidocs.bitrix24.ru/api-reference/sonet-group/events/on-sonet-group-add.html)       | После добавления новой рабочей группы ||
    || [onSonetGroupUpdate](https://apidocs.bitrix24.ru/api-reference/sonet-group/events/on-sonet-group-update.html) | После изменения рабочей группы        ||
    || [onSonetGroupDelete](https://apidocs.bitrix24.ru/api-reference/sonet-group/events/on-sonet-group-delete.html) | В момент удаления рабочей группы         ||
    |#

{% endlist %}