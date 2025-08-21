# Получить список пользователей по фильтру user.get

> Scope: [`user`](../scopes/permissions.md), [`user_brief`](../scopes/permissions.md), [`user_basic`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.get` позволяет получить фильтрованный список пользователей. Метод возвращает всех пользователей за исключением: ботов, пользователей для e-mail, пользователей для Открытых Линий, пользователей Реплики.

{% note info "" %}

Метод не возвращает интеграторов. Перечень полей пользователей Битрикс24, который будет получен в результате выполнения метода, зависит от скоупа приложения/вебхука. Подробности о доступе к данным пользователей можно узнать в [статье](index.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **sort**
[`string`](../data-types.md) | Поле, по которому сортируются результаты. Сортировка работает по всем полям из [user.add](./user-add.md) ||
|| **order**
[`string`](../data-types.md) | Направление сортировки:
- `ASC` — по возрастанию
- `DESC` — по убыванию ||
|| **FILTER**
[`string`](../data-types.md) | Дополнительно можно указывать любые параметры из [user.add](./user-add.md) для фильтрации по их значениям. Кроме основных полей, доступны дополнительные:
- `UF_DEPARTMENT` — принадлежность к структуре компании;
- `UF_PHONE_INNER` — внутренний телефонный номер;
- `IS_ONLINE` — [Y\|N] позволяет показать только авторизованных или нет пользователей.
- `NAME_SEARCH` — быстрый поиск по персональным данным.
- `USER_TYPE` — тип пользователя. Может принимать следующие значения: 
    - `employee` — сотрудник, 
    - `extranet` — пользователь экстранета, 
    - `email` — почтовый пользователь
- `ACTIVE` — при значении *true* исключает из запроса уволенных пользователей.
  
Параметры фильтрации могут принимать значение массивов.
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
- `!=` - не равно
- `!` — не равно

 ||
|| **ADMIN_MODE**
[`boolean`](../data-types.md) | [Ключ для работы](*ключ_Ключ для работы) в режиме администратора. Служит для получения данных о любых пользователях ||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "UF_DEPARTMENT": 1,
        "SORT": "ID",
        "ORDER": "asc",
        "start": 10
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.get
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "UF_DEPARTMENT": 1,
        "SORT": "ID",
        "ORDER": "asc",
        "start": 10,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'user.get',
    		{
    			'UF_DEPARTMENT': 1,
    			'SORT': 'ID',
    			'ORDER': 'asc',
    			'start': 10
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
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
                'user.get',
                [
                    'UF_DEPARTMENT' => 1,
                    'SORT'         => 'ID',
                    'ORDER'        => 'asc',
                    'start'        => 10,
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
        echo 'Error getting users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "user.get",
        {
            "UF_DEPARTMENT": 1,
            "SORT": "ID",
            "ORDER": "asc",
            "start": 10
        },
        function(result)
        {
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
        'user.get',
        [
            "UF_DEPARTMENT" => 1,
            "SORT" => 'ID',
            "ORDER" => 'asc',
            "start" => 10
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Фильтрация по имени, начинающемуся с «Ива»

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"NAME":"Ива%"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"NAME":"Ива%"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'user.get',
    		{
    			filter: {
    				"NAME": "Ива%"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'user.get',
                [
                    'filter' => [
                        'NAME' => 'Ива%'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching user data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "user.get",
        {
            filter: {
                "NAME": "Ива%"
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.get',
        [
            'filter' => [
                'NAME' => 'Ива%'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Фильтрация по фамилии, не содержащей «ов»

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"!%LAST_NAME":"ов"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"!%LAST_NAME":"ов"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"user.get",
    		{
    			filter: {
    				"!%LAST_NAME": "ов"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'user.get',
                [
                    'filter' => [
                        '!%LAST_NAME' => 'ов',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "user.get",
        {
            filter: {
                "!%LAST_NAME": "ов"
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.get',
        [
            'filter' => [
                '!%LAST_NAME' => 'ов'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Фильтрация по нескольким городам проживания

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"@PERSONAL_CITY":["Москва","Санкт-Петербург"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"@PERSONAL_CITY":["Москва","Санкт-Петербург"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'user.get',
    		{
    			filter: {
    				'@PERSONAL_CITY': ['Москва', 'Санкт-Петербург']
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'user.get',
                [
                    'filter' => [
                        '@PERSONAL_CITY' => ['Москва', 'Санкт-Петербург']
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "user.get",
        {
            filter: {
                "@PERSONAL_CITY": ["Москва", "Санкт-Петербург"]
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.get',
        [
            'filter' => [
                '@PERSONAL_CITY' => ['Москва', 'Санкт-Петербург']
            ]
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
                "ACTIVE": true,
                "NAME": "Вадим",
                "LAST_NAME": "Валеев",
                "SECOND_NAME": "",
                "EMAIL": "v.r.valeev@bitrix.com",
                "LAST_LOGIN": "2024-07-25T13:06:54+00:00",
                "DATE_REGISTER": "2024-07-15T00:00:00+00:00",
                "TIME_ZONE": "",
                "IS_ONLINE": "Y",
                "TIMESTAMP_X": {
                },
                "LAST_ACTIVITY_DATE": {
                },
                "PERSONAL_GENDER": "",
                "PERSONAL_WWW": "",
                "PERSONAL_BIRTHDAY": "2018-07-14T00:00:00+00:00",
                "PERSONAL_MOBILE": "",
                "PERSONAL_CITY": "",
                "WORK_PHONE": "",
                "WORK_POSITION": "",
                "UF_EMPLOYMENT_DATE": "",
                "UF_DEPARTMENT": [1],
                "USER_TYPE": "employee"
            },
            {
                "ID": "3",
                "ACTIVE": true,
                "NAME": "Иван",
                "LAST_NAME": "Иванов",
                "EMAIL": "test@gmail.com",
                "LAST_LOGIN": "2024-07-24T09:01:55+00:00",
                "DATE_REGISTER": "2024-07-22T00:00:00+00:00",
                "IS_ONLINE": "N",
                "TIMESTAMP_X": {
                },
                "LAST_ACTIVITY_DATE": {
                },
                "PERSONAL_GENDER": "",
                "PERSONAL_BIRTHDAY": "",
                "WORK_POSITION": "",
                "UF_EMPLOYMENT_DATE": "",
                "UF_DEPARTMENT": [1],
                "USER_TYPE": "employee"
            }
        ],
        "total": 2,
        "time": {
            "start": 1721913235.39648,
            "finish": 1721913235.45078,
            "duration": 0.05430006980896,
            "processing": 0.0187909603118897,
            "date_start": "2024-07-25T13:13:55+00:00",
            "date_finish": "2024-07-25T13:13:55+00:00",
            "operating": 0
        }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа, который содержит отфильтрованный список пользователей ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-add.md)
- [{#T}](./user-update.md)
- [{#T}](./user-current.md)
- [{#T}](./user-search.md)
- [{#T}](./user-fields.md)
- [{#T}](../../tutorials/crm/how-to-get-lists/how-to-get-elements-by-stage-filter.md)
- [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-send-email.md)
- [{#T}](../../tutorials/crm/how-to-get-lists/get-activity-list-by-deals.md)

[*ключ_Ключ для работы]: `'ADMIN_MODE': 'True'`