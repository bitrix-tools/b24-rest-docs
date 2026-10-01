# Привязать Базу знаний к группе Социальной сети landing.site.bindingToGroup

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр» в разделе «Сайты», правом «Размещение в Расширениях» в разделе «База знаний» и правом на редактирование Базы знаний в указанной группе

Метод `landing.site.bindingToGroup` привязывает Базу знаний к группе Социальной сети. После привязки Базе знаний присваивается тип `GROUP`, и [landing.site.getList](../../site/landing-site-get-list.md#type-scope) с `scope: "KNOWLEDGE"` ее больше не возвращает.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../../data-types.md) | Идентификатор сайта Базы знаний.

`id` можно получить в поле `ID` методом [landing.site.getList](../../site/landing-site-get-list.md#type-scope) с параметром `scope: "KNOWLEDGE"`. Без этого параметра `landing.site.getList` не возвращает Базы знаний ||
|| **groupId**^*^
[`integer`](../../../data-types.md) | Идентификатор группы Социальной сети.

`groupId` можно получить:
- из интерфейса группы
- методом [socialnetwork.api.workgroup.list](../../../sonet-group/socialnetwork-api-workgroup-list.md)
- методом [sonet_group.get](../../../sonet-group/sonet-group-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример привязки Базы знаний к группе, где:
- `id` — идентификатор сайта Базы знаний
- `groupId` — идентификатор группы

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 32,
        "groupId": 174
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.bindingToGroup.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 32,
        "groupId": 174,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.bindingToGroup.json"
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
        method: 'landing.site.bindingToGroup',
        params: {
          id: 32,
          groupId: 174,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Binding result:', result)
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
      async function bindKnowledgeBaseToGroup() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.site.bindingToGroup',
            params: {
              id: 32,
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
          console.info('Binding result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindKnowledgeBaseToGroup)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.landing.site.binding_to_group(
            bitrix_id=32,
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
                'landing.site.bindingToGroup',
                [
                    'id' => 32,
                    'groupId' => 174,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding site to group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.bindingToGroup',
        {
            id: 32,
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
        'landing.site.bindingToGroup',
        [
            'id' => 32,
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
    res, err := client.Core().Call(ctx, "landing.site.bindingToGroup", b24.Params{
    	"id":      32,
    	"groupId": 174,
    })
    if err != nil {
    	return fmt.Errorf("landing.site.bindingToGroup: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1774952664,
        "finish": 1774952665.017161,
        "duration": 1.0171608924865723,
        "processing": 0,
        "date_start": "2026-03-31T13:24:24+03:00",
        "date_finish": "2026-03-31T13:24:25+03:00",
        "operating_reset_at": 1774953265,
        "operating": 0
    }
}
```

Если привязка не выполнена:

```json
{
    "result": false,
    "time": {
        "start": 1774952712,
        "finish": 1774952712.384215,
        "duration": 0.38421511650085449,
        "processing": 0,
        "date_start": "2026-03-31T13:25:12+03:00",
        "date_finish": "2026-03-31T13:25:12+03:00",
        "operating_reset_at": 1774953312,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат привязки:

- `true` — привязка выполнена
- `false` — привязка не выполнена

Метод возвращает `false` без ошибки, если:
- сайт с указанным `id` не найден среди Баз знаний или у пользователя нет права на его просмотр
- у пользователя нет права «Размещение в Расширениях» в разделе «База знаний»
- пользователь не состоит в группе или не может редактировать в ней Базу знаний
- к группе уже привязана База знаний

Чтобы перенести Базу знаний в другую группу, сначала отвяжите ее методом [landing.site.unbindingFromGroup](./landing-site-unbinding-from-group.md). Ответ `false` не отличает перечисленные случаи. Чтобы проверить, нет ли уже привязки, вызовите [landing.site.getGroupBindings](./landing-site-get-group-bindings.md) с тем же `groupId` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: groupId | Вызов метода без `groupId` ||
|| `400` | `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: id | Вызов метода без `id` ||
|| `400` | `TYPE_ERROR` | Неверный тип одного из аргументов вызова. | В `id` или `groupId` передано нечисловое значение, например `abc` ||
|| `400` | `TYPE_ERROR` | Неверный тип аргумента вызова: id | Параметр `id` передан массивом ||
|| `400` | `TYPE_ERROR` | Неверный тип аргумента вызова: groupId | Параметр `groupId` передан массивом ||
|| `400` | `ACCESS_DENIED` | Недостаточно прав. | Метод вызывает пользователь экстранета, или у пользователя нет права «Просмотр» в разделе «Сайты» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-unbinding-from-group.md)
- [{#T}](./landing-site-get-group-bindings.md)
- [{#T}](./landing-site-binding-to-menu.md)
- [{#T}](./landing-site-get-menu-bindings.md)
- [{#T}](./index.md)
