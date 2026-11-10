# Обновить свойство отгрузки sale.shipmentproperty.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.shipmentproperty.update` обновляет свойство отгрузки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_shipment_property.id`](../data-types.md#sale_shipment_property) | Идентификатор свойства отгрузки ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления свойства отгрузки.

Поля `personTypeId`, `propsGroupId` и `type` изменить нельзя: метод их игнорирует и сохраняет значения из текущего свойства.

Метод перезаписывает свойство. Поля `code`, `description` и `xmlId`, которые не переданы, сохраняют текущие значения. Остальные непереданные поля, включая `sort`, `defaultValue` и `settings`, сбрасываются к значениям по умолчанию. Чтобы изменить одно поле, получите свойство методом [sale.shipmentproperty.get](./sale-shipment-property-get.md) и передайте остальные значения вместе с изменением ||
|#

### Параметр fields

Общие параметры, актуальные для свойств отгрузки любого типа:

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название свойства отгрузки ||
|| **code**
[`string`](../../data-types.md) | Символьный код свойства отгрузки ||
|| **active**
[`string`](../../data-types.md) | Индикатор активности свойства отгрузки.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `Y` ||
|| **util**
[`string`](../../data-types.md) | Индикатор, является ли свойство отгрузки служебным. Служебные свойства отгрузки не отображаются в публичной части.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N`
 ||
|| **userProps**
[`string`](../../data-types.md) | Индикатор, входит ли свойство отгрузки в профиль покупателя.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **isFiltered**
[`string`](../../data-types.md) | Индикатор, доступно ли свойство отгрузки в фильтре на странице списка отгрузок.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки свойства. Если не передано, значение сбрасывается в `100` ||
|| **description**
[`string`](../../data-types.md) | Описание свойства отгрузки ||
|| **required**
[`string`](../../data-types.md) | Индикатор обязательности заполнения значения свойства отгрузки.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **multiple**
[`string`](../../data-types.md) | Индикатор, является ли свойство отгрузки множественным. Для множественных свойств возможно указать несколько значений.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор свойства отгрузки ||
|| **defaultValue**
[`any`](../../data-types.md) | Значение свойства отгрузки по умолчанию.

Для множественных свойств, у которых `multiple` равно `Y`, можно передать массив значений ||
|| **settings**
[`object`](../../data-types.md) | Объект в формате {"field_1": "value_1", ... "field_N": "value_N"} для передачи дополнительных настроек свойства отгрузки.

Список поддерживаемых ключей этого объекта зависит от типа свойства. Для типов `Y/N`, `LOCATION` и `ADDRESS` настроек нет. Описание параметра **settings** для разных типов свойств приведено [ниже](#parametr-settings) ||
|#

Параметры, актуальные для свойств отгрузки типа `STRING`

#|
|| **Название**
`тип` | **Описание** ||
|| **isProfileName**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве названия профиля пользователя.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **isPayer**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве имени плательщика.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **isEmail**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве e-mail (например, при регистрации нового пользователя при оформлении заказа).
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **isPhone**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве номера телефона.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **isZip**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве почтового индекса.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **isAddress**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве адреса.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|#

Параметры, актуальные для свойств отгрузки типа `LOCATION`

#|
|| **Название**
`тип` | **Описание** ||
|| **isLocation**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве местоположения покупателя для расчета стоимости доставки.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **isLocation4tax**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве местоположения покупателя для определения ставок налогов.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **inputFieldLocation**
[`string`](../../data-types.md) | Устаревшее поле. Не используется ||
|#

Параметры, актуальные для свойств отгрузки типа `ADDRESS`

#|
|| **Название**
`тип` | **Описание** ||
|| **isAddressFrom**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве адреса покупателя, откуда необходимо забрать заказ для расчета стоимости доставки.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **isAddressTo**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве адреса покупателя, куда необходимо доставить заказ для расчета стоимости доставки.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|#

### Параметр settings {#parametr-settings}

Параметры, актуальные для свойств отгрузки типа `STRING`

#|
|| **Название**
`тип` | **Описание** ||
|| **minlength**
[`integer`](../../data-types.md) | Минимально допустимая длина (кол-во символов) значения свойства отгрузки ||
|| **maxlength**
[`integer`](../../data-types.md) | Максимально допустимая длина (кол-во символов) значения свойства отгрузки ||
|| **pattern**
[`string`](../../data-types.md) | Регулярное выражение для проверки значения свойства отгрузки.
Примеры:
Регулярное выражение для проверки номера телефона ```^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$```
Регулярное выражение для проверки написания даты в формате ДД/ММ/ГГГГ:
```^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$``` ||
|| **multiline**
[`string`](../../data-types.md) | Индикатор необходимости отображения многострочного поля для ввода значения свойства.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **cols**
[`integer`](../../data-types.md) | Устаревший параметр. Не используется ||
|| **rows**
[`integer`](../../data-types.md) | Устаревший параметр. Не используется ||
|| **size**
[`integer`](../../data-types.md) | Устаревший параметр. Не используется ||
|#

Параметры, актуальные для свойств отгрузки типа `NUMBER`

#|
|| **Название**
`тип` | **Описание** ||
|| **min**
[`integer`](../../data-types.md) | Минимально допустимое значение для данного свойства отгрузки ||
|| **max**
[`integer`](../../data-types.md) | Максимально допустимое значение для данного свойства отгрузки ||
|| **step**
[`integer`](../../data-types.md) | Шаг изменения значения. Используется в некоторых пользовательских интерфейсах для удобства изменения значения свойства отгрузки ||
|#

Параметры, актуальные для свойств отгрузки типа `ENUM`

#|
|| **Название**
`тип` | **Описание** ||
|| **multielement**
[`string`](../../data-types.md) | Индикатор необходимости отображения свойства отгрузки в виде списка чекбоксов.
Значение используется в некоторых пользовательских интерфейсах.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|| **size**
[`integer`](../../data-types.md) | Количество отображаемых значений свойства отгрузки. Значение используется в некоторых пользовательских интерфейсах ||
|#

Параметры, актуальные для свойств отгрузки типа `FILE`

#|
|| **Название**
`тип` | **Описание** ||
|| **maxsize**
[`integer`](../../data-types.md) | Максимально допустимый размер загружаемого файла в байтах ||
|| **accept**
[`string`](../../data-types.md) | Список расширений файлов, которые допустимо загружать в значение данного свойства отгрузки. Пример: png, doc, zip ||
|#

Параметры, актуальные для свойств отгрузки типа `DATE`

#|
|| **Название**
`тип` | **Описание** ||
|| **time**
[`string`](../../data-types.md) | Индикатор необходимости добавления возможности выбора времени при работе со значением данного свойства отгрузки. Значение используется в некоторых пользовательских интерфейсах.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, значение сбрасывается в `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":93,"fields":{"name":"Телефон (для связи с курьером)","code":"PHONE","active":"Y","util":"N","userProps":"Y","isFiltered":"N","sort":500,"description":"описание свойства","required":"Y","multiple":"N","settings":{"multiline":"Y","maxlength":100},"xmlId":"","defaultValue":"","isProfileName":"Y","isPayer":"Y","isEmail":"N","isPhone":"N","isZip":"N","isAddress":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.shipmentproperty.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":93,"fields":{"name":"Телефон (для связи с курьером)","code":"PHONE","active":"Y","util":"N","userProps":"Y","isFiltered":"N","sort":500,"description":"описание свойства","required":"Y","multiple":"N","settings":{"multiline":"Y","maxlength":100},"xmlId":"","defaultValue":"","isProfileName":"Y","isPayer":"Y","isEmail":"N","isPhone":"N","isZip":"N","isAddress":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.shipmentproperty.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ShipmentPropertyUpdateResult = {
      property: {
        active: string
        code: string
        defaultValue: string
        description: string
        id: number
        inputFieldLocation: string
        isAddress: string
        isAddressFrom: string
        isAddressTo: string
        isEmail: string
        isFiltered: string
        isLocation: string
        isLocation4tax: string
        isPayer: string
        isPhone: string
        isProfileName: string
        isZip: string
        multiple: string
        name: string
        personTypeId: number
        propsGroupId: number
        required: string
        settings: Record<string, string>
        sort: number
        type: string
        userProps: string
        util: string
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ShipmentPropertyUpdateResult>({
        method: 'sale.shipmentproperty.update',
        params: {
          id: 93,
          fields: {
            name: 'Phone (for courier contact)',
            code: 'PHONE',
            active: 'Y',
            util: 'N',
            userProps: 'Y',
            isFiltered: 'N',
            sort: 500,
            description: 'property description',
            required: 'Y',
            multiple: 'N',
            settings: {
              multiline: 'Y',
              maxlength: 100,
            },
            xmlId: '',
            defaultValue: '',
            isProfileName: 'Y',
            isPayer: 'Y',
            isEmail: 'N',
            isPhone: 'N',
            isZip: 'N',
            isAddress: 'N',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated property id:', result.property.id, 'name:', result.property.name)
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
      async function updateShipmentProperty() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.shipmentproperty.update',
            params: {
              id: 93,
              fields: {
                name: 'Phone (for courier contact)',
                code: 'PHONE',
                active: 'Y',
                util: 'N',
                userProps: 'Y',
                isFiltered: 'N',
                sort: 500,
                description: 'property description',
                required: 'Y',
                multiple: 'N',
                settings: {
                  multiline: 'Y',
                  maxlength: 100,
                },
                xmlId: '',
                defaultValue: '',
                isProfileName: 'Y',
                isPayer: 'Y',
                isEmail: 'N',
                isPhone: 'N',
                isZip: 'N',
                isAddress: 'N',
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
          console.info('Updated property id:', result.property.id, 'name:', result.property.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateShipmentProperty)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "name": "Телефон (для связи с курьером)",
        "code": "PHONE",
        "active": "Y",
        "util": "N",
        "userProps": "Y",
        "isFiltered": "N",
        "sort": 500,
        "description": "описание свойства",
        "required": "Y",
        "multiple": "N",
        "settings": {
            "multiline": "Y",
            "maxlength": 100,
        },
        "xmlId": "",
        "defaultValue": "",
        "isProfileName": "Y",
        "isPayer": "Y",
        "isEmail": "N",
        "isPhone": "N",
        "isZip": "N",
        "isAddress": "N",
    }

    try:
        bitrix_response = client.sale.shipmentproperty.update(
            bitrix_id=93,
            fields=fields,
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
                'sale.shipmentproperty.update',
                [
                    'id' => 93,
                    'fields' => [
                        'name'          => 'Телефон (для связи с курьером)',
                        'code'          => 'PHONE',
                        'active'        => 'Y',
                        'util'          => 'N',
                        'userProps'     => 'Y',
                        'isFiltered'    => 'N',
                        'sort'          => 500,
                        'description'   => 'описание свойства',
                        'required'      => 'Y',
                        'multiple'      => 'N',
                        'settings'      => [
                            'multiline' => 'Y',
                            'maxlength' => 100
                        ],
                        'xmlId'         => '',
                        'defaultValue'  => '',
                        'isProfileName' => 'Y',
                        'isPayer'       => 'Y',
                        'isEmail'       => 'N',
                        'isPhone'       => 'N',
                        'isZip'         => 'N',
                        'isAddress'     => 'N',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating shipment property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.shipmentproperty.update', {
            id: 93,
            fields: {
                name: 'Телефон (для связи с курьером)',
                code: 'PHONE',
                active: 'Y',
                util: 'N',
                userProps: 'Y',
                isFiltered: 'N',
                sort: 500,
                description: 'описание свойства',
                required: 'Y',
                multiple: 'N',
                settings: {
                    multiline: 'Y',
                    maxlength: 100
                },
                xmlId: '',
                defaultValue: '',
                isProfileName: 'Y',
                isPayer: 'Y',
                isEmail: 'N',
                isPhone: 'N',
                isZip: 'N',
                isAddress: 'N',
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
        'sale.shipmentproperty.update',
        [
            'id' => 93,
            'fields' => [
                'name' => 'Телефон (для связи с курьером)',
                'code' => 'PHONE',
                'active' => 'Y',
                'util' => 'N',
                'userProps' => 'Y',
                'isFiltered' => 'N',
                'sort' => 500,
                'description' => 'описание свойства',
                'required' => 'Y',
                'multiple' => 'N',
                'settings' => [
                    'multiline' => 'Y',
                    'maxlength' => 100
                ],
                'xmlId' => '',
                'defaultValue' => '',
                'isProfileName' => 'Y',
                'isPayer' => 'Y',
                'isEmail' => 'N',
                'isPhone' => 'N',
                'isZip' => 'N',
                'isAddress' => 'N',
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
    res, err := client.Core().Call(ctx, "sale.shipmentproperty.update", b24.Params{
    	"id": 93,
    	"fields": b24.Params{
    		"name":         "Телефон (для связи с курьером)",
    		"code":         "PHONE",
    		"active":       "Y",
    		"util":         "N",
    		"userProps":    "Y",
    		"isFiltered":   "N",
    		"sort":         500,
    		"description":  "описание свойства",
    		"required":     "Y",
    		"multiple":     "N",
    		"settings": b24.Params{
    			"multiline": "Y",
    			"maxlength": 100,
    		},
    		"xmlId":         "",
    		"defaultValue":  "",
    		"isProfileName": "Y",
    		"isPayer":       "Y",
    		"isEmail":       "N",
    		"isPhone":       "N",
    		"isZip":         "N",
    		"isAddress":     "N",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sale.shipmentproperty.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "property".
    raw, ok := b24.Unwrap(res.Result, "property")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа property")
    }

    var item struct {
    	Active             string `json:"active"`
    	Code               string `json:"code"`
    	DefaultValue       string `json:"defaultValue"`
    	Description        string `json:"description"`
    	ID                 b24.ID `json:"id"`
    	InputFieldLocation string `json:"inputFieldLocation"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Active, item.Code)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
   "result":{
      "property":{
         "active":"Y",
         "code":"PHONE",
         "defaultValue":"",
         "description":"описание свойства",
         "id":96,
         "inputFieldLocation":"0",
         "isAddress":"N",
         "isAddressFrom":"N",
         "isAddressTo":"N",
         "isEmail":"N",
         "isFiltered":"N",
         "isLocation":"N",
         "isLocation4tax":"N",
         "isPayer":"Y",
         "isPhone":"N",
         "isProfileName":"Y",
         "isZip":"N",
         "multiple":"N",
         "name":"Телефон (для связи с курьером)",
         "personTypeId":3,
         "propsGroupId":6,
         "required":"Y",
         "settings":{
            "maxlength":"100",
            "multiline":"Y"
         },
         "sort":500,
         "type":"STRING",
         "userProps":"Y",
         "util":"N",
         "xmlId":""
      }
   },
   "time":{
      "start":1712818736.235335,
      "finish":1712818736.611224,
      "duration":0.3758888244628906,
      "processing":0.18679594993591309,
      "date_start":"2024-04-11T09:58:56+03:00",
      "date_finish":"2024-04-11T09:58:56+03:00"
   }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **property**
[`sale_shipment_property`](../data-types.md#sale_shipment_property) | Объект с информацией об обновленном свойстве отгрузки. Поля описаны в типе [sale_order_property](../data-types.md#sale_order_property) ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":200840400001,
   "error_description":"property is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200840400001` | Обновляемое свойство отгрузки не найдено ||
|| `200850000003` | Внутренняя ошибка обновления свойства ||
|| `200850000009` | Ошибка возникает при попытке обновить свойство отгрузки со значением параметра `multiple`, выставленным в `Y`, в том случае, если не передан параметр `isFiltered`.
Фильтрация по множественным свойствам отгрузки не поддерживается ||
|| `200850000010` | Ошибка возникает при попытке обновить свойство отгрузки со значением параметра `multiple`, выставленным в `Y`, в том случае, если значение параметра `isFiltered` не равно `N`.
Фильтрация по множественным свойствам отгрузки не поддерживается ||
|| `200850000011` | Ошибка возникает при попытке обновить свойство отгрузки с типом `LOCATION` и значением параметра `isLocation`, выставленным в `Y`, в том случае, если значение параметра `multiple` не указано.
Не поддерживается множественность у свойств отгрузки, отмеченных индикатором `isLocation` ||
|| `200850000012` | Ошибка возникает при попытке обновить свойство отгрузки с типом `LOCATION` и значением параметра `isLocation`, выставленным в `Y`, в том случае, если значение параметра `multiple` не равно`N`.
Не поддерживается множественность у свойств отгрузки, отмеченных индикатором `isLocation` ||
|| `200850000013` | Ошибка возникает при попытке обновить свойство отгрузки с типом `LOCATION` и значением параметра `isLocation4tax`, выставленным в `Y`, в том случае, если значение параметра `multiple` не указано.
Не поддерживается множественность у свойств отгрузки, отмеченных индикатором `isLocation4tax` ||
|| `200850000014` | Ошибка возникает при попытке обновить свойство отгрузки с типом `LOCATION` и значением параметра `isLocation4tax`, выставленным в `Y`, в том случае, если значение параметра `multiple` не равно `N`.
Не поддерживается множественность у свойств отгрузки, отмеченных индикатором `isLocation4tax` ||
|| `200850000015` | Ошибка возникает при попытке обновить свойство отгрузки с типом `STRING` и значением параметра `isProfileName`, выставленным в `Y`, в том случае, если значение параметра `required` не указано.
Название профиля обязательно и не может быть пустым ||
|| `200850000016` | Ошибка возникает при попытке обновить свойство отгрузки с типом `STRING` и значением параметра `isProfileName`, выставленным в `Y`, в том случае, если значение параметра `required` не равно `Y`.
Название профиля обязательно и не может быть пустым ||
|| `200040300020` | Недостаточно прав для обновления свойства отгрузки ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` |Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-property-add.md)
- [{#T}](./sale-shipment-property-get.md)
- [{#T}](./sale-shipment-property-list.md)
- [{#T}](./sale-shipment-property-delete.md)
- [{#T}](./sale-shipment-property-get-fields-by-type.md)
