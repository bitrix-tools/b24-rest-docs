# Получить список календарей calendar.section.get

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.section.get` возвращает список календарей. Здесь и в дальнейшем section будет именоваться как "календарь".

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **type***
[`string`](../data-types.md) | Тип календаря: 
- user 
- group 
- company_calendar 
- location 
- другие типы, в том числе пользовательские. ||
|| **ownerId***
[`integer`](../data-types.md) | Идентификатор владельца календаря. ||
|#

Метод может использоваться для бронирования времени в календаре переговорной комнаты через стороннее приложение. В этом случае в **type** необходимо указать `location`, а в **ownerId** - `0`.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'calendar.section.get',
        {
            type: 'user',
            ownerId: 1
        }
    );
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": [
    {
      "ID": "190",
      "NAME": "New Section",
      "GAPI_CALENDAR_ID": null,
      "DESCRIPTION": "Description for section",
      "COLOR": "#9cbeee",
      "TEXT_COLOR": "#283000",
      "EXPORT": {
        "ALLOW": true
      },
      "CAL_TYPE": "user",
      "OWNER_ID": "1",
      "CREATED_BY": "1",
      "DATE_CREATE": "2024-12-10 06:36:00",
      "TIMESTAMP_X": "2024-12-10 06:36:00",
      "CAL_DAV_CON": null,
      "SYNC_TOKEN": null,
      "PAGE_TOKEN": null,
      "EXTERNAL_TYPE": "local",
      "ACCESS": {
        "D114": 17,
        "G2": 13,
        "U2": 15,
        "U1": 19
      },
      "IS_COLLAB": false,
      "PERM": {
        "view_time": true,
        "view_title": true,
        "view_full": true,
        "add": true,
        "edit": true,
        "edit_section": true,
        "access": true
      }
    },
    {
      "ID": "191",
      ...
    }
    {
      "ID": "192",
      ...
    }
  ],
  "time": {
    "start": 1733828946.418185,
    "finish": 1733828946.650208,
    "duration": 0.23202300071716309,
    "processing": 0.0054471492767333984,
    "date_start": "2024-12-08T11:09:06+00:00",
    "date_finish": "2024-12-08T11:09:06+00:00"
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив календарей ||
|| **ID**
[`string`](../data-types.md) | Идентификатор календаря ||
|| **NAME**
[`string`](../data-types.md) | Название календаря ||
|| **GAPI_CALENDAR_ID**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание календаря ||
|| **COLOR**
[`string`](../data-types.md) | Цвет календаря ||
|| **TEXT_COLOR**
[`string`](../data-types.md) | Цвет текста в календаре ||
|| **EXPORT**
[`object`](../data-types.md) | Список параметров экспорта календаря:
- ALLOW [`boolean`](../data-types.md) - экспорт календаря разрешен ||
|| **CAL_TYPE**
[`string`](../data-types.md) | Тип календаря ||
|| **OWNER_ID**
[`string`](../data-types.md) | Идентификатор владельца календаря, пользователя (если тип календаря `user`) либо группы (если тип календаря `group`) ||
|| **CREATED_BY**
[`string`](../data-types.md) | Идентификатор создателя календаря ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания календаря ||
|| **TIMESTAMP_X**
[`datetime`](../data-types.md) | Дата изменения календаря ||
|| **CAL_DAV_CON**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **SYNC_TOKEN**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **PAGE_TOKEN**
[`string`](../data-types.md) | Идентификатор синхронизации ||
|| **EXTERNAL_TYPE**
[`string`](../data-types.md) | Тип провайдера для синхронизации ||
|| **ACCESS**
[`object`](../data-types.md) | Объект ключей доступа для календаря ||
|| **IS_COLLAB**
[`boolean`](../data-types.md) | Флаг принадлежности календаря к коллабе ||
|| **PERM**
[`object`](../data-types.md) | Объект прав доступа текущего пользователя к календарю:
- view_time [`boolean`](../data-types.md) - возможность просмотра времени событий календаря;
- view_title [`boolean`](../data-types.md) - возможность просмотра названия событий календаря;
- view_full [`boolean`](../data-types.md) - возможность полного доступа к информации о событии календаря;
- add [`boolean`](../data-types.md) - возможность добавления событий в календарь;
- edit [`boolean`](../data-types.md) - возможность редактирования событий в календаре;
- edit_section [`boolean`](../data-types.md) - возможность редактирования календаря;
- access [`boolean`](../data-types.md) - возможность полного доступа к календарю ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Не задан обязательный параметр \"type\" для метода \"calendar.section.get\""
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "type" для метода "calendar.section.get" | Не передан обязательный параметр `type` ||
|| Пустая строка | Не задан обязательный параметр "ownerId" для метода "calendar.section.get" | Не передан обязательный параметр `ownerId` и параметр `type` не равен 'user' ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}