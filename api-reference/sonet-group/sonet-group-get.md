# Получить список групп и проектов sonet_group.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each SonetGroup returned in result[]
    type SonetGroup = {
      ID: string
      SITE_ID: string
      NAME: string
      DESCRIPTION: string | null
      DATE_CREATE: ISODate
      DATE_UPDATE: ISODate
      DATE_ACTIVITY: ISODate
      ACTIVE: string
      VISIBLE: string
      OPENED: string
      CLOSED: string
      SUBJECT_ID: string
      OWNER_ID: string
      KEYWORDS: string | null
      NUMBER_OF_MEMBERS: string
      SUBJECT_NAME: string
      PROJECT: string
      IS_EXTRANET: string
    }

    try {
      // sonet_group.get returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<SonetGroup[]>({
        method: 'sonet_group.get',
        params: {
          ORDER: { NAME: 'ASC' },
          FILTER: { '%NAME': 'Про' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Retrieved groups:', result.length, result[0]?.NAME)
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
      async function getGroups() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sonet_group.get returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sonet_group.get',
            params: {
              ORDER: { NAME: 'ASC' },
              FILTER: { '%NAME': 'Про' },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Retrieved groups:', result.length, result[0]?.NAME)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getGroups)
    </script>
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
