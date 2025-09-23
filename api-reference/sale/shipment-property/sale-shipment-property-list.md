# Получить список свойств отгрузки sale.shipmentproperty.list

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipmentproperty.list
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","active","code","defaultValue","description","inputFieldLocation","isAddress","isAddressFrom","isAddressTo","isEmail","isFiltered","isLocation","isLocation4tax","isPayer","isPhone","isProfileName","isZip","multiple","name","personTypeId","propsGroupId","required","settings","sort","type","userProps","util","xmlId"],"filter":{"@type":"STRING","%code":"EMAIL"},"order":{"id":"desc"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentproperty.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.shipmentproperty.list',
        {
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
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('sale.shipmentproperty.list', {
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
      }, 'id');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('sale.shipmentproperty.list', {
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
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
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