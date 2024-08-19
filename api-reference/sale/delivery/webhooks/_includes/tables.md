### SHIPMENT

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_order_shipment.id`](../../../data-types.md#sale_order_shipment) | Идентификатор отгрузки.

В случае, если расчет идет по еще несохраненной отгрузке, то значение параметра будет `null`.

Получить идентификаторы отгрузок можно с помощью метода [sale.shipment.list](../../../shipment/sale-shipment-list.md) ||
|| **DELIVERY_SERVICE**
[`object`](../../../../data-types.md) | Информация о выбранной службе доставке, ее профиле и настройках (подробное описание приведено [ниже](#delivery_service)) ||
|| **PRICE**
[`double`](../../../../data-types.md) | Полная стоимость товаров для клиента в отгрузке ||
|| **CURRENCY**
[`crm_currency.CURRENCY`](../../../../crm/data-types.md) | Код валюты стоимости ||
|| **WEIGHT**
[`double`](../../../../data-types.md) | Полный вес товаров в отгрузке (в граммах) ||
|| **PROPERTY_VALUES**
[`object[]`](../../../../data-types.md) | Массив, содержащий значения свойств отгрузки (подробное описание приведено [ниже](#property_values)) ||
|| **ITEMS**
[`object[]`](../../../../data-types.md) | Массив, содержащий все товары, входящие в отгрузку (подробное описание приведено [ниже](#items)) ||
|| **EXTRA_SERVICE_VALUES**
[`object[]`](../../../../data-types.md) | Массив, содержащий список необходимых дополнительных услуг, выбранных для доставки (подробное описание приведено [ниже](#extra_service_values)) ||
|| **RESPONSIBLE_CONTACT**
[`object`](../../../../data-types.md) | Информация по контакту менеджера, ответственного за доставку со стороны Битрикс24 (подробное описание приведено [ниже](#responsible_contact)) ||
|| **RECIPIENT_CONTACT**
[`object`](../../../../data-types.md) | Информация по контакту грузополучателя (подробное описание приведено [ниже](#recipient_contact)) ||
|#

### DELIVERY_SERVICE

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_delivery_service.ID`](../../../data-types.md#sale_delivery_service) | Идентификатор службы доставки ||
|| **CONFIG**
[`object[]`](../../../../data-types.md) | Значения настроек службы доставки (подробное описание приведено [ниже](#config)) ||
|| **PARENT**
[`object`](../../../../data-types.md) | Информация о родительской службе доставки (подробное описание приведено [ниже](#parent)) ||
|#

### PARENT

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_delivery_service.ID`](../../../data-types.md#sale_delivery_service) | Идентификатор родительской службы доставки ||
|| **CONFIG**
[`object[]`](../../../../data-types.md) | Значения настроек родительской службы доставки (подробное описание приведено [ниже](#config)) ||
|#

### CONFIG

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE**
[`string`](../../../../data-types.md) | Символьный код настройки ||
|| **VALUE**
[`any`](../../../../data-types.md) | Значение настройки ||
|#

### PROPERTY_VALUES

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_shipment_property.id`](../../../data-types.md#sale_shipment_property) | Идентификатор свойства отгрузки.

Получить идентификатор свойств отгрузки можно с помощью метода [sale.shipmentproperty.list](../../../shipment-property/sale-shipment-property-list.md) 
||
|| **TYPE**
[`string`](../../../../data-types.md) | Тип свойства. Возможные значения:

- `STRING`
- `Y`/`N`
- `NUMBER`
- `ENUM`
- `FILE`
- `DATE`
- `LOCATION`
- `ADDRESS`
 ||
|| **VALUE**
[`string`](../../../../data-types.md) \| [`object`](../../../../data-types.md) | Значение свойства. Для типа `object` подробное описание приведено [ниже](#value) ||
|#

### VALUE

#|
|| **Название**
`тип` | **Описание** ||
|| **LATITUDE**
[`double`](../../../../data-types.md) | Географическая широта ||
|| **LONGITUDE**
[`double`](../../../../data-types.md) | Географическая долгота ||
|| **FIELDS**
[`object`](../../../../data-types.md) | Детальная информация по адресу доставки (подробное описание приведено [ниже](#fields)) ||
|#

### FIELDS

#|
|| **Название**
`тип` | **Описание** ||
|| **POSTAL_CODE**
[`string`](../../../../data-types.md) | Почтовый индекс ||
|| **COUNTRY**
[`string`](../../../../data-types.md) | Страна ||
|| **ADM_LEVEL_1**
[`string`](../../../../data-types.md) | Единица административно-территориального деления первого уровня (например, штат или область) ||
|| **ADM_LEVEL_2**
[`string`](../../../../data-types.md) | Единица административно-территориального деления второго уровня (например, район) ||
|| **LOCALITY**
[`string`](../../../../data-types.md) | Населенный пункт ||
|| **STREET**
[`string`](../../../../data-types.md) | Улица ||
|| **BUILDING**
[`string`](../../../../data-types.md) | Здание, номер дома ||
|| **ADDRESS_LINE_1**
[`string`](../../../../data-types.md) | Адрес (улица, здание, номер дома) ||
|#

### ITEMS

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../../../data-types.md) | Название товара ||
|| **PRICE**
[`double`](../../../../data-types.md) | Стоимость одной позиции товара ||
|| **CURRENCY**
[`crm_currency.CURRENCY`](../../../../crm/data-types.md) | Код валюты стоимости ||
|| **WEIGHT**
[`double`](../../../../data-types.md) | Вес одной позиции товара ||
|| **QUANTITY**
[`double`](../../../../data-types.md) | Количество единиц товара ||
|| **DIMENSIONS**
[`object`](../../../../data-types.md) | Размеры груза (подробное описание приведено [ниже](#dimensions)) ||
|#

### DIMENSIONS

#|
|| **Название**
`тип` | **Описание** ||
|| **LENGTH**
[`double`](../../../../data-types.md) | Длина товара (мм.) ||
|| **WIDTH**
[`double`](../../../../data-types.md) | Ширина товара (мм.) ||
|| **HEIGHT**
[`double`](../../../../data-types.md) | Высота товара (мм.) ||
|#

### EXTRA_SERVICE_VALUES

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_delivery_extra_service.ID`](../../../data-types.md#sale_delivery_extra_service) | Идентификатор услуги.

Получить идентификаторы услуг службы доставки можно с помощью метода [sale.delivery.extra.service.get](../../extra-service/sale-delivery-extra-service-get.md) ||
|| **CODE**
[`string`](../../../../data-types.md) | Символьный код дополнительной услуги ||
|| **VALUE**
[`string` \| `double`](../../../../data-types.md) | Значение.

В зависимости от типа ([sale_delivery_extra_service.TYPE](../../../data-types.md#sale_delivery_extra_service)) дополнительной услуги значение формируется различно:

- `checkbox` 
  - `Y` — если услуга требуется
  - `N` — если услуга не требуется
- `enum` — строка, содержащая символьный код выбранного значения списка услуги
- `quantity` — число, отражающее необходимое количество для дополнительной услуги ||
|#

### RESPONSIBLE_CONTACT

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../../../data-types.md) | Полное имя контакта ||
|| **PHONES**
[`object[]`](../../../../data-types.md) | Массив, содержащий информацию о номерах телефонов контакта (подробное описание приведено [ниже](#phones)) ||
|#

### RECIPIENT_CONTACT

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../../../data-types.md) | Полное имя контакта ||
|| **PHONES**
[`object[]`](../../../../data-types.md) | Массив, содержащий информацию о номерах телефонов контакта (подробное описание приведено [ниже](#phones)) ||
|#

### PHONES

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**
[`string`](../../../../data-types.md) | Тип телефона. Возможные значения:

- `WORK`
- `MOBILE`
- `HOME`
- `FAX`
- `PAGER`
 ||
|| **VALUE**
[`string`](../../../../data-types.md) | Номер телефона ||
|#