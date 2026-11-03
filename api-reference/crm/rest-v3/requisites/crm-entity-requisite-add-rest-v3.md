# Добавить реквизит v 3.0 crm.<тип>.requisite.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение контакта или компании, которой добавляется реквизит

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.requisite.add` добавляет реквизит контакту или компании и возвращает его идентификатор. Тип владельца задает сегмент `<тип>` в имени метода: `company` или `contact`.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Компания | `crm.company.requisite.add` ||
|| Контакт | `crm.contact.requisite.add` ||
|#

Реквизиты есть только у контактов и компаний. Тип владельца задает сегмент `company` или `contact` в имени метода, реквизит другого типа владельца метод не найдет. Реквизиты моей компании доступны через методы `crm.company.*`.

Имя метода пишется в нижнем регистре: `crm.company.requisite.add`, а не `crm.Company.Requisite.Add`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями реквизита в формате `{"поле": "значение"}`. [Описание параметра](#fields)

У реквизита есть [обязательные поля](#required-fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **companyId** или **contactId***
[`integer`](../../../data-types.md) | Идентификатор компании или контакта, которому добавляется реквизит. Имя поля зависит от метода: `companyId` в `crm.company.requisite.add`, `contactId` в `crm.contact.requisite.add`. Владельца нельзя изменить после создания.

Идентификатор можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **presetId***
[`integer`](../../../data-types.md) | Идентификатор шаблона реквизита. Шаблон определяет, какие поля можно заполнить: организация, ИП, физическое лицо и другие.

Шаблоны и их состав возвращает метод [crm.<тип>.requisite.preset.list](./crm-entity-requisite-preset-list-rest-v3.md) ||
|| **name***
[`string`](../../../data-types.md) | Название реквизита, например «Основной реквизит» ||
|| **active**
[`boolean`](../../../data-types.md) | Активен ли реквизит.

Возможные значения:

- `true` — активен
- `false` — неактивен

По умолчанию: `true` ||
|| **sort**
[`integer`](../../../data-types.md) | Сортировка.

По умолчанию: `500` ||
|| **xmlId**
[`string`](../../../data-types.md) | Внешний код реквизита ||
|| **originatorId**
[`string`](../../../data-types.md) | Идентификатор внешнего источника данных ||
|| Поля данных реквизита | Например `companyTitle`, `inn`, `kpp`, `ogrn`, `firstName`, `lastName`. Можно передать только поля, которые входят в шаблон `presetId`: их перечисляет массив `fields` шаблона с `kind: "requisiteField"`. Описание полей — в [обзоре методов реквизитов](./index.md#fields) ||
|#

Адреса и банковские реквизиты через `fields` не передаются. Их добавляют после создания реквизита методами [crm.<тип>.requisite.address.add](./crm-entity-requisite-address-add-rest-v3.md) и [crm.<тип>.requisite.bankrequisite.add](./crm-entity-requisite-bank-requisite-add-rest-v3.md).

{% note warning "" %}

Передавайте `name` с непустым значением. Без `name` метод не возвращает ответ и запрос обрывается по таймауту, а с пустой строкой отвечает HTTP 500 `INTERNAL_SERVER_ERROR`. Реквизит в обоих случаях не создается.

{% endnote %}

### Обязательные поля {#required-fields}

Без этих полей метод вернет ошибку и реквизит не создаст:

#|
|| **Тип объекта** | **Обязательно** ||
|| Компания | `companyId`, `presetId` и непустое `name` ||
|| Контакт | `contactId`, `presetId` и непустое `name` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.company.requisite.add`

{% endnote %}

Примеры добавляют реквизит организации компании с идентификатором `3167`. Для контакта замените имя метода на `crm.contact.requisite.add` и `companyId` на `contactId`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"companyId":3167,"presetId":1,"name":"Основной реквизит","companyTitle":"ООО «Ромашка»","inn":"7701234567","kpp":"770101001","ogrn":"1027700132195"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.requisite.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"companyId":3167,"presetId":1,"name":"Основной реквизит","companyTitle":"ООО «Ромашка»","inn":"7701234567","kpp":"770101001","ogrn":"1027700132195"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.company.requisite.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RequisiteAddResult = {
      id: number
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<RequisiteAddResult>(
        'crm.company.requisite.add',
        {
          fields: {
            companyId: 3167,
            presetId: 1,
            name: 'Основной реквизит',
            companyTitle: 'ООО «Ромашка»',
            inn: '7701234567',
            kpp: '770101001',
            ogrn: '1027700132195',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Requisite created:', result.id)
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
      async function addRequisite() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.company.requisite.add',
            {
              fields: {
                companyId: 3167,
                presetId: 1,
                name: 'Основной реквизит',
                companyTitle: 'ООО «Ромашка»',
                inn: '7701234567',
                kpp: '770101001',
                ogrn: '1027700132195',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Requisite created:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addRequisite)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.company.requisite.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "companyId": 3167,
                    "presetId": 1,
                    "name": "Основной реквизит",
                    "companyTitle": "ООО «Ромашка»",
                    "inn": "7701234567",
                    "kpp": "770101001",
                    "ogrn": "1027700132195",
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
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
                'crm.company.requisite.add',
                [
                    'fields' => [
                        'companyId' => 3167,
                        'presetId' => 1,
                        'name' => 'Основной реквизит',
                        'companyTitle' => 'ООО «Ромашка»',
                        'inn' => '7701234567',
                        'kpp' => '770101001',
                        'ogrn' => '1027700132195',
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
        'crm.company.requisite.add',
        {
            fields: {
                companyId: 3167,
                presetId: 1,
                name: 'Основной реквизит',
                companyTitle: 'ООО «Ромашка»',
                inn: '7701234567',
                kpp: '770101001',
                ogrn: '1027700132195',
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
        'crm.company.requisite.add',
        [
            'fields' => [
                'companyId' => 3167,
                'presetId' => 1,
                'name' => 'Основной реквизит',
                'companyTitle' => 'ООО «Ромашка»',
                'inn' => '7701234567',
                'kpp' => '770101001',
                'ogrn' => '1027700132195',
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
    res, err := client.Core().Call(ctx, "crm.company.requisite.add", b24.Params{
    	"fields": b24.Params{
    		"companyId":    3167,
    		"presetId":     1,
    		"name":         "Основной реквизит",
    		"companyTitle": "ООО «Ромашка»",
    		"inn":          "7701234567",
    		"kpp":          "770101001",
    		"ogrn":         "1027700132195",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.company.requisite.add: %w", err)
    }

    var result struct {
    	ID int `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 549
    },
    "time": {
        "start": 1793711900,
        "finish": 1793711900.089311,
        "duration": 0.08931088447570801,
        "processing": 0,
        "date_start": "2026-11-03T16:18:20+03:00",
        "date_finish": "2026-11-03T16:18:20+03:00",
        "operating_reset_at": 1793712480,
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
|| **result.id**
[`integer`](../../../data-types.md) | Идентификатор созданного реквизита. Поля реквизита можно получить методом [crm.<тип>.requisite.get](./crm-entity-requisite-get-rest-v3.md) ||
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
                "message": "Поле не входит в шаблон реквизита",
                "field": "firstName"
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
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `presetId` | Шаблон реквизита не найден | Передайте шаблон из ответа метода [crm.<тип>.requisite.preset.list](./crm-entity-requisite-preset-list-rest-v3.md) ||
|| `firstName` | Поле не входит в шаблон реквизита | Передайте только поля, которые есть в `fields` шаблона `presetId`. Состав шаблона возвращает метод [crm.<тип>.requisite.preset.get](./crm-entity-requisite-preset-get-rest-v3.md) ||
|| `inn` | Сократите значение поля до `#MAX_LENGTH#` символов | Сократите значение до указанной длины ||
|| `vatPayer` | В поле `vatPayer` требуется тип данных `bool` для такого запроса | Передайте значение того типа, который указан в описании поля. Логические поля — `true` или `false` ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `companyId` | Не заполнено обязательное поле "companyId" | Передайте владельца: `companyId` для компании, `contactId` для контакта ||
|| `presetId` | Не заполнено обязательное поле "presetId" | Передайте `presetId` ||
|| `createdById` | Поле "createdById" не доступно к заполнению | Уберите поле только для чтения из `fields`. Так же метод отвечает на `id`, `createdTime`, `updatedTime`, `updatedById`, `addresses` и `bankRequisites` ||
|#

#### Владелец не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Контакта или компании нет или у вас нет права на ее изменение. Проверьте идентификатор владельца и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `OwnerRequisiteCompanyDto` | Проверьте имя поля по [описанию полей реквизита](./index.md#fields). В методах компании владелец — `companyId`, в методах контакта — `contactId` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.company.requisite.add`. Методы реквизитов есть только у контактов и компаний: сегмент `company` или `contact` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-requisite-update-rest-v3.md)
- [{#T}](./crm-entity-requisite-preset-list-rest-v3.md)
- [{#T}](./crm-entity-requisite-bank-requisite-add-rest-v3.md)
- [{#T}](./crm-entity-requisite-address-add-rest-v3.md)
