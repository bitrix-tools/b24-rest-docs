# Найти пользователей im.search.user.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.search.user.list` выполняет поиск пользователей по имени, фамилии, должности и подразделению.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **FIND***
[`string`](../../data-types.md) | Поисковая фраза. Минимальное количество символов для поиска — `3` ||
|| **BUSINESS**
[`string`](../../data-types.md) | Искать только среди бизнес-пользователей. 

Допустимые значения:
- `Y` — да
- `N` — нет

Значение по умолчанию — `N` ||

|| **OFFSET**
[`integer`](../../data-types.md) | Смещение выборки пользователей. По умолчанию `0` ||
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
      -d '{"FIND":"Иван","BUSINESS":"N","OFFSET":0,"LIMIT":10}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.search.user.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"FIND":"Иван","BUSINESS":"N","OFFSET":0,"LIMIT":10,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.search.user.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each user returned in result[]
    type UserResult = {
      id: number
      name: string
      first_name: string
      last_name: string
      work_position: string
      color: string
      avatar: string | null
      gender: string
      birthday: string | false
      extranet: boolean
      network: boolean
      bot: boolean
      connector: boolean
      external_auth_id: string
      status: string
      idle: ISODate | false
      last_activity_date: ISODate | false
      mobile_last_date: ISODate | false
      departments: number[]
      absent: ISODate | false
      phones: {
        work_phone: string
        personal_mobile: string
        inner_phone: string
      } | false
    }

    try {
      // im.search.user.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<UserResult[]>({
        method: 'im.search.user.list',
        params: {
          FIND: 'Ivan',
          BUSINESS: 'N',
          OFFSET: 0,
          LIMIT: 10,
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Found users:', result.length, result[0]?.name)
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
      async function searchUserList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // im.search.user.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'im.search.user.list',
            params: {
              FIND: 'Ivan',
              BUSINESS: 'N',
              OFFSET: 0,
              LIMIT: 10,
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
          console.info('Found users:', result.length, result[0]?.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', searchUserList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.search.user.list',
            [
                'FIND' => 'Иван',
                'BUSINESS' => 'N',
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
        'im.search.user.list',
        {
            FIND: 'Иван',
            BUSINESS: 'N',
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
        'im.search.user.list',
        [
            'FIND' => 'Иван',
            'BUSINESS' => 'N',
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
            "id": 103,
            "name": "Светлана Иванова",
            "first_name": "Светлана",
            "last_name": "Иванова",
            "work_position": "Руководитель ИТ-отдела",
            "color": "#4ba984",
            "avatar": "https://example.bitrix24.ru/upload/main/avatar.png",
            "gender": "F",
            "birthday": "08-03",
            "extranet": false,
            "network": false,
            "bot": false,
            "connector": false,
            "external_auth_id": "socservices",
            "status": "online",
            "idle": false,
            "last_activity_date": "2026-03-04T15:40:56+03:00",
            "mobile_last_date": false,
            "departments": [1, 7],
            "absent": false,
            "phones": {
                "work_phone": "79123456789",
                "personal_mobile": "81234567890",
                "inner_phone": "78"
            }
        },
        ... // описание для каждого пользователя
    ],
    "total": 2,
    "time": {
        "start": 1772628089,
        "finish": 1772628089.061656,
        "duration": 0.06165599822998047,
        "processing": 0,
        "date_start": "2026-03-04T15:41:29+03:00",
        "date_finish": "2026-03-04T15:41:29+03:00",
        "operating_reset_at": 1772628689,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список найденных пользователей.

Структура объекта пользователя подробно описана [ниже](#user-object) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных пользователей ||
|| **next**
[`integer`](../../data-types.md) | Смещение следующей страницы. Поле возвращается, если есть следующая страница ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект пользователя {#user-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия пользователя ||
|| **first_name**
[`string`](../../data-types.md) | Имя пользователя ||
|| **last_name**
[`string`](../../data-types.md) | Фамилия пользователя ||
|| **work_position**
[`string`](../../data-types.md) | Должность пользователя ||
|| **color**
[`string`](../../data-types.md) | Цвет пользователя в формате HEX ||
|| **avatar**
[`string`](../../data-types.md) 
[`null`](../../data-types.md) | Ссылка на аватар пользователя ||
|| **gender**
[`string`](../../data-types.md) | Пол пользователя: `M` или `F` ||
|| **birthday**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | День рождения в формате `DD-MM` или `false` ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак экстранет-пользователя ||
|| **network**
[`boolean`](../../data-types.md) | Признак пользователя Bitrix24 Network ||
|| **bot**
[`boolean`](../../data-types.md) | Признак пользователя-бота ||
|| **connector**
[`boolean`](../../data-types.md) | Признак пользователя-коннектора открытых линий ||
|| **external_auth_id**
[`string`](../../data-types.md) | Идентификатор внешней авторизации ||
|| **status**
[`string`](../../data-types.md) | Текущий статус пользователя ||
|| **idle**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время перехода в статус «Отошел» в формате ISO 8601 (RFC3339) или `false` ||
|| **last_activity_date**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время последней активности в формате ISO 8601 (RFC3339) или `false` ||
|| **mobile_last_date**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Время последней мобильной активности в формате ISO 8601 (RFC3339) или `false` ||
|| **departments**
[`array`](../../data-types.md) | Массив идентификаторов подразделений ||
|| **absent**
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Дата окончания отсутствия в формате ISO 8601 (RFC3339) или `false` ||
|| **phones**
[`object`](../../data-types.md) | Телефоны пользователя или `false`.

Структура объекта подробно описана [ниже](#phones-object) ||
|#

### Объект phones {#phones-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **work_phone**
[`string`](../../data-types.md) | Рабочий телефон ||
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
|| `FIND_SHORT` | Too short a search phrase | Поисковая фраза не передана или слишком короткая для внутреннего фильтра поиска ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-search-chat-list.md)
- [{#T}](./im-search-department-list.md)
- [{#T}](./im-search-last-add.md)
- [{#T}](./im-search-last-get.md)
- [{#T}](./im-search-last-delete.md)
