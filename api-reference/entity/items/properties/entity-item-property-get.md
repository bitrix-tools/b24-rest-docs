# Получить свойства элементов хранилища entity.item.property.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`entity`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, авторизованный в приложении

Метод `entity.item.property.get` возвращает свойства элементов хранилища данных приложения.

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
|| **PROPERTY**
[`string`](../../../data-types.md) | Код свойства.

Если параметр не передан, метод возвращает список всех свойств хранилища.

Разрешены символы `a-z`, `A-Z`, `0-9`, `_` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения списка свойств элементов, где `ENTITY` — идентификатор хранилища `dish`.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ENTITY":"dish","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/entity.item.property.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each PropertyItem returned in result[]
    type PropertyItem = {
      PROPERTY: string
      NAME: string
      TYPE: string
      SORT: string
    }

    try {
      const response = await $b24.actions.v2.call.make<PropertyItem[]>({
        method: 'entity.item.property.get',
        params: {
          ENTITY: 'dish',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.map(p => `${p.PROPERTY}: ${p.NAME} (${p.TYPE})`))
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
      async function getEntityItemProperties() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'entity.item.property.get',
            params: {
              ENTITY: 'dish',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.map(p => `${p.PROPERTY}: ${p.NAME} (${p.TYPE})`))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEntityItemProperties)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'entity.item.property.get',
                [
                    'ENTITY' => 'dish',
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
        echo 'Error getting entity item properties: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'entity.item.property.get',
        {
            ENTITY: 'dish',
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
        'entity.item.property.get',
        [
            'ENTITY' => 'dish',
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
            "PROPERTY": "test",
            "NAME": "Тестовое свойство",
            "TYPE": "S",
            "SORT": "100"
        },
        {
            "PROPERTY": "test1",
            "NAME": "Второе свойство",
            "TYPE": "N",
            "SORT": "200"
        }
    ],
    "time": {
        "start": 1774439396,
        "finish": 1774439396.082458,
        "duration": 0.0824580192565918,
        "processing": 0,
        "date_start": "2026-03-25T14:49:56+03:00",
        "date_finish": "2026-03-25T14:49:56+03:00",
        "operating_reset_at": 1774439996,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`result`](#result) | Корневой элемент ответа. Содержит объект свойства или массив свойств ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| `object`
[`property`](#property) | Возвращается, если передан параметр `PROPERTY` ||
|| [`property[]`](#property) | Возвращается, если параметр `PROPERTY` не передан ||
|#

#### Тип property {#property}

#|
|| **Название**
`тип` | **Описание** ||
|| **PROPERTY**
[`string`](../../../data-types.md) | Код свойства ||
|| **NAME**
[`string`](../../../data-types.md) | Название свойства ||
|| **TYPE**
[`string`](../../../data-types.md) | Тип свойства (`S`, `N`, `F`) ||
|| **SORT**
[`integer`](../../../data-types.md) | Индекс сортировки свойства ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_PROPERTY_NOT_FOUND",
    "error_description": "Property not found"
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
|| `ERROR_ENTITY_NOT_FOUND` | Entity not found | Хранилище с переданным `ENTITY` не найдено ||
|| `ERROR_PROPERTY_NOT_FOUND` | Property not found | Свойство с переданным `PROPERTY` не найдено ||
|| `ACCESS_DENIED` | Access denied! Application context required | Нет контекста приложения (`clientId`) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./entity-item-property-add.md)
- [{#T}](./entity-item-property-update.md)
- [{#T}](./entity-item-property-delete.md)
- [{#T}](./index.md)
