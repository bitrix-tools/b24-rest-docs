# Получить набор контактов, связанных с указанным предложением crm.quote.contact.items.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» коммерческих предложений

Метод `crm.quote.contact.items.get` возвращает набор контактов, связанных с указанным коммерческим предложением.

Остальные методы предложений полный набор контактов не отдают. [crm.quote.get](../crm-quote-get.md) возвращает только первичный контакт в поле `CONTACT_ID`, а [crm.quote.list](../crm-quote-list.md) не возвращает множественное поле `CONTACT_IDS` даже при явном запросе в `select`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор коммерческого предложения

Идентификатор можно получить с помощью методов [crm.quote.list](../crm-quote-list.md) или [crm.quote.add](../crm-quote-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения всех привязанных контактов у предложения с `id = 113`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":113}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.contact.items.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":113,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.contact.items.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make({
        method: 'crm.quote.contact.items.get',
        params: {
          id: 113,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Quote contacts:', result)
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
      async function getQuoteContacts() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.contact.items.get',
            params: {
              id: 113,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Quote contacts:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getQuoteContacts)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.contact.items.get',
                [
                    'id' => 113,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Data: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting quote contacts: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.contact.items.get',
        {
            id: 113,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.quote.contact.items.get',
        [
            'id' => 113,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.quote.contact.items.get", b24.Params{
    	"id": 113,
    })
    if err != nil {
    	return fmt.Errorf("crm.quote.contact.items.get: %w", err)
    }

    var bindings []struct {
    	ContactID int    `json:"CONTACT_ID"`
    	Sort      int    `json:"SORT"`
    	RoleID    int    `json:"ROLE_ID"`
    	IsPrimary string `json:"IS_PRIMARY"`
    }
    if err := json.Unmarshal(res.Result, &bindings); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("привязок:", len(bindings))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "CONTACT_ID": 2649,
            "SORT": 10,
            "ROLE_ID": 0,
            "IS_PRIMARY": "Y"
        },
        {
            "CONTACT_ID": 2647,
            "SORT": 20,
            "ROLE_ID": 0,
            "IS_PRIMARY": "N"
        }
    ],
    "time": {
        "start": 1787206096,
        "finish": 1787206096.725297,
        "duration": 0.7252969741821289,
        "processing": 0,
        "date_start": "2026-08-20T09:08:16+03:00",
        "date_finish": "2026-08-20T09:08:16+03:00",
        "operating_reset_at": 1787206696,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`quote_contact_binding[]`](#quote_contact_binding) | Корневой элемент ответа. Содержит массив с информацией о привязанных к предложению контактах, отсортированный по возрастанию `SORT`. Если у предложения нет привязанных контактов, возвращается пустой массив ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Параметр quote_contact_binding {#quote_contact_binding}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID**
[`integer`](../../../data-types.md) | Идентификатор контакта ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки ||
|| **ROLE_ID**
[`integer`](../../../data-types.md) | Идентификатор роли (служебное поле). Через REST не заполняется и всегда равен `0` ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md) | Является ли привязка первичной. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

{% note info "" %}

Метод не проверяет, существует ли предложение. Для несуществующего `id` он возвращает пустой массив, а не ошибку

{% endnote %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "The parameter ownerEntityID is invalid or not defined."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустое значение | `The parameter ownerEntityID is invalid or not defined.` | Передан `id` меньше 1 или не передан вовсе ||
|| `ACCESS_DENIED` | `Access denied!` | Нет прав на чтение коммерческого предложения. Ответ приходит с HTTP-статусом `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-contact-add.md)
- [{#T}](./crm-quote-contact-delete.md)
- [{#T}](./crm-quote-contact-items-set.md)
- [{#T}](./crm-quote-contact-items-delete.md)
- [{#T}](./crm-quote-contact-fields.md)
