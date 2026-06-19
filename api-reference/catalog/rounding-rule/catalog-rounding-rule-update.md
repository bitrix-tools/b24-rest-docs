# Изменить правило округления цен catalog.roundingRule.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод изменяет правило округления цен.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **Id***
[`catalog_rounding_rule.id`](../data-types.md#catalog_rounding_rule)| Идентификатор правила округления цен ||
|| **fields***
[`object`](../../data-types.md)| Значения полей для обновления правила округления цен ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId***
[`catalog_price_type.id`](../data-types.md#catalog_price_type) | Тип цены ||
|| **price***
[`double`](../../data-types.md) | Минимальная цена для округления ||
|| **roundType***
[`integer`](../../data-types.md) | Тип округления. Возможные значения:
- `1` — математическое округление
- `2` — округление вверх (в пользу магазина)
- `4` — округление вниз (в пользу клиента)
||
|| **roundPrecision***
[`double`](../../data-types.md) | Точность округления ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"catalogGroupId":14,"price":1500,"roundType":2,"roundPrecision":10}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.roundingRule.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"fields":{"catalogGroupId":14,"price":1500,"roundType":2,"roundPrecision":10},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.roundingRule.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type UpdateRoundingRuleResult = {
      roundingRule: {
        catalogGroupId: number
        createdBy: number
        dateCreate: ISODate | null
        dateModify: ISODate | null
        id: number
        modifiedBy: number
        price: number
        roundPrecision: number
        roundType: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<UpdateRoundingRuleResult>({
        method: 'catalog.roundingRule.update',
        params: {
          id: 1,
          fields: {
            catalogGroupId: 14,
            price: 1500,
            roundType: 2,
            roundPrecision: 10,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.roundingRule)
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
      async function updateRoundingRule() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.roundingRule.update',
            params: {
              id: 1,
              fields: {
                catalogGroupId: 14,
                price: 1500,
                roundType: 2,
                roundPrecision: 10,
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
          console.info(result.roundingRule)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateRoundingRule)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.roundingRule.update',
                [
                    'id' => 1,
                    'fields' => [
                        'catalogGroupId' => 14,
                        'price' => 1500,
                        'roundType' => 2,
                        'roundPrecision' => 10,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating rounding rule: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.roundingRule.update', 
        {
            id: 1,
            fields: {
                catalogGroupId: 14,
                price: 1500,
                roundType: 2,
                roundPrecision: 10,
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.roundingRule.update',
        [
            'id' => 1,
            'fields' => [
                'catalogGroupId' => 14,
                'price' => 1500,
                'roundType' => 2,
                'roundPrecision' => 10
            ]
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
        "roundingRule": {
            "catalogGroupId": 14,
            "createdBy": 1,
            "dateCreate": "2024-09-26T15:09:58+02:00",
            "dateModify": "2024-09-26T15:10:37+02:00",
            "id": 1,
            "modifiedBy": 1,
            "price": 1500,
            "roundPrecision": 10,
            "roundType": 2
        }
    },
    "time": {
        "start": 1712327086.69665,
        "finish": 1712327086.95303,
        "duration": 0.256376028060913,
        "processing": 0.0112268924713135,
        "date_start": "2024-09-26T15:09:58+02:00",
        "date_finish": "2024-09-26T15:09:58+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **roundingRule**
[`catalog_rounding_rule`](../data-types.md#catalog_rounding_rule) | Объект с информацией об обновленном правиле округления цен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description":"Required fields: catalogGroupId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Недостаточно прав для редактирования
||
|| `200900000000` | Правила округления цен с таким идентификатором не существует
||
|| `100` | Не указан параметр `id`
||
|| `100` | Не указан или пустой параметр `fields`
||
|| `0` | Не переданы обязательные поля структуры `fields`
|| 
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-rounding-rule-add.md)
- [{#T}](./catalog-rounding-rule-get.md)
- [{#T}](./catalog-rounding-rule-list.md)
- [{#T}](./catalog-rounding-rule-delete.md)
- [{#T}](./catalog-rounding-rule-get-fields.md)