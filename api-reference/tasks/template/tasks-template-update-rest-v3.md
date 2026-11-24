# Изменить шаблон задачи v 3.0 tasks.template.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.update` изменяет переданные поля шаблона задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор шаблона.

Идентификатор можно получить методом [tasks.template.list](./tasks-template-list-rest-v3.md) или при [создании шаблона](./tasks-template-add-rest-v3.md) ||
|| **fields***
[`object`](../../data-types.md) | Поля шаблона, которые нужно изменить. Передайте только те поля, которые меняются, остальные останутся без изменений.

Принимает те же поля, что [tasks.template.add](./tasks-template-add-rest-v3.md#fields), кроме `creatorId` и `tParamType`. Полный список изменяемых полей — в таблице [Объект шаблона](./fields-rest-v3.md#templatedto) ||
|#

Как метод обрабатывает отдельные поля:
- `replicateParams` заменяется целиком. Параметры, которые не переданы, получают значения по умолчанию, поэтому передавайте полное расписание с `period` и `time`
- `permissions` заменяет список прав целиком. Права меняет администратор, автор шаблона или пользователь с правом `full`, иначе метод вернет ошибку доступа
- `dependsOn` заменяет список видимых пользователю задач. Связи с задачами, к которым у пользователя нет доступа, сохраняются
- `accomplices`, `auditors`, `responsibleCollection`, `tags` заменяют списки целиком
- для повторяющегося шаблона постановщик должен иметь право назначать задачи исполнителям и соисполнителям, иначе метод вернет ошибку доступа

Актуальные данные шаблона после изменения можно получить методом [tasks.template.get](./tasks-template-get-rest-v3.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":143,"fields":{"title":"Ежемесячный отчет по продажам","priority":"high","replicateParams":{"period":"monthly","monthlyType":"1","monthlyDayNum":"25","monthlyMonthNum1":"1","time":"09:00","repeatTill":"times","times":"6"},"permissions":[{"accessCode":"U29","permission":"read_only"}]}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":143,"fields":{"title":"Ежемесячный отчет по продажам","priority":"high","replicateParams":{"period":"monthly","monthlyType":"1","monthlyDayNum":"25","monthlyMonthNum1":"1","time":"09:00","repeatTill":"times","times":"6"},"permissions":[{"accessCode":"U29","permission":"read_only"}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.update
    ```

- JS (TS)

    Методы шаблонов задач REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateUpdateResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateUpdateResult>(
        'tasks.template.update',
        {
          id: 143,
          fields: {
            title: 'Ежемесячный отчет по продажам',
            priority: 'high',
            replicateParams: {
              period: 'monthly',
              monthlyType: '1',
              monthlyDayNum: '25',
              monthlyMonthNum1: '1',
              time: '09:00',
              repeatTill: 'times',
              times: '6',
            },
            permissions: [
              { accessCode: 'U29', permission: 'read_only' },
            ],
          },
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated:', result.result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы шаблонов задач REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.update',
            {
              id: 143,
              fields: {
                title: 'Ежемесячный отчет по продажам',
                priority: 'high',
                replicateParams: {
                  period: 'monthly',
                  monthlyType: '1',
                  monthlyDayNum: '25',
                  monthlyMonthNum1: '1',
                  time: '09:00',
                  repeatTill: 'times',
                  times: '6',
                },
                permissions: [
                  { accessCode: 'U29', permission: 'read_only' },
                ],
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateTemplate)
    </script>
    ```

- Python

    Имя метода совпадает с методом прошлой версии `tasks.template.update`, а методы шаблонов REST 3.0 пока не входят в список новой версии в `b24pysdk`: обычный вызов SDK уйдет в предыдущую версию REST. Добавьте метод в список `Config().api_v3_methods` и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 143,
                "fields": {
                    "title": "Ежемесячный отчет по продажам",
                    "priority": "high",
                    "replicateParams": {
                        "period": "monthly",
                        "monthlyType": "1",
                        "monthlyDayNum": "25",
                        "monthlyMonthNum1": "1",
                        "time": "09:00",
                        "repeatTill": "times",
                        "times": "6",
                    },
                    "permissions": [
                        {"accessCode": "U29", "permission": "read_only"},
                    ],
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
                'tasks.template.update',
                [
                    'id' => 143,
                    'fields' => [
                        'title' => 'Ежемесячный отчет по продажам',
                        'priority' => 'high',
                        'replicateParams' => [
                            'period' => 'monthly',
                            'monthlyType' => '1',
                            'monthlyDayNum' => '25',
                            'monthlyMonthNum1' => '1',
                            'time' => '09:00',
                            'repeatTill' => 'times',
                            'times' => '6',
                        ],
                        'permissions' => [
                            ['accessCode' => 'U29', 'permission' => 'read_only'],
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
        'tasks.template.update',
        {
            id: 143,
            fields: {
                title: 'Ежемесячный отчет по продажам',
                priority: 'high',
                replicateParams: {
                    period: 'monthly',
                    monthlyType: '1',
                    monthlyDayNum: '25',
                    monthlyMonthNum1: '1',
                    time: '09:00',
                    repeatTill: 'times',
                    times: '6',
                },
                permissions: [
                    { accessCode: 'U29', permission: 'read_only' },
                ],
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
        'tasks.template.update',
        [
            'id' => 143,
            'fields' => [
                'title' => 'Ежемесячный отчет по продажам',
                'priority' => 'high',
                'replicateParams' => [
                    'period' => 'monthly',
                    'monthlyType' => '1',
                    'monthlyDayNum' => '25',
                    'monthlyMonthNum1' => '1',
                    'time' => '09:00',
                    'repeatTill' => 'times',
                    'times' => '6',
                ],
                'permissions' => [
                    ['accessCode' => 'U29', 'permission' => 'read_only'],
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
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.update", b24.Params{
    	"id": 143,
    	"fields": map[string]any{
    		"title":    "Ежемесячный отчет по продажам",
    		"priority": "high",
    		"replicateParams": map[string]any{
    			"period":           "monthly",
    			"monthlyType":      "1",
    			"monthlyDayNum":    "25",
    			"monthlyMonthNum1": "1",
    			"time":             "09:00",
    			"repeatTill":       "times",
    			"times":            "6",
    		},
    		"permissions": []map[string]string{
    			{"accessCode": "U29", "permission": "read_only"},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.template.update: %w", err)
    }

    var result struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Result)
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
        "start": 1795429313,
        "finish": 1795429313.825033,
        "duration": 0.8250329494476318,
        "processing": 0,
        "date_start": "2026-11-23T13:21:53+03:00",
        "date_finish": "2026-11-23T13:21:53+03:00",
        "operating_reset_at": 1795429860,
        "operating": 0.42789196968078613
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если шаблон изменен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Поле \"tParamType\" не доступно к заполнению",
                "field": "tParamType"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте идентификатор шаблона в `id` ||
|| `id` | Обязательное поле `id` не указано | Передайте `id`. Изменение по `filter` метод не поддерживает ||
|| `id` | В поле `id` требуется тип данных `integer` для такого запроса | Передайте положительное целое число ||
|| `fields` | Обязательное поле `fields` не указано | Передайте изменяемые поля в объекте `fields` ||
|| `permissions.0.permission` | В поле `permissions.0.permission` требуется тип данных `PermissionType` для такого запроса | Передайте `read_only` или `full` ||
|| `replicateParams.monthlyType` | В поле `replicateParams.monthlyType` требуется тип данных `MonthlyType` для такого запроса | Передайте `1` или `2`. То же правило действует для `yearlyType` ||
|| `dependsOn` | В поле `dependsOn` требуется тип данных `array` для такого запроса | Передайте не больше 50 идентификаторов задач ||
|#

#### Ошибки валидации полей шаблона

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `tParamType` | Поле "tParamType" не доступно к заполнению | Тип шаблона задается только при создании ||
|| `creatorId` | Поле "creatorId" не доступно к заполнению | Постановщик задается только при создании ||
|| `id` | Поле "id" не доступно к заполнению | Передайте идентификатор в параметре `id`, а не в `fields` ||
|| `TASKS_TEMPLATE_REPLICATION_PARAMS_INVALID` | Не удалось запустить повтор задачи. Проверьте условия повтора и попробуйте снова | Передайте `replicateParams` целиком с параметрами `period` и `time`. Даты `startDate` и `endDate` передайте в формате даты Битрикс24 ||
|#

#### Неизвестное поле

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `foo` для сущности `TemplateDto` | Передайте поля из таблицы [Объект шаблона](./fields-rest-v3.md#templatedto) ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте право на изменение шаблона методом [tasks.template.access.get](./tasks-template-access-get-rest-v3.md). Ошибка также возникает, если пользователь меняет `permissions` без полного доступа, указывает в `dependsOn` недоступную задачу или постановщик повторяющегося шаблона не может назначать задачи исполнителю или соисполнителю ||
|#

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_PERMISSIONSRESTRICTEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `permissions` | На текущем тарифе нельзя настроить права доступа к шаблону, уберите поле `permissions` из запроса | Уберите `permissions` из `fields` ||
|#

#### Шаблон не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `999999` не найдена | Шаблона нет или он удален. Проверьте идентификатор методом [tasks.template.list](./tasks-template-list-rest-v3.md) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](./tasks-template-add-rest-v3.md)
- [{#T}](./tasks-template-delete-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
- [{#T}](./tasks-template-access-get-rest-v3.md)
- [{#T}](./tasks-template-update.md)
