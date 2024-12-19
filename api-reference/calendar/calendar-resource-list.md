# Получить список всех ресурсов calendar.resource.list

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.resource.list` возвращает список (массив) всех ресурсов.

Без параметров.

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod('calendar.resource.list')
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": [
    {
      "ID": "198",
      "NAME": "Resource name",
      "CREATED_BY": "1"
    },
    {
      "ID": "199",
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
[`array`](../data-types.md) | Массив ресурсов ||
|| **ID**
[`string`](../data-types.md) | Идентификатор ресурса ||
|| **NAME**
[`string`](../data-types.md) | Наименование ресурса ||
|| **CREATED_BY**
[`string`](../data-types.md) | Идентификатор создателя ресурса ||
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
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}