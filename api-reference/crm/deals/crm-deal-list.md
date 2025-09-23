# Получить список сделок crm.deal.list

> Scope: [`crm`](../../scopes/permissions.md)
> 
> Кто может выполнять метод: любой пользователь с правом «чтения» сделок

Метод `crm.deal.list` возвращает список сделок по фильтру. Является реализацией списочного метода для сделок.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей, которые должны быть заполнены у сделок в выборке.

При выборке можно использовать следующие маски:
- `'*'` — для выборки всех полей (без пользовательских и множественных)
- `'UF_*'` — для выборки всех пользовательских полей (без множественных)

Список доступных полей для выборки можно узнать с помощью метода [crm.deal.fields](./crm-deal-fields.md).

По умолчанию берутся все поля — `'*'` + Пользовательские поля — `'UF_*'`
||
|| **filter**
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

Фильтр LIKE не работает с полями типа `crm_status`, `crm_contact`, `crm_company` (тип сделки `TYPE_ID`, стадия `STAGE_ID` и так далее).

Список доступных полей для фильтрации можно узнать с помощью метода [crm.deal.fields](./crm-deal-fields.md). 

Фильтр не поддерживает поле `CONTACT_IDS`, для фильтрации по контактам используйте метод [crm.item.list](../universal/crm-item-list.md)
||
|| **order**
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
- `field_n` — название поля, по которому будет произведена сортировка выборки сделок
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список доступных полей для сортировки можно узнать с помощью метода [crm.deal.fields](./crm-deal-fields.md)
||
|| **start**
[`integer`](../../data-types.md)  | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

Так же смотрите описание [списочных методов](../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

{% note tip "Связанные методы и темы" %}

[{#T}](./recurring-deals/crm-deal-recurring-list.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список сделок, у которых:
1. идентификатор воронки равен `1`
2. тип сделки равен `COMPLEX` (комплексная продажа)
3. название заканчивается на `а`
4. стадия равна `С1:NEW` (новая)
5. сумма больше 10000, но меньше или равна 20000
6. включен ручной режим подсчета суммы
7. ответственным является либо пользователь с `id = 1`, либо пользователь с `id = 6`
8. сделка создана не менее 6 месяцев назад

Задать следующий порядок сортировки у данной выборки: название и сумма в порядке возрастания.

Для наглядности выбрать только необходимые поля:
- Идентификатор `ID`
- Название `TITLE`
- Тип сделки `TYPE_ID`
- Идентификатор воронки `CATEGORY_ID`
- Стадия `STAGE_ID`
- Сумма `OPPORTUNITY`
- Включен ли ручной режим `IS_MANUAL_OPPORTUNITY`
- Ответственный `ASSIGNED_BY_ID`
- Дата создания `DATE_CREATE`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"SELECT":["ID","TITLE","TYPE_ID","CATEGORY_ID","STAGE_ID","OPPORTUNITY","IS_MANUAL_OPPORTUNITY","ASSIGNED_BY_ID","DATE_CREATE"],"FILTER":{"=%TITLE":"%а","CATEGORY_ID":1,"TYPE_ID":"COMPLEX","STAGE_ID":"C1:NEW",">OPPORTUNITY":10000,"<=OPPORTUNITY":20000,"IS_MANUAL_OPPORTUNITY":"Y","@ASSIGNED_BY_ID":[1,6],">DATE_CREATE":"'"$(date --date='-6 months' +%Y-%m-%d)"'"},"ORDER":{"TITLE":"ASC","OPPORTUNITY":"ASC"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.deal.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"SELECT":["ID","TITLE","TYPE_ID","CATEGORY_ID","STAGE_ID","OPPORTUNITY","IS_MANUAL_OPPORTUNITY","ASSIGNED_BY_ID","DATE_CREATE"],"FILTER":{"=%TITLE":"%а","CATEGORY_ID":1,"TYPE_ID":"COMPLEX","STAGE_ID":"C1:NEW",">OPPORTUNITY":10000,"<=OPPORTUNITY":20000,"IS_MANUAL_OPPORTUNITY":"Y","@ASSIGNED_BY_ID":[1,6],">DATE_CREATE":"'"$(date --date='-6 months' +%Y-%m-%d)"'"},"ORDER":{"TITLE":"ASC","OPPORTUNITY":"ASC"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const now = new Date();
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(now.getMonth() - 6);
    
    try {
      const response = await $b24.callListMethod(
        'crm.deal.list',
        {
          select: [
            'ID',
            'TITLE',
            'TYPE_ID',
            'CATEGORY_ID',
            'STAGE_ID',
            'OPPORTUNITY',
            'IS_MANUAL_OPPORTUNITY',
            'ASSIGNED_BY_ID',
            'DATE_CREATE',
          ],
          filter: {
            '=%TITLE': '%а',
            CATEGORY_ID: 1,
            TYPE_ID: 'COMPLEX',
            STAGE_ID: 'C1:NEW',
            '>OPPORTUNITY': 10000,
            '<=OPPORTUNITY': 20000,
            IS_MANUAL_OPPORTUNITY: 'Y',
            '@ASSIGNED_BY_ID': [1, 6],
            '>DATE_CREATE': sixMonthAgo,
          },
          order: {
            TITLE: 'ASC',
            OPPORTUNITY: 'ASC',
          },
        },
        (result) => {
          result.error()
            ? console.error(result.error())
            : console.info(result.data())
          ;
        },
      );
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    const now = new Date();
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(now.getMonth() - 6);
    
    try {
      const generator = $b24.fetchListMethod('crm.deal.list', {
        select: [
          'ID',
          'TITLE',
          'TYPE_ID',
          'CATEGORY_ID',
          'STAGE_ID',
          'OPPORTUNITY',
          'IS_MANUAL_OPPORTUNITY',
          'ASSIGNED_BY_ID',
          'DATE_CREATE',
        ],
        filter: {
          '=%TITLE': '%а',
          CATEGORY_ID: 1,
          TYPE_ID: 'COMPLEX',
          STAGE_ID: 'C1:NEW',
          '>OPPORTUNITY': 10000,
          '<=OPPORTUNITY': 20000,
          IS_MANUAL_OPPORTUNITY: 'Y',
          '@ASSIGNED_BY_ID': [1, 6],
          '>DATE_CREATE': sixMonthAgo,
        },
        order: {
          TITLE: 'ASC',
          OPPORTUNITY: 'ASC',
        },
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) {
          console.log('Entity:', entity);
        }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    const now = new Date();
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(now.getMonth() - 6);
    
    try {
      const response = await $b24.callMethod('crm.deal.list', {
        select: [
          'ID',
          'TITLE',
          'TYPE_ID',
          'CATEGORY_ID',
          'STAGE_ID',
          'OPPORTUNITY',
          'IS_MANUAL_OPPORTUNITY',
          'ASSIGNED_BY_ID',
          'DATE_CREATE',
        ],
        filter: {
          '=%TITLE': '%а',
          CATEGORY_ID: 1,
          TYPE_ID: 'COMPLEX',
          STAGE_ID: 'C1:NEW',
          '>OPPORTUNITY': 10000,
          '<=OPPORTUNITY': 20000,
          IS_MANUAL_OPPORTUNITY: 'Y',
          '@ASSIGNED_BY_ID': [1, 6],
          '>DATE_CREATE': sixMonthAgo,
        },
        order: {
          TITLE: 'ASC',
          OPPORTUNITY: 'ASC',
        },
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) {
        console.log('Entity:', entity);
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
                'crm.deal.list',
                [
                    'select' => [
                        'ID',
                        'TITLE',
                        'TYPE_ID',
                        'CATEGORY_ID',
                        'STAGE_ID',
                        'OPPORTUNITY',
                        'IS_MANUAL_OPPORTUNITY',
                        'ASSIGNED_BY_ID',
                        'DATE_CREATE',
                    ],
                    'filter' => [
                        '=%TITLE'              => '%а',
                        'CATEGORY_ID'          => 1,
                        'TYPE_ID'              => 'COMPLEX',
                        'STAGE_ID'             => 'C1:NEW',
                        '>OPPORTUNITY'         => 10000,
                        '<=OPPORTUNITY'        => 20000,
                        'IS_MANUAL_OPPORTUNITY' => 'Y',
                        '@ASSIGNED_BY_ID'      => [1, 6],
                        '>DATE_CREATE'         => $sixMonthAgo,
                    ],
                    'order' => [
                        'TITLE'       => 'ASC',
                        'OPPORTUNITY' => 'ASC',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching deal list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const now = new Date();
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(now.getMonth() - 6);
    
    BX24.callMethod(
        'crm.deal.list',
        {
            select: [
                'ID',
                'TITLE',
                'TYPE_ID',
                'CATEGORY_ID',
                'STAGE_ID',
                'OPPORTUNITY',
                'IS_MANUAL_OPPORTUNITY',
                'ASSIGNED_BY_ID',
                'DATE_CREATE',
            ],
            filter: {
                '=%TITLE': '%а',
                CATEGORY_ID: 1,
                TYPE_ID: 'COMPLEX',
                STAGE_ID: 'C1:NEW',
                '>OPPORTUNITY': 10000,
                '<=OPPORTUNITY': 20000,
                IS_MANUAL_OPPORTUNITY: 'Y',
                '@ASSIGNED_BY_ID': [1, 6],
                '>DATE_CREATE': sixMonthAgo,
            },
            order: {
                TITLE: 'ASC',
                OPPORTUNITY: 'ASC',
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

    $sixMonthAgo = (new DateTime())->modify('-6 months')->format('Y-m-d');

    $result = CRest::call(
        'crm.deal.list',
        [
            'SELECT' => [
                'ID',
                'TITLE',
                'TYPE_ID',
                'CATEGORY_ID',
                'STAGE_ID',
                'OPPORTUNITY',
                'IS_MANUAL_OPPORTUNITY',
                'ASSIGNED_BY_ID',
                'DATE_CREATE',
            ],
            'FILTER' => [
                '=%TITLE' => '%а',
                'CATEGORY_ID' => 1,
                'TYPE_ID' => 'COMPLEX',
                'STAGE_ID' => 'C1:NEW',
                '>OPPORTUNITY' => 10000,
                '<=OPPORTUNITY' => 20000,
                'IS_MANUAL_OPPORTUNITY' => 'Y',
                '@ASSIGNED_BY_ID' => [1, 6],
                '>DATE_CREATE' => $sixMonthAgo,
            ],
            'ORDER' => [
                'TITLE' => 'ASC',
                'OPPORTUNITY' => 'ASC',
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
    "result": [
        {
            "ID": "37",
            "TITLE": "[А] Сделка",
            "TYPE_ID": "COMPLEX",
            "CATEGORY_ID": "1",
            "STAGE_ID": "C1:NEW",
            "OPPORTUNITY": "19999.99",
            "IS_MANUAL_OPPORTUNITY": "Y",
            "ASSIGNED_BY_ID": "1",
            "DATE_CREATE": "2024-09-02T18:37:18+02:00"
        },
        {
            "ID": "38",
            "TITLE": "[А] Сделка",
            "TYPE_ID": "COMPLEX",
            "CATEGORY_ID": "1",
            "STAGE_ID": "C1:NEW",
            "OPPORTUNITY": "20000.00",
            "IS_MANUAL_OPPORTUNITY": "Y",
            "ASSIGNED_BY_ID": "6",
            "DATE_CREATE": "2024-09-02T18:37:38+02:00"
        },
        {
            "ID": "39",
            "TITLE": "[Б] Продажа",
            "TYPE_ID": "COMPLEX",
            "CATEGORY_ID": "1",
            "STAGE_ID": "C1:NEW",
            "OPPORTUNITY": "12500.00",
            "IS_MANUAL_OPPORTUNITY": "Y",
            "ASSIGNED_BY_ID": "1",
            "DATE_CREATE": "2024-04-09T23:11:01+02:00"
        },
        {
            "ID": "40",
            "TITLE": "[Б] Сделка",
            "TYPE_ID": "COMPLEX",
            "CATEGORY_ID": "1",
            "STAGE_ID": "C1:NEW",
            "OPPORTUNITY": "13500.00",
            "IS_MANUAL_OPPORTUNITY": "Y",
            "ASSIGNED_BY_ID": "6",
            "DATE_CREATE": "2024-08-08T19:00:14+02:00"
        },
        {
            "ID": "41",
            "TITLE": "[В] Сделка",
            "TYPE_ID": "COMPLEX",
            "CATEGORY_ID": "1",
            "STAGE_ID": "C1:NEW",
            "OPPORTUNITY": "11500.00",
            "IS_MANUAL_OPPORTUNITY": "Y",
            "ASSIGNED_BY_ID": "6",
            "DATE_CREATE": "2024-05-08T09:38:23+02:00"
        },
        {
            "ID": "42",
            "TITLE": "[С] Сделка",
            "TYPE_ID": "COMPLEX",
            "CATEGORY_ID": "1",
            "STAGE_ID": "C1:NEW",
            "OPPORTUNITY": "18500.00",
            "IS_MANUAL_OPPORTUNITY": "Y",
            "ASSIGNED_BY_ID": "6",
            "DATE_CREATE": "2024-07-02T15:38:32+02:00"
        }
    ],
    "total": 6,
    "time": {
        "start": 1725292115.026221,
        "finish": 1725292115.907058,
        "duration": 0.8808369636535645,
        "processing": 0.2484450340270996,
        "date_start": "2024-09-02T17:48:35+02:00",
        "date_finish": "2024-09-02T17:48:35+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`deal[]`](crm-deal-get.md#deal) | Корневой элемент ответа. Содержит массив из объектов, содержащих информацию о полях сделок. 

Стоит учитывать, что структура полей может быть изменена из-за параметра `select` ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных элементов ||
|| **next**
[`integer`](../../data-types.md) | Содержит значение, которое нужно передать в следующий запрос в параметр `start`, чтобы получить следующую порцию данных.

Параметр `next` появляется в ответе, если количество элементов, соответствующих вашему запросу, превышает значение `50` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'filter' must be array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `Access denied` | У пользователя нет прав на «чтение» сделок ||
|| `-`     | `Parameter 'order' must be array` | В параметр `order` передан не объект ||
|| `-`     | `Parameter 'filter' must be array` | В параметр `filter` передан не объект ||
|| `-`     | `Failed to get list. General error` | Произошла неизвестная ошибка ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-add.md)
- [{#T}](./crm-deal-update.md)
- [{#T}](./crm-deal-get.md)
- [{#T}](./crm-deal-delete.md)
- [{#T}](./crm-deal-fields.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-objects-with-crm-mode.md)
