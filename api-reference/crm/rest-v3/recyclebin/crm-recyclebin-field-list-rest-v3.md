# Получить список полей записи корзины CRM v 3.0 crm.recyclebin.field.list

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

Метод `crm.recyclebin.field.list` возвращает список доступных полей записи корзины CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список полей описания, которые нужно вернуть, например `["name", "type", "filterable"]`. [Поля описания](#item).

По умолчанию метод возвращает все поля описания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.recyclebin.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","description","filterable","sortable"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.recyclebin.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","description","filterable","sortable"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.recyclebin.field.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldListResult = {
      items: Array<{
        name: string
        type: string
        description: string | null
        filterable: boolean
        sortable: boolean
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<FieldListResult>(
        'crm.recyclebin.field.list',
        {
          select: ['name', 'type', 'description', 'filterable', 'sortable'],
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
      async function listFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.recyclebin.field.list',
            {
              select: ['name', 'type', 'description', 'filterable', 'sortable'],
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

      document.addEventListener('DOMContentLoaded', listFields)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.recyclebin.field.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["name", "type", "description", "filterable", "sortable"],
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["items"])
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
                'crm.recyclebin.field.list',
                [
                    'select' => ['name', 'type', 'description', 'filterable', 'sortable'],
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
        'crm.recyclebin.field.list',
        {
            select: ['name', 'type', 'description', 'filterable', 'sortable'],
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
        'crm.recyclebin.field.list',
        [
            'select' => ['name', 'type', 'description', 'filterable', 'sortable'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.recyclebin.field.list", b24.Params{
    	"select": []string{"name", "type", "description", "filterable", "sortable"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.recyclebin.field.list: %w", err)
    }

    var out struct {
    	Items []struct {
    		Name        string  `json:"name"`
    		Type        string  `json:"type"`
    		Description *string `json:"description"`
    		Filterable  bool    `json:"filterable"`
    		Sortable    bool    `json:"sortable"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, field := range out.Items {
    	fmt.Println(field.Name, field.Type, field.Filterable, field.Sortable)
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
                "name": "recordId",
                "type": "int",
                "description": "Recycle bin record ID used by crm.recyclebin.restore.",
                "filterable": false,
                "sortable": true
            },
            {
                "name": "entityTypeId",
                "type": "int",
                "description": "CRM type: deal, lead, contact, company or an existing restorable smart process.",
                "filterable": true,
                "sortable": false
            },
            {
                "name": "id",
                "type": "int",
                "description": "Former CRM item ID before deletion, distinct from the recycle bin record ID.",
                "filterable": false,
                "sortable": false
            },
            {
                "name": "title",
                "type": "string",
                "description": "Item title at deletion. Filtering supports exact equality.",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "deletedTime",
                "type": "object",
                "description": "Deletion date and time in ISO 8601 format.",
                "filterable": true,
                "sortable": true
            },
            {
                "name": "deletedById",
                "type": "int",
                "description": "ID of the user who deleted the item.",
                "filterable": true,
                "sortable": true
            }
        ]
    },
    "time": {
        "start": 1795431028,
        "finish": 1795431028.276237,
        "duration": 0.27623701095581055,
        "processing": 0,
        "date_start": "2026-11-23T13:50:28+03:00",
        "date_finish": "2026-11-23T13:50:28+03:00",
        "operating_reset_at": 1795431600,
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
[`object[]`](../../../data-types.md) | Массив описаний полей записи корзины. [Поля описания](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

Метод возвращает шесть полей: `recordId`, `entityTypeId`, `id`, `title`, `deletedTime`, `deletedById`. Их значения описаны в [таблице полей записи корзины](./crm-recyclebin-list-rest-v3.md#item). У `deletedTime` в описании указан тип `object`, а в ответе [crm.recyclebin.list](./crm-recyclebin-list-rest-v3.md) приходит строка с датой и временем, например `2026-11-23T13:52:45+03:00`.

#### Поля описания {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Имя поля, например `recordId` ||
|| **type**
[`string`](../../../data-types.md) | Тип данных: `int`, `string` или `object` ||
|| **title**
[`string`](../../../data-types.md) | Название поля. Совпадает с `name` ||
|| **description**
[`string`](../../../data-types.md) | Описание поля на английском языке ||
|| **validationRules**
[`array`](../../../data-types.md) | Правила проверки значения. У полей записи корзины — пустой массив ||
|| **requiredGroups**
[`array`](../../../data-types.md) | Методы, которые требуют это поле. У полей записи корзины — `null` ||
|| **filterable**
[`boolean`](../../../data-types.md) | Можно ли фильтровать по полю в методе [crm.recyclebin.list](./crm-recyclebin-list-rest-v3.md) ||
|| **sortable**
[`boolean`](../../../data-types.md) | Можно ли сортировать по полю в методе [crm.recyclebin.list](./crm-recyclebin-list-rest-v3.md) ||
|| **editable**
[`boolean`](../../../data-types.md) | Можно ли изменять поле. У полей записи корзины — `false` ||
|| **editableGroups**
[`array`](../../../data-types.md) | Методы, в которых поле можно изменять. У полей записи корзины — `null` ||
|| **multiple**
[`boolean`](../../../data-types.md) | Множественное ли поле. У полей записи корзины — `false` ||
|| **elementType**
[`string`](../../../data-types.md) | Тип элемента для составных полей. У полей записи корзины — `null` ||
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

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Методы корзины CRM в REST 3.0 недоступны на этом Битрикс24 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-recyclebin-field-get-rest-v3.md)
- [{#T}](./crm-recyclebin-list-rest-v3.md)
