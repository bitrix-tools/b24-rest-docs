# Просмотреть событие календаря по идентификатору calendar.event.getbyid

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.event.getbyid` возвращает событие календаря по идентификатору.

#|
|| **Параметр** | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор события. ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'calendar.event.getbyid',
        {
            id: 324
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": {
    "ID": "1265",
    "PARENT_ID": "1265",
    "DELETED": "N",
    "CAL_TYPE": "user",
    "OWNER_ID": "1",
    "NAME": "4Event Name",
    "DATE_FROM": "12/11/2024 05:59:00 pm",
    "DATE_TO": "12/11/2024 06:59:00 pm",
    "ORIGINAL_DATE_FROM": null,
    "TZ_FROM": "Europe/Kaliningrad",
    "TZ_TO": "Europe/Kaliningrad",
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
    "DESCRIPTION": "New description for event",
    "PRIVATE_EVENT": "",
    "ACCESSIBILITY": "free",
    "IMPORTANCE": "normal",
    "IS_MEETING": true,
    "MEETING_STATUS": "H",
    "MEETING_HOST": "1",
    "MEETING": {
      "HOST_NAME": "Admin Adminov",
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
    "RRULE": "",
    "EXDATE": "",
    "DAV_XML_ID": "20241211T155900Z-534185204b362e9be7e261e92ccd9078@b24evo.lan",
    "G_EVENT_ID": "",
    "DAV_EXCH_LABEL": "",
    "CAL_DAV_LABEL": "",
    "VERSION": "1",
    "ATTENDEES_CODES": [
      "U1"
    ],
    "RECURRENCE_ID": null,
    "RELATIONS": "",
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
    "OPTIONS": null,
    "ATTENDEE_LIST": [
      {
        "id": 1,
        "entryId": "1265",
        "status": "H"
      }
    ],
    "COLLAB_ID": null,
    "attendeesEntityList": [
      {
        "entityId": "user",
        "id": 1
      }
    ],
    "~DESCRIPTION": "New description for event",
    "~USER_OFFSET_FROM": 7200,
    "~USER_OFFSET_TO": 7200
  },
  "time": {
    "start": 1733406529.495513,
    "finish": 1733406529.744687,
    "duration": 0.2491741180419922,
    "processing": 0.0327458381652832,
    "date_start": "2024-12-05T13:48:49+00:00",
    "date_finish": "2024-12-05T13:48:49+00:00"
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Все доступные поля объекта события ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
  "error": "",
  "error_description": "Не задан обязательный параметр \"id\" для метода \"calendar.event.getbyid\""
}
```