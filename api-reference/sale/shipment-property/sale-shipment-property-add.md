# Добавить свойство отгрузки sale.shipmentproperty.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет свойство отгрузки. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания свойства отгрузки ||
|#

### Параметр fields

Общие параметры, актуальные для свойств отгрузки любого типа:

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **personTypeId***
[`sale_person_type.id`](../data-types.md) | Идентификатор типа плательщика ||
|| **propsGroupId***
[`sale_order_property_group.id`](../data-types.md) | Идентификатор группы свойств ||
|| **name***
[`string`](../../data-types.md) | Название свойства отгрузки ||
|| **type***
[`string`](../../data-types.md) | Тип свойства отгрузки.
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
[`string`](../../data-types.md) | Символьный код свойства отгрузки ||
|| **active**
[`string`](../../data-types.md) | Индикатор активности свойства отгрузки.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `Y` (свойство добавляется активным) ||
|| **util**
[`string`](../../data-types.md) | Индикатор, является ли свойство отгрузки служебным. Служебные свойства отгрузки не отображаются в публичной части.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N`
 ||
|| **userProps**
[`string`](../../data-types.md) | Индикатор, входит ли свойство отгрузки в профиль покупателя.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N` ||
|| **isFiltered**
[`string`](../../data-types.md) | Индикатор, доступно ли свойство отгрузки в фильтре на странице списка отгрузок.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N` ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **description**
[`string`](../data-types.md) | Описание свойства отгрузки ||
|| **required**
[`string`](../../data-types.md) | Индикатор обязательности заполнения значения свойства отгрузки.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N` ||
|| **multiple**
[`string`](../../data-types.md) | Индикатор, является ли свойство отгрузки множественным. Для множественных свойств возможно указать несколько значений.
Возможные значения:
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию значение `N` ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор свойства отгрузки ||
|| **defaultValue**
[`any`](../../data-types.md) | Дефолтное значение свойства отгрузки.
Для множественных свойств отгрузки (multiple) поддерживается передача массива значений  ||
|| **settings**
[`object`](../../data-types.md) | Объект в формате `{"field_1": "value_1", ... "field_N": "value_N"}` для передачи дополнительных настроек свойства отгрузки.

Список поддерживаемых ключей этого объекта зависит от типа свойства. Для некоторых типов свойств (например, Y/N) дополнительные свойства не предусмотрены. Описание параметра **settings** для разных типов свойств приведено [ниже](#parametr-settings) ||
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

Если не передано, то по умолчанию выставляется в значение `N` ||
|| **isPayer**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве имени плательщика.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
|| **isEmail**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве e-mail (например, при регистрации нового пользователя при оформлении заказа).
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
|| **isPhone**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве номера телефона.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
|| **isZip**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве почтового индекса.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
|| **isAddress**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве адреса.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N`||
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

Если не передано, то по умолчанию выставляется в значение `N` ||
|| **isLocation4tax**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве местоположения покупателя для определения ставок налогов.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
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

Если не передано, то по умолчанию выставляется в значение `N` ||
|| **isAddressTo**
[`string`](../../data-types.md) | Индикатор необходимости использования значения данного свойства отгрузки в качестве адреса покупателя, куда необходимо доставить заказ для расчета стоимости доставки.
Возможные значения: 
- `Y` — да
- `N` — нет

Если не передано, то по умолчанию выставляется в значение `N` ||
|#

### Параметр settings

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

Если не передано, то по умолчанию выставляется в значение `N` ||
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
    https://**put_your_bitrix24_address**/rest/sale.shipmentproperty.add
    ```

- cURL (OAuth)

    ```http
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"personTypeId":3,"propsGroupId":6,"name":"Телефон (для связи с курьером)","type":"STRING","code":"PHONE","active":"Y","util":"N","userProps":"Y","isFiltered":"N","sort":500,"description":"описание свойства","required":"Y","multiple":"N","settings":{"multiline":"Y","maxlength":100},"xmlId":"","defaultValue":"","isProfileName":"Y","isPayer":"Y","isEmail":"N","isPhone":"N","isZip":"N","isAddress":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.shipmentproperty.add
    ```

- JS

    ```js
    BX24.callMethod(
    'sale.shipmentproperty.add', {
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

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.shipmentproperty.add',
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
[`sale_shipment_property`](../data-types.md) | Объект с информацией о добавленном свойстве отгрузки ||
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
|| `200850000009` | Ошибка возникает при попытке создать свойство отгрузки со значением параметра `multiple`, выставленным в `Y`, в том случае, если не передан параметр `isFiltered`.
Фильтрация по множественным свойствам отгрузок не поддерживается ||
|| `200850000010` | Ошибка возникает при попытке создать свойство отгрузки со значением параметра `multiple`, выставленным в `Y`, в том случае, если значение параметра `isFiltered` не равно `N`.
Фильтрация по множественным свойствам отгрузок не поддерживается ||
|| `200850000011` | Ошибка возникает при попытке создать свойство отгрузки с типом `LOCATION` и значением параметра `isLocation`, выставленным в `Y`, в том случае, если значение параметра `multiple` не указано. 
Не поддерживается множественность у свойств отгрузки, отмеченных индикатором `isLocation` ||
|| `200850000012` | Ошибка возникает при попытке создать свойство отгрузки с типом `LOCATION` и значением параметра `isLocation`, выставленным в `Y`, в том случае, если значение параметра `multiple` не равно `N`. 
Не поддерживается множественность у свойств отгрузки, отмеченных индикатором `isLocation` ||
|| `200850000013` | Ошибка возникает при попытке создать свойство отгрузки с типом `LOCATION` и значением параметра `isLocation4tax`, выставленным в `Y`, в том случае, если значение параметра `multiple` не указано. 
Не поддерживается множественность у свойств отгрузки, отмеченных индикатором `isLocation4tax` ||
|| `200850000014` | Ошибка возникает при попытке создать свойство отгрузки с типом `LOCATION` и значением параметра `isLocation4tax`, выставленным в `Y`, в том случае, если значение параметра `multiple` не равно `N`. 
Не поддерживается множественность у свойств отгрузки, отмеченных индикатором `isLocation4tax` ||
|| `200850000015` | Ошибка возникает при попытке создать свойство отгрузки с типом `STRING` и значением параметра `isProfileName`, выставленным в `Y`, в том случае, если значение параметра `required` не указано. 
Название профиля обязательно и не может быть пустым ||
|| `200850000016` | Ошибка возникает при попытке создать свойство отгрузки с типом [`STRING`](../../data-types.md) и значением параметра `isProfileName`, выставленным в `Y`, в том случае, если значение параметра `required` не равно `Y`. 
Название профиля обязательно и не может быть пустым ||
|| `200040300020` | Недостаточно прав для добавления свойства отгрузки ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-shipment-property-update.md)
- [{#T}](./sale-shipment-property-get.md)
- [{#T}](./sale-shipment-property-list.md)
- [{#T}](./sale-shipment-property-delete.md)
- [{#T}](./sale-shipment-property-get-fields-by-type.md)