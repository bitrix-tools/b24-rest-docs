# Получить сотрудников в нескольких отделах humanresources.employee.multidepartment

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources`](../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь, привязанный к отделу в структуре компании

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `humanresources.employee.multidepartment` возвращает сотрудников, которые состоят в нескольких отделах, и список этих отделов для каждого сотрудника. За один вызов возвращаются все такие сотрудники компании. Отделы считаются без учета прав текущего пользователя.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/humanresources.employee.multidepartment`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/humanresources.employee.multidepartment
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/humanresources.employee.multidepartment
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type MultidepartmentResult = {
      employees: {
        userId: number
        name: string
        workPosition: string | null
        departments: {
          id: number
          name: string
        }[]
      }[]
      total: number
    }

    try {
      const response = await $b24.actions.v3.call.make<MultidepartmentResult>({
        method: 'humanresources.employee.multidepartment',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Total employees in multiple departments:', result.total)
        console.info('Employees:', result.employees)
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
      async function getMultidepartmentEmployees() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'humanresources.employee.multidepartment',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Total employees in multiple departments:', result.total)
          console.info('Employees:', result.employees)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getMultidepartmentEmployees)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.humanresources.employee.multidepartment().response
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
                'humanresources.employee.multidepartment',
                []
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
        'humanresources.employee.multidepartment',
        {},
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
        'humanresources.employee.multidepartment',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "humanresources.employee.multidepartment", nil)
    if err != nil {
    	return fmt.Errorf("humanresources.employee.multidepartment: %w", err)
    }

    var item struct {
    	Total int `json:"total"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Total)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "employees": [
            {
                "userId": 7,
                "name": "Иван Петров",
                "workPosition": null,
                "departments": [
                    {
                        "id": 15,
                        "name": "Отдел продаж"
                    },
                    {
                        "id": 22,
                        "name": "Отдел развития"
                    }
                ]
            },
            {
                "userId": 11,
                "name": "Мария Иванова",
                "workPosition": "Руководитель отдела",
                "departments": [
                    {
                        "id": 22,
                        "name": "Отдел развития"
                    },
                    {
                        "id": 31,
                        "name": "Проектный офис"
                    }
                ]
            }
        ],
        "total": 2
    },
    "time": {
        "start": 1780407700,
        "finish": 1780407700.166208,
        "duration": 0.16620802879333496,
        "processing": 0.12675189971923828,
        "date_start": "2026-06-02T16:41:40+03:00",
        "date_finish": "2026-06-02T16:41:40+03:00",
        "operating_reset_at": 1780408300,
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
|| **result.employees**
[`object[]`](../../data-types.md) | Сотрудники, которые состоят в нескольких отделах. [Поля элемента](#employees). Если таких сотрудников нет, массив пустой ||
|| **result.total**
[`integer`](../../data-types.md) | Количество сотрудников в `employees` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива employees {#employees}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../data-types.md) | Имя и фамилия сотрудника ||
|| **workPosition**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Должность сотрудника. Если должность не указана, возвращается `null` ||
|| **departments**
[`object[]`](../../data-types.md) | Отделы сотрудника без команд. Поля элемента:
- `id` — идентификатор отдела, `integer`
- `name` — название отдела, `string` ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION",
        "message": "Доступ запрещен"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что текущий пользователь привязан к отделу в структуре компании ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-employee-search.md)
- [{#T}](./humanresources-employee-count.md)
- [{#T}](./index.md)
