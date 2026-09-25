# Получить поля эпика по его идентификатору tasks.api.scrum.epic.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь, имеющий доступ к Скраму

Метод получает значения полей эпика по его идентификатору `id`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор эпика.

Получить идентификаторы эпиков можно методом [`tasks.api.scrum.epic.list`](./tasks-api-scrum-epic-list.md) ||
|| **withFiles**
[`boolean`](../../../data-types.md) | Вернуть ли файлы эпика в поле `files`. По умолчанию `true`.

Чтобы получить эпик без файлов, передайте `false` или `0` ||
|#

{% note warning "Внимание" %}

Строки `"false"` и `"N"` в `withFiles` метод считает значением `true` и возвращает файлы. Передавайте булево `false` в JSON-запросе или `0`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.api.scrum.epic.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/tasks.api.scrum.epic.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EpicGetResult = {
      id: number
      groupId: number
      name: string
      description: string
      createdBy: number
      modifiedBy: number
      color: string
      files: Record<string, unknown>
    }

    try {
      const response = await $b24.actions.v2.call.make<EpicGetResult>({
        method: 'tasks.api.scrum.epic.get',
        params: {
          id: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.id, result.name, result.color)
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
      async function getEpic() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.epic.get',
            params: {
              id: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.id, result.name, result.color)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEpic)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.api.scrum.epic.get(
            bitrix_id=1,
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
        $epicId = 1;
        $response = $b24Service
            ->core
            ->call(
                'tasks.api.scrum.epic.get',
                [
                    'id' => $epicId,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting epic: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const epicId = 1;
    BX24.callMethod(
        'tasks.api.scrum.epic.get',
        {
            id: epicId,
        },
        function(res)
        {
            console.log(res);
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.api.scrum.epic.get',
        [
            'id' => 1
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.api.scrum.epic.get", b24.Params{
    	"id": 1,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.api.scrum.epic.get: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 2,
        "groupId": 2,
        "name": "Регистрация пользователей",
        "description": "Форма входа, регистрация и восстановление пароля",
        "createdBy": 1,
        "modifiedBy": 1,
        "color": "#69dafc",
        "files": {
            "ID": "60",
            "ENTITY_ID": "TASKS_SCRUM_EPIC",
            "FIELD_NAME": "UF_SCRUM_EPIC_FILES",
            "USER_TYPE_ID": "disk_file",
            "XML_ID": null,
            "SORT": "100",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "N",
            "EDIT_IN_LIST": "N",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "IBLOCK_ID": null,
                "SECTION_ID": null,
                "UF_TO_SAVE_ALLOW_EDIT": false
            },
            "USER_TYPE": {
                "USER_TYPE_ID": "disk_file",
                "CLASS_NAME": "Bitrix\\Disk\\Uf\\FileUserType",
                "DESCRIPTION": "Файл (Диск)",
                "BASE_TYPE": "int",
                "TAG": [
                    "DISK FILE ID",
                    "DOCUMENT ID"
                ]
            },
            "VALUE": [
                6
            ],
            "ENTITY_VALUE_ID": 2,
            "VALUE_EXISTS": true,
            "VALUE_RAW": "a:1:{i:0;i:6;}",
            "CUSTOM_DATA": {
                "PHOTO_TEMPLATE": ""
            },
            "EDIT_FORM_LABEL": "UF_SCRUM_EPIC_FILES",
            "TAG": "DOCUMENT ID"
        }
    },
    "time": {
        "start": 1790263942,
        "finish": 1790263942.418237,
        "duration": 0.4182369709014893,
        "processing": 0,
        "date_start": "2026-09-24T18:32:22+03:00",
        "date_finish": "2026-09-24T18:32:22+03:00",
        "operating_reset_at": 1790264542,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Данные эпика [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор эпика ||
|| **groupId**
[`integer`](../../../data-types.md) | Идентификатор Скрама, к которому относится эпик ||
|| **name**
[`string`](../../../data-types.md) | Название эпика ||
|| **description**
[`string`](../../../data-types.md) | Описание эпика ||
|| **createdBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, создавшего эпик ||
|| **modifiedBy**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним изменил эпик. Если эпик не меняли — `0` ||
|| **color**
[`string`](../../../data-types.md) | Цвет эпика ||
|| **files**
[`object`](../../../data-types.md) | Файлы эпика в виде пользовательского поля `UF_SCRUM_EPIC_FILES` [(подробное описание)](#files) ||
|#

#### Объект files {#files}

Нужные данные о файлах лежат в поле `VALUE`. Остальные поля объекта — служебное описание пользовательского поля.

#|
|| **Название**
`тип` | **Описание** ||
|| **VALUE**
[`array`](../../../data-types.md) | Идентификаторы файлов, прикрепленных к эпику. Это идентификаторы привязок, а не файлов Диска: получить имя файла, ссылку на скачивание и идентификатор файла Диска `OBJECT_ID` можно методом [disk.attachedObject.get](../../../disk/attached-object/disk-attached-object-get.md).

Если файлов нет — пустой массив ||
|| **VALUE_EXISTS**
[`boolean`](../../../data-types.md) | Приходит со значением `true`, если к эпику прикреплены файлы. Если файлов нет, этого поля в ответе нет ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Код пользовательского поля, всегда `UF_SCRUM_EPIC_FILES` ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Тип пользовательского поля, всегда `disk_file` ||
|| **ENTITY_VALUE_ID**
[`integer`](../../../data-types.md) | Идентификатор эпика ||
|| **VALUE_RAW**
[`string`](../../../data-types.md) | Значение `VALUE` в сериализованном виде PHP. Если файлов нет, этого поля в ответе нет ||
|#

Остальные поля описывают настройки самого пользовательского поля `UF_SCRUM_EPIC_FILES`. Они одинаковы у всех эпиков и не зависят от прикрепленных файлов:

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../../data-types.md) | Идентификатор пользовательского поля ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Объект, к которому относится поле, всегда `TASKS_SCRUM_EPIC` ||
|| **XML_ID**
[`string`](../../../data-types.md) \| `null` | Внешний код поля. У поля файлов эпика — `null` ||
|| **SORT**
[`string`](../../../data-types.md) | Порядок сортировки поля ||
|| **MULTIPLE**
[`string`](../../../data-types.md) | Множественное ли поле, всегда `Y` ||
|| **MANDATORY**
[`string`](../../../data-types.md) | Обязательное ли поле, всегда `N` ||
|| **SHOW_FILTER**, **SHOW_IN_LIST**, **EDIT_IN_LIST**, **IS_SEARCHABLE**
[`string`](../../../data-types.md) | Настройки показа поля в интерфейсе, `Y` или `N` ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Настройки поля: `IBLOCK_ID`, `SECTION_ID`, `UF_TO_SAVE_ALLOW_EDIT` ||
|| **USER_TYPE**
[`object`](../../../data-types.md) | Описание типа поля: `USER_TYPE_ID`, `CLASS_NAME`, `DESCRIPTION`, `BASE_TYPE`, `TAG` ||
|| **CUSTOM_DATA**
[`object`](../../../data-types.md) | Дополнительные данные типа поля ||
|| **EDIT_FORM_LABEL**
[`string`](../../../data-types.md) | Подпись поля в форме редактирования ||
|| **TAG**
[`string`](../../../data-types.md) | Метка типа поля, `DOCUMENT ID` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Epic not found | Эпика с таким `id` не существует ||
|| `400` | `0` | Access denied | У пользователя нет доступа к задачам группы, к которой относится эпик ||
|| `400` | `100` | Could not find value for parameter {id} | Не передан параметр `id` ||
|| `400` | `100` | Invalid value {stringValue} to match with parameter {id}. Should be value of type int. | В `id` передано не число ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-epic-add.md)
- [{#T}](./tasks-api-scrum-epic-update.md)
- [{#T}](./tasks-api-scrum-epic-list.md)
- [{#T}](./tasks-api-scrum-epic-delete.md)
- [{#T}](./tasks-api-scrum-epic-get-fields.md)
