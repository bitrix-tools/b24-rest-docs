# Как получить адрес клиента из CRM

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Адрес клиента может храниться в Битрикс: 

* в пользовательском поле типа «адрес» любого объекта CRM. Чтобы получить адрес из поля, вызовите метод get или list для нужного типа объекта. 
* в [реквизитах](../../../api-reference/crm/requisites/index.md) контактов, компаний и лидов. В реквизитах в рамках одного поля `Адрес` может храниться несколько адресов с указанием их типов. У одного клиента может быть записано несколько реквизитов. 

Чтобы получить адрес клиента из реквизитов, последовательно выполните два метода:

1. [crm.requisite.list](../../../api-reference/crm/requisites/universal/crm-requisite-list.md)
2. [crm.address.list](../../../api-reference/crm/requisites/addresses/crm-address-list.md)

## 1. Получаем реквизиты, связанные с контактом

Получение ID реквизита — необходимый шаг, так как адрес не имеет прямой привязки к контакту или компании. Адрес привязан к объекту реквизита. 

Для получения реквизитов используем метод crm.requisite.list с фильтром:

* в `ENTITY_TYPE_ID` укажем значение `3` — идентификатор для [типа контакт](../../../api-reference/crm/data-types.md#object_type). Для типа компании используйте  идентификатор `4`
* в `ENTITY_ID` —  ID контакта, в примере `2429`. Получить ID можно методом [crm.contact.list](../../../api-reference/crm/contacts/crm-contact-list.md) с фильтром по любому известному полю контакта. Чтобы получить ID компании, используйте [crm.company.list](../../../api-reference/crm/companies/crm-company-list.md). Если необходимо получить ID контакта или компании по номеру телефона или почте, используйте туториал [«Поиск дубликатов по номеру телефона»](./search-by-phone-and-email.md)  

{% include [Сноска о примерах](../../../_includes/examples.md) %}

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

    ```php  
    require_once('crest.php');

        $result = CRest::call(
            'crm.requisite.list',
            [
                'filter' => [
                    'ENTITY_TYPE_ID' => '3',
                    'ENTITY_ID' => '2429',
                ],
                'select' => [
                    'ID',
                    'ENTITY_TYPE_ID',
                    'ENTITY_ID',
                ],
            ]
        );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```
{% endlist %}

Мы получили ID реквизита `361` — параметр, необходимый для следующего запроса. 

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

Для получения адреса используем метод crm.address.list с фильтром:

* в `ENTITY_TYPE_ID`  укажем значение `8` — идентификатор для [типа реквизит](../../../api-reference/crm/data-types.md#object_type)
* в `ENTITY_ID`  — ID реквизита, полученный в предыдущем запросе, в примере `361`
* в `TYPE_ID` —  [тип адреса](../../../api-reference/crm/auxiliary/enum/crm-enum-address-type.md), если необходимо получить конкретный. Например, тип адрес доставки — `11`, юридический адрес — `6`.

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

    ```php   
    require_once('crest.php');

        $result = CRest::call(
            'crm.address.list',
            [
                'filter' => [
                    'ENTITY_TYPE_ID' => 8,
                    'ENTITY_ID' => 361,
                    'TYPE_ID' => 11,
                ],
            ]
        );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```
{% endlist %}

Мы получили данные адреса для доставки контакта. 

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

    ```php  
    require_once('crest.php');

        $contactId = 'ваш_контакт_ID_здесь'; // Замените на фактический ID контакта

        // Метод для получения ID реквизита
        $requisiteResult = CRest::call(
            'crm.requisite.list',
            [
                'filter' => [
                    'ENTITY_TYPE_ID' => 3,
                    'ENTITY_ID' => $contactId
                ],
                'select' => ['ID']
            ]
        );

        if (isset($requisiteResult['error'])) {
            echo 'Error: ' . $requisiteResult['error_description'];
        } else {
            $requisites = $requisiteResult['result'];
            if (count($requisites) > 0) {
                $requisiteId = $requisites[0]['ID'];
                echo 'Requisite ID: ' . $requisiteId . PHP_EOL;

                // Метод для получения адреса
                $addressResult = CRest::call(
                    'crm.address.list',
                    [
                        'filter' => [
                            'ENTITY_TYPE_ID' => 8,
                            'ENTITY_ID' => $requisiteId,
                            'TYPE_ID' => 11
                        ]
                    ]
                );

                if (isset($addressResult['error'])) {
                    echo 'Error: ' . $addressResult['error_description'];
                } else {
                    $addresses = $addressResult['result'];
                    if (count($addresses) > 0) {
                        // Создаем таблицу для отображения адресов
                        echo '<table border="1">';
                        echo '<tr><th>Адрес</th><th>Город</th><th>Индекс</th><th>Страна</th></tr>';
                        foreach ($addresses as $address) {
                            echo '<tr>';
                            echo '<td>' . ($address['ADDRESS_1'] ?? 'Не указано') . '</td>';
                            echo '<td>' . ($address['CITY'] ?? 'Не указано') . '</td>';
                            echo '<td>' . ($address['POSTAL_CODE'] ?? 'Не указано') . '</td>';
                            echo '<td>' . ($address['COUNTRY'] ?? 'Не указано') . '</td>';
                            echo '</tr>';
                        }
                        echo '</table>';
                    } else {
                        echo 'Адрес для доставки не найден.';
                    }
                }
            } else {
                echo 'Реквизит не найден.';
            }
        }
    ```
{% endlist %}


