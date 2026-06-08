# Получить список пользователей с поиском по персональным данным user.search

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../scopes/permissions.md), [`user_brief`](../scopes/permissions.md), [`user_basic`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.search` позволяет получить список пользователей с ускоренным поиском по персональным данным (имя, фамилия, отчество, название подразделения, должность). Работает в двух режимах: быстро с помощью **Fulltext Index** и более медленный вариант через [правый LIKE](*ключ_правый LIKE) (поддержка определяется автоматически).

{% note info "" %}

Перечень полей пользователей Битрикс24, который будет получен в результате выполнения метода, зависит от скоупа приложения/вебхука. Подробности о доступе к данным пользователей можно узнать в [статье](index.md).

{% endnote %}

Метод наследует поведение метода [user.get](./user-get.md), все параметры из этой функции также доступны.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FILTER**
[`string`](../data-types.md) | Массив может содержать поля в любом сочетании:
- `NAME` — имя
- `LAST_NAME` — фамилия
- `WORK_POSITION` — должность
- `UF_DEPARTMENT_NAME` — название подразделения
- `USER_TYPE` — тип пользователя. Может принимать следующие значения: 
    - `employee` — сотрудник
    - `extranet` — пользователь экстранета
    - `email` — почтовый пользователь

Или `FIND` — поле, которое будет искать во всех перечисленных полях.

{% note info "" %}

Метод может работать либо с фильтрацией с помощью ключа FIND или со всеми другими полями. Одновременно использовать FIND и любое другое поле нельзя.

{% endnote %} ||
|| **sort**
[`string`](../data-types.md) | Поле, по которому сортируются результаты. Сортировка работает по всем полям из [user.add](./user-add.md) ||
|| **order**
[`string`](../data-types.md) | Направление сортировки:
- `ASC` — по возрастанию
- `DESC` — по убыванию ||
|| **ADMIN_MODE**
[`boolean`](../data-types.md) | [Ключ для работы](*ключ_Ключ для работы) в режиме администратора. Служит для получения данных о любых пользователях ||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "UF_DEPARTMENT": 1,
        "SORT": "ID",
        "ORDER": "asc",
        "start": 10
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.search
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "UF_DEPARTMENT": 1,
        "SORT": "ID",
        "ORDER": "asc",
        "start": 10,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.search
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each user object returned in result[]
    type UserItem = {
      ID: string
      ACTIVE: boolean
      NAME: string
      LAST_NAME: string
      SECOND_NAME?: string
      EMAIL: string
      LAST_LOGIN: ISODate | ''
      DATE_REGISTER: ISODate | ''
      IS_ONLINE: string
      PERSONAL_BIRTHDAY?: ISODate | ''
      WORK_POSITION?: string
      UF_DEPARTMENT?: number[]
      USER_TYPE: 'employee' | 'extranet' | 'email'
    }

    try {
      // user.search returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<UserItem[]>({
        method: 'user.search',
        params: {
          UF_DEPARTMENT: 1,
          SORT: 'ID',
          ORDER: 'asc',
          start: 10,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Users found on this page:', result.length, result)
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
      async function searchUsers() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // user.search returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'user.search',
            params: {
              UF_DEPARTMENT: 1,
              SORT: 'ID',
              ORDER: 'asc',
              start: 10,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Users found on this page:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', searchUsers)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'user.search',
                [
                    'UF_DEPARTMENT' => 1,
                    'SORT'         => 'ID',
                    'ORDER'        => 'asc',
                    'start'        => 10,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error searching for users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "user.search",
        {
            "UF_DEPARTMENT": 1,
            "SORT": "ID",
            "ORDER": "asc"
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
                return;
            }

            console.dir(result.data());

            if (result.more())
            {
                result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.search',
        [
            "UF_DEPARTMENT" => 1,
            "SORT" => 'ID',
            "ORDER" => 'asc',
            "start" => 10
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
                "ID": "1",
                "ACTIVE": true,
                "NAME": "Вадим",
                "LAST_NAME": "Валеев",
                "SECOND_NAME": "",
                "EMAIL": "v.r.valeev@bitrix.com",
                "LAST_LOGIN": "2024-07-25T13:06:54+00:00",
                "DATE_REGISTER": "2024-07-15T00:00:00+00:00",
                "TIME_ZONE": "",
                "IS_ONLINE": "Y",
                "TIMESTAMP_X": {
                },
                "LAST_ACTIVITY_DATE": {
                },
                "PERSONAL_GENDER": "",
                "PERSONAL_WWW": "",
                "PERSONAL_BIRTHDAY": "2018-07-14T00:00:00+00:00",
                "PERSONAL_MOBILE": "",
                "PERSONAL_CITY": "",
                "WORK_PHONE": "",
                "WORK_POSITION": "",
                "UF_EMPLOYMENT_DATE": "",
                "UF_DEPARTMENT": [1],
                "USER_TYPE": "employee"
            },
            {
                "ID": "3",
                "ACTIVE": true,
                "NAME": "Иван",
                "LAST_NAME": "Иванов",
                "EMAIL": "test@gmail.com",
                "LAST_LOGIN": "2024-07-24T09:01:55+00:00",
                "DATE_REGISTER": "2024-07-22T00:00:00+00:00",
                "IS_ONLINE": "N",
                "TIMESTAMP_X": {
                },
                "LAST_ACTIVITY_DATE": {
                },
                "PERSONAL_GENDER": "",
                "PERSONAL_BIRTHDAY": "",
                "WORK_POSITION": "",
                "UF_EMPLOYMENT_DATE": "",
                "UF_DEPARTMENT": [1],
                "USER_TYPE": "employee"
            }
        ],
        "total": 2,
        "time": {
            "start": 1721913235.39648,
            "finish": 1721913235.45078,
            "duration": 0.05430006980896,
            "processing": 0.0187909603118897,
            "date_start": "2024-07-25T13:13:55+00:00",
            "date_finish": "2024-07-25T13:13:55+00:00",
            "operating": 0
        }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа, который содержит отфильтрованный список пользователей ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-add.md)
- [{#T}](./user-update.md)
- [{#T}](./user-get.md)
- [{#T}](./user-current.md)
- [{#T}](./user-fields.md)

[*ключ_правый LIKE]: USER_NAME LIKE "Текст%" - это называется правый лайк, когда поиск осуществляется только по тексту который начинается на заданную фразу, но может содержать разные окончания - такой поиск существенно быстрее чем у двухстороннего лайка "%текст%" или левостороннего "%текст" - за счет архитектуры хранения идексированных полей в БД.