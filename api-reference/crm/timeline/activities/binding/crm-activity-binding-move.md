# Обновить связь дела с элементом CRM crm.activity.binding.move

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь c правом редактирования элементов CRM

Метод `crm.activity.binding.move` обновляет связь дела с элементом CRM. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **activityId***
[`integer`](../../../../data-types.md) | Идентификатор дела в таймлайне, например `999` ||
|| **sourceEntityTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), к которому привязано дело, например `2` для сделки ||
|| **sourceEntityId***
[`integer`](../../../../data-types.md) | Идентификатор элемента CRM, к которому привязано дело, например `1`  ||
|| **targetEntityTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), к которому нужно привязать дело, например `2` для сделки ||
|| **targetEntityId***
[`integer`](../../../../data-types.md) | Идентификатор элемента CRM, к которому нужно привязать дело, например `100`  ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":999, "sourceEntityTypeId":2, "sourceEntityId": 1, "targetEntityTypeId":2, "targetEntityId": 100}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.binding.move
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"activityId":999,"sourceEntityTypeId":2,"sourceEntityId":1,"targetEntityTypeId":2,"targetEntityId":100,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.binding.move
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
        method: 'crm.activity.binding.move',
        params: {
          activityId: 999, // activity ID
          sourceEntityTypeId: 2, // type of the CRM object the activity is currently bound to
          sourceEntityId: 1, // ID of the CRM element the activity is currently bound to
          targetEntityTypeId: 2, // type of the CRM object to bind the activity to
          targetEntityId: 100, // ID of the CRM element to bind the activity to
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Binding moved successfully:', result)
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
      async function moveActivityBinding() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.binding.move',
            params: {
              activityId: 999, // activity ID
              sourceEntityTypeId: 2, // type of the CRM object the activity is currently bound to
              sourceEntityId: 1, // ID of the CRM element the activity is currently bound to
              targetEntityTypeId: 2, // type of the CRM object to bind the activity to
              targetEntityId: 100, // ID of the CRM element to bind the activity to
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Binding moved successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', moveActivityBinding)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.binding.move',
                [
                    'activityId'         => 999,
                    'sourceEntityTypeId' => 2,
                    'sourceEntityId'     => 1,
                    'targetEntityTypeId' => 2,
                    'targetEntityId'     => 100,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error moving activity binding: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.activity.binding.move',
        {
            activityId: 999, // ID дела
            sourceEntityTypeId: 2, // Тип объекта, к которому дело привязано
            sourceEntityId: 1, // ID элемента, к которому дело привязано
            targetEntityTypeId: 2, // Тип объекта, к которому дело будет привязано
            targetEntityId: 100 // ID элемента, к которому дело будет привязано
        },
        function(result) {
            if (result.error()) {
                console.error('Ошибка:', result.error()); 
            } else {
                console.log('Результат:', result.data()); 
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.binding.move',
        [
            'activityId' => 999, // ID дела
            'sourceEntityTypeId' => 2, // Тип объекта, к которому дело привязано
            'sourceEntityId' => 1, // ID элемента, к которому дело привязано
            'targetEntityTypeId' => 2, // Тип объекта, к которому дело будет привязано
            'targetEntityId' => 100 // ID элемента, к которому дело будет привязано
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.crm.activity.binding.move(
            activity_id=999,
            source_entity_type_id=2,
            source_entity_id=101,
            target_entity_type_id=3,
            target_entity_id=205,
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | Результат операции. Возвращает `true` если связь успешно изменена, иначе — `false` ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `100` | Не переданы обязательные поля ||
|| `NOT_FOUND` | Элемент не найден ||
|| `OWNER_NOT_FOUND` | Владелец элемента не найден ||
|| `SOURCE_AND_TARGET_ENTITY_TYPES_ARE_NOT_EQUAL` | Невозможно перенести дело из одного типа объекта CRM в другой ||
|| `SOURCE_AND_TARGET_ENTITY_ID_ARE_EQUAL_ERROR` | Невозможно перенести дело в то же самое дело ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнении операции ||
|| `ACTIVITY_IS_ALREADY_BOUND` | Дело уже привязано к этому элементу ||
|| `BINDING_NOT_FOUND` | Дело не привязано к указанному элементу ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-activity-binding-list.md)
- [{#T}](./crm-activity-binding-delete.md)
- [{#T}](./crm-activity-binding-add.md)
- [{#T}](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity.md)
- [{#T}](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity-between-objects.md)

