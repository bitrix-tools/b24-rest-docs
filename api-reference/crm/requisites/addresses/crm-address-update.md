# Изменить адрес реквизита crm.address.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение контакта, компании или лида — владельца адреса

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте методы REST 3.0: адреса контактов, компаний и лидов — в группе [Адреса](../../rest-v3/addresses/index.md), адреса реквизитов — в группе [Реквизиты](../../rest-v3/requisites/index.md).

{% endnote %}

Метод `crm.address.update` изменяет существующий адрес реквизита или лида и не создает новый.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей для изменения адреса [(подробное описание)](#fields).

Обязательно передайте `TYPE_ID`, `ENTITY_TYPE_ID` и `ENTITY_ID`: они определяют адрес. Передайте также все текстовые поля адреса, значения которых нужно сохранить или изменить. Если передать только часть текстовых полей, остальные будут очищены. Если не передать ни одно из полей `ADDRESS_1`, `ADDRESS_2`, `CITY`, `POSTAL_CODE`, `REGION`, `PROVINCE` и `COUNTRY`, значения могут быть заполнены из указанного или ранее связанного адреса `location`. Поле `COUNTRY_CODE` само по себе не предотвращает такое заполнение ||
|#

### Параметр fields {#fields}

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

Укажите реквизит (`8`) или лид (`1`). Для адреса реквизита компании или контакта передавайте тип `8` и идентификатор самого реквизита: метод ищет адрес по указанным `ENTITY_TYPE_ID` и `ENTITY_ID`
||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор владельца адреса: реквизита или лида ||
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
[`string`](../../../data-types.md) | Код страны из справочника местоположений модуля `sale`. Если код не найден, не соответствует названию страны в `COUNTRY` или итоговое значение `COUNTRY` пустое, код страны очищается
||
|| **LOC_ADDR_ID**
[`integer`](../../../data-types.md) |
Идентификатор адреса в модуле `location`, связанного с адресом CRM. Позволяет использовать данные местоположения, которых нет в текстовых полях CRM.

Условие заполнения полей из `location` описано в параметре [fields](#fields). При передаче адресных полей в `location` обновляются только соответствующие переданные поля. Если указанный объект `location` связан с другим адресом, создается его копия.

Очищенные при частичном обновлении поля CRM могут вернуться из `location` при следующем вызове без перечисленных в `fields` адресных полей; чтобы очистить их и в `location`, передайте пустые строки
||
|#

## Примеры кода

В примерах изменяются улица и город адреса реквизита.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TYPE_ID":1,"ENTITY_TYPE_ID":8,"ENTITY_ID":1,"ADDRESS_1":"Московский проспект, 261","CITY":"Калининград"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.address.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TYPE_ID":1,"ENTITY_TYPE_ID":8,"ENTITY_ID":1,"ADDRESS_1":"Московский проспект, 261","CITY":"Калининград"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.address.update
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
        method: 'crm.address.update',
        params: {
          fields: {
            TYPE_ID: 1,
            ENTITY_TYPE_ID: 8,
            ENTITY_ID: 1,
            ADDRESS_1: 'Московский проспект, 261',
            CITY: 'Калининград',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Address updated:', result)
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
      async function updateAddress() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.address.update',
            params: {
              fields: {
                TYPE_ID: 1,
                ENTITY_TYPE_ID: 8,
                ENTITY_ID: 1,
                ADDRESS_1: 'Московский проспект, 261',
                CITY: 'Калининград',
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
          console.info('Address updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateAddress)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.address.update(
            fields={
                "TYPE_ID": 1,
                "ENTITY_TYPE_ID": 8,
                "ENTITY_ID": 1,
                "ADDRESS_1": "Московский проспект, 261",
                "CITY": "Калининград",
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.address.update',
                [
                    'fields' => [
                        'TYPE_ID'        => 1,
                        'ENTITY_TYPE_ID' => 8,
                        'ENTITY_ID'      => 1,
                        'ADDRESS_1'      => 'Московский проспект, 261',
                        'CITY'           => 'Калининград',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating address: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.address.update",
        {
            fields:
            {
                "TYPE_ID": 1,
                "ENTITY_TYPE_ID": 8,
                "ENTITY_ID": 1,
                "ADDRESS_1": "Московский проспект, 261",
                "CITY": "Калининград"
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
        'crm.address.update',
        [
            'fields' => [
                'TYPE_ID' => 1,
                'ENTITY_TYPE_ID' => 8,
                'ENTITY_ID' => 1,
                'ADDRESS_1' => 'Московский проспект, 261',
                'CITY' => 'Калининград'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.address.update", b24.Params{
    	"fields": b24.Params{
    		"TYPE_ID":        1,
    		"ENTITY_TYPE_ID": 8,
    		"ENTITY_ID":      1,
    		"ADDRESS_1":      "Московский проспект, 261",
    		"CITY":           "Калининград",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.address.update: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
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
[`boolean`](../../../data-types.md) | `true` — запрос на изменение адреса выполнен
||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "ENTITY_ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | TYPE_ID is not defined or invalid. | Идентификатор типа адреса не указан или имеет недопустимое значение ||
|| `400` | Пустое значение | ENTITY_TYPE_ID is not defined or invalid. | Идентификатор типа владельца адреса не указан или имеет недопустимое значение ||
|| `400` | Пустое значение | ENTITY_ID is not defined or invalid. | Идентификатор владельца адреса не указан или имеет недопустимое значение ||
|| `400` | Пустое значение | TypeAddress not found. | Адрес с указанными `TYPE_ID`, `ENTITY_TYPE_ID` и `ENTITY_ID` не найден ||
|| `400` | Пустое значение | Access denied. | Нет права на изменение владельца адреса ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-address-add.md)
- [{#T}](./crm-address-list.md)
- [{#T}](./crm-address-delete.md)
- [{#T}](./crm-address-fields.md)
- [{#T}](./index.md)
