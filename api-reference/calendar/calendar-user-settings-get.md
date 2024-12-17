# Получить пользовательские настройки календаря calendar.user.settings.get

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.user.settings.get` возвращает пользовательские настройки календаря.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod('calendar.user.settings.get', {});
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": {
    "view": "month",
    "meetSection": "4",
    "crmSection": "4",
    "showDeclined": true,
    "denyBusyInvitation": false,
    "collapseOffHours": "N",
    "showWeekNumbers": "N",
    "showTasks": "Y",
    "syncTasks": "N",
    "showCompletedTasks": "N",
    "lastUsedSection": "false",
    "sendFromEmail": "",
    "defaultSections": {
      "user1": "4",
      "group6": "49"
    },
    "syncPeriodPast": "3",
    "syncPeriodFuture": "12",
    "defaultReminders": {
      "fullDay": [
        {
          "type": "min",
          "count": 15
        }
      ],
      "withTime": [
        {
          "type": "min",
          "count": 50
        }
      ]
    },
    "timezoneName": "Europe/Kaliningrad",
    "timezoneOffsetUTC": 7200,
    "timezoneDefaultName": "",
    "work_time_start": "9.00",
    "work_time_end": "19.00"
  },
  "time": {
    "start": 1734434829.455204,
    "finish": 1734434829.797482,
    "duration": 0.34227800369262695,
    "processing": 0.0038161277770996094,
    "date_start": "2024-12-17T11:27:09+00:00",
    "date_finish": "2024-12-17T11:27:09+00:00"
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **view**
[`string`](../data-types.md) | Стандартное представление для календаря (day, week, month, list) ||
|| **meetSection**
[`string`](../data-types.md) | Календарь для приглашений ||
|| **crmSection**
[`string`](../data-types.md) | Календарь для CRM ||
|| **showDeclined**
[`boolean`](../data-types.md) | Показывать события, в которых пользователь отказался принять участие ||
|| **denyBusyInvitation**
[`boolean`](../data-types.md) | Запрещать приглашать в событие, если время занято ||
|| **collapseOffHours**
[`string`](../data-types.md) | Скрывать нерабочее время в календаре в недельном и дневном представлении [Y\|N] ||
|| **showWeekNumbers**
[`string`](../data-types.md) | Показывать номер недель [Y\|N] ||
|| **showTasks**
[`string`](../data-types.md) | Отображать задачи [Y\|N] ||
|| **syncTasks**
[`string`](../data-types.md) | Синхронизировать календарь задач [Y\|N] ||
|| **showCompletedTasks**
[`string`](../data-types.md) | Отображать завершенные задачи [Y\|N] ||
|| **lastUsedSection**
[`string`](../data-types.md) | Идентификатор календаря, который используется при создании событий, если в параметрах не передан идентификатор календаря. 'false' - по умолчанию. ||
|| **sendFromEmail**
[`string`](../data-types.md) | E-mail для отправки почтовых приглашений ||
|| **defaultSections**
[`object`](../data-types.md) | Настройки предустановленных календарей.
Ключем объекта настроек может быть `user` (календарь пользователя) или `group` (календарь группы) с указанием идентификатора соответствующего объекта, например `user1` соответствует календарю пользователя с идентификатором 1.
Значением объекта является идентификатор календаря. ||
|| **syncPeriodPast**
[`string`](../data-types.md) | Количество месяцев для синхронизации в прошлом периоде ||
|| **syncPeriodFuture**
[`string`](../data-types.md) | Количество месяцев для синхронизации в будущем периоде ||
|| **defaultReminders**
[`object`](../data-types.md) | Стандартные настройки напоминаний о событии:
- fullDay [`array`](../data-types.md) - ключ для массива стандартных настроек напоминаний целодневных событий
  - type [`string`](../data-types.md) - временной тип напоминания (min, hour, day);
  - count [`integer`](../data-types.md) - числовое значение временного промежутка.
- withTime [`array`](../data-types.md) - ключ для массива стандартных настроек напоминаний событий с указанием времени
  - type [`string`](../data-types.md) - временной тип напоминания (min, hour, day);
  - count [`integer`](../data-types.md) - числовое значение временного промежутка.
||
|| **timezoneName**
[`string`](../data-types.md) | Таймзона календаря ||
|| **timezoneOffsetUTC**
[`integer`](../data-types.md) | Смешение таймзоны относительно UTC в секундах ||
|| **timezoneDefaultName**
[`string`](../data-types.md) | Если параметр `timezoneName` ещё не установлен, здесь будет указан часовой пояс соответствующий параметру `timezoneOffsetUTC` ||
|| **work_time_start**
[`string`](../data-types.md) | Время начала рабочего дня ||
|| **work_time_end**
[`string`](../data-types.md) | Время окончания рабочего дня ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}