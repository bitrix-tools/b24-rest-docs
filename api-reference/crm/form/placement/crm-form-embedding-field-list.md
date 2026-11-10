# Получить список полей вариантов размещения CRM-формы crm.form.embedding.field.list

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

Метод `crm.form.embedding.field.list` возвращает список доступных полей вариантов размещения CRM-формы.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список полей описания, которые нужно вернуть в ответе. Если параметр не передан, метод возвращает все поля описания.

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
- `editableGroups` — методы, в которых поле можно изменить
- `multiple` — признак множественного значения
- `elementType` — тип элемента для составных полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.embedding.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","filterable","sortable","editable"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.embedding.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","filterable","sortable","editable"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.embedding.field.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type Result = {
      items: Array<{
        name?: string
        type?: string
        filterable?: boolean
        sortable?: boolean
        editable?: boolean
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<Result>({
        method: 'crm.form.embedding.field.list',
        params: {
          select: [
            'name',
            'type',
            'filterable',
            'sortable',
            'editable',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.items)
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
      async function crmFormEmbeddingFieldList() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.embedding.field.list',
            params: {
              select: [
                'name',
                'type',
                'filterable',
                'sortable',
                'editable',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', crmFormEmbeddingFieldList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    select = [
        "name",
        "type",
        "filterable",
        "sortable",
        "editable",
    ]

    try:
        bitrix_response = client.crm.form.embedding.field.list(
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
                'crm.form.embedding.field.list',
                [
                    'select' => [
                        'name',
                        'type',
                        'filterable',
                        'sortable',
                        'editable',
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
        'crm.form.embedding.field.list',
        {
            select: [
                'name',
                'type',
                'filterable',
                'sortable',
                'editable',
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
        'crm.form.embedding.field.list',
        [
            'select' => [
                'name',
                'type',
                'filterable',
                'sortable',
                'editable',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    res, err := client.Core().Call(ctx, "crm.form.embedding.field.list", b24.Params{
    	"select": []string{"name", "type", "filterable", "sortable", "editable"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.embedding.field.list: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	Name       string `json:"name"`
    	Type       string `json:"type"`
    	Filterable bool   `json:"filterable"`
    	Sortable   bool   `json:"sortable"`
    	Editable   bool   `json:"editable"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range items {
    	fmt.Println(item.Name, item.Type)
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
                "name": "formActive",
                "type": "bool",
                "filterable": false,
                "sortable": false,
                "editable": false
            },
            {
                "name": "resourcesReady",
                "type": "bool",
                "filterable": false,
                "sortable": false,
                "editable": false
            },
            {
                "name": "publicUrl",
                "type": "string",
                "filterable": false,
                "sortable": false,
                "editable": false
            },
            {
                "name": "inline",
                "type": "object",
                "filterable": false,
                "sortable": false,
                "editable": false
            },
            {
                "name": "click",
                "type": "object",
                "filterable": false,
                "sortable": false,
                "editable": true
            },
            {
                "name": "auto",
                "type": "object",
                "filterable": false,
                "sortable": false,
                "editable": true
            }
        ]
    },
    "time": {
        "start": 1792594763,
        "finish": 1792594763.576558,
        "duration": 0.5765581130981445,
        "processing": 0,
        "date_start": "2026-10-21T17:59:23+03:00",
        "date_finish": "2026-10-21T17:59:23+03:00",
        "operating_reset_at": 1792595340,
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
|| **items**
[`array`](../../../data-types.md) | Массив описаний полей. Состав каждого описания зависит от `select` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя и scope `crm` ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `DtoFieldDto` | Передайте `select` как массив строк из списка: `name`, `type`, `title`, `description`, `validationRules`, `requiredGroups`, `filterable`, `sortable`, `editable`, `editableGroups`, `multiple`, `elementType` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-embedding-field-get.md)
- [{#T}](./crm-form-embedding-get.md)
- [{#T}](./index.md)
