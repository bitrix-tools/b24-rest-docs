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

Обязателен, если не передан параметр `companyCrmId`. Получить UUID можно методом [humanresources.hcmlink.company.list](./hcm-link/humanresources-hcmlink-company-list.md).

Требует дополнительный scope [`humanresources.hcmlink`](../scopes/permissions.md) ||
|| **companyCrmId***
[`integer`](../data-types.md) | Идентификатор компании в CRM, подключенный в интеграции как «моя компания».

Обязателен, если не передан параметр `companyUuid`. Получить идентификатор можно методом [crm.item.list](../crm/universal/crm-item-list.md) с параметром `entityTypeId = 4` и фильтром `isMyCompany = Y` ||
|| **language**
[`string`](../data-types.md) | Язык названий провайдеров. Код языка интерфейса Битрикс24, например `ru` или `en`.

Если язык не поддерживается, названия возвращаются на английском. По умолчанию `en` ||
|| **limit**
[`integer`](../data-types.md) | Количество записей на странице.

Параметр принимает значение от 1 до 1000.

По умолчанию 100 ||
|| **offset**
[`integer`](../data-types.md) | Сколько провайдеров пропустить от начала списка. Чтобы получить следующую страницу, увеличьте `offset` на значение `limit`.

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
      // Returns up to `limit` providers (1-1000, default 100) starting from `offset`.
      // To get the next page, repeat the call with offset increased by limit.
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

          // Returns up to `limit` providers (1-1000, default 100) starting from `offset`.
          // To get the next page, repeat the call with offset increased by limit.
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

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.sign.b2e.company.provider.list(
            company_crm_id=12,
            language="en",
            limit=2,
            offset=0,
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.company.provider.list", b24.Params{
    	"companyCrmId": 12,
    	"limit":        2,
    	"offset":       0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sign.b2e.company.provider.list: %w", err)
    }

    var items []struct {
    	Code    string `json:"code"`
    	Uid     string `json:"uid"`
    	Name    string `json:"name"`
    	Date    string `json:"date"`
    	Expires string `json:"expires"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Code, it.Uid)
    }

    // Total и Next заполняют списочные методы; для полного
    // обхода списка есть client.Core().Pages и Scan.
    if res.Total != nil {
    	fmt.Println("всего:", *res.Total)
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

HTTP-статус: **400**

```json
{
    "error": "510",
    "error_description": "Company was not found."
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! User authorization required | Запрос выполнен без авторизации пользователя ||
|| `403` | `ACCESS_DENIED` | Access denied! | КЭДО недоступен на Битрикс24, у приложения нет scope `sign.b2e` или `crm`, либо у пользователя нет права создавать документы КЭДО. Также возникает, если передан `companyUuid`, а scope `humanresources.hcmlink` не подключен ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не из приложения с OAuth-авторизацией, например через вебхук ||
|| `400` | Пустое значение | Parameter 'companyUuid' or 'companyCrmId' is required | Не передан ни `companyUuid`, ни `companyCrmId` ||
|| `400` | `510` | Company was not found. | Компания не найдена по `companyUuid` или `companyCrmId`. Так же метод отвечает, если в `companyCrmId` передан не идентификатор, например массив ||
|| `400` | `0` | Error while autoregistering providers | Не удалось зарегистрировать провайдеров компании в сервисе подписи. Проверьте реквизиты компании в CRM: у компании должен быть заполнен ИНН ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-document-send.md)
- [{#T}](./sign-b2e-document-get.md)
- [{#T}](./sign-b2e-provider-tail.md)
- [{#T}](./index.md)
