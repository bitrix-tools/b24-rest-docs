# Сохранить полученное согласие пользователя userconsent.consent.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/userconsent.consent.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"AGREEMENT_ID":19,"USER_ID":123,"IP":"192.168.1.100","URL":"https://example.com/contact-form","ORIGIN_ID":"my_contact_form","ORIGINATOR_ID":"user@example.com","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userconsent.consent.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'userconsent.consent.add',
        params: {
          AGREEMENT_ID: 19,
          USER_ID: 123,
          IP: '192.168.1.100',
          URL: 'https://example.com/contact-form',
          ORIGIN_ID: 'my_contact_form',
          ORIGINATOR_ID: 'user@example.com',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created consent with ID:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addConsent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'userconsent.consent.add',
            params: {
              AGREEMENT_ID: 19,
              USER_ID: 123,
              IP: '192.168.1.100',
              URL: 'https://example.com/contact-form',
              ORIGIN_ID: 'my_contact_form',
              ORIGINATOR_ID: 'user@example.com',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created consent with ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addConsent)
    </script>
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