# Получить список лог-записей таймлана crm.timeline.logmessage.list

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `пользователь с правом на чтение элемента CRM, в котором находится запись`

Метод получает список лог-записей таймлайна.

{% note info "" %}

Важно иметь в виду, что метод сможет получить данные только о записях, ранее добавленных с помощью [`crm.timeline.logmessage.add`](./crm-timeline-logmessage-add.md). Системные записи с помощью `crm.timeline.logmessage.list` получить невозможно.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`](../../../data-types.md) | [Идентификатор типа сущности](../../data-types.md#object_type), для которой нужно получить список лог-записей (например, `1` — лид) ||
|| **entityId***
[`integer`](../../../data-types.md) | Идентификатор элемента сущности, для которого нужно получить список лог-записей (например, `1`) ||
|| **order**
[`object`](../../../data-types.md) | Список для сортировки, где ключ — поле, а значение — `asc` или `desc`.

По умолчанию используется `desc`.

Сортировка поддерживается только по полям **id** и **created** ||
|| **start**
[`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 10 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `10`. Чтобы выбрать третью страницу результатов — значение `20` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 10`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"entityId":1,"order":{"created":"desc"},"start":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.timeline.logmessage.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":1,"entityId":1,"order":{"created":"desc"},"start":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.logmessage.list
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'crm.timeline.logmessage.list',
        {
          entityTypeId: 1,
          entityId: 1,
          order: { created: "desc" },
          start: 1,
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
      const generator = $b24.fetchListMethod('crm.timeline.logmessage.list', { entityTypeId: 1, entityId: 1, order: { created: "desc" }, start: 1 }, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('crm.timeline.logmessage.list', { entityTypeId: 1, entityId: 1, order: { created: "desc" }, start: 1 }, 0)
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
                'crm.timeline.logmessage.list',
                [
                    'entityTypeId' => 1,
                    'entityId'     => 1,
                    'order'        => ['created' => 'desc'],
                    'start'        => 1,
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
        echo 'Error listing log messages: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.logmessage.list",
        {
            entityTypeId: 1,
            entityId: 1,
            order: { created: "desc" },
            start: 1,
        },
        result => {
            if (result.error())
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
        'crm.timeline.logmessage.list',
        [
            'entityTypeId' => 1,
            'entityId' => 1,
            'order' => ['created' => 'desc'],
            'start' => 1
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
            "id": 42074,
            "created": "2024-04-03T10:26:32+02:00",
            "authorId": 1,
            "title": "Test title new",
            "text": "Test note new",
            "iconCode": "info"
        },
        {
            "id": 42073,
            "created": "2024-04-03T10:26:32+02:00",
            "authorId": 1,
            "title": "Test title",
            "text": "Test note",
            "iconCode": "info"
        }
    ],
    "total": 2,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md) | Корневой элемент ответа.

Поле `result` содержит массив, каждая запись которого содержит ассоциативный массив полей лог-записи [logMessage](./crm-timeline-logmessage-add.md#logMessage) ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {entityTypeId}"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-timeline-logmessage-add.md)
- [{#T}](./crm-timeline-logmessage-get.md)
- [{#T}](./crm-timeline-logmessage-delete.md)
