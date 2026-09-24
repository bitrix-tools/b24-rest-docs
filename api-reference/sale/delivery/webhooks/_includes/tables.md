### SHIPMENT

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`sale_order_shipment.id`](/api-reference/sale/data-types.html#sale_order_shipment) | Идентификатор отгрузки.

В случае, если расчет идет по еще несохраненной отгрузке, то значение параметра будет `null`.

Получить идентификаторы отгрузок можно с помощью метода [sale.shipment.list](/api-reference/sale/shipment/sale-shipment-list.html) ||
|| **DELIVERY_SERVICE**
[`object`](/api-reference/data-types.html) | Информация о выбранной службе доставки, ее профиле и настройках (подробное описание приведено [ниже](#delivery_service)). Может быть `null`, если служба доставки не найдена ||
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
|| **EXTRA_SERVICES_VALUES**
[`object[]`](/api-reference/data-types.html) | Массив, содержащий список необходимых дополнительных услуг, выбранных для доставки (подробное описание приведено [ниже](#extra_service_values)) ||
|| **RESPONSIBLE_CONTACT**
[`object`](/api-reference/data-types.html) | Информация о сотруднике, ответственном за доставку со стороны Битрикс24 (подробное описание приведено [ниже](#responsible_contact)). Может быть `null`, если ответственный не указан или не найден ||
|| **RECIPIENT_CONTACT**
[`object`](/api-reference/data-types.html) | Информация о получателе груза (подробное описание приведено [ниже](#recipient_contact)). Может быть `null`, если контакт получателя недоступен ||
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
[`object`](/api-reference/data-types.html) | Информация о родительской службе доставки (подробное описание приведено [ниже](#parent)). Поле отсутствует, если родительская служба не задана ||
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
- `ADDRESS` — адрес
 ||
|| **VALUE**
[`string`](/api-reference/data-types.html) \| [`object`](/api-reference/data-types.html) | Значение свойства. Для типа `object` подробное описание приведено [ниже](#value). Может быть `null`, если значение адреса отсутствует ||
|#

### VALUE

#|
|| **Название**
`тип` | **Описание** ||
|| **LATITUDE**
[`double`](/api-reference/data-types.html) | Географическая широта. Может быть `null` ||
|| **LONGITUDE**
[`double`](/api-reference/data-types.html) | Географическая долгота. Может быть `null` ||
|| **FIELDS**
[`object`](/api-reference/data-types.html) | Детальная информация по адресу доставки (подробное описание приведено [ниже](#fields)) ||
|#

### FIELDS

Состав объекта зависит от заполненных частей адреса. Битрикс24 передает доступные поля из следующего списка.

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
|| **ADM_LEVEL_3**
[`string`](/api-reference/data-types.html) | Единица административно-территориального деления третьего уровня ||
|| **ADM_LEVEL_4**
[`string`](/api-reference/data-types.html) | Единица административно-территориального деления четвертого уровня ||
|| **LOCALITY**
[`string`](/api-reference/data-types.html) | Населенный пункт ||
|| **SUB_LOCALITY**
[`string`](/api-reference/data-types.html) | Район или часть населенного пункта ||
|| **SUB_LOCALITY_LEVEL_1**
[`string`](/api-reference/data-types.html) | Первый уровень части населенного пункта ||
|| **SUB_LOCALITY_LEVEL_2**
[`string`](/api-reference/data-types.html) | Второй уровень части населенного пункта ||
|| **STREET**
[`string`](/api-reference/data-types.html) | Улица ||
|| **BUILDING**
[`string`](/api-reference/data-types.html) | Здание, номер дома ||
|| **ADDRESS_LINE_1**
[`string`](/api-reference/data-types.html) | Адрес (улица, здание, номер дома) ||
|| **ADDRESS_LINE_2**
[`string`](/api-reference/data-types.html) | Дополнительная строка адреса ||
|| **FLOOR**
[`string`](/api-reference/data-types.html) | Этаж ||
|| **ROOM**
[`string`](/api-reference/data-types.html) | Помещение ||
|| **RECIPIENT_COMPANY**
[`string`](/api-reference/data-types.html) | Название компании получателя ||
|| **RECIPIENT**
[`string`](/api-reference/data-types.html) | Имя получателя ||
|| **PO_BOX**
[`string`](/api-reference/data-types.html) | Номер абонентского ящика ||
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
[`double`](/api-reference/data-types.html) | Вес одной позиции товара. Может быть `null`, если вес не указан ||
|| **QUANTITY**
[`double`](/api-reference/data-types.html) | Количество единиц товара ||
|| **DIMENSIONS**
[`object`](/api-reference/data-types.html) | Размеры груза (подробное описание приведено [ниже](#dimensions)). Может быть `null`, если размеры не указаны полностью ||
|#

### DIMENSIONS

#|
|| **Название**
`тип` | **Описание** ||
|| **LENGTH**
[`double`](/api-reference/data-types.html) | Длина товара в миллиметрах ||
|| **WIDTH**
[`double`](/api-reference/data-types.html) | Ширина товара в миллиметрах ||
|| **HEIGHT**
[`double`](/api-reference/data-types.html) | Высота товара в миллиметрах ||
|#

### EXTRA_SERVICES_VALUES {#extra_service_values}

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
[`object[]`](/api-reference/data-types.html) | Массив с номерами телефонов контакта (подробное описание приведено [ниже](#phones)) ||
|#

### RECIPIENT_CONTACT

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](/api-reference/data-types.html) | Полное имя контакта ||
|| **PHONES**
[`object[]`](/api-reference/data-types.html) | Массив с номерами телефонов контакта (подробное описание приведено [ниже](#phones)). Поле отсутствует, если телефоны не указаны ||
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
