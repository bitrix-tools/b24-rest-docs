# Получить список коллег текущего пользователя im.department.colleagues.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой интранет-пользователь, кроме ботов

Метод `im.department.colleagues.list` получает список коллег текущего пользователя. Для руководителя метод вернет список подчиненных и всех руководителей.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_DATA**
[`string`](../../data-types.md) | Возвращать подробные данные пользователей. 

Возможные значения:
- `Y` — да
- `N` — нет ||
|| **OFFSET**
[`integer`](../../data-types.md) | Смещение выборки пользователей ||
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
      -d '{"USER_DATA":"Y","OFFSET":0,"LIMIT":5}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.department.colleagues.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"USER_DATA":"Y","OFFSET":0,"LIMIT":5,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.department.colleagues.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each ColleagueUser returned in result[]
    type ColleagueUser = {
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
      phones: { personal_mobile?: string; inner_phone?: string } | false
      bot_data: object | null
      type: string
      website: string
      email: string
    }

    try {
      // im.department.colleagues.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ColleagueUser[]>({
        method: 'im.department.colleagues.list',
        params: {
          USER_DATA: 'Y',
          OFFSET: 0,
          LIMIT: 5,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Colleagues:', result.length, result)
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
      async function fetchColleagueList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // im.department.colleagues.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'im.department.colleagues.list',
            params: {
              USER_DATA: 'Y',
              OFFSET: 0,
              LIMIT: 5,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Colleagues:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchColleagueList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.department.colleagues.list',
                [
                    'USER_DATA' => 'Y',
                    'OFFSET' => 0,
                    'LIMIT' => 5,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.department.colleagues.list',
        {
            USER_DATA: 'Y',
            OFFSET: 0,
            LIMIT: 5,
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
                console.log(result.total());
                console.log(result.answer.next);
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.department.colleagues.list',
        [
            'USER_DATA' => 'Y',
            'OFFSET' => 0,
            'LIMIT' => 5,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

- При `USER_DATA = 'N'`:

    ```json
    {
        "result": [9,547,408,103,290],
        "next": 5,
        "total": 7,
        "time": {
            "start": 1772520802,
            "finish": 1772520802.36194,
            "duration": 0.3619399070739746,
            "processing": 0,
            "date_start": "2026-03-03T09:53:22+03:00",
            "date_finish": "2026-03-03T09:53:22+03:00",
            "operating_reset_at": 1772521402,
            "operating": 0
        }
    }
    ```

- При `USER_DATA = 'Y'`:

    ```json
    {
        "result": [
            {
                "id": 9,
                "active": true,
                "name": "Анна Петрова",
                "first_name": "Анна",
                "last_name": "Петрова",
                "work_position": "Менеджер проектов",
                "color": "#58cc47",
                "avatar": "https://mysite.ru/upload/avatars/anna-petrova.jpg",
                "avatar_hr": "https://mysite.ru/upload/avatars/anna-petrova.jpg",
                "gender": "M",
                "birthday": "",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "socservices",
                "status": "online",
                "idle": false,
                "last_activity_date": "2023-03-10T17:16:44+03:00",
                "mobile_last_date": false,
                "desktop_last_date": false,
                "absent": false,
                "departments": [
                    1,
                    667
                ],
                "phones": false,
                "bot_data": null,
                "type": "user",
                "website": "",
                "email": "anna.petrova@mysite.ru"
            },
            ... // описание для каждого пользователя
        ],
        "next": 5,
        "total": 7,
        "time": {
            "start": 1772521273,
            "finish": 1772521273.83899,
            "duration": 0.8389899730682373,
            "processing": 0,
            "date_start": "2026-03-03T10:01:13+03:00",
            "date_finish": "2026-03-03T10:01:13+03:00",
            "operating_reset_at": 1772521873,
            "operating": 0
        }
    }
    ```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список пользователей. 
- При `USER_DATA = 'N'` содержит идентификаторы пользователей
- При `USER_DATA = 'Y'` содержит объекты пользователей [(подробное описание)](#user-object) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество пользователей в выборке ||
|| **next**
[`integer`](../../data-types.md) | Смещение для получения следующей страницы. Поле возвращается, если есть следующая страница ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект user {#user-object}

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

HTTP-статус: **403**

```json
{
    "error": "ACCESS_ERROR",
    "error_description": "Only intranet users have access to this method."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_ERROR` | Only intranet users have access to this method | Метод недоступен для экстранет-пользователей и ботов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-department-get.md)
- [{#T}](./im-department-managers-get.md)
- [{#T}](./im-department-employees-get.md)
- [{#T}](./im-department-colleagues-list.md)
