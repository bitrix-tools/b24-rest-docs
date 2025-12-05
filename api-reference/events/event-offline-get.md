# Получить список офлайн-событий с «очисткой» event.offline.get

> Кто может выполнять метод: любой пользователь

Метод `event.offline.get` возвращает приложению первые в очереди офлайн-события согласно установкам фильтра. Доступность офлайн-событий можно проверить через метод [feature.get](../common/system/feature-get.md).

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`array`](../data-types.md) | Фильтр записей.  По умолчанию отдаются все записи, без фильтрации. Поддерживается фильтрация по полям: `ID`, `TIMESTAMP_X`, `EVENT_NAME`, `MESSAGE_ID` со стандартными операциями типа `=`, `>`, `<`, `<=` и так далее.

Важно: тип операции ставится перед именем поля фильтрации ||
|| **order**
[`array`](../data-types.md) | Сортировка записей. Поддерживается сортировка по тем же полям, что и в фильтре, на вход принимается массив вида `[поле=>ASC\|DESC]`. По умолчанию — [TIMESTAMP_X:ASC] ||
|| **limit**
[`integer`](../data-types.md) | Количество выбираемых записей. По умолчанию 50 ||
|#

### Дополнительные параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **clear**
[`integer`](../data-types.md) |Значения: `0\|1` — удалять ли выбранные записи. По умолчанию `1` ||
|| **process_id**
[`string`](../data-types.md) | Идентификатор процесса. Используется, если понадобится повторно выбрать еще необработанные текущим процессом записи ||
|| **auth_connector**
[`string`](../data-types.md) | Ключ источника. Используется, если значение `auth_connector` было указано в методе [event.bind](./event-bind.md) ||
|| **error**
[`integer`](../data-types.md) | Значения: `0\|1` — возвращать ли ошибочные записи. По умолчанию `0` ||
|#

{% note info %}

Метод поддерживает многопоточный разбор. То есть допускается несколько параллельных запросов к /rest/event.offline.get (с соблюдением ограничений на количество запросов в единицу времени), и каждый из них получит разные наборы записей.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"=MESSAGE_ID":1,"=EVENT_NAME":"ONCRMLEADADD",">=ID":1},"auth_connector":"BxTest","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/event.offline.get
    ```

- JS


    ```js
    try
    {
        const response = await $b24.callMethod(
            'event.offline.get',
            {
                filter: {
                    '=MESSAGE_ID': 1,
                    '=EVENT_NAME': 'ONCRMLEADADD',
                    '>=ID': 1
                },
                auth_connector: 'BxTest'
            }
        );
        
        const result = response.getData().result;
        console.log('Result:', result);
        processResult(result);
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
                'event.offline.get',
                [
                    'filter' => [
                        '=MESSAGE_ID' => 1,
                        '=EVENT_NAME' => 'ONCRMLEADADD',
                        '>=ID' => 1
                    ],
                    'auth_connector' => 'BxTest'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "event.offline.get",
        {
            "filter": {
                "=MESSAGE_ID": 1,
                "=EVENT_NAME": "ONCRMLEADADD",
                ">=ID": 1
            }
            "auth_connector": "BxTest"
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
        'event.offline.get',
        [
            'filter' => [
                '=MESSAGE_ID' => 1,
                '=EVENT_NAME' => 'ONCRMLEADADD',
                '>=ID' => 1
            ],
            'auth_connector' => 'BxTest'
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
    "result": {
        "process_id": null,
        "events": [
            {
                "ID": "1",
                "TIMESTAMP_X": "2024-07-18T12:32:31+02:00",
                "EVENT_NAME": "ONCRMLEADADD",
                "EVENT_DATA": false,
                "EVENT_ADDITIONAL": false,
                "MESSAGE_ID": "1"
            }
        ]
    },
    "time": {
        "start": 1721299720.388504,
        "finish": 1721299720.509809,
        "duration": 0.12130498886108398,
        "processing": 0.008239030838012695,
        "date_start": "2024-07-18T12:48:40+02:00",
        "date_finish": "2024-07-18T12:48:40+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./events.md)
- [{#T}](./event-bind.md)
- [{#T}](./event-get.md)
- [{#T}](./event-unbind.md)
- [{#T}](./safe-event-handlers.md)
- [{#T}](./offline-events.md)
- [{#T}](./event-offline-list.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)