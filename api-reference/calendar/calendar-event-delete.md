# Удалить событие calendar.event.delete

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.event.delete` удаляет событие.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор события. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'calendar.event.delete',
        {
            id: 698
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
    "start": 1733404941.508815,
    "finish": 1733404942.004014,
    "duration": 0.49519896507263184,
    "processing": 0.2604491710662842,
    "date_start": "2024-12-05T13:22:21+00:00",
    "date_finish": "2024-12-05T13:22:22+00:00"
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Возвращает **true** в случае успешного удаления. ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Не задан id события"
}
```