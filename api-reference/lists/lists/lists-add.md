# Создать универсальный список lists.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `lists.add` создает универсальный список.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока ||
|| **SOCNET_GROUP_ID**
[`integer`](../../data-types.md) | Идентификатор группы. Используйте параметр, если хотите добавить список в группу.

Идентификатор можно получить с помощью методов [socialnetwork.api.workgroup.list](../../sonet-group/socialnetwork-api-workgroup-list.md), [sonet_group.get](../../sonet-group/sonet-group-get.md) и [sonet_group.user.groups](../../sonet-group/sonet-group-user-groups.md) ||
|| **FIELDS***
[`array`](../../data-types.md) | Массив полей списка.

[Подробное описание](#parametr-fields) ||
|| **MESSAGES**
[`array`](../../data-types.md) | Массив подписей к элементам и разделам списка. Поддерживаемые значения:

- `ELEMENTS_NAME` — название элементов
- `ELEMENT_NAME` — название элемента
- `ELEMENT_ADD` — добавить элемент
- `ELEMENT_EDIT` — изменить элемент
- `ELEMENT_DELETE` — удалить элемент
- `SECTIONS_NAME` — название разделов
- `SECTION_NAME` — название раздела
- `SECTION_ADD` — добавить раздел
- `SECTION_EDIT` — изменить раздел
- `SECTION_DELETE` — удалить раздел
||
|| **RIGHTS**
[`array`](../../data-types.md) | Настройка прав доступа к списку. Массив в формате ключ-значение, где ключ — это буквенный код пользователя или отдела с идентификатором, а значение — буквенный код права. 

```js
RIGHTS: {
    'U1': 'X', // Пользователю с ID=1 — полный доступ
    'D5': 'D'  // Сотрудникам отдела с ID=5 — запрет доступа
}
```

Категории пользователей:
- `U` — пользователь
- `*` — все пользователи
- `D` — все сотрудники отдела
- `DR` — все сотрудники отдела с подотделами

Получить идентификатор пользователя можно с помощью метода [user.get](../../user/user-get.md), идентификатор отдела — методом [department.get](../../departments/department-get.md).

Виды прав:
- `D` — нет доступа
- `R` — чтение
- `E` — добавление
- `S` — просмотр в панели
- `T` — добавление в панели
- `U` — изменение с ограничениями
- `W` — изменение
- `X` — полный доступ

{% note info "" %}

Если параметр не передан, авторизованному пользователю, который вызвал метод, назначается полный доступ

{% endnote %}
||
|#

### Параметр FIELDS {#parametr-fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../data-types.md) | Название списка ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание списка ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **PICTURE**
[`array`](../../data-types.md) | Картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате [base64](../../files/how-to-upload-files.md#kak-kodirovat-fajl-v-base64) ||
|| **BIZPROC**
[`string`](../../data-types.md) | Включение поддержки бизнес-процессов. Возможные значения:
- `Y` — да
- `N` — нет 
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
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_CODE":"my_custom_list","FIELDS":{"NAME":"Мой новый список","DESCRIPTION":"Список для отслеживания задач в проекте","SORT":500,"BIZPROC":"Y"},"MESSAGES":{"ELEMENTS_NAME":"Задачи","ELEMENT_NAME":"Задача","ELEMENT_ADD":"Добавить задачу","ELEMENT_EDIT":"Изменить задачу","ELEMENT_DELETE":"Удалить задачу","SECTIONS_NAME":"Разделы","SECTION_NAME":"Раздел","SECTION_ADD":"Добавить раздел","SECTION_EDIT":"Изменить раздел","SECTION_DELETE":"Удалить раздел"},"RIGHTS":{"U1271":"X"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/lists.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_CODE":"my_custom_list","FIELDS":{"NAME":"Мой новый список","DESCRIPTION":"Список для отслеживания задач в проекте","SORT":500,"BIZPROC":"Y"},"MESSAGES":{"ELEMENTS_NAME":"Задачи","ELEMENT_NAME":"Задача","ELEMENT_ADD":"Добавить задачу","ELEMENT_EDIT":"Изменить задачу","ELEMENT_DELETE":"Удалить задачу","SECTIONS_NAME":"Разделы","SECTION_NAME":"Раздел","SECTION_ADD":"Добавить раздел","SECTION_EDIT":"Изменить раздел","SECTION_DELETE":"Удалить раздел"},"RIGHTS":{"U1271":"X"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'lists.add',
        params: {
          IBLOCK_TYPE_ID: 'lists',
          IBLOCK_CODE: 'my_custom_list',
          FIELDS: {
            NAME: 'My new list',
            DESCRIPTION: 'List for tracking project tasks',
            SORT: 500,
            BIZPROC: 'Y',
          },
          MESSAGES: {
            ELEMENTS_NAME: 'Tasks',
            ELEMENT_NAME: 'Task',
            ELEMENT_ADD: 'Add task',
            ELEMENT_EDIT: 'Edit task',
            ELEMENT_DELETE: 'Delete task',
            SECTIONS_NAME: 'Sections',
            SECTION_NAME: 'Section',
            SECTION_ADD: 'Add section',
            SECTION_EDIT: 'Edit section',
            SECTION_DELETE: 'Delete section',
          },
          RIGHTS: {
            'U1271': 'X',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created list with ID:', result)
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
      async function addList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'lists.add',
            params: {
              IBLOCK_TYPE_ID: 'lists',
              IBLOCK_CODE: 'my_custom_list',
              FIELDS: {
                NAME: 'My new list',
                DESCRIPTION: 'List for tracking project tasks',
                SORT: 500,
                BIZPROC: 'Y',
              },
              MESSAGES: {
                ELEMENTS_NAME: 'Tasks',
                ELEMENT_NAME: 'Task',
                ELEMENT_ADD: 'Add task',
                ELEMENT_EDIT: 'Edit task',
                ELEMENT_DELETE: 'Delete task',
                SECTIONS_NAME: 'Sections',
                SECTION_NAME: 'Section',
                SECTION_ADD: 'Add section',
                SECTION_EDIT: 'Edit section',
                SECTION_DELETE: 'Delete section',
              },
              RIGHTS: {
                'U1271': 'X',
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
          console.info('Created list with ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'lists.add',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_CODE' => 'my_custom_list',
                    'FIELDS' => [
                        'NAME' => 'Мой новый список',
                        'DESCRIPTION' => 'Список для отслеживания задач в проекте',
                        'SORT' => 500,
                        'BIZPROC' => 'Y'
                    ],
                    'MESSAGES' => [
                        'ELEMENTS_NAME' => 'Задачи',
                        'ELEMENT_NAME' => 'Задача',
                        'ELEMENT_ADD' => 'Добавить задачу',
                        'ELEMENT_EDIT' => 'Изменить задачу',
                        'ELEMENT_DELETE' => 'Удалить задачу',
                        'SECTIONS_NAME' => 'Разделы',
                        'SECTION_NAME' => 'Раздел',
                        'SECTION_ADD' => 'Добавить раздел',
                        'SECTION_EDIT' => 'Изменить раздел',
                        'SECTION_DELETE' => 'Удалить раздел'
                    ],
                    'RIGHTS' => [
                        'U1271' => 'X'
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
        echo 'Error adding list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'lists.add',
      {
         IBLOCK_TYPE_ID: 'lists',
         IBLOCK_CODE: 'my_custom_list',
         FIELDS: {
           NAME: 'Мой новый список',
           DESCRIPTION: 'Список для отслеживания задач в проекте',
           SORT: 500,
           BIZPROC: 'Y'
         },
         MESSAGES: {
           ELEMENTS_NAME: 'Задачи',
           ELEMENT_NAME: 'Задача',
           ELEMENT_ADD: 'Добавить задачу',
           ELEMENT_EDIT: 'Изменить задачу',
           ELEMENT_DELETE: 'Удалить задачу',
           SECTIONS_NAME: 'Разделы',
           SECTION_NAME: 'Раздел',
           SECTION_ADD: 'Добавить раздел',
           SECTION_EDIT: 'Изменить раздел',
           SECTION_DELETE: 'Удалить раздел'
         },
         RIGHTS: {
           'U1271': 'X',     // пользователь с ID=1271 — полный доступ
         }
       },
         function(result) {
            if (result.error()) {
               console.error(result.error());
            } else {
               console.log(result.data());
         }
       }
    );
    ```
- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'lists.add',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_CODE' => 'my_custom_list',
            'FIELDS' => [
                'NAME' => 'Мой новый список',
                'DESCRIPTION' => 'Список для отслеживания задач в проекте',
                'SORT' => 500,
                'BIZPROC' => 'Y'
            ],
            'MESSAGES' => [
                'ELEMENTS_NAME' => 'Задачи',
                'ELEMENT_NAME' => 'Задача',
                'ELEMENT_ADD' => 'Добавить задачу',
                'ELEMENT_EDIT' => 'Изменить задачу',
                'ELEMENT_DELETE' => 'Удалить задачу',
                'SECTIONS_NAME' => 'Разделы',
                'SECTION_NAME' => 'Раздел',
                'SECTION_ADD' => 'Добавить раздел',
                'SECTION_EDIT' => 'Изменить раздел',
                'SECTION_DELETE' => 'Удалить раздел'
            ],
            'RIGHTS' => [
                'U1271' => 'X'
            ]
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
    "result": 109,
    "time": {
       "start": 1764675143,
       "finish": 1764675143.174578,
       "duration": 0.17457795143127441,
       "processing": 0,
       "date_start": "2025-12-02T14:32:23+03:00",
       "date_finish": "2025-12-02T14:32:23+03:00",
       "operating_reset_at": 1764675743,
       "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного инфоблока ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_IBLOCK_ALREADY_EXISTS",
    "error_description":"Iblock already exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_ALREADY_EXISTS` | Iblock already exists | Список с таким `IBLOCK_CODE` уже существует ||
|| `ERROR_ADD_IBLOCK` | — | Ошибка при добавлении списка ||
|| `ACCESS_DENIED` | Access denied | Метод запустил не администратор ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-update.md)
- [{#T}](./lists-get.md)
- [{#T}](./lists-delete.md)
- [{#T}](./lists-get-iblock-type-id.md)