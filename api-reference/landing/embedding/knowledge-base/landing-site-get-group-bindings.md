# Получить привязки к группам landing.site.getGroupBindings

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Просмотр в разделе Сайты

Метод `landing.site.getGroupBindings` возвращает привязки Баз знаний к группам.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **groupId**
[`integer`](../../../data-types.md) \| [`null`](../../../data-types.md) | Идентификатор группы для фильтрации.

Если не передан, возвращаются привязки ко всем группам.

`groupId` можно получить из интерфейса группы или из результата текущего метода в поле `BINDING_ID` для уже существующих привязок ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения привязок к группам, где:
- `groupId` — идентификатор группы для фильтрации

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "groupId": 174
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getGroupBindings.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "groupId": 174,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getGroupBindings.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each GroupBindingItem returned in result[]
    type GroupBindingItem = {
      ENTITY_ID: string
      ENTITY_TYPE: string
      BINDING_ID: string
      TITLE: string
      PUBLIC_URL: string
    }

    try {
      const response = await $b24.actions.v2.call.make<GroupBindingItem[]>({
        method: 'landing.site.getGroupBindings',
        params: {
          groupId: 174,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Group bindings count:', result.length, result)
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
      async function getGroupBindings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.site.getGroupBindings',
            params: {
              groupId: 174,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Group bindings count:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getGroupBindings)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.landing.site.get_group_bindings(
            group_id=174,
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
                'landing.site.getGroupBindings',
                [
                    'groupId' => 174,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting group bindings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getGroupBindings',
        {
            groupId: 174
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.site.getGroupBindings',
        [
            'groupId' => 174,
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "landing.site.getGroupBindings", b24.Params{
    	"groupId": 174,
    })
    if err != nil {
    	return fmt.Errorf("landing.site.getGroupBindings: %w", err)
    }

    var items []struct {
    	EntityID   b24.ID `json:"ENTITY_ID"`
    	EntityType string `json:"ENTITY_TYPE"`
    	BindingID  b24.ID `json:"BINDING_ID"`
    	Title      string `json:"TITLE"`
    	PublicURL  string `json:"PUBLIC_URL"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.EntityID, it.EntityType)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ENTITY_ID": "65",
            "ENTITY_TYPE": "S",
            "BINDING_ID": "5",
            "TITLE": "База знаний в темной теме",
            "PUBLIC_URL": "https://bitrix24.ru/knowledge/group/baza_znaniy_v_temnoy_teme/"
        },
        {
            "ENTITY_ID": "41",
            "ENTITY_TYPE": "S",
            "BINDING_ID": "119",
            "TITLE": "База знаний",
            "PUBLIC_URL": "https://bitrix24.ru/knowledge/group/baza_znaniy/"
        }
    ],
    "time": {
        "start": 1774956574,
        "finish": 1774956574.718824,
        "duration": 0.7188239097595215,
        "processing": 0,
        "date_start": "2026-03-31T14:29:34+03:00",
        "date_finish": "2026-03-31T14:29:34+03:00",
        "operating_reset_at": 1774957174,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Список привязок к группам [подробнее](#group-binding-item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Тип элемента result {#group-binding-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_ID**
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Идентификатор сайта ||
|| **ENTITY_TYPE**
[`string`](../../../data-types.md) | Тип объекта:

- `S` — сайт ||
|| **BINDING_ID**
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Идентификатор группы ||
|| **TITLE**
[`string`](../../../data-types.md) | Название привязанного сайта ||
|| **PUBLIC_URL**
[`string`](../../../data-types.md) | Публичный URL привязанного сайта ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Недостаточно прав."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `TYPE_ERROR` | Ошибка типа данных | Параметр `groupId` передан в несовместимом типе ||
|| `ACCESS_DENIED` | Недостаточно прав | Пользователь не прошел общие проверки доступа ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-binding-to-group.md)
- [{#T}](./landing-site-unbinding-from-group.md)
- [{#T}](./landing-site-get-menu-bindings.md)
- [{#T}](./landing-site-binding-to-menu.md)
- [{#T}](./index.md)
