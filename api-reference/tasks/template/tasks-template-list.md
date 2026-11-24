# Получить список шаблонов задач tasks.template.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.template.list` возвращает список шаблонов задач, которые доступны пользователю.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **params**
[`object`](../../data-types.md) | Параметры выборки [(подробное описание)](#params).

Если не передать `params`, метод вернет все доступные шаблоны со всеми полями ||
|| **start**
[`integer`](../../data-types.md) | Параметр для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

### Параметр params {#params}

В `select`, `filter` и `order` можно указывать только эти поля шаблона: `ID`, `TITLE`, `DESCRIPTION`, `DESCRIPTION_IN_BBCODE`, `PRIORITY`, `STATUS`, `RESPONSIBLE_ID`, `TIME_ESTIMATE`, `REPLICATE`, `CREATED_BY`, `XML_ID`, `ALLOW_CHANGE_DEADLINE`, `ALLOW_TIME_TRACKING`, `TASK_CONTROL`, `ADD_IN_REPORT`, `MATCH_WORK_TIME`, `GROUP_ID`, `PARENT_ID`, `MULTITASK`, `SITE_ID`, `REPLICATE_PARAMS`, `TAGS`, `ACCOMPLICES`, `AUDITORS`, `RESPONSIBLES`, `DEPENDS_ON`, `DEADLINE_AFTER`, `START_DATE_PLAN_AFTER`, `END_DATE_PLAN_AFTER`, `TASK_ID`, `STAGE_ID`, `TPARAM_TYPE`, `TPARAM_REPLICATION_COUNT`, `REPLICATE_TYPE`, `ZOMBIE`, `FILES`. Описание полей — в статье [Поля шаблона задачи](./fields.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив полей, которые нужно вернуть.

Пользовательские поля `UF_*`, поля `SE_CHECKLIST`, `SE_ACCESS`, `SE_TAG` и `BASE_TEMPLATE_ID` в `select` указать нельзя. Метод возвращает их, только если `select` не передан.

Значение `*` не поддерживается: метод вернет ошибку `140`. Чтобы получить все поля, не передавайте `select` ||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации шаблонов в формате `{"поле_1": "значение", "поле_2": "значение"}`.

Перед названием поля можно указать оператор:
- `!` — не равно
- `>` — больше
- `>=` — больше либо равно
- `<` — меньше
- `<=` — меньше либо равно
- `%` — содержит подстроку

Например, `{">ID": 70, "REPLICATE": "N"}` выберет шаблоны с идентификатором больше 70 без повторения ||
|| **order**
[`object`](../../data-types.md) | Объект для сортировки в формате `{"поле_1": "значение", "поле_2": "значение"}`.

Возможные значения:
- `ASC` — по возрастанию
- `DESC` — по убыванию

Если указать другое значение, метод вернет пустой список ||
|#

Параметры `select`, `filter` и `order` передавайте только внутри `params`. На верхнем уровне запроса метод их игнорирует.

Метод возвращает только шаблоны, которые пользователь может просматривать:
- созданные им шаблоны
- шаблоны, к которым ему открыли доступ в настройках шаблона
- шаблоны сотрудников своего отдела, если у пользователя есть право «Просмотр всех шаблонов своего отдела»
- шаблоны сотрудников других отделов, если у пользователя есть право «Просмотр всех шаблонов других отделов»

Права администратора Битрикс24 не расширяют выборку. Ответственному, соисполнителям и наблюдателям шаблона доступ к шаблону не открывается.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "params": {
        "select": ["ID", "TITLE", "CREATED_BY", "RESPONSIBLE_ID", "ACCOMPLICES", "AUDITORS", "REPLICATE", "GROUP_ID"],
        "filter": {
          "CREATED_BY": 1,
          "REPLICATE": "N"
        },
        "order": {
          "ID": "DESC"
        }
      },
      "start": 0
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "params": {
        "select": ["ID", "TITLE", "CREATED_BY", "RESPONSIBLE_ID", "ACCOMPLICES", "AUDITORS", "REPLICATE", "GROUP_ID"],
        "filter": {
          "CREATED_BY": 1,
          "REPLICATE": "N"
        },
        "order": {
          "ID": "DESC"
        }
      },
      "start": 0,
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type TaskTemplate = {
      ID: number
      TITLE: string
      CREATED_BY: string
      RESPONSIBLE_ID: string
      ACCOMPLICES: number[]
      AUDITORS: number[]
      REPLICATE: string
      GROUP_ID: string | null
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    // An empty page comes as an array [], a non-empty one as an object keyed by template ID
    type TaskTemplateListResult = {
      task_templates: Record<string, TaskTemplate> | []
    }

    try {
      // tasks.template.list returns a single page (50 records). Pass `start` to get the next page.
      const response = await $b24.actions.v2.call.make<TaskTemplateListResult>({
        method: 'tasks.template.list',
        params: {
          params: {
            select: ['ID', 'TITLE', 'CREATED_BY', 'RESPONSIBLE_ID', 'ACCOMPLICES', 'AUDITORS', 'REPLICATE', 'GROUP_ID'],
            filter: {
              CREATED_BY: 1,
              REPLICATE: 'N',
            },
            order: {
              ID: 'DESC',
            },
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const templates = Object.values(response.getData()!.result.task_templates)
        templates.forEach((template) => console.info(template.ID, template.TITLE))
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
      async function getTaskTemplates() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // tasks.template.list returns a single page (50 records). Pass `start` to get the next page.
          const response = await $b24.actions.v2.call.make({
            method: 'tasks.template.list',
            params: {
              params: {
                select: ['ID', 'TITLE', 'CREATED_BY', 'RESPONSIBLE_ID', 'ACCOMPLICES', 'AUDITORS', 'REPLICATE', 'GROUP_ID'],
                filter: {
                  CREATED_BY: 1,
                  REPLICATE: 'N',
                },
                order: {
                  ID: 'DESC',
                },
              },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          // An empty page comes as an array [], a non-empty one as an object keyed by template ID
          const templates = Object.values(response.getData().result.task_templates)
          templates.forEach((template) => console.info(template.ID, template.TITLE))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTaskTemplates)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        # В b24pysdk нет готовой обертки для tasks.template.list, поэтому метод
        # вызывается напрямую через bitrix_token.call_method()
        response = bitrix_token.call_method(
            api_method="tasks.template.list",
            params={
                "params": {
                    "select": ["ID", "TITLE", "CREATED_BY", "RESPONSIBLE_ID", "ACCOMPLICES", "AUDITORS", "REPLICATE", "GROUP_ID"],
                    "filter": {
                        "CREATED_BY": 1,
                        "REPLICATE": "N",
                    },
                    "order": {
                        "ID": "DESC",
                    },
                },
                "start": 0,
            },
        )
        # Пустая страница приходит массивом [], непустая — объектом с ключами-идентификаторами
        templates = response["result"]["task_templates"] or {}
        for template in templates.values():
            print(template["ID"], template["TITLE"])
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
                'tasks.template.list',
                [
                    'params' => [
                        'select' => ['ID', 'TITLE', 'CREATED_BY', 'RESPONSIBLE_ID', 'ACCOMPLICES', 'AUDITORS', 'REPLICATE', 'GROUP_ID'],
                        'filter' => [
                            'CREATED_BY' => 1,
                            'REPLICATE' => 'N',
                        ],
                        'order' => [
                            'ID' => 'DESC',
                        ],
                    ],
                    'start' => 0,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);

    } catch (Throwable $e) {
        echo 'Ошибка получения списка шаблонов: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.template.list',
        {
            params: {
                select: ['ID', 'TITLE', 'CREATED_BY', 'RESPONSIBLE_ID', 'ACCOMPLICES', 'AUDITORS', 'REPLICATE', 'GROUP_ID'],
                filter: {
                    CREATED_BY: 1,
                    REPLICATE: 'N'
                },
                order: {
                    ID: 'DESC'
                }
            },
            start: 0
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
        'tasks.template.list',
        [
            'params' => [
                'select' => ['ID', 'TITLE', 'CREATED_BY', 'RESPONSIBLE_ID', 'ACCOMPLICES', 'AUDITORS', 'REPLICATE', 'GROUP_ID'],
                'filter' => [
                    'CREATED_BY' => 1,
                    'REPLICATE' => 'N',
                ],
                'order' => [
                    'ID' => 'DESC',
                ],
            ],
            'start' => 0,
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.template.list", b24.Params{
    	"params": b24.Params{
    		"select": []string{"ID", "TITLE", "CREATED_BY", "RESPONSIBLE_ID", "ACCOMPLICES", "AUDITORS", "REPLICATE", "GROUP_ID"},
    		"filter": b24.Params{
    			"CREATED_BY": 1,
    			"REPLICATE":  "N",
    		},
    		"order": b24.Params{
    			"ID": "DESC",
    		},
    	},
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.list: %w", err)
    }

    // Пустая страница приходит массивом [], непустая — объектом с ключами-идентификаторами,
    // поэтому сначала разберите task_templates как json.RawMessage
    var page struct {
    	TaskTemplates json.RawMessage `json:"task_templates"`
    }
    if err := json.Unmarshal(res.Result, &page); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }

    templates := map[string]struct {
    	ID    b24.ID `json:"ID"`
    	Title string `json:"TITLE"`
    }{}
    if len(page.TaskTemplates) > 0 && page.TaskTemplates[0] == '{' {
    	if err := json.Unmarshal(page.TaskTemplates, &templates); err != nil {
    		return fmt.Errorf("разбор шаблонов: %w", err)
    	}
    }
    for _, template := range templates {
    	fmt.Println(template.ID, template.Title)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "task_templates": {
            "77": {
                "ID": 77,
                "TITLE": "Шаблон для проверки чек-листа",
                "CREATED_BY": "1",
                "RESPONSIBLE_ID": "1",
                "ACCOMPLICES": [],
                "AUDITORS": [],
                "REPLICATE": "N",
                "GROUP_ID": null
            }
        }
    },
    "total": 1,
    "time": {
        "start": 1795003871,
        "finish": 1795003871.889437,
        "duration": 0.8894369602203369,
        "processing": 0,
        "date_start": "2026-11-18T15:11:11+03:00",
        "date_finish": "2026-11-18T15:11:11+03:00",
        "operating_reset_at": 1795004280,
        "operating": 0.1682889461517334
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **next**
[`integer`](../../data-types.md) | Значение `start` для следующей страницы. Возвращается, если в выборке есть еще записи ||
|| **total**
[`integer`](../../data-types.md) | Общее количество шаблонов, которые подходят под фильтр и доступны пользователю ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **task_templates**
[`object`](../../data-types.md) | Шаблоны задач. Ключ — идентификатор шаблона, значение — объект с полями из `select`.

Если в `select` не переданы поля, в объекте шаблона приходят все поля, включая пользовательские поля `UF_*`, `SE_CHECKLIST`, `SE_ACCESS`, `SE_TAG` и `BASE_TEMPLATE_ID`. Описание полей — в статье [Поля шаблона задачи](./fields.md).

В отличие от [tasks.template.get](./tasks-template-get.md), поля `ACCOMPLICES`, `AUDITORS`, `RESPONSIBLES` и `DEPENDS_ON` приходят массивами, а `REPLICATE_PARAMS` — объектом.

Если шаблонов нет, возвращается пустой массив `[]` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "INVALID_QUERY",
    "error_description": "Invalid template query parameters"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `INVALID_QUERY` | Invalid template query parameters | Возможные причины:
- в `select`, `filter` или `order` указано поле, которого нет в списке допустимых
- `select`, `filter` или `order` переданы не массивом ||
|| `400` | `100` | Invalid value {x} to match with parameter {params}. Should be value of type array. | Параметр `params` передан не объектом ||
|| `400` | `140` | Internal server error. | В `select` передано значение `*` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-list-rest-v3.md)
- [{#T}](./tasks-template-add.md)
- [{#T}](./tasks-template-update.md)
- [{#T}](./tasks-template-get.md)
- [{#T}](./tasks-template-delete.md)
- [{#T}](./tasks-template-fields.md)
