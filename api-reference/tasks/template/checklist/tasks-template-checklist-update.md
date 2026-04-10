# Обновить пункт чек-листа шаблона задачи tasks.template.checklist.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение шаблона задачи

Метод `tasks.template.checklist.update` обновляет пункт чек-листа шаблона задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор шаблона задачи можно получить при [создании нового шаблона](../tasks-template-add.md) ||
|| **checkListItemId***
[`integer`](../../../data-types.md) | Идентификатор пункта чек-листа.

Идентификатор пункта чек-листа шаблона можно получить при [создании нового пункта](./tasks-template-checklist-add.md) или методом [получения списка пунктов](./tasks-template-checklist-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Поля для обновления пункта чек-листа [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../../data-types.md) | Текст пункта чек-листа

Если передать `PARENT_ID` со значением `0`, то `TITLE` — название чек-листа ||
|| **PARENT_ID**
[`integer`](../../../data-types.md) | Идентификатор родительского пункта. Используйте для вложенных чек-листов

- Если передать `PARENT_ID` со значением `0`, система создаст в шаблоне задачи новый чек-лист
- Если в шаблоне нет пункта чек-листа с указанным `PARENT_ID`, система создаст новый чек-лист
- Если переместить главный пункт чек-листа под пункт другого чек-листа, то он переместится вместе со своими подпунктами с сохранением иерархии. Чек-листы объединятся в один ||
|| **SORT_INDEX**
[`integer`](../../../data-types.md) | Индекс сортировки. Чем меньше значение, тем выше пункт в списке или подсписке ||
|| **IS_COMPLETE**
[`boolean`](../../../data-types.md) | Статус выполнения пункта. Возможные значения:
- `Y` — выполнен
- `N` — не выполнен ||
|| **IS_IMPORTANT**
[`boolean`](../../../data-types.md) | Отметка, что пункт важный. Возможные значения:
- `Y` — важный
- `N` — обычный ||
|| **MEMBERS**
[`object`](../../../data-types.md) | Объект с описанием участников пункта чек-листа. Ключ — идентификатор пользователя, значение — объект с параметром типа участника `TYPE`. Возможные значения типа участника:
- `'TYPE': 'A'` — соисполнитель
- `'TYPE': 'U'` — наблюдатель

Поле `MEMBERS` заменяется полностью. Чтобы сохранить текущих участников, передайте их вместе с новыми значениями

Система добавит участников пункта чек-листа в задачу в тех же ролях ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "checkListItemId": 37,
      "fields": {
        "TITLE": "4. Подготовить дашборд и отправить ссылку"
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "checkListItemId": 37,
      "fields": {
        "TITLE": "4. Подготовить дашборд и отправить ссылку"
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.checklist.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'tasks.template.checklist.update',
            {
                templateId: 139,
                checkListItemId: 37,
                fields: {
                    TITLE: '4. Подготовить дашборд и отправить ссылку'
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
                'tasks.template.checklist.update',
                [
                    'templateId' => 139,
                    'checkListItemId' => 37,
                    'fields' => [
                        'TITLE' => '4. Подготовить дашборд и отправить ссылку'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.template.checklist.update',
        {
            templateId: 139,
            checkListItemId: 37,
            fields: {
                TITLE: '4. Подготовить дашборд и отправить ссылку'
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
        'tasks.template.checklist.update',
        [
            'templateId' => 139,
            'checkListItemId' => 37,
            'fields' => [
                'TITLE' => '4. Подготовить дашборд и отправить ссылку'
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
    "result": {
        "checkListItem": {
            "id": 37,
            "copiedId": null,
            "userId": 503,
            "createdBy": null,
            "parentId": 23,
            "title": "4. Подготовить дашборд и отправить ссылку",
            "sortIndex": 3,
            "displaySortIndex": "",
            "isComplete": false,
            "isImportant": true,
            "completedCount": 0,
            "members": [
                {
                    "id": "547",
                    "type": "A",
                    "name": "Анна Петрова",
                    "personalPhoto": "57129",
                    "personalGender": "",
                    "image": "https://mysite.ru/b17053/resize_cache/57129/c0120a8d7c10d63c83e32398d1ec4d9e/main/137/137bfa78b877be117e75f1ac8652834a/anna.png",
                    "isCollaber": false
                }
            ],
            "attachments": [],
            "nodeId": null,
            "templateId": 139
        }
    },
    "time": {
        "start": 1773238088,
        "finish": 1773238088.917228,
        "duration": 0.9172279834747314,
        "processing": 0,
        "date_start": "2026-03-11T17:08:08+03:00",
        "date_finish": "2026-03-11T17:08:08+03:00",
        "operating_reset_at": 1773238688,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **checkListItem**
[`object`](../../../data-types.md) | Обновленный пункт чек-листа [(подробное описание)](#checklistitem) ||
|#

{% include [Расшифровка объекта checkListItem](./_includes/checklist-item-response.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {templateId}"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `templateId` ||
|| `400` | `100` | Bitrix\Tasks\CheckList\Internals\CheckList All parameters in the constructor must have real class type | Не передан обязательный параметр `checkListItemId` ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан или передан пустым обязательный параметр `fields` ||
|| `400` | `0` | Bitrix\Tasks\CheckList\CheckListFacade::onAfterUpdate(): Argument #1 ($taskId) must be of type int, string given, called in /var/www/html/bitrix/modules/tasks/lib/checklist/checklistfacade.php on line 313 | Указан пустой или с неверным типом `templateId` ||
|| `400` | `0` | Указано некорректное значение [] для поля [ENTITY_ID] в элементе [, Название пункта] | Указан несуществующий, пустой или с неверным типом `checkListItemId` ||
|| `400` | `0` | Изменение элемента: действие недоступно | У пользователя нет прав доступа на изменение шаблона задачи ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-checklist-add.md)
- [{#T}](./tasks-template-checklist-get.md)
- [{#T}](./tasks-template-checklist-list.md)
- [{#T}](./tasks-template-checklist-delete.md)
- [{#T}](./tasks-template-checklist-complete.md)
