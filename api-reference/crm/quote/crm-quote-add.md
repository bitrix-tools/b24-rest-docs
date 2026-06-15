# Добавить коммерческое предложение crm.quote.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «добавления» коммерческих предложений

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.add](../universal/crm-item-add.md).

{% endnote %}

Метод `crm.quote.add` создает коммерческое предложение.

Если в предложении нужно явно указать реквизиты покупателя и продавца, используйте метод [crm.requisite.link.register](../requisites/links/crm-requisite-link-register.md).

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../data-types.md) | Объект с полями коммерческого предложения формата:

```json
{
    "field_1": "value_1",
    "field_2": "value_2",
    "...": "..."
}
```

где:
- `field_n` — название поля
- `value_n` — значение поля

Список обязательных и основных полей — [ниже](#parameter-fields).

Полный список доступных полей и их типов можно получить методом [crm.quote.fields](./crm-quote-fields.md)
||
|| **params**
[`object`](../data-types.md) | Объект дополнительных параметров [(подробное описание)](#parameter-params) ||
|#

### Параметр fields {#parameter-fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../data-types.md) | Тема коммерческого предложения

Ограничение длины — до `255` символов.

Если передать значение длиннее `255`, система обрежет его до `255` символов ||
|| **STATUS_ID**
[`crm_status`](../data-types.md) | Стадия предложения

Передавайте значение явно в каждом запросе.

Список доступных стадий можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром `ENTITY_ID = QUOTE_STATUS` ||
|| **CURRENCY_ID**
[`crm_currency`](../data-types.md) | Валюта суммы предложения ||
|| **OPPORTUNITY**
[`double`](../data-types.md) | Сумма предложения

Передавайте числовое значение в паре с `CURRENCY_ID` ||
|| **ASSIGNED_BY_ID**
[`user`](../data-types.md) | Идентификатор ответственного ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор компании-клиента ||
|| **CONTACT_IDS**
[`crm_contact[]`](../data-types.md) | Массив идентификаторов контактов клиента
||
|| **MYCOMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор «вашей компании» для реквизитов продавца ||
|| **OPENED**
[`char`](../data-types.md) | Доступно ли предложение для всех. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **PERSON_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа плательщика ||
|| **BEGINDATE**
[`date`](../data-types.md) | Дата выставления ||
|| **CLOSEDATE**
[`date`](../data-types.md) | Срок действия предложения ||
|| **CLIENT_TITLE**
[`string`](../data-types.md) | Название клиента, до `255` символов ||
|| **CLIENT_ADDR**
[`string`](../data-types.md) | Адрес клиента, до `255` символов ||
|| **CLIENT_EMAIL**
[`string`](../data-types.md) | Email клиента, до `255` символов ||
|| **CLIENT_PHONE**
[`string`](../data-types.md) | Телефон клиента, до `255` символов ||
|| **COMMENTS**
[`string`](../data-types.md) | Комментарий ||
|#

{% note info "Особенность метода" %}

Часть некорректных значений в полях может не приводить к ошибке `400`: значения нормализуются, обрезаются или заменяются значениями по умолчанию.

{% endnote %}

### Параметр params {#parameter-params}

#|
|| **Название**
`тип` | **Описание** ||
|| **IMPORT**
[`boolean`](../data-types.md) | Режим импорта. Возможные значения:
- `Y` — да
- `N` — нет ||
|#

**Импорт**

Данные поля доступны для заполнения при передаче параметра `IMPORT = 'Y'` в параметр `params`.

#|
|| **Название**
`тип` | **Описание** ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../data-types.md) | Дата изменения ||
|| **CREATED_BY_ID**
[`user`](../data-types.md) | Кем создана ||
|| **MODIFY_BY_ID**
[`user`](../data-types.md) | Кем изменена ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример создания коммерческого предложения:
- тема — `КП на поставку мебели`
- покупатель — компания с `id = 1`
- продавец — ваша компания с `id = 3`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"КП на поставку мебели","STATUS_ID":"DRAFT","OPENED":"Y","ASSIGNED_BY_ID":1,"CURRENCY_ID":"RUB","OPPORTUNITY":150000,"COMPANY_ID":1,"MYCOMPANY_ID":3,"COMMENTS":"Подготовлено по запросу клиента","BEGINDATE":"2026-03-13T10:00:00+03:00","CLOSEDATE":"2026-03-20T18:00:00+03:00"},"params":{"IMPORT":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"КП на поставку мебели","STATUS_ID":"DRAFT","OPENED":"Y","ASSIGNED_BY_ID":1,"CURRENCY_ID":"RUB","OPPORTUNITY":150000,"COMPANY_ID":1,"MYCOMPANY_ID":3,"COMMENTS":"Подготовлено по запросу клиента","BEGINDATE":"2026-03-13T10:00:00+03:00","CLOSEDATE":"2026-03-20T18:00:00+03:00"},"params":{"IMPORT":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'crm.quote.add',
        params: {
          fields: {
            TITLE: 'Furniture supply quote',
            STATUS_ID: 'DRAFT',
            OPENED: 'Y',
            ASSIGNED_BY_ID: 1,
            CURRENCY_ID: 'RUB',
            OPPORTUNITY: 150000,
            COMPANY_ID: 1,
            MYCOMPANY_ID: 3,
            COMMENTS: 'Prepared at client request',
            BEGINDATE: '2026-03-13T10:00:00+03:00',
            CLOSEDATE: '2026-03-20T18:00:00+03:00',
          },
          params: {
            IMPORT: 'N',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created quote ID:', result)
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
      async function createQuote() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.quote.add',
            params: {
              fields: {
                TITLE: 'Furniture supply quote',
                STATUS_ID: 'DRAFT',
                OPENED: 'Y',
                ASSIGNED_BY_ID: 1,
                CURRENCY_ID: 'RUB',
                OPPORTUNITY: 150000,
                COMPANY_ID: 1,
                MYCOMPANY_ID: 3,
                COMMENTS: 'Prepared at client request',
                BEGINDATE: '2026-03-13T10:00:00+03:00',
                CLOSEDATE: '2026-03-20T18:00:00+03:00',
              },
              params: {
                IMPORT: 'N',
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
          console.info('Created quote ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', createQuote)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.quote.add',
                [
                    'fields' => [
                        'TITLE' => 'КП на поставку мебели',
                        'STATUS_ID' => 'DRAFT',
                        'OPENED' => 'Y',
                        'ASSIGNED_BY_ID' => 1,
                        'CURRENCY_ID' => 'RUB',
                        'OPPORTUNITY' => 150000,
                        'COMPANY_ID' => 1,
                        'MYCOMPANY_ID' => 3,
                        'COMMENTS' => 'Подготовлено по запросу клиента',
                        'BEGINDATE' => '2026-03-13T10:00:00+03:00',
                        'CLOSEDATE' => '2026-03-20T18:00:00+03:00',
                    ],
                    'params' => [
                        'IMPORT' => 'N',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Created quote ID: ' . $result;

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating quote: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.add',
        {
            fields: {
                TITLE: 'КП на поставку мебели',
                STATUS_ID: 'DRAFT',
                OPENED: 'Y',
                ASSIGNED_BY_ID: 1,
                CURRENCY_ID: 'RUB',
                OPPORTUNITY: 150000,
                COMPANY_ID: 1,
                MYCOMPANY_ID: 3,
                COMMENTS: 'Подготовлено по запросу клиента',
                BEGINDATE: '2026-03-13T10:00:00+03:00',
                CLOSEDATE: '2026-03-20T18:00:00+03:00',
            },
            params: {
                IMPORT: 'N',
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
        'crm.quote.add',
        [
            'fields' => [
                'TITLE' => 'КП на поставку мебели',
                'STATUS_ID' => 'DRAFT',
                'OPENED' => 'Y',
                'ASSIGNED_BY_ID' => 1,
                'CURRENCY_ID' => 'RUB',
                'OPPORTUNITY' => 150000,
                'COMPANY_ID' => 1,
                'MYCOMPANY_ID' => 3,
                'COMMENTS' => 'Подготовлено по запросу клиента',
                'BEGINDATE' => '2026-03-13T10:00:00+03:00',
                'CLOSEDATE' => '2026-03-20T18:00:00+03:00',
            ],
            'params' => [
                'IMPORT' => 'N',
            ],
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
    "result": 43,
    "time": {
        "start": 1773396937,
        "finish": 1773396937.557957,
        "duration": 0.5579569339752197,
        "processing": 0,
        "date_start": "2026-03-13T13:15:37+03:00",
        "date_finish": "2026-03-13T13:15:37+03:00",
        "operating_reset_at": 1773397537,
        "operating": 0.5224320888519287
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Корневой элемент ответа. Содержит идентификатор созданного коммерческого предложения ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'fields' must be array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `Parameter 'fields' must be array.` | В `fields` передан не объект ||
|| `-` | `Parameter 'params' must be array.` | В `params` передан не объект ||
|| `-` | `Access denied.` | У пользователя нет прав на добавление коммерческих предложений ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-update.md)
- [{#T}](./crm-quote-get.md)
- [{#T}](./crm-quote-list.md)
- [{#T}](./crm-quote-delete.md)
- [{#T}](./crm-quote-fields.md)
- [{#T}](./crm-quote-product-rows-set.md)
- [{#T}](./crm-quote-product-rows-get.md)





