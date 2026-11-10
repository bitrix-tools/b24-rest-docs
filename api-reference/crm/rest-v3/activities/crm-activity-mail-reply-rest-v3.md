# Ответить на письмо v 3.0 crm.activity.mail.reply

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр письма и с доступным почтовым ящиком для отправки

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.activity.mail.reply` отправляет ответ на письмо CRM и сохраняет его новым письмом в той же цепочке и с теми же привязками к элементам CRM. Метод сразу отправляет письмо получателям.

Получателей и тему метод определяет сам:

- на входящее письмо ответ уходит отправителю или на адрес из заголовка `Reply-To`
- на исходящее письмо — получателям исходного письма
- если адресов в письме нет, ответ уходит на первый адрес электронной почты из контактов коммуникации письма
- тема — тема исходного письма с приставкой `Re:`

Адреса отправителя исключаются из получателей. Работает только с письмами — делами с `providerId` равным `CRM_EMAIL`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **activityId***
[`integer`](../../../data-types.md) | Идентификатор письма, на которое нужно ответить.

Идентификатор можно получить методом [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) с условием `["providerId","=","CRM_EMAIL"]` ||
|| **body***
[`string`](../../../data-types.md) | Текст ответа. Пустая строка и строка из пробелов не принимаются ||
|| **cc**
[`string[]`](../../../data-types.md) | Адреса копии ||
|| **bcc**
[`string[]`](../../../data-types.md) | Адреса скрытой копии ||
|| **from**
[`string`](../../../data-types.md) | Адрес отправителя, например `sales@example.com` или `Отдел продаж <sales@example.com>`. Адрес должен быть среди почтовых ящиков и отправителей, доступных пользователю.

По умолчанию: адрес CRM из настроек, если он доступен пользователю, иначе первый доступный отправитель ||
|| **senderId**
[`integer`](../../../data-types.md) | Идентификатор отправителя. Используйте вместе с `from`: адрес отправителя с этим идентификатором должен совпадать с `from` ||
|| **mailboxId**
[`integer`](../../../data-types.md) | Идентификатор почтового ящика. Используйте вместе с `from`: адрес ящика должен совпадать с `from` ||
|#

Общее число получателей в `to`, `cc` и `bcc` ограничено тарифом, например 10 адресов. Получатель ответа входит в это число. На демо-тарифе и на тарифах без синхронизации почты в каждом поле допустим только один адрес.

Метод проверяет адреса до отправки: если в `cc` или `bcc` есть неверный адрес или получателей больше лимита, письмо не отправляется.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.activity.mail.reply`

{% endnote %}

Примеры отвечают на письмо с идентификатором `747` и ставят в копию руководителя.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":747,"body":"Здравствуйте! Спасибо за письмо, ответим до конца дня.","cc":["manager@example.com"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.mail.reply
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":747,"body":"Здравствуйте! Спасибо за письмо, ответим до конца дня.","cc":["manager@example.com"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.activity.mail.reply
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type MailReplyResult = {
      activityId: number
      parentActivityId: number
      from: string
      to: string[]
      warnings: string[]
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<MailReplyResult>(
        'crm.activity.mail.reply',
        {
          activityId: 747,
          body: 'Здравствуйте! Спасибо за письмо, ответим до конца дня.',
          cc: ['manager@example.com'],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Reply sent, activity:', result.activityId)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function replyToMail() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.activity.mail.reply',
            {
              activityId: 747,
              body: 'Здравствуйте! Спасибо за письмо, ответим до конца дня.',
              cc: ['manager@example.com'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Reply sent, activity:', result.activityId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', replyToMail)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.activity.mail.reply"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "activityId": 747,
                "body": "Здравствуйте! Спасибо за письмо, ответим до конца дня.",
                "cc": ["manager@example.com"],
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.mail.reply',
                [
                    'activityId' => 747,
                    'body' => 'Здравствуйте! Спасибо за письмо, ответим до конца дня.',
                    'cc' => ['manager@example.com'],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'crm.activity.mail.reply',
        {
            activityId: 747,
            body: 'Здравствуйте! Спасибо за письмо, ответим до конца дня.',
            cc: ['manager@example.com'],
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.mail.reply',
        [
            'activityId' => 747,
            'body' => 'Здравствуйте! Спасибо за письмо, ответим до конца дня.',
            'cc' => ['manager@example.com'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.mail.reply", b24.Params{
    	"activityId": 747,
    	"body":       "Здравствуйте! Спасибо за письмо, ответим до конца дня.",
    	"cc":         []string{"manager@example.com"},
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.mail.reply: %w", err)
    }

    var result struct {
    	ActivityID       int      `json:"activityId"`
    	ParentActivityID int      `json:"parentActivityId"`
    	From             string   `json:"from"`
    	To               []string `json:"to"`
    	Warnings         []string `json:"warnings"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.ActivityID, result.To)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "activityId": 8473,
        "parentActivityId": 8471,
        "from": "sales@example.com",
        "to": [
            "client@example.com"
        ],
        "cc": [],
        "bcc": [],
        "isSyncedToImap": false,
        "warnings": [
            "No mailbox is configured for the chosen \"from\" address; the message is not mirrored to a Sent IMAP folder. Replies are tracked via Reply-To and the URN."
        ]
    },
    "time": {
        "start": 1793712321,
        "finish": 1793712322.461878,
        "duration": 1.4618780612945557,
        "processing": 1,
        "date_start": "2026-11-03T16:25:21+03:00",
        "date_finish": "2026-11-03T16:25:22+03:00",
        "operating_reset_at": 1793712900,
        "operating": 0.46572399139404297
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Результат отправки ||
|| **result.activityId**
[`integer`](../../../data-types.md) | Идентификатор нового письма CRM с ответом ||
|| **result.parentActivityId**
[`integer`](../../../data-types.md) | Идентификатор письма, на которое отправлен ответ ||
|| **result.from**
[`string`](../../../data-types.md) | Адрес, с которого отправлен ответ ||
|| **result.to**
[`string[]`](../../../data-types.md) | Получатели ответа ||
|| **result.cc**
[`string[]`](../../../data-types.md) | Адреса копии ||
|| **result.bcc**
[`string[]`](../../../data-types.md) | Адреса скрытой копии ||
|| **result.isSyncedToImap**
[`boolean`](../../../data-types.md) | `true`, если письмо сохранено в папке отправленных почтового ящика. `false`, если для адреса отправителя не подключен почтовый ящик: письмо отправлено, но в папку отправленных не попало ||
|| **result.warnings**
[`string[]`](../../../data-types.md) | Предупреждения, которые не помешали отправке ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "CRM_EMAIL_INVALID_REQUEST",
        "message": "body must be a non-empty string."
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `CRM_EMAIL_INVALID_REQUEST` | activityId must be a positive integer. | Передайте `activityId` положительным целым числом. Так же метод проверяет `senderId` и `mailboxId`. HTTP-статус **400** ||
|| `CRM_EMAIL_INVALID_REQUEST` | body must be a non-empty string. | Передайте текст ответа в `body`. HTTP-статус **400** ||
|| `CRM_EMAIL_INVALID_REQUEST` | Parent activity is not a CRM email (PROVIDER_ID must be "CRM_EMAIL"). | Передайте идентификатор письма, а не дела другого вида. HTTP-статус **400** ||
|| `CRM_EMAIL_INVALID_REQUEST` | Cannot determine reply recipients from the parent activity. | В исходном письме нет адресов для ответа. Отправьте письмо методами предыдущей версии с явными получателями. HTTP-статус **400** ||
|| `CRM_EMAIL_ACTIVITY_NOT_FOUND` | Parent CRM email activity not found. | Письма нет или клиент письма скрыт от вас настройками доступа. HTTP-статус **404** ||
|| `CRM_EMAIL_ACCESS_DENIED` | Access denied to the parent CRM email activity. | Нет права на просмотр письма. HTTP-статус **403** ||
|| `CRM_EMAIL_INVALID_RECIPIENT` | Invalid recipient email(s): `#EMAILS#` | Проверьте адреса в `cc` и `bcc`. HTTP-статус **400** ||
|| `CRM_EMAIL_TOO_MANY_RECIPIENTS` | Too many recipients: `#COUNT#`, the limit is `#LIMIT#` total across to/cc/bcc. | Уменьшите число адресов в `cc` и `bcc`. Лимит указан в тексте ошибки, получатель ответа в него входит. HTTP-статус **400** ||
|| `CRM_EMAIL_SEND_FAILED` | Tariff restriction: cannot send to more than `#LIMIT#` recipient(s) per to/cc/bcc field. | Тариф ограничивает число адресов в одном поле. Уменьшите число адресов в `cc` или `bcc`. HTTP-статус **400** ||
|| `CRM_EMAIL_RECIPIENT_BLACKLISTED` | Some recipients are in the global mail blacklist: `#EMAILS#` | Уберите адреса из черного списка почты. HTTP-статус **400** ||
|| `CRM_EMAIL_SENDER_NOT_AVAILABLE` | No available email sender is configured for this user. | Подключите пользователю почтовый ящик или отправителя. HTTP-статус **400** ||
|| `CRM_EMAIL_SENDER_NOT_AVAILABLE` | Sender email is not available for this user. | Адрес из `from` или ящик из `senderId`, `mailboxId` недоступен пользователю. Передайте доступный адрес. HTTP-статус **400** ||
|| `CRM_EMAIL_INVALID_FROM` | Cannot resolve a valid "from" address. | Проверьте адрес в `from`. HTTP-статус **400** ||
|| `CRM_EMAIL_MAIL_MODULE_UNAVAILABLE` | The "mail" module is not available. | Почта недоступна на этом Битрикс24. HTTP-статус **400** ||
|| `CRM_EMAIL_SEND_FAILED` | `#MESSAGE#` | Письмо не отправлено. Повторите запрос позже. HTTP-статус **400** ||
|| `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION` | В поле `activityId` требуется тип данных `int` для такого запроса | Передайте параметр того типа, который указан в описании. HTTP-статус **400** ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-mail-get-content-rest-v3.md)
- [{#T}](./crm-activity-mail-get-thread-rest-v3.md)
