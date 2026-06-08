# Получить настройки шаблона регулярной сделки по id crm.deal.recurring.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» сделок

Метод `crm.deal.recurring.get` возвращает поля настройки шаблона регулярной сделки по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id^*^**
[`integer`](../../../data-types.md) | Идентификатор настройки шаблона регулярной сделки.

Идентификатор можно получить с помощью методов [crm.deal.recurring.list](./crm-deal-recurring-list.md) или [crm.deal.recurring.add](./crm-deal-recurring-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.recurring.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.recurring.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CrmDealRecurring = {
      ID: string
      DEAL_ID: string
      BASED_ID: string
      ACTIVE: string
      CATEGORY_ID: string
      IS_LIMIT: string
      COUNTER_REPEAT: string | null
      LIMIT_REPEAT: string | null
      LIMIT_DATE: ISODate | null
      START_DATE: ISODate | null
      NEXT_EXECUTION: ISODate | null
      LAST_EXECUTION: ISODate | null
      PARAMS: {
        MODE: string
        MULTIPLE_TYPE: string
        MULTIPLE_INTERVAL: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmDealRecurring>({
        method: 'crm.deal.recurring.get',
        params: {
          id: 15,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Recurring template:', result.ID, result.ACTIVE)
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
      async function getRecurringDeal() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.deal.recurring.get',
            params: {
              id: 15,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Recurring template:', result.ID, result.ACTIVE)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getRecurringDeal)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.deal.recurring.get',
                [
                    'id' => 15,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Recurring settings: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting recurring settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.recurring.get',
        {
            id: 15
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.recurring.get',
        [
            'id' => 15
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.deal.recurring.get(bitrix_id=77).response
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "25",
        "DEAL_ID": "7591",
        "BASED_ID": "7577",
        "ACTIVE": "Y",
        "CATEGORY_ID": "2",
        "IS_LIMIT": "D",
        "COUNTER_REPEAT": null,
        "LIMIT_REPEAT": null,
        "LIMIT_DATE": "2027-03-05T03:00:00+03:00",
        "START_DATE": "2026-04-05T03:00:00+03:00",
        "NEXT_EXECUTION": "2026-04-05T01:00:00+03:00",
        "LAST_EXECUTION": "",
        "PARAMS": {
            "MODE": "multiple",
            "SINGLE_BEFORE_START_DATE_TYPE": null,
            "SINGLE_BEFORE_START_DATE_VALUE": 0,
            "MULTIPLE_TYPE": "month",
            "MULTIPLE_INTERVAL": 1,
            "OFFSET_BEGINDATE_TYPE": "day",
            "OFFSET_BEGINDATE_VALUE": 1,
            "OFFSET_CLOSEDATE_TYPE": "month",
            "OFFSET_CLOSEDATE_VALUE": 2
        }
    },
    "time": {
        "start": 1772753726,
        "finish": 1772753726.940512,
        "duration": 0.94051194190979,
        "processing": 0,
        "date_start": "2026-03-06T02:35:26+03:00",
        "date_finish": "2026-03-06T02:35:26+03:00",
        "operating_reset_at": 1772754326,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`recurring_deal`](#recurring-deal) | Корневой элемент ответа. Содержит поля настройки шаблона регулярной сделки ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип recurring_deal {#recurring-deal}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор записи в таблице настроек регулярной сделки ||
|| **DEAL_ID**
[`integer`](../../../data-types.md) | Идентификатор сделки, для которой настроена регулярность ||
|| **BASED_ID**
[`integer`](../../../data-types.md) | Идентификатор сделки, на основании которой создан шаблон ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Флаг активности. Возможные значения:
- `Y` — активна
- `N` — неактивна ||
|| **NEXT_EXECUTION**
[`datetime`](../../../data-types.md) | Дата и время следующего создания сделки из шаблона ||
|| **LAST_EXECUTION**
[`datetime`](../../../data-types.md) | Дата и время последнего создания сделки из шаблона.

Может быть пустой строкой, если запусков еще не было ||
|| **COUNTER_REPEAT**
[`integer`](../../../data-types.md) | Количество созданных из шаблона сделок.||
|| **START_DATE**
[`datetime`](../../../data-types.md) | Дата начала расчета следующего запуска.

В ответе возвращается в формате `YYYY-MM-DDTHH:MI:SS+TZD` ||
|| **CATEGORY_ID**
[`char`](../../../data-types.md) | Идентификатор воронки для создаваемых сделок ||
|| **IS_LIMIT**
[`char`](../../../data-types.md) | Тип ограничения на создание сделок:
- `N` — без ограничений
- `D` — по дате (`LIMIT_DATE`)
- `T` — по количеству (`LIMIT_REPEAT`) ||
|| **LIMIT_REPEAT**
[`integer`](../../../data-types.md) | Максимальное количество создаваемых сделок. Используется при `IS_LIMIT = T`||
|| **LIMIT_DATE**
[`datetime`](../../../data-types.md) | Дата окончания генерации сделок. Используется при `IS_LIMIT = D`.

В ответе возвращается в формате `YYYY-MM-DDTHH:MI:SS+TZD` ||
|| **PARAMS**
[`object`](../../../data-types.md) | Параметры периодичности [(подробное описание)](#params-fields) ||
|#

#### Поля объекта PARAMS {#params-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **MODE**
[`string`](../../../data-types.md) | Режим повторения:
- `single` — одиночный
- `multiple` — множественный ||
|| **MULTIPLE_TYPE**
[`string`](../../../data-types.md) | Тип периода для `MODE = multiple`:
- `day`
- `week`
- `month`
- `year` ||
|| **MULTIPLE_INTERVAL**
[`integer`](../../../data-types.md) | Интервал повторения для `MODE = multiple` ||
|| **SINGLE_BEFORE_START_DATE_TYPE**
[`string`](../../../data-types.md) | Тип смещения для `MODE = single`:
- `day`
- `week`
- `month`
- `year`||
|| **SINGLE_BEFORE_START_DATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения для `MODE = single`.

Для `MODE = multiple` обычно возвращается `0` ||
|| **OFFSET_BEGINDATE_TYPE**
[`string`](../../../data-types.md) | Тип смещения даты начала создаваемой сделки:
- `day`
- `week`
- `month`
- `year` ||
|| **OFFSET_BEGINDATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения даты начала создаваемой сделки ||
|| **OFFSET_CLOSEDATE_TYPE**
[`string`](../../../data-types.md) | Тип смещения даты завершения создаваемой сделки:
- `day`
- `week`
- `month`
- `year` ||
|| **OFFSET_CLOSEDATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения даты завершения создаваемой сделки ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Recurring deal is not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `id is not defined or invalid` | В параметр `id` передано пустое или некорректное значение ||
|| `Recurring is not allowed` | Регулярные сделки недоступны в Битрикс24 ||
|| `Recurring deal is not found` | Шаблон регулярной сделки не найден ||
|| `Access denied` | Недостаточно прав для чтения шаблона регулярной сделки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-recurring-fields.md)
- [{#T}](./crm-deal-recurring-list.md)
- [{#T}](./crm-deal-recurring-add.md)
- [{#T}](./crm-deal-recurring-update.md)
- [{#T}](./crm-deal-recurring-delete.md)
- [{#T}](./crm-deal-recurring-expose.md)
