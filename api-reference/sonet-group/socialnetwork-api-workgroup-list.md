# Получить список рабочих групп socialnetwork.api.workgroup.list

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`socialnetwork`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `socialnetwork.api.workgroup.list` возвращает список рабочих групп, проектов, скрамов и коллаб с учетом прав текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`](../data-types.md) | Объект для фильтрации в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Смотрите ниже [список доступных полей для фильтрации](#filterable).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Если в `params` не передан `IS_ADMIN = Y`, метод автоматически добавляет проверку прав текущего пользователя `CHECK_PERMISSIONS`.

Метод также всегда добавляет фильтр по сайту: 

- для экстранет-пользователя берется экстранет-сайт
- для остальных — сайт из `params[siteId]` или текущий сайт портала ||
|| **select**
[`array`](../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать.

Смотрите ниже [список доступных полей для выборки](#selectable).

Если параметр не передан или пуст, выбирается только `ID` ||
|| **order**
[`object`](../data-types.md) | Объект сортировки в формате `{"field_1": "order_1", ..., "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям из [списка доступных полей для фильтрации](#filterable).

Возможные значения для `order`:

- `ASC` — сортировка по возрастанию
- `DESC` — сортировка по убыванию ||
|| **params**
[`object`](../data-types.md) | Дополнительные [параметры запроса](#params) ||
|| **start**
[`integer`](../data-types.md) | Параметр постраничной навигации.

Размер страницы результатов — 50 записей.

Чтобы получить вторую страницу, передайте `50`; третью — `100` и так далее.

Формула: `start = (N - 1) * 50`, где `N` — номер страницы.

Если передать `-1`, в ответе не будет поля `total` ||
|#

### Доступные поля для фильтрации {#filterable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор группы ||
|| **NAME**
[`string`](../data-types.md) | Название группы ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца ||
|| **ACTIVE**
[`string`](../data-types.md) | Признак активности группы: `Y` или `N` ||
|| **VISIBLE**
[`string`](../data-types.md) | Видимость группы в общем списке: `Y` или `N` ||
|| **OPENED**
[`string`](../data-types.md) | Открыта ли группа для свободного вступления: `Y` или `N` ||
|| **CLOSED**
[`string`](../data-types.md) | Находится ли группа в архиве: `Y` или `N` ||
|| **PROJECT**
[`string`](../data-types.md) | Тип объекта: `Y` — проект, `N` — группа ||
|| **SUBJECT_ID**
[`integer`](../data-types.md) | Идентификатор тематики группы ||
|| **SITE_ID**
[`string`](../data-types.md) | Идентификатор сайта группы ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания группы ||
|| **DATE_UPDATE**
[`datetime`](../data-types.md) | Дата изменения группы ||
|| **DATE_ACTIVITY**
[`datetime`](../data-types.md) | Дата последней активности ||
|#

### Доступные поля для выборки {#selectable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор группы ||
|| **ACTIVE**
[`string`](../data-types.md) | Признак активности группы ||
|| **SUBJECT_ID**
[`integer`](../data-types.md) | Идентификатор тематики группы ||
|| **NAME**
[`string`](../data-types.md) | Название группы ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание группы ||
|| **KEYWORDS**
[`string`](../data-types.md) | Ключевые слова группы ||
|| **CLOSED**
[`string`](../data-types.md) | Признак архивной группы ||
|| **VISIBLE**
[`string`](../data-types.md) | Признак видимости группы ||
|| **OPENED**
[`string`](../data-types.md) | Признак открытой группы ||
|| **PROJECT**
[`string`](../data-types.md) | Признак проекта ||
|| **LANDING**
[`string`](../data-types.md) | Признак группы для публикации ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
|| **DATE_UPDATE**
[`datetime`](../data-types.md) | Дата изменения ||
|| **DATE_ACTIVITY**
[`datetime`](../data-types.md) | Дата последней активности ||
|| **IMAGE_ID**
[`integer`](../data-types.md) | Идентификатор пользовательского аватара ||
|| **AVATAR_TYPE**
[`string`](../data-types.md) | Тип системного аватара ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца ||
|| **NUMBER_OF_MEMBERS**
[`integer`](../data-types.md) | Количество участников ||
|| **NUMBER_OF_MODERATORS**
[`integer`](../data-types.md) | Количество модераторов ||
|| **INITIATE_PERMS**
[`string`](../data-types.md) | Права на приглашение участников ||
|| **PROJECT_DATE_START**
[`datetime`](../data-types.md) | Дата начала проекта ||
|| **PROJECT_DATE_FINISH**
[`datetime`](../data-types.md) | Дата окончания проекта ||
|| **SCRUM_OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца скрама ||
|| **SCRUM_MASTER_ID**
[`integer`](../data-types.md) | Идентификатор скрам-мастера ||
|| **SCRUM_SPRINT_DURATION**
[`integer`](../data-types.md) | Длительность спринта в секундах ||
|| **SCRUM_TASK_RESPONSIBLE**
[`string`](../data-types.md) | Исполнитель по умолчанию в скраме ||
|| **TYPE**
[`string`](../data-types.md) | Тип группы: `group`, `project`, `scrum`, `collab` ||
|| **AVATAR**
[`string`](../data-types.md) | URL аватара ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **IS_ADMIN**
[`string`](../data-types.md) | Отключение проверки прав.

Возможные значения:
- `Y` — отключить проверку прав, если текущий пользователь администратор

Если передан `Y` не администратором, значение игнорируется ||
|| **siteId**
[`string`](../data-types.md) | Идентификатор сайта, который будет подставлен в автоматический фильтр `SITE_ID` для обычных пользователей.

Для экстранет-пользователей это значение игнорируется: метод всегда использует экстранет-сайт ||
|| **mode**
[`string`](../data-types.md) | Режим ответа.

Поддерживаемое значение:
- `mobile` — добавляет в каждый элемент списка поле `additionalData`

Поле `additionalData` имеет структуру:
  - `role` — роль текущего пользователя в группе
  - `initiatedByType` — кто инициировал связь пользователя с группой:
    - `U` — сам пользователь (например, отправил запрос на вступление)
    - `G` — группа (например, пользователю отправили приглашение)
  - `features` — список доступных инструментов группы (возвращается, если переданы `features`/`mandatoryFeatures`) ||
|| **features**
[`array`](../data-types.md) | Список кодов инструментов группы, которые нужно учитывать при формировании `additionalData` в режиме `mobile` ||
|| **mandatoryFeatures**
[`array`](../data-types.md) | Список кодов инструментов, которые всегда нужно включать в `additionalData` в режиме `mobile` ||
|| **shouldSelectDialogId**
[`string`](../data-types.md) | Добавлять ли в элемент списка поле с идентификатором чата `dialogId`.

Возможные значения:
- `Y` — добавить `dialogId`
- `N` — не добавлять `dialogId`
  
По умолчанию — `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ACTIVE":"Y","CLOSED":"N","%NAME":"группа"},"select":["ID","NAME","TYPE","AVATAR"],"order":{"ID":"DESC"},"params":{"mode":"mobile","shouldSelectDialogId":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/socialnetwork.api.workgroup.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ACTIVE":"Y","CLOSED":"N","%NAME":"группа"},"select":["ID","NAME","TYPE","AVATAR"],"order":{"ID":"DESC"},"params":{"mode":"mobile","shouldSelectDialogId":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/socialnetwork.api.workgroup.list
    ```

- JS

    ```js
    // callListMethod: Получает все данные сразу. Используйте только для небольших выборок (< 1000 элементов) из-за высокой нагрузки на память.
    try {
        const response = await $b24.callListMethod(
            'socialnetwork.api.workgroup.list',
            {
                filter: { ACTIVE: 'Y', CLOSED: 'N', '%NAME': 'группа' },
                select: ['ID', 'NAME', 'TYPE', 'AVATAR'],
                order: { ID: 'DESC' },
                params: { mode: 'mobile', shouldSelectDialogId: 'Y' }
            },
            (progress) => { console.log('Progress:', progress) }
        );

        const items = response.getData() || [];
        for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
        console.error('Request failed', error);
    }

    // fetchListMethod: Выбирает данные по частям с помощью итератора. Используйте для больших объемов данных для эффективного потребления памяти.
    try {
        const generator = $b24.fetchListMethod(
            'socialnetwork.api.workgroup.list',
            {
                filter: { ACTIVE: 'Y', CLOSED: 'N', '%NAME': 'группа' },
                select: ['ID', 'NAME', 'TYPE'],
                order: { ID: 'DESC' }
            },
            'ID'
        );
        for await (const page of generator) {
            for (const entity of page) { console.log('Entity:', entity) }
        }
    } catch (error) {
        console.error('Request failed', error);
    }

    // callMethod: Ручное управление постраничной навигацией через параметр start.
    try {
        const response = await $b24.callMethod(
            'socialnetwork.api.workgroup.list',
            {
                filter: { ACTIVE: 'Y', CLOSED: 'N', '%NAME': 'группа' },
                select: ['ID', 'NAME', 'TYPE'],
                order: { ID: 'DESC' }
            },
            0
        );
        const result = response.getData().result.workgroups || [];
        for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
        console.error('Request failed', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'socialnetwork.api.workgroup.list',
                [
                    'filter' => ['ACTIVE' => 'Y', 'CLOSED' => 'N', '%NAME' => 'группа'],
                    'select' => ['ID', 'NAME', 'TYPE', 'AVATAR'],
                    'order' => ['ID' => 'DESC'],
                    'params' => [
                        'mode' => 'mobile',
                        'shouldSelectDialogId' => 'Y',
                    ],
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'socialnetwork.api.workgroup.list',
        {
            filter: { ACTIVE: 'Y', CLOSED: 'N', '%NAME': 'группа' },
            select: ['ID', 'NAME', 'TYPE', 'AVATAR'],
            order: { ID: 'DESC' },
            params: { mode: 'mobile', shouldSelectDialogId: 'Y' }
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
        'socialnetwork.api.workgroup.list',
        [
            'filter' => ['ACTIVE' => 'Y', 'CLOSED' => 'N', '%NAME' => 'группа'],
            'select' => ['ID', 'NAME', 'TYPE', 'AVATAR'],
            'order' => ['ID' => 'DESC'],
            'params' => [
                'mode' => 'mobile',
                'shouldSelectDialogId' => 'Y',
            ],
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "workgroups": [
                {
            "id": "5",
            "name": "Открытая группа для всех",
            "type": "group",
            "imageId": "5",
            "avatarType": null,
            "avatar": "https://test.bitrix24.ru/b13743910/resize_cache/5/7acf4caaf5d8/socialnetwork/8d6/8d2c04ece929572/3.png",
            "additionalData": {
            "role": "",
            "initiatedByType": ""
            },
            "dialogId": ""
        },
        {
            "id": "1",
            "name": "Закрытая видимая группа",
            "type": "group",
            "imageId": "1",
            "avatarType": null,
            "avatar": "",
            "additionalData": {
            "role": "",
            "initiatedByType": ""
            },
            "dialogId": "chat177"
        }
        ]
    },
    "total": 2,
    "time": {
        "start": 1774357689,
        "finish": 1774357689.398272,
        "duration": 0.3982720375061035,
        "processing": 0,
        "date_start": "2026-03-24T16:08:09+03:00",
        "date_finish": "2026-03-24T16:08:09+03:00",
        "operating_reset_at": 1774358289,
        "operating": 0.12220001220703125
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой объект ответа ||
|| **workgroups**
[`object[]`](../data-types.md) | Список рабочих групп.

Состав объекта зависит от переданных полей в `select` и параметров `params`.

Если группы по фильтру не найдены, `workgroups` вернется пустым массивом ||
|| **next**
[`integer`](../data-types.md) | Смещение для следующей страницы. Поле возвращается, если есть еще записи ||
|| **total**
[`integer`](../data-types.md) | Общее число записей. Поле не возвращается, если запрос выполнен со `start = -1` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-create.md)
- [{#T}](./sonet-group-update.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./sonet-group-get.md)
- [{#T}](./sonet-group-delete.md)
