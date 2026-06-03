# Получить пункт чек-листа task.checklistitem.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа на чтение задачи или выше

Метод `task.checklistitem.get` получает описание пункта чек-листа по идентификатору.

## Параметры метода

{% note warning "" %}

Передавайте параметры в запросе в соответствии с порядком в таблице. Если нарушить порядок, запрос вернет ошибку.

{% endnote %}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TASKID***
[`integer`](../../data-types.md) | Идентификатор задачи.

Идентификатор можно получить при [создании задачи](../tasks-task-add.md) или методом [получения списка задач](../tasks-task-list.md) ||
|| **ITEMID***
[`integer`](../../data-types.md) | Идентификатор пункта чек-листа.

Идентификатор пункта можно получить при [добавлении нового пункта](./task-checklist-item-add.md) или методом [получения списка пунктов чек-листа](./task-checklist-item-get-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":479}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/task.checklistitem.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"TASKID":8017,"ITEMID":479,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/task.checklistitem.get
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ChecklistItemResult = {
      ID: string
      TASK_ID: string
      PARENT_ID: string
      CREATED_BY: string
      TITLE: string
      SORT_INDEX: string
      IS_COMPLETE: string
      IS_IMPORTANT: string
      TOGGLED_BY: string | null
      TOGGLED_DATE: string
      MEMBERS: Array<{
        ID: string
        TYPE: string
        NAME: string
        PERSONAL_PHOTO: string
        PERSONAL_GENDER: string
        IMAGE: string
        IS_COLLABER: boolean
      }>
      ATTACHMENTS: Record<string, {
        ATTACHMENT_ID: number
        NAME: string
        SIZE: string
        FILE_ID: string
        DOWNLOAD_URL: string
        VIEW_URL: string
      }>
    }

    try {
      const response = await $b24.actions.v2.call.make<ChecklistItemResult>({
        method: 'task.checklistitem.get',
        params: {
          TASKID: 8017,
          ITEMID: 479,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Checklist item:', result.ID, result.TITLE, 'complete:', result.IS_COMPLETE)
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
      async function getChecklistItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'task.checklistitem.get',
            params: {
              TASKID: 8017,
              ITEMID: 479,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Checklist item:', result.ID, result.TITLE, 'complete:', result.IS_COMPLETE)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getChecklistItem)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'task.checklistitem.get',
                [
                    'TASKID' => 8017,
                    'ITEMID' => 479
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving checklist item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'task.checklistitem.get',
        {
            TASKID: 8017,
            ITEMID: 479
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
        'task.checklistitem.get',
        [
            'TASKID' => 8017,
            'ITEMID' => 479
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
    "result": {
        "ID": "495",
        "TASK_ID": "8017",
        "PARENT_ID": "457",
        "CREATED_BY": "503",
        "TITLE": "Подготовить отчет Андрей Сергеев Светлана Иванова Андрей Карпов",
        "SORT_INDEX": "4",
        "IS_COMPLETE": "N",
        "IS_IMPORTANT": "Y",
        "TOGGLED_BY": null,
        "TOGGLED_DATE": "",
        "MEMBERS": [
            {
                "ID": "3",
                "TYPE": "U",
                "NAME": "Андрей Карпов",
                "PERSONAL_PHOTO": "249",
                "PERSONAL_GENDER": "M",
                "IMAGE": "https://mysite.ru/b17053/resize_cache/249/c0120a8d7c10d63c83e32398d1ec4d9e/main/cd526b0644e7ff4d794ea41cb36bc423/odmin.png",
                "IS_COLLABER": false
            },
            {
                "ID": "11",
                "TYPE": "U",
                "NAME": "Андрей Сергеев",
                "PERSONAL_PHOTO": "231",
                "PERSONAL_GENDER": "M",
                "IMAGE": "https://mysite.ru/b17053/resize_cache/231/c0120a8d7c10d63c83e32398d1ec4d9e/main/026bf59e161a0bd50f401d3796800651/66b.jpg",
                "IS_COLLABER": false
            },
            {
                "ID": "103",
                "TYPE": "A",
                "NAME": "Светлана Иванова",
                "PERSONAL_PHOTO": "8644",
                "PERSONAL_GENDER": "F",
                "IMAGE": "https://mysite.ru/b17053/resize_cache/8644/c0120a8d7c10d63c83e32398d1ec4d9e/main/45f/45fff10d17d398a5583184c8350cd197/buh.jpg",
                "IS_COLLABER": false
            }
        ],
        "ATTACHMENTS": {
            "1111": {
                "ATTACHMENT_ID": 1111,
                "NAME": "Счет для клиента.pdf",
                "SIZE": "148238",
                "FILE_ID": "989",
                "DOWNLOAD_URL": "/bitrix/tools/disk/uf.php?attachedId=1111&action=download&ncc=1",
                "VIEW_URL": "/bitrix/tools/disk/uf.php?attachedId=1111&action=show&ncc=1"
            }
        }
    },
    "time": {
        "start": 1762755387,
        "finish": 1762755387.104804,
        "duration": 0.10480403900146484,
        "processing": 0,
        "date_start": "2025-11-10T09:16:27+03:00",
        "date_finish": "2025-11-10T09:16:27+03:00",
        "operating_reset_at": 1762755987,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с [описанием полей пункта чек-листа](#result-fields) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result {#result-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор пункта чек-листа ||
|| **TASK_ID**
[`string`](../../data-types.md) | Идентификатор задачи, к которой относится пункт ||
|| **PARENT_ID**
[`string`](../../data-types.md) | Идентификатор родительского пункта.

Значение `0` означает корневой пункт ||
|| **CREATED_BY**
[`string`](../../data-types.md) | Идентификатор автора пункта ||
|| **TITLE**
[`string`](../../data-types.md) | Текст пункта чек-листа.

Если `PARENT_ID = 0`, поле содержит название чек-листа ||
|| **SORT_INDEX**
[`string`](../../data-types.md) | Индекс сортировки.

Чем меньше значение, тем выше пункт в списке или подсписке ||
|| **IS_COMPLETE**
[`boolean`](../../data-types.md) | Статус выполнения пункта. Возможные значения:
- `Y` — выполнен,
- `N` — не выполнен ||
|| **IS_IMPORTANT**
[`boolean`](../../data-types.md) | Отметка важности пункта. Возможные значения:
- `Y` — важный,
- `N` — обычный ||
|| **TOGGLED_BY**
[`string`](../../data-types.md) | Идентификатор пользователя, который последний раз сменил статус пункта.

Может быть `null`, если статус не меняли ||
|| **TOGGLED_DATE**
[`string`](../../data-types.md) | Дата и время изменения статуса пункта в формате `ISO 8601` ||
|| **MEMBERS**
[`array`](../../data-types.md) | Список объектов с [описанием участников](#members) ||
|| **ATTACHMENTS**
[`object`](../../data-types.md) | Объект с [описанием прикрепленных файлов](#attachments).

Ключ — идентификатор прикрепления файла `ATTACHMENT_ID` ||
|#

#### Объект members {#members}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор пользователя ||
|| **TYPE**
[`string`](../../data-types.md) | Роль пользователя в пункте чек-листа. Возможные значения:
- `A` — соисполнитель,
- `U` — наблюдатель ||
|| **NAME**
[`string`](../../data-types.md) | Имя пользователя ||
|| **PERSONAL_PHOTO**
[`string`](../../data-types.md) | Идентификатор файла с аватаром пользователя на Диске ||
|| **PERSONAL_GENDER**
[`string`](../../data-types.md) | Пол пользователя. Возможные значения:
- `M` — мужчина,
- `F` — женщина ||
|| **IMAGE**
[`string`](../../data-types.md) | Ссылка на аватар пользователя ||
|| **IS_COLLABER**
[`boolean`](../../data-types.md) | Признак, что пользователь является внешним участником ||
|#

#### Объект attachments {#attachments}

#|
|| **Название**
`тип` | **Описание** ||
|| **ATTACHMENT_ID**
[`integer`](../../data-types.md) | Идентификатор прикрепления ||
|| **NAME**
[`string`](../../data-types.md) | Имя файла ||
|| **SIZE**
[`string`](../../data-types.md) | Размер файла в байтах ||
|| **FILE_ID**
[`string`](../../data-types.md) | Идентификатор файла на Диске ||
|| **DOWNLOAD_URL**
[`string`](../../data-types.md) | Ссылка для скачивания файла ||
|| **VIEW_URL**
[`string`](../../data-types.md) | Ссылка для просмотра файла в браузере ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_CORE",
    "error_description":"TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) expected by method ctaskchecklistitem::get(), but not given.; 256\/TE\/WRONG_ARGUMENTS\u003Cbr\u003E"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение**  ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#256; Param #1 (itemId) expected by method ctaskchecklistitem::get(), but not given.; 256\/TE\/WRONG_ARGUMENTS\u003Cbr\u003E | Не переданы обязательные параметры `TASKID` и `ITEMID`  ||
|| `ERROR_CORE` | error_description":"TASKS_ERROR_EXCEPTION_#256; Param #0 (taskId) for method ctaskchecklistitem::get() expected to be of type \u0022integer\u0022, but given something else.; 256\/TE\/WRONG_ARGUMENTS\u003Cbr\u003E | Указан неверный тип значения для `TASKID` или `ITEMID` ||
|| `ERROR_CORE` | TASKS_ERROR_EXCEPTION_#512; Check listitem not found or not accessible; 512\/TE\/ITEM_NOT_FOUND_OR_NOT_ACCESSIBLE\u003Cbr\u003E | Возможные причины:
- нарушен порядок параметров в методе
- указанный `TASKID` или `ITEMID` не существует
- у пользователя нет прав доступа к задаче ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./task-checklist-item-add.md)
- [{#T}](./task-checklist-item-update.md)
- [{#T}](./task-checklist-item-get-list.md)
- [{#T}](./task-checklist-item-delete.md)
- [{#T}](./task-checklist-item-move-after-item.md)
- [{#T}](./task-checklist-item-complete.md)
- [{#T}](./task-checklist-item-renew.md)
- [{#T}](./task-checklist-item-is-action-allowed.md)
