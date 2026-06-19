# Добавить адрес crm.address.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет новый адрес для реквизита или лида. Для пользователя такой адрес выглядит как адрес контакта, компании или лида. 

Может быть создано несколько адресов разного [типа](../../auxiliary/enum/crm-enum-address-type.md), привязанных к одному реквизиту. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей — объект вида `{"поле": "значение"[, ...]}` для добавления адреса ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа адреса. Элемент перечисления «Тип адреса».

Элементы перечисления «Тип адреса» можно получить с помощью метода [crm.enum.addresstype](../../auxiliary/enum/crm-enum-address-type.md) 
||
|| **ENTITY_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа родительского объекта.

Идентификаторы типов объектов можно получить с помощью метода [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md).

Адреса могут быть привязаны только к Реквизитам (а реквизиты уже к компаниям либо контактам) или Лидам. 

Для обратной совместимости оставлена возможность связывать Адреса с Контактами или Компаниями. Но эта связь возможна только на некоторых старых порталах, где специально техподдержкой был включен старый режим работы с адресами
||
|| **ENTITY_ID***
[`string`](../../../data-types.md) | Идентификатор родительского объекта ([реквизит](../universal/index.md) или [лид](../../leads/index.md)) ||
|| **ADDRESS_1**
[`string`](../../../data-types.md) | Улица, дом, корпус, строение ||
|| **ADDRESS_2**
[`string`](../../../data-types.md) | Квартира / офис ||
|| **CITY**
[`string`](../../../data-types.md) | Город ||
|| **POSTAL_CODE**
[`string`](../../../data-types.md) | Почтовый индекс ||
|| **REGION**
[`string`](../../../data-types.md) | Район ||
|| **PROVINCE**
[`string`](../../../data-types.md) | Область ||
|| **COUNTRY**
[`string`](../../../data-types.md) | Страна ||
|| **COUNTRY_CODE**
[`string`](../../../data-types.md) | Код страны.

Не используется, оставлено для обратной совместимости. В качестве значения можно указать пустую строку
||
|| **LOC_ADDR_ID**
[`integer`](../../../data-types.md) | Идентификатор адреса местоположения.

Это поле содержит идентификатор объекта адреса в модуле `Location`, связанного с объектов адреса CRM. Каждому адресу CRM соответствует объект адреса в модуле `location`. Это можно использовать для копирования существующего адреса в CRM с информацией о местоположении, которой нет в полях адреса CRM.

Если при создании адреса указан идентификатор адреса модуля `location`, то создается копия адреса `location` и привязывается к созданному адресу CRM. Если в таком случае не указаны значения для строковых полей адреса, то они будут заполнены из location-адреса.

Если же было указано хоть одно строковое поле, то в адресе CRM будут сохранены только указанные поля, и их значения перезапишут соответствующие значения в объекте location-адреса. Такое же поведение будет и при обновлении адреса
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TYPE_ID":1,"ENTITY_TYPE_ID":8,"ENTITY_ID":1,"ADDRESS_1":"проспект Мира, 4","ADDRESS_2":"Калининградский областной драматический театр","CITY":"Калининград","POSTAL_CODE":"236036","REGION":"городской округ Калининград","PROVINCE":"Калининградская область","COUNTRY":"Россия"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.address.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TYPE_ID":1,"ENTITY_TYPE_ID":8,"ENTITY_ID":1,"ADDRESS_1":"проспект Мира, 4","ADDRESS_2":"Калининградский областной драматический театр","CITY":"Калининград","POSTAL_CODE":"236036","REGION":"городской округ Калининград","PROVINCE":"Калининградская область","COUNTRY":"Россия"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.address.add
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
        method: 'crm.address.add',
        params: {
          fields: {
            TYPE_ID: 1,            // Address type, see crm.enum.addresstype
            ENTITY_TYPE_ID: 8,     // Parent object type (requisite or lead)
            ENTITY_ID: 1,          // Requisite identifier
            ADDRESS_1: '4 Peace Avenue',
            ADDRESS_2: 'Kaliningrad Regional Drama Theater',
            CITY: 'Kaliningrad',
            POSTAL_CODE: '236036',
            REGION: 'Kaliningrad urban district',
            PROVINCE: 'Kaliningrad Oblast',
            COUNTRY: 'Russia',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Address added:', result)
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
      async function addAddress() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.address.add',
            params: {
              fields: {
                TYPE_ID: 1,            // Address type, see crm.enum.addresstype
                ENTITY_TYPE_ID: 8,     // Parent object type (requisite or lead)
                ENTITY_ID: 1,          // Requisite identifier
                ADDRESS_1: '4 Peace Avenue',
                ADDRESS_2: 'Kaliningrad Regional Drama Theater',
                CITY: 'Kaliningrad',
                POSTAL_CODE: '236036',
                REGION: 'Kaliningrad urban district',
                PROVINCE: 'Kaliningrad Oblast',
                COUNTRY: 'Russia',
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
          console.info('Address added:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addAddress)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.address.add',
                [
                    'fields' => [
                        'TYPE_ID'        => 1,
                        'ENTITY_TYPE_ID' => 8,
                        'ENTITY_ID'      => 1,
                        'ADDRESS_1'      => 'проспект Мира, 4',
                        'ADDRESS_2'      => 'Калининградский областной драматический театр',
                        'CITY'           => 'Калининград',
                        'POSTAL_CODE'    => '236036',
                        'REGION'         => 'городской округ Калининград',
                        'PROVINCE'       => 'Калининградская область',
                        'COUNTRY'        => 'Россия',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding address: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.address.add",
        {
            fields:
            {
                "TYPE_ID": 1,            // Тип адреса, см. crm.enum.addresstype
                "ENTITY_TYPE_ID": 8,     // Тип объекта (реквизит или лид)
                "ENTITY_ID": 1,          // Идентификатор реквизита
                "ADDRESS_1": "проспект Мира, 4",
                "ADDRESS_2": "Калининградский областной драматический театр",
                "CITY": "Калининград",
                "POSTAL_CODE": "236036",
                "REGION": "городской округ Калининград",
                "PROVINCE": "Калининградская область",
                "COUNTRY": "Россия",
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.address.add',
        [
            'fields' => [
                'TYPE_ID' => 1,
                'ENTITY_TYPE_ID' => 8,
                'ENTITY_ID' => 1,
                'ADDRESS_1' => 'проспект Мира, 4',
                'ADDRESS_2' => 'Калининградский областной драматический театр',
                'CITY' => 'Калининград',
                'POSTAL_CODE' => '236036',
                'REGION' => 'городской округ Калининград',
                'PROVINCE' => 'Калининградская область',
                'COUNTRY' => 'Россия',
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
        bitrix_response = client.crm.address.add(
            fields={
                "TYPE_ID": 1,
                "ENTITY_TYPE_ID": 8,
                "ENTITY_ID": 7335,
                "ADDRESS_1": "15 Main Street",
                "ADDRESS_2": "Suite 300",
                "CITY": "Boston",
                "POSTAL_CODE": "02110",
                "REGION": "Suffolk County",
                "PROVINCE": "Massachusetts",
                "COUNTRY": "United States",
                "COUNTRY_CODE": "US",
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
        "start": 1712922620.724857,
        "finish": 1712922623.393783,
        "duration": 2.6689260005950928,
        "processing": 2.210068941116333,
        "date_start": "2024-04-12T14:50:20+03:00",
        "date_finish": "2024-04-12T14:50:23+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат добавления адреса:
- `true` — добавлен
- `false` — не добавлен 
||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "ENTITY_ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `TYPE_ID is not defined or invalid` | Идентификатор типа адреса не указан или имеет недопустимое значение ||
|| `ENTITY_TYPE_ID is not defined or invalid` | Идентификатор типа родительского объекта не указан или имеет недопустимое значение. ||
|| `ENTITY_ID is not defined or invalid` | Идентификатор родительского объекта не указан или имеет недопустимое значение ||
|| `TypeAddress exists` | Адрес с таким типом у указанного родительского объекта уже существует ||
|| `Access denied` | Недостаточно прав доступа для добавления адреса ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-address-update.md)
- [{#T}](./crm-address-list.md)
- [{#T}](./crm-address-delete.md)
- [{#T}](./crm-address-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-company-with-requisite.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-contact-with-requisite.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-deal-with-choice-of-requisite.md)