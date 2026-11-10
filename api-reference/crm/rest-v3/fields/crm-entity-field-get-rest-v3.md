# Получить описание поля v 3.0 crm.<тип>.field.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение элементов этого типа объекта CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.field.get` возвращает описание одного поля типа объекта CRM по имени. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.field.get` | [Поля сделки](../items/fields-deal.md) ||
|| Лид | `crm.lead.field.get` | [Поля лида](../items/fields-lead.md) ||
|| Контакт | `crm.contact.field.get` | [Поля контакта](../items/fields-contact.md) ||
|| Компания | `crm.company.field.get` | [Поля компании](../items/fields-company.md) ||
|| Предложение | `crm.quote.field.get` | [Поля предложения](../items/fields-quote.md) ||
|| Счет | `crm.smartinvoice.field.get` | [Поля счета](../items/fields-smart-invoice.md) ||
|| Моя компания | `crm.mycompany.field.get` | [Поля моей компании](../items/fields-my-company.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.field.get`, например `crm.smartprocess1038.field.get` | [Поля смарт-процесса](../items/fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы описания полей есть у смарт-процесса при любых настройках типа.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.field.get`, а не `crm.smartInvoice.field.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Имя поля в camelCase, например `stageId`, или имя пользовательского поля, например `UF_CRM_CONTRACT_NUMBER`. Стандартные поля в верхнем регистре, например `TITLE`, метод не найдет. Список имен возвращает метод [crm.<тип>.field.list](./crm-entity-field-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей описания, которые нужно вернуть, например `["name", "type", "editable"]`. [Поля описания](#item).

По умолчанию метод возвращает все поля описания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.field.get`

{% endnote %}

Примеры получают описание поля стадии у смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"stageId"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.field.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"stageId","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.field.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldGetResult = {
      item: {
        name: string
        type: string
        title: string
        multiple: boolean
        editable: boolean
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<FieldGetResult>(
        'crm.smartprocess1038.field.get',
        {
          name: 'stageId',
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item.name, result.item.type, result.item.editable)
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
      async function getField() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.field.get',
            {
              name: 'stageId',
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item.name, result.item.type, result.item.editable)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getField)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.field.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "name": "stageId",
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["item"])
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
                'crm.smartprocess1038.field.get',
                [
                    'name' => 'stageId',
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
        'crm.smartprocess1038.field.get',
        {
            name: 'stageId',
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
        'crm.smartprocess1038.field.get',
        [
            'name' => 'stageId',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.field.get", b24.Params{
    	"name": "stageId",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.field.get: %w", err)
    }

    var out struct {
    	Item struct {
    		Name     string `json:"name"`
    		Type     string `json:"type"`
    		Editable bool   `json:"editable"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(out.Item.Name, out.Item.Type, out.Item.Editable)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "name": "stageId",
            "type": "string",
            "elementType": null,
            "multiple": false,
            "title": "Стадия",
            "description": null,
            "validationRules": [],
            "requiredGroups": null,
            "filterable": true,
            "sortable": true,
            "editable": true
        }
    },
    "time": {
        "start": 1793715000,
        "finish": 1793715000.500155,
        "duration": 0.500154972076416,
        "processing": 0,
        "date_start": "2026-11-03T17:10:00+03:00",
        "date_finish": "2026-11-03T17:10:00+03:00",
        "operating_reset_at": 1793715600,
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
|| **result.item**
[`object`](../../../data-types.md) | Описание поля. [Поля описания](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля описания {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Имя поля: у стандартного — в camelCase, например `title`, у пользовательского — вида `UF_CRM_…` ||
|| **type**
[`string`](../../../data-types.md) | Тип данных, например `string`, `int`, `date-time`, `object` ||
|| **elementType**
[`string`](../../../data-types.md) | Тип элемента для составных полей, например `object` у связанного объекта. У простых полей — `null` ||
|| **multiple**
[`boolean`](../../../data-types.md) | Множественное ли поле ||
|| **title**
[`string`](../../../data-types.md) | Название поля на языке Битрикс24 ||
|| **description**
[`string`](../../../data-types.md) | Описание поля. Если описания нет — `null` ||
|| **validationRules**
[`array`](../../../data-types.md) | Правила проверки значения, например `{"name": "Length", "parameters": {"max": 255}}` — длина не больше 255 символов ||
|| **requiredGroups**
[`array`](../../../data-types.md) | Методы, которые требуют это поле, например `["add"]`. Если таких методов нет — `null`. Обязательность, заданная методами [crm.<тип>.field.required.*](./crm-entity-field-required-get-rest-v3.md), здесь не видна. Правило контакта «`name` или `lastName`» здесь тоже не видно: о нем сообщит только ошибка [crm.<тип>.add](../items/crm-entity-add-rest-v3.md#required-fields) ||
|| **filterable**
[`boolean`](../../../data-types.md) | Можно ли фильтровать по полю в методе [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **sortable**
[`boolean`](../../../data-types.md) | Можно ли сортировать по полю в методе [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **editable**
[`boolean`](../../../data-types.md) | Можно ли передавать поле в методах [crm.<тип>.add](../items/crm-entity-add-rest-v3.md) и [crm.<тип>.update](../items/crm-entity-update-rest-v3.md) ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION",
        "message": "Поле `TITLE` не найдено"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Обязательное поле `name` не указано | Передайте `name` ||
|| `name` | В поле `name` требуется тип данных `string` для такого запроса | Передайте имя поля строкой ||
|#

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Поле `#NAME#` не найдено | Проверьте имя поля методом [crm.<тип>.field.list](./crm-entity-field-list-rest-v3.md). Имена стандартных полей пишутся в camelCase: `title`, а не `TITLE` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `CrmFieldMetadataDto` | Проверьте имена в `select` по [таблице полей описания](#item) ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение select `#VALUE#` | Передайте `select` массивом, например `["name"]`, а не строкой ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени пользователя с правом на чтение элементов этого типа объекта ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.field.get`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-field-list-rest-v3.md)
- [{#T}](./crm-entity-field-custom-list-rest-v3.md)
