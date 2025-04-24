# Как искать в CRM по телефону и e-mail

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример отображает форму для ввода телефона и e-mail. Ниже формы выводится таблица с результатом поиска по столбцам:

- `id` элемента
- тип объекта
- заголовок
- телефоны элемента
- e-mail элемента

Код через поиск дубликатов находит все объекты: лид, контакт, компания, у которых есть указанный телефон или e-mail. Потом из списка всех `ID` получается информация о каждом элементе и выводится в таблице:

- заголовок или имя и фамилия
- все телефоны
- e-mail

{% list tabs %}

- JS

    ```javascript
    let phone = BX24.getPost('PHONE') ? BX24.getPost('PHONE') : false;
    let email = BX24.getPost('EMAIL') ? BX24.getPost('EMAIL') : false;

    let entityIDs = {
        'LEAD': [],
        'CONTACT': [],
        'COMPANY': []
    };
    let resultEntity = {
        'lead': [],
        'contact': [],
        'company': []
    };

    if (phone) {
        BX24.callMethod('crm.duplicate.findbycomm', {
            'type': 'PHONE',
            'values': [phone]
        }, function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                if (Array.isArray(result.data().LEAD)) {
                    entityIDs.LEAD = entityIDs.LEAD.concat(result.data().LEAD);
                }
                if (Array.isArray(result.data().CONTACT)) {
                    entityIDs.CONTACT = entityIDs.CONTACT.concat(result.data().CONTACT);
                }
                if (Array.isArray(result.data().COMPANY)) {
                    entityIDs.COMPANY = entityIDs.COMPANY.concat(result.data().COMPANY);
                }
            }
        });
    }

    if (email) {
        BX24.callMethod('crm.duplicate.findbycomm', {
            'type': 'EMAIL',
            'values': [email]
        }, function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                if (Array.isArray(result.data().LEAD)) {
                    entityIDs.LEAD = entityIDs.LEAD.concat(result.data().LEAD);
                }
                if (Array.isArray(result.data().CONTACT)) {
                    entityIDs.CONTACT = entityIDs.CONTACT.concat(result.data().CONTACT);
                }
                if (Array.isArray(result.data().COMPANY)) {
                    entityIDs.COMPANY = entityIDs.COMPANY.concat(result.data().COMPANY);
                }
            }
        });
    }

    if (entityIDs.LEAD.length > 0) {
        BX24.callMethod('crm.lead.list', {
            'filter': {
                'ID': entityIDs.LEAD
            },
            'select': ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE']
        }, function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                if (result.data().length > 0) {
                    resultEntity.lead = result.data();
                }
            }
        });
    }

    if (entityIDs.CONTACT.length > 0) {
        BX24.callMethod('crm.contact.list', {
            'filter': {
                'ID': entityIDs.CONTACT
            },
            'select': ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL']
        }, function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                if (result.data().length > 0) {
                    resultEntity.contact = result.data();
                }
            }
        });
    }

    if (entityIDs.COMPANY.length > 0) {
        BX24.callMethod('crm.company.list', {
            'filter': {
                'ID': entityIDs.COMPANY
            },
            'select': ['ID', 'PHONE', 'EMAIL', 'TITLE']
        }, function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                if (result.data().length > 0) {
                    resultEntity.company = result.data();
                }
            }
        });
    }
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        </head>
        <body class="container">
            <fo rm method="post" action="">
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>E-mail*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="EMAIL" value="">
                    </div>
                </div>
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>Phone*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="PHONE" value="">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10">
                        <input type="submit" name="SEARCH" class="btn btn-primary" value="Search">
                    </div>
                </div>
            </form>
            <table class="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Entity</th>
                        <th scope="col">Title</th>
                        <th scope="col">Phones</th>
                        <th scope="col">Emails</th>
                    </tr>
                </thead>
                <tbody id="resultTable">
                </tbody>
            </table>
            <script src="https://api.bitrix24.com/api/v1/"></script>
            <script>
                document.querySelector('form').addEventListener('submit', function(event) {
                    event.preventDefault();
                    let phone = document.querySelector('input[name="PHONE"]').value;
                    let email = document.querySelector('input[name="EMAIL"]').value;

                    let entityIDs = {
                        'LEAD': [],
                        'CONTACT': [],
                        'COMPANY': []
                    };
                    let resultEntity = {
                        'lead': [],
                        'contact': [],
                        'company': []
                    };

                    if (phone) {
                        BX24.callMethod('crm.duplicate.findbycomm', {
                            'type': 'PHONE',
                            'values': [phone]
                        }, function(result) {
                            if (result.error()) {
                                console.error(result.error());
                            } else {
                                if (Array.isArray(result.data().LEAD)) {
                                    entityIDs.LEAD = entityIDs.LEAD.concat(result.data().LEAD);
                                }
                                if (Array.isArray(result.data().CONTACT)) {
                                    entityIDs.CONTACT = entityIDs.CONTACT.concat(result.data().CONTACT);
                                }
                                if (Array.isArray(result.data().COMPANY)) {
                                    entityIDs.COMPANY = entityIDs.COMPANY.concat(result.data().COMPANY);
                                }
                            }
                        });
                    }

                    if (email) {
                        BX24.callMethod('crm.duplicate.findbycomm', {
                            'type': 'EMAIL',
                            'values': [email]
                        }, function(result) {
                            if (result.error()) {
                                console.error(result.error());
                            } else {
                                if (Array.isArray(result.data().LEAD)) {
                                    entityIDs.LEAD = entityIDs.LEAD.concat(result.data().LEAD);
                                }
                                if (Array.isArray(result.data().CONTACT)) {
                                    entityIDs.CONTACT = entityIDs.CONTACT.concat(result.data().CONTACT);
                                }
                                if (Array.isArray(result.data().COMPANY)) {
                                    entityIDs.COMPANY = entityIDs.COMPANY.concat(result.data().COMPANY);
                                }
                            }
                        });
                    }

                    setTimeout(function() {
                        if (entityIDs.LEAD.length > 0) {
                            BX24.callMethod('crm.lead.list', {
                                'filter': {
                                    'ID': entityIDs.LEAD
                                },
                                'select': ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE']
                            }, function(result) {
                                if (result.error()) {
                                    console.error(result.error());
                                } else {
                                    if (result.data().length > 0) {
                                        resultEntity.lead = result.data();
                                    }
                                }
                            });
                        }

                        if (entityIDs.CONTACT.length > 0) {
                            BX24.callMethod('crm.contact.list', {
                                'filter': {
                                    'ID': entityIDs.CONTACT
                                },
                                'select': ['ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL']
                            }, function(result) {
                                if (result.error()) {
                                    console.error(result.error());
                                } else {
                                    if (result.data().length > 0) {
                                        resultEntity.contact = result.data();
                                    }
                                }
                            });
                        }

                        if (entityIDs.COMPANY.length > 0) {
                            BX24.callMethod('crm.company.list', {
                                'filter': {
                                    'ID': entityIDs.COMPANY
                                },
                                'select': ['ID', 'PHONE', 'EMAIL', 'TITLE']
                            }, function(result) {
                                if (result.error()) {
                                    console.error(result.error());
                                } else {
                                    if (result.data().length > 0) {
                                        resultEntity.company = result.data();
                                    }
                                }
                            });
                        }

                        setTimeout(function() {
                            let resultTable = document.getElementById('resultTable');
                            resultTable.innerHTML = '';

                            for (let entity in resultEntity) {
                                resultEntity[entity].forEach(function(item) {
                                    let phones = '';
                                    if (item.PHONE) {
                                        phones = item.PHONE.map(phone => phone.VALUE).join(', ');
                                    }
                                    let emails = '';
                                    if (item.EMAIL) {
                                        emails = item.EMAIL.map(email => email.VALUE).join(', ');
                                    }
                                    let title = item.TITLE ? item.TITLE + (item.NAME || item.LAST_NAME ? ': ' : '') : '';
                                    if (item.NAME || item.LAST_NAME) {
                                        title += [item.NAME, item.LAST_NAME].join(' ');
                                    }

                                    let row = `<tr>
                                        <th scope="row">${item.ID}</th>
                                        <td>${entity}</td>
                                        <td>${title}</td>
                                        <td>${phones}</td>
                                        <td>${emails}</td>
                                    </tr>`;
                                    resultTable.innerHTML += row;
                                });
                            }
                        }, 1000);
                    }, 1000);
                });
            </script>
        </body>
    </html>
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../how-to-use-examples.md)

    {% endnote %}

    ```php
    <?
        include('crest.php');
        $phone = ($_POST['PHONE'])?htmlspecialchars($_POST['PHONE']):false;
        $email = ($_POST['EMAIL'])?htmlspecialchars($_POST['EMAIL']):false;
        
        $entityIDs = [
            'LEAD' => [],
            'CONTACT' => [],
            'COMPANY' => []
        ];
        $resultEntity = [
            'lead' => [],
            'contact' => [],
            'company' => []
        ];
        if($phone)
        {
            $result = CRest::call('crm.duplicate.findbycomm', [
                'type' => 'PHONE',
                'values' => [$phone]
            ]);
            if(is_array($result['result']['LEAD']))
            {
                $entityIDs['LEAD'] = array_merge($entityIDs['LEAD'], $result['result']['LEAD']);
            }
            if(is_array($result['result']['CONTACT']))
            {
                $entityIDs['CONTACT'] = array_merge($entityIDs['CONTACT'], $result['result']['CONTACT']);
            }
            if(is_array($result['result']['COMPANY']))
            {
                $entityIDs['COMPANY'] = array_merge($entityIDs['COMPANY'], $result['result']['COMPANY']);
            }
        }
        if($email)
        {
            $result = CRest::call('crm.duplicate.findbycomm', [
                'type' => 'EMAIL',
                'values' => [$email]
            ]);
            if(is_array($result['result']['LEAD']))
            {
                $entityIDs['LEAD'] = array_merge($entityIDs['LEAD'], $result['result']['LEAD']);
            }
            if(is_array($result['result']['CONTACT']))
            {
                $entityIDs['CONTACT'] = array_merge($entityIDs['CONTACT'], $result['result']['CONTACT']);
            }
            if(is_array($result['result']['COMPANY']))
            {
                $entityIDs['COMPANY'] = array_merge($entityIDs['COMPANY'], $result['result']['COMPANY']);
            }
        }
        if(!empty($entityIDs['LEAD']))
        {
            $result = CRest::call(
                'crm.lead.list',
                [
                    'filter' => [
                        'ID' => $entityIDs['LEAD']
                    ],
                    'select' =>     [
                        'ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL', 'TITLE'
                    ]
                ]
            );
            if(!empty($result['result']))
            {
                $resultEntity['lead'] = $result['result'];
            }
        }
        if(!empty($entityIDs['CONTACT']))
        {
            $result = CRest::call(
                'crm.contact.list',
                [
                    'filter' => [
                        'ID' => $entityIDs['CONTACT']
                    ],
                    'select' =>     [
                        'ID', 'NAME', 'LAST_NAME', 'PHONE', 'EMAIL'
                    ]
                ]
            );
            if(!empty($result['result']))
            {
                $resultEntity['contact'] = $result['result'];
            }
        }
        if(!empty($entityIDs['COMPANY']))
        {
            $result = CRest::call(
                'crm.company.list',
                [
                    'filter' => [
                        'ID' => $entityIDs['COMPANY']
                    ],
                    'select' =>     [
                        'ID', 'PHONE', 'EMAIL', 'TITLE'
                    ]
                ]
            );
            if(!empty($result['result']))
            {
                $resultEntity['company'] = $result['result'];
            }
        }
    ?>
    <!DOCTYPE html>
    <html lang="ru">
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        </head>
        <body class="container">
            <form method="post" action="">
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>E-mail*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="EMAIL" value="<?=$email?>">
                    </div>
                </div>
                <div class="row">
                    <div class="col-4 mt-3">
                        <label>Phone*</label>
                    </div>
                    <div class="col-6 mt-3">
                        <input type="text" name="PHONE" value="<?=$phone?>">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-10">
                        <input type="submit" name="SEARCH" class="btn btn-primary" value="Search">
                    </div>
                </div>
            </form>
            <table class="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Entity</th>
                        <th scope="col">Title</th>
                        <th scope="col">Phones</th>
                        <th scope="col">Emails</th>
                    </tr>
                </thead>
                <tbody>
                    <? foreach($resultEntity as $entity=>$items):?>
                        <? foreach($items as $item):
                            $phones = '';
                            if(!empty($item['PHONE']))
                            {
                                $item['PHONE'] = array_column($item['PHONE'],'VALUE');
                                $phones = implode(', ', $item['PHONE']);
                            }
                            $emails = '';
                            if(!empty($item['EMAIL']))
                            {
                                $item['EMAIL'] = array_column($item['EMAIL'],'VALUE');
                                $emails = implode(', ', $item['EMAIL']);
                            }
                            $title = '';
                            if($item['TITLE'])
                            {
                                $title = $item['TITLE'].(($item['NAME'] || $item['LAST_NAME'])?': ':'');
                            }
                            if($item['NAME'] || $item['LAST_NAME'])
                            {
                                $title .= implode(' ',[$item['NAME'], $item['LAST_NAME']]);
                            }
                            ?>
                            <tr>
                                <th scope="row"><?=$item['ID']?></th>
                                <td><?=$entity?></td>
                                <td><?=$title?></td>
                                <td><?=$phones?></td>
                                <td><?=$emails?></td>
                            </tr>
                        <? endforeach?>
                    <? endforeach?>
                </tbody>
            </table>
        </body>
    </html>
    ```

{% endlist %}
