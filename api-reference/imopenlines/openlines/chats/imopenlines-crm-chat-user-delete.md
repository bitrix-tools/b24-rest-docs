# Удалить пользователя из чата imopenlines.crm.chat.user.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к объекту CRM

Метод `imopenlines.crm.chat.user.delete` удаляет пользователя из чата, привязанного к объекту CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CRM_ENTITY_TYPE***
[`string`](../../../data-types.md) | Тип объекта CRM. Возможные значения:
- `lead` — лид
- `deal` — сделка
- `company` — компания
- `contact` — контакт ||
|| **CRM_ENTITY***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM.

Получить идентификатор можно универсальным методом [получения списка элементов CRM](../../../crm/universal/crm-item-list.md) ||
|| **USER_ID***
[`integer`](../../../data-types.md) | Идентификатор пользователя или бота, которого нужно удалить из чата.

Получить идентификатор пользователя позволяют методы [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md) ||
|| **CHAT_ID**
[`integer`](../../../data-types.md) | Идентификатор чата. 

По умолчанию используется последний чат, привязанный к объекту CRM.

Получить идентификаторы чатов, привязанных к объекту CRM можно методом [imopenlines.crm.chat.get](./imopenlines-crm-chat-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1205,"USER_ID":503,"CHAT_ID":1763}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.crm.chat.user.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1205,"USER_ID":503,"CHAT_ID":1763,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imopenlines.crm.chat.user.delete
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'imopenlines.crm.chat.user.delete',
        params: {
          CRM_ENTITY_TYPE: 'lead',
          CRM_ENTITY: 1205,
          USER_ID: 503,
          CHAT_ID: 1763,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Chat ID from which the user was removed:', result)
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
      async function deleteUserFromChat() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.crm.chat.user.delete',
            params: {
              CRM_ENTITY_TYPE: 'lead',
              CRM_ENTITY: 1205,
              USER_ID: 503,
              CHAT_ID: 1763,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Chat ID from which the user was removed:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteUserFromChat)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.crm.chat.user.delete',
                [
                    'CRM_ENTITY_TYPE' => 'lead',
                    'CRM_ENTITY' => 1205,
                    'USER_ID' => 503,
                    'CHAT_ID' => 1763,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.crm.chat.user.delete',
        {
            CRM_ENTITY_TYPE: 'lead',
            CRM_ENTITY: 1205,
            USER_ID: 503,
            CHAT_ID: 1763
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imopenlines.crm.chat.user.delete',
        [
            'CRM_ENTITY_TYPE' => 'lead',
            'CRM_ENTITY' => 1205,
            'USER_ID' => 503,
            'CHAT_ID' => 1763,
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 1763,
    "time": {
        "start": 1773814361,
        "finish": 1773814361.128245,
        "duration": 0.12824511528015137,
        "processing": 0,
        "date_start": "2026-03-18T09:12:41+03:00",
        "date_finish": "2026-03-18T09:12:41+03:00",
        "operating_reset_at": 1773814961,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор чата, из которого удален пользователь.

Если `CHAT_ID` не передан и чат для объекта CRM не найден или не существует, метод вернет `"result":0` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "The value of an argument CRM_ENTITY has an invalid type"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! You don't have access to join user to chat | Возможные причины:
- указан неверный или несуществующий `CRM_ENTITY_TYPE` 
- у пользователя, который выполняет метод, нет доступа к объекту CRM
||
|| `400` | `CRM_CHAT_EMPTY_USER` | User identifier is not specified | Не указан обязательный параметр `USER_ID` ||
|| `400` | `CRM_CHAT_EMPTY_CRM_DATA` | Empty CRM datad | Не переданы обязательные параметры `CRM_ENTITY_TYPE` и `CRM_ENTITY` ||
|| `400` | `CRM_CHAT_EMPTY_CRM_DATA` | CRM data is not specified | Не переданы данные CRM ||
|| `400` | `ERROR_ARGUMENT` | The value of an argument CRM_ENTITY has an invalid type | Параметр `CRM_ENTITY` передан в неверном формате ||
|| `400` | `IM_NOT_INSTALLED` | Module im is not installed | Модуль `im` не установлен ||
|| `400` | `CHAT_NOT_IN_CRM` | Chat does not belong to the CRM entity being checked | Возможные причины:
- чат не связан с объектом CRM
- чат с указанным `CHAT_ID` не существует ||
|| `403` | `CHAT_DELETE_USER_PERMISSION_DENIED` | You don't have access to delete a user from this chat | У пользователя нет доступа к удалению участника из чата ||
|| `400` | `CRM_CHAT_USER_NOT_ACTIVE` | Chat user is not active | Удаляемый пользователь `USER_ID` не активен или не существует ||
|| `400` | `WRONG_REQUEST` | You don't have access or user already not in chat | Пользователь уже удален из чата или недоступен для удаления ||
|| `400` | `USER_NOT_FOUND` | Указанный пользователь не состоит в чате | Пользователь с идентификатором `CHAT_ID` не состоит в указанном чате ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-crm-chat-get-last-id.md)
- [{#T}](./imopenlines-crm-chat-get.md)
- [{#T}](./imopenlines-crm-chat-user-add.md)
