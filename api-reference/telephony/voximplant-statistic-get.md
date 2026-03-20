# Получить список истории звонков voximplant.statistic.get

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Статистика звонков — Просмотр

Метод `voximplant.statistic.get` возвращает список звонков из статистики телефонии.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FILTER**
[`object`](../data-types.md) | Объект для фильтрации в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Смотрите ниже [список доступных полей для фильтрации](#filterable).

Поддерживаемые операторы в ключе фильтра:
- `!` — не равно
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `><` — между (диапазон, включительно)
- `!><` — не между (вне диапазона)
- `?` — поиск по строке
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `%` — LIKE, поиск по подстроке
- `!%` — NOT LIKE, поиск по подстроке

По умолчанию — без фильтрации
||
|| **SORT**
[`string`](../data-types.md) | Поле сортировки.

Используются те же поля, что и в [списке полей для фильтрации](#filterable), кроме `CALL_TYPE`.

По умолчанию — без сортировки ||
|| **ORDER**
[`string`](../data-types.md) | Направление сортировки.

Возможные значения:
- `ASC` — сортировка по возрастанию
- `DESC` — сортировка по убыванию

По умолчанию — без сортировки ||
|| **start**
[`integer`](../data-types.md) | Параметр постраничной навигации.

Размер страницы результатов — 50 записей.

Чтобы получить вторую страницу, передайте `50`; третью — `100` и так далее.

Формула:

`start = (N - 1) * 50`, где `N` — номер страницы ||
|#

### Доступные поля для фильтрации {#filterable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Внутренний идентификатор записи статистики ||
|| **CALL_ID**
[`string`](../data-types.md) | Идентификатор звонка ||
|| **EXTERNAL_CALL_ID**
[`string`](../data-types.md) | Идентификатор звонка на стороне внешней АТС/интеграции ||
|| **CALL_CATEGORY**
[`string`](../data-types.md) | Категория звонка ||
|| **PORTAL_USER_ID**
[`integer`](../data-types.md) | Идентификатор пользователя.

Идентификатор можно получить методом [user.get](../user/user-get.md) ||
|| **PORTAL_NUMBER**
[`string`](../data-types.md) | Номер линии, через который шел звонок ||
|| **PHONE_NUMBER**
[`string`](../data-types.md) | Номер абонента ||
|| **CALL_TYPE**
[`integer`](../data-types.md) | Тип звонка.

Возможные значения:
- `1` — исходящий
- `2` — входящий
- `3` — входящий с перенаправлением
- `4` — обратный звонок
- `5` — информационный звонок ||
|| **CALL_DURATION**
[`integer`](../data-types.md) | Длительность звонка в секундах ||
|| **CALL_START_DATE**
[`datetime`](../data-types.md) | Дата и время начала звонка в формате ISO-8601 с указанием часового пояса ||
|| **CALL_LOG**
[`string`](../data-types.md) | URL лога звонка ||
|| **CALL_RECORD_URL**
[`string`](../data-types.md) | URL записи звонка ||
|| **CALL_VOTE**
[`integer`](../data-types.md) | Оценка звонка.

Возможные значения:
- `1`, `2`, `3`, `4`, `5`

Если оценка отсутствует — `0` или `null` ||
|| **COST**
[`double`](../data-types.md) | Стоимость звонка ||
|| **COST_CURRENCY**
[`string`](../data-types.md) | Валюта стоимости звонка ||
|| **CALL_FAILED_CODE**
[`string`](../data-types.md) | Код результата звонка.

Возможные значения:
- `200` — успешный звонок
- `304` — пропущенный звонок
- `603` — отклонено
- `603-S` — вызов отменен
- `403` — запрещено
- `404` — неверный номер
- `486` — занято
- `484` — направление недоступно
- `503` — направление недоступно
- `480` — временно недоступен
- `402` — недостаточно средств
- `423` — заблокировано
- `OTHER` — не определено ||
|| **CALL_FAILED_REASON**
[`string`](../data-types.md) | Текст причины/результата звонка ||
|| **CRM_ENTITY_TYPE**
[`string`](../data-types.md) | Тип объекта CRM.

Возможные значения:
- `CONTACT` — контакт
- `COMPANY` — компания
- `LEAD` — лид  ||
|| **CRM_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор объекта CRM из `CRM_ENTITY_TYPE` ||
|| **CRM_ACTIVITY_ID**
[`integer`](../data-types.md) | Идентификатор CRM-дела звонка ||
|| **REST_APP_ID**
[`integer`](../data-types.md) | Идентификатор приложения ||
|| **REST_APP_NAME**
[`string`](../data-types.md) | Название приложения ||
|| **TRANSCRIPT_ID**
[`integer`](../data-types.md) | Идентификатор расшифровки звонка ||
|| **TRANSCRIPT_PENDING**
[`string`](../data-types.md) | Признак ожидания расшифровки.

Возможные значения:
- `Y` — расшифровка ожидается
- `N` — расшифровка доступна или отсутствует ||
|| **SESSION_ID**
[`integer`](../data-types.md) | Идентификатор сессии на стороне телефонии ||
|| **REDIAL_ATTEMPT**
[`integer`](../data-types.md) | Номер попытки дозвона (для callback-сценариев) ||
|| **COMMENT**
[`string`](../data-types.md) | Комментарий к звонку ||
|| **RECORD_DURATION**
[`integer`](../data-types.md) | Длительность файла записи звонка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"ID":[1,7],">=CALL_START_DATE":"2025-01-01T00:00:00+03:00"},"SORT":"ID","ORDER":"ASC"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.statistic.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"ID":[1,7],">=CALL_START_DATE":"2025-01-01T00:00:00+03:00"},"SORT":"ID","ORDER":"ASC","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.statistic.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'voximplant.statistic.get',
            {
                FILTER: {
                    ID: [1, 7],
                    '>=CALL_START_DATE': '2025-01-01T00:00:00+03:00'
                },
                SORT: 'ID',
                ORDER: 'ASC'
            }
        );
        
        const result = response.getData().result;
        console.log('Statistics:', result);
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
                'voximplant.statistic.get',
                [
                    'FILTER' => [
                        'ID' => [1, 7],
                        '>=CALL_START_DATE' => '2025-01-01T00:00:00+03:00'
                    ],
                    'SORT' => 'ID',
                    'ORDER' => 'ASC'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching statistics: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "voximplant.statistic.get",
        {
            FILTER: {
                ID: [1, 7],
                '>=CALL_START_DATE': '2025-01-01T00:00:00+03:00'
            },
            SORT: 'ID',
            ORDER: 'ASC'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'voximplant.statistic.get',
        [
            'FILTER' => [
                'ID' => [1, 7],
                '>=CALL_START_DATE' => '2025-01-01T00:00:00+03:00'
            ],
            'SORT' => 'ID',
            'ORDER' => 'ASC'
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
        "PORTAL_USER_ID": "1",
        "PORTAL_NUMBER": "reg133788",
        "PHONE_NUMBER": "+79638835976",
        "CALL_ID": "11018129443EB80D.1754478570.11438214",
        "EXTERNAL_CALL_ID": null,
        "CALL_CATEGORY": "external",
        "CALL_LOG": "https://storage-gw-ru-02.voximplant.com/voximplant-logs/2025/08/06/YTdjNmMxYWMyNzNmZDA2NTAwZTlkODYzMWExODN06ODM0MkU1MjY2OEIxMkMuMTc1NDQ3ODUyMC4xMTQzODIxNV8xODUuMTY0LjE0OC4xMzIubG9n?sessionid=3841557776",
        "CALL_DURATION": "0",
        "CALL_START_DATE": "2025-08-06T14:08:40+03:00",
        "CALL_RECORD_URL": "",
        "CALL_VOTE": null,
        "COST": "0.0000",
        "COST_CURRENCY": "RUR",
        "CALL_FAILED_CODE": "603-S",
        "CALL_FAILED_REASON": "Decline self",
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": "275",
        "CRM_ACTIVITY_ID": "7739",
        "REST_APP_ID": null,
        "REST_APP_NAME": null,
        "TRANSCRIPT_ID": null,
        "TRANSCRIPT_PENDING": "N",
        "SESSION_ID": "3841557776",
        "REDIAL_ATTEMPT": null,
        "COMMENT": null,
        "RECORD_DURATION": null,
        "RECORD_FILE_ID": null,
        "CALL_TYPE": "1"
        },
        {
        "ID": "7",
        "PORTAL_USER_ID": "1269",
        "PORTAL_NUMBER": "3",
        "PHONE_NUMBER": "79062195047",
        "CALL_ID": "externalCall.716f1cb73def9700a23842adf9c4c568.1773130779",
        "EXTERNAL_CALL_ID": null,
        "CALL_CATEGORY": "external",
        "CALL_LOG": null,
        "CALL_DURATION": "95",
        "CALL_START_DATE": "2026-03-10T11:19:38+03:00",
        "CALL_RECORD_URL": null,
        "CALL_VOTE": "5",
        "COST": "0.0000",
        "COST_CURRENCY": "",
        "CALL_FAILED_CODE": "200",
        "CALL_FAILED_REASON": "",
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": "797",
        "CRM_ACTIVITY_ID": "7943",
        "REST_APP_ID": "3",
        "REST_APP_NAME": "Документация по REST API",
        "TRANSCRIPT_ID": "1",
        "TRANSCRIPT_PENDING": "N",
        "SESSION_ID": null,
        "REDIAL_ATTEMPT": null,
        "COMMENT": null,
        "RECORD_DURATION": null,
        "RECORD_FILE_ID": 9079,
        "CALL_TYPE": "2"
        }
    ],
    "total": 2,
    "time": {
        "start": 1773141841,
        "finish": 1773141841.595178,
        "duration": 0.5951778888702393,
        "processing": 0,
        "date_start": "2026-03-10T14:24:01+03:00",
        "date_finish": "2026-03-10T14:24:01+03:00",
        "operating_reset_at": 1773142441,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив записей статистики. Состав записей зависит от условий `FILTER`.

Пустой массив означает, что нет записей, соответствующих условиям `FILTER` ||
|| **total**
[`integer`](../data-types.md) | Общее количество записей в выборке ||
|| **next**
[`integer`](../data-types.md) | Смещение следующей страницы (если есть) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав на просмотр статистики звонков ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-call-register.md)
- [{#T}](./telephony-external-call-finish.md)
- [{#T}](./telephony-external-call-attach-record.md)
- [{#T}](./telephony-call-attach-transcription.md)
