# Добавить единицу измерения catalog.measure.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет новую единицу измерения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания новой единицы измерения ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code***
[`integer`](../../data-types.md) | Уникальный код единицы измерения ||
|| **isDefault**
[`string`](../../data-types.md) | Используется ли текущая единица измерения в качестве единицы измерения по умолчанию для новых товаров. Возможные значения:
- `Y` — да
- `N` — нет

Если значение поля не указано, то автоматически устанавливается значение `N`.

Только одна единица измерения из всего справочника может принимать значение `Y`
||
|| **measureTitle***
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
    -d '{"fields":{"code":715,"measureTitle":"Пара","symbol":"пар","symbolLetterIntl":"NPR","symbolIntl":"pr; 2","isDefault":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.measure.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"code":715,"measureTitle":"Пара","symbol":"пар","symbolLetterIntl":"NPR","symbolIntl":"pr; 2","isDefault":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.measure.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MeasureAddResult = {
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
      const response = await $b24.actions.v2.call.make<MeasureAddResult>({
        method: 'catalog.measure.add',
        params: {
          fields: {
            code: 715,
            measureTitle: 'Pair',
            symbol: 'pr',
            symbolLetterIntl: 'NPR',
            symbolIntl: 'pr; 2',
            isDefault: 'N',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added measure:', result.measure.id, result.measure.measureTitle)
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
      async function addMeasure() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.measure.add',
            params: {
              fields: {
                code: 715,
                measureTitle: 'Pair',
                symbol: 'pr',
                symbolLetterIntl: 'NPR',
                symbolIntl: 'pr; 2',
                isDefault: 'N',
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
          console.info('Added measure:', result.measure.id, result.measure.measureTitle)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addMeasure)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.measure.add',
                [
                    'fields' => [
                        'code'            => 715,
                        'measureTitle'    => "Пара",
                        'symbol'          => 'пар',
                        'symbolLetterIntl' => 'NPR',
                        'symbolIntl'      => 'pr; 2',
                        'isDefault'       => 'N',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding measure: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.measure.add', 
        {
            fields: {
                code: 715,
                measureTitle: "Пара",
                symbol: 'пар',
                symbolLetterIntl: 'NPR',
                symbolIntl: 'pr; 2',
                isDefault: 'N'
            }
        },
        function(result) {
            if (result.error())
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
        'catalog.measure.add',
        [
            'fields' => [
                'code' => 715,
                'measureTitle' => "Пара",
                'symbol' => 'пар',
                'symbolLetterIntl' => 'NPR',
                'symbolIntl' => 'pr; 2',
                'isDefault' => 'N'
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
            "id": 6,
            "isDefault": "N",
            "measureTitle": "Пара",
            "symbol": "пар",
            "symbolIntl": "pr; 2",
            "symbolLetterIntl": "NPR"
        }
    },
    "time": {
        "start": 1716552521.40908,
        "finish": 1716552521.69852,
        "duration": 0.289434909820557,
        "processing": 0.011207103729248,
        "date_start": "2024-05-24T14:08:41+02:00",
        "date_finish": "2024-05-24T14:08:41+02:00",
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
[`catalog_measure`](../data-types.md#catalog_measure) | Объект с информацией о созданной единице измерения ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300020,
    "error_description": "Access Denied"
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
|| `100` | Не передан обязательный параметр `fields`
||
|| `0` | Не установлены обязательные поля
||
|| `0` | Другие ошибки (например, фатальные ошибки)
|| 
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-measure-update.md)
- [{#T}](./catalog-measure-get.md)
- [{#T}](./catalog-measure-list.md)
- [{#T}](./catalog-measure-delete.md)
- [{#T}](./catalog-measure-get-fields.md)