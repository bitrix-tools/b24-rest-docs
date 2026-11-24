# Получить команду потока tasks.flow.Team.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, который видит поток, — администратор Битрикс24, участник потока или сотрудник отдела, указанного в потоке. Если ставить задачи в поток могут все пользователи, поток видят все сотрудники

Метод `tasks.flow.Team.list` возвращает сотрудников команды потока.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **flowData***
[`object`](../../data-types.md) | Объект с идентификатором потока в поле `id`, например `{"id": 517}`.

Идентификатор вернет метод [tasks.flow.Flow.create](./tasks-flow-flow-create.md) при создании потока, а для задачи из потока — метод [tasks.task.get](../tasks-task-get.md) ||
|| **withNavigation**
[`boolean`](../../data-types.md) | Вернуть ли вместе со списком данные постраничной навигации.

Возможные значения:

- `true` — метод возвращает объект с полями `members` и `navigation`
- `false` — метод возвращает массив сотрудников

Значение `true` можно передать как `true`, `1`, `"1"`, `"true"` или `"Y"`, остальные значения считаются `false`.

По умолчанию: `false` ||
|| **start**
[`integer`](../../data-types.md) | Смещение от начала списка. Метод возвращает по 50 сотрудников за запрос. Чтобы получить следующую страницу, передайте `start` = (`nextPage` − 1) × 50, где `nextPage` — номер следующей страницы из ответа с `withNavigation`.

По умолчанию: `0` ||
|#

Идентификатор потока передается только внутри `flowData`. Параметр `flowId`, как в [tasks.flow.Flow.get](./tasks-flow-flow-get.md), метод не принимает и отвечает ошибкой `Неизвестная ошибка [Team: 97]`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "flowData": {
            "id": 517
        },
        "withNavigation": true,
        "start": 0
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.flow.Team.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "flowData": {
            "id": 517
        },
        "withNavigation": true,
        "start": 0,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.flow.Team.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FlowTeamMember = {
      id: string,
      name: string,
      avatar: string,
      workPosition: string,
      pathToProfile: string,
    }

    type FlowTeamListResult = {
      members: FlowTeamMember[],
      navigation: {
        page: number,
        pageSize: number,
        hasMore: boolean,
        nextPage: number | null,
      },
    }

    try {
      const response = await $b24.actions.v2.call.make<FlowTeamListResult>({
        method: 'tasks.flow.Team.list',
        params: {
          flowData: { id: 517 },
          withNavigation: true,
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.members.forEach((member) => console.info(member.id, member.name))
        console.info('Next page:', result.navigation.nextPage)
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
      async function getFlowTeam() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'tasks.flow.Team.list',
            params: {
              flowData: { id: 517 },
              withNavigation: true,
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
          result.members.forEach((member) => console.info(member.id, member.name))
          console.info('Next page:', result.navigation.nextPage)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFlowTeam)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        response = bitrix_token.call_method(
            api_method="tasks.flow.Team.list",
            params={
                "flowData": {"id": 517},
                "withNavigation": True,
                "start": 0,
            },
        )
        result = response["result"]
        for member in result["members"]:
            print(member["id"], member["name"])
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
                'tasks.flow.Team.list',
                [
                    'flowData' => ['id' => 517],
                    'withNavigation' => true,
                    'start' => 0,
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
        'tasks.flow.Team.list',
        {
            flowData: { id: 517 },
            withNavigation: true,
            start: 0
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
    require_once('crest.php'); // подключение CRest PHP SDK

    // выполнение запроса к REST API
    $result = CRest::call(
        'tasks.flow.Team.list',
        [
            'flowData' => ['id' => 517],
            'withNavigation' => true,
            'start' => 0,
        ]
    );

    // Обработка ответа от Битрикс24
    if ($result['error']) {
        echo 'Error: '.$result['error_description'];
    } else {
        print_r($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.flow.Team.list", b24.Params{
    	"flowData":       b24.Params{"id": 517},
    	"withNavigation": true,
    	"start":          0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.flow.Team.list: %w", err)
    }

    var page struct {
    	Members []struct {
    		ID            string `json:"id"`
    		Name          string `json:"name"`
    		WorkPosition  string `json:"workPosition"`
    		PathToProfile string `json:"pathToProfile"`
    	} `json:"members"`
    	Navigation struct {
    		Page     int  `json:"page"`
    		PageSize int  `json:"pageSize"`
    		HasMore  bool `json:"hasMore"`
    		NextPage *int `json:"nextPage"`
    	} `json:"navigation"`
    }
    if err := json.Unmarshal(res.Result, &page); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, member := range page.Members {
    	fmt.Println(member.ID, member.Name)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Ответ с `withNavigation: true`:

```json
{
    "result": {
        "members": [
            {
                "id": "1",
                "name": "Мария Иванова",
                "avatar": "https://example.bitrix24.ru/upload/resize_cache/main/avatar.jpg",
                "workPosition": "Руководитель отдела продаж",
                "pathToProfile": "/company/personal/user/1/"
            },
            {
                "id": "3",
                "name": "Иван Петров",
                "avatar": "",
                "workPosition": "Менеджер по продажам",
                "pathToProfile": "/company/personal/user/3/"
            }
        ],
        "navigation": {
            "page": 1,
            "pageSize": 50,
            "hasMore": false,
            "nextPage": null
        }
    },
    "time": {
        "start": 1795439790,
        "finish": 1795439790.241665,
        "duration": 0.24166488647460938,
        "processing": 0,
        "date_start": "2026-11-23T16:16:30+03:00",
        "date_finish": "2026-11-23T16:16:30+03:00"
    }
}
```

Без `withNavigation` в `result` приходит только массив сотрудников, как в поле `members`. Если команда потока пуста или страница за пределами списка, массив пустой.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) \| [`object`](../../data-types.md) | Без `withNavigation` — массив сотрудников команды [(подробное описание)](#member).

С `withNavigation: true` — объект с полями `members` и `navigation` [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **members**
[`array`](../../data-types.md) | Сотрудники команды на текущей странице [(подробное описание)](#member) ||
|| **navigation**
[`object`](../../data-types.md) | Данные постраничной навигации [(подробное описание)](#navigation) ||
|#

#### Сотрудник команды {#member}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор сотрудника ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия сотрудника ||
|| **avatar**
[`string`](../../data-types.md) | Ссылка на фотографию сотрудника. Пустая строка, если фотографии нет ||
|| **workPosition**
[`string`](../../data-types.md) | Должность сотрудника. Пустая строка, если должность не указана ||
|| **pathToProfile**
[`string`](../../data-types.md) | Относительный путь к профилю сотрудника ||
|#

#### Объект navigation {#navigation}

#|
|| **Название**
`тип` | **Описание** ||
|| **page**
[`integer`](../../data-types.md) | Номер текущей страницы ||
|| **pageSize**
[`integer`](../../data-types.md) | Размер страницы. Через REST всегда `50` ||
|| **hasMore**
[`boolean`](../../data-types.md) | Есть ли следующая страница ||
|| **nextPage**
[`integer`](../../data-types.md) | Номер следующей страницы. `null`, если следующей страницы нет ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Доступ запрещен или поток не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `0` | Доступ запрещен или поток не найден | У пользователя нет права на просмотр потока ||
|| `400` | `0` | Неизвестная ошибка [Team: 97] | Не передан `flowData` или в `flowData.id` передан несуществующий поток либо не число. Так же метод отвечает, если вместо `flowData` передать `flowId` ||
|| `400` | `0` | Internal server error. | `flowData` передан не объектом, например числом `517` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./tasks-flow-flow-get.md)
- [{#T}](./tasks-flow-flow-create.md)
- [{#T}](./tasks-flow-flow-update.md)
