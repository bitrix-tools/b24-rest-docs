# Получить список провайдеров подписи sign.b2e.provider.tail

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `sign.b2e.provider.tail` возвращает список внешних провайдеров подписи, подключенных к Битрикс24.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../data-types.md) | Количество записей на странице.

Параметр принимает значение от 1 до 1000. Если значение вне диапазона, метод использует значение по умолчанию.

По умолчанию 20 ||
|| **offset**
[`integer`](../data-types.md) | Сколько записей пропустить от начала списка. Используется для постраничной навигации вместе с `limit`.

По умолчанию 0 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"limit":10,"offset":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.provider.tail
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProviderItem = {
      id: number
      title: string
      description: string
      iconUri: string
      companyRegUri: string
      documentSignUri: string
      publicKeyUri: string
    }

    // On a sign service failure result holds error and error_description instead of the list
    type ProviderTailResult = ProviderItem[] | { error: number, error_description: string }

    try {
      // The method pages with limit and offset, not with start,
      // so the SDK list helpers do not apply: request the next page with a new offset
      const response = await $b24.actions.v2.call.make<ProviderTailResult>({
        method: 'sign.b2e.provider.tail',
        params: {
          limit: 10,
          offset: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        if (Array.isArray(result)) {
          result.forEach(provider => console.info(provider.id, provider.title))
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
      async function fetchSignProviders() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          // The method pages with limit and offset, not with start,
          // so the SDK list helpers do not apply: request the next page with a new offset
          const response = await $b24.actions.v2.call.make({
            method: 'sign.b2e.provider.tail',
            params: {
              limit: 10,
              offset: 0
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          // On a sign service failure result holds error and error_description instead of the list
          const result = response.getData().result
          if (Array.isArray(result)) {
            result.forEach(provider => console.info(provider.id, provider.title))
          } else {
            console.error(result.error_description)
          }
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchSignProviders)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.call(
            "sign.b2e.provider.tail",
            {
                "limit": 10,
                "offset": 0,
            },
        ).response
        result = bitrix_response.result
        # При ошибке сервиса подписи result содержит error и error_description
        if isinstance(result, dict):
            print(f"Ошибка сервиса подписи: {result['error_description']}")
        else:
            for provider in result:
                print(provider["id"], provider["title"])
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
                'sign.b2e.provider.tail',
                [
                    'limit' => 10,
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
        'sign.b2e.provider.tail',
        {
            limit: 10,
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
        'sign.b2e.provider.tail',
        [
            'limit' => 10,
            'offset' => 0
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } elseif (isset($result['result']['error_description'])) {
        echo 'Ошибка сервиса подписи: ' . $result['result']['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.provider.tail", b24.Params{
    	"limit":  10,
    	"offset": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sign.b2e.provider.tail: %w", err)
    }

    var items []struct {
    	ID              int    `json:"id"`
    	Title           string `json:"title"`
    	Description     string `json:"description"`
    	IconURI         string `json:"iconUri"`
    	CompanyRegURI   string `json:"companyRegUri"`
    	DocumentSignURI string `json:"documentSignUri"`
    	PublicKeyURI    string `json:"publicKeyUri"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	// при ошибке сервиса подписи result содержит error и error_description
    	return fmt.Errorf("ответ сервиса подписи: %s", res.Result)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Title)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "id": 41,
            "title": "Docs check provider",
            "description": "Provider for documentation check",
            "iconUri": "https://provider.sign.com/bitrix/icon.png",
            "companyRegUri": "https://provider.sign.com/bitrix/register/",
            "documentSignUri": "https://provider.sign.com/bitrix/sign/",
            "publicKeyUri": "https://provider.sign.com/bitrix/public.key"
        },
        {
            "id": 43,
            "title": "Docs check provider",
            "description": "Provider for documentation check",
            "iconUri": "https://provider.sign.com/bitrix/icon.png",
            "companyRegUri": "",
            "documentSignUri": "https://provider.sign.com/bitrix/sign/",
            "publicKeyUri": "https://provider.sign.com/bitrix/public.key"
        }
    ],
    "time": {
        "start": 1792738605,
        "finish": 1792738605.693056,
        "duration": 0.6930561065673828,
        "processing": 0,
        "date_start": "2026-10-23T09:56:45+03:00",
        "date_finish": "2026-10-23T09:56:45+03:00",
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
[`array`](../data-types.md) | Список внешних провайдеров подписи [(подробное описание)](#result). Удаленные провайдеры в список не попадают. Если провайдеров нет, возвращается пустой массив ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор провайдера ||
|| **title**
[`string`](../data-types.md) | Название провайдера ||
|| **description**
[`string`](../data-types.md) | Краткое описание провайдера ||
|| **iconUri**
[`string`](../data-types.md) | Адрес иконки провайдера для интерфейса Битрикс24 ||
|| **companyRegUri**
[`string`](../data-types.md) | Адрес страницы, на которой компания регистрируется у провайдера. Если адрес не задан, возвращается пустая строка ||
|| **documentSignUri**
[`string`](../data-types.md) | Адрес страницы подписания документа у провайдера ||
|| **publicKeyUri**
[`string`](../data-types.md) | Адрес публичного ключа провайдера. Ключом проверяется подпись документов ||
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

Если сервис подписи Битрикс24 вернул ошибку без собственного кода, метод отвечает с HTTP-статусом **200**, а в `result` вместо массива приходит объект с полями `error` и `error_description`. Проверяйте, что `result` — массив, перед тем как перебирать провайдеров.

```json
{
    "result": {
        "error": 0,
        "error_description": "Не удалось выполнить действие, попробуйте чуть позже (код ошибки: SIGN_CLIENT_CONNECTION_ERROR)"
    },
    "time": {...}
}
```

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не из приложения с OAuth-авторизацией, например через вебхук ||
|| `403` | `ACCESS_DENIED` | Access denied! Access denied | Пользователь не администратор или КЭДО недоступен на Битрикс24 ||
|| `403` | `ACCESS_DENIED` | Access denied! User authorization required | Запрос выполнен без авторизации пользователя ||
|| `200` | Код сервиса подписи | Текст ошибки сервиса подписи | Сервис подписи не получил список и вернул собственный код ошибки ||
|| `200` | `0` в `result.error` | Не удалось выполнить действие, попробуйте чуть позже (код ошибки: #CODE#) | Сервис подписи вернул ошибку или Битрикс24 не получил его ответ. Вместо `#CODE#` указан код причины. Текст приходит на языке пользователя ||
|| `200` | `0` в `result.error` | Действие пока недоступно, попробуйте чуть позже | Версия сервиса подписи еще не поддерживает это действие ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-provider-add.md)
- [{#T}](./sign-b2e-provider-update.md)
- [{#T}](./sign-b2e-provider-delete.md)
- [{#T}](./sign-b2e-company-provider-list.md)
- [{#T}](./index.md)
