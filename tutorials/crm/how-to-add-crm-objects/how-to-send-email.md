# Как отправить письмо клиенту от имени сотрудника

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение элемента CRM

Письмо клиенту можно отправить автоматически через CRM. В поле «От кого» будут указаны имя и адрес электронной почты сотрудника. В карточке контакта добавится событие для исходящего письма.

Чтобы отправить письмо, последовательно выполним три метода:

1. [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) — получим данные клиента

2. [user.get](../../../api-reference/user/user-get.md)— получим данные сотрудника

3. [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) — создадим дело типа «Письмо»

## 1\. Получим данные клиента

Используем метод [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) с идентификатором клиента. Значение идентификатора можно предварительно сохранить в переменной `contactID`. Например, получим данные контакта с идентификатором `1`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    let contactID = 1;
    BX24.callMethod(
            'crm.contact.get',
            { 'id': contactID },
            function(result) {
                if (result.error()) {
                    reject(result.error());
                } else {
                    resolve(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    $contactID = 1;
    $resultContact = CRest::call(
        'crm.contact.get',
        [
            'id' => $contactID
        ]
    );
    ```

{% endlist %}

В результате получим данные клиента, включая адрес электронной почты `EMAIL` и идентификатор ответственного сотрудника `ASSIGNED_BY_ID`.

```json
{
    "result": {
        "ID": "1",
        "NAME": "Алексей",
        "SECOND_NAME": "Кириллович",
        "LAST_NAME": "Вронский",
        "ASSIGNED_BY_ID": "61",
        "EMAIL": [
            {
                "ID": "1328",
                "VALUE_TYPE": "WORK",
                "VALUE": "vronsky@example.ru",
                "TYPE_ID": "EMAIL"
            }
        ]
    } 
}
```

## 2\. Получим данные сотрудника

Чтобы получить данные ответственного сотрудника, используем метод [user.get](../../../api-reference/user/user-get.md) с фильтром по идентификатору сотрудника. Идентификатор должен принимать значение из поля `ASSIGNED_BY_ID` объекта `resultContact`.

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'user.get',
        {
            'filter': {
                'ID': resultContact.ASSIGNED_BY_ID
            }
        },
        function(result) {
            if (result.error()) {
                reject(result.error());
            } else {
                 resolve(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    {
        $resultUser = CRest::call(
            'user.get',
            [
                'filter' => [
                    'ID' => $resultContact['result']['ASSIGNED_BY_ID']
                ]
            ]
       );
    }
    ```

{% endlist %}

Получим данные сотрудника, включая адрес электронной почты `EMAIL`.

```json
{
    "result": [
        {
        "ID": "61",
        "ACTIVE": true,
        "NAME": "Иван",
        "LAST_NAME": "Петров",
        "EMAIL": "ivanpetrov@example.ru"
        }
    ]
}
```

## 3\. Создадим дело типа «Письмо»

Подготовим переменные:

- `contactEmail` — первый элемент из контакта `resultContact`,

- `staff` — первый элемент из объекта `resultUser`.

{% list tabs %}

- JS

    ```js
        let contactEmail = resultContact.EMAIL[0];
        let staff = resultUser[0];
    ```

- PHP

    ```php
        $contactEmail = reset($resultContact['result']['EMAIL']);
        $staff = reset($resultUser['result']);
    ```

{% endlist %}

Чтобы добавить событие и отправить письмо, используем метод [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md). В него нужно передать данные клиента, сотрудника и параметры дела.

- `SUBJECT` — тема письма. Укажем `subject email now`.

- `DESCRIPTION` — текст письма. Например, `body email now`.

- `DESCRIPTION_TYPE` — тип текста. Возможные значения: `1`— обычный текст, `2`— HTML-разметка, `3`— BB-код. Зададим значение `3`.

- `COMPLETED` — флаг показывает, завершено ли событие. Укажем `Y`.

- `DIRECTION` — направление активности. Передаем `2` — исходящее письмо. Полный список направлений активности можно получить с помощью метода [crm.enum.activitydirection](../../../api-reference/crm/auxiliary/enum/outdated/crm-enum-activity-direction.md).

- `OWNER_ID` — идентификатор контакта. Передаем переменную `contactID`.

- `OWNER_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `3`— контакт. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

- `TYPE_ID` — тип активности. Укажем `4` — письмо. Список типов активности можно получить с помощью метода [crm.enum.activitytype](../../../api-reference/crm/auxiliary/enum/outdated/crm-enum-activity-type.md).

- `COMMUNICATIONS` — контактные данные клиента:

    - `VALUE` — адрес электронной почты, берем значение `VALUE` из массива `contactEmail`,

    - `ENTITY_ID` — идентификатор клиента, передаем `contactID`,

    - `ENTITY_TYPE_ID` — [идентификатор типа объекта](../../../api-reference/crm/data-types.md#object_type), передаем `3` — контакт.

- `START_TIME` и `END_TIME` — дата и время начала и окончания активности. Укажем длительность 1 час.

- `RESPONSIBLE_ID` — идентификатор ответственного, передаем `staff.ID`.

- `SETTINGS` — дополнительные настройки:

    - `MESSAGE_FROM` — отправитель письма, передаем имя `staff.NAME`, фамилию `staff.LAST_NAME` и адрес электронной почты `staff.EMAIL` сотрудника.

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'crm.activity.add',
        {
            'fields': {
                "SUBJECT": "subject email now",
                "DESCRIPTION": "body email now",
                "DESCRIPTION_TYPE": 3,
                "COMPLETED": "Y",
                "DIRECTION": 2,
                "OWNER_ID": contactID,
                "OWNER_TYPE_ID": 3,
                "TYPE_ID": 4,
                "COMMUNICATIONS": [
                    {
                        'VALUE': contactEmail.VALUE,
                        'ENTITY_ID': contactID,
                        'ENTITY_TYPE_ID': 3
                    }
                ],
                "START_TIME": new Date().toISOString(),
                "END_TIME": new Date(Date.now() + 3600 * 1000).toISOString(),
                "RESPONSIBLE_ID": staff.ID,
                'SETTINGS': {
                    'MESSAGE_FROM': `${staff.NAME} ${staff.LAST_NAME} <${staff.EMAIL}>`
                }
            }
        }
    ); 
    ```

-  PHP

    ```php
    $resultActivity = CRest::call(
        'crm.activity.add',
        [
            'fields' => [
                "SUBJECT" => "subject email now",
                "DESCRIPTION" => "body email now",
                "DESCRIPTION_TYPE" => 3,//text,html,bbCode type id in: CRest::call('crm.enum.contenttype');
                "COMPLETED" => "Y",//send now
                "DIRECTION" => 2,// CRest::call('crm.enum.activitydirection');
                "OWNER_ID" => $contactID,
                "OWNER_TYPE_ID" => 3, // CRest::call('crm.enum.ownertype');
                "TYPE_ID" => 4, // CRest::call('crm.enum.activitytype');
                "COMMUNICATIONS" => [
                    [
                        'VALUE' => $contactEmail['VALUE'],
                        'ENTITY_ID' => $contactID,
                        'ENTITY_TYPE_ID' => 3// CRest::call('crm.enum.ownertype');
                    ]
                ],
                "START_TIME" => date("Y-m-d H:i:s", time()),
                "END_TIME" => date("Y-m-d H:i:s", time() + 3600),
                "RESPONSIBLE_ID" => $staff['ID'],
                'SETTINGS' => [
                    'MESSAGE_FROM' => implode(
                        ' ',
                        [$staff['NAME'], $staff['LAST_NAME'], '<' . $staff['EMAIL'] . '>']
                    ),
                ],
            ]
        ]
    );
    ```

{% endlist %}

Если событие создано успешно, метод вернет его идентификатор. Если вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md).

```json
{
    "result": 3165,
}
```

## Полный пример кода

Код в примере объединяет все шаги: получает данные клиента и сотрудника, добавляет дело «Письмо» и отправляет письмо клиенту.

{% list tabs %}

- JS

    ```js
    document.addEventListener('DOMContentLoaded', function() {
        async function createEmailActivityForContact() {
            try {
                let contactID = 1;

                let resultContact = await new Promise((resolve, reject) => {
                    BX24.callMethod(
                        'crm.contact.get',
                        { 'id': contactID },
                        function(result) {
                            if (result.error()) {
                                reject(result.error());
                            } else {
                                resolve(result.data());
                            }
                        }
                    );
                });

                if (resultContact && resultContact.ASSIGNED_BY_ID && resultContact.EMAIL) {
                    let resultUser = await new Promise((resolve, reject) => {
                        BX24.callMethod(
                            'user.get',
                            {
                                'filter': {
                                    'ID': resultContact.ASSIGNED_BY_ID
                                }
                            },
                            function(result) {
                                if (result.error()) {
                                    reject(result.error());
                                } else {
                                    resolve(result.data());
                                }
                            }
                        );
                    });

                    if (resultUser.length > 0) {
                        let contactEmail = resultContact.EMAIL[0];
                        let staff = resultUser[0];

                        if (contactEmail.VALUE && staff.EMAIL) {
                            let resultActivity = await new Promise((resolve, reject) => {
                                BX24.callMethod(
                                    'crm.activity.add',
                                    {
                                        'fields': {
                                            "SUBJECT": "subject email now",
                                            "DESCRIPTION": "body email now",
                                            "DESCRIPTION_TYPE": 3,
                                            "COMPLETED": "Y",
                                            "DIRECTION": 2,
                                            "OWNER_ID": contactID,
                                            "OWNER_TYPE_ID": 3,
                                            "TYPE_ID": 4,
                                            "COMMUNICATIONS": [
                                                {
                                                    'VALUE': contactEmail.VALUE,
                                                    'ENTITY_ID': contactID,
                                                    'ENTITY_TYPE_ID': 3
                                                }
                                            ],
                                            "START_TIME": new Date().toISOString(),
                                            "END_TIME": new Date(Date.now() + 3600 * 1000).toISOString(),
                                            "RESPONSIBLE_ID": staff.ID,
                                            'SETTINGS': {
                                                'MESSAGE_FROM': `${staff.NAME} ${staff.LAST_NAME} <${staff.EMAIL}>`
                                            }
                                        }
                                    },
                                    function(result) {
                                        if (result.error()) {
                                            reject(result.error());
                                        } else {
                                            resolve(result.data());
                                        }
                                    }
                                );
                            });

                            if (resultActivity) {
                                console.log(JSON.stringify({ 'message': 'Activity added' }));
                            } else {
                                console.log(JSON.stringify({ 'message': 'Activity not added' }));
                            }
                        }
                    }
                }
            } catch (error) {
                console.error(error);
                console.log(JSON.stringify({ 'message': 'Activity not added: ' + error.message }));
            }
        }

        createEmailActivityForContact();
    });
    ```

- PHP

    ```php
    <?
    $contactID = 1;
    $resultContact = CRest::call(
        'crm.contact.get',
        [
            'id' => $contactID
        ]
    );
    $resultActivity = [];
    if (!empty($resultContact['result']['ASSIGNED_BY_ID']) && !empty($resultContact['result']['EMAIL']))
    {
        $resultUser = CRest::call(
            'user.get',
            [
                'filter' => [
                    'ID' => $resultContact['result']['ASSIGNED_BY_ID']
                ]
            ]
        );
        if ($resultUser['result'])
        {
            $contactEmail = reset($resultContact['result']['EMAIL']);
            $staff = reset($resultUser['result']);
            if (!empty($contactEmail['VALUE']) && !empty($staff['EMAIL']))
            {
                $resultActivity = CRest::call(
                    'crm.activity.add',
                    [
                        'fields' => [
                            "SUBJECT" => "subject email now",
                            "DESCRIPTION" => "body email now",
                            "DESCRIPTION_TYPE" => 3,//text,html,bbCode type id in: CRest::call('crm.enum.contenttype');
                            "COMPLETED" => "Y",//send now
                            "DIRECTION" => 2,// CRest::call('crm.enum.activitydirection');
                            "OWNER_ID" => $contactID,
                            "OWNER_TYPE_ID" => 3, // CRest::call('crm.enum.ownertype');
                            "TYPE_ID" => 4, // CRest::call('crm.enum.activitytype');
                            "COMMUNICATIONS" => [
                                [
                                    'VALUE' => $contactEmail['VALUE'],
                                    'ENTITY_ID' => $contactID,
                                    'ENTITY_TYPE_ID' => 3// CRest::call('crm.enum.ownertype');
                                ]
                            ],
                            "START_TIME" => date("Y-m-d H:i:s", time()),
                            "END_TIME" => date("Y-m-d H:i:s", time() + 3600),
                            "RESPONSIBLE_ID" => $staff['ID'],
                            'SETTINGS' => [
                                'MESSAGE_FROM' => implode(
                                    ' ',
                                    [$staff['NAME'], $staff['LAST_NAME'], '<' . $staff['EMAIL'] . '>']
                                ),
                            ],
                        ]
                    ]
                );
            }
        }
    }
    if (!empty($resultActivity['result']))
    {
        echo json_encode(['message' => 'Activity add']);
    }
    elseif (!empty($resultActivity['error_description']))
    {
        echo json_encode(['message' => 'Activity not added: ' . $resultActivity['error_description']]);
    }
    else
    {
        echo json_encode(['message' => 'Activity not added']);
    }
    ?>
    ```

{% endlist %}