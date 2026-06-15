# Получить список свойств отгрузки sale.shipmentproperty.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод получает список свойств отгрузки. 

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив содержащий список полей, которые необходимо выбрать (смотрите поля объекта [sale_shipment_property](../data-types.md)).
 
Если не передан или передан пустой массив, то будут выбраны все доступные поля свойств
 ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных свойств отгрузки в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [sale_shipment_property](../data-types.md).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `=` — равно (работает и с массивами)
- `%` — LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `>` — больше
- `<` — меньше
- `!=` — не равно
- `!%` — NOT LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `>=` — больше либо равно
- `<=` — меньше либо равно
- `=%` — LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры: 
    - `"мол%"` — ищем значения начинающиеся с «мол»
    - `"%мол"` — ищем значения заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (смотрите описание выше)
- `!=%` — NOT LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения не начинающиеся с «мол»
    - `"%мол"` — ищем значения не заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (смотрите описание выше)
||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки выбранных свойств отгрузки в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.
 
Возможные значения для `field` соответствуют полям объекта [sale_shipment_property](../data-types.md).
 
Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.
 
Размер страницы результатов всегда статичный: 50 записей.
 
Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.
 
Формула расчета значения параметра `start`:
 
`start = (N-1) * 50`, где `N` — номер нужной страницы
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","active","code","defaultValue","description","inputFieldLocation","isAddress","isAddressFrom","isAddressTo","isEmail","isFiltered","isLocation","isLocation4tax","isPayer","isPhone","isProfileName","isZip","multiple","name","personTypeId","propsGroupId","required","settings","sort","type","userProps","util","xmlId"],"filter":{"@type":"STRING","%code":"EMAIL"},"order":{"id":"desc"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentproperty.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","active","code","defaultValue","description","inputFieldLocation","isAddress","isAddressFrom","isAddressTo","isEmail","isFiltered","isLocation","isLocation4tax","isPayer","isPhone","isProfileName","isZip","multiple","name","personTypeId","propsGroupId","required","settings","sort","type","userProps","util","xmlId"],"filter":{"@type":"STRING","%code":"EMAIL"},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentproperty.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ShipmentPropertyListResult = {
      properties: {
        id: number
        active: string
        code: string
        defaultValue: string
        description: string
        inputFieldLocation: string
        isAddress: string
        isAddressFrom: string
        isAddressTo: string
        isEmail: string
        isFiltered: string
        isLocation: string
        isPayer: string
        isPhone: string
        isProfileName: string
        isZip: string
        multiple: string
        name: string
        personTypeId: number
        propsGroupId: number
        required: string
        settings: Record<string, unknown> | unknown[]
        sort: number
        type: string
        userProps: string
        util: string
        xmlId: string
      }[]
    }

    try {
      // sale.shipmentproperty.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ShipmentPropertyListResult>({
        method: 'sale.shipmentproperty.list',
        params: {
          select: [
            'id',
            'active',
            'code',
            'defaultValue',
            'description',
            'inputFieldLocation',
            'isAddress',
            'isAddressFrom',
            'isAddressTo',
            'isEmail',
            'isFiltered',
            'isLocation',
            'isLocation4tax',
            'isPayer',
            'isPhone',
            'isProfileName',
            'isZip',
            'multiple',
            'name',
            'personTypeId',
            'propsGroupId',
            'required',
            'settings',
            'sort',
            'type',
            'userProps',
            'util',
            'xmlId',
          ],
          filter: {
            '@type': 'STRING',
            '%code': 'EMAIL',
          },
          order: {
            id: 'desc',
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Shipment properties on this page:', result.properties.length, result.properties)
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
      async function fetchShipmentPropertyList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.shipmentproperty.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipmentproperty.list',
            params: {
              select: [
                'id',
                'active',
                'code',
                'defaultValue',
                'description',
                'inputFieldLocation',
                'isAddress',
                'isAddressFrom',
                'isAddressTo',
                'isEmail',
                'isFiltered',
                'isLocation',
                'isLocation4tax',
                'isPayer',
                'isPhone',
                'isProfileName',
                'isZip',
                'multiple',
                'name',
                'personTypeId',
                'propsGroupId',
                'required',
                'settings',
                'sort',
                'type',
                'userProps',
                'util',
                'xmlId',
              ],
              filter: {
                '@type': 'STRING',
                '%code': 'EMAIL',
              },
              order: {
                id: 'desc',
              },
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
          console.info('Shipment properties on this page:', result.properties.length, result.properties)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchShipmentPropertyList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.shipmentproperty.list',
                [
                    'select' => [
                        'id',
                        'active',
                        'code',
                        'defaultValue',
                        'description',
                        'inputFieldLocation',
                        'isAddress',
                        'isAddressFrom',
                        'isAddressTo',
                        'isEmail',
                        'isFiltered',
                        'isLocation',
                        'isLocation4tax',
                        'isPayer',
                        'isPhone',
                        'isProfileName',
                        'isZip',
                        'multiple',
                        'name',
                        'personTypeId',
                        'propsGroupId',
                        'required',
                        'settings',
                        'sort',
                        'type',
                        'userProps',
                        'util',
                        'xmlId',
                    ],
                    'filter' => [
                        '@type' => 'STRING',
                        '%code' => 'EMAIL',
                    ],
                    'order' => [
                        'id' => 'desc',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching shipment properties: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.shipmentproperty.list", {
            "select": [
                "id",
                "active",
                "code",
                "defaultValue",
                "description",
                "inputFieldLocation",
                "isAddress",
                "isAddressFrom",
                "isAddressTo",
                "isEmail",
                "isFiltered",
                "isLocation",
                "isLocation4tax",
                "isPayer",
                "isPhone",
                "isProfileName",
                "isZip",
                "multiple",
                "name",
                "personTypeId",
                "propsGroupId",
                "required",
                "settings",
                "sort",
                "type",
                "userProps",
                "util",
                "xmlId",
            ],
            "filter": {
                "@type": "STRING",
                "%code": "EMAIL",
            },
            "order": {
                "id": "desc",
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.shipmentproperty.list',
        [
            'select' => [
                "id",
                "active",
                "code",
                "defaultValue",
                "description",
                "inputFieldLocation",
                "isAddress",
                "isAddressFrom",
                "isAddressTo",
                "isEmail",
                "isFiltered",
                "isLocation",
                "isLocation4tax",
                "isPayer",
                "isPhone",
                "isProfileName",
                "isZip",
                "multiple",
                "name",
                "personTypeId",
                "propsGroupId",
                "required",
                "settings",
                "sort",
                "type",
                "userProps",
                "util",
                "xmlId",
            ],
            'filter' => [
                "@type" => "STRING",
                "%code" => "EMAIL",
            ],
            'order' => [
                "id" => "desc",
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

```json
{
   "result":{
      "properties":[
         {
            "active":"Y",
            "code":"EMAIL",
            "defaultValue":"",
            "description":"",
            "id":47,
            "inputFieldLocation":"0",
            "isAddress":"N",
            "isAddressFrom":"N",
            "isAddressTo":"N",
            "isEmail":"Y",
            "isFiltered":"Y",
            "isLocation":"N",
            "isPayer":"N",
            "isPhone":"N",
            "isProfileName":"N",
            "isZip":"N",
            "multiple":"N",
            "name":"E-Mail",
            "personTypeId":3,
            "propsGroupId":5,
            "required":"Y",
            "settings":[
               
            ],
            "sort":300,
            "type":"STRING",
            "userProps":"Y",
            "util":"N",
            "xmlId":""
         },
         {
            "active":"Y",
            "code":"EMAIL",
            "defaultValue":"",
            "description":"",
            "id":33,
            "inputFieldLocation":"0",
            "isAddress":"N",
            "isAddressFrom":"N",
            "isAddressTo":"N",
            "isEmail":"Y",
            "isFiltered":"N",
            "isLocation":"N",
            "isPayer":"N",
            "isPhone":"N",
            "isProfileName":"N",
            "isZip":"N",
            "multiple":"N",
            "name":"E-Mail",
            "personTypeId":4,
            "propsGroupId":8,
            "required":"Y",
            "settings":{
               "size":40
            },
            "sort":250,
            "type":"STRING",
            "userProps":"Y",
            "util":"N",
            "xmlId":""
         },
         {
            "active":"Y",
            "code":"EMAIL",
            "defaultValue":"",
            "description":"",
            "id":21,
            "inputFieldLocation":"0",
            "isAddress":"N",
            "isAddressFrom":"N",
            "isAddressTo":"N",
            "isEmail":"Y",
            "isFiltered":"Y",
            "isLocation":"N",
            "isPayer":"N",
            "isPhone":"N",
            "isProfileName":"N",
            "isZip":"N",
            "multiple":"N",
            "name":"E-Mail",
            "personTypeId":3,
            "propsGroupId":5,
            "required":"Y",
            "settings":{
               "size":40
            },
            "sort":110,
            "type":"STRING",
            "userProps":"Y",
            "util":"N",
            "xmlId":""
         }
      ]
   },
   "total":3,
   "time":{
      "start":1712818881.719586,
      "finish":1712818881.960037,
      "duration":0.24045109748840332,
      "processing":0.06902408599853516,
      "date_start":"2024-04-11T10:01:21+03:00",
      "date_finish":"2024-04-11T10:01:21+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **properties**
[`sale_shipment_property[]`](../data-types.md) | Массив объектов с информацией о выбранных свойствах ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"error"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300010` | Недостаточно прав для чтения свойств отгрузки ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-property-add.md)
- [{#T}](./sale-shipment-property-update.md)
- [{#T}](./sale-shipment-property-get.md)
- [{#T}](./sale-shipment-property-delete.md)
- [{#T}](./sale-shipment-property-get-fields-by-type.md)