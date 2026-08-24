# Установить набор контактов, связанных с указанным предложением crm.quote.contact.items.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» коммерческих предложений

Метод `crm.quote.contact.items.set` устанавливает набор контактов, связанных с указанным коммерческим предложением. Контакты, которых нет в переданном списке, будут отвязаны.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор коммерческого предложения

Идентификатор можно получить с помощью методов [crm.quote.list](../crm-quote-list.md) или [crm.quote.add](../crm-quote-add.md)
||
|| **items***
[`object[]`](../../../data-types.md) | Набор объектов, которые описывают привязанные к предложению контакты [(подробное описание)](#quote_contact_binding)

Если передать пустой массив, все привязки контактов будут удалены ||
|#

### Структура объекта привязки {#quote_contact_binding}

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

Если нет привязки с `IS_PRIMARY = Y`, то она выставляется у первой привязки в `items`.

Если передано несколько привязок с `IS_PRIMARY = Y`, то первичной будет считаться первая привязка с `IS_PRIMARY = Y` ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки

По умолчанию `(i + 1) * 10`, где `i` — индекс элемента в массиве `items`, начиная с 0 ||
|#

Идентификатор первичного контакта попадает в поле предложения `CONTACT_ID` и возвращается методом [crm.quote.get](../crm-quote-get.md).

{% note warning "" %}

Метод не проверяет, существуют ли контакты. Если передать идентификатор несуществующего контакта, привязка будет создана, а сам идентификатор попадет в поле предложения `CONTACT_ID`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Установить у предложения с `id = 113` следующие привязанные контакты:
- контакт с `id = 2649`, сделать его первичным и установить `SORT = 10`
- контакт с `id = 2647`, установить `SORT = 20`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":113,"items":[{"CONTACT_ID":2649,"SORT":10,"IS_PRIMARY":"Y"},{"CONTACT_ID":2647,"SORT":20}]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.contact.items.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":113,"items":[{"CONTACT_ID":2649,"SORT":10,"IS_PRIMARY":"Y"},{"CONTACT_ID":2647,"SORT":20}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.contact.items.set
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
        method: 'crm.quote.contact.items.set',
        params: {
          id: 113,
          items: [
            {
              CONTACT_ID: 2649,
              SORT: 10,
              IS_PRIMARY: 'Y',
            },
            {
              CONTACT_ID: 2647,
              SORT: 20,
            },
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Quote contacts saved:', result)
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
      async function setQuoteContacts() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.contact.items.set',
            params: {
              id: 113,
              items: [
                {
                  CONTACT_ID: 2649,
                  SORT: 10,
                  IS_PRIMARY: 'Y',
                },
                {
                  CONTACT_ID: 2647,
                  SORT: 20,
                },
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Quote contacts saved:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setQuoteContacts)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.contact.items.set',
                [
                    'id' => 113,
                    'items' => [
                        [
                            'CONTACT_ID' => 2649,
                            'SORT' => 10,
                            'IS_PRIMARY' => 'Y',
                        ],
                        [
                            'CONTACT_ID' => 2647,
                            'SORT' => 20,
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Updated: ' . ($result ? 'true' : 'false');

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting quote contacts: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.contact.items.set',
        {
            id: 113,
            items: [
                {
                    CONTACT_ID: 2649,
                    SORT: 10,
                    IS_PRIMARY: 'Y',
                },
                {
                    CONTACT_ID: 2647,
                    SORT: 20,
                },
            ],
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
        'crm.quote.contact.items.set',
        [
            'id' => 113,
            'items' => [
                [
                    'CONTACT_ID' => 2649,
                    'SORT' => 10,
                    'IS_PRIMARY' => 'Y',
                ],
                [
                    'CONTACT_ID' => 2647,
                    'SORT' => 20,
                ],
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
    res, err := client.Core().Call(ctx, "crm.quote.contact.items.set", b24.Params{
    	"id": 113,
    	"items": []b24.Params{
    		{
    			"CONTACT_ID": 2649,
    			"SORT":       10,
    			"IS_PRIMARY": "Y",
    		},
    		{
    			"CONTACT_ID": 2647,
    			"SORT":       20,
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.quote.contact.items.set: %w", err)
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
        "start": 1787206096,
        "finish": 1787206096.073034,
        "duration": 0.07303404808044434,
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
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Содержит `true` в случае успеха ||
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
|| Пустое значение | `The parameter ownerEntityID is invalid or not defined.` | Передан `id` меньше 1 или не передан вовсе ||
|| Пустое значение | `The parameter items must be array.` | В `items` передан не массив ||
|| Пустое значение | `Not found.` | Предложение с переданным `id` не найдено ||
|| Пустое значение | `[Контакт #2647] У Вас нет прав на просмотр этого элемента` | У пользователя нет прав на чтение контакта, привязка которого добавляется или удаляется ||
|| `ACCESS_DENIED` | `Access denied!` | Нет прав на изменение коммерческого предложения. Ответ приходит с HTTP-статусом `403` ||
|| `ERROR_CORE` | Текст внутренней ошибки | Сбой при нормализации набора привязок, HTTP-статус ответа — `500` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-contact-add.md)
- [{#T}](./crm-quote-contact-delete.md)
- [{#T}](./crm-quote-contact-items-get.md)
- [{#T}](./crm-quote-contact-items-delete.md)
- [{#T}](./crm-quote-contact-fields.md)
