# Создать хранилище данных entity.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь авторизованный в приложении

Метод `entity.add` создает новое хранилище данных приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %}


## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY**^*^
[`string`](../../data-types.md) | Символьный идентификатор хранилища. Это значение используйте в других методах раздела после создания хранилища.

Разрешены символы `a-z`, `A-Z`, `0-9`, `_`.

Ограничение длины рассчитывается динамически по формуле:
`50 - strlen("APP_<clientId>_")`. В большинстве случаев для Битрикс24 это 13 символов ||
|| **NAME**^*^
[`string`](../../data-types.md) | Название хранилища ||
|| **ACCESS**
[`object`](../../data-types.md) | Права доступа в формате `{"код_доступа":"уровень_права"}`.

Примеры кодов доступа:
- `U<id>` — пользователь, например `U1`
- `G<id>` — группа пользователей, например `G2`
- `AU` — все авторизованные пользователи

Метод принимает стандартные коды доступа Битрикс24. Проверить название кода можно методом [access.name](../../common/system/access-name.md).

Поддерживаемые уровни:
- `R` — чтение
- `W` — запись
- `X` — управление

Если передан другой уровень, такая запись права не будет добавлена

Создателю хранилища автоматически добавляется право `X` (`U<id>`)||
|#  

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример создания хранилища данных, где:
- `ENTITY` — идентификатор хранилища `dish`
- `NAME` — название хранилища `Dishes`
- `ACCESS` — права доступа: `U1` с уровнем `W` и `AU` с уровнем `R`

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","NAME":"Dishes","ACCESS":{"U1":"W","AU":"R"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'entity.add',
        params: {
          ENTITY: 'dish',
          NAME: 'Dishes',
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
        console.info('Entity created:', result)
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
      async function addEntity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'entity.add',
            params: {
              ENTITY: 'dish',
              NAME: 'Dishes',
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
          console.info('Entity created:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addEntity)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.add',
                [
                    'ENTITY' => 'dish',
                    'NAME' => 'Dishes',
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
        echo 'Error adding entity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.add',
        {
            ENTITY: 'dish',
            NAME: 'Dishes',
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
        'entity.add',
        [
            'ENTITY' => 'dish',
            'NAME' => 'Dishes',
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
    "result": true,
    "time": {
        "start": 1774255192,
        "finish": 1774255192.416864,
        "duration": 0.41686391830444336,
        "processing": 0,
        "date_start": "2026-03-23T11:39:52+03:00",
        "date_finish": "2026-03-23T11:39:52+03:00",
        "operating_reset_at": 1774255792,
        "operating": 0.11449217796325684
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат выполнения метода. Для успешного создания возвращается `true` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| `ERROR_ENTITY_ALREADY_EXISTS` | Entity already exists | Хранилище с таким `ENTITY` уже существует ||
|| `ERROR_CORE` | Internal error adding entity. Try adding again. | Внутренняя ошибка при создании хранилища ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-update.md)
- [{#T}](./entity-get.md)
- [{#T}](./entity-delete.md)
- [{#T}](./entity-rights.md)

