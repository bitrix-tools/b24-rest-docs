# Заменить стадии воронки CRM v 3.0 crm.<тип>.category.stage.replace

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

Метод `crm.<тип>.category.stage.replace` задает воронке весь набор стадий в работе одним запросом и возвращает стадии воронки после замены. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.category.stage.replace` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.stage.replace`, например `crm.smartprocess1038.category.stage.replace` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Стадии воронок есть у сделки и у смарт-процесса, если в настройках его типа включены воронки и стадии. У лида, контакта, компании, предложения, счета и моей компании методов стадий воронок нет.

Имя метода пишется в нижнем регистре: `crm.smartprocess1038.category.stage.replace`, а не `crm.smartProcess1038.category.stage.replace`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **categoryId***
[`integer`](../../../data-types.md) | Идентификатор воронки. У воронки по умолчанию сделки идентификатор `0`.

Идентификаторы воронок можно получить методом [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md) ||
|| **stages***
[`object[]`](../../../data-types.md) | Стадии в работе в нужном порядке, до 50 стадий. Обязательное поле каждой стадии — `name`. [Описание параметра](#stages) ||
|#

### Параметр stages {#stages}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **stageId**
[`string`](../../../data-types.md) | Идентификатор существующей стадии воронки, например `DT1038_127:PREPARATION`. Если не передан, метод создаст новую стадию.

Идентификаторы стадий возвращает метод [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md) ||
|| **name***
[`string`](../../../data-types.md) | Название стадии, до 100 символов ||
|| **color**
[`string`](../../../data-types.md) | Цвет стадии в формате `#RRGGBB`. Если не передан, у существующей стадии цвет не меняется. Пустая строка убирает цвет ||
|#

Метод сравнивает переданный набор со стадиями воронки по `stageId`:

- стадию с `stageId` метод оставляет и обновляет ей название, а цвет — если он передан
- стадию без `stageId` метод создает в группе `process`
- стадию в работе, которой нет в наборе, метод удаляет, если на ней нет элементов
- порядок стадий в наборе становится порядком стадий в воронке: набор встает после первой системной стадии и перед стадией успеха

Системные стадии и стадии провала метод не удаляет и не переименовывает, их не нужно передавать в набор. Системную стадию или стадию провала можно передать в наборе, но только с текущими названием и цветом. Если они другие, метод ответит ошибкой `OPERATION_NOT_ALLOWED_FOR_STAGE`. Переименовать системную стадию можно методом [crm.<тип>.category.stage.update](./crm-entity-category-stage-update-rest-v3.md).

Пустой массив `stages` удаляет все стадии в работе, кроме первой системной стадии.

Если хотя бы одно изменение вызывает ошибку, метод не меняет воронку.

Другие поля стадии, например `semantics` и `sort`, метод не принимает: группу стадии задает Битрикс24, а ее место — порядок в массиве.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.category.stage.replace`

{% endnote %}

Примеры задают воронке `127` смарт-процесса с идентификатором типа `1038` три стадии в работе: переименовывают «Подготовку», оставляют «Проверку договора» и добавляют новую стадию «Согласование бюджета». Метод удалит стадию «Согласование», которой нет в наборе. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"categoryId":127,"stages":[{"stageId":"DT1038_127:PREPARATION","name":"Подготовка заявки"},{"stageId":"DT1038_127:UC_WUHOJE","name":"Проверка договора"},{"name":"Согласование бюджета","color":"#FFA900"}]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.category.stage.replace
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"categoryId":127,"stages":[{"stageId":"DT1038_127:PREPARATION","name":"Подготовка заявки"},{"stageId":"DT1038_127:UC_WUHOJE","name":"Проверка договора"},{"name":"Согласование бюджета","color":"#FFA900"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.category.stage.replace
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StageReplaceResult = {
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
      const response = await $b24.getHttpClient(ApiVersion.v3).call<StageReplaceResult>(
        'crm.smartprocess1038.category.stage.replace',
        {
          categoryId: 127,
          stages: [
            {
              stageId: 'DT1038_127:PREPARATION',
              name: 'Подготовка заявки',
            },
            {
              stageId: 'DT1038_127:UC_WUHOJE',
              name: 'Проверка договора',
            },
            {
              name: 'Согласование бюджета',
              color: '#FFA900',
            },
          ],
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
      async function replaceStages() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.category.stage.replace',
            {
              categoryId: 127,
              stages: [
                {
                  stageId: 'DT1038_127:PREPARATION',
                  name: 'Подготовка заявки',
                },
                {
                  stageId: 'DT1038_127:UC_WUHOJE',
                  name: 'Проверка договора',
                },
                {
                  name: 'Согласование бюджета',
                  color: '#FFA900',
                },
              ],
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

      document.addEventListener('DOMContentLoaded', replaceStages)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.category.stage.replace"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "categoryId": 127,
                "stages": [
                    {
                        "stageId": "DT1038_127:PREPARATION",
                        "name": "Подготовка заявки",
                    },
                    {
                        "stageId": "DT1038_127:UC_WUHOJE",
                        "name": "Проверка договора",
                    },
                    {
                        "name": "Согласование бюджета",
                        "color": "#FFA900",
                    },
                ],
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
                'crm.smartprocess1038.category.stage.replace',
                [
                    'categoryId' => 127,
                    'stages' => [
                        [
                            'stageId' => 'DT1038_127:PREPARATION',
                            'name' => 'Подготовка заявки',
                        ],
                        [
                            'stageId' => 'DT1038_127:UC_WUHOJE',
                            'name' => 'Проверка договора',
                        ],
                        [
                            'name' => 'Согласование бюджета',
                            'color' => '#FFA900',
                        ],
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
        'crm.smartprocess1038.category.stage.replace',
        {
            categoryId: 127,
            stages: [
                {
                    stageId: 'DT1038_127:PREPARATION',
                    name: 'Подготовка заявки',
                },
                {
                    stageId: 'DT1038_127:UC_WUHOJE',
                    name: 'Проверка договора',
                },
                {
                    name: 'Согласование бюджета',
                    color: '#FFA900',
                },
            ],
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
        'crm.smartprocess1038.category.stage.replace',
        [
            'categoryId' => 127,
            'stages' => [
                [
                    'stageId' => 'DT1038_127:PREPARATION',
                    'name' => 'Подготовка заявки',
                ],
                [
                    'stageId' => 'DT1038_127:UC_WUHOJE',
                    'name' => 'Проверка договора',
                ],
                [
                    'name' => 'Согласование бюджета',
                    'color' => '#FFA900',
                ],
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.category.stage.replace", b24.Params{
    	"categoryId": 127,
    	"stages": []b24.Params{
    		{
    			"stageId": "DT1038_127:PREPARATION",
    			"name":    "Подготовка заявки",
    		},
    		{
    			"stageId": "DT1038_127:UC_WUHOJE",
    			"name":    "Проверка договора",
    		},
    		{
    			"name":  "Согласование бюджета",
    			"color": "#FFA900",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.category.stage.replace: %w", err)
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
                "name": "Подготовка заявки",
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
                "sort": 30,
                "isSystem": false
            },
            {
                "stageId": "DT1038_127:UC_0A4L4I",
                "categoryId": 127,
                "name": "Согласование бюджета",
                "color": "#FFA900",
                "description": "",
                "semantics": "process",
                "sort": 40,
                "isSystem": false
            },
            {
                "stageId": "DT1038_127:SUCCESS",
                "categoryId": 127,
                "name": "Успех",
                "color": "#00ff00",
                "description": "",
                "semantics": "success",
                "sort": 50,
                "isSystem": true
            },
            {
                "stageId": "DT1038_127:FAIL",
                "categoryId": 127,
                "name": "Провал",
                "color": "#ff0000",
                "description": "",
                "semantics": "failure",
                "sort": 60,
                "isSystem": true
            }
        ]
    },
    "time": {
        "start": 1793715167,
        "finish": 1793715167.141672,
        "duration": 0.14167189598083496,
        "processing": 0,
        "date_start": "2026-11-03T17:12:47+03:00",
        "date_finish": "2026-11-03T17:12:47+03:00",
        "operating_reset_at": 1793715720,
        "operating": 0.10776114463806152
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
[`object[]`](../../../data-types.md) | Все стадии воронки после замены по возрастанию `sort`, вместе с системными стадиями и стадиями провала. Описание полей — на странице метода [crm.<тип>.category.stage.get](./crm-entity-category-stage-get-rest-v3.md#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

После замены метод заново нумерует `sort` всех стадий воронки с шагом `10`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Сначала перенесите или удалите связанные элементы",
                "field": "DEPENDENT_ITEMS_EXIST"
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
|| `categoryId` | Обязательное поле `categoryId` не указано | Передайте `categoryId` ||
|| `stages` | Обязательное поле `stages` не указано | Передайте массив `stages` ||
|| `stages` | Значение поля должно быть не больше, чем 50 | Передайте не больше 50 стадий ||
|| `DEPENDENT_ITEMS_EXIST` | Сначала перенесите или удалите связанные элементы | На стадии, которой нет в наборе, есть элементы. Добавьте стадию в набор или переведите элементы на другую стадию ||
|| `STAGE_NOT_FOUND` | Стадия не найдена | В воронке нет стадии с переданным `stageId`. Проверьте идентификаторы методом [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md) ||
|| `OPERATION_NOT_ALLOWED_FOR_STAGE` | Действие недоступно для этой стадии | В наборе есть системная стадия или стадия провала с новым названием или цветом. Передайте ее с текущими значениями или уберите из набора ||
|| `FIELD_VALUE_NOT_ALLOWED` | Недопустимое значение поля | Название стадии из одних пробелов. Передайте в `name` название, в котором есть не только пробелы ||
|| `stages.0.name` | В поле `stages.0.name` требуется тип данных `string` для такого запроса | Передайте `name` строкой ||
|#

В `field` у ошибок с кодами `DEPENDENT_ITEMS_EXIST`, `STAGE_NOT_FOUND`, `OPERATION_NOT_ALLOWED_FOR_STAGE` и `FIELD_VALUE_NOT_ALLOWED` приходит код ошибки, а не имя поля.

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `stages.1.name` | Не заполнено обязательное поле "name" | Передайте `name` у каждой стадии. Номер стадии в `field` считается с нуля ||
|| `stages.0.name` | Значение поля не может быть пустым | Передайте в `name` непустую строку ||
|| `stages.0.name` | Длина строки должна быть не больше, чем 100 знаков | Сократите название до 100 символов ||
|| `stages.1.color` | Значения поля не соответствует регулярному выражению | Передайте цвет в формате `#RRGGBB` или пустую строку ||
|#

Ошибки валидации объекта метод возвращает одним ответом сразу по всем стадиям набора.

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `StageInputDto` | У стадии в наборе есть только `stageId`, `name` и `color`. Уберите `semantics`, `sort` и другие поля. Если в ошибке поле `0`, значит `stages` передан объектом. Передайте массив ||
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
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartprocess1038.category.stage.replace`. Методы стадий есть только у сделки и смарт-процесса. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) и включены ли в типе воронки и стадии ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-category-stage-add-rest-v3.md)
- [{#T}](./crm-entity-category-stage-update-rest-v3.md)
- [{#T}](./crm-entity-category-stage-list-rest-v3.md)
- [{#T}](./crm-entity-category-stage-delete-rest-v3.md)
