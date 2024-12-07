# Просмотреть список будущих событий для текущего пользователя calendar.event.get.nearest

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.event.get.nearest` возвращает список будущих событий для текущего пользователя.

## Параметры метода

#|
|| **Параметр** | **Описание** ||
|| **type**
[`string`](../data-types.md) | Тип календаря: 
- user; 
- group;
- company_calendar (указывается ownerId == ""). ||
|| **ownerId**
[`integer`](../data-types.md) | Идентификатор владельца календаря. ||
|| **days**
[`integer`](../data-types.md) | Число дней для выборки (по умолчанию - 60). ||
|| **forCurrentUser**
[`boolean`](../data-types.md) | Вывод списка событий для текущего пользователя. ||
|| **maxEventsCount**
[`integer`](../data-types.md) | Максимальное число выводимых событий. ||
|| **detailUrl**
[`string`](../data-types.md) | URL для календаря. ||
|#

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'calendar.event.get.nearest',
        {
            type: 'user',
            ownerId: 2,
            days: 10,
            forCurrentUser: true,
            maxEventsCount: 100,
            detailUrl: '/company/personal/user/#user_id#/calendar/'
        }
    );
    ```

{% endlist %}

Получить события календаря компании:

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'calendar.event.get',
        {
            type: 'company_calendar',
            ownerId: '', // ownerId не указывается при выборке событий календаря компании. Он пустой для всех событий такого типа.
            forCurrentUser: false
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": [
    {
      "ID": "853",
      ...
    },
    {
      "ID": "1221",
      ...
    }
  ],
  "time": {
    "start": 1733411636.753706,
    "finish": 1733411637.040975,
    "duration": 0.28726911544799805,
    "processing": 0.05995798110961914,
    "date_start": "2024-12-05T15:13:56+00:00",
    "date_finish": "2024-12-05T15:13:57+00:00"
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив событий ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Доступ запрещен"
}
```
{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к типу календаря или у пользователя не активирована функциональность календаря ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}