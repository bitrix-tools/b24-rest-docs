# Найти сотрудников humanresources.employee.search

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь, привязанный к отделу в структуре компании

Метод `humanresources.employee.search` ищет сотрудников по имени.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Строка поиска по имени сотрудника ||
|| **nodeId**
[`integer`](../../../data-types.md) | Идентификатор отдела или команды для ограничения поиска.

Идентификатор можно получить методом [humanresources.node.list](../node/humanresources-node-list.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей сотрудника, которые нужно вернуть.

Доступные поля:

- `userId` — идентификатор пользователя
- `name` — имя сотрудника
- `workPosition` — должность
- `avatar` — ссылка на аватар
- `url` — ссылка на профиль
- `departments` — отделы сотрудника
- `teams` — команды сотрудника ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/humanresources.employee.search`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"Иван","select":["userId","name","workPosition","avatar","url","departments","teams"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.employee.search
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"Иван","select":["userId","name","workPosition","avatar","url","departments","teams"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.employee.search
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EmployeeSearchResult = {
      items: {
        userId: number
        name: string
        workPosition: string
        avatar: string
        url: string
        departments: { id: number; name: string }[]
        teams: { id: number; name: string }[]
      }[]
    }

    try {
      const response = await $b24.actions.v3.call.make<EmployeeSearchResult>({
        method: 'humanresources.employee.search',
        params: {
          name: 'Ivan',
          select: [
            'userId',
            'name',
            'workPosition',
            'avatar',
            'url',
            'departments',
            'teams',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.items)
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
      async function searchEmployees() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'humanresources.employee.search',
            params: {
              name: 'Ivan',
              select: [
                'userId',
                'name',
                'workPosition',
                'avatar',
                'url',
                'departments',
                'teams',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', searchEmployees)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.employee.search',
                [
                    'name' => 'Иван',
                    'select' => [
                        'userId',
                        'name',
                        'workPosition',
                        'avatar',
                        'url',
                        'departments',
                        'teams',
                    ],
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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.employee.search',
        {
            name: 'Иван',
            select: [
                'userId',
                'name',
                'workPosition',
                'avatar',
                'url',
                'departments',
                'teams'
            ]
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'humanresources.employee.search',
        [
            'name' => 'Иван',
            'select' => [
                'userId',
                'name',
                'workPosition',
                'avatar',
                'url',
                'departments',
                'teams',
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
    "result": {
        "items": [
            {
                "userId": 7,
                "name": "Иван Петров",
                "workPosition": "Менеджер по продажам",
                "avatar": "https://example.bitrix24.ru/upload/main/avatar.jpg",
                "url": "/company/personal/user/7/",
                "departments": [
                    {
                        "id": 15,
                        "name": "Отдел продаж"
                    }
                ],
                "teams": []
            }
        ]
    },
    "time": {
        "start": 1780407400,
        "finish": 1780407400.143201,
        "duration": 0.14320111274719238,
        "processing": 0.11092114448547363,
        "date_start": "2026-06-02T16:36:40+03:00",
        "date_finish": "2026-06-02T16:36:40+03:00",
        "operating_reset_at": 1780408000,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **items**
[`array`](../../../data-types.md) | Массив найденных сотрудников. Состав полей элемента зависит от `select` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Parameter \"name\" is required.",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Parameter `"name"` is required. | Передайте строку поиска ||
|#

#### Ошибки в параметре `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для объекта `EmployeeDto` | Передайте только поля сотрудника из списка ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что текущий пользователь является сотрудником Битрикс24 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-employee-subordinates.md)
- [{#T}](./humanresources-employee-count.md)
- [{#T}](./index.md)
