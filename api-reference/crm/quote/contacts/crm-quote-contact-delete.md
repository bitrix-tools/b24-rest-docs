# Удалить контакт из указанного предложения crm.quote.contact.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» коммерческих предложений

Метод `crm.quote.contact.delete` удаляет контакт из указанного коммерческого предложения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор коммерческого предложения

Идентификатор можно получить с помощью методов [crm.quote.list](../crm-quote-list.md) или [crm.quote.add](../crm-quote-add.md)
||
|| **fields***
[`object`](../../../data-types.md) | Объект с информацией о том, какой контакт нужно удалить из привязок [(подробное описание)](#parameter-fields) ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID***
[`crm_entity`](../../data-types.md) | Идентификатор контакта, который нужно удалить из привязок

Идентификатор привязанного контакта можно получить методом [crm.quote.contact.items.get](./crm-quote-contact-items-get.md) ||
|#

{% note info "Удалить первичную привязку" %}

Если удалить первичную привязку, новой первичной станет первая доступная привязка

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример удаления связи предложение-контакт, где:
- идентификатор предложения — `113`
- идентификатор контакта — `2647`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":113,"fields":{"CONTACT_ID":2647}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.contact.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":113,"fields":{"CONTACT_ID":2647},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.contact.delete
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'crm.quote.contact.delete',
        params: {
          id: 113,
          fields: {
            CONTACT_ID: 2647,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contact unlinked from quote:', result)
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
      async function deleteQuoteContact() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.contact.delete',
            params: {
              id: 113,
              fields: {
                CONTACT_ID: 2647,
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
          console.info('Contact unlinked from quote:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteQuoteContact)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.contact.delete',
                [
                    'id' => 113,
                    'fields' => [
                        'CONTACT_ID' => 2647,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Unlinked: ' . ($result ? 'true' : 'false');

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting quote contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.contact.delete',
        {
            id: 113,
            fields: {
                CONTACT_ID: 2647,
            },
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
        'crm.quote.contact.delete',
        [
            'id' => 113,
            'fields' => [
                'CONTACT_ID' => 2647,
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
    res, err := client.Core().Call(ctx, "crm.quote.contact.delete", b24.Params{
    	"id": 113,
    	"fields": b24.Params{
    		"CONTACT_ID": 2647,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.quote.contact.delete: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1787206097,
        "finish": 1787206097.428249,
        "duration": 0.42824888229370117,
        "processing": 0,
        "date_start": "2026-08-20T09:08:17+03:00",
        "date_finish": "2026-08-20T09:08:17+03:00",
        "operating_reset_at": 1787206697,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит:
- `true` — контакт удален из предложения
- `false` — контакт не связан с предложением
||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустое значение | `The parameter 'ownerEntityID' is invalid or not defined.` | Передан `id` меньше 1 или не передан вовсе ||
|| Пустое значение | `The parameter 'item' must be array.` | В `fields` передан не объект ||
|| Пустое значение | `The parameter 'fields' is not valid.` | Может возникать из-за нескольких причин:
- если не передан обязательный параметр `fields.CONTACT_ID`
- если переданный параметр `fields.CONTACT_ID` меньше или равен 0 ||
|| Пустое значение | `Not found.` | Предложение с переданным `id` не найдено ||
|| Пустое значение | `[Контакт #2647] У Вас нет прав на просмотр этого элемента` | У пользователя нет прав на чтение контакта, который он отвязывает ||
|| `ACCESS_DENIED` | `Access denied!` | Нет прав на изменение коммерческого предложения. Ответ приходит с HTTP-статусом `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-contact-add.md)
- [{#T}](./crm-quote-contact-items-get.md)
- [{#T}](./crm-quote-contact-items-set.md)
- [{#T}](./crm-quote-contact-items-delete.md)
- [{#T}](./crm-quote-contact-fields.md)
