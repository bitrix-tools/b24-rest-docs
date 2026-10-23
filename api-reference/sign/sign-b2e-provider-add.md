# Добавить провайдера подписи sign.b2e.provider.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sign.b2e.provider.add` подключает к Битрикс24 внешний провайдер подписи.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../data-types.md) | Объект с полями нового провайдера. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

Адреса передавайте полностью, со схемой `http` или `https`. Обязательные поля не могут быть пустой строкой.

#|
|| **Название**
`тип` | **Описание** ||
|| **title***
[`string`](../data-types.md) | Название провайдера ||
|| **description***
[`string`](../data-types.md) | Краткое описание провайдера ||
|| **iconUri***
[`string`](../data-types.md) | Адрес иконки провайдера для интерфейса Битрикс24 ||
|| **companyRegUri**
[`string`](../data-types.md) | Адрес страницы, на которой компания регистрируется у провайдера ||
|| **documentSignUri***
[`string`](../data-types.md) | Адрес страницы подписания документа у провайдера ||
|| **publicKeyUri***
[`string`](../data-types.md) | Адрес публичного ключа провайдера. Ключом проверяется подпись документов ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Test provider name","description":"Brief text about provider","iconUri":"https://provider.sign.com/bitrix/icon.png","companyRegUri":"https://provider.sign.com/bitrix/register/","documentSignUri":"https://provider.sign.com/bitrix/sign/","publicKeyUri":"https://provider.sign.com/bitrix/public.key"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.provider.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // On a sign service failure result holds error and error_description instead of the id
    type ProviderAddResult = number | { error: number, error_description: string }

    try {
      const response = await $b24.actions.v2.call.make<ProviderAddResult>({
        method: 'sign.b2e.provider.add',
        params: {
          fields: {
            title: 'Test provider name',
            description: 'Brief text about provider',
            iconUri: 'https://provider.sign.com/bitrix/icon.png',
            companyRegUri: 'https://provider.sign.com/bitrix/register/',
            documentSignUri: 'https://provider.sign.com/bitrix/sign/',
            publicKeyUri: 'https://provider.sign.com/bitrix/public.key',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        if (typeof result === 'number') {
          console.info('Provider id:', result)
        } else {
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
      async function addSignProvider() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sign.b2e.provider.add',
            params: {
              fields: {
                title: 'Test provider name',
                description: 'Brief text about provider',
                iconUri: 'https://provider.sign.com/bitrix/icon.png',
                companyRegUri: 'https://provider.sign.com/bitrix/register/',
                documentSignUri: 'https://provider.sign.com/bitrix/sign/',
                publicKeyUri: 'https://provider.sign.com/bitrix/public.key'
              }
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          // On a sign service failure result holds error and error_description instead of the id
          const result = response.getData().result
          if (typeof result === 'number') {
            console.info('Provider id:', result)
          } else {
            console.error(result.error_description)
          }
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addSignProvider)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.call(
            "sign.b2e.provider.add",
            {
                "fields": {
                    "title": "Test provider name",
                    "description": "Brief text about provider",
                    "iconUri": "https://provider.sign.com/bitrix/icon.png",
                    "companyRegUri": "https://provider.sign.com/bitrix/register/",
                    "documentSignUri": "https://provider.sign.com/bitrix/sign/",
                    "publicKeyUri": "https://provider.sign.com/bitrix/public.key",
                },
            },
        ).response
        result = bitrix_response.result
        # При ошибке сервиса подписи result содержит error и error_description
        if isinstance(result, dict):
            print(f"Ошибка сервиса подписи: {result['error_description']}")
        else:
            print(f"Идентификатор провайдера: {result}")
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
                'sign.b2e.provider.add',
                [
                    'fields' => [
                        'title' => 'Test provider name',
                        'description' => 'Brief text about provider',
                        'iconUri' => 'https://provider.sign.com/bitrix/icon.png',
                        'companyRegUri' => 'https://provider.sign.com/bitrix/register/',
                        'documentSignUri' => 'https://provider.sign.com/bitrix/sign/',
                        'publicKeyUri' => 'https://provider.sign.com/bitrix/public.key'
                    ]
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
        'sign.b2e.provider.add',
        {
            fields: {
                title: 'Test provider name',
                description: 'Brief text about provider',
                iconUri: 'https://provider.sign.com/bitrix/icon.png',
                companyRegUri: 'https://provider.sign.com/bitrix/register/',
                documentSignUri: 'https://provider.sign.com/bitrix/sign/',
                publicKeyUri: 'https://provider.sign.com/bitrix/public.key'
            }
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
        'sign.b2e.provider.add',
        [
            'fields' => [
                'title' => 'Test provider name',
                'description' => 'Brief text about provider',
                'iconUri' => 'https://provider.sign.com/bitrix/icon.png',
                'companyRegUri' => 'https://provider.sign.com/bitrix/register/',
                'documentSignUri' => 'https://provider.sign.com/bitrix/sign/',
                'publicKeyUri' => 'https://provider.sign.com/bitrix/public.key'
            ]
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } elseif (is_array($result['result'])) {
        echo 'Ошибка сервиса подписи: ' . $result['result']['error_description'];
    } else {
        echo 'Идентификатор провайдера: ' . $result['result'];
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.provider.add", b24.Params{
    	"fields": b24.Params{
    		"title":           "Test provider name",
    		"description":     "Brief text about provider",
    		"iconUri":         "https://provider.sign.com/bitrix/icon.png",
    		"companyRegUri":   "https://provider.sign.com/bitrix/register/",
    		"documentSignUri": "https://provider.sign.com/bitrix/sign/",
    		"publicKeyUri":    "https://provider.sign.com/bitrix/public.key",
    	},
    })
    if err != nil {
    	return fmt.Errorf("sign.b2e.provider.add: %w", err)
    }

    var id int
    if err := json.Unmarshal(res.Result, &id); err != nil {
    	// при ошибке сервиса подписи result содержит error и error_description
    	return fmt.Errorf("ответ сервиса подписи: %s", res.Result)
    }
    fmt.Println("идентификатор провайдера:", id)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 41,
    "time": {
        "start": 1792738603,
        "finish": 1792738603.104434,
        "duration": 0.10443401336669922,
        "processing": 0,
        "date_start": "2026-10-23T09:56:43+03:00",
        "date_finish": "2026-10-23T09:56:43+03:00",
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
[`integer`](../data-types.md) | Идентификатор добавленного провайдера. Нужен для методов [sign.b2e.provider.update](./sign-b2e-provider-update.md) и [sign.b2e.provider.delete](./sign-b2e-provider-delete.md) ||
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

Ошибки сервиса подписи Битрикс24 приходят с HTTP-статусом **200** в одном из двух видов.

Если у ошибки есть код, ответ содержит `error` и `error_description` на верхнем уровне, как обычная ошибка метода. Так приходят ошибки проверки адресов и названия:

```json
{
    "error": 100,
    "error_description": "PublicKeyUri must be valid",
    "ex": {
        "status": 200,
        "ex": 100
    }
}
```

Если кода нет, в `result` вместо идентификатора приходит объект с полями `error` и `error_description`. Проверяйте тип `result` перед тем, как использовать значение как идентификатор:

```json
{
    "result": {
        "error": 0,
        "error_description": "Не заполнено обязательное поле \"Description\""
    },
    "time": {...}
}
```

Если в тексте ошибки указан код `SIGN_CLIENT_CONNECTION_ERROR`, `INCORRECT_JSON`, `INCORRECT_HTTP_STATUS`, `INCORRECT_DATA` или `INCORRECT_REGISTER_RESPONSE`, Битрикс24 не получил ответ сервиса. Провайдер при этом мог быть добавлен. Перед повторным вызовом проверьте список провайдеров методом [sign.b2e.provider.tail](./sign-b2e-provider-tail.md).

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не из приложения с OAuth-авторизацией, например через вебхук ||
|| `403` | `ACCESS_DENIED` | Access denied! Access denied | Пользователь не администратор или КЭДО недоступен на Битрикс24 ||
|| `403` | `ACCESS_DENIED` | Access denied! User authorization required | Запрос выполнен без авторизации пользователя ||
|| `200` | `100` | Title must be provided | В поле `title` передана пустая строка ||
|| `200` | `100` | IconUri must be valid | Поле `iconUri` содержит адрес не со схемой `http` или `https` ||
|| `200` | `100` | CompanyRegUri must be empty be valid | Поле `companyRegUri` содержит адрес не со схемой `http` или `https` ||
|| `200` | `100` | DocumentSignUri must be valid | Поле `documentSignUri` содержит адрес не со схемой `http` или `https` ||
|| `200` | `100` | PublicKeyUri must be valid | Поле `publicKeyUri` содержит адрес не со схемой `http` или `https` ||
|| `200` | `0` в `result.error` | Не удалось выполнить действие, попробуйте чуть позже (код ошибки: 100) | Не передано обязательное поле: `title`, `description`, `iconUri`, `documentSignUri` или `publicKeyUri` ||
|| `200` | `0` в `result.error` | Не заполнено обязательное поле "Description" | В поле `description` передана пустая строка ||
|| `200` | `0` в `result.error` | Не удалось выполнить действие, попробуйте чуть позже (код ошибки: #CODE#) | Сервис подписи вернул ошибку или Битрикс24 не получил его ответ. Вместо `#CODE#` указан код причины. Текст приходит на языке пользователя ||
|| `200` | `0` в `result.error` | Действие пока недоступно, попробуйте чуть позже | Версия сервиса подписи еще не поддерживает это действие ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-provider-update.md)
- [{#T}](./sign-b2e-provider-tail.md)
- [{#T}](./sign-b2e-provider-delete.md)
- [{#T}](./sign-b2e-company-provider-list.md)
- [{#T}](./index.md)
