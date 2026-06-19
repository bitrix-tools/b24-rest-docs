# Переместить отдел humanresources.node.move

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование отделов» или «Редактирование команд»

Метод `humanresources.node.move` меняет родительский отдел для отдела или команды.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор отдела или команды, который нужно переместить.

Идентификатор можно получить методом [humanresources.node.list](./humanresources-node-list.md) ||
|| **parentId***
[`integer`](../../../data-types.md) | Идентификатор нового родительского отдела.

Идентификатор можно получить методом [humanresources.node.list](./humanresources-node-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.move`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":44,"parentId":2}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.move
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":44,"parentId":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.move
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NodeMoveResult = {
      id: number
      name: string
      type: string
      structureId: number
      parentId: number
      description: string
      accessCode: string
      userCount: number
      colorName: string | null
      xmlId: string | null
      createdAt: ISODate | null
      updatedAt: ISODate | null
    }

    try {
      const response = await $b24.actions.v3.call.make<NodeMoveResult>({
        method: 'humanresources.node.move',
        params: {
          id: 44,
          parentId: 2,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Department moved, id:', result.id, 'parentId:', result.parentId)
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
      async function moveNode() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'humanresources.node.move',
            params: {
              id: 44,
              parentId: 2,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Department moved, id:', result.id, 'parentId:', result.parentId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', moveNode)
    </script>
    ```

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.node.move',
                [
                    'id' => 44,
                    'parentId' => 2,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error moving department: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.move',
        {
            id: 44,
            parentId: 2
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
        'humanresources.node.move',
        [
            'id' => 44,
            'parentId' => 2
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
        "id": 44,
        "name": "Отдел продаж B2B",
        "type": "DEPARTMENT",
        "structureId": 1,
        "parentId": 2,
        "description": "Работа с корпоративными клиентами",
        "accessCode": "DR44",
        "userCount": 18,
        "colorName": null,
        "xmlId": null,
        "createdAt": "2026-05-30T09:20:15+03:00",
        "updatedAt": "2026-06-02T14:40:18+03:00"
    },
    "time": {
        "start": 1780400418,
        "finish": 1780400418.402915,
        "duration": 0.40291500091552734,
        "processing": 0.3614809513092041,
        "date_start": "2026-06-02T14:40:18+03:00",
        "date_finish": "2026-06-02T14:40:18+03:00",
        "operating_reset_at": 1780401018,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными перемещенного отдела или команды ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор отдела или команды ||
|| **name**
[`string`](../../../data-types.md) | Название отдела или команды ||
|| **type**
[`string`](../../../data-types.md) | Тип элемента структуры ||
|| **structureId**
[`integer`](../../../data-types.md) | Идентификатор структуры компании ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор нового родительского отдела ||
|| **description**
[`string`](../../../data-types.md) | Описание отдела или команды||
|| **accessCode**
[`string`](../../../data-types.md) | Код доступа отдела или команды ||
|| **userCount**
[`integer`](../../../data-types.md) | Количество пользователей в отделе или команде ||
|| **colorName**
[`string`](../../../data-types.md) | Цвет команды, если он задан ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний идентификатор отдела или команды ||
|| **createdAt**
[`datetime`](../../../data-types.md) | Дата и время создания отдела или команды ||
|| **updatedAt**
[`datetime`](../../../data-types.md) | Дата и время последнего обновления отдела или команды ||
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
                "message": "Обязательное поле `parentId` не указано",
                "field": "parentId"
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
|| `id`
`parentId` | Обязательное поле `#FIELD#` не указано | Добавьте указанное поле в тело запроса ||
|| `#FIELD#` | В поле `#FIELD#` требуется тип данных `#TYPE#` для такого запроса | Убедитесь, что передаваемое значение нужного типа ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права перемещать элемент структуры в указанный родительский отдел ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Проверьте scope `humanresources` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-edit.md)
- [{#T}](./humanresources-node-get.md)
- [{#T}](./index.md)
