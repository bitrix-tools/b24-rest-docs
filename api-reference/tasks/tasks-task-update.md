# Изменить задачу tasks.task.update

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- Нужен доп. пример с пояснением по привязке задачи к crm
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.update` обновляет задачу.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **taskId**
[`unknown`](../data-types.md) | Идентификатор задачи. ||
|| **fields**
[`unknown`](../data-types.md) | Поля, соответствующие доступному списку полей [tasks.task.getfields](./tasks-task-get-fields.md). ||
|#

## Пример

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":11,"fields":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"],"RESPONSIBLE_ID":123}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/tasks.task.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"taskId":11,"fields":{"UF_CRM_TASK":["L_4","C_7","CO_5","D_10"],"UF_TASK_WEBDAV_FILES":["n12345","n67890"],"RESPONSIBLE_ID":123},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.task.update
    ```

- JS

   ```javascript
    BX24.callMethod(
        "tasks.task.update",
        {
            taskId: 11, // Идентификатор задачи, которую вы хотите обновить
            fields: {
                // Пример передачи нескольких значений в поле UF_CRM_TASK
                UF_CRM_TASK: [
                    "L_4", // Привязка к лиду с id 4
                    "C_7", // Привязка к контакту с id 7
                    "CO_5", // Привязка к компании с id 5
                    "D_10" // Привязка к сделкес id 10
                ],
                // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                UF_TASK_WEBDAV_FILES: [
                    "n12345", // Идентификатор первого файла диска
                    "n67890" // Идентификатор второго файла диска
                ],
                RESPONSIBLE_ID: 123 // Идентификатор нового исполнителя
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info("Задача успешно обновлена");
            }
        }
    );
    ```

- PHP 

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.update',
        [
            'taskId' => 11, // Идентификатор задачи, которую вы хотите обновить
            'fields' => [
                // Пример передачи нескольких значений в поле UF_CRM_TASK
                'UF_CRM_TASK' => [
                    'L_4', // Привязка к лиду с id 4
                    'C_7', // Привязка к контакту с id 7
                    'CO_5', // Привязка к компании с id 5
                    'D_10' // Привязка к сделке с id 10
                ],
                // Пример передачи нескольких файлов в поле UF_TASK_WEBDAV_FILES
                'UF_TASK_WEBDAV_FILES' => [
                    'n12345', // Идентификатор первого файла диска
                    'n67890' // Идентификатор второго файла диска
                ],
                'RESPONSIBLE_ID' => 123 // Идентификатор нового исполнителя
            ]
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo 'Задача успешно обновлена';
    }
    ```

- HTTP 

    ```bash
    POST /rest/tasks.task.update.json
    Host: your_bitrix24_domain
    Authorization: Bearer your_access_token
    Content-Type: application/x-www-form-urlencoded

    taskId=11&
    fields[RESPONSIBLE_ID]=123&
    fields[UF_CRM_TASK][0]=L_4&
    fields[UF_CRM_TASK][1]=C_7&
    fields[UF_CRM_TASK][2]=CO_5&
    fields[UF_CRM_TASK][3]=D_10&
    fields[UF_TASK_WEBDAV_FILES][0]=n12345&
    fields[UF_TASK_WEBDAV_FILES][1]=n67890
    ```

{% endlist %}

Параметры метода для прикрепления файла к задаче из диска:

```json
{"taskId": "77", "fields": {"UF_TASK_WEBDAV_FILES": ["n111"]}}
```

где "111" - id файла на диске.

{% note warning %}

Нужно добавлять букву `n` в начале.

{% endnote %}

**С версии 22.1300.0** в метод можно передать параметр `SE_PARAMETER` - список объектов с дополнительными параметрами задачи.

{% list tabs %}

- JS

    ```js
    BX.ajax.runAction("tasks.task.add", {
        data: {
            fields: {
                "TITLE": 'REST',
                "RESPONSIBLE_ID": 1,
                "SE_PARAMETER": [
                    {
                        'VALUE': 'Y',
                        'CODE': 3
                    },
                    {
                        'VALUE': 'Y',
                        'CODE': 2
                    },
                ]
            }
        }
    }).then(function (response) { console.log(response);});
    ```

{% endlist %}

Значения кодов:

1. сроки определяются сроками подзадач
2. автоматически завершать задачу при завершении подзадач (и наоборот)
3. обязательный отчет при завершении задачи

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Продолжить изучение

- [{#T}](../../tutorials/tasks/how-to-upload-file-to-task.md)
- [{#T}](../../tutorials/tasks/how-to-connect-task-to-spa.md)
- [{#T}](../../tutorials/tasks/how-to-create-comment-with-file.md)