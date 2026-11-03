# Добавить стадию в воронку CRM v 3.0 crm.<тип>.category.stage.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM или пользователь с правом «Управление стадиями» в роли доступа CRM. Для смарт-процесса цифрового рабочего места — администратор этого рабочего места или пользователь с правом «Управление стадиями» в роли доступа рабочего места. Пользователь также должен иметь право читать элементы этой воронки

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.category.stage.add` добавляет стадию в воронку и возвращает ее поля вместе с идентификатором. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.category.stage.add` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.stage.add`, например `crm.smartprocess1038.category.stage.add` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Стадии воронок есть у сделки и у смарт-процесса, если в настройках его типа включены воронки и стадии. У лида, контакта, компании, предложения, счета и моей компании методов стадий воронок нет.

Имя метода пишется в нижнем регистре: `crm.smartprocess1038.category.stage.add`, а не `crm.smartProcess1038.category.stage.add`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями новой стадии в формате `{"поле": "значение"}`. Обязательные поля — `categoryId` и `name`. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

Имена полей пишутся в camelCase: `categoryId`, `name`, `semantics`.

#|
|| **Название**
`тип` | **Описание** ||
|| **categoryId***
[`integer`](../../../data-types.md) | Идентификатор воронки, в которую нужно добавить стадию. У воронки по умолчанию сделки идентификатор `0`.

Идентификаторы воронок можно получить методом [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md) ||
|| **name***
[`string`](../../../data-types.md) | Название стадии, до 100 символов. Пустую строку и строку только из пробелов метод не примет ||
|| **color**
[`string`](../../../data-types.md) | Цвет стадии в формате `#RRGGBB`, например `#39A8EF`. Пустая строка — цвет не задан ||
|| **description**
[`string`](../../../data-types.md) | Описание стадии ||
|| **semantics**
[`string`](../../../data-types.md) | Группа стадии.

Возможные значения:

- `process` — стадия в работе
- `success` — стадия успеха. Вторую стадию успеха добавить нельзя
- `failure` — стадия провала, нужен `sort` больше, чем у стадии успеха

По умолчанию: `process` ||
|| **sort**
[`integer`](../../../data-types.md) | Место стадии в воронке: стадии идут по возрастанию `sort`. Стадию в работе без `sort` метод ставит последней среди стадий в работе, перед стадией успеха. Стадии провала `sort` нужно передать ||
|#

Поля `stageId` и `isSystem` только для чтения: их задает Битрикс24. Список полей стадии с признаком, можно ли поле изменять, возвращает метод [crm.<тип>.category.stage.field.list](./index.md).

### Порядок стадий {#order}

Битрикс24 проверяет порядок стадий в воронке: сначала стадии в работе, затем стадия успеха, после нее стадии провала. Стадия успеха в воронке одна: Битрикс24 создает ее вместе с воронкой. Метод вернет ошибку с кодом `OPERATION_NOT_ALLOWED_FOR_STAGE` в `field`, если:

- у стадии в работе `sort` больше, чем у стадии успеха
- у стадии провала `sort` меньше, чем у стадии успеха, или не передан
- передано `semantics: success`

Текущий `sort` стадий возвращает метод [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.category.stage.add`

{% endnote %}

Примеры добавляют стадию «Проверка документов» в воронку `127` смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"categoryId":127,"name":"Проверка документов","color":"#39A8EF","sort":25}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.category.stage.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"categoryId":127,"name":"Проверка документов","color":"#39A8EF","sort":25},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.category.stage.add
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StageAddResult = {
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
      const response = await $b24.getHttpClient(ApiVersion.v3).call<StageAddResult>(
        'crm.smartprocess1038.category.stage.add',
        {
          fields: {
            categoryId: 127,
            name: 'Проверка документов',
            color: '#39A8EF',
            sort: 25,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const stage = response.getData()!.result.item
        console.info('Stage created:', stage.stageId)
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
      async function addStage() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.category.stage.add',
            {
              fields: {
                categoryId: 127,
                name: 'Проверка документов',
                color: '#39A8EF',
                sort: 25,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const stage = response.getData().result.item
          console.info('Stage created:', stage.stageId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addStage)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.category.stage.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "fields": {
                    "categoryId": 127,
                    "name": "Проверка документов",
                    "color": "#39A8EF",
                    "sort": 25,
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
                'crm.smartprocess1038.category.stage.add',
                [
                    'fields' => [
                        'categoryId' => 127,
                        'name' => 'Проверка документов',
                        'color' => '#39A8EF',
                        'sort' => 25,
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
        'crm.smartprocess1038.category.stage.add',
        {
            fields: {
                categoryId: 127,
                name: 'Проверка документов',
                color: '#39A8EF',
                sort: 25,
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
        'crm.smartprocess1038.category.stage.add',
        [
            'fields' => [
                'categoryId' => 127,
                'name' => 'Проверка документов',
                'color' => '#39A8EF',
                'sort' => 25,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.category.stage.add", b24.Params{
    	"fields": b24.Params{
    		"categoryId": 127,
    		"name":       "Проверка документов",
    		"color":      "#39A8EF",
    		"sort":       25,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.category.stage.add: %w", err)
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
    fmt.Println(stage.StageID)
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
        "start": 1793715156,
        "finish": 1793715156.236756,
        "duration": 0.2367560863494873,
        "processing": 0,
        "date_start": "2026-11-03T17:12:36+03:00",
        "date_finish": "2026-11-03T17:12:36+03:00",
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
[`object`](../../../data-types.md) | Поля новой стадии. Описание полей — на странице метода [crm.<тип>.category.stage.get](./crm-entity-category-stage-get-rest-v3.md#item). Идентификатор стадии — в `stageId` ||
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
                "message": "Действие недоступно для этой стадии",
                "field": "OPERATION_NOT_ALLOWED_FOR_STAGE"
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

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте значение того типа, который указан в описании поля ||
|| `OPERATION_NOT_ALLOWED_FOR_STAGE` | Действие недоступно для этой стадии | Проверьте `semantics` и `sort` по [порядку стадий](#order) ||
|| `FIELD_VALUE_NOT_ALLOWED` | Недопустимое значение поля | Передайте в `name` название, в котором есть не только пробелы ||
|#

В `field` у ошибок `OPERATION_NOT_ALLOWED_FOR_STAGE` и `FIELD_VALUE_NOT_ALLOWED` приходит код ошибки, а не имя поля.

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `categoryId` | Не заполнено обязательное поле "categoryId" | Передайте `categoryId` в `fields` ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `name` | Значение поля не может быть пустым | Передайте в `name` непустую строку ||
|| `name` | Длина строки должна быть не больше, чем 100 знаков | Сократите название до 100 символов ||
|| `color` | Значения поля не соответствует регулярному выражению | Передайте цвет в формате `#RRGGBB` или пустую строку ||
|| `semantics` | Значение поля не содержится в списке допустимых значений: process, success, failure | Передайте одно из значений из описания поля ||
|| `stageId`, `isSystem` | Поле "#FIELD#" не доступно к заполнению | Уберите поле из `fields`: оно только для чтения ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `StageDto` | Проверьте имя параметра по [таблице параметра fields](#fields). Имена пишутся в camelCase: `name`, а не `NAME` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени администратора CRM или пользователя с правом «Управление стадиями» в роли доступа ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartprocess1038.category.stage.add`. Методы стадий есть только у сделки и смарт-процесса. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включены ли в типе воронки и стадии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-category-stage-update-rest-v3.md)
- [{#T}](./crm-entity-category-stage-get-rest-v3.md)
- [{#T}](./crm-entity-category-stage-list-rest-v3.md)
- [{#T}](./crm-entity-category-stage-replace-rest-v3.md)
- [{#T}](./crm-entity-category-stage-delete-rest-v3.md)
