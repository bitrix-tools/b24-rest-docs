# Получить список настроек шаблонов регулярных сделок crm.deal.recurring.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» сделок

Метод `crm.deal.recurring.list` возвращает список настроек шаблонов регулярных сделок по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля для сортировки
- `value_n` — направление сортировки: `ASC` или `DESC`

Список полей для сортировки можно получить методом [crm.deal.recurring.fields](./crm-deal-recurring-fields.md)||
|| **filter**
[`object`](../../../data-types.md) | Объект фильтра формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля, по которому будет отфильтрована выборка элементов
- `value_n` — значение фильтра

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Список полей для фильтрации можно получить методом [crm.deal.recurring.fields](./crm-deal-recurring-fields.md).

Поле `PARAMS` в фильтре игнорируется и не влияет на результат выборки||
|| **start**
[`integer`](../../../data-types.md) | Параметр постраничной навигации.

Размер страницы фиксирован: `50` записей.

Формула для получения N-й страницы:
`start = (N - 1) * 50` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"deal_id":"ASC"},"filter":{">COUNTER_REPEAT":0}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.recurring.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"deal_id":"ASC"},"filter":{">COUNTER_REPEAT":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.recurring.list
    ```

- JS

    ```js
    // callListMethod: получает все данные сразу. Подходит для небольших выборок.
    try {
      const response = await $b24.callListMethod(
        'crm.deal.recurring.list',
        {
          order: { deal_id: 'ASC' },
          filter: { '>COUNTER_REPEAT': 0 }
        }
      );
      const items = response.getData() || [];
      for (const item of items) {
        console.log(item);
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod: выбирает данные по частям (итератор).
    try {
      const iterator = $b24.fetchListMethod(
        'crm.deal.recurring.list',
        {
          order: { deal_id: 'ASC' },
          filter: { '>COUNTER_REPEAT': 0 }
        },
        'id'
      );
      for await (const page of iterator) {
        for (const item of page) {
          console.log(item);
        }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod: ручная пагинация через параметр start.
    try {
      const response = await $b24.callMethod(
        'crm.deal.recurring.list',
        {
          order: { deal_id: 'ASC' },
          filter: { '>COUNTER_REPEAT': 0 }
        },
        0
      );
      const result = response.getData().result || [];
      for (const item of result) {
        console.log(item);
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.deal.recurring.list',
                [
                    'order' => ['deal_id' => 'ASC'],
                    'filter' => ['>COUNTER_REPEAT' => 0],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching recurring deals: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.recurring.list',
        {
            order: { deal_id: 'ASC' },
            filter: { '>COUNTER_REPEAT': 0 }
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
                if (result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.recurring.list',
        [
            'order' => ['deal_id' => 'ASC'],
            'filter' => ['>COUNTER_REPEAT' => 0],
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
    "result": [
        {
            "id": "1",
            "deal_id": "575",
            "based_id": "573",
            "ACTIVE": "N",
            "category_id": "1",
            "IS_LIMIT": "T",
            "COUNTER_REPEAT": "2",
            "LIMIT_REPEAT": "2",
            "LIMIT_DATE": "",
            "START_DATE": "2020-06-15T03:00:00+03:00",
            "NEXT_EXECUTION": "",
            "LAST_EXECUTION": "2020-06-17T01:00:00+03:00",
            "PARAMS": {
                "MODE": "multiple",
                "SINGLE_BEFORE_START_DATE_TYPE": "day",
                "SINGLE_BEFORE_START_DATE_VALUE": 0,
                "MULTIPLE_TYPE": "day",
                "MULTIPLE_INTERVAL": 1,
                "OFFSET_BEGINDATE_TYPE": "day",
                "OFFSET_BEGINDATE_VALUE": 1,
                "OFFSET_CLOSEDATE_TYPE": "day",
                "OFFSET_CLOSEDATE_VALUE": 1
            }
        },
        {
            "id": "5",
            "deal_id": "6555",
            "based_id": "6531",
            "ACTIVE": "Y",
            "category_id": "9",
            "IS_LIMIT": "N",
            "COUNTER_REPEAT": "471",
            "LIMIT_REPEAT": null,
            "LIMIT_DATE": "",
            "START_DATE": "2024-11-21T03:00:00+03:00",
            "NEXT_EXECUTION": "2026-03-07T01:00:00+03:00",
            "LAST_EXECUTION": "2026-03-06T01:00:00+03:00",
            "PARAMS": {
                "MODE": "multiple",
                "SINGLE_BEFORE_START_DATE_TYPE": "day",
                "SINGLE_BEFORE_START_DATE_VALUE": 0,
                "MULTIPLE_TYPE": "day",
                "MULTIPLE_INTERVAL": 1,
                "OFFSET_BEGINDATE_TYPE": "day",
                "OFFSET_BEGINDATE_VALUE": 0,
                "OFFSET_CLOSEDATE_TYPE": "day",
                "OFFSET_CLOSEDATE_VALUE": 0
            }
        }
    ],
    "total": 5,
    "time": {
        "start": 1772757008,
        "finish": 1772757008.649235,
        "duration": 0.6492350101470947,
        "processing": 0,
        "date_start": "2026-03-06T03:30:08+03:00",
        "date_finish": "2026-03-06T03:30:08+03:00",
        "operating_reset_at": 1772757608,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`recurring_deal[]`](./crm-deal-recurring-get.md#recurring-deal) | Массив настроек шаблонов регулярных сделок.

Описание полей элемента приведено в методе [crm.deal.recurring.get](./crm-deal-recurring-get.md) ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **next**
[`integer`](../../../data-types.md) | Смещение для запроса следующей страницы.

Поле присутствует, если есть следующая страница результатов ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `Access denied` | Недостаточно прав для чтения сделок ||
|| `Parameter 'order' must be array` | В параметр `order` передан не объект ||
|| `Parameter 'filter' must be array` | В параметр `filter` передан не объект ||
|| `Failed to get list. General error` | Не удалось получить список из-за внутренней ошибки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-recurring-fields.md)
- [{#T}](./crm-deal-recurring-get.md)
- [{#T}](./crm-deal-recurring-add.md)
- [{#T}](./crm-deal-recurring-update.md)
- [{#T}](./crm-deal-recurring-delete.md)
- [{#T}](./crm-deal-recurring-expose.md)


