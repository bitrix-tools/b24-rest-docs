# Получить шаблоны комплекта sign.b2e.template.folder.get

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

Метод `sign.b2e.template.folder.get` возвращает комплект шаблонов: название, компанию и сами шаблоны. Новые шаблоны идут первыми, их поля — как в ответе метода [sign.b2e.template.list](./sign-b2e-template-list.md).

Метод найдет только комплект, по которому можно отправить документы. Это те же комплекты, что возвращает [sign.b2e.template.folder.tail](./sign-b2e-template-folder-tail.md), правила отбора описаны на его странице. Документы по шаблонам комплекта отправляют методом [sign.b2e.template.send](./sign-b2e-template-send.md) — по одному вызову на шаблон.

Метод работает в приложении и через входящий вебхук. Приложению или вебхуку нужны два scope: `sign.b2e` и `crm`.

{% note warning "" %}

Состав комплекта может измениться, поэтому получайте его прямо перед отправкой. Каждый документ комплекта отправляется отдельным вызовом `sign.b2e.template.send`. Если один из вызовов вернул ошибку, например `SIGN_B2E_MEMBER_ROLE_NOT_RESOLVED` или `SIGN_B2E_TEMPLATE_NOT_FOUND`, комплект отправлен не полностью: устраните причину и отправьте недостающие документы.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор комплекта. Получить его можно методом [sign.b2e.template.folder.tail](./sign-b2e-template-folder-tail.md) ||
|#

Другие параметры, например `select`, метод не принимает: вызов с ними вернет ошибку валидации.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/sign.b2e.template.folder.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/sign.b2e.template.folder.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/sign.b2e.template.folder.get
    ```

- JS (TS)

    Методы `sign.b2e.*` REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FolderGetResult = {
      item: {
        id: number
        title: string
        companyId: number
        companyName: string
        templateCount: number
        templates: Array<{
          uid: string
          title: string
          companyId: number | null
          companyName: string | null
          regionDocumentType: string | null
        }>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<FolderGetResult>(
        'sign.b2e.template.folder.get',
        {
          id: 1,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.item.templates.forEach(template => console.info(template.uid, template.title))
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
      async function getFolder() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'sign.b2e.template.folder.get',
            {
              id: 1,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.item.templates.forEach(template => console.info(template.uid, template.title))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFolder)
    </script>
    ```

- Python

    SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`, а методов `sign.b2e.*` в нем пока нет. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "sign.b2e.template.folder.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 1,
            },
            prefer_version=3,
        )
        for template in response["result"]["item"]["templates"]:
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
                'sign.b2e.template.folder.get',
                [
                    'id' => 1,
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
        'sign.b2e.template.folder.get',
        {
            id: 1,
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
        'sign.b2e.template.folder.get',
        [
            'id' => 1,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.template.folder.get", b24.Params{
    	"id": 1,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sign.b2e.template.folder.get: %w", err)
    }

    var result struct {
    	Item struct {
    		ID            int    `json:"id"`
    		Title         string `json:"title"`
    		TemplateCount int    `json:"templateCount"`
    		Templates     []struct {
    			UID   string `json:"uid"`
    			Title string `json:"title"`
    		} `json:"templates"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, template := range result.Item.Templates {
    	fmt.Println(template.UID, template.Title)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 1,
            "title": "Прием на работу",
            "companyId": 2899,
            "companyName": "ООО Ромашка",
            "templateCount": 1,
            "templates": [
                {
                    "uid": "e2bjlmefhz8tzy1klbdnpnfsk3np08l2",
                    "title": "Трудовой договор",
                    "companyId": 2899,
                    "companyName": "ООО Ромашка",
                    "regionDocumentType": "12.999"
                }
            ]
        }
    },
    "time": {
        "start": 1794480660,
        "finish": 1794480660.685563,
        "duration": 0.6855630874633789,
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
|| **result.item**
[`object`](../data-types.md) | Комплект [(подробное описание)](#item) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор комплекта ||
|| **title**
[`string`](../data-types.md) | Название комплекта ||
|| **companyId**
[`integer`](../data-types.md) | Идентификатор компании CRM, от имени которой отправляются документы по всем шаблонам комплекта ||
|| **companyName**
[`string`](../data-types.md) | Название компании ||
|| **templateCount**
[`integer`](../data-types.md) | Количество шаблонов в комплекте ||
|| **templates**
[`array`](../data-types.md) | Шаблоны комплекта. Поля шаблона описаны на странице [sign.b2e.template.list](./sign-b2e-template-list.md#items). `uid` шаблона передают в параметр `templateUid` метода [sign.b2e.template.send](./sign-b2e-template-send.md) ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "SIGN_B2E_TEMPLATE_FOLDER_NOT_FOUND",
        "message": "Комплект не найден или недоступен для отправки. Выберите комплект из списка доступных",
        "validation": [
            {
                "field": "id",
                "code": "SIGN_B2E_TEMPLATE_FOLDER_NOT_FOUND"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Комплект не найден

HTTP-статус: **404**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_TEMPLATE_FOLDER_NOT_FOUND` | Комплект не найден или недоступен для отправки. Выберите комплект из списка доступных | Возьмите `id` из ответа [sign.b2e.template.folder.tail](./sign-b2e-template-folder-tail.md). Ошибка одна и та же, если комплекта нет, пользователь не может его просматривать или по комплекту нельзя отправить документы ||
|#

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
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|| `id` | Значение поля должно быть не меньше, чем 1 | Передайте идентификатор комплекта больше `0` ||
|| `id` | An integer is expected | Передайте идентификатор числом ||
|| имя параметра | Unknown parameter | Уберите параметр, которого нет в описании ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-template-folder-tail.md)
- [{#T}](./sign-b2e-template-send.md)
- [{#T}](./sign-b2e-document-get.md)
- [{#T}](./index.md)
