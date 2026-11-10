# Получить список подразделений department.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `department.get` возвращает список активных подразделений структуры компании, например все подразделения внутри одного родительского. Имена фильтров `ID`, `NAME`, `SORT`, `PARENT` и `UF_HEAD` пишите в верхнем регистре: фильтр в другом регистре метод игнорирует.

Метод относится к прежней версии API. Аналог в REST 3.0 — [humanresources.node.list](./node/humanresources-node-list.md), соответствие методов — в [обзоре раздела](./index.md#v2-v3).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **sort**
[`string`](../data-types.md) | Название поля, по которому нужна сортировка. Сортировка работает по полям:
- `ID` — идентификатор подразделения
- `NAME` — название подразделения
- `SORT` — порядок сортировки
- `PARENT` — идентификатор родительского подразделения
- `UF_HEAD` — идентификатор пользователя-руководителя подразделения ||
|| **order**
[`string`](../data-types.md) | Направление сортировки, по умолчанию — `ASC`:
- `ASC` — по возрастанию
- `DESC` — по убыванию ||
|| **ID**
[`integer`](../data-types.md) | Фильтр по идентификатору подразделения ||
|| **NAME**
[`string`](../data-types.md) | Фильтр по полному названию подразделения ||
|| **SORT**
[`integer`](../data-types.md) | Фильтр по полю сортировки. Метод принимает параметр, но не применяет: в ответ попадают подразделения с любым значением `SORT` ||
|| **PARENT**
[`integer`](../data-types.md) | Фильтр по идентификатору родительского подразделения. Чтобы получить подразделение верхнего уровня, передайте `0` ||
|| **UF_HEAD**
[`integer`](../data-types.md) | Фильтр по идентификатору руководителя подразделения ||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Подробности в статье [{#T}](../../settings/how-to-call-rest-api/list-methods-pecularities.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "sort": "NAME",
        "order": "DESC",
        "PARENT": 1
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/department.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "sort": "NAME",
        "order": "DESC",
        "PARENT": 1,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/department.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type Department = {
      ID: string
      NAME: string
      SORT: number
      PARENT?: string
      UF_HEAD?: string
    }

    try {
      const response = await $b24.actions.v2.call.make<Department[]>({
        method: 'department.get',
        params: {
          sort: 'NAME',
          order: 'DESC',
          PARENT: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.map((department) => department.NAME))
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
      async function getDepartments() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'department.get',
            params: {
              sort: 'NAME',
              order: 'DESC',
              PARENT: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.map((department) => department.NAME))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDepartments)
    </script>
    ```

- Python

    Пример

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.department.get(
            sort="NAME",
            order="DESC",
            parent=1,
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
        bitrix_response = client.department.get(
            sort="NAME",
            order="DESC",
            parent=1,
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

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'department.get',
                [
                    'sort'   => 'NAME',
                    'order'  => 'DESC',
                    'PARENT' => 1,
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
        'department.get',
        {
            sort: 'NAME',
            order: 'DESC',
            PARENT: 1,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'department.get',
        [
            'sort'   => 'NAME',
            'order'  => 'DESC',
            'PARENT' => 1,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "department.get", b24.Params{
    	"sort":   "NAME",
    	"order":  "DESC",
    	"PARENT": 1,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("department.get: %w", err)
    }

    var items []struct {
    	ID     b24.ID `json:"ID"`
    	Name   string `json:"NAME"`
    	Sort   int    `json:"SORT"`
    	Parent string `json:"PARENT"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Name)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
  "result": [
    {
      "ID": "17",
      "NAME": "Юр. отдел",
      "SORT": 500,
      "PARENT": "1"
    },
    {
      "ID": "3",
      "NAME": "Отдел продаж",
      "SORT": 500,
      "PARENT": "1"
    },
    {
      "ID": "4",
      "NAME": "Отдел маркетинга и рекламы",
      "SORT": 500,
      "PARENT": "1"
    },
    {
      "ID": "2",
      "NAME": "Бухгалтерия",
      "SORT": 500,
      "PARENT": "1"
    },
    {
      "ID": "15",
      "NAME": "R\u0026D",
      "SORT": 500,
      "PARENT": "1"
    }
  ],
  "total": 5,
  "time": {
    "start": 1736924749.531017,
    "finish": 1736924749.719845,
    "duration": 0.1888279914855957,
    "processing": 0.00179290771484375,
    "date_start": "2025-01-15T07:05:49+00:00",
    "date_finish": "2025-01-15T07:05:49+00:00",
    "operating": 0
  }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`department[]`](#st_department) | Список подразделений, которые подошли под фильтр ||
|| **next**
[`integer`](../data-types.md) | Значение `start` для следующей страницы. На последней странице поля нет ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Структура department {#st_department}

```json
{
    "ID": "2",
    "NAME": "Бухгалтерия",
    "SORT": 500,
    "PARENT": "1",
    "UF_HEAD": "1"
}
```

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор подразделения. Число приходит строкой ||
|| **NAME**
[`string`](../data-types.md) | Название подразделения ||
|| **SORT**
[`integer`](../data-types.md) | Поле сортировки подразделения ||
|| **PARENT**
[`string`](../data-types.md) | Идентификатор родительского подразделения. Число приходит строкой. У подразделения верхнего уровня поля нет ||
|| **UF_HEAD**
[`string`](../data-types.md) | Идентификатор пользователя-руководителя подразделения. Число приходит строкой. Если руководитель не назначен, поля нет или оно равно `"0"` ||
|#

## Обработка ошибок

У метода нет собственных ошибок. Неизвестное поле в `sort` метод игнорирует. Если подразделений по фильтру нет, `result` — пустой массив.

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./department-add.md)
- [{#T}](./department-update.md)
- [{#T}](./department-delete.md)
- [{#T}](./department-fields.md)