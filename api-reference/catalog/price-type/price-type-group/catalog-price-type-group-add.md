# Добавить привязку типа цен к группе покупателей catalog.priceTypeGroup.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Управление типами цен»

Метод `catalog.priceTypeGroup.add` добавляет привязку типа цены к группе покупателей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания привязки типа цены к группе покупателей ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId***
[`catalog_price_type.id`](../../data-types.md#catalog_price_type) | Идентификатор типа цены. Можно получить методом [catalog.priceType.list](../catalog-price-type-list.md) ||
|| **groupId***
[`integer`](../../data-types.md) | Идентификатор группы покупателей ||
|| **access***
[`char`](../../data-types.md) | Тип доступа к цене. Возможные значения:
- `Y` — право на покупку по этому типу цены
- `N` — право на просмотр этого типа цены ||
|#

{% note info "" %}

Перед добавлением проверьте существующую запись методом [catalog.priceTypeGroup.list](./catalog-price-type-group-list.md) с фильтром по `catalogGroupId`, `groupId` и `access`. Если запись уже существует, метод вернет ошибку: `The specified access type for this group already exists`

{% endnote %}


## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":9,"groupId":23,"access":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.priceTypeGroup.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":9,"groupId":23,"access":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.priceTypeGroup.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PriceTypeGroupAddResult = {
      priceTypeGroup: {
        access: string
        catalogGroupId: number
        groupId: number
        id: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PriceTypeGroupAddResult>({
        method: 'catalog.priceTypeGroup.add',
        params: {
          fields: {
            catalogGroupId: 9,
            groupId: 23,
            access: 'Y',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.priceTypeGroup)
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
      async function addPriceTypeGroup() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.priceTypeGroup.add',
            params: {
              fields: {
                catalogGroupId: 9,
                groupId: 23,
                access: 'Y',
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
          console.info(result.priceTypeGroup)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPriceTypeGroup)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.priceTypeGroup.add',
                [
                    'fields' => [
                        'catalogGroupId' => 9,
                        'groupId'        => 23,
                        'access'         => 'Y',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding price type group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.priceTypeGroup.add',
        {
            fields: {
                catalogGroupId: 9,
                groupId: 23,
                access: 'Y'
            }
        },
        function(result) {
            if (result.error())
                console.error(result.error().ex);
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.priceTypeGroup.add',
        [
            'fields' => [
                'catalogGroupId' => 9,
                'groupId' => 23,
                'access' => 'Y'
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
        "priceTypeGroup": {
        "access": "Y",
        "catalogGroupId": 9,
        "groupId": 23,
        "id": 109
        }
    },
    "time": {
        "start": 1774260171,
        "finish": 1774260171.438073,
        "duration": 0.43807291984558105,
        "processing": 0,
        "date_start": "2026-03-23T13:02:51+03:00",
        "date_finish": "2026-03-23T13:02:51+03:00",
        "operating_reset_at": 1774260771,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **priceTypeGroup**
[`catalog_price_type_group`](../../data-types.md#catalog_price_type_group) | Объект с информацией о созданной привязке типа цены к группе покупателей ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200040300020,
    "error_description": "Access Denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `200040300020` | Access Denied | Недостаточно прав для редактирования типов цен ||
|| `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `0` | The specified price type does not exist | Указанный тип цены не существует ||
|| `0` | The specified group does not exist | Указанная группа покупателей не существует ||
|| `0` | Invalid access type provided. The available values are: Y, N | Передан недопустимый тип доступа. Допустимые значения: `Y`, `N` ||
|| `0` | The specified access type for this group already exists | Такая привязка для этого типа цены и группы уже существует ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-group-delete.md)
- [{#T}](./catalog-price-type-group-get-fields.md)
- [{#T}](./catalog-price-type-group-list.md)

