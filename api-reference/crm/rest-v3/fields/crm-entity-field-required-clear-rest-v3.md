# Снять обязательность поля v 3.0 crm.<тип>.field.required.clear

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Разрешить изменять настройки» в CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.field.required.clear` снимает обязательность поля в воронке: после вызова режим обязательности — `none`. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.field.required.clear` | [Поля сделки](../items/fields-deal.md) ||
|| Лид | `crm.lead.field.required.clear` | [Поля лида](../items/fields-lead.md) ||
|| Контакт | `crm.contact.field.required.clear` | [Поля контакта](../items/fields-contact.md) ||
|| Компания | `crm.company.field.required.clear` | [Поля компании](../items/fields-company.md) ||
|| Предложение | `crm.quote.field.required.clear` | [Поля предложения](../items/fields-quote.md) ||
|| Счет | `crm.smartinvoice.field.required.clear` | [Поля счета](../items/fields-smart-invoice.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.field.required.clear`, например `crm.smartprocess1038.field.required.clear` | [Поля смарт-процесса](../items/fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы обязательности полей есть у смарт-процесса при любых настройках типа. У моей компании этих методов нет: на `crm.mycompany.field.required.clear` Битрикс24 ответит ошибкой [«Метод не найден»](#method-not-found).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.field.required.clear`, а не `crm.smartInvoice.field.required.clear`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fieldId***
[`string`](../../../data-types.md) | Имя поля: стандартного в camelCase, например `title` или `opportunity`, или пользовательского, например `UF_CRM_CONTRACT_NUMBER`. Имена полей возвращает метод [crm.<тип>.field.list](./crm-entity-field-list-rest-v3.md) ||
|| **categoryId**
[`integer`](../../../data-types.md) | Идентификатор воронки. [Когда передавать](#category-id) ||
|#

### Параметр categoryId {#category-id}

Битрикс24 хранит обязательность отдельно для каждой воронки. Передавать ли `categoryId`, зависит от типа объекта:

#|
|| **Тип объекта** | **categoryId** ||
|| Сделка, контакт, компания | Обязателен. Воронку по умолчанию задает `0`, другие воронки — их идентификаторы из метода [crm.<тип>.category.list](../categories/crm-entity-category-list-rest-v3.md) ||
|| Смарт-процесс | Обязателен. Идентификатор воронки вернет метод [crm.<тип>.category.list](../categories/crm-entity-category-list-rest-v3.md). Если в типе выключены воронки, у смарт-процесса одна воронка и нет методов воронок. Идентификатор этой воронки вернет метод [crm.category.list](../../universal/category/crm-category-list.md) с `entityTypeId` смарт-процесса ||
|| Счет | Обязателен. Идентификатор воронки счетов возвращает метод [crm.category.list](../../universal/category/crm-category-list.md) с `entityTypeId` = `31`: в REST 3.0 метода воронок счета нет ||
|| Лид, предложение | Не передается ||
|#

Если передать `categoryId` не по таблице, метод вернет ошибку с текстом `Invalid category ID.`

Если у пользовательского поля `isMandatory` равен `true`, после вызова поле останется обязательным во всех воронках: этот признак метод не меняет. Снять его можно методом [crm.<тип>.field.custom.update](./crm-entity-field-custom-update-rest-v3.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.field.required.clear`

{% endnote %}

Примеры снимают обязательность поля «Номер договора» в воронке `69` смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fieldId":"UF_CRM_CONTRACT_NUMBER","categoryId":69}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.field.required.clear
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fieldId":"UF_CRM_CONTRACT_NUMBER","categoryId":69,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.field.required.clear
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RequirementClearResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<RequirementClearResult>(
        'crm.smartprocess1038.field.required.clear',
        {
          fieldId: 'UF_CRM_CONTRACT_NUMBER',
          categoryId: 69,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Requirement cleared:', result.result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function clearRequirement() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.field.required.clear',
            {
              fieldId: 'UF_CRM_CONTRACT_NUMBER',
              categoryId: 69,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Requirement cleared:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', clearRequirement)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.field.required.clear"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fieldId": "UF_CRM_CONTRACT_NUMBER",
                "categoryId": 69,
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["result"])
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
                'crm.smartprocess1038.field.required.clear',
                [
                    'fieldId' => 'UF_CRM_CONTRACT_NUMBER',
                    'categoryId' => 69,
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
        'crm.smartprocess1038.field.required.clear',
        {
            fieldId: 'UF_CRM_CONTRACT_NUMBER',
            categoryId: 69,
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
        'crm.smartprocess1038.field.required.clear',
        [
            'fieldId' => 'UF_CRM_CONTRACT_NUMBER',
            'categoryId' => 69,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.field.required.clear", b24.Params{
    	"fieldId":    "UF_CRM_CONTRACT_NUMBER",
    	"categoryId": 69,
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.field.required.clear: %w", err)
    }

    var out struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(out.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": true
    },
    "time": {
        "start": 1793716022,
        "finish": 1793716022.250977,
        "duration": 0.2509770393371582,
        "processing": 0,
        "date_start": "2026-11-03T17:27:02+03:00",
        "date_finish": "2026-11-03T17:27:02+03:00",
        "operating_reset_at": 1793716620,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.result**
[`boolean`](../../../data-types.md) | `true`, если обязательность снята или ее не было ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Invalid category ID.",
                "field": "categoryId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

Ошибка «Воронка не найдена» приходит с коротким кодом `CONTEXT_NOT_FOUND` без префикса `BITRIX_REST_V3_`. Ее текст и тексты ошибок валидации — на английском языке.

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fieldId` | fieldId must be a non-empty string. | Передайте имя поля строкой, например `"UF_CRM_CONTRACT_NUMBER"` ||
|| `categoryId` | Invalid category ID. | Передайте `categoryId` по [таблице параметра](#category-id) ||
|| `categoryId` | categoryId must be a non-negative integer. | Передайте идентификатор воронки целым числом не меньше `0` ||
|#

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Поле `#FIELD#` не найдено | Проверьте имя поля методом [crm.<тип>.field.list](./crm-entity-field-list-rest-v3.md). Имена стандартных полей пишутся в camelCase: `title`, а не `TITLE` ||
|#

#### Воронка не найдена

Код ошибки: `CONTEXT_NOT_FOUND`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | The field requirement context was not found. | Проверьте `categoryId` по [таблице параметра](#category-id) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени пользователя с правом «Разрешить изменять настройки» в CRM ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.field.required.clear`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). У моей компании этих методов нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-field-required-get-rest-v3.md)
- [{#T}](./crm-entity-field-required-set-rest-v3.md)
