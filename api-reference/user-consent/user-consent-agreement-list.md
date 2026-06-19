# Получить список соглашений userconsent.agreement.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`userconsent`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `userconsent.agreement.list` возвращает список соглашений.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/userconsent.agreement.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/userconsent.agreement.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each AgreementItem returned in result[]
    type AgreementItem = {
      ID: string
      NAME: string
      ACTIVE: string
      LANGUAGE_ID: string | null
    }

    try {
      // userconsent.agreement.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<AgreementItem[]>({
        method: 'userconsent.agreement.list',
        params: {
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Agreements:', result.length, result)
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
      async function fetchAgreementList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // userconsent.agreement.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'userconsent.agreement.list',
            params: {
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
          console.info('Agreements:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchAgreementList)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'userconsent.agreement.list',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching agreement list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
    'userconsent.agreement.list',
    {},
    function(result) {
        if (result.error()) {
        console.error(result.error());
        } else {
        console.log(result.data());
        }
    }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'userconsent.agreement.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
"result": [
    {
     "ID": "35",
     "NAME": "Согласие на получение рассылки",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "ru"
    },
    {
     "ID": "33",
     "NAME": "Conditions d'utilisation de Bitrix24 Sites",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "fr"
    },
    {
     "ID": "31",
     "NAME": "Условия использования сервиса уведомлений",
     "ACTIVE": "Y",
     "LANGUAGE_ID": null
    },
    {
     "ID": "29",
     "NAME": "SASHA",
     "ACTIVE": "Y",
     "LANGUAGE_ID": ""
    },
    {
     "ID": "27",
     "NAME": "Условия использования Центра уведомлений Б24",
     "ACTIVE": "Y",
     "LANGUAGE_ID": null
    },
    {
     "ID": "25",
     "NAME": "Termos de Uso do Bitrix24 Sites",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "br"
    },
    {
     "ID": "23",
     "NAME": "Второе соглашение",
     "ACTIVE": "Y",
     "LANGUAGE_ID": ""
    },
    {
     "ID": "21",
     "NAME": "Bitrix24 Sites: Nutzungsbedingungen",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "de"
    },
    {
     "ID": "19",
     "NAME": "Согласие с Cookies-файлами",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "ru"
    },
    {
     "ID": "17",
     "NAME": "Cookie consent",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "en"
    },
    {
     "ID": "15",
     "NAME": "Правила використання Бітрікс24.Сайти",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "ua"
    },
    {
     "ID": "13",
     "NAME": "Test newwef",
     "ACTIVE": "Y",
     "LANGUAGE_ID": ""
    },
    {
     "ID": "11",
     "NAME": "Bitrix24 Sites Terms of Use",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "en"
    },
    {
     "ID": "9",
     "NAME": "Правила использования Битрикс24.Сайты",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "es"
    },
    {
     "ID": "7",
     "NAME": "Правила использования Битрикс24.Сайты",
     "ACTIVE": "Y",
     "LANGUAGE_ID": "ru"
    },
    {
     "ID": "1",
     "NAME": "Пример согласия на обработку персональных данных",
     "ACTIVE": "Y",
     "LANGUAGE_ID": ""
    }
],
"time": {
    "start": 1760352862,
    "finish": 1760352862.776508,
    "duration": 0.776508092880249,
    "processing": 0,
    "date_start": "2025-10-13T13:54:22+03:00",
    "date_finish": "2025-10-13T13:54:22+03:00",
    "operating_reset_at": 1760353462,
    "operating": 0
}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Корневой элемент ответа ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор соглашения ||
|| **NAME**
[`string`](../data-types.md) | Название соглашения ||
|| **ACTIVE**
[`string`](../data-types.md) | Признак активности. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **LANGUAGE_ID**
[`string`](../data-types.md) | Идентификатор языка соглашения ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-consent-agreement-text.md)
- [{#T}](./user-consent-consent-add.md)