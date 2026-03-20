#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../../data-types.md) | Признак активности пользователя ||
|| **name**
[`string`](../../../data-types.md) | Имя и фамилия пользователя ||
|| **first_name**
[`string`](../../../data-types.md) | Имя пользователя ||
|| **last_name**
[`string`](../../../data-types.md) | Фамилия пользователя ||
|| **work_position**
[`string`](../../../data-types.md) | Должность пользователя ||
|| **color**
[`string`](../../../data-types.md) | Цвет пользователя в формате hex ||
|| **avatar**
[`string`](../../../data-types.md) | Ссылка на аватар ||
|| **avatar_hr**
[`string`](../../../data-types.md) | Ссылка на аватар высокого разрешения ||
|| **gender**
[`string`](../../../data-types.md) | Пол пользователя ||
|| **birthday**
[`string`](../../../data-types.md) | День рождения в формате `DD-MM` или пустая строка ||
|| **extranet**
[`boolean`](../../../data-types.md) | Признак внешнего пользователя ||
|| **network**
[`boolean`](../../../data-types.md) | Признак пользователя Битрикс24 Network ||
|| **bot**
[`boolean`](../../../data-types.md) | Признак бота ||
|| **connector**
[`boolean`](../../../data-types.md) | Признак пользователя открытых линий ||
|| **external_auth_id**
[`string`](../../../data-types.md) | Код внешней авторизации ||
|| **status**
[`string`](../../../data-types.md) | Статус пользователя ||
|| **idle**
[`datetime`](../../../data-types.md) | Дата бездействия пользователя или `false` ||
|| **last_activity_date**
[`datetime`](../../../data-types.md) | Дата последней активности пользователя ||
|| **mobile_last_date**
[`datetime`](../../../data-types.md) | Дата последней активности в мобильном приложении или `false` ||
|| **desktop_last_date**
[`datetime`](../../../data-types.md) | Дата последней активности в десктопном приложении или `false` ||
|| **absent**
[`datetime`](../../../data-types.md) | Дата окончания отсутствия пользователя или `false` ||
|| **departments**
[`array`](../../../data-types.md) | Массив идентификаторов подразделений ||
|| **phones**
[`object`](../../../data-types.md) | Телефоны пользователя или `false` [(подробное описание)](#phones) ||
|| **bot_data**
[`object`](../../../data-types.md) | Данные бота или `null` ||
|| **type**
[`string`](../../../data-types.md) | Тип пользователя ||
|| **website**
[`string`](../../../data-types.md) | Сайт пользователя ||
|| **email**
[`string`](../../../data-types.md) | Email пользователя ||
|#

#### Объект phones {#phones}

#|
|| **Название**
`тип` | **Описание** ||
|| **personal_mobile**
[`string`](../../../data-types.md) | Мобильный телефон ||
|| **inner_phone**
[`string`](../../../data-types.md) | Внутренний телефон ||
|#
