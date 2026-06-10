# Провести несколько документов складского учета catalog.document.conductList

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - пользователь с правом «Проведение документа» на тип документа в запросе,
> - и «Просмотр и выбор склада» на склад прихода или списания.

Метод `catalog.document.conductList` проводит группу документов складского учета:
- статус документов изменяется на `Y` — проведен,
- складские остатки товаров обновляются согласно позициям документов.

Для каждого документа в запросе выполняется проверка прав доступа. 

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
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.document.conductList
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentIds":[142,143,144],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.conductList
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
        method: 'catalog.document.conductList',
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
        console.info('Documents conducted:', result)
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
      async function conductDocumentList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.document.conductList',
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
          console.info('Documents conducted:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', conductDocumentList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.document.conductList',
                [
                    'documentIds' => [142, 143, 144],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result === true) {
            echo 'Documents conducted';
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error conducting documents: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.conductList',
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
        'catalog.document.conductList',
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
        "start": 1762410455,
        "finish": 1762410455.743473,
        "duration": 0.7434730529785156,
        "processing": 0,
        "date_start": "2025-11-06T09:27:35+03:00",
        "date_finish": "2025-11-06T09:27:35+03:00",
        "operating_reset_at": 1762411055,
        "operating": 0.2910308837890625
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, содержит `true`, если все документы проведены без ошибок. Если хотя бы один документ не удалось провести, метод вернет ошибку в ответе `error` / `error_description`. Документы, которые удалось обработать, останутся в статусе «Проведен» ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "При проведении документа "Поступление 33" произошла ошибка: Некорректное количество товара #6907 (Монст Энержи) в документе складского учета"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | При проведении документа «#название документа» произошла ошибка: «текст ошибки» | Документ содержит некорректные данные, например «Не указан поставщик» ||
|| `0` | Ошибка проведения документа: Недостаточно прав для сохранения документа | Нет прав к каталогу товаров, складскому учету или нет права проведения документа ||
|| `0` | Складской учет недоступен на вашем тарифе | Складской учет недоступен на вашем тарифе ||
|| `0` | Для проведения документа необходимо включить складской учет | Для проведения документа необходимо включить складской учет ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-conduct.md)
- [{#T}](./catalog-document-cancel-list.md)
- [{#T}](./catalog-document-list.md)
- [{#T}](./document-element/catalog-document-element-add.md)
- [{#T}](../documentcontractor/catalog-documentcontractor-add.md)


