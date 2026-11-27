# Ответить на письмо v 3.0 crm.activity.email.reply

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр письма и правом на изменение элемента CRM, к которому оно привязано. Пользователю должен быть доступен почтовый ящик или отправитель

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.activity.email.reply` отправляет ответ на письмо CRM и сохраняет его новым письмом в той же цепочке и с теми же привязками к элементам CRM. Метод сразу отправляет письмо получателям и возвращает новое письмо в том же виде, что и метод [crm.activity.email.get](./crm-activity-email-get-rest-v3.md). Метод заменяет устаревший `crm.activity.mail.reply`.

Получателей и тему метод определяет сам:

- на входящее письмо ответ уходит на адрес из заголовка `Reply-To` или отправителю
- на исходящее письмо — получателям исходного письма
- если адресов в письме нет, ответ уходит на первый адрес электронной почты из контактов коммуникации письма
- тема — тема исходного письма с приставкой `Re:`

Адреса ящиков, с которых велась переписка, исключаются из получателей. Метод работает только с письмами — делами с `providerId` равным `CRM_EMAIL`.

Метод поддерживает заголовок `Idempotency-Key`: повтор запроса с тем же ключом вернет первый ответ и не отправит письмо второй раз. Подробнее — в разделе [Повторный вызов без дублей](../../../rest-v3.md#idempotency).

Имя метода пишется в нижнем регистре: `crm.activity.email.reply`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор письма, на которое нужно ответить.

Идентификатор можно получить методом [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) с условием `["providerId","=","CRM_EMAIL"]` ||
|| **fields***
[`object`](../../../data-types.md) | Поля ответа. [Подробное описание](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **body***
[`string`](../../../data-types.md) | Текст ответа. Пустая строка и строка из пробелов не принимаются ||
|| **cc**
[`string[]`](../../../data-types.md) | Адреса копии ||
|| **bcc**
[`string[]`](../../../data-types.md) | Адреса скрытой копии ||
|| **from**
[`string`](../../../data-types.md) | Адрес отправителя, например `sales@example.com` или `Отдел продаж <sales@example.com>`. Адрес должен быть среди почтовых ящиков и отправителей, доступных пользователю.

По умолчанию: адрес CRM из настроек, если он доступен пользователю, иначе первый доступный отправитель. Пустая строка равносильна отсутствию `from` ||
|| **senderId**
[`integer`](../../../data-types.md) | Идентификатор отправителя. Используйте вместе с `from`: адрес отправителя с этим идентификатором должен совпадать с `from` ||
|| **mailboxId**
[`integer`](../../../data-types.md) | Идентификатор почтового ящика. Используйте вместе с `from`: адрес ящика должен совпадать с `from` ||
|#

Других полей `fields` не принимает: получатели `to`, тема `subject` и привязки ответа берутся из исходного письма. На любое другое поле метод отвечает ошибкой валидации.

Общее число получателей в `to`, `cc` и `bcc` ограничено, получатель ответа входит в это число. Тариф может ограничивать и число адресов в одном поле. Адреса из `cc`, которые уже есть среди получателей, и адреса из `bcc`, которые есть среди получателей или в `cc`, метод убирает.

Метод проверяет адреса и отправителя до отправки: если в `cc` или `bcc` есть неверный адрес, получателей больше лимита или отправитель недоступен, письмо не отправляется.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.activity.email.reply`

{% endnote %}

Примеры отвечают на письмо с идентификатором `8691`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8691,"fields":{"body":"Спасибо за письмо! Ответим до конца дня.","from":"manager@example.com"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.email.reply
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8691,"fields":{"body":"Спасибо за письмо! Ответим до конца дня.","from":"manager@example.com"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.activity.email.reply
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EmailReplyResult = {
      item: {
        id: number
        subject: string
        from: string | null
        to: string[] | null
        parentActivityId: number | null
        body: string | null
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<EmailReplyResult>(
        'crm.activity.email.reply',
        {
          id: 8691,
          fields: {
            body: 'Спасибо за письмо! Ответим до конца дня.',
            from: 'manager@example.com',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Reply sent:', result.item.id, result.item.to)
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
      async function replyToEmail() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.activity.email.reply',
            {
              id: 8691,
              fields: {
                body: 'Спасибо за письмо! Ответим до конца дня.',
                from: 'manager@example.com',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Reply sent:', result.item.id, result.item.to)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', replyToEmail)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.activity.email.reply"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 8691,
                "fields": {
                    "body": "Спасибо за письмо! Ответим до конца дня.",
                    "from": "manager@example.com",
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["item"])
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
                'crm.activity.email.reply',
                [
                    'id' => 8691,
                    'fields' => [
                        'body' => 'Спасибо за письмо! Ответим до конца дня.',
                        'from' => 'manager@example.com',
                    ],
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
        'crm.activity.email.reply',
        {
            id: 8691,
            fields: {
                body: 'Спасибо за письмо! Ответим до конца дня.',
                from: 'manager@example.com',
            },
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
        'crm.activity.email.reply',
        [
            'id' => 8691,
            'fields' => [
                'body' => 'Спасибо за письмо! Ответим до конца дня.',
                'from' => 'manager@example.com',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.email.reply", b24.Params{
    	"id": 8691,
    	"fields": map[string]any{
    		"body": "Спасибо за письмо! Ответим до конца дня.",
    		"from": "manager@example.com",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.activity.email.reply: %w", err)
    }

    var result struct {
    	Item struct {
    		ID               int      `json:"id"`
    		Subject          string   `json:"subject"`
    		From             *string  `json:"from"`
    		To               []string `json:"to"`
    		ParentActivityID *int     `json:"parentActivityId"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.Subject, result.Item.To)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "subject": "Re: Вопрос по доставке",
            "direction": "outgoing",
            "communications": [
                {
                    "type": "EMAIL",
                    "value": "client@example.com",
                    "entityTypeId": 2,
                    "entityId": 741
                }
            ],
            "from": "manager@example.com",
            "to": [
                "client@example.com"
            ],
            "cc": [],
            "bcc": [],
            "parentActivityId": 8691,
            "body": "Спасибо за письмо! Ответим до конца дня.\n\nОтправлено из «Битрикс24»",
            "isBodyTruncated": false,
            "id": 8697,
            "providerId": "CRM_EMAIL",
            "isCompleted": true,
            "assignedById": 1,
            "authorId": 1,
            "editorId": 1,
            "createdTime": "2026-11-27T12:41:56+03:00",
            "updatedTime": "2026-11-27T12:41:58+03:00",
            "startTime": "2026-11-27T12:41:56+03:00",
            "endTime": "2026-11-27T12:41:56+03:00",
            "deadlineTime": "2026-11-27T12:41:56+03:00",
            "bindings": [
                {
                    "entityTypeId": 2,
                    "entityId": 741
                },
                {
                    "entityTypeId": 3,
                    "entityId": 71
                }
            ]
        }
    },
    "time": {
        "start": 1795772516,
        "finish": 1795772518.192819,
        "duration": 2.192819118499756,
        "processing": 2,
        "date_start": "2026-11-27T12:41:56+03:00",
        "date_finish": "2026-11-27T12:41:58+03:00",
        "operating_reset_at": 1795773060,
        "operating": 3.965543031692505
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../../data-types.md) | Новое письмо с ответом со всеми полями, как в ответе метода crm.activity.email.get. В `parentActivityId` — идентификатор письма, на которое отправлен ответ. [Описание полей письма](./crm-activity-email-get-rest-v3.md#fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "CRM_EMAIL_SENDER_NOT_AVAILABLE",
        "message": "Sender email is not available for this user."
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` письма ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|| `id` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` с текстом ответа ||
|| `body` | body is required. | Передайте текст ответа в `fields.body` ||
|| `body` | body must be a non-empty string. | Передайте в `body` непустой текст ||
|| `#FIELD#` | `#FIELD#` is not accepted by a reply: the answer goes to the thread of the letter. | Уберите поле из `fields`. Ответ принимает только `body`, `cc`, `bcc`, `from`, `senderId` и `mailboxId` ||
|| `cc.#INDEX#`, `bcc.#INDEX#` | `#FIELD#` must contain email addresses only. | Уберите пустые строки из `cc` и `bcc` ||
|| `cc`, `bcc` | В поле `#FIELD#` требуется тип данных `array` для такого запроса | Передайте адреса массивом строк, даже если адрес один ||
|| `senderId`, `mailboxId` | В поле `#FIELD#` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|#

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `cc`, `bcc` | Неправильный тип аргумента | Передайте адреса строками ||
|| `senderId`, `mailboxId` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `EmailActivityDto` | Передайте `fields` объектом с именами полей, а не строкой или массивом ||
|#

#### Письмо не найдено

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Письма нет, дело с этим идентификатором не письмо, у вас нет права на просмотр письма или клиент письма скрыт от вас настройками доступа. Проверьте `id` методом [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) с условием `["providerId","=","CRM_EMAIL"]` ||
|#

#### Ошибки отправки

Коды ошибок `CRM_EMAIL_*` возвращаются, если письмо не удалось отправить. HTTP-статус **400**, если в описании не указан другой.

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `CRM_EMAIL_INVALID_RECIPIENT` | Invalid recipient email(s): `#EMAILS#` | Проверьте адреса в `cc` и `bcc` ||
|| `CRM_EMAIL_TOO_MANY_RECIPIENTS` | Too many recipients: `#COUNT#`, the limit is `#LIMIT#` total across to/cc/bcc. | Уменьшите число адресов в `cc` и `bcc`. Лимит указан в тексте ошибки, получатель ответа в него входит ||
|| `CRM_EMAIL_SEND_FAILED` | Tariff restriction: cannot send to more than `#LIMIT#` recipient(s) per to/cc/bcc field. | Тариф ограничивает число адресов в одном поле. Уменьшите число адресов в `cc` или `bcc` ||
|| `CRM_EMAIL_RECIPIENT_BLACKLISTED` | Some recipients are in the global mail blacklist: `#EMAILS#` | Уберите адреса из черного списка почты ||
|| `CRM_EMAIL_SENDER_NOT_AVAILABLE` | No available email sender is configured for this user. | Подключите пользователю почтовый ящик или добавьте отправителя ||
|| `CRM_EMAIL_SENDER_NOT_AVAILABLE` | Sender email is not available for this user. | Адрес из `from` недоступен пользователю, или ящик `mailboxId` либо отправитель `senderId` не совпадает с `from`. Передайте доступный адрес, а `mailboxId` и `senderId` — только вместе с `from` ||
|| `CRM_EMAIL_INVALID_FROM` | Sender email is not available for this user. | В `from` передан не адрес электронной почты. Передайте адрес, например `sales@example.com` ||
|| `CRM_EMAIL_INVALID_FROM` | Cannot resolve a valid "from" address. | У выбранного отправителя неверный адрес. Передайте в `from` другой доступный адрес ||
|| `CRM_EMAIL_INVALID_REQUEST` | Cannot determine reply recipients from the parent activity. | В исходном письме нет адресов для ответа. Отправьте письмо методом `crm.<тип>.activity.email.send` с явными получателями ||
|| `CRM_EMAIL_INVALID_REQUEST` | Parent activity has no main owner. | У исходного письма нет основного элемента CRM. Ответить на такое письмо нельзя ||
|| `CRM_EMAIL_ACCESS_DENIED` | Access denied to create CRM email activity on the main owner. | Нет права на изменение элемента CRM, к которому привязано письмо. HTTP-статус **403** ||
|| `CRM_EMAIL_MAIL_MODULE_UNAVAILABLE` | The "mail" module is not available. | Почта недоступна на этом Битрикс24 ||
|| `CRM_EMAIL_TOO_MANY_RECIPIENTS` | Bitrix24 mail-sending limit reached for this portal. | Исчерпан лимит отправки писем Битрикс24. Повторите запрос позже ||
|| `CRM_EMAIL_SEND_FAILED` | `#MESSAGE#` | Письмо не отправлено. Повторите запрос позже ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, `crm.activity.email.reply` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-email-get-rest-v3.md)
- [{#T}](./crm-activity-email-get-thread-rest-v3.md)
- [{#T}](./crm-entity-activity-email-list-rest-v3.md)
- [{#T}](./index.md)
