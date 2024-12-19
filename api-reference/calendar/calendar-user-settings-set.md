# Сохранить пользовательские настройки календаря calendar.user.settings.set

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.user.settings.set` сохраняет пользовательские настройки календаря.

#|
|| **Параметр**
`тип` | **Описание** ||
|| **settings***
[`object`](../data-types.md) | Список пользовательских настроек ||
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
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod('calendar.user.settings.set',
        {
            settings: {
                view: 'month',
                meetSection: '4',
                crmSection: '4',
                showDeclined: true,
                denyBusyInvitation: false,
                collapseOffHours: 'N',
                showWeekNumbers: 'N',
                showTasks: 'Y',
                syncTasks: 'N',
                showCompletedTasks: 'N',
                lastUsedSection: 'false',
                sendFromEmail: '',
                defaultSections: {
                  user1: '4',
                  group6: '49'
                },
                syncPeriodPast: '3',
                syncPeriodFuture: '12',
                defaultReminders: {
                  fullDay: [
                    {
                      type: 'min',
                      count: 15
                    }
                  ],
                  withTime: [
                    {
                      type: 'min',
                      count: 50
                    }
                  ]
                }
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
  "result": true,
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
[`boolean`](../data-types.md) | Возвращает **true** в случае успешного выполнения ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Не задан обязательный параметр \"settings\" для метода \"calendar.user.settings.set\""
}
```
{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "settings" для метода "calendar.user.settings.set" | Не передан обязательный параметр `settings` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}