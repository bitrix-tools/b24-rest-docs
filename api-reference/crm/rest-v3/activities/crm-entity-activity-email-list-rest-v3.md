# Получить список писем элемента v 3.0 crm.<тип>.activity.email.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр элемента CRM, письма которого запрашиваются

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.activity.email.list` возвращает письма, привязанные к одному элементу CRM: тему, направление, отправителя, получателей и, по запросу, текст письма. Тип объекта задает сегмент `<тип>` в имени метода, элемент — условие по `ownerId` в фильтре.

В список попадают только письма: дела других видов метод пропускает, и они не занимают место на странице. Все дела элемента возвращает метод [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md).

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.activity.email.list` ||
|| Лид | `crm.lead.activity.email.list` ||
|| Контакт | `crm.contact.activity.email.list` ||
|| Компания | `crm.company.activity.email.list` ||
|| Предложение | `crm.quote.activity.email.list` ||
|| Счет | `crm.smartinvoice.activity.email.list` ||
|| Документ CRM | `crm.smartdocument.activity.email.list` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.activity.email.list`, например `crm.smartprocess1038.activity.email.list` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.activity.email.list`, а не `crm.smartInvoice.activity.Email.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Обязательно условие `["ownerId","=",<идентификатор элемента>]`, например `[["ownerId","=",741],["direction","=","incoming"]]`. [Описание параметра](#filter) ||
|| **select**
[`array`](../../../data-types.md) | Список полей письма, которые нужно вернуть, например `["id","subject","from","to"]`. Доступные поля описаны в таблице [Объект item](./crm-entity-activity-email-get-rest-v3.md#item) метода `crm.<тип>.activity.email.get`. Для `bindings` и `communications` можно выбрать вложенные поля через точку: `communications.value`.

Текст письма приходит, только если `body` или `isBodyTruncated` указаны в `select`. Без них оба поля приходят со значением `null`.

По умолчанию: все поля письма, текст письма не заполняется ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. Сортировать можно по полям `id`, `createdTime`, `updatedTime`, `startTime`, `endTime`, `deadlineTime`.

Возможные значения направления:

- `asc` — по возрастанию
- `desc` — по убыванию

По умолчанию: `{"id": "asc"}` ||
|| **pagination**
[`object`](../../../data-types.md) | Объект постраничной навигации. [Описание параметра](#pagination) ||
|#

### Параметр filter {#filter}

Условие по `ownerId` задает элемент, письма которого нужно получить. Правила для него:

- условие одно, на верхнем уровне фильтра, с оператором `=` и положительным целым числом
- `ownerId` нельзя указать в группе условий, под отрицанием, с другим оператором, дважды или отдельно от `filter`
- если элемента нет, он в корзине или у вас нет права на его просмотр, метод отвечает ошибкой «не найдено», а не пустым списком

Остальные условия объединяются с ним по И. Фильтровать можно по `id`, `providerId`, `isCompleted`, `assignedById`, `direction`, `createdTime`, `updatedTime`, `startTime`, `deadlineTime`. Поддерживаются операторы и группы условий REST 3.0, синтаксис — в [обзоре REST 3.0](../../../rest-v3.md#filter). Группа условий записывается с ключом `"type": "filter"`: `{"type":"filter","logic":"or","conditions":[...]}`.

Поля письма `subject`, `from`, `to`, `cc`, `bcc`, `parentActivityId`, `body` в фильтре и сортировке не участвуют. Например, чтобы найти письма от конкретного адреса, получите письма элемента и отберите записи по `from` на своей стороне.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество писем на странице. Значения больше `200` уменьшаются до `200`. Ноль и отрицательное значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество писем, которые нужно пропустить от начала списка.

По умолчанию: `0` ||
|#

{% note info "" %}

Ответ не содержит общего количества писем. Если на странице вернулось меньше писем, чем указано в `limit`, это последняя страница.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.deal.activity.email.list`

{% endnote %}

Примеры получают исходящие письма сделки, сначала новые. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",741],["direction","=","outgoing"]],"select":["id","subject","from","to","createdTime","isCompleted"],"order":{"createdTime":"desc"},"pagination":{"limit":50}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.activity.email.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["ownerId","=",741],["direction","=","outgoing"]],"select":["id","subject","from","to","createdTime","isCompleted"],"order":{"createdTime":"desc"},"pagination":{"limit":50},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.deal.activity.email.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EmailListResult = {
      items: Array<{
        id: number
        subject: string
        from: string | null
        to: string[] | null
        createdTime: string
        isCompleted: boolean
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<EmailListResult>(
        'crm.deal.activity.email.list',
        {
          filter: [
            ['ownerId', '=', 741],
            ['direction', '=', 'outgoing'],
          ],
          select: ['id', 'subject', 'from', 'to', 'createdTime', 'isCompleted'],
          order: {
            createdTime: 'desc',
          },
          pagination: {
            limit: 50,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Emails:', result.items)
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
      async function listEmails() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.deal.activity.email.list',
            {
              filter: [
                ['ownerId', '=', 741],
                ['direction', '=', 'outgoing'],
              ],
              select: ['id', 'subject', 'from', 'to', 'createdTime', 'isCompleted'],
              order: {
                createdTime: 'desc',
              },
              pagination: {
                limit: 50,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Emails:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listEmails)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.deal.activity.email.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": [
                    ["ownerId", "=", 741],
                    ["direction", "=", "outgoing"],
                ],
                "select": ["id", "subject", "from", "to", "createdTime", "isCompleted"],
                "order": {
                    "createdTime": "desc",
                },
                "pagination": {
                    "limit": 50,
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
                'crm.deal.activity.email.list',
                [
                    'filter' => [
                        ['ownerId', '=', 741],
                        ['direction', '=', 'outgoing'],
                    ],
                    'select' => ['id', 'subject', 'from', 'to', 'createdTime', 'isCompleted'],
                    'order' => [
                        'createdTime' => 'desc',
                    ],
                    'pagination' => [
                        'limit' => 50,
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
        'crm.deal.activity.email.list',
        {
            filter: [
                ['ownerId', '=', 741],
                ['direction', '=', 'outgoing'],
            ],
            select: ['id', 'subject', 'from', 'to', 'createdTime', 'isCompleted'],
            order: {
                createdTime: 'desc',
            },
            pagination: {
                limit: 50,
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
        'crm.deal.activity.email.list',
        [
            'filter' => [
                ['ownerId', '=', 741],
                ['direction', '=', 'outgoing'],
            ],
            'select' => ['id', 'subject', 'from', 'to', 'createdTime', 'isCompleted'],
            'order' => [
                'createdTime' => 'desc',
            ],
            'pagination' => [
                'limit' => 50,
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
    res, err := client.Core().Call(ctx, "crm.deal.activity.email.list", b24.Params{
    	"filter": []any{
    		[]any{"ownerId", "=", 741},
    		[]any{"direction", "=", "outgoing"},
    	},
    	"select": []string{"id", "subject", "from", "to", "createdTime", "isCompleted"},
    	"order": b24.Params{
    		"createdTime": "desc",
    	},
    	"pagination": b24.Params{
    		"limit": 50,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.deal.activity.email.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID          int      `json:"id"`
    		Subject     string   `json:"subject"`
    		From        *string  `json:"from"`
    		To          []string `json:"to"`
    		CreatedTime string   `json:"createdTime"`
    		IsCompleted bool     `json:"isCompleted"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.CreatedTime, item.Subject)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "subject": "Re: Коммерческое предложение",
                "from": "sales@example.com",
                "to": [
                    "client@example.com"
                ],
                "id": 8697,
                "isCompleted": true,
                "createdTime": "2026-11-27T12:41:56+03:00"
            },
            {
                "subject": "Re: Коммерческое предложение",
                "from": "sales@example.com",
                "to": [
                    "client@example.com"
                ],
                "id": 8693,
                "isCompleted": true,
                "createdTime": "2026-11-27T12:41:29+03:00"
            },
            {
                "subject": "Коммерческое предложение",
                "from": "sales@example.com",
                "to": [
                    "client@example.com"
                ],
                "id": 1203,
                "isCompleted": true,
                "createdTime": "2020-12-30T14:02:28+03:00"
            }
        ]
    },
    "time": {
        "start": 1795772607,
        "finish": 1795772607.142473,
        "duration": 0.1424729824066162,
        "processing": 0,
        "date_start": "2026-11-27T12:43:27+03:00",
        "date_finish": "2026-11-27T12:43:27+03:00",
        "operating_reset_at": 1795773180,
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
|| **result.items**
[`object[]`](../../../data-types.md) | Массив писем с полями из `select`, без `select` — со всеми полями. Если у элемента нет подходящих писем, массив пустой. Состав полей тот же, что у [объекта item](./crm-entity-activity-email-get-rest-v3.md#item) метода `crm.<тип>.activity.email.get` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Отличия от ответа метода `crm.<тип>.activity.email.get`:

- `body` и `isBodyTruncated` заполняются, только если одно из них указано в `select`. Без этого оба поля приходят со значением `null`
- если клиент письма скрыт от вас настройками доступа, письмо остается в списке, но поля `from`, `to`, `cc`, `bcc`, `parentActivityId`, `body` и `isBodyTruncated` приходят со значением `null`. Метод `crm.<тип>.activity.email.get` на такое письмо отвечает ошибкой «не найдено»

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации фильтров объекта запроса",
        "validation": [
            {
                "message": "Требуется указать фильтр по обязательному полю `ownerId`",
                "field": "filter.ownerId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Обязательное поле `filter` не указано | Передайте `filter` с условием по `ownerId`. Ошибку дает и `filter`, переданный строкой ||
|| `ownerId` | ownerId is a condition of the filter: name it as ["ownerId", "=", N] there. | Уберите `ownerId` из тела запроса и передайте его условием в `filter` ||
|| `subject` | В DTO `EmailActivityDto` в поле `subject` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по полям `id`, `providerId`, `isCompleted`, `assignedById`, `direction`, `createdTime`, `updatedTime`, `startTime`, `deadlineTime` ||
|| `subject` | В DTO `EmailActivityDto` в поле `subject` требуется наличие атрибута `Sortable` для такого запроса | Сортируйте только по `id`, `createdTime`, `updatedTime`, `startTime`, `endTime`, `deadlineTime` ||
|| `direction` | В поле `direction` требуется тип данных `Direction` для такого запроса | Передайте значение из списка поля `direction`: `incoming`, `outgoing`, `undefined` ||
|#

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.ownerId` | Требуется указать фильтр по обязательному полю `ownerId` | Добавьте в `filter` условие `["ownerId","=",<идентификатор элемента>]` ||
|#

#### Неверный фильтр

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `["ownerId",">",741]` | Проверьте условие по `ownerId`: одно, на верхнем уровне, с оператором `=` и положительным числом. Группы условий записывайте с ключом `"type": "filter"` ||
|#

#### Неверная пагинация

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте `limit` больше нуля и `offset` не меньше нуля ||
|#

#### Элемент не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999999` не найдена | Элемента из `ownerId` нет у этого типа объекта, он в корзине или у вас нет права на его просмотр. Проверьте `ownerId` и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `description` для сущности `EmailActivityDto` | Проверьте имена полей в `select`, `filter` и `order` по таблице [Объект item](./crm-entity-activity-email-get-rest-v3.md#item). Поля `type`, `description` и файлы дела возвращает метод [crm.<тип>.activity.list](./crm-entity-activity-list-rest-v3.md) ||
|| `-` | Неизвестное поле `foo` для сущности `ActivityCommunicationDto` | Проверьте вложенное поле в `select`: `communications.type`, `communications.value`, `communications.entityTypeId`, `communications.entityId` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Для `crm.lead.activity.email.list`: лиды выключены на Битрикс24. Включите лиды или запрашивайте письма другого типа объекта ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.mycompany.activity.email.list` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.activity.email.list`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). У моей компании и документов КЭДО методов писем нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-activity-email-get-rest-v3.md)
- [{#T}](./crm-entity-activity-email-send-rest-v3.md)
- [{#T}](./crm-activity-email-get-rest-v3.md)
- [{#T}](./crm-activity-email-reply-rest-v3.md)
