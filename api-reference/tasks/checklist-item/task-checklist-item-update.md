# Изменить пункт чек-листа task.checklistitem.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь с доступом к редактированию задачи
> - постановщик, исполнитель и соисполнители задачи

Метод `task.checklistitem.update` изменяет существующий пункт чек-листа.

Проверить права на изменение пункта можно методом [task.checklistitem.isactionallowed](./task-checklist-item-is-action-allowed.md).

## Параметры метода

{% note warning "" %}

Передавайте параметры в запросе в соответствии с порядком в таблице. Если нарушить порядок, запрос вернет ошибку или изменит другой пункт.

{% endnote %}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор пункта чек-листа.

Идентификатор пункта можно получить при [добавлении нового пункта](./task-checklist-item-add.md) или методом [получения списка пунктов чек-листа](./task-checklist-item-get-list.md) ||
|| **FIELDS***
[`object`](../../data-types.md) | Объект с [полями пункта чек-листа](#fields). Передайте только поля, которые нужно изменить ||
|#

### Параметр FIELDS {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Текст пункта чек-листа.

Если передать `PARENT_ID` со значением `0`, то `TITLE` — название чек-листа ||
|| **SORT_INDEX**
[`integer`](../../data-types.md) | Индекс сортировки. Чем меньше значение, тем выше пункт в списке или подсписке ||
|| **IS_COMPLETE**
[`string`](../../data-types.md) | Статус выполнения пункта. Возможные значения:
- `Y` — выполнен
- `N` — не выполнен

Принимает также `true` и `false`. При смене статуса система заполняет поля `TOGGLED_BY` и `TOGGLED_DATE` ||
|| **IS_IMPORTANT**
[`string`](../../data-types.md) | Отметка, что пункт важный. Возможные значения:
- `Y` — важный
- `N` — обычный

Принимает также `true` и `false` ||
|| **MEMBERS**
[`object`](../../data-types.md) | Объект с описанием участников пункта чек-листа. Ключ — идентификатор пользователя, значение — объект с параметром типа участника `TYPE`. Возможные значения типа участника:
- `'TYPE': 'A'` — соисполнитель
- `'TYPE': 'U'` — наблюдатель

Поле `MEMBERS` заменяется полностью. Чтобы сохранить текущих участников, передайте их вместе с новыми значениями. Если у участника указан другой `TYPE`, метод без ошибки пропустит весь `MEMBERS`.

Система добавит участников пункта чек-листа в задачу в тех же ролях ||
|| **PARENT_ID**
[`integer`](../../data-types.md) | Идентификатор родительского пункта. Используйте для вложенных чек-листов.

- Если передать `PARENT_ID` со значением `0`, система создаст в задаче новый чек-лист
- Если пункта с указанным `PARENT_ID` нет, пункт сохранится с этим `PARENT_ID` и не попадет ни в один чек-лист. Передавайте только идентификаторы существующих пунктов задачи
- Если переместить корневой пункт чек-листа под пункт другого чек-листа, то он переместится вместе со своими подпунктами с сохранением иерархии. Чек-листы объединятся в один ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475,"FIELDS":{"TITLE":"Подготовить отчет","PARENT_ID":447,"SORT_INDEX":100,"IS_COMPLETE":"N","IS_IMPORTANT":"N","MEMBERS":{"547":{"TYPE":"A"},"125":{"TYPE":"U"}}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.checklistitem.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":13,"ITEMID":475,"FIELDS":{"TITLE":"Подготовить отчет","PARENT_ID":447,"SORT_INDEX":100,"IS_COMPLETE":"N","IS_IMPORTANT":"N","MEMBERS":{"547":{"TYPE":"A"},"125":{"TYPE":"U"}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ChecklistItemUpdateResult = null

    try {
      const response = await $b24.actions.v2.call.make<ChecklistItemUpdateResult>({
        method: 'task.checklistitem.update',
        params: {
          TASKID: 13,
          ITEMID: 475,
          FIELDS: {
            TITLE: 'Подготовить отчет',
            PARENT_ID: 447,
            SORT_INDEX: 100,
            IS_COMPLETE: 'N',
            IS_IMPORTANT: 'N',
            MEMBERS: {
              547: { TYPE: 'A' },
              125: { TYPE: 'U' },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Checklist item updated successfully, result:', result)
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
      async function updateChecklistItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.checklistitem.update',
            params: {
              TASKID: 13,
              ITEMID: 475,
              FIELDS: {
                TITLE: 'Подготовить отчет',
                PARENT_ID: 447,
                SORT_INDEX: 100,
                IS_COMPLETE: 'N',
                IS_IMPORTANT: 'N',
                MEMBERS: {
                  547: { TYPE: 'A' },
                  125: { TYPE: 'U' },
                },
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
          console.info('Checklist item updated successfully, result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateChecklistItem)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "TITLE": "Подготовить отчет",
        "PARENT_ID": 447,
        "SORT_INDEX": 100,
        "IS_COMPLETE": "N",
        "IS_IMPORTANT": "N",
        "MEMBERS": {
            "547": {
                "TYPE": "A",
            },
            "125": {
                "TYPE": "U",
            },
        },
    }

    try:
        bitrix_response = client.task.checklistitem.update(
            task_id=13,
            item_id=475,
            fields=fields,
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
                'task.checklistitem.update',
                [
                    'TASKID' => 13,
                    'ITEMID' => 475,
                    'FIELDS' => [
                        'TITLE' => 'Подготовить отчет',
                        'PARENT_ID' => 447,
                        'SORT_INDEX' => 100,
                        'IS_COMPLETE' => 'N',
                        'IS_IMPORTANT' => 'N',
                        'MEMBERS' => [
                            547 => [
                                'TYPE' => 'A'
                            ],
                            125 => [
                                'TYPE' => 'U'
                            ]
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.update',
        {
            'TASKID': 13,
            'ITEMID': 475,
            'FIELDS': {
                'TITLE': 'Подготовить отчет',
                'PARENT_ID': 447,
                'SORT_INDEX': 100,
                'IS_COMPLETE': 'N',
                'IS_IMPORTANT': 'N',
                'MEMBERS': {
                    547: {
                        'TYPE': 'A'
                    },
                    125: {
                        'TYPE': 'U'
                    }
                }
            }
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'task.checklistitem.update',
        [
            'TASKID' => 13,
            'ITEMID' => 475,
            'FIELDS' => [
                'TITLE' => 'Подготовить отчет',
                'PARENT_ID' => 447,
                'SORT_INDEX' => 100,
                'IS_COMPLETE' => 'N',
                'IS_IMPORTANT' => 'N',
                'MEMBERS' => [
                    547 => [
                        'TYPE' => 'A'
                    ],
                    125 => [
                        'TYPE' => 'U'
                    ]
                ]
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
    res, err := client.Core().Call(ctx, "task.checklistitem.update", b24.Params{
    	"TASKID": 13,
    	"ITEMID": 475,
    	"FIELDS": b24.Params{
    		"TITLE":        "Подготовить отчет",
    		"PARENT_ID":    447,
    		"SORT_INDEX":   100,
    		"IS_COMPLETE":  "N",
    		"IS_IMPORTANT": "N",
    		"MEMBERS": b24.Params{
    			"547": b24.Params{
    				"TYPE": "A",
    			},
    			"125": b24.Params{
    				"TYPE": "U",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("task.checklistitem.update: %w", err)
    }

    // При успехе result равен null
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": null,
    "time": {
        "start": 1762432505,
        "finish": 1762432505.206889,
        "duration": 0.20688891410827637,
        "processing": 0,
        "date_start": "2025-11-06T15:35:05+03:00",
        "date_finish": "2025-11-06T15:35:05+03:00",
        "operating_reset_at": 1762433105,
        "operating": 0.13953208923339844
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
`null` | Возвращает `null`, если пункт чек-листа успешно обновлен.

Метод вернет `null` и в том случае, если передать пустой `FIELDS` или пустой `TITLE`: пункт при этом не изменится. Чтобы проверить результат, получите пункт методом [task.checklistitem.get](./task-checklist-item-get.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#4; Нет доступа к редактированию задачи; 4/TE/ACTION_NOT_ALLOWED<br>"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение**  ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#4; Нет доступа к редактированию задачи; 4/TE/ACTION_NOT_ALLOWED<br> | У пункта есть участники `MEMBERS`, а у пользователя нет права изменять задачу, чтобы добавить их в нее. Изменения пункта при этом уже сохранены ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Указано некорректное значение [] для поля [ENTITY_ID] в элементе [, Подготовить отчет]; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br> | Пункта с идентификатором `ITEMID` нет или параметры переданы не по порядку ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) expected by method ctaskchecklistitem::update(), but not given.; 256/TE/WRONG_ARGUMENTS<br> | Не передан обязательный параметр `TASKID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskchecklistitem::update() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS<br> | Указан неверный тип значения для `TASKID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) expected by method ctaskchecklistitem::update(), but not given.; 256/TE/WRONG_ARGUMENTS<br> | Не передан обязательный параметр `ITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) for method ctaskchecklistitem::update() expected to be of type "integer", but given something else.; 256/TE/WRONG_ARGUMENTS<br> | Указан неверный тип значения для `ITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_ASSERT_EXCEPTION<br> | Значение `TASKID` или `ITEMID` меньше или равно нулю ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #2 (arFields) expected by method ctaskchecklistitem::update(), but not given.; 256/TE/WRONG_ARGUMENTS<br> | Не передан обязательный параметр `FIELDS` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Bitrix\Tasks\CheckList\Internals\CheckListTree::canAttach: Невозможно создать зацикленную связь [261, 267]; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br> | В `PARENT_ID` передан подпункт изменяемого пункта ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#8; Bitrix\Tasks\CheckList\Internals\CheckListTree::canAttach: Невозможно привязать узел к себе [261, 261]; 8/TE/ACTION_FAILED_TO_BE_PROCESSED<br> | В `PARENT_ID` передан идентификатор самого пункта ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #2 (arFields) for method ctaskchecklistitem::update() must not contain key "ID".; 256/TE/WRONG_ARGUMENTS<br> | В `FIELDS` передано поле, которое нельзя изменить. Изменять можно только поля из таблицы [параметра FIELDS](#fields) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-add.md)
- [{#T}](./task-checklist-item-get.md)
- [{#T}](./task-checklist-item-get-list.md)
- [{#T}](./task-checklist-item-delete.md)
- [{#T}](./task-checklist-item-move-after-item.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
- [{#T}](./task-checklist-item-is-action-allowed.md)
