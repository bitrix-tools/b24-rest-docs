# Получить описание полей типа смарт-процесса v 3.0 crm.smartprocess.field.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.smartprocess.field.list` возвращает описание полей типа смарт-процесса: тип данных и признаки, можно ли поле передавать при записи, фильтровать и сортировать.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список полей описания, которые нужно вернуть, например `["name", "type", "editable"]`. [Поля описания](#item).

По умолчанию метод возвращает все поля описания ||
|#

Метод описывает поля самого типа смарт-процесса, которые возвращают методы [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md) и [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md). Поля элементов смарт-процесса возвращает другой метод — [crm.smartprocess<entityTypeId>.field.list](../fields/crm-entity-field-list-rest-v3.md).

Метод возвращает полный список полей: параметры `filter`, `order` и `pagination` он пропускает без ошибки. `select` можно передать строкой с одним полем: `"select": "name"`.

Имя метода пишется в нижнем регистре: `crm.smartprocess.field.list`. На имя `crm.smartProcess.field.list` метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess.field.list`

{% endnote %}

Примеры получают имя, тип данных и признак изменения у каждого поля типа смарт-процесса.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","editable"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","editable"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess.field.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldListResult = {
      items: {
        name: string
        type: string
        editable: boolean
      }[]
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<FieldListResult>(
        'crm.smartprocess.field.list',
        {
          select: ['name', 'type', 'editable'],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Fields:', result.items)
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
      async function listSmartProcessTypeFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess.field.list',
            {
              select: ['name', 'type', 'editable'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Fields:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listSmartProcessTypeFields)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess.field.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={"select": ["name", "type", "editable"]},
            prefer_version=3,
        )
        for field in response["result"]["items"]:
            print(field["name"], field["type"], field["editable"])
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
                'crm.smartprocess.field.list',
                [
                    'select' => ['name', 'type', 'editable'],
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
        'crm.smartprocess.field.list',
        {
            select: ['name', 'type', 'editable'],
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
        'crm.smartprocess.field.list',
        [
            'select' => ['name', 'type', 'editable'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess.field.list", b24.Params{
    	"select": []string{"name", "type", "editable"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess.field.list: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var fields []struct {
    	Name     string `json:"name"`
    	Type     string `json:"type"`
    	Editable bool   `json:"editable"`
    }
    if err := json.Unmarshal(raw, &fields); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, f := range fields {
    	fmt.Println(f.Name, f.Type, f.Editable)
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
                "name": "entityTypeId",
                "type": "int",
                "title": "entityTypeId",
                "description": null,
                "validationRules": [],
                "requiredGroups": null,
                "filterable": true,
                "sortable": true,
                "editable": false,
                "editableGroups": null,
                "multiple": false,
                "elementType": null
            },
            {
                "name": "title",
                "type": "string",
                "title": "title",
                "description": null,
                "validationRules": [],
                "requiredGroups": [
                    "add"
                ],
                "filterable": true,
                "sortable": true,
                "editable": true,
                "editableGroups": [],
                "multiple": false,
                "elementType": null
            }
        ]
    },
    "time": {
        "start": 1795430991,
        "finish": 1795430991.241357,
        "duration": 0.24135708808898926,
        "processing": 0,
        "date_start": "2026-11-23T13:49:51+03:00",
        "date_finish": "2026-11-23T13:49:51+03:00",
        "operating_reset_at": 1795431540,
        "operating": 0
    }
}
```

В примере показаны первые два поля из 36. Ответ получен без `select`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../../data-types.md) | Массив описаний полей. [Поля описания](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля описания {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Имя поля в camelCase, например `title` ||
|| **type**
[`string`](../../../data-types.md) | Тип данных: `int`, `string`, `bool`, `object` или `array`. У дат `createdTime` и `updatedTime` — `object`, хотя в ответе дата приходит строкой в формате ISO 8601 ||
|| **elementType**
[`string`](../../../data-types.md) | Тип элемента у поля `customSectionIds`. У остальных полей — `null` ||
|| **multiple**
[`boolean`](../../../data-types.md) | Множественное ли поле. У всех полей типа смарт-процесса — `false` ||
|| **title**
[`string`](../../../data-types.md) | Название поля. Сейчас совпадает с `name` ||
|| **description**
[`string`](../../../data-types.md) | Описание поля. Если описания нет — `null` ||
|| **validationRules**
[`array`](../../../data-types.md) | Правила проверки значения. У полей типа смарт-процесса — пустой массив, у `description` — `[{}]` ||
|| **requiredGroups**
[`array`](../../../data-types.md) | Методы, которые требуют это поле: `["add"]` у `title`. У остальных полей — `null` ||
|| **filterable**
[`boolean`](../../../data-types.md) | Можно ли фильтровать по полю в методе [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md#filter) ||
|| **sortable**
[`boolean`](../../../data-types.md) | Можно ли сортировать по полю в методе [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md#order) ||
|| **editable**
[`boolean`](../../../data-types.md) | Можно ли передавать поле в `fields` методов [crm.smartprocess.add](./crm-smart-process-add-rest-v3.md) и [crm.smartprocess.update](./crm-smart-process-update-rest-v3.md) ||
|| **editableGroups**
[`array`](../../../data-types.md) | Методы, в которых поле можно передавать. Пустой массив `[]` у изменяемого поля означает, что ограничений нет. У полей только для чтения — `null` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION",
        "message": "Неизвестное поле `foo` для сущности `DtoFieldDto`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `DtoFieldDto` | Проверьте имена в `select` по [таблице полей описания](#item) ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.smartProcess.field.list` не найден | Напишите имя метода в нижнем регистре: `crm.smartprocess.field.list` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-smart-process-field-get-rest-v3.md)
- [{#T}](./crm-smart-process-list-rest-v3.md)
- [{#T}](../fields/crm-entity-field-list-rest-v3.md)
