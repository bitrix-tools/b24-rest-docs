# Изменить вариант поля-списка v 3.0 crm.<тип>.field.custom.enum.update

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

Метод `crm.<тип>.field.custom.enum.update` изменяет вариант пользовательского поля-списка и возвращает описание варианта. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.field.custom.enum.update` | [Поля сделки](../items/fields-deal.md) ||
|| Лид | `crm.lead.field.custom.enum.update` | [Поля лида](../items/fields-lead.md) ||
|| Контакт | `crm.contact.field.custom.enum.update` | [Поля контакта](../items/fields-contact.md) ||
|| Компания | `crm.company.field.custom.enum.update` | [Поля компании](../items/fields-company.md) ||
|| Предложение | `crm.quote.field.custom.enum.update` | [Поля предложения](../items/fields-quote.md) ||
|| Счет | `crm.smartinvoice.field.custom.enum.update` | [Поля счета](../items/fields-smart-invoice.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.field.custom.enum.update`, например `crm.smartprocess1038.field.custom.enum.update` | [Поля смарт-процесса](../items/fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы вариантов полей-списков есть у смарт-процесса при любых настройках типа. У моей компании этих методов нет: на `crm.mycompany.field.custom.enum.update` Битрикс24 ответит ошибкой [«Метод не найден»](#method-not-found).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.field.custom.enum.update`, а не `crm.smartInvoice.field.custom.enum.update`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор варианта. Идентификаторы вариантов возвращает метод [crm.<тип>.field.custom.enum.list](./crm-entity-field-custom-enum-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с новыми данными варианта в формате `{"параметр": "значение"}`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

Передайте только те параметры, которые нужно изменить.

#|
|| **Название**
`тип` | **Описание** ||
|| **value**
[`string`](../../../data-types.md) | Текст варианта, который видит пользователь, например `Срочный`. Пустую строку метод не принимает ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Выбран ли вариант по умолчанию у новых элементов.

Возможные значения:

- `true` — вариант выбран по умолчанию
- `false` — не выбран ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок варианта в списке ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код варианта, уникальный в пределах поля ||
|#

Перенести вариант в другое поле нельзя: `fieldId` метод пропустит без ошибки. Пустой объект `fields` метод тоже примет и вернет вариант без изменений.

{% note warning "" %}

Метод не снимает признак `isDefault` с других вариантов. Если у поля уже есть вариант по умолчанию, а вы передадите `"isDefault": true` для другого, признак будет у обоих. Чтобы оставить один, передайте `"isDefault": false` для прежнего варианта.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.field.custom.enum.update`

{% endnote %}

Примеры меняют текст и порядок варианта в поле «Приоритет» смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4135,"fields":{"value":"Очень срочный","sort":1}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.field.custom.enum.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4135,"fields":{"value":"Очень срочный","sort":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.field.custom.enum.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EnumUpdateResult = {
      item: {
        id: number
        fieldId: number
        value: string
        isDefault: boolean
        sort: number
        xmlId: string
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<EnumUpdateResult>(
        'crm.smartprocess1038.field.custom.enum.update',
        {
          id: 4135,
          fields: {
            value: 'Очень срочный',
            sort: 1,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Value updated:', result.item.id, result.item.value)
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
      async function updateEnumValue() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.field.custom.enum.update',
            {
              id: 4135,
              fields: {
                value: 'Очень срочный',
                sort: 1,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Value updated:', result.item.id, result.item.value)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateEnumValue)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.field.custom.enum.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 4135,
                "fields": {
                    "value": "Очень срочный",
                    "sort": 1,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["item"]["id"], result["item"]["value"])
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
                'crm.smartprocess1038.field.custom.enum.update',
                [
                    'id' => 4135,
                    'fields' => [
                        'value' => 'Очень срочный',
                        'sort' => 1,
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
        'crm.smartprocess1038.field.custom.enum.update',
        {
            id: 4135,
            fields: {
                value: 'Очень срочный',
                sort: 1,
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
        'crm.smartprocess1038.field.custom.enum.update',
        [
            'id' => 4135,
            'fields' => [
                'value' => 'Очень срочный',
                'sort' => 1,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.field.custom.enum.update", b24.Params{
    	"id": 4135,
    	"fields": b24.Params{
    		"value": "Очень срочный",
    		"sort":  1,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.field.custom.enum.update: %w", err)
    }

    var out struct {
    	Item struct {
    		ID    int    `json:"id"`
    		Value string `json:"value"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(out.Item.ID, out.Item.Value)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 4135,
            "fieldId": 6008205,
            "value": "Очень срочный",
            "isDefault": false,
            "sort": 1,
            "xmlId": "URGENT"
        }
    },
    "time": {
        "start": 1793714989,
        "finish": 1793714989.621933,
        "duration": 0.6219329833984375,
        "processing": 0,
        "date_start": "2026-11-03T17:09:49+03:00",
        "date_finish": "2026-11-03T17:09:49+03:00",
        "operating_reset_at": 1793715540,
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
[`object`](../../../data-types.md) | Описание варианта. [Поля варианта](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля варианта {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор варианта ||
|| **fieldId**
[`integer`](../../../data-types.md) | Идентификатор поля-списка ||
|| **value**
[`string`](../../../data-types.md) | Текст варианта ||
|| **isDefault**
[`boolean`](../../../data-types.md) | Выбран ли вариант по умолчанию ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок варианта в списке ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код варианта ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `99999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Вариант не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор варианта методом [crm.<тип>.field.custom.enum.list](./crm-entity-field-custom-enum-list-rest-v3.md). Если в `id` передана строка не из цифр, в тексте ошибки будет `0` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` варианта ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `fields.value` | В поле `fields.value` требуется тип данных `non-empty string` для такого запроса | Передайте непустой текст варианта ||
|| `fields.xmlId` | Элемент списка со значением XML_ID=`#XML_ID#` уже существует. | Передайте другой `xmlId`: внешний код уникален в пределах поля ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields`: идентификатор варианта передается в параметре `id` на одном уровне с `fields` ||
|#

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Поле `#ID#` не найдено | Вариант принадлежит полю другого типа объекта. Проверьте, что тип объекта в имени метода совпадает с типом поля ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `EnumDto` | Проверьте имя параметра по [таблице параметра fields](#fields) ||
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
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.field.custom.enum.update`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). У моей компании этих методов нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-field-custom-enum-add-rest-v3.md)
- [{#T}](./crm-entity-field-custom-enum-get-rest-v3.md)
- [{#T}](./crm-entity-field-custom-enum-list-rest-v3.md)
- [{#T}](./crm-entity-field-custom-enum-delete-rest-v3.md)
