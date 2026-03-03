# Изменить цвет чата im.chat.updateColor

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: участник чата с правом менять оформление

Метод `im.chat.updateColor` обновляет цвет чата для мобильного приложения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../data-types.md) | Идентификатор чата.

Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md) ||
|| **COLOR***
[`string`](../../data-types.md) | Цвет чата для мобильного приложения. Возможные значения:
- `RED` — красный
- `GREEN` — зеленый
- `MINT` — мятный
- `LIGHT_BLUE` — светло-синий
- `DARK_BLUE` — темно-синий
- `PURPLE` — фиолетовый
- `AQUA` — аквамариновый
- `PINK` — розовый
- `LIME` — лаймовый
- `BROWN` — коричневый
- `AZURE` — лазурный
- `KHAKI` — хаки
- `SAND` — песочный
- `MARENGO` — маренго
- `GRAY` — серый
- `GRAPHITE` — графитовый ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"COLOR":"SAND"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.updateColor
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":2935,"COLOR":"SAND","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.chat.updateColor
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.chat.updateColor',
            {
                CHAT_ID: 2935,
                COLOR: 'SAND'
            }
        );
        
        const result = response.getData().result;
        console.log('Updated chat color:', result);
        
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.chat.updateColor',
                [
                    'CHAT_ID' => 2935,
                    'COLOR' => 'SAND'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating chat color: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.updateColor',
        {
            CHAT_ID: 2935,
            COLOR: 'SAND',
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.chat.updateColor',
        [
            'CHAT_ID' => 2935,
            'COLOR' => 'SAND'
        ]
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
        "start": 1772459571,
        "finish": 1772459571.876142,
        "duration": 0.8761420249938965,
        "processing": 0,
        "date_start": "2026-03-02T13:52:51+03:00",
        "date_finish": "2026-03-02T13:52:51+03:00",
        "operating_reset_at": 1772460171,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если цвет чата обновлен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "WRONG_COLOR",
    "error_description": "This color currently unavailable"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` ||
|| `ACCESS_ERROR` | Action unavailable | Операция недоступна для этого чата ||
|| `WRONG_COLOR` | This color currently unavailable | Передан недопустимый цвет ||
|| `WRONG_REQUEST` | This color currently set or chat isn't exists | Цвет уже установлен или чат не существует ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../im-chat-add.md)
- [{#T}](../chat-users/im-chat-user-add.md)
- [{#T}](./im-chat-update-title.md)
- [{#T}](./im-chat-update-avatar.md)
- [{#T}](../im-chat-get.md)
- [{#T}](../im-dialog-get.md)
- [{#T}](../chat-users/im-chat-user-list.md)
- [{#T}](../chat-users/im-chat-user-delete.md)
- [{#T}](../chat-users/im-chat-leave.md)
