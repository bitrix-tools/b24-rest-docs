# Изменить лид crm.lead.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, имеющий права на редактирование лидов CRM

Метод `crm.lead.update` обновляет существующий лид.

{% note warning %}

Настоятельно рекомендуется при обновлении адреса передавать полный набор полей адреса в метод обновления. Особенности обновления полей адреса описаны [здесь](../data-types.md).

{% endnote %}

#|
|| **Параметр** | **Описание** ||
|| **id**^*^
[`integer`](../../data-types.md) | Целочисленный идентификатор лида. Способ получения описан ниже ||
|| **fields**^*^
[`object`](../../data-types.md) | Набор полей вида `["обновляемое поле" => "значение"[, ...]]`. Способ получения перечня возможных полей описан ниже ||
|| **options**
[`object`](../../data-types.md) | Необязательный набор опций. (`"optionName"=>"value"[, ...]`). Перечень возможных полей описан ниже ||
|#

## Параметр id

Чтобы узнать весь список доступных идентификаторов, выполните метод [crm.lead.list](./crm-lead-list.md)

## Параметр fields

#|
|| **Поле** / **Тип** | **Описание** ||
|| **ADDRESS**
[`string`](../../data-types.md) | Адрес контакта. ||
|| **ADDRESS_2**
[`string`](../../data-types.md) | Вторая страница адреса. В некоторых странах принято разбивать адрес на 2 части. ||
|| **ADDRESS_CITY**
[`string`](../../data-types.md) | Город. ||
|| **ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна. ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны. ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс. ||
|| **ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область. ||
|| **ADDRESS_REGION**
[`string`](../../data-types.md) | Район. ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный. ||
|| **BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения. ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарии. ||
|| **COMPANY_ID**
[`crm_company`](../../data-types.md) | Привязка лида к компании. ||
|| **COMPANY_TITLE**
[`string`](../../data-types.md) | Название компании, указанное в соответствующем поле лида. Для привязки существующей компании стоит передавать её id в поле COMPANY_ID. ||
|| **CONTACT_ID**
[`crm_contact`](../../data-types.md) | Привязка лида к контакту. ||
|| **CONTACT_IDS**
[`crm_contact`](../../data-types.md) | Идентификатор привязанного контакта. Множественный. ||
|| **CURRENCY_ID**
[`crm_currency`](../../data-types.md) | Идентификатор валюты. ||
|| **EMAIL**
[`crm_multifield`](../../data-types.md) | Адрес электронной почты. Множественное. ||
|| **HONORIFIC**
[`crm_status`](../../data-types.md) | Вид обращения. ||
|| **IM**
[`crm_multifield`](../../data-types.md) | Мессенджер. Множественное. ||
|| **LINK**
[`crm_multifield`](../../data-types.md) | ID пользователя, привязанного через открытую линию. Множественное. ||
|| **LAST_NAME**
[`string`](../../data-types.md) | Фамилия ||
|| **NAME**
[`string`](../../data-types.md) | Имя ||
|| **OPENED**
[`char`](../../data-types.md) | Признак доступности лида для всех.  Допустимые значения Y или N. ||
|| **OPPORTUNITY**
[`double`](../../data-types.md) | Сумма. ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../../data-types.md) | Признак ручного режима расчёта суммы.  Допустимые значения Y или N.||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику. ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику. ||
|| **PHONE**
[`crm_multifield`](../../data-types.md) | Телефон. Множественное. ||
|| **POST**
[`string`](../../data-types.md) | Должность. ||
|| **SECOND_NAME**
[`string`](../../data-types.md) | Отчество ||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Описание источника. ||
|| **SOURCE_ID**
[`crm_status`](../../data-types.md) | Идентификатор источника.
Значения по умолчанию:

#|
||SOURCE_ID|Название||
||CALL|Звонок||
||EMAIL|Электронная почта||
||WEB|Веб-сайт||
||ADVERTISING|Реклама||
||PARTNER|Существующий клиент||
||RECOMMENDATION|По рекомендации||
||TRADE_SHOW|Выставка||
||WEBFORM|CRM-форма||
||CALLBACK|Обратный звонок||
||RC_GENERATOR|Генератор продаж||
||STORE|Интернет-магазин||
||OTHER|Другое||
|#

Список всех возможных идентификаторов из справочника можно получить методом crm.status.list с фильтром `filter[ENTITY_ID]=SOURCE` ||
|| **STATUS_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно о стадии ||
|| **STATUS_ID**
[`crm_status`](../../data-types.md) | Идентификатор стадии лида. Стадии по умолчанию:

#|
||STATUS_ID|Название||
||NEW | Не обработан||
||IN_PROCESS | В работе||
||PROCESSED | Обработан||
||JUNK | Некачественный лид||
||CONVERTED | Качественный лид||
|#

Список всех возможных стадий из справочника можно получить методом crm.status.list с фильтром `filter[ENTITY_ID]=STATUS` ||
|| **TITLE**
[`string`](../../data-types.md) | Название лида. ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании. ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений. ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. CPC (объявления), CPM (баннеры). ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система. Yandex-Direct, Google-Adwords и другие. ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы. ||
|| **WEB**
[`crm_multifield`](../../data-types.md) | Сайт. Множественное. ||
|| **ufCrm_ххх** | пользовательские поля. Смотри раздел [{#T}](../universal/user-defined-fields/index.md) ||
|#

{% note info %}

Так же, чтобы узнать требуемый формат полей, можно выполнить метод [crm.lead.fields](crm-lead-fields.md) и посмотреть формат пришедших значений этих полей.

{% endnote %}

{% note info %}

При добавлении лида нельзя явно установить признак повторного лида (поле `IS_RETURN_CUSTOMER`), однако, это поле автоматически принимает значение Y, если при добавлении лида указать значение для `COMPANY_ID` или `CONTACT_ID`

{% endnote %}

## Параметр options

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **REGISTER_SONET_EVENT**
[`char`](../../data-types.md) | произвести регистрацию события добавления лида в живой ленте. Дополнительно будет отправлено уведомление ответственному за лид. Допустимые значения Y или N. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- cURL

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1608,"fields":{"TITLE":"ИП Титов","PHONE":{0:{"VALUE":"555888","VALUE_TYPE":"WORK"}}} ,"auth":"**put_access_token_here**"}' \
    https://xxx.bitrix24.com/rest/crm.lead.update
    ```

- JS

    ```javascript
    BX24.callMethod(
        "crm.lead.update",
        {
            id: 1608,
            fields:
            {
                TITLE: "ИП Титов",
                NAME: "Глеб",
                SECOND_NAME: "Егорович",
                LAST_NAME: "Титов",
                STATUS_ID: "NEW",
                OPENED: "Y",
                ASSIGNED_BY_ID: 1,
                CURRENCY_ID: "USD",
                OPPORTUNITY: 12500,
                PHONE: [
                    {
                        VALUE: "555888",
                        VALUE_TYPE: "WORK",
                    },
                ],
                WEB: [
                    {
                        VALUE: "www.mysite.com",
                        VALUE_TYPE: "WORK",
                    }
                ],
            },
            options: {
                REGISTER_SONET_EVENT: "Y",
            }
        },
        (result) => {
            if (result.error())
            {
                console.error(result.error());return;
            }
    
            console.info(result.data());
        }
    );
    ```


- B24-PHP-SDK

    ```php
        
    try {
        $id = 123; // Example lead ID
        $fields = [
            'TITLE' => 'Updated Lead Title',
            'NAME' => 'John',
            'LAST_NAME' => 'Doe',
            'BIRTHDATE' => (new DateTime('1980-01-01'))->format(DateTime::ATOM),
            'COMPANY_TITLE' => 'Example Company',
            'STATUS_ID' => 'NEW',
            'COMMENTS' => 'Updated comments for the lead.',
            'PHONE' => '1234567890',
            'EMAIL' => 'john.doe@example.com',
        ];
        $params = [
            'REGISTER_SONET_EVENT' => 'Y',
        ];
    
        $result = $serviceBuilder->getCRMScope()->lead()->update($id, $fields, $params);
    
        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print("Update failed.");
        }
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    
    ```

- PHP

    ```php
    $fields = [
        'TITLE' => $sTitle,
        'COMPANY_ID' => 123,
        'PHONE' => [
            [
                'VALUE' => '555888',
                'VALUE_TYPE' => 'WORK',
            ],
        ],
    ];
    
    $result = CRest::call(
        'crm.lead.update',
        [
            'id' => 1608,
            'fields' => $fields,
        ],
        [
            'REGISTER_SONET_EVENT' => 'Y',
        ]     
    );
    ```

- HTTPS

    ```http
    https://xxx.bitrix24.com/rest/1/5***/crm.lead.update.json?id=1734&fields[NAME]=Василий&fields[SECOND_NAME]=Петрович&fields[LAST_NAME]=Космонавт&fields[PHONE][0][VALUE]=89994445556&fields[PHONE][0][VALUE_TYPE]=WORK&fields[EMAIL][0][VALUE]=test@ya.ru&fields[EMAIL][0][VALUE_TYPE]=WORK
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Смотри также

- [Как обновить поле с типом "бронирование ресурсов"](../../calendar/calendar-resource-booking-list.md)

## Ответ в случае успеха

> 200 OK

```json
{
    "result": true,
    "time": {
        "start": 1705764932.998683,
        "finish": 1705764937.173995,
        "duration": 4.1753120422363281,
        "processing": 3.3076529502868652,
        "date_start": "2024-01-20T18:35:32+03:00",
        "date_finish": "2024-01-20T18:35:37+03:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Значение** / **Тип** | **Описание** ||
|| **result**
`boolean`| Результат запроса ||
|| **time**
[`array`](../../data-types.md) | Информация о времени выполнения запроса ||
|| **start**
[`double`](../../data-types.md) | Timestamp момента инициализации запроса ||
|| **finish**
[`double`](../../data-types.md) | Timestamp момента завершения выполнения запроса ||
|| **duration**
[`double`](../../data-types.md) | Как долго в миллисекундах выполнялся запрос (finish - start) ||
|| **date_start**
[`string`](../../data-types.md) | Строковое представление даты и времени момента инициализации запроса ||
|| **date_finish**
[`double`](../../data-types.md) | Строковое представление даты и времени момента завершения запроса ||
|| **operating_reset_at**
[`timestamp`](../../data-types.md) | Timestamp момента, когда будет сброшен лимит на ресурсы REST API. Читайте подробности в статье [лимит на операции](../../../limits.md) ||
|| **operating**
[`double`](../../data-types.md) | Через сколько миллисекунд будет сброшен лимит на ресурсы REST API? Читайте подробности в статье [лимит на операции](../../../limits.md) ||
|#

## Ответ в случае ошибки

> HTTP-статус: 40x, 50x Error

```json
{
    "error": "",
    "error_description": "ID is not defined or invalid."
}
```

### Возможные ошибки

#|  
|| **Текст ошибки** | **Описание** ||
|| ID is not defined or invalid. | Не указан или не является положительным числом уникальным идентификатор лида. ||
|| Access denied. | У пользователя нет прав на редактирвоание лида. ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}