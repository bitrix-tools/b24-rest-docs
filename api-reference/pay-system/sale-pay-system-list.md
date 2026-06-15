# Получить список платежных систем sale.paysystem.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`pay_system `](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод возвращает список платежных систем.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **SELECT**
[`array`](../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать (смотрите поля объекта [`sale_paysystem`](../sale/data-types.md)).
 
Если массив не передан или же передан пустой массив, то будут выбраны все доступные поля платежных систем
||
|| **FILTER**
[`object`](../data-types.md) | Объект для фильтрации выбранных платежных систем в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_paysystem](../sale/data-types.md). 

Ключу можно задать дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передаётся массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, не начинающиеся с «мол»
    - `"%мол"` — ищет значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно
||
|| **ORDER**
[`object`](../data-types.md) | Объект для сортировки выбранных платежных систем в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям объекта [sale_paysystem](../sale/data-types.md).

Возможные значения для `order`:
- `ASC` — в порядке возрастания
- `DESC` — в порядке убывания
||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"SELECT":["ID","PERSON_TYPE_ID","NAME","PSA_NAME","SORT","DESCRIPTION","ACTION_FILE","RESULT_FILE","NEW_WINDOW","TARIF","PS_MODE","HAVE_PAYMENT","HAVE_ACTION","HAVE_RESULT","HAVE_PREPAY","HAVE_PRICE","HAVE_RESULT_RECEIVE","ENCODING","ACTIVE","ALLOW_EDIT_PAYMENT","IS_CASH","AUTO_CHANGE_1C","CAN_PRINT_CHECK","ENTITY_REGISTRY_TYPE","XML_ID"],"FILTER":{"@ID":[117,118]},"ORDER":{"SORT":"ASC","ID":"DESC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.paysystem.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"SELECT":["ID","PERSON_TYPE_ID","NAME","PSA_NAME","SORT","DESCRIPTION","ACTION_FILE","RESULT_FILE","NEW_WINDOW","TARIF","PS_MODE","HAVE_PAYMENT","HAVE_ACTION","HAVE_RESULT","HAVE_PREPAY","HAVE_PRICE","HAVE_RESULT_RECEIVE","ENCODING","ACTIVE","ALLOW_EDIT_PAYMENT","IS_CASH","AUTO_CHANGE_1C","CAN_PRINT_CHECK","ENTITY_REGISTRY_TYPE","XML_ID"],"FILTER":{"@ID":[117,118]},"ORDER":{"SORT":"ASC","ID":"DESC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each PaySystemItem returned in result[]
    type PaySystemItem = {
      ID: number
      PERSON_TYPE_ID: number
      NAME: string
      PSA_NAME: string
      SORT: number
      DESCRIPTION: string
      ACTION_FILE: string
      RESULT_FILE: string | null
      NEW_WINDOW: string
      TARIFF: string | null
      PS_MODE: string | null
      HAVE_PAYMENT: string
      HAVE_ACTION: string
      HAVE_RESULT: string
      HAVE_PREPAY: string
      HAVE_PRICE: string
      HAVE_RESULT_RECEIVE: string
      ENCODING: string | null
      ACTIVE: string
      ALLOW_EDIT_PAYMENT: string
      IS_CASH: string
      AUTO_CHANGE_1C: string
      CAN_PRINT_CHECK: string
      ENTITY_REGISTRY_TYPE: string
      XML_ID: string
    }

    try {
      // sale.paysystem.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<PaySystemItem[]>({
        method: 'sale.paysystem.list',
        params: {
          SELECT: [
            'ID',
            'PERSON_TYPE_ID',
            'NAME',
            'PSA_NAME',
            'SORT',
            'DESCRIPTION',
            'ACTION_FILE',
            'RESULT_FILE',
            'NEW_WINDOW',
            'TARIF',
            'PS_MODE',
            'HAVE_PAYMENT',
            'HAVE_ACTION',
            'HAVE_RESULT',
            'HAVE_PREPAY',
            'HAVE_PRICE',
            'HAVE_RESULT_RECEIVE',
            'ENCODING',
            'ACTIVE',
            'ALLOW_EDIT_PAYMENT',
            'IS_CASH',
            'AUTO_CHANGE_1C',
            'CAN_PRINT_CHECK',
            'ENTITY_REGISTRY_TYPE',
            'XML_ID',
          ],
          FILTER: {
            '@ID': [117, 118],
          },
          ORDER: {
            SORT: 'ASC',
            ID: 'DESC',
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
        console.info('Pay systems fetched:', result.length, result[0]?.NAME)
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
      async function fetchPaySystemList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sale.paysystem.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sale.paysystem.list',
            params: {
              SELECT: [
                'ID',
                'PERSON_TYPE_ID',
                'NAME',
                'PSA_NAME',
                'SORT',
                'DESCRIPTION',
                'ACTION_FILE',
                'RESULT_FILE',
                'NEW_WINDOW',
                'TARIF',
                'PS_MODE',
                'HAVE_PAYMENT',
                'HAVE_ACTION',
                'HAVE_RESULT',
                'HAVE_PREPAY',
                'HAVE_PRICE',
                'HAVE_RESULT_RECEIVE',
                'ENCODING',
                'ACTIVE',
                'ALLOW_EDIT_PAYMENT',
                'IS_CASH',
                'AUTO_CHANGE_1C',
                'CAN_PRINT_CHECK',
                'ENTITY_REGISTRY_TYPE',
                'XML_ID',
              ],
              FILTER: {
                '@ID': [117, 118],
              },
              ORDER: {
                SORT: 'ASC',
                ID: 'DESC',
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
          console.info('Pay systems fetched:', result.length, result[0]?.NAME)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchPaySystemList)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.paysystem.list',
                [
                    'SELECT' => [
                        "ID",
                        "PERSON_TYPE_ID",
                        "NAME",
                        "PSA_NAME",
                        "SORT",
                        "DESCRIPTION",
                        "ACTION_FILE",
                        "RESULT_FILE",
                        "NEW_WINDOW",
                        "TARIF",
                        "PS_MODE",
                        "HAVE_PAYMENT",
                        "HAVE_ACTION",
                        "HAVE_RESULT",
                        "HAVE_PREPAY",
                        "HAVE_PRICE",
                        "HAVE_RESULT_RECEIVE",
                        "ENCODING",
                        "ACTIVE",
                        "ALLOW_EDIT_PAYMENT",
                        "IS_CASH",
                        "AUTO_CHANGE_1C",
                        "CAN_PRINT_CHECK",
                        "ENTITY_REGISTRY_TYPE",
                        "XML_ID",
                    ],
                    'FILTER' => [
                        "@ID" => [117, 118],
                    ],
                    'ORDER' => [
                        'SORT' => "ASC",
                        'ID'   => "DESC",
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching paysystem list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.paysystem.list', {
            SELECT: [
                "ID",
                "PERSON_TYPE_ID",
                "NAME",
                "PSA_NAME",
                "SORT",
                "DESCRIPTION",
                "ACTION_FILE",
                "RESULT_FILE",
                "NEW_WINDOW",
                "TARIF",
                "PS_MODE",
                "HAVE_PAYMENT",
                "HAVE_ACTION",
                "HAVE_RESULT",
                "HAVE_PREPAY",
                "HAVE_PRICE",
                "HAVE_RESULT_RECEIVE",
                "ENCODING",
                "ACTIVE",
                "ALLOW_EDIT_PAYMENT",
                "IS_CASH",
                "AUTO_CHANGE_1C",
                "CAN_PRINT_CHECK",
                "ENTITY_REGISTRY_TYPE",
                "XML_ID",
            ],
            FILTER: {
                "@ID": [117, 118],
            },
            ORDER: {
                SORT: "ASC",
                ID: "DESC",
            },
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
        'sale.paysystem.list',
        [
            'SELECT' => [
                "ID",
                "PERSON_TYPE_ID",
                "NAME",
                "PSA_NAME",
                "SORT",
                "DESCRIPTION",
                "ACTION_FILE",
                "RESULT_FILE",
                "NEW_WINDOW",
                "TARIF",
                "PS_MODE",
                "HAVE_PAYMENT",
                "HAVE_ACTION",
                "HAVE_RESULT",
                "HAVE_PREPAY",
                "HAVE_PRICE",
                "HAVE_RESULT_RECEIVE",
                "ENCODING",
                "ACTIVE",
                "ALLOW_EDIT_PAYMENT",
                "IS_CASH",
                "AUTO_CHANGE_1C",
                "CAN_PRINT_CHECK",
                "ENTITY_REGISTRY_TYPE",
                "XML_ID",
            ],
            'FILTER' => [
                "@ID" => [117, 118],
            ],
            'ORDER' => [
                "SORT" => "ASC",
                "ID" => "DESC",
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
    "result":[
        {
            "NAME":"Новая оплата картой",
            "PSA_NAME":"Новая оплата картой",
            "DESCRIPTION":"Легко оплачивайте покупки картой.",
            "ACTION_FILE":"resthandlerform",
            "RESULT_FILE":null,
            "NEW_WINDOW":"N",
            "PS_MODE":null,
            "HAVE_PAYMENT":"N",
            "HAVE_ACTION":"N",
            "HAVE_RESULT":"N",
            "HAVE_PREPAY":"N",
            "HAVE_PRICE":"N",
            "HAVE_RESULT_RECEIVE":"Y",
            "ENCODING":null,
            "ACTIVE":"Y",
            "ALLOW_EDIT_PAYMENT":"Y",
            "IS_CASH":"N",
            "AUTO_CHANGE_1C":"N",
            "CAN_PRINT_CHECK":"N",
            "ENTITY_REGISTRY_TYPE":"ORDER",
            "XML_ID":"my_ps_id",
            "ID":118,
            "PERSON_TYPE_ID":3,
            "SORT":100,
            "TARIFF":null
        },
        {
            "NAME":"Оплата картой",
            "PSA_NAME":"Оплата картой",
            "DESCRIPTION":"Легко оплачивайте покупки картой.",
            "ACTION_FILE":"resthandlerform",
            "RESULT_FILE":null,
            "NEW_WINDOW":"Y",
            "PS_MODE":"",
            "HAVE_PAYMENT":"N",
            "HAVE_ACTION":"N",
            "HAVE_RESULT":"N",
            "HAVE_PREPAY":"N",
            "HAVE_PRICE":"N",
            "HAVE_RESULT_RECEIVE":"Y",
            "ENCODING":"windows-1251",
            "ACTIVE":"Y",
            "ALLOW_EDIT_PAYMENT":"Y",
            "IS_CASH":"N",
            "AUTO_CHANGE_1C":"N",
            "CAN_PRINT_CHECK":"N",
            "ENTITY_REGISTRY_TYPE":"ORDER",
            "XML_ID":"my_ps_id",
            "ID":117,
            "PERSON_TYPE_ID":3,
            "SORT":100,
            "TARIFF":null
        }
    ],
    "time":{
        "start":1714993577.419989,
        "finish":1714993577.621777,
        "duration":0.20178794860839844,
        "processing":0.027898073196411133,
        "date_start":"2024-05-06T14:06:17+03:00",
        "date_finish":"2024-05-06T14:06:17+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_paysystem[]`](../sale/data-types.md) | Массив объектов с информацией о выбранных платежных системах ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error":"ACCESS_DENIED",
    "error_description":"Access denied!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ERROR_CHECK_FAILURE` | Ошибка валидации входящих параметров (детали смотрите в описании ошибки) | 400 ||
|| `ACCESS_DENIED` | Недостаточно прав для получения списка платежных систем | 403 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-pay-system-handler-add.md)
- [{#T}](./sale-pay-system-handler-update.md)
- [{#T}](./sale-pay-system-handler-list.md)
- [{#T}](./sale-pay-system-handler-delete.md)
- [{#T}](./sale-pay-system-add.md)
- [{#T}](./sale-pay-system-update.md)
- [{#T}](./sale-pay-system-settings-get.md)
- [{#T}](./sale-pay-system-settings-update.md)
- [{#T}](./sale-pay-system-delete.md)
- [{#T}](./sale-pay-system-pay-payment.md)
- [{#T}](./sale-pay-system-settings-payment-get.md)
