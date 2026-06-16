# Получить поле сотрудника humanresources.employee.field.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `humanresources.employee.field.get` возвращает описание поля сотрудника по имени.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Имя поля, описание которого нужно получить.

Доступные поля:

- `userId` — идентификатор пользователя
- `name` — имя сотрудника
- `workPosition` — должность
- `avatar` — ссылка на аватар
- `url` — ссылка на профиль
- `departments` — отделы сотрудника
- `teams` — команды сотрудника ||
|| **select**
[`array`](../../../data-types.md) | Список полей описания, которые нужно вернуть в ответе.

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
- `multiple` — признак множественного значения
- `elementType` — тип элемента для составных полей ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/humanresources.employee.field.get`

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

- PHP

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

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
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../../data-types.md) | Объект с описанием поля. Структура ответа зависит от `select` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

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
|| `select` | Неизвестное поле `#FIELD#` для объекта `DtoFieldDto` | Передайте только поля описания из списка ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `#SELECT#` | Передайте `select` как массив строк ||
|#

#### Ошибки нахождения данных

Код ошибки: `BITRIX_REST_V3_REALISATION_EXCEPTION_FIELDNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Поле `#FIELD#` не найдено | Укажите существующее имя поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-employee-field-list.md)
- [{#T}](./index.md)
