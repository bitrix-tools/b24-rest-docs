# Получить список подразделений department.get

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `department.get` предназначен для получения списка подразделений.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **sort**
[`string`](../data-types.md) | Название поля, по которому нужна сортировка. Сортировка работает по полям: 
- `ID` — идентификатор подразделения 
- `NAME` — название подразделения
- `SORT` — порядок сортировки
- `PARENT` —  идентификатор родительского отдела
- `UF_HEAD` — идентификатор пользователя-руководителя отдела ||
|| **order**
[`string`](../data-types.md) | Направление сортировки:
- `ASC` — по возрастанию
- `DESC` — по убыванию ||
|| **ID**
[`int`](../data-types.md) | Фильтр по идентификатору подразделения ||
|| **NAME**
[`string`](../data-types.md) | Фильтр по имени подразделения. Указывается полное название подразделения ||
|| **SORT**
[`int`](../data-types.md) | Фильтр по полю сортировки ||
|| **PARENT**
[`int`](../data-types.md) | Фильтр по идентификатору родительского подразделения ||
|| **UF_HEAD**
[`int`](../data-types.md) | Фильтр по идентификатору руководителя подразделения ||
|| **START**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Подробности в статье [{#T}](../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "sort": "NAME",
        "order": "DESC",
        "PARENT": 1
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/department.get
    ```

- cURL (OAuth)

    ```curl
    -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "sort": "NAME",
        "order": "DESC",
        "PARENT": 1,
        "auth":"**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/department.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"department.get", {
    			"sort": "NAME",
    			"order": "DESC",
    			"PARENT": 1
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'department.get',
                [
                    'sort'   => 'NAME',
                    'order'  => 'DESC',
                    'PARENT' => 1,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting departments: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "department.get", {
            "sort": "NAME",
            "order": "DESC",
            "PARENT": 1
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'department.get',
        [
            'sort' => 'NAME',
            'order' => 'DESC',
            'PARENT' => 1,
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
      "ID": "15",
      "NAME": "R\u0026D",
      "SORT": 500,
      "PARENT": "1"
    },
    {
      "ID": "2",
      "NAME": "Бухгалтерия",
      "SORT": 500,
      "PARENT": "1"
    },
    {
      "ID": "4",
      "NAME": "Отдел маркетинга и рекламы",
      "SORT": 500,
      "PARENT": "1"
    },
    {
      "ID": "3",
      "NAME": "Отдел продаж",
      "SORT": 500,
      "PARENT": "1"
    },
    {
      "ID": "17",
      "NAME": "Юр. отдел",
      "SORT": 500,
      "PARENT": "1"
    }
  ],
  "total": 5,
  "time": {
    "start": 1736924749.531017,
    "finish": 1736924749.719845,
    "duration": 0.1888279914855957,
    "processing": 0.00179290771484375,
    "date_start": "2025-01-15T07:05:49+00:00",
    "date_finish": "2025-01-15T07:05:49+00:00",
    "operating": 0
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`department[]`](#st_department) | Корневой элемент ответа, который содержит отфильтрованный список подразделений ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

### Структура department {#st_department}

```json
    {
        "ID": "2",
        "NAME": "Бухгалтерия",
        "SORT": 500,
        "PARENT": "1"
    }
```

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`int`](../data-types.md) | Иидентификатор подразделения ||
|| **NAME**
[`string`](../data-types.md) | Название подразделения ||
|| **SORT**
[`int`](../data-types.md) | Поле сортировки подразделения ||
|| **PARENT**
[`int`](../data-types.md) | Идентификатор родительского подразделения ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./department-add.md)
- [{#T}](./department-update.md)
- [{#T}](./department-delete.md)
- [{#T}](./department-fields.md)