# Получить список компаний по фильтру crm.company.list

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» компаний

{% note warning "Развитие метода остановлено" %}

Метод `crm.company.list` продолжает работать, но у него есть более актуальный аналог [crm.item.list](../universal/crm-item-list.md).

{% endnote %}

Метод `crm.company.list` возвращает список компаний по фильтру. Является реализацией [списочного метода](../../../settings/how-to-call-rest-api/list-methods-pecularities.md) для компаний.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей, которыми можно ограничить выборку.

При выборке можно использовать маски:
- `'*'` — для выборки всех полей, без пользовательских и множественных,
- `'UF_*'` — для выборки всех пользовательских полей без множественных.

Маски для выборки множественных полей нет. Для выборки множественных полей укажите нужные в списке выбора — `PHONE`, `EMAIL` и так далее.

Список доступных полей для выборки можно узнать с помощью метода [crm.company.fields](crm-company-fields.md).

По умолчанию возвращаются все поля — `'*'` + пользовательские поля — `'UF_*'`
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

Поля `PHONE`, `EMAIL`, `WEB`, `IM` — множественные. По ним фильтры работают только на точное совпадение.

Фильтр `LIKE` не работает с полями типа `crm_status`, `crm_company` — например, `COMPANY_TYPE`.

Список доступных полей для фильтрации можно узнать с помощью метода [crm.company.fields](crm-company-fields.md).

Ключ `logic` в фильтре не поддерживается. Для использования сложной логики в фильтре используйте метод [crm.item.list](../universal/crm-item-list.md)
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
- `field_n` — название поля, по которому будет произведена сортировка выборки компаний
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список доступных полей для сортировки можно узнать с помощью метода [crm.company.fields](crm-company-fields.md)
||
|| **start**
[`integer`](../../data-types.md) | Параметр для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Вывести компании:
- c сортировкой по дате создания,
- с выборкой полей: название, ответственный, телефон,
- по фильтру: тип компании `CUSTOMER` и дата создания с 2025-01-01.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ORDER":{"DATE_CREATE":"ASC"},"FILTER":{"COMPANY_TYPE":"CUSTOMER",">=DATE_CREATE":"2025-01-01"},"SELECT":["TITLE","ASSIGNED_BY_ID","PHONE"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ORDER":{"DATE_CREATE":"ASC"},"FILTER":{"COMPANY_TYPE":"CUSTOMER",">=DATE_CREATE":"2025-01-01"},"SELECT":["TITLE","ASSIGNED_BY_ID","PHONE"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.list
    ```

- JS

    ```js
    // callListMethod: Получает все данные сразу.
    // Используйте только для небольших выборок (< 1000 элементов) из-за высокой
    // нагрузки на память.

    try {
    const response = await $b24.callListMethod(
        'crm.company.list',
        {
        order: { "DATE_CREATE": "ASC" },
        filter: { "COMPANY_TYPE": "CUSTOMER", ">=DATE_CREATE": "2025-01-01" },
        select: [ "TITLE", "ASSIGNED_BY_ID", "PHONE" ]
        },
        (progress: number) => { console.log('Progress:', progress) }
    );
    const items = response.getData() || [];
    for (const entity of items) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора.
    // Используйте для больших объемов данных для эффективного потребления памяти.

    try {
    const generator = $b24.fetchListMethod('crm.company.list', {
        order: { "DATE_CREATE": "ASC" },
        filter: { "COMPANY_TYPE": "CUSTOMER", ">=DATE_CREATE": "2025-01-01" },
        select: [ "TITLE", "ASSIGNED_BY_ID", "PHONE" ]
    }, 'ID');
    for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
    }
    } catch (error: any) {
    console.error('Request failed', error)
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start.
    // Используйте для точного контроля над пакетами запросов.
    // Для больших данных менее эффективен, чем fetchListMethod.

    try {
    const response = await $b24.callMethod('crm.company.list', {
        order: { "DATE_CREATE": "ASC" },
        filter: { "COMPANY_TYPE": "CUSTOMER", ">=DATE_CREATE": "2025-01-01" },
        select: [ "TITLE", "ASSIGNED_BY_ID", "PHONE" ]
    }, 0);
    const result = response.getData().result || [];
    for (const entity of result) { console.log('Entity:', entity) }
    } catch (error: any) {
    console.error('Request failed', error)
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.list',
                [
                    'order' => ['DATE_CREATE' => 'ASC'],
                    'filter' => ['COMPANY_TYPE' => 'CUSTOMER', '>=DATE_CREATE' => '2025-01-01'],
                    'select' => ['TITLE', 'ASSIGNED_BY_ID', 'PHONE'],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        
        if ($result->more()) {
            $result->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching company list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.company.list",
        {
            order: { "DATE_CREATE": "ASC" },
            filter: { "COMPANY_TYPE": "CUSTOMER", ">=DATE_CREATE": "2025-01-01" },
            select: [ "TITLE", "ASSIGNED_BY_ID", "PHONE" ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.company.list',
        [
            'order' => ['DATE_CREATE' => 'ASC'],
            'filter' => ['COMPANY_TYPE' => 'CUSTOMER', '>=DATE_CREATE' => '2025-01-01'],
            'select' => ['TITLE', 'ASSIGNED_BY_ID', 'PHONE'],
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
            "TITLE": "Перекресток",
            "ASSIGNED_BY_ID": "811",
            "ID": "2919",
            "PHONE": [
                {
                    "ID": "8303",
                    "VALUE_TYPE": "WORK",
                    "VALUE": "+79998887766",
                    "TYPE_ID": "PHONE"
                }
            ]
        }
    ],
    "total": 1,
    "time": {
        "start": 1769498859,
        "finish": 1769498859.948139,
        "duration": 0.948138952255249,
        "processing": 0,
        "date_start": "2026-01-27T10:27:39+03:00",
        "date_finish": "2026-01-27T10:27:39+03:00",
        "operating_reset_at": 1769499459,
        "operating": 0.1621239185333252
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array[]`](../../data-types.md) | Массив компаний, соответствующих фильтру. Формат возвращаемых данных зависит от параметра `select` ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных компаний ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `Access denied` | У пользователя нет прав на «Чтение» компаний ||
|| `-`     | `Parameter 'order' must be array` | В параметр `order` передан не массив ||
|| `-`     | `Parameter 'filter' must be array` | В параметр `filter` передан не массив ||
|| `-`     | `Failed to get list. General error` | Произошла неизвестная ошибка ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-add.md)
- [{#T}](./crm-company-update.md)
- [{#T}](./crm-company-get.md)
- [{#T}](./crm-company-delete.md)
- [{#T}](./crm-company-fields.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/search-by-phone-and-email.md)
