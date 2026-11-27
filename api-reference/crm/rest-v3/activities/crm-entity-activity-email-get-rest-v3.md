# Получить письмо v 3.0 crm.<тип>.activity.email.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр дела

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.activity.email.get` возвращает письмо, привязанное к элементу CRM: тему, направление, отправителя, получателей, текст письма без разметки и письмо, на которое оно отвечает.

Тип объекта задает сегмент `<тип>` в имени метода: метод находит письмо, только если оно привязано хотя бы к одному элементу этого типа. Дела других видов, например звонки и задачи, метод не возвращает. Их возвращает метод [crm.<тип>.activity.get](./crm-entity-activity-get-rest-v3.md).

Чтобы получить письмо без учета типа объекта, используйте метод [crm.activity.email.get](./crm-activity-email-get-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.activity.email.get` ||
|| Лид | `crm.lead.activity.email.get` ||
|| Контакт | `crm.contact.activity.email.get` ||
|| Компания | `crm.company.activity.email.get` ||
|| Предложение | `crm.quote.activity.email.get` ||
|| Счет | `crm.smartinvoice.activity.email.get` ||
|| Документ CRM | `crm.smartdocument.activity.email.get` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.activity.email.get`, например `crm.smartprocess1038.activity.email.get` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.activity.email.get`, а не `crm.smartInvoice.activity.Email.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор письма — дела с `providerId` = `CRM_EMAIL`.

Идентификатор можно получить методом [crm.<тип>.activity.email.list](./crm-entity-activity-email-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей письма, которые нужно вернуть, например `["id","subject","from","to","body"]`. Доступные поля описаны в таблице [Объект item](#item). Для `bindings` и `communications` можно выбрать вложенные поля через точку: `communications.value`.

По умолчанию: все поля письма ||
|#

Если передать `id` дела другого вида, например звонка или задачи, метод ответит ошибкой «не найдено».

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.deal.activity.email.get`

{% endnote %}

Примеры получают письмо сделки со всеми полями. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8697}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.activity.email.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8697,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.deal.activity.email.get
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
        direction: 'incoming' | 'outgoing' | 'undefined'
        from: string | null
        to: string[] | null
        cc: string[] | null
        bcc: string[] | null
        parentActivityId: number | null
        body: string | null
        isBodyTruncated: boolean | null
        isCompleted: boolean
        createdTime: string
        communications: Array<{ type: string; value: string | null; entityTypeId: number | null; entityId: number | null }>
        bindings: Array<{ entityTypeId: number; entityId: number }>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<EmailGetResult>(
        'crm.deal.activity.email.get',
        {
          id: 8697,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Email:', result.item)
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
            'crm.deal.activity.email.get',
            {
              id: 8697,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Email:', result.item)
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

    method = "crm.deal.activity.email.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 8697,
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
                'crm.deal.activity.email.get',
                [
                    'id' => 8697,
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
        'crm.deal.activity.email.get',
        {
            id: 8697,
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
        'crm.deal.activity.email.get',
        [
            'id' => 8697,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.deal.activity.email.get", b24.Params{
    	"id": 8697,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.deal.activity.email.get: %w", err)
    }

    var result struct {
    	Item struct {
    		ID               int      `json:"id"`
    		Subject          string   `json:"subject"`
    		Direction        string   `json:"direction"`
    		From             *string  `json:"from"`
    		To               []string `json:"to"`
    		Cc               []string `json:"cc"`
    		Bcc              []string `json:"bcc"`
    		ParentActivityID *int     `json:"parentActivityId"`
    		Body             *string  `json:"body"`
    		IsBodyTruncated  *bool    `json:"isBodyTruncated"`
    		CreatedTime      string   `json:"createdTime"`
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
            "subject": "Re: Коммерческое предложение",
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
        "start": 1795772613,
        "finish": 1795772613.318065,
        "duration": 0.31806492805480957,
        "processing": 0,
        "date_start": "2026-11-27T12:43:33+03:00",
        "date_finish": "2026-11-27T12:43:33+03:00",
        "operating_reset_at": 1795772880,
        "operating": 1.7879889011383057
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
[`object`](../../../data-types.md) | Письмо с полями из `select`, без `select` — со всеми полями. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

Поля только для чтения. Колонки «Фильтр» и «Сортировка» относятся к методу [crm.<тип>.activity.email.list](./crm-entity-activity-email-list-rest-v3.md).

#|
|| **Название**
`тип` | **Описание** | **Фильтр** | **Сортировка** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор письма | + | + ||
|| **providerId**
[`string`](../../../data-types.md) | Провайдер дела, у писем всегда `CRM_EMAIL` | + | — ||
|| **isCompleted**
[`boolean`](../../../data-types.md) | Признак, что письмо завершено как дело. Возможные значения:

- `true` — завершено
- `false` — не завершено | + | — ||
|| **assignedById**
[`integer`](../../../data-types.md) | Идентификатор ответственного | + | — ||
|| **authorId**
[`integer`](../../../data-types.md) | Идентификатор автора | — | — ||
|| **editorId**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменил дело | — | — ||
|| **createdTime**
[`datetime`](../../../data-types.md) | Дата и время создания | + | + ||
|| **updatedTime**
[`datetime`](../../../data-types.md) | Дата и время последнего изменения | + | + ||
|| **startTime**
[`datetime`](../../../data-types.md) | Дата и время начала дела. У исходящего письма — время отправки | + | + ||
|| **endTime**
[`datetime`](../../../data-types.md) | Дата и время окончания дела | — | + ||
|| **deadlineTime**
[`datetime`](../../../data-types.md) | Крайний срок дела, `null` — без срока | + | + ||
|| **bindings**
[`object[]`](../../../data-types.md) | Элементы CRM, к которым привязано письмо. [Описание объекта](#bindings) | — | — ||
|| **subject**
[`string`](../../../data-types.md) | Тема письма | — | — ||
|| **direction**
[`string`](../../../data-types.md) | Направление письма. Возможные значения:

- `incoming` — входящее
- `outgoing` — исходящее
- `undefined` — направление не задано | + | — ||
|| **communications**
[`object[]`](../../../data-types.md) | Адреса, с которыми связано письмо, и элементы CRM этих адресов. [Описание объекта](#communications) | — | — ||
|| **from**
[`string`](../../../data-types.md) | Отправитель, как он указан в письме: адрес или `Имя <адрес>` | — | — ||
|| **to**
[`string[]`](../../../data-types.md) | Адреса получателей | — | — ||
|| **cc**
[`string[]`](../../../data-types.md) | Адреса копии. Если копии нет, приходит пустой массив | — | — ||
|| **bcc**
[`string[]`](../../../data-types.md) | Адреса скрытой копии. Если скрытой копии нет, приходит пустой массив | — | — ||
|| **parentActivityId**
[`integer`](../../../data-types.md) | Идентификатор письма, на которое отвечает это письмо, `null` — письмо не является ответом | — | — ||
|| **body**
[`string`](../../../data-types.md) | Текст письма без HTML-разметки. Переносы строк сохраняются, текст длиннее 50 000 символов обрезается. Подпись, которую Битрикс24 добавил при отправке, входит в текст | — | — ||
|| **isBodyTruncated**
[`boolean`](../../../data-types.md) | Признак, что текст письма в `body` обрезан. Возможные значения:

- `true` — текст длиннее 50 000 символов и обрезан
- `false` — текст пришел полностью | — | — ||
|#

Вложения и HTML-текст письма метод не возвращает. Поля `type`, `description` и файлы дела возвращает метод [crm.<тип>.activity.get](./crm-entity-activity-get-rest-v3.md).

#### Объект bindings {#bindings}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта CRM, например `2` — сделка, `3` — контакт ||
|| **entityId**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM ||
|#

#### Объект communications {#communications}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип канала связи, у писем `EMAIL` ||
|| **value**
[`string`](../../../data-types.md) | Адрес электронной почты. Если адрес не связан с элементом CRM или у вас нет доступа к этому элементу, приходит `null` ||
|| **entityTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта CRM, к которому относится адрес, например `3` — контакт. Если адрес не связан с элементом CRM или у вас нет доступа к этому элементу, приходит `null` ||
|| **entityId**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, к которому относится адрес. Если адрес не связан с элементом CRM или у вас нет доступа к этому элементу, приходит `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `7773` не найдена"
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
|| `-` | Запись с ID = `7773` не найдена | Дела нет, это не письмо, письмо не привязано к элементу этого типа объекта, у вас нет права на его просмотр или клиент письма скрыт от вас настройками доступа. Проверьте `id` методом [crm.<тип>.activity.email.list](./crm-entity-activity-email-list-rest-v3.md) и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `description` для сущности `EmailActivityDto` | Проверьте имена полей в `select` по таблице [Объект item](#item). Поля `type`, `description` и файлы дела возвращает метод [crm.<тип>.activity.get](./crm-entity-activity-get-rest-v3.md) ||
|| `-` | Неизвестное поле `foo` для сущности `ActivityCommunicationDto` | Проверьте вложенное поле в `select`: `communications.type`, `communications.value`, `communications.entityTypeId`, `communications.entityId` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Для `crm.lead.activity.email.get`: лиды выключены на Битрикс24. Включите лиды или читайте письмо через тип объекта, к которому оно тоже привязано ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.deal.activity.Email.get` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.activity.email.get`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). У моей компании и документов КЭДО методов писем нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-activity-email-list-rest-v3.md)
- [{#T}](./crm-entity-activity-email-send-rest-v3.md)
- [{#T}](./crm-activity-email-get-rest-v3.md)
- [{#T}](./crm-activity-email-reply-rest-v3.md)
