# Получить поля для связи предложение-контакт crm.quote.contact.fields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.quote.contact.fields` возвращает описание полей для связи предложение-контакт.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.contact.fields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.contact.fields
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
        method: 'crm.quote.contact.fields',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Binding fields:', result)
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
      async function getQuoteContactFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.contact.fields',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Binding fields:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getQuoteContactFields)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call('crm.quote.contact.fields');

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Data: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting quote contact fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.contact.fields',
        {},
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

    $result = CRest::call('crm.quote.contact.fields');

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.quote.contact.fields", b24.Params{})
    if err != nil {
    	return fmt.Errorf("crm.quote.contact.fields: %w", err)
    }

    var fields map[string]any
    if err := json.Unmarshal(res.Result, &fields); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("полей:", len(fields))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "SORT": {
            "type": "integer",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Сортировка"
        },
        "IS_PRIMARY": {
            "type": "char",
            "isRequired": false,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Первичный"
        },
        "CONTACT_ID": {
            "type": "integer",
            "isRequired": true,
            "isReadOnly": false,
            "isImmutable": false,
            "isMultiple": false,
            "isDynamic": false,
            "title": "Контакт"
        }
    },
    "time": {
        "start": 1787206053,
        "finish": 1787206053.302384,
        "duration": 0.3023838996887207,
        "processing": 0,
        "date_start": "2026-08-20T09:07:33+03:00",
        "date_finish": "2026-08-20T09:07:33+03:00",
        "operating_reset_at": 1787206653,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект в формате:
```
{
    field_1: value_1,
    field_2: value_2,
    ...
    field_n: value_n,
}
```

где:
- `field_n` — поле объекта
- `value_n` — информация о поле в формате [crm_rest_field_description](../../data-types.md#crm_rest_field_description) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Состав полей связи не зависит от предложения и всегда один и тот же:

- `CONTACT_ID` — идентификатор привязываемого контакта, единственное обязательное поле
- `IS_PRIMARY` — признак первичного контакта, `Y` или `N`. Идентификатор первичного контакта попадает в поле предложения `CONTACT_ID`
- `SORT` — порядок контакта в карточке предложения

Метод описывает только те поля, которые принимают [crm.quote.contact.add](./crm-quote-contact-add.md) и [crm.quote.contact.items.set](./crm-quote-contact-items-set.md). В выдаче [crm.quote.contact.items.get](./crm-quote-contact-items-get.md) есть еще служебное поле `ROLE_ID`, которого в этом описании нет.

## Обработка ошибок

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-contact-add.md)
- [{#T}](./crm-quote-contact-delete.md)
- [{#T}](./crm-quote-contact-items-get.md)
- [{#T}](./crm-quote-contact-items-set.md)
- [{#T}](./crm-quote-contact-items-delete.md)
