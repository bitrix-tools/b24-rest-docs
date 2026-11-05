# Получить список полей сотрудника humanresources.employee.field.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `humanresources.employee.field.list` возвращает описания доступных полей сотрудника: имя, тип и признаки каждого поля. Например, у поля `workPosition` тип `string`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Какие свойства описания поля вернуть в ответе. Если `select` не передан, метод вернет все свойства.

Доступные свойства:

- `name` — имя поля
- `type` — тип данных
- `title` — заголовок
- `description` — описание
- `validationRules` — правила валидации
- `requiredGroups` — операции, в которых поле обязательно
- `filterable` — доступно ли поле в фильтре
- `sortable` — доступно ли поле для сортировки
- `editable` — можно ли изменить поле
- `editableGroups` — операции, в которых поле можно задавать
- `multiple` — множественное поле или одиночное
- `elementType` — тип элемента для составных полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.employee.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","description","validationRules","requiredGroups","filterable","sortable","editable","multiple","elementType"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.employee.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","description","validationRules","requiredGroups","filterable","sortable","editable","multiple","elementType"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.employee.field.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldItem = {
      name: string
      type: string
      title: string
      description: string | null
      validationRules: unknown[]
      requiredGroups: unknown | null
      filterable: boolean
      sortable: boolean
      editable: boolean
      multiple: boolean
      elementType: string | null
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EmployeeFieldListResult = {
      items: FieldItem[]
    }

    try {
      const response = await $b24.actions.v3.call.make<EmployeeFieldListResult>({
        method: 'humanresources.employee.field.list',
        params: {
          select: [
            'name',
            'type',
            'title',
            'description',
            'validationRules',
            'requiredGroups',
            'filterable',
            'sortable',
            'editable',
            'multiple',
            'elementType',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Employee fields count:', result.items.length, result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getEmployeeFieldList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'humanresources.employee.field.list',
            params: {
              select: [
                'name',
                'type',
                'title',
                'description',
                'validationRules',
                'requiredGroups',
                'filterable',
                'sortable',
                'editable',
                'multiple',
                'elementType',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Employee fields count:', result.items.length, result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEmployeeFieldList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    select = [
        "name",
        "type",
        "title",
        "description",
        "validationRules",
        "requiredGroups",
        "filterable",
        "sortable",
        "editable",
        "multiple",
        "elementType",
    ]

    try:
        bitrix_response = client.humanresources.employee.field.list(
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
                'humanresources.employee.field.list',
                [
                    'select' => [
                        'name',
                        'type',
                        'title',
                        'description',
                        'validationRules',
                        'requiredGroups',
                        'filterable',
                        'sortable',
                        'editable',
                        'multiple',
                        'elementType',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'humanresources.employee.field.list',
        {
            select: [
                'name',
                'type',
                'title',
                'description',
                'validationRules',
                'requiredGroups',
                'filterable',
                'sortable',
                'editable',
                'multiple',
                'elementType'
            ]
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'humanresources.employee.field.list',
        [
            'select' => [
                'name',
                'type',
                'title',
                'description',
                'validationRules',
                'requiredGroups',
                'filterable',
                'sortable',
                'editable',
                'multiple',
                'elementType',
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
    res, err := client.Core().Call(ctx, "humanresources.employee.field.list", b24.Params{
    	"select": []string{"name", "type", "title", "description", "validationRules", "requiredGroups", "filterable", "sortable", "editable", "multiple", "elementType"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("humanresources.employee.field.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	Editable   bool   `json:"editable"`
    	Filterable bool   `json:"filterable"`
    	Multiple   bool   `json:"multiple"`
    	Name       string `json:"name"`
    	Sortable   bool   `json:"sortable"`
    	Title      string `json:"title"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Editable)
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
                "description": null,
                "editable": false,
                "elementType": null,
                "filterable": false,
                "multiple": false,
                "name": "userId",
                "requiredGroups": null,
                "sortable": false,
                "title": "userId",
                "type": "int",
                "validationRules": []
            },
            {
                "description": null,
                "editable": false,
                "elementType": null,
                "filterable": false,
                "multiple": false,
                "name": "name",
                "requiredGroups": null,
                "sortable": false,
                "title": "name",
                "type": "string",
                "validationRules": []
            },
            {
                "description": null,
                "editable": false,
                "elementType": null,
                "filterable": false,
                "multiple": false,
                "name": "workPosition",
                "requiredGroups": null,
                "sortable": false,
                "title": "workPosition",
                "type": "string",
                "validationRules": []
            },
            {
                "description": null,
                "editable": false,
                "elementType": null,
                "filterable": false,
                "multiple": false,
                "name": "avatar",
                "requiredGroups": null,
                "sortable": false,
                "title": "avatar",
                "type": "string",
                "validationRules": []
            },
            {
                "description": null,
                "editable": false,
                "elementType": null,
                "filterable": false,
                "multiple": false,
                "name": "url",
                "requiredGroups": null,
                "sortable": false,
                "title": "url",
                "type": "string",
                "validationRules": []
            },
            {
                "description": null,
                "editable": false,
                "elementType": null,
                "filterable": false,
                "multiple": false,
                "name": "departments",
                "requiredGroups": null,
                "sortable": false,
                "title": "departments",
                "type": "array",
                "validationRules": []
            },
            {
                "description": null,
                "editable": false,
                "elementType": null,
                "filterable": false,
                "multiple": false,
                "name": "teams",
                "requiredGroups": null,
                "sortable": false,
                "title": "teams",
                "type": "array",
                "validationRules": []
            }
        ]
    },
    "time": {
        "start": 1780407800,
        "finish": 1780407800.071511,
        "duration": 0.07151103019714355,
        "processing": 0,
        "date_start": "2026-06-02T16:43:20+03:00",
        "date_finish": "2026-06-02T16:43:20+03:00",
        "operating_reset_at": 1780408400,
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
[`array`](../../data-types.md) | Описания полей сотрудника. [Свойства каждого элемента](#items) зависят от `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива items {#items}

Состав описания зависит от `select`, в таблице — все свойства, которые можно запросить. Поля сотрудника доступны только для чтения, поэтому признаки у всех полей одинаковые: например, `editable` у всех полей `false`.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Имя поля: `userId`, `name`, `workPosition`, `avatar`, `url`, `departments`, `teams` ||
|| **type**
[`string`](../../data-types.md) | Тип поля: `int` у `userId`, `array` у `departments` и `teams`, `string` у остальных полей ||
|| **title**
[`string`](../../data-types.md) | Заголовок поля. Совпадает с `name` ||
|| **description**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Описание поля. Для всех полей — `null` ||
|| **validationRules**
[`array`](../../data-types.md) | Правила валидации. Для всех полей — пустой массив `[]` ||
|| **requiredGroups**
[`array`](../../data-types.md) \| [`null`](../../data-types.md) | Операции, в которых поле обязательно. Для всех полей — `null` ||
|| **filterable**
[`boolean`](../../data-types.md) | `true` — поле доступно в фильтре, `false` — недоступно. Для всех полей — `false` ||
|| **sortable**
[`boolean`](../../data-types.md) | `true` — поле доступно для сортировки, `false` — недоступно. Для всех полей — `false` ||
|| **editable**
[`boolean`](../../data-types.md) | `true` — поле можно изменить, `false` — нельзя. Для всех полей — `false` ||
|| **editableGroups**
[`array`](../../data-types.md) \| [`null`](../../data-types.md) | Операции, в которых поле можно задавать. Для всех полей — `null` ||
|| **multiple**
[`boolean`](../../data-types.md) | `true` — поле множественное, `false` — одиночное. Для всех полей — `false` ||
|| **elementType**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Тип элемента составного поля. Для всех полей — `null` ||
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

#### Ошибки в параметре `select`

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для объекта `DtoFieldDto` | Передайте в `select` только свойства из описания параметра ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-employee-field-get.md)
- [{#T}](./index.md)
