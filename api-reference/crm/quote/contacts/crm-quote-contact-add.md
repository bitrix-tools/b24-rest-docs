# Добавить контакт к предложению crm.quote.contact.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» коммерческих предложений

Метод `crm.quote.contact.add` добавляет контакт к указанному коммерческому предложению.

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
[`object`](../../../data-types.md) | Объект с информацией о том, какой контакт нужно привязать к предложению [(подробное описание)](#parameter-fields) ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONTACT_ID***
[`crm_entity`](../../data-types.md) | Идентификатор контакта, который будет привязан к предложению

Идентификатор можно получить с помощью методов [crm.contact.list](../../contacts/crm-contact-list.md) или [crm.contact.add](../../contacts/crm-contact-add.md) ||
|| **IS_PRIMARY**
[`char`](../../../data-types.md) | Является ли привязка первичной. Возможные значения:
- `Y` — да
- `N` — нет

Если у предложения еще нет первичной привязки, добавляемая станет первичной независимо от переданного значения. Если первичная привязка уже есть и передать `Y`, первичной станет добавляемая, а прежняя получит `N` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки

По умолчанию — максимальный `SORT` среди уже привязанных контактов плюс 10. У первой привязки предложения `SORT = 10` ||
|#

Идентификатор первичного контакта попадает в поле предложения `CONTACT_ID` и возвращается методом [crm.quote.get](../crm-quote-get.md).

{% note warning "" %}

Метод не проверяет, существует ли контакт. Если передать идентификатор несуществующего контакта, привязка будет создана, а сам идентификатор попадет в поле предложения `CONTACT_ID`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример добавления связи предложение-контакт, где:
- идентификатор предложения — `113`
- идентификатор контакта — `2647`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":113,"fields":{"CONTACT_ID":2647,"IS_PRIMARY":"Y","SORT":10}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.contact.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":113,"fields":{"CONTACT_ID":2647,"IS_PRIMARY":"Y","SORT":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.contact.add
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
        method: 'crm.quote.contact.add',
        params: {
          id: 113,
          fields: {
            CONTACT_ID: 2647,
            IS_PRIMARY: 'Y',
            SORT: 10,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Contact linked to quote:', result)
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
      async function addQuoteContact() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.contact.add',
            params: {
              id: 113,
              fields: {
                CONTACT_ID: 2647,
                IS_PRIMARY: 'Y',
                SORT: 10,
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
          console.info('Contact linked to quote:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addQuoteContact)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.contact.add',
                [
                    'id' => 113,
                    'fields' => [
                        'CONTACT_ID' => 2647,
                        'IS_PRIMARY' => 'Y',
                        'SORT' => 10,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Linked: ' . ($result ? 'true' : 'false');

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding quote contact: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.contact.add',
        {
            id: 113,
            fields: {
                CONTACT_ID: 2647,
                IS_PRIMARY: 'Y',
                SORT: 10,
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
        'crm.quote.contact.add',
        [
            'id' => 113,
            'fields' => [
                'CONTACT_ID' => 2647,
                'IS_PRIMARY' => 'Y',
                'SORT' => 10,
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
    res, err := client.Core().Call(ctx, "crm.quote.contact.add", b24.Params{
    	"id": 113,
    	"fields": b24.Params{
    		"CONTACT_ID": 2647,
    		"IS_PRIMARY": "Y",
    		"SORT":       10,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.quote.contact.add: %w", err)
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
        "start": 1787206092,
        "finish": 1787206092.837103,
        "duration": 0.8371028900146484,
        "processing": 0,
        "date_start": "2026-08-20T09:08:12+03:00",
        "date_finish": "2026-08-20T09:08:12+03:00",
        "operating_reset_at": 1787206692,
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
- `true` — связь добавлена
- `false` — связь не добавлена, контакт уже связан с предложением
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
|| Пустое значение | `The parameter 'fields' must be array.` | В `fields` передан не объект ||
|| Пустое значение | `The parameter 'fields' is not valid.` | Может возникать из-за нескольких причин:
- если не передан обязательный параметр `fields.CONTACT_ID`
- если переданный параметр `fields.CONTACT_ID` меньше или равен 0 ||
|| Пустое значение | `Not found.` | Предложение с переданным `id` не найдено ||
|| Пустое значение | `[Контакт #2647] У Вас нет прав на просмотр этого элемента` | У пользователя нет прав на чтение контакта, который он привязывает ||
|| `ACCESS_DENIED` | `Access denied!` | Нет прав на изменение коммерческого предложения. Ответ приходит с HTTP-статусом `403` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-contact-delete.md)
- [{#T}](./crm-quote-contact-items-get.md)
- [{#T}](./crm-quote-contact-items-set.md)
- [{#T}](./crm-quote-contact-items-delete.md)
- [{#T}](./crm-quote-contact-fields.md)
