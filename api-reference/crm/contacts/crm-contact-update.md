# Изменить контакт crm.contact.update

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «изменения» контактов

Метод `crm.contact.update` обновляет существующий контакт.

Рекомендуем при обновлении адреса передавать полный набор полей адреса в метод обновления. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`][1] | Идентификатор контакта, который нужно изменить. 

Идентификатор можно получить методами [`crm.сontact.list`](crm-contact-list.md) или [`crm.contact.add`](crm-contact-add.md) ||
|| **fields***
[`object`][1] | Объект формата:

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

Список доступных полей описан [ниже](#parameter-fields).

Некорректное поле в `fields` будет проигнорировано.

В `fields` нужно передавать только те поля, которые нужно изменить
||
|| **params**
[`object`][1] | Объект, содержащий набор дополнительных параметров.

Структура и возможные значения описаны [ниже](#parameter-params)
|#

### Параметр fields {#parameter-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **HONORIFIC**
[`crm_status`](../data-types.md) | Обращение.

Список доступных типов обращений можно узнать с помощью [`crm.status.list`][2], применив фильтр `{ ENTITY_ID: "HONORIFIC" }` ||
|| **NAME**
[`string`][1] | Имя ||
|| **SECOND_NAME**
[`string`][1] | Отчество ||
|| **LAST_NAME**
[`string`][1] | Фамилия ||
|| **PHOTO**
[`file`][1] | Фотография ||
|| **BIRTHDATE**
[`date`][1] | Дата рождения ||
|| **TYPE_ID**
[`crm_status`](../data-types.md) | Тип контакта.
Список доступных типов контакта можно узнать с помощью [`crm.status.list`][2], применив фильтр `{ ENTITY_ID: "CONTACT_TYPE" }` ||
|| **SOURCE_ID**
[`crm_status`](../data-types.md) | Источник
Список доступных типов источника можно узнать с помощью [`crm.status.list`][2], применив фильтр `{ ENTITY_ID: "SOURCE" }` ||
|| **SOURCE_DESCRIPTION**
[`string`][1] | Дополнительно об источнике ||
|| **POST**
[`string`][1] | Должность ||
|| **COMMENTS**
[`string`][1] | Комментарий. Поддерживает bb-коды ||
|| **OPENED**
[`boolean`][1] | Доступен ли для всех. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **EXPORT**
[`boolean`][1] | Участвует ли контакт в экспорте. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **ASSIGNED_BY_ID**
[`user`][1] | Идентификатор пользователя, ответственного за элемент ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор основной компании для контакта.

Список компаний можно получить с помощью метода [`crm.item.list`](../universal/crm-item-list.md) по `entityTypeId = 4` ||
|| **COMPANY_IDS**
[`crm_company[]`](../data-types.md) | Массив идентификаторов компаний, к которым привязан контакт.

Список компаний можно получить с помощью метода [`crm.item.list`](../universal/crm-item-list.md) по `entityTypeId = 4`  ||
|| **UTM_SOURCE**
[`string`][1] | Рекламная система (Yandex-Direct, Google-Adwords и другие)  ||
|| **UTM_MEDIUM**
[`string`][1] | Тип трафика. Возможные значения:
- `CPC` — объявления
- `CPM` — баннеры ||
|| **UTM_CAMPAIGN**
[`string`][1] | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`][1] | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`][1] | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
|| **PHONE**
[`crm_multifield[]`](../data-types.md) | Телефон ||
|| **EMAIL**
[`crm_multifield[]`](../data-types.md) | E-mail ||
|| **WEB**
[`crm_multifield[]`](../data-types.md) | Сайт ||
|| **IM**
[`crm_multifield[]`](../data-types.md) | Мессенджер ||
|| **LINK**
[`crm_multifield[]`](../data-types.md) | Ссылки. Служебное поле ||
||**UF_...**  | Пользовательские поля. Например, `UF_CRM_25534736`. 

В зависимости от настроек портала у контактов может быть набор пользовательских полей определенных типов. 

Для изменения файловых полей рекомендуется использовать метод [crm.item.update](../universal/crm-item-update.md).

Добавить пользовательское поле в контакт можно с помощью метода [crm.contact.userfield.add](./userfield/crm-contact-userfield-add.md) ||
||**PARENT_ID_...** | Поля связей. 

Если на портале есть смарт-процессы, связанные с контактами, для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и контактом. Само поле хранит идентификатор элемента такого смарт-процесса. 

Например, поле `PARENT_ID_153` — связь со смарт-процессом `entityTypeId=153`. Оно хранит идентификатор элемента этого смарт-процесса, связанного с текущим контактом ||
|#

**Поля связи с внешними источниками данных**

Если контакт создан внешней системой, то:
- поле `ORIGINATOR_ID` хранит строковый идентификатор этой системы
- поле `ORIGIN_ID` хранит строковый идентификатор контакта в этой внешней системе
- поле `ORIGIN_VERSION` хранит версию данных контакта в этой внешней системе

#|
|| **Название**
`тип` | **Описание** ||
|| **ORIGINATOR_ID**
[`string`][1] | Идентификатор внешней системы, являющейся источником данных об этом контакте ||
|| **ORIGIN_ID**
[`string`][1] | Версия данных о контакте во внешней системе. Используется для защиты данных от случайного перетирания внешней системой. 

Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть редактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных ||
|| **ORIGIN_VERSION**
[`string`][1] | Версия оригинала ||
|#

**Устаревшие поля**

Поля адреса в контакте являются устаревшими и используются только в режиме совместимости. Для работы с адресом используйте [реквизиты](../requisites/index.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **ADDRESS**
[`string`][1] | Адрес ||
|| **ADDRESS_2**
[`string`][1] | Вторая строка адреса ||
|| **ADDRESS_CITY**
[`string`][1] | Город ||
|| **ADDRESS_POSTAL_CODE**
[`string`][1] | Почтовый индекс ||
|| **ADDRESS_REGION**
[`string`][1] | Район ||
|| **ADDRESS_PROVINCE**
[`string`][1] | Область ||
|| **ADDRESS_COUNTRY**
[`string`][1] | Страна ||
|| **ADDRESS_COUNTRY_CODE**
[`string`][1] | Код страны ||
|| **ADDRESS_LOC_ADDR_ID**
[`integer`][1] | Идентификатор адреса местоположения ||
|#

### Параметр params {#parameter-params}

#|
|| **Название**
`тип` | **Описание** ||
|| **REGISTER_SONET_EVENT**
[`boolean`][1] | Производить ли регистрацию события обновления контакта в живой ленте. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|| **REGISTER_HISTORY_EVENT**
[`boolean`][1] | Производить ли регистрацию обновления контакта в истории. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Изменить контакт c `id = 43`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":43,"FIELDS":{"NAME":"Сергей","BIRTHDATE":"11.11.1999","TYPE_ID":"RECOMMENDATION","SOURCE_ID":"WEB","POST":"Администратор компьютерных сетей","COMMENTS":"Новый комментарий","OPENED":"N","EXPORT":"Y","ASSIGNED_BY_ID":1,"COMPANY_ID":12,"COMPANY_IDS":[13,15],"UF_CRM_1720697698689":"Пример нового значения пользовательского поля с типом \"Строка\"","PARENT_ID_1224":14},"PARAMS":{"REGISTER_SONET_EVENT":"N","REGISTER_HISTORY_EVENT":"N"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":43,"FIELDS":{"NAME":"Сергей","BIRTHDATE":"11.11.1999","TYPE_ID":"RECOMMENDATION","SOURCE_ID":"WEB","POST":"Администратор компьютерных сетей","COMMENTS":"Новый комментарий","OPENED":"N","EXPORT":"Y","ASSIGNED_BY_ID":1,"COMPANY_ID":12,"COMPANY_IDS":[13,15],"UF_CRM_1720697698689":"Пример нового значения пользовательского поля с типом \"Строка\"","PARENT_ID_1224":14},"PARAMS":{"REGISTER_SONET_EVENT":"N","REGISTER_HISTORY_EVENT":"N"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.contact.update',
    		{
    			id: 43,
    			fields: {
    				NAME: "Сергей",
    				BIRTHDATE: '11.11.1999',
    				TYPE_ID: "RECOMMENDATION",
    				SOURCE_ID: "WEB",
    				POST: "Администратор компьютерных сетей",
    				COMMENTS: "Новый комментарий",
    				OPENED: "N",
    				EXPORT: "Y",
    				ASSIGNED_BY_ID: 1,
    				COMPANY_ID: 12,
    				COMPANY_IDS: [13, 15],
    				UF_CRM_1720697698689: "Пример нового значения пользовательского поля с типом \"Строка\"",
    				PARENT_ID_1224: 14,
    			},
    			params: {
    				REGISTER_SONET_EVENT: "N",
    				REGISTER_HISTORY_EVENT: "N",
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result)
    	;
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php        
    try {
        $contactId = 123; // Example contact ID
        $fields = [
            'NAME' => 'John',
            'LAST_NAME' => 'Doe',
            'BIRTHDATE' => (new DateTime('1990-01-01'))->format(DateTime::ATOM),
            'PHONE' => '123456789',
            'EMAIL' => 'john.doe@example.com',
            'ADDRESS' => '123 Main St',
            'ADDRESS_CITY' => 'Anytown',
            'ADDRESS_COUNTRY' => 'USA',
        ];
        $params = [
            'REGISTER_SONET_EVENT' => 'Y',
        ];
        $result = $serviceBuilder
            ->getCRMScope()
            ->contact()
            ->update($contactId, $fields, $params);
        if ($result->isSuccess()) {
            print($result->getCoreResponse()->getResponseData()->getResult()[0]);
        } else {
            print('Update failed.');
        }
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.contact.update',
        {
            id: 43,
            fields: {
                NAME: "Сергей",
                BIRTHDATE: '11.11.1999',
                TYPE_ID: "RECOMMENDATION",
                SOURCE_ID: "WEB",
                POST: "Администратор компьютерных сетей",
                COMMENTS: "Новый комментарий",
                OPENED: "N",
                EXPORT: "Y",
                ASSIGNED_BY_ID: 1,
                COMPANY_ID: 12,
                COMPANY_IDS: [13, 15],
                UF_CRM_1720697698689: "Пример нового значения пользовательского поля с типом \"Строка\"",
                PARENT_ID_1224: 14,
            },
            params: {
                REGISTER_SONET_EVENT: "N",
                REGISTER_HISTORY_EVENT: "N",
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.contact.update',
        [
            'ID' => 43,
            'FIELDS' => [
                'NAME' => 'Сергей',
                'BIRTHDATE' => '11.11.1999',
                'TYPE_ID' => 'RECOMMENDATION',
                'SOURCE_ID' => 'WEB',
                'POST' => 'Администратор компьютерных сетей',
                'COMMENTS' => 'Новый комментарий',
                'OPENED' => 'N',
                'EXPORT' => 'Y',
                'ASSIGNED_BY_ID' => 1,
                'COMPANY_ID' => 12,
                'COMPANY_IDS' => [13, 15],
                'UF_CRM_1720697698689' => 'Пример нового значения пользовательского поля с типом "Строка"',
                'PARENT_ID_1224' => 14,
            ],
            'PARAMS' => [
                'REGISTER_SONET_EVENT' => 'N',
                'REGISTER_HISTORY_EVENT' => 'N',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Работа с множественными полями

### Изменить множественное поле

Для перезаписи существующего значения множественного поля передайте `ID` поля, которое вы хотите изменить, и его новое значение/тип.

Пусть есть следующие значение поля `PHONE`:

```json
[
    {
        "ID": "222",
        "VALUE_TYPE": "WORK",
        "VALUE": "111111",
        "TYPE_ID": "PHONE"
    },
    {
        "ID": "223",
        "VALUE_TYPE": "WORK",
        "VALUE": "222222",
        "TYPE_ID": "PHONE"
    },
    {
        "ID": "224",
        "VALUE_TYPE": "WORK",
        "VALUE": "333333",
        "TYPE_ID": "PHONE"
    }
]
```

Чтобы изменить значения у телефона с `ID = 223`, передайте следующий параметр `fields`:

```json
{
    "fields": {
        "PHONE": [
            {
                "ID": 223,
                "VALUE": "444444",
                "VALUE_TYPE": "MOBILE"
            }
        ]
    }
}
```

### Удалить отдельное значение множественного поля

Чтобы удалить одно из значений множественного поля, передайте их идентификаторы и либо параметр `DELETE = 'Y'`, либо пустой `VALUE`.

Пусть есть следующие значение поля `PHONE`:

```json
[
    {
        "ID": "222",
        "VALUE_TYPE": "WORK",
        "VALUE": "111111",
        "TYPE_ID": "PHONE"
    },
    {
        "ID": "223",
        "VALUE_TYPE": "WORK",
        "VALUE": "222222",
        "TYPE_ID": "PHONE"
    },
    {
        "ID": "224",
        "VALUE_TYPE": "WORK",
        "VALUE": "333333",
        "TYPE_ID": "PHONE"
    },
    {
      "ID": "225",
      "VALUE_TYPE": "WORK",
      "VALUE": "44444",
      "TYPE_ID": "PHONE"
    }
]
```

Рассмотрим способы удаления всех значений кроме телефона с `ID = 225`:

```json
{
    "fields": {
        "PHONE": [
            {
                "ID": 222,
                "DELETE": "Y"
            },
            {
                "ID": 223,
                "VALUE": ""
            },
            {
                "ID": 224
            }
        ]
    }
}
```

В результате останется:

```json
[
    {
        "ID": "225",
        "VALUE_TYPE": "WORK",
        "VALUE": "44444",
        "TYPE_ID": "PHONE"
    }
]
```

### Добавить новое значение для множественного поля

Чтобы добавить новое значение, достаточно его ввести. Уже существующие значения при этом изменены не будут.

Пример добавления нового значения `55555`:

```json
{
    "fields": {
        "PHONE": [
            {
                "VALUE": "55555",
                "VALUE_TYPE": "WORK"
            }
        ]
    }
}
```

### Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1723820393.459406,
        "finish": 1723820396.129949,
        "duration": 2.6705431938171387,
        "processing": 2.1193439960479736,
        "date_start": "2024-08-16T16:59:53+02:00",
        "date_finish": "2024-08-16T16:59:56+02:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`][1] | Корневой элемент ответа, `true` в случае успеха ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Contact is not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код**      | **Описание** | **Значение** ||
|| `-`          | `Parameter 'fields' must be array` | В параметр `fields` передан не объект ||
|| `-`          | `Parameter 'params' must be array` | В параметр `params` передан не объект ||
|| `-`          | `Access denied` | У пользователя нет прав на «Изменение» контактов ||
|| `-`          | Исчерпан выделенный дисковый ресурс | ||
|| `ERROR_CORE` | Поле `Рабочий e-mail` содержит некорректный адрес | ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-add.md)
- [{#T}](./crm-contact-get.md)
- [{#T}](./crm-contact-list.md)
- [{#T}](./crm-contact-delete.md)
- [{#T}](./crm-contact-fields.md)
- [{#T}](../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)

[1]: ../../data-types.md
[2]: ../status/crm-status-list.md
