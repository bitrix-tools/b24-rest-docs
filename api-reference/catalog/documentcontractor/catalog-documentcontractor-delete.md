# Удалить привязку поставщика к документу catalog.documentcontractor.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами:
> — «Просмотр» и «Cоздание и редактирование» на тип документа «Приход»,
> — «Просмотр раздела Складской учет»
> — «Просмотр каталога товаров»    

Метод `catalog.documentcontractor.delete` удаляет поставщика из документа складского учета.

## Параметры метода  

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}  

#|
|| **Название**
`тип` | **Описание** || 
|| **id***
[`catalog_documentcontractor.id`](../data-types.md#catalog_documentcontractor) | Идентификатор привязки поставщика к документу. Получить можно методом [catalog.documentcontractor.list](./catalog-documentcontractor-list.md) ||  
|#  

## Примеры кода  

{% include [Сноска о примерах](../../../_includes/examples.md) %}  

{% list tabs %}

- cURL (Webhook)

    ```bash 
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.documentcontractor.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.documentcontractor.delete
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
        method: 'catalog.documentcontractor.delete',
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
        console.info('Contractor binding deleted:', result)
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
      async function deleteDocumentContractor() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'catalog.documentcontractor.delete',
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
          console.info('Contractor binding deleted:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteDocumentContractor)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.documentcontractor.delete',
                [
                    'id' => 42,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result === true) {
            echo 'Contractor binding deleted';
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting contractor binding: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.documentcontractor.delete',
        { id: 42 },
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
        'catalog.documentcontractor.delete',
        [
            'id' => 42,
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
         "start": 1761908531,
         "finish": 1761908531.935914,
         "duration": 0.9359140396118164,
         "processing": 0,
         "date_start": "2025-10-31T14:02:11+03:00",
         "date_finish": "2025-10-31T14:02:11+03:00",
         "operating_reset_at": 1761909131,
         "operating": 0
    }
}
```

## Возвращаемые данные  

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md)| Корневой элемент ответа, содержит `true`, если привязка успешно удалена.  
Если ответ содержит `null` — привязка не найдена или у пользователя нет прав на изменение документа ||  
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса || 
|#  

## Обработка ошибок  

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}  

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Binding was not found"
}
```

### Возможные коды ошибок  

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Binding was not found | Указанный идентификатор привязки не существует ||  
|| `0` | Access denied | Недостаточно прав для изменения документа складского учета ||  
|| `0` | Contractors should be provided by CRM | Модуль CRM не активен как поставщик контрагентов ||  
|#  

{% include [Системные ошибки](../../../_includes/system-errors.md) %}  

## Продолжите изучение  

- [{#T}](./catalog-documentcontractor-list.md)  
- [{#T}](./catalog-documentcontractor-add.md)  
- [{#T}](./catalog-documentcontractor-get-fields.md)

