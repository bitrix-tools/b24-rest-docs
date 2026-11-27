# Получить список шаблонов для отправки sign.b2e.template.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`, `crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр шаблонов КЭДО

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `sign.b2e.template.list` возвращает шаблоны компании, по которым пользователь может отправить документ на подписание сотруднику. Новые шаблоны идут первыми.

В список попадают только готовые и включенные шаблоны, которые пользователь может просматривать. Не попадают черновики, скрытые шаблоны и шаблоны документов, которые сотрудник отправляет сам.

Отправить документ по шаблону можно методом [sign.b2e.template.send](./sign-b2e-template-send.md): передайте ему `uid` шаблона из ответа.

Метод работает в приложении и через входящий вебхук. Приложению или вебхуку нужны два scope: `sign.b2e` и `crm`.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **pagination**
[`object`](../data-types.md) | Постраничная навигация [(подробное описание)](#pagination) ||
|#

Другие параметры, например `select` или `filter`, метод не принимает: вызов с ними вернет ошибку валидации.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../data-types.md) | Количество шаблонов на странице, от `1`. Значения больше `50` уменьшаются до `50`.

По умолчанию: `50` ||
|| **page**
[`integer`](../data-types.md) | Номер страницы, начиная с `1` ||
|| **offset**
[`integer`](../data-types.md) | Сколько шаблонов пропустить от начала списка. Если передан `page`, `offset` не учитывается ||
|#

Список закончился, если на странице пришло меньше шаблонов, чем `limit`. Если `limit` больше `50`, сравнивайте с `50`.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/sign.b2e.template.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"pagination":{"limit":20,"page":1}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/sign.b2e.template.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"pagination":{"limit":20,"page":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/sign.b2e.template.list
    ```

- JS (TS)

    Методы `sign.b2e.*` REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type TemplateListResult = {
      items: Array<{
        uid: string
        title: string
        companyId: number | null
        companyName: string | null
        regionDocumentType: string | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateListResult>(
        'sign.b2e.template.list',
        {
          pagination: {
            limit: 20,
            page: 1,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(template => console.info(template.uid, template.title))
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы `sign.b2e.*` REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listTemplates() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'sign.b2e.template.list',
            {
              pagination: {
                limit: 20,
                page: 1,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(template => console.info(template.uid, template.title))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTemplates)
    </script>
    ```

- Python

    SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`, а методов `sign.b2e.*` в нем пока нет. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "sign.b2e.template.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "pagination": {
                    "limit": 20,
                    "page": 1,
                },
            },
            prefer_version=3,
        )
        for template in response["result"]["items"]:
            print(template["uid"], template["title"])
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sign.b2e.template.list',
                [
                    'pagination' => [
                        'limit' => 20,
                        'page' => 1,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'sign.b2e.template.list',
        {
            pagination: {
                limit: 20,
                page: 1,
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sign.b2e.template.list',
        [
            'pagination' => [
                'limit' => 20,
                'page' => 1,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.template.list", b24.Params{
    	"pagination": b24.Params{
    		"limit": 20,
    		"page":  1,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sign.b2e.template.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		UID                string  `json:"uid"`
    		Title              string  `json:"title"`
    		CompanyID          *int    `json:"companyId"`
    		CompanyName        *string `json:"companyName"`
    		RegionDocumentType *string `json:"regionDocumentType"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, template := range result.Items {
    	fmt.Println(template.UID, template.Title)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "uid": "e2bjlmefhz8tzy1klbdnpnfsk3np08l2",
                "title": "Трудовой договор",
                "companyId": 2899,
                "companyName": "ООО Ромашка",
                "regionDocumentType": "12.999"
            }
        ]
    },
    "time": {
        "start": 1794480659,
        "finish": 1794480659.227879,
        "duration": 0.22787904739379883,
        "processing": 0,
        "date_start": "2026-11-12T13:50:59+03:00",
        "date_finish": "2026-11-12T13:50:59+03:00",
        "operating_reset_at": 1794481200,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../data-types.md) | Массив шаблонов [(подробное описание)](#items). Если доступных шаблонов нет, возвращается пустой массив ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Идентификатор шаблона. Передайте его в параметр `templateUid` метода [sign.b2e.template.send](./sign-b2e-template-send.md) ||
|| **title**
[`string`](../data-types.md) | Название шаблона ||
|| **companyId**
[`integer`](../data-types.md) или `null` | Идентификатор компании CRM, от имени которой отправляется документ. `null`, если в шаблоне компания не указана ||
|| **companyName**
[`string`](../data-types.md) или `null` | Название компании, от имени которой отправляется документ. `null`, если в шаблоне компания не указана ||
|| **regionDocumentType**
[`string`](../data-types.md) или `null` | Код типа документа для региона. `null`, если у шаблона нет типа документа ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": {
        "code": "SIGN_B2E_ACCESS_DENIED",
        "message": "Недостаточно прав для этого действия в подписании с сотрудниками. Обратитесь к администратору Битрикс24"
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

HTTP-статус: **403**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_ACCESS_DENIED` | Недостаточно прав для этого действия в подписании с сотрудниками. Обратитесь к администратору Битрикс24 | Выдайте пользователю право на просмотр шаблонов КЭДО. Вызывать метод должен активный сотрудник: служебная учетная запись, пользователь экстранета и гость коллабы получают эту ошибку ||
|| `SIGN_REST_SCOPE_REQUIRED` | Не хватает права доступа crm. Добавьте его в настройках приложения или входящего вебхука | Добавьте scope `crm` приложению или вебхуку ||
|| `SIGN_REST_AUTH_TYPE_NOT_ALLOWED` | Метод доступен только приложениям и входящим вебхукам | Вызовите метод из приложения или через входящий вебхук ||
|| `SIGN_B2E_UNAVAILABLE` | Подписание с сотрудниками недоступно в этом Битрикс24 | Проверьте, что КЭДО доступен в вашем Битрикс24 ||
|| `SIGN_B2E_TEMPLATES_UNAVAILABLE` | Шаблоны для подписания с сотрудниками недоступны в этом Битрикс24 | Проверьте, что шаблоны КЭДО доступны в вашем Битрикс24 ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select`, `filter` и другие | Unknown parameter | Передайте только `pagination` ||
|| `pagination.limit`, `pagination.page`, `pagination.offset` | An integer is expected | Передайте значение числом ||
|#

#### Ошибка параметра пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте `limit` больше `0` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-template-send.md)
- [{#T}](./sign-b2e-template-folder-tail.md)
- [{#T}](./sign-b2e-document-get.md)
- [{#T}](./index.md)
