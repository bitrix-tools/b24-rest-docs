# Добавить событие календаря для работы с клиентами

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение элемента CRM

События календаря можно добавлять автоматически, чтобы напомнить сотрудникам о встречах или звонках клиентам. Событие со ссылкой на контакт клиента появится в календаре ответственного сотрудника. В карточке контакта добавится дело для события.

Чтобы добавить событие в календарь, последовательно выполним два метода:

1. [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) — получим данные клиента

2. [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md) — создадим событие календаря

## 1\. Получим данные клиента

Используем метод [crm.contact.get](../../../api-reference/crm/contacts/crm-contact-get.md) с идентификатором клиента. Например, нас интересует контакт с идентификатором `1`.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

-  JS

   ```javascript
   BX24.callMethod(
       'crm.contact.get',
       {
           'id': 1
       },
   );
   ```

-  PHP

   ```php
   require_once('crest.php');
   
   $resultContact = CRest::call(
       'crm.contact.get',
       [
           'id' => 1
       ]
   );
   ```

{% endlist %}

В результате получим данные клиента, включая телефон `PHONE` и идентификатор ответственного сотрудника `ASSIGNED_BY_ID`.

```json
{
    "result": {
        "ID": "1",
        "POST": "Исполнительный директор",
        "COMMENTS": null ,
        "NAME": "Алексей",
        "SECOND_NAME": "Кириллович",
        "LAST_NAME": "Вронский",
        "PHOTO": null,
        "LEAD_ID": null,
        "TYPE_ID": "SHARE",
        "SOURCE_ID": "SELF",
        "SOURCE_DESCRIPTION": null,
        "COMPANY_ID": "52",
        "BIRTHDATE": "",
        "EXPORT": "Y",
        "HAS_PHONE": "Y",
        "HAS_EMAIL": "Y",
        "HAS_IMOL": "N",
        "DATE_CREATE": "2023-08-18T12:43:42+03:00",
        "DATE_MODIFY": "2023-10-17T15:59:13+03:00",
        "ASSIGNED_BY_ID": "61",
        "CREATED_BY_ID": "57",
        "MODIFY_BY_ID": "47",
        "OPENED": "N",
        "ORIGINATOR_ID": null,
        "ORIGIN_ID": null,
        "ORIGIN_VERSION": null,
        "FACE_ID": null,
        "LAST_ACTIVITY_TIME": "2025-03-15T10:38:21+02:00",
        "ADDRESS": null,
        "ADDRESS_2": null,
        "ADDRESS_CITY": null,
        "ADDRESS_POSTAL_CODE": null,
        "ADDRESS_REGION": null,
        "ADDRESS_PROVINCE": null,
        "ADDRESS_COUNTRY": null,
        "ADDRESS_LOC_ADDR_ID": null,
        "UTM_SOURCE": null,
        "UTM_MEDIUM": null,
        "UTM_CAMPAIGN": null,
        "UTM_CONTENT": null,
        "UTM_TERM": null,
        "LAST_ACTIVITY_BY": "1",
        "PHONE": [
        {
            "ID": "1326",
            "VALUE_TYPE": "MOBILE",
            "VALUE": "88001001020",
            "TYPE_ID": "PHONE"
        },
        ],
        "EMAIL": [
        {
            "ID": "1328",
            "VALUE_TYPE": "WORK",
            "VALUE": "vronsky@example.ru",
            "TYPE_ID": "EMAIL"
        },
        ]
    },
    "time": {
        "start": 1747737934.888428,
        "finish": 1747737934.945823,
        "duration": 0.057394981384277344,
        "processing": 0.029510021209716797,
        "date_start": "2025-05-20T13:45:34+03:00",
        "date_finish": "2025-05-20T13:45:34+03:00"
    }
}
```

## 2\. Создадим событие календаря

Чтобы создать событие, используем метод [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md). В него нужно передать данные клиента и произвольные параметры нового события.

- `SUBJECT` — название события. Укажем `calendar title`.

- `DESCRIPTION` — описание. Например, `calendar body`.

- `DESCRIPTION_TYPE` — формат текста описания. Возможные значения: `1` — обычный текст, `2` — HTML-разметка, `3` — BB-код. Зададим значение `3`.

- `OWNER_ID` — идентификатор контакта. Передаем идентификатор клиента — `1`.

- `OWNER_TYPE_ID` — [идентификатор типа объекта CRM](../../../api-reference/crm/data-types.md#object_type). Передаем `3` — контакт. Полный список типов объектов можно получить с помощью метода [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md).

- `TYPE_ID` — тип события. Укажем  `1` — встреча. Список типов событий можно получить с помощью метода [crm.enum.activitytype](../../../api-reference/crm/auxiliary/enum/outdated/crm-enum-activity-type.md).

- `COMMUNICATIONS` — контактные данные клиента:

    - `VALUE` — номер телефона, берем значение `VALUE` из массива `PHONE`, который получен на первом шаге,

    - `ENTITY_ID` — идентификатор клиента, передаем `1`,

    - `ENTITY_TYPE_ID` — [идентификатор типа объекта](../../../api-reference/crm/data-types.md#object_type), передаем `3` —контакт.

- `START_TIME` и `END_TIME` — дата и время начала и окончания в формате [ISO 8601](https://www.php.net/manual/ru/class.datetimeinterface.php#datetimeinterface.constants.atom), укажем, например, длительность один час,

- `RESPONSIBLE_ID` — идентификатор ответственного, передаем `ASSIGNED_BY_ID`, который получен на первом шаге.

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        'crm.activity.add',
        {
            'fields': {
                "SUBJECT": "calendar title",
                "DESCRIPTION": "calendar body",
                "DESCRIPTION_TYPE": 3,
                "OWNER_ID": 1, 
                "OWNER_TYPE_ID": 3, 
                "TYPE_ID": 1, 
                "COMMUNICATIONS": [
                    {
                        'VALUE': "88001001020", 
                        'ENTITY_ID': 1, 
                        'ENTITY_TYPE_ID': 3
                    }
                ],
                "START_TIME": "2025-05-20T14:00:00",
                "END_TIME": "2025-05-20T15:00:00",
                "RESPONSIBLE_ID": 61 
            }
        },
    );
    ```

-  PHP

    ```php
    require_once('crest.php');
    
    $result = CRest::call(
            'crm.activity.add',
            [
                'fields' => [
                    "SUBJECT" => "calendar title",
                    "DESCRIPTION" => "calendar body",
                    "DESCRIPTION_TYPE" => 3,
                    "OWNER_ID" => 1,
                    "OWNER_TYPE_ID" => 3,
                    "TYPE_ID" => 1,
                    "COMMUNICATIONS" => [
                        [
                            'VALUE' => "88001001020",
                            'ENTITY_ID' => 1,
                            'ENTITY_TYPE_ID' => 3
                        ]
                    ],
                    "START_TIME" => "2025-05-20T14:00:00",
                    "END_TIME" => "2025-05-20T15:00:00",
                    "RESPONSIBLE_ID" => 61,
                ]
            ]
        );
    ```

{% endlist %}

Если событие создано успешно, метод вернет его идентификатор. Если  вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.activity.add](../../../api-reference/crm/timeline/activities/activity-base/crm-activity-add.md).

```json
{
    "result": 6915,
}
```

## Пример кода

Пример создает дело «Встреча» в CRM-карточке контакта и событие длительностью один час в календаре сотрудника.

{% list tabs %}

- JS

    ```js
    var contactID = 1;
    BX24.callMethod(
        'crm.contact.get',
        {
            'id': contactID
        },
        function(resultContact) {
            if (resultContact.error()) {
                console.error(resultContact.error() + ': ' + resultContact.error_description());
            } else {
                var resultActivity = [];
                if (resultContact.data().ASSIGNED_BY_ID && resultContact.data().PHONE) {
                    var contactPhone = resultContact.data().PHONE[0];
                    var staffID = resultContact.data().ASSIGNED_BY_ID;
                    BX24.callMethod(
                        'crm.activity.add',
                        {
                            'fields': {
                                "SUBJECT": "calendar title",
                                "DESCRIPTION": "calendar body",
                                "DESCRIPTION_TYPE": 3, // text, html, bbCode type id in: BX24.callMethod('crm.enum.contenttype');
                                "OWNER_ID": contactID,
                                "OWNER_TYPE_ID": 3, // BX24.callMethod('crm.enum.ownertype');
                                "TYPE_ID": 1, // BX24.callMethod('crm.enum.activitytype');
                                "COMMUNICATIONS": [
                                    {
                                        'VALUE': contactPhone.VALUE,
                                        'ENTITY_ID': contactID,
                                        'ENTITY_TYPE_ID': 3 // BX24.callMethod('crm.enum.ownertype');
                                    }
                                ],
                                "START_TIME": new Date().toISOString(),
                                "END_TIME": new Date(new Date().getTime() + 3600 * 1000).toISOString(),
                                "RESPONSIBLE_ID": staffID,
                            }
                        },
                        function(resultActivity) {
                            if (resultActivity.error()) {
                                console.error(resultActivity.error() + ': ' + resultActivity.error_description());
                                console.log(JSON.stringify({ 'message': 'Activity not added: ' + resultActivity.error_description() }));
                            } else {
                                console.log(JSON.stringify({ 'message': 'Activity add' }));
                            }
                        }
                    );
                } else {
                    console.log(JSON.stringify({ 'message': 'Activity not added' }));
                }
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
    $resultActivity = [];
    if (!empty($resultContact['result']['ASSIGNED_BY_ID']) && !empty($resultContact['result']['PHONE']))
    {
        $contactPhone = reset($resultContact['result']['PHONE']);
        $staffID = $resultContact['result']['ASSIGNED_BY_ID'];
        $resultActivity = CRest::call(
            'crm.activity.add',
            [
                'fields' => [
                    "SUBJECT" => "calendar title",
                    "DESCRIPTION" => "calendar body",
                    "DESCRIPTION_TYPE" => 3,//text,html,bbCode type id in: CRest::call('crm.enum.contenttype');
                    "OWNER_ID" => $contactID,
                    "OWNER_TYPE_ID" => 3, // CRest::call('crm.enum.ownertype');
                    "TYPE_ID" => 1, // CRest::call('crm.enum.activitytype');
                    "COMMUNICATIONS" => [
                        [
                            'VALUE' => $contactPhone['VALUE'],
                            'ENTITY_ID' => $contactID,
                            'ENTITY_TYPE_ID' => 3// CRest::call('crm.enum.ownertype');
                        ]
                    ],
                    "START_TIME" => date("Y-m-d H:i:s", time()),
                    "END_TIME" => date("Y-m-d H:i:s", time() + 3600),
                    "RESPONSIBLE_ID" => $staffID,
                ]
            ]
        );
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
    ```

{% endlist %}