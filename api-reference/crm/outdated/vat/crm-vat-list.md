# Получить список ставок НДС по фильтру crm.vat.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning "Развитие метода остановлено" %}

Метод `crm.vat.list` продолжает работать, но у него есть более актуальный аналог [catalog.vat.list](../../../catalog/vat/catalog-vat-list.md).

{% endnote %}

Метод `crm.vat.list` возвращает список ставок НДС по фильтру. 
Является реализацией [списочного метода](../../../../settings/how-to-call-rest-api/list-methods-pecularities.md) для ставок НДС.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

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

- `field_n` — название поля, по которому будет произведена сортировка выборки ставок
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список доступных полей для сортировки можно узнать с помощью метода [crm.vat.fields](./crm-vat-fields.md) ||
|| **filter** 
[`object`](../../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

- `field_n` — название поля, по которому будет отфильтрована выборка элементов
- `value_n` — значение фильтра

Список доступных полей для фильтрации можно узнать с помощью метода [crm.vat.fields](./crm-vat-fields.md)
||
|| **select** 
[`array`](../../../data-types.md) | Массив возвращаемых полей. Если не указан, возвращаются все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"order":{"ID":"ASC"},"filter":{"ACTIVE":"Y"},"select":["ID","NAME","RATE"]}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.vat.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"ID":"ASC"},"filter":{"ACTIVE":"Y"},"select":["ID","NAME","RATE"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.vat.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.vat.list',
        {
          order: { ID: "ASC" },
          filter: { ACTIVE: "Y" },
          select: ["ID", "NAME", "RATE"]
        },
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.vat.list', { order: { ID: "ASC" }, filter: { ACTIVE: "Y" }, select: ["ID", "NAME", "RATE"] }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.vat.list', { order: { ID: "ASC" }, filter: { ACTIVE: "Y" }, select: ["ID", "NAME", "RATE"] }, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.vat.list',
                [
                    'order'  => ['ID' => 'ASC'],
                    'filter' => ['ACTIVE' => 'Y'],
                    'select' => ['ID', 'NAME', 'RATE'],
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
        echo 'Error fetching VAT list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.vat.list",
        {
            order: { ID: "ASC" },
            filter: { ACTIVE: "Y" },
            select: ["ID", "NAME", "RATE"]
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.vat.list',
        [
            'order' => [ 'ID' => 'ASC' ],
            'filter' => [ 'ACTIVE' => 'Y' ],
            'select' => [ 'ID', 'NAME', 'RATE' ]
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
            "ID": "1",
            "NAME": "Без НДС",
            "RATE": null
        },
        {
            "ID": "3",
            "NAME": "НДС 20%",
            "RATE": "20.00"
        },
        {
            "ID": "7",
            "NAME": "12",
            "RATE": "12.00"
        }
    ],
    "total": 3,
    "time": {
        "start": 1752044697.589623,
        "finish": 1752044697.66439,
        "duration": 0.0747671127319336,
        "processing": 0.00588679313659668,
        "date_start": "2025-07-09T10:04:57+03:00",
        "date_finish": "2025-07-09T10:04:57+03:00",
        "operating_reset_at": 1752045297,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит массив из объектов, содержащих информацию о полях ставок НДС. 

Структура полей может быть изменена из-за параметра `select` ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных элементов ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Inadmissible fields for selection",
    "error_description": "Переданы недопустимые поля для выборки."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `The Commercial Catalog module is not installed.` | Модуль catalog не установлен ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|| `400`     | `"Inadmissible fields for selection.` | Переданы недопустимые поля для выборки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-vat-fields.md)
- [{#T}](./crm-vat-get.md)
- [{#T}](./crm-vat-add.md)
- [{#T}](./crm-vat-update.md)
- [{#T}](./crm-vat-delete.md) 

