# Удалить провайдера подписи sign.b2e.provider.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sign.b2e.provider.delete` отключает внешний провайдер подписи от Битрикс24.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор провайдера.

Идентификатор возвращает метод [sign.b2e.provider.add](./sign-b2e-provider-add.md), список провайдеров с идентификаторами — метод [sign.b2e.provider.tail](./sign-b2e-provider-tail.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":42,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.provider.delete
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // On a sign service failure result holds error and error_description instead of true
    type ProviderDeleteResult = boolean | { error: number, error_description: string }

    try {
      const response = await $b24.actions.v2.call.make<ProviderDeleteResult>({
        method: 'sign.b2e.provider.delete',
        params: {
          id: 42,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        if (result === true) {
          console.info('Provider deleted')
        } else if (typeof result === 'object') {
          console.error(result.error_description)
        }
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
      async function deleteSignProvider() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sign.b2e.provider.delete',
            params: {
              id: 42
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          // On a sign service failure result holds error and error_description instead of true
          const result = response.getData().result
          if (result === true) {
            console.info('Provider deleted')
          } else if (typeof result === 'object') {
            console.error(result.error_description)
          }
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteSignProvider)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.call(
            "sign.b2e.provider.delete",
            {
                "id": 42,
            },
        ).response
        result = bitrix_response.result
        # При ошибке сервиса подписи result содержит error и error_description
        if isinstance(result, dict):
            print(f"Ошибка сервиса подписи: {result['error_description']}")
        else:
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
                'sign.b2e.provider.delete',
                [
                    'id' => 42
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
        'sign.b2e.provider.delete',
        {
            id: 42
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
        'sign.b2e.provider.delete',
        [
            'id' => 42
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } elseif (is_array($result['result'])) {
        echo 'Ошибка сервиса подписи: ' . $result['result']['error_description'];
    } else {
        echo 'Провайдер удален';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.provider.delete", b24.Params{
    	"id": 42,
    })
    if err != nil {
    	return fmt.Errorf("sign.b2e.provider.delete: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	// при ошибке сервиса подписи result содержит error и error_description
    	return fmt.Errorf("ответ сервиса подписи: %s", res.Result)
    }
    fmt.Println("провайдер удален:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1792738607,
        "finish": 1792738608.01666,
        "duration": 1.0166599750518799,
        "processing": 1,
        "date_start": "2026-10-23T09:56:47+03:00",
        "date_finish": "2026-10-23T09:56:48+03:00",
        "operating_reset_at": 1792739160,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Результат удаления. `true` — провайдер удален. Удаленный провайдер больше не возвращается методом [sign.b2e.provider.tail](./sign-b2e-provider-tail.md), и изменить его нельзя ||
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

Если сервис подписи Битрикс24 вернул ошибку без собственного кода, метод отвечает с HTTP-статусом **200**, а в `result` вместо `true` приходит объект с полями `error` и `error_description`. Считайте вызов успешным, только если `result` равен `true`.

```json
{
    "result": {
        "error": 0,
        "error_description": "External provider with id 42 doesnt exist"
    },
    "time": {...}
}
```

Если в тексте ошибки указан код `SIGN_CLIENT_CONNECTION_ERROR`, `INCORRECT_JSON`, `INCORRECT_HTTP_STATUS`, `INCORRECT_DATA` или `INCORRECT_REGISTER_RESPONSE`, Битрикс24 не получил ответ сервиса. Провайдер при этом мог быть удален. Проверить это можно методом [sign.b2e.provider.tail](./sign-b2e-provider-tail.md).

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не из приложения с OAuth-авторизацией, например через вебхук ||
|| `403` | `ACCESS_DENIED` | Access denied! Access denied | Пользователь не администратор или КЭДО недоступен на Битрикс24 ||
|| `403` | `ACCESS_DENIED` | Access denied! User authorization required | Запрос выполнен без авторизации пользователя ||
|| `200` | `0` в `result.error` | External provider with id #ID# doesnt exist | Провайдер с идентификатором `id` не найден или уже удален ||
|| `200` | Код сервиса подписи | Текст ошибки сервиса подписи | Сервис подписи не удалил провайдера и вернул собственный код ошибки ||
|| `200` | `0` в `result.error` | Не удалось выполнить действие, попробуйте чуть позже (код ошибки: #CODE#) | Сервис подписи вернул ошибку или Битрикс24 не получил его ответ. Вместо `#CODE#` указан код причины. Текст приходит на языке пользователя ||
|| `200` | `0` в `result.error` | Действие пока недоступно, попробуйте чуть позже | Версия сервиса подписи еще не поддерживает это действие ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-provider-add.md)
- [{#T}](./sign-b2e-provider-update.md)
- [{#T}](./sign-b2e-provider-tail.md)
- [{#T}](./index.md)
