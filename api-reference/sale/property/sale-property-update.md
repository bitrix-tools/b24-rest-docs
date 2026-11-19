# Обновить свойство заказа sale.property.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sale.property.update` обновляет свойство заказа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_property.id`](../data-types.md#sale_order_property) | Идентификатор свойства заказа. Можно получить методом [sale.property.list](./sale-property-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления свойства заказа [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

Поля `type`, `personTypeId` и `propsGroupId` изменить нельзя. Передавайте обязательное поле `name` при каждом обновлении.

Пропущенные флаги `Y/N` получают значения по умолчанию, указанные ниже, а `settings` формируется заново из переданных настроек. Чтобы сохранить эти значения, передайте их явно.

При обновлении удаляются привязки свойства к платежным системам и службам доставки. Восстановите нужные привязки методами [sale.propertyRelation.*](../property-relation/index.md).

Общие параметры для свойств заказа любого типа:

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название свойства заказа ||
|| **code**
[`string`](../../data-types.md) | Символьный код свойства заказа ||
|| **active**
[`string`](../../data-types.md) | Индикатор активности свойства заказа.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `Y` ||
|| **util**
[`string`](../../data-types.md) | Индикатор, является ли свойство заказа служебным. Служебные свойства заказа не отображаются в публичной части.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N` ||
|| **userProps**
[`string`](../../data-types.md) | Индикатор, входит ли свойство заказа в профиль покупателя.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N` ||
|| **isFiltered**
[`string`](../../data-types.md) | Индикатор, доступно ли свойство заказа в фильтре на странице списка заказов.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N` ||
|| **sort**
[`integer`](../../data-types.md) | Порядок сортировки. По умолчанию — `100` ||
|| **description**
[`string`](../../data-types.md) | Описание свойства заказа ||
|| **required**
[`string`](../../data-types.md) | Индикатор обязательности заполнения значения свойства заказа.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N` ||
|| **multiple**
[`string`](../../data-types.md) | Индикатор, является ли свойство заказа множественным. Для множественных свойств возможно указать несколько значений.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N` ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор свойства заказа ||
|| **defaultValue**
[`any`](../../data-types.md) | Значение свойства заказа по умолчанию.

Для свойств типа `FILE` нужно передать объект в формате `{"fileData": ["value1", "value2"]}`:
- `value1` — название файла с расширением
- `value2` — файл в формате [base64](../../files/how-to-upload-files.md)

Для удаления файла используется объект в формате `{"remove": "Y"}`.

Для множественных свойств (`multiple: "Y"`) передается массив значений; для типа `FILE` из него сохраняется только первый успешно загруженный файл.

Если передать `null` или пропустить `defaultValue`, значение по умолчанию будет очищено ||
|| **settings**
[`object`](../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}` для передачи дополнительных настроек свойства заказа.

Список поддерживаемых ключей этого объекта зависит от типа свойства. Для некоторых типов свойств (например, Y/N) дополнительные свойства не предусмотрены. Описание параметра **settings** для разных типов свойств приведено в описании метода [`sale.property.add`](sale-property-add.md#settings) ||
|#

Параметры, актуальные для свойств заказа типа `STRING`

#|
|| **Название**
`тип` | **Описание** ||
|| **isProfileName**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве названия профиля пользователя.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
|| **isPayer**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве имени плательщика.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
|| **isEmail**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве e-mail (например, при регистрации нового пользователя при оформлении заказа).
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
|| **isPhone**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве номера телефона.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
|| **isZip**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве почтового индекса.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
|| **isAddress**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве адреса.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
|#

Параметры, актуальные для свойств заказа типа `LOCATION`

#|
|| **Название**
`тип` | **Описание** ||
|| **isLocation**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве местоположения покупателя для расчета стоимости доставки.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
|| **isLocation4tax**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве местоположения покупателя для определения ставок налогов.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
|| **inputFieldLocation**
[`string`](../../data-types.md) | Идентификатор активного свойства типа `STRING` того же типа плательщика для альтернативного ввода местоположения. Используется при `isLocation: "Y"` и `multiple: "N"`; по умолчанию — `0` ||
|#

Параметры, актуальные для свойств заказа типа `ADDRESS`

#|
|| **Название**
`тип` | **Описание** ||
|| **isAddressFrom**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве адреса покупателя, откуда необходимо забрать заказ для расчета стоимости доставки.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
|| **isAddressTo**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства заказа в качестве адреса покупателя, куда необходимо доставить заказ для расчета стоимости доставки.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":93,"fields":{"name":"Телефон (для связи с курьером)","code":"PHONE","active":"Y","util":"N","userProps":"Y","isFiltered":"N","sort":500,"description":"описание свойства","required":"Y","multiple":"N","settings":{"multiline":"Y","maxlength":100},"xmlId":"","defaultValue":"","isProfileName":"Y","isPayer":"Y","isEmail":"N","isPhone":"N","isZip":"N","isAddress":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.property.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":93,"fields":{"name":"Телефон (для связи с курьером)","code":"PHONE","active":"Y","util":"N","userProps":"Y","isFiltered":"N","sort":500,"description":"описание свойства","required":"Y","multiple":"N","settings":{"multiline":"Y","maxlength":100},"xmlId":"","defaultValue":"","isProfileName":"Y","isPayer":"Y","isEmail":"N","isPhone":"N","isZip":"N","isAddress":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.property.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PropertyUpdateResult = {
      property: {
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
        settings: Record<string, unknown>
        sort: number
        type: string
        userProps: string
        util: string
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PropertyUpdateResult>({
        method: 'sale.property.update',
        params: {
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
        console.info('Updated property:', result.property.id, result.property.name)
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
      async function updateSaleProperty() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.property.update',
            params: {
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
          console.info('Updated property:', result.property.id, result.property.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateSaleProperty)
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
        bitrix_response = client.sale.property.update(
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
                'sale.property.update',
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
                            'maxlength' => 100,
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
        echo 'Error updating sale property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.property.update', {
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
        'sale.property.update',
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
    res, err := client.Core().Call(ctx, "sale.property.update", b24.Params{
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
    	return fmt.Errorf("sale.property.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "property".
    raw, ok := b24.Unwrap(res.Result, "property")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа property")
    }

    var item struct {
    	Active             string `json:"active"`
    	Code               string `json:"code"`
    	DefaultValue       json.RawMessage `json:"defaultValue"`
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
         "id":93,
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
            "maxlength":100,
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
|| **result.property**
[`sale_order_property`](../data-types.md#sale_order_property) | Обновленное свойство заказа. Помимо входных полей содержит `id`, `type`, `personTypeId` и `propsGroupId` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":"200840400001",
   "error_description":"property is not exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200840400001` | `property is not exists`

Обновляемое свойство заказа не найдено ||
|| `200850000003` | Ошибка проверки или сохранения свойства заказа. Причина указана в `error_description` ||
|| `200850000009` | `Require fields: isFiltered.`

При `multiple: "Y"` не передан `isFiltered` ||
|| `200850000010` | `Allowed values: isFiltered - [N]`

При `multiple: "Y"` значение `isFiltered` должно быть `N` ||
|| `200850000011` | `Require fields: multiple.`

Для типа `LOCATION` при `isLocation: "Y"` не передан `multiple` ||
|| `200850000012` | `Allowed values: multiple - [N]`

Для типа `LOCATION` при `isLocation: "Y"` значение `multiple` должно быть `N` ||
|| `200850000013` | `Require fields: multiple.`

Для типа `LOCATION` при `isLocation4tax: "Y"` не передан `multiple` ||
|| `200850000014` | `Allowed values: multiple - [N]`

Для типа `LOCATION` при `isLocation4tax: "Y"` значение `multiple` должно быть `N` ||
|| `200850000015` | `Require fields: require.`

Для типа `STRING` при `isProfileName: "Y"` не передан `required` ||
|| `200850000016` | `Allowed values: require - [Y]`

Для типа `STRING` при `isProfileName: "Y"` значение `required` должно быть `Y` ||
|| `200850000017` | ``Wrong format of field `defaultValue` ``

Неверный формат `defaultValue` для типа `FILE` ||
|| `200040300020` | `Access Denied`

Недостаточно прав для обновления свойства заказа ||
|| `100` | Не указан параметр `id` или `fields` ||
|| `0` | `Required fields: name`

В `fields` не передано поле `name`, в том числе при пустом объекте `fields` ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-add.md)
- [{#T}](./sale-property-get.md)
- [{#T}](./sale-property-list.md)
- [{#T}](./sale-property-delete.md)
- [{#T}](./sale-property-get-fields-by-type.md)
