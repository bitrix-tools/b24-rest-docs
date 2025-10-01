# Получить поля контакта crm.contact.fields

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает описание полей контакта, в том числе пользовательских.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.fields
    ```
  

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.fields
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.contact.fields',
    		{}
    	);
    	
    	const result = response.getData().result;
    	console.info('Поля контакта', result);
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
                'crm.contact.fields',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Поля контакта: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching contact fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.contact.fields",
        {},
        (result) => {
            if(result.error())
                console.error(result.error());
            else
                console.info("Поля контакта", result.data());
        }
    );    
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.contact.fields',
        []
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
        "ID": {
        "type": "integer",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "ID"
        },
        "HONORIFIC": {
        "type": "crm_status",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "statusType": "HONORIFIC",
        "title": "Обращение"
        },
        "NAME": {
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Имя"
        },
        "SECOND_NAME": {
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Отчество"
        },
        "LAST_NAME": {
        "type": "string",
        "isRequired": true,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Фамилия"
        },
        "PHOTO": {
        "type": "file",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Фотография"
        },
        "BIRTHDATE": {
        "type": "date",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Дата рождения"
        },
        "TYPE_ID": {
        "type": "crm_status",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "statusType": "CONTACT_TYPE",
        "title": "Тип контакта"
        },
        "SOURCE_ID": {
        "type": "crm_status",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "statusType": "SOURCE",
        "title": "Источник"
        },
        "SOURCE_DESCRIPTION": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Дополнительно об источнике"
        },
        "POST": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Должность"
        },
        "ADDRESS": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Адрес"
        },
        "ADDRESS_2": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Адрес (стр. 2)"
        },
        "ADDRESS_CITY": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Город"
        },
        "ADDRESS_POSTAL_CODE": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Почтовый индекс"
        },
        "ADDRESS_REGION": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Район"
        },
        "ADDRESS_PROVINCE": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Область"
        },
        "ADDRESS_COUNTRY": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Страна"
        },
        "ADDRESS_COUNTRY_CODE": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Код страны"
        },
        "ADDRESS_LOC_ADDR_ID": {
        "type": "integer",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Идентификатор адреса местоположения"
        },
        "COMMENTS": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Комментарий"
        },
        "OPENED": {
        "type": "char",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Доступен для всех"
        },
        "EXPORT": {
        "type": "char",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Участвует в экспорте контактов"
        },
        "HAS_PHONE": {
        "type": "char",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Задан телефон"
        },
        "HAS_EMAIL": {
        "type": "char",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Задан e-mail"
        },
        "HAS_IMOL": {
        "type": "char",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Задана открытая линия"
        },
        "ASSIGNED_BY_ID": {
        "type": "user",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Ответственный"
        },
        "CREATED_BY_ID": {
        "type": "user",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Кем создан"
        },
        "MODIFY_BY_ID": {
        "type": "user",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Кем изменен"
        },
        "DATE_CREATE": {
        "type": "datetime",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Дата создания"
        },
        "DATE_MODIFY": {
        "type": "datetime",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Дата изменения"
        },
        "COMPANY_ID": {
        "type": "crm_company",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "isDeprecated": true,
        "title": "Компания"
        },
        "COMPANY_IDS": {
        "type": "crm_company",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true,
        "isDynamic": false,
        "title": "COMPANY_IDS"
        },
        "LEAD_ID": {
        "type": "crm_lead",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Лид",
        "settings": {
            "parentEntityTypeId": 1
        }
        },
        "ORIGINATOR_ID": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Внешний источник"
        },
        "ORIGIN_ID": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Идентификатор элемента во внешнем источнике"
        },
        "ORIGIN_VERSION": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Версия оригинала"
        },
        "UTM_SOURCE": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Рекламная система"
        },
        "UTM_MEDIUM": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Тип трафика"
        },
        "UTM_CAMPAIGN": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Обозначение рекламной кампании"
        },
        "UTM_CONTENT": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Содержание кампании"
        },
        "UTM_TERM": {
        "type": "string",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Условие поиска кампании"
        },
        "LAST_ACTIVITY_TIME": {
        "type": "datetime",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Последняя активность"
        },
        "LAST_ACTIVITY_BY": {
        "type": "user",
        "isRequired": false,
        "isReadOnly": true,
        "isImmutable": false,
        "isMultiple": false,
        "isDynamic": false,
        "title": "Кем осуществлена последняя активность в таймлайне"
        },
        "PHONE": {
        "type": "crm_multifield",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true,
        "isDynamic": false,
        "title": "Телефон"
        },
        "EMAIL": {
        "type": "crm_multifield",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true,
        "isDynamic": false,
        "title": "E-mail"
        },
        "WEB": {
        "type": "crm_multifield",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true,
        "isDynamic": false,
        "title": "Сайт"
        },
        "IM": {
        "type": "crm_multifield",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true,
        "isDynamic": false,
        "title": "Мессенджер"
        },
        "LINK": {
        "type": "crm_multifield",
        "isRequired": false,
        "isReadOnly": false,
        "isImmutable": false,
        "isMultiple": true,
        "isDynamic": false,
        "title": "LINK"
        }
    },
    "time": {
        "start": 1715004755.782705,
        "finish": 1715004756.118899,
        "duration": 0.3361940383911133,
        "processing": 0.10344505310058594,
        "date_start": "2024-05-06T17:12:35+03:00",
        "date_finish": "2024-05-06T17:12:36+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
||**ID**
[`integer`](../../data-types.md) | Идентификатор контакта. Только для чтения ||
||**HONORIFIC**
[`crm_status`](../data-types.md) | Обращение.

Получить значения справочника можно с помощью метода [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=HONORIFIC` ||
||**NAME**
[`string`](../../data-types.md) | Имя ||
||**SECOND_NAME**
[`string`](../../data-types.md) | Отчество ||
||**LAST_NAME**
[`string`](../../data-types.md) | Фамилия ||
||**PHOTO**
[`file`](../../data-types.md) | Фотография ||
||**BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения ||
||**TYPE_ID**
[`crm_status`](../data-types.md)| Тип контакта.

Получить значения справочника можно с помощью метода [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=CONTACT_TYPE` ||
||**SOURCE_ID**
[`crm_status`](../data-types.md) | Источник.

Получить значения справочника можно с помощью метода [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=SOURCE`||
||**SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно об источнике ||
||**POST**
[`string`](../../data-types.md) | Должность ||
||**COMMENTS**
[`string`](../../data-types.md) | Комментарий. Поддерживает bb-коды ||
||**OPENED**
[`char`](../../data-types.md) | Доступен ли для всех. Возможные значения:
- `Y` — да
- `N` — нет 

Учитывается в работе прав доступа для ролей с уровнем доступа «Все открытые» ||
||**EXPORT**
[`char`](../../data-types.md) | Участвует в экспорте контактов. Возможные значения:
- `Y` — да
- `N` — нет ||
||**HAS_PHONE**
[`char`](../../data-types.md) | Задан ли телефон. Возможные значения:
- `Y` — да
- `N` — нет

Только для чтения ||
||**HAS_EMAIL**
[`char`](../../data-types.md) | Задан ли e-mail. Возможные значения:
- `Y` — да
- `N` — нет

Только для чтения  ||
||**HAS_IMOL**
[`char`](../../data-types.md) | Задана открытая линия. Возможные значения:
- `Y` — да
- `N` — нет

Только для чтения ||
||**ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный ||
||**CREATED_BY_ID**
[`user`](../../data-types.md) | Кем создан. Только для чтения ||
||**MODIFY_BY_ID**
[`user`](../../data-types.md) | Кем изменен. Только для чтения ||
||**DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания. Только для чтения ||
||**DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения. Только для чтения ||
||**COMPANY_ID**
[`crm_company`](../data-types.md) | Основная компания контакта ||
||**COMPANY_IDS**
[`crm_company`](../data-types.md) | Привязка контакта к компаниям. Множественное. 

В методах [`crm.contact.update`](./crm-contact-update.md) и [`crm.contact.add`](./crm-contact-add.md) используется для подачи массива компаний. 

В методах [`crm.contact.list`](./crm-contact-list.md) и [`crm.contact.get`](./crm-contact-get.md) поля нет и необходимо использовать [`crm.contact.company.items.get`](./company/crm-contact-company-items-get.md) для получения списка компаний  ||
||**LEAD_ID**
[`crm_lead`](../data-types.md) | Идентификатор лида, связанного с контактом. Только для чтения ||
||**UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система (Yandex-Direct, Google-Adwords и другие) ||
||**UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. Возможные значения:
- `CPC` — объявления 
- `CPM` — баннеры  ||
||**UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
||**UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
||**UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
||**LAST_ACTIVITY_TIME**
[`datetime`](../../data-types.md) | Дата последней активности в таймлайне. Только для чтения ||
||**LAST_ACTIVITY_BY**
[`user`](../../data-types.md) | Автор последней активности в таймлайне. Только для чтения ||
||**PHONE**
[`crm_multifield`](../data-types.md) | Телефоны. Множественное ||
||**EMAIL**
[`crm_multifield`](../data-types.md) | E-mail. Множественное ||
||**WEB**
[`crm_multifield`](../data-types.md) | Сайты. Множественное ||
||**IM**
[`crm_multifield`](../data-types.md) | Мессенджеры. Множественное ||
||**LINK**
[`crm_multifield`](../data-types.md) | Ссылки. Множественное. Служебное. ||
||**UF_...**  | Пользовательские поля. Например, `UF_CRM_25534736`. 

В зависимости от настроек портала у контактов может быть набор пользовательских полей определенных типов. 

Добавить пользовательское поле в контакт можно с помощью метода [crm.contact.userfield.add](./userfield/crm-contact-userfield-add.md)  ||
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
||**ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор внешней системы, являющейся источником данных об этом контакте ||
||**ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор контакта во внешней системе ||
||**ORIGIN_VERSION**
[`string`](../../data-types.md) | Версия данных о контакте во внешней системе. 

Используется для защиты данных от случайного перетирания внешней системой. 

Если данные были импортированы и не изменялись во внешней системе, то такие данные могут быть отредактированы в CRM без опасения, что следующая выгрузка приведет к перетиранию данных ||
|#

**Устаревшие поля**

Поля адреса в контакте являются устаревшими и используются только в режиме совместимости. Для работы с адресом используйте [реквизиты](../requisites/index.md).

#|
|| **Название**
`тип` | **Описание** ||
||**ADDRESS**
[`string`](../../data-types.md) | Адрес ||
||**ADDRESS_2**
[`string`](../../data-types.md) | Вторая строка адреса ||
||**ADDRESS_CITY**
[`string`](../../data-types.md) | Город ||
||**ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс ||
||**ADDRESS_REGION**
[`string`](../../data-types.md) | Район ||
||**ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область ||
||**ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна ||
||**ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны ||
||**ADDRESS_LOC_ADDR_ID**
[`location`](../../data-types.md) | Идентификатор адреса местоположения ||
|#

## Обработка ошибок

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-add.md)
- [{#T}](./crm-contact-update.md)
- [{#T}](./crm-contact-get.md)
- [{#T}](./crm-contact-list.md)
- [{#T}](./crm-contact-delete.md)
