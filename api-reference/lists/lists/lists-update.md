# Обновить универсальный список lists.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Полный доступ» для нужного списка

Метод `lists.update` обновляет универсальный список.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп

Идентификатор можно получить с помощью метода [lists.get.iblock.type.id](./lists-get-iblock-type-id.md) ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|| **SOCNET_GROUP_ID**
[`integer`](../../data-types.md) | Идентификатор группы. Для изменения настроек списка указывать не нужно. Используйте параметр, если хотите перенести список в другую группу.

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

Назначить права доступа можно только пользователям или отделам, у которых их еще нет. Нельзя изменить уже существующие права

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
[`array`](../../data-types.md) | Картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате [base64](../../files/how-to-update-files.md#kak-kodirovat-fajl-v-base64) ||
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
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":109,"FIELDS":{"NAME":"Обновленный список задач","DESCRIPTION":"Обновленное описание: список для управления ежедневными задачами","SORT":600,"BIZPROC":"N"},"MESSAGES":{"ELEMENTS_NAME":"Пункты","ELEMENT_NAME":"Пункт","ELEMENT_ADD":"Создать пункт","ELEMENT_EDIT":"Редактировать пункт","ELEMENT_DELETE":"Удалить пункт","SECTIONS_NAME":"Категории","SECTION_NAME":"Категория","SECTION_ADD":"Добавить категорию","SECTION_EDIT":"Редактировать категорию","SECTION_DELETE":"Удалить категорию"},"RIGHTS":{"D15":"W"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/lists.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":109,"FIELDS":{"NAME":"Обновленный список задач","DESCRIPTION":"Обновленное описание: список для управления ежедневными задачами","SORT":600,"BIZPROC":"N"},"MESSAGES":{"ELEMENTS_NAME":"Пункты","ELEMENT_NAME":"Пункт","ELEMENT_ADD":"Создать пункт","ELEMENT_EDIT":"Редактировать пункт","ELEMENT_DELETE":"Удалить пункт","SECTIONS_NAME":"Категории","SECTION_NAME":"Категория","SECTION_ADD":"Добавить категорию","SECTION_EDIT":"Редактировать категорию","SECTION_DELETE":"Удалить категорию"},"RIGHTS":{"D15":"W"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'lists.update',
        params: {
          IBLOCK_TYPE_ID: 'lists',
          IBLOCK_ID: 109,
          FIELDS: {
            NAME: 'Updated task list',
            DESCRIPTION: 'Updated description: list for managing daily tasks',
            SORT: 600,
            BIZPROC: 'N',
          },
          MESSAGES: {
            ELEMENTS_NAME: 'Items',
            ELEMENT_NAME: 'Item',
            ELEMENT_ADD: 'Create item',
            ELEMENT_EDIT: 'Edit item',
            ELEMENT_DELETE: 'Delete item',
            SECTIONS_NAME: 'Categories',
            SECTION_NAME: 'Category',
            SECTION_ADD: 'Add category',
            SECTION_EDIT: 'Edit category',
            SECTION_DELETE: 'Delete category',
          },
          RIGHTS: {
            'D15': 'W',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('List updated successfully:', result)
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
      async function updateList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'lists.update',
            params: {
              IBLOCK_TYPE_ID: 'lists',
              IBLOCK_ID: 109,
              FIELDS: {
                NAME: 'Updated task list',
                DESCRIPTION: 'Updated description: list for managing daily tasks',
                SORT: 600,
                BIZPROC: 'N',
              },
              MESSAGES: {
                ELEMENTS_NAME: 'Items',
                ELEMENT_NAME: 'Item',
                ELEMENT_ADD: 'Create item',
                ELEMENT_EDIT: 'Edit item',
                ELEMENT_DELETE: 'Delete item',
                SECTIONS_NAME: 'Categories',
                SECTION_NAME: 'Category',
                SECTION_ADD: 'Add category',
                SECTION_EDIT: 'Edit category',
                SECTION_DELETE: 'Delete category',
              },
              RIGHTS: {
                'D15': 'W',
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
          console.info('List updated successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'lists.update',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => 109,
                    'FIELDS' => [
                        'NAME' => 'Обновленный список задач',
                        'DESCRIPTION' => 'Обновленное описание: список для управления ежедневными задачами',
                        'SORT' => 600,
                        'BIZPROC' => 'N'
                    ],
                    'MESSAGES' => [
                        'ELEMENTS_NAME' => 'Пункты',
                        'ELEMENT_NAME' => 'Пункт',
                        'ELEMENT_ADD' => 'Создать пункт',
                        'ELEMENT_EDIT' => 'Редактировать пункт',
                        'ELEMENT_DELETE' => 'Удалить пункт',
                        'SECTIONS_NAME' => 'Категории',
                        'SECTION_NAME' => 'Категория',
                        'SECTION_ADD' => 'Добавить категорию',
                        'SECTION_EDIT' => 'Редактировать категорию',
                        'SECTION_DELETE' => 'Удалить категорию'
                    ],
                    'RIGHTS' => [
                        'D15' => 'W'
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
        echo 'Error updating list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'lists.update',
    {
       IBLOCK_TYPE_ID: 'lists',
       IBLOCK_ID: 109,
       FIELDS: {
         NAME: 'Обновленный список задач',
         DESCRIPTION: 'Обновленное описание: список для управления ежедневными задачами',
         SORT: 600,
         BIZPROC: 'N' 
       },
       MESSAGES: {
         ELEMENTS_NAME: 'Пункты',
         ELEMENT_NAME: 'Пункт',
         ELEMENT_ADD: 'Создать пункт',
         ELEMENT_EDIT: 'Редактировать пункт',
         ELEMENT_DELETE: 'Удалить пункт',
         SECTIONS_NAME: 'Категории',
         SECTION_NAME: 'Категория',
         SECTION_ADD: 'Добавить категорию',
         SECTION_EDIT: 'Редактировать категорию',
         SECTION_DELETE: 'Удалить категорию'
       },
       RIGHTS: {
         'D15': 'W',    // сотрудники отдела с ID=15 — изменение
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
        'lists.update',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 109,
            'FIELDS' => [
                'NAME' => 'Обновленный список задач',
                'DESCRIPTION' => 'Обновленное описание: список для управления ежедневными задачами',
                'SORT' => 600,
                'BIZPROC' => 'N'
            ],
            'MESSAGES' => [
                'ELEMENTS_NAME' => 'Пункты',
                'ELEMENT_NAME' => 'Пункт',
                'ELEMENT_ADD' => 'Создать пункт',
                'ELEMENT_EDIT' => 'Редактировать пункт',
                'ELEMENT_DELETE' => 'Удалить пункт',
                'SECTIONS_NAME' => 'Категории',
                'SECTION_NAME' => 'Категория',
                'SECTION_ADD' => 'Добавить категорию',
                'SECTION_EDIT' => 'Редактировать категорию',
                'SECTION_DELETE' => 'Удалить категорию'
            ],
            'RIGHTS' => [
                'D15' => 'W'
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
    "result": true,
    "time": {
        "start": 1764687690,
        "finish": 1764687690.350469,
        "duration": 0.35046911239624023,
        "processing": 0,
        "date_start": "2025-12-02T15:01:30+03:00",
        "date_finish": "2025-12-02T15:01:30+03:00",
        "operating_reset_at": 1764688290,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если список обновлен успешно ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_IBLOCK_NOT_FOUND",
    "error_description":"Iblock not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_NOT_FOUND` | Iblock not found | Список с таким `IBLOCK_ID` или `IBLOCK_CODE` не найден ||
|| `ERROR_UPDATE_IBLOCK` | — | Ошибка при обновлении списка ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для обновления списка ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-add.md)
- [{#T}](./lists-get.md)
- [{#T}](./lists-delete.md)
- [{#T}](./lists-get-iblock-type-id.md)