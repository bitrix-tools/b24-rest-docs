# Получить стадии воронки CRM v 3.0 crm.<тип>.category.stage.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом читать элементы этой воронки

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.category.stage.list` возвращает стадии одной воронки в порядке их следования. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.category.stage.list` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.stage.list`, например `crm.smartprocess1038.category.stage.list` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Стадии воронок есть у сделки и у смарт-процесса, если в настройках его типа включены воронки и стадии. У лида, контакта, компании, предложения, счета и моей компании методов стадий воронок нет.

Имя метода пишется в нижнем регистре: `crm.smartprocess1038.category.stage.list`, а не `crm.smartProcess1038.category.stage.list`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../../data-types.md) | Воронка, стадии которой нужно получить. [Описание параметра](#filter) ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации. [Описание параметра](#pagination)

По умолчанию метод возвращает первые 50 стадий ||
|#

### Параметр filter {#filter}

Передайте одно условие равенства по `categoryId` — массив из трех элементов без внешнего массива:

```json
"filter": ["categoryId", "=", 127]
```

Запись в виде списка условий `[["categoryId", "=", 127]]`, как в других методах REST 3.0, здесь не подходит: метод ответит [ошибкой фильтра](#filter-errors). Другие поля и операторы фильтр не принимает.

У воронки по умолчанию сделки `categoryId` равен `0`.

Идентификаторы воронок можно получить методом [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md).

{% note warning "" %}

Параметров `order` и `select` у метода нет. Если их передать, метод не ответит ошибкой: он вернет стадии со всеми полями по возрастанию `sort`.

{% endnote %}

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество стадий на странице, от `1` до `100`. Значение больше `100` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit`. Ноль возвращает первую страницу.

Если передан `page`, параметр `offset` не учитывается ||
|| **offset**
[`integer`](../../../data-types.md) | Количество стадий, которые нужно пропустить от начала списка. Отрицательное значение вызывает ошибку.

По умолчанию: `0` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.category.stage.list`

{% endnote %}

Примеры получают стадии воронки `127` смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["categoryId","=",127]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.category.stage.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":["categoryId","=",127],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.category.stage.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StageListResult = {
      items: Array<{
        stageId: string
        categoryId: number
        name: string
        color: string
        description: string
        semantics: 'process' | 'success' | 'failure'
        sort: number
        isSystem: boolean
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<StageListResult>(
        'crm.smartprocess1038.category.stage.list',
        {
          filter: ['categoryId', '=', 127],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const stages = response.getData()!.result.items
        stages.forEach(stage => console.info(stage.stageId, stage.name))
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
      async function listStages() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.category.stage.list',
            {
              filter: ['categoryId', '=', 127],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const stages = response.getData().result.items
          stages.forEach(stage => console.info(stage.stageId, stage.name))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listStages)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.category.stage.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "filter": ["categoryId", "=", 127],
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
                'crm.smartprocess1038.category.stage.list',
                [
                    'filter' => ['categoryId', '=', 127],
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
        'crm.smartprocess1038.category.stage.list',
        {
            filter: ['categoryId', '=', 127],
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
        'crm.smartprocess1038.category.stage.list',
        [
            'filter' => ['categoryId', '=', 127],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.category.stage.list", b24.Params{
    	"filter": []any{"categoryId", "=", 127},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.category.stage.list: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет items")
    }

    var stages []struct {
    	StageID   string `json:"stageId"`
    	Name      string `json:"name"`
    	Semantics string `json:"semantics"`
    	Sort      int    `json:"sort"`
    }
    if err := json.Unmarshal(raw, &stages); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, stage := range stages {
    	fmt.Println(stage.StageID, stage.Name)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "stageId": "DT1038_127:NEW",
                "categoryId": 127,
                "name": "Начало",
                "color": "#22B9FF",
                "description": "",
                "semantics": "process",
                "sort": 10,
                "isSystem": true
            },
            {
                "stageId": "DT1038_127:PREPARATION",
                "categoryId": 127,
                "name": "Подготовка",
                "color": "#88B9FF",
                "description": "",
                "semantics": "process",
                "sort": 20,
                "isSystem": false
            },
            {
                "stageId": "DT1038_127:UC_WUHOJE",
                "categoryId": 127,
                "name": "Проверка договора",
                "color": "#2FC6F6",
                "description": "",
                "semantics": "process",
                "sort": 25,
                "isSystem": false
            },
            {
                "stageId": "DT1038_127:CLIENT",
                "categoryId": 127,
                "name": "Согласование",
                "color": "#10e5fc",
                "description": "",
                "semantics": "process",
                "sort": 30,
                "isSystem": false
            },
            {
                "stageId": "DT1038_127:SUCCESS",
                "categoryId": 127,
                "name": "Успех",
                "color": "#00ff00",
                "description": "",
                "semantics": "success",
                "sort": 40,
                "isSystem": true
            },
            {
                "stageId": "DT1038_127:FAIL",
                "categoryId": 127,
                "name": "Провал",
                "color": "#ff0000",
                "description": "",
                "semantics": "failure",
                "sort": 50,
                "isSystem": true
            }
        ]
    },
    "time": {
        "start": 1793715166,
        "finish": 1793715166.535221,
        "duration": 0.5352210998535156,
        "processing": 0,
        "date_start": "2026-11-03T17:12:46+03:00",
        "date_finish": "2026-11-03T17:12:46+03:00",
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
|| **result.items**
[`object[]`](../../../data-types.md) | Стадии воронки по возрастанию `sort`. Описание полей — на странице метода [crm.<тип>.category.stage.get](./crm-entity-category-stage-get-rest-v3.md#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации фильтров объекта запроса",
        "validation": [
            {
                "message": "Требуется указать фильтр по обязательному полю `categoryId`",
                "field": "filter.categoryId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Воронка не найдена

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Проверьте `categoryId` методом [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md). Воронки с таким идентификатором нет у этого типа объекта или у пользователя нет права читать ее элементы ||
|#

#### Ошибки фильтра {#filter-errors}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.categoryId` | Требуется указать фильтр по обязательному полю `categoryId` | Передайте фильтр одним условием `["categoryId", "=", <идентификатор>]` без внешнего массива и с оператором `=` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Обязательное поле `filter` не указано | Передайте `filter` с идентификатором воронки ||
|| `name` | В DTO `StageDto` в поле `name` требуется наличие атрибута `Filterable` для такого запроса | Фильтр принимает только `categoryId`. Уберите другие поля из `filter` ||
|#

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте `pagination` объектом только с ключами `limit`, `page` и `offset`. `limit` — от `1` до `100`, `offset` — не меньше `0` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartprocess1038.category.stage.list`. Методы стадий есть только у сделки и смарт-процесса. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включены ли в типе воронки и стадии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-category-stage-get-rest-v3.md)
- [{#T}](./crm-entity-category-stage-replace-rest-v3.md)
- [{#T}](./crm-entity-category-list-rest-v3.md)
