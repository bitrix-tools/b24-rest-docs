# Получить список элементов справочника по фильтру crm.status.list

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.status.list` возвращает список элементов справочника по фильтру.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
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

- `field_n` — название поля, по которому будет произведена сортировка элементов справочника
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию
- 
 Список полей для сортировки можно узнать методом [crm.status.fields](./crm-status-fields.md) ||
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

- `field_n` — название поля, по которому будет отфильтрована выборка элементов
- `value_n` — значение фильтра

Список полей для фильтрации можно узнать методом [crm.status.fields](./crm-status-fields.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{"order":{"SORT":"ASC"},"filter":{"ENTITY_ID":"DEAL_STAGE"}}' \
         https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.status.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"SORT":"ASC"},"filter":{"ENTITY_ID":"DEAL_STAGE"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.status.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.status.list',
        {
          order: { SORT: "ASC" },
          filter: { ENTITY_ID: "DEAL_STAGE" }
        }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.status.list', {
        order: { SORT: "ASC" },
        filter: { ENTITY_ID: "DEAL_STAGE" }
      }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.status.list', {
        order: { SORT: "ASC" },
        filter: { ENTITY_ID: "DEAL_STAGE" }
      }, 0)
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
                'crm.status.list',
                [
                    'order' => ['SORT' => 'ASC'],
                    'filter' => ['ENTITY_ID' => 'DEAL_STAGE'],
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
        echo 'Error fetching status list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.status.list",
        {
            order: { SORT: "ASC" },
            filter: { ENTITY_ID: "DEAL_STAGE" }
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
        'crm.status.list',
        [
            'order' => [ 'SORT' => 'ASC' ],
            'filter' => [ 'ENTITY_ID' => 'DEAL_STAGE' ]
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
            "ID": "101",
            "ENTITY_ID": "DEAL_STAGE",
            "STATUS_ID": "NEW",
            "NAME": "Новая",
            "NAME_INIT": "Новая",
            "SORT": "10",
            "SYSTEM": "Y",
            "CATEGORY_ID": null,
            "COLOR": "#39A8EF",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#39A8EF"
            }
        },
        {
            "ID": "103",
            "ENTITY_ID": "DEAL_STAGE",
            "STATUS_ID": "PREPARATION",
            "NAME": "Подготовка документов",
            "NAME_INIT": "",
            "SORT": "20",
            "SYSTEM": "N",
            "CATEGORY_ID": null,
            "COLOR": "#2FC6F6",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#2FC6F6"
            }
        },
        {
            "ID": "105",
            "ENTITY_ID": "DEAL_STAGE",
            "STATUS_ID": "PREPAYMENT_INVOICE",
            "NAME": "Cчет на предоплату",
            "NAME_INIT": "",
            "SORT": "30",
            "SYSTEM": "N",
            "CATEGORY_ID": null,
            "COLOR": "#55D0E0",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#55D0E0"
            }
        },
        {
            "ID": "107",
            "ENTITY_ID": "DEAL_STAGE",
            "STATUS_ID": "EXECUTING",
            "NAME": "В работе",
            "NAME_INIT": "",
            "SORT": "40",
            "SYSTEM": "N",
            "CATEGORY_ID": null,
            "COLOR": "#47E4C2",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#47E4C2"
            }
        },
        {
            "ID": "109",
            "ENTITY_ID": "DEAL_STAGE",
            "STATUS_ID": "FINAL_INVOICE",
            "NAME": "Финальный счет",
            "NAME_INIT": "",
            "SORT": "50",
            "SYSTEM": "N",
            "CATEGORY_ID": null,
            "COLOR": "#FFA900",
            "SEMANTICS": null,
            "EXTRA": {
                "SEMANTICS": "process",
                "COLOR": "#FFA900"
            }
        },
        {
            "ID": "111",
            "ENTITY_ID": "DEAL_STAGE",
            "STATUS_ID": "WON",
            "NAME": "Сделка успешна",
            "NAME_INIT": "Сделка успешна",
            "SORT": "60",
            "SYSTEM": "Y",
            "CATEGORY_ID": null,
            "COLOR": "#7BD500",
            "SEMANTICS": "S",
            "EXTRA": {
                "SEMANTICS": "success",
                "COLOR": "#7BD500"
            }
        },
        {
            "ID": "113",
            "ENTITY_ID": "DEAL_STAGE",
            "STATUS_ID": "LOSE",
            "NAME": "Сделка провалена",
            "NAME_INIT": "Сделка провалена",
            "SORT": "70",
            "SYSTEM": "Y",
            "CATEGORY_ID": null,
            "COLOR": "#FF5752",
            "SEMANTICS": "F",
            "EXTRA": {
                "SEMANTICS": "failure",
                "COLOR": "#FF5752"
            }
        },
        {
            "ID": "115",
            "ENTITY_ID": "DEAL_STAGE",
            "STATUS_ID": "APOLOGY",
            "NAME": "Анализ причины провала",
            "NAME_INIT": "",
            "SORT": "80",
            "SYSTEM": "N",
            "CATEGORY_ID": null,
            "COLOR": "#FF5752",
            "SEMANTICS": "F",
            "EXTRA": {
                "SEMANTICS": "apology",
                "COLOR": "#FF5752"
            }
        }
    ],
    "total": 8,
    "time": {
        "start": 1752146147.312812,
        "finish": 1752146147.354549,
        "duration": 0.04173684120178223,
        "processing": 0.00507807731628418,
        "date_start": "2025-07-10T14:15:47+03:00",
        "date_finish": "2025-07-10T14:15:47+03:00",
        "operating_reset_at": 1752146747,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов с информацией об элементах справочника ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных элементов ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Invalid parameters.",
    "error_description": "Переданы некорректные параметры."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `400`     | `Access denied.` | Нет прав на выполнение операции ||
|| `400`     | `Invalid parameters.` | Переданы некорректные параметры ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-status-fields.md)
- [{#T}](./crm-status-get.md)
- [{#T}](./crm-status-add.md)
- [{#T}](./crm-status-update.md)
- [{#T}](./crm-status-delete.md) 
- [{#T}](../../../tutorials/crm/how-to-get-lists/how-to-get-elements-by-stage-filter.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/how-to-get-stages-with-semantics.md)
- [{#T}](../../../tutorials/crm/how-to-add-crm-objects/how-to-add-category-to-spa.md)
