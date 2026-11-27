# Получить список комплектов шаблонов sign.b2e.template.folder.tail

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`, `crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр шаблонов и комплектов КЭДО

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `sign.b2e.template.folder.tail` возвращает комплекты шаблонов, по которым пользователь может отправить документы сотруднику. Комплект объединяет несколько шаблонов одной компании.

Шаблоны комплекта возвращает метод [sign.b2e.template.folder.get](./sign-b2e-template-folder-get.md). Документы по ним отправляют методом [sign.b2e.template.send](./sign-b2e-template-send.md) — по одному вызову на шаблон.

Метод работает в приложении и через входящий вебхук. Приложению или вебхуку нужны два scope: `sign.b2e` и `crm`.

{% note info "" %}

Комплект не попадает в список, если:

- комплект выключен
- в комплекте больше 50 шаблонов или он ссылается на удаленный шаблон
- у шаблона комплекта не указана компания
- компания шаблона — не «моя компания» CRM
- у шаблонов комплекта разные компании
- пользователь не может просматривать один из шаблонов
- один из шаблонов выключен, не готов, скрыт или это шаблон документа, который сотрудник отправляет сам

«Моя компания» CRM — ваша организация, от имени которой отправляют документы.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **cursor**
[`object`](../data-types.md) | Курсор постраничной навигации [(подробное описание)](#cursor). Для первой страницы не передавайте параметр или передайте `value` равным `0` ||
|#

Другие параметры метод не принимает: вызов с ними вернет ошибку валидации.

### Параметр cursor {#cursor}

Комплекты идут по возрастанию `id`. Метод просматривает `limit` комплектов и возвращает только те, по которым можно отправить документы. Поэтому страница может прийти короткой или пустой, хотя комплекты еще есть.

Чтобы получить все комплекты:

1. Вызовите метод без `cursor`
2. Если в ответе `hasMore` равен `true`, передайте в следующий запрос `cursor` с `field` равным `id` и `value` из `cursor.value` ответа
3. Повторяйте, пока `hasMore` не станет равен `false`. Только это значение означает конец списка

#|
|| **Название**
`тип` | **Описание** ||
|| **field***
[`string`](../data-types.md) | Поле курсора. Поддерживается только `id` ||
|| **value***
[`integer`](../data-types.md) | Идентификатор, после которого начинается страница. Для первой страницы — `0`, для следующей — `cursor.value` из предыдущего ответа ||
|| **order**
[`string`](../data-types.md) | Направление обхода. Поддерживается только `ASC`.

По умолчанию: `ASC` ||
|| **limit**
[`integer`](../data-types.md) | Сколько комплектов метод просматривает за один вызов, от `1`. Значения больше `50` уменьшаются до `50`.

По умолчанию: `50` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/sign.b2e.template.folder.tail`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"cursor":{"field":"id","value":0,"order":"ASC","limit":20}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/sign.b2e.template.folder.tail
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"cursor":{"field":"id","value":0,"order":"ASC","limit":20},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/sign.b2e.template.folder.tail
    ```

- JS (TS)

    Методы `sign.b2e.*` REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FolderTailResult = {
      cursor: {
        field: string
        value: string | null
      }
      hasMore: boolean
      items: Array<{
        id: number
        title: string
        companyId: number
        companyName: string
        templateCount: number
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<FolderTailResult>(
        'sign.b2e.template.folder.tail',
        {
          cursor: {
            field: 'id',
            value: 0,
            order: 'ASC',
            limit: 20,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(folder => console.info(folder.id, folder.title, folder.templateCount))
        console.info('Next cursor:', result.cursor.value, 'has more:', result.hasMore)
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
      async function listFolders() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'sign.b2e.template.folder.tail',
            {
              cursor: {
                field: 'id',
                value: 0,
                order: 'ASC',
                limit: 20,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(folder => console.info(folder.id, folder.title, folder.templateCount))
          console.info('Next cursor:', result.cursor.value, 'has more:', result.hasMore)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listFolders)
    </script>
    ```

- Python

    SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`, а методов `sign.b2e.*` в нем пока нет. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "sign.b2e.template.folder.tail"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "cursor": {
                    "field": "id",
                    "value": 0,
                    "order": "ASC",
                    "limit": 20,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        for folder in result["items"]:
            print(folder["id"], folder["title"], folder["templateCount"])
        print("Next cursor:", result["cursor"]["value"], "has more:", result["hasMore"])
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
                'sign.b2e.template.folder.tail',
                [
                    'cursor' => [
                        'field' => 'id',
                        'value' => 0,
                        'order' => 'ASC',
                        'limit' => 20,
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
        'sign.b2e.template.folder.tail',
        {
            cursor: {
                field: 'id',
                value: 0,
                order: 'ASC',
                limit: 20,
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
        'sign.b2e.template.folder.tail',
        [
            'cursor' => [
                'field' => 'id',
                'value' => 0,
                'order' => 'ASC',
                'limit' => 20,
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
    res, err := client.Core().Call(ctx, "sign.b2e.template.folder.tail", b24.Params{
    	"cursor": b24.Params{
    		"field": "id",
    		"value": 0,
    		"order": "ASC",
    		"limit": 20,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sign.b2e.template.folder.tail: %w", err)
    }

    var result struct {
    	Cursor struct {
    		Field string  `json:"field"`
    		Value *string `json:"value"`
    	} `json:"cursor"`
    	HasMore bool `json:"hasMore"`
    	Items   []struct {
    		ID            int    `json:"id"`
    		Title         string `json:"title"`
    		CompanyID     int    `json:"companyId"`
    		CompanyName   string `json:"companyName"`
    		TemplateCount int    `json:"templateCount"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, folder := range result.Items {
    	fmt.Println(folder.ID, folder.Title, folder.TemplateCount)
    }
    fmt.Println("has more:", result.HasMore)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "cursor": {
            "field": "id",
            "value": "1"
        },
        "hasMore": false,
        "items": [
            {
                "id": 1,
                "title": "Прием на работу",
                "companyId": 2899,
                "companyName": "ООО Ромашка",
                "templateCount": 1
            }
        ]
    },
    "time": {
        "start": 1794480660,
        "finish": 1794480660.234878,
        "duration": 0.2348780632019043,
        "processing": 0,
        "date_start": "2026-11-12T13:51:00+03:00",
        "date_finish": "2026-11-12T13:51:00+03:00",
        "operating_reset_at": 1794481260,
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
|| **result.cursor**
[`object`](../data-types.md) | Курсор для следующей страницы [(подробное описание)](#result-cursor) ||
|| **result.hasMore**
[`boolean`](../data-types.md) | Есть ли еще комплекты.

Возможные значения:

- `true` — комплекты еще есть: запросите следующую страницу, даже если эта пришла пустой
- `false` — список закончился ||
|| **result.items**
[`array`](../data-types.md) | Массив комплектов [(подробное описание)](#items) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект cursor {#result-cursor}

#|
|| **Название**
`тип` | **Описание** ||
|| **field**
[`string`](../data-types.md) | Поле курсора — `id` ||
|| **value**
[`string`](../data-types.md) или `null` | Идентификатор последнего просмотренного комплекта, в том числе пропущенного. Передайте его в `cursor.value` следующего запроса. `null`, если метод не просмотрел ни одного комплекта ||
|#

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор комплекта. Передайте его в параметр `id` метода [sign.b2e.template.folder.get](./sign-b2e-template-folder-get.md) ||
|| **title**
[`string`](../data-types.md) | Название комплекта ||
|| **companyId**
[`integer`](../data-types.md) | Идентификатор компании CRM, от имени которой отправляются документы по всем шаблонам комплекта ||
|| **companyName**
[`string`](../data-types.md) | Название компании ||
|| **templateCount**
[`integer`](../data-types.md) | Количество шаблонов в комплекте ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "The cursor field must be id",
                "field": "cursor.field"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

HTTP-статус: **403**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_ACCESS_DENIED` | Недостаточно прав для этого действия в подписании с сотрудниками. Обратитесь к администратору Битрикс24 | Выдайте пользователю право на просмотр шаблонов и комплектов КЭДО. Вызывать метод должен активный сотрудник: служебная учетная запись, пользователь экстранета и гость коллабы получают эту ошибку ||
|| `SIGN_REST_SCOPE_REQUIRED` | Не хватает права доступа crm. Добавьте его в настройках приложения или входящего вебхука | Добавьте scope `crm` приложению или вебхуку ||
|| `SIGN_REST_AUTH_TYPE_NOT_ALLOWED` | Метод доступен только приложениям и входящим вебхукам | Вызовите метод из приложения или через входящий вебхук ||
|| `SIGN_B2E_UNAVAILABLE` | Подписание с сотрудниками недоступно в этом Битрикс24 | Проверьте, что КЭДО доступен в вашем Битрикс24 ||
|| `SIGN_B2E_TEMPLATES_UNAVAILABLE` | Шаблоны для подписания с сотрудниками недоступны в этом Битрикс24 | Проверьте, что шаблоны КЭДО доступны в вашем Битрикс24 ||
|| `SIGN_B2E_TEMPLATE_FOLDERS_UNAVAILABLE` | Комплекты шаблонов недоступны в этом Битрикс24 | Отправляйте документы по отдельным шаблонам из [sign.b2e.template.list](./sign-b2e-template-list.md) ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `cursor.field` | The cursor field must be id | Передайте `field` равным `id` ||
|| `cursor.value` | A cursor value of 0 or greater is expected | Передайте `0` или `cursor.value` из предыдущего ответа ||
|| `cursor.order` | Only the ASC cursor order is supported | Передайте `ASC` или не передавайте `order` ||
|| `cursor.value`, `cursor.limit` | An integer is expected | Передайте значение числом или строкой из цифр ||
|| имя параметра | Unknown parameter | Уберите параметр, которого нет в описании ||
|#

#### Ошибка параметра пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `cursor.limit` | Не удается распознать параметр пагинации `cursor.limit` | Передайте `limit` больше `0` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-template-folder-get.md)
- [{#T}](./sign-b2e-template-send.md)
- [{#T}](./sign-b2e-template-list.md)
- [{#T}](./index.md)
