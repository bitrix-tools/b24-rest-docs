# Обновить товар catalog.product.update

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет товар торгового каталога.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_product.id`](../data-types.md#catalog_product)| Идентификатор товара.

Для получения идентификаторов товаров используйте метод [catalog.product.list](./catalog-product-list.md)
 ||
|| **fields***
[`object`](../../data-types.md)| Значения полей (подробное описание приведено [ниже](#parametr-fields)) для обновления товара в виде структуры:

```js
'fields': {
    name: 'значение',
    active: 'значение',
    barcodeMulti: 'значение',
    canBuyZero: 'значение',
    code: 'значение',
    createdBy: 'значение',
    dateActiveFrom: 'значение',
    dateActiveTo: 'значение',
    dateCreate: 'значение',
    detailPicture: {
        'fileData': ['название_картинки', 'картинка']
    },
    detailText: 'значение',
    detailTextType: 'значение',
    height: 'значение',
    iblockSectionId: 'значение',
    IblockSection: ['значение_1', ... , 'значение_N'],
    length: 'значение',
    measure: 'значение',
    modifiedBy: 'значение',
    previewPicture: {
        'fileData': ['название_картинки', 'картинка']
    },
    previewText: 'значение',
    previewTextType: 'значение',
    purchasingCurrency: 'значение',
    purchasingPrice: 'значение',
    quantity: 'значение',
    quantityReserved: 'значение',
    quantityTrace: 'значение',
    recurSchemeLength: 'значение',
    recurSchemeType: 'значение',
    sort: 'значение',
    subscribe: 'значение',
    trialPriceId: 'значение',
    vatId: 'значение',
    vatIncluded: 'значение',
    weight: 'значение',
    width: 'значение',
    withoutOrder: 'значение',
    xmlId: 'значение',
    property1: {
        value: 'значение',
        valueId: 'значение'
    },
    ...
    propertyN: {
        value: 'значение',
        valueId: 'значение'
    }
},
``` 
||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md)| Наименование товара ||
|| **active**
[`string`](../../data-types.md)| Активность товара. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию устанавливается значение `Y`
 ||
|| **code**
[`string`](../../data-types.md)| Символьный код ||
|| **xmlId**
[`string`](../../data-types.md)| Внешний код ||
|| **barcodeMulti**
[`string`](../../data-types.md)| Использовать уникальные штрихкоды для каждого экземпляра. Значения:
- `Y` — да
- `N` — нет

По умолчанию устанавливается `N`
 ||
|| **canBuyZero**
[`string`](../../data-types.md)| Возможно ли покупать товар при отсутствии:
- `Y` — да
- `N` — нет

По умолчанию устанавливается `N`
 ||
|| **createdBy**
[`user.id`](../../data-types.md)| Кем создан ||
|| **modifiedBy**
[`user.id`](../../data-types.md)| Кем изменен ||
|| **dateActiveFrom**
[`datetime`](../../data-types.md)| Дата начала активности ||
|| **dateActiveTo**
[`datetime`](../../data-types.md)| Дата окончания активности ||
|| **dateCreate**
[`datetime`](../../data-types.md)| Дата создания ||
|| **iblockSectionId**
[`catalog_section.id`](../data-types.md#catalog_section)| Идентификатор основного раздела информационного блока ||
|| **IblockSection**
[`array`](../../data-types.md)| Массив со всеми разделами, к которым привязан товар ||
|| **measure**
[`catalog_measure.id`](../data-types.md#catalog_measure)| Единица измерения ||
|| **previewText**
[`string`](../../data-types.md)| Описание для анонса ||
|| **detailText**
[`string`](../../data-types.md)| Детальное описание ||
|| **previewPicture**
[`object`](../../data-types.md)| Картинка для анонса.

Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64.

Для удаления картинки используется объект в формате `{remove: 'Y'}` ||
|| **detailPicture**
[`object`](../../data-types.md)| Детальная картинка.

Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64

Для удаления картинки используется объект в формате `{remove: 'Y'}` ||
|| **previewTextType**
[`string`](../../data-types.md)| Тип описания для анонса. Возможные значения:
- `text` — текст
- `html` — HTML

По умолчанию устанавливается `text`
 ||
|| **detailTextType**
[`string`](../../data-types.md)| Тип детального описания. Возможные значения:
- `text` — текст
- `html` — HTML

По умолчанию устанавливается `text` ||
|| **sort**
[`integer`](../../data-types.md)| Сортировка ||
|| **subscribe**
[`string`](../../data-types.md)| Разрешение подписки на товар. Варинты:
- `Y` — да
- `N` — нет
- `D` — по умолчанию

По умолчанию устанавливается значение `D`
 ||
|| **vatId**
[`catalog_vat.id`](../data-types.md#catalog_vat)| Идентификатор НДС ||
|| **vatIncluded**
[`string`](../../data-types.md)| НДС включен в цену:
- `Y` — да
- `N` — нет

По умолчанию устанавливается значение `N`
 ||
|| **height**
[`double`](../../data-types.md)| Высота товара ||
|| **length**
[`double`](../../data-types.md)| Длина товара ||
|| **weight**
[`double`](../../data-types.md)| Вес товара ||
|| **width**
[`double`](../../data-types.md)| Ширина товара ||
|| **quantityTrace**
[`string`](../../data-types.md)| Режим количественного учёта:
- `Y` – включён
- `N` – выключен
- `D` – по умолчанию

По умолчанию устанавливается значение `D`
 ||
|| **purchasingCurrency**
[`string`](../../data-types.md)| Валюта закупочной цены.

Список валют можно получить методом [crm.currency.list](../../crm/currency/crm-currency-list.md).

Не редактируется при включенном складском учёте
 ||
|| **purchasingPrice**
[`double`](../../data-types.md)| Закупочная цена.

Не редактируется при включенном складском учёте
 ||
|| **quantity**
[`double`](../../data-types.md)| Количество.

Не редактируется при включенном складском учёте
 ||
|| **quantityReserved**
[`double`](../../data-types.md)| Зарезервированное количество.

Не редактируется при включенном складском учёте
 ||
|| **recurSchemeLength**
[`integer`](../../data-types.md)| Длина периода оплаты.

По умолчанию устанавливается `0`.

Используется только в [коробочной версии](../../cloud-and-on-premise/index.md) для продажи контента
 ||
|| **recurSchemeType**
[`string`](../../data-types.md)| Единица времени периода оплаты:
- `H` — час
- `D` — день
- `W` — неделя
- `M` — месяц
- `Q` — квартал
- `S` — полугодие
- `Y` — год

По умолчанию устанавливается `D`.

Используется только в [коробочной версии](../../cloud-and-on-premise/index.md) для продажи контента
 ||
|| **trialPriceId**
[`integer`](../../data-types.md)| Товар для пробной оплаты.

Используется только в [коробочной версии](../../cloud-and-on-premise/index.md) для продажи контента
 ||
|| **withoutOrder**
[`string`](../../data-types.md)| Продление без оформления заказа. Значения:
- `Y` — да
- `N` — нет

По умолчанию устанавливается `N`.

Используется только в [коробочной версии](../../cloud-and-on-premise/index.md) для продажи контента
 ||
|| **propertyN**
[`object / array`](../../data-types.md) | Значение свойства товара, где `N` — идентификатор свойства. Свойств может быть несколько.

Значение указывается в формате:
- `{valueId: valueId, value: value}` — для обычного свойства
- `[{valueId: valueId1, value: value1}, ..., {valueId: valueIdN, value: valueN}]` — для множественного свойства
Здесь `valueId` — идентификатор значения свойства, а `value` — значение свойства.

Если не указать `valueId`, то существующее значение будет удалено из базы данных, и заменено на новое, указанное в `value`.

Если свойство множественное, то все существующие значения свойства, для которых не был указан `valueId`, будут удалены.

Идентификаторы `valueId` всех свойств товара можно получить, используя методы [catalog.product.get](./catalog-product-get.md) и [catalog.product.list](./catalog-product-list.md)

 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1267,"fields":{"name":"Товар","active":"Y","barcodeMulti":"Y","canBuyZero":"Y","code":"Tovar","createdBy":1,"dateActiveFrom":"2024-05-28T10:00:00","dateActiveTo":"2024-05-29T10:00:00","dateCreate":"2024-05-27T10:00:00","detailPicture":{"fileData":["detailPicture.png","iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC"]},"detailText":"","detailTextType":"text","height":100,"iblockSectionId":47,"length":100,"measure":5,"modifiedBy":1,"previewPicture":{"fileData":["previewPicture.png","iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC"]},"previewText":"","previewTextType":"text","purchasingCurrency":"RUB","purchasingPrice":1000,"quantity":10,"quantityReserved":1,"quantityTrace":"Y","recurSchemeLength":1,"recurSchemeType":"D","sort":100,"subscribe":"Y","trialPriceId":175,"vatId":1,"vatIncluded":"Y","weight":100,"width":100,"withoutOrder":"Y","xmlId":"1243","property258":{"value":"test","valueId":9816},"property259":[{"value":"test1","valueId":9817},{"value":"test2","valueId":9818}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.product.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1267,"fields":{"name":"Товар","active":"Y","barcodeMulti":"Y","canBuyZero":"Y","code":"Tovar","createdBy":1,"dateActiveFrom":"2024-05-28T10:00:00","dateActiveTo":"2024-05-29T10:00:00","dateCreate":"2024-05-27T10:00:00","detailPicture":{"fileData":["detailPicture.png","iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC"]},"detailText":"","detailTextType":"text","height":100,"iblockSectionId":47,"length":100,"measure":5,"modifiedBy":1,"previewPicture":{"fileData":["previewPicture.png","iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC"]},"previewText":"","previewTextType":"text","purchasingCurrency":"RUB","purchasingPrice":1000,"quantity":10,"quantityReserved":1,"quantityTrace":"Y","recurSchemeLength":1,"recurSchemeType":"D","sort":100,"subscribe":"Y","trialPriceId":175,"vatId":1,"vatIncluded":"Y","weight":100,"width":100,"withoutOrder":"Y","xmlId":"1243","property258":{"value":"test","valueId":9816},"property259":[{"value":"test1","valueId":9817},{"value":"test2","valueId":9818}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.update
    ```

- JS

    ```js
    BX24.callMethod(
        'catalog.product.update', 
        {
            'id': 1267,
            'fields': {
                name: 'Товар',
                active: 'Y',
                barcodeMulti: 'Y',
                canBuyZero: 'Y',
                code: 'Tovar',
                createdBy: 1,
                dateActiveFrom: '2024-05-28T10:00:00',
                dateActiveTo: '2024-05-29T10:00:00',
                dateCreate: '2024-05-27T10:00:00',
                detailPicture: {
                    'fileData': [
                        'detailPicture.png',
                        'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'
                    ]
                },
                detailText: '',
                detailTextType: 'text',
                height: 100,
                iblockSectionId: 47,
                length: 100,
                measure: 5,
                modifiedBy: 1,
                previewPicture: {
                    'fileData': [
                        'previewPicture.png',
                        'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'
                    ]
                },
                previewText: '',
                previewTextType: 'text',
                purchasingCurrency: 'RUB',
                purchasingPrice: 1000,
                quantity: 10,
                quantityReserved: 1,
                quantityTrace: 'Y',
                recurSchemeLength: 1,
                recurSchemeType: 'D',
                sort: 100,
                subscribe: 'Y',
                trialPriceId: 175,
                vatId: 1,
                vatIncluded: 'Y',
                weight: 100,
                width: 100,
                withoutOrder: 'Y',
                xmlId: '1243',
                property258: {
                    value: 'test',
                    valueId: 9816
                },
                property259: [
                    {
                        value: 'test1',
                        valueId: 9817
                    },
                    {
                        value: 'test2',
                        valueId: 9818
                    }
                ],
            },
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.update',
        [
            'id' => 1267,
            'fields' => [
                'name' => 'Товар',
                'active' => 'Y',
                'barcodeMulti' => 'Y',
                'canBuyZero' => 'Y',
                'code' => 'Tovar',
                'createdBy' => 1,
                'dateActiveFrom' => '2024-05-28T10:00:00',
                'dateActiveTo' => '2024-05-29T10:00:00',
                'dateCreate' => '2024-05-27T10:00:00',
                'detailPicture' => [
                    'fileData' => [
                        'detailPicture.png',
                        'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'
                    ]
                ],
                'detailText' => '',
                'detailTextType' => 'text',
                'height' => 100,
                'iblockSectionId' => 47,
                'length' => 100,
                'measure' => 5,
                'modifiedBy' => 1,
                'previewPicture' => [
                    'fileData' => [
                        'previewPicture.png',
                        'iVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BMVEX37ff/­///58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7EAAAOxAGV­Kw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCocSfQFGKP3­+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA/q2TwrXZ­ib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt3qSQtwdJ­Ssku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+28tICq4rT­qXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQEFhV3CCN­Tph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKrihqje7Y9­iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guvayybW1i3­Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWtJSyP21r+­FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0hPtw86hMX­99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xfAAAAAElF­TkSuQmCCiVBORw0KGgoAAAANSUhEUgAAAMgAAADIBAMAAABfdrOtAAAAG1BM­VEX37ff////58fn9+v3+/P779vv8+Pz47/j68/oDfe+3AAAACXBIWXMAAA7E­AAAOxAGVKw4bAAABrUlEQVR4nO3UT0/CMBjH8ccx2I56IFynkHg1SgxHHCoc­SfQFGKP3+e++xL1wn7bPUCAeKF5Mvp+EluX3ZN3ariIAAAAAAAAAAAAAAAAA­/q2TwrXZib94LTbj5GdgVbtKxhdXS+2uL270ajQbL9fz4WzcXwVWtbNeIdmt­3qSQtwdJSsku1/NHkfdVEKriHFey0G4haS3+ty4ZtEGoipMW+VS7T2m0zc+2­8tICq4rTqXtuJV7kWdvsUJtuoc1Hm08ssKo4B1Wn1i6tJu5qrj9dA8lWEzOQ­EFhV3CCNTph2naJ0V+eu0SV+ry3WWQqBVcUNsgiP16ndS4SnzuffL5LWEgKr­ihqje7Y9iDTN6mZ38geDNNX2dEm338b5XPafrmRuj/dj4fULfGoXeFTJ/guv­ayybW1i3Vl7aM7h+3y2c+y07FfeZjaT9GHVrNYXPG/fkIbCqCPf+9d1WKiWt­JSyP21r+FaTrZ8+CULW7XliCUe0PyIUdkD29qQzdv7A0FoSq3R0fqaU78d0h­Ptw86hMX99vAqqJlp757/W3vhMCqAAAAAAAAAAAAAAAAAPxbX82/SILlk9xf­AAAAAElFTkSuQmCC'
                    ]
                ],
                'previewText' => '',
                'previewTextType' => 'text',
                'purchasingCurrency' => 'RUB',
                'purchasingPrice' => 1000,
                'quantity' => 10,
                'quantityReserved' => 1,
                'quantityTrace' => 'Y',
                'recurSchemeLength' => 1,
                'recurSchemeType' => 'D',
                'sort' => 100,
                'subscribe' => 'Y',
                'trialPriceId' => 175,
                'vatId' => 1,
                'vatIncluded' => 'Y',
                'weight' => 100,
                'width' => 100,
                'withoutOrder' => 'Y',
                'xmlId' => '1243',
                'property258' => [
                    'value' => 'test',
                    'valueId' => 9816
                ],
                'property259' => [
                    [
                        'value' => 'test1',
                        'valueId' => 9817
                    ],
                    [
                        'value' => 'test2',
                        'valueId' => 9818
                    ]
                ],
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
    "result": {
        "element": {
            "active": "Y",
            "available": "Y",
            "bundle": "N",
            "canBuyZero": "Y",
            "code": "Tovar",
            "createdBy": 1,
            "dateActiveFrom": "2024-05-28T10:00:00+03:00",
            "dateActiveTo": "2024-05-29T10:00:00+03:00",
            "dateCreate": "2024-05-27T10:00:00+03:00",
            "detailPicture": {
                "id": "6509",
                "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6509\u0026fields%5BproductId%5D=1267",
                "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=detailPicture\u0026fields%5BfileId%5D=6509\u0026fields%5BproductId%5D=1267"
            },
            "detailText": null,
            "detailTextType": "text",
            "height": 100,
            "iblockId": 23,
            "iblockSectionId": 47,
            "id": 1267,
            "length": 100,
            "measure": 5,
            "modifiedBy": 1,
            "name": "Товар",
            "previewPicture": {
                "id": "6508",
                "url": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6508\u0026fields%5BproductId%5D=1267",
                "urlMachine": "\/rest\/catalog.product.download?fields%5BfieldName%5D=previewPicture\u0026fields%5BfileId%5D=6508\u0026fields%5BproductId%5D=1267"
            },
            "previewText": null,
            "previewTextType": "text",
            "property258": {
                "value": "test",
                "valueId": "9816"
            },
            "property259": [
                {
                    "value": "test1",
                    "valueId": "9817"
                },
                {
                    "value": "test2",
                    "valueId": "9818"
                }
            ],
            "purchasingCurrency": "RUB",
            "purchasingPrice": "1000.000000",
            "quantity": 10,
            "quantityReserved": 1,
            "quantityTrace": "Y",
            "sort": 100,
            "subscribe": "Y",
            "timestampX": "2024-06-14T14:26:59+03:00",
            "type": 1,
            "vatId": 1,
            "vatIncluded": "Y",
            "weight": 100,
            "width": 100,
            "xmlId": "1243"
        }
    },
    "time": {
        "start": 1718371618.509701,
        "finish": 1718371619.669789,
        "duration": 1.160088062286377,
        "processing": 0.757836103439331,
        "date_start": "2024-06-14T16:26:58+03:00",
        "date_finish": "2024-06-14T16:26:59+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **element**
[`catalog_product`](../data-types.md#catalog_product) | Объект с информацией о обновленном товаре ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":200040300010,
    "error_description":"Access denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200040300043` | Недостаточно прав для обновления информационного блока ||
|| `200040300050` | Недостаточно прав для привязки элемента информационного блока к разделу ||
|| `200040300040` | Недостаточно прав для обновления товаров ||
|| `200040300000` | Информационный блок с указанным идентификатором не найден ||
|| `200040300010` | Недостаточно прав для чтения торгового каталога ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Раздел с указанным идентификатором не существует ||
|| `0` | Ставка НДС с указанным идентификатором не существует ||
|| `0` | Указанная валюта закупочной цены не существует ||
|| `0` | Пользователь с указанным идентификатором, создавший товар, не существует ||
|| `0` | Пользователь с указанным идентификатором, изменивший товар, не существует ||
|| `0` | Товар с указанным идентификатором не существует в информационном блоке с указанным идентификатором ||
|| `0` | Товар с указанным идентификатором не существует ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-product-add.md)
- [{#T}](./catalog-product-get.md)
- [{#T}](./catalog-product-list.md)
- [{#T}](./catalog-product-download.md)
- [{#T}](./catalog-product-delete.md)
- [{#T}](./catalog-product-get-fields-by-filter.md)