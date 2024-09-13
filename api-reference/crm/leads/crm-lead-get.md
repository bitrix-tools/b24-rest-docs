# Получить лид по Id crm.lead.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не прописана ссылка на ещё не созданную страницу

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, имеющий права на чтение запрашиваемого лида

Метод `crm.lead.get` возвращает лид по идентификатору.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^
[`integer`](../../data-types.md) | Целочисленный идентификатор лида. Для того, чтобы получить id существующих лидов воспользуйтесь методом [crm.lead.list](crm-lead-list.md) ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- cURL

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{ "id": "123" }' \
    https://xxx.bitrix24.com/rest/crm.lead.get
    ```

- JS

    ```javascript 
    BX24.callMethod(
      'crm.lead.get',
      { id: 123 },
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

- PHP

    ```php
    $id = 123;
        
    $result = CRest::call(
        'crm.lead.get',
        [
            'id' => $id,
        ]
    );
    ```

- HTTPS

    ```http
    https://xxx.bitrix24.com/rest/1/5***/crm.lead.get.json?id=123
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

```json
{
  "result": {
    "ID": "1591",
    "TITLE": "Лид #1591",
    "HONORIFIC": null,
    "NAME": "",
    "SECOND_NAME": null,
    "LAST_NAME": null,
    "COMPANY_TITLE": null,
    "COMPANY_ID": null,
    "CONTACT_ID": null,
    "IS_RETURN_CUSTOMER": "N",
    "BIRTHDATE": "",
    "SOURCE_ID": "1",
    "SOURCE_DESCRIPTION": null,
    "STATUS_ID": "IN_PROCESS",
    "STATUS_DESCRIPTION": null,
    "POST": null,
    "COMMENTS": null,
    "CURRENCY_ID": "RUB",
    "OPPORTUNITY": "0.00",
    "IS_MANUAL_OPPORTUNITY": "N",
    "HAS_PHONE": "N",
    "HAS_EMAIL": "N",
    "HAS_IMOL": "N",
    "ASSIGNED_BY_ID": "1",
    "CREATED_BY_ID": "1",
    "MODIFY_BY_ID": "1",
    "DATE_CREATE": "2024-05-23T18:18:25+03:00",
    "DATE_MODIFY": "2024-05-23T18:18:25+03:00",
    "DATE_CLOSED": "",
    "STATUS_SEMANTIC_ID": "P",
    "OPENED": "Y",
    "ORIGINATOR_ID": null,
    "ORIGIN_ID": null,
    "MOVED_BY_ID": "1",
    "MOVED_TIME": "2024-05-23T18:18:25+03:00",
    "ADDRESS": null,
    "ADDRESS_2": null,
    "ADDRESS_CITY": null,
    "ADDRESS_POSTAL_CODE": null,
    "ADDRESS_REGION": null,
    "ADDRESS_PROVINCE": null,
    "ADDRESS_COUNTRY": null,
    "ADDRESS_COUNTRY_CODE": null,
    "ADDRESS_LOC_ADDR_ID": null,
    "UTM_SOURCE": null,
    "UTM_MEDIUM": null,
    "UTM_CAMPAIGN": null,
    "UTM_CONTENT": null,
    "UTM_TERM": null,
    "LAST_ACTIVITY_BY": "1",
    "LAST_ACTIVITY_TIME": "2024-05-23T18:18:25+03:00",
    "PHONE": [
      {
        "ID": "11658",
        "VALUE_TYPE": "OTHER",
        "VALUE": "+5454777777",
        "TYPE_ID": "PHONE"
      }
    ],
    "IM": [
      {
        "ID": "11660",
        "VALUE_TYPE": "OPENLINE",
        "VALUE": "imol|livechat|1|67|21",
        "TYPE_ID": "IM"
      }
    ]
  },
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
|| **COMPANY_ID**
[`crm_company`](../../data-types.md) | Привязка лида к компании. ||
|| **COMPANY_TITLE**
[`string`](../../data-types.md) | Название компании. ||
|| **CONTACT_ID**
[`crm_contact`](../../data-types.md) | Привязка лида к контакту. ||
|| **IS_RETURN_CUSTOMER**
[`char`](../../data-types.md) | Признак повторного лида. Допустимые значения Y или N. ||
|| **BIRTHDATE**
[`date`](../../data-types.md) | Дата рождения. ||
|| **SOURCE_ID**
[`crm_status`](../../data-types.md) | Идентификатор источника. Статус из справочника. Список возможных идентификаторов можно получить методом crm.status.list с фильтром `filter[ENTITY_ID]=SOURCE` ||
|| **SOURCE_DESCRIPTION**
[`string`](../../data-types.md) | Описание источника. ||
|| **STATUS_ID**
[`crm_status`](../../data-types.md) | Идентификатор стадии лида. Статус из справочника. Список возможных идентификаторов можно получить методом crm.status.list с фильтром `filter[ENTITY_ID]=STATUS` ||
|| **STATUS_DESCRIPTION**
[`string`](../../data-types.md) | Дополнительно о стадии. ||
|| **POST**
[`string`](../../data-types.md) | Должность. ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарии. ||
|| **CURRENCY_ID**
[`crm_currency`](../../data-types.md) | Идентификатор валюты. ||
|| **OPPORTUNITY**
[`double`](../../data-types.md) | Предполагаемая сумма. ||
|| **IS_MANUAL_OPPORTUNITY**
[`char`](../../data-types.md) | Признак ручного расчёта суммы. Допустимые значения Y или N. ||
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
|| **DATE_CLOSED**
[`datetime`](../../data-types.md) | Дата закрытия. ||
|| **STATUS_SEMANTIC_ID**
[`string`](../../data-types.md) |
- F (failed) – обработан неуспешно,
- S (success) – обработан успешно,
- P (processing) – лид в обработке. ||
|| **OPENED**
[`char`](../../data-types.md) | Признак доступности лида для всех. Допустимые значения Y или N. ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику. ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику. ||
|| **MOVED_TIME**
[`datetime`](../../data-types.md) | Дата перемещения элемента на текущую стадию. ||
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
[`string`](../../data-types.md) | Используется для служебных целей. ||
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
|| **LAST_ACTIVITY_BY**
[`string`](../../data-types.md) | Идентификатор пользователя ответственного за последнюю активность в этом лиде (например, создавшего новое дело в лиде). ||
|| **LAST_ACTIVITY_TIME**
[`datetime`](../../data-types.md) | Время последней активности. ||
|| **ufCrm_ххх** | [Пользовательские поля.](./userfield/index.md) ||
|| **PHONE**
[`crm_multifield`](../../data-types.md) | Массив телефонов. ||
|| **IM**
 [`crm_multifield`](../../data-types.md) | Массив мессенджеров. ||
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

## Пример ответа в случае ошибки

> 40x, 50x Error

```json
{
    "error": "",
    "error_description": "Not found"
}
```

### Возможные ошибки

#|  
|| **Текст ошибки** | **Описание** ||
|| ID is not defined or invalid. | Не указан или не является положительным числом уникальным идентификатор лида. ||
|| Not found. | Лид с указанным ID не найден. ||
|| Access denied. | У пользователя нет прав на чтение лида. ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Смотри также

- [Как правильно выгружать большие объемы данных](.)