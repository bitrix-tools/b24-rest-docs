# Получить стадию предложений по идентификатору v 3.0 crm.quote.stage.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом читать предложения

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.quote.stage.get` возвращает поля одной стадии предложений по ее идентификатору.

В отличие от методов [crm.<тип>.category.stage.get](./crm-entity-category-stage-get-rest-v3.md) для сделок и смарт-процессов, метод ищет стадию в едином наборе стадий предложений без воронок и учитывает параметр `select`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор стадии, например `UC_9AD50Y`. [Формат идентификатора](#stage-id) ||
|| **select**
[`string[]`](../../../data-types.md) | Поля стадии, которые нужно вернуть, например `["stageId", "name"]`. Доступные поля описаны в таблице [полей стадии](#item).

Если параметр не передан, метод возвращает все поля ||
|#

### Идентификатор стадии {#stage-id}

У предложений нет воронок, поэтому идентификатор стадии — код без префикса воронки. Стадии, которые Битрикс24 создает вместе с CRM, имеют коды `DRAFT`, `SENT`, `APPROVED`, `DECLAINED`, `APOLOGY`. Новым стадиям Битрикс24 присваивает код вида `UC_9AD50Y`.

Коды стадий возвращает метод [crm.quote.stage.list](./crm-quote-stage-list-rest-v3.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.quote.stage.get`

{% endnote %}

Примеры получают стадию `UC_9AD50Y`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"UC_9AD50Y"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.stage.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"UC_9AD50Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.quote.stage.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StageGetResult = {
      item: {
        stageId: string
        name: string
        color: string
        semantics: 'process' | 'success' | 'failure'
        sort: number
        isSystem: boolean
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<StageGetResult>(
        'crm.quote.stage.get',
        {
          id: 'UC_9AD50Y',
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const stage = response.getData()!.result.item
        console.info(stage.stageId, stage.name, stage.semantics)
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
      async function getStage() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.quote.stage.get',
            {
              id: 'UC_9AD50Y',
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const stage = response.getData().result.item
          console.info(stage.stageId, stage.name, stage.semantics)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getStage)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.quote.stage.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": "UC_9AD50Y",
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
                'crm.quote.stage.get',
                [
                    'id' => 'UC_9AD50Y',
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
        'crm.quote.stage.get',
        {
            id: 'UC_9AD50Y',
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
        'crm.quote.stage.get',
        [
            'id' => 'UC_9AD50Y',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.quote.stage.get", b24.Params{
    	"id": "UC_9AD50Y",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.quote.stage.get: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет item")
    }

    var stage struct {
    	StageID   string `json:"stageId"`
    	Name      string `json:"name"`
    	Semantics string `json:"semantics"`
    	Sort      int    `json:"sort"`
    }
    if err := json.Unmarshal(raw, &stage); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(stage.StageID, stage.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "stageId": "UC_9AD50Y",
            "name": "Согласование условий",
            "color": "#AABBCC",
            "semantics": "process",
            "sort": 29,
            "isSystem": false
        }
    },
    "time": {
        "start": 1795772511,
        "finish": 1795772511.635882,
        "duration": 0.6358819007873535,
        "processing": 0,
        "date_start": "2026-11-27T12:41:51+03:00",
        "date_finish": "2026-11-27T12:41:51+03:00",
        "operating_reset_at": 1795773060,
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
[`object`](../../../data-types.md) | Поля стадии. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля стадии {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **stageId**
[`string`](../../../data-types.md) | Идентификатор стадии. [Формат идентификатора](#stage-id) ||
|| **name**
[`string`](../../../data-types.md) | Название стадии ||
|| **color**
[`string`](../../../data-types.md) | Цвет стадии в формате `#RRGGBB`. Пустая строка — цвет не задан ||
|| **semantics**
[`string`](../../../data-types.md) | Группа стадии.

Возможные значения:

- `process` — стадия в работе
- `success` — стадия успеха
- `failure` — стадия провала ||
|| **sort**
[`integer`](../../../data-types.md) | Место стадии в списке: стадии идут по возрастанию `sort` ||
|| **isSystem**
[`boolean`](../../../data-types.md) | Признак системной стадии. Системные стадии предложений — первая стадия `DRAFT`, стадия успеха `APPROVED` и основная стадия провала `DECLAINED`.

Возможные значения:

- `true` — системная стадия: ее нельзя удалить и нельзя сменить ей группу
- `false` — обычная стадия ||
|#

У стадии предложений нет полей `categoryId` и `description`, которые есть у стадий воронок.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Стадия не найдена",
                "field": "STAGE_NOT_FOUND"
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` стадии ||
|| `STAGE_NOT_FOUND` | Стадия не найдена | Проверьте `id` методом [crm.quote.stage.list](./crm-quote-stage-list-rest-v3.md). Ошибку вызывают пустой `id`, код несуществующей стадии, идентификатор стадии воронки, например `C1:NEW`, и отсутствие у пользователя права читать предложения ||
|#

Если стадии нет, метод отвечает ошибкой валидации запроса, а не кодом `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`. Определяйте такую ошибку по `STAGE_NOT_FOUND` в `field`.

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `StageDto` | Проверьте поля в `select` по таблице [полей стадии](#item) ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре — `crm.quote.stage.get` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-quote-stage-add-rest-v3.md)
- [{#T}](./crm-quote-stage-update-rest-v3.md)
- [{#T}](./crm-quote-stage-list-rest-v3.md)
