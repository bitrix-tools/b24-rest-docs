# Обновить шаблон задачи tasks.template.update

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

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
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
