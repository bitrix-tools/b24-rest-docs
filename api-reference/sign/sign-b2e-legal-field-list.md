# Получить список полей информации для документов sign.b2e.legal.field.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом просматривать раздел с информацией для документов в профиле сотрудника

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `sign.b2e.legal.field.list` возвращает поля из раздела с информацией для документов в профиле сотрудника: ФИО, должность, адрес, СНИЛС, ИНН и поля, которые добавил сотрудник отдела кадров. Из этих полей кадровый электронный документооборот (КЭДО) подставляет данные в документы.

Для каждого поля метод сообщает формат значения, можно ли записать значение методом [sign.b2e.legal.profile.update](./sign-b2e-legal-profile-update.md) и как поле обозначается в шаблоне docx. Поля идут в том же порядке, что в списке полей редактора шаблонов.

Сотрудник отдела кадров может добавлять и удалять поля в любой момент, поэтому не храните список долго: запрашивайте его перед записью.

Метод работает в приложении и через входящий вебхук.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/sign.b2e.legal.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/sign.b2e.legal.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/sign.b2e.legal.field.list
    ```

- JS (TS)

    Методы `sign.b2e.*` REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type LegalFieldListResult = {
      items: Array<{
        code: string
        type: string
        caption: string
        writable: boolean
        signerPlaceholder: string | null
        assigneePlaceholder: string | null
        options: Array<{ id: number, value: string }> | null
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<LegalFieldListResult>(
        'sign.b2e.legal.field.list',
        {},
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items
          .filter(field => field.writable)
          .forEach(field => console.info(field.code, field.type, field.caption))
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
      async function listLegalFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'sign.b2e.legal.field.list',
            {},
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items
            .filter(field => field.writable)
            .forEach(field => console.info(field.code, field.type, field.caption))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listLegalFields)
    </script>
    ```

- Python

    SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`, а методов `sign.b2e.*` в нем пока нет. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "sign.b2e.legal.field.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={},
            prefer_version=3,
        )
        for field in response["result"]["items"]:
            if field["writable"]:
                print(field["code"], field["type"], field["caption"])
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
                'sign.b2e.legal.field.list',
                []
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
        'sign.b2e.legal.field.list',
        {},
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
        'sign.b2e.legal.field.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "sign.b2e.legal.field.list", b24.Params{}, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("sign.b2e.legal.field.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		Code     string `json:"code"`
    		Type     string `json:"type"`
    		Caption  string `json:"caption"`
    		Writable bool   `json:"writable"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, field := range result.Items {
    	if field.Writable {
    		fmt.Println(field.Code, field.Type, field.Caption)
    	}
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
                "code": "UF_LEGAL_NAME",
                "type": "string",
                "caption": "Имя",
                "writable": true,
                "signerPlaceholder": "User.Emp.Name",
                "assigneePlaceholder": "User.Rep.Name",
                "options": null
            },
            {
                "code": "UF_LEGAL_LAST_NAME",
                "type": "string",
                "caption": "Фамилия",
                "writable": true,
                "signerPlaceholder": "User.Emp.LastName",
                "assigneePlaceholder": "User.Rep.LastName",
                "options": null
            },
            {
                "code": "UF_LEGAL_PATRONYMIC_NAME",
                "type": "string",
                "caption": "Отчество",
                "writable": true,
                "signerPlaceholder": "User.Emp.Patronymic",
                "assigneePlaceholder": "User.Rep.Patronymic",
                "options": null
            },
            {
                "code": "UF_LEGAL_FULL_NAME",
                "type": "fullname",
                "caption": "ФИО",
                "writable": false,
                "signerPlaceholder": "User.Emp.FullName",
                "assigneePlaceholder": "User.Rep.FullName",
                "options": null
            },
            {
                "code": "UF_LEGAL_POSITION",
                "type": "string",
                "caption": "Должность",
                "writable": true,
                "signerPlaceholder": "User.Emp.Pos",
                "assigneePlaceholder": "User.Rep.Pos",
                "options": null
            },
            {
                "code": "UF_LEGAL_ADDRESS",
                "type": "string",
                "caption": "Адрес",
                "writable": true,
                "signerPlaceholder": "User.Emp.Addr",
                "assigneePlaceholder": "User.Rep.Addr",
                "options": null
            },
            {
                "code": "UF_LEGAL_SNILS",
                "type": "snils",
                "caption": "СНИЛС",
                "writable": true,
                "signerPlaceholder": "User.Emp.Snils",
                "assigneePlaceholder": "User.Rep.Snils",
                "options": null
            },
            {
                "code": "UF_LEGAL_INN",
                "type": "inn",
                "caption": "ИНН",
                "writable": true,
                "signerPlaceholder": "User.Emp.Inn",
                "assigneePlaceholder": "User.Rep.Inn",
                "options": null
            }
        ]
    },
    "time": {
        "start": 1794476870,
        "finish": 1794476870.412755,
        "duration": 0.41275501251220703,
        "processing": 0,
        "date_start": "2026-11-12T12:47:50+03:00",
        "date_finish": "2026-11-12T12:47:50+03:00",
        "operating_reset_at": 1794477420,
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
[`array`](../data-types.md) | Массив полей [(подробное описание)](#items) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код поля, например `UF_LEGAL_SNILS`. Передайте его ключом в параметр `fields` метода [sign.b2e.legal.profile.update](./sign-b2e-legal-profile-update.md) ||
|| **type**
[`string`](../data-types.md) | Формат значения.

Возможные значения:

- `string` — строка
- `snils` — СНИЛС
- `inn` — ИНН
- `date` — дата
- `address` — адрес
- `url` — ссылка
- `enumeration` — список. Варианты значений — в `options`
- `fullname` — ФИО. Собирается из имени, фамилии и отчества, записать его нельзя

Если пришел другой тип, считайте, что значение поля записать нельзя ||
|| **caption**
[`string`](../data-types.md) | Название поля на языке Битрикс24 ||
|| **writable**
[`boolean`](../data-types.md) | Можно ли записать значение методом `sign.b2e.legal.profile.update`.

Возможные значения:

- `true` — можно
- `false` — нельзя, например у поля типа `fullname` или у множественного поля ||
|| **signerPlaceholder**
[`string`](../data-types.md) или `null` | Метка для шаблона docx: на ее место КЭДО подставит значение поля из профиля сотрудника. `null`, если поле нельзя использовать в шаблонах ||
|| **assigneePlaceholder**
[`string`](../data-types.md) или `null` | Метка для шаблона docx: на ее место КЭДО подставит значение поля из профиля представителя компании. `null`, если поле нельзя использовать в шаблонах ||
|| **options**
[`array`](../data-types.md) или `null` | Варианты значения поля типа `enumeration`: массив объектов с ключами `id` и `value`. Для других типов — `null` ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": {
        "code": "SIGN_B2E_LEGAL_ACCESS_DENIED",
        "message": "Недостаточно прав на просмотр или изменение информации для документов в профиле сотрудника. Обратитесь к администратору Битрикс24"
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

HTTP-статус: **403**

#|
|| **Код** | **Описание ошибки** | **Как исправить** ||
|| `SIGN_B2E_LEGAL_ACCESS_DENIED` | Недостаточно прав на просмотр или изменение информации для документов в профиле сотрудника. Обратитесь к администратору Битрикс24 | Выдайте пользователю право просматривать раздел с информацией для документов в профиле сотрудника. Вызывать метод должен активный сотрудник: служебная учетная запись, пользователь экстранета и гость коллабы получают эту ошибку ||
|| `SIGN_REST_AUTH_TYPE_NOT_ALLOWED` | Метод доступен только приложениям и входящим вебхукам | Вызовите метод из приложения или через входящий вебхук ||
|| `SIGN_B2E_UNAVAILABLE` | Подписание с сотрудниками недоступно в этом Битрикс24 | Проверьте, что КЭДО доступен в вашем Битрикс24 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-legal-profile-update.md)
- [{#T}](./sign-b2e-template-list.md)
- [{#T}](./index.md)
