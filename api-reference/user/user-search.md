# Получить список пользователей с поиском по персональным данным user.search

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../scopes/permissions.md), [`user_brief`](../scopes/permissions.md), [`user_basic`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.search` ищет пользователей по имени, фамилии, отчеству, названию подразделения и должности.

{% note info "" %}

Перечень полей пользователей Битрикс24, который будет получен в результате выполнения метода, зависит от скоупа приложения/вебхука. Какие поля доступны в каждой версии — в статье [Версии скоупа user](user-scope.md).

{% endnote %}

Метод наследует поведение метода [user.get](./user-get.md), все параметры из этой функции также доступны.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FILTER**
[`object`](../data-types.md) | Объект с полями поиска [(подробное описание)](#filter) ||
|| **sort**
[`string`](../data-types.md) | Поле, по которому сортируются результаты. Сортировка работает по всем полям из [user.add](./user-add.md).

По умолчанию — `ID` ||
|| **order**
[`string`](../data-types.md) | Направление сортировки:
- `ASC` — по возрастанию
- `DESC` — по убыванию

По умолчанию — `ASC` ||
|| **ADMIN_MODE**
[`boolean`](../data-types.md) | Включает режим администратора для получения данных о пользователях. Параметр действует, только если запрос выполняет администратор.

По умолчанию — `false` ||
|| **select**
[`array`](../data-types.md) | Массив с названиями полей, которые вернутся в ответе. Без этого параметра метод возвращает все поля, доступные скоупу приложения или вебхука.

При выборке используйте маски:

- `*` — все доступные поля
- `UF_*` — все доступные пользовательские поля, в том числе созданные в Битрикс24

Недоступные скоупу и несуществующие поля метод пропускает без ошибки ||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы.

По умолчанию — `0` ||
|#

### Параметр FILTER {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **FIND**
[`string`](../data-types.md) | Строка для поиска одновременно по имени, фамилии, отчеству, должности и названию подразделения ||
|| **NAME**
[`string`](../data-types.md) | Имя пользователя ||
|| **LAST_NAME**
[`string`](../data-types.md) | Фамилия пользователя ||
|| **SECOND_NAME**
[`string`](../data-types.md) | Отчество пользователя ||
|| **WORK_POSITION**
[`string`](../data-types.md) | Должность пользователя ||
|| **UF_DEPARTMENT_NAME**
[`string`](../data-types.md) | Название подразделения ||
|| **USER_TYPE**
[`string`](../data-types.md) | Тип пользователя. Возможные значения:

- `employee` — сотрудник
- `extranet` — пользователь экстранета
- `email` — почтовый пользователь ||
|#

{% note info "" %}

Для поиска сразу по персональным данным передайте только `FIND`. Для поиска по конкретным полям не передавайте `FIND`, а укажите одно или несколько полей `NAME`, `LAST_NAME`, `SECOND_NAME`, `WORK_POSITION`, `UF_DEPARTMENT_NAME`.

Метод автоматически выбирает полнотекстовый поиск или поиск по началу строки `USER_NAME LIKE "Текст%"`. Поиск по началу строки работает быстрее двухстороннего `LIKE "%текст%"` и левостороннего `LIKE "%текст"` за счет индексации полей в базе данных.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "FILTER": {
            "FIND": "Иван"
        }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.search
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "FILTER": {
            "FIND": "Иван"
        },
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
      const response = await $b24.actions.v2.call.make<UserItem[]>({
        method: 'user.search',
        params: {
          FILTER: {
            FIND: 'Иван',
          },
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

          const response = await $b24.actions.v2.call.make({
            method: 'user.search',
            params: {
              FILTER: {
                FIND: 'Иван',
              },
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.search(
            filter={
                "FIND": "Иван",
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'user.search',
                [
                    'FILTER' => [
                        'FIND' => 'Иван',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
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
            "FILTER": {
                "FIND": "Иван"
            }
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
            "FILTER" => [
                "FIND" => "Иван",
            ],
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
        "total": 1,
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
[`object[]`](../data-types.md) | Массив пользователей, которые соответствуют условиям поиска [(подробное описание)](#result).

Набор полей зависит от скоупа и параметра `select` ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
|| **next**
[`integer`](../data-types.md) | Смещение следующей страницы. Поле отсутствует, если получена последняя страница ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

Метод возвращает поля, доступные скоупу приложения или вебхука. Полный перечень можно получить методом [user.fields](./user-fields.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор пользователя ||
|| **ACTIVE**
[`boolean`](../data-types.md) | Признак активности пользователя ||
|| **NAME**
[`string`](../data-types.md) | Имя пользователя ||
|| **LAST_NAME**
[`string`](../data-types.md) | Фамилия пользователя ||
|| **SECOND_NAME**
[`string`](../data-types.md) | Отчество пользователя ||
|| **EMAIL**
[`string`](../data-types.md) | Адрес электронной почты ||
|| **LAST_LOGIN**
[`datetime`](../data-types.md) | Дата и время последней авторизации ||
|| **DATE_REGISTER**
[`datetime`](../data-types.md) | Дата и время регистрации ||
|| **IS_ONLINE**
[`string`](../data-types.md) | Признак активности пользователя онлайн. Возможные значения:

- `Y` — пользователь онлайн
- `N` — пользователь не онлайн ||
|| **PERSONAL_BIRTHDAY**
[`date`](../data-types.md) | Дата рождения ||
|| **WORK_POSITION**
[`string`](../data-types.md) | Должность ||
|| **UF_DEPARTMENT**
[`integer[]`](../data-types.md) | Идентификаторы подразделений пользователя ||
|| **USER_TYPE**
[`string`](../data-types.md) | Тип пользователя: `employee`, `extranet` или `email` ||
|#

## Обработка ошибок

У метода нет специфичных ошибок.

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-add.md)
- [{#T}](./user-update.md)
- [{#T}](./user-get.md)
- [{#T}](./user-current.md)
- [{#T}](./user-fields.md)
