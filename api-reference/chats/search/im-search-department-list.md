# Найти подразделения im.search.department.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.search.department.list` выполняет поиск подразделений по полному названию.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **FIND***
[`string`](../../data-types.md) | Поисковая фраза для поиска по полному названию подразделения (поле [full_name](../departments/im-department-get.md#department)) ||
|| **USER_DATA**
[`string`](../../data-types.md) | Возвращать данные руководителя подразделения в поле [manager_user_data](#manager_user_data). 

Доступные значения: 
- `Y` — да
- `N` — нет

Значение по умолчанию — `N` ||
|| **OFFSET**
[`integer`](../../data-types.md) | Смещение выборки подразделений. По умолчанию `0` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество элементов в выборке. По умолчанию `10`. Максимальное значение `50` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FIND":"Отдел","USER_DATA":"Y","OFFSET":0,"LIMIT":10}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.search.department.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FIND":"Отдел","USER_DATA":"Y","OFFSET":0,"LIMIT":10,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.search.department.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ManagerUserData = {
      id: number
      active: boolean
      name: string
      first_name: string
      last_name: string
      work_position: string
      color: string
      avatar: string
      avatar_hr: string
      gender: string
      birthday: string
      extranet: boolean
      network: boolean
      bot: boolean
      connector: boolean
      external_auth_id: string
      status: string
      idle: ISODate | false
      last_activity_date: ISODate
      mobile_last_date: ISODate | false
      desktop_last_date: ISODate | false
      absent: ISODate | false
      departments: number[]
      phones: { work_phone?: string; inner_phone?: string } | false
      bot_data: object | null
      type: string
      website: string
      email: string
    }

    // Shape of each department item returned in result[]
    type DepartmentItem = {
      id: number
      name: string
      full_name: string
      manager_user_id: number
      manager_user_data?: ManagerUserData
    }

    try {
      // im.search.department.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<DepartmentItem[]>({
        method: 'im.search.department.list',
        params: {
          FIND: 'Department',
          USER_DATA: 'Y',
          OFFSET: 0,
          LIMIT: 10,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Found departments:', result.length, result)
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
      async function searchDepartmentList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // im.search.department.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'im.search.department.list',
            params: {
              FIND: 'Department',
              USER_DATA: 'Y',
              OFFSET: 0,
              LIMIT: 10,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Found departments:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', searchDepartmentList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.search.department.list',
            [
                'FIND' => 'Отдел',
                'USER_DATA' => 'Y',
                'OFFSET' => 0,
                'LIMIT' => 10,
            ]
        );

        $result = $response->getResponseData()->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            var_dump($result->data());
        }
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.search.department.list',
        {
            FIND: 'Отдел',
            USER_DATA: 'Y',
            OFFSET: 0,
            LIMIT: 10,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data(), result.total(), result.next());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.search.department.list',
        [
            'FIND' => 'Отдел',
            'USER_DATA' => 'Y',
            'OFFSET' => 0,
            'LIMIT' => 10,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        var_dump($result['result']);
    }
    ```
{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": [
        {
            "id": 9,
            "name": "Отдел маркетинга и рекламы",
            "full_name": "Отдел маркетинга и рекламы / Моя компания",
            "manager_user_id": 3,
            "manager_user_data": {
                "id": 3,
                "active": true,
                "name": "Елена Иванова",
                "first_name": "Елена",
                "last_name": "Иванова",
                "work_position": "",
                "color": "#1eb4aa",
                "avatar": "https://example.bitrix24.ru/upload/main/avatar.png",
                "avatar_hr": "https://example.bitrix24.ru/upload/main/avatar.png",
                "gender": "F",
                "birthday": "06-04",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "socservices",
                "status": "online",
                "idle": false,
                "last_activity_date": "2026-03-04T22:08:29+03:00",
                "mobile_last_date": false,
                "desktop_last_date": false,
                "absent": false,
                "departments": [1],
                "phones": {
                    "work_phone": "7495111111",
                    "inner_phone": "222"
                },
                "bot_data": null,
                "type": "user",
                "website": "example.ru",
                "email": "user@example.ru"
            }
        },
        ... // описание для каждого подразделения
    ],
    "total": 2,
    "time": {
        "start": 1772651443,
        "finish": 1772651443.378436,
        "duration": 0.3784360885620117,
        "processing": 0,
        "date_start": "2026-03-04T22:10:43+03:00",
        "date_finish": "2026-03-04T22:10:43+03:00",
        "operating_reset_at": 1772652043,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список найденных подразделений.

Структура объекта подразделения подробно описана [ниже](#department-object) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных подразделений ||
|| **next**
[`integer`](../../data-types.md) | Смещение следующей страницы. Поле возвращается, если есть следующая страница ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект подразделения {#department-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор подразделения ||
|| **name**
[`string`](../../data-types.md) | Короткое название подразделения ||
|| **full_name**
[`string`](../../data-types.md) | Полное название подразделения ||
|| **manager_user_id**
[`integer`](../../data-types.md) | Идентификатор руководителя подразделения ||
|| **manager_user_data**
[`object`](../../data-types.md) | Данные руководителя подразделения. Объект возвращается только при `USER_DATA = 'Y'`.

Структура объекта руководителя подробно описана [ниже](#manager_user_data) ||
|#

#### Объект manager_user_data {#manager_user_data}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **active**
[`boolean`](../../data-types.md) | Признак активности пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия пользователя ||
|| **first_name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **last_name**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **work_position**
[`string`](../../data-types.md) | Должность пользователя ||
|| **color**
[`string`](../../data-types.md) | Цвет пользователя в формате hex ||
|| **avatar**
[`string`](../../data-types.md) | Ссылка на аватар ||
|| **avatar_hr**
[`string`](../../data-types.md) | Ссылка на аватар высокого разрешения ||
|| **gender**
[`string`](../../data-types.md) | Пол пользователя ||
|| **birthday**
[`string`](../../data-types.md) | День рождения в формате `DD-MM` или пустая строка ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак внешнего пользователя ||
|| **network**
[`boolean`](../../data-types.md) | Признак пользователя Битрикс24 Network ||
|| **bot**
[`boolean`](../../data-types.md) | Признак бота ||
|| **connector**
[`boolean`](../../data-types.md) | Признак пользователя открытых линий ||
|| **external_auth_id**
[`string`](../../data-types.md) | Код внешней авторизации ||
|| **status**
[`string`](../../data-types.md) | Статус пользователя ||
|| **idle**
[`datetime`](../../data-types.md) | Дата бездействия пользователя или `false` ||
|| **last_activity_date**
[`datetime`](../../data-types.md) | Дата последней активности пользователя ||
|| **mobile_last_date**
[`datetime`](../../data-types.md) | Дата последней активности в мобильном приложении или `false` ||
|| **desktop_last_date**
[`datetime`](../../data-types.md) | Дата последней активности в десктопном приложении или `false` ||
|| **absent**
[`datetime`](../../data-types.md) | Дата окончания отсутствия пользователя или `false` ||
|| **departments**
[`array`](../../data-types.md) | Массив идентификаторов подразделений ||
|| **phones**
[`object`](../../data-types.md) | Телефоны пользователя или `false` [(подробное описание)](#phones) ||
|| **bot_data**
[`object`](../../data-types.md) | Данные бота или `null` ||
|| **type**
[`string`](../../data-types.md) | Тип пользователя ||
|| **website**
[`string`](../../data-types.md) | Сайт пользователя ||
|| **email**
[`string`](../../data-types.md) | Email пользователя ||
|#

#### Объект phones {#phones}

#|
|| **Название**
`тип` | **Описание** ||
|| **personal_mobile**
[`string`](../../data-types.md) | Мобильный телефон ||
|| **inner_phone**
[`string`](../../data-types.md) | Внутренний телефон ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "FIND_SHORT",
    "error_description": "Too short a search phrase."
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `FIND_SHORT` | Too short a search phrase | Не передан параметр `FIND` или фраза меньше трех символов ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-search-chat-list.md)
- [{#T}](./im-search-user-list.md)
- [{#T}](./im-search-last-add.md)
- [{#T}](./im-search-last-get.md)
- [{#T}](./im-search-last-delete.md)
