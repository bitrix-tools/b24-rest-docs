# Обновить единицу измерения catalog.measure.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет единицу измерения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **Id***
[`catalog_measure.id`](../data-types.md#catalog_measure) | Идентификатор единицы измерения ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления единицы измерения ||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`integer`](../../data-types.md) | Уникальный код единицы измерения ||
|| **isDefault**
[`string`](../../data-types.md) | Используется ли текущая единица измерения в качестве единицы измерения по умолчанию для новых товаров. Возможные значения:
- `Y` — да
- `N` — нет

Только одна единица измерения из всего справочника может принимать значение `Y`
||
|| **measureTitle**
[`string`](../../data-types.md) | Название единицы измерения
||
|| **symbol**
[`string`](../../data-types.md) | Условное обозначение 
||
|| **symbolIntl**
[`string`](../../data-types.md) | Международное условное обозначение
||
|| **symbolLetterIntl**
[`string`](../../data-types.md) | Международное кодовое буквенное обозначение
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8,"fields":{"symbol":"пар","symbolLetterIntl":"nrp","symbolIntl":"pr. 2"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.measure.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8,"fields":{"symbol":"пар","symbolLetterIntl":"nrp","symbolIntl":"pr. 2"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.measure.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MeasureUpdateResult = {
      measure: {
        code: number
        id: number
        isDefault: string
        measureTitle: string
        symbol: string
        symbolIntl: string
        symbolLetterIntl: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<MeasureUpdateResult>({
        method: 'catalog.measure.update',
        params: {
          id: 8,
          fields: {
            symbol: 'пар',
            symbolLetterIntl: 'nrp',
            symbolIntl: 'pr. 2',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.measure.id, result.measure.symbol)
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
      async function updateMeasure() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.measure.update',
            params: {
              id: 8,
              fields: {
                symbol: 'пар',
                symbolLetterIntl: 'nrp',
                symbolIntl: 'pr. 2',
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
          console.info(result.measure.id, result.measure.symbol)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateMeasure)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.measure.update',
                [
                    'id' => 8,
                    'fields' => [
                        'symbol'           => 'пар',
                        'symbolLetterIntl' => 'nrp',
                        'symbolIntl'       => 'pr. 2',
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
        echo 'Error updating measure: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.measure.update', 
        {
            id: 8,
            fields: {
                symbol: 'пар',
                symbolLetterIntl: 'nrp',
                symbolIntl: 'pr. 2'
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
        'catalog.measure.update',
        [
            'id' => 8,
            'fields' => [
                'symbol' => 'пар',
                'symbolLetterIntl' => 'nrp',
                'symbolIntl' => 'pr. 2'
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
        "measure": {
            "code": 715,
            "id": 8,
            "isDefault": "N",
            "measureTitle": "Пара",
            "symbol": "пар",
            "symbolIntl": "pr. 2",
            "symbolLetterIntl": "nrp"
        }
    },
    "time": {
        "start": 1712327086.69665,
        "finish": 1712327086.95303,
        "duration": 0.256376028060913,
        "processing": 0.0112268924713135,
        "date_start": "2024-04-05T16:24:46+02:00",
        "date_finish": "2024-04-05T16:24:46+02:00",
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
|| **measure**
[`catalog_measure`](../data-types.md#catalog_measure) | Объект с информацией об обновленной единице измерения ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description":"Required fields: code"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300020` | Нет доступа к редактированию
||
|| `200600000000` | Единица измерения с заданным параметром `code` уже существует
||
|| `200600000010` | Единица измерения, у которой параметр `isDefault` равен `Y`, уже существует
||
|| `200600000020` | Единицы измерения с таким идентификатором не существует
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

- [{#T}](./catalog-measure-add.md)
- [{#T}](./catalog-measure-get.md)
- [{#T}](./catalog-measure-list.md)
- [{#T}](./catalog-measure-delete.md)
- [{#T}](./catalog-measure-get-fields.md)