# Получить стадию воронки CRM по идентификатору v 3.0 crm.<тип>.category.stage.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом читать элементы воронки, в которой стоит стадия

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.category.stage.get` возвращает поля одной стадии воронки по ее идентификатору. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.category.stage.get` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.stage.get`, например `crm.smartprocess1038.category.stage.get` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Стадии воронок есть у сделки и у смарт-процесса, если в настройках его типа включены воронки и стадии. У лида, контакта, компании, предложения, счета и моей компании методов стадий воронок нет.

Имя метода пишется в нижнем регистре: `crm.smartprocess1038.category.stage.get`, а не `crm.smartProcess1038.category.stage.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор стадии, например `DT1038_127:UC_WUHOJE`. [Формат идентификатора](#stage-id).

Идентификаторы стадий возвращает метод [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md) ||
|#

### Идентификатор стадии {#stage-id}

Формат идентификатора стадии зависит от воронки:

#|
|| **Воронка** | **Формат** | **Пример** ||
|| Воронка по умолчанию сделки | Код стадии без префикса | `NEW` ||
|| Другая воронка сделки | `C<categoryId>:<код>` | `C1:NEW` ||
|| Воронка смарт-процесса | `DT<entityTypeId>_<categoryId>:<код>` | `DT1038_127:UC_WUHOJE` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.category.stage.get`

{% endnote %}

Примеры получают стадию `DT1038_127:UC_WUHOJE` смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"DT1038_127:UC_WUHOJE"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.category.stage.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"DT1038_127:UC_WUHOJE","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.category.stage.get
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
        categoryId: number
        name: string
        color: string
        description: string
        semantics: 'process' | 'success' | 'failure'
        sort: number
        isSystem: boolean
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<StageGetResult>(
        'crm.smartprocess1038.category.stage.get',
        {
          id: 'DT1038_127:UC_WUHOJE',
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const stage = response.getData()!.result.item
        console.info(stage.name, stage.semantics)
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
            'crm.smartprocess1038.category.stage.get',
            {
              id: 'DT1038_127:UC_WUHOJE',
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const stage = response.getData().result.item
          console.info(stage.name, stage.semantics)
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

    method = "crm.smartprocess1038.category.stage.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": "DT1038_127:UC_WUHOJE",
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
                'crm.smartprocess1038.category.stage.get',
                [
                    'id' => 'DT1038_127:UC_WUHOJE',
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
        'crm.smartprocess1038.category.stage.get',
        {
            id: 'DT1038_127:UC_WUHOJE',
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
        'crm.smartprocess1038.category.stage.get',
        [
            'id' => 'DT1038_127:UC_WUHOJE',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.category.stage.get", b24.Params{
    	"id": "DT1038_127:UC_WUHOJE",
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.category.stage.get: %w", err)
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
    fmt.Println(stage.Name, stage.Semantics)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "stageId": "DT1038_127:UC_WUHOJE",
            "categoryId": 127,
            "name": "Проверка документов",
            "color": "#39A8EF",
            "description": "",
            "semantics": "process",
            "sort": 25,
            "isSystem": false
        }
    },
    "time": {
        "start": 1793715165,
        "finish": 1793715165.632384,
        "duration": 0.6323840618133545,
        "processing": 0,
        "date_start": "2026-11-03T17:12:45+03:00",
        "date_finish": "2026-11-03T17:12:45+03:00",
        "operating_reset_at": 1793715720,
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
|| **categoryId**
[`integer`](../../../data-types.md) | Идентификатор воронки, в которой стоит стадия ||
|| **name**
[`string`](../../../data-types.md) | Название стадии ||
|| **color**
[`string`](../../../data-types.md) | Цвет стадии в формате `#RRGGBB`. Пустая строка — цвет не задан ||
|| **description**
[`string`](../../../data-types.md) | Описание стадии ||
|| **semantics**
[`string`](../../../data-types.md) | Группа стадии.

Возможные значения:

- `process` — стадия в работе
- `success` — стадия успеха
- `failure` — стадия провала ||
|| **sort**
[`integer`](../../../data-types.md) | Место стадии в воронке: стадии идут по возрастанию `sort` ||
|| **isSystem**
[`boolean`](../../../data-types.md) | Признак системной стадии. Битрикс24 создает системные стадии вместе с воронкой: первую стадию, стадию успеха и основную стадию провала.

Возможные значения:

- `true` — системная стадия: ее нельзя удалить и нельзя сменить ей группу
- `false` — обычная стадия ||
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
|| `id` | Значение поля не может быть пустым | Передайте непустой `id` ||
|| `STAGE_NOT_FOUND` | Стадия не найдена | Проверьте `id` методом [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md). Стадии нет у этого типа объекта, она удалена или у пользователя нет права читать элементы ее воронки ||
|#

Если стадии нет, метод отвечает не кодом `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`, а ошибкой валидации запроса с кодом `STAGE_NOT_FOUND` в `field`.

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartprocess1038.category.stage.get`. Методы стадий есть только у сделки и смарт-процесса. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включены ли в типе воронки и стадии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-category-stage-list-rest-v3.md)
- [{#T}](./crm-entity-category-stage-update-rest-v3.md)
- [{#T}](./crm-entity-category-stage-add-rest-v3.md)
