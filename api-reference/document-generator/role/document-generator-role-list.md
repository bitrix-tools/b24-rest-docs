# Получить список ролей documentgenerator.role.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение настроек генератора документов

Метод `documentgenerator.role.list` возвращает список ролей без детализации прав.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N — 1) * 50`, где `N` — номер нужной страницы ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.role.list
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.role.list
  ```

- JS (TS)

  ```ts
  // This snippet is an ES module: top-level await requires type="module" or a bundler.
  // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
  import { Text } from '@bitrix24/b24jssdk'
  import type { B24Frame } from '@bitrix24/b24jssdk'

  declare const $b24: B24Frame

  type RoleItem = {
    id: number
    name: string
    code: string
  }

  // Shape of the payload returned in result (match the "response handling" section of the page)
  type RoleListResult = {
    roles: RoleItem[]
  }

  try {
    // documentgenerator.role.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
    const response = await $b24.actions.v2.call.make<RoleListResult>({
      method: 'documentgenerator.role.list',
      params: {
        start: 0,
      },
      requestId: Text.getUuidRfc4122()
    })

    // The payload is available only on a successful response
    if (!response.isSuccess) {
      console.error(response.getErrorMessages().join('; '))
    } else {
      const result = response.getData()!.result
      console.info(result.roles.length, result.roles)
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
    async function listRoles() {
      try {
        // Initialize the SDK inside a Bitrix24 frame
        const $b24 = await B24Js.initializeB24Frame()

        // documentgenerator.role.list returns a single page (max 50 records). For the whole result set
        // use a list helper: $b24.actions.v2.callList.make() returns every record as one
        // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
        // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
        // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
        const response = await $b24.actions.v2.call.make({
          method: 'documentgenerator.role.list',
          params: {
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
        console.info(result.roles.length, result.roles)
      } catch (error) {
        // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
        console.error(error)
      }
    }

    document.addEventListener('DOMContentLoaded', listRoles)
  </script>
  ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.role.list',
          [
              'start' => 0,
          ]
      );

      $result = $response->getResponseData()->getResult();
      print_r($result);
  } catch (Throwable $e) {
      echo $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'documentgenerator.role.list',
      {},
      function(result)
      {
          if (result.error())
          {
              console.error(result.error());
          }
          else
          {
              console.log(result.data());

              if (result.more())
              {
                  result.next();
              }
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'documentgenerator.role.list',
      [
          'start' => 0,
      ]
  );

  print_r($result);
  ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "roles": [
            {
                "id": 1,
                "name": "Администратор",
                "code": "ADMIN"
            },
            {
                "id": 3,
                "name": "Менеджер",
                "code": "MANAGER"
            },
            {
                "id": 9,
                "name": "Редакторы своих шаблонов",
                "code": "DOCGEN_TEMPLATE_EDITORS"
            }
        ]
    },
    "total": 3,
    "time": {
        "start": 1774015085,
        "finish": 1774015085.612552,
        "duration": 0.6125519275665283,
        "processing": 0,
        "date_start": "2026-03-20T16:58:05+03:00",
        "date_finish": "2026-03-20T16:58:05+03:00",
        "operating_reset_at": 1774015685,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **total**
[`integer`](../../data-types.md) | Количество ролей в текущей выборке ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **roles**
[`array`](../../data-types.md) | Список ролей [(подробное описание)](#roles) ||
|#

#### Элемент массива roles {#roles}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор роли ||
|| **name**
[`string`](../../data-types.md) | Название роли ||
|| **code**
[`string`](../../data-types.md) | Символьный код роли ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "0",
    "error_description": "You do not have permissions to modify settings"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | You do not have permissions to modify settings | Недостаточно прав на изменение настроек генератора документов ||
|| `403` | `DOCGEN_ACCESS_ERROR` | Your plan does not support this operation | На тарифе недоступна функция разграничения прав для генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-role-add.md)
- [{#T}](./document-generator-role-update.md)
- [{#T}](./document-generator-role-get.md)
- [{#T}](./document-generator-role-delete.md)
- [{#T}](./document-generator-role-fill-accesses.md)
