# Получить список датасетов biconnector.dataset.list

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.dataset.list` возвращает список датасетов по фильтру. Является реализацией списочного метода для датасетов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`](../../data-types.md) | Список полей, которые должны быть заполнены у датасетов в выборке. По умолчанию берутся все поля. 
Не поддерживает поле `fields`, оно будет проигнорировано ||
|| **filter**
[`object`](../../data-types.md) | Фильтр для выборки датасетов. Пример формата:

```json
{
    "field_1": "value_1",
    "field_2": "value_2"
}
```

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

Список доступных полей для фильтрации можно узнать с помощью метода [biconnector.dataset.fields](./biconnector-dataset-fields.md).

Фильтр не поддерживает поле `fields`, оно будет проигнорировано
||
|| **order**
[`object`](../../data-types.md) | Параметры сортировки. Пример формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля, по которому будет произведена сортировка выборки датасетов
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию
||
|| **page**
[`integer`](../../data-types.md) | Управление постраничной навигацией. Размер страницы результатов — 50 записей. Для перехода по результатам передавайте номер страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список источников, у которых:
- название начинается на `Sales`
- описание не пустое
- идентификатор источника равен `2` или `4`

Для наглядности выбрать только необходимые поля:
- идентификатор `id`
- название `name`
- описание `description`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "select": ["id", "name", "description"],
        "filter": {
            "%=name": "Sales%",
            "!description": "",
            "@sourceId": [2, 4]
        },
        "order": {
            "dateCreate": "DESC"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.dataset.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "select": ["id", "name", "description"],
        "filter": {
            "%=name": "Sales%",
            "!description": "",
            "@sourceId": [2, 4]
        },
        "order": {
            "dateCreate": "DESC"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/biconnector.dataset.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'biconnector.dataset.list',
        {
          select: ["id", "name", "description"],
          filter: {
            '%=name': "Sales%",
            '!description': "",
            "@sourceId": [2, 4]
          },
          order: {
            dateCreate: "DESC"
          }
        },
        (progress) => { console.log('Progress:', progress) }
      );
      const items = response.getData() || [];
      for (const entity of items) { console.log('Entity:', entity); }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('biconnector.dataset.list', {
        select: ["id", "name", "description"],
        filter: {
          '%=name': "Sales%",
          '!description': "",
          "@sourceId": [2, 4]
        },
        order: {
          dateCreate: "DESC"
        }
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity); }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('biconnector.dataset.list', {
        select: ["id", "name", "description"],
        filter: {
          '%=name': "Sales%",
          '!description': "",
          "@sourceId": [2, 4]
        },
        order: {
          dateCreate: "DESC"
        }
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) { console.log('Entity:', entity); }
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
                'biconnector.dataset.list',
                [
                    'select' => ["id", "name", "description"],
                    'filter' => [
                        '%=name'      => "Sales%",
                        '!description' => "",
                        "@sourceId"   => [2, 4]
                    ],
                    'order'  => [
                        'dateCreate' => "DESC"
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($response->getError()) {
            error_log($response->getError());
            echo 'Error: ' . $response->getError();
        } else {
            echo 'Success: ' . print_r($result, true);
            // Нужная вам логика обработки данных
            processData($result);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling biconnector.dataset.list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.dataset.list',
        {
            select: ["id", "name", "description"],
            filter: {
                '%=name': "Sales%",
                '!description': "",
                "@sourceId": [2, 4]
            },
            order: {
                dateCreate: "DESC"
            }
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.dataset.list',
        [
            'select' => ["id", "name", "description"],
            'filter' => ['%=name' => "Sales%", '!description' => "", '@sourceId' => [2, 4]],
            'order' => ['dateCreate' => "DESC"]
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
            "id": "9",
            "name": "sales_data_main",
            "description": "Monthly sales report"
        },
        {
            "id": "6",
            "name": "sales_data_first_filial",
            "description": "Monthly sales report for first filial"
        },
        {
            "id": "5",
            "name": "sales_data_second_filial",
            "description": "Monthly sales report for second filial"
        }
    ],
    "time": {
        "start": 1743061675.963969,
        "finish": 1743061676.064591,
        "duration": 0.10062193870544434,
        "processing": 0.011152029037475586,
        "date_start": "2025-03-27T07:47:55+00:00",
        "date_finish": "2025-03-27T07:47:56+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит массив из объектов, содержащих информацию о полях датасетов. 

Стоит учитывать, что структура полей может быть изменена из-за параметра `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "VALIDATION_SELECT_TYPE",
    "error_description": "Parameter \"select\" must be array."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `VALIDATION_SELECT_TYPE` | Parameter "select" must be array. | В параметр `select` передан не объект ||
|| `VALIDATION_FILTER_TYPE` | Parameter "filter" must be array. | В параметр `filter` передан не объект ||
|| `VALIDATION_ORDER_TYPE` | Parameter "order" must be array. | В параметр `order` передан не объект ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_SELECT` | Field "#TITLE#" is not allowed in the "select". | Данные поля недопустимы в выборке ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_FILTER` | Field "#TITLE#" is not allowed in the "filter". | Данные поля недопустимы в фильтре ||
|| `VALIDATION_FIELD_NOT_ALLOWED_IN_ORDER` | Field "#TITLE#" is not allowed in the "order". | Данные поля недопустимы для сортировки ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-dataset-add.md)
- [{#T}](./biconnector-dataset-update.md)
- [{#T}](./biconnector-dataset-fields-update.md)
- [{#T}](./biconnector-dataset-get.md)
- [{#T}](./biconnector-dataset-fields.md)
- [{#T}](./biconnector-dataset-delete.md)
