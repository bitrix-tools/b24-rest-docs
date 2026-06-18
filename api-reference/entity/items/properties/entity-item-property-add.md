# Добавить свойство элементов хранилища entity.item.property.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с уровнем права `X` (управление) в хранилище данных

Метод `entity.item.property.add` добавляет свойство элементов хранилища данных приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../../../settings/app-installation/index.md).

{% endnote %}


## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY**^*^
[`string`](../../../data-types.md) | Идентификатор хранилища данных приложения. Используйте значение, которое указали при создании хранилища.

Получить идентификатор можно методом [entity.get](../../entities/entity-get.md) ||
|| **PROPERTY**^*^
[`string`](../../../data-types.md) | Код нового свойства.

Разрешены символы `a-z`, `A-Z`, `0-9`, `_` ||
|| **NAME**
[`string`](../../../data-types.md) | Название свойства ||
|| **TYPE**
[`string`](../../../data-types.md) | Тип свойства:
- `S` — строка
- `N` — число
- `F` — файл ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример добавления свойства, где:
- `ENTITY` — идентификатор хранилища `dish`
- `PROPERTY` — код свойства `new_prop`
- `NAME` — название свойства
- `TYPE` — тип `S`
- `SORT` — индекс сортировки

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","PROPERTY":"new_prop","NAME":"Новое свойство","TYPE":"S","SORT":100,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.item.property.add
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
        method: 'entity.item.property.add',
        params: {
          ENTITY: 'dish',
          PROPERTY: 'new_prop',
          NAME: 'New property',
          TYPE: 'S',
          SORT: 100,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Property added:', result)
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
      async function addEntityItemProperty() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'entity.item.property.add',
            params: {
              ENTITY: 'dish',
              PROPERTY: 'new_prop',
              NAME: 'New property',
              TYPE: 'S',
              SORT: 100,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Property added:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addEntityItemProperty)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.item.property.add',
                [
                    'ENTITY' => 'dish',
                    'PROPERTY' => 'new_prop',
                    'NAME' => 'Новое свойство',
                    'TYPE' => 'S',
                    'SORT' => 100,
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
        echo 'Error adding entity item property: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.property.add',
        {
            ENTITY: 'dish',
            PROPERTY: 'new_prop',
            NAME: 'Новое свойство',
            TYPE: 'S',
            SORT: 100,
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
        'entity.item.property.add',
        [
            'ENTITY' => 'dish',
            'PROPERTY' => 'new_prop',
            'NAME' => 'Новое свойство',
            'TYPE' => 'S',
            'SORT' => 100,
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
        "start": 1774440592,
        "finish": 1774440592.563202,
        "duration": 0.563201904296875,
        "processing": 0,
        "date_start": "2026-03-25T15:09:52+03:00",
        "date_finish": "2026-03-25T15:09:52+03:00",
        "operating_reset_at": 1774441192,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат добавления свойства (`true` — успешно) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_PROPERTY_ALREADY_EXISTS",
    "error_description": "Property already exists"
}
```

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Argument 'ENTITY' is null or empty",
    "argument": "ENTITY"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_ARGUMENT` | Argument 'ENTITY' is null or empty | Параметр `ENTITY` не передан или пустой после очистки ||
|| `ERROR_ARGUMENT` | Entity code is too long. Max length is N characters. | Слишком длинное значение `ENTITY` ||
|| `ERROR_ARGUMENT` | Argument 'PROPERTY' is null or empty | Параметр `PROPERTY` не передан ||
|| `ERROR_ARGUMENT` | Wrong entity item property type | Передан недопустимый тип `TYPE` ||
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_PROPERTY_ALREADY_EXISTS` | Property already exists | Свойство с переданным `PROPERTY` уже существует ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав для добавления свойства ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|| `ERROR_UNSUPPORTED_PROPERTY_TYPE` | Недопустимый тип свойства | Попытка создать свойство с типом `L` ||
|| `ERROR_CORE` | Internal error adding entity property. Try adding again. | Внутренняя ошибка при добавлении свойства ||
|| `ERROR_CORE` | Код свойства не может начинаться с цифры | Передан некорректный код свойства в `PROPERTY` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-item-property-get.md)
- [{#T}](./entity-item-property-update.md)
- [{#T}](./entity-item-property-delete.md)
- [{#T}](./index.md)
