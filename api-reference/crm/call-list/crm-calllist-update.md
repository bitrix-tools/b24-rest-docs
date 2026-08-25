# Обновить состав списка обзвона crm.calllist.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на чтение элементов CRM

Метод `crm.calllist.update` позволяет добавить или удалить участников в существующем списке обзвона, и обновить связанную CRM-форму.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **LIST_ID***
[`integer`](../../data-types.md) | Идентификатор обзвона ||
|| **ENTITY_TYPE***
[`string`](../../data-types.md) | Тип объекта: 
- `CONTACT` — контакт,
- `COMPANY` — компания ||
|| **ENTITIES***
[`array`](../../data-types.md) | Массив `ID` контактов или компаний, получить можно методом [crm.item.list](../universal/crm-item-list.md) ||
|| **WEBFORM_ID**
[`integer`](../../data-types.md) | `ID` CRM-формы, которая будет выводиться в форме обзвона. 
`ID` можно найти в списке форм Битрикс24 https://your-domain.ru/crm/webform/ ||
|#

### Особенности работы метода

Метод перезаписывает массив `ENTITIES`. Чтобы добавить элемент, включите в запрос и текущие, и новые `ID`:

1. Текущие ID: [1,2,3].
2. Новые ID: [4].
3. Передать: [1,2,3,4].

Чтобы удалить элемент, передайте только те `ID`, которые должны остаться в списке:

4. Текущие ID: [1,2,3].
5. Удалить: [2].
6. Передать: [1,3].

Метод перезаписывает поле `WEBFORM_ID`. Если при вызове метода не передавать поле `WEBFORM_ID`, поле будет очищено.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"LIST_ID":123,"ENTITY_TYPE":"CONTACT","ENTITIES":[1,2,3],"WEBFORM_ID":5}' \
         https://**your_bitrix24**/rest/**user_id**/**webhook**/crm.calllist.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -d '{"LIST_ID":123,"ENTITY_TYPE":"CONTACT","ENTITIES":[1,2,3],"WEBFORM_ID":5,"auth":"**put_access_token_here**"}' \
         https://**your_bitrix24**/rest/crm.calllist.update
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
        method: 'crm.calllist.update',
        params: {
          LIST_ID: 123,
          ENTITY_TYPE: 'CONTACT',
          ENTITIES: [1, 2, 3],
          WEBFORM_ID: 5,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Call list updated successfully:', result)
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
      async function updateCallList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.calllist.update',
            params: {
              LIST_ID: 123,
              ENTITY_TYPE: 'CONTACT',
              ENTITIES: [1, 2, 3],
              WEBFORM_ID: 5,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Call list updated successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCallList)
    </script>
    ```

- Python

    Пример

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.calllist.update(
            list_id=123,
            entity_type="CONTACT",
            entities=[
                1,
                2,
                3,
            ],
            webform_id=5,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.calllist.update',
                [
                    'LIST_ID'     => 123,
                    'ENTITY_TYPE' => 'CONTACT',
                    'ENTITIES'    => [1, 2, 3],
                    'WEBFORM_ID'  => 5,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating call list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.calllist.update",
        {
            LIST_ID: 123,
            ENTITY_TYPE: "CONTACT",
            ENTITIES: [1,2,3],
            WEBFORM_ID: 5
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.calllist.update',
        [
            'LIST_ID' => 123,
            'ENTITY_TYPE' => 'CONTACT',
            'ENTITIES' => [1,2,3],
            'WEBFORM_ID' => 5
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.calllist.update", b24.Params{
    	"LIST_ID":     123,
    	"ENTITY_TYPE": "CONTACT",
    	"ENTITIES":    []int{1, 2, 3},
    	"WEBFORM_ID":  5,
    })
    if err != nil {
    	return fmt.Errorf("crm.calllist.update: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1752562914.533195,
        "finish": 1752562914.606445,
        "duration": 0.07325005531311035,
        "processing": 0.044027090072631836,
        "date_start": "2025-07-15T10:01:54+03:00",
        "date_finish": "2025-07-15T10:01:54+03:00",
        "operating_reset_at": 1752563514,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ENTITY_TYPE_ERROR",
    "error_description": "EntityType is incorrect"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | `LIST_ID is not found`, `ENTITY_TYPE is not found`, `ENTITIES is not found` | Не передан обязательный параметр ||
|| `400` | `ENTITY_TYPE_ERROR` | `EntityType is incorrect` | В параметре `ENTITY_TYPE` передано значение, отличное от `CONTACT` и `COMPANY` ||
|| `400` | `ENTITIES_ERROR` | `Entities is not array` | В параметре `ENTITIES` передан не массив ||
|| `400` | `ENTITIES_ERROR` | `Incorrect entities id` | В параметре `ENTITIES` есть идентификаторы, которых нет в CRM ||
|| `400` | `LIST_ID_ERROR` | `Incorrect list id or access denied` | Обзвона с таким идентификатором нет или к нему нет доступа ||
|| `400` | `ENTITY_TYPE_ERROR` | `Discrepancy between the type of call participants and incoming type` | Тип объектов в `ENTITY_TYPE` не совпадает с типом участников обзвона ||
|| `400` | `WEBFORM_ERROR` | `Incorrect webform id` | В параметре `WEBFORM_ID` указана несуществующая CRM-форма ||
|| `403` | `ACCESS_ERROR` | `Access Denied` | У пользователя нет права на чтение контактов или компаний ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-calllist-add.md)
- [{#T}](./crm-calllist-get.md)
- [{#T}](./crm-calllist-items-get.md)
- [{#T}](./crm-calllist-list.md)
- [{#T}](./crm-calllist-statuslist.md) 