# Получить настройки шаблона регулярной сделки по id crm.deal.recurring.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» сделок

Метод `crm.deal.recurring.get` возвращает поля настройки шаблона регулярной сделки по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id^*^**
[`integer`](../../../data-types.md) | Идентификатор настройки шаблона регулярной сделки.

Идентификатор можно получить с помощью методов [crm.deal.recurring.list](./crm-deal-recurring-list.md) или [crm.deal.recurring.add](./crm-deal-recurring-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.recurring.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.recurring.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.recurring.get',
    		{
    			id: 15,
    		}
    	);
    
    	const result = response.getData().result;
    	console.info('Настройка шаблона:', result);
    }
    catch (error)
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
                'crm.deal.recurring.get',
                [
                    'id' => 15,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Recurring settings: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting recurring settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.recurring.get',
        {
            id: 15
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.recurring.get',
        [
            'id' => 15
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
        "ID": "25",
        "DEAL_ID": "7591",
        "BASED_ID": "7577",
        "ACTIVE": "Y",
        "CATEGORY_ID": "2",
        "IS_LIMIT": "D",
        "COUNTER_REPEAT": null,
        "LIMIT_REPEAT": null,
        "LIMIT_DATE": "2027-03-05T03:00:00+03:00",
        "START_DATE": "2026-04-05T03:00:00+03:00",
        "NEXT_EXECUTION": "2026-04-05T01:00:00+03:00",
        "LAST_EXECUTION": "",
        "PARAMS": {
            "MODE": "multiple",
            "SINGLE_BEFORE_START_DATE_TYPE": null,
            "SINGLE_BEFORE_START_DATE_VALUE": 0,
            "MULTIPLE_TYPE": "month",
            "MULTIPLE_INTERVAL": 1,
            "OFFSET_BEGINDATE_TYPE": "day",
            "OFFSET_BEGINDATE_VALUE": 1,
            "OFFSET_CLOSEDATE_TYPE": "month",
            "OFFSET_CLOSEDATE_VALUE": 2
        }
    },
    "time": {
        "start": 1772753726,
        "finish": 1772753726.940512,
        "duration": 0.94051194190979,
        "processing": 0,
        "date_start": "2026-03-06T02:35:26+03:00",
        "date_finish": "2026-03-06T02:35:26+03:00",
        "operating_reset_at": 1772754326,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`recurring_deal`](#recurring-deal) | Корневой элемент ответа. Содержит поля настройки шаблона регулярной сделки ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип recurring_deal {#recurring-deal}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор записи в таблице настроек регулярной сделки ||
|| **DEAL_ID**
[`integer`](../../../data-types.md) | Идентификатор сделки, для которой настроена регулярность ||
|| **BASED_ID**
[`integer`](../../../data-types.md) | Идентификатор сделки, на основании которой создан шаблон ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Флаг активности. Возможные значения:
- `Y` — активна
- `N` — неактивна ||
|| **NEXT_EXECUTION**
[`datetime`](../../../data-types.md) | Дата и время следующего создания сделки из шаблона ||
|| **LAST_EXECUTION**
[`datetime`](../../../data-types.md) | Дата и время последнего создания сделки из шаблона.

Может быть пустой строкой, если запусков еще не было ||
|| **COUNTER_REPEAT**
[`integer`](../../../data-types.md) | Количество созданных из шаблона сделок.||
|| **START_DATE**
[`datetime`](../../../data-types.md) | Дата начала расчета следующего запуска.

В ответе возвращается в формате `YYYY-MM-DDTHH:MI:SS+TZD` ||
|| **CATEGORY_ID**
[`char`](../../../data-types.md) | Идентификатор воронки для создаваемых сделок ||
|| **IS_LIMIT**
[`char`](../../../data-types.md) | Тип ограничения на создание сделок:
- `N` — без ограничений
- `D` — по дате (`LIMIT_DATE`)
- `T` — по количеству (`LIMIT_REPEAT`) ||
|| **LIMIT_REPEAT**
[`integer`](../../../data-types.md) | Максимальное количество создаваемых сделок. Используется при `IS_LIMIT = T`||
|| **LIMIT_DATE**
[`datetime`](../../../data-types.md) | Дата окончания генерации сделок. Используется при `IS_LIMIT = D`.

В ответе возвращается в формате `YYYY-MM-DDTHH:MI:SS+TZD` ||
|| **PARAMS**
[`object`](../../../data-types.md) | Параметры периодичности [(подробное описание)](#params-fields) ||
|#

#### Поля объекта PARAMS {#params-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **MODE**
[`string`](../../../data-types.md) | Режим повторения:
- `single` — одиночный
- `multiple` — множественный ||
|| **MULTIPLE_TYPE**
[`string`](../../../data-types.md) | Тип периода для `MODE = multiple`:
- `day`
- `week`
- `month`
- `year` ||
|| **MULTIPLE_INTERVAL**
[`integer`](../../../data-types.md) | Интервал повторения для `MODE = multiple` ||
|| **SINGLE_BEFORE_START_DATE_TYPE**
[`string`](../../../data-types.md) | Тип смещения для `MODE = single`:
- `day`
- `week`
- `month`
- `year`||
|| **SINGLE_BEFORE_START_DATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения для `MODE = single`.

Для `MODE = multiple` обычно возвращается `0` ||
|| **OFFSET_BEGINDATE_TYPE**
[`string`](../../../data-types.md) | Тип смещения даты начала создаваемой сделки:
- `day`
- `week`
- `month`
- `year` ||
|| **OFFSET_BEGINDATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения даты начала создаваемой сделки ||
|| **OFFSET_CLOSEDATE_TYPE**
[`string`](../../../data-types.md) | Тип смещения даты завершения создаваемой сделки:
- `day`
- `week`
- `month`
- `year` ||
|| **OFFSET_CLOSEDATE_VALUE**
[`integer`](../../../data-types.md) | Значение смещения даты завершения создаваемой сделки ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Recurring deal is not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `id is not defined or invalid` | В параметр `id` передано пустое или некорректное значение ||
|| `Recurring is not allowed` | Регулярные сделки недоступны в Битрикс24 ||
|| `Recurring deal is not found` | Шаблон регулярной сделки не найден ||
|| `Access denied` | Недостаточно прав для чтения шаблона регулярной сделки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-recurring-fields.md)
- [{#T}](./crm-deal-recurring-list.md)
- [{#T}](./crm-deal-recurring-add.md)
- [{#T}](./crm-deal-recurring-update.md)
- [{#T}](./crm-deal-recurring-delete.md)
- [{#T}](./crm-deal-recurring-expose.md)
