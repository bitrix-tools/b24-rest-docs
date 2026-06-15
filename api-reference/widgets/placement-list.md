# Получить список доступных приложению мест встраивания placement.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, авторизованный в приложении

Метод `placement.list` возвращает список доступных приложению мест встраивания.

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **SCOPE**
[`string`](../data-types.md) | Ограничивает список мест встраивания одним scope приложения.

Если параметр передан и не пустой, метод возвращает места встраивания только для указанного scope ||
|| **FULL**
[`boolean`](../data-types.md) | Флаг получения полного списка мест встраивания.

Если параметр не передан или передан как `false`, метод возвращает места встраивания для scope текущего приложения и глобальные места встраивания.

Если параметр передан как `true`, метод возвращает места встраивания для всех scope сервиса.

Параметр учитывается, только если не передан `SCOPE` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Пример получения списка мест встраивания, доступных приложению, где:
- `SCOPE` — scope приложения, для которого нужно получить места встраивания

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "SCOPE": "crm",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/placement.list.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      // placement.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<string[]>({
        method: 'placement.list',
        params: {
          SCOPE: 'crm',
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Placement codes:', result, 'Count:', result.length)
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
      async function getPlacementList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // placement.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'placement.list',
            params: {
              SCOPE: 'crm',
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
          console.info('Placement codes:', result, 'Count:', result.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getPlacementList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.list',
                [
                    'SCOPE' => 'crm',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting placement list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.list',
        {
            SCOPE: 'crm'
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
    $result = CRest::call(
        'placement.list',
        [
            'SCOPE' => 'crm',
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        "CRM_DEAL_LIST_TOOLBAR",
        "CRM_LEAD_LIST_TOOLBAR",
        "CRM_CONTACT_LIST_TOOLBAR",
        "CRM_COMPANY_LIST_TOOLBAR",
        "CRM_INVOICE_LIST_TOOLBAR",
        "CRM_QUOTE_LIST_TOOLBAR",
        "CRM_ORDER_LIST_TOOLBAR",
        "CRM_DYNAMIC_136_LIST_TOOLBAR",
        "CRM_DYNAMIC_1038_LIST_TOOLBAR",
        "CRM_SMART_INVOICE_LIST_TOOLBAR",
        "CRM_DEAL_DETAIL_TOOLBAR",
        "CRM_LEAD_DETAIL_TOOLBAR",
        "CRM_CONTACT_DETAIL_TOOLBAR",
        "CRM_COMPANY_DETAIL_TOOLBAR",
        "CRM_INVOICE_DETAIL_TOOLBAR",
        "CRM_QUOTE_DETAIL_TOOLBAR",
        "CRM_DYNAMIC_136_DETAIL_TOOLBAR",
        "CRM_DYNAMIC_1038_DETAIL_TOOLBAR",
        "CRM_SMART_INVOICE_DETAIL_TOOLBAR",
        "CRM_DEAL_ACTIVITY_TIMELINE_MENU",
        "CRM_LEAD_ACTIVITY_TIMELINE_MENU",
        "CRM_QUOTE_ACTIVITY_TIMELINE_MENU"
    ],
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`string[]`](../data-types.md) | Список кодов мест встраивания, доступных приложению.

Каждый элемент массива — строковый код места встраивания ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Вызов метода не из контекста приложения ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./placements.md)
- [{#T}](./placement-bind.md)
- [{#T}](./placement-get.md)
- [{#T}](./placement-unbind.md)
- [{#T}](./ui-interaction/index.md)
