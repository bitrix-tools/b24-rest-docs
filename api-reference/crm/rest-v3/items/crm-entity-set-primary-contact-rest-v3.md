# Сделать привязанный контакт основным v 3.0 crm.<тип>.setprimarycontact

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение элементов этого типа объекта CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.setprimarycontact` делает основным один из контактов, которые уже привязаны к элементу CRM. Тип объекта задает сегмент `<тип>` в имени метода.

Основной контакт — тот, чей идентификатор элемент возвращает в поле `contactId`. Все привязанные контакты перечислены в поле `contactsId`. Метод не привязывает новый контакт: сначала добавьте его методом [crm.<тип>.addfieldvalue](./crm-entity-add-field-value-rest-v3.md) с полем `contactsId`.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.setprimarycontact` | [Поля сделки](./fields-deal.md) ||
|| Лид | `crm.lead.setprimarycontact` | [Поля лида](./fields-lead.md) ||
|| Предложение | `crm.quote.setprimarycontact` | [Поля предложения](./fields-quote.md) ||
|| Счет | `crm.smartinvoice.setprimarycontact` | [Поля счета](./fields-smart-invoice.md) ||
|| Документ CRM | `crm.smartdocument.setprimarycontact` | — ||
|| Документ КЭДО | `crm.smartb2edocument.setprimarycontact` | — ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.setprimarycontact`, например `crm.smartprocess1038.setprimarycontact` | [Поля смарт-процесса](./fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.setprimarycontact`, а не `crm.smartInvoice.setprimarycontact`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

У смарт-процесса метод есть, только если в типе включена привязка к клиенту. Без нее вызов возвращает ошибку [«Метод не найден»](#method-not-found) со статусом 404. У контакта, компании и моей компании метода нет.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор элемента. Идентификаторы элементов можно получить методом [crm.<тип>.list](./crm-entity-list-rest-v3.md) ||
|| **contactId***
[`integer`](../../../data-types.md) | Идентификатор контакта, который нужно сделать основным. Контакт должен быть в поле `contactsId` элемента. Привязанные контакты возвращает метод [crm.<тип>.get](./crm-entity-get-rest-v3.md) ||
|#

Если контакт уже основной, метод отвечает `true` и ничего не меняет. Порядок контактов в `contactsId` метод не меняет.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.setprimarycontact`

{% endnote %}

Примеры делают основным контакт `3215` в элементе смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27,"contactId":3215}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.setprimarycontact
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27,"contactId":3215,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.setprimarycontact
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type SetPrimaryContactResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<SetPrimaryContactResult>(
        'crm.smartprocess1038.setprimarycontact',
        {
          id: 27,
          contactId: 3215,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Primary contact set:', result.result)
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
      async function setPrimaryContact() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.setprimarycontact',
            {
              id: 27,
              contactId: 3215,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Primary contact set:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setPrimaryContact)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.setprimarycontact"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 27,
                "contactId": 3215,
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
                'crm.smartprocess1038.setprimarycontact',
                [
                    'id' => 27,
                    'contactId' => 3215,
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
        'crm.smartprocess1038.setprimarycontact',
        {
            id: 27,
            contactId: 3215,
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
        'crm.smartprocess1038.setprimarycontact',
        [
            'id' => 27,
            'contactId' => 3215,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.setprimarycontact", b24.Params{
    	"id":        27,
    	"contactId": 3215,
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.setprimarycontact: %w", err)
    }

    var updated struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &updated); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(updated.Result)
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
        "start": 1793706737,
        "finish": 1793706737.554163,
        "duration": 0.5541629791259766,
        "processing": 0,
        "date_start": "2026-11-03T14:52:17+03:00",
        "date_finish": "2026-11-03T14:52:17+03:00",
        "operating_reset_at": 1793707320,
        "operating": 0.17444896697998047
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
[`boolean`](../../../data-types.md) | `true`, если контакт основной. Идентификатор основного контакта можно получить методом [crm.<тип>.get](./crm-entity-get-rest-v3.md) в поле `contactId` ||
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
                "message": "The contact is not bound to the item.",
                "field": "CONTACT_NOT_BOUND"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Элемент не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор элемента. Элемента с таким `id` нет у этого типа объекта или он удален ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` элемента ||
|| `contactId` | Обязательное поле `contactId` не указано | Передайте идентификатор контакта ||
|| `contactId` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор ||
|| `contactId` | В поле `contactId` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|| `CONTACT_NOT_BOUND` | The contact is not bound to the item. | Контакт не привязан к элементу. Привяжите его методом [crm.<тип>.addfieldvalue](./crm-entity-add-field-value-rest-v3.md) с полем `contactsId` ||
|| `CONTACT_NOT_FOUND` | The contact does not exist. | Контакта с таким идентификатором нет. Проверьте `contactId` ||
|#

В ошибках `CONTACT_NOT_BOUND` и `CONTACT_NOT_FOUND` поле `field` содержит не имя поля, а код ошибки.

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.setprimarycontact`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-update-rest-v3.md)
- [{#T}](./crm-entity-get-rest-v3.md)
- [{#T}](./crm-entity-add-field-value-rest-v3.md)
- [{#T}](./crm-entity-delete-field-value-rest-v3.md)
