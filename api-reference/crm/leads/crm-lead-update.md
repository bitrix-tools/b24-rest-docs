# Изменить лид crm.lead.update

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, имеющий права на редактирование лидов CRM

Метод `crm.lead.update` обновляет существующий лид.

## Параметры метода

{% note warning %}

Настоятельно рекомендуется при обновлении адреса передавать полный набор полей адреса в метод обновления. Особенности обновления полей адреса описаны [здесь](../data-types.md).

{% endnote %}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор лида.

Идентификатор можно получить с помощью методов [crm.lead.list](./crm-lead-list.md) или [crm.lead.add](./crm-lead-add.md) ||
|| **fields**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля
- `value_n` — новое значение поля

Список доступных полей описан [ниже](#fields).

Некорректное поле в `fields` будет проигнорировано.

В `fields` нужно передавать только те поля, которые требуется изменить
||
|| **params** 
[`object`](../../data-types.md)|Необязательный набор опций. (`"paramName"=>"value"[, ...]`). Перечень возможных полей описан [ниже](#params) ||
|#

## Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ADDRESS**
[`string`](../../data-types.md) | Адрес лида ||
|| **ADDRESS_2**
[`string`](../../data-types.md) | Вторая страница адреса. В некоторых странах принято разбивать адрес на 2 части ||
|| **ADDRESS_CITY**
[`string`](../../data-types.md) | Город ||
|| **ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс ||
|| **ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область ||
|| **ADDRESS_REGION**
[`string`](../../data-types.md) | Район ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный ||
|| **BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарии ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Привязка лида к компании ||
|| **COMPANY_TITLE**
[`string`](../../data-types.md) | Название компании, указанное в соответствующем поле лида. Для привязки существующей компании стоит передавать её id в поле COMPANY_ID ||
|| **CONTACT_ID**
[`crm_contact`](../data-types.md) | Привязка лида к контакту ||
|| **CONTACT_IDS**
[`crm_contact`](../data-types.md) | Список привязанных к лиду контактов.

Контакты можно добавлять или удалять группой методов [crm.lead.contact.*](./management-communication/index.md)||
|| **CURRENCY_ID**
[`crm_currency`](../data-types.md) | Идентификатор валюты ||
|| **EMAIL**
[`crm_multifield`](../data-types.md) | Адрес электронной почты. Множественное ||
|| **HONORIFIC**
[`crm_status`](../data-types.md) | Вид обращения ||
|| **IM**
[`crm_multifield`](../data-types.md) | Мессенджер. Множественное ||
|| **LINK**
[`crm_multifield`](../data-types.md) | ID пользователя, привязанного через открытую линию. Множественное ||
|| **LAST_NAME**
[`string`](../../data-types.md) | Фамилия ||
|| **NAME**
[`string`](../../data-types.md) | Имя ||
|| **SECOND_NAME**
[`string`](../../data-types.md) | Отчество ||
|| **OPENED**
[`char`](../../data-types.md) | Признак доступности лида для всех.  Допустимые значения Y или N ||
|| **OPPORTUNITY**
[`double`](../../data-types.md) | Сумма ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../../data-types.md) | Признак ручного режима расчёта суммы.  Допустимые значения Y или N||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику ||
|| **PHONE**
[`crm_multifield`](../data-types.md) | Телефон. Множественное ||
|| **POST**
[`string`](../../data-types.md) | Должность ||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Описание источника ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Идентификатор источника.
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

Список всех возможных идентификаторов из справочника можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=SOURCE` ||
|| **STATUS_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно о стадии ||
|| **STATUS_ID**
[`crm_status`](../data-types.md) | Идентификатор стадии лида. Стадии по умолчанию:

#|
||STATUS_ID|Название||
||NEW | Не обработан||
||IN_PROCESS | В работе||
||PROCESSED | Обработан||
||JUNK | Некачественный лид||
||CONVERTED | Качественный лид||
|#

Список всех возможных стадий из справочника можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром `filter[ENTITY_ID]=STATUS` ||
|| **TITLE**
[`string`](../../data-types.md) | Название лида ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. CPC (объявления), CPM (баннеры) ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система. Yandex-Direct, Google-Adwords и другие ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **WEB**
[`crm_multifield`](../data-types.md) | Сайт. Множественное ||
|| **UF_...** | Пользовательские поля. Например, `UF_CRM_25534736`.  

В зависимости от настроек портала у лидов может быть набор пользовательских полей определенных типов. 

Для изменения файловых полей рекомендуется использовать метод [crm.item.update](../universal/crm-item-update.md).

Для создания, изменения или удаления пользовательских полей в лидах используйте методы [crm.lead.userfield.*](./userfield/index.md) ||
|#

{% note info %}

Так же, чтобы узнать требуемый формат полей, можно выполнить метод [crm.lead.fields](./crm-lead-fields.md) и посмотреть формат пришедших значений этих полей.

{% endnote %}

{% note info %}

При изменении лида нельзя явно установить признак повторного лида (поле `IS_RETURN_CUSTOMER`), однако, это поле автоматически принимает значение Y, если при изменении лида указать значение для `COMPANY_ID` или `CONTACT_ID`

{% endnote %}

## Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **REGISTER_SONET_EVENT**
[`char`](../../data-types.md) | произвести регистрацию события добавления лида в живой ленте. Дополнительно будет отправлено уведомление ответственному за лид. Допустимые значения `Y` или `N` ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1608,"fields":{"TITLE":"ИП Титов","NAME":"Глеб","SECOND_NAME":"Егорович","LAST_NAME":"Титов","STATUS_ID":"NEW","OPENED":"Y","ASSIGNED_BY_ID":1,"CURRENCY_ID":"USD","OPPORTUNITY":12500,"PHONE":[{"VALUE":"555888","VALUE_TYPE":"WORK"}],"WEB":[{"VALUE":"www.mysite.com","VALUE_TYPE":"WORK"}]},"params":{"REGISTER_SONET_EVENT":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.lead.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1608,"fields":{"TITLE":"ИП Титов","NAME":"Глеб","SECOND_NAME":"Егорович","LAST_NAME":"Титов","STATUS_ID":"NEW","OPENED":"Y","ASSIGNED_BY_ID":1,"CURRENCY_ID":"USD","OPPORTUNITY":12500,"PHONE":[{"VALUE":"555888","VALUE_TYPE":"WORK"}],"WEB":[{"VALUE":"www.mysite.com","VALUE_TYPE":"WORK"}]},"params":{"REGISTER_SONET_EVENT":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
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
    			params: {
    				REGISTER_SONET_EVENT: "Y",
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP

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

- BX24.js

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
            params: {
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

- PHP CRest

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

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

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
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

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
|| `ID is not defined or invalid` | В параметр `id` передано не целое число больше нуля ||
|| `Not found` | Лид с переданным `id` не существует ||
|| `Access denied` | У пользователя нет прав на редактирвоание лида ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}
