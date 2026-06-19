# Получить уведомления im.notify.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.get` возвращает список уведомлений пользователя частями. Следующая часть запрашивается через `LAST_ID` и `LAST_TYPE`. 

Сортировка уведомлений: сначала по убыванию даты создания, затем по убыванию идентификаторов. 

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Идентификатор последнего уведомления предыдущей страницы для загрузки следующей. Обычно берется из поля `id` последнего элемента массива `notifications` в ответе предыдущего шага выборки или в ответе [im.notify.history.search](./im-notify-history-search.md) 

Идентификатор уведомления также возвращают методы [im.notify](./im-notify.md), [im.notify.personal.add](./im-notify-personal-add.md) и [im.notify.system.add](./im-notify-system-add.md).

Параметр нужно использовать вместе с `LAST_TYPE` ||
|| **LAST_TYPE**
[`integer`](../../data-types.md) | Технический курсор пагинации.

Допустимые значения: 
- `1` — продолжить выборку с этапа подтверждений
- `3` — продолжить выборку с этапа обычных уведомлений

Параметр нужно использовать вместе с `LAST_ID`.

Для значений, отличных от `1` и `3`, сервер не возвращает отдельную ошибку ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество уведомлений на страницу. Значение по умолчанию — `50`. Максимальное значение — `50` ||
|| **CONVERT_TEXT**
[`string`](../../data-types.md) | Преобразовать текст уведомлений. Значение `Y` включает преобразование, любое другое значение отключает ||
|#

На одной странице метод может вернуть смешанный набор уведомлений: сначала подтверждения, затем обычные уведомления для добора до `LIMIT`.

Для стабильной постраничной выборки:

- передавайте `LAST_ID` последнего элемента предыдущей страницы
- используйте `LAST_TYPE` из предыдущего шага пагинации

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"LAST_ID":1500,"LAST_TYPE":3,"LIMIT":20,"CONVERT_TEXT":"Y"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"LAST_ID":1500,"LAST_TYPE":3,"LIMIT":20,"CONVERT_TEXT":"Y","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type NotificationItem = {
      id: number
      chat_id: number
      author_id: number
      date: ISODate
      notify_type: number
      notify_module: string
      notify_event: string
      notify_tag: string
      notify_sub_tag: string
      notify_title: string
      setting_name: string
      text: string
      notify_read: string
      notify_buttons?: string
      params: object | null
    }

    type UserItem = {
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
      phones: Record<string, string> | false
      bot_data: object | null
      type: string
      website: string
      email: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ImNotifyGetResult = {
      total_count: number
      total_unread_count: number
      chat_id: number
      notifications: NotificationItem[]
      users: UserItem[]
    }

    try {
      const response = await $b24.actions.v2.call.make<ImNotifyGetResult>({
        method: 'im.notify.get',
        params: {
          LAST_ID: 1500,
          LAST_TYPE: 3,
          LIMIT: 20,
          CONVERT_TEXT: 'Y',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Total notifications:', result.total_count, 'Unread:', result.total_unread_count)
        console.info('Notifications on page:', result.notifications.length)
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
      async function getNotifications() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.notify.get',
            params: {
              LAST_ID: 1500,
              LAST_TYPE: 3,
              LIMIT: 20,
              CONVERT_TEXT: 'Y',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Total notifications:', result.total_count, 'Unread:', result.total_unread_count)
          console.info('Notifications on page:', result.notifications.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getNotifications)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.notify.get',
            [
                'LAST_ID' => 1500,
                'LAST_TYPE' => 3,
                'LIMIT' => 20,
                'CONVERT_TEXT' => 'Y',
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
        'im.notify.get',
        {
            LAST_ID: 1500,
            LAST_TYPE: 3,
            LIMIT: 20,
            CONVERT_TEXT: 'Y',
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
        'im.notify.get',
        [
            'LAST_ID' => 1500,
            'LAST_TYPE' => 3,
            'LIMIT' => 20,
            'CONVERT_TEXT' => 'Y',
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
    "result": {
        "total_count": 120,
        "total_unread_count": 5,
        "chat_id": 77,
        "notifications": [
            {
                "id": 1500,
                "chat_id": 77,
                "author_id": 1,
                "date": "2026-03-03T09:00:00+00:00",
                "notify_type": 2,
                "notify_module": "rest",
                "notify_event": "rest_notify",
                "notify_tag": "MP|12345|TASK_42",
                "notify_sub_tag": "MP|12345|TASK|42",
                "notify_title": "",
                "setting_name": "rest|rest_notify",
                "text": "Напоминание",
                "notify_read": "N",
                "params": null
            }
        ],
        "users": [
            {
                "id": 1,
                "active":true,
                "name": "Иван Петров",
                "first_name":"Иван",
                "last_name":"Петров",
                "work_position":"",
                "color":"#1eb4aa",
                "avatar":"https://example.bitrix24.ru/upload/main/avatar.png",
                "avatar_hr":"https://example.bitrix24.ru/upload/main/avatar.png",
                "gender":"M",
                "birthday":"15-05",
                "extranet":false,
                "network":false,
                "bot":false,
                "connector":false,
                "external_auth_id":"socservices",
                "status":"online",
                "idle":false,
                "last_activity_date":"2026-03-03T15:04:20+03:00",
                "mobile_last_date":false,
                "desktop_last_date":false,
                "absent":false,
                "departments":[1],
                "phones":{
                    "work_phone":"+71234567890",
                    "inner_phone":"22"
                },
                "bot_data":null,
                "type":"user",
                "website":"example.ru",
                "email":"ivan@example.ru"
            }
        ]
    },
    "time": {
        "start": 1760000000.0,
        "finish": 1760000000.1,
        "duration": 0.1,
        "processing": 0.04,
        "date_start": "2026-03-03T10:00:00+03:00",
        "date_finish": "2026-03-03T10:00:00+03:00",
        "operating_reset_at": 1760030000,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными уведомлений. 

Структура объекта подробно описана [ниже](#result-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **total_count**
[`integer`](../../data-types.md) | Общее количество уведомлений ||
|| **total_unread_count**
[`integer`](../../data-types.md) | Количество непрочитанных уведомлений ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор системного чата уведомлений ||
|| **notifications**
[`array`](../../data-types.md) | Список уведомлений. 

Структура объекта подробно описана [ниже](#notification-object) ||
|| **users**
[`array`](../../data-types.md) | Массив объектов с данными авторов уведомлений.

Структура объекта подробно описана [ниже](#users-object) ||
|#

Если у пользователя нет системного чата уведомлений или в нем нет сообщений, метод возвращает только поля `notifications` и `users`.

#### Объект notification {#notification-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор уведомления ||
|| **chat_id**
[`integer`](../../data-types.md) | Идентификатор системного чата уведомлений ||
|| **author_id**
[`integer`](../../data-types.md) | Идентификатор автора уведомления ||
|| **date**
[`string`](../../data-types.md) | Дата и время уведомления в формате ISO 8601 (RFC3339) ||
|| **notify_type**
[`integer`](../../data-types.md) | Тип уведомления ||
|| **notify_module**
[`string`](../../data-types.md) | Идентификатор модуля уведомления ||
|| **notify_event**
[`string`](../../data-types.md) | Код события уведомления ||
|| **notify_tag**
[`string`](../../data-types.md) | Тег уведомления ||
|| **notify_sub_tag**
[`string`](../../data-types.md) | Дополнительный тег уведомления ||
|| **notify_title**
[`string`](../../data-types.md) | Заголовок уведомления ||
|| **setting_name**
[`string`](../../data-types.md) | Код настройки в формате ```MODULE|EVENT``` ||
|| **text**
[`string`](../../data-types.md) | Текст уведомления ||
|| **notify_read**
[`string`](../../data-types.md) | Статус прочтения уведомления: `Y` или `N` ||
|| **notify_buttons**
[`string`](../../data-types.md) | JSON клавиатуры для уведомлений типа подтверждения. Поле присутствует не всегда ||
|| **params**
[`object`](../../data-types.md) 
[`null`](../../data-types.md) | Дополнительные параметры уведомления ||
|#

#### Объект users {#users-object}

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
    "error": "LAST_ID_AND_LAST_TYPE",
    "error_description": "Parameters LAST_ID and LAST_TYPE should be used together."
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `LAST_ID_AND_LAST_TYPE` | Parameters LAST_ID and LAST_TYPE should be used together | Передан только один параметр из пары `LAST_ID` и `LAST_TYPE` ||
|| `LAST_ID_STRING` | Last notification ID can't be string | Параметр `LAST_ID` содержит нечисловое значение ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify.md)
- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-system-add.md)
- [{#T}](./im-notify-schema-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-delete.md)
- [{#T}](./im-notify-history-search.md)
