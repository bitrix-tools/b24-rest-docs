# Получить список участников im.dialog.users.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к чату

Метод `im.dialog.users.list` возвращает подробную информацию об участниках диалога с поддержкой пагинации.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор чата в формате:

- `chatXXX` — чат
- `sgXXX` — чат группы или проекта
- `XXX` — идентификатор пользователя личного чата 
  
Идентификатор чата можно получить с помощью метода [im.chat.get](../im-chat-get.md). Идентификатор пользователя — с помощью методов [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md) ||
|| **SKIP_EXTERNAL**
[`string`](../../data-types.md) | Исключить системных пользователей:
- `Y` — исключить
- `N` — не исключать

По умолчанию: `N` ||
|| **SKIP_EXTERNAL_EXCEPT_TYPES**
[`string`](../../data-types.md) | Список типов системных пользователей, которых нужно оставить в выборке, через запятую.

Например: `bot, email` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество элементов на страницу. По умолчанию: `50`. Максимальное значение: `200` ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Идентификатор последнего пользователя из выборки `LIMIT`.

Используется для последовательной загрузки списка ||
|| **OFFSET**
[`integer`](../../data-types.md) | Смещение для постраничной выборки. По умолчанию: `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2935","SKIP_EXTERNAL":"Y","LIMIT":20,"OFFSET":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.dialog.users.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DIALOG_ID":"chat2935","SKIP_EXTERNAL":"Y","LIMIT":20,"OFFSET":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/im.dialog.users.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each DialogUser returned in result[]
    type DialogUser = {
      id: number
      active: boolean
      name: string
      first_name: string
      last_name: string
      work_position: string | null
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
      phones: { work_phone?: string; personal_mobile?: string; personal_phone?: string } | false
      bot_data: object | null
      type: string
      website: string
      email: string
    }

    try {
      // im.dialog.users.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<DialogUser[]>({
        method: 'im.dialog.users.list',
        params: {
          DIALOG_ID: 'chat13',
          SKIP_EXTERNAL: 'Y',
          LIMIT: 20,
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(`Retrieved ${result.length} dialog users:`, result.map(u => u.name))
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
      async function fetchDialogUsers() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // im.dialog.users.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'im.dialog.users.list',
            params: {
              DIALOG_ID: 'chat13',
              SKIP_EXTERNAL: 'Y',
              LIMIT: 20,
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
          console.info(`Retrieved ${result.length} dialog users:`, result.map(u => u.name))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchDialogUsers)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'im.dialog.users.list',
                [
                    'DIALOG_ID' => 'chat2935',
                    'SKIP_EXTERNAL' => 'Y',
                    'LIMIT' => 20,
                    'OFFSET' => 0
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving dialog users list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.dialog.users.list',
        {
            DIALOG_ID: 'chat2935',
            SKIP_EXTERNAL: 'Y',
            LIMIT: 20,
            OFFSET: 0
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
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.dialog.users.list',
        [
            'DIALOG_ID' => 'chat2935',
            'SKIP_EXTERNAL' => 'Y',
            'LIMIT' => 20,
            'OFFSET' => 0
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
        "id": 1269,
        "active": true,
        "name": "Александр Смирнов",
        "first_name": "Александр",
        "last_name": "Смирнов",
        "work_position": "Руководитель отдела продаж",
        "color": "#58cc47",
        "avatar": "https://cdn-ru.bitrix24.ru/avatars/alexander-smirnov.png",
        "avatar_hr": "https://cdn-ru.bitrix24.ru/avatars/alexander-smirnov@2x.png",
        "gender": "M",
        "birthday": "",
        "extranet": false,
        "network": false,
        "bot": false,
        "connector": false,
        "external_auth_id": "socservices",
        "status": "online",
        "idle": false,
        "last_activity_date": "2026-03-02T17:45:59+03:00",
        "mobile_last_date": false,
        "desktop_last_date": false,
        "absent": false,
        "departments": [1],
        "phones": {
            "personal_mobile": "79165554419"
        },
        "bot_data": null,
        "type": "user",
        "website": "",
        "email": "a.smirnov@example.ru"
        },
        {
        "id": 99,
        "active": true,
        "name": "Екатерина Иванова",
        "first_name": "Екатерина",
        "last_name": "Иванова",
        "work_position": "Бизнес-аналитик",
        "color": "#58cc47",
        "avatar": "https://cdn-ru.bitrix24.ru/avatars/ekaterina-ivanova.png",
        "avatar_hr": "https://cdn-ru.bitrix24.ru/avatars/ekaterina-ivanova@2x.png",
        "gender": "F",
        "birthday": "",
        "extranet": false,
        "network": false,
        "bot": false,
        "connector": false,
        "external_auth_id": "socservices",
        "status": "online",
        "idle": false,
        "last_activity_date": "2026-03-02T17:44:31+03:00",
        "mobile_last_date": false,
        "desktop_last_date": false,
        "absent": false,
        "departments": [121],
        "phones": false,
        "bot_data": null,
        "type": "user",
        "website": "",
        "email": "e.ivanova@mail.ru"
        },
        {
        "id": 1271,
        "active": true,
        "name": "Дмитрий Кузнецов",
        "first_name": "Дмитрий",
        "last_name": "Кузнецов",
        "work_position": "Старший разработчик",
        "color": "#df532d",
        "avatar": "https://cdn-ru.bitrix24.ru/avatars/dmitry-kuznetsov.png",
        "avatar_hr": "https://cdn-ru.bitrix24.ru/avatars/dmitry-kuznetsov@2x.png",
        "gender": "M",
        "birthday": "",
        "extranet": false,
        "network": false,
        "bot": false,
        "connector": false,
        "external_auth_id": "socservices",
        "status": "online",
        "idle": false,
        "last_activity_date": "2026-03-02T17:45:02+03:00",
        "mobile_last_date": false,
        "desktop_last_date": false,
        "absent": false,
        "departments": [1],
        "phones": false,
        "bot_data": null,
        "type": "user",
        "website": "",
        "email": "d.kuznetsov@mail.ru"
        }
    ],
    "total": 3,
    "time": {
        "start": 1772477165,
        "finish": 1772477165.266759,
        "duration": 0.26675891876220703,
        "processing": 0,
        "date_start": "2026-03-02T17:46:05+03:00",
        "date_finish": "2026-03-02T17:46:05+03:00",
        "operating_reset_at": 1772477765,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов с [данными участников диалога](#result) ||
|| **total**
[`integer`](../../data-types.md) | Общее количество участников, доступных текущему пользователю ||
|| **next**
[`integer`](../../data-types.md) | Смещение следующей страницы результатов.

Возвращается, если есть следующая страница ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

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
[`string`](../../data-types.md) | Должность пользователя. Может быть `null` ||
|| **color**
[`string`](../../data-types.md) | Цвет пользователя в формате HEX ||
|| **avatar**
[`string`](../../data-types.md) | Ссылка на аватар. Если пусто, аватар не задан ||
|| **avatar_hr**
[`string`](../../data-types.md) | Ссылка на аватар высокого разрешения ||
|| **gender**
[`string`](../../data-types.md) | Пол пользователя ||
|| **birthday**
[`string`](../../data-types.md) | День рождения в формате `DD-MM` или пустая строка ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак внешнего экстранет-пользователя ||
|| **network**
[`boolean`](../../data-types.md) | Признак пользователя Битрикс24.Network ||
|| **bot**
[`boolean`](../../data-types.md) | Признак бота ||
|| **connector**
[`boolean`](../../data-types.md) | Признак пользователя открытых линий ||
|| **external_auth_id**
[`string`](../../data-types.md) | Код внешней авторизации ||
|| **status**
[`string`](../../data-types.md) | Статус пользователя ||
|| **idle**
[`datetime`](../../data-types.md) | Дата, когда пользователь отошел от компьютера. Если не задано, `false` ||
|| **last_activity_date**
[`datetime`](../../data-types.md) | Дата последней активности пользователя ||
|| **mobile_last_date**
[`datetime`](../../data-types.md) | Дата последней активности в мобильном приложении. Если не задано, `false` ||
|| **desktop_last_date**
[`datetime`](../../data-types.md) | Дата последней активности в десктоп-приложении. Если не задано, `false` ||
|| **absent**
[`datetime`](../../data-types.md) | Дата отпуска пользователя. Если не задано, `false` ||
|| **departments**
[`array`](../../data-types.md) | Список идентификаторов отделов пользователя ||
|| **phones**
[`object`](../../data-types.md) | Контактные [телефоны пользователя](#result-phones). Может быть `false` ||
|| **bot_data**
[`object`](../../data-types.md) | Данные бота. Для обычного пользователя может быть `null` ||
|| **type**
[`string`](../../data-types.md) | Тип пользователя ||
|| **website**
[`string`](../../data-types.md) | Сайт пользователя ||
|| **email**
[`string`](../../data-types.md) | Email пользователя ||
|#

#### Объект phones {#result-phones}

#|
|| **Название**
`тип` | **Описание** ||
|| **work_phone**
[`string`](../../data-types.md) | Рабочий телефон ||
|| **personal_mobile**
[`string`](../../data-types.md) | Мобильный телефон ||
|| **personal_phone**
[`string`](../../data-types.md) | Домашний телефон ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Не передан или передан некорректный `DIALOG_ID` ||
|| `ACCESS_ERROR` | You do not have access to the specified dialog | Нет доступа к указанному диалогу ||
|| `ACCESS_ERROR` | You don't have access to this chat | Нет доступа к указанному чату ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../im-chat-add.md)
- [{#T}](./im-chat-user-add.md)
- [{#T}](../chat-update/im-chat-update-title.md)
- [{#T}](../chat-update/im-chat-update-avatar.md)
- [{#T}](../chat-update/im-chat-update-color.md)
- [{#T}](../im-chat-get.md)
- [{#T}](../im-dialog-get.md)
- [{#T}](./im-chat-user-list.md)
- [{#T}](./im-chat-user-delete.md)
- [{#T}](./im-chat-leave.md)
