# Добавить шаблон задачи tasks.template.add

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

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
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
                        WEEK_DAYS: [2],
                        TIME: '11:00',
                        REPEAT_TILL: 'endless',
                        START_DATE: '16.03.2026 00:00:00',
                    },
                    UF_CRM_TASK: ['L_1179', 'D_1833'],
                }
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
