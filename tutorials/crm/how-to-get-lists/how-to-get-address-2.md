# Как получить адрес клиента из CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Представленный пример кода решает задачу получения данных адреса контакта. 

Для реализации последовательно выполняется два метода:

* [crm.requisite.list](../../../api-reference/crm/requisites/universal/crm-requisite-list.md)
* [crm.address.list](../../../api-reference/crm/requisites/addresses/crm-address-list.md)

Для певого метода будет необходим ID контакта. Если данные отсутствуют, то получить ID можно методом [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) с фильтром по любому известному полю контакта. Если необходимо получить ID контакта по номеру телефона или почте, используйте туториал [поиска дубликатов по номеру телефона](./search-by-phone-and-email.md).  

Аналогичным образом можно получать данные компании, использовав [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) и изменив  `ENTITY_TYPE_ID` в методе запроса [реквизита](../../../api-reference/crm/requisites/index.md) на код объекта компании — 4.

## 1. Получаем реквизиты, связанные с контактом

Для получения реквизитов используем метод crm.requisite.list с фильтром

  `ENTITY_TYPE_ID`  —  код объекта контакт 3 
  `ENTITY_ID` — ID контакта, в примере 2429

{% note info "" %}

Получение ID реквизита является необходимым шагом, поскольку адрес не имеет прямой привязки к контакту или компании. Адрес привязан к объекту реквизита. 

{% endnote %}

{% list tabs %}

- JS

    ```javascript
   BX24.callMethod(
    "crm.requisite.list",
        {
        filter: { 
             "ENTITY_TYPE_ID": "3", 
             "ENTITY_ID": "2429",      
            },
        select: [
            "ID",
            "ENTITY_TYPE_ID",
            "ENTITY_ID",
            ],
        },
    );

    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../how-to-use-examples.md)

    {% endnote %}

    ```php
    
    ```

{% endlist %}

В результате мы получили ID искомого реквизита —  параметр, необходимый для следующего запроса. 

 ```json

    Array
    (
     [result] => Array
        (
            [0] => Array
                (
                    [ID] => 361
                    [ENTITY_TYPE_ID] => 3
                    [ENTITY_ID] => 2429
                )

        )

     [total] => 1
      
    )

 ```

## 2.  Получаем адрес

Для получения адреса используем метод crm.address.list с фильтром

`ENTITY_TYPE_ID` — код объекта реквизита 8
`ENTITY_ID`  — ID реквизита, полученный в предыдущем запросе, в примере 361
`TYPE_ID` —  тип адреса, если необходимо получить конкретный. Например тип адрес доставки — 11, юридический адрес — 6.

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        "crm.address.list",
        {
            filter: { 
            "ENTITY_TYPE_ID": 8, 
            "ENTITY_ID": 361,  
            "TYPE_ID": 11, 
            },
        },
    );

    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../how-to-use-examples.md)

    {% endnote %}

    ```php
    
    ```

{% endlist %}

В результате мы получили данные адреса для доставки контакта. 

 ```json

    Array
    (
        [result] => Array
            (
                [0] => Array
                    (
                        [TYPE_ID] => 11
                        [ENTITY_TYPE_ID] => 8
                        [ENTITY_ID] => 361
                        [ADDRESS_1] => Гранатный переулок, 10 c1
                        [ADDRESS_2] => 
                        [CITY] => Москва
                        [POSTAL_CODE] => 123001
                        [REGION] => Пресненский район
                        [PROVINCE] => Москва
                        [COUNTRY] => Россия
                        [COUNTRY_CODE] => 
                        [LOC_ADDR_ID] => 571
                        [ANCHOR_TYPE_ID] => 3
                        [ANCHOR_ID] => 2429
                    )

            )

        [total] => 1
        
    )

 ```

## Сопутствующие материалы

* [crm.enum.addresstype](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md) для получения ID типа адреса `TYPE_ID`
* [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) для получения ID типов объектов контакт и реквизит  `ENTITY_TYPE_ID`

## Пример кода

{% list tabs %}

- JS

    ```javascript
    var contactId = "ваш_контакт_ID_здесь"; // Замените на фактический ID контакта

    // Метод для получения ID реквизита
    BX24.callMethod(
        "crm.requisite.list",
        {
            filter: {
                "ENTITY_TYPE_ID": 3,
                "ENTITY_ID": contactId
            },
            select: ["ID"]
        },
        function(requisiteResult) {
            if (requisiteResult.error()) {
                console.error(requisiteResult.error());
            } else {
                var requisites = requisiteResult.data();
                if (requisites.length > 0) {
                    var requisiteId = requisites[0].ID;
                    console.log("Requisite ID:", requisiteId);

                    // Метод для получения адреса
                    BX24.callMethod(
                        "crm.address.list",
                        {
                            filter: {
                                "ENTITY_TYPE_ID": 8,
                                "ENTITY_ID": requisiteId,
                                "TYPE_ID": 11
                            }
                        },
                        function(addressResult) {
                            if (addressResult.error()) {
                                console.error(addressResult.error());
                            } else {
                                var addresses = addressResult.data();
                                if (addresses.length > 0) {
                                    // Создаем таблицу для отображения адресов
                                    var table = [];
                                    addresses.forEach(function(address) {
                                        table.push({
                                            "Адрес": address.ADDRESS_1 || "Не указано",
                                            "Город": address.CITY || "Не указано",
                                            "Индекс": address.POSTAL_CODE || "Не указано",
                                            "Страна": address.COUNTRY || "Не указано"
                                        });
                                    });
                                    console.table(table);
                                } else {
                                    console.log("Адрес для доставки не найден.");
                                }
                            }
                        }
                    );
                } else {
                    console.log("Реквизит не найден.");
                }
            }
        }
    );

    ```


- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../how-to-use-examples.md)

    {% endnote %}

    ```php
    
    ```

{% endlist %}
