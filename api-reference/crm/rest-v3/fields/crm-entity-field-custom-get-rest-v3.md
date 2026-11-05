# Получить пользовательское поле v 3.0 crm.<тип>.field.custom.get

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

Метод `crm.<тип>.field.custom.get` возвращает описание пользовательского поля: тип, настройки и подписи. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.field.custom.get` | [Поля сделки](../items/fields-deal.md) ||
|| Лид | `crm.lead.field.custom.get` | [Поля лида](../items/fields-lead.md) ||
|| Контакт | `crm.contact.field.custom.get` | [Поля контакта](../items/fields-contact.md) ||
|| Компания | `crm.company.field.custom.get` | [Поля компании](../items/fields-company.md) ||
|| Предложение | `crm.quote.field.custom.get` | [Поля предложения](../items/fields-quote.md) ||
|| Счет | `crm.smartinvoice.field.custom.get` | [Поля счета](../items/fields-smart-invoice.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.field.custom.get`, например `crm.smartprocess1038.field.custom.get` | [Поля смарт-процесса](../items/fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы пользовательских полей есть у смарт-процесса при любых настройках типа. У моей компании этих методов нет: на `crm.mycompany.field.custom.get` Битрикс24 ответит ошибкой [«Метод не найден»](#method-not-found).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.field.custom.get`, а не `crm.smartInvoice.field.custom.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Идентификатор поля или его имя, например `6008209` или `"UF_CRM_CONTRACT_NUMBER"`.

Идентификаторы и имена полей возвращает метод [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список параметров поля, которые нужно вернуть, например `["id", "name", "settings"]`. Можно передать `id`, `entityId` и параметры из описания [параметра fields](./crm-entity-field-custom-add-rest-v3.md#fields) метода создания.

По умолчанию метод возвращает все параметры поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.field.custom.get`

{% endnote %}

Примеры получают поле `UF_CRM_CONTRACT_NUMBER` смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6008209}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.field.custom.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6008209,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.field.custom.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CustomFieldGetResult = {
      item: {
        id: number
        name: string
        userTypeId: string
        editFormLabel: string | null
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CustomFieldGetResult>(
        'crm.smartprocess1038.field.custom.get',
        {
          id: 6008209,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item)
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
      async function getCustomField() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.field.custom.get',
            {
              id: 6008209,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCustomField)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.field.custom.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 6008209,
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
                'crm.smartprocess1038.field.custom.get',
                [
                    'id' => 6008209,
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
        'crm.smartprocess1038.field.custom.get',
        {
            id: 6008209,
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
        'crm.smartprocess1038.field.custom.get',
        [
            'id' => 6008209,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.field.custom.get", b24.Params{
    	"id": 6008209,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.field.custom.get: %w", err)
    }

    var out struct {
    	Item struct {
    		ID   int    `json:"id"`
    		Name string `json:"name"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(out.Item.ID, out.Item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 6008209,
            "entityId": "CRM_19",
            "name": "UF_CRM_CONTRACT_NUMBER",
            "userTypeId": "string",
            "xmlId": null,
            "sort": 100,
            "isMultiple": false,
            "isMandatory": false,
            "showFilter": "S",
            "showInList": true,
            "editInList": true,
            "isSearchable": false,
            "settings": {
                "size": 20,
                "rows": 1,
                "regexp": "",
                "minLength": 0,
                "maxLength": 40,
                "defaultValue": ""
            },
            "editFormLabel": "Номер договора с клиентом",
            "listColumnLabel": null,
            "listFilterLabel": null,
            "errorMessage": null,
            "helpMessage": null
        }
    },
    "time": {
        "start": 1793716016,
        "finish": 1793716017.200839,
        "duration": 1.2008390426635742,
        "processing": 0,
        "date_start": "2026-11-03T17:26:56+03:00",
        "date_finish": "2026-11-03T17:26:57+03:00",
        "operating_reset_at": 1793716560,
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
[`object`](../../../data-types.md) | Описание поля: [параметры поля](./crm-entity-field-custom-add-rest-v3.md#fields), идентификатор поля `id` и код типа объекта `entityId`. Код типа — например, `CRM_DEAL` у сделки или `CRM_19` у смарт-процесса из примеров. Число в коде смарт-процесса — поле `id` из [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md), а не `entityTypeId` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Подписи метод возвращает строкой на языке Битрикс24 по умолчанию. Ключи `settings` у каждого типа поля свои, они описаны в [параметре settings](./crm-entity-field-custom-add-rest-v3.md#settings) метода создания.

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION",
        "message": "Поле `999999999` не найдено"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Поле `#ID#` не найдено | Проверьте идентификатор или имя поля методом [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md). Та же ошибка придет, если поле относится к другому типу объекта или недоступно пользователю ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` поля ||
|| `id` | В поле `id` требуется тип данных `integer or string starting with UF_` для такого запроса | Передайте числовой идентификатор поля или имя, которое начинается с `UF_` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `CustomFieldConfigDto` | Проверьте имена в `select`: допустимы [параметры поля](./crm-entity-field-custom-add-rest-v3.md#fields), `id` и `entityId` ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение select `#VALUE#` | Передайте `select` массивом имен, например `["id", "name"]` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.field.custom.get`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). У моей компании этих методов нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-field-custom-add-rest-v3.md)
- [{#T}](./crm-entity-field-custom-update-rest-v3.md)
- [{#T}](./crm-entity-field-custom-list-rest-v3.md)
- [{#T}](./crm-entity-field-custom-delete-rest-v3.md)
