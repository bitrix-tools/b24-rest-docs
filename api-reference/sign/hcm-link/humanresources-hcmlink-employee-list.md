# Получить список сопоставленных сотрудников HCM Link humanresources.hcmlink.employee.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources.hcmlink`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `humanresources.hcmlink.employee.list` возвращает список сопоставленных сотрудников системы кадрового учета и Битрикс24.

Метод работает только в контексте авторизации [приложения](../../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **company***
[`string`](../../data-types.md) | Код компании в системе кадрового учета.

Получить код можно методом [humanresources.hcmlink.company.list](./humanresources-hcmlink-company-list.md) ||
|| **limit**
[`integer`](../../data-types.md) | Количество записей на странице.

Допустимые значения — от 1 до 1000. По умолчанию 100 ||
|| **offset**
[`integer`](../../data-types.md) | Смещение для постраничной навигации.

По умолчанию 0 ||
|| **updatedAt**
[`string`](../../data-types.md) | Дата изменения в формате ISO 8601. Если передана, метод вернет записи, измененные после этой даты ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"company":"hr-company-001","limit":50,"offset":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/humanresources.hcmlink.employee.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make({
        method: 'humanresources.hcmlink.employee.list',
        params: {
          company: 'hr-company-001',
          limit: 50,
          offset: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getHcmLinkEmployees() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'humanresources.hcmlink.employee.list',
            params: {
              company: 'hr-company-001',
              limit: 50,
              offset: 0
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info(response.getData().result)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getHcmLinkEmployees)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.hcmlink.employee.list',
                [
                    'company' => 'hr-company-001',
                    'limit' => 50,
                    'offset' => 0,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting employees: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'humanresources.hcmlink.employee.list',
        {
            company: 'hr-company-001',
            limit: 50,
            offset: 0
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'humanresources.hcmlink.employee.list',
        [
            'company' => 'hr-company-001',
            'limit' => 50,
            'offset' => 0,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "humanresources.hcmlink.employee.list", b24.Params{
    	"company": "hr-company-001",
    	"limit":   50,
    	"offset":  0,
    })
    if err != nil {
    	return fmt.Errorf("humanresources.hcmlink.employee.list: %w", err)
    }

    var items []struct {
    	ID        int `json:"id"`
    	Company   string `json:"company"`
    	Person    string `json:"person"`
    	Employees []struct {
    		ID        int            `json:"id"`
    		Employee  string         `json:"employee"`
    		Data      map[string]any `json:"data"`
    		CreatedAt string         `json:"createdAt"`
    	} `json:"employees"`
    	UserID    int    `json:"userId"`
    	Title     string `json:"title"`
    	CreatedAt string `json:"createdAt"`
    	UpdatedAt string `json:"updatedAt"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range items {
    	fmt.Println(item.ID, item.Person, item.UserID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "id": 7,
            "company": "hr-company-001",
            "person": "person-001",
            "employees": [
                {
                    "id": 21,
                    "employee": "employee-001",
                    "data": {
                        "position": "Менеджер"
                    },
                    "createdAt": "2026-08-06T19:51:02+03:00"
                }
            ],
            "userId": 25,
            "title": "Иван Петров",
            "createdAt": "2026-08-06T19:51:02+03:00",
            "updatedAt": "2026-08-06T19:51:02+03:00"
        }
    ],
    "time": {
        "start": 1739860000.123,
        "finish": 1739860000.456,
        "duration": 0.333,
        "processing": 0.111,
        "date_start": "2026-08-06T19:51:02+03:00",
        "date_finish": "2026-08-06T19:51:02+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Список сопоставленных сотрудников [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор физического лица в HCM Link ||
|| **company**
[`string`](../../data-types.md) | Код компании в системе кадрового учета ||
|| **person**
[`string`](../../data-types.md) | Код физического лица в системе кадрового учета ||
|| **employees**
[`array`](../../data-types.md) | Список сотрудников системы кадрового учета, связанных с физическим лицом [(подробное описание)](#employees) ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя Битрикс24 ||
|| **title**
[`string`](../../data-types.md) | Имя сотрудника ||
|| **createdAt**
[`string`](../../data-types.md) | Дата создания в формате ISO 8601 ||
|| **updatedAt**
[`string`](../../data-types.md) | Дата изменения в формате ISO 8601 ||
|#

#### Элемент массива employees {#employees}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор сотрудника HCM Link ||
|| **employee**
[`string`](../../data-types.md) | Код сотрудника в системе кадрового учета ||
|| **data**
[`object`](../../data-types.md) | Данные сотрудника ||
|| **createdAt**
[`string`](../../data-types.md) | Дата создания в формате ISO 8601 ||
|#

## Обработка ошибок

HTTP-статус: **200**, **403**

```json
{
    "error": 510,
    "error_description": "Operation failed"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `510` | Operation failed | Компания не найдена или не передан параметр `company` ||
|| `ACCESS_DENIED` | Access denied! Access denied. | Пользователь не является администратором ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван не в контексте приложения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-hcmlink-employee-set.md)
- [{#T}](./humanresources-hcmlink-field-value-set.md)
