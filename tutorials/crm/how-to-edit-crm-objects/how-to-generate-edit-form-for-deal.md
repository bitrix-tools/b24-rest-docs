# Как сделать свою карточку редактирования сделки

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример автоматической генерировации карточки редактирования сделки со всеми полями, созданными в Битрикс24, на странице приложения.

Некоторые типы полей не реализованы в примере, на месте полей с неподдерживаемым типом будет выводиться сообщение *field not support*.

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
                $sResult .= ' name="' .
                    $arParams['NAME'] .
                    '' .
                    (($arParams['MULTIPLE']) ? '[]' : '') .
                    '"';
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
        'method' => 'crm.deal.fields',
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
        'method' => 'crm.deal.get',
        'params' => ['id' => $ID]
    ];
    $arData['VALUE_CATEGORY_ID'] = [//only 50 first unlocked values
                                    'method' => 'crm.dealcategory.list',
                                    'params' => ['filter' => ['IS_LOCKED' => 'N']]
    ];
    $arData['VALUE_LEAD_ID'] = [
        'method' => 'crm.lead.get',
        'params' => ['id' => '$result[ITEM][LEAD_ID]']
    ];
    //QUOTE_ID is deprecated use crm.quote.list:
    $arData['VALUE_QUOTE_ID'] = [
        'method' => 'crm.quote.list',
        'params' => ['filter' => ['DEAL_ID' => $ID]]
    ];
}
$arResult = CRest::callBatch($arData, 0);
$arResult = $arResult['result']['result'];
$sResult = '';
$sResultCustom = '';
if (is_array($arResult['FIELDS'])):
if (isset($arResult['FIELDS']['CONTACT_ID']))//deprecated use crm.deal.contact.items.get
{
    unset($arResult['FIELDS']['CONTACT_ID']);
}
if (isset($arResult['FIELDS']['CONTACT_IDS']))// use crm.deal.contact.items.get
{
    unset($arResult['FIELDS']['CONTACT_IDS']);
}
foreach ($arResult['FIELDS'] as $key => $arField)
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
        case 'crm_category':
            if (!empty($arResult['VALUE_' . $key]))
            {
                $arList = array_column($arResult['VALUE_' . $key], 'NAME', 'ID');
            }
            $return = CPrintForm::select(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value
                ],
                $arList
            );
            break;
        case 'crm_quote'://only for QUOTE_ID read only type
            if (!empty($arResult['VALUE_QUOTE_ID']))
            {
                $return .= implode(', ', array_column($arResult['VALUE_QUOTE_ID'], 'TITLE'));
            }
            break;
        case 'location':
            $return .= 'field not support location';
            break;
        case 'crm_status':
            if (empty($arList))
            {
                $arFieldsStatus = \CRest::get(
                    'crm.status.list',
                    ['filter' => ['ENTITY_ID' => $arField['statusType']]]
                );
                if (!empty($arFieldsStatus['result']))
                {
                    $arList = $arFieldsStatus['result'];
                }
            }
            $arList = array_column($arList, 'NAME', 'STATUS_ID');
            $return = CPrintForm::select(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value
                ],
                $arList
            );
            break;
        case 'crm_currency':
            $arList = array_column($arResult['FIELD_VALUES_CURRENCY'], 'FULL_NAME', 'CURRENCY');
            $return = CPrintForm::select(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value
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
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value
                ],
                $arList
            );
            break;
        case 'crm_multifield'://its simple example: need multifield, check data type and more...
            if (!empty($value) && is_array($value))
            {
                $value = reset($value)['VALUE'];
            }
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => false,
                    'VALUE' => $value,
                    'TYPE' => 'text',
                ]
            );
            break;
        case 'crm_lead':
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'text',
                ]
            );
            if (!empty($arResult['VALUE_LEAD_ID']) && $value == $arResult['VALUE_LEAD_ID']['ID'])
            {
                $return .= '(' . $arResult['VALUE_LEAD_ID']['TITLE'] . ')';
            }
            break;
        case 'crm_company':
            $arCompany = [];
            if (!empty($arResult['VALUE_' . $key]))
            {
                $arCompany = $arResult['VALUE_' . $key];
            }
            elseif (!empty($value))
            {
                $arCompany = CRest::get('crm.company.list', ['filter' => ['ID' => $value]]);
            }
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'text',
                ]
            );
            if (!empty($arCompany['result']))
            {
                $return .= '(';
                $i = 0;
                foreach ($arCompany['result'] as $val)
                {
                    $i++;
                    if ($i > 1)
                    {
                        $return .= ', ';
                    }
                    $return .= $val['TITLE'];
                }
                $return .= ')';
            }
            break;
        case 'crm_contact':
            $arContact = [];
            if (!empty($arResult['VALUE_' . $key]))
            {
                $arContact = $arResult['VALUE_' . $key];
            }
            elseif (!empty($value))
            {
                $arContact = CRest::get('crm.contact.list', ['filter' => ['ID' => $value]]);
            }
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'text',
                ]
            );
            if (!empty($arContact['result']))
            {
                $return .= '(';
                $i = 0;
                foreach ($arContact['result'] as $val)
                {
                    $i++;
                    if ($i > 1)
                    {
                        $return .= ', ';
                    }
                    $return .= implode(' ', [$val['NAME'], $val['LAST_NAME']]);
                }
                $return .= ')';
            }
            break;
        case 'file':
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'file',
                ]
            );
            if ($arField['isMultiple'])
            {
                if (is_array($value))
                {
                    foreach ($value as $k => $val)
                    {
                        if (!empty($val['downloadUrl']))
                        {
                            $return .= '<br/><a href="' . $val['downloadUrl'] . '">old file ' . $k . '</a>';
                        }
                    }
                }
            }
            else
            {
                if (!empty($value['downloadUrl']))
                {
                    $return .= '<br/><a href="' . $value['downloadUrl'] . '">old file</a>';
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
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'date',
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
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'datetime-local',
                ]
            );
            break;
        case 'char':
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => 'Y',
                    'CHECKED' => ($value == 'Y') ? true : false,
                    'TYPE' => 'checkbox',
                ]
            );
            break;
        case 'boolean':
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => '1',
                    'CHECKED' => ($value == 'Y') ? true : false,
                    'TYPE' => 'checkbox',
                ]
            );
            break;
        case 'double':
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'number'
                ]
            );
            break;
        case 'user':
            $arUser = [];
            if (!empty($value))
            {
                $arUser = CRest::get('user.get', ['filter' => ['ID' => $value]]);
            }
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'number'
                ]
            );
            if (!empty($arUser['result']))
            {
                $return .= '(';
                $i = 0;
                foreach ($arUser['result'] as $val)
                {
                    $i++;
                    if ($i > 1)
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
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'text',
                ]
            );
            break;
        case 'integer':
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'number',
                ]
            );
            break;
        case 'money':
            list($money, $currency) = explode('|', $value);
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $money,
                    'TYPE' => 'number',
                ]
            );
            $arList = array_column($arResult['FIELD_VALUES_CURRENCY'], 'FULL_NAME', 'CURRENCY');
            $return .= CPrintForm::select(
                [
                    'NAME' => $key . '_CURRENCY',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $currency
                ],
                $arList
            );
            break;
        case 'address':
            $return = CPrintForm::input(
                [
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'text',
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
                    'NAME' => 'form[' . $key . ']',
                    'REQUIRED' => $arField['isRequired'],
                    'DISABLE' => $arField['isReadOnly'],
                    'MULTIPLE' => $arField['isMultiple'],
                    'VALUE' => $value,
                    'TYPE' => 'text',
                ]
            );
            break;
        }
        if (strpos($key, 'UF_') === 0)
        {
            $sResultCustom .= '<div class="col-4 mt-3">' .
                (($arField['formLabel']) ? $arField['formLabel'] : $arField['title']) .
                ': ' .
                '</div>';
            $sResultCustom .= '<div class="col-6 mt-3">' . $return . '</div>';
        }
        else
        {
            $sResult .= '<div class="col-4 mt-3">' .
                (($arField['formLabel']) ? $arField['formLabel'] : $arField['title']) .
                ': ' .
                '</div>';
            $sResult .= '<div class="col-6 mt-3">' . $return . '</div>';
        }
        ```
        ?>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
             crossorigin="anonymous">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
                crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
                crossorigin="anonymous"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
        <script>
            $(document).ready(function () {
                $('#auto_form').on('submit', function (el) {//event submit form
                    el.preventDefault();//the default action of the event will not be triggered
                    var formData = new FormData(this);
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", 'auto_form.php');
                    xhr.onreadystatechange = function () {
                        if (this.readyState === 4)
                        {
                            if (this.status >= 200 && this.status < 400)
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
        </script>
        <div class="container">
            <form id="auto_form" action="" enctype="multipart/form-data" method="post">
                <?if (!empty($arResult['ITEM']['ID']))://for update entity?>
                        <input type="hidden" name="form[ID]" value="<?=$arResult['ITEM']['ID']?>">
                <?endif;?>
                <h2>Standard fields</h2>
                <div class="row">
                    <?=$sResult?>
                </div>
                <h2>Custom fields</h2>
                <div class="row">
                    <?=$sResultCustom?>
                </div>
                <div class="row">
                    <div class="col-sm-10 mt-5">
                        <input type="submit" class="btn btn-primary" value="Submit">
                    </div>
                </div>
            </form>
        </div>
        <?endif;?>
```

Файл **auto_form.php**:

```php
<?php
$arForm = [];
foreach ($_POST['form'] as $key => $item) {
    if (is_array($item)) {
        $arForm[$key] = [];
        foreach ($item as $k => $val) {
            $arForm[$key][$k] = htmlspecialchars($val);
        }
    } else {
        $arForm[$key] = htmlspecialchars($item);
    }
}
//make array multiple files for add to custom field
if (!empty($_FILES['form']['tmp_name']) && is_array($_FILES['form']['tmp_name'])) {
    foreach ($_FILES['form']['tmp_name'] as $key => $files) {
        if (is_array($files)) {
            foreach ($files as $k => $file) {
                $arForm[$key][$k] = [
                    "fileData" => [
                        $_FILES['form']['name'][$key][$k],
                        base64_encode(file_get_contents($file))
                    ]
                ];
            }
        } else {
            $arForm[$key] = [
                "fileData" => [
                    $_FILES['form']['name'][$key],
                    base64_encode(file_get_contents($files))
                ]
            ];
        }
    }
}
$arResult = CRest::get('crm.deal.fields', []);
if (!empty($arResult['result'])) {
    foreach ($arResult['result'] as $key => $prop) {
        if (!isset($arForm[$key])) {
            if (!$prop['isReadOnly'] && $prop['type'] != 'file') {
                if ($prop['type'] == 'enumeration' && $prop['isMultiple']) {
                    //if type multiple enumeration to clean selected value need send: [false]
                    $arForm[$key] = [false];
                } elseif ($prop['isMultiple']) {
                    $arForm[$key] = [];
                } else {
                    $arForm[$key] = '';
                }
            }
            continue;
        }
        //here may be any check field example by type
        if ($prop['type'] == 'crm_multifield') {
            if (isset($arForm[$key])) {
                $arForm[$key] = [['VALUE' => $arForm[$key]]];
            }
        } elseif ($prop['type'] == 'money') {
            $arForm[$key] = implode('|', [$arForm[$key], $arForm[$key . '_CURRENCY']]);
            unset($arForm[$key . '_CURRENCY']);
        }
    }
}
$arForm['ID'] = intVal($arForm['ID']);
if ($arForm['ID'] > 0) {
    $method = 'crm.deal.update';
    $arParams = [
        'id' => $arForm['ID'],
        'fields' => $arForm
    ];
    $arMess = [
        'success' => 'Deal update',
        'error' => 'Deal not updated',
    ];
} else {
    $method = 'crm.deal.add';
    $arParams = [
        'fields' => $arForm
    ];
    $arMess = [
        'success' => 'Deal add',
        'error' => 'Deal not added',
    ];
}
$result = CRest::get($method, $arParams);
if (!empty($result['result'])) {
    echo json_encode(
        ['message' => $arMess['success'] . (($method == 'crm.deal.add') ? ' ID:' . $result['result'] : '')]
    );
} elseif (!empty($result['error_description'])) {
    echo json_encode(['message' => $arMess['error'] . ': ' . $result['error_description']]);
} else {
    echo json_encode(['message' => $arMess['error']]);
}
?>
```