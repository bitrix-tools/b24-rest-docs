# Получить список подписанных документов в сейфе компании sign.b2e.mysafe.tail

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Сейф компании». Доступные документы зависят от уровня права «Доступ к документам сейфа»

Метод `sign.b2e.mysafe.tail` возвращает список подписанных документов в сейфе компании.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../data-types.md) | Количество записей на странице.

Параметр принимает значение от 1 до 50.

По умолчанию выводится 20 записей на странице ||
|| **offset**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией. Аналогичен стандартному параметру [start](../../settings/performance/huge-data.md).

Размер страницы результатов зависит от параметра **limit**
||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"limit":2,"offset":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.mysafe.tail
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each SafeDocument returned in result[]
    type SafeDocument = {
      id: number
      title: string
      create_date: ISODate | null
      signed_date: ISODate | null
      creator_id: number
      member_id: number
      role: string
      file_url: string
    }

    try {
      // sign.b2e.mysafe.tail returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<SafeDocument[]>({
        method: 'sign.b2e.mysafe.tail',
        params: {
          limit: 2,
          offset: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Fetched documents:', result.length, result.map(d => `[${d.id}] ${d.title}`))
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
      async function fetchSafeDocuments() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sign.b2e.mysafe.tail returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sign.b2e.mysafe.tail',
            params: {
              limit: 2,
              offset: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Fetched documents:', result.length, result.map(d => `[${d.id}] ${d.title}`))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchSafeDocuments)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sign.b2e.mysafe.tail',
                [
                    'limit'  => 2,
                    'offset' => 0
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'sign.b2e.mysafe.tail',
        {
            // Количество записей на странице. Значение от 1 до 50. По умолчанию 20.
            limit: 2,
            
            // Параметр для управления постраничной навигацией.
            // Используется для указания смещения от начала списка.
            offset: 0
        },
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sign.b2e.mysafe.tail',
        [
            'limit' => 2, // Количество записей на странице
            'offset' => 0 // Смещение от начала списка
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "id": 59,
            "title": "test-pdf е",
            "create_date": "2024-06-28T19:07:03+03:00",
            "signed_date": "2024-06-28T19:34:58+03:00",
            "creator_id": 1,
            "member_id": 1,
            "role": "signer",
            "file_url": "https://your-domain.bitrix24.ru/rest/download.json?auth=7e34b4670000071b0075444600000037f0f1072e5aa442013dece15a3df95d26ed4873&token=sign.b2e%7CaWQ9NTkmXz1IVEVndlJnZUttZUFkeERtaVBRbkhwZkhhTEJFZklpYQ%3D%3D%7CImRvd25sb2FkfHNpZ24uYjJlfGFXUTlOVGttWHoxSVZFVm5kbEpuWlV0dFpVRmtlRVJ0YVZCUmJraHdaa2hoVEVKRlprbHBZUT09fDdlMzRiNDY3MDAwMDA3MWIwMDc1NDQ0NjAwMDAwMDM3ZjBmMTA3MmU1YWE0NDIwMTNkZWNlMTVhM2RmOTVkMjZlZDQ4NzMi.8C%2B3HpNFR5C0YkzTeVL%2FdhE6QJYN66CGoDzZG4VeR4Q%3D"
        },
        {
            "id": 55,
            "title": "test-pdf 778484",
            "create_date": "2024-06-28T18:37:37+03:00",
            "signed_date": "2024-06-28T18:39:47+03:00",
            "creator_id": 19,
            "member_id": 1,
            "role": "signer",
            "file_url": "https://your-domain.bitrix24.ru/rest/download.json?auth=7e34b4670000071b0075444600000037f0f1072e5aa442013dece15a3df95d26ed4873&token=sign.b2e%7CaWQ9NTUmXz12czNjZDhyM3g2SUZYdzByRVZBbVJIYzZTY3dxZUFxbw%3D%3D%7CImRvd25sb2FkfHNpZ24uYjJlfGFXUTlOVFVtWHoxMmN6TmpaRGh5TTNnMlNVWllkekJ5UlZaQmJWSklZelpUWTNkeFpVRnhidz09fDdlMzRiNDY3MDAwMDA3MWIwMDc1NDQ0NjAwMDAwMDM3ZjBmMTA3MmU1YWE0NDIwMTNkZWNlMTVhM2RmOTVkMjZlZDQ4NzMi.r6Khc2bwTlEANXvuAptaut0Z%2F6y1nGx%2FZhRKqEGkjk0%3D"
        }
    ],
    "time": {
        "start": 1739859574.5550749,
        "finish": 1739859574.595099,
        "duration": 0.0400240421295166,
        "processing": 0.0148630142211914,
        "date_start": "2025-02-18T09:19:34+03:00",
        "date_finish": "2025-02-18T09:19:34+03:00",
        "operating_reset_at": 1739860174,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит информацию о подписанных документах в сейфе компании ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент ответа result

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор подписанного документа ||
|| **title**
[`string`](../data-types.md) | Название документа ||
|| **create_date**
[`string`](../data-types.md) | Дата создания документа ||
|| **signed_date**
[`string`](../data-types.md) | Дата подписания документа ||
|| **creator_id**
[`integer`](../data-types.md) | Идентификатор пользователя, создавшего документ ||
|| **member_id**
[`integer`](../data-types.md) | Идентификатор пользователя, с которым подписан документ ||
|| **role**
[`string`](../data-types.md) | Роль сотрудника в документе:                
 - editor — заполняющий
 - reviewer — согласующий
 - assignee — представитель компании
 - signer - сотрудник
||
|| **file_url**
[`string`](../data-types.md) | Ссылка для скачивания подписанного документа ||
|#

## Обработка ошибок

HTTP-статус: **401**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sign-b2e-personal-tail.md)
