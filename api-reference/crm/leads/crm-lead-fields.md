# Получить поля лида crm.lead.fields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.lead.fields` возвращает описание полей лида, в том числе пользовательских.

Без параметров.

## Примеры

{% list tabs %}

- cURL

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    https://xxx.bitrix24.com/rest/crm.lead.fields
    ```

- JS

    ```javascript 
    BX24.callMethod(
      'crm.lead.fields',
      {},
      (result) => {
        if(result.error())
        {
          console.error(result.error());
  
          return;
        }
        
        console.info(result.data());
      }
    );
    ```


- B24-PHP-SDK

    ```php
        
    try {
        $fieldsResult = $serviceBuilder
            ->getCRMScope()
            ->lead()
            ->fields();
    
        $fieldsDescription = $fieldsResult->getFieldsDescription();
    
        // Assuming you want to print the fields description
        print_r($fieldsDescription);
    } catch (Throwable $e) {
        print("Error: " . $e->getMessage());
    }
    
    ```

- PHP

    ```php
    $result = CRest::call('crm.lead.fields');
    ```

- HTTPS

    ```http
    https://xxx.bitrix24.com/rest/1/5***/crm.lead.fields.json
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

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
    "TITLE": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Название лида"
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
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Имя"
    },
    "SECOND_NAME": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Отчество"
    },
    "LAST_NAME": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Фамилия"
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
    "COMPANY_TITLE": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Название компании"
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
    "STATUS_ID": {
      "type": "crm_status",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "statusType": "STATUS",
      "title": "Стадия"
    },
    "STATUS_DESCRIPTION": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Дополнительно о стадии"
    },
    "STATUS_SEMANTIC_ID": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Состояние статуса"
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
    "CURRENCY_ID": {
      "type": "crm_currency",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Валюта"
    },
    "OPPORTUNITY": {
      "type": "double",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Сумма"
    },
    "IS_MANUAL_OPPORTUNITY": {
      "type": "char",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "IS_MANUAL_OPPORTUNITY"
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
    "COMMENTS": {
      "type": "string",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Комментарий"
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
    "MOVED_BY_ID": {
      "type": "user",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "MOVED_BY_ID"
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
    "MOVED_TIME": {
      "type": "datetime",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "MOVED_TIME"
    },
    "COMPANY_ID": {
      "type": "crm_company",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Компания",
      "settings": {
        "parentEntityTypeId": 4
      }
    },
    "CONTACT_ID": {
      "type": "crm_contact",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "isDeprecated": true,
      "title": "Контакт"
    },
    "CONTACT_IDS": {
      "type": "crm_contact",
      "isRequired": false,
      "isReadOnly": false,
      "isImmutable": false,
      "isMultiple": true,
      "isDynamic": false,
      "title": "CONTACT_IDS"
    },
    "IS_RETURN_CUSTOMER": {
      "type": "char",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Повторный лид"
    },
    "DATE_CLOSED": {
      "type": "datetime",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "Дата завершения"
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
      "title": "LAST_ACTIVITY_TIME"
    },
    "LAST_ACTIVITY_BY": {
      "type": "user",
      "isRequired": false,
      "isReadOnly": true,
      "isImmutable": false,
      "isMultiple": false,
      "isDynamic": false,
      "title": "LAST_ACTIVITY_BY"
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
    "start": 1716903269.951179,
    "finish": 1716903270.017765,
    "duration": 0.06658601760864258,
    "processing": 0.029553890228271484,
    "date_start": "2024-05-28T16:34:29+03:00",
    "date_finish": "2024-05-28T16:34:30+03:00",
    "operating": 0
  }
}
```

### Возвращаемые данные

#|
|| **Значение** / **Тип** | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Результат запроса ||
|| **ID**
[`integer`](../../data-types.md) | Целочисленный идентификатор лида. ||
|| **TITLE**
[`string`](../../data-types.md) | Название лида. ||
|| **HONORIFIC**
[`crm_status`](../../data-types.md) | Вид обращения. Статус из справочника. Список возможных идентификаторов можно получить методом crm.status.list с фильтром `filter[ENTITY_ID]=HONORIFIC` ||
|| **NAME**
[`string`](../../data-types.md) |  Имя контакта. ||
|| **SECOND_NAME**
[`string`](../../data-types.md) |  Отчество контакта. ||
|| **LAST_NAME**
[`string`](../../data-types.md) |  Фамилия контакта. ||
|| **BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения. ||
|| **COMPANY_TITLE**
[`string`](../../data-types.md) | Название компании, привязанной к лиду. ||
|| **SOURCE_ID**
[`crm_status`](../../data-types.md) | Идентификатор источника. Статус из справочника. Список возможных идентификаторов можно получить методом crm.status.list с фильтром `filter[ENTITY_ID]=SOURCE` ||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Описание источника. ||
|| **STATUS_ID**
[`crm_status`](../../data-types.md) | Идентификатор стадии лида. Статус из справочника. Список возможных идентификаторов можно получить методом crm.status.list с фильтром `filter[ENTITY_ID]=STATUS` ||
|| **STATUS_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно о стадии. ||
|| **STATUS_SEMANTIC_ID**
[`string`](../../data-types.md) |
- F (failed) – обработан неуспешно,
- S (success) – обработан успешно,
- P (processing) – лид в обработке. ||
|| **POST**
[`string`](../../data-types.md) | Должность. ||
|| **ADDRESS**
[`string`](../../data-types.md) | Адрес контакта. ||
|| **ADDRESS_2**
[`string`](../../data-types.md) | Вторая страница адреса. В некоторых странах принято разбивать адрес на 2 части. ||
|| **ADDRESS_CITY**
[`string`](../../data-types.md) | Город. ||
|| **ADDRESS_POSTAL_CODE**
[`string`](../../data-types.md) | Почтовый индекс. ||
|| **ADDRESS_REGION**
[`string`](../../data-types.md) | Район. ||
|| **ADDRESS_PROVINCE**
[`string`](../../data-types.md) | Область. ||  
|| **ADDRESS_COUNTRY**
[`string`](../../data-types.md) | Страна. ||
|| **ADDRESS_COUNTRY_CODE**
[`string`](../../data-types.md) | Код страны. ||
|| **ADDRESS_LOC_ADDR_ID**
[`string`](../../data-types.md) | Идентификатор адреса из модуля местоположений. ||
|| **CURRENCY_ID**
[`crm_currency`](../../data-types.md) | Идентификатор валюты. ||
|| **OPPORTUNITY**
[`double`](../../data-types.md) | Предполагаемая сумма. ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../../data-types.md) | Признак ручного расчёта суммы. Допустимые значения Y или N. ||
|| **OPENED**
[`char`](../../data-types.md) | Доступен для всех. Допустимые значения Y или N. ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарии. ||
|| **HAS_PHONE**
[`char`](../../data-types.md) | Признак заполненности поля телефон. Допустимые значения Y или N. ||
|| **HAS_EMAIL**
[`char`](../../data-types.md) | Признак заполненности поля электронной почты. Допустимые значения Y или N. ||
|| **HAS_IMOL**
[`char`](../../data-types.md) | Признак наличия привязанной открытой линии. Допустимые значения Y или N. ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя ответственного за лид. ||
|| **CREATED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя создавшего лид. ||
|| **MODIFY_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя-автора последнего изменения. ||
|| **MOVED_BY_ID**
[`user`](../../data-types.md) | Идентификатор пользователя-автора перемещения элемента на текущую стадию. ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата создания. ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата изменения. ||
|| **MOVED_TIME**
[`datetime`](../../data-types.md) | Дата перемещения элемента на текущую стадию. ||
|| **COMPANY_ID**
[`crm_company`](../../data-types.md) | Привязка лида к компании (Поле Клиент->Компания) ||
|| **CONTACT_ID**
[`crm_contact`](../../data-types.md) | Привязка лида к контакту (Поле Клиент->Контакт. В случае нескольких привязанных контактов в данном поле будет id первого привязанного контакта). ||
|| **IS_RETURN_CUSTOMER**
[`char`](../../data-types.md) | Признак повторного лида. Допустимые значения Y или N. ||
|| **DATE_CLOSED**
[`datetime`](../../data-types.md) | Дата закрытия. ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику. ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику. ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система. Yandex-Direct, Google-Adwords и другие. ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. CPC (объявления), CPM (баннеры). ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании. ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений. ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы. ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../../data-types.md) | Время последней активности. ||
|| **LAST_ACTIVITY_BY**
[`string`](../../data-types.md) | Идентификатор пользователя ответственного за последнюю активность в этом лиде (например, создавшего новое дело в лиде). ||
|| **PHONE**
[`crm_multifield`](../../data-types.md) | Телефон контакта. ||
|| **EMAIL**
[`crm_multifield`](../../data-types.md) | Адрес электронной почты. ||
|| **WEB**
[`crm_multifield`](../../data-types.md) | URL ресурсы лида. ||
|| **IM**
[`crm_multifield`](../../data-types.md) | Мессенджеры. ||
|| **LINK**
[`crm_multifield`](../../data-types.md) |  ||
|| **ufCrm_ххх** | [Пользовательские поля.](./userfield/index.md) ||
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

### Описание поля

|#
|| type | Тип поля. Описан выше. ||
|| isRequired | Признак обязательности поля при создании нового лида. ||
|| isReadOnly | Признак возможности отредактировать значение поля. ||
|| isImmutable | Признак возможности однократного заполнения значения поля только при создании нового элемента. ||
|| isMultiple | Признак множественности поля. При true значения в поле передаются в виде массива. ||
|| isDynamic | Является ли поле [пользовательским](./userfield/index.md). ||
|| title | Название поля ||
#|

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример ответа в случае ошибки

Метод не предполагает возврата ошибок