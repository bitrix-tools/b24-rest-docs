# Предоставить возможность выбрать бронирования ресурсов calendar.resource.booking.list

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.resource.booking.list` предоставляет возможность выбрать бронирования ресурсов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`object`](../data-types.md) | Поля фильтра. ||
|| **resourceTypeIdList***
[`array`](../data-types.md) | Передается список идентификаторов ресурсов, которые можно выбрать методом `calendar.resource.list` ||
|| **from**
[`date`](../data-types.md) | Дата начала периода. ||
|| **to**
[`date`](../data-types.md) | Поля окончания периода. ||
|| **resourceIdList***
[`array`](../data-types.md) | Эти ID берутся из значения UF-поля типа resourcebooking у CRM сущностей LEAD|DEAL ||
|#

## Примеры

**Первый вариант:** для возможности оценить бронирования (занятость) определенных ресурсов на какой-то период. Может использоваться для создания собственных представлений занятости или для использования в логике.

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'calendar.resource.booking.list',
        {
            filter: {
                resourceTypeIdList: [10852, 10888, 10873, 10871, 10853],
                from: '2024-06-20',
                to: '2024-08-20',
            }
        }
    );
    ```

{% endlist %}

**Второй вариант:** возможность выбрать бронирования по их id (это значения UF-поля, привязанного к CRM сущности).

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'calendar.resource.booking.list',
        {
            filter: {
                resourceIdList: [10, 18, 17]
            }
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
      "ID": "1408",
      "PARENT_ID": "1408",
      "DELETED": "N",
      "CAL_TYPE": "resource",
      "OWNER_ID": "0",
      "NAME": "Бронирование",
      "DATE_FROM": "20.12.2024 00:00:00",
      "DATE_TO": "21.12.2024 00:00:00",
      "TZ_FROM": "Europe/Kaliningrad",
      "TZ_TO": "Europe/Kaliningrad",
      "TZ_OFFSET_FROM": "7200",
      "TZ_OFFSET_TO": "7200",
      "DATE_FROM_TS_UTC": "1734652800",
      "DATE_TO_TS_UTC": "1734739200",
      "DT_SKIP_TIME": "Y",
      "DT_LENGTH": 172800,
      "EVENT_TYPE": "#resourcebooking#",
      "CREATED_BY": "1",
      "DATE_CREATE": "18.12.2024 13:55:35",
      "TIMESTAMP_X": "18.12.2024 13:55:35",
      "DESCRIPTION": "Услуга: some",
      "IS_MEETING": false,
      "MEETING_STATUS": "Y",
      "MEETING_HOST": "0",
      "VERSION": "1",
      "SECTION_ID": "198",
      "DATE_FROM_FORMATTED": "Fri Dec 20 2024",
      "DATE_TO_FORMATTED": "Sat Dec 21 2024",
      "SECT_ID": "198",
      "RESOURCE_BOOKING_ID": "1"
    },
    {
      "ID": "1409",
      ...
    }
  ],
  "time": {
    "start": 1733318565.183275,
    "finish": 1733318565.695058,
    "duration": 0.5117831230163574,
    "processing": 0.29406094551086426,
    "date_start": "2024-12-04T13:22:45+00:00",
    "date_finish": "2024-12-04T13:22:45+00:00"
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив объектов бронирования ||
|| **ID**
[`string`](../data-types.md) | Идентификатор бронирования ||
|| **PARENT_ID**
[`string`](../data-types.md) | Для объекта бронирования всегда равен полю `ID` ||
|| **DELETED**
[`string`](../data-types.md) | Флаг отображающий удалено ли бронирование. Возможные значения:
- `Y` — бронирование удалено
- `N` — бронирование не удалено  ||
|| **CAL_TYPE**
[`string`](../data-types.md) | Тип календаря в котором находится бронирование ||
|| **OWNER_ID**
[`string`](../data-types.md) | Для объекта бронирования всегда равно '0' ||
|| **NAME**
[`string`](../data-types.md) | Название бронирования ||
|| **DATE_FROM**
[`datetime`](../data-types.md) | Дата начала бронирования ||
|| **DATE_TO**
[`datetime`](../data-types.md) | Дата окончания бронирования ||
|| **TZ_FROM**
[`string`](../data-types.md) | Таймзона даты начала бронирования ||
|| **TZ_TO**
[`string`](../data-types.md) | Таймзона даты окончания бронирования ||
|| **TZ_OFFSET_FROM**
[`string`](../data-types.md) | Смещение времени начала бронирования относительно UTC в секундах ||
|| **TZ_OFFSET_TO**
[`string`](../data-types.md) | Смещение времени окончания бронирования относительно UTC в секундах ||
|| **DATE_FROM_TS_UTC**
[`string`](../data-types.md) | Дата и время начала бронирования в UTC в формате timestamp ||
|| **DATE_TO_TS_UTC**
[`string`](../data-types.md) | Дата и время окончания бронирования в UTC в формате timestamp ||
|| **DT_SKIP_TIME**
[`string`](../data-types.md) | Флаг отображающий что бронирования длится целый день. Возможные значения:
- `Y` — целый день
- `N` — не целый день ||
|| **DT_LENGTH**
[`integer`](../data-types.md) | Длительность бронирования в секундах ||
|| **EVENT_TYPE**
[`string`](../data-types.md) | Тип бронирования ||
|| **CREATED_BY**
[`string`](../data-types.md) | Идентификатор пользователя, который создал бронирования ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания бронирования ||
|| **TIMESTAMP_X**
[`datetime`](../data-types.md) | Дата изменения бронирования ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание бронирования ||
|| **IS_MEETING**
[`boolean`](../data-types.md) | Для объекта бронирования всегда false ||
|| **MEETING_STATUS**
[`string`](../data-types.md) | Для объекта бронирования всегда 'Y' ||
|| **MEETING_HOST**
[`string`](../data-types.md) | Для объекта бронирования всегда '0' ||
|| **VERSION**
[`string`](../data-types.md) | Версия изменений бронирования ||
|| **SECTION_ID**
[`string`](../data-types.md) | Идентификатор ресурса в котором расположено бронирование ||
|| **DATE_FROM_FORMATTED**
[`string`](../data-types.md) | Форматированная дата начала бронирования ||
|| **DATE_TO_FORMATTED**
[`string`](../data-types.md) | Форматированная дата окончания бронирования ||
|| **SECT_ID**
[`string`](../data-types.md) | Идентификатор ресурса в котором расположено бронирования ||
|| **RESOURCE_BOOKING_ID**
[`integer`](../data-types.md) | Идентификатор бронирования ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Не задан обязательный параметр \"filter['resourceTypeIdList']\" для метода \"calendar.resource.booking.list\""
}
```
{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|| Пустая строка | Не задан обязательный параметр "filter['resourceTypeIdList']" для метода "calendar.resource.booking.list" | Не передан ни один из обязательных параметров `resourceTypeIdList` или `resourceIdList` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}