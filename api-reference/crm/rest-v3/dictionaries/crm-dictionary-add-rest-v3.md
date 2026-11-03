# Добавить значение справочника CRM v 3.0 crm.dictionary.<справочник>.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.dictionary.<справочник>.add` добавляет значение в справочник CRM и возвращает его целиком. Справочник задает сегмент `<справочник>` в имени метода.

## Имя метода для справочника

Метод есть только у [справочников значений CRM](./crm-dictionary-list-rest-v3.md#crm-values).

#|
|| **Справочник** | **Метод** ||
|| Типы сделок | `crm.dictionary.dealtype.add` ||
|| Типы контактов | `crm.dictionary.contacttype.add` ||
|| Типы компаний | `crm.dictionary.companytype.add` ||
|| Обращения | `crm.dictionary.honorific.add` ||
|| Количество сотрудников | `crm.dictionary.employees.add` ||
|| Сферы деятельности | `crm.dictionary.industry.add` ||
|| Источники | `crm.dictionary.source.add` ||
|#

Имя метода пишется в нижнем регистре: `crm.dictionary.dealtype.add`, а не `crm.dictionary.dealType.add`. На имя в другом регистре или со справочником, значения которого менять нельзя, например `crm.dictionary.entitytype.add`, метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями нового значения в формате `{"поле": "значение"}`. [Описание параметра](#fields).

Обязательное поле — `name` ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор значения, например `SUBSCRIPTION`. Изменить его после создания нельзя.

До 50 символов, без двоеточия, не `0` и не из одних пробелов. Если поле не передано или передана пустая строка, Битрикс24 создаст идентификатор вида `UC_1Z8DXI` ||
|| **name***
[`string`](../../../data-types.md) | Название значения, до 100 символов. Пробелы в начале и в конце Битрикс24 удаляет ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок сортировки. Ноль и отрицательное значение Битрикс24 заменяет на `10`.

По умолчанию: `10` ||
|#

Поле `isSystem` только для чтения: метод не принимает его в `fields`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.dictionary.dealtype.add`

{% endnote %}

Примеры добавляют тип сделки «Подписка» с идентификатором `SUBSCRIPTION`. Для другого справочника замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"id":"SUBSCRIPTION","name":"Подписка","sort":60}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.dictionary.dealtype.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"id":"SUBSCRIPTION","name":"Подписка","sort":60},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.dictionary.dealtype.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DictionaryAddResult = {
      item: {
        id: string
        name: string
        sort: number
        isSystem: boolean
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<DictionaryAddResult>(
        'crm.dictionary.dealtype.add',
        {
          fields: {
            id: 'SUBSCRIPTION',
            name: 'Подписка',
            sort: 60,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Deal type created:', result.item.id)
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
      async function addDealType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.dictionary.dealtype.add',
            {
              fields: {
                id: 'SUBSCRIPTION',
                name: 'Подписка',
                sort: 60,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Deal type created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addDealType)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.dictionary.dealtype.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "id": "SUBSCRIPTION",
                    "name": "Подписка",
                    "sort": 60,
                },
            },
            prefer_version=3,
        )
        item = response["result"]["item"]
        print(item["id"], item["name"])
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
                'crm.dictionary.dealtype.add',
                [
                    'fields' => [
                        'id' => 'SUBSCRIPTION',
                        'name' => 'Подписка',
                        'sort' => 60,
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
        'crm.dictionary.dealtype.add',
        {
            fields: {
                id: 'SUBSCRIPTION',
                name: 'Подписка',
                sort: 60,
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
        'crm.dictionary.dealtype.add',
        [
            'fields' => [
                'id' => 'SUBSCRIPTION',
                'name' => 'Подписка',
                'sort' => 60,
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
    res, err := client.Core().Call(ctx, "crm.dictionary.dealtype.add", b24.Params{
    	"fields": b24.Params{
    		"id":   "SUBSCRIPTION",
    		"name": "Подписка",
    		"sort": 60,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.dictionary.dealtype.add: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID   string `json:"id"`
    	Name string `json:"name"`
    	Sort int    `json:"sort"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": "SUBSCRIPTION",
            "name": "Подписка",
            "sort": 60,
            "isSystem": false
        }
    },
    "time": {
        "start": 1793715698,
        "finish": 1793715698.298801,
        "duration": 0.2988009452819824,
        "processing": 0,
        "date_start": "2026-11-03T17:21:38+03:00",
        "date_finish": "2026-11-03T17:21:38+03:00",
        "operating_reset_at": 1793716260,
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
[`object`](../../../data-types.md) | Созданное значение со всеми полями: `id`, `name`, `sort`, `isSystem`. Если `id` или `sort` не были переданы, ответ содержит значения, которые назначил Битрикс24. [Описание полей](./crm-dictionary-list-rest-v3.md#crm-values) ||
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
                "message": "Идентификатор уже используется, попробуйте указать другой",
                "field": "id"
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
|| `id` | Идентификатор уже используется, попробуйте указать другой | Передайте другой `id` или не передавайте его, чтобы Битрикс24 создал идентификатор сам ||
|| `id` | Укажите идентификатор длиной до 50 символов, который не содержит двоеточия и не равен «0» | Передайте идентификатор до 50 символов без двоеточия, отличный от `0` ||
|| `name` | Недопустимое значение поля, проверьте тип и длину | Передайте непустое название до 100 символов ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте значение того типа, который указан в описании поля ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `isSystem` | Поле "isSystem" не доступно к заполнению | Уберите `isSystem` из `fields` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `DictionaryValueDto` | Передайте в `fields` только `id`, `name` и `sort`. Ошибку с именем поля `0` вызывает `fields`, переданный строкой вместо объекта ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени администратора CRM ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.dictionary.dealtype.add`. Добавлять значения можно только в справочники из таблицы в начале страницы ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-dictionary-list-rest-v3.md)
- [{#T}](./crm-dictionary-get-rest-v3.md)
- [{#T}](./crm-dictionary-update-rest-v3.md)
- [{#T}](./crm-dictionary-delete-rest-v3.md)
