# Удалить несколько документов складского учета catalog.document.deleteList

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - пользователь с правом «Удаление документа» на тип документа в запросе,
> - и «Просмотр и выбор склада» на склад прихода или списания.

Метод `catalog.document.deleteList` удаляет несколько документов складского учета. Для каждого документа в запросе выполняется проверка прав доступа. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentIds***
[`catalog_document.id[]`](../data-types.md#catalog_document) | Список идентификаторов документов, получить можно методом [catalog.document.list](./catalog-document-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentIds":[142,143,144]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.deleteList
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentIds":[142,143,144],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.deleteList
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
        method: 'catalog.document.deleteList',
        params: {
          documentIds: [142, 143, 144],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Documents deleted:', result)
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
      async function deleteDocumentList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.deleteList',
            params: {
              documentIds: [142, 143, 144],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Documents deleted:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteDocumentList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.deleteList',
                [
                    'documentIds' => [142, 143, 144],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result === true) {
            echo 'Documents deleted';
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting documents: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.deleteList',
        { documentIds: [142, 143, 144] },
        function(result)
        {
            if (result.error())
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
        'catalog.document.deleteList',
        [
            'documentIds' => [142, 143, 144],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": true,
    "time": {
        "start": 1761909885,
        "finish": 1761909885.557104,
        "duration": 0.5571041107177734,
        "processing": 0,
        "date_start": "2025-10-31T14:24:45+03:00",
        "date_finish": "2025-10-31T14:24:45+03:00",
        "operating_reset_at": 1761910485,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true`, если все документы удалены ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Нельзя удалить документ #143, потому что он проведен"
} 
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Недостаточно прав для удаления документа «Название» | Нет прав на удаление типа документа или нет доступа к складам документа ||
|| `0` | При удалении документа «#ID» произошла ошибка: Документ не найден | В списке указан несуществующий идентификатор ||
|| `0` | Вы не можете удалить документ «Название», так как он проведен | Отмените проведение документа методом [catalog.document.cancelList](./catalog-document-cancel-list.md) ||
|| `0` | Складской учет недоступен на вашем тарифе | Складской учет недоступен на вашем тарифе ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-delete.md)
- [{#T}](./catalog-document-cancel-list.md)
- [{#T}](./catalog-document-list.md)



