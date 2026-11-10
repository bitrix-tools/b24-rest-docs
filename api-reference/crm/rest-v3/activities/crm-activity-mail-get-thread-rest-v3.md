# Получить цепочку писем v 3.0 crm.activity.mail.getThread

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр письма

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.activity.mail.getThread` возвращает цепочку писем CRM, в которую входит указанное письмо: все письма переписки по возрастанию времени, до 200 писем. Текста писем в ответе нет — его возвращает метод [crm.activity.mail.getContent](./crm-activity-mail-get-content-rest-v3.md).

Письма цепочки, которые вам недоступны для просмотра, приходят с `isHidden: true` и без данных письма.

Имя метода пишется с заглавной буквой `T`: `crm.activity.mail.getThread`. На имя в нижнем регистре метод отвечает ошибкой «Метод не найден».

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **activityId***
[`integer`](../../../data-types.md) | Идентификатор любого письма цепочки — дела с `providerId` равным `CRM_EMAIL`.

Идентификатор можно получить методом [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.activity.mail.getThread`

{% endnote %}

Примеры получают цепочку письма с идентификатором `747`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":747}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.mail.getThread
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":747,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.activity.mail.getThread
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type MailThreadResult = {
      messages: Array<{
        id: number
        subject?: string
        from?: string
        isHidden: boolean
      }>
      isTruncated: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<MailThreadResult>(
        'crm.activity.mail.getThread',
        {
          activityId: 747,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Thread:', result.messages)
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
      async function getMailThread() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.activity.mail.getThread',
            {
              activityId: 747,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Thread:', result.messages)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getMailThread)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.activity.mail.getThread"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "activityId": 747,
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
                'crm.activity.mail.getThread',
                [
                    'activityId' => 747,
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
        'crm.activity.mail.getThread',
        {
            activityId: 747,
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
        'crm.activity.mail.getThread',
        [
            'activityId' => 747,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.mail.getThread", b24.Params{
    	"activityId": 747,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.activity.mail.getThread: %w", err)
    }

    var result struct {
    	Messages []struct {
    		ID       int    `json:"id"`
    		Subject  string `json:"subject"`
    		From     string `json:"from"`
    		IsHidden bool   `json:"isHidden"`
    	} `json:"messages"`
    	IsTruncated bool `json:"isTruncated"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, message := range result.Messages {
    	fmt.Println(message.ID, message.Subject, message.IsHidden)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "messages": [
            {
                "id": 747,
                "subject": "Коммерческое предложение",
                "dateTime": "2026-10-28T12:19:18+03:00",
                "isIncoming": true,
                "from": "client@example.com",
                "to": [
                    "sales@example.com"
                ],
                "cc": [],
                "bcc": [],
                "isHidden": false
            }
        ],
        "isTruncated": false
    },
    "time": {
        "start": 1793711360,
        "finish": 1793711360.764732,
        "duration": 0.7647318840026855,
        "processing": 0,
        "date_start": "2026-11-03T16:09:20+03:00",
        "date_finish": "2026-11-03T16:09:20+03:00",
        "operating_reset_at": 1793711940,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Данные цепочки ||
|| **result.messages**
[`object[]`](../../../data-types.md) | Письма цепочки по возрастанию времени. [Описание письма](#message) ||
|| **result.isTruncated**
[`boolean`](../../../data-types.md) | `true`, если в цепочке больше 200 писем и в ответ вошли первые 200 ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Письмо цепочки {#message}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор письма. У скрытого письма — `0` ||
|| **subject**
[`string`](../../../data-types.md) | Тема письма. Нет у скрытого письма ||
|| **dateTime**
[`datetime`](../../../data-types.md) | Дата и время письма. Нет у скрытого письма ||
|| **isIncoming**
[`boolean`](../../../data-types.md) | `true` — входящее письмо, `false` — исходящее. Нет у скрытого письма ||
|| **from**
[`string`](../../../data-types.md) | Адрес отправителя. Нет у скрытого письма ||
|| **to**
[`string[]`](../../../data-types.md) | Адреса получателей. Нет у скрытого письма ||
|| **cc**
[`string[]`](../../../data-types.md) | Адреса копии. У скрытого письма — `null` ||
|| **bcc**
[`string[]`](../../../data-types.md) | Адреса скрытой копии. У скрытого письма — `null` ||
|| **isHidden**
[`boolean`](../../../data-types.md) | `true` — письмо вам недоступно, данных письма нет ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "CRM_EMAIL_ACTIVITY_NOT_FOUND",
        "message": "CRM email activity not found."
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки запроса

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `CRM_EMAIL_INVALID_REQUEST` | activityId must be a positive integer. | Передайте `activityId` положительным целым числом. HTTP-статус **400** ||
|| `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION` | В поле `activityId` требуется тип данных `int` для такого запроса | Передайте `activityId` числом, а не строкой. HTTP-статус **400** ||
|#

#### Письмо не найдено

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `CRM_EMAIL_ACTIVITY_NOT_FOUND` | CRM email activity not found. | Письма нет или дело с этим идентификатором не письмо. HTTP-статус **404** ||
|| `CRM_EMAIL_ACCESS_DENIED` | Access denied to the CRM email activity. | Нет права на просмотр письма: нет доступа к элементам CRM, к которым оно привязано. HTTP-статус **403** ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-mail-get-content-rest-v3.md)
- [{#T}](./crm-activity-mail-reply-rest-v3.md)
