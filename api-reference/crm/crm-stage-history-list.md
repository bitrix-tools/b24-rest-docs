# Получить историю движения по стадиям crm.stagehistory.list

> Scope: [`crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод поддерживает извлечение записей из истории движения по стадиям для лидов, сделок и счетов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**
[`integer`][1] | Идентификатор типа объекта. Может принимать значения:
- `1` — лид
- `2` — сделка
- `5` — счет
||
|| **order**
[`object`][1]| Список для сортировки, где ключ — поле, а значение — `ASC` или `DESC` ||
|| **filter**
[`object`][1] | Список для фильтрации. Фильтр поддерживает использование точных значений, массивов значений, а также модификаторы:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `=` — равно, точное совпадение
- `!=` — не равно
||
|| **select**
[`object`][1]| Список получаемых полей ||
|| **start**
[`integer`][1] | Сдвиг для постраничной навигации. Логика работы с постраничной навигацией стандартная для [списочных методов](../how-to-call-rest-api/list-methods-pecularities.md) REST ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Получить историю движения по стадиям для сделки с `ID=1`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"order":{"ID":"ASC"},"filter":{"OWNER_ID":1},"select":["ID","STAGE_ID","CREATED_TIME"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.stagehistory.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"order":{"ID":"ASC"},"filter":{"OWNER_ID":1},"select":["ID","STAGE_ID","CREATED_TIME"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.stagehistory.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const parameters = {
        entityTypeId: 2,
        order: { "ID": "ASC" },
        filter: { "OWNER_ID": 1 },
        select: [ "ID", "STAGE_ID", "CREATED_TIME" ]
    };
    
    try {
      const response = await $b24.callListMethod(
        'crm.stagehistory.list',
        parameters,
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('crm.stagehistory.list', parameters, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.stagehistory.list', parameters, 0)
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
                'crm.stagehistory.list',
                [
                    'entityTypeId' => 2,
                    'order' => ['ID' => 'ASC'],
                    'filter' => ['OWNER_ID' => 1],
                    'select' => ['ID', 'STAGE_ID', 'CREATED_TIME'],
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
        echo 'Error listing stage history: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.stagehistory.list",
        {
            entityTypeId: 2,
            order: { "ID": "ASC" },
            filter: { "OWNER_ID": 1 },
            select: [ "ID", "STAGE_ID", "CREATED_TIME" ]
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
        'crm.stagehistory.list',
        [
            'entityTypeId' => 2,
            'order' => ['ID' => 'ASC'],
            'filter' => ['OWNER_ID' => 1],
            'select' => ['ID', 'STAGE_ID', 'CREATED_TIME']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Метод вернет массив записей из истории:

```json
{
    "result": {
        "items": [
        {
            "ID": "35",
            "TYPE_ID": "1",
            "OWNER_ID": "21",
            "CREATED_TIME": "2024-04-25T14:59:11+00:00",
            "CATEGORY_ID": "0",
            "STAGE_SEMANTIC_ID": "P",
            "STAGE_ID": "NEW"
        }
        ]
    },
    "total": 1,
    "time": {
        "start": 1724106224.858572,
        "finish": 1724106225.344968,
        "duration": 0.48639607429504395,
        "processing": 0.11864185333251953,
        "date_start": "2024-08-15T22:15:44+00:00",
        "date_finish": "2024-08-15T22:15:45+00:00",
        "operating": 0.11855506896972656
    }
}
```

### Возвращаемые данные

Каждый элемент массива — массив с ключами.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`int`][1] | Идентификатор записи ||
|| **TYPE_ID**
[`int`][1] | Тип записи. Может принимать значения:
- `1` — создание объекта
- `2` — перевод на промежуточную стадию
- `3` — перевод на финальную стадию ||
|| **OWNER_ID**
[`int`][1] | Идентификатор объекта, в котором изменилась стадия ||
|| **CREATED_TIME**
[`datetime`][1] | Идентификатор созданного элемента ||
|#

Помимо этого есть специфичные для разных типов объектов поля:

- для лидов и счетов

#|
|| **Название**
`тип` | **Описание** ||
|| **STATUS_SEMANTIC_ID**
[`int`][1] | Cемантика статуса (стадии):
  - `P` — промежуточная стадия
  - `S` — успешная стадия
  - `F` — провальная стадия ||
|| **STATUS_ID**
[`int`][1] | Идентификатор статуса (стадии) ||
|#

- для сделок

#|
|| **Название**
`тип` | **Описание** ||
|| **CATEGORY_ID**
[`int`][1] | Идентификатор направления (воронки) ||
|| **STAGE_SEMANTIC_ID**
[`int`][1] | Семантика статуса (стадии):
- `P` — промежуточная стадия
- `S` — успешная стадия
- `F` — провальная стадия ||
|| **STAGE_ID**
[`int`][1] | Идентификатор стадии ||
|#

## Обработка ошибок

HTTP-статус: **401**, **400**

```json
{
    "error": 0,
    "error_description": "SHIPMENT_DOCUMENT entity is not supported"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код**                           | **Описание**                                                       | **Значение**                                                                                    ||
|| `400`      | `0`                               | "`entity_name`" Объект не поддерживается                         | Возникает при передаче невалидного `entityTypeId`                                              ||
|| `400`      | `ACCESS_DENIED`                   | Доступ запрещен                                                    | У пользователя нет прав на добавление элементов типа `entityTypeId`                             ||
|| `401`      | `INVALID_CREDENTIALS`             | Неверные данные авторизации для запроса                            | Некорректный ID пользователя и/или код в пути запроса                                       ||
|#

{% include [системные ошибки](./../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./main-entities-fields.md)

[1]: ../data-types.md