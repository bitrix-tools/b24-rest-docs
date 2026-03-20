# Получить Id последнего чата imopenlines.crm.chat.getLastId

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с доступом к объекту CRM

Метод `imopenlines.crm.chat.getLastId` получает идентификатор последнего чата, который привязан к объекту CRM.

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
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1205}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.crm.chat.getLastId
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CRM_ENTITY_TYPE":"lead","CRM_ENTITY":1205,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imopenlines.crm.chat.getLastId
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.crm.chat.getLastId',
            {
                CRM_ENTITY_TYPE: 'lead',
                CRM_ENTITY: 1205
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
                'imopenlines.crm.chat.getLastId',
                [
                    'CRM_ENTITY_TYPE' => 'lead',
                    'CRM_ENTITY' => 1205,
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
        'imopenlines.crm.chat.getLastId',
        {
            CRM_ENTITY_TYPE: 'lead',
            CRM_ENTITY: 1205
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
        'imopenlines.crm.chat.getLastId',
        [
            'CRM_ENTITY_TYPE' => 'lead',
            'CRM_ENTITY' => 1205,
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
        "start": 1773758808,
        "finish": 1773758808.520651,
        "duration": 0.52065110206604,
        "processing": 0,
        "date_start": "2026-03-17T17:46:48+03:00",
        "date_finish": "2026-03-17T17:46:48+03:00",
        "operating_reset_at": 1773759408,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор последнего чата ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CRM_CHAT_EMPTY_CRM_DATA",
    "error_description": "Empty CRM data"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CRM_CHAT_EMPTY_CRM_DATA` | Empty CRM data | Не переданы обязательные параметры `CRM_ENTITY_TYPE` и `CRM_ENTITY` ||
|| `400` | `CRM_CHAT_EMPTY_CRM_DATA` | Could not find CRM entity | Возможные причины:
- для указанного объекта CRM не найден чат
- указан неверный `CRM_ENTITY_TYPE`
- указан несуществующий `CRM_ENTITY`
- у пользователя нет доступа к объекту CRM ||
|| `400` | `ERROR_ARGUMENT` | The value of an argument CRM_ENTITY has an invalid type | Параметр `CRM_ENTITY` передан в неверном формате ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-crm-chat-get.md)
- [{#T}](./imopenlines-crm-chat-user-add.md)
- [{#T}](./imopenlines-crm-chat-user-delete.md)
