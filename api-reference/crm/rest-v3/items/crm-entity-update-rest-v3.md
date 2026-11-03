# Изменить элемент CRM v 3.0 crm.<тип>.update

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

Метод `crm.<тип>.update` изменяет поля существующего элемента CRM. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.update` | [Поля сделки](./fields-deal.md) ||
|| Лид | `crm.lead.update` | [Поля лида](./fields-lead.md) ||
|| Контакт | `crm.contact.update` | [Поля контакта](./fields-contact.md) ||
|| Компания | `crm.company.update` | [Поля компании](./fields-company.md) ||
|| Предложение | `crm.quote.update` | [Поля предложения](./fields-quote.md) ||
|| Счет | `crm.smartinvoice.update` | [Поля счета](./fields-smart-invoice.md) ||
|| Моя компания | `crm.mycompany.update` | [Поля моей компании](./fields-my-company.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.update`, например `crm.smartprocess1038.update` | [Поля смарт-процесса](./fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.update`, а не `crm.smartInvoice.update`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор элемента, который нужно изменить.

Идентификатор возвращает метод [crm.<тип>.add](./crm-entity-add-rest-v3.md) при создании элемента. Идентификаторы существующих элементов можно получить методом [crm.<тип>.list](./crm-entity-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с новыми значениями полей в формате `{"поле": "значение"}`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

Передавайте только поля, которые нужно изменить. Поля, которых нет в `fields`, сохраняют текущие значения.

Имена полей пишутся в camelCase: `title`, `assignedById`, `stageId`. Состав полей у каждого типа объекта свой, описания полей — на страницах:

- [поля сделки](./fields-deal.md)
- [поля лида](./fields-lead.md)
- [поля контакта](./fields-contact.md)
- [поля компании](./fields-company.md)
- [поля предложения](./fields-quote.md)
- [поля счета](./fields-smart-invoice.md)
- [поля моей компании](./fields-my-company.md)
- [поля смарт-процесса](./fields-smart-process.md)

Изменять можно не все поля. Список полей с признаком, можно ли поле изменять, возвращает метод [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md).

Пользовательские поля передаются по имени, например `UF_CRM_1687529546`. Их список возвращает метод [crm.<тип>.field.custom.list](../fields/crm-entity-field-custom-list-rest-v3.md).

Значение `stageId` должно быть стадией из воронки элемента, а `categoryId` — существующей воронкой этого типа объекта. Стадии и воронки можно получить методами [crm.<тип>.category.stage.list](../categories/crm-entity-category-stage-list-rest-v3.md) и [crm.<тип>.category.list](../categories/crm-entity-category-list-rest-v3.md).

Если `fields` — пустой объект или все значения в нем совпадают с текущими, метод отвечает `true` и не записывает элемент: время изменения `updatedTime` остается прежним.

Значение `null` для строкового поля метод не принимает и возвращает ошибку типа данных. Пустая строка обрабатывается по-разному в зависимости от типа объекта — смотрите [отличия типов объектов](#types).

### Отличия типов объектов {#types}

#|
|| **Тип объекта** | **Пустое значение в fields** ||
|| Лид, компания | Пустой `title` не записывается: метод отвечает `true`, название элемента не меняется ||
|| Контакт | Метод не принимает пустые `name` и `lastName` одновременно и возвращает ошибку. Одно из двух полей должно остаться заполненным ||
|| Смарт-процесс | Пустой `title` заменяется названием по умолчанию: название типа смарт-процесса и номер элемента, например `Без полей #25` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.update`

{% endnote %}

Примеры меняют название и сумму элемента смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"fields":{"title":"Заявка на закупку оборудования","opportunity":180000}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"fields":{"title":"Заявка на закупку оборудования","opportunity":180000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ItemUpdateResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ItemUpdateResult>(
        'crm.smartprocess1038.update',
        {
          id: 15,
          fields: {
            title: 'Заявка на закупку оборудования',
            opportunity: 180000,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Item updated:', result.result)
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
      async function updateItem() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.update',
            {
              id: 15,
              fields: {
                title: 'Заявка на закупку оборудования',
                opportunity: 180000,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Item updated:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateItem)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 15,
                "fields": {
                    "title": "Заявка на закупку оборудования",
                    "opportunity": 180000,
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
                'crm.smartprocess1038.update',
                [
                    'id' => 15,
                    'fields' => [
                        'title' => 'Заявка на закупку оборудования',
                        'opportunity' => 180000,
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
        'crm.smartprocess1038.update',
        {
            id: 15,
            fields: {
                title: 'Заявка на закупку оборудования',
                opportunity: 180000,
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
        'crm.smartprocess1038.update',
        [
            'id' => 15,
            'fields' => [
                'title' => 'Заявка на закупку оборудования',
                'opportunity' => 180000,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.update", b24.Params{
    	"id": 15,
    	"fields": b24.Params{
    		"title":       "Заявка на закупку оборудования",
    		"opportunity": 180000,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.update: %w", err)
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
        "start": 1793706173,
        "finish": 1793706173.219349,
        "duration": 0.21934890747070312,
        "processing": 0,
        "date_start": "2026-11-03T14:42:53+03:00",
        "date_finish": "2026-11-03T14:42:53+03:00",
        "operating_reset_at": 1793706600,
        "operating": 0.33750319480895996
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
[`boolean`](../../../data-types.md) | `true`, если запрос выполнен. Метод отвечает `true` и тогда, когда записывать нечего — смотрите [описание параметра fields](#fields). Новые значения полей можно получить методом [crm.<тип>.get](./crm-entity-get-rest-v3.md) ||
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
                "message": "Обязательное поле `fields` не указано",
                "field": "fields"
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
|| `id` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `assignedById` | В поле `assignedById` требуется тип данных `int` для такого запроса | Передайте значение того типа, который указан в описании поля. Ошибку вызывает и `null` в строковом поле ||
|| `CRM_FIELD_ERROR_REQUIRED` | Поля "Имя" и "Фамилия" не могут быть пустыми одновременно. Пожалуйста, заполните как минимум одно из них | Оставьте заполненным `name` или `lastName`. Правило действует для контакта ||
|#

В этот же код метод оборачивает ошибки, которые Битрикс24 вернул при записи элемента. Тогда в `field` приходит имя поля или код ошибки записи, как в примере с контактом.

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Поле "id" не доступно к заполнению | Передайте идентификатор параметром `id`, а не в `fields` ||
|| `createdTime` | Поле "createdTime" не доступно к заполнению | Уберите из `fields` поля, которые нельзя изменять. Признак изменяемости возвращает [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md) ||
|| `stageId` | Значение поля не содержится в списке допустимых значений: `#STAGES#` | Передайте стадию из воронки элемента. В тексте ошибки перечислены допустимые стадии ||
|| `categoryId` | Значение поля не содержится в списке допустимых значений | Передайте идентификатор существующей воронки этого типа объекта ||
|| `assignedById` | Значение поля не содержится в списке допустимых значений | Передайте идентификатор существующего пользователя ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `#DTO#` | Проверьте имя поля по странице полей типа объекта. Ошибку с именем поля `0` вызывает `fields`, переданный строкой или массивом вместо объекта ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.update`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-add-rest-v3.md)
- [{#T}](./crm-entity-get-rest-v3.md)
- [{#T}](./crm-entity-list-rest-v3.md)
- [{#T}](./crm-entity-delete-rest-v3.md)
- [{#T}](../fields/crm-entity-field-list-rest-v3.md)
