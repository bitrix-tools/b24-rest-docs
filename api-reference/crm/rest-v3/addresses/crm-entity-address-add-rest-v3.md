# Добавить адрес контакта или компании v 3.0 crm.<тип>.address.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение контакта или компании, которой добавляется адрес

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.address.add` добавляет адрес контакту или компании и возвращает идентификатор адреса. Тип владельца задает сегмент `<тип>` в имени метода. Адрес сохраняется в реквизите владельца: если реквизитов нет, CRM создает реквизит для хранения адреса.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Контакт | `crm.contact.address.add` ||
|| Компания | `crm.company.address.add` ||
|#

Адрес лида записывает метод [crm.lead.address.set](./crm-lead-address-set-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.company.address.add`, а не `crm.Company.address.add`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями адреса в формате `{"поле": "значение"}`. [Описание параметра](#fields)

У адреса есть [обязательные поля](#required-fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **contactId***
[`integer`](../../../data-types.md) | Идентификатор контакта. Передается в `crm.contact.address.add`.

Идентификатор можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **companyId***
[`integer`](../../../data-types.md) | Идентификатор компании. Передается в `crm.company.address.add`.

Идентификатор можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|| **typeId***
[`integer`](../../../data-types.md) | Тип адреса.

Возможные значения:

- `1` — фактический адрес
- `4` — адрес регистрации
- `6` — юридический адрес
- `9` — адрес бенефициара
- `11` — адрес доставки

Список типов возвращает метод [crm.dictionary.addresstype.list](../dictionaries/crm-dictionary-list-rest-v3.md). У владельца может быть только один адрес каждого типа ||
|| **address1**
[`string`](../../../data-types.md) | Улица, дом, корпус, строение ||
|| **address2**
[`string`](../../../data-types.md) | Квартира или офис ||
|| **city**
[`string`](../../../data-types.md) | Город ||
|| **postalCode**
[`string`](../../../data-types.md) | Почтовый индекс ||
|| **region**
[`string`](../../../data-types.md) | Район ||
|| **province**
[`string`](../../../data-types.md) | Область ||
|| **country**
[`string`](../../../data-types.md) | Страна ||
|| **countryCode**
[`string`](../../../data-types.md) | Код страны из справочника местоположений Битрикс24. Код проверяется по названию страны в `country`: если название не совпадает с названием страны на языке Битрикс24, метод вернет ошибку. Если кода страны нет, не передавайте поле ||
|#

Поля `id` и `requisiteId` только для чтения. Реквизит для адреса CRM выбирает сама: реквизит с адресом того же типа, реквизит, выбранный в карточке владельца, или первый реквизит. Чтобы добавить адрес в конкретный реквизит, используйте метод [crm.<тип>.requisite.address.add](../requisites/crm-entity-requisite-address-add-rest-v3.md).

### Обязательные поля {#required-fields}

Без этих полей метод вернет ошибку и адрес не создаст:

#|
|| **Тип объекта** | **Обязательно** ||
|| Контакт | `contactId`, `typeId` и хотя бы одно поле адреса: `address1`, `address2`, `city`, `postalCode`, `region`, `province` или `country` ||
|| Компания | `companyId`, `typeId` и хотя бы одно поле адреса: `address1`, `address2`, `city`, `postalCode`, `region`, `province` или `country` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.contact.address.add`

{% endnote %}

Примеры добавляют контакту фактический адрес. Для компании замените имя метода по таблице выше и передайте `companyId` вместо `contactId`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"contactId":3219,"typeId":1,"address1":"Невский проспект, 1","city":"Санкт-Петербург","postalCode":"191025","country":"Россия"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.address.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"contactId":3219,"typeId":1,"address1":"Невский проспект, 1","city":"Санкт-Петербург","postalCode":"191025","country":"Россия"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.contact.address.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type AddressAddResult = {
      id: number
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<AddressAddResult>(
        'crm.contact.address.add',
        {
          fields: {
            contactId: 3219,
            typeId: 1,
            address1: 'Невский проспект, 1',
            city: 'Санкт-Петербург',
            postalCode: '191025',
            country: 'Россия',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Address created:', result.id)
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
      async function addAddress() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.contact.address.add',
            {
              fields: {
                contactId: 3219,
                typeId: 1,
                address1: 'Невский проспект, 1',
                city: 'Санкт-Петербург',
                postalCode: '191025',
                country: 'Россия',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Address created:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addAddress)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.contact.address.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "contactId": 3219,
                    "typeId": 1,
                    "address1": "Невский проспект, 1",
                    "city": "Санкт-Петербург",
                    "postalCode": "191025",
                    "country": "Россия",
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
                'crm.contact.address.add',
                [
                    'fields' => [
                        'contactId' => 3219,
                        'typeId' => 1,
                        'address1' => 'Невский проспект, 1',
                        'city' => 'Санкт-Петербург',
                        'postalCode' => '191025',
                        'country' => 'Россия',
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
        'crm.contact.address.add',
        {
            fields: {
                contactId: 3219,
                typeId: 1,
                address1: 'Невский проспект, 1',
                city: 'Санкт-Петербург',
                postalCode: '191025',
                country: 'Россия',
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
        'crm.contact.address.add',
        [
            'fields' => [
                'contactId' => 3219,
                'typeId' => 1,
                'address1' => 'Невский проспект, 1',
                'city' => 'Санкт-Петербург',
                'postalCode' => '191025',
                'country' => 'Россия',
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
    res, err := client.Core().Call(ctx, "crm.contact.address.add", b24.Params{
    	"fields": b24.Params{
    		"contactId":  3219,
    		"typeId":     1,
    		"address1":   "Невский проспект, 1",
    		"city":       "Санкт-Петербург",
    		"postalCode": "191025",
    		"country":    "Россия",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.contact.address.add: %w", err)
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
        "id": 633
    },
    "time": {
        "start": 1793709949,
        "finish": 1793709949.853585,
        "duration": 0.8535850048065186,
        "processing": 0,
        "date_start": "2026-11-03T15:45:49+03:00",
        "date_finish": "2026-11-03T15:45:49+03:00",
        "operating_reset_at": 1793710260,
        "operating": 0.3442521095275879
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
[`integer`](../../../data-types.md) | Идентификатор созданного адреса. Адрес и реквизит, в котором он сохранен, можно получить методом [crm.<тип>.address.get](./crm-entity-address-get-rest-v3.md) ||
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
                "message": "Адрес такого типа уже есть, выберите другой тип",
                "field": "typeId"
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
|| `fields` | Заполните хотя бы одно поле адреса | Передайте хотя бы одно из полей `address1`, `address2`, `city`, `postalCode`, `region`, `province`, `country` ||
|| `typeId` | Адрес такого типа уже есть, выберите другой тип | Измените существующий адрес методом [crm.<тип>.address.update](./crm-entity-address-update-rest-v3.md) или передайте другой `typeId` ||
|| `typeId` | Неизвестный тип адреса, проверьте значение | Передайте тип из [crm.dictionary.addresstype.list](../dictionaries/crm-dictionary-list-rest-v3.md) ||
|| `countryCode` | Код страны не совпадает с названием страны, проверьте оба поля | Передайте в `country` название страны на языке Битрикс24 или не передавайте `countryCode` ||
|| `contactId` | Не удалось создать реквизит для хранения адреса | У владельца нет реквизитов, и CRM не смогла создать реквизит. Создайте реквизит методом [crm.<тип>.requisite.add](../requisites/crm-entity-requisite-add-rest-v3.md) и повторите запрос. В `crm.company.address.add` поле — `companyId` ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `contactId` | Не заполнено обязательное поле "contactId" | Передайте идентификатор владельца: `contactId` для контакта, `companyId` для компании ||
|| `typeId` | Не заполнено обязательное поле "typeId" | Передайте тип адреса ||
|| `requisiteId` | Поле "requisiteId" не доступно к заполнению | Уберите поле только для чтения из `fields`. Чтобы добавить адрес в конкретный реквизит, используйте [crm.<тип>.requisite.address.add](../requisites/crm-entity-requisite-address-add-rest-v3.md) ||
|#

#### Владелец не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Контакта или компании с таким идентификатором нет или у вас нет права на изменение. Проверьте идентификатор владельца и имя метода ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `OwnerAddressContactDto` | Проверьте имя поля по таблице [параметра fields](#fields). Метод контакта не принимает `companyId`, метод компании — `contactId`. Для компании в тексте ошибки — `OwnerAddressCompanyDto` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.company.address.add`. Метод есть только у контакта и компании ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-address-update-rest-v3.md)
- [{#T}](./crm-entity-address-list-rest-v3.md)
- [{#T}](./crm-entity-address-delete-rest-v3.md)
- [{#T}](../requisites/crm-entity-requisite-address-add-rest-v3.md)
