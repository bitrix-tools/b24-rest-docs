# Сохранить полученное согласие пользователя userconsent.consent.add

> Scope: [`userconsent`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `userconsent.consent.add` сохраняет полученное согласие пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **AGREEMENT_ID***
[`integer`](../data-types.md) | Идентификатор соглашения.

Идентификатор можно получить с помощью метода [userconsent.agreement.list](./user-consent-agreement-list.md) ||
|| **IP***
[`string`](../data-types.md) | IP-адрес пользователя ||
|| **USER_ID**
[`integer`](../data-types.md) | Идентификатор пользователя.

Идентификатор можно получить с помощью методов [user.get](../user/user-get.md) и [user.search](../user/user-search.md) ||
|| **URL**
[`string`](../data-types.md) | URL страницы, где было получено согласие ||
|| **ORIGIN_ID**
[`string`](../data-types.md) | Идентификатор источника, например,  `my_contact_form` ||
|| **ORIGINATOR_ID**
[`string`](../data-types.md) | Идентификатор элемента в источнике, например, e-mail ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"AGREEMENT_ID":19,"USER_ID":123,"IP":"192.168.1.100","URL":"https://example.com/contact-form","ORIGIN_ID":"my_contact_form","ORIGINATOR_ID":"user@example.com"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/userconsent.consent.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"AGREEMENT_ID":19,"USER_ID":123,"IP":"192.168.1.100","URL":"https://example.com/contact-form","ORIGIN_ID":"my_contact_form","ORIGINATOR_ID":"user@example.com","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userconsent.consent.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'userconsent.consent.add',
            {
                AGREEMENT_ID: 19,
                USER_ID: 123,
                IP: '192.168.1.100',
                URL: 'https://example.com/contact-form',
                ORIGIN_ID: 'my_contact_form',
                ORIGINATOR_ID: 'user@example.com'
            }
        );
        
        const result = response.getData().result;
        console.log('Created element with ID:', result);
        
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
                'userconsent.consent.add',
                [
                    'AGREEMENT_ID' => 19,
                    'USER_ID' => 123,
                    'IP' => '192.168.1.100',
                    'URL' => 'https://example.com/contact-form',
                    'ORIGIN_ID' => 'my_contact_form',
                    'ORIGINATOR_ID' => 'user@example.com'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding consent: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'userconsent.consent.add',
    {
        AGREEMENT_ID: 19,
        USER_ID: 123,
        IP: "192.168.1.100",
        URL: "https://example.com/contact-form",
        ORIGIN_ID: "my_contact_form",
        ORIGINATOR_ID: "user@example.com"
    },
    function(result) {
        if (result.error()) {
        console.error(result.error());
        } else {
        console.log(result.data());
        }
    }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userconsent.consent.add',
        [
            'AGREEMENT_ID' => 19,
            'USER_ID' => 123,
            'IP' => '192.168.1.100',
            'URL' => 'https://example.com/contact-form',
            'ORIGIN_ID' => 'my_contact_form',
            'ORIGINATOR_ID' => 'user@example.com'
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
"result": 525,
"time": {
    "start": 1760459630,
    "finish": 1760459630.700988,
    "duration": 0.7009880542755127,
    "processing": 0,
    "date_start": "2025-10-14T19:33:50+03:00",
    "date_finish": "2025-10-14T19:33:50+03:00",
    "operating_reset_at": 1760460230,
    "operating": 0
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор добавленного согласия ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"400",
    "error_description":"Parameter `Agreement ID` required."
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | Parameter `Agreement ID` required | Параметр `AGREEMENT_ID` не передан ||
|| `400` | `ERROR_ARGUMENT` | Agreement with id `999` not found | Соглашение с указанным `ID` не найдено ||
|| `400` | `ERROR_ARGUMENT` | — | Невалидный формат IP-адреса ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-consent-agreement-list.md)
- [{#T}](./user-consent-agreement-text.md)