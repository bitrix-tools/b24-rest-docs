#|
|| **Параметр**
`тип` | **Описание** ||
|| **DOMAIN***
[`string`](../../data-types.md) | Адрес Битрикс24, на котором был вызван обрабтчик виджета ||
|| **PROTOCOL***
[`string`](../../data-types.md) | Защищенный или не защищенный протокол HTTP:

- `0` - HTTP
- `1` - HTTPS
 ||
|| **LANG***
[`string`](../../data-types.md) | Язык интерфейса пользователя Битрикс24, который вызвал виджет. Вы можете локализовать язык интерфейса в своём виджете, ориентируясь на это значение ||
|| **APP_SID**
[`string`](../../data-types.md) | Строковый идентификатор приложения, зарегистрировавшего обработчик виджета ||
|| **AUTH_ID**
[`string`](../../data-types.md) | Авторизационный токен [OAuth 2](../../oauth/simple-way.md), выписанный для пользователя, вызвавшего виджет. Можно использовать для вызовов REST API от лица этого пользователя ||
|| **AUTH_EXPIRES**
[`integer`](../../data-types.md) | Время в секундах, после которого авторизационный токен станет неактуальным ||
|| **REFRESH_ID**
[`string`](../../data-types.md) | Refresh-токен [OAuth 2](../../oauth/simple-way.md), выписанный для пользователя, вызвавшего виджет. Можно использовать для обновления авторизационного токена от лица этого пользователя ||
|| **member_id***
[`string`](../../data-types.md) | Уникальный строковый идентификатор Битрикс24, на котором был вызван обработчик виджета.  ||
|| **status**
[`string`](../../data-types.md) | Тип приложения, зарегистрировавшего обработчик данного виджета. Принимает значения:

- `L` - [локальное](../../../local-integrations/local-apps.md) приложение
- `F` - [бесплатное тиражное](../../../market/index.md) приложение
- `S` - [подписное тиражное](../../../market/monetization/index.md) приложение
||
|| **PLACEMENT***
[`string`](../../data-types.md) | Код места встройки виджета. Вы можете использовать один и тот же URL обработчка для всех своих виджетов. Значение, которое Битрикс24 будет сообщать в параметре `PLACEMENT`, поможет определить, из какого именно места встройки виджета был вызван ваш обработчик в каждом конкретном случае ||
|| **PLACEMENT_OPTIONS**
[`string`](../../data-types.md) | Дополнительные данные в виде JSON-строки, определяющие контекст выполнения виджета. Например, это может быть массив, содержащий числовой идентификатор элемента CRM, в карточке которого был вызван обработчик виджета, и т.д. Параметр `PLACEMENT_OPTIONS` вместе с параметром `PLACEMENT` позволяет точно определить, для какого именно места встройки виджета и объекта был вызван обработчик виджета. ||
|#
