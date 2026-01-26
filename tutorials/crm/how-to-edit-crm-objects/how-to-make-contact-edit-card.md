# Как сделать свою карточку редактирования контакта

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример автоматической генерации карточки редактирования контакта со всеми полями, созданными в Битрикс24, на странице приложения.

Некоторые типы полей не реализованы в данном примере, на месте полей с неподдерживаемым типом будет выводиться сообщение *field not support*.

{% note info %}

Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

{% endnote %}

Код генерируемой формы:

```php
<?
$ID = intVal($_REQUEST['ID']);

    class CPrintForm
    {
        /**
         * @return string html select
         * @var $arParams array params input keys: 'NAME', 'ID', 'TYPE', 'REQUIRED', 'CHECKED', 'DISABLE', 'MULTIPLE', 'VALUE'
         */
        public static function input($arParams)
        {
            $count = 0;
            $i = 0;
            $sResult = '';
            if ($arParams['MULTIPLE'] && $arParams['TYPE'] != 'file')
            {
                $count = 2;
            }
            $value = $arParams['VALUE'];
            while ($i <= $count)
            {

                if ($count > 0)
                {
                    $value = $arParams['VALUE'][$i];
                }
                $sResult .= '<input class="form-control' . (($arParams['TYPE'] == 'file') ? '-file' : '') . '"';
                if (!empty($arParams['ID']))
                {
                    $sResult .= ' id="' . $arParams['ID'] . '"';
                }
                if (!empty($arParams['NAME']))
                {
                    $sResult .= ' name="' . $arParams['NAME'] . '' . (($arParams['MULTIPLE']) ? '[]' : '') . '"';
                }
                if (!empty($arParams['TYPE']))
                {
                    $sResult .= ' type="' . $arParams['TYPE'] . '"';
                }
                if (!empty($arParams['REQUIRED']))
                {
                    $sResult .= ' required';
                }
                if (!empty($arParams['DISABLE']))
                {
                    $sResult .= ' disabled';
                }
                if (!empty($arParams['CHECKED']))
                {
                    $sResult .= ' checked';
                }
                if (!empty($arParams['MULTIPLE']))
                {//sometimes work, not for standard type="text"
                    $sResult .= ' multiple';
                }
                if (!empty($arParams['VALUE']))
                {
                    $sResult .= ' value="' . $value . '"';
                }
                $sResult .= '>';
                $i++;
            }

            return $sResult;
        }

        /**
         * @return string html select
         * @var $arList array of select options where key is value option and value is title
         * @var $arParams array settings of select params keys: 'NAME', 'ID', 'REQUIRED', 'DISABLE','MULTIPLE', 'VALUE'
         */
        public static function select($arParams, $arList)
        {
            $sResult = '';
            if (!empty($arList) && is_array($arList))
            {
                $sResult .= '<select class="form-control"' .
                    (($arParams['NAME']) ? ' name="' .
                        $arParams['NAME'] .
                        '' .
                        (($arParams['MULTIPLE']) ? '[]' : '') .
                        '"' : '') .
                    (($arParams['ID']) ? ' id="' . $arParams['ID'] . '"' : '') .
                    (($arParams['REQUIRED']) ? ' required' : '') .
                    (($arParams['DISABLE']) ? ' disabled' : '') .
                    (($arParams['MULTIPLE']) ? ' multiple' : '') .
                    '>';
                $value = [];
                if (is_array($arParams['VALUE']))
                {
                    $value = $arParams['VALUE'];
                }
                else
                {
                    $value[] = ($arParams['VALUE']) ? $arParams['VALUE'] : '';
                }
                foreach ($arList as $key => $title)
                {
                    $sResult .= '<option value="' .
                        $key .
                        '" ' .
                        ((in_array($key, $value)) ? ' selected' : '') .
                        '>' .
                        $title .
                        '</option>';
                }
                $sResult .= '</select>';
            }

            return $sResult;
        }

    }

    $arData = [
        //Get all fields and standard enum fields
        'FIELDS' => [
            'method' => 'crm.contact.fields',
            'params' => []
        ],
        'FIELD_VALUES_SOURCE_ID' => [
            'method' => 'crm.status.list',//only 50 first values
            'params' => ['filter' => ['ENTITY_ID' => '$result[FIELDS][SOURCE_ID][statusType]']]
        ],
        'FIELD_VALUES_STATUS_ID' => [
            'method' => 'crm.status.list',//only 50 first values
            'params' => ['filter' => ['ENTITY_ID' => '$result[FIELDS][STATUS_ID][statusType]']]
        ],
        'FIELD_VALUES_CURRENCY' => [
            'method' => 'crm.currency.list',//only 50 first values
            'params' => ['filter' => ['ENTITY_ID' => '$result[FIELDS][STATUS_ID][statusType]']]
        ],
        'OWNER_TYPE' => [
            'method' => 'crm.enum.ownertype',
            'params' => []
        ],
    ];
    if ($ID > 0)
    {//get item and standard enum field values if is update form
        $arData['ITEM'] = [
            'method' => 'crm.contact.get',
            'params' => ['id' => $ID]
        ];
        $arData['VALUE_LEAD_ID'] = [
            'method' => 'crm.lead.get',
            'params' => ['id' => '$result[ITEM][LEAD_ID]']
        ];
    }

    $arResult = CRest::callBatch($arData, 0);

    $arResult = $arResult['result']['result'];
    $sResult = '';
    $sResultCustom = '';
if (is_array($arResult['FIELDS'])):
    if (isset($arResult['FIELDS']['COMPANY_ID']))//deprecated use crm.contact.company.items.get
    {
        unset($arResult['FIELDS']['COMPANY_ID']);
    }
    if (isset($arResult['FIELDS']['COMPANY_IDS']))//use crm.contact.company.items.get
    {
        unset($arResult['FIELDS']['COMPANY_IDS']);
    }

    foreach ($arResult['FIELDS'] as $key =&gt; $arField)
    {
        $value = '';
        $return = '';
        if (!empty($arResult['ITEM'][$key]))
        {
            $value = $arResult['ITEM'][$key];
        }
        $arList = (isset($arResult['FIELD_VALUES_' . $key])) ? $arResult['FIELD_VALUES_' . $key] : [];
        switch ($arField['type'])
        {
            case 'crm_status':
                if (empty($arList))
                {
                    $arFieldsStatus = \CRest::get(
                        'crm.status.list',
                        ['filter' =&gt; ['ENTITY_ID' =&gt; $arField['statusType']]]
                    );
                    if (!empty($arFieldsStatus['result']))
                    {
                        $arList = $arFieldsStatus['result'];
                    }
                }
                $arList = array_column($arList, 'NAME', 'STATUS_ID');

                $return = CPrintForm::select(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value
                    ],
                    $arList
                );
                break;
            case 'crm_currency':
                $arList = array_column($arResult['FIELD_VALUES_CURRENCY'], 'FULL_NAME', 'CURRENCY');
                $return = CPrintForm::select(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value
                    ],
                    $arList
                );
                break;
            case 'enumeration':
                if (!empty($arField['items']))
                {
                    $arList = array_column($arField['items'], 'VALUE', 'ID');
                }

                $return = CPrintForm::select(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value
                    ],
                    $arList
                );
                break;
            case 'crm_multifield'://its simple example: need multifield, check data type and more...
                if (!empty($value) &amp;&amp; is_array($value))
                {
                    $value = reset($value)['VALUE'];
                }
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; false,
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'text',
                    ]
                );
                break;
            case 'crm_lead':
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'text',
                    ]
                );

                if (!empty($arResult['VALUE_LEAD_ID']) &amp;&amp; $value == $arResult['VALUE_LEAD_ID']['ID'])
                {
                    $return .= '(' . $arResult['VALUE_LEAD_ID']['TITLE'] . ')';
                }
                break;
            case 'file':
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'file',
                    ]
                );
                if ($arField['isMultiple'])
                {
                    if (is_array($value))
                    {
                        foreach ($value as $k =&gt; $val)
                        {
                            if (!empty($val['downloadUrl']))
                            {
                                $return .= '&lt;br/&gt;&lt;a href="' . $val['downloadUrl'] . '"&gt;old file ' . $k . '&lt;/a&gt;';
                            }
                        }
                    }
                }
                else
                {
                    if (!empty($value['downloadUrl']))
                    {
                        $return .= '&lt;br/&gt;&lt;a href="' . $value['downloadUrl'] . '"&gt;old file&lt;/a&gt;';
                    }
                }
                break;
            case 'date':
                if (!empty($value))
                {
                    $value = date('Y-m-d', strtotime($value));
                }
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'date',
                    ]
                );
                break;
            case 'datetime':
                if (!empty($value))
                {
                    $value = date('Y-m-d\TH:i:s', strtotime($value));
                }
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'datetime-local',
                    ]
                );
                break;
            case 'char':
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; 'Y',
                        'CHECKED' =&gt; ($value == 'Y') ? true : false,
                        'TYPE' =&gt; 'checkbox',
                    ]
                );
                break;

            case 'boolean':
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; '1',
                        'CHECKED' =&gt; ($value == 'Y') ? true : false,
                        'TYPE' =&gt; 'checkbox',
                    ]
                );
                break;
            case 'double':
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'number'
                    ]
                );
                break;
            case 'user':
                $arUser = [];
                if (!empty($value))
                {
                    $arUser = CRest::get('user.get', ['filter' =&gt; ['ID' =&gt; $value]]);
                }
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'number'
                    ]
                );
                if (!empty($arUser['result']))
                {
                    $return .= '(';
                    $i = 0;
                    foreach ($arUser['result'] as $val)
                    {
                        $i++;
                        if ($i &gt; 1)
                        {
                            $return .= ', ';
                        }
                        $return .= implode(' ', [$val['NAME'], $val['LAST_NAME']]);
                    }
                    $return .= ')';
                }

                break;
            case 'url':
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'text',
                    ]
                );
                break;
            case 'integer':
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'number',
                    ]
                );
                break;
            case 'money':
                list($money, $currency) = explode('|', $value);
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $money,
                        'TYPE' =&gt; 'number',
                    ]
                );
                $arList = array_column($arResult['FIELD_VALUES_CURRENCY'], 'FULL_NAME', 'CURRENCY');
                $return .= CPrintForm::select(
                    [
                        'NAME' =&gt; $key . '_CURRENCY',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $currency
                    ],
                    $arList
                );
                break;
            case 'address':
                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'text',
                    ]
                );
                break;
            case 'resourcebooking':
                //some code booking
                $return = 'field not support';
                break;
            default:

                $return = CPrintForm::input(
                    [
                        'NAME' =&gt; 'form[' . $key . ']',
                        'REQUIRED' =&gt; $arField['isRequired'],
                        'DISABLE' =&gt; $arField['isReadOnly'],
                        'MULTIPLE' =&gt; $arField['isMultiple'],
                        'VALUE' =&gt; $value,
                        'TYPE' =&gt; 'text',
                    ]
                );

                break;
        }

        if (strpos($key, 'UF_') === 0)
        {
            $sResultCustom .= '&lt;div class="col-4 mt-3"&gt;' .
                (($arField['formLabel']) ? $arField['formLabel'] : $arField['title']) .
                ': ' .
                '&lt;/div&gt;';
            $sResultCustom .= '&lt;div class="col-6 mt-3"&gt;' . $return . '&lt;/div&gt;';
        }
        else
        {
            $sResult .= '&lt;div class="col-4 mt-3"&gt;' .
                (($arField['formLabel']) ? $arField['formLabel'] : $arField['title']) .
                ': ' .
                '&lt;/div&gt;';
            $sResult .= '&lt;div class="col-6 mt-3"&gt;' . $return . '&lt;/div&gt;';
        }
    }

    ?&gt;
    &lt;link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            crossorigin="anonymous"&gt;
    &lt;script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"&gt;&lt;/script&gt;
    &lt;script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
            crossorigin="anonymous"&gt;&lt;/script&gt;
    &lt;script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
            crossorigin="anonymous"&gt;&lt;/script&gt;
    &lt;script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"&gt;&lt;/script&gt;
    &lt;script&gt;
            $(document).ready(function () {
                $('#auto_form').on('submit', function (el) {//event submit form
                    el.preventDefault();//the default action of the event will not be triggered
                    var formData = new FormData(this);
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", 'auto_form.php');
                    xhr.onreadystatechange = function () {
                        if (this.readyState === 4)
                        {
                            if (this.status &gt;= 200 &amp;&amp; this.status &lt; 400)
                            {
                                // Success!
                                var resp = this.responseText;
                                try
                                {
                                    var json = JSON.parse(resp);
                                    if (typeof json.message !== 'undefined')
                                    {
                                        alert(json.message);
                                    }
                                } catch (e)
                                {
                                    return false;
                                }
                            }
                            else
                            {
                                alert('error');
                            }
                        }
                    };
                    xhr.send(formData);
                });
            });
        &lt;/script&gt;
    &lt;div class="container"&gt;
            &lt;form id="auto_form" action="" enctype="multipart/form-data" method="post"&gt;
                &lt;?if (!empty($arResult['ITEM']['ID']))://for update entity	?&gt;
                    &lt;input type="hidden" name="form[ID]" value="&lt;?=$arResult[ 'ITEM' ][ 'ID' ]	?&gt;"&gt;
                &lt;?endif;?&gt;
                &lt;h2&gt;Standard fields&lt;/h2&gt;
                &lt;div class="row"&gt;
                    &lt;?=$sResult?&gt;
                &lt;/div&gt;
                &lt;h2&gt;Custom fields&lt;/h2&gt;
                &lt;div class="row"&gt;
                    &lt;?=$sResultCustom?&gt;
                &lt;/div&gt;
                &lt;div class="row"&gt;
                    &lt;div class="col-sm-10 mt-5"&gt;
                        &lt;input type="submit" class="btn btn-primary" value="Submit"&gt;
                    &lt;/div&gt;
                &lt;/div&gt;
            &lt;/form&gt;
        &lt;/div&gt;						
			
    &lt;? endif;?&gt;
</pre>
```

Файл **auto_form.php**:

```php
<?

    $arForm = [];
    foreach ($_POST['form'] as $key => $item)
    {
        if (is_array($item))
        {
            $arForm[$key] = [];
            foreach ($item as $k => $val)
            {
                $arForm[$key][$k] = htmlspecialchars($val);
            }
        }
        else
        {
            $arForm[$key] = htmlspecialchars($item);
        }
    }
    //make array multiple files for add to custom field
    if (!empty($_FILES['form']['tmp_name']) && is_array($_FILES['form']['tmp_name']))
    {
        foreach ($_FILES['form']['tmp_name'] as $key => $files)
        {
            if (is_array($files))
            {
                foreach ($files as $k => $file)
                {
                    $arForm[$key][$k] = [
                        "fileData" => [
                            $_FILES['form']['name'][$key][$k],
                            base64_encode(file_get_contents($file))
                        ]
                    ];
                }
            }
            else
            {
                $arForm[$key] = [
                    "fileData" => [
                        $_FILES['form']['name'][$key],
                        base64_encode(file_get_contents($files))
                    ]
                ];
            }
        }
    }
    $arResult = CRest::get('crm.contact.fields', []);
    if (!empty($arResult['result']))
    {
        foreach ($arResult['result'] as $key => $prop)
        {
            if (!isset($arForm[$key]))
            {
                if (!$prop['isReadOnly'] && $prop['type'] != 'file')
                {
                    if ($prop['type'] == 'enumeration' && $prop['isMultiple'])
                    {
                        //if type multiple enumeration to clean selected value need send: [false]
                        $arForm[$key] = [false];
                    }
                    elseif ($prop['isMultiple'])
                    {
                        $arForm[$key] = [];
                    }
                    else
                    {
                        $arForm[$key] = '';
                    }
                }
                continue;
            }
            //here may be any check field example by type
            if ($prop['type'] == 'crm_multifield')
            {
                if (isset($arForm[$key]))
                {
                    $arForm[$key] = [['VALUE' => $arForm[$key]]];
                }
            }
            elseif ($prop['type'] == 'money')
            {
                $arForm[$key] = implode('|', [$arForm[$key], $arForm[$key . '_CURRENCY']]);
                unset($arForm[$key . '_CURRENCY']);
            }
        }
    }
    $arForm['ID'] = intVal($arForm['ID']);
    if ($arForm['ID'] > 0)
    {
        $method = 'crm.contact.update';
        $arParams = [
            'id' => $arForm['ID'],
            'fields' => $arForm
        ];
        $arMess = [
            'success' => 'Contact update',
            'error' => 'Contact not updated',
        ];
    }
    else
    {
        $method = 'crm.contact.add';
        $arParams = [
            'fields' => $arForm
        ];
        $arMess = [
            'success' => 'Contact add',
            'error' => 'Contact not added',
        ];
    }
    $result = CRest::get($method, $arParams);
    if (!empty($result['result']))
    {
        echo json_encode(
            ['message' => $arMess['success'] . (($method == 'crm.contact.add') ? ' ID:' . $result['result'] : '')]
        );
    }
    elseif (!empty($result['error_description']))
    {
        echo json_encode(['message' => $arMess['error'] . ': ' . $result['error_description']]);
    }
    else
    {
        echo json_encode(['message' => $arMess['error']]);
    }

?>
```





