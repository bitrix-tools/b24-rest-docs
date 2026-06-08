# Изменить настройку шаблона регулярной сделки crm.deal.recurring.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами «чтение» и «изменение» сделок

Метод `crm.deal.recurring.update` обновляет существующую настройку шаблона регулярной сделки.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id^*^**
[`integer`](../../../data-types.md) | Идентификатор настройки шаблона регулярной сделки.

Идентификатор можно получить с помощью методов [crm.deal.recurring.list](./crm-deal-recurring-list.md) или [crm.deal.recurring.add](./crm-deal-recurring-add.md) ||
|| **fields**
[`object`](../../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля настройки
- `value_n` — новое значение поля настройки

Список доступных полей описан [ниже](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Флаг активности настройки. Возможные значения:
- `Y` — активна
- `N` — неактивна ||
|| **CATEGORY_ID**
[`char`](../../../data-types.md) | id воронки для новых сделок, создаваемых из шаблона.

Список доступных воронок можно узнать с помощью метода [crm.category.list](../../universal/category/crm-category-list.md), передав `entityTypeId = 2` ||
|| **IS_LIMIT**
[`char`](../../../data-types.md) | Ограничение по созданию новых сделок:
- `N` — без ограничений
- `D` — ограничение по дате (`LIMIT_DATE`)
- `T` — ограничение по количеству (`LIMIT_REPEAT`) ||
|| **LIMIT_REPEAT**
[`integer`](../../../data-types.md) | Максимальное количество сделок, которые можно создать из шаблона. Используется при `IS_LIMIT = T` ||
|| **LIMIT_DATE**
[`date`](../../../data-types.md) | Дата окончания генерации сделок из шаблона в формате `YYYY-MM-DD`. Используется при `IS_LIMIT = D` ||
|| **START_DATE**
[`date`](../../../data-types.md) | Дата начала расчета следующего запуска в формате `YYYY-MM-DD` ||
|| **PARAMS**
[`object`](../../../data-types.md) | Параметры периодичности [(подробное описание)](#params-fields) ||
|#

### Параметр PARAMS {#params-fields}

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
- `year` ||
|| **SINGLE_BEFORE_START_DATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения для `MODE = single` ||
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

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"fields":{"ACTIVE":"Y","CATEGORY_ID":"2","IS_LIMIT":"D","LIMIT_DATE":"2027-03-05","START_DATE":"2026-04-05","PARAMS":{"MODE":"multiple","MULTIPLE_TYPE":"month","MULTIPLE_INTERVAL":1,"OFFSET_BEGINDATE_TYPE":"day","OFFSET_BEGINDATE_VALUE":1,"OFFSET_CLOSEDATE_TYPE":"month","OFFSET_CLOSEDATE_VALUE":2}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.recurring.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"fields":{"ACTIVE":"Y","CATEGORY_ID":"2","IS_LIMIT":"D","LIMIT_DATE":"2027-03-05","START_DATE":"2026-04-05","PARAMS":{"MODE":"multiple","MULTIPLE_TYPE":"month","MULTIPLE_INTERVAL":1,"OFFSET_BEGINDATE_TYPE":"day","OFFSET_BEGINDATE_VALUE":1,"OFFSET_CLOSEDATE_TYPE":"month","OFFSET_CLOSEDATE_VALUE":2}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.recurring.update
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
        method: 'crm.deal.recurring.update',
        params: {
          id: 15,
          fields: {
            ACTIVE: 'Y',
            CATEGORY_ID: '2',
            IS_LIMIT: 'D',
            LIMIT_DATE: '2027-03-05',
            START_DATE: '2026-04-05',
            PARAMS: {
              MODE: 'multiple',
              MULTIPLE_TYPE: 'month',
              MULTIPLE_INTERVAL: 1,
              OFFSET_BEGINDATE_TYPE: 'day',
              OFFSET_BEGINDATE_VALUE: 1,
              OFFSET_CLOSEDATE_TYPE: 'month',
              OFFSET_CLOSEDATE_VALUE: 2,
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Recurring setting updated:', result)
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
      async function updateRecurringDeal() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.deal.recurring.update',
            params: {
              id: 15,
              fields: {
                ACTIVE: 'Y',
                CATEGORY_ID: '2',
                IS_LIMIT: 'D',
                LIMIT_DATE: '2027-03-05',
                START_DATE: '2026-04-05',
                PARAMS: {
                  MODE: 'multiple',
                  MULTIPLE_TYPE: 'month',
                  MULTIPLE_INTERVAL: 1,
                  OFFSET_BEGINDATE_TYPE: 'day',
                  OFFSET_BEGINDATE_VALUE: 1,
                  OFFSET_CLOSEDATE_TYPE: 'month',
                  OFFSET_CLOSEDATE_VALUE: 2,
                },
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
          console.info('Recurring setting updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateRecurringDeal)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.deal.recurring.update',
                [
                    'id' => 15,
                    'fields' => [
                        'ACTIVE'      => 'Y',
                        'CATEGORY_ID' => '2',
                        'IS_LIMIT'    => 'D',
                        'LIMIT_DATE'  => '2027-03-05',
                        'START_DATE'  => '2026-04-05',
                        'PARAMS'      => [
                            'MODE'                   => 'multiple',
                            'MULTIPLE_TYPE'          => 'month',
                            'MULTIPLE_INTERVAL'      => 1,
                            'OFFSET_BEGINDATE_TYPE'  => 'day',
                            'OFFSET_BEGINDATE_VALUE' => 1,
                            'OFFSET_CLOSEDATE_TYPE'  => 'month',
                            'OFFSET_CLOSEDATE_VALUE' => 2,
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . var_export($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating recurring deal settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.recurring.update',
        {
            id: 15,
            fields: {
                ACTIVE: 'Y',
                CATEGORY_ID: '2',
                IS_LIMIT: 'D',
                LIMIT_DATE: '2027-03-05',
                START_DATE: '2026-04-05',
                PARAMS: {
                    MODE: 'multiple',
                    MULTIPLE_TYPE: 'month',
                    MULTIPLE_INTERVAL: 1,
                    OFFSET_BEGINDATE_TYPE: 'day',
                    OFFSET_BEGINDATE_VALUE: 1,
                    OFFSET_CLOSEDATE_TYPE: 'month',
                    OFFSET_CLOSEDATE_VALUE: 2
                }
            }
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.info('Шаблон обновлен:', result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.recurring.update',
        [
            'id' => 15,
            'fields' => [
                'ACTIVE' => 'Y',
                'CATEGORY_ID' => '2',
                'IS_LIMIT' => 'D',
                'LIMIT_DATE' => '2027-03-05',
                'START_DATE' => '2026-04-05',
                'PARAMS' => [
                    'MODE' => 'multiple',
                    'MULTIPLE_TYPE' => 'month',
                    'MULTIPLE_INTERVAL' => 1,
                    'OFFSET_BEGINDATE_TYPE' => 'day',
                    'OFFSET_BEGINDATE_VALUE' => 1,
                    'OFFSET_CLOSEDATE_TYPE' => 'month',
                    'OFFSET_CLOSEDATE_VALUE' => 2
                ]
            ]
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
        bitrix_response = client.crm.deal.recurring.update(
            bitrix_id=77,
            fields={
                "TITLE": "Monthly Retainer Renewal - Updated",
                "IS_ACTIVE": "Y",
                "OPPORTUNITY": 6500,
                "STAGE_ID": "PREPARATION",
            },
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1772731825,
        "finish": 1772731825.579511,
        "duration": 0.5795109272003174,
        "processing": 0,
        "date_start": "2026-03-05T20:30:25+03:00",
        "date_finish": "2026-03-05T20:30:25+03:00",
        "operating_reset_at": 1772732425,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Для успешного обновления возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `Parameter 'fields' must be array` | Параметр `fields` не передан или передан не в формате объекта ||
|| `Recurring is not allowed` | Регулярные сделки недоступны в Битрикс24 ||
|| `Recurring deal is not found` | Шаблон регулярной сделки не найден ||
|| `Access denied` | Недостаточно прав для чтения или изменения связанной сделки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-recurring-fields.md)
- [{#T}](./crm-deal-recurring-get.md)
- [{#T}](./crm-deal-recurring-list.md)
- [{#T}](./crm-deal-recurring-add.md)
- [{#T}](./crm-deal-recurring-delete.md)
- [{#T}](./crm-deal-recurring-expose.md)
