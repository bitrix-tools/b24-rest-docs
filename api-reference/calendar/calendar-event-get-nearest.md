# Просмотреть список будущих событий для текущего пользователя calendar.event.get.nearest

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.event.get.nearest` возвращает список будущих событий для текущего пользователя.

#|
|| **Параметр** | **Описание** ||
|| **type**
[`string`](../data-types.md) | Тип календаря: 
- user; 
- group. ||
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