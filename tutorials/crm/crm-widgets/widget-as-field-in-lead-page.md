# Встроить виджет в лид в виде пользовательского свойства

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример добавления в карточку лида собственного пользовательского свойства. Работа примера происходит следующим образом: после первого взаимодействия с свойством в карточке редактирования лида всегда, даже в режиме просмотра, будет подгружаться обработчик от приложения. Обработчик производит запрос к внешнему API для получения региона и оператора данного телефона на территории РФ.

Код установки свойств вызывается один раз. Переменная `handlerUrl` — путь до файла обработчика свойства.

{% list tabs %}

- JS

    ```js
    var handlerUrl = 'https://yourdomain.yyy/handler.php';
    var type = 'phone_data';
    var propCode = 'PHONE_DATA'; // max length with prefix UF_CRM_ 20 char

    BX24.callMethod(
        'userfieldtype.add',
        {
            'USER_TYPE_ID': type,
            'HANDLER': handlerUrl,
            'TITLE': 'custom type title',
            'DESCRIPTION': 'custom description ' + type
        },
        function(resultAddPropType) {
            if (resultAddPropType.error()) {
                console.error(resultAddPropType.error() + ': ' + resultAddPropType.error_description());
            } else {
                console.log('property type ' + type + ' has been added successful');
                BX24.callMethod(
                    'crm.lead.userfield.add',
                    {
                        'fields': {
                            'USER_TYPE_ID': type,
                            'FIELD_NAME': propCode,
                            'XML_ID': propCode,
                            'MANDATORY': 'N',
                            'SHOW_IN_LIST': 'Y',
                            'EDIT_IN_LIST': 'Y',
                            'EDIT_FORM_LABEL': 'My string',
                            'LIST_COLUMN_LABEL': 'My string description',
                            'SETTINGS': {}
                        }
                    },
                    function(resultAddProp) {
                        if (resultAddProp.error()) {
                            console.error(resultAddProp.error() + ': ' + resultAddProp.error_description());
                        } else {
                            console.log('property ' + propCode + ' has been added successful');
                        }
                    }
                );
            }
        }
    );
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
    $handlerUrl = 'https://yourdomain.yyy/handler.php';
    $type = 'phone_data';
    $propCode = 'PHONE_DATA';//max length with prefix UF_CRM_ 20 char
    $resultAddPropType = CRest::call(
        'userfieldtype.add',
        [
            'USER_TYPE_ID' => $type,
            'HANDLER' => $handlerUrl,
            'TITLE' => 'custom type title',
            'DESCRIPTION' => 'custom description '.$type
        ]
    );
    if ($resultAddPropType['result'] == true)
    {
        echo 'property type ' . $type . ' has been added successful <br>';
        $resultAddProp = CRest::call(
            'crm.lead.userfield.add',
            [
                'fields' => [
                    'USER_TYPE_ID' => $type,
                    'FIELD_NAME' => $propCode,
                    'XML_ID' => $propCode,
                    'MANDATORY' => 'N',
                    'SHOW_IN_LIST' => 'Y',
                    'EDIT_IN_LIST' => 'Y',
                    'EDIT_FORM_LABEL' => 'My string',
                    'LIST_COLUMN_LABEL' => 'My string description',
                    'SETTINGS' => []
                ]
            ]
        );
        if ($resultAddProp['error'])
        {
            echo $resultAddProp['error'] . ': ' . $resultAddProp['error_description'];
        }
        else
        {
            echo 'property ' . $propCode . ' has been added successful <br>';
        }
    }
    elseif ($resultAddPropType['error'])
    {
        echo $resultAddPropType['error'] . ': ' . $resultAddPropType['error_description'];
    }
    ?>
    ```

{% endlist %}

Файл обработчика, который вы указали в переменной `handlerUrl` в коде выше:

{% list tabs %}

- JS

    ```js
    var placementOptions = BX24.getPlacementOptions();
    if (BX24.getPlacement() === 'USERFIELD_TYPE') {
        var value = placementOptions.VALUE;
        if (placementOptions.ENTITY_ID === 'CRM_LEAD' && placementOptions.ENTITY_VALUE_ID > 0) {
            BX24.callMethod(
                'crm.lead.list',
                {
                    'filter': { 'ID': parseInt(placementOptions.ENTITY_VALUE_ID) },
                    'select': ['ID', 'PHONE']
                },
                function(result) {
                    if (result.error()) {
                        console.error(result.error() + ': ' + result.error_description());
                    } else {
                        if (result.data()[0] && result.data()[0].PHONE[0] && result.data()[0].PHONE[0].VALUE) {
                            value = result.data()[0].PHONE[0].VALUE.trim();
                            fetch('http://api.bitroid.info/phone/?q=' + value)
                                .then(response => response.json())
                                .then(valueData => {
                                    if (!valueData.error) {
                                        value = [valueData.org, valueData.region].join(', ');
                                    } else {
                                        value = 'error: ' + valueData.error;
                                    }
                                    updateValue(value);
                                })
                                .catch(() => {
                                    value = 'no data in base' + value;
                                    updateValue(value);
                                });
                        } else {
                            value = 'no data';
                            updateValue(value);
                        }
                    }
                }
            );
        } else {
            updateValue(value);
        }
    }

    function updateValue(value) {
        document.body.style.backgroundColor = placementOptions.MODE === 'edit' ? '#fff' : '#f9fafb';
        if (placementOptions.MODE === 'edit') {
            document.body.innerHTML = '<input type="text" style="width: 90%;" value="' + value + '" onke yup="setValue(this.value)">';
            setValue(value);
        } else {
            document.body.innerHTML = value;
        }
    }

    function setValue(value) {
        BX24.placement.call('setValue', value);
    }
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
    $placementOptions = isset($_REQUEST['PLACEMENT_OPTIONS']) ? json_decode($_REQUEST['PLACEMENT_OPTIONS'], true) : array();
    if ($_REQUEST['PLACEMENT'] == 'USERFIELD_TYPE'):
        $value = htmlspecialchars($placementOptions['VALUE']);
        if ($placementOptions['ENTITY_ID'] == 'CRM_LEAD' && $placementOptions['ENTITY_VALUE_ID'] > 0)
        {
            $result = CRest::call(
                'crm.lead.list',
                [
                    'filter' => ['ID' => intVal($placementOptions['ENTITY_VALUE_ID'])],
                    'select' => ['ID', 'PHONE']
                ]
            );
            if (!empty($result['result'][0]['PHONE'][0]['VALUE']))
            {
                $value = trim($result['result'][0]['PHONE'][0]['VALUE']);
                $data = file_get_contents('http://api.bitroid.info/phone/?q='.$value);
                if($data)
                {
                    $valueData = json_decode($data,true);
                    if(!$valueData['error'])
                    {
                        $value = implode(', ', [$valueData['org'],$valueData['region']]);
                    }
                    else
                    {
                        $value = 'error: '.$valueData['error'];
                    }
                }
                else
                {
                    $value = 'no data in base'.$value;
                }
            }
            else
            {
                $value = 'no data';
            }
        }
        ?>
        <!DOCTYPE html>
        <html>
            <head>
                <script src="//api.bitrix24.com/api/v1/dev/"></script>
            </head>
            <body style="margin: 0; padding: 0; background-color: <?=$placementOptions['MODE'] === 'edit' ? '#fff'
                : '#f9fafb'?>;">
                <?
                if ($placementOptions['MODE'] === 'edit'): ?>
                    <input type="text" style="width: 90%;" value='<?=$value?>' onkeyup="setValue(this.value)">
                    <script>
                        function setValue(value)
                        {
                            BX24.placement.call('setValue', value);
                        }
                        BX24.placement.call('setValue', '<?=$value?>');
                    </script>
                <? else: ?>
                    <?=$value?>
                <? endif;
                ?>
            </body>
        </html>
    <? endif;?>
    ```

{% endlist %}

