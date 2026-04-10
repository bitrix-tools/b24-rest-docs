# Показать карточку звонка пользователю telephony.externalCall.show

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalCall.show` показывает карточку звонка пользователю или списку пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CALL_ID***
[`string`](../data-types.md) | Идентификатор звонка из метода [telephony.externalCall.register](./telephony-external-call-register.md) ||
|| **USER_ID**
[`integer/array`](../data-types.md) | Идентификатор пользователя или массив идентификаторов пользователей.

Идентификатор можно получить методом [user.get](../user/user-get.md).

По умолчанию — пользователь, указанный при регистрации звонка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CALL_ID":"externalCall.716f1cb73def9700a23842adf9c4c568.1773130779","USER_ID":1269}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/telephony.externalCall.show
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CALL_ID":"externalCall.716f1cb73def9700a23842adf9c4c568.1773130779","USER_ID":1269,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalCall.show
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'telephony.externalCall.show',
            {
                CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
                USER_ID: 1269
            }
        );
        
        const result = response.getData().result;
        console.log('Call shown:', result);
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
                'telephony.externalCall.show',
                [
                    'CALL_ID' => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
                    'USER_ID' => 1269
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error showing call: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalCall.show",
        {
            CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            USER_ID: 1269
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
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
        'telephony.externalCall.show',
        [
            'CALL_ID' => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            'USER_ID' => 1269
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
        "start": 1773131821,
        "finish": 1773131822.195407,
        "duration": 1.1954069137573242,
        "processing": 1,
        "date_start": "2026-03-10T11:37:01+03:00",
        "date_finish": "2026-03-10T11:37:02+03:00",
        "operating_reset_at": 1773132421,
        "operating": 0.2850658893585205
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true` — карточка показана, `false` — звонок не найден ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-call-register.md)
- [{#T}](./telephony-external-call-hide.md)
- [{#T}](./telephony-external-call-finish.md)
