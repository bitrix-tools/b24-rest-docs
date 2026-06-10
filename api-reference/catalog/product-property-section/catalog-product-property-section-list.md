# Получить список секционных настроек свойств catalog.productPropertySection.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.productPropertySection.list` возвращает список секционных настроек свойств товаров и вариаций по фильтру.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать.

Доступные поля:

- `displayExpanded` — отображается ли свойство развернутым в фильтре
- `displayType` — вид свойства в умном фильтре
- `filterHint` — подсказка в умном фильтре для посетителей
- `propertyId` — идентификатор свойства товара или вариации
- `smartFilter` — отображается ли свойство в умном фильтре

По умолчанию возвращаются все доступные поля ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных настроек в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям, доступным в параметре `select`.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Если `propertyId` не передан, метод выбирает секционные настройки всех свойств торговых каталогов. Если передан `propertyId`, который не существует или не относится к торговому каталогу, метод вернет пустой список ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных настроек в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям, доступным в параметре `select`.

Возможные значения для `order`:
- `ASC` — в порядке возрастания
- `DESC` — в порядке убывания

Если параметр не передан, применяется сортировка `propertyId ASC` ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — `100` и так далее.

Формула расчета значения параметра `start`: `start = (N - 1) * 50`, где `N` — номер нужной страницы.

Если передать значение `-1`, в ответе не будет поля `total` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["propertyId","smartFilter","displayType","displayExpanded","filterHint"],"filter":{"propertyId":901},"order":{"propertyId":"ASC"}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.productPropertySection.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"select":["propertyId","smartFilter","displayType","displayExpanded","filterHint"],"filter":{"propertyId":901},"order":{"propertyId":"ASC"},"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/catalog.productPropertySection.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ProductPropertySectionListResult = {
      productPropertySections: {
        displayExpanded: string
        displayType: string
        filterHint: string
        propertyId: number
        smartFilter: string
      }[]
    }

    try {
      // catalog.productPropertySection.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ProductPropertySectionListResult>({
        method: 'catalog.productPropertySection.list',
        params: {
          select: ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
          filter: { propertyId: 901 },
          order: { propertyId: 'ASC' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.productPropertySections.length, result.productPropertySections)
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
      async function listProductPropertySections() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // catalog.productPropertySection.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'catalog.productPropertySection.list',
            params: {
              select: ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
              filter: { propertyId: 901 },
              order: { propertyId: 'ASC' },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.productPropertySections.length, result.productPropertySections)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listProductPropertySections)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.productPropertySection.list',
                [
                    'select' => ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
                    'filter' => [
                        'propertyId' => 901,
                    ],
                    'order' => ['propertyId' => 'ASC'],
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.productPropertySection.list',
        {
            select: ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
            filter: {
                propertyId: 901
            },
            order: { propertyId: 'ASC' }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.productPropertySection.list',
        [
            'select' => ['propertyId', 'smartFilter', 'displayType', 'displayExpanded', 'filterHint'],
            'filter' => ['propertyId' => 901],
            'order' => ['propertyId' => 'ASC'],
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "productPropertySections": [
        {
            "displayExpanded": "N",
            "displayType": "F",
            "filterHint": "Подсказка для фильтра",
            "propertyId": 901,
            "smartFilter": "Y"
        }
        ]
    },
    "total": 1,
    "time": {
        "start": 1774266816,
        "finish": 1774266816.883621,
        "duration": 0.8836209774017334,
        "processing": 0,
        "date_start": "2026-03-23T14:53:36+03:00",
        "date_finish": "2026-03-23T14:53:36+03:00",
        "operating_reset_at": 1774267416,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа ||
|| **productPropertySections**
[`catalog_product_property_section[]`](../data-types.md#catalog_product_property_section) | Массив объектов секционных настроек свойства ||
|| **next**
[`integer`](../../data-types.md) | Смещение для следующей страницы. Поле возвращается, если есть еще записи ||
|| **total**
[`integer`](../../data-types.md) | Общее число записей. Поле не возвращается, если запрос выполнен со `start = -1` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access Denied | Недостаточно прав для просмотра каталога ||
|| `100` | Invalid value {wrong_type} to match with parameter {filter}. Should be value of type array. | Неверный тип данных у значения параметра `filter` ||
|| `100` | Invalid value {wrong_type} to match with parameter {select}. Should be value of type array. | Неверный тип данных у значения параметра `select` ||
|| `100` | Invalid value {wrong_type} to match with parameter {order}. Should be value of type array. | Неверный тип данных у значения параметра `order` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-property-section-set.md)
- [{#T}](./catalog-product-property-section-get.md)
