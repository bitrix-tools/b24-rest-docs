### SHIPMENT

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_order_shipment.id`](/api-reference/sale/data-types.html#sale_order_shipment) | Идентификатор отгрузки.

В случае, если расчет идет по еще несохраненной отгрузке, то значение параметра будет `null`.

Получить идентификаторы отгрузок можно с помощью метода [sale.shipment.list](/api-reference/sale/shipment/sale-shipment-list.html) ||
|| **DELIVERY_SERVICE**
[`object`](/api-reference/data-types.html) | Информация о выбранной службе доставке, ее профиле и настройках (подробное описание приведено [ниже](#delivery_service)) ||
|| **PRICE**
[`double`](/api-reference/data-types.html) | Полная стоимость товаров для клиента в отгрузке ||
|| **CURRENCY**
[`crm_currency.CURRENCY`](/api-reference/crm/data-types.html) | Код валюты стоимости ||
|| **WEIGHT**
[`double`](/api-reference/data-types.html) | Полный вес товаров в отгрузке (в граммах) ||
|| **PROPERTY_VALUES**
[`object[]`](/api-reference/data-types.html) | Массив, содержащий значения свойств отгрузки (подробное описание приведено [ниже](#property_values)) ||
|| **ITEMS**
[`object[]`](/api-reference/data-types.html) | Массив, содержащий все товары, входящие в отгрузку (подробное описание приведено [ниже](#items)) ||
|| **EXTRA_SERVICE_VALUES**
[`object[]`](/api-reference/data-types.html) | Массив, содержащий список необходимых дополнительных услуг, выбранных для доставки (подробное описание приведено [ниже](#extra_service_values)) ||
|| **RESPONSIBLE_CONTACT**
[`object`](/api-reference/data-types.html) | Информация по контакту менеджера, ответственного за доставку со стороны Битрикс24 (подробное описание приведено [ниже](#responsible_contact)) ||
|| **RECIPIENT_CONTACT**
[`object`](/api-reference/data-types.html) | Информация по контакту грузополучателя (подробное описание приведено [ниже](#recipient_contact)) ||
|#

### DELIVERY_SERVICE

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_delivery_service.ID`](/api-reference/sale/data-types.html#sale_delivery_service) | Идентификатор службы доставки ||
|| **CONFIG**
[`object[]`](/api-reference/data-types.html) | Значения настроек службы доставки (подробное описание приведено [ниже](#config)) ||
|| **PARENT**
[`object`](/api-reference/data-types.html) | Информация о родительской службе доставки (подробное описание приведено [ниже](#parent)) ||
|#

### PARENT

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_delivery_service.ID`](/api-reference/sale/data-types.html#sale_delivery_service) | Идентификатор родительской службы доставки ||
|| **CONFIG**
[`object[]`](/api-reference/data-types.html) | Значения настроек родительской службы доставки (подробное описание приведено [ниже](#config)) ||
|#

### CONFIG

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE**
[`string`](/api-reference/data-types.html) | Символьный код настройки ||
|| **VALUE**
[`any`](/api-reference/data-types.html) | Значение настройки ||
|#

### PROPERTY_VALUES

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_shipment_property.id`](/api-reference/sale/data-types.html#sale_shipment_property) | Идентификатор свойства отгрузки.

Получить идентификатор свойств отгрузки можно с помощью метода [sale.shipmentproperty.list](/api-reference/sale/shipment-property/sale-shipment-property-list.html) 
||
|| **TYPE**
[`string`](/api-reference/data-types.html) | Тип свойства. Возможные значения:

- `STRING` — строка
- `Y`/`N` — да или нет
- `NUMBER` — число
- `ENUM` — список
- `FILE` — файл
- `DATE` — дата
- `LOCATION` — местоположение
- `ADDRESS` — адрес
 ||
|| **VALUE**
[`string`](/api-reference/data-types.html) \| [`object`](/api-reference/data-types.html) | Значение свойства. Для типа `object` подробное описание приведено [ниже](#value) ||
|#

### VALUE

#|
|| **Название**
`тип` | **Описание** ||
|| **LATITUDE**
[`double`](/api-reference/data-types.html) | Географическая широта ||
|| **LONGITUDE**
[`double`](/api-reference/data-types.html) | Географическая долгота ||
|| **FIELDS**
[`object`](/api-reference/data-types.html) | Детальная информация по адресу доставки (подробное описание приведено [ниже](#fields)) ||
|#

### FIELDS

#|
|| **Название**
`тип` | **Описание** ||
|| **POSTAL_CODE**
[`string`](/api-reference/data-types.html) | Почтовый индекс ||
|| **COUNTRY**
[`string`](/api-reference/data-types.html) | Страна ||
|| **ADM_LEVEL_1**
[`string`](/api-reference/data-types.html) | Единица административно-территориального деления первого уровня (например, штат или область) ||
|| **ADM_LEVEL_2**
[`string`](/api-reference/data-types.html) | Единица административно-территориального деления второго уровня (например, район) ||
|| **LOCALITY**
[`string`](/api-reference/data-types.html) | Населенный пункт ||
|| **STREET**
[`string`](/api-reference/data-types.html) | Улица ||
|| **BUILDING**
[`string`](/api-reference/data-types.html) | Здание, номер дома ||
|| **ADDRESS_LINE_1**
[`string`](/api-reference/data-types.html) | Адрес (улица, здание, номер дома) ||
|#

### ITEMS

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](/api-reference/data-types.html) | Название товара ||
|| **PRICE**
[`double`](/api-reference/data-types.html) | Стоимость одной позиции товара ||
|| **CURRENCY**
[`crm_currency.CURRENCY`](/api-reference/crm/data-types.html) | Код валюты стоимости ||
|| **WEIGHT**
[`double`](/api-reference/data-types.html) | Вес одной позиции товара ||
|| **QUANTITY**
[`double`](/api-reference/data-types.html) | Количество единиц товара ||
|| **DIMENSIONS**
[`object`](/api-reference/data-types.html) | Размеры груза (подробное описание приведено [ниже](#dimensions)) ||
|#

### DIMENSIONS

#|
|| **Название**
`тип` | **Описание** ||
|| **LENGTH**
[`double`](/api-reference/data-types.html) | Длина товара (мм.) ||
|| **WIDTH**
[`double`](/api-reference/data-types.html) | Ширина товара (мм.) ||
|| **HEIGHT**
[`double`](/api-reference/data-types.html) | Высота товара (мм.) ||
|#

### EXTRA_SERVICE_VALUES

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_delivery_extra_service.ID`](/api-reference/sale/data-types.html#sale_delivery_extra_service) | Идентификатор услуги.

Получить идентификаторы услуг службы доставки можно с помощью метода [sale.delivery.extra.service.get](/api-reference/sale/delivery/extra-service/sale-delivery-extra-service-get.html) ||
|| **CODE**
[`string`](/api-reference/data-types.html) | Символьный код дополнительной услуги ||
|| **VALUE**
[`string` \| `double`](/api-reference/data-types.html) | Значение.

В зависимости от типа ([sale_delivery_extra_service.TYPE](/api-reference/sale/data-types.html#sale_delivery_extra_service)) дополнительной услуги значение формируется различно:

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
[`string`](/api-reference/data-types.html) | Полное имя контакта ||
|| **PHONES**
[`object[]`](/api-reference/data-types.html) | Массив, содержащий информацию о номерах телефонов контакта (подробное описание приведено [ниже](#phones)) ||
|#

### RECIPIENT_CONTACT

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](/api-reference/data-types.html) | Полное имя контакта ||
|| **PHONES**
[`object[]`](/api-reference/data-types.html) | Массив, содержащий информацию о номерах телефонов контакта (подробное описание приведено [ниже](#phones)) ||
|#

### PHONES

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE**
[`string`](/api-reference/data-types.html) | Тип телефона. Возможные значения:

- `WORK` — рабочий
- `MOBILE` — мобильный
- `HOME` — домашний
- `FAX` — факс
- `PAGER` — пейджер
 ||
|| **VALUE**
[`string`](/api-reference/data-types.html) | Номер телефона ||
|#
