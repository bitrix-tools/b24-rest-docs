# Получить список провайдеров компании sign.b2e.company.provider.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`](../scopes/permissions.md), [`crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом создавать документы КЭДО

Метод `sign.b2e.company.provider.list` возвращает список провайдеров подписи для выбранной компании.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **companyUuid***
[`string`](../data-types.md) | UUID компании в HCM Link.

Обязателен, если не передан параметр `companyCrmId`.

Требует дополнительный scope [`humanresources.hcmlink`](../scopes/permissions.md) ||
|| **companyCrmId***
[`integer`](../data-types.md) | Идентификатор компании в CRM, подключенный в интеграции как «моя компания».

Обязателен, если не передан параметр `companyUuid` ||
|| **language**
[`string`](../data-types.md) | Язык локализации названий провайдеров.

По умолчанию `en` ||
|| **limit**
[`integer`](../data-types.md) | Количество записей на странице.

Параметр принимает значение от 1 до 1000.

По умолчанию 100 ||
|| **offset**
[`integer`](../data-types.md) | Параметр для управления постраничной навигацией.

По умолчанию 0 ||
|#

Передайте один из параметров `companyUuid` или `companyCrmId`.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"companyCrmId":12,"limit":2,"offset":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.company.provider.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each provider item returned in result[]
    type ProviderItem = {
      code: string
      uid: string
      name: string
      date: ISODate | null
      expires: ISODate | null
    }

    try {
      // sign.b2e.company.provider.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<ProviderItem[]>({
        method: 'sign.b2e.company.provider.list',
        params: {
          // UUID of the company in HCM Link or its CRM company ID
          companyCrmId: 12,
          // Language for provider name localization
          language: 'en',
          // Pagination parameters
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
        console.info(result.length, result[0]?.name, result[0]?.uid)
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
      async function fetchCompanyProviders() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // sign.b2e.company.provider.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'sign.b2e.company.provider.list',
            params: {
              // UUID of the company in HCM Link or its CRM company ID
              companyCrmId: 12,
              // Language for provider name localization
              language: 'en',
              // Pagination parameters
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
          console.info(result.length, result[0]?.name, result[0]?.uid)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchCompanyProviders)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sign.b2e.company.provider.list',
                [
                    'companyCrmId' => 12,
                    'language' => 'ru',
                    'limit' => 2,
                    'offset' => 0
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'sign.b2e.company.provider.list',
        {
            companyCrmId: 12,
            language: 'ru',
            limit: 2,
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
        'sign.b2e.company.provider.list',
        [
            'companyCrmId' => 12,
            'language' => 'ru',
            'limit' => 2,
            'offset' => 0
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
            "code": "ses-ru",
            "uid": "d4f6b8a1-4c6d-4d8c-9c7c-2d1b1f6d0f2b",
            "name": "Битрикс24 КЭДО",
            "date": "2025-02-18T10:15:30+03:00",
            "expires": "2026-02-18T10:15:30+03:00"
        }
    ],
    "time": {
        "start": 1739860000.123,
        "finish": 1739860000.456,
        "duration": 0.333,
        "processing": 0.111,
        "date_start": "2025-02-18T09:19:34+03:00",
        "date_finish": "2025-02-18T09:19:34+03:00",
        "operating_reset_at": 1739860600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Список провайдеров подписи компании ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код провайдера ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор провайдера ||
|| **name**
[`string`](../data-types.md) | Название провайдера с учетом языка ||
|| **date**
[`string`](../data-types.md) | Дата регистрации провайдера в формате ISO 8601 ||
|| **expires**
[`string`](../data-types.md) | Дата окончания действия провайдера в формате ISO 8601 ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав ||
|| `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Вызов не из контекста приложения ||
|| `510` | Company was not found. | Компания не найдена по `companyUuid` или `companyCrmId` ||
|| `510` | My company ... not found | Компания CRM не найдена ||
|| `-` | Parameter 'companyUuid' or 'companyCrmId' is required | Не переданы идентификаторы компании ||
|| `-` | humanresources module is not installed | Модуль `humanresources` не установлен при использовании `companyUuid` ||
|| `-` | Error while autoregistering providers | Ошибка автрегистрации виртуальных провайдеров. Проверьте данные моей компании в CRM ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-document-send.md)
- [{#T}](./sign-b2e-document-get.md)
- [{#T}](./index.md)
