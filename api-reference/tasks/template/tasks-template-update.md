# Обновить шаблон задачи tasks.template.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом редактирования шаблона

Метод `tasks.template.update` обновляет существующий шаблон задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор шаблона задачи можно получить при [создании нового шаблона](./tasks-template-add.md) ||
|| **fields***
[`object`](../../data-types.md) | Поля шаблона, которые нужно изменить.

Поля и типы значений соответствуют описанию на странице [Поля шаблона задачи](./fields.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "fields": {
        "TITLE": "Подготовка еженедельного статуса по проекту и согласование",
        "DESCRIPTION": "Обновленный шаблон задачи для подготовки еженедельного статуса по проекту и финального согласования перед отправкой",
        "PRIORITY": 1,
        "TASK_CONTROL": "Y",
        "ADD_IN_REPORT": "Y",
        "UF_CRM_TASK": ["L_1179", "D_1833"]
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "fields": {
        "TITLE": "Подготовка еженедельного статуса по проекту и согласование",
        "DESCRIPTION": "Обновленный шаблон задачи для подготовки еженедельного статуса по проекту и финального согласования перед отправкой",
        "PRIORITY": 1,
        "TASK_CONTROL": "Y",
        "ADD_IN_REPORT": "Y",
        "UF_CRM_TASK": ["L_1179", "D_1833"]
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateUpdateResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<TemplateUpdateResult>({
        method: 'tasks.template.update',
        params: {
          templateId: 139,
          fields: {
            TITLE: 'Prepare weekly project status and approval',
            DESCRIPTION: 'Updated task template for preparing weekly project status and final approval before sending',
            PRIORITY: 1,
            TASK_CONTROL: 'Y',
            ADD_IN_REPORT: 'Y',
            UF_CRM_TASK: ['L_1179', 'D_1833'],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Template updated:', result)
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
      async function updateTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.template.update',
            params: {
              templateId: 139,
              fields: {
                TITLE: 'Prepare weekly project status and approval',
                DESCRIPTION: 'Updated task template for preparing weekly project status and final approval before sending',
                PRIORITY: 1,
                TASK_CONTROL: 'Y',
                ADD_IN_REPORT: 'Y',
                UF_CRM_TASK: ['L_1179', 'D_1833'],
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
          console.info('Template updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateTemplate)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.template.update',
                [
                    'templateId' => 139,
                    'fields' => [
                        'TITLE' => 'Подготовка еженедельного статуса по проекту и согласование',
                        'DESCRIPTION' => 'Обновленный шаблон задачи для подготовки еженедельного статуса по проекту и финального согласования перед отправкой',
                        'PRIORITY' => 1,
                        'TASK_CONTROL' => 'Y',
                        'ADD_IN_REPORT' => 'Y',
                        'UF_CRM_TASK' => ['L_1179', 'D_1833']
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);

    } catch (Throwable $e) {
        echo 'Ошибка обновления шаблона: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.template.update',
        {
            templateId: 139,
            fields: {
                TITLE: 'Подготовка еженедельного статуса по проекту и согласование',
                DESCRIPTION: 'Обновленный шаблон задачи для подготовки еженедельного статуса по проекту и финального согласования перед отправкой',
                PRIORITY: 1,
                TASK_CONTROL: 'Y',
                ADD_IN_REPORT: 'Y',
                UF_CRM_TASK: ['L_1179', 'D_1833']
            }
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
        'tasks.template.update',
        [
            'templateId' => 139,
            'fields' => [
                'TITLE' => 'Подготовка еженедельного статуса по проекту и согласование',
                'DESCRIPTION' => 'Обновленный шаблон задачи для подготовки еженедельного статуса по проекту и финального согласования перед отправкой',
                'PRIORITY' => 1,
                'TASK_CONTROL' => 'Y',
                'ADD_IN_REPORT' => 'Y',
                'UF_CRM_TASK' => ['L_1179', 'D_1833']
            ]
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1773221471,
        "finish": 1773221471.833299,
        "duration": 0.833298921585083,
        "processing": 0,
        "date_start": "2026-03-11T12:31:11+03:00",
        "date_finish": "2026-03-11T12:31:11+03:00",
        "operating_reset_at": 1773222071,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если шаблон успешно обновлен.

Возвращает `false`
- шаблона с указанным `templateId` не существует
- если у пользователя нет доступа к редактированию шаблона ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {templateId}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `templateId` ||
|| `400` | `100` | Invalid value {} to match with parameter {templateId}. Should be value of type int. | Параметр `templateId` передан неверным или пустым ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-add.md)
- [{#T}](./tasks-template-get.md)
- [{#T}](./tasks-template-delete.md)
- [{#T}](./tasks-template-fields.md)
