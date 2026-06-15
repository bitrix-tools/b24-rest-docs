# Добавить свойство заказа sale.property.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет свойство заказа. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания свойства заказа ||
|#

### Параметр fields

Общие параметры, актуальные для свойств заказа любого типа:

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **personTypeId***
[`sale_person_type.id`](../data-types.md) | Идентификатор типа плательщика ||
|| **propsGroupId***
[`sale_order_property_group.id`](../data-types.md) | Идентификатор группы свойств ||
|| **name***
[`string`](../../data-types.md) | Название свойства заказа ||
|| **type***
[`string`](../../data-types.md) | Тип свойства заказа.
Возможные значения:
- `STRING`
- `Y/N`
- `NUMBER`
- `ENUM`
- `FILE`
- `DATE`
- `LOCATION`
- `ADDRESS`
 ||
|| **code**
[`string`](../../data-types.md) | Символьный код свойства заказа ||
|| **active**
[`string`](../../data-types.md) | Индикатор активности свойства заказа.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `Y` (свойство добавляется активным) ||
|| **util**
[`string`](../../data-types.md) | Индикатор, является ли свойство заказа служебным. Служебные свойства заказа не отображаются в публичной части.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N`
 ||
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
[`integer`](../../data-types.md) | Сортировка ||
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
[`any`](../../data-types.md) | Дефолтное значение свойства заказа.

Для свойств типа `file` нужно передать объект в формате `{"fileData": ["value1", "value2"]}`:
- `value1` — название файла с расширением,
- `value2` — файл в формате [base64](../../files/how-to-upload-files.md).

Для множественных свойств заказа (multiple) поддерживается передача массива значений  ||
|| **settings**
[`object`](../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}` для передачи дополнительных настроек свойства заказа.

Список поддерживаемых ключей этого объекта зависит от типа свойства. Для некоторых типов свойств (например, Y/N) дополнительные свойства не предусмотрены. Описание параметра **settings** для разных типов свойств приведено [ниже](#parametr-settings) ||
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
||**Название**
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
[`string`](../../data-types.md) | Устаревшее поле. Не используется ||
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

### Параметр settings

Параметры, актуальные для свойств заказа типа `STRING`

#|
|| **Название**
`тип` | **Описание** ||
|| **minlength**
[`integer`](../../data-types.md) | Минимально допустимая длина (кол-во символов) значения свойства заказа ||
|| **maxlength**
[`integer`](../../data-types.md) | Максимально допустимая длина (кол-во символов) значения свойства заказа ||
|| **pattern**
[`string`](../../data-types.md) | Регулярное выражение для проверки значения свойства заказа.
Примеры:
Регулярное выражение для проверки номера телефона ```^((8\|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$```
Регулярное выражение для проверки написания даты в формате ДД/ММ/ГГГГ:
```^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$``` ||
|| **multiline**
[`string`](../../data-types.md) | Индикатор необходимости отображения многострочного поля для ввода значения свойства.Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
|| **cols**
[`integer`](../../data-types.md) | Устаревший параметр. Не используется ||
|| **rows**
[`integer`](../../data-types.md) | Устаревший параметр. Не используется ||
|| **size**
[`integer`](../../data-types.md) | Устаревший параметр. Не используется ||
|#

Параметры, актуальные для свойств заказа типа `NUMBER`

#|
|| **Название**
`тип` | **Описание** ||
|| **min**
[`integer`](../../data-types.md) | Минимально допустимое значение для данного свойства заказа ||
|| **max**
[`integer`](../../data-types.md) | Максимально допустимое значение для данного свойства заказа ||
|| **step**
[`integer`](../../data-types.md) | Шаг изменения значения. Используется в некоторых пользовательских интерфейсах для удобства изменения значения свойства заказа ||
|#

Параметры, актуальные для свойств заказа типа `ENUM`

#|
|| **Название**
`тип` | **Описание** ||
|| **multielement**
[`string`](../../data-types.md) | Индикатор необходимости отображения свойства заказа в виде списка чекбоксов.
Значение используется в некоторых пользовательских интерфейсах.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
|| **size**
[`integer`](../../data-types.md) | Количество отображаемых значений свойства заказа. Значение используется в некоторых пользовательских интерфейсах ||
|#

Параметры, актуальные для свойств заказа типа `FILE`

#|
|| **Название**
`тип` | **Описание** ||
|| **maxsize**
[`integer`](../../data-types.md) | Максимально допустимый размер загружаемого файла в байтах ||
|| **accept**
[`string`](../../data-types.md) | Список расширений файлов, которые допустимо загружать в значение данного свойства заказа. Пример: png, doc, zip ||
|#

Параметры, актуальные для свойств заказа типа [`DATE`](../data-types.md)

#|
|| **Название**
`тип` | **Описание** ||
|| **time**
[`string`](../../data-types.md) | Индикатор необходимости добавления возможности выбора времени при работе со значением данного свойства заказа. Значение используется в некоторых пользовательских интерфейсах.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"personTypeId":3,"propsGroupId":6,"name":"Телефон (для связи с курьером)","type":"STRING","code":"PHONE","active":"Y","util":"N","userProps":"Y","isFiltered":"N","sort":500,"description":"описание свойства","required":"Y","multiple":"N","settings":{"multiline":"Y","maxlength":100},"xmlId":"","defaultValue":"","isProfileName":"Y","isPayer":"Y","isEmail":"N","isPhone":"N","isZip":"N","isAddress":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.property.add
    ```

- cURL (OAuth)

    ```http
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"personTypeId":3,"propsGroupId":6,"name":"Телефон (для связи с курьером)","type":"STRING","code":"PHONE","active":"Y","util":"N","userProps":"Y","isFiltered":"N","sort":500,"description":"описание свойства","required":"Y","multiple":"N","settings":{"multiline":"Y","maxlength":100},"xmlId":"","defaultValue":"","isProfileName":"Y","isPayer":"Y","isEmail":"N","isPhone":"N","isZip":"N","isAddress":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.property.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PropertyAddResult = {
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
      const response = await $b24.actions.v2.call.make<PropertyAddResult>({
        method: 'sale.property.add',
        params: {
          fields: {
            personTypeId: 3,
            propsGroupId: 6,
            name: 'Phone (for courier contact)',
            type: 'STRING',
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
        console.info('Added property id:', result.property.id, 'name:', result.property.name)
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
      async function addProperty() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.property.add',
            params: {
              fields: {
                personTypeId: 3,
                propsGroupId: 6,
                name: 'Phone (for courier contact)',
                type: 'STRING',
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
          console.info('Added property id:', result.property.id, 'name:', result.property.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addProperty)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.property.add',
                [
                    'fields' => [
                        'personTypeId'  => 3,
                        'propsGroupId'  => 6,
                        'name'          => 'Телефон (для связи с курьером)',
                        'type'          => 'STRING',
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
        echo 'Error adding property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'sale.property.add', {
        fields: {
            personTypeId: 3,
            propsGroupId: 6,
            name: 'Телефон (для связи с курьером)',
            type: 'STRING',
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
        'sale.property.add',
        [
            'fields' => [
                'personTypeId' => 3,
                'propsGroupId' => 6,
                'name' => 'Телефон (для связи с курьером)',
                'type' => 'STRING',
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

{% endlist %}

## Ответ в случае успеха

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
      "start":1712818563.754118,
      "finish":1712818566.840385,
      "duration":3.0862669944763184,
      "processing":1.0286660194396973,
      "date_start":"2024-04-11T09:56:03+03:00",
      "date_finish":"2024-04-11T09:56:06+03:00"
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
[`sale_order_property`](../data-types.md) | Объект с информацией о добавленном свойстве заказа ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
   "error":0,
   "error_description":"Required fields: propsGroupId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200850000005` | Указано пустое значение для типа плательщика ||
|| `200850000006` | Внутренняя ошибка добавления свойства ||
|| `200850000009` | Ошибка возникает при попытке создать свойство заказа со значением параметра `multiple`, выставленным в `Y`, в том случае, если не передан параметр `isFiltered`.
Фильтрация по множественным свойствам заказов не поддерживается ||
|| `200850000010` | Ошибка возникает при попытке создать свойство заказа со значением параметра `multiple`, выставленным в `Y`, в том случае, если значение параметра `isFiltered` не равно `N`.
Фильтрация по множественным свойствам заказов  не поддерживается ||
|| `200850000011` | Ошибка возникает при попытке создать свойство заказа с типом `LOCATION` и значением параметра `isLocation`, выставленным в `Y`, в том случае, если значение параметра `multiple` не указано. 
Не поддерживается множественность у свойств заказа, отмеченных индикатором `isLocation` ||
|| `200850000012` | Ошибка возникает при попытке создать свойство заказа с типом `LOCATION` и значением параметра `isLocation`, выставленным в `Y`, в том случае, если значение параметра `multiple` не равно `N`. 
Не поддерживается множественность у свойств заказа, отмеченных индикатором `isLocation` ||
|| `200850000013` | Ошибка возникает при попытке создать свойство заказа с типом `LOCATION` и значением параметра `isLocation4tax`, выставленным в `Y`, в том случае, если значение параметра `multiple` не указано. 
Не поддерживается множественность у свойств заказа, отмеченных индикатором `isLocation4tax` ||
|| `200850000014` | Ошибка возникает при попытке создать свойство заказа с типом `LOCATION` и значением параметра `isLocation4tax`, выставленным в `Y`, в том случае, если значение параметра `multiple` не равно `N`. 
Не поддерживается множественность у свойств заказа, отмеченных индикатором `isLocation4tax` ||
|| `200850000015` | Ошибка возникает при попытке создать свойство заказа с типом `STRING` и значением параметра `isProfileName`, выставленным в `Y`, в том случае, если значение параметра `required` не указано. 
Название профиля обязательно и не может быть пустым ||
|| `200850000016` | Ошибка возникает при попытке создать свойство заказа с типом `STRING` и значением параметра `isProfileName`, выставленным в `Y`, в том случае, если значение параметра `required` не равно `Y`. 
Название профиля обязательно и не может быть пустым ||
|| `200040300020` | Недостаточно прав для добавления свойства заказа ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-update.md)
- [{#T}](./sale-property-get.md)
- [{#T}](./sale-property-list.md)
- [{#T}](./sale-property-delete.md)
- [{#T}](./sale-property-get-fields-by-type.md)
