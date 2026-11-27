# Отправить письмо v 3.0 crm.<тип>.activity.email.send

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение элемента CRM, у которого есть доступный почтовый ящик или адрес отправителя

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.activity.email.send` отправляет письмо из элемента CRM и сохраняет его делом этого элемента. Метод сразу отправляет письмо получателям и возвращает его в том же виде, что и метод [crm.<тип>.activity.email.get](./crm-entity-activity-email-get-rest-v3.md).

Отправленное письмо:

- сохраняется завершенным исходящим делом, ответственный — пользователь, который вызвал метод
- привязывается к элементу из `ownerId`
- связывает каждый адрес получателя с элементом CRM: с контактом или компанией элемента, если у них есть такой адрес, иначе с самим элементом. Связи приходят в поле `communications`

Метод поддерживает заголовок `Idempotency-Key`: повтор запроса с тем же ключом вернет то же письмо и не отправит его второй раз. Подробнее — в разделе [Повторный вызов без дублей](../../../rest-v3.md#idempotency).

Чтобы ответить на письмо в той же цепочке, используйте метод [crm.activity.email.reply](./crm-activity-email-reply-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.activity.email.send` ||
|| Лид | `crm.lead.activity.email.send` ||
|| Контакт | `crm.contact.activity.email.send` ||
|| Компания | `crm.company.activity.email.send` ||
|| Предложение | `crm.quote.activity.email.send` ||
|| Счет | `crm.smartinvoice.activity.email.send` ||
|| Документ CRM | `crm.smartdocument.activity.email.send` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.activity.email.send`, например `crm.smartprocess1038.activity.email.send` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.activity.email.send`, а не `crm.smartInvoice.activity.Email.send`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Поля письма. Обязательные поля — `ownerId`, `subject`, `to` и `body`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerId***
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, из которого отправляется письмо. Элемент должен относиться к типу объекта из имени метода. В ответе поле не приходит.

Идентификатор можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **subject***
[`string`](../../../data-types.md) | Тема письма. Если передать пустую строку, Битрикс24 возьмет тему из начала текста письма, а если не получится — подставит `(no subject)` ||
|| **to***
[`string[]`](../../../data-types.md) | Адреса получателей, хотя бы один. Адрес передается строкой `client@example.com` или `Имя <client@example.com>`. Имя в письмо не попадает, адрес сохраняется в нижнем регистре ||
|| **body***
[`string`](../../../data-types.md) | Текст письма: обычный текст или HTML. Пустая строка и строка из пробелов не принимаются. Опасная HTML-разметка удаляется, к тексту добавляется подпись, если она включена в настройках почты ||
|| **cc**
[`string[]`](../../../data-types.md) | Адреса копии. Адреса, которые уже есть в `to`, из копии убираются ||
|| **bcc**
[`string[]`](../../../data-types.md) | Адреса скрытой копии. Адреса, которые уже есть в `to` или `cc`, из скрытой копии убираются ||
|| **from**
[`string`](../../../data-types.md) | Адрес отправителя, например `sales@example.com` или `Отдел продаж <sales@example.com>`. Адрес должен быть среди почтовых ящиков и адресов отправителя, доступных пользователю.

По умолчанию: адрес CRM из настроек, если он доступен пользователю, иначе первый доступный адрес ||
|| **senderId**
[`integer`](../../../data-types.md) | Идентификатор адреса отправителя, который подтвержден без подключения почтового ящика. Используйте вместе с `from`: адрес отправителя должен совпадать с `from`. В ответе поле не приходит ||
|| **mailboxId**
[`integer`](../../../data-types.md) | Идентификатор подключенного почтового ящика. Используйте вместе с `from`: адрес ящика должен совпадать с `from`. В ответе поле не приходит ||
|#

Обычно достаточно `from`: метод сам найдет ящик или адрес отправителя с этим адресом. Параметры `senderId` и `mailboxId` нужны, только чтобы выбрать конкретный ящик или отправителя, если один адрес доступен пользователю несколькими способами. Без `from` эти параметры не работают: метод ответит ошибкой `CRM_EMAIL_SENDER_NOT_AVAILABLE`.

Если адрес из `from` не относится к подключенному почтовому ящику, письмо все равно отправляется, но его копия не появится в папке отправленных писем почтового ящика.

Метод проверяет адреса до отправки. Если среди адресов есть неверный или адрес из черного списка почты либо получателей больше лимита, письмо не отправляется и дело не создается. Общее число адресов в `to`, `cc` и `bcc` ограничено, лимит указан в тексте ошибки. Тариф может дополнительно ограничивать число адресов в каждом из полей.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.deal.activity.email.send`

{% endnote %}

Примеры отправляют письмо клиенту из сделки. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Idempotency-Key: 7f2d3d50-9235-4e56-b768-b8a78c58e4f2" \
    -d '{"fields":{"ownerId":741,"subject":"Коммерческое предложение","to":["client@example.com"],"body":"Добрый день! Направляем коммерческое предложение.","from":"sales@example.com"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.activity.email.send
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Idempotency-Key: 7f2d3d50-9235-4e56-b768-b8a78c58e4f2" \
    -d '{"fields":{"ownerId":741,"subject":"Коммерческое предложение","to":["client@example.com"],"body":"Добрый день! Направляем коммерческое предложение.","from":"sales@example.com"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.deal.activity.email.send
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EmailSendResult = {
      item: {
        id: number
        subject: string
        from: string | null
        to: string[] | null
        createdTime: string
        communications: Array<{ type: string; value: string | null; entityTypeId: number | null; entityId: number | null }>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<EmailSendResult>(
        'crm.deal.activity.email.send',
        {
          fields: {
            ownerId: 741,
            subject: 'Коммерческое предложение',
            to: ['client@example.com'],
            body: 'Добрый день! Направляем коммерческое предложение.',
            from: 'sales@example.com',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Email sent:', result.item.id)
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
      async function sendEmail() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.deal.activity.email.send',
            {
              fields: {
                ownerId: 741,
                subject: 'Коммерческое предложение',
                to: ['client@example.com'],
                body: 'Добрый день! Направляем коммерческое предложение.',
                from: 'sales@example.com',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Email sent:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', sendEmail)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.deal.activity.email.send"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "ownerId": 741,
                    "subject": "Коммерческое предложение",
                    "to": ["client@example.com"],
                    "body": "Добрый день! Направляем коммерческое предложение.",
                    "from": "sales@example.com",
                },
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
                'crm.deal.activity.email.send',
                [
                    'fields' => [
                        'ownerId' => 741,
                        'subject' => 'Коммерческое предложение',
                        'to' => ['client@example.com'],
                        'body' => 'Добрый день! Направляем коммерческое предложение.',
                        'from' => 'sales@example.com',
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
        'crm.deal.activity.email.send',
        {
            fields: {
                ownerId: 741,
                subject: 'Коммерческое предложение',
                to: ['client@example.com'],
                body: 'Добрый день! Направляем коммерческое предложение.',
                from: 'sales@example.com',
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
        'crm.deal.activity.email.send',
        [
            'fields' => [
                'ownerId' => 741,
                'subject' => 'Коммерческое предложение',
                'to' => ['client@example.com'],
                'body' => 'Добрый день! Направляем коммерческое предложение.',
                'from' => 'sales@example.com',
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
    res, err := client.Core().Call(ctx, "crm.deal.activity.email.send", b24.Params{
    	"fields": b24.Params{
    		"ownerId": 741,
    		"subject": "Коммерческое предложение",
    		"to":      []string{"client@example.com"},
    		"body":    "Добрый день! Направляем коммерческое предложение.",
    		"from":    "sales@example.com",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.deal.activity.email.send: %w", err)
    }

    var result struct {
    	Item struct {
    		ID          int      `json:"id"`
    		Subject     string   `json:"subject"`
    		From        *string  `json:"from"`
    		To          []string `json:"to"`
    		CreatedTime string   `json:"createdTime"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.Subject)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "subject": "Коммерческое предложение",
            "direction": "outgoing",
            "communications": [
                {
                    "type": "EMAIL",
                    "value": "client@example.com",
                    "entityTypeId": 2,
                    "entityId": 741
                }
            ],
            "from": "sales@example.com",
            "to": [
                "client@example.com"
            ],
            "cc": [],
            "bcc": [],
            "parentActivityId": null,
            "body": "Добрый день! Направляем коммерческое предложение.\n\nОтправлено из «Битрикс24»",
            "isBodyTruncated": false,
            "id": 8695,
            "providerId": "CRM_EMAIL",
            "isCompleted": true,
            "assignedById": 1,
            "authorId": 1,
            "editorId": 1,
            "createdTime": "2026-11-27T12:41:49+03:00",
            "updatedTime": "2026-11-27T12:41:50+03:00",
            "startTime": "2026-11-27T12:41:49+03:00",
            "endTime": "2026-11-27T12:41:49+03:00",
            "deadlineTime": "2026-11-27T12:41:49+03:00",
            "bindings": [
                {
                    "entityTypeId": 2,
                    "entityId": 741
                }
            ]
        }
    },
    "time": {
        "start": 1795772508,
        "finish": 1795772510.740127,
        "duration": 2.7401270866394043,
        "processing": 1,
        "date_start": "2026-11-27T12:41:48+03:00",
        "date_finish": "2026-11-27T12:41:50+03:00",
        "operating_reset_at": 1795773060,
        "operating": 1.3997678756713867
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
[`object`](../../../data-types.md) | Отправленное письмо со всеми полями, включая текст письма в `body`. Состав полей тот же, что у [объекта item](./crm-entity-activity-email-get-rest-v3.md#item) метода `crm.<тип>.activity.email.get`. Поля `ownerId`, `senderId` и `mailboxId` в ответ не попадают: элемент письма приходит в `bindings` ||
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
|| `fields` | Обязательное поле `fields` не указано | Передайте поля письма в `fields` ||
|| `to` | to must contain at least one email address. | Передайте в `to` хотя бы один адрес ||
|| `to.0` | to must contain email addresses only. | Уберите из `to` пустые строки. Так же метод проверяет `cc` и `bcc` ||
|| `to` | В поле `to` требуется тип данных `array` для такого запроса | Передайте адреса массивом, даже если адрес один: `["client@example.com"]`. Так же метод проверяет `cc` и `bcc` ||
|| `body` | body must be a non-empty string. | Передайте текст письма в `body` ||
|| `ownerId` | В поле `ownerId` требуется тип данных `int` для такого запроса | Передайте идентификатор элемента числом ||
|#

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `subject` | Не заполнено обязательное поле "subject" | Передайте тему письма. Так же метод проверяет `to`, `body` и `ownerId` ||
|| `ownerId` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор элемента. Так же метод проверяет `senderId` и `mailboxId` ||
|| `to` | Неправильный тип аргумента | Передайте адреса строками ||
|| `id` | Поле "id" не доступно к заполнению | Уберите из `fields` поля, которых нет в таблице [Параметр fields](#fields) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `EmailActivityDto` | Проверьте имена полей в `fields` по таблице [Параметр fields](#fields) ||
|#

#### Элемент не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999999` не найдена | Элемента из `ownerId` нет у этого типа объекта или у вас нет права на его изменение. Проверьте `ownerId` и имя метода ||
|#

#### Неверный адрес получателя

Код ошибки: `CRM_EMAIL_INVALID_RECIPIENT`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Invalid recipient email(s): to: not-an-email | Исправьте адреса, перечисленные в тексте ошибки. Метод проверяет `to`, `cc` и `bcc` ||
|#

#### Адрес в черном списке

Код ошибки: `CRM_EMAIL_RECIPIENT_BLACKLISTED`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Some recipients are in the global mail blacklist: `#EMAILS#` | Уберите из получателей адреса из черного списка почты ||
|#

#### Превышен лимит

Код ошибки: `CRM_EMAIL_TOO_MANY_RECIPIENTS`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Too many recipients: `#COUNT#`, the limit is `#LIMIT#` total across to/cc/bcc. | Уменьшите общее число адресов в `to`, `cc` и `bcc` до лимита из текста ошибки или отправьте несколько писем ||
|| `-` | Bitrix24 mail-sending limit reached for this portal. | Исчерпан лимит отправки писем Битрикс24. Повторите запрос позже ||
|| `-` | Bitrix24 custom mail-sending limit reached for this portal. | Исчерпан лимит отправки писем, который задал администратор Битрикс24. Повторите запрос позже ||
|#

#### Отправитель недоступен

Код ошибки: `CRM_EMAIL_SENDER_NOT_AVAILABLE`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | No available email sender is configured for this user. | У пользователя нет почтового ящика или адреса отправителя. Подключите почтовый ящик в Битрикс24 ||
|| `-` | Sender email is not available for this user. | Адрес из `from` недоступен пользователю, `senderId` или `mailboxId` не совпадает с `from` или передан без `from`. Передайте доступный адрес в `from` ||
|#

#### Неверный адрес отправителя

Код ошибки: `CRM_EMAIL_INVALID_FROM`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Sender email is not available for this user. | Значение `from` не распознано как адрес. Передайте адрес в виде `sales@example.com` или `Отдел продаж <sales@example.com>` ||
|| `-` | Cannot resolve a valid "from" address. | Адрес выбранного отправителя некорректен. Передайте в `from` другой доступный адрес ||
|#

#### Письмо не отправлено

Код ошибки: `CRM_EMAIL_SEND_FAILED`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Tariff restriction: cannot send to more than `#LIMIT#` recipient(s) per to/cc/bcc field. | Тариф ограничивает число адресов в одном поле. Уменьшите число адресов в `to`, `cc` или `bcc` ||
|| `-` | Failed to send the email through the Bitrix mail system. | Письмо не отправлено, дело письма удалено. Повторите запрос позже ||
|#

#### Почта недоступна

Код ошибки: `CRM_EMAIL_MAIL_MODULE_UNAVAILABLE`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | The "mail" module is not available. | Почта недоступна на этом Битрикс24 ||
|#

#### Ключ идемпотентности использован повторно

Код ошибки: `BITRIX_REST_V3_EXCEPTION_IDEMPOTENCYKEYREUSEDEXCEPTION`, HTTP-статус **422**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Idempotency-Key уже использовался с другим телом запроса. Используйте новый ключ для другого запроса. | Для нового письма передайте новый `Idempotency-Key`. Прежний ключ отправляйте только при повторе того же запроса ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Для `crm.lead.activity.email.send`: лиды выключены на Битрикс24. Включите лиды или отправляйте письмо из элемента другого типа объекта ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.deal.activity.Email.send` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.activity.email.send`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). У моей компании и документов КЭДО методов писем нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-activity-email-get-rest-v3.md)
- [{#T}](./crm-entity-activity-email-list-rest-v3.md)
- [{#T}](./crm-activity-email-get-rest-v3.md)
- [{#T}](./crm-activity-email-reply-rest-v3.md)
