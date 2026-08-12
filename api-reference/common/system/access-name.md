# Получить названия прав доступа access.name

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`базовый`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `access.name` получает названия прав доступа.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACCESS***
[`array`](../../data-types.md) | Список кодов доступа, названия для которых нужно получить.

Форматы кодов:

- `U<id>` — пользователь, например `U1`
- `G<id>` — группа пользователей, например `G2`
- `AU` — все авторизованные пользователи

Если параметр не передан или пуст, метод вернет `false` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ACCESS": ["G2", "AU"]
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/access.name
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ACCESS": ["G2", "AU"],
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/access.name
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type AccessNameItem = {
      provider: string
      name: string
      provider_id: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AccessNameResult = Record<string, AccessNameItem>

    try {
      const response = await $b24.actions.v2.call.make<AccessNameResult>({
        method: 'access.name',
        params: {
          ACCESS: ['G2', 'AU'],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(Object.keys(result), result)
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
      async function getAccessNames() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'access.name',
            params: {
              ACCESS: ['G2', 'AU'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(Object.keys(result), result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAccessNames)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'access.name',
                [
                    'ACCESS' => ['G2', 'AU']
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling access.name: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "access.name",
        {
            "ACCESS": ["G2", "AU"]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'access.name',
        [
            'ACCESS' => ['G2','AU']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "access.name", b24.Params{
    	"ACCESS": []string{"G2", "AU"},
    })
    if err != nil {
    	return fmt.Errorf("access.name: %w", err)
    }

    keys, ok := b24.Keys(res.Result)
    if !ok {
    	return fmt.Errorf("ожидался объект в ответе")
    }
    fmt.Println("полей в ответе:", len(keys))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "G2": {
            "provider": "",
            "name": "Все посетители",
            "provider_id": "other"
        },
        "AU": {
            "provider": "",
            "name": "Все авторизованные пользователи",
            "provider_id": "other"
        }
    },
    "time": {
        "start": 1722002504.2838,
        "finish": 1722002504.32483,
        "duration": 0.0410301685333252,
        "processing": 0.00145506858825684,
        "date_start": "2024-07-26T14:01:44+00:00",
        "date_finish": "2024-07-26T14:01:44+00:00",
        "operating": 0
    }
}

```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md)\|[`boolean`](../../data-types.md) | Объект, где ключ это код доступа из параметра `ACCESS`, а значение это описание кода.

Структура описана [ниже](#access-item).

Если параметр `ACCESS` не передан или пуст, метод вернет `false` ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Описание кода доступа {#access-item}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название кода доступа на языке Битрикс24, например `Все авторизованные пользователи` ||
|| **provider**
[`string`](../../data-types.md) | Название поставщика кода доступа. Для кодов `G` и `AU` пустая строка ||
|| **provider_id**
[`string`](../../data-types.md) | Идентификатор поставщика кода доступа, например `other` для кодов `G2` и `AU` ||
|#

Коды, которых нет в Битрикс24, в ответе не возвращаются.

## Обработка ошибок

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./method-get.md)
- [{#T}](./scope.md)
- [{#T}](./app-info.md)
- [{#T}](./feature-get.md)
- [{#T}](./server-time.md)
- [{#T}](./methods.md)