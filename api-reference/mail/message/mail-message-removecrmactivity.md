# Удалить из CRM дела письма mail.message.removecrmactivity

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mail`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Настройка связи с CRM», полным доступом к письму и правом удалять дела CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `mail.message.removecrmactivity` удаляет из CRM дела, созданные из письма.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **messageId***
[`integer`](../../data-types.md) | Идентификатор письма.

Идентификатор можно получить методом [mail.message.list](./mail-message-list.md) ||
|#

Метод удаляет только те дела, которые пользователь может удалить по правам CRM. Остальные дела остаются в CRM вместе со связью с письмом, в ответе в этом случае `complete: false`.

Если удалены все дела, метод добавляет адрес отправителя входящего письма в список исключений CRM, чтобы новые письма от него не попадали в CRM. Адрес добавляется, только если у пользователя есть право изменять список исключений.

Полный доступ к письму есть у пользователей с доступом к почтовому ящику. Если письмо доступно пользователю только через связанную задачу, чат, событие или сообщение Ленты новостей, метод вернет ошибку.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/mail.message.removecrmactivity`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"messageId":15}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/mail.message.removecrmactivity
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"messageId":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/mail.message.removecrmactivity
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RemoveCrmActivityResult = {
      result: boolean
      deletedCount: number
      totalCount: number
      complete: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<RemoveCrmActivityResult>({
        method: 'mail.message.removecrmactivity',
        params: {
          messageId: 15,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Удалено дел:', result.deletedCount, 'из', result.totalCount, 'все удалены:', result.complete)
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
      async function removeCrmActivity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'mail.message.removecrmactivity',
            params: {
              messageId: 15,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Удалено дел:', result.deletedCount, 'из', result.totalCount, 'все удалены:', result.complete)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', removeCrmActivity)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.mail.message.removecrmactivity(
            message_id=15,
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'mail.message.removecrmactivity',
                [
                    'messageId' => 15
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'mail.message.removecrmactivity',
        {
            messageId: 15
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'mail.message.removecrmactivity',
        [
            'messageId' => 15
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "mail.message.removecrmactivity", b24.Params{
    	"messageId": 15,
    })
    if err != nil {
    	return fmt.Errorf("mail.message.removecrmactivity: %w", err)
    }

    var item struct {
    	Result       bool `json:"result"`
    	DeletedCount int  `json:"deletedCount"`
    	TotalCount   int  `json:"totalCount"`
    	Complete     bool `json:"complete"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.DeletedCount, item.TotalCount, item.Complete)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": true,
        "deletedCount": 1,
        "totalCount": 1,
        "complete": true
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

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с результатом удаления ||
|| **result.result**
[`boolean`](../../data-types.md) | При успешном ответе всегда `true` ||
|| **result.deletedCount**
[`integer`](../../data-types.md) | Сколько дел удалено ||
|| **result.totalCount**
[`integer`](../../data-types.md) | Сколько дел CRM было создано из письма. ||
|| **result.complete**
[`boolean`](../../data-types.md) | Удалены ли все дела. Возможные значения:
- `true` — удалены все дела письма
- `false` — часть дел осталась в CRM, у пользователя нет прав их удалить ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

{% note warning "" %}

Сейчас Битрикс24 возвращает только `result.result`, без счетчиков `deletedCount`, `totalCount` и `complete`. Так метод отвечает, в том числе если у письма нет дел CRM. Чтобы проверить результат, получите письмо методом [mail.message.get](./mail-message-get.md) и посмотрите связи с типом `crm` в поле `bindings`.

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Parameter \"messageId\" is required.",
                "field": "MISSING_MESSAGE_ID"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

В колонке «Поле» — значение `field` из элемента `validation`. Метод передает в нем код причины, а не имя параметра. У ошибок без кода `field` в ответе нет.

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `MISSING_MESSAGE_ID` | Parameter "messageId" is required. | `messageId` не передан, не является числом или меньше `1`. Передайте идентификатор письма — положительное целое число ||
|| `-` | Установите модуль CRM | В Битрикс24 не установлен модуль CRM ||
|| `MAIL_MESSAGE_CRM_ACCESS_DENIED` | Нет доступа к CRM | У пользователя нет права «Настройка связи с CRM» в правах доступа почты. Выдайте право или вызовите метод от имени другого пользователя ||
|| `-` | Сообщение удалено или перемещено в другую папку | Письма с таким `messageId` нет или у пользователя нет к нему доступа. Проверьте идентификатор методом [mail.message.list](./mail-message-list.md) ||
|| `MAIL_MESSAGE_CRM_ACCESS_DENIED` | Access denied: full access to the message is required | Письмо доступно пользователю только через связанный объект. Вызовите метод от имени пользователя с доступом к почтовому ящику ||
|| `MAIL_MESSAGE_CRM_ACCESS_DENIED` | Access denied: cannot delete CRM activity | У пользователя нет права удалить ни одно из дел письма. Проверьте права пользователя на удаление дел в CRM ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mail-message-createcrmactivity.md)
- [{#T}](./index.md)
