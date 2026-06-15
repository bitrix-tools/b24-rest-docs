# Получить историю поиска im.search.last.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.search.last.get` возвращает список диалогов из истории последнего поиска.

Метод разработан для предыдущей версии чата. В текущей версии чата М1 он работает, но результаты не отображаются в интерфейсе.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **SKIP_OPENLINES**
[`string`](../../data-types.md) | Пропустить чаты Открытых линий.

Возможные значения:
- `Y` — да
- `N` — нет 

Значение по умолчанию — `N` ||
|| **SKIP_CHAT**
[`string`](../../data-types.md) | Пропустить групповые чаты.

Возможные значения:
- `Y` — да
- `N` — нет 

Значение по умолчанию — `N` ||
|| **SKIP_DIALOG**
[`string`](../../data-types.md) | Пропустить личные диалоги. 

Возможные значения:
- `Y` — да
- `N` — нет 

Значение по умолчанию — `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SKIP_OPENLINES":"N","SKIP_CHAT":"N","SKIP_DIALOG":"N"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.search.last.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"SKIP_OPENLINES":"N","SKIP_CHAT":"N","SKIP_DIALOG":"N","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.search.last.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each SearchLastItem returned in result[]
    type SearchLastItem = {
      id: string | number
      type: 'chat' | 'user'
      avatar: {
        url: string
        color: string
      }
      title: string
      chat?: {
        id: number
        name: string
        owner: number
        extranet: boolean
        avatar: string
        color: string
        type: string
        entity_type: string
        entity_id: string
        entity_data_1: string
        entity_data_2: string
        entity_data_3: string
        mute_list: unknown[]
        date_create: ISODate
        message_type: string
      }
      user?: {
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
        phones: { personal_mobile: string; work_phone: string; inner_phone: string } | false
        bot_data: object | null
        type: string
        website: string
        email: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<SearchLastItem[]>({
        method: 'im.search.last.get',
        params: {
          SKIP_OPENLINES: 'N',
          SKIP_CHAT: 'N',
          SKIP_DIALOG: 'N',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Search history entries:', result.length, result)
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
      async function getSearchHistory() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.search.last.get',
            params: {
              SKIP_OPENLINES: 'N',
              SKIP_CHAT: 'N',
              SKIP_DIALOG: 'N',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Search history entries:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getSearchHistory)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.search.last.get',
            [
                'SKIP_OPENLINES' => 'N',
                'SKIP_CHAT' => 'N',
                'SKIP_DIALOG' => 'N',
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
        'im.search.last.get',
        {
            SKIP_OPENLINES: 'N',
            SKIP_CHAT: 'N',
            SKIP_DIALOG: 'N',
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
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
        'im.search.last.get',
        [
            'SKIP_OPENLINES' => 'N',
            'SKIP_CHAT' => 'N',
            'SKIP_DIALOG' => 'N',
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
            "id": "chat1157",
            "type": "chat",
            "avatar": {
                "url": "",
                "color": "#ab7761"
            },
            "title": "Бурый чат №18",
            "chat": {
                "id": 1157,
                "name": "Бурый чат №18",
                "owner": 27,
                "extranet": false,
                "avatar": "",
                "color": "#ab7761",
                "type": "thread",
                "entity_type": "THREAD",
                "entity_id": "",
                "entity_data_1": "",
                "entity_data_2": "",
                "entity_data_3": "",
                "mute_list": [],
                "date_create": "2025-01-30T00:41:03+03:00",
                "message_type": "C"
            }
        },
        {
            "id": 103,
            "type": "user",
            "avatar": {
                "url": "https://example.bitrix24.ru/upload/main/avatar.png",
                "color": "#4ba984"
            },
            "title": "Светлана Иванова",
            "user": {
                "id": 103,
                "active": true,
                "name": "Светлана Иванова",
                "first_name": "Светлана",
                "last_name": "Иванова",
                "work_position": "Руководитель ИТ-отдела",
                "color": "#4ba984",
                "avatar": "https://example.bitrix24.ru/upload/main/avatar.png",
                "avatar_hr": "https://example.bitrix24.ru/upload/main/avatar.png",
                "gender": "F",
                "birthday": "08-03",
                "extranet": false,
                "network": false,
                "bot": false,
                "connector": false,
                "external_auth_id": "socservices",
                "status": "online",
                "idle": false,
                "last_activity_date": "2026-03-05T10:19:37+03:00",
                "mobile_last_date": false,
                "desktop_last_date": false,
                "absent": false,
                "departments": [1, 7],
                "phones": {
                    "personal_mobile": "81234567890",
                    "work_phone": "79123456789",
                    "inner_phone": "78"
                },
                "bot_data": null,
                "type": "user",
                "website": "",
                "email": "svetlana@example.ru"
            }
        },
        ... // описание для каждого чата, пользователя
    ],
    "time": {
        "start": 1772695649,
        "finish": 1772695649.89509,
        "duration": 0.8950901031494141,
        "processing": 0,
        "date_start": "2026-03-05T10:27:29+03:00",
        "date_finish": "2026-03-05T10:27:29+03:00",
        "operating_reset_at": 1772696249,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список элементов истории поиска.

Структура объекта элемента подробно описана [ниже](#last-item-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Элемент истории поиска {#last-item-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) 
[`integer`](../../data-types.md) | Идентификатор чата или идентификатор пользователя для личного диалога ||
|| **type**
[`string`](../../data-types.md) | Тип записи: `chat` или `user` ||
|| **avatar**
[`object`](../../data-types.md) | Данные аватара записи.

Структура объекта подробно описана [ниже](#avatar-object) ||
|| **title**
[`string`](../../data-types.md) | Заголовок записи ||
|| **user**
[`object`](../../data-types.md) | Данные пользователя для записи типа `user`.

Структура объекта подробно описана [ниже](#user-object) ||
|| **chat**
[`object`](../../data-types.md) | Данные чата для записи типа `chat`.

Структура объекта подробно описана [ниже](#chat-object) ||
|#

### Объект avatar {#avatar-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **url**
[`string`](../../data-types.md) | Ссылка на аватар ||
|| **color**
[`string`](../../data-types.md) | Цвет в формате HEX ||
|#

### Объект user {#user-object}

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

### Объект chat {#chat-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор чата ||
|| **name**
[`string`](../../data-types.md) | Название чата ||
|| **owner**
[`integer`](../../data-types.md) | Идентификатор владельца чата ||
|| **extranet**
[`boolean`](../../data-types.md) | Признак участия в чате экстранет-пользователей ||
|| **avatar**
[`string`](../../data-types.md) 
[`null`](../../data-types.md) | Ссылка на аватар чата ||
|| **color**
[`string`](../../data-types.md) | Цвет чата в формате HEX ||
|| **type**
[`string`](../../data-types.md) | Тип чата ||
|| **entity_type**
[`string`](../../data-types.md) | Тип объекта, к которому привязан чат ||
|| **entity_id**
[`string`](../../data-types.md) | Идентификатор объекта, к которому привязан чат||
|| **entity_data_1**
[`string`](../../data-types.md) | Дополнительные данные объекта чата — поле 1 ||
|| **entity_data_2**
[`string`](../../data-types.md) | Дополнительные данные объекта чата — поле 2 ||
|| **entity_data_3**
[`string`](../../data-types.md) | Дополнительные данные объекта чата — поле 3 ||
|| **mute_list**
[`object`](../../data-types.md) | Список пользователей с выключенными уведомлениями ||
|| **date_create**
[`string`](../../data-types.md) | Дата создания чата в формате ISO 8601 (RFC3339) ||
|| **message_type**
[`string`](../../data-types.md) | Тип сообщения ||
|#

## Обработка ошибок

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-search-chat-list.md)
- [{#T}](./im-search-department-list.md)
- [{#T}](./im-search-user-list.md)
- [{#T}](./im-search-last-add.md)
- [{#T}](./im-search-last-delete.md)
