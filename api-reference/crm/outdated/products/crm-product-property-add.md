# Добавить свойство товаров

> Название метода: **crm.product.property.add**
>
> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает новое свойство товара.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**
[`array`](../../../data-types.md) | Значения полей для создания свойства товара.

Чтобы узнать требуемый формат полей, выполните метод [crm.product.property.fields](./crm-product-property-fields.md) и посмотрите формат пришедших значений этих полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

### Пример 1

{% list tabs %}

- JS

    ```js
    // Создание свойства пользовательского типа S:HTML
    function addPropertyExample(catalogId)
    {
        BX24.callMethod(
            "crm.product.property.add",
            {
                fields: {
                    "ACTIVE": "Y",
                    "IBLOCK_ID": catalogId,
                    "NAME": "Свойство - HTML/текст",
                    "SORT": 500,
                    "DEFAULT_VALUE": {
                        "TYPE": "html",
                        "TEXT": "<u><b>Вкусные</b> \"<span style=\"color: #00a650;\">африканские бананы</span>\"</u>"
                    },
                    "USER_TYPE_SETTINGS": {
                        "HEIGHT": 300
                    },
                    "USER_TYPE": "HTML",
                    "PROPERTY_TYPE": "S"
                }
            },
            function(result)
            {
                if(result.error())
                    console.error(result.error());
                else
                    console.dir(result.data());
            }
        );
    }

    function getCatalogId()
    {
        BX24.callMethod(
            "crm.catalog.list",
            {filter: {"ORIGINATOR_ID": "", "ORIGIN_ID": ""}},
            function(result)
            {
                if(result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    var catalogId = 0;
                    if (result.total() !== 1)
                    {
                        catalogId = 0
                    }
                    else
                    {
                        data = result.data();
                        if (data && data instanceof Array && typeof(data[0]) === "object" && data[0]["ID"])
                        {
                            catalogId = parseInt(data[0]["ID"]);
                        }
                    }
                    if (catalogId <= 0)
                    {
                        console.error("Не удалось получить идентификатор товарного каталога CRM");
                    }
                    else
                    {
                        addPropertyExample(catalogId);
                    }
                }
            }
        );
    }

    function start()
    {
        getCatalogId();
    }

    start();
    ```

- PHP

    ```php
    require_once('crest.php');

    // Function to add a custom property
    function addPropertyExample($catalogId) {
        $result = CRest::call(
            'crm.product.property.add',
            [
                'fields' => [
                    'ACTIVE' => 'Y',
                    'IBLOCK_ID' => $catalogId,
                    'NAME' => 'Свойство - HTML/текст',
                    'SORT' => 500,
                    'DEFAULT_VALUE' => [
                        'TYPE' => 'html',
                        'TEXT' => '<u><b>Вкусные</b> "<span style="color: #00a650;">африканские бананы</span>"</u>'
                    ],
                    'USER_TYPE_SETTINGS' => [
                        'HEIGHT' => 300
                    ],
                    'USER_TYPE' => 'HTML',
                    'PROPERTY_TYPE' => 'S'
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
    }

    // Function to get catalog ID
    function getCatalogId() {
        $result = CRest::call(
            'crm.catalog.list',
            ['filter' => ['ORIGINATOR_ID' => '', 'ORIGIN_ID' => '']]
        );

        if ($result['error']) {
            echo 'Error: ' . $result['error_description'];
        } else {
            $catalogId = 0;
            if ($result['total'] !== 1) {
                $catalogId = 0;
            } else {
                $data = $result['result'];
                if ($data && is_array($data) && isset($data[0]['ID'])) {
                    $catalogId = intval($data[0]['ID']);
                }
            }
            if ($catalogId <= 0) {
                echo "Не удалось получить идентификатор товарного каталога CRM";
            } else {
                addPropertyExample($catalogId);
            }
        }
    }

    // Start the process
    getCatalogId();
    ```
{% endlist %}

### Пример 2

{% list tabs %}

- JS
  
    ```js
    function addPropertyExample(catalogId)
    {
        BX24.callMethod(
            "crm.product.property.add",
            {
                fields: {
                    "ACTIVE": "Y",
                    "IBLOCK_ID": catalogId,
                    "NAME": "Свойство - Список",
                    "SORT": 510,
                    "MULTIPLE": "Y",
                    "ROW_COUNT": 7,
                    "LIST_TYPE": "L",
                    "PROPERTY_TYPE": "L",
                    "VALUES": {
                        "n0": {
                            "ID": "n0",
                            "VALUE": "Значение списка 1",
                            "SORT": 100,
                            "DEF": "Y"
                        },
                        "n1": {
                            "ID": "n1",
                            "VALUE": "Значение списка 2",
                            "SORT": 200,
                            "DEF": "N"
                        },
                        "n2": {
                            "ID": "n2",
                            "VALUE": "Значение списка 3",
                            "SORT": 300,
                            "DEF": "Y"
                        },
                        "n3": {
                            "ID": "n3",
                            "VALUE": "Значение списка 4",
                            "SORT": 400,
                            "DEF": "N"
                        },
                        "n4": {
                            "ID": "n4",
                            "VALUE": "Значение списка 5",
                            "SORT": 500,
                            "DEF": "N"
                        },
                        "n5": {
                            "ID": "n5",
                            "VALUE": "Значение списка 6",
                            "SORT": 600,
                            "DEF": "N"
                        },
                        "n6": {
                            "ID": "n6",
                            "VALUE": "Значение списка 7",
                            "SORT": 700,
                            "DEF": "N"
                        },
                        "n7": {
                            "ID": "n7",
                            "VALUE": "Значение списка 8",
                            "SORT": 800,
                            "DEF": "N"
                        }
                    }
                }
            },
            function(result)
            {
                if(result.error())
                    console.error(result.error());
                else
                    console.dir(result.data());
            }
        );
    }

    function getCatalogId()
    {
        BX24.callMethod(
            "crm.catalog.list",
            {filter: {"ORIGINATOR_ID": "", "ORIGIN_ID": ""}},
            function(result)
            {
                if(result.error())
                {
                    console.error(result.error());
                }
                else
                {
                    var catalogId = 0;
                    if (result.total() !== 1)
                    {
                        catalogId = 0
                    }
                    else
                    {
                        data = result.data();
                        if (data && data instanceof Array && typeof(data[0]) === "object" && data[0]["ID"])
                        {
                            catalogId = parseInt(data[0]["ID"]);
                        }
                    }
                    if (catalogId <= 0)
                    {
                        console.error("Не удалось получить идентификатор товарного каталога CRM");
                    }
                    else
                    {
                        addPropertyExample(catalogId);
                    }
                }
            }
        );
    }

    function start()
    {
        getCatalogId();
    }

    start();
    ```

- PHP

    ```php
    require_once('crest.php');

    function addPropertyExample($catalogId) {
        $result = CRest::call(
            'crm.product.property.add',
            [
                'fields' => [
                    'ACTIVE' => 'Y',
                    'IBLOCK_ID' => $catalogId,
                    'NAME' => 'Свойство - Список',
                    'SORT' => 510,
                    'MULTIPLE' => 'Y',
                    'ROW_COUNT' => 7,
                    'LIST_TYPE' => 'L',
                    'PROPERTY_TYPE' => 'L',
                    'VALUES' => [
                        'n0' => [
                            'ID' => 'n0',
                            'VALUE' => 'Значение списка 1',
                            'SORT' => 100,
                            'DEF' => 'Y'
                        ],
                        'n1' => [
                            'ID' => 'n1',
                            'VALUE' => 'Значение списка 2',
                            'SORT' => 200,
                            'DEF' => 'N'
                        ],
                        'n2' => [
                            'ID' => 'n2',
                            'VALUE' => 'Значение списка 3',
                            'SORT' => 300,
                            'DEF' => 'Y'
                        ],
                        // Continue for other values...
                    ]
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
    }

    function getCatalogId() {
        $result = CRest::call(
            'crm.catalog.list',
            ['filter' => ['ORIGINATOR_ID' => '', 'ORIGIN_ID' => '']]
        );

        if (isset($result['error'])) {
            echo 'Error: ' . $result['error_description'];
        } else {
            $catalogId = 0;
            if (count($result['result']) !== 1) {
                echo "Не удалось получить идентификатор товарного каталога CRM";
            } else {
                $data = $result['result'];
                if (isset($data[0]['ID'])) {
                    $catalogId = intval($data[0]['ID']);
                    addPropertyExample($catalogId);
                }
            }
        }
    }

    getCatalogId();
    ```
{% endlist %}