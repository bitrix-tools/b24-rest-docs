# Получить список будущих событий calendar.event.get.nearest

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список будущих событий.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../data-types.md) | Тип календаря: 
- `user` — календарь пользователя
- `group` — календарь группы
- `company_calendar` — календарь компании ||
|| **ownerId**
[`integer`](../../data-types.md) | Идентификатор владельца календаря.

Для календаря компании параметр `ownerId` имеет значение `0` ||
|| **days**
[`integer`](../../data-types.md) | Число дней для выборки. По умолчанию — `60` ||
|| **forCurrentUser**
[`boolean`](../../data-types.md) | Вывод списка событий для текущего пользователя. По умолчанию — `true` ||
|| **maxEventsCount**
[`integer`](../../data-types.md) | Максимальное число выводимых событий ||
|| **detailUrl**
[`string`](../../data-types.md) | Ссылка URL календаря ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

1. Получить события текущего пользователя за следующие 10 дней.

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"user","ownerId":2,"days":10,"forCurrentUser":true,"maxEventsCount":100,"detailUrl":"/company/personal/user/#user_id#/calendar/"}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.event.get.nearest
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"user","ownerId":2,"days":10,"forCurrentUser":true,"maxEventsCount":100,"detailUrl":"/company/personal/user/#user_id#/calendar/","auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/calendar.event.get.nearest
        ```

    - JS

        ```js
        BX24.callMethod(
            'calendar.event.get.nearest',
            {
                type: 'user',
                ownerId: 2,
                days: 10,
                forCurrentUser: true,
                maxEventsCount: 100,
                detailUrl: '/company/personal/user/#user_id#/calendar/'
            }
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'calendar.event.get.nearest',
            [
                'type' => 'user',
                'ownerId' => 2,
                'days' => 10,
                'forCurrentUser' => true,
                'maxEventsCount' => 100,
                'detailUrl' => '/company/personal/user/#user_id#/calendar/'
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}


2. Получить события календаря компании.

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"company_calendar","ownerId":"","forCurrentUser":false}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/calendar.event.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"company_calendar","ownerId":"","forCurrentUser":false,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/calendar.event.get
        ```

    - JS

        ```js
        BX24.callMethod(
            'calendar.event.get',
            {
                type: 'company_calendar',
                ownerId: 0, // ownerId не указывается при выборке событий календаря компании. Он пустой для всех событий такого типа.
                forCurrentUser: false
            }
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'calendar.event.get',
            [
                'type' => 'company_calendar',
                'ownerId' => '',
                'forCurrentUser' => false
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "1265",
            "PARENT_ID": "1265",
            "DELETED": "N",
            "CAL_TYPE": "user",
            "OWNER_ID": "1",
            "NAME": "Event Name",
            "DATE_FROM": "12/11/2024 05:59:00 pm",
            "DATE_TO": "12/11/2024 06:59:00 pm",
            "ORIGINAL_DATE_FROM": null,
            "TZ_FROM": "Europe/Riga",
            "TZ_TO": "Europe/Riga",
            "TZ_OFFSET_FROM": "7200",
            "TZ_OFFSET_TO": "7200",
            "DATE_FROM_TS_UTC": "1733932740",
            "DATE_TO_TS_UTC": "1733936340",
            "DT_SKIP_TIME": "N",
            "DT_LENGTH": 3600,
            "EVENT_TYPE": null,
            "CREATED_BY": "1",
            "DATE_CREATE": "12/05/2024 01:48:41 pm",
            "TIMESTAMP_X": "12/05/2024 01:48:41 pm",
            "DESCRIPTION": "Description for event",
            "PRIVATE_EVENT": "",
            "ACCESSIBILITY": "free",
            "IMPORTANCE": "normal",
            "IS_MEETING": true,
            "MEETING_STATUS": "H",
            "MEETING_HOST": "1",
            "MEETING": {
                "HOST_NAME": "User Name",
                "NOTIFY": false,
                "REINVITE": false,
                "ALLOW_INVITE": false,
                "HIDE_GUESTS": false,
                "MEETING_CREATOR": 1,
                "LANGUAGE_ID": "ru",
                "MAIL_FROM": ""
            },
            "LOCATION": "test location",
            "REMIND": [
                {
                    "type": "min",
                    "count": 50
                }
            ],
            "COLOR": "#9dcf00",
            "RRULE": {
                "FREQ": "WEEKLY",
                "BYDAY": {
                    "MO": "MO",
                    "WE": "WE"
                },
                "INTERVAL": 1,
                "UNTIL": "12/24/2024",
                "~UNTIL": "12/24/2024",
                "UNTIL_TS": 1734998400
            },
            "EXDATE": "11/28/2024;12/05/2024;12/12/2024;12/19/2024;12/26/2024",
            "DAV_XML_ID": "20241211T155900Z-534185204b362e9be7e261e92ccd9078@b24evo.lan",
            "G_EVENT_ID": "",
            "DAV_EXCH_LABEL": "",
            "CAL_DAV_LABEL": "",
            "VERSION": "1",
            "ATTENDEES_CODES": [
                "U1"
            ],
            "RECURRENCE_ID": 1272,
            "RELATIONS": {
                "ORIGINAL_RECURSION_ID": 1271,
                "COMMENT_XML_ID": "EVENT_1271_12/23/2024"
            },
            "SECTION_ID": "4",
            "SYNC_STATUS": null,
            "UF_CRM_CAL_EVENT": [
                "CO_1",
                "L_5"
            ],
            "UF_WEBDAV_CAL_EVENT": false,
            "SECTION_DAV_XML_ID": null,
            "DATE_FROM_FORMATTED": "Wed Dec 11 2024 17:59:00",
            "DATE_TO_FORMATTED": "Wed Dec 11 2024 18:59:00",
            "SECT_ID": "4",
            "ATTENDEE_LIST": [
                {
                    "id": 1,
                    "entryId": "1265",
                    "status": "H"
                }
            ],
            "COLLAB_ID": null,
            "~RRULE_DESCRIPTION": "каждую неделю по: Пн, Ср, от 12/11/2024 до 12/24/2024",
            "attendeesEntityList": [
                {
                    "entityId": "user",
                    "id": 1
                }
            ],
            "~DESCRIPTION": "Description for event",
            "~USER_OFFSET_FROM": 7200,
            "~USER_OFFSET_TO": 7200
        },
        {
            "ID": "1221",
            ...
        }
    ],
    "time": {
        "start": 1733411636.753706,
        "finish": 1733411637.040975,
        "duration": 0.28726911544799805,
        "processing": 0.05995798110961914,
        "date_start": "2024-12-05T15:13:56+00:00",
        "date_finish": "2024-12-05T15:13:57+00:00"
    }
}
```

### Возвращаемые данные

{% include notitle [поля события календаря](.././_includes/calendar_event_fields.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Доступ запрещен"
}
```
{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| Пустая строка | Доступ запрещен | Запрещен доступ к типу календаря или у пользователя не активирована функциональность календаря ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}
