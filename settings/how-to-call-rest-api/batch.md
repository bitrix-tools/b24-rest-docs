# Как выполнить пакет запросов batch

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `batch` выполняет за одно обращение к серверу несколько запросов к REST API — независимых или связанных, когда результат одного запроса передается в следующий.

## Когда использовать batch

Метод подходит для двух задач:

- **несколько независимых вызовов за один запрос** — когда нужно выполнить группу методов, результаты которых не зависят друг от друга. Один пакет вместо нескольких отдельных обращений снижает количество запросов к серверу
- **связанные вызовы с передачей данных** — когда результат одного метода нужно подставить в параметры следующего. Запросы выполняются последовательно, поэтому данные предыдущего вызова доступны в последующих

Учитывайте ограничения:

- в один пакет входит не более 50 подзапросов
- вложенность запрещена: внутри `batch` нельзя вызывать другой `batch`

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **cmd***
[`array`](../../api-reference/data-types.md) | Массив подзапросов. Ключ элемента — идентификатор подзапроса, значение — вызываемый метод с параметрами в виде строки `метод?параметр=значение`. В SDK элемент можно задать объектом с полями `method` и `params` ||
|| **halt**
[`boolean`](../../api-reference/data-types.md) | Определяет, прерывать ли последовательность запросов в случае ошибки. Принимает булевы значения `true` и `false` или эквивалентные им числовые `1` и `0`. По умолчанию равен `false` ||
|#

Данные подзапросов кодируют по-разному в зависимости от способа передачи пакета. В теле POST-запроса в формате `JSON`, как в примерах ниже, значения `cmd` передают обычными строками без дополнительного кодирования. Если пакет передают в query-параметрах URL, данные подзапросов [url-кодируют](./data-encoding.md), и, поскольку весь пакет сам становится значением параметра, они проходят двойное кодирование.

{% note info %}

Количество запросов в пакете ограничено 50. При превышении подзапросы сверх лимита завершаются ошибкой `ERROR_BATCH_LENGTH_EXCEEDED`.

{% endnote %}

Массив запросов может быть с числовыми ключами или ассоциативным. В параметрах каждого последующего запроса можно использовать данные предыдущих запросов в таком виде:

```php

$result[идентификатор_запроса][поле_ответа]

```

где идентификатором запроса служит его ключ в массиве запросов.

С версии **rest 24.0.0** для метода `batch` запрещена вложенность: при вызове метода `batch` нельзя вызывать внутри другой `batch`. Такой подзапрос завершается ошибкой `ERROR_BATCH_METHOD_NOT_ALLOWED`.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

### Независимые вызовы

Пакет из нескольких разных методов, результаты которых не зависят друг от друга. Каждый подзапрос выполняется отдельно, данные между ними не передаются.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
            "halt": 0,
            "cmd": {
                "get_user": "user.current",
                "get_departments": "department.get",
                "get_app": "app.info"
            }
        }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/batch
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
            "halt": 0,
            "cmd": {
                "get_user": "user.current",
                "get_departments": "department.get",
                "get_app": "app.info"
            },
            "auth":"**put_access_token_here**"
        }' \
    https://**put_your_bitrix24_address**/rest/batch
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      // Named commands: each key becomes the identifier of its subrequest
      const response = await $b24.actions.v2.batch.make({
        calls: {
          get_user: { method: 'user.current', params: {} },
          get_departments: { method: 'department.get', params: {} },
          get_app: { method: 'app.info', params: {} }
        },
        options: {
          isHaltOnError: false, // analog of halt = 0: run every subrequest
          returnAjaxResult: true, // wrap each subrequest result in an AjaxResult
          requestId: Text.getUuidRfc4122()
        }
      })

      // isSuccess reflects the batch call as a whole
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        // getData() returns an object keyed by the command names above
        const result = response.getData()
        console.info(result.get_user.getData()?.result)
        console.info(result.get_departments.getData()?.result)
        console.info(result.get_app.getData()?.result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function runBatch() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // Named commands: each key becomes the identifier of its subrequest
          const response = await $b24.actions.v2.batch.make({
            calls: {
              get_user: { method: 'user.current', params: {} },
              get_departments: { method: 'department.get', params: {} },
              get_app: { method: 'app.info', params: {} }
            },
            options: {
              isHaltOnError: false, // analog of halt = 0: run every subrequest
              returnAjaxResult: true, // wrap each subrequest result in an AjaxResult
              requestId: B24Js.Text.getUuidRfc4122()
            }
          })

          // isSuccess reflects the batch call as a whole
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          // getData() returns an object keyed by the command names above
          const result = response.getData()
          console.info(result.get_user.getData()?.result)
          console.info(result.get_departments.getData()?.result)
          console.info(result.get_app.getData()?.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', runBatch)
    </script>
    ```

- BX24.js

    ```js
    BX24.callBatch({
        get_user: ['user.current', {}],
        get_departments: ['department.get', {}],
        get_app: ['app.info', {}]
    }, function(result) {

        console.log('get_user result: ', result.get_user.data());
        console.log('get_departments result: ', result.get_departments.data());
        console.log('get_app result: ', result.get_app.data());
    });
    ```

    Подробнее о [callBatch методе в статье BX24.JS SDK](../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-batch.md).

- PHP CRest

    ```php
    $result = \CRest::callBatch(
        // Commands
        [
            'get_user' => [
                'method' => 'user.current',
                'params' => []
            ],
            'get_departments' => [
                'method' => 'department.get',
                'params' => []
            ],
            'get_app' => [
                'method' => 'app.info',
                'params' => []
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

### Связанные вызовы

Подзапросы выполняются последовательно, поэтому результат предыдущего запроса можно подставить в параметры следующего через конструкцию `$result[идентификатор_запроса][поле_ответа]`. В примере ниже метод `department.get` получает идентификатор подразделения из результата `user.current`.

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/batch
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

- BX24.js

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

- PHP CRest

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

{% note info %}

Если промежуточный метод списочный, он возвращает массив записей, поэтому при обращении к результату указывайте индекс нужной записи. Например, в конструкции `$result[user_by_name][0][ID]` для метода `user.search` берется идентификатор первого найденного пользователя.

{% endnote %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": {
            "get_user": {
                "ID": "1",
                "ACTIVE": true,
                "NAME": "John",
                "LAST_NAME": "Doe",
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

## Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../api-reference/data-types.md) | Корневой объект ответа с результатами вызова переданных методов [(подробное описание)](#result) ||
|| **time**
[`time`](../../api-reference/data-types.md) | Информация о времени выполнения запроса в целом ||
|#

### Объект result {#result}

Ключами во всех полях объекта служат идентификаторы подзапросов из массива `cmd`.

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../api-reference/data-types.md) | Результаты успешно выполненных подзапросов. Значение каждого поля содержит данные, которые вернул соответствующий метод ||
|| **result_error**
[`object`](../../api-reference/data-types.md) | Ошибки подзапросов. Значение каждого поля содержит `error` — код ошибки и `error_description` — описание ошибки. Пустой, если ошибок нет ||
|| **result_total**
[`object`](../../api-reference/data-types.md) | Общее количество записей для списочных методов. Значение каждого поля — число найденных записей соответствующего подзапроса ||
|| **result_next**
[`object`](../../api-reference/data-types.md) | Значение параметра `start` для получения следующей страницы результатов списочных методов. Присутствует только для подзапросов, у которых есть следующая страница ||
|| **result_time**
[`time`](../../api-reference/data-types.md) | Информация о времени выполнения каждого подзапроса ||
|#

## Обработка ошибок

Метод `batch` не возвращает общую ошибку на весь пакет — сам запрос завершается со статусом **200**. Результат каждого подзапроса, завершившегося ошибкой, попадает в поле `result_error` под ключом этого подзапроса. Успешно выполненные подзапросы при этом остаются в поле `result`.

Поведение при ошибке зависит от параметра `halt`:

- `halt = 0` — выполняются все подзапросы пакета, ошибки собираются в `result_error` по каждому проблемному подзапросу
- `halt = 1` — выполнение цепочки прерывается на первом же подзапросе с ошибкой, последующие подзапросы не выполняются

{% list tabs %}

- Пример ошибки (halt = 0)

    ```json
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

    ```json
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

Каждый элемент поля `result_error` содержит информацию об ошибке подзапроса:

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `405` | `ERROR_BATCH_METHOD_NOT_ALLOWED` | Method is not allowed for batch usage | Метод нельзя вызывать внутри `batch`: это загрузка или скачивание файла либо вложенный `batch` ||
|| `400` | `ERROR_BATCH_LENGTH_EXCEEDED` | Max batch length exceeded | В пакет передано больше 50 подзапросов ||
|#

При проектировании цепочки команд не пренебрегайте ключом `halt` — при значении `1` он прервет выполнение цепочки, если один запрос из цепочки вернет ошибку.

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./data-encoding.md)
- [{#T}](./list-methods-pecularities.md)
- [{#T}](../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-batch.md)
