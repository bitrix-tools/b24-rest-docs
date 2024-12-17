# Просмотреть занятость пользователей из списка calendar.accessibility.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.accessibility.get` возвращает занятость пользователей из списка.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **users***
[`array`](../data-types.md) | Массив id пользователей. ||
|| **from***
[`date`](../data-types.md) | Дата начала периода для определения занятости. ||
|| **to***
[`date`](../data-types.md) | Дата окончания периода для определения занятости. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod('calendar.accessibility.get',
        {
            from: '2024-06-20',
            to: '2024-12-20',
            users: [1, 2, 34]
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": {
    "1": [
      {
        "ID": "1213",
        "NAME": "Event name",
        "DATE_FROM": "02.12.2024 11:00:00",
        "DATE_TO": "02.12.2024 12:00:00",
        "DATE_FROM_TS_UTC": "1733158800",
        "DATE_TO_TS_UTC": "1733162400",
        "~USER_OFFSET_FROM": -21600,
        "~USER_OFFSET_TO": -21600,
        "DT_SKIP_TIME": "N",
        "TZ_FROM": "America/Managua",
        "TZ_TO": "America/Managua",
        "ACCESSIBILITY": "busy",
        "IMPORTANCE": "normal",
        "EVENT_TYPE": "#collab#"
      },
      {
        "ID": "1216",
        ...
      }
    ],
    "2": [
      {
        "ID": 1,
        ...
      },
      {
        "ID": 2,
        ...
      }
    ],
    "34": []
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Результат содержит объект, где ключи - это идентификаторы пользователей из запроса, а значения являются массивом событий, в которых заняты пользователи в запрашиваемый период ||
|| **ID**
[`string`](../data-types.md) | Идентификатор события. ||
|| **NAME**
[`string`](../data-types.md) | Наименование события. ||
|| **DATE_FROM**
[`datetime`](../data-types.md) | Дата начала события. ||
|| **DATE_TO**
[`datetime`](../data-types.md) | Дата окончания события. ||
|| **DATE_FROM_TS_UTC**
[`string`](../data-types.md) | Таймстамп начала события в UTC. ||
|| **DATE_TO_TS_UTC**
[`string`](../data-types.md) | Таймстамп окончания события в UTC. ||
|| **~USER_OFFSET_FROM**
[`integer`](../data-types.md) | Смещение времени начала события относительно UTC в секундах. ||
|| **~USER_OFFSET_TO**
[`integer`](../data-types.md) | Смещение времени окончания события относительно UTC в секундах. ||
|| **DT_SKIP_TIME**
[`integer`](../data-types.md) | Флаг отображающий что событие длится целый день [Y\|N]. ||
|| **TZ_FROM**
[`integer`](../data-types.md) | Таймзона даты начала события. ||
|| **TZ_TO**
[`integer`](../data-types.md) | Таймзона даты окончания события. ||
|| **ACCESSIBILITY**
[`integer`](../data-types.md) | Доступность участников события:
- busy (занят);
- absent (отсутствую);
- quest (под вопросом);
- free (свободен). ||
|| **IMPORTANCE**
[`string`](../data-types.md) | Важность события:
- high (высокая);
- normal (средняя);
- low (низкая). ||
|| **EVENT_TYPE**
[`string`](../data-types.md) | Тип события. ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Не задан обязательный параметр \"from\" для метода \"calendar.accessibility.get\""
}
```
{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "from" для метода "calendar.accessibility.get" | Не передан обязательный параметр `from` ||
|| Пустая строка | Не задан обязательный параметр "to" для метода "calendar.accessibility.get" | Не передан обязательный параметр `to` ||
|| Пустая строка | Не задан обязательный параметр "users" для метода "calendar.accessibility.get" | Не передан обязательный параметр `users` ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}
