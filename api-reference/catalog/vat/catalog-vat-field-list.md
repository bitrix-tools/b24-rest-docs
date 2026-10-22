# Получить список полей ставки НДС v 3.0 catalog.vat.field.list

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

Метод `catalog.vat.field.list` возвращает список доступных полей ставки НДС.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Массив строк с именами свойств описания, которые нужно вернуть для каждого поля.

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

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.vat.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","requiredGroups","editableGroups"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.vat.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","requiredGroups","editableGroups"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.vat.field.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type VatFieldListResult = {
      items: Array<{
        name?: string
        type?: string
        requiredGroups?: string[] | null
        editableGroups?: string[] | null
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<VatFieldListResult>({
        method: 'catalog.vat.field.list',
        params: {
          select: [
            'name',
            'type',
            'requiredGroups',
            'editableGroups',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

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

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listVatFields() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.vat.field.list',
            params: {
              select: [
                'name',
                'type',
                'requiredGroups',
                'editableGroups',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

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

      document.addEventListener('DOMContentLoaded', listVatFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    select = [
        "name",
        "type",
        "requiredGroups",
        "editableGroups",
    ]

    try:
        bitrix_response = client.catalog.vat.field.list(
            select=select,
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
                'catalog.vat.field.list',
                [
                    'select' => [
                        'name',
                        'type',
                        'requiredGroups',
                        'editableGroups',
                    ],
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
        'catalog.vat.field.list',
        {
            select: [
                'name',
                'type',
                'requiredGroups',
                'editableGroups',
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
        'catalog.vat.field.list',
        [
            'select' => [
                'name',
                'type',
                'requiredGroups',
                'editableGroups',
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
    res, err := client.Core().Call(ctx, "catalog.vat.field.list", b24.Params{
    	"select": []string{"name", "type", "requiredGroups", "editableGroups"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.vat.field.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		Name           string   `json:"name"`
    		Type           string   `json:"type"`
    		RequiredGroups []string `json:"requiredGroups"`
    		EditableGroups []string `json:"editableGroups"`
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
                "editableGroups": null
            },
            {
                "name": "timestampX",
                "type": "object",
                "requiredGroups": null,
                "editableGroups": null
            },
            {
                "name": "active",
                "type": "bool",
                "requiredGroups": null,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "sort",
                "type": "int",
                "requiredGroups": null,
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "name",
                "type": "string",
                "requiredGroups": [
                    "add"
                ],
                "editableGroups": [
                    "add",
                    "update"
                ]
            },
            {
                "name": "rate",
                "type": "float",
                "requiredGroups": [
                    "add"
                ],
                "editableGroups": [
                    "add",
                    "update"
                ]
            }
        ]
    },
    "time": {
        "start": 1792665781,
        "finish": 1792665781.239087,
        "duration": 0.23908710479736328,
        "processing": 0,
        "date_start": "2026-10-22T13:43:01+03:00",
        "date_finish": "2026-10-22T13:43:01+03:00",
        "operating_reset_at": 1792666380,
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
[`array`](../../data-types.md) | Массив описаний полей ставки НДС. [Свойства элемента](#items) зависят от `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

Состав описания зависит от `select`. Таблица содержит все свойства, которые можно запросить.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Имя поля: `id`, `timestampX`, `active`, `sort`, `name`, `rate` ||
|| **type**
[`string`](../../data-types.md) | Тип в метаданных: `int`, `bool`, `string`, `float`, `object`. Для `timestampX` возвращается `object`, хотя в ответах методов дата передается строкой ISO 8601 ||
|| **title**
[`string`](../../data-types.md) | Заголовок поля. Совпадает с `name` ||
|| **description**
[`string`](../../data-types.md) или `null` | Описание поля. Для полей этого объекта — `null` ||
|| **validationRules**
[`array`](../../data-types.md) | Правила валидации. Для полей этого объекта — `[]` ||
|| **requiredGroups**
[`array`](../../data-types.md) или `null` | Массив строк с именами операций, в которых поле обязательно. Для `name` и `rate` — `["add"]`; для остальных полей — `null` ||
|| **filterable**
[`boolean`](../../data-types.md) | `true` — поле доступно для фильтрации, `false` — недоступно. Для всех полей — `true` ||
|| **sortable**
[`boolean`](../../data-types.md) | `true` — поле доступно для сортировки, `false` — недоступно. Для всех полей — `true` ||
|| **editable**
[`boolean`](../../data-types.md) | `true` — поле можно передавать в операциях из `editableGroups`, `false` — нельзя. Для `id` и `timestampX` — `false` ||
|| **editableGroups**
[`array`](../../data-types.md) или `null` | Массив строк с именами операций, в которых поле можно задавать. Для `active`, `sort`, `name`, `rate` — `["add", "update"]`; для `id` и `timestampX` — `null` ||
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

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `DtoFieldDto` | Передайте только поля из списка: `name`, `type`, `title`, `description`, `validationRules`, `requiredGroups`, `filterable`, `sortable`, `editable`, `editableGroups`, `multiple`, `elementType` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` массивом строк, например `["name","type"]` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-vat-field-get.md)
- [{#T}](./catalog-vat-add-rest-v3.md)
- [{#T}](./catalog-vat-list-rest-v3.md)
