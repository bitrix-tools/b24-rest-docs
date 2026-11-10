# Получить поле сотрудника humanresources.employee.field.get

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

Метод `humanresources.employee.field.get` возвращает описание поля сотрудника по имени.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Имя поля, описание которого нужно получить.

Доступные поля:

- `userId` — идентификатор пользователя
- `name` — имя сотрудника
- `workPosition` — должность
- `avatar` — ссылка на аватар
- `url` — ссылка на профиль
- `departments` — отделы сотрудника
- `teams` — команды сотрудника ||
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

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.employee.field.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"userId","select":["name","type","title","description","validationRules","requiredGroups","filterable","sortable","editable","multiple","elementType"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.employee.field.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"name":"userId","select":["name","type","title","description","validationRules","requiredGroups","filterable","sortable","editable","multiple","elementType"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.employee.field.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EmployeeFieldGetResult = {
      item: {
        description: string | null
        editable: boolean
        elementType: string | null
        filterable: boolean
        multiple: boolean
        name: string
        requiredGroups: string[] | null
        sortable: boolean
        title: string
        type: string
        validationRules: unknown[]
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<EmployeeFieldGetResult>({
        method: 'humanresources.employee.field.get',
        params: {
          name: 'userId',
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
        console.info(result.item.name, result.item.type, result.item.title)
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
      async function getEmployeeField() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'humanresources.employee.field.get',
            params: {
              name: 'userId',
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
          console.info(result.item.name, result.item.type, result.item.title)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getEmployeeField)
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
        bitrix_response = client.humanresources.employee.field.get(
            name='userId',
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
                'humanresources.employee.field.get',
                [
                    'name' => 'userId',
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
        'humanresources.employee.field.get',
        {
            name: 'userId',
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
        'humanresources.employee.field.get',
        [
            'name' => 'userId',
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
    res, err := client.Core().Call(ctx, "humanresources.employee.field.get", b24.Params{
    	"name":   "userId",
    	"select": []string{"name", "type", "title", "description", "validationRules", "requiredGroups", "filterable", "sortable", "editable", "multiple", "elementType"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("humanresources.employee.field.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	Editable   bool   `json:"editable"`
    	Filterable bool   `json:"filterable"`
    	Multiple   bool   `json:"multiple"`
    	Name       string `json:"name"`
    	Sortable   bool   `json:"sortable"`
    	Title      string `json:"title"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Editable, item.Filterable)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
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
        }
    },
    "time": {
        "start": 1780407900,
        "finish": 1780407900.069377,
        "duration": 0.06937694549560547,
        "processing": 0,
        "date_start": "2026-06-02T16:45:00+03:00",
        "date_finish": "2026-06-02T16:45:00+03:00",
        "operating_reset_at": 1780408500,
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
|| **result.item**
[`object`](../../data-types.md) | Описание поля сотрудника. [Свойства объекта](#item) зависят от `select` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

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
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле `name` не указано",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Обязательное поле `name` не указано | Передайте имя поля ||
|#

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

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`, HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Поле `#FIELD#` не найдено | Укажите одно из имен, перечисленных у параметра `name` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-employee-field-list.md)
- [{#T}](./index.md)
