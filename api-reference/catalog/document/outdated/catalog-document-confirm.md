# Провести документ складского учета catalog.document.confirm

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [catalog.document.conduct](../catalog-document-conduct.md).

{% endnote %}

Метод `catalog.document.confirm` проводит документ складского учета. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md)| Идентификатор документа ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.confirm
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.confirm
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
        method: 'catalog.document.confirm',
        params: {
          id: 42,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Document confirmed:', result)
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
      async function confirmDocument() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.confirm',
            params: {
              id: 42,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Document confirmed:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', confirmDocument)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.confirm',
                [
                    'id' => 42,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error confirming document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'catalog.document.confirm',
    {
        'id': 42,
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
        'catalog.document.confirm',
        [
            'id' => 42
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.document.confirm", b24.Params{
    	"id": 42,
    })
    if err != nil {
    	return fmt.Errorf("catalog.document.confirm: %w", err)
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
    "result": true,
    "time": {
        "start": 1759482402.511337,
        "finish": 1759482402.642843,
        "duration": 0.13150620460510254,
        "processing": 0.02694106101989746,
        "date_start": "2025-11-02T12:26:42+03:00",
        "date_finish": "2025-11-02T12:26:42+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает `true`, если документ проведен ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Документ не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Недостаточно прав для сохранения документа | Нет прав к каталогу товаров, складскому учету или нет права проведения документа ||
|| `0` | Документ не найден | Указан несуществующий идентификатор документа ||
|| `0` | Ошибка проведения документа: «текст ошибки» | Документ содержит некорректные данные ||
|| `0` | Складской учет недоступен на вашем тарифе | Складской учет недоступен на вашем тарифе ||
|| `100` | Could not find value for parameter {id} | Не передан обязательный параметр `id` ||
|#

{% include [Системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-unconfirm.md)
- [{#T}](./catalog-document-fields.md)
- [{#T}](./catalog-document-element-fields.md)





