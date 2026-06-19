# Изменить настраиваемое поле заданного шаблона реквизитов crm.requisite.preset.field.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод изменяет настраиваемое поле в шаблоне реквизитов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Идентификатор настраиваемого поля, которое нужно изменить. 

Идентификаторы настраиваемых полей шаблона реквизитов можно получить с помощью метода [crm.requisite.preset.field.list](./crm-requisite-preset-field-list.md) ||
|| **preset***
[`object`](../../../../data-types.md) | Объект, содержащий значение идентификатора шаблона, в который добавляется настраиваемое поле (например, `{"ID": 27}`). 

Идентификаторы шаблонов можно получить с помощью метода [crm.requisite.preset.list](../crm-requisite-preset-list.md) ||
|| **fields***
[`object`](../../../../data-types.md) | Объект с полями и их значениями, которые нужно изменить. Метод [crm.requisite.preset.field.fields](./crm-requisite-preset-field-fields.md) позволяет получить описание полей, которые можно менять. 

API требует указать значение в поле **FIELD_NAME**. Если его не нужно менять, то можно указать текущее ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
||  **Название**
`тип` | **Описание** ||
|| **FIELD_NAME***
[`string`](../../../../data-types.md) | Название поля. 

API требует указать значение в этом поле. Если его не нужно менять, то можно указать текущее ||
|| **FIELD_TITLE**
[`string`](../../../../data-types.md) | Альтернативное название поля для реквизита.

Альтернативное название отображается в различных формах для заполнения реквизитов. В зависимости от конкретной формы альтернативное название может использоваться или нет 
||
|| **SORT**
[`integer`](../../../../data-types.md) | Сортировка. Порядок в списке полей шаблона ||
|| **IN_SHORT_LIST**
[`char`](../../../../data-types.md) | Показывать в кратком списке. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости. Может принимать значения `Y` или `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":1,"preset":{"ID":27},"fields":{"FIELD_NAME":"RQ_NAME","FIELD_TITLE":"Имя","IN_SHORT_LIST":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.preset.field.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":1,"preset":{"ID":27},"fields":{"FIELD_NAME":"RQ_NAME","FIELD_TITLE":"Имя","IN_SHORT_LIST":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.field.update
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
        method: 'crm.requisite.preset.field.update',
        params: {
          ID: 1,
          preset: {
            ID: 27,
          },
          fields: {
            FIELD_NAME: 'RQ_NAME',
            FIELD_TITLE: 'Name',
            IN_SHORT_LIST: 'Y',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Field updated:', result)
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
      async function updatePresetField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.requisite.preset.field.update',
            params: {
              ID: 1,
              preset: {
                ID: 27,
              },
              fields: {
                FIELD_NAME: 'RQ_NAME',
                FIELD_TITLE: 'Name',
                IN_SHORT_LIST: 'Y',
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
          console.info('Field updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updatePresetField)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.preset.field.update',
                [
                    'ID'     => 1,
                    'preset' => [
                        'ID' => 27,
                    ],
                    'fields' => [
                        'FIELD_NAME'    => 'RQ_NAME',
                        'FIELD_TITLE'   => 'Имя',
                        'IN_SHORT_LIST' => 'Y',
                    ],
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
        echo 'Error updating preset field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.field.update",
        {
            ID: 1,          // Идентификатор настраиваемого поля, которое нужно изменить
            preset:
            {
                "ID": 27    // Идентификатор шаблона реквизитов
            },
            fields:         // Значения полей, которые нужно изменить
            {
                "FIELD_NAME": "RQ_NAME",    // API требует указать значение в этом поле. Если
                                            // значение менять не нужно, оставляем прежнее.
                "FIELD_TITLE": "Имя",
                "IN_SHORT_LIST": "Y",
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.preset.field.update',
        [
            'ID' => 1,
            'preset' => ['ID' => 27],
            'fields' => [
                'FIELD_NAME' => 'RQ_NAME',
                'FIELD_TITLE' => 'Имя',
                'IN_SHORT_LIST' => 'Y',
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
    "result": true,
    "time": {
        "start": 1716898310.398361,
        "finish": 1716898310.936332,
        "duration": 0.537971019744873,
        "processing": 0.09376883506774902,
        "date_start": "2024-05-28T14:11:50+02:00",
        "date_finish": "2024-05-28T14:11:50+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат изменения настраиваемого поля:
- `true` — изменено
- `false` — не изменено 
||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The PresetField with ID '27' is not found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `The PresetField with ID '1' is not found` | Поле с указанным идентификатором не найдено ||
|| `The Preset with ID '27' is not found` | Шаблон с указанным идентификатором не найден ||
|| `ID is not defined or invalid` | Идентификатор поля не указан или имеет недопустимое значение ||
|| `Access denied` | Недостаточно прав доступа для удаления поля из шаблона реквизитов ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-field-add.md)
- [{#T}](./crm-requisite-preset-field-available-to-add.md)
- [{#T}](./crm-requisite-preset-field-get.md)
- [{#T}](./crm-requisite-preset-field-list.md)
- [{#T}](./crm-requisite-preset-field-delete.md)
- [{#T}](./crm-requisite-preset-field-fields.md)