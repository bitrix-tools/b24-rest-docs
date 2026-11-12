# Обновить системное дело crm.activity.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом на изменение каждого связанного элемента CRM

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.activity.todo.update](../todo/crm-activity-todo-update.md).

{% endnote %}

Метод `crm.activity.update` обновляет существующее дело.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор дела в таймлайне, например `999`. Получить идентификатор можно методом [crm.activity.list](./crm-activity-list.md) ||
|| **fields***
[`object`](../../../../data-types.md) | Объект с изменяемыми полями дела [(подробное описание)](#fields). Пример структуры:

```json
{
    "fields": {
        "SUBJECT": "Новый звонок"
    }
}
```
||
|| **params**
[`object`](../../../../data-types.md) | Необязательные параметры обновления. Поле `REGISTER_HISTORY_EVENT` принимает `Y` — регистрировать событие в истории, `N` — не регистрировать. По умолчанию событие регистрируется ||
|#

### Параметр fields {#fields}

Передавайте в `fields` только поля, которые нужно изменить. Полный список и описание полей доступны в [crm.activity.fields](./crm-activity-fields.md). Признак обязательности в метаданных не означает, что поле нужно передавать при каждом обновлении.

Особенности полей при обновлении:

#|
|| **Поле** `тип` | **Описание** ||
|| **OWNER_ID**
[`integer`](../../../../data-types.md) | Идентификатор текущего элемента CRM. При обновлении переданное значение игнорируется ||
|| **OWNER_TYPE_ID**
[`crm_enum_ownertype`](../../../data-types.md#object_type) | [Идентификатор типа текущего объекта CRM](../../../data-types.md#object_type). При обновлении переданное значение игнорируется ||
|| **TYPE_ID**
[`crm_enum_activitytype`](../../../data-types.md#activity-enums) | Тип дела изменить нельзя. Переданное значение игнорируется ||
|| **ASSOCIATED_ENTITY_ID**
[`integer`](../../../../data-types.md) | Только для чтения. Переданное значение игнорируется ||
|| **COMMUNICATIONS**
[`crm_activity_communication[]`](../../../data-types.md) | Массив [коммуникаций](./crm-activity-communication-fields.md). Если передан, должен содержать корректную коммуникацию. Пустой массив или список без корректных коммуникаций вызывает ошибку ||
|| **COMPLETED**
[`char`](../../../../data-types.md) | Признак завершения дела: `Y` — выполнено, `N` — не выполнено ||
|| **DEADLINE**
[`datetime`](../../../../data-types.md) | Напрямую не изменяется: переданное значение игнорируется ||
|| **FILES**
[`diskfile[]`](../../../data-types.md) | Массив файлов. Для каждого файла передайте объект с `FILE_ID` — идентификатором файла на Диске ||
|| **PROVIDER_ID**
[`string`](../../../../data-types.md) | Провайдера дела изменить нельзя. Переданное значение игнорируется ||
|| **RESPONSIBLE_ID**
[`user`](../../../../data-types.md) | Идентификатор ответственного пользователя. Не требуется при каждом обновлении ||
|| **SUBJECT**
[`string`](../../../../data-types.md) | Тема дела. Не требуется при каждом обновлении ||
|| **IS_INCOMING_CHANNEL**
[`char`](../../../../data-types.md) | Только для чтения. Переданное значение игнорируется ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"fields":{"RESPONSIBLE_ID":1,"DESCRIPTION":"Новое описание дела"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.activity.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"fields":{"RESPONSIBLE_ID":1,"DESCRIPTION":"Новое описание дела"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.update
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
        method: 'crm.activity.update',
        params: {
          id: 999,
          fields: {
            RESPONSIBLE_ID: 1,
            DESCRIPTION: 'New activity description',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Activity updated successfully:', result)
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
      async function updateActivity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.update',
            params: {
              id: 999,
              fields: {
                RESPONSIBLE_ID: 1,
                DESCRIPTION: 'New activity description',
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
          console.info('Activity updated successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateActivity)
    </script>
    ```

- Python

    ```python
    from datetime import datetime, timedelta
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.update(
            bitrix_id=999,
            fields={
                "SUBJECT": "Updated follow-up",
                "START_TIME": (datetime.now() + timedelta(days=1)).isoformat(timespec="seconds"),
                "DESCRIPTION": "Updated activity description",
                "RESPONSIBLE_ID": 1,
                "COMPLETED": "N",
            },
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
                'crm.activity.update',
                [
                    'id' => 999,
                    'fields' => [
                        "RESPONSIBLE_ID" => 1,
                        "DESCRIPTION" => "Новое описание дела"
                    ]
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
        echo 'Error updating activity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'crm.activity.update',
        {
            id: 999,
            fields: {
                "RESPONSIBLE_ID": 1, 
                "DESCRIPTION": "Новое описание дела"
            }
        },
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.update',
        [
            'id' => 999,
            'fields' => [
                'RESPONSIBLE_ID' => 1,
                'DESCRIPTION' => 'Новое описание дела'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.update", b24.Params{
    	"id": 999,
    	"fields": b24.Params{
    		"RESPONSIBLE_ID": 1,
    		"DESCRIPTION":    "Новое описание дела",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.update: %w", err)
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
[`boolean`](../../../../data-types.md) | Возвращает `true`, если дело успешно изменено. При ошибке метод возвращает ответ об ошибке, описание ошибки может быть пустым ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

Например, при `id = 0` метод вернет ошибку:

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "ID is not defined or invalid."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `ID is not defined or invalid.` | Идентификатор дела не указан или некорректен ||
|| `400` | Пустое значение | `Parameter 'fields' must be array.` | Параметр `fields` передан не как объект ||
|| `400` | Пустое значение | `Parameter 'params' must be array.` | Параметр `params` передан не как объект ||
|| `400` | Пустое значение | `Activity is not found.` | Дело с указанным идентификатором не найдено ||
|| `400` | Пустое значение | `The field COMMUNICATIONS is not defined or invalid.` | Передан пустой массив `COMMUNICATIONS` или список без корректных коммуникаций ||
|| `400` | Пустое значение | `Use crm.activity.configurable.update for this activity provider` | Для обновления настраиваемого дела используйте `crm.activity.configurable.update` ||
|| `400` | Пустое значение | `Access denied.` | Нет прав на обновление текущего элемента CRM; для дела приложения вызов выполнен другим приложением ||
|| `400` | Пустое значение | `Application context required.` | Для обновления дела с провайдером `REST_APP` требуется контекст приложения, создавшего дело ||
|#

При обращении к несуществующему делу ответ также может содержать пустые `error` и `error_description` при HTTP-статусе `400`.

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-activity-add.md)
- [{#T}](./crm-activity-get.md)
- [{#T}](./crm-activity-list.md)
- [{#T}](./crm-activity-delete.md)
- [{#T}](./crm-activity-communication-fields.md)
- [{#T}](./crm-activity-fields.md)




