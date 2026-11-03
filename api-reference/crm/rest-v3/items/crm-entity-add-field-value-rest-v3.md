# Добавить значение в множественное поле элемента CRM v 3.0 crm.<тип>.addfieldvalue

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение элементов этого типа объекта CRM. Для моей компании — администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.addfieldvalue` добавляет одно значение в множественное поле элемента CRM и сохраняет значения, которые уже есть в поле. Тип объекта задает сегмент `<тип>` в имени метода.

Метод [crm.<тип>.update](./crm-entity-update-rest-v3.md) записывает множественное поле целиком: чтобы добавить значение, нужно передать весь новый список. Метод `addfieldvalue` добавляет одно значение, и поле не нужно предварительно читать.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.addfieldvalue` | [Поля сделки](./fields-deal.md) ||
|| Лид | `crm.lead.addfieldvalue` | [Поля лида](./fields-lead.md) ||
|| Контакт | `crm.contact.addfieldvalue` | [Поля контакта](./fields-contact.md) ||
|| Компания | `crm.company.addfieldvalue` | [Поля компании](./fields-company.md) ||
|| Предложение | `crm.quote.addfieldvalue` | [Поля предложения](./fields-quote.md) ||
|| Счет | `crm.smartinvoice.addfieldvalue` | [Поля счета](./fields-smart-invoice.md) ||
|| Моя компания | `crm.mycompany.addfieldvalue` | [Поля моей компании](./fields-my-company.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.addfieldvalue`, например `crm.smartprocess1038.addfieldvalue` | [Поля смарт-процесса](./fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.addfieldvalue`, а не `crm.smartInvoice.addfieldvalue`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Какие поля поддерживает метод {#supported-fields}

Метод работает только с множественными полями из таблицы. Другие поля, например `title` или `companyId`, вызывают ошибку `CRM_FIELD_NOT_SUPPORTED`.

#|
|| **Поле** | **Что добавляет** | **Типы объектов** ||
|| `phone`, `email`, `web`, `im` | Телефон, почту, сайт или мессенджер | Лид, контакт, компания, моя компания ||
|| `contactsId` | Привязку контакта | Сделка, лид, компания, предложение, счет, моя компания, смарт-процесс ||
|| `companiesId` | Привязку компании | Контакт ||
|| `observersId` | Наблюдателя | Сделка, лид, контакт, компания, счет, моя компания, смарт-процесс ||
|| Множественное пользовательское поле `UF_CRM_…` | Значение пользовательского поля | Все типы из таблицы выше ||
|#

У смарт-процесса поле `contactsId` есть, если в типе включена привязка к клиенту, а `observersId` — если включены наблюдатели. Подробнее — на странице [полей смарт-процесса](./fields-smart-process.md).

Одиночное пользовательское поле вызывает ошибку `CRM_FIELD_NOT_MULTIPLE`. Пользовательское поле типа «Да/Нет» метод не поддерживает, даже если оно множественное. Признак `multiple` поля возвращает метод [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор элемента. Идентификаторы элементов можно получить методом [crm.<тип>.list](./crm-entity-list-rest-v3.md) ||
|| **fieldName***
[`string`](../../../data-types.md) | Имя поля, в которое нужно добавить значение. Поддерживаемые поля перечислены в разделе [Какие поля поддерживает метод](#supported-fields) ||
|| **value***
[`any`](../../../data-types.md) | Значение, которое нужно добавить. Формат зависит от поля. [Описание параметра](#value) ||
|#

### Параметр value {#value}

#|
|| **Поле** | **Формат значения** ||
|| `phone`, `email`, `web`, `im` | Объект `{"valueTypeId": "WORK", "value": "+79990000000"}`. `valueTypeId` — тип значения, например `WORK` или `MOBILE`. Типы возвращают методы `crm.dictionary.phonetype.list`, `crm.dictionary.emailtype.list`, `crm.dictionary.webtype.list` и `crm.dictionary.imtype.list` — [описание методов справочников](../dictionaries/crm-dictionary-list-rest-v3.md) ||
|| `contactsId` | Идентификатор существующего контакта, число. Строка `"3213"` вызывает ошибку ||
|| `companiesId` | Идентификатор существующей компании, число ||
|| `observersId` | Идентификатор существующего пользователя, число ||
|| Пользовательское поле | Одно значение в формате типа поля. Строка — непустая строка, список — идентификатор варианта, привязка к сотруднику — идентификатор пользователя, число — число, дата — `2026-11-03`, дата со временем — `2026-11-03T14:00:00+03:00` ||
|#

Метод не добавляет значение, которое уже есть в поле, и возвращает ошибку `CRM_FIELD_VALUE_DUPLICATE`. Для телефона, почты, сайта и мессенджера совпадением считается одинаковая пара `valueTypeId` и `value`.

Если у элемента не было привязанных контактов, первый добавленный контакт становится основным: его идентификатор приходит в поле `contactId`. Основной контакт меняет метод [crm.<тип>.setprimarycontact](./crm-entity-set-primary-contact-rest-v3.md).

Ограничения:

- значений в одном поле `phone`, `email`, `web` или `im` — до 50
- значений во всех полях `phone`, `email`, `web` и `im` элемента вместе — до 100
- привязок компаний у контакта — до 50

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.addfieldvalue`

{% endnote %}

Примеры добавляют наблюдателя в элемент смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27,"fieldName":"observersId","value":1}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.addfieldvalue
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27,"fieldName":"observersId","value":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.addfieldvalue
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type AddFieldValueResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<AddFieldValueResult>(
        'crm.smartprocess1038.addfieldvalue',
        {
          id: 27,
          fieldName: 'observersId',
          value: 1,
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Value added:', result.result)
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
      async function addFieldValue() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.addfieldvalue',
            {
              id: 27,
              fieldName: 'observersId',
              value: 1,
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Value added:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addFieldValue)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.addfieldvalue"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 27,
                "fieldName": "observersId",
                "value": 1,
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
                'crm.smartprocess1038.addfieldvalue',
                [
                    'id' => 27,
                    'fieldName' => 'observersId',
                    'value' => 1,
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
        'crm.smartprocess1038.addfieldvalue',
        {
            id: 27,
            fieldName: 'observersId',
            value: 1,
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
        'crm.smartprocess1038.addfieldvalue',
        [
            'id' => 27,
            'fieldName' => 'observersId',
            'value' => 1,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.addfieldvalue", b24.Params{
    	"id":        27,
    	"fieldName": "observersId",
    	"value":     1,
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.addfieldvalue: %w", err)
    }

    var added struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &added); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(added.Result)
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
        "start": 1793706539,
        "finish": 1793706539.293379,
        "duration": 0.2933790683746338,
        "processing": 0,
        "date_start": "2026-11-03T14:48:59+03:00",
        "date_finish": "2026-11-03T14:48:59+03:00",
        "operating_reset_at": 1793707080,
        "operating": 0.13451194763183594
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
[`boolean`](../../../data-types.md) | `true`, если значение добавлено. Новое содержимое поля можно получить методом [crm.<тип>.get](./crm-entity-get-rest-v3.md) ||
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
                "message": "The field value already exists.",
                "field": "CRM_FIELD_VALUE_DUPLICATE"
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

Ошибки параметров запроса:

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` элемента ||
|| `id` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|| `fieldName` | Обязательное поле `fieldName` не указано | Передайте имя поля ||
|| `fieldName` | Значение поля не может быть пустым | Передайте непустое имя поля ||
|| `value` | Обязательное поле `value` не указано | Передайте значение. `null` тоже вызывает эту ошибку ||
|#

Ошибки значения. В них поле `field` содержит не имя поля, а код ошибки:

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `CRM_FIELD_NOT_SUPPORTED` | The field is not supported. | Метод не работает с этим полем у этого типа объекта. Проверьте поле по разделу [Какие поля поддерживает метод](#supported-fields) ||
|| `CRM_FIELD_NOT_MULTIPLE` | Only multiple fields are supported. | Пользовательское поле не множественное. Запишите его значение методом [crm.<тип>.update](./crm-entity-update-rest-v3.md) ||
|| `CRM_FIELD_VALUE_DUPLICATE` | The field value already exists. | Значение уже есть в поле, повторно добавлять его не нужно ||
|| `CRM_FIELD_VALUE_INVALID` | The relation value does not exist. | Контакта, компании или пользователя с таким идентификатором нет ||
|| `CRM_FIELD_VALUE_INVALID` | The custom field value is invalid. | Значение не подходит пользовательскому полю: неверный тип или несуществующий вариант списка ||
|| `CRM_FIELD_VALUE_LIMIT_EXCEEDED` | Too many multifield values. | В поле уже максимальное количество значений ||
|| `CRM_FIELD_VALUE_LOCKED` | The field is being changed by another operation. | Поле элемента в этот момент меняет другой запрос. Повторите вызов позже ||
|| `-` | The field value is invalid. | Значение не подходит по формату: строка вместо числа, объект телефона без `valueTypeId`, неизвестный тип значения, строка из пробелов ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.addfieldvalue`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-update-rest-v3.md)
- [{#T}](./crm-entity-get-rest-v3.md)
- [{#T}](./crm-entity-delete-field-value-rest-v3.md)
- [{#T}](./crm-entity-set-primary-contact-rest-v3.md)
- [{#T}](../fields/crm-entity-field-list-rest-v3.md)
