# Переименовать базу знаний note.collection.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Редактирование» для нужной базы знаний

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.collection.update` изменяет название существующей базы знаний.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор базы знаний.

Идентификатор можно получить методом [note.collection.list](./note-collection-list.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями, которые нужно изменить. [Описание структуры объекта](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Новое название базы знаний.

Название базы знаний не должно превышать 255 символов ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.collection.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42,"fields":{"name":"Документация продукта"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.collection.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42,"fields":{"name":"Документация продукта"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.collection.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CollectionUpdateResult = {
      item: {
        id: number
        name: string
        position: number
        policyLevel: string
        createdBy: number
        updatedBy: number
        createdAt: string
        updatedAt: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<CollectionUpdateResult>({
        method: 'note.collection.update',
        params: {
          id: 42,
          fields: {
            name: 'Документация продукта',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Collection updated:', result.item.id, result.item.name)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateCollection() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.collection.update',
            params: {
              id: 42,
              fields: {
                name: 'Документация продукта',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Collection updated:', result.item.id, result.item.name)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCollection)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.collection.update',
                [
                    'id' => 42,
                    'fields' => [
                        'name' => 'Документация продукта',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating collection: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'note.collection.update',
        {
            id: 42,
            fields: {
                name: 'Документация продукта'
            }
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
        'note.collection.update',
        [
            'id' => 42,
            'fields' => [
                'name' => 'Документация продукта'
            ]
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
        "item": {
            "id": 42,
            "name": "Документация продукта",
            "position": 100,
            "policyLevel": "view",
            "createdBy": 1,
            "createdAt": "2026-04-20T12:00:00Z",
            "updatedBy": 1,
            "updatedAt": "2026-04-21T09:15:30Z"
        }
    },
    "time": {
        "start": 1780388120,
        "finish": 1780388120.245321,
        "duration": 0.24532103538513184,
        "processing": 0.1812450885772705,
        "date_start": "2026-06-16T11:15:20+03:00",
        "date_finish": "2026-06-16T11:15:20+03:00",
        "operating_reset_at": 1780388720,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с результатом обновления базы знаний ||
|| **item**
[`object`](../../data-types.md) | Объект базы знаний после обновления ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор базы знаний ||
|| **name**
[`string`](../../data-types.md) | Название базы знаний ||
|| **position**
[`integer`](../../data-types.md) | Позиция базы знаний в общем списке ||
|| **policyLevel**
[`string`](../../data-types.md) | Базовая политика доступа базы знаний ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор автора базы знаний ||
|| **createdAt**
[`datetime`](../../data-types.md) | Дата и время создания базы знаний в UTC ||
|| **updatedBy**
[`integer`](../../data-types.md) | Идентификатор последнего редактора базы знаний ||
|| **updatedAt**
[`datetime`](../../data-types.md) | Дата и время последнего изменения базы знаний в UTC ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Обязательное поле `id` не указано",
                "field": "id"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id`
`fields` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `id` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|| `name` | Название базы знаний не может быть пустым | Передайте непустую строку в поле `fields.name` ||
|| `name` | Название базы знаний не должно превышать 255 символов | Сократите значение `fields.name` ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний или права изменять базу знаний ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | База знаний не найдена | Проверьте, что база знаний существует и доступна пользователю ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-collection-add.md)
- [{#T}](./note-collection-archive.md)
- [{#T}](./note-collection-delete.md)
- [{#T}](./index.md)
