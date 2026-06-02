# Добавить вложение в пункт чек-листа по содержимому tasks.template.checklist.addAttachmentByContent

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение шаблона задачи

Метод `tasks.template.checklist.addAttachmentByContent` добавляет вложение в пункт чек-листа по содержимому файла.

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
|| **attachmentParameters***
[`object`](../../../data-types.md) | Параметры создаваемого вложения [(подробное описание)](#attachmentparameters) ||
|#

### Параметр attachmentParameters {#attachmentparameters}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../../data-types.md) | Имя создаваемого файла ||
|| **CONTENT**
[`string`](../../../data-types.md) | Содержимое файла в формате base64 ||
|#

{% note tip "Частые кейсы и сценарии" %}

- [Как загрузить файлы](../../../files/how-to-upload-files.md)

{% endnote %}

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
      "attachmentParameters": {
        "NAME": "dashboard-note.txt",
        "CONTENT": "RGFzaGJvYXJkIG5vdGU="
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.addAttachmentByContent
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "checkListItemId": 37,
      "attachmentParameters": {
        "NAME": "dashboard-note.txt",
        "CONTENT": "RGFzaGJvYXJkIG5vdGU="
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.checklist.addAttachmentByContent
    ```

- TS

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CheckListItemResult = {
      checkListItem: {
        id: number
        copiedId: number | null
        userId: number
        createdBy: number | null
        parentId: number
        title: string
        sortIndex: number
        displaySortIndex: string
        isComplete: boolean
        isImportant: boolean
        completedCount: number
        members: Array<{
          id: string
          type: string
          name: string
          personalPhoto: string
          personalGender: string
          image: string
          isCollaber: boolean
        }>
        attachments: unknown[]
        nodeId: number | null
        templateId: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CheckListItemResult>({
        method: 'tasks.template.checklist.addAttachmentByContent',
        params: {
          templateId: 139,
          checkListItemId: 37,
          attachmentParameters: {
            NAME: 'dashboard-note.txt',
            CONTENT: 'RGFzaGJvYXJkIG5vdGU=',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.checkListItem.id, result.checkListItem.title)
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
      async function addAttachmentByContent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.template.checklist.addAttachmentByContent',
            params: {
              templateId: 139,
              checkListItemId: 37,
              attachmentParameters: {
                NAME: 'dashboard-note.txt',
                CONTENT: 'RGFzaGJvYXJkIG5vdGU=',
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
          console.info(result.checkListItem.id, result.checkListItem.title)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addAttachmentByContent)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.template.checklist.addAttachmentByContent',
                [
                    'templateId' => 139,
                    'checkListItemId' => 37,
                    'attachmentParameters' => [
                        'NAME' => 'dashboard-note.txt',
                        'CONTENT' => 'RGFzaGJvYXJkIG5vdGU='
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
        'tasks.template.checklist.addAttachmentByContent',
        {
            templateId: 139,
            checkListItemId: 37,
            attachmentParameters: {
                NAME: 'dashboard-note.txt',
                CONTENT: 'RGFzaGJvYXJkIG5vdGU='
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
        'tasks.template.checklist.addAttachmentByContent',
        [
            'templateId' => 139,
            'checkListItemId' => 37,
            'attachmentParameters' => [
                'NAME' => 'dashboard-note.txt',
                'CONTENT' => 'RGFzaGJvYXJkIG5vdGU='
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
            "sortIndex": 2,
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
        "start": 1773303072,
        "finish": 1773303072.349161,
        "duration": 0.34916090965270996,
        "processing": 0,
        "date_start": "2026-03-12T11:11:12+03:00",
        "date_finish": "2026-03-12T11:11:12+03:00",
        "operating_reset_at": 1773303672,
        "operating": 0.2779998779296875
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа [(подробное описание)](#result).

{% note info "" %}

Новый файл не отображается в ответе метода `tasks.template.checklist.addAttachmentByContent` в `attachments`. Чтобы получить данные о новом файле выполните метод [tasks.template.checklist.get](./tasks-template-checklist-get.md)

{% endnote %}

||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **checkListItem**
[`object`](../../../data-types.md) | Пункт чек-листа после добавления вложения [(подробное описание)](#checklistitem) ||
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
|| `400` | `100` | Could not find value for parameter {attachmentParameters} | Не передан или передан пустым обязательный параметр `attachmentParameters` ||
|| `400` | `0` | Произошла ошибка при добавлении вложения | Указан несуществующий или пустой `checkListItemId` ||
|| `400` | `0` | Изменение элемента: действие недоступно | У пользователя нет прав доступа на изменение шаблона задачи ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-checklist-add.md)
- [{#T}](./tasks-template-checklist-update.md)
- [{#T}](./tasks-template-checklist-get.md)
- [{#T}](./tasks-template-checklist-list.md)
- [{#T}](./tasks-template-checklist-delete.md)
- [{#T}](./tasks-template-checklist-move-after.md)
- [{#T}](./tasks-template-checklist-move-before.md)
- [{#T}](./tasks-template-checklist-complete.md)
- [{#T}](./tasks-template-checklist-renew.md)
- [{#T}](./tasks-template-checklist-add-attachments-from-disk.md)
- [{#T}](./tasks-template-checklist-remove-attachments.md)
