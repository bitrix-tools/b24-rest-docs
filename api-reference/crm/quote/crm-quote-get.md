# Получить коммерческое предложение по идентификатору crm.quote.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» коммерческих предложений

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.get](../universal/crm-item-get.md).

{% endnote %}

Метод `crm.quote.get` возвращает коммерческое предложение по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор коммерческого предложения.

Идентификатор можно получить с помощью методов [crm.quote.list](./crm-quote-list.md) и [crm.quote.add](./crm-quote-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получения предложения с `id = 43`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":43}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":43,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type QuoteData = {
      ID: string
      TITLE: string
      STATUS_ID: string
      CURRENCY_ID: string
      OPPORTUNITY: string
      TAX_VALUE: string
      COMPANY_ID: string | null
      CONTACT_ID: string | null
      MYCOMPANY_ID: string | null
      BEGINDATE: ISODate | null
      CLOSEDATE: ISODate | null
      ACTUAL_DATE: ISODate | null
      ASSIGNED_BY_ID: string
      CREATED_BY_ID: string
      MODIFY_BY_ID: string
      DATE_CREATE: ISODate
      DATE_MODIFY: ISODate
      OPENED: string
      CLOSED: string
      COMMENTS: string | null
      LEAD_ID: string | null
      DEAL_ID: string | null
      QUOTE_NUMBER: string
    }

    try {
      const response = await $b24.actions.v2.call.make<QuoteData>({
        method: 'crm.quote.get',
        params: {
          id: 43,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.ID, result.TITLE, result.STATUS_ID)
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
      async function getQuote() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.get',
            params: {
              id: 43,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.ID, result.TITLE, result.STATUS_ID)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getQuote)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.get',
                [
                    'id' => 43,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting quote: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.get',
        {
            id: 43,
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
        'crm.quote.get',
        [
            'id' => 43,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "43",
        "TITLE": "КП на поставку мебели",
        "STATUS_ID": "SENT",
        "CURRENCY_ID": "RUB",
        "OPPORTUNITY": "150000.00",
        "TAX_VALUE": "0.00",
        "COMPANY_ID": "1",
        "CONTACT_ID": null,
        "MYCOMPANY_ID": "340",
        "BEGINDATE": "2026-03-13T03:00:00+03:00",
        "CLOSEDATE": "2026-03-20T03:00:00+03:00",
        "ACTUAL_DATE": "2026-03-20T03:00:00+03:00",
        "ASSIGNED_BY_ID": "1",
        "CREATED_BY_ID": "577",
        "MODIFY_BY_ID": "577",
        "DATE_CREATE": "2026-03-13T13:15:37+03:00",
        "DATE_MODIFY": "2026-03-13T16:56:07+03:00",
        "OPENED": "Y",
        "CLOSED": "N",
        "COMMENTS": "Уточнены условия и сроки",
        "LEAD_ID": null,
        "DEAL_ID": null,
        "QUOTE_NUMBER": "43",
        "CONTENT": null,
        "TERMS": null,
        "PERSON_TYPE_ID": "1",
        "LOCATION_ID": null,
        "CLIENT_TITLE": null,
        "CLIENT_ADDR": null,
        "CLIENT_CONTACT": null,
        "CLIENT_EMAIL": null,
        "CLIENT_PHONE": null,
        "CLIENT_TP_ID": null,
        "CLIENT_TPA_ID": null,
        "UTM_SOURCE": null,
        "UTM_MEDIUM": null,
        "UTM_CAMPAIGN": null,
        "UTM_CONTENT": null,
        "UTM_TERM": null,
        "PARENT_ID_136": null,
        "LAST_COMMUNICATION_TIME": null,
        "LAST_ACTIVITY_BY": "577",
        "LAST_ACTIVITY_TIME": "2026-03-13T13:15:37+03:00",
        "UF_CRM_566EB0AC9B7FC": "",
        "UF_CRM_566EB0AFA9895": "0",
        "UF_CRM_566EB0AFB84F1": "Интернет-магазин",
        "UF_CRM_566EB0AFC58FD": "0",
        "UF_CRM_566EB0AFDA4EF": "",
        "UF_CRM_566EB0AFEDB2F": "",
        "UF_CRM_566EB0B014EC2": "",
        "UF_CRM_566EB0B0231B2": "",
        "UF_CRM_566EB0B02F46F": "",
        "UF_CRM_566EB0B03CDCD": "",
        "UF_CRM_566EB0B04D190": "267",
        "UF_CRM_577BBCE34CC90": "",
        "UF_CRM_577BBCE354F86": ""
    },
    "time": {
        "start": 1773411068,
        "finish": 1773411068.183631,
        "duration": 0.18363094329833984,
        "processing": 0,
        "date_start": "2026-03-13T17:11:08+03:00",
        "date_finish": "2026-03-13T17:11:08+03:00",
        "operating_reset_at": 1773411668,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит поля коммерческого предложения.

Набор и типы полей можно получить методом [crm.quote.fields](./crm-quote-fields.md) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `ID is not defined or invalid.` | Передан некорректный `id` ||
|| `-` | `Access denied.` | У пользователя нет прав на чтение коммерческих предложений ||
|| `-` | `Not found` | Коммерческое предложение с переданным `id` не найдено ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-add.md)
- [{#T}](./crm-quote-update.md)
- [{#T}](./crm-quote-list.md)
- [{#T}](./crm-quote-delete.md)
- [{#T}](./crm-quote-fields.md)





