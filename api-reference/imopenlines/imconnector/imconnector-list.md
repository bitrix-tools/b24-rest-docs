# Получить список коннекторов imconnector.list

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом изменения коннекторов открытых линий

Метод `imconnector.list` возвращает список всех коннекторов, которые зарегистрированы в Битрикс24.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %} 

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imconnector.list
    ```

- JS

    ```js
    const response = await $b24.callMethod('imconnector.list', {});
    console.log(response.getData());
    ```

- PHP

    ```php
    $result = $b24Service->core->call(
        'imconnector.list',
        []
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'imconnector.list',
      {},
      function(result) {
        console.log(result.data());
      }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'imconnector.list',
        []
    );
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "livechat": "Онлайн-чат",
        "telegrambot": "Telegram",
        "network": "Битрикс24.Network",
        "myconnector": "Мой коннектор"
    },
    "time": {
        "start": 1738065600.11,
        "finish": 1738065600.17,
        "duration": 0.06,
        "processing": 0.03,
        "date_start": "2025-01-28T12:00:00+00:00",
        "date_finish": "2025-01-28T12:00:00+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект вида `connector_id: connector_name` для доступных коннекторов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "You dont have access to this action"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения OAuth ||
|| `400` | `ACCESS_DENIED` | The ImOpenLines module is not installed | На портале не установлен модуль `imopenlines` ||
|| `400` | `ACCESS_DENIED` | You dont have access to this action | У пользователя нет права изменения коннекторов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imconnector-register.md)
- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-status.md)
- [{#T}](./imconnector-connector-data-set.md)
- [{#T}](./imconnector-unregister.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-chat-name-set.md)
