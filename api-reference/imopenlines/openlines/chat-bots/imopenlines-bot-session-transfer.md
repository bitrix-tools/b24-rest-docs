# Переключить диалог на оператора по Id imopenlines.bot.session.transfer

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`imopenlines, imbot`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод переключает разговор на конкретного оператора.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Пример** | **Описание** | **Ревизия** ||
|| **CHAT_ID***
[`unknown`](../../../data-types.md) | `112` | Идентификатор чата | 1 ||
|| **USER_ID***
[`unknown`](../../../data-types.md) | `12` | Идентификатор пользователя, на которого осуществляется перенаправление | 1 ||
|| **LEAVE***
[`unknown`](../../../data-types.md) | `N` | Y/N. Если указано N — чат-бот не покинет данный чат после переадресации и будет присутствовать до момента подтверждения пользователя | 1 ||
|#

{% note info %}

Вместо `USER_ID` можно указать `QUEUE_ID` для переключения на другую открытую линию. `ID` открытой линии можно получить методом [imopenlines.config.list.get](../imopenlines-config-list-get.md).

{% endnote %}

## Примеры

{% include [Пояснение о restCommand](../../../chat-bots/_includes/rest-command.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112,"USER_ID":12,"LEAVE":"N"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/imopenlines.bot.session.transfer
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CHAT_ID":112,"USER_ID":12,"LEAVE":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imopenlines.bot.session.transfer
    ```

- JS

    ```js  
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.bot.session.transfer',
            {
                CHAT_ID: 112,
                USER_ID: 12,
                LEAVE: 'N'
            }
        );
        
        const result = response.getData().result;
        console.log('Диалог успешно переведен:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Ошибка:', error);
    }
    ```

- PHP

    ```php  
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.bot.session.transfer',
                [
                    'CHAT_ID' => 112,
                    'USER_ID' => 12,
                    'LEAVE' => 'N'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error transferring session: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.bot.session.transfer', 
        {
            CHAT_ID: 112,
            USER_ID: 12, 
            LEAVE: 'N'  
        },
        function(result) {
            if (result.error()) {
                console.error('Ошибка:', result.error().ex);
            } else {
                console.log('Диалог успешно переведен:', result.data());
            }
        }
    );
    ```	

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imopenlines.bot.session.transfer',
        [
            'CHAT_ID' => 112,
            'USER_ID' => 12,
            'LEAVE' => 'N'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

## Ответ в случае ошибки

```json
{
    "error": "CHAT_ID_EMPTY",
    "error_description": "Не передан идентификатор чата"
}
```

### Описание ключей

- `error` – код возникшей ошибки
- `error_description` – краткое описание возникшей ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **CHAT_ID_EMPTY** | Не передан идентификатор чата ||
|| **USER_ID_EMPTY** | Не передан идентификатор пользователя, на которого необходимо переадресовать разговор ||
|| **WRONG_CHAT** | Указан некорректный идентификатор пользователя или этот пользователь является чат-ботом или экстранет пользователем ||
|| **BOT_ID_ERROR** | Неправильный идентификатор чат-бота ||
|#