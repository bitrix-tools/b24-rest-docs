# Добавить пункт чек-листа в шаблон задачи tasks.template.checklist.add

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение шаблона задачи

Метод `tasks.template.checklist.add` добавляет пункт чек-листа в шаблон задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор шаблона задачи можно получить при [создании нового шаблона](../tasks-template-add.md) ||
|| **fields***
[`object`](../../../data-types.md) | Поля создаваемого пункта чек-листа [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../../../data-types.md) | Текст пункта чек-листа

Если передать `PARENT_ID` со значением `0`, то `TITLE` — название чек-листа ||
|| **PARENT_ID***
[`integer`](../../../data-types.md) | Идентификатор родительского пункта.

Чтобы создать новый чек-лист, передайте `PARENT_ID` со значением `0`.

Если в шаблоне нет пункта чек-листа с указанным `PARENT_ID`, система создаст новый чек-лист ||
|| **SORT_INDEX**
[`integer`](../../../data-types.md) | Индекс сортировки. Чем меньше значение, тем выше пункт в списке или подсписке ||
|| **IS_COMPLETE**
[`boolean`](../../../data-types.md) | Статус выполнения пункта. Возможные значения:
- `Y` — выполнен
- `N` — не выполнен

По умолчанию — `N` ||
|| **IS_IMPORTANT**
[`boolean`](../../../data-types.md) | Отметка, что пункт важный. Возможные значения:
- `Y` — важный
- `N` — обычный ||
|| **MEMBERS**
[`object`](../../../data-types.md) | Объект с описанием участников пункта чек-листа. Ключ — идентификатор пользователя, значение — объект с параметром типа участника `TYPE`. Возможные значения типа участника:
- `'TYPE': 'A'` — соисполнитель
- `'TYPE': 'U'` — наблюдатель

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
      "fields": {
        "TITLE": "4. Подготовить дашборд",
        "PARENT_ID": 23,
        "SORT_INDEX": 200,
        "IS_COMPLETE": "N",
        "IS_IMPORTANT": "Y",
        "MEMBERS": {
          "547": {
            "TYPE": "A"
          }
        }
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "fields": {
        "TITLE": "4. Подготовить дашборд",
        "PARENT_ID": 23,
        "SORT_INDEX": 200,
        "IS_COMPLETE": "N",
        "IS_IMPORTANT": "Y",
        "MEMBERS": {
          "547": {
            "TYPE": "A"
          }
        }
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.checklist.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'tasks.template.checklist.add',
            {
                templateId: 139,
                fields: {
                    TITLE: '4. Подготовить дашборд',
                    PARENT_ID: 23,
                    SORT_INDEX: 200,
                    IS_COMPLETE: 'N',
                    IS_IMPORTANT: 'Y',
                    MEMBERS: {
                        547: {
                            TYPE: 'A'
                        }
                    }
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
                'tasks.template.checklist.add',
                [
                    'templateId' => 139,
                    'fields' => [
                        'TITLE' => '4. Подготовить дашборд',
                        'PARENT_ID' => 23,
                        'SORT_INDEX' => 200,
                        'IS_COMPLETE' => 'N',
                        'IS_IMPORTANT' => 'Y',
                        'MEMBERS' => [
                            547 => [
                                'TYPE' => 'A'
                            ]
                        ]
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
        'tasks.template.checklist.add',
        {
            templateId: 139,
            fields: {
                TITLE: '4. Подготовить дашборд',
                PARENT_ID: 23,
                SORT_INDEX: 200,
                IS_COMPLETE: 'N',
                IS_IMPORTANT: 'Y',
                MEMBERS: {
                    547: {
                        TYPE: 'A'
                    }
                }
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
        'tasks.template.checklist.add',
        [
            'templateId' => 139,
            'fields' => [
                'TITLE' => '4. Подготовить дашборд',
                'PARENT_ID' => 23,
                'SORT_INDEX' => 200,
                'IS_COMPLETE' => 'N',
                'IS_IMPORTANT' => 'Y',
                'MEMBERS' => [
                    547 => [
                        'TYPE' => 'A'
                    ]
                ],
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
            "createdBy": 503,
            "parentId": 23,
            "title": "4. Подготовить дашборд",
            "sortIndex": 200,
            "displaySortIndex": "",
            "isComplete": false,
            "isImportant": true,
            "completedCount": 0,
            "members": [
                {
                    "type": "A",
                    "id": 547
                }
            ],
            "attachments": [],
            "nodeId": null,
            "templateId": 139
        }
    },
    "time": {
        "start": 1773235651,
        "finish": 1773235651.960878,
        "duration": 0.9608778953552246,
        "processing": 0,
        "date_start": "2026-03-11T16:27:31+03:00",
        "date_finish": "2026-03-11T16:27:31+03:00",
        "operating_reset_at": 1773236251,
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
[`object`](../../../data-types.md) | Созданный пункт чек-листа [(подробное описание)](#checklistitem) ||
|#

{% include [Расшифровка объекта checkListItem](./_includes/checklist-item-response.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Указано некорректное значение [] для поля [PARENT_ID] в элементе [, Новый пункт]"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `templateId` ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `400` | `0` | Не указано название элемента | Не передан обязательный параметр `fields.TITLE` или передано некорректное значение ||
|| `400` | `0` | Указано некорректное значение [] для поля [PARENT_ID] в элементе [, Название пункта] | Не передан обязательный параметр `fields.PARENT_ID` или передано некорректное значение ||
|| `400` | `0` | Добавление элемента: действие недоступно | У пользователя нет прав на добавление пункта чек-листа в шаблоне задачи ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-checklist-update.md)
- [{#T}](./tasks-template-checklist-get.md)
- [{#T}](./tasks-template-checklist-list.md)
- [{#T}](./tasks-template-checklist-delete.md)
- [{#T}](./tasks-template-checklist-complete.md)
