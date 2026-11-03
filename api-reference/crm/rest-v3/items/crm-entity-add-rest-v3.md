# Создать элемент CRM v 3.0 crm.<тип>.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на добавление элементов этого типа объекта CRM. Для моей компании — администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.add` создает элемент CRM и возвращает его идентификатор. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.add` | [Поля сделки](./fields-deal.md) ||
|| Лид | `crm.lead.add` | [Поля лида](./fields-lead.md) ||
|| Контакт | `crm.contact.add` | [Поля контакта](./fields-contact.md) ||
|| Компания | `crm.company.add` | [Поля компании](./fields-company.md) ||
|| Предложение | `crm.quote.add` | [Поля предложения](./fields-quote.md) ||
|| Счет | `crm.smartinvoice.add` | [Поля счета](./fields-smart-invoice.md) ||
|| Моя компания | `crm.mycompany.add` | [Поля моей компании](./fields-my-company.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.add`, например `crm.smartprocess1038.add` | [Поля смарт-процесса](./fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.add`, а не `crm.smartInvoice.add`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями нового элемента в формате `{"поле": "значение"}`. [Описание параметра](#fields).

У лида, контакта, компании и моей компании есть [обязательные поля](#required-fields) ||
|#

### Параметр fields {#fields}

Имена полей пишутся в camelCase: `title`, `assignedById`, `stageId`. Имена в верхнем регистре, например `TITLE`, метод не принимает и отвечает ошибкой неизвестного поля. Передавайте только поля, которые можно изменять. Состав полей у каждого типа объекта свой, описания полей — на страницах:

- [поля сделки](./fields-deal.md)
- [поля лида](./fields-lead.md)
- [поля контакта](./fields-contact.md)
- [поля компании](./fields-company.md)
- [поля предложения](./fields-quote.md)
- [поля счета](./fields-smart-invoice.md)
- [поля моей компании](./fields-my-company.md)
- [поля смарт-процесса](./fields-smart-process.md)

Список полей с признаком, можно ли поле изменять, возвращает метод [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md).

Пользовательские поля передаются по имени, например `UF_CRM_1687529546`. Их список возвращает метод [crm.<тип>.field.custom.list](../fields/crm-entity-field-custom-list-rest-v3.md).

Значение `stageId` должно быть стадией из воронки элемента, а `categoryId` — существующей воронкой этого типа объекта. Стадии и воронки можно получить методами [crm.<тип>.category.stage.list](../categories/crm-entity-category-stage-list-rest-v3.md) и [crm.<тип>.category.list](../categories/crm-entity-category-list-rest-v3.md).

Что метод подставляет, если поле не передано:

- без `categoryId` элемент создается в воронке по умолчанию
- без `stageId` элемент попадает на первую стадию воронки. Если передан только `stageId`, он проверяется по стадиям воронки по умолчанию
- без `title` у смарт-процесса, предложения и счета название формируется из названия типа и идентификатора, например «Без полей #35» или «Предложение #147»

Товарные позиции через `fields` не передаются: их добавляют методами [crm.<тип>.productrow.*](../product-rows/crm-entity-product-row-list-rest-v3.md) после создания элемента.

### Обязательные поля {#required-fields}

Без этих полей метод вернет ошибку и элемент не создаст:

#|
|| **Тип объекта** | **Обязательно** ||
|| Лид, компания, моя компания | `title` ||
|| Контакт | `name` или `lastName` — хотя бы одно из двух ||
|| Сделка, предложение, счет, смарт-процесс | Нет обязательных полей. Элемент создается и с пустым объектом `fields` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.add`

{% endnote %}

Примеры создают элемент смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Заявка на закупку","assignedById":1,"opportunity":150000,"currencyId":"RUB"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"title":"Заявка на закупку","assignedById":1,"opportunity":150000,"currencyId":"RUB"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ItemAddResult = {
      id: number
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ItemAddResult>(
        'crm.smartprocess1038.add',
        {
          fields: {
            title: 'Заявка на закупку',
            assignedById: 1,
            opportunity: 150000,
            currencyId: 'RUB',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Item created:', result.id)
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
      async function addItem() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.add',
            {
              fields: {
                title: 'Заявка на закупку',
                assignedById: 1,
                opportunity: 150000,
                currencyId: 'RUB',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Item created:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addItem)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "title": "Заявка на закупку",
                    "assignedById": 1,
                    "opportunity": 150000,
                    "currencyId": "RUB",
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
                'crm.smartprocess1038.add',
                [
                    'fields' => [
                        'title' => 'Заявка на закупку',
                        'assignedById' => 1,
                        'opportunity' => 150000,
                        'currencyId' => 'RUB',
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
        'crm.smartprocess1038.add',
        {
            fields: {
                title: 'Заявка на закупку',
                assignedById: 1,
                opportunity: 150000,
                currencyId: 'RUB',
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
        'crm.smartprocess1038.add',
        [
            'fields' => [
                'title' => 'Заявка на закупку',
                'assignedById' => 1,
                'opportunity' => 150000,
                'currencyId' => 'RUB',
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.add", b24.Params{
    	"fields": b24.Params{
    		"title":        "Заявка на закупку",
    		"assignedById": 1,
    		"opportunity":  150000,
    		"currencyId":   "RUB",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.add: %w", err)
    }

    var created struct {
    	ID int `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &created); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(created.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 7
    },
    "time": {
        "start": 1793705270,
        "finish": 1793705272.058552,
        "duration": 2.0585520267486572,
        "processing": 1,
        "date_start": "2026-11-03T14:27:50+03:00",
        "date_finish": "2026-11-03T14:27:52+03:00",
        "operating_reset_at": 1793705820,
        "operating": 0.8111288547515869
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
[`integer`](../../../data-types.md) | Идентификатор созданного элемента. Поля элемента можно получить методом [crm.<тип>.get](./crm-entity-get-rest-v3.md) ||
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
                "message": "Значение поля не содержится в списке допустимых значений: DT1038_69:NEW, DT1038_69:PREPARATION, DT1038_69:CLIENT, DT1038_69:SUCCESS, DT1038_69:FAIL",
                "field": "stageId"
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
|| `assignedById` | В поле `assignedById` требуется тип данных `int` для такого запроса | Передайте значение того типа, который указан в описании поля ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `title` | Не заполнено обязательное поле "title" | Передайте `title` в `fields`. Поле обязательно для лида, компании и моей компании ||
|| `-` | At least one of name or lastName is required. | Передайте `name` или `lastName` в `fields`. Правило действует для контакта ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields`: идентификатор назначается автоматически ||
|| `stageId` | Значение поля не содержится в списке допустимых значений: `#STAGES#` | Передайте стадию из воронки элемента. В тексте ошибки перечислены допустимые стадии ||
|| `categoryId` | Значение поля не содержится в списке допустимых значений | Передайте идентификатор существующей воронки этого типа объекта ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `#DTO#` | Проверьте имя поля по странице полей типа объекта. Имена полей пишутся в camelCase: `title`, а не `TITLE`. Ошибку с именем поля `0` вызывает `fields`, переданный строкой или массивом вместо объекта ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.add`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-update-rest-v3.md)
- [{#T}](./crm-entity-get-rest-v3.md)
- [{#T}](./crm-entity-list-rest-v3.md)
- [{#T}](./crm-entity-delete-rest-v3.md)
- [{#T}](../fields/crm-entity-field-list-rest-v3.md)
