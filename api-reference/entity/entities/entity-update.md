# Изменить параметры хранилища entity.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`entity`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `X` (управление) на хранилище данных

Метод `entity.update` обновляет параметры хранилища данных приложения.

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
|| **NAME**
[`string`](../../data-types.md) | Новое название хранилища ||
|| **ENTITY_NEW**
[`string`](../../data-types.md) | Новый идентификатор хранилища.

Используется для переименования кода хранилища.

Разрешены только символы `a-z`, `A-Z`, `0-9`, `_`.

Максимальная длина рассчитывается динамически по формуле:
`50 - strlen("APP_<clientId>_")`. В большинстве случаев для Битрикс24 это 13 символов ||
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

Если передан другой уровень, такая запись права не будет добавлена

При передаче `ACCESS` текущему пользователю принудительно добавляется право `X` (`U<id>`) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример обновления хранилища, где:
- `ENTITY` — идентификатор текущего хранилища `dish`
- `NAME` — новое название `Dishes v2`
- `ENTITY_NEW` — новый код хранилища `dish_v2`
- `ACCESS` — права доступа: `U1` с уровнем `W` и `AU` с уровнем `R`

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","NAME":"Dishes v2","ENTITY_NEW":"dish_v2","ACCESS":{"U1":"W","AU":"R"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.update
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
        method: 'entity.update',
        params: {
          ENTITY: 'dish',
          NAME: 'Dishes v2',
          ENTITY_NEW: 'dish_v2',
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
        console.info('entity.update result:', result)
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
      async function updateEntity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'entity.update',
            params: {
              ENTITY: 'dish',
              NAME: 'Dishes v2',
              ENTITY_NEW: 'dish_v2',
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
          console.info('entity.update result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateEntity)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.update',
                [
                    'ENTITY' => 'dish',
                    'NAME' => 'Dishes v2',
                    'ENTITY_NEW' => 'dish_v2',
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
        echo 'Error updating entity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.update',
        {
            ENTITY: 'dish',
            NAME: 'Dishes v2',
            ENTITY_NEW: 'dish_v2',
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
        'entity.update',
        [
            'ENTITY' => 'dish',
            'NAME' => 'Dishes v2',
            'ENTITY_NEW' => 'dish_v2',
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
        "start": 1774257803,
        "finish": 1774257803.550779,
        "duration": 0.5507791042327881,
        "processing": 0,
        "date_start": "2026-03-23T12:23:23+03:00",
        "date_finish": "2026-03-23T12:23:23+03:00",
        "operating_reset_at": 1774258403,
        "operating": 0.11757302284240723
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат выполнения метода. При успешном выполнении возвращается `true` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ENTITY_NOT_FOUND",
    "error_description": "Entity not found"
}
```

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
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_ENTITY_ALREADY_EXISTS` | Entity already exists | Хранилище с `ENTITY_NEW` уже существует ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY_NEW` ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для изменения хранилища ||
|| `ERROR_CORE` | Internal error updating entity. Try updating again. | Внутренняя ошибка при обновлении хранилища ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-add.md)
- [{#T}](./entity-get.md)
- [{#T}](./entity-delete.md)
- [{#T}](./entity-rights.md)

