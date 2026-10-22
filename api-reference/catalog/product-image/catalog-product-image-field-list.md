# Получить список полей изображения товара v 3.0 catalog.product.image.field.list

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

Метод `catalog.product.image.field.list` возвращает список доступных полей изображения товара.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив строк с именами свойств описания, которые нужно вернуть в ответе.

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
- `elementType` — тип элемента для составных полей

По умолчанию: все свойства описания. Пустой массив `[]` также возвращает все свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/catalog.product.image.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","requiredGroups","editableGroups","filterable"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.image.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","requiredGroups","editableGroups","filterable"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.image.field.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductImageFieldListResult = {
      items: Array<{
        name?: string
        type?: string
        requiredGroups?: string[] | null
        editableGroups?: string[] | null
        filterable?: boolean
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductImageFieldListResult>({
        method: 'catalog.product.image.field.list',
        params: {
          select: [
            'name',
            'type',
            'requiredGroups',
            'editableGroups',
            'filterable',
          ],
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
      async function listProductImageFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.image.field.list',
            params: {
              select: [
                'name',
                'type',
                'requiredGroups',
                'editableGroups',
                'filterable',
              ],
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

      document.addEventListener('DOMContentLoaded', listProductImageFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.image.field.list(
            select=["name", "type", "requiredGroups", "editableGroups", "filterable"],
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
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
                'catalog.product.image.field.list',
                [
                    'select' => ['name', 'type', 'requiredGroups', 'editableGroups', 'filterable'],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'catalog.product.image.field.list',
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
        'catalog.product.image.field.list',
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
    res, err := client.Core().Call(ctx, "catalog.product.image.field.list", b24.Params{
    	"select": []string{"name", "type", "requiredGroups", "editableGroups", "filterable"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.image.field.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		Name string `json:"name"`
    		Type string `json:"type"`
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
                "filterable": false,
                "editableGroups": null
            },
            {
                "name": "productId",
                "type": "int",
                "requiredGroups": [
                    "add"
                ],
                "filterable": true,
                "editableGroups": [
                    "add"
                ]
            },
            {
                "name": "type",
                "type": "object",
                "requiredGroups": [
                    "add"
                ],
                "filterable": false,
                "editableGroups": [
                    "add"
                ]
            },
            {
                "name": "name",
                "type": "string",
                "requiredGroups": null,
                "filterable": false,
                "editableGroups": null
            },
            {
                "name": "createTime",
                "type": "object",
                "requiredGroups": null,
                "filterable": false,
                "editableGroups": null
            },
            {
                "name": "detailUrl",
                "type": "string",
                "requiredGroups": null,
                "filterable": false,
                "editableGroups": null
            },
            {
                "name": "downloadUrl",
                "type": "string",
                "requiredGroups": null,
                "filterable": false,
                "editableGroups": null
            },
            {
                "name": "file",
                "type": "object",
                "requiredGroups": [
                    "add"
                ],
                "filterable": false,
                "editableGroups": [
                    "add"
                ]
            }
        ]
    },
    "time": {
        "start": 1792660563,
        "finish": 1792660563.296073,
        "duration": 0.29607295989990234,
        "processing": 0,
        "date_start": "2026-10-22T12:16:03+03:00",
        "date_finish": "2026-10-22T12:16:03+03:00",
        "operating_reset_at": 1792661160,
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
[`array`](../../data-types.md) | Массив описаний полей. Свойства каждого описания зависят от `select`. [Описание элемента](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

Таблица содержит все свойства, которые можно запросить.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Имя поля: `id`, `productId`, `type`, `name`, `createTime`, `detailUrl`, `downloadUrl`, `file` ||
|| **type**
[`string`](../../data-types.md) | Тип в метаданных: `int`, `string`, `object`. Для `type`, `createTime` и `file` возвращается `object`: в ответах методов `type` и `createTime` передаются строками, `file` — объектом ||
|| **title**
[`string`](../../data-types.md) | Заголовок поля. Совпадает с `name` ||
|| **description**
[`string`](../../data-types.md) или `null` | Описание поля. Для полей изображения — `null` ||
|| **validationRules**
[`array`](../../data-types.md) | Правила валидации. Для полей изображения — пустой массив ||
|| **requiredGroups**
[`array`](../../data-types.md) или `null` | Операции, в которых поле обязательно. Для `productId`, `type` и `file` — `["add"]`, для остальных полей — `null` ||
|| **filterable**
[`boolean`](../../data-types.md) | `true` — поле доступно для фильтрации. `true` только у `productId` ||
|| **sortable**
[`boolean`](../../data-types.md) | `true` — поле доступно для сортировки. Для всех полей — `false` ||
|| **editable**
[`boolean`](../../data-types.md) | `true` — поле можно передавать в операциях из `editableGroups` ||
|| **editableGroups**
[`array`](../../data-types.md) или `null` | Операции, в которых поле можно задавать. Для `productId`, `type` и `file` — `["add"]`, для остальных полей — `null` ||
|| **multiple**
[`boolean`](../../data-types.md) | Признак множественного значения. Для всех полей — `false` ||
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

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `DtoFieldDto` | Укажите в `select` только свойства из описания параметра `select` ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк, например `["name","type"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у приложения или вебхука есть scope `catalog` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-image-field-get.md)
- [{#T}](./catalog-product-image-add-rest-v3.md)
- [{#T}](./catalog-product-image-list-rest-v3.md)
