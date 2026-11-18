# Получить список писем mail.message.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь. Метод ищет письма только в почтовых ящиках, к которым у пользователя есть доступ

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `mail.message.list` возвращает список писем по заданным условиям. Письма отсортированы от новых к старым.

Условия поиска передаются отдельными параметрами в корне запроса. Стандартные параметры REST 3.0 `filter` и `order` метод не поддерживает.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **mailboxId**
[`integer`](../../data-types.md) | Идентификатор почтового ящика. Положительное целое число.

Если параметр не передан, метод ищет письма во всех почтовых ящиках пользователя.

Идентификатор можно получить методом [mail.mailbox.list](../mailbox/mail-mailbox-list.md) ||
|| **searchQuery**
[`string`](../../data-types.md) | Строка для поиска писем по содержимому и метаданным письма. Пустая строка не учитывается ||
|| **dateFrom**
[`string`](../../data-types.md) | Начало периода выборки писем. Возможные форматы:
- дата `YYYY-MM-DD`, например `2026-01-01`. Метод берет начало дня, `00:00:00`
- дата и время с часовым поясом, например `2026-01-01T10:00:00+03:00`, `2026-01-01T10:00:00Z` или `2026-01-01T10:00:00.123+03:00`

Дата и время без часового пояса, например `2026-01-01T10:00:00`, вызывают ошибку. Значение `dateFrom` должно быть не позже `dateTo` ||
|| **dateTo**
[`string`](../../data-types.md) | Конец периода выборки писем. Форматы те же, что у `dateFrom`. Если передана только дата, например `2026-01-31`, метод берет конец дня, `23:59:59` ||
|| **isSeen**
[`boolean`](../../data-types.md) | Фильтр по признаку прочтения письма.

Возможные значения:

- `true` — только прочитанные
- `false` — только непрочитанные ||
|| **hasAttachments**
[`boolean`](../../data-types.md) | Фильтр по наличию вложений.

Возможные значения:

- `true` — только письма с вложениями
- `false` — только письма без вложений ||
|| **folder**
[`string`](../../data-types.md) | Имя или путь почтовой папки, например `INBOX` ||
|| **select**
[`array`](../../data-types.md) | Список полей письма. Метод проверяет имена полей и возвращает ошибку на неизвестное поле, но сейчас в ответе всегда приходят все поля письма.

Доступные поля: `id`, `mailboxId`, `mailboxEmail`, `subject`, `from`, `to`, `cc`, `date`, `isSeen`, `hasAttachments`, `url`, `bindings`, `body`. Описание полей — в разделе [Возвращаемые данные](#returned-data) ||
|| **pagination**
[`object`](../../data-types.md) | Параметры постраничной навигации:
- `page` — номер страницы
- `limit` — количество записей на страницу, по умолчанию `25`. Значение больше `200` метод уменьшает до `200`, значение `0` вызывает ошибку
- `offset` — смещение записей, неотрицательное число. Если переданы `page` и `limit`, смещение вычисляется автоматически ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/mail.message.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"mailboxId":1,"searchQuery":"договор","hasAttachments":true,"pagination":{"page":1,"limit":20,"offset":0}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/mail.message.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"mailboxId":1,"searchQuery":"договор","hasAttachments":true,"pagination":{"page":1,"limit":20,"offset":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/mail.message.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MailMessageListResult = {
      items: MailMessageItem[]
    }

    type MailMessageBinding = {
      type: 'crm' | 'task' | 'chat' | 'calendarEvent' | 'blogPost'
      entityTypeId?: number
      entityId: number
    }

    type MailMessageItem = {
      id: number
      mailboxId: number
      mailboxEmail: string
      subject: string
      from: string
      to: string
      cc: string | null
      date: string
      isSeen: boolean
      hasAttachments: boolean
      url: string
      bindings: MailMessageBinding[]
      body: string | null
    }

    try {
      // mail.message.list returns a single page (default 25, max 200 records). For the whole result set
      // use a list helper: $b24.actions.v3.callList.make() returns every record as one
      // array, $b24.actions.v3.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `pagination` variant when sort matters.
      const response = await $b24.actions.v3.call.make<MailMessageListResult>({
        method: 'mail.message.list',
        params: {
          mailboxId: 1,
          searchQuery: 'договор',
          hasAttachments: true,
          pagination: {
            page: 1,
            limit: 20,
            offset: 0,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Получено писем:', result.items.length, result.items[0])
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
      async function fetchMessageList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // mail.message.list returns a single page (default 25, max 200 records). For the whole result set
          // use a list helper: $b24.actions.v3.callList.make() returns every record as one
          // array, $b24.actions.v3.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `pagination` variant when sort matters.
          const response = await $b24.actions.v3.call.make({
            method: 'mail.message.list',
            params: {
              mailboxId: 1,
              searchQuery: 'договор',
              hasAttachments: true,
              pagination: {
                page: 1,
                limit: 20,
                offset: 0,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Получено писем:', result.items.length, result.items[0])
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchMessageList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    pagination = {
        "page": 1,
        "limit": 20,
        "offset": 0,
    }

    try:
        bitrix_response = client.mail.message.list(
            mailbox_id=1,
            search_query='договор',
            has_attachments=True,
            pagination=pagination,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```
- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'mail.message.list',
                [
                    'mailboxId' => 1,
                    'searchQuery' => 'договор',
                    'hasAttachments' => true,
                    'pagination' => [
                        'page' => 1,
                        'limit' => 20,
                        'offset' => 0
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'mail.message.list',
        {
            mailboxId: 1,
            searchQuery: 'договор',
            hasAttachments: true,
            pagination: {
                page: 1,
                limit: 20,
                offset: 0
            }
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'mail.message.list',
        [
            'mailboxId' => 1,
            'searchQuery' => 'договор',
            'hasAttachments' => true,
            'pagination' => [
                'page' => 1,
                'limit' => 20,
                'offset' => 0
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "mail.message.list", b24.Params{
    	"mailboxId":      1,
    	"searchQuery":    "договор",
    	"hasAttachments": true,
    	"pagination": b24.Params{
    		"page":   1,
    		"limit":  20,
    		"offset": 0,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("mail.message.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID           b24.ID `json:"id"`
    	MailboxID    b24.ID `json:"mailboxId"`
    	MailboxEmail string `json:"mailboxEmail"`
    	Subject      string `json:"subject"`
    	From         string `json:"from"`
    	To           string `json:"to"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID)
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
                "id": 15,
                "mailboxId": 1,
                "mailboxEmail": "user@example.com",
                "subject": "Договор",
                "from": "client@example.com",
                "to": "user@example.com",
                "cc": null,
                "date": "2026-05-25 10:00:00",
                "isSeen": true,
                "hasAttachments": true,
                "url": "https://example.bitrix24.ru/mail/message/15",
                "bindings": [
                    {
                        "type": "crm",
                        "entityTypeId": 3,
                        "entityId": 27
                    }
                ],
                "body": null
            }
        ]
    },
    "time": {
        "start": 1779819678,
        "finish": 1779819678.84803,
        "duration": 0.8480300903320312,
        "processing": 0,
        "date_start": "2026-05-26T21:21:18+03:00",
        "date_finish": "2026-05-26T21:21:18+03:00",
        "operating_reset_at": 1779820278,
        "operating": 0
    }
}
```

### Возвращаемые данные {#returned-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **items**
[`array`](../../data-types.md) | Массив объектов писем. Если писем нет, приходит пустой массив `[]` ||
|| **items[]**
[`object`](../../data-types.md) | Объект письма. Приходят все поля независимо от `select` ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор письма ||
|| **mailboxId**
[`integer`](../../data-types.md) | Идентификатор почтового ящика ||
|| **mailboxEmail**
[`string`](../../data-types.md) | Адрес почтового ящика ||
|| **subject**
[`string`](../../data-types.md) | Тема письма ||
|| **from**
[`string`](../../data-types.md) | Отправитель письма ||
|| **to**
[`string`](../../data-types.md) | Получатели письма ||
|| **cc**
[`string`](../../data-types.md) | Получатели копии. В списке не заполняется и приходит со значением `null`, получите его методом [mail.message.get](./mail-message-get.md) ||
|| **date**
[`string`](../../data-types.md) | Дата и время получения письма в формате `YYYY-MM-DD HH:MM:SS`, без часового пояса ||
|| **isSeen**
[`boolean`](../../data-types.md) | Признак прочтения письма: `true` — прочитано, `false` — не прочитано ||
|| **hasAttachments**
[`boolean`](../../data-types.md) | Признак наличия вложений ||
|| **url**
[`string`](../../data-types.md) | Полная ссылка на письмо в Битрикс24 ||
|| **bindings**
[`array`](../../data-types.md) | Связи письма с объектами Битрикс24. Если связей нет, приходит пустой массив `[]`. Каждый элемент содержит:
- `type` — тип объекта: `crm` — дело CRM, `task` — задача, `chat` — чат, `calendarEvent` — событие календаря, `blogPost` — пост в Ленте новостей
- `entityTypeId` — [идентификатор типа объекта CRM](../../crm/data-types.md#object_type), к которому привязано дело. Есть только у связи `crm`
- `entityId` — идентификатор объекта. Для связи `crm` — идентификатор объекта CRM, к которому привязано дело ||
|| **body**
[`string`](../../data-types.md) | Текст письма. В списке не заполняется и приходит со значением `null`, получите его методом [mail.message.get](./mail-message-get.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "The selected mailbox is not available to the current user.",
                "field": "MESSAGE_LIST_FAILED"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

Ошибки в параметрах поиска приходят в массиве `validation` со значением `field`, равным `MESSAGE_LIST_FAILED`. Какой параметр передан неверно, видно из текста ошибки.

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `MESSAGE_LIST_FAILED` | mailboxId must be a positive integer. | Передайте в `mailboxId` положительное целое число ||
|| `MESSAGE_LIST_FAILED` | The selected mailbox is not available to the current user. | Почтовый ящик не найден или у пользователя нет к нему доступа. Получите доступные ящики методом [mail.mailbox.list](../mailbox/mail-mailbox-list.md) ||
|| `MESSAGE_LIST_FAILED` | Invalid dateFrom. Use an ISO 8601 date like 'YYYY-MM-DD' or a full date-time. | Передайте в `dateFrom` дату `YYYY-MM-DD` или дату и время с часовым поясом ||
|| `MESSAGE_LIST_FAILED` | Invalid dateTo. Use an ISO 8601 date like 'YYYY-MM-DD' or a full date-time. | Передайте в `dateTo` дату `YYYY-MM-DD` или дату и время с часовым поясом ||
|| `MESSAGE_LIST_FAILED` | dateFrom must be earlier than or equal to dateTo. | Передайте в `dateFrom` значение не позже `dateTo` ||
|| `id` | В DTO `MessageDto` в поле `id` требуется наличие атрибута `Filterable` для такого запроса | Метод не поддерживает параметр `filter`. Передайте условия поиска отдельными параметрами: `mailboxId`, `searchQuery`, `dateFrom` и другими ||
|| `id` | В DTO `MessageDto` в поле `id` требуется наличие атрибута `Sortable` для такого запроса | Метод не поддерживает параметр `order`. Уберите его из запроса: письма всегда отсортированы от новых к старым ||
|#

#### Ошибки в параметре filter

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `Unknown filter condition` | Метод не поддерживает параметр `filter`. Передайте условия поиска отдельными параметрами в корне запроса ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `MessageDto` | Передайте только поля из списка параметра `select` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `["id"]` | Передайте `select` как массив строк, например `["id","subject"]` ||
|#

#### Ошибки пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":"abc"}` | Передайте в `limit`, `page` и `offset` числа ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте `limit` больше `0` ||
|| `pagination` | Не удается распознать параметр пагинации `{"offset":-5}` | Передайте `offset` больше или равный `0` ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у приложения или вебхука есть scope `mail` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mail-message-get.md)
- [{#T}](./mail-message-field-list.md)
- [{#T}](./index.md)
