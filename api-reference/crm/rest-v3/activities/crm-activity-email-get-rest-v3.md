# Получить письмо v 3.0 crm.activity.email.get

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

Метод `crm.activity.email.get` возвращает письмо CRM по идентификатору: тему, направление, отправителя, получателей, текст и элементы CRM, к которым привязано письмо. Тип объекта, к которому привязано письмо, указывать не нужно. Метод заменяет удаленный `crm.activity.mail.getContent`.

Метод работает только с письмами — делами с `providerId` равным `CRM_EMAIL`. Найти письма можно методом [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) с условием `["providerId","=","CRM_EMAIL"]`.

Текст письма приходит без HTML-разметки. Если текст длиннее 50 000 символов, метод обрезает его и возвращает `isBodyTruncated` равным `true`.

Имя метода пишется в нижнем регистре: `crm.activity.email.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор письма — дела с `providerId` равным `CRM_EMAIL`.

Идентификатор можно получить методом [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей письма, которые нужно вернуть, например `["id","subject","from","body"]`. Доступные поля описаны в разделе [Возвращаемые данные](#fields). Для `bindings` и `communications` можно выбрать вложенные поля через точку: `bindings.entityId`.

По умолчанию: все поля письма ||
|#

Поля `assignedBy`, `author` и `editor` с данными сотрудника `select` принимает, но в ответе возвращает только идентификатор: `assignedById`, `authorId` или `editorId`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.activity.email.get`

{% endnote %}

Примеры получают письмо с идентификатором `1831`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1831}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.email.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1831,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.activity.email.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EmailGetResult = {
      item: {
        id: number
        subject: string
        direction: 'incoming' | 'outgoing'
        from: string | null
        to: string[] | null
        cc: string[] | null
        bcc: string[] | null
        parentActivityId: number | null
        body: string | null
        isBodyTruncated: boolean | null
        bindings: Array<{ entityTypeId: number; entityId: number }>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<EmailGetResult>(
        'crm.activity.email.get',
        {
          id: 1831,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Email:', result.item.subject, result.item.body)
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
      async function getEmail() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.activity.email.get',
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
          console.info('Email:', result.item.subject, result.item.body)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEmail)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.activity.email.get"
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
                'crm.activity.email.get',
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
        'crm.activity.email.get',
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
        'crm.activity.email.get',
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
    res, err := client.Core().Call(ctx, "crm.activity.email.get", b24.Params{
    	"id": 1831,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.activity.email.get: %w", err)
    }

    var result struct {
    	Item struct {
    		ID               int      `json:"id"`
    		Subject          string   `json:"subject"`
    		Direction        string   `json:"direction"`
    		From             *string  `json:"from"`
    		To               []string `json:"to"`
    		ParentActivityID *int     `json:"parentActivityId"`
    		Body             *string  `json:"body"`
    		IsBodyTruncated  *bool    `json:"isBodyTruncated"`
    		Bindings         []struct {
    			EntityTypeID int `json:"entityTypeId"`
    			EntityID     int `json:"entityId"`
    		} `json:"bindings"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.Subject, result.Item.Direction)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
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
    },
    "time": {
        "start": 1795772596,
        "finish": 1795772597.504591,
        "duration": 1.5045909881591797,
        "processing": 1,
        "date_start": "2026-11-27T12:43:16+03:00",
        "date_finish": "2026-11-27T12:43:17+03:00",
        "operating_reset_at": 1795773180,
        "operating": 0.9565129280090332
    }
}
```

### Возвращаемые данные {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../../data-types.md) | Письмо с полями из `select`, без `select` — со всеми полями ||
|| **result.item.id**
[`integer`](../../../data-types.md) | Идентификатор письма ||
|| **result.item.providerId**
[`string`](../../../data-types.md) | Провайдер дела, у письма всегда `CRM_EMAIL` ||
|| **result.item.subject**
[`string`](../../../data-types.md) | Тема письма ||
|| **result.item.direction**
[`string`](../../../data-types.md) | Направление письма: `incoming` — входящее, `outgoing` — исходящее ||
|| **result.item.from**
[`string`](../../../data-types.md) | Адрес отправителя. `null`, если в письме нет данных об адресах, например у письма, созданного без отправки ||
|| **result.item.to**
[`string[]`](../../../data-types.md) | Адреса получателей ||
|| **result.item.cc**
[`string[]`](../../../data-types.md) | Адреса копии ||
|| **result.item.bcc**
[`string[]`](../../../data-types.md) | Адреса скрытой копии ||
|| **result.item.parentActivityId**
[`integer`](../../../data-types.md) | Идентификатор письма, на которое отвечает это письмо. `null`, если письмо не ответ ||
|| **result.item.body**
[`string`](../../../data-types.md) | Текст письма без HTML-разметки, не длиннее 50 000 символов ||
|| **result.item.isBodyTruncated**
[`boolean`](../../../data-types.md) | `true`, если текст длиннее 50 000 символов и обрезан ||
|| **result.item.communications**
[`object[]`](../../../data-types.md) | Контакты коммуникации: `type` — канал, у письма `EMAIL`, `value` — адрес, `entityTypeId` и `entityId` — элемент CRM, которому принадлежит адрес. Если у вас нет доступа к элементу, `value`, `entityTypeId` и `entityId` равны `null` ||
|| **result.item.isCompleted**
[`boolean`](../../../data-types.md) | `true` — письмо завершено как дело, `false` — в работе ||
|| **result.item.assignedById**
[`integer`](../../../data-types.md) | Идентификатор ответственного ||
|| **result.item.authorId**
[`integer`](../../../data-types.md) | Идентификатор автора ||
|| **result.item.editorId**
[`integer`](../../../data-types.md) | Идентификатор сотрудника, который последним изменил письмо ||
|| **result.item.createdTime**
[`datetime`](../../../data-types.md) | Дата и время создания ||
|| **result.item.updatedTime**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения ||
|| **result.item.startTime**
[`datetime`](../../../data-types.md) | Начало дела, у отправленного письма — время отправки. Может быть `null` ||
|| **result.item.endTime**
[`datetime`](../../../data-types.md) | Окончание дела. Может быть `null` ||
|| **result.item.deadlineTime**
[`datetime`](../../../data-types.md) | Крайний срок. `null`, если срока нет ||
|| **result.item.bindings**
[`object[]`](../../../data-types.md) | Элементы CRM, к которым привязано письмо: `entityTypeId` — тип объекта, `entityId` — идентификатор элемента ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Пустые `to`, `cc`, `bcc`, `bindings` и `communications` приходят пустым массивом `[]`. Если клиент письма скрыт от вас настройками доступа, метод отвечает, что письмо не найдено.

Поля дела, которые не относятся к письму, например `description`, `files`, `type`, метод не возвращает. Их возвращает метод [crm.<тип>.activity.get](./crm-entity-activity-get-rest-v3.md).

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

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `EmailActivityDto` | Проверьте имена полей в `select` по [таблице полей письма](#fields) ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `ItemIdentifierDto` | Проверьте вложенное поле `bindings` в `select`: доступны `entityTypeId` и `entityId` ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `EmployeeDto` | Проверьте имя поля сотрудника в `select`, например `assignedBy.firstName` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, `crm.activity.email.get` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-email-get-thread-rest-v3.md)
- [{#T}](./crm-activity-email-reply-rest-v3.md)
- [{#T}](./crm-entity-activity-email-list-rest-v3.md)
- [{#T}](./crm-entity-activity-get-rest-v3.md)
- [{#T}](./index.md)
