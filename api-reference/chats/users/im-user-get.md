# Получить данные о пользователе im.user.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.user.get` получает данные о текущем пользователе или о пользователе по `ID`.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор пользователя. Если не передан, метод вернет данные текущего пользователя. 

Получить идентификатор пользователя можно методами [user.get](../../user/user-get.md), [user.search](../../user/user-search.md) или [im.chat.user.list](../chat-users/im-chat-user-list.md) ||
|| **AVATAR_HR**
[`string`](../../data-types.md) | Параметр для запроса поля `avatar_hr` с адресом аватара в высоком разрешении. Допустимые значения: `Y` или `N`, по умолчанию `N`. 

На текущий момент поле `avatar_hr` возвращается всегда, независимо от значения параметра ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":5,"AVATAR_HR":"Y"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":5,"AVATAR_HR":"Y","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.user.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ImUserGetResult = {
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
      phones: false | {
        work_phone: string
        personal_mobile: string
        inner_phone: string
      }
      website: string
      email: string
      bot_data: null | Record<string, unknown>
      type: string
    }

    try {
      const response = await $b24.actions.v2.call.make<ImUserGetResult>({
        method: 'im.user.get',
        params: {
          ID: 5,
          AVATAR_HR: 'Y',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.id, result.name, result.status)
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
      async function getImUser() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.user.get',
            params: {
              ID: 5,
              AVATAR_HR: 'Y',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.id, result.name, result.status)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getImUser)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.user.get',
            [
                'ID' => 5,
                'AVATAR_HR' => 'Y',
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
        'im.user.get',
        {
            ID: 5,
            AVATAR_HR: 'Y',
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
        'im.user.get',
        [
            'ID' => 5,
            'AVATAR_HR' => 'Y',
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
        "id": 5,
        "active": true,
        "name": "Иван Петров",
        "first_name": "Иван",
        "last_name": "Петров",
        "work_position": "Менеджер",
        "color": "#048bd0",
        "avatar": "https://example.bitrix24.ru/upload/main/avatar.png",
        "avatar_hr": "https://example.bitrix24.ru/upload/main/avatar_hr.png",
        "gender": "M",
        "birthday": "",
        "extranet": false,
        "network": false,
        "bot": false,
        "connector": false,
        "external_auth_id": "default",
        "status": "online",
        "idle": false,
        "last_activity_date": "2026-03-02T09:30:00+03:00",
        "mobile_last_date": false,
        "desktop_last_date": false,
        "absent": false,
        "departments": [10],
        "phones": {
            "work_phone": "+71234567890",
            "personal_mobile": "+71234567890",
            "inner_phone": "21"
        },
        "website": "example.ru",
        "email": "user@example.ru",
        "bot_data": null,
        "type": "user"
    },
    "time": {
        "start": 1760000000.0,
        "finish": 1760000000.2,
        "duration": 0.2,
        "processing": 0.08,
        "date_start": "2026-03-02T09:30:00+03:00",
        "date_finish": "2026-03-02T09:30:00+03:00",
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
[`object`](../../data-types.md) | Объект с данными пользователя. 

Структура объекта подробно описана [ниже](#result-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result-object}

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
    "error": "ID_EMPTY",
    "error_description": "User ID can't be empty"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ID_EMPTY` | User ID can't be empty | Передан `ID <= 0` ||
|| `USER_NOT_EXISTS` | User is not exists | Пользователь с указанным `ID` не найден ||
|| `ACCESS_DENIED` | You can request only users who consist of your extranet group | Текущий экстранет-пользователь запрашивает пользователя не из своей экстранет-группы ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-user-list-get.md)
- [{#T}](./im-user-status-set.md)
- [{#T}](./im-user-status-get.md)
- [{#T}](./im-user-status-idle-start.md)
- [{#T}](./im-user-status-idle-end.md)
