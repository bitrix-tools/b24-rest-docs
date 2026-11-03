# Изменить значение справочника CRM v 3.0 crm.dictionary.<справочник>.update

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

Метод `crm.dictionary.<справочник>.update` изменяет название и порядок сортировки значения справочника CRM. Справочник задает сегмент `<справочник>` в имени метода.

## Имя метода для справочника

Метод есть только у [справочников значений CRM](./crm-dictionary-list-rest-v3.md#crm-values).

#|
|| **Справочник** | **Метод** ||
|| Типы сделок | `crm.dictionary.dealtype.update` ||
|| Типы контактов | `crm.dictionary.contacttype.update` ||
|| Типы компаний | `crm.dictionary.companytype.update` ||
|| Обращения | `crm.dictionary.honorific.update` ||
|| Количество сотрудников | `crm.dictionary.employees.update` ||
|| Сферы деятельности | `crm.dictionary.industry.update` ||
|| Источники | `crm.dictionary.source.update` ||
|#

Имя метода пишется в нижнем регистре: `crm.dictionary.dealtype.update`, а не `crm.dictionary.dealType.update`. На имя в другом регистре или со справочником, значения которого менять нельзя, например `crm.dictionary.entitytype.update`, метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор значения, например `SUBSCRIPTION`. Идентификаторы возвращает метод [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями, которые нужно изменить, в формате `{"поле": "значение"}`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Новое название значения: непустая строка до 100 символов. Пробелы в начале и в конце Битрикс24 удаляет ||
|| **sort**
[`integer`](../../../data-types.md) | Новый порядок сортировки. Ноль и отрицательное значение Битрикс24 заменяет на `10` ||
|#

Метод меняет только переданные поля. Если `fields` пустой, метод отвечает `true` и ничего не меняет — при условии, что значение с таким `id` есть. Поля `id` и `isSystem` изменить нельзя: метод отвечает [ошибкой валидации объекта](#dto-validation).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.dictionary.dealtype.update`

{% endnote %}

Примеры переименовывают тип сделки `SUBSCRIPTION` в «Подписка на год» и меняют порядок сортировки. Для другого справочника замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"SUBSCRIPTION","fields":{"name":"Подписка на год","sort":65}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.dictionary.dealtype.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"SUBSCRIPTION","fields":{"name":"Подписка на год","sort":65},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.dictionary.dealtype.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DictionaryUpdateResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<DictionaryUpdateResult>(
        'crm.dictionary.dealtype.update',
        {
          id: 'SUBSCRIPTION',
          fields: {
            name: 'Подписка на год',
            sort: 65,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Deal type updated:', result.result)
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
      async function updateDealType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.dictionary.dealtype.update',
            {
              id: 'SUBSCRIPTION',
              fields: {
                name: 'Подписка на год',
                sort: 65,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Deal type updated:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDealType)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.dictionary.dealtype.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": "SUBSCRIPTION",
                "fields": {
                    "name": "Подписка на год",
                    "sort": 65,
                },
            },
            prefer_version=3,
        )
        print(response["result"]["result"])
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
                'crm.dictionary.dealtype.update',
                [
                    'id' => 'SUBSCRIPTION',
                    'fields' => [
                        'name' => 'Подписка на год',
                        'sort' => 65,
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
        'crm.dictionary.dealtype.update',
        {
            id: 'SUBSCRIPTION',
            fields: {
                name: 'Подписка на год',
                sort: 65,
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
        'crm.dictionary.dealtype.update',
        [
            'id' => 'SUBSCRIPTION',
            'fields' => [
                'name' => 'Подписка на год',
                'sort' => 65,
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
    res, err := client.Core().Call(ctx, "crm.dictionary.dealtype.update", b24.Params{
    	"id": "SUBSCRIPTION",
    	"fields": b24.Params{
    		"name": "Подписка на год",
    		"sort": 65,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.dictionary.dealtype.update: %w", err)
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
        "start": 1793715698,
        "finish": 1793715698.803068,
        "duration": 0.8030679225921631,
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
|| **result.result**
[`boolean`](../../../data-types.md) | `true`, если запрос выполнен. Новые значения полей возвращает метод [crm.dictionary.<справочник>.get](./crm-dictionary-get-rest-v3.md) ||
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
                "message": "Поле \"id\" не доступно к заполнению",
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` ||
|| `id` | Значение поля не может быть пустым | Передайте непустой идентификатор ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `name` | Недопустимое значение поля, проверьте тип и длину | Передайте непустое название до 100 символов ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте значение того типа, который указан в описании поля ||
|#

#### Ошибки валидации объекта {#dto-validation}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields`. Чтобы сменить идентификатор, создайте новое значение методом [crm.dictionary.<справочник>.add](./crm-dictionary-add-rest-v3.md) ||
|| `isSystem` | Поле "isSystem" не доступно к заполнению | Уберите `isSystem` из `fields` ||
|#

#### Значение не найдено {#not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [crm.dictionary.<справочник>.list](./crm-dictionary-list-rest-v3.md) ||
|#

#### Ошибка фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `#FILTER#` | В запросе передан `filter`. Метод изменяет одно значение по `id` и не принимает фильтр — уберите `filter` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `DictionaryValueDto` | Передайте в `fields` только `name` и `sort`. Ошибку с именем поля `0` вызывает `fields`, переданный строкой вместо объекта ||
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
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.dictionary.dealtype.update`. Изменять значения можно только в справочниках из таблицы в начале страницы ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-dictionary-list-rest-v3.md)
- [{#T}](./crm-dictionary-get-rest-v3.md)
- [{#T}](./crm-dictionary-add-rest-v3.md)
- [{#T}](./crm-dictionary-delete-rest-v3.md)
