# Получить список полей участника отдела humanresources.node.member.field.list

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

Метод `humanresources.node.member.field.list` возвращает список доступных полей участника отдела или команды.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../data-types.md) | Список полей описания, которые нужно вернуть в ответе, например `["name","type"]`. Если параметр не передан, приходят все поля описания.

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
- `editableGroups` — группы редактируемости
- `multiple` — признак множественного значения
- `elementType` — тип элемента для составных полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.node.member.field.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","description","filterable","sortable"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.node.member.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["name","type","title","description","filterable","sortable"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.node.member.field.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FieldItem = {
      description: string | null
      filterable: boolean
      name: string
      sortable: boolean
      title: string
      type: string
    }

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NodeMemberFieldListResult = {
      items: FieldItem[]
    }

    try {
      const response = await $b24.actions.v3.call.make<NodeMemberFieldListResult>({
        method: 'humanresources.node.member.field.list',
        params: {
          select: [
            'name',
            'type',
            'title',
            'description',
            'filterable',
            'sortable',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Field list count:', result.items.length, result.items)
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
      async function getNodeMemberFieldList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'humanresources.node.member.field.list',
            params: {
              select: [
                'name',
                'type',
                'title',
                'description',
                'filterable',
                'sortable',
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
          console.info('Field list count:', result.items.length, result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getNodeMemberFieldList)
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
        "filterable",
        "sortable",
    ]

    try:
        bitrix_response = client.humanresources.node.member.field.list(
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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.node.member.field.list',
                [
                    'select' => [
                        'name',
                        'type',
                        'title',
                        'description',
                        'filterable',
                        'sortable',
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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'humanresources.node.member.field.list',
        {
            select: [
                'name',
                'type',
                'title',
                'description',
                'filterable',
                'sortable'
            ]
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'humanresources.node.member.field.list',
        [
            'select' => [
                'name',
                'type',
                'title',
                'description',
                'filterable',
                'sortable',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "humanresources.node.member.field.list", b24.Params{
    	"select": []string{"name", "type", "title", "description", "filterable", "sortable"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("humanresources.node.member.field.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	Filterable bool   `json:"filterable"`
    	Name       string `json:"name"`
    	Sortable   bool   `json:"sortable"`
    	Title      string `json:"title"`
    	Type       string `json:"type"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.Filterable)
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
                "name": "userId",
                "type": "int",
                "title": "userId",
                "description": null,
                "validationRules": [],
                "requiredGroups": null,
                "filterable": false,
                "sortable": false,
                "editable": false,
                "editableGroups": null,
                "multiple": false,
                "elementType": null
            },
            {
                "name": "name",
                "type": "string",
                "title": "name",
                "description": null,
                "validationRules": [],
                "requiredGroups": null,
                "filterable": false,
                "sortable": false,
                "editable": false,
                "editableGroups": null,
                "multiple": false,
                "elementType": null
            },
            {
                "name": "workPosition",
                "type": "string",
                "title": "workPosition",
                "description": null,
                "validationRules": [],
                "requiredGroups": null,
                "filterable": false,
                "sortable": false,
                "editable": false,
                "editableGroups": null,
                "multiple": false,
                "elementType": null
            },
            {
                "name": "role",
                "type": "string",
                "title": "role",
                "description": null,
                "validationRules": [],
                "requiredGroups": null,
                "filterable": false,
                "sortable": false,
                "editable": false,
                "editableGroups": null,
                "multiple": false,
                "elementType": null
            },
            {
                "name": "avatar",
                "type": "string",
                "title": "avatar",
                "description": null,
                "validationRules": [],
                "requiredGroups": null,
                "filterable": false,
                "sortable": false,
                "editable": false,
                "editableGroups": null,
                "multiple": false,
                "elementType": null
            },
            {
                "name": "url",
                "type": "string",
                "title": "url",
                "description": null,
                "validationRules": [],
                "requiredGroups": null,
                "filterable": false,
                "sortable": false,
                "editable": false,
                "editableGroups": null,
                "multiple": false,
                "elementType": null
            }
        ]
    },
    "time": {
        "start": 1795686063,
        "finish": 1795686063.709102,
        "duration": 0.7091019153594971,
        "processing": 0,
        "date_start": "2026-11-26T12:41:03+03:00",
        "date_finish": "2026-11-26T12:41:03+03:00",
        "operating_reset_at": 1795686660,
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
|| **items**
[`array`](../../data-types.md) | Массив объектов с описанием полей участника. [Описание объекта](#field) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект с описанием поля {#field}

Ключи объекта зависят от `select`.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Имя поля участника, например `userId` ||
|| **type**
[`string`](../../data-types.md) | Тип данных поля, например `int` или `string` ||
|| **title**
[`string`](../../data-types.md) | Заголовок поля. У полей участника совпадает с именем поля ||
|| **description**
[`string`](../../data-types.md) | Описание поля. У полей участника приходит `null` ||
|| **validationRules**
[`array`](../../data-types.md) | Правила валидации значения. У полей участника приходит пустой массив ||
|| **requiredGroups**
[`array`](../../data-types.md) | Группы обязательности поля. У полей участника приходит `null` ||
|| **filterable**
[`boolean`](../../data-types.md) | Можно ли использовать поле в фильтре ||
|| **sortable**
[`boolean`](../../data-types.md) | Можно ли сортировать по полю ||
|| **editable**
[`boolean`](../../data-types.md) | Можно ли изменять значение поля ||
|| **editableGroups**
[`array`](../../data-types.md) | Группы, в которых поле можно изменять. У полей участника приходит `null` ||
|| **multiple**
[`boolean`](../../data-types.md) | Является ли поле множественным ||
|| **elementType**
[`string`](../../data-types.md) | Тип элемента для составных полей. У полей участника приходит `null` ||
|#

#### Поля участника {#member-fields}

Эти поля приходят в массиве `members` метода [humanresources.node.get](../node/humanresources-node-get.md). Ни одно из них нельзя использовать в фильтре и сортировке или изменить: у всех `filterable`, `sortable` и `editable` равны `false`.

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя участника ||
|| **workPosition**
[`string`](../../data-types.md) | Должность ||
|| **role**
[`string`](../../data-types.md) | Код роли участника, например `MEMBER_HEAD`. [Коды ролей](./index.md#roles) ||
|| **avatar**
[`string`](../../data-types.md) | Ссылка на аватар ||
|| **url**
[`string`](../../data-types.md) | Ссылка на профиль пользователя ||
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
|| `-` | Неизвестное поле `foo` для сущности `DtoFieldDto` | Передайте только поля описания из списка параметра `select`. Число в `select`, например `[1]`, тоже вернет эту ошибку ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение select `["name"]` | Элемент `select` передан массивом или объектом. Передайте `select` как массив строк, например `["name","type"]` ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INSUFFICIENTSCOPEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Недостаточно прав доступа: отсутствует необходимый scope | Добавьте scope `humanresources` вебхуку или приложению ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-node-member-field-get.md)
- [{#T}](./humanresources-node-member-add.md)
- [{#T}](./index.md)

<!-- Generated by skill-1-gen-docs from source: C:\Users\g.m.tagirova\github\b24-rest-docs\api-reference\rest-v3\OpenAPI.md; C:\Users\g.m.tagirova\original-bitrix\modules\humanresources\lib\Rest\Dto\NodeMemberDto.php -->
<!-- Generated: 2026-06-25 -->
