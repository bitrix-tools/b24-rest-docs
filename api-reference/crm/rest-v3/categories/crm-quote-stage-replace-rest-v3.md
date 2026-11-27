# Заменить стадии предложений CRM v 3.0 crm.quote.stage.replace

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

Метод `crm.quote.stage.replace` задает весь набор стадий предложений в работе одним запросом и возвращает все стадии предложений после замены.

В отличие от методов [crm.<тип>.category.stage.replace](./crm-entity-category-stage-replace-rest-v3.md) для сделок и смарт-процессов, метод не принимает `categoryId` и меняет единый набор стадий предложений во всем Битрикс24.

{% note warning "" %}

Стадии в работе, которых нет в наборе, метод удаляет. Перед заменой получите текущие стадии методом [crm.quote.stage.list](./crm-quote-stage-list-rest-v3.md) и передайте в наборе все стадии в работе, которые нужно сохранить.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **stages***
[`object[]`](../../../data-types.md) | Стадии в работе в нужном порядке, до 50 стадий. Обязательное поле каждой стадии — `name`. [Описание параметра](#stages) ||
|#

### Параметр stages {#stages}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **stageId**
[`string`](../../../data-types.md) | Идентификатор существующей стадии предложений, например `SENT` или `UC_9AD50Y`. Если не передан или равен `null`, метод создаст новую стадию.

Идентификаторы стадий возвращает метод [crm.quote.stage.list](./crm-quote-stage-list-rest-v3.md). Один `stageId` можно передать в наборе только один раз ||
|| **name***
[`string`](../../../data-types.md) | Название стадии, до 100 символов ||
|| **color**
[`string`](../../../data-types.md) | Цвет стадии в формате `#RRGGBB`. Если не передан, у существующей стадии цвет не меняется. Пустая строка убирает цвет ||
|#

Метод сравнивает переданный набор с текущими стадиями предложений по `stageId`:

- стадию с `stageId` метод оставляет и обновляет ей название, а цвет — если он передан
- стадию без `stageId` метод создает в группе `process`
- стадию в работе, которой нет в наборе, метод удаляет, если на ней нет предложений
- порядок стадий в наборе становится порядком стадий в работе: набор встает после первой системной стадии `DRAFT` и перед стадией успеха `APPROVED`

Системные стадии и стадии провала метод не удаляет и не переименовывает, их не нужно передавать в набор. Системную стадию или стадию провала можно передать в наборе, но только с текущими названием и цветом. Если они другие, метод ответит ошибкой `OPERATION_NOT_ALLOWED_FOR_STAGE`. Стадия `DRAFT` остается первой, даже если передать ее в середине набора. Переименовать системную стадию можно методом [crm.quote.stage.update](./crm-quote-stage-update-rest-v3.md).

Пустой массив `stages` удаляет все стадии в работе, кроме первой системной стадии.

Если хотя бы одно изменение вызывает ошибку, метод не меняет стадии.

Другие поля стадии, например `semantics` и `sort`, метод не принимает: группу стадии задает Битрикс24, а ее место — порядок в массиве.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.quote.stage.replace`

{% endnote %}

Примеры задают предложениям три стадии в работе: оставляют «Отправлено клиенту» и «Согласование цены» и добавляют новую стадию «Подписание». Другие стадии в работе метод удалит.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"stages":[{"stageId":"SENT","name":"Отправлено клиенту"},{"stageId":"UC_9AD50Y","name":"Согласование цены"},{"name":"Подписание","color":"#FFA900"}]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.stage.replace
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"stages":[{"stageId":"SENT","name":"Отправлено клиенту"},{"stageId":"UC_9AD50Y","name":"Согласование цены"},{"name":"Подписание","color":"#FFA900"}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.quote.stage.replace
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
        name: string
        color: string
        semantics: 'process' | 'success' | 'failure'
        sort: number
        isSystem: boolean
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<StageReplaceResult>(
        'crm.quote.stage.replace',
        {
          stages: [
            {
              stageId: 'SENT',
              name: 'Отправлено клиенту',
            },
            {
              stageId: 'UC_9AD50Y',
              name: 'Согласование цены',
            },
            {
              name: 'Подписание',
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
            'crm.quote.stage.replace',
            {
              stages: [
                {
                  stageId: 'SENT',
                  name: 'Отправлено клиенту',
                },
                {
                  stageId: 'UC_9AD50Y',
                  name: 'Согласование цены',
                },
                {
                  name: 'Подписание',
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

    method = "crm.quote.stage.replace"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "stages": [
                    {
                        "stageId": "SENT",
                        "name": "Отправлено клиенту",
                    },
                    {
                        "stageId": "UC_9AD50Y",
                        "name": "Согласование цены",
                    },
                    {
                        "name": "Подписание",
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
                'crm.quote.stage.replace',
                [
                    'stages' => [
                        [
                            'stageId' => 'SENT',
                            'name' => 'Отправлено клиенту',
                        ],
                        [
                            'stageId' => 'UC_9AD50Y',
                            'name' => 'Согласование цены',
                        ],
                        [
                            'name' => 'Подписание',
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
        'crm.quote.stage.replace',
        {
            stages: [
                {
                    stageId: 'SENT',
                    name: 'Отправлено клиенту',
                },
                {
                    stageId: 'UC_9AD50Y',
                    name: 'Согласование цены',
                },
                {
                    name: 'Подписание',
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
        'crm.quote.stage.replace',
        [
            'stages' => [
                [
                    'stageId' => 'SENT',
                    'name' => 'Отправлено клиенту',
                ],
                [
                    'stageId' => 'UC_9AD50Y',
                    'name' => 'Согласование цены',
                ],
                [
                    'name' => 'Подписание',
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
    res, err := client.Core().Call(ctx, "crm.quote.stage.replace", b24.Params{
    	"stages": []b24.Params{
    		{
    			"stageId": "SENT",
    			"name":    "Отправлено клиенту",
    		},
    		{
    			"stageId": "UC_9AD50Y",
    			"name":    "Согласование цены",
    		},
    		{
    			"name":  "Подписание",
    			"color": "#FFA900",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.quote.stage.replace: %w", err)
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
                "stageId": "DRAFT",
                "name": "Новое",
                "color": "#39A8EF",
                "semantics": "process",
                "sort": 10,
                "isSystem": true
            },
            {
                "stageId": "SENT",
                "name": "Отправлено клиенту",
                "color": "#2FC6F6",
                "semantics": "process",
                "sort": 20,
                "isSystem": false
            },
            {
                "stageId": "UC_9AD50Y",
                "name": "Согласование цены",
                "color": "#FFA900",
                "semantics": "process",
                "sort": 30,
                "isSystem": false
            },
            {
                "stageId": "UC_INDJ22",
                "name": "Подписание",
                "color": "#FFA900",
                "semantics": "process",
                "sort": 40,
                "isSystem": false
            },
            {
                "stageId": "APPROVED",
                "name": "Принято",
                "color": "#7BD500",
                "semantics": "success",
                "sort": 50,
                "isSystem": true
            },
            {
                "stageId": "DECLAINED",
                "name": "Отклонено",
                "color": "#FF5752",
                "semantics": "failure",
                "sort": 60,
                "isSystem": true
            },
            {
                "stageId": "APOLOGY",
                "name": "Анализ причины отклонения",
                "color": "#FF5752",
                "semantics": "failure",
                "sort": 70,
                "isSystem": false
            }
        ]
    },
    "time": {
        "start": 1795772512,
        "finish": 1795772512.774333,
        "duration": 0.7743330001831055,
        "processing": 0,
        "date_start": "2026-11-27T12:41:52+03:00",
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
|| **result.items**
[`object[]`](../../../data-types.md) | Все стадии предложений после замены по возрастанию `sort`, вместе с системными стадиями и стадиями провала. Описание полей — на странице метода [crm.quote.stage.get](./crm-quote-stage-get-rest-v3.md#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

После замены метод заново нумерует `sort` всех стадий предложений с шагом `10`.

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

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `stages` | Обязательное поле `stages` не указано | Передайте массив `stages` ||
|| `stages` | Значение поля должно быть не больше, чем 50 | Передайте не больше 50 стадий ||
|| `stages` | В поле `stages` требуется тип данных `array` для такого запроса | Передайте `stages` массивом, а не объектом ||
|| `stages.0` | В поле `stages.0` требуется тип данных `StageInputDto` для такого запроса | Передайте каждую стадию объектом с полями `stageId`, `name`, `color` ||
|| `stages.0.name` | В поле `stages.0.name` требуется тип данных `string` для такого запроса | Передайте `name` строкой ||
|| `DEPENDENT_ITEMS_EXIST` | Сначала перенесите или удалите связанные элементы | На стадии, которой нет в наборе, есть предложения. Добавьте стадию в набор или переведите предложения на другую стадию ||
|| `STAGE_NOT_FOUND` | Стадия не найдена | Среди стадий предложений нет стадии с переданным `stageId`. Проверьте идентификаторы методом [crm.quote.stage.list](./crm-quote-stage-list-rest-v3.md) ||
|| `OPERATION_NOT_ALLOWED_FOR_STAGE` | Действие недоступно для этой стадии | В наборе есть системная стадия или стадия провала с новым названием или цветом. Передайте ее с текущими значениями или уберите из набора ||
|| `FIELD_VALUE_NOT_ALLOWED` | Недопустимое значение поля | Название стадии из одних пробелов. Передайте в `name` название, в котором есть не только пробелы ||
|#

Номер стадии в `field` считается с нуля. В `field` у ошибок с кодами `DEPENDENT_ITEMS_EXIST`, `STAGE_NOT_FOUND`, `OPERATION_NOT_ALLOWED_FOR_STAGE` и `FIELD_VALUE_NOT_ALLOWED` приходит код ошибки, а не имя поля.

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `stages.1.name` | Не заполнено обязательное поле "name" | Передайте `name` у каждой стадии ||
|| `stages.0.name` | Значение поля не может быть пустым | Передайте в `name` непустую строку ||
|| `stages.0.name` | Длина строки должна быть не больше, чем 100 знаков | Сократите название до 100 символов ||
|| `stages.1.color` | Значения поля не соответствует регулярному выражению | Передайте цвет в формате `#RRGGBB` или пустую строку ||
|| `stages.1.stageId` | Недопустимое значение поля | Этот `stageId` уже есть в наборе. Передайте каждую стадию один раз ||
|#

Ошибки валидации объекта метод возвращает одним ответом сразу по всем стадиям набора.

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `StageInputDto` | У стадии в наборе есть только `stageId`, `name` и `color`. Уберите `semantics`, `sort` и другие поля ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `StageDto` | Метод принимает только параметр `stages`. Уберите из запроса `categoryId` и другие параметры ||
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
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре — `crm.quote.stage.replace` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-quote-stage-add-rest-v3.md)
- [{#T}](./crm-quote-stage-update-rest-v3.md)
- [{#T}](./crm-quote-stage-list-rest-v3.md)
- [{#T}](./crm-quote-stage-delete-rest-v3.md)
