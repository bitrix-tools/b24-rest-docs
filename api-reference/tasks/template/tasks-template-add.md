# Добавить шаблон задачи tasks.template.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом создания шаблона

Метод `tasks.template.add` создает новый шаблон задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Поля нового шаблона задачи [(подробное описание)](./fields.md). 

Обязательные поля для создания шаблона:
- `TITLE` — название шаблона задачи
- `CREATED_BY` — идентификатор постановщика
- `RESPONSIBLE_ID` — идентификатор исполнителя

||
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
      "fields": {
        "PARENT_ID": 8131,
        "TITLE": "Подготовка еженедельного статуса по проекту",
        "DESCRIPTION": "Шаблон задачи для подготовки и согласования еженедельного статуса по проекту с командой и руководителем",
        "PRIORITY": 2,
        "CREATED_BY": 101,
        "RESPONSIBLE_ID": 102,
        "REPLICATE": "Y",
        "START_DATE_PLAN_AFTER": "32400",
        "END_DATE_PLAN_AFTER": "97200",
        "REPLICATE_PARAMS": {
          "PERIOD": "weekly",
          "EVERY_WEEK": 1,
          "WEEK_DAYS": [2],
          "TIME": "11:00",
          "REPEAT_TILL": "endless",
          "START_DATE": "16.03.2026 00:00:00"
        },
        "UF_CRM_TASK": ["L_1179", "D_1833"]
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "fields": {
        "PARENT_ID": 8131,
        "TITLE": "Подготовка еженедельного статуса по проекту",
        "DESCRIPTION": "Шаблон задачи для подготовки и согласования еженедельного статуса по проекту с командой и руководителем",
        "PRIORITY": 2,
        "CREATED_BY": 101,
        "RESPONSIBLE_ID": 102,
        "REPLICATE": "Y",
        "START_DATE_PLAN_AFTER": "32400",
        "END_DATE_PLAN_AFTER": "97200",
        "REPLICATE_PARAMS": {
          "PERIOD": "weekly",
          "EVERY_WEEK": 1,
          "WEEK_DAYS": [2],
          "TIME": "11:00",
          "REPEAT_TILL": "endless",
          "START_DATE": "16.03.2026 00:00:00"
        },
        "UF_CRM_TASK": ["L_1179", "D_1833"]
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.add
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // The result field contains the ID of the created template
    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateAddResult = number

    try {
      const response = await $b24.actions.v2.call.make<TemplateAddResult>({
        method: 'tasks.template.add',
        params: {
          fields: {
            PARENT_ID: 8131,
            TITLE: 'Weekly project status preparation',
            DESCRIPTION: 'Task template for preparing and approving weekly project status with the team and manager',
            PRIORITY: 2,
            CREATED_BY: 101,
            RESPONSIBLE_ID: 102,
            REPLICATE: 'Y',
            START_DATE_PLAN_AFTER: '32400',
            END_DATE_PLAN_AFTER: '97200',
            REPLICATE_PARAMS: {
              PERIOD: 'weekly',
              EVERY_WEEK: 1,
              WEEK_DAYS: [2],
              TIME: '11:00',
              REPEAT_TILL: 'endless',
              START_DATE: '16.03.2026 00:00:00',
            },
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
        console.info('Created template ID:', result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- UMD

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.template.add',
            params: {
              fields: {
                PARENT_ID: 8131,
                TITLE: 'Weekly project status preparation',
                DESCRIPTION: 'Task template for preparing and approving weekly project status with the team and manager',
                PRIORITY: 2,
                CREATED_BY: 101,
                RESPONSIBLE_ID: 102,
                REPLICATE: 'Y',
                START_DATE_PLAN_AFTER: '32400',
                END_DATE_PLAN_AFTER: '97200',
                REPLICATE_PARAMS: {
                  PERIOD: 'weekly',
                  EVERY_WEEK: 1,
                  WEEK_DAYS: [2],
                  TIME: '11:00',
                  REPEAT_TILL: 'endless',
                  START_DATE: '16.03.2026 00:00:00',
                },
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
          console.info('Created template ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTemplate)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.template.add',
                [
                    'fields' => [
                        'PARENT_ID' => 8131,
                        'TITLE' => 'Подготовка еженедельного статуса по проекту',
                        'DESCRIPTION' => 'Шаблон задачи для подготовки и согласования еженедельного статуса по проекту с командой и руководителем',
                        'PRIORITY' => 2,
                        'CREATED_BY' => 101,
                        'RESPONSIBLE_ID' => 102,
                        'REPLICATE' => 'Y',
                        'START_DATE_PLAN_AFTER' => '32400',
                        'END_DATE_PLAN_AFTER' => '97200',
                        'REPLICATE_PARAMS' => [
                            'PERIOD' => 'weekly',
                            'EVERY_WEEK' => 1,
                            'WEEK_DAYS' => [2],
                            'TIME' => '11:00',
                            'REPEAT_TILL' => 'endless',
                            'START_DATE' => '16.03.2026 00:00:00',
                        ],
                        'UF_CRM_TASK' => ['L_1179', 'D_1833'],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Template ID: ' . $result;

    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.template.add',
        {
            fields: {
                PARENT_ID: 8131,
                TITLE: 'Подготовка еженедельного статуса по проекту',
                DESCRIPTION: 'Шаблон задачи для подготовки и согласования еженедельного статуса по проекту с командой и руководителем',
                PRIORITY: 2,
                CREATED_BY: 101,
                RESPONSIBLE_ID: 102,
                REPLICATE: 'Y',
                START_DATE_PLAN_AFTER: '32400',
                END_DATE_PLAN_AFTER: '97200',
                REPLICATE_PARAMS: {
                    PERIOD: 'weekly',
                    EVERY_WEEK: 1,
                    WEEK_DAYS: [2], // Вторник
                    TIME: '11:00',
                    REPEAT_TILL: 'endless',
                    START_DATE: '16.03.2026 00:00:00'
                }
                UF_CRM_TASK: ['L_1179', 'D_1833']
            },
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
        'tasks.template.add',
        [
            'fields' => [
                'PARENT_ID' => 8131,
                'TITLE' => 'Подготовка еженедельного статуса по проекту',
                'DESCRIPTION' => 'Шаблон задачи для подготовки и согласования еженедельного статуса по проекту с командой и руководителем',
                'PRIORITY' => 2,
                'CREATED_BY' => 101,
                'RESPONSIBLE_ID' => 102,
                'REPLICATE' => 'Y',
                'START_DATE_PLAN_AFTER' => '32400',
                'END_DATE_PLAN_AFTER' => '97200',
                'REPLICATE_PARAMS' => [
                    'PERIOD' => 'weekly',
                    'EVERY_WEEK' => 1,
                    'WEEK_DAYS' => [2],
                    'TIME' => '11:00',
                    'REPEAT_TILL' => 'endless',
                    'START_DATE' => '16.03.2026 00:00:00',
                ],
                'UF_CRM_TASK' => ['L_1179', 'D_1833'],
            ],
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 109,
    "time": {
        "start": 1771937035,
        "finish": 1771937035.427759,
        "duration": 0.42775893211364746,
        "processing": 0,
        "date_start": "2026-02-24T15:43:55+03:00",
        "date_finish": "2026-02-24T15:43:55+03:00",
        "operating_reset_at": 1771937635,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного шаблона задачи.

Метод не создаст шаблон и вернет `"result": 0`, если в `fields` не указаны все обязательные поля: `TITLE`, `CREATED_BY`, `RESPONSIBLE_ID`  ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан или передан пустым обязательный параметр `fields` ||
|| `400` | `0` | Access denied | Недостаточно прав для создания шаблона ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-fields.md)
- [{#T}](./tasks-template-get.md)
- [{#T}](./tasks-template-update.md)
- [{#T}](./tasks-template-delete.md)
