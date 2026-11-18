# Получить цепочку писем mail.message.thread

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к почтовому ящику, где находится письмо

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `mail.message.thread` возвращает ветку переписки, в которую входит письмо. Параллельные ветки, например другие ответы на то же письмо, в результат не попадают.

Письма отдаются страницами начиная с самых новых. Внутри страницы письма идут от старых к новым.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор любого письма из цепочки.

Идентификатор можно получить методом [mail.message.list](./mail-message-list.md) ||
|| **limit**
[`integer`](../../data-types.md) | Количество писем на странице.

По умолчанию `20`. Максимум `50`, если `withBodies` равен `true`, и `100`, если `false`. Большее значение метод уменьшает до максимума, значение `0` или меньше заменяет на `20` ||
|| **offset**
[`integer`](../../data-types.md) | Сколько писем пропустить, считая от самого нового. По умолчанию `0`.

Чтобы получить следующую страницу, увеличьте `offset` на `limit`, пока в ответе `hasMore` равен `true` ||
|| **withBodies**
[`boolean`](../../data-types.md) | Возвращать ли текст писем.

Возможные значения:
- `true` — вернуть поля `body`, `truncated` и `bodyLength`
- `false` — вернуть только заголовки писем

По умолчанию `true` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/mail.message.thread`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"limit":20}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/mail.message.thread
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"limit":20,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/mail.message.thread
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each MailMessage returned in result[]
    type MailMessage = {
      id: number
      subject: string
      from: string
      to: string
      cc: string
      date: string
      body?: string
      truncated?: boolean
      bodyLength?: number
    }

    try {
      const response = await $b24.actions.v3.call.make<MailMessage[]>({
        method: 'mail.message.thread',
        params: {
          id: 15,
          limit: 20,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Писем на странице:', result.length)
        console.info('Тема первого письма:', result[0]?.subject)
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
      async function getMailMessageThread() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'mail.message.thread',
            params: {
              id: 15,
              limit: 20,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Писем на странице:', result.length)
          console.info('Тема первого письма:', result[0]?.subject)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getMailMessageThread)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.mail.message.thread(
            bitrix_id=15,
            limit=20,
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
                'mail.message.thread',
                [
                    'id' => 15,
                    'limit' => 20
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
        'mail.message.thread',
        {
            id: 15,
            limit: 20
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
        'mail.message.thread',
        [
            'id' => 15,
            'limit' => 20
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "mail.message.thread", b24.Params{
    	"id":    15,
    	"limit": 20,
    })
    if err != nil {
    	return fmt.Errorf("mail.message.thread: %w", err)
    }

    var items []struct {
    	ID      b24.ID `json:"id"`
    	Subject string `json:"subject"`
    	From    string `json:"from"`
    	To      string `json:"to"`
    	Cc      string `json:"cc"`
    	Date    string `json:"date"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Subject)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "id": 15,
            "subject": "Договор поставки",
            "from": "Иван Петров <ivan.petrov@example.com>",
            "to": "manager@example.com",
            "cc": "",
            "date": "2026-05-26 12:17:35",
            "body": "Добрый день! Направляю проект договора.",
            "truncated": false,
            "bodyLength": 39
        },
        {
            "id": 16,
            "subject": "Re: Договор поставки",
            "from": "manager@example.com",
            "to": "Иван Петров <ivan.petrov@example.com>",
            "cc": "",
            "date": "2026-05-27 12:17:35",
            "body": "Здравствуйте! Спасибо, получили, изучим и вернемся с комментариями.",
            "truncated": false,
            "bodyLength": 67
        }
    ],
    "total": 2,
    "hasMore": false,
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

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Письма ветки на текущей странице, от старых к новым. Если в ветке нет доступных писем, приходит пустой массив `[]` ||
|| **result[]**
[`object`](../../data-types.md) | Объект письма из ветки ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор письма ||
|| **subject**
[`string`](../../data-types.md) | Тема письма ||
|| **from**
[`string`](../../data-types.md) | Отправитель письма ||
|| **to**
[`string`](../../data-types.md) | Получатель письма ||
|| **cc**
[`string`](../../data-types.md) | Получатели копии ||
|| **date**
[`string`](../../data-types.md) | Дата и время получения письма в формате `YYYY-MM-DD HH:MM:SS`, без часового пояса ||
|| **body**
[`string`](../../data-types.md) | Текст письма без HTML-разметки и без цитаты предыдущего письма. Приходит, если `withBodies` равен `true`.

Метод берет первые 10 000 символов текста. Если текст длиннее, в конец добавляется пометка, например `[truncated: showing first 10000 of 15000 characters]` ||
|| **truncated**
[`boolean`](../../data-types.md) | Признак того, что текст письма обрезан. Приходит, если `withBodies` равен `true` ||
|| **bodyLength**
[`integer`](../../data-types.md) | Длина исходного текста письма в символах. Приходит, если `withBodies` равен `true` ||
|| **total**
[`integer`](../../data-types.md) | Количество писем в ветке, доступных пользователю ||
|| **hasMore**
[`boolean`](../../data-types.md) | Есть ли еще более старые письма: `true` — есть, запросите следующую страницу с увеличенным `offset` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `15` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `15` не найдена | Письмо не существует, у пользователя нет доступа к почтовому ящику письма или ящик отключен. Нечисловое значение `id`, например `abc`, метод считает равным `0` и возвращает эту же ошибку с ID = `0`. Получите идентификатор методом [mail.message.list](./mail-message-list.md) ||
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
- [{#T}](./mail-message-list.md)
