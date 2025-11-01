# Как выполнить пакет запросов batch

> Кто может выполнять метод: любой пользователь

Метод используется для отправки нескольких запросов подряд, а также связанных запросов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **halt**
[`boolean`](../../api-reference/data-types.md) | Определяет прерывать ли последовательность запросов в случае ошибки. По умолчанию равен `false` ||
|| **cmd**
[`array`](../../api-reference/data-types.md) | Массив запросов стандартного вида (следует помнить про [url-кодирование](./data-encoding.md) данных запросов; получается, что данные для подзапросов должны пройти двойное кодирование) ||
|#

{% note info %}

Количество запросов в пакете ограничено 50.

{% endnote %}

Массив запросов может быть как с числовыми ключами, так и ассоциативным. В параметрах каждого последующего запроса можно использовать данные предыдущих запросов в таком виде:

```php

$result[идентификатор_запроса][поле_ответа]

```

где идентификатором запроса служит его ключ в массиве запросов.

С версии **rest 24.0.0** для метода `batch` запрещена вложенность (при вызове метода `batch` нельзя вызывать внутри другой `batch`).

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
            "halt": 0,
            "cmd": {
                "get_user": "user.current",
                "get_department": "department.get?ID=$result[get_user][UF_DEPARTMENT][0]"
            }
        }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/batch
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
            "halt": 0,
            "cmd": {
                "get_user": "user.current",
                "get_department": "department.get?ID=$result[get_user][UF_DEPARTMENT][0]"
            },
            "auth":"**put_access_token_here**"
        }' \
    https://**put_your_bitrix24_address**/rest/batch
    ```

- HTTP (OAuth)

    ```bash
    https://**put_your_bitrix24_address**/rest/batch?auth=d161f25928c3184678924ec127edd29a&halt=0&cmd[get_user]=user.current%3F&cmd[get_department]=department.get%3FID%3D%2524result%255Bget_user%255D%255BUF_DEPARTMENT%255D
    ```

    {% note info %}
    
    **Обратите внимание**, что параметры URL-кодированы. Рекомендация кодировать параметры — обязательна, в противном случае корректность результата не гарантируется.
    
    {% endnote %}


- JS

    ```js
    BX24.callBatch({
        get_user: ['user.current', {}],
        get_department: {
            method: 'department.get',
            params: {
                ID: '$result[get_user][UF_DEPARTMENT][0]'
            }
        }
    }, function(result) {
    
        console.log('Raw result: ', result);
        console.log('get_user result: ', result.get_user.data());
        console.log('get_department result: ', result.get_department.data());
    });
    ```

    Подробнее о [callBatch методе в статье BX24.JS SDK](../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-batch.md).

- PHP

    ```php
    $result = \CRest::callBatch(
        // Commands
        [
            'get_user' => [
                'method' => 'user.current',
                'params' => []
            ],
            'get_department' => [
                'method' => 'department.get',
                'params' => [
                    "ID" => '$result[get_user][UF_DEPARTMENT][0]'
                ]
            ],
        ],
        // Halt
        false
    );

    echo "<pre>";
    var_dump($result);
    echo "</pre>";
    ```

{% endlist %}

## Обработка ответа

{% list tabs %}

- Успешный результат
    ```js
    {
        "result": {
            "result": {
                "get_user": {
                    "ID": "1",
                    "ACTIVE": true,
                    "NAME": "John",
                    "LAST_NAME": "Dou",
                    "EMAIL": "my@example.com",
                    "LAST_LOGIN": "2024-08-29T10:29:54+03:00",
                    "DATE_REGISTER": "2023-08-24T03:00:00+03:00",
                    "IS_ONLINE": "Y",
                    "TIMESTAMP_X": "24.08.2023 13:19:39",
                    "LAST_ACTIVITY_DATE": "2024-08-29 10:30:11",
                    "PERSONAL_GENDER": "",
                    "PERSONAL_BIRTHDAY": "",
                    "UF_EMPLOYMENT_DATE": "",
                    "UF_DEPARTMENT": [
                        1
                    ]
                },
                "get_department": [
                    {
                        "ID": "1",
                        "NAME": "DEMO",
                        "SORT": 500
                    }
                ]
            },
            "result_error": [],
            "result_total": {
                "get_department": 1
            },
            "result_next": [],
            "result_time": {
                "get_user": {
                    "start": 1724916859.46156,
                    "finish": 1724916859.464775,
                    "duration": 0.0032150745391845703,
                    "processing": 0.003075838088989258,
                    "date_start": "2024-08-29T10:34:19+03:00",
                    "date_finish": "2024-08-29T10:34:19+03:00"
                },
                "get_department": {
                    "start": 1724916859.464944,
                    "finish": 1724916859.471518,
                    "duration": 0.006574153900146484,
                    "processing": 0.005941152572631836,
                    "date_start": "2024-08-29T10:34:19+03:00",
                    "date_finish": "2024-08-29T10:34:19+03:00"
                }
            }
        },
        "time": {
            "start": 1724916859.421475,
            "finish": 1724916859.471588,
            "duration": 0.05011296272277832,
            "processing": 0.010200977325439453,
            "date_start": "2024-08-29T10:34:19+03:00",
            "date_finish": "2024-08-29T10:34:19+03:00"
        }
    }
    ```

- Пример ошибки (halt = 0)
    ```js
    {
        "result": {
            "result": [],
            "result_error": {
                "get_user": {
                    "error": "insufficient_scope",
                    "error_description": ""
                },
                "get_department": {
                    "error": "insufficient_scope",
                    "error_description": ""
                }
            },
            "result_total": [],
            "result_next": [],
            "result_time": []
        },
        "time": {
            "start": 1724916638.077564,
            "finish": 1724916638.132399,
            "duration": 0.05483508110046387,
            "processing": 0.0017969608306884766,
            "date_start": "2024-08-29T10:30:38+03:00",
            "date_finish": "2024-08-29T10:30:38+03:00"
        }
    }
    ```

- Пример ошибки (halt = 1)
    ```js
    {
        "result": {
            "result": [],
            "result_error": {
                "get_user": {
                    "error": "insufficient_scope",
                    "error_description": ""
                }
            },
            "result_total": [],
            "result_next": [],
            "result_time": []
        },
        "time": {
            "start": 1724916725.460891,
            "finish": 1724916725.851307,
            "duration": 0.39041590690612793,
            "processing": 0.0005991458892822266,
            "date_start": "2024-08-29T10:32:05+03:00",
            "date_finish": "2024-08-29T10:32:05+03:00"
        }
    }
    ```

{% endlist %}

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../api-reference/data-types.md) | Возвращается объект с полями в виде объектов с результатами вызова переданных методов ||
|| **time**
[`time`](../../api-reference/data-types.md) | Информация о времени выполнения запроса ||
|#

## Использование результатов

Запросы, выполняемые методом batch, обрабатываются последовательно и могут использовать данные полученные предыдущими запросами.

Так, например одно выполнение batch метода может совершить цепочку действий:

```js

BX24.callMethod(
    'batch',
    {
        'halt': 1,
        'cmd': {
            'user_by_name': 'user.search?NAME=Test2',
            'user_lead': 'crm.lead.add?fields[TITLE]=Test Assigned&fields[ASSIGNED_BY_ID]=$result[user_by_name][0][ID]'
        }
    },
    function(result)
    {
        console.log(result.answer);
    }
);

```

В результате:

- `user_by_name` — найдет пользователя с именем `Test2`
- `user_lead` — создаст лид с ответственным пользователем, найденным в `user_by_name`

{% note info %}

**Обратите внимание**, что в запросе `user_lead` мы используем вложенность `[0][ID]`. Поскольку метод `user.search` является списочным то он может вернуть нам до 50 результатов и в данном случае мы возьмем идентификатор первого вернувшегося пользователя.

{% endnote %}


{% note warning %}

При проектировании цепочки команд не пренебрегайте ключом `halt` — при включении он прервет выполнение цепочки, если один запрос из цепочки вернет ошибку.

{% endnote %}
