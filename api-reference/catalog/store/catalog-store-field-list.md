# Получить список полей склада v 3.0 catalog.store.field.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.store.field.list` возвращает список доступных полей склада.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив строк с именами свойств описания, которые нужно вернуть в ответе.

По умолчанию: все свойства описания. Значение `["*"]` не поддерживается.

Доступные поля:

- `name` — имя поля
- `type` — тип данных
- `title` — заголовок
- `description` — описание
- `validationRules` — правила валидации
- `requiredGroups` — группы обязательности
- `filterable` — признак доступности в фильтре
- `sortable` — признак доступности в сортировке
- `editable` — признак редактируемости
- `editableGroups` — группы операций, в которых поле редактируется
- `multiple` — признак множественного значения
- `elementType` — тип элемента для составных полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.store.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","requiredGroups","editableGroups","filterable"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.store.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","requiredGroups","editableGroups","filterable"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.store.field.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type StoreFieldListResult = {
      items: {
        name: string
        type: string
        requiredGroups: string[] | null
        editableGroups: string[] | null
        filterable: boolean
      }[]
    }

    try {
      const response = await $b24.actions.v3.call.make<StoreFieldListResult>({
        method: 'catalog.store.field.list',
        params: {
          select: ['name', 'type', 'requiredGroups', 'editableGroups', 'filterable'],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(field => console.info(field.name, field.type))
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getFieldList() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.store.field.list',
            params: {
              select: ['name', 'type', 'requiredGroups', 'editableGroups', 'filterable'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(field => console.info(field.name, field.type))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFieldList)
    </script>
    ```

- Python

    У методов `catalog.store.*` REST 3.0 нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `call_method` токена клиента с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "catalog.store.field.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})
    bitrix_token = client.get_token()

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["name", "type", "requiredGroups", "editableGroups", "filterable"],
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
                'catalog.store.field.list',
                [
                    'select' => ['name', 'type', 'requiredGroups', 'editableGroups', 'filterable'],
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
        'catalog.store.field.list',
        {
            select: ['name', 'type', 'requiredGroups', 'editableGroups', 'filterable'],
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
        'catalog.store.field.list',
        [
            'select' => ['name', 'type', 'requiredGroups', 'editableGroups', 'filterable'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.store.field.list", b24.Params{
    	"select": []string{"name", "type", "requiredGroups", "editableGroups", "filterable"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.store.field.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		Name           string   `json:"name"`
    		Type           string   `json:"type"`
    		RequiredGroups []string `json:"requiredGroups"`
    		EditableGroups []string `json:"editableGroups"`
    		Filterable     bool     `json:"filterable"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, field := range result.Items {
    	fmt.Println(field.Name, field.Type)
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
                "name": "id",
                "type": "int",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": null
            },
            {
                "name": "title",
                "type": "string",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "active",
                "type": "bool",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "address",
                "type": "string",
                "requiredGroups": [
                    "add"
                ],
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "description",
                "type": "string",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "gpsN",
                "type": "float",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "gpsS",
                "type": "float",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "imageId",
                "type": "int",
                "requiredGroups": null,
                "filterable": false,
                "editableGroups": null
            },
            {
                "name": "imageUrl",
                "type": "string",
                "requiredGroups": null,
                "filterable": false,
                "editableGroups": null
            },
            {
                "name": "image",
                "type": "object",
                "requiredGroups": null,
                "filterable": false,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "dateModify",
                "type": "object",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": null
            },
            {
                "name": "dateCreate",
                "type": "object",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": null
            },
            {
                "name": "userId",
                "type": "int",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": null
            },
            {
                "name": "modifiedBy",
                "type": "int",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": null
            },
            {
                "name": "phone",
                "type": "string",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "schedule",
                "type": "string",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "xmlId",
                "type": "string",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "sort",
                "type": "int",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "email",
                "type": "string",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "issuingCenter",
                "type": "bool",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "code",
                "type": "string",
                "requiredGroups": null,
                "filterable": true,
                "editableGroups": [
                    "add",
                    "update"
                ]
            }
        ]
    },
    "time": {
        "start": 1794922634,
        "finish": 1794922634.02756,
        "duration": 0.027559995651245117,
        "processing": 0,
        "date_start": "2026-11-17T16:37:14+03:00",
        "date_finish": "2026-11-17T16:37:14+03:00",
        "operating_reset_at": 1794923220,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../data-types.md) | Массив описаний полей склада. [Свойства элемента](#items) зависят от `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

Состав описания зависит от `select`. Таблица содержит все свойства, которые можно запросить.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Имя поля: `id`, `title`, `active`, `address`, `description`, `gpsN`, `gpsS`, `imageId`, `imageUrl`, `image`, `dateModify`, `dateCreate`, `userId`, `modifiedBy`, `phone`, `schedule`, `xmlId`, `sort`, `email`, `issuingCenter`, `code` ||
|| **type**
[`string`](../../data-types.md) | Тип в метаданных:

- `int` — `id`, `imageId`, `userId`, `modifiedBy`, `sort`
- `float` — `gpsN`, `gpsS`
- `bool` — `active`, `issuingCenter`
- `object` — `image`, `dateCreate`, `dateModify`
- `string` — остальные поля

В ответах методов даты `dateCreate` и `dateModify` приходят строкой в формате `2026-11-17T16:37:04+03:00` ||
|| **title**
[`string`](../../data-types.md) | Заголовок поля. Совпадает с `name` ||
|| **description**
[`string`](../../data-types.md) или `null` | Описание поля. Для полей этого объекта — `null` ||
|| **validationRules**
[`array`](../../data-types.md) | Массив правил валидации. Для полей этого объекта — `[]` ||
|| **requiredGroups**
[`array`](../../data-types.md) или `null` | Массив строк с именами операций, в которых поле обязательно. Для `address` — `["add"]`, для остальных полей — `null` ||
|| **filterable**
[`boolean`](../../data-types.md) | `true` — поле доступно для фильтрации, `false` — недоступно. Для `image`, `imageId` и `imageUrl` — `false`, для остальных полей — `true` ||
|| **sortable**
[`boolean`](../../data-types.md) | `true` — поле доступно для сортировки, `false` — недоступно. Для `image`, `imageId` и `imageUrl` — `false`, для остальных полей — `true` ||
|| **editable**
[`boolean`](../../data-types.md) | `true` — поле можно передавать в операциях из `editableGroups`, `false` — нельзя. Для `id`, `imageId`, `imageUrl`, `dateModify`, `dateCreate`, `userId` и `modifiedBy` — `false`, для остальных полей — `true` ||
|| **editableGroups**
[`array`](../../data-types.md) или `null` | Массив строк с именами операций, в которых поле можно задавать. Для редактируемых полей — `["add", "update"]`, для остальных — `null` ||
|| **multiple**
[`boolean`](../../data-types.md) | Признак множественного значения: `true` — множественное, `false` — одиночное. Для всех полей — `false` ||
|| **elementType**
[`string`](../../data-types.md) или `null` | Тип элемента составного поля. Для всех полей — `null` ||
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

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `catalog` ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `DtoFieldDto` | Передайте только поля из списка: `name`, `type`, `title`, `description`, `validationRules`, `requiredGroups`, `filterable`, `sortable`, `editable`, `editableGroups`, `multiple`, `elementType` ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк, например `["name","type"]` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-store-field-get.md)
- [{#T}](./catalog-store-add-rest-v3.md)
- [{#T}](./catalog-store-list-rest-v3.md)
- [{#T}](./index.md)
