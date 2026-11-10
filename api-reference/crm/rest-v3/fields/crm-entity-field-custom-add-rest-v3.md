# Создать пользовательское поле v 3.0 crm.<тип>.field.custom.add

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

Метод `crm.<тип>.field.custom.add` создает пользовательское поле у типа объекта CRM, например «Номер договора», и возвращает его описание. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.field.custom.add` | [Поля сделки](../items/fields-deal.md) ||
|| Лид | `crm.lead.field.custom.add` | [Поля лида](../items/fields-lead.md) ||
|| Контакт | `crm.contact.field.custom.add` | [Поля контакта](../items/fields-contact.md) ||
|| Компания | `crm.company.field.custom.add` | [Поля компании](../items/fields-company.md) ||
|| Предложение | `crm.quote.field.custom.add` | [Поля предложения](../items/fields-quote.md) ||
|| Счет | `crm.smartinvoice.field.custom.add` | [Поля счета](../items/fields-smart-invoice.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.field.custom.add`, например `crm.smartprocess1038.field.custom.add` | [Поля смарт-процесса](../items/fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Методы пользовательских полей есть у смарт-процесса при любых настройках типа. У моей компании этих методов нет: на `crm.mycompany.field.custom.add` Битрикс24 ответит ошибкой [«Метод не найден»](#method-not-found).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.field.custom.add`, а не `crm.smartInvoice.field.custom.add`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с настройками нового поля в формате `{"параметр": "значение"}`. В нем обязательны `name` и `userTypeId`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Имя поля, например `UF_CRM_CONTRACT_NUMBER`. Под этим именем значение поля передают в `fields` методов элементов, например [crm.<тип>.add](../items/crm-entity-add-rest-v3.md). [Правила имени](#name).

После создания имя изменить нельзя ||
|| **userTypeId***
[`string`](../../../data-types.md) | Тип поля. [Возможные значения](#user-type-id).

После создания тип изменить нельзя ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код поля, например идентификатор поля во внешней системе ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок сортировки поля в списке полей.

По умолчанию: `100` ||
|| **isMultiple**
[`boolean`](../../../data-types.md) | Признак множественного поля.

Возможные значения:

- `true` — поле хранит несколько значений, значение поля у элемента передавайте массивом
- `false` — поле хранит одно значение

По умолчанию: `false`

После создания признак изменить нельзя ||
|| **isMandatory**
[`boolean`](../../../data-types.md) | Признак обязательного поля.

Возможные значения:

- `true` — поле обязательно для заполнения
- `false` — поле необязательно

По умолчанию: `false` ||
|| **showFilter**
[`string`](../../../data-types.md) | Показывать ли поле в фильтре списка элементов и как искать по нему.

Возможные значения:

- `N` — не показывать в фильтре
- `I` — показывать, искать по точному совпадению
- `E` — показывать, искать по маске
- `S` — показывать, искать по подстроке

По умолчанию: `N` ||
|| **showInList**
[`boolean`](../../../data-types.md) | Показывать ли поле в списке элементов.

Возможные значения:

- `true` — показывать
- `false` — не показывать

По умолчанию: `true` ||
|| **editInList**
[`boolean`](../../../data-types.md) | Разрешено ли менять значение поля в списке элементов.

Возможные значения:

- `true` — разрешено
- `false` — запрещено

По умолчанию: `true` ||
|| **isSearchable**
[`boolean`](../../../data-types.md) | Участвуют ли значения поля в поиске.

Возможные значения:

- `true` — участвуют
- `false` — не участвуют

По умолчанию: `false` ||
|| **settings**
[`object`](../../../data-types.md) | Настройки, которые зависят от типа поля, например значение по умолчанию или инфоблок для привязки. [Описание параметра](#settings) ||
|| **editFormLabel**
[`string`](../../../data-types.md) \| [`object`](../../../data-types.md) | Название поля в карточке элемента. [Как передать подписи](#labels) ||
|| **listColumnLabel**
[`string`](../../../data-types.md) \| [`object`](../../../data-types.md) | Заголовок колонки поля в списке элементов ||
|| **listFilterLabel**
[`string`](../../../data-types.md) \| [`object`](../../../data-types.md) | Подпись поля в фильтре ||
|| **errorMessage**
[`string`](../../../data-types.md) \| [`object`](../../../data-types.md) | Текст ошибки, которую видит пользователь при неверном значении ||
|| **helpMessage**
[`string`](../../../data-types.md) \| [`object`](../../../data-types.md) | Текст подсказки к полю ||
|#

Имена параметров пишутся в camelCase: `userTypeId`, `isMultiple`. Поля `id` и `entityId` метод не принимает: идентификатор поля Битрикс24 назначает сам, а тип объекта задает имя метода.

#### Правила имени {#name}

- имя начинается с `UF_`, например `UF_CRM_CONTRACT_NUMBER`
- в имени только заглавные латинские буквы, цифры и `_`
- длина — не больше 50 символов
- имя уникально в пределах типа объекта

Занятые имена возвращает метод [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md).

#### Типы поля {#user-type-id}

- `string` — строка
- `rich_text` — форматированный текст
- `integer` — целое число
- `double` — дробное число
- `boolean` — да или нет
- `date` — дата
- `datetime` — дата и время
- `money` — деньги
- `url` — ссылка
- `address` — адрес
- `employee` — привязка к сотруднику
- `crm` — привязка к элементам CRM
- `crm_status` — привязка к справочнику CRM
- `iblock_section` — привязка к разделам инфоблока
- `iblock_element` — привязка к элементам инфоблока

Поля типов «Список» `enumeration` и «Файл» `file` метод не создает и отвечает [ошибкой валидации](#dto-validation). Если поле-список уже есть, его значения можно добавлять, менять и удалять методами [crm.<тип>.field.custom.enum.*](./crm-entity-field-custom-enum-list-rest-v3.md).

#### Подписи поля {#labels}

Подписи `editFormLabel`, `listColumnLabel`, `listFilterLabel`, `errorMessage` и `helpMessage` передаются двумя способами:

- строкой — подпись сохраняется на языке Битрикс24 по умолчанию
- объектом с кодами языков — подпись сохраняется на каждом из переданных языков: `{"ru": "Номер договора", "en": "Contract number"}`

В ответе метод возвращает подпись строкой на языке Битрикс24 по умолчанию. Если подпись на этом языке не задана, метод вернет `null`.

### Параметр settings {#settings}

Ключи `settings` пишутся в camelCase: `iblockId`, `defaultValue`, `maxLength`. Ключи вложенных объектов остаются как есть: например, у поля `datetime` значение `defaultValue` приходит как `{"TYPE": "NONE", "VALUE": ""}`.

Набор ключей у каждого типа поля свой, его возвращает метод [crm.userfield.settings.fields](../../universal/user-defined-fields/crm-userfield-settings-fields.md). Метод пишет ключи в верхнем регистре: вместо `IBLOCK_ID` передайте `iblockId`.

Логические настройки передаются как `true` или `false`. Настройки, которые не переданы, Битрикс24 заполняет значениями по умолчанию и возвращает их в ответе.

Для полей `iblock_section` и `iblock_element` настройка `iblockId` обязательна: без нее метод вернет ошибку «Выберите инфоблок, с которым нужно связать поле».

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.field.custom.add`

{% endnote %}

Примеры создают строковое поле «Номер договора» у смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"UF_CRM_CONTRACT_NUMBER","userTypeId":"string","editFormLabel":{"ru":"Номер договора","en":"Contract number"},"showFilter":"E","settings":{"maxLength":50}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.field.custom.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"UF_CRM_CONTRACT_NUMBER","userTypeId":"string","editFormLabel":{"ru":"Номер договора","en":"Contract number"},"showFilter":"E","settings":{"maxLength":50}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.field.custom.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CustomFieldAddResult = {
      item: {
        id: number
        name: string
        userTypeId: string
        settings: Record<string, unknown>
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CustomFieldAddResult>(
        'crm.smartprocess1038.field.custom.add',
        {
          fields: {
            name: 'UF_CRM_CONTRACT_NUMBER',
            userTypeId: 'string',
            editFormLabel: {
              ru: 'Номер договора',
              en: 'Contract number',
            },
            showFilter: 'E',
            settings: {
              maxLength: 50,
            },
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Field created:', result.item.id, result.item.name)
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
      async function addCustomField() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.field.custom.add',
            {
              fields: {
                name: 'UF_CRM_CONTRACT_NUMBER',
                userTypeId: 'string',
                editFormLabel: {
                  ru: 'Номер договора',
                  en: 'Contract number',
                },
                showFilter: 'E',
                settings: {
                  maxLength: 50,
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
          console.info('Field created:', result.item.id, result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCustomField)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.field.custom.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "name": "UF_CRM_CONTRACT_NUMBER",
                    "userTypeId": "string",
                    "editFormLabel": {
                        "ru": "Номер договора",
                        "en": "Contract number",
                    },
                    "showFilter": "E",
                    "settings": {
                        "maxLength": 50,
                    },
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["item"]["id"], result["item"]["name"])
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
                'crm.smartprocess1038.field.custom.add',
                [
                    'fields' => [
                        'name' => 'UF_CRM_CONTRACT_NUMBER',
                        'userTypeId' => 'string',
                        'editFormLabel' => [
                            'ru' => 'Номер договора',
                            'en' => 'Contract number',
                        ],
                        'showFilter' => 'E',
                        'settings' => [
                            'maxLength' => 50,
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
        'crm.smartprocess1038.field.custom.add',
        {
            fields: {
                name: 'UF_CRM_CONTRACT_NUMBER',
                userTypeId: 'string',
                editFormLabel: {
                    ru: 'Номер договора',
                    en: 'Contract number',
                },
                showFilter: 'E',
                settings: {
                    maxLength: 50,
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
        'crm.smartprocess1038.field.custom.add',
        [
            'fields' => [
                'name' => 'UF_CRM_CONTRACT_NUMBER',
                'userTypeId' => 'string',
                'editFormLabel' => [
                    'ru' => 'Номер договора',
                    'en' => 'Contract number',
                ],
                'showFilter' => 'E',
                'settings' => [
                    'maxLength' => 50,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.field.custom.add", b24.Params{
    	"fields": b24.Params{
    		"name":       "UF_CRM_CONTRACT_NUMBER",
    		"userTypeId": "string",
    		"editFormLabel": b24.Params{
    			"ru": "Номер договора",
    			"en": "Contract number",
    		},
    		"showFilter": "E",
    		"settings": b24.Params{
    			"maxLength": 50,
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.field.custom.add: %w", err)
    }

    var created struct {
    	Item struct {
    		ID   int    `json:"id"`
    		Name string `json:"name"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &created); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(created.Item.ID, created.Item.Name)
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
            "showFilter": "E",
            "showInList": true,
            "editInList": true,
            "isSearchable": false,
            "settings": {
                "size": 20,
                "rows": 1,
                "regexp": "",
                "minLength": 0,
                "maxLength": 50,
                "defaultValue": ""
            },
            "editFormLabel": "Номер договора",
            "listColumnLabel": null,
            "listFilterLabel": null,
            "errorMessage": null,
            "helpMessage": null
        }
    },
    "time": {
        "start": 1793716013,
        "finish": 1793716014.048628,
        "duration": 1.0486280918121338,
        "processing": 1,
        "date_start": "2026-11-03T17:26:53+03:00",
        "date_finish": "2026-11-03T17:26:54+03:00",
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
[`object`](../../../data-types.md) | Описание созданного поля: все [параметры поля](#fields), в том числе не переданные в запросе, со значениями по умолчанию. Кроме них, объект содержит два ключа:

- `id` — идентификатор поля. Нужен для методов [crm.<тип>.field.custom.update](./crm-entity-field-custom-update-rest-v3.md), [crm.<тип>.field.custom.get](./crm-entity-field-custom-get-rest-v3.md) и [crm.<тип>.field.custom.delete](./crm-entity-field-custom-delete-rest-v3.md)
- `entityId` — код типа объекта: `CRM_DEAL` у сделки, `CRM_19` у смарт-процесса из примеров. Число в коде смарт-процесса — поле `id` из [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md), а не `entityTypeId` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYALREADYEXISTSEXCEPTION",
        "message": "Запись с идентификатором UF_CRM_CONTRACT_NUMBER уже существует."
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `isMultiple` | В поле `isMultiple` требуется тип данных `bool` для такого запроса | Передайте значение того типа, который указан в описании параметра. Логические параметры принимают только `true` или `false` ||
|| `settings` | В поле `settings` требуется тип данных `array` для такого запроса | Передайте `settings` объектом ||
|| `name` | The field name is required. | Передайте непустое имя поля в `name` ||
|| `field` | Имя поля начинается не с UF_ | Начните имя с `UF_`, например `UF_CRM_CONTRACT_NUMBER` ||
|| `field` | Имя поля содержит недопустимые символы. Допустимыми являются: A-Z, 0-9 и _. | Используйте в имени только заглавные латинские буквы, цифры и `_` ||
|| `field` | Имя поля слишком длинное (больше 50-ти символов). | Сократите имя до 50 символов ||
|| `field` | Выберите инфоблок, с которым нужно связать поле | Передайте `iblockId` в `settings` для поля `iblock_section` или `iblock_element` ||
|#

Ошибки имени поля и настроек инфоблока приходят с `"field": "field"`. Их текст заканчивается тегом `<br>`. Если таких ошибок несколько, Битрикс24 объединяет их в одно сообщение.

#### Ошибки валидации объекта {#dto-validation}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `userTypeId` | Не заполнено обязательное поле "userTypeId" | Передайте `userTypeId` в `fields` ||
|| `userTypeId` | Значение поля не содержится в списке допустимых значений: `#VALUES#` | Передайте тип из [списка типов](#user-type-id). Поля `enumeration` и `file` метод не создает ||
|| `showFilter` | Значение поля не содержится в списке допустимых значений: N, I, E, S | Передайте одно из значений `N`, `I`, `E`, `S` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields`: идентификатор назначается автоматически ||
|| `entityId` | Поле "entityId" не доступно к заполнению | Уберите `entityId` из `fields`: тип объекта задает имя метода ||
|#

#### Поле уже существует

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYALREADYEXISTSEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с идентификатором `#NAME#` уже существует. | Выберите другое имя поля. Занятые имена возвращает метод [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `CustomFieldConfigDto` | Проверьте имя параметра по [таблице параметра fields](#fields). Если в ошибке поле `0`, значит `fields` передан строкой или массивом: передайте его объектом ||
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
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.field.custom.add`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). У моей компании методов пользовательских полей нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-field-custom-update-rest-v3.md)
- [{#T}](./crm-entity-field-custom-get-rest-v3.md)
- [{#T}](./crm-entity-field-custom-list-rest-v3.md)
- [{#T}](./crm-entity-field-custom-delete-rest-v3.md)
- [{#T}](./crm-entity-field-required-set-rest-v3.md)
