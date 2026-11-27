# Изменить стадию предложений CRM v 3.0 crm.quote.stage.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом «Управление стадиями» в роли доступа CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.quote.stage.update` изменяет название, цвет, группу или место стадии предложений и возвращает поля стадии после изменения.

В отличие от методов [crm.<тип>.category.stage.update](./crm-entity-category-stage-update-rest-v3.md) для сделок и смарт-процессов, метод работает с единым набором стадий предложений без воронок и возвращает поля стадии, а не `true`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор стадии, например `UC_9AD50Y`. [Формат идентификатора](#stage-id) ||
|| **fields***
[`object`](../../../data-types.md) | Объект с новыми значениями полей в формате `{"поле": "значение"}`. [Описание параметра](#fields) ||
|#

### Идентификатор стадии {#stage-id}

У предложений нет воронок, поэтому идентификатор стадии — код без префикса воронки. Стадии, которые Битрикс24 создает вместе с CRM, имеют коды `DRAFT`, `SENT`, `APPROVED`, `DECLAINED`, `APOLOGY`. Новым стадиям Битрикс24 присваивает код вида `UC_9AD50Y`.

Коды стадий возвращает метод [crm.quote.stage.list](./crm-quote-stage-list-rest-v3.md).

### Параметр fields {#fields}

Передавайте только поля, которые нужно изменить. Поля, которых нет в `fields`, сохраняют текущие значения. Пустой объект `fields` метод примет и вернет стадию без изменений.

Имена полей пишутся в camelCase: `name`, `color`, `semantics`.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название стадии, до 100 символов. Пустую строку и строку только из пробелов метод не примет ||
|| **color**
[`string`](../../../data-types.md) | Цвет стадии в формате `#RRGGBB`. Пустая строка убирает цвет ||
|| **semantics**
[`string`](../../../data-types.md) | Группа стадии.

Возможные значения:

- `process` — стадия в работе
- `success` — стадия успеха
- `failure` — стадия провала ||
|| **sort**
[`integer`](../../../data-types.md) | Место стадии в списке: стадии идут по возрастанию `sort` ||
|#

Поля `stageId` и `isSystem` метод не принимает: стадию указывает параметр `id`. Полей `categoryId` и `description` у стадии предложений нет.

У системной стадии можно менять все поля, кроме `semantics`.

Битрикс24 проверяет порядок стадий: сначала стадии в работе, затем стадия успеха, после нее стадии провала. Стадия успеха у предложений одна — системная стадия `APPROVED`. Поэтому стадию в работе нельзя перевести в группу `success`, а новый `sort` должен сохранять порядок групп. Например, чтобы перенести стадию в работе за стадию успеха, передайте вместе с новым `sort` значение `semantics: failure`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.quote.stage.update`

{% endnote %}

Примеры меняют название и цвет стадии `UC_9AD50Y`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"UC_9AD50Y","fields":{"name":"Согласование цены","color":"#FFA900"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.stage.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"UC_9AD50Y","fields":{"name":"Согласование цены","color":"#FFA900"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.quote.stage.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StageUpdateResult = {
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
      const response = await $b24.getHttpClient(ApiVersion.v3).call<StageUpdateResult>(
        'crm.quote.stage.update',
        {
          id: 'UC_9AD50Y',
          fields: {
            name: 'Согласование цены',
            color: '#FFA900',
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const stage = response.getData()!.result.item
        console.info('Stage updated:', stage.name)
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
      async function updateStage() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.quote.stage.update',
            {
              id: 'UC_9AD50Y',
              fields: {
                name: 'Согласование цены',
                color: '#FFA900',
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const stage = response.getData().result.item
          console.info('Stage updated:', stage.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateStage)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.quote.stage.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": "UC_9AD50Y",
                "fields": {
                    "name": "Согласование цены",
                    "color": "#FFA900",
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
                'crm.quote.stage.update',
                [
                    'id' => 'UC_9AD50Y',
                    'fields' => [
                        'name' => 'Согласование цены',
                        'color' => '#FFA900',
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
        'crm.quote.stage.update',
        {
            id: 'UC_9AD50Y',
            fields: {
                name: 'Согласование цены',
                color: '#FFA900',
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
        'crm.quote.stage.update',
        [
            'id' => 'UC_9AD50Y',
            'fields' => [
                'name' => 'Согласование цены',
                'color' => '#FFA900',
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
    res, err := client.Core().Call(ctx, "crm.quote.stage.update", b24.Params{
    	"id":     "UC_9AD50Y",
    	"fields": b24.Params{
    		"name":  "Согласование цены",
    		"color": "#FFA900",
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.quote.stage.update: %w", err)
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
            "name": "Согласование цены",
            "color": "#FFA900",
            "semantics": "process",
            "sort": 29,
            "isSystem": false
        }
    },
    "time": {
        "start": 1795772511,
        "finish": 1795772512.000405,
        "duration": 1.0004050731658936,
        "processing": 1,
        "date_start": "2026-11-27T12:41:51+03:00",
        "date_finish": "2026-11-27T12:41:52+03:00",
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
[`object`](../../../data-types.md) | Все поля стадии после изменения. Описание полей — на странице метода [crm.quote.stage.get](./crm-quote-stage-get-rest-v3.md#item) ||
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
                "message": "Значения поля не соответствует регулярному выражению",
                "field": "color"
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
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте непустой `id` стадии ||
|| `-` | Должно быть передано только одно из значений: id, filter | Передайте непустой `id` стадии. Параметр `filter` метод не поддерживает ||
|| `STAGE_NOT_FOUND` | Стадия не найдена | Проверьте `id` методом [crm.quote.stage.list](./crm-quote-stage-list-rest-v3.md) ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте `sort` целым числом ||
|| `OPERATION_NOT_ALLOWED_FOR_STAGE` | Действие недоступно для этой стадии | Системной стадии нельзя сменить группу. Для остальных стадий проверьте, что `semantics` и `sort` сохраняют порядок стадий ||
|| `FIELD_VALUE_NOT_ALLOWED` | Недопустимое значение поля | Передайте в `name` название, в котором есть не только пробелы ||
|#

Если `id` не передан или пустой, метод возвращает обе ошибки без `field` одним ответом. В `field` у ошибок с кодами `STAGE_NOT_FOUND`, `OPERATION_NOT_ALLOWED_FOR_STAGE` и `FIELD_VALUE_NOT_ALLOWED` приходит код ошибки, а не имя поля. Если стадии нет, метод отвечает ошибкой валидации запроса, а не кодом `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`.

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Значение поля не может быть пустым | Передайте в `name` непустую строку ||
|| `name` | Длина строки должна быть не больше, чем 100 знаков | Сократите название до 100 символов ||
|| `color` | Значения поля не соответствует регулярному выражению | Передайте цвет в формате `#RRGGBB` или пустую строку ||
|| `semantics` | Значение поля не содержится в списке допустимых значений: process, success, failure | Передайте одно из значений из описания поля ||
|| `stageId`, `isSystem` | Поле "#FIELD#" не доступно к заполнению | Уберите поле из `fields` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `StageDto` | Проверьте имя поля по [таблице параметра fields](#fields). Поля `categoryId` и `description` у стадии предложений не поддерживаются. Имена пишутся в camelCase: `name`, а не `NAME` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени администратора CRM или пользователя с правом «Управление стадиями» в роли доступа CRM ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре — `crm.quote.stage.update` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-quote-stage-get-rest-v3.md)
- [{#T}](./crm-quote-stage-list-rest-v3.md)
- [{#T}](./crm-quote-stage-replace-rest-v3.md)
