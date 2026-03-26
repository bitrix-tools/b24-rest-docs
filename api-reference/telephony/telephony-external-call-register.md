# Зарегистрировать звонок в Битрикс24 telephony.externalCall.register

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalCall.register` регистрирует внешний звонок в Битрикс24.

Для создания дела звонок необходимо также вызвать метод [telephony.externalcall.finish](./telephony-external-call-finish.md)

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID*** 
[`integer`](../data-types.md) | Идентификатор пользователя, для которого регистрируется звонок.

Идентификатор можно получить методом [user.get](../user/user-get.md) ||
|| **USER_PHONE_INNER*** 
[`string`](../data-types.md) | Внутренний номер пользователя.

Внутренний номер можно получить методом [user.get](../user/user-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `USER_ID` или `USER_PHONE_INNER`

{% endnote %} ||
|| **PHONE_NUMBER***
[`string`](../data-types.md) | Номер телефона клиента ||
|| **TYPE***
[`integer`](../data-types.md) | Тип звонка.

Возможные значения:
- `1` — исходящий
- `2` — входящий
- `3` — входящий с перенаправлением
- `4` — обратный звонок
- `5` — информационный звонок ||
|| **CALL_START_DATE**
[`string`](../data-types.md) | Дата и время начала звонка в формате ISO-8601 с указанием часового пояса, например `2026-03-07T10:20:30+03:00`.

По умолчанию — текущее время на сервере ||
|| **CRM_CREATE**
[`integer`](../data-types.md) | Автоматическое создание объекта CRM, если по номеру не найден подходящий объект.

Возможные значения:
- `0` — не создавать
- `1` — создавать
  
По умолчанию — `0`. 

Для исходящих звонков через внешнюю линию итоговое поведение также зависит от значения параметра `CRM_AUTO_CREATE`, заданного для линии в методах [telephony.externalLine.add](./telephony-external-line-add.md) и [telephony.externalLine.update](./telephony-external-line-update.md) ||
|| **CRM_SOURCE**
[`string`](../data-types.md) | Идентификатор источника CRM (значение поля `STATUS_ID`).

Список значений можно получить методом [crm.status.list](../crm/status/crm-status-list.md) с фильтром `ENTITY_ID: 'SOURCE'` ||
|| **CRM_ENTITY_TYPE**
[`string`](../data-types.md) | Тип объекта CRM, с которым нужно связать звонок.

Возможные значения:
- `CONTACT` — контакт
- `COMPANY` — компания
- `LEAD` — лид ||
|| **CRM_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор объекта CRM из `CRM_ENTITY_TYPE`.

Идентификатор можно получить методами:
- [crm.contact.list](../crm/contacts/crm-contact-list.md)
- [crm.company.list](../crm/companies/crm-company-list.md)
- [crm.lead.list](../crm/leads/crm-lead-list.md) ||
|| **SHOW**
[`integer`](../data-types.md) | Показывать карточку звонка после регистрации.

Возможные значения:
- `0` — не показывать
- `1` — показывать

По умолчанию — `1` ||
|| **ADD_TO_CHAT**
[`integer`](../data-types.md) | Добавлять сообщение о звонке в чат сотрудника.

Возможные значения:
- `0` — не добавлять
- `1` — добавлять

По умолчанию — `1` ||
|| **CALL_LIST_ID**
[`integer`](../data-types.md) | Идентификатор [списка обзвона](../crm/call-list/index.md), к которому привязывается звонок.

Если звонок инициирован из обзвона, передавайте идентификатор, полученный в событии [ONEXTERNALCALLSTART](./events/on-external-call-start.md).

Список доступных обзвонов можно получить методом [crm.calllist.list](../crm/call-list/crm-calllist-list.md) ||
|| **LINE_NUMBER**
[`string`](../data-types.md) | Номер внешней линии.

Номер линии можно получить методом [telephony.externalLine.get](./telephony-external-line-get.md).

Параметр не является обязательным, но рекомендуется передавать его всегда, особенно для входящих звонков, чтобы корректно работали привязка линии и отчеты/аналитика телефонии ||
|| **EXTERNAL_CALL_ID**
[`string`](../data-types.md) | Внешний идентификатор звонка на стороне АТС/интеграции. Используется для дедупликации повторной регистрации ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":1269,"PHONE_NUMBER":"79062195047","TYPE":2,"CRM_ENTITY_TYPE":"CONTACT","CRM_ENTITY_ID":797,"SHOW":1,"LINE_NUMBER":"3","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalCall.register
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'telephony.externalCall.register',
            {
                USER_ID: 1269,
                PHONE_NUMBER: '79062195047',
                TYPE: 2,
                CRM_ENTITY_TYPE: 'CONTACT',
                CRM_ENTITY_ID: 797,
                SHOW: 1,
                LINE_NUMBER: '3'
            }
        );
        
        const result = response.getData().result;
        console.log('Call registered:', result);
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'telephony.externalCall.register',
                [
                    'USER_ID' => 1269,
                    'PHONE_NUMBER' => '79062195047',
                    'TYPE' => 2,
                    'CRM_ENTITY_TYPE' => 'CONTACT',
                    'CRM_ENTITY_ID' => 797,
                    'SHOW' => 1,
                    'LINE_NUMBER' => '3'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error registering call: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalCall.register",
        {
            USER_ID: 1269,
            PHONE_NUMBER: '79062195047',
            TYPE: 2,
            CRM_ENTITY_TYPE: 'CONTACT',
            CRM_ENTITY_ID: 797,
            SHOW: 1,
            LINE_NUMBER: '3'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'telephony.externalCall.register',
        [
            'USER_ID' => 1269,
            'PHONE_NUMBER' => '79062195047',
            'TYPE' => 2,
            'CRM_ENTITY_TYPE' => 'CONTACT',
            'CRM_ENTITY_ID' => 797,
            'SHOW' => 1,
            'LINE_NUMBER' => '3'
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
    "result": {
        "CALL_ID": "externalCall.716f1cb73def9700a23842adf9c4c568.1773130779",
        "CRM_CREATED_LEAD": null,
        "CRM_CREATED_ENTITIES": [],
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": 797
    },
    "time": {
        "start": 1773130778,
        "finish": 1773130779.120838,
        "duration": 1.120837926864624,
        "processing": 1,
        "date_start": "2026-03-10T11:19:38+03:00",
        "date_finish": "2026-03-10T11:19:39+03:00",
        "operating_reset_at": 1773131378,
        "operating": 0.22185301780700684
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **CALL_ID**
[`string`](../data-types.md) | Идентификатор звонка ||
|| **CRM_CREATED_LEAD**
[`integer`](../data-types.md) | Идентификатор автоматически созданного лида ||
|| **CRM_CREATED_ENTITIES**
[`array`](../data-types.md) | Массив автоматически созданных [объектов CRM](#result-crm-created-entities) ||
|| **CRM_ENTITY_TYPE**
[`string`](../data-types.md) | Тип основного объекта CRM звонка ||
|| **CRM_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор основного объекта CRM звонка ||
|| **LEAD_CREATION_ERROR**
[`string`](../data-types.md) | Текст ошибки при автосоздании лида (если возникла) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект CRM_CREATED_ENTITIES {#result-crm-created-entities}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE**
[`string`](../data-types.md) | Тип созданного объекта CRM ||
|| **ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор созданного объекта CRM ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Unknown TYPE"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван вне контекста приложения ||
|| `ERROR_CORE` | USER_ID or USER_PHONE_INNER should be set | Не переданы `USER_ID` и `USER_PHONE_INNER` ||
|| `ERROR_CORE` | Unknown TYPE | Передано недопустимое значение `TYPE` ||
|| `ERROR_CORE` | CALL_START_DATE should be in the ISO-8601 format | Некорректный формат `CALL_START_DATE` ||
|| `ERROR_CORE` | Unsupported phone number format | Некорректный формат `PHONE_NUMBER` ||
|| `ERROR_CORE` | User is not found or is not active | Пользователь не найден или неактивен ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-call-search-crm-entities.md)
- [{#T}](./telephony-external-call-show.md)
- [{#T}](./telephony-external-call-hide.md)
- [{#T}](./telephony-external-call-finish.md)
- [{#T}](./telephony-external-call-attach-record.md)
