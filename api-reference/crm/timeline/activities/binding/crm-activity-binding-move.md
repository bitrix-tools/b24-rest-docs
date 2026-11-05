# Обновить связь дела с элементом CRM crm.activity.binding.move

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом редактирования обоих элементов CRM — исходного и целевого

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте метод REST 3.0 [crm.activity.binding.move](../../../rest-v3/activities/crm-activity-binding-move-rest-v3.md).

{% endnote %}

Метод `crm.activity.binding.move` переносит связь дела с одного элемента CRM на другой элемент того же типа. Дело пропадет из таймлайна исходного элемента и появится в таймлайне целевого.

Например, можно перенести дело из одной сделки в другую. Перенести дело из сделки в контакт этим методом нельзя. Чтобы перенести дело в контакт, привяжите его к контакту методом [crm.activity.binding.add](./crm-activity-binding-add.md) и удалите связь со сделкой методом [crm.activity.binding.delete](./crm-activity-binding-delete.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **activityId***
[`integer`](../../../../data-types.md) | Идентификатор дела в таймлайне, например `999`.

Получить идентификатор можно методом [crm.activity.list](../activity-base/crm-activity-list.md) ||
|| **sourceEntityTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), к которому привязано дело, например `2` для сделки ||
|| **sourceEntityId***
[`integer`](../../../../data-types.md) | Идентификатор элемента CRM, к которому привязано дело, например `1`.

Получить идентификатор можно методом [crm.activity.binding.list](./crm-activity-binding-list.md) ||
|| **targetEntityTypeId***
[`integer`](../../../../data-types.md) | [Идентификатор типа объекта CRM](../../../data-types.md#object_type), к которому нужно привязать дело, например `2` для сделки. Должен совпадать с `sourceEntityTypeId` ||
|| **targetEntityId***
[`integer`](../../../../data-types.md) | Идентификатор элемента CRM, к которому нужно привязать дело, например `100`.

Получить идентификатор можно методом [crm.item.list](../../../universal/crm-item-list.md) ||
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.binding.move(
            activity_id=999,
            source_entity_type_id=2,
            source_entity_id=1,
            target_entity_type_id=2,
            target_entity_id=100,
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.binding.move", b24.Params{
    	"activityId":         999,
    	"sourceEntityTypeId": 2,
    	"sourceEntityId":     1,
    	"targetEntityTypeId": 2,
    	"targetEntityId":     100,
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.binding.move: %w", err)
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
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1712133392,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../../data-types.md) | Результат операции. Возвращает `true`, если связь перенесена ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {targetEntityId} | Не передан обязательный параметр `activityId`, `sourceEntityTypeId`, `sourceEntityId`, `targetEntityTypeId` или `targetEntityId`. В описании указано имя параметра ||
|| `400` | `100` | Invalid value {abc} to match with parameter {activityId}. Should be value of type int. | Значение параметра не целое число. В описании указано имя параметра ||
|| `400` | `NOT_FOUND` | Элемент не найден | Дело с идентификатором `activityId` не найдено. В облачном Битрикс24 ошибка возникает и для несуществующего элемента CRM ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | У пользователя нет права редактирования исходного или целевого элемента CRM ||
|| `400` | `SOURCE_AND_TARGET_ENTITY_TYPES_ARE_NOT_EQUAL_ERROR` | Source and target entity types are not equal | Значения `sourceEntityTypeId` и `targetEntityTypeId` отличаются ||
|| `400` | `SOURCE_AND_TARGET_ENTITY_ID_ARE_EQUAL_ERROR` | Source and target entity ID cannot be equal | Значения `sourceEntityId` и `targetEntityId` совпадают ||
|| `400` | `ACTIVITY_IS_ALREADY_BOUND` | Дело уже привязано к этой сущности | Дело уже привязано к целевому элементу ||
|| `400` | `BINDING_NOT_FOUND` | Дело не привязано к этой сущности | Дело не привязано к исходному элементу ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-binding-add.md)
- [{#T}](./crm-activity-binding-list.md)
- [{#T}](./crm-activity-binding-delete.md)
- [{#T}](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity.md)
- [{#T}](../../../../../tutorials/crm/how-to-edit-crm-objects/how-to-move-activity-between-objects.md)
- [{#T}](./index.md)
