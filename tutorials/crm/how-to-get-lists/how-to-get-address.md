# Как получить адрес клиента из CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Представленный ниже пример кода решает задачу получения данных адреса контакта по его ФИО. 

Для реализации последовательно выполняется три метода:

* [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md)
* [crm.requisite.list](../../../api-reference/crm/requisites/universal/crm-requisite-list.md)
* [crm.address.list](../../../api-reference/crm/requisites/addresses/crm-address-list.md)

Для запроса в каждом последующем методе используем полученные результаты из предыдущего.

Аналогичным образом можно получать данные компании, использовав [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md) и изменив  `ENTITY_TYPE_ID` в методе запроса реквизита на код объекта компании — 4.


## 1. Получаем ID контакта

Для получения ID контакта используем метод crm.contact.list с фильтром по полям `NAME` и `LAST_NAME`.

В примере фильтруем по ФИО, в реальности это может быть любое поле контакта, в том числе номер телефона. Первый шаг можно изменить по аналогии с туториалом [поиска дубликатов по номеру телефона](./search-by-phone-and-email.md).  

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
    'crm.contact.list',
        {
        filter: {
            "NAME": "Вася",
            "LAST_NAME": "Петечкин",
            },
        select: [
            "ID",
            "NAME",
            "LAST_NAME",
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


В результате мы получаем ID искомого контакта — параметр, необходимый для следующего запроса. 

> "result":[{"ID":"2429","NAME":"Вася","LAST_NAME":"Петечкин"}]

## 2. Получаем реквизиты, связанные с контактом

Для получения реквизитов используем метод crm.requisite.list с фильтром

  `ENTITY_TYPE_ID`  —  код объекта контакт 3 
  `ENTITY_ID` — ID полученный в предыдущем запросе

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

> "result":[{"ID":"361","ENTITY_TYPE_ID":"3","ENTITY_ID":"2429"}]

## 3.  Получаем адрес

Для получения адреса используем метод  crm.address.list с фильтром

`ENTITY_TYPE_ID` — код объекта реквизита 8
`ENTITY_ID`  — ID полученный в предыдущем запросе
`TYPE_ID` —  тип адреса, для доставки код 11

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

>"result":[{"TYPE_ID":"11","ENTITY_TYPE_ID":"8","ENTITY_ID":"361","ADDRESS_1":"Гранатный переулок, 10 c1","ADDRESS_2":null "CITY":"Москва","POSTAL_CODE":"123001","REGION":"Пресненский район","PROVINCE":"Москва","COUNTRY":"Россия","COUNTRY_CODE":null "LOC_ADDR_ID":"571","ANCHOR_TYPE_ID":"3","ANCHOR_ID":"2429"}] 

## Сопутствующие материалы

* [crm.enum.addresstype](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md) для получения ID типа адреса `TYPE_ID`
* [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) для получения ID типов объектов контакт и реквизит  `ENTITY_TYPE_ID`

## Пример кода

{% list tabs %}

- JS

    ```javascript
    // Определяем имя и фамилию клиента
    var firstName = "Вася";
    var lastName = "Петечкин";

    BX24.callMethod(
    "crm.contact.list",
    {
        filter: {
           "NAME": firstName,
           "LAST_NAME": lastName
        },
        select: ["ID"]
    },
    function(result) {
        if (result.error()) {
            console.error(result.error());
        } else {
            var contacts = result.data();
            if (contacts.length > 0) {
                var contactId = contacts[0].ID;
                console.log("Contact ID:", contactId);

                // Второй метод для получения ID реквизита
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

                                // Третий метод для получения адреса
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
                                                console.log("Delivery Address:", addresses);
                                                // Здесь можно обработать данные адреса
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
            } else {
                console.log("Контакт не найден.");
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
