# Получить список ролей landing.role.getList

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или пользователь с правом «полный доступ» к разделу «Сайты и магазины»

Метод `landing.role.getList` получает список ролей доступа для выбранного типа сайтов. 

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Тип сайтов, для которого нужно получить роли. Параметр не связан с REST-скоупом `landing` в названии метода.

Значения `GROUP`, `KNOWLEDGE` и `MAINPAGE` соответствуют типам сайтов из статьи [Работа с типами сайтов и скоупами](../../types.md).

Возможные значения:
`GROUP` - роли для сайтов групп
`KNOWLEDGE` - роли для баз знаний
`MAINPAGE` - роли для главной страницы или вайба

По умолчанию метод возвращает роли для сайтов и интернет-магазинов. Так будет, если параметр не передать или указать неподдерживаемое значение ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "scope": "KNOWLEDGE"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.role.getList.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "scope": "KNOWLEDGE",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.role.getList.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each role returned in result[]
    type RoleItem = {
      ID: string,
      TITLE: string,
      XML_ID: string,
    }

    try {
      // landing.role.getList returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<RoleItem[]>({
        method: 'landing.role.getList',
        params: {
          scope: 'KNOWLEDGE',
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Roles:', result, 'Count:', result.length)
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
      async function getRoleList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // landing.role.getList returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'landing.role.getList',
            params: {
              scope: 'KNOWLEDGE',
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
          console.info('Roles:', result, 'Count:', result.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getRoleList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.role.getList',
                [
                    'scope' => 'KNOWLEDGE',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting role list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.getList',
        {
            scope: 'KNOWLEDGE'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.role.getList',
        [
            'scope' => 'KNOWLEDGE',
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "3",
            "TITLE": "Администратор",
            "XML_ID": "ADMIN"
        },
        {
            "ID": "5",
            "TITLE": "Менеджер",
            "XML_ID": "MANAGER"
        }
    ],
    "time": {
        "start": 1775062049,
        "finish": 1775062049.634052,
        "duration": 0.634052038192749,
        "processing": 0,
        "date_start": "2026-04-01T19:47:29+03:00",
        "date_finish": "2026-04-01T19:47:29+03:00",
        "operating_reset_at": 1775062649,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Список ролей выбранного типа сайтов [(подробное описание)](#role).

Если роли не найдены, метод возвращает `result: []` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект role {#role}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../../data-types.md) | Идентификатор роли. Используйте его в методах [landing.role.getRights](./landing-role-get-rights.md), [landing.role.setAccessCodes](./landing-role-set-access-codes.md) и [landing.role.setRights](./landing-role-set-rights.md) ||
|| **TITLE**
[`string`](../../../data-types.md) | Название роли в интерфейсе ||
|| **XML_ID**
[`string`](../../../data-types.md) | Системный код роли.

Возможные значения для автоматически созданных стандартных ролей:
`ADMIN` - администратор
`MANAGER` - менеджер ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "IS_NOT_ADMIN",
    "error_description": "Для совершения действия необходимо быть администратором."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Нет авторизации или недостаточно прав для работы с модулем «Сайты и магазины» ||
|| `IS_NOT_ADMIN` | Для метода нужны права администратора или право «полный доступ» к разделу «Сайты и магазины» ||
|| `FEATURE_NOT_AVAIL` | На текущем тарифе недоступно управление правами в разделе «Сайты и магазины» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-role-get-rights.md)
- [{#T}](./landing-role-set-access-codes.md)
- [{#T}](./landing-role-set-rights.md)
