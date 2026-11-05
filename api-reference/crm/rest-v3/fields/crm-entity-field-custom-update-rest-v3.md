# Изменить пользовательское поле v 3.0 crm.<тип>.field.custom.update

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

Метод `crm.<тип>.field.custom.update` изменяет настройки пользовательского поля и возвращает его описание. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.field.custom.update` | [Поля сделки](../items/fields-deal.md) ||
|| Лид | `crm.lead.field.custom.update` | [Поля лида](../items/fields-lead.md) ||
|| Контакт | `crm.contact.field.custom.update` | [Поля контакта](../items/fields-contact.md) ||
|| Компания | `crm.company.field.custom.update` | [Поля компании](../items/fields-company.md) ||
|| Предложение | `crm.quote.field.custom.update` | [Поля предложения](../items/fields-quote.md) ||
|| Счет | `crm.smartinvoice.field.custom.update` | [Поля счета](../items/fields-smart-invoice.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.field.custom.update`, например `crm.smartprocess1038.field.custom.update` | [Поля смарт-процесса](../items/fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы пользовательских полей есть у смарт-процесса при любых настройках типа. У моей компании этих методов нет: на `crm.mycompany.field.custom.update` Битрикс24 ответит ошибкой [«Метод не найден»](#method-not-found).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.field.custom.update`, а не `crm.smartInvoice.field.custom.update`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Идентификатор поля или его имя, например `6008209` или `"UF_CRM_CONTRACT_NUMBER"`.

Идентификаторы и имена полей возвращает метод [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с новыми настройками поля в формате `{"параметр": "значение"}`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

Передайте только те параметры, которые нужно изменить. Изменять можно:

- `xmlId`, `sort`, `isMandatory`, `showFilter`, `showInList`, `editInList`, `isSearchable`
- `settings` — настройки типа поля
- подписи `editFormLabel`, `listColumnLabel`, `listFilterLabel`, `errorMessage`, `helpMessage`

Значения и формат параметров — такие же, как в методе [crm.<тип>.field.custom.add](./crm-entity-field-custom-add-rest-v3.md#fields).

Имя `name`, тип `userTypeId` и признак множественности `isMultiple` после создания поля изменить нельзя. На `isMultiple` метод ответит [ошибкой валидации](#dto-validation).

{% note warning "" %}

Метод пропустит `name` и `userTypeId` без ошибки и изменит остальные параметры. Если в `fields` больше ничего нет, метод ответит ошибкой «At least one field must be specified.».

{% endnote %}

{% note warning "" %}

Метод заменяет настройки `settings` целиком: настройки, которые не переданы, возвращаются к значениям по умолчанию. Например, если у поля задан `minLength` = `3`, а в `settings` передать только `maxLength`, `minLength` станет `0`. Передавайте в `settings` все настройки, которые нужно сохранить. Текущие настройки возвращает метод [crm.<тип>.field.custom.get](./crm-entity-field-custom-get-rest-v3.md).

{% endnote %}

Подпись строкой меняет только текст на языке Битрикс24 по умолчанию, объект с кодами языков — подписи на переданных языках. Остальные подписи сохраняются.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.field.custom.update`

{% endnote %}

Примеры меняют подпись поля на двух языках, режим поиска в фильтре и максимальную длину значения у поля смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6008209,"fields":{"editFormLabel":{"ru":"Номер договора с клиентом","en":"Client contract number"},"showFilter":"S","settings":{"maxLength":40}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.field.custom.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":6008209,"fields":{"editFormLabel":{"ru":"Номер договора с клиентом","en":"Client contract number"},"showFilter":"S","settings":{"maxLength":40}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.field.custom.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CustomFieldUpdateResult = {
      item: {
        id: number
        name: string
        userTypeId: string
        editFormLabel: string | null
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CustomFieldUpdateResult>(
        'crm.smartprocess1038.field.custom.update',
        {
          id: 6008209,
          fields: {
            editFormLabel: {
              ru: 'Номер договора с клиентом',
              en: 'Client contract number',
            },
            showFilter: 'S',
            settings: {
              maxLength: 40,
            },
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Field updated:', result.item.id, result.item.editFormLabel)
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
      async function updateCustomField() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.field.custom.update',
            {
              id: 6008209,
              fields: {
                editFormLabel: {
                  ru: 'Номер договора с клиентом',
                  en: 'Client contract number',
                },
                showFilter: 'S',
                settings: {
                  maxLength: 40,
                },
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Field updated:', result.item.id, result.item.editFormLabel)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCustomField)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.field.custom.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 6008209,
                "fields": {
                    "editFormLabel": {
                        "ru": "Номер договора с клиентом",
                        "en": "Client contract number",
                    },
                    "showFilter": "S",
                    "settings": {
                        "maxLength": 40,
                    },
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["item"]["id"], result["item"]["editFormLabel"])
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
                'crm.smartprocess1038.field.custom.update',
                [
                    'id' => 6008209,
                    'fields' => [
                        'editFormLabel' => [
                            'ru' => 'Номер договора с клиентом',
                            'en' => 'Client contract number',
                        ],
                        'showFilter' => 'S',
                        'settings' => [
                            'maxLength' => 40,
                        ],
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
        'crm.smartprocess1038.field.custom.update',
        {
            id: 6008209,
            fields: {
                editFormLabel: {
                    ru: 'Номер договора с клиентом',
                    en: 'Client contract number',
                },
                showFilter: 'S',
                settings: {
                    maxLength: 40,
                },
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
        'crm.smartprocess1038.field.custom.update',
        [
            'id' => 6008209,
            'fields' => [
                'editFormLabel' => [
                    'ru' => 'Номер договора с клиентом',
                    'en' => 'Client contract number',
                ],
                'showFilter' => 'S',
                'settings' => [
                    'maxLength' => 40,
                ],
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.field.custom.update", b24.Params{
    	"id": 6008209,
    	"fields": b24.Params{
    		"editFormLabel": b24.Params{
    			"ru": "Номер договора с клиентом",
    			"en": "Client contract number",
    		},
    		"showFilter": "S",
    		"settings": b24.Params{
    			"maxLength": 40,
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.field.custom.update: %w", err)
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
        "start": 1793716015,
        "finish": 1793716015.706175,
        "duration": 0.7061750888824463,
        "processing": 0,
        "date_start": "2026-11-03T17:26:55+03:00",
        "date_finish": "2026-11-03T17:26:55+03:00",
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
[`object`](../../../data-types.md) | Описание поля после изменения: [параметры поля](./crm-entity-field-custom-add-rest-v3.md#fields), идентификатор поля `id` и код типа объекта `entityId`. Код типа — например, `CRM_DEAL` у сделки или `CRM_19` у смарт-процесса из примеров. Число в коде смарт-процесса — поле `id` из [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md), а не `entityTypeId` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Поле \"isMultiple\" не доступно к заполнению",
                "field": "isMultiple"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` поля ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `fields` | At least one field must be specified. | Передайте в `fields` хотя бы один параметр, который можно изменить ||
|| `id` | В поле `id` требуется тип данных `integer or string starting with UF_` для такого запроса | Передайте числовой идентификатор поля или имя, которое начинается с `UF_` ||
|| `isMandatory` | В поле `isMandatory` требуется тип данных `bool` для такого запроса | Передайте значение того типа, который указан в описании параметра. Логические параметры принимают только `true` или `false` ||
|| `settings` | В поле `settings` требуется тип данных `array` для такого запроса | Передайте `settings` объектом ||
|#

#### Ошибки валидации объекта {#dto-validation}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `isMultiple` | Поле "isMultiple" не доступно к заполнению | Уберите `isMultiple` из `fields`: множественность поля после создания не меняется ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields`: передайте идентификатор поля в параметре `id` на одном уровне с `fields` ||
|| `entityId` | Поле "entityId" не доступно к заполнению | Уберите `entityId` из `fields`: тип объекта задает имя метода ||
|| `showFilter` | Значение поля не содержится в списке допустимых значений: N, I, E, S | Передайте одно из значений `N`, `I`, `E`, `S` ||
|#

#### Поле не найдено

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Поле `#ID#` не найдено | Проверьте идентификатор или имя поля методом [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md). Та же ошибка придет, если поле относится к другому типу объекта или недоступно пользователю ||
|#

#### Ошибка фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `{}` | Уберите `filter` из запроса: метод изменяет одно поле по `id` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `CustomFieldConfigDto` | Проверьте имя параметра по [таблице параметра fields](./crm-entity-field-custom-add-rest-v3.md#fields). Если в ошибке поле `0`, значит `fields` передан строкой или массивом: передайте объект ||
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
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.field.custom.update`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). У моей компании этих методов нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-field-custom-add-rest-v3.md)
- [{#T}](./crm-entity-field-custom-get-rest-v3.md)
- [{#T}](./crm-entity-field-custom-list-rest-v3.md)
- [{#T}](./crm-entity-field-custom-delete-rest-v3.md)
