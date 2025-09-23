# Получить список офлайн-событий event.offline.list

> Кто может выполнять метод: любой пользователь

Метод `event.offline.list` для чтения текущей очереди без внесения изменений в ее состояние в отличие от [event.offline.get](./event-offline-get.md). Доступность офлайн-событий можно проверить через метод [feature.get](../common/system/feature-get.md).

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`array`](../data-types.md) | Фильтр записей. По умолчанию отдаются все записи, без фильтрации. Поддерживается фильтрация по полям: `ID`, `TIMESTAMP_X`, `EVENT_NAME`, `MESSAGE_ID`. `PROCESS_ID`, `ERROR` со стандартными операциями типа `=`, `>`, `<`, `<=` и так далее ||
|| **order**
[`array`](../data-types.md) | Сортировка записей. Поддерживается сортировка по тем же полям, что и в фильтре, на вход принимается массив вида `[поле=>ASC\|DESC]`. По умолчанию — `[ID:ASC]` ||
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

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "filter": {
            "ERROR": 0
        },
        "order": {
            "ID": "DESC"
        },
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/event.offline.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'event.offline.list',
        {
          "filter": {
            "ERROR": 0
          },
          "order": {
            "ID": "DESC"
          }
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
      const generator = $b24.fetchListMethod('event.offline.list', { "filter": { "ERROR": 0 }, "order": { "ID": "DESC" } }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('event.offline.list', { "filter": { "ERROR": 0 }, "order": { "ID": "DESC" } }, 0)
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
                'event.offline.list',
                [
                    'filter' => [
                        'ERROR' => 0,
                    ],
                    'order' => [
                        'ID' => 'DESC',
                    ],
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
        echo 'Error fetching offline events: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "event.offline.list",
        {
            "filter": {
                "ERROR": 0
            },
            "order": {
                "ID": "DESC"
            }
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
        'event.offline.list',
        [
            'filter' => [
                'ERROR' => 0
            ],
            'order' => [
                'ID' => 'DESC'
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
            "ID": "2",
            "TIMESTAMP_X": "2024-07-18T12:32:31+02:00",
            "EVENT_NAME": "ONCRMCOMPANYADD",
            "EVENT_DATA": false,
            "EVENT_ADDITIONAL": false,
            "MESSAGE_ID": "2",
            "PROCESS_ID": "",
            "ERROR": "0"
        },
        {
            "ID": "1",
            "TIMESTAMP_X": "2024-07-18T12:32:31+02:00",
            "EVENT_NAME": "ONCRMLEADADD",
            "EVENT_DATA": false,
            "EVENT_ADDITIONAL": false,
            "MESSAGE_ID": "1",
            "PROCESS_ID": "",
            "ERROR": "0"
        }
    ],
    "total": 2,
    "time": {
        "start": 1721299537.90267,
        "finish": 1721299538.02201,
        "duration": 0.11934018135070801,
        "processing": 0.0029511451721191406,
        "date_start": "2024-07-18T12:45:37+02:00",
        "date_finish": "2024-07-18T12:45:38+02:00",
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
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
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
- [{#T}](./event-offline-get.md)
- [{#T}](./event-offline-clear.md)
- [{#T}](./event-offline-error.md)
- [{#T}](./on-offline-event.md)