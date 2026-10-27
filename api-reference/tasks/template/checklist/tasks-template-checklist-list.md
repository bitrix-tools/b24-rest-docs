# Получить список пунктов чек-листа шаблона задачи tasks.template.checklist.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения шаблона задачи

Метод `tasks.template.checklist.list` возвращает список пунктов чек-листа шаблона задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор шаблона задачи можно получить при [создании нового шаблона](../tasks-template-add.md) ||
|| **filter**
[`object`](../../../data-types.md) | Фильтр выборки пунктов чек-листа вида `{ "поле": "значение", ... }`.

Фильтровать можно по полям:
- `ID` — идентификатор пункта чек-листа
- `TEMPLATE_ID` — идентификатор шаблона задачи
- `PARENT_ID` — идентификатор родительского пункта
- `TITLE` — текст пункта чек-листа
- `SORT_INDEX` — индекс сортировки
- `IS_COMPLETE` — статус выполнения пункта
- `IS_IMPORTANT` — отметка важности пункта: `Y` — важный, `N` — обычный

Статус и важность можно передать как `Y` и `N` или как `true` и `false`. Поля не из списка метод пропускает без ошибки.

Параметр `templateId` принудительно добавляется в фильтр как `TEMPLATE_ID`, даже если в `filter` передано другое значение ||
|| **select**
[`array`](../../../data-types.md) | Список полей для выборки. Если параметр не передан, метод возвращает все поля.

В выборке можно указать поля:
- `ID` — идентификатор пункта чек-листа
- `TEMPLATE_ID` — идентификатор шаблона задачи
- `PARENT_ID` — идентификатор родительского пункта
- `TITLE` — текст пункта чек-листа
- `SORT_INDEX` — индекс сортировки
- `IS_COMPLETE` — статус выполнения пункта
- `IS_IMPORTANT` — отметка важности пункта
- `MEMBERS` — список участников пункта
- `ATTACHMENTS` — список вложений пункта

Если в `select` нет поля `ID`, идентификатор остается только ключом элемента в `checkListItems` ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки результата вида `{ "поле": "значение сортировки", ... }`.

Сортировать можно по полям:
- `ID` — идентификатор пункта чек-листа
- `TEMPLATE_ID` — идентификатор шаблона задачи
- `PARENT_ID` — идентификатор родительского пункта
- `TITLE` — текст пункта чек-листа
- `SORT_INDEX` — индекс сортировки
- `IS_COMPLETE` — статус выполнения пункта
- `IS_IMPORTANT` — отметка важности пункта

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию

Поля не из списка метод пропускает без ошибки.

По умолчанию результат сортируется по `TEMPLATE_ID` по убыванию, затем по `SORT_INDEX` по возрастанию и по `ID` по убыванию ||
|#

{% note info "" %}

Метод возвращает все подходящие пункты одним ответом. Постраничной выборки у метода нет, параметр `start` он не учитывает.

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
      "filter": {
        "IS_COMPLETE": "N",
        "IS_IMPORTANT": "N"
      },
      "select": [
        "ID",
        "TEMPLATE_ID",
        "PARENT_ID",
        "TITLE",
        "SORT_INDEX",
        "IS_COMPLETE",
        "IS_IMPORTANT"
      ],
      "order": {
        "SORT_INDEX": "asc",
        "ID": "desc"
      }
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "filter": {
        "IS_COMPLETE": "N",
        "IS_IMPORTANT": "N"
      },
      "select": [
        "ID",
        "TEMPLATE_ID",
        "PARENT_ID",
        "TITLE",
        "SORT_INDEX",
        "IS_COMPLETE",
        "IS_IMPORTANT"
      ],
      "order": {
        "SORT_INDEX": "asc",
        "ID": "desc"
      },
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.checklist.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CheckListItem = {
      id: string
      templateId: string
      parentId: number | string
      title: string
      sortIndex: string
      isComplete: string
      isImportant: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CheckListItemsResult = {
      checkListItems: Record<string, CheckListItem>
    }

    try {
      // tasks.template.checklist.list returns all matching items in one response:
      // the method has no pagination and ignores `start`, so a single call.make is enough
      const response = await $b24.actions.v2.call.make<CheckListItemsResult>({
        method: 'tasks.template.checklist.list',
        params: {
          templateId: 139,
          filter: {
            IS_COMPLETE: 'N',
            IS_IMPORTANT: 'N',
          },
          select: [
            'ID',
            'TEMPLATE_ID',
            'PARENT_ID',
            'TITLE',
            'SORT_INDEX',
            'IS_COMPLETE',
            'IS_IMPORTANT',
          ],
          order: {
            SORT_INDEX: 'asc',
            ID: 'desc',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(
          'Checklist items count:', Object.keys(result.checkListItems).length,
          'Items:', result.checkListItems
        )
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
      async function listTemplateChecklistItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // tasks.template.checklist.list returns all matching items in one response:
          // the method has no pagination and ignores `start`, so a single call.make is enough
          const response = await $b24.actions.v2.call.make({
            method: 'tasks.template.checklist.list',
            params: {
              templateId: 139,
              filter: {
                IS_COMPLETE: 'N',
                IS_IMPORTANT: 'N',
              },
              select: [
                'ID',
                'TEMPLATE_ID',
                'PARENT_ID',
                'TITLE',
                'SORT_INDEX',
                'IS_COMPLETE',
                'IS_IMPORTANT',
              ],
              order: {
                SORT_INDEX: 'asc',
                ID: 'desc',
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
          console.info(
            'Checklist items count:', Object.keys(result.checkListItems).length,
            'Items:', result.checkListItems
          )
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTemplateChecklistItems)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.template.checklist.list(
            template_id=139,
            filter={
                "IS_COMPLETE": "N",
                "IS_IMPORTANT": "N",
            },
            select=[
                "ID",
                "TEMPLATE_ID",
                "PARENT_ID",
                "TITLE",
                "SORT_INDEX",
                "IS_COMPLETE",
                "IS_IMPORTANT",
            ],
            order={
                "SORT_INDEX": "asc",
                "ID": "desc",
            },
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
                'tasks.template.checklist.list',
                [
                    'templateId' => 139,
                    'filter' => [
                        'IS_COMPLETE' => 'N',
                        'IS_IMPORTANT' => 'N',
                    ],
                    'select' => [
                        'ID',
                        'TEMPLATE_ID',
                        'PARENT_ID',
                        'TITLE',
                        'SORT_INDEX',
                        'IS_COMPLETE',
                        'IS_IMPORTANT',
                    ],
                    'order' => [
                        'SORT_INDEX' => 'asc',
                        'ID' => 'desc',
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
        'tasks.template.checklist.list',
        {
            templateId: 139,
            filter: {
                IS_COMPLETE: 'N',
                IS_IMPORTANT: 'N'
            },
            select: [
                'ID',
                'TEMPLATE_ID',
                'PARENT_ID',
                'TITLE',
                'SORT_INDEX',
                'IS_COMPLETE',
                'IS_IMPORTANT'
            ],
            order: {
                SORT_INDEX: 'asc',
                ID: 'desc'
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
        'tasks.template.checklist.list',
        [
            'templateId' => 139,
            'filter' => [
                'IS_COMPLETE' => 'N',
                'IS_IMPORTANT' => 'N',
            ],
            'select' => [
                'ID',
                'TEMPLATE_ID',
                'PARENT_ID',
                'TITLE',
                'SORT_INDEX',
                'IS_COMPLETE',
                'IS_IMPORTANT',
            ],
            'order' => [
                'SORT_INDEX' => 'asc',
                'ID' => 'desc',
            ]
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.template.checklist.list", b24.Params{
    	"templateId": 139,
    	"filter": b24.Params{
    		"IS_COMPLETE":  "N",
    		"IS_IMPORTANT": "N",
    	},
    	"select": []string{"ID", "TEMPLATE_ID", "PARENT_ID", "TITLE", "SORT_INDEX", "IS_COMPLETE", "IS_IMPORTANT"},
    	"order": b24.Params{
    		"SORT_INDEX": "asc",
    		"ID":         "desc",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.checklist.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "checkListItems".
    raw, ok := b24.Unwrap(res.Result, "checkListItems")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа checkListItems")
    }

    fmt.Printf("%s\n", raw)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "checkListItems": {
            "23": {
                "id": "23",
                "templateId": "139",
                "parentId": 0,
                "title": "Что нужно сделать",
                "sortIndex": "0",
                "isComplete": "N",
                "isImportant": "N"
            },
            "27": {
                "id": "27",
                "templateId": "139",
                "parentId": "23",
                "title": "2. Заполнить форму отчета",
                "sortIndex": "1",
                "isComplete": "N",
                "isImportant": "N"
            },
            "29": {
                "id": "29",
                "templateId": "139",
                "parentId": "23",
                "title": "3. Отправить отчет руководителю",
                "sortIndex": "3",
                "isComplete": "N",
                "isImportant": "N"
            },
            "25": {
                "id": "25",
                "templateId": "139",
                "parentId": "23",
                "title": "1. Собрать данные",
                "sortIndex": "4",
                "isComplete": "N",
                "isImportant": "N"
            }
        }
    },
    "time": {
        "start": 1773316805,
        "finish": 1773316806.016895,
        "duration": 1.016895055770874,
        "processing": 0,
        "date_start": "2026-03-12T15:00:05+03:00",
        "date_finish": "2026-03-12T15:00:06+03:00",
        "operating_reset_at": 1773317406,
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
|| **checkListItems**
[`object`](../../../data-types.md) | Объект, в котором ключ — идентификатор пункта чек-листа, а значение — описание пункта [(подробное описание)](#checklistitem).

Элементы идут в порядке сортировки из `order`. В JavaScript объект с числовыми ключами перебирается по возрастанию ключей, поэтому для вывода в нужном порядке сортируйте элементы по `sortIndex` и `parentId`.

Если пунктов нет, возвращается пустой массив `[]` ||
|#

#### Объект checkListItem {#checklistitem}

Набор полей зависит от параметра `select`: в ответ попадают только перечисленные в нем поля. Если `select` не передан, возвращаются все поля из таблицы.

Метод возвращает значения строками, кроме `parentId` корневого пункта — он приходит числом `0`. Этим ответ отличается от методов [tasks.template.checklist.get](./tasks-template-checklist-get.md) и [tasks.template.checklist.add](./tasks-template-checklist-add.md), где числа и флаги типизированы.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор пункта чек-листа ||
|| **templateId**
[`string`](../../../data-types.md) | Идентификатор шаблона задачи ||
|| **parentId**
[`string`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Идентификатор родительского пункта. Для корневого пункта — число `0` ||
|| **title**
[`string`](../../../data-types.md) | Текст пункта чек-листа ||
|| **sortIndex**
[`string`](../../../data-types.md) | Индекс сортировки среди пунктов одного уровня. Чем меньше значение, тем выше пункт ||
|| **isComplete**
[`string`](../../../data-types.md) | Статус выполнения пункта:
- `Y` — выполнен
- `N` — не выполнен ||
|| **isImportant**
[`string`](../../../data-types.md) | Отметка важности пункта:
- `Y` — важный
- `N` — обычный ||
|| **members**
[`array`](../../../data-types.md) | Массив участников пункта [(подробное описание)](#members).

Если участников нет, возвращается пустой массив `[]` ||
|| **attachments**
[`object`](../../../data-types.md) | Объект, в котором ключ — идентификатор прикрепления, а значение — описание файла [(подробное описание)](#attachments).

Если вложений нет, возвращается пустой массив `[]` ||
|#

#### Объект members {#members}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор пользователя ||
|| **type**
[`string`](../../../data-types.md) | Роль пользователя в пункте чек-листа:
- `A` — соисполнитель
- `U` — наблюдатель ||
|| **name**
[`string`](../../../data-types.md) | Имя и фамилия пользователя ||
|| **personalPhoto**
[`string`](../../../data-types.md) | Идентификатор файла с аватаром пользователя ||
|| **personalGender**
[`string`](../../../data-types.md) | Пол пользователя:
- `M` — мужчина
- `F` — женщина
- пустая строка — не указан ||
|| **image**
[`string`](../../../data-types.md) | Ссылка на аватар пользователя ||
|| **isCollaber**
[`boolean`](../../../data-types.md) | Признак, что пользователь — внешний участник из коллабы ||
|#

#### Объект attachments {#attachments}

Пример значения:

```json
"attachments": {
    "621": {
        "attachmentId": 621,
        "name": "report.txt",
        "size": "28",
        "fileId": "10921",
        "downloadUrl": "/bitrix/tools/disk/uf.php?attachedId=621&action=download&ncc=1",
        "viewUrl": "/bitrix/tools/disk/uf.php?attachedId=621&action=show&ncc=1"
    }
}
```

#|
|| **Название**
`тип` | **Описание** ||
|| **attachmentId**
[`integer`](../../../data-types.md) | Идентификатор прикрепления. Передайте его в параметре `attachmentsIds` метода [tasks.template.checklist.removeAttachments](./tasks-template-checklist-remove-attachments.md), чтобы удалить вложение ||
|| **name**
[`string`](../../../data-types.md) | Имя файла ||
|| **size**
[`string`](../../../data-types.md) | Размер файла в байтах ||
|| **fileId**
[`string`](../../../data-types.md) | Идентификатор файла на Диске ||
|| **downloadUrl**
[`string`](../../../data-types.md) | Относительная ссылка для скачивания файла ||
|| **viewUrl**
[`string`](../../../data-types.md) | Относительная ссылка для просмотра файла ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Доступ к шаблону задачи запрещен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `templateId` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {templateId}. Should be value of type int. | В `templateId` передано значение, которое нельзя привести к числу ||
|| `400` | `0` | Доступ к шаблону задачи запрещен | Недостаточно прав на чтение шаблона ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./index.md)
- [{#T}](./tasks-template-checklist-add.md)
- [{#T}](./tasks-template-checklist-update.md)
- [{#T}](./tasks-template-checklist-get.md)
- [{#T}](./tasks-template-checklist-delete.md)
- [{#T}](./tasks-template-checklist-move-after.md)
- [{#T}](./tasks-template-checklist-move-before.md)
- [{#T}](./tasks-template-checklist-complete.md)
- [{#T}](./tasks-template-checklist-renew.md)
- [{#T}](./tasks-template-checklist-add-attachment-by-content.md)
- [{#T}](./tasks-template-checklist-add-attachments-from-disk.md)
- [{#T}](./tasks-template-checklist-remove-attachments.md)
