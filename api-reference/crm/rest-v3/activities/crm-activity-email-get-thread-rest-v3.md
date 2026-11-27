# Получить цепочку писем v 3.0 crm.activity.email.getthread

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

Метод `crm.activity.email.getthread` возвращает цепочку писем CRM, в которую входит указанное письмо. Каждое письмо цепочки приходит с теми же полями и текстом, что и в методе [crm.activity.email.get](./crm-activity-email-get-rest-v3.md). Метод заменяет удаленный `crm.activity.mail.getThread`.

Как метод собирает цепочку:

- письма идут по возрастанию времени начала `startTime`
- в ответ попадают не больше 200 писем цепочки. Если писем больше, метод возвращает первые 200 и `isTruncated` равным `true`
- письма, которые вам недоступны для просмотра, метод пропускает без пометки. Поэтому писем в ответе может быть меньше 200 и при `isTruncated` равном `true`
- если письмо не входит в цепочку, метод возвращает только его

Метод работает только с письмами — делами с `providerId` равным `CRM_EMAIL`.

Имя метода пишется в нижнем регистре: `crm.activity.email.getthread`. На имя `crm.activity.email.getThread` и другие варианты регистра метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор любого письма цепочки — дела с `providerId` равным `CRM_EMAIL`.

Идентификатор можно получить методом [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) с условием `["providerId","=","CRM_EMAIL"]` ||
|#

Параметр `select` метод не принимает: письма всегда приходят со всеми полями.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.activity.email.getthread`

{% endnote %}

Примеры получают цепочку, в которую входит письмо с идентификатором `1831`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1831}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.email.getthread
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1831,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.activity.email.getthread
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EmailThreadResult = {
      isTruncated: boolean
      items: Array<{
        id: number
        subject: string
        direction: 'incoming' | 'outgoing'
        from: string | null
        to: string[] | null
        parentActivityId: number | null
        body: string | null
        startTime: string | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<EmailThreadResult>(
        'crm.activity.email.getthread',
        {
          id: 1831,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(letter => console.info(letter.startTime, letter.from, letter.subject))
        if (result.isTruncated) {
          console.info('Thread is longer than 200 letters')
        }
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
      async function getEmailThread() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.activity.email.getthread',
            {
              id: 1831,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(letter => console.info(letter.startTime, letter.from, letter.subject))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEmailThread)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.activity.email.getthread"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 1831,
            },
            prefer_version=3,
        )
        result = response["result"]
        for letter in result["items"]:
            print(letter["startTime"], letter["from"], letter["subject"])
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
                'crm.activity.email.getthread',
                [
                    'id' => 1831,
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
        'crm.activity.email.getthread',
        {
            id: 1831,
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
        'crm.activity.email.getthread',
        [
            'id' => 1831,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.email.getthread", b24.Params{
    	"id": 1831,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.activity.email.getthread: %w", err)
    }

    var result struct {
    	IsTruncated bool `json:"isTruncated"`
    	Items       []struct {
    		ID               int      `json:"id"`
    		Subject          string   `json:"subject"`
    		Direction        string   `json:"direction"`
    		From             *string  `json:"from"`
    		To               []string `json:"to"`
    		ParentActivityID *int     `json:"parentActivityId"`
    		Body             *string  `json:"body"`
    		StartTime        *string  `json:"startTime"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, letter := range result.Items {
    	fmt.Println(letter.ID, letter.Direction, letter.Subject)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "isTruncated": false,
        "items": [
            {
                "subject": "Заказ № 43061405",
                "direction": "incoming",
                "communications": [
                    {
                        "type": "EMAIL",
                        "value": "support@example.com",
                        "entityTypeId": 1,
                        "entityId": 257
                    }
                ],
                "from": "support@example.com",
                "to": [
                    "manager@example.com"
                ],
                "cc": [],
                "bcc": [],
                "parentActivityId": null,
                "body": "Здравствуйте! Пришлите, пожалуйста, ответным письмом фото товара и упаковки.",
                "isBodyTruncated": false,
                "id": 1819,
                "providerId": "CRM_EMAIL",
                "isCompleted": true,
                "assignedById": 1,
                "authorId": 1,
                "editorId": 1,
                "createdTime": "2021-04-19T08:55:12+03:00",
                "updatedTime": "2021-04-19T08:55:12+03:00",
                "startTime": "2021-04-18T11:38:36+03:00",
                "endTime": "2021-04-19T18:00:00+03:00",
                "deadlineTime": "2021-04-19T18:00:00+03:00",
                "bindings": [
                    {
                        "entityTypeId": 3,
                        "entityId": 453
                    },
                    {
                        "entityTypeId": 4,
                        "entityId": 221
                    },
                    {
                        "entityTypeId": 2,
                        "entityId": 4143
                    }
                ]
            },
            {
                "subject": "Re: Заказ № 43061405",
                "direction": "outgoing",
                "communications": [
                    {
                        "type": "EMAIL",
                        "value": "support@example.com",
                        "entityTypeId": 1,
                        "entityId": 257
                    }
                ],
                "from": "manager@example.com",
                "to": [
                    "support@example.com"
                ],
                "cc": [],
                "bcc": [],
                "parentActivityId": 1819,
                "body": "Добрый день! Спасибо за ответ. Во вложении фотографии товара и упаковки.",
                "isBodyTruncated": false,
                "id": 1831,
                "providerId": "CRM_EMAIL",
                "isCompleted": true,
                "assignedById": 1,
                "authorId": 1,
                "editorId": 1,
                "createdTime": "2021-04-19T08:55:30+03:00",
                "updatedTime": "2021-04-19T08:55:30+03:00",
                "startTime": "2021-04-18T14:24:58+03:00",
                "endTime": "2021-04-19T18:00:00+03:00",
                "deadlineTime": "2021-04-19T18:00:00+03:00",
                "bindings": [
                    {
                        "entityTypeId": 3,
                        "entityId": 453
                    },
                    {
                        "entityTypeId": 4,
                        "entityId": 221
                    },
                    {
                        "entityTypeId": 2,
                        "entityId": 4143
                    }
                ]
            }
        ]
    },
    "time": {
        "start": 1795772340,
        "finish": 1795772341.188079,
        "duration": 1.1880791187286377,
        "processing": 0,
        "date_start": "2026-11-27T12:39:00+03:00",
        "date_finish": "2026-11-27T12:39:01+03:00",
        "operating_reset_at": 1795772940,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.isTruncated**
[`boolean`](../../../data-types.md) | `true`, если в цепочке больше 200 писем и метод вернул только первые 200 ||
|| **result.items**
[`object[]`](../../../data-types.md) | Письма цепочки, доступные вам для просмотра, по возрастанию `startTime`. У каждого письма те же поля, что в ответе метода crm.activity.email.get. [Описание полей письма](./crm-activity-email-get-rest-v3.md#fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `803` не найдена"
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
|#

#### Письмо не найдено

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Письма нет, дело с этим идентификатором не письмо, у вас нет права на просмотр письма или клиент письма скрыт от вас настройками доступа. Проверьте `id` методом [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) с условием `["providerId","=","CRM_EMAIL"]` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, `crm.activity.email.getthread`. Вариант `crm.activity.email.getThread` не работает ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-email-get-rest-v3.md)
- [{#T}](./crm-activity-email-reply-rest-v3.md)
- [{#T}](./crm-entity-activity-email-list-rest-v3.md)
- [{#T}](./index.md)
