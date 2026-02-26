# Поля чата

Данные о чате, которые можно получить с помощью метода [imbot.dialog.get](./imbot-dialog-get.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **parent_chat_id**
[`integer`](../../data-types.md) | Идентификатор родительского чата ||
|| **parent_message_id**
[`integer`](../../data-types.md) | Идентификатор родительского сообщения ||
|| **name**
[`string`](../../data-types.md) | Название чата ||
|| **description**
[`string`](../../data-types.md) | Описание чата ||
|| **owner**
[`integer`](../../data-types.md) | Идентификатор владельца чата ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак экстранет-чата ||
|| **avatar**
[`string`](../../data-types.md) | URL аватара чата ||
|| **color**
[`string`](../../data-types.md) | Цвет чата в формате HEX ||
|| **type**
[`string`](../../data-types.md) | Тип чата ||
|| **counter**
[`integer`](../../data-types.md) | Счетчик сообщений ||
|| **user_counter**
[`integer`](../../data-types.md) | Счетчик пользователя ||
|| **message_count**
[`integer`](../../data-types.md) | Количество сообщений в чате ||
|| **unread_id**
[`integer`](../../data-types.md) | Идентификатор первого непрочитанного сообщения ||
|| **restrictions**
[`object`](../../data-types.md) | Объект с [описанием ограничений](#restrictions) ||
|| **last_message_id**
[`integer`](../../data-types.md) | Идентификатор последнего сообщения ||
|| **last_id**
[`integer`](../../data-types.md) | Идентификатор последнего сообщения ||
|| **marked_id**
[`integer`](../../data-types.md) | Идентификатор помеченного сообщения ||
|| **disk_folder_id**
[`integer`](../../data-types.md) | Идентификатор папки на Диске ||
|| **entity_type**
[`string`](../../data-types.md) | Тип связанного объекта ||
|| **entity_id**
[`string`](../../data-types.md) | Идентификатор связанного объекта ||
|| **entity_data_1**
[`string`](../../data-types.md) | Дополнительные данные объекта ||
|| **entity_data_2**
[`string`](../../data-types.md) | Дополнительные данные объекта ||
|| **entity_data_3**
[`string`](../../data-types.md) | Дополнительные данные объекта ||
|| **mute_list**
[`array`](../../data-types.md) | Список пользователей с выключенными уведомлениями ||
|| **date_create**
[`string`](../../data-types.md) | Дата создания в формате `ISO 8601` ||
|| **message_type**
[`string`](../../data-types.md) | Тип сообщений чата ||
|| **public**
[`string`](../../data-types.md) | Публичный идентификатор чата ||
|| **role**
[`string`](../../data-types.md) | Роль текущего пользователя в чате ||
|| **entity_link**
[`object`](../../data-types.md) | Объект с [ссылкой на сущность](#entity-link) ||
|| **text_field_enabled**
[`boolean`](../../data-types.md) | Разрешен ли ввод текста ||
|| **background_id**
[`integer`](../../data-types.md) | Идентификатор фона чата ||
|| **permissions**
[`object`](../../data-types.md) | Объект с [правами в чате](#permissions) ||
|| **is_new**
[`boolean`](../../data-types.md) | Признак нового чата ||
|| **readed_list**
[`array`](../../data-types.md) | Список [пользователей, прочитавших сообщение](#readed-list-item) ||
|| **manager_list**
[`array`](../../data-types.md) | Список идентификаторов менеджеров чата ||
|| **last_message_views**
[`object`](../../data-types.md) | Информация о [просмотрах последнего сообщения](#last-message-views) ||
|| **dialog_id**
[`string`](../../data-types.md) | Идентификатор диалога ||
|#

## Объект restrictions {#restrictions}

#|
|| **Название**
`тип` | **Описание** ||
|| **avatar**
[`boolean`](../../data-types.md) | Можно изменять аватар ||
|| **rename**
[`boolean`](../../data-types.md) | Можно переименовывать чат ||
|| **extend**
[`boolean`](../../data-types.md) | Можно добавлять участников ||
|| **call**
[`boolean`](../../data-types.md) | Можно совершать звонки ||
|| **mute**
[`boolean`](../../data-types.md) | Можно отключать уведомления ||
|| **leave**
[`boolean`](../../data-types.md) | Можно выйти из чата ||
|| **leave_owner**
[`boolean`](../../data-types.md) | Может ли владелец выйти из чата ||
|| **send**
[`boolean`](../../data-types.md) | Можно отправлять сообщения ||
|| **user_list**
[`boolean`](../../data-types.md) | Можно получать список участников ||
|#

## Объект entity_link {#entity-link}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Тип связанного объекта ||
|| **url**
[`string`](../../data-types.md) | Ссылка на связанный объект ||
|| **id**
[`string`](../../data-types.md) | Идентификатор связанного объекта ||
|#

## Объект permissions {#permissions}

#|
|| **Название**
`тип` | **Описание** ||
|| **manage_users_add**
[`string`](../../data-types.md) | Минимальная роль для добавления пользователей ||
|| **manage_users_delete**
[`string`](../../data-types.md) | Минимальная роль для удаления пользователей ||
|| **manage_ui**
[`string`](../../data-types.md) | Минимальная роль для управления интерфейсом ||
|| **manage_settings**
[`string`](../../data-types.md) | Минимальная роль для управления настройками ||
|| **manage_messages**
[`string`](../../data-types.md) | Минимальная роль для управления сообщениями ||
|| **can_post**
[`string`](../../data-types.md) | Минимальная роль для отправки сообщений ||
|#

## Объект readed_list.item {#readed-list-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **user_id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **user_name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **message_id**
[`integer`](../../data-types.md) | Идентификатор последнего прочитанного сообщения ||
|| **date**
[`string`](../../data-types.md) | Дата прочтения в формате `ISO 8601` ||
|#

## Объект last_message_views {#last-message-views}

#|
|| **Название**
`тип` | **Описание** ||
|| **message_id**
[`integer`](../../data-types.md) | Идентификатор сообщения ||
|| **first_viewers**
[`array`](../../data-types.md) | Список [первых просмотревших пользователей](#last-message-views-first-viewers-item) ||
|| **count_of_viewers**
[`integer`](../../data-types.md) | Количество просмотров ||
|#

## Объект last_message_views.first_viewers.item {#last-message-views-first-viewers-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **user_id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **user_name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **date**
[`string`](../../data-types.md) | Дата просмотра в формате `ISO 8601` ||
|#
