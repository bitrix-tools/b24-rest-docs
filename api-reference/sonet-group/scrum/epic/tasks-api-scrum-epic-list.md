# Получить список эпиков tasks.api.scrum.epic.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список эпиков. В список попадают только эпики тех групп, в которых состоит пользователь.

## Параметры метода

В `filter`, `select` и `order` передавайте имена полей эпика в верхнем регистре:

#|
|| **Поле ответа** | **Имя в `filter`, `select` и `order`** ||
|| `id` | `ID` ||
|| `groupId` | `GROUP_ID` ||
|| `name` | `NAME` ||
|| `description` | `DESCRIPTION` ||
|| `createdBy` | `CREATED_BY` ||
|| `modifiedBy` | `MODIFIED_BY` ||
|| `color` | `COLOR` ||
|#

{% note warning "Внимание" %}

Если в `filter` передать поле в другом регистре, например `groupId`, или несуществующее поле, метод вернет пустой массив без ошибки. Так же метод отвечает на несуществующее поле в `select` и `order`.

Поля, которых нет в `select`, метод все равно вернет, но со значением `0` или пустой строкой. Не принимайте такие значения за данные эпика

{% endnote %}

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../../../data-types.md) | Объект для сортировки результата вида `{"поле_сортировки": "направление сортировки" [, ...]}`.

Направление сортировки может принимать значения:
- `asc` — по возрастанию
- `desc` — по убыванию
||
|| **filter**
[`object`](../../../data-types.md) | Объект вида `{"фильтруемое_поле": "значение фильтра" [, ...]}`.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра.

Возможные значения префикса:
- `=` — равно (работает и с массивами)
- `%` — LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `>` — больше
- `<` — меньше
- `!=` — не равно
- `!%` — NOT LIKE, поиск по подстроке. Символ % в значении фильтра передавать не нужно. Поиск идет с обеих сторон
- `>=` — больше либо равно
- `<=` — меньше либо равно
- `=%` — LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения начинающиеся с «мол»
  - `"%мол"` — ищем значения заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (смотрите описание выше)
- `!=%` — NOT LIKE, поиск по подстроке. Символ % нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения не начинающиеся с «мол»
  - `"%мол"` — ищем значения не заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (смотрите описание выше)

Если префикса нет, а значение содержит символ `%`, фильтр тоже ищет по подстроке: `"NAME": "%эпик%"`
||
|| **select**
[`array`](../../../data-types.md) | Массив полей, которые нужно заполнить в ответе, например `["ID", "NAME"]`. Значение `"*"` или пустой массив — все поля ||
|| **start**
[`integer`](../../../data-types.md) | Смещение выборки, кратное 50, по умолчанию `0`. Размер страницы результатов всегда 50 записей: чтобы получить вторую страницу, передайте `50`, третью — `100`.

Формула расчета: `start = (N-1) * 50`, где `N` — номер нужной страницы. Значение не кратное 50 метод округляет вниз до начала страницы: при `start: 2` он вернет первую страницу
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "filter": {
            "GROUP_ID": 143,
            ">=ID": 1,
            "<=ID": 50,
            "NAME": "%эпик%",
            "!=DESCRIPTION": "old epic"
        },
        "order": {
            "ID": "asc",
            "NAME": "desc"
        },
        "select": ["ID", "NAME", "DESCRIPTION", "CREATED_BY", "MODIFIED_BY", "COLOR"],
        "start": 0
    }' \
    https://your-domain.bitrix24.com/rest/_USER_ID_/_CODE_/tasks.api.scrum.epic.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "filter": {
            "GROUP_ID": 143,
            ">=ID": 1,
            "<=ID": 50,
            "NAME": "%эпик%",
            "!=DESCRIPTION": "old epic",
            "CREATED_BY": 1,
            "MODIFIED_BY": 3,
            "COLOR": "#69dafc"
        },
        "order": {
            "ID": "asc",
            "NAME": "desc"
        },
        "select": ["ID", "NAME", "DESCRIPTION", "CREATED_BY", "MODIFIED_BY", "COLOR"],
        "start": 0,
        "auth": "YOUR_ACCESS_TOKEN"
    }' \
    https://your-domain.bitrix24.com/rest/tasks.api.scrum.epic.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each EpicItem returned in result[]
    type EpicItem = {
      id: number
      groupId: number
      name: string
      description: string
      createdBy: number
      modifiedBy: number
      color: string
    }

    try {
      // tasks.api.scrum.epic.list returns a single page (max 50 records) without `total` and `next`.
      // To load the next page, repeat the call with `start` increased by 50.
      const response = await $b24.actions.v2.call.make<EpicItem[]>({
        method: 'tasks.api.scrum.epic.list',
        params: {
          filter: {
            GROUP_ID: 143,
            '>=ID': 1,
            '<=ID': 50,
            NAME: '%epic%',
            '!=DESCRIPTION': 'old epic',
            CREATED_BY: 1,
            MODIFIED_BY: 3,
            COLOR: '#69dafc',
          },
          order: {
            ID: 'asc',
            NAME: 'desc',
          },
          select: ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Loaded epics:', result.length, result)
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
      async function loadEpicList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // tasks.api.scrum.epic.list returns a single page (max 50 records) without `total` and `next`.
          // To load the next page, repeat the call with `start` increased by 50.
          const response = await $b24.actions.v2.call.make({
            method: 'tasks.api.scrum.epic.list',
            params: {
              filter: {
                GROUP_ID: 143,
                '>=ID': 1,
                '<=ID': 50,
                NAME: '%epic%',
                '!=DESCRIPTION': 'old epic',
                CREATED_BY: 1,
                MODIFIED_BY: 3,
                COLOR: '#69dafc',
              },
              order: {
                ID: 'asc',
                NAME: 'desc',
              },
              select: ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Loaded epics:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', loadEpicList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.api.scrum.epic.list(
            filter={
                "GROUP_ID": 143,
                ">=ID": 1,
                "<=ID": 50,
                "NAME": "%epic%",
                "!=DESCRIPTION": "old epic",
                "CREATED_BY": 1,
                "MODIFIED_BY": 3,
                "COLOR": "#69dafc",
            },
            order={
                "ID": "asc",
                "NAME": "desc",
            },
            select=[
                "ID",
                "NAME",
                "DESCRIPTION",
                "CREATED_BY",
                "MODIFIED_BY",
                "COLOR",
            ],
            start=0,
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

    Пример `as_list`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.api.scrum.epic.list(
            filter={
                "GROUP_ID": 143,
                ">=ID": 1,
                "<=ID": 50,
                "NAME": "%epic%",
                "!=DESCRIPTION": "old epic",
                "CREATED_BY": 1,
                "MODIFIED_BY": 3,
                "COLOR": "#69dafc",
            },
            order={
                "ID": "asc",
                "NAME": "desc",
            },
            select=[
                "ID",
                "NAME",
                "DESCRIPTION",
                "CREATED_BY",
                "MODIFIED_BY",
                "COLOR",
            ],
        ).as_list().response
        result = bitrix_response.result
        for item in result:
            print(item)
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

    Пример `as_list_fast`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.api.scrum.epic.list(
            filter={
                "GROUP_ID": 143,
                ">=ID": 1,
                "<=ID": 50,
                "NAME": "%epic%",
                "!=DESCRIPTION": "old epic",
                "CREATED_BY": 1,
                "MODIFIED_BY": 3,
                "COLOR": "#69dafc",
            },
            order={
                "ID": "asc",
                "NAME": "desc",
            },
            select=[
                "ID",
                "NAME",
                "DESCRIPTION",
                "CREATED_BY",
                "MODIFIED_BY",
                "COLOR",
            ],
        ).as_list_fast(descending=True).response
        result = bitrix_response.result
        for item in result:
            print(item)
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
                'tasks.api.scrum.epic.list',
                [
                    'filter' => [
                        'GROUP_ID'      => $groupId,
                        '>=ID'          => 1,
                        '<=ID'          => 50,
                        'NAME'          => '%эпик%',
                        '!=DESCRIPTION' => 'old epic',
                        'CREATED_BY'    => 1,
                        'MODIFIED_BY'   => 3,
                        'COLOR'         => '#69dafc'
                    ],
                    'order'  => [
                        'ID'   => 'asc',
                        'NAME' => 'desc'
                    ],
                    'select' => ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
                    'start'  => 0
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const groupId = 143;
    BX24.callMethod(
        'tasks.api.scrum.epic.list',
        {
            filter: {
                GROUP_ID: groupId,
                '>=ID': 1,
                '<=ID': 50,
                'NAME': '%эпик%',
                '!=DESCRIPTION': 'old epic',
                'CREATED_BY': 1,
                'MODIFIED_BY': 3,
                'COLOR': '#69dafc'
            },
            order: {
                'ID': 'asc',
                'NAME': 'desc'
            },
            select: ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR']
        },
        function(res)
        {
            if (res.error())
            {
                console.error(res.error());
                return;
            }

            console.log(res.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php'); // подключение CRest PHP SDK

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.api.scrum.epic.list',
        [
            'filter' => [
                'GROUP_ID' => 143,
                '>=ID' => 1,
                '<=ID' => 50,
                'NAME' => '%эпик%',
                '!=DESCRIPTION' => 'old epic',
                'CREATED_BY' => 1,
                'MODIFIED_BY' => 3,
                'COLOR' => '#69dafc'
            ],
            'order' => [
                'ID' => 'asc',
                'NAME' => 'desc'
            ],
            'select' => ['ID', 'NAME', 'DESCRIPTION', 'CREATED_BY', 'MODIFIED_BY', 'COLOR'],
            'start' => 0
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    }
    else {
        print_r($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.api.scrum.epic.list", b24.Params{
    	"filter": b24.Params{
    		"GROUP_ID":      143,
    		">=ID":          1,
    		"<=ID":          50,
    		"NAME":          "%эпик%",
    		"!=DESCRIPTION": "old epic",
    		"CREATED_BY":    1,
    		"MODIFIED_BY":   3,
    		"COLOR":         "#69dafc",
    	},
    	"order": b24.Params{
    		"ID":   "asc",
    		"NAME": "desc",
    	},
    	"select": []string{"ID", "NAME", "DESCRIPTION", "CREATED_BY", "MODIFIED_BY", "COLOR"},
    	"start":  0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.api.scrum.epic.list: %w", err)
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
    "result": [
        {
            "id": 12,
            "groupId": 0,
            "name": "Новый эпик",
            "description": "",
            "createdBy": 1,
            "modifiedBy": 3,
            "color": "#69dafc"
        }
    ],
    "time": {
        "start": 1790263004,
        "finish": 1790263004.141055,
        "duration": 0.14105510711669922,
        "processing": 0,
        "date_start": "2026-09-24T18:16:44+03:00",
        "date_finish": "2026-09-24T18:16:44+03:00",
        "operating_reset_at": 1790263604,
        "operating": 0
    }
}
```

В примере `groupId` равен `0`, потому что поля `GROUP_ID` нет в `select` запроса. Если эпиков по условиям нет, `result` — пустой массив. Полей `total` и `next` в ответе нет.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Массив эпиков [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект эпика {#result}

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
|#

Прикрепленные файлы метод не возвращает. Получить их можно методом [tasks.api.scrum.epic.get](./tasks-api-scrum-epic-get.md).

## Обработка ошибок

У метода нет своих ошибок. Пример общей ошибки — токен приложения без scope `task`:

HTTP-статус: **401**

```json
{
    "error": "insufficient_scope",
    "error_description": "The request requires higher privileges than provided by the access token"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-api-scrum-epic-add.md)
- [{#T}](./tasks-api-scrum-epic-update.md)
- [{#T}](./tasks-api-scrum-epic-get.md)
- [{#T}](./tasks-api-scrum-epic-delete.md)
- [{#T}](./tasks-api-scrum-epic-get-fields.md)