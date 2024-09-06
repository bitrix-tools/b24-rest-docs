# Получить список реквизитов по фильтру crm.requisite.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список реквизитов по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите [поля реквизита](./index.md#fields)).

Если не передан или передан пустой массив, то будут выбраны все доступные поля реквизитов ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных реквизитов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют [полям реквизита](./index.md#fields).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передаётся массив)
- `!@`— NOT IN (в качестве значения передаётся массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
   - "мол%" — ищем значения, начинающиеся с «мол»
   - "%мол" — ищем значения, заканчивающиеся на «мол»
   - "%мол%" — ищем значения, где «мол» может быть в любой позиции

- `%=` — LIKE (см. описание выше)

- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.

- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
   - "мол%" — ищем значения, не начинающиеся с «мол»
   - "%мол" — ищем значения, не заканчивающиеся на «мол»
   - "%мол%" — ищем значения, где подстроки «мол» нет в любой позиции

- `!%=` — NOT LIKE (см. описание выше)

- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно ||
  || **order**
  [`object`](../../../data-types.md) | Объект для сортировки выбранных реквизитов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют [полям реквизита](./index.md#fields).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
  ||
  || **start**
  [`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

## Пример кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Получение реквизитов по идентификатору шаблона

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"DATE_CREATE":"ASC"},"filter":{"PRESET_ID":"1"},"select":["ENTITY_TYPE_ID","ENTITY_ID","ID","NAME"]}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"DATE_CREATE":"ASC"},"filter":{"PRESET_ID":"1"},"select":["ENTITY_TYPE_ID","ENTITY_ID","ID","NAME"],"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.requisite.list
        ```

    - JS

        ```js
        BX24.callMethod(
            "crm.requisite.list",
            {
                order: { "DATE_CREATE": "ASC" },
                filter: { "PRESET_ID": "1"},
                select: [ "ENTITY_TYPE_ID", "ENTITY_ID", "ID", "NAME" ]
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

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.requisite.list',
            [
                'order' => ["DATE_CREATE" => "ASC"],
                'filter' => ["PRESET_ID" => "1"],
                'select' => ["ENTITY_TYPE_ID", "ENTITY_ID", "ID", "NAME"]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Получение значения пользовательского поля в реквизитах

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{},"filter":{"ID":"51"},"select":["UF_CRM_1707997209"]}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{},"filter":{"ID":"51"},"select":["UF_CRM_1707997209"],"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.requisite.list
        ```

    - JS

        ```js
        BX24.callMethod(
            "crm.requisite.list",
            {
                order: {},
                filter: { "ID": "51"}, // Идентификатор реквизита
                select: [ "UF_CRM_1707997209"] // Идентификатор пользовательского поля
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

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.requisite.list',
            [
                'order' => [],
                'filter' => ['ID' => '51'],
                'select' => ['UF_CRM_1707997209']
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

1. Ответ из примера 1:

    ```json
    {
    "result": [
        {
        "ENTITY_TYPE_ID": "4",
        "ENTITY_ID": "3027",
        "ID": "40",
        "NAME": "Организация"
        },
        {
        "ENTITY_TYPE_ID": "4",
        "ENTITY_ID": "3028",
        "ID": "41",
        "NAME": "Реквизиты головного офиса"
        },
        {
        "ENTITY_TYPE_ID": "4",
        "ENTITY_ID": "3028",
        "ID": "42",
        "NAME": "Филиал в г. Черняховск"
        }
    ],
    "total": 3,
    "time": {
        "start": 1717150154.197056,
        "finish": 1717150154.505106,
        "duration": 0.30804991722106934,
        "processing": 0.030454158782958984,
        "date_start": "2024-05-31T12:09:14+02:00",
        "date_finish": "2024-05-31T12:09:14+02:00",
        "operating": 0
    }
    }
    ```

2. Ответ из примера 2:

    ```json
    {
        "result": [
            {
                "UF_CRM_1707997209": "45"
            }
        ],
        "total": 1,
        "time": {
            "start": 1717151052.551011,
            "finish": 1717151052.94743,
            "duration": 0.39641880989074707,
            "processing": 0.028468847274780273,
            "date_start": "2024-05-31T12:24:12+02:00",
            "date_finish": "2024-05-31T12:24:12+02:00",
            "operating": 0
        }
    }
    ```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md)| Массив объектов с информацией из выбранных реквизитов. Каждый элемент содержит выбранные [поля реквизита](./index.md#fields) ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Ответ в случае ошибки

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Текст ошибки** | **Описание** ||
|| `0` | Access denied. | Недостаточно прав доступа для получения списка реквизитов ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-requisite-add.md)
- [{#T}](./crm-requisite-update.md)
- [{#T}](./crm-requisite-get.md)
- [{#T}](./crm-requisite-delete.md)
- [{#T}](./crm-requisite-fields.md)
