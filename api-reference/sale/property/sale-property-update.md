# Обновить свойство заказа sale.property.update

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет свойство заказа. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_order_property.id`](../data-types.md) | Идентификатор свойства заказа ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания свойства заказа ||
|#

### Параметр fields

Общие параметры, актуальные для свойств заказа любого типа:

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
Для множественных свойств заказа (multiple) поддерживается передача массива значений  ||
|| **settings**
[`object`](../../data-types.md) | Объект в формате {"field_1": "value_1", ... "field_N": "value_N"} для передачи дополнительных настроек свойства заказа.

Список поддерживаемых ключей этого объекта зависит от типа свойства. Для некоторых типов свойств (например, Y/N) дополнительные свойства не предусмотрены. Описание параметра **settings** для разных типов свойств приведено в описании метода [`sale.property.add`](sale-property-add.md) ||
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
[`string`](../../data-types.md) | Устаревшее поле. Не используется. ||
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

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":93,"fields":{"personTypeId":3,"propsGroupId":6,"name":"Телефон (для связи с курьером)","type":"STRING","code":"PHONE","active":"Y","util":"N","userProps":"Y","isFiltered":"N","sort":500,"description":"описание свойства","required":"Y","multiple":"N","settings":{"multiline":"Y","maxlength":100},"xmlId":"","defaultValue":"","isProfileName":"Y","isPayer":"Y","isEmail":"N","isPhone":"N","isZip":"N","isAddress":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.property.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":93,"fields":{"personTypeId":3,"propsGroupId":6,"name":"Телефон (для связи с курьером)","type":"STRING","code":"PHONE","active":"Y","util":"N","userProps":"Y","isFiltered":"N","sort":500,"description":"описание свойства","required":"Y","multiple":"N","settings":{"multiline":"Y","maxlength":100},"xmlId":"","defaultValue":"","isProfileName":"Y","isPayer":"Y","isEmail":"N","isPhone":"N","isZip":"N","isAddress":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.property.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.property.update', {
    			id: 93,
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
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
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
        'sale.property.update',
        [
            'id' => 93,
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
[`sale_order_property`](../data-types.md) | Объект с информацией об обновленном свойстве заказа ||
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
|| `200840400001` | Обновляемое свойство заказа не найдено ||
|| `200850000003` | Внутренняя ошибка обновления свойства ||
|| `200850000009` | Ошибка возникает при попытке обновить свойство заказа со значением параметра `multiple`, выставленным в `Y`, в том случае, если не передан параметр `isFiltered`.
Фильтрация по множественным свойствам заказов не поддерживается ||
|| `200850000010` | Ошибка возникает при попытке обновить свойство заказа со значением параметра `multiple`, выставленным в `Y`, в том случае, если значение параметра `isFiltered` не равно `N`.
Фильтрация по множественным свойствам заказов не поддерживается ||
|| `200850000011` | Ошибка возникает при попытке обновить свойство заказа с типом `LOCATION` и значением параметра `isLocation`, выставленным в `Y`, в том случае, если значение параметра `multiple` не указано.
Не поддерживается множественность у свойств заказа отмеченных индикатором `isLocation` ||
|| `200850000012` | Ошибка возникает при попытке обновить свойство заказа с типом `LOCATION` и значением параметра `isLocation`, выставленным в `Y`, в том случае, если значение параметра `multiple` не равно`N`.
Не поддерживается множественность у свойств заказа отмеченных индикатором `isLocation` ||
|| `200850000013` | Ошибка возникает при попытке обновить свойство заказа с типом `LOCATION` и значением параметра `isLocation4tax`, выставленным в `Y`, в том случае, если значение параметра `multiple` не указано.
Не поддерживается множественность у свойств заказа отмеченных индикатором `isLocation4tax` ||
|| `200850000014` | Ошибка возникает при попытке обновить свойство заказа с типом `LOCATION` и значением параметра `isLocation4tax`, выставленным в `Y`, в том случае, если значение параметра `multiple` не равно `N`.
Не поддерживается множественность у свойств заказа отмеченных индикатором `isLocation4tax` ||
|| `200850000015` | Ошибка возникает при попытке обновить свойство заказа с типом `STRING` и значением параметра `isProfileName`, выставленным в `Y`, в том случае, если значение параметра `required` не указано.
Название профиля обязательно и не может быть пустым ||
|| `200850000016` | Ошибка возникает при попытке обновить свойство заказа с типом `STRING` и значением параметра `isProfileName`, выставленным в `Y`, в том случае, если значение параметра `required` не равно `Y`.
Название профиля обязательно и не может быть пустым ||
|| `200040300020` | Недостаточно прав для обновления свойства заказа ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` |Другие ошибки (например, фатальные ошибки) ||
|#

{% include notitle [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-property-add.md)
- [{#T}](./sale-property-get.md)
- [{#T}](./sale-property-list.md)
- [{#T}](./sale-property-delete.md)
- [{#T}](./sale-property-get-fields-by-type.md)