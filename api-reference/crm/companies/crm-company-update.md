# Обновить существующую компанию crm.company.update

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» компаний

{% note warning "Развитие метода остановлено" %}

Метод `crm.company.update` продолжает работать, но у него есть более актуальный аналог [crm.item.update](../universal/crm-item-update.md).

{% endnote %}

Метод `crm.company.update` обновляет существующую компанию.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор компании ||
|| **fields***
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

Список доступных полей описан в методе [crm.company.fields](crm-company-fields.md).

Некорректное поле в `fields` будет проигнорировано
||
|| **params**
[`object`](../../data-types.md) | Объект, содержащий набор дополнительных параметров:

- `REGISTER_SONET_EVENT` — отправить уведомление ответственному
- `REGISTER_HISTORY_EVENT` — регистрировать событие в истории. Возможные значения:
  - `Y` — да
  - `N` — нет
||
|#

### Параметр fields {#parameter-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Название компании ||
|| **COMPANY_TYPE**
[`crm_status`](../data-types.md) | Тип компании. Значения можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=COMPANY_TYPE` ||
|| **LOGO**
[`file`](../../data-types.md) | Логотип ||
|| **INDUSTRY**
[`crm_status`](../data-types.md) | Сфера деятельности. Значения можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=INDUSTRY` ||
|| **EMPLOYEES**
[`crm_status`](../data-types.md) | Количество сотрудников. Значения можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром по `ENTITY_ID=EMPLOYEES` ||
|| **CURRENCY_ID**
[`crm_currency`](../data-types.md) | Валюта ||
|| **REVENUE**
[`double`](../../data-types.md) | Годовой оборот ||
|| **OPENED**
[`char`](../../data-types.md) | Доступна ли компания для всех. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **COMMENTS**
[`string`](../../data-types.md) | Комментарий ||
|| **ASSIGNED_BY_ID**
[`user`](../../data-types.md) | Ответственный ||
|| **CONTACT_ID**
[`crm_contact`](../../data-types.md) | Контакт. Множественное ||
|| **ORIGINATOR_ID**
[`string`](../../data-types.md) | Идентификатор источника данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_ID**
[`string`](../../data-types.md) | Идентификатор элемента в источнике данных. Используется только для привязки к внешнему источнику ||
|| **ORIGIN_VERSION**
[`string`](../../data-types.md) | Оригинальная версия. Используется для защиты данных от случайного перетирания внешней системой ||
|| **UTM_SOURCE**
[`string`](../../data-types.md) | Рекламная система. Yandex-Direct, Google-Adwords и другие ||
|| **UTM_MEDIUM**
[`string`](../../data-types.md) | Тип трафика. Возможные значения:
- `CPC` — объявления
- `CPM` — баннеры ||
|| **UTM_CAMPAIGN**
[`string`](../../data-types.md) | Обозначение рекламной кампании ||
|| **UTM_CONTENT**
[`string`](../../data-types.md) | Содержание кампании. Например, для контекстных объявлений ||
|| **UTM_TERM**
[`string`](../../data-types.md) | Условие поиска кампании. Например, ключевые слова контекстной рекламы ||
||**PARENT_ID_...** | Поля связей.

Если на портале есть смарт-процессы, связанные с компаниями, для каждого такого смарт-процесса существует поле, хранящее связь между этим смарт-процессом и компанией. Само поле хранит идентификатор элемента такого смарт-процесса ||
|| **PHONE**
[`crm_multifield[]`](../data-types.md) | Телефон. Множественное ||
|| **EMAIL**
[`crm_multifield[]`](../data-types.md) | E-mail. Множественное ||
|| **WEB**
[`crm_multifield[]`](../data-types.md) | Сайт. Множественное ||
|| **IM**
[`crm_multifield[]`](../data-types.md) | Мессенджер. Множественное ||
|| **LINK**
[`crm_multifield[]`](../data-types.md) | LINK. Множественное ||
||**UF_...**  | Пользовательские поля. Например, `UF_CRM_25534736`.

В зависимости от настроек портала у компаний может быть набор пользовательских полей определенных типов.

Добавить пользовательское поле в компанию можно с помощью метода [crm.company.userfield.add](./userfields/crm-company-userfield-add.md) ||
|#

{% note info " " %}

Чтобы изменить адрес и банковские реквизиты компании, используйте методы [реквизитов](../requisites/index.md)

{% endnote %}

## Примеры

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":43,"FIELDS":{"CURRENCY_ID":"RUB","REVENUE":500000,"EMPLOYEES":"EMPLOYEES_3"},"PARAMS":{"REGISTER_SONET_EVENT":"Y","REGISTER_HISTORY_EVENT":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":43,"FIELDS":{"CURRENCY_ID":"RUB","REVENUE":500000,"EMPLOYEES":"EMPLOYEES_3"},"PARAMS":{"REGISTER_SONET_EVENT":"Y","REGISTER_HISTORY_EVENT":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.update
    ```

- JS

    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.company.update",
    		{
    			id: id,
    			fields:
    			{
    				"CURRENCY_ID": "RUB",
    				"REVENUE" : 500000,
    				"EMPLOYEES": "EMPLOYEES_3"
    			},
    			params: { "REGISTER_SONET_EVENT": "Y" }
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.info(result);
    	}
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    $id = readline("Введите ID");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.update',
                [
                    'id' => $id,
                    'fields' => [
                        'CURRENCY_ID' => 'RUB',
                        'REVENUE' => 500000,
                        'EMPLOYEES' => 'EMPLOYEES_3',
                    ],
                    'params' => ['REGISTER_SONET_EVENT' => 'Y'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating company: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.company.update",
        {
            id: id,
            fields:
            {
                "CURRENCY_ID": "RUB",
                "REVENUE" : 500000,
                "EMPLOYEES": "EMPLOYEES_3"
            },
            params: { "REGISTER_SONET_EVENT": "Y" }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.company.update',
        [
            'id' => 43,
            'fields' => [
                'CURRENCY_ID' => 'RUB',
                'REVENUE' => 500000,
                'EMPLOYEES' => 'EMPLOYEES_3',
            ],
            'params' => [
                'REGISTER_SONET_EVENT' => 'Y',
                'REGISTER_HISTORY_EVENT' => 'Y',
            ],
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
    "result": true,
    "time": {
        "start": 1769499930,
        "finish": 1769499931.074515,
        "duration": 1.0745151042938232,
        "processing": 1,
        "date_start": "2026-01-27T10:45:30+03:00",
        "date_finish": "2026-01-27T10:45:31+03:00",
        "operating_reset_at": 1769500530,
        "operating": 0.2604348659515381
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, возвращает `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Company is not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код**      | **Описание** | **Значение** ||
|| `-`          | Parameter 'fields' must be array | В параметр `fields` передан не объект ||
|| `-`          | Parameter 'params' must be array | В параметр `params` передан не объект ||
|| `-`          | Access denied | У пользователя нет права «Изменение» компаний ||
|| `-`          | Исчерпан выделенный дисковый ресурс | ||
|| `ERROR_CORE` | Поле `E-mail` содержит некорректный адрес | Поле `E-mail` содержит некорректный адрес ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-add.md)
- [{#T}](./crm-company-get.md)
- [{#T}](./crm-company-list.md)
- [{#T}](./crm-company-delete.md)
- [{#T}](./crm-company-fields.md)
- [{#T}](../../../tutorials/crm/how-to-edit-crm-objects/how-to-change-email-or-phone.md)
