# Получить список групп и проектов sonet_group.get

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `sonet_group.get` возвращает список рабочих групп и проектов с учетом прав текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ORDER**
[`object`](../data-types.md) | Направление сортировки.

Возможные значения:
- `ASC` — сортировка по возрастанию
- `DESC` — сортировка по убыванию

По умолчанию — `ID:'DESC'` ||
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

По умолчанию — без фильтрации ||
|| **GROUP_ID**
[`integer`](../data-types.md) | Вернуть группу или проект по идентификатору.

Если параметр передан, метод добавляет в фильтр условие `ID = GROUP_ID` ||
|| **IS_ADMIN**
[`string`](../data-types.md) | Отключение проверки прав.

Возможные значения:
- `Y` — отключить проверку прав, если текущий пользователь администратор

Если передан `Y` не администратором, значение игнорируется.

По умолчанию — проверка прав включена ||
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
[`integer`](../data-types.md) | Идентификатор группы или проекта ||
|| **NAME**
[`string`](../data-types.md) | Название группы или проекта ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца ||
|| **ACTIVE**
[`string`](../data-types.md) | Признак активности группы.

Возможные значения:
- `Y` — группа активна
- `N` — группа деактивирована ||
|| **VISIBLE**
[`string`](../data-types.md) | Видимость группы в списке.

Возможные значения:
- `Y` — группа видна в общем списке
- `N` — группа скрыта из общего списка ||
|| **OPENED**
[`string`](../data-types.md) | Открыта ли группа для свободного вступления.

Возможные значения:
- `Y` — пользователь может вступить в группу без подтверждения
- `N` — вступление по приглашению или запросу ||
|| **CLOSED**
[`string`](../data-types.md) | Архивная ли группа.

Возможные значения:
- `Y` — группа в архиве
- `N` — активная группа ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания группы в формате ISO-8601 ||
|| **DATE_UPDATE**
[`datetime`](../data-types.md) | Дата изменения группы в формате ISO-8601 ||
|| **DATE_ACTIVITY**
[`datetime`](../data-types.md) | Дата последней активности в группе в формате ISO-8601 ||
|| **IS_EXTRANET**
[`string`](../data-types.md) | Фильтр по типу сайта группы.

Возможные значения:
- `Y` — экстранет-группы
- `N` — не экстранет-группы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ORDER":{"NAME":"ASC"},"FILTER":{"%NAME":"Про"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ORDER":{"NAME":"ASC"},"FILTER":{"%NAME":"Про"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'sonet_group.get',
            {
                ORDER: { NAME: 'ASC' },
                FILTER: { '%NAME': 'Про' }
            }
        );
        
        const result = response.getData().result;
        console.log('Retrieved groups:', result);
        
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
                'sonet_group.get',
                [
                    'ORDER' => ['NAME' => 'ASC'],
                    'FILTER' => ['%NAME' => 'Про']
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving groups: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.get', {
        ORDER: { NAME: 'ASC' },
        FILTER: { '%NAME': 'Про' }
    }, function(result) {
        if (result.error())
        {
            console.error(result.error(), result.error_description());
        }
        else
        {
            console.log(result.data());
        }
    });
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sonet_group.get',
        [
            'ORDER' => ['NAME' => 'ASC'],
            'FILTER' => ['%NAME' => 'Про']
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
        "ID": "77",
        "SITE_ID": "s1",
        "NAME": "Новый заголовок проекта",
        "DESCRIPTION": null,
        "DATE_CREATE": "2026-03-19T15:01:27+03:00",
        "DATE_UPDATE": "2026-03-19T15:01:27+03:00",
        "ACTIVE": "Y",
        "VISIBLE": "Y",
        "OPENED": "N",
        "CLOSED": "N",
        "SUBJECT_ID": "1",
        "OWNER_ID": "1271",
        "KEYWORDS": null,
        "NUMBER_OF_MEMBERS": "12",
        "DATE_ACTIVITY": "2026-03-19T15:01:27+03:00",
        "SUBJECT_NAME": "Рабочие группы",
        "PROJECT": "Y",
        "IS_EXTRANET": "N"
        },
        {
        "ID": "79",
        "SITE_ID": "s1",
        "NAME": "Скрам-проект",
        "DESCRIPTION": null,
        "DATE_CREATE": "2026-03-19T15:15:06+03:00",
        "DATE_UPDATE": "2026-03-19T15:15:06+03:00",
        "ACTIVE": "Y",
        "VISIBLE": "Y",
        "OPENED": "N",
        "CLOSED": "N",
        "SUBJECT_ID": "1",
        "OWNER_ID": "1269",
        "KEYWORDS": null,
        "NUMBER_OF_MEMBERS": "8",
        "DATE_ACTIVITY": "2026-03-19T15:15:06+03:00",
        "SUBJECT_NAME": "Рабочие группы",
        "PROJECT": "Y",
        "IS_EXTRANET": "N"
        }
    ],
    "total": 2,
    "time": {
        "start": 1773925430,
        "finish": 1773925430.419962,
        "duration": 0.41996192932128906,
        "processing": 0,
        "date_start": "2026-03-19T16:03:50+03:00",
        "date_finish": "2026-03-19T16:03:50+03:00",
        "operating_reset_at": 1773926030,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Массив групп и проектов, соответствующих условиям `FILTER`.

Пустой массив означает, что подходящие записи с учетом прав доступа текущего пользователя отсутствуют ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор группы ||
|| **SITE_ID**
[`string`](../data-types.md) | Идентификатор сайта группы ||
|| **NAME**
[`string`](../data-types.md) | Название группы ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание группы ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания группы в формате ISO-8601 ||
|| **DATE_UPDATE**
[`datetime`](../data-types.md) | Дата изменения группы в формате ISO-8601 ||
|| **DATE_ACTIVITY**
[`datetime`](../data-types.md) | Дата последней активности в формате ISO-8601 ||
|| **ACTIVE**
[`string`](../data-types.md) | Признак активности ||
|| **VISIBLE**
[`string`](../data-types.md) | Видимость группы ||
|| **OPENED**
[`string`](../data-types.md) | Открыта ли группа ||
|| **CLOSED**
[`string`](../data-types.md) | Архивная ли группа ||
|| **SUBJECT_ID**
[`integer`](../data-types.md) | Идентификатор тематики группы ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца ||
|| **KEYWORDS**
[`string`](../data-types.md) | Ключевые слова группы ||
|| **NUMBER_OF_MEMBERS**
[`integer`](../data-types.md) | Количество участников ||
|| **SUBJECT_NAME**
[`string`](../data-types.md) | Название тематики группы ||
|| **IMAGE**
[`string`](../data-types.md) | URL аватара группы ||
|| **IS_EXTRANET**
[`string`](../data-types.md) | Признак экстранет-группы ||
|| **total**
[`integer`](../data-types.md) | Общее количество элементов в выборке ||
|| **next**
[`integer`](../data-types.md) | Смещение следующей страницы (если есть) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./socialnetwork-api-workgroup-list.md)
- [{#T}](./sonet-group-user-groups.md)
- [{#T}](./sonet-group-feature-access.md)
- [{#T}](./sonet-group-delete.md)
