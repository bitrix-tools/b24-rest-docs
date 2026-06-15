# Добавить платежную систему sale.paysystem.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`pay_system `](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод добавляет платежную систему.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../data-types.md) | Название платежной системы ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание платежной системы ||
|| **PERSON_TYPE_ID***
[`sale_person_type.id`](../sale/data-types.md) | Идентификатор типа плательщика ||
|| **BX_REST_HANDLER***
[`sale_paysystem_handler.CODE`](../sale/data-types.md#sale_paysystem_handler) | Код REST-обработчика, указанный при добавлении обработчика методом [sale.paysystem.handler.add](./sale-pay-system-handler-add.md) ||
|| **ACTIVE**
[`string`](../data-types.md) | Индикатор активности платежной системы. Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию `N` ||
|| **SETTINGS**
[`object`](../data-types.md) | Список значений настроек обработчика в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где `field` — название настройки, а `value` — объект, содержащий ключи [TYPE](#vozmozhnye-znacheniya-klyucha-type) и [VALUE](#vozmozhnye-znacheniya-klyucha-value) (описание смотрите ниже). 

Структура настроек задается при добавлении обработчика платежной системы в методе [sale.paysystem.handler.add](./sale-pay-system-handler-add.md) в ключе `CODES` параметра `SETTINGS`  ||
|| **ENTITY_REGISTRY_TYPE***
[`string`](../data-types.md) | Привязка платежной системы:
- `ORDER` — значение для заказов магазина, сделок, смарт-процессов
- `CRM_INVOICE` — значение для счетов CRM
- `CRM_QUOTE` — значение для коммерческих предложений CRM
||
|| **LOGOTYPE**
[`string`](../data-types.md) | Логотип платежной системы (картинка в формате Base64) ||
|| **NEW_WINDOW**
[`string`](../data-types.md) | Флаг, отвечающий за настройку «Открывать в новом окне». Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию `N` ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний идентификатор платежной системы. Может быть использован как дополнительный параметр для фильтрации в [sale.paysystem.list](./sale-pay-system-list.md) ||
|#

### Возможные значения ключа TYPE

#|
|| **Название** | **Описание** ||
|| **ORDER** | Параметры ||
|| **PROPERTY** | Свойства счета ||
|| **PAYMENT** | Оплата ||
|| **USER** | Пользователь ||
|| **VALUE** | Произвольное значение типа строка ||
|| **Y\N** | Флажок ||
|#

### Возможные значения ключа VALUE

#|
|| **Название** | **Описание** ||
|| **ORDER** | 
- `ID` — идентификатор
- `ACCOUNT_NUMBER` — номер заказа
- `ORDER_TOPIC` — тема
- `DATE_INSERT` — дата заказа 
- `DATE_INSERT_DATE` — дата заказа без времени
- `DATE_BILL` — дата и время выставления
- `DATE_BILL_DATE` — дата выставления
- `DATE_PAY_BEFORE` — срок оплаты
- `SHOULD_PAY` — сумма счета
- `CURRENCY` — валюта
- `PRICE` — стоимость заказа
- `PRICE_DELIVERY` — стоимость доставки
- `DISCOUNT_VALUE` — величина скидки
- `USER_ID` — код покупателя
- `PAY_SYSTEM_ID` — код платежной системы
- `DELIVERY_ID` — код службы доставки
- `TAX_VALUE` — налог
- `USER_DESCRIPTION` — комментарий
||
|| **PAYMENT** | 
- `ID` — идентификатор
- `ACCOUNT_NUMBER` — номер оплаты
- `DATE_BILL` — дата и время выставления
- `DATE_BILL_DATE` — дата выставления без времени
- `SUM` — сумма счета
- `CURRENCY` — валюта
- `PAID` — оплачено
- `DATE_PAID` — дата оплаты
- `PAY_SYSTEM_ID` — код платежной системы
- `PAY_VOUCHER_NUM` — номер ваучера
- `PAY_VOUCHER_DATE` — дата ваучера
- `DATE_PAY_BEFORE` — оплатить до
- `XML_ID` — индентификатор XML
- `PAY_SYSTEM_NAME` — название платежной системы
- `COMPANY_ID` — код компании
- `PAY_RETURN_NUM` — номер возврата
- `PAY_RETURN_DATE` — дата возврата
- `PAY_RETURN_COMMENT` — коментарий возврата
||
|| **USER** | 
- `ID` — код покупателя,
- `LOGIN` — логин
- `NAME` — имя
- `SECOND_NAME` — отчество
- `LAST_NAME` — фамилия
- `EMAIL` — EMail
- `PERSONAL_PROFESSION` — профессия
- `PERSONAL_WWW` — персональный веб-сайт
- `PERSONAL_ICQ` — номер ICQ
- `PERSONAL_GENDER` — пол
- `PERSONAL_FAX` — номер факса
- `PERSONAL_MOBILE` — номер телефона
- `PERSONAL_STREET` — адрес
- `PERSONAL_MAILBOX` — почтовый ящик
- `PERSONAL_CITY` — город
- `PERSONAL_STATE` — штат
- `PERSONAL_ZIP` — индекс
- `PERSONAL_COUNTRY` — страна
- `WORK_COMPANY` — компания
- `WORK_DEPARTMENT` — отдел
- `WORK_POSITION` — должность
- `WORK_WWW` — сайт компании
- `WORK_PHONE` — рабочий телефон
- `WORK_FAX` — рабочий факс
- `WORK_STREET` — адрес компании
- `WORK_MAILBOX` — рабочий почтовый ящик
- `WORK_CITY` — город компании
- `WORK_STATE` — штат компании
- `WORK_ZIP` — индекс компании
- `WORK_COUNTRY` — страна компании
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
    -d '{"NAME":"Оплата картой","DESCRIPTION":"Легко оплачивайте покупки картой.","XML_ID":"my_ps_id","PERSON_TYPE_ID":1,"BX_REST_HANDLER":"resthandlercode","ACTIVE":"Y","ENTITY_REGISTRY_TYPE":"ORDER","LOGOTYPE":"/* base64 image */","NEW_WINDOW":"N","SETTINGS":{"REST_SERVICE_ID":{"TYPE":"VALUE","VALUE":"SERVICE ID VALUE"},"REST_SERVICE_KEY":{"TYPE":"VALUE","VALUE":"KEY ID VALUE"},"PAYMENT_ID":{"TYPE":"PAYMENT","VALUE":"ACCOUNT_NUMBER"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.paysystem.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Оплата картой","DESCRIPTION":"Легко оплачивайте покупки картой.","XML_ID":"my_ps_id","PERSON_TYPE_ID":1,"BX_REST_HANDLER":"resthandlercode","ACTIVE":"Y","ENTITY_REGISTRY_TYPE":"ORDER","LOGOTYPE":"/* base64 image */","NEW_WINDOW":"N","SETTINGS":{"REST_SERVICE_ID":{"TYPE":"VALUE","VALUE":"SERVICE ID VALUE"},"REST_SERVICE_KEY":{"TYPE":"VALUE","VALUE":"KEY ID VALUE"},"PAYMENT_ID":{"TYPE":"PAYMENT","VALUE":"ACCOUNT_NUMBER"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.add
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
        method: 'sale.paysystem.add',
        params: {
          NAME: 'Card payment',
          DESCRIPTION: 'Pay for your purchases easily by card.',
          XML_ID: 'my_ps_id',
          PERSON_TYPE_ID: 1,
          BX_REST_HANDLER: 'resthandlercode',
          ACTIVE: 'Y',
          ENTITY_REGISTRY_TYPE: 'ORDER',
          LOGOTYPE: '/* base64 image */',
          NEW_WINDOW: 'N',
          SETTINGS: {
            REST_SERVICE_ID: {
              TYPE: 'VALUE',
              VALUE: 'SERVICE ID VALUE',
            },
            REST_SERVICE_KEY: {
              TYPE: 'VALUE',
              VALUE: 'KEY ID VALUE',
            },
            PAYMENT_ID: {
              TYPE: 'PAYMENT',
              VALUE: 'ACCOUNT_NUMBER',
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
        console.info('Added payment system ID:', result)
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
      async function addPaySystem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.paysystem.add',
            params: {
              NAME: 'Card payment',
              DESCRIPTION: 'Pay for your purchases easily by card.',
              XML_ID: 'my_ps_id',
              PERSON_TYPE_ID: 1,
              BX_REST_HANDLER: 'resthandlercode',
              ACTIVE: 'Y',
              ENTITY_REGISTRY_TYPE: 'ORDER',
              LOGOTYPE: '/* base64 image */',
              NEW_WINDOW: 'N',
              SETTINGS: {
                REST_SERVICE_ID: {
                  TYPE: 'VALUE',
                  VALUE: 'SERVICE ID VALUE',
                },
                REST_SERVICE_KEY: {
                  TYPE: 'VALUE',
                  VALUE: 'KEY ID VALUE',
                },
                PAYMENT_ID: {
                  TYPE: 'PAYMENT',
                  VALUE: 'ACCOUNT_NUMBER',
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
          console.info('Added payment system ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPaySystem)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.paysystem.add',
                [
                    'NAME'               => 'Оплата картой',
                    'DESCRIPTION'        => 'Легко оплачивайте покупки картой.',
                    'XML_ID'             => 'my_ps_id',
                    'PERSON_TYPE_ID'     => 1,
                    'BX_REST_HANDLER'    => 'resthandlercode',
                    'ACTIVE'             => 'Y',
                    'ENTITY_REGISTRY_TYPE' => 'ORDER',
                    'LOGOTYPE'           => '/* base64 image */',
                    'NEW_WINDOW'         => 'N',
                    'SETTINGS'           => [
                        'REST_SERVICE_ID' => [
                            'TYPE'  => 'VALUE',
                            'VALUE' => 'SERVICE ID VALUE',
                        ],
                        'REST_SERVICE_KEY' => [
                            'TYPE'  => 'VALUE',
                            'VALUE' => 'KEY ID VALUE',
                        ],
                        'PAYMENT_ID'      => [
                            'TYPE'  => 'PAYMENT',
                            'VALUE' => 'ACCOUNT_NUMBER',
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding payment system: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.paysystem.add",
        {
            'NAME' : 'Оплата картой',
            'DESCRIPTION': 'Легко оплачивайте покупки картой.',
            'XML_ID': 'my_ps_id',
            'PERSON_TYPE_ID' : 1,
            'BX_REST_HANDLER' : 'resthandlercode',
            'ACTIVE' : 'Y',
            'ENTITY_REGISTRY_TYPE': 'ORDER',
            'LOGOTYPE': '/* base64 image */',
            'NEW_WINDOW': 'N',
            'SETTINGS' : {
                'REST_SERVICE_ID' : {
                    'TYPE' : 'VALUE',
                    'VALUE' : 'SERVICE ID VALUE'
                },
                'REST_SERVICE_KEY' : {
                    'TYPE' : 'VALUE',
                    'VALUE' : 'KEY ID VALUE'
                },
                'PAYMENT_ID': {
                    'TYPE': 'PAYMENT',
                    'VALUE': 'ACCOUNT_NUMBER',
                }
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.paysystem.add',
        [
            'NAME' => 'Оплата картой',
            'DESCRIPTION' => 'Легко оплачивайте покупки картой.',
            'XML_ID' => 'my_ps_id',
            'PERSON_TYPE_ID' => 1,
            'BX_REST_HANDLER' => 'resthandlercode',
            'ACTIVE' => 'Y',
            'ENTITY_REGISTRY_TYPE' => 'ORDER',
            'LOGOTYPE' => '/* base64 image */',
            'NEW_WINDOW' => 'N',
            'SETTINGS' => [
                'REST_SERVICE_ID' => [
                    'TYPE' => 'VALUE',
                    'VALUE' => 'SERVICE ID VALUE'
                ],
                'REST_SERVICE_KEY' => [
                    'TYPE' => 'VALUE',
                    'VALUE' => 'KEY ID VALUE'
                ],
                'PAYMENT_ID' => [
                    'TYPE' => 'PAYMENT',
                    'VALUE' => 'ACCOUNT_NUMBER',
                ]
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
    "result": 1,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор добавленной платежной системы ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CHECK_FAILURE",
    "error_description": "Parameter NAME is not defined"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для добавления платежной системы | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение обязательного поля либо значение одного из полей указано неверно | 400 ||
|| `ERROR_PAY_SYSTEM_ADD` | Прочие ошибки. Подробную информацию об ошибке смотрите в `error_description` | 400 ||
|| `ERROR_HANDLER_NOT_FOUND` | Обработчик, указанный в параметре `BX_REST_HANDLER`, не найден | 400 ||
|| `ERROR_PERSON_TYPE_NOT_FOUND` | Тип плательщика, указанный в параметре `PERSON_TYPE_ID`, не найден | 400 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-pay-system-handler-add.md)
- [{#T}](./sale-pay-system-handler-update.md)
- [{#T}](./sale-pay-system-handler-list.md)
- [{#T}](./sale-pay-system-handler-delete.md)
- [{#T}](./sale-pay-system-update.md)
- [{#T}](./sale-pay-system-list.md)
- [{#T}](./sale-pay-system-settings-get.md)
- [{#T}](./sale-pay-system-settings-update.md)
- [{#T}](./sale-pay-system-delete.md)
- [{#T}](./sale-pay-system-pay-payment.md)
- [{#T}](./sale-pay-system-settings-payment-get.md)
