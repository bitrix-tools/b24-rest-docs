# Опубликовать блок landing.block.publication

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «публикации» сайта

Метод `landing.block.publication` публикует один блок страницы.

Метод переносит в опубликованную версию страницы только указанный блок. Изменения остальных блоков остаются в черновике до публикации всей страницы методом [landing.landing.publication](../../page/methods/landing-landing-publication.md).

Идентификатор страницы передавать не нужно — метод определяет страницу по идентификатору блока.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md).

Для типов `PAGE`, `STORE` и `SMN` параметр не передают. Для баз знаний, баз знаний групп и главной страницы передают `KNOWLEDGE`, `GROUP` и `MAINPAGE` ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока в черновике страницы.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) с параметром [`params.edit_mode = true`](./landing-block-get-list.md#params). Идентификатор блока из опубликованной версии страницы методу не подходит: такой блок он не найдет и вернет `null` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "block": 6058
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.publication.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "block": 6058,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.publication.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean | null>({
        method: 'landing.block.publication',
        params: {
          block: 6058,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Block published:', result)
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
      async function publishBlock() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.block.publication',
            params: {
              block: 6058,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Block published:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', publishBlock)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        # У метода нет отдельной обертки в b24pysdk, поэтому вызываем его по имени
        bitrix_response = bitrix_token.call_method(
            "landing.block.publication",
            {
                "block": 6058,
            },
        )
        result = bitrix_response["result"]
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
                'landing.block.publication',
                [
                    'block' => 6058,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error publishing block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.publication',
        {
            block: 6058
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
        'landing.block.publication',
        [
            'block' => 6058,
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
    res, err := client.Core().Call(ctx, "landing.block.publication", b24.Params{
    	"block": 6058,
    })
    if err != nil {
    	return fmt.Errorf("landing.block.publication: %w", err)
    }

    // result трехзначный, поэтому разбираем в указатель: nil это блок, которого нет
    var ok *bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    switch {
    case ok == nil:
    	fmt.Println("блок не найден")
    case *ok:
    	fmt.Println("блок опубликован")
    default:
    	fmt.Println("нет права публикации")
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1789577637,
        "finish": 1789577637.917601,
        "duration": 0.9176011085510254,
        "processing": 0,
        "date_start": "2026-09-16T19:53:57+03:00",
        "date_finish": "2026-09-16T19:53:57+03:00",
        "operating_reset_at": 1789578237,
        "operating": 0.18278789520263672
    }
}
```

Если блок не найден, ответ приходит с тем же статусом `200`:

```json
{
    "result": null,
    "time": {
        "start": 1789578538,
        "finish": 1789578538.756383,
        "duration": 0.756382942199707,
        "processing": 0,
        "date_start": "2026-09-16T20:08:58+03:00",
        "date_finish": "2026-09-16T20:08:58+03:00",
        "operating_reset_at": 1789578565,
        "operating": 0.14619207382202148
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) \| `null` | Результат публикации блока.

Возможные значения:
`true` — блок опубликован,
`false` — у пользователя нет права публикации,
`null` — блок с переданным идентификатором не найден.

Значения `false` и `null` приходят с HTTP-статусом `200` и без поля `error` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: block"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

Не все неудачные вызовы приходят с ошибкой. Неизвестный идентификатор блока и нехватка права публикации возвращают статус `200` без поля `error`, поэтому проверяйте значение `result`, а не только наличие ошибки.

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `block` ||
|| `LANDING_NOT_EXIST` | Страница с этим блоком не найдена в выбранном скоупе или недоступна пользователю. Частая причина — значение `scope` не соответствует типу сайта ||
|| `PUBLIC_PAGE_REACHED` | На тарифном плане есть ограничение по количеству опубликованных страниц ||
|| `LANDING_PAYMENT_FAILED` | Страница добавлена из приложения, для публикации нужна подписка на Битрикс24.Маркетплейс ||
|| `LANDING_PAYMENT_FAILED_BLOCK` | На странице есть блок из приложения, для публикации нужна подписка на Битрикс24.Маркетплейс ||
|| `PUBLIC_SITE_REACHED` | На тарифном плане есть ограничение по количеству созданных или опубликованных сайтов ||
|| `PUBLIC_SITE_REACHED_FREE` | Публикация сайтов временно доступна только на платных тарифах ||
|| `PHONE_NOT_CONFIRMED` | Для публикации необходимо подтверждение номера телефона ||
|| `EMAIL_NOT_CONFIRMED` | Для публикации необходимо подтверждение e-mail ||
|| `URLCHECKER_FAIL` | На странице обнаружено вредоносное содержимое ||
|| `LICENSE_EXPIRED` | Лицензия вашего продукта закончилась ||
|#

Публикация блока идет по тому же пути, что и публикация всей страницы, поэтому метод возвращает те же ограничения тарифа и проверки сайта, что и [landing.landing.publication](../../page/methods/landing-landing-publication.md).

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-update-nodes.md)
- [{#T}](./landing-block-update-content.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](../../page/methods/landing-landing-publication.md)
