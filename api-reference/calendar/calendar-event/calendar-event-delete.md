# Удалить событие calendar.event.delete

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод удаляет событие.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор события.

Получить идентификатор можно методом [calendar.event.get](./calendar-event-get.md) или [calendar.event.get.nearest](./calendar-event-get-nearest.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.details.configuration.forceCommonScopeForAll
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.details.configuration.forceCommonScopeForAll
    ```

- JS

    ```js
    BX24.callMethod(
        'calendar.event.delete',
        {
            id: 698
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.contact.details.configuration.forceCommonScopeForAll',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

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
[`boolean`](../../data-types.md) | Возвращает `true` в случае успешного удаления ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан id события"
}
```
{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан id события | Не передан обязательный параметр `id` ||
|| Пустая строка | При удалении события произошла ошибка | У пользователя нет прав доступа к календарю, календарь не существует или другая ошибка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}