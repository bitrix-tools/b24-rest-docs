# Добавить пользователя к существующему чату imopenlines.crm.chat.user.add

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к объекту CRM

Метод `imopenlines.crm.chat.user.add` добавляет пользователя в чат, привязанный к объекту CRM.

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
[`integer`](../../../data-types.md) | Идентификатор пользователя или бота, которого нужно добавить в чат.

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
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.crm.chat.user.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1205,"USER_ID":503,"CHAT_ID":1763,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imopenlines.crm.chat.user.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.crm.chat.user.add',
            {
                CRM_ENTITY_TYPE: 'lead',
                CRM_ENTITY: 1205,
                USER_ID: 503,
                CHAT_ID: 1763
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.crm.chat.user.add',
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
        'imopenlines.crm.chat.user.add',
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
        'imopenlines.crm.chat.user.add',
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
        "start": 1773814042,
        "finish": 1773814043.189039,
        "duration": 1.1890389919281006,
        "processing": 0,
        "date_start": "2026-03-18T09:07:22+03:00",
        "date_finish": "2026-03-18T09:07:23+03:00",
        "operating_reset_at": 1773814643,
        "operating": 0.16756796836853027
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор чата, в который добавлен пользователь.

Если `CHAT_ID` не передан и чат для объекта CRM не найден или не существует, метод вернет `"result":0` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "CHAT_NOT_IN_CRM",
    "error_description": "Chat does not belong to the CRM entity being checked"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! You don't have access to join user to chat | У пользователя, который выполняет метод, нет прав добавлять пользователей в чат объекта CRM ||
|| `403` | `ACCESS_DENIED` | Access denied! This user does not have access to the chat because he does not have access to this CRM entity | У пользователя `USER_ID` нет доступа к объекту CRM ||
|| `400` | `ERROR_ARGUMENT` | Argument CRM_ENTITY_TYPE is null or empty | Не передан обязательный параметр `CRM_ENTITY_TYPE` ||
|| `400` | `ERROR_ARGUMENT` | Argument CRM_ENTITY is null or empty | Не передан обязательный параметр `CRM_ENTITY` ||
|| `400` | `ERROR_ARGUMENT` | The value of an argument `CRM_ENTITY` has an invalid type | Параметр `CRM_ENTITY` передан в неверном формате ||
|| `400` | `ERROR_ARGUMENT` | Argument Empty USER_ID is null or empty | Не передан обязательный параметр `USER_ID` ||
|| `400` | `IM_NOT_INSTALLED` | Module im is not installed | Модуль `im` не установлен ||
|| `400` | `CHAT_NOT_IN_CRM` | Chat does not belong to the CRM entity being checked | Чат `CHAT_ID` не связан с объектом CRM ||
|| `400` | `CRM_CHAT_USER_NOT_ACTIVE` | Current user has no access to users list outside open line | У текущего пользователя нет доступа к списку пользователей вне линии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-crm-chat-get-last-id.md)
- [{#T}](./imopenlines-crm-chat-get.md)
- [{#T}](./imopenlines-crm-chat-user-delete.md)
