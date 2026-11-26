# Копировать страницу landing.landing.copy

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.copy` копирует страницу и возвращает идентификатор новой страницы. Скопировать можно и страницу из корзины.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний параметр лендингов: тип сайтов, с которыми работает метод. Он не связан с REST-скоупом `landing`.

Для страниц Базы знаний передайте `KNOWLEDGE`, для страниц Базы знаний группы — `GROUP`, регистр не важен. Без `scope` метод не найдет страницу Базы знаний и вернет ошибку `LANDING_NOT_EXIST`. Для сайтов типов `PAGE`, `STORE`, `SMN` и `VIBE` параметр не нужен [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор исходной страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md) ||
|| **toSiteId**
[`integer`](../../../data-types.md) | Идентификатор целевого сайта. Если параметр не передавать или передать `0`, копия будет создана на том же сайте, где находится исходная страница.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) ||
|| **toFolderId**
[`integer`](../../../data-types.md) | Идентификатор папки, в которую нужно положить копию. Папка должна быть на целевом сайте `toSiteId`.

Если параметр не передать или передать `0`, копия появится в корне целевого сайта. Туда же она попадет без ошибки, если папка не найдена или лежит на другом сайте.

Идентификатор папки можно получить методом [landing.site.getFolders](../../site/landing-site-get-folders.md) ||
|| **skipSystem**
[`boolean`](../../../data-types.md) | Флаг копирования системного признака страницы. По умолчанию `false`.

Если передать `true`, новая страница создается как не системная (`SYS = N`)
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 1688,
        "toSiteId": 305,
        "toFolderId": 95
      }' \
      "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/landing.landing.copy.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 1688,
        "toSiteId": 305,
        "toFolderId": 95,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put_your_bitrix24_address**/rest/landing.landing.copy.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'landing.landing.copy',
        params: {
          lid: 1688,
          toSiteId: 305,
          toFolderId: 95,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('New page ID:', result)
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
      async function copyLandingPage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.landing.copy',
            params: {
              lid: 1688,
              toSiteId: 305,
              toFolderId: 95,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('New page ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', copyLandingPage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.landing.landing.copy(
            lid=1688,
            to_site_id=305,
            to_folder_id=95,
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
                'landing.landing.copy',
                [
                    'lid' => 1688,
                    'toSiteId' => 305,
                    'toFolderId' => 95,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error copying landing page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.copy',
        {
            lid: 1688,
            toSiteId: 305,
            toFolderId: 95
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
        'landing.landing.copy',
        [
            'lid' => 1688,
            'toSiteId' => 305,
            'toFolderId' => 95,
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
    res, err := client.Core().Call(ctx, "landing.landing.copy", b24.Params{
    	"lid":        1688,
    	"toSiteId":   305,
    	"toFolderId": 95,
    })
    if err != nil {
    	return fmt.Errorf("landing.landing.copy: %w", err)
    }

    var value b24.ID
    if err := json.Unmarshal(res.Result, &value); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("результат:", value)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 2237,
    "time": {
        "start": 1773706491,
        "finish": 1773706492.91233,
        "duration": 1.912329912185669,
        "processing": 1,
        "date_start": "2026-03-17T03:14:51+03:00",
        "date_finish": "2026-03-17T03:14:52+03:00",
        "operating_reset_at": 1773707091,
        "operating": 0.9924919605255127
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданной копии страницы. Если исходная страница опубликована, копия тоже будет опубликована. Если в месте назначения уже есть страница с таким названием, к названию копии добавится слово «копия»: «Акция копия» ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "LANDING_NOT_EXIST",
    "error_description": "Лендинг не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` ||
|| `LANDING_NOT_EXIST` | Страница не найдена: исходной страницы нет, она недоступна текущему пользователю или для страницы Базы знаний не передан `scope` ||
|| `SITE_NOT_FOUND` | Сайт не найден: в `toSiteId` передан несуществующий сайт ||
|| `ACCESS_DENIED` | Доступ на создание страницы запрещен: у пользователя нет права «редактирование» сайта ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода, например `lid` передан массивом ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-move.md)
- [{#T}](./landing-landing-publication.md)
- [{#T}](./landing-landing-update.md)
