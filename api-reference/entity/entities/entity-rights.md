# Получить или изменить права доступа entity.rights

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - получить текущие права может любой пользователь
> - изменить права может пользователь с уровнем права `X` (управление) на хранилище данных

Метод `entity.rights` получает текущий набор прав доступа к хранилищу данных приложения или изменяет его.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %}


## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Идентификатор хранилища данных приложения. Используйте значение, которое указали при создании хранилища. 

Получить идентификатор можно методом [entity.get](./entity-get.md) ||
|| **ACCESS**
[`object`](../../data-types.md) | Новый набор прав в формате `{"код_доступа":"уровень_права"}`.

Примеры кодов доступа:
- `U<id>` — пользователь, например `U1`
- `G<id>` — группа пользователей, например `G2`
- `AU` — все авторизованные пользователи

Метод принимает стандартные коды доступа Битрикс24. Проверить название кода можно методом [access.name](../../common/system/access-name.md).

Поддерживаемые уровни:
- `R` — чтение
- `W` — запись
- `X` — управление

Если передан другой уровень, такая запись права не будет добавлена.

При передаче `ACCESS` текущему пользователю принудительно добавляется право `X` (`U<id>`).

Если параметр не передан, метод возвращает текущий набор прав доступа. ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример изменения прав доступа, где:
- `ENTITY` — идентификатор хранилища `dish`
- `ACCESS` — новый набор прав: `U1` с уровнем `W` и `AU` с уровнем `R`

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","ACCESS":{"U1":"W","AU":"R"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.rights
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EntityRightsResult = Record<string, string> | null

    try {
      const response = await $b24.actions.v2.call.make<EntityRightsResult>({
        method: 'entity.rights',
        params: {
          ENTITY: 'dish',
          ACCESS: {
            U1: 'W',
            AU: 'R',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Access rights:', result)
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
      async function setEntityRights() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'entity.rights',
            params: {
              ENTITY: 'dish',
              ACCESS: {
                U1: 'W',
                AU: 'R',
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
          console.info('Access rights:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setEntityRights)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.rights',
                [
                    'ENTITY' => 'dish',
                    'ACCESS' => [
                        'U1' => 'W',
                        'AU' => 'R',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting entity rights: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.rights',
        {
            ENTITY: 'dish',
            ACCESS: {
                U1: 'W',
                AU: 'R',
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'entity.rights',
        [
            'ENTITY' => 'dish',
            'ACCESS' => [
                'U1' => 'W',
                'AU' => 'R',
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
        "U1": "W",
        "AU": "R",
        "U577": "X"
    },
    "time": {
        "start": 1774267885,
        "finish": 1774267885.803565,
        "duration": 0.8035650253295898,
        "processing": 0,
        "date_start": "2026-03-23T15:11:25+03:00",
        "date_finish": "2026-03-23T15:11:25+03:00",
        "operating_reset_at": 1774268485,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`result`](#result) | Корневой элемент ответа. Содержит актуальный набор прав доступа к хранилищу ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
||
[`object`](../../data-types.md) | Объект прав доступа в формате `{"код_доступа":"уровень_права"}`, где уровень права — `R`, `W` или `X` ||
||
`null` | Возвращается, если хранилище с переданным `ENTITY` не найдено ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'ENTITY' is null or empty",
    "argument": "ENTITY"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is 13 characters. | Слишком длинное значение `ENTITY` ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для изменения прав доступа хранилища ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-add.md)
- [{#T}](./entity-update.md)
- [{#T}](./entity-get.md)
- [{#T}](./entity-delete.md)
