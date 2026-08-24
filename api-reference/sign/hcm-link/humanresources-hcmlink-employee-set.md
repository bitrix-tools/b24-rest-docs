# Передать список сотрудников HCM Link humanresources.hcmlink.employee.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources.hcmlink`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `humanresources.hcmlink.employee.set` передает список сотрудников из системы кадрового учета в интеграцию HCM Link.

Метод работает только в контексте авторизации [приложения](../../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **company***
[`string`](../../data-types.md) | Код компании в системе кадрового учета.

Получить код можно методом [humanresources.hcmlink.company.list](./humanresources-hcmlink-company-list.md) ||
|| **data***
[`array`](../../data-types.md) | Список сотрудников из системы кадрового учета [(подробное описание)](#data) ||
|| **job**
[`object`](../../data-types.md) | Данные для обновления задания синхронизации [(подробное описание)](#job).

Передавайте параметр, если метод выполняется в ответ на событие `OnHumanResourcesHcmLinkEmployeeListRequested`. Идентификатор задания приходит в событии в поле `jobId` ||
|#

### Элемент массива data {#data}

#|
|| **Название**
`тип` | **Описание** ||
|| **employee***
[`string`](../../data-types.md) | Код сотрудника в системе кадрового учета ||
|| **person***
[`string`](../../data-types.md) | Код физического лица в системе кадрового учета ||
|| **userId**
[`integer`](../../data-types.md) | Идентификатор пользователя Битрикс24.

Получить идентификатор можно методом [user.get](../../user/user-get.md) ||
|| **data***
[`object`](../../data-types.md) | Данные сотрудника [(подробное описание)](#employee-data). Объект должен содержать хотя бы одно поле с непустым значением ||
|#

### Параметр data.data {#employee-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **firstName**
[`string`](../../data-types.md) | Имя ||
|| **lastName**
[`string`](../../data-types.md) | Фамилия ||
|| **patronymicName**
[`string`](../../data-types.md) | Отчество ||
|#

### Параметр job {#job}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор задания синхронизации.

Приходит в событии `OnHumanResourcesHcmLinkEmployeeListRequested` в поле `jobId` ||
|| **fields***
[`object`](../../data-types.md) | Новые данные задания синхронизации [(подробное описание)](#job-fields) ||
|#

### Параметр job.fields {#job-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **status***
[`string`](../../data-types.md) | Новый статус задания.

Возможные значения:

- `IN_PROGRESS` — выполняется
- `DONE` — выполнено
- `CANCELED` — отменено ||
|| **total**
[`integer`](../../data-types.md) | Общее количество элементов в задании ||
|| **sent**
[`integer`](../../data-types.md) | Количество обработанных элементов ||
|| **data**
[`object`](../../data-types.md) | Дополнительные данные задания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"company":"hr-company-001","data":[{"employee":"employee-001","person":"person-001","userId":25,"data":{"firstName":"Иван","lastName":"Петров","patronymicName":"Иванович","position":"Менеджер"}}],"job":{"id":101,"fields":{"status":"DONE","total":1,"sent":1}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/humanresources.hcmlink.employee.set
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make({
        method: 'humanresources.hcmlink.employee.set',
        params: {
          company: 'hr-company-001',
          data: [
            {
              employee: 'employee-001',
              person: 'person-001',
              userId: 25,
              data: {
                firstName: 'Иван',
                lastName: 'Петров',
                patronymicName: 'Иванович',
                position: 'Менеджер',
              },
            },
          ],
          job: {
            id: 101,
            fields: {
              status: 'DONE',
              total: 1,
              sent: 1,
            },
          },
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
      async function setHcmLinkEmployees() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'humanresources.hcmlink.employee.set',
            params: {
              company: 'hr-company-001',
              data: [
                {
                  employee: 'employee-001',
                  person: 'person-001',
                  userId: 25,
                  data: {
                    firstName: 'Иван',
                    lastName: 'Петров',
                    patronymicName: 'Иванович',
                    position: 'Менеджер'
                  }
                }
              ],
              job: {
                id: 101,
                fields: {
                  status: 'DONE',
                  total: 1,
                  sent: 1
                }
              }
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

      document.addEventListener('DOMContentLoaded', setHcmLinkEmployees)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.hcmlink.employee.set',
                [
                    'company' => 'hr-company-001',
                    'data' => [
                        [
                            'employee' => 'employee-001',
                            'person' => 'person-001',
                            'userId' => 25,
                            'data' => [
                                'firstName' => 'Иван',
                                'lastName' => 'Петров',
                                'patronymicName' => 'Иванович',
                                'position' => 'Менеджер',
                            ],
                        ],
                    ],
                    'job' => [
                        'id' => 101,
                        'fields' => [
                            'status' => 'DONE',
                            'total' => 1,
                            'sent' => 1,
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting employees: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'humanresources.hcmlink.employee.set',
        {
            company: 'hr-company-001',
            data: [{ employee: 'employee-001', person: 'person-001', userId: 25, data: { firstName: 'Иван', lastName: 'Петров' } }],
            job: { id: 101, fields: { status: 'DONE', total: 1, sent: 1 } }
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
        'humanresources.hcmlink.employee.set',
        [
            'company' => 'hr-company-001',
            'data' => [
                [
                    'employee' => 'employee-001',
                    'person' => 'person-001',
                    'userId' => 25,
                    'data' => [
                        'firstName' => 'Иван',
                        'lastName' => 'Петров',
                        'patronymicName' => 'Иванович',
                        'position' => 'Менеджер',
                    ],
                ],
            ],
            'job' => [
                'id' => 101,
                'fields' => [
                    'status' => 'DONE',
                    'total' => 1,
                    'sent' => 1,
                ],
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
    res, err := client.Core().Call(ctx, "humanresources.hcmlink.employee.set", b24.Params{
    	"company": "hr-company-001",
    	"data": []b24.Params{
    		{
    			"employee": "employee-001",
    			"person":   "person-001",
    			"userId":   25,
    			"data": b24.Params{
    				"firstName":      "Иван",
    				"lastName":       "Петров",
    				"patronymicName": "Иванович",
    				"position":       "Менеджер",
    			},
    		},
    	},
    	"job": b24.Params{
    		"id": 101,
    		"fields": b24.Params{
    			"status": "DONE",
    			"total":  1,
    			"sent":   1,
    		},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("humanresources.hcmlink.employee.set: %w", err)
    }

    var result struct {
    	Status string   `json:"status"`
    	Errors []string `json:"errors"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Status, result.Errors)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "status": "ok",
        "errors": []
    },
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
[`object`](../../data-types.md) | Результат обработки списка сотрудников ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result

#|
|| **Название**
`тип` | **Описание** ||
|| **status**
[`string`](../../data-types.md) | Статус обработки.

Возможные значения:

- `ok` — список обработан без ошибок
- `error` — при обработке возникли ошибки ||
|| **errors**
[`array`](../../data-types.md) | Список ошибок обработки элементов ||
|#

## Обработка ошибок

HTTP-статус: **200**, **403**

```json
{
    "result": {
        "status": "error",
        "errors": [
            "Parameter 'data' must be a non empty array "
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `0` | Operation failed | Не удалось обновить задание синхронизации, переданное в параметре `job` ||
|| `-` | Parameter 'data' must be a non empty array | Не передан список сотрудников ||
|| `-` | Item #... should have not empty 'employee', 'person', 'data' | В элементе списка нет обязательных полей ||
|| `ACCESS_DENIED` | Access denied! Access denied. | Пользователь не является администратором ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван не в контексте приложения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-hcmlink-employee-list.md)
- [{#T}](./humanresources-hcmlink-field-value-set.md)
- [{#T}](./humanresources-hcmlink-job-update.md)
