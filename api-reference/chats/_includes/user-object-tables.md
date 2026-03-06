#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../data-types.md) | Признак активности учетной записи пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия пользователя ||
|| **first_name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **last_name**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **work_position**
[`string`](../../data-types.md) | Должность пользователя ||
|| **color**
[`string`](../../data-types.md) | Цвет пользователя в формате HEX ||
|| **avatar**
[`string`](../../data-types.md) 
[`null`](../../data-types.md) | Ссылка на аватар пользователя ||
|| **avatar_hr**
[`string`](../../data-types.md) 
[`null`](../../data-types.md) | Ссылка на аватар высокого разрешения. На текущий момент поле возвращается всегда, независимо от значения `AVATAR_HR` ||
|| **gender**
[`string`](../../data-types.md) | Пол пользователя: `M`, `F` или пустое значение, если не указан ||
|| **birthday**
[`string`](../../data-types.md) | День рождения в формате `DD-MM` или пустая строка ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак экстранет-пользователя ||
|| **network**
[`boolean`](../../data-types.md) | Признак пользователя Битрикс24 Network ||
|| **bot**
[`boolean`](../../data-types.md) | Признак пользователя-бота ||
|| **connector**
[`boolean`](../../data-types.md) | Признак пользователя-коннектора открытых линий ||
|| **external_auth_id**
[`string`](../../data-types.md) | Идентификатор внешней авторизации ||
|| **status**
[`string`](../../data-types.md) | Статус пользователя.

В новом мессенджере поле всегда содержит `online` независимо от фактически установленного статуса. Проверить установленный статус можно методом [im.user.status.get](../users/im-user-status-get.md), изменить — методом [im.user.status.set](../users/im-user-status-set.md) ||
|| **idle**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время перехода в статус «Отошел» в формате ISO 8601 (RFC3339) или `false` ||
|| **last_activity_date**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время последней активности в формате ISO 8601 (RFC3339) или `false` ||
|| **mobile_last_date**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время последней активности в мобильном приложении в формате ISO 8601 (RFC3339) или `false` ||
|| **desktop_last_date**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время последней активности в десктопном приложении в формате ISO 8601 (RFC3339) или `false` ||
|| **absent**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Дата окончания отсутствия в формате ISO 8601 (RFC3339) или `false` ||
|| **departments**
[`array`](../../data-types.md) | Массив идентификаторов подразделений ||
|| **phones**
[`object`](../../data-types.md) 
[`boolean`](../../data-types.md) | Телефоны пользователя или `false`.

Структура объекта подробно описана [ниже](#phones-object) ||
|| **website**
[`string`](../../data-types.md) | Сайт пользователя или пустая строка ||
|| **email**
[`string`](../../data-types.md) | Email пользователя или пустая строка ||
|| **bot_data**
[`object`](../../data-types.md) 
[`null`](../../data-types.md) | Данные бота для пользователей-ботов ||
|| **type**
[`string`](../../data-types.md) | Тип пользователя ||
|#

### Объект phones {#phones-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **personal_mobile**
[`string`](../../data-types.md) | Мобильный телефон ||
|| **work_phone**
[`string`](../../data-types.md) | Рабочий телефон ||
|| **inner_phone**
[`string`](../../data-types.md) | Внутренний телефон ||
|#