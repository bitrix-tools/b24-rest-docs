# Получить адрес v 3.0 crm.<тип>.address.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр контакта, компании или лида, которому принадлежит адрес

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.address.get` возвращает адрес контакта, компании или лида. Тип владельца задает сегмент `<тип>` в имени метода. У контакта и компании метод получает адрес по его идентификатору, у лида — по идентификатору лида.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Контакт | `crm.contact.address.get` ||
|| Компания | `crm.company.address.get` ||
|| Лид | `crm.lead.address.get` ||
|#

Имя метода пишется в нижнем регистре: `crm.company.address.get`, а не `crm.Company.address.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор, значение зависит от типа владельца:

- у контакта и компании — идентификатор адреса. Его можно получить методом [crm.<тип>.address.list](./crm-entity-address-list-rest-v3.md). Адрес должен принадлежать владельцу того типа, который задан в имени метода
- у лида — идентификатор лида. Его можно получить методом [crm.<тип>.list](../items/crm-entity-list-rest-v3.md) ||
|#

Метод возвращает все поля адреса. Параметр `select` на состав ответа не влияет.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.contact.address.get`

{% endnote %}

Примеры получают адрес контакта. Для компании и лида замените имя метода по таблице выше. Для лида передайте в `id` идентификатор лида.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":633}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.contact.address.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":633,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.contact.address.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type AddressGetResult = {
      item: {
        id: number
        typeId: number
        contactId: number
        requisiteId: number
        address1: string
        city: string
        postalCode: string
        country: string
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<AddressGetResult>(
        'crm.contact.address.get',
        {
          id: 633,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Address:', result.item)
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
      async function getAddress() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.contact.address.get',
            {
              id: 633,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Address:', result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getAddress)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.contact.address.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 633,
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
                'crm.contact.address.get',
                [
                    'id' => 633,
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
        'crm.contact.address.get',
        {
            id: 633,
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
        'crm.contact.address.get',
        [
            'id' => 633,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.contact.address.get", b24.Params{
    	"id": 633,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.contact.address.get: %w", err)
    }

    var result struct {
    	Item struct {
    		ID          int    `json:"id"`
    		TypeID      int    `json:"typeId"`
    		ContactID   int    `json:"contactId"`
    		RequisiteID int    `json:"requisiteId"`
    		Address1    string `json:"address1"`
    		City        string `json:"city"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.TypeID, result.Item.City, result.Item.Address1)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

{% list tabs %}

- Контакт и компания

    ```json
    {
        "result": {
            "item": {
                "id": 633,
                "typeId": 1,
                "contactId": 3219,
                "requisiteId": 547,
                "address1": "Невский проспект, 1",
                "address2": "",
                "city": "Санкт-Петербург",
                "postalCode": "191025",
                "region": "",
                "province": "",
                "country": "Россия",
                "countryCode": ""
            }
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

- Лид

    ```json
    {
        "result": {
            "item": {
                "address1": "Невский проспект, 1",
                "address2": "",
                "city": "Санкт-Петербург",
                "postalCode": "191025",
                "region": "",
                "province": "",
                "country": "Россия",
                "countryCode": ""
            }
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

{% endlist %}

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../../data-types.md) | Поля адреса. В адресе компании вместо `contactId` приходит `companyId`. У лида нет полей `id`, `typeId` и `requisiteId`. Если адрес лида не заполнен, все поля приходят пустыми строками. [Описание полей адреса](./index.md#fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `633` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|#

#### Адрес не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | У контакта и компании: адреса нет, он принадлежит владельцу другого типа или у вас нет права на просмотр владельца. У лида: лида нет или у вас нет права на его просмотр. Проверьте `id` и имя метода ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.company.address.get`. Метод есть только у контакта, компании и лида ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-address-list-rest-v3.md)
- [{#T}](./crm-entity-address-update-rest-v3.md)
- [{#T}](./crm-lead-address-set-rest-v3.md)
