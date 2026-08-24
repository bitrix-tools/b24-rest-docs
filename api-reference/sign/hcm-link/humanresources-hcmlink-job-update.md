# Обновить задание HCM Link humanresources.hcmlink.job.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources.hcmlink`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `humanresources.hcmlink.job.update` обновляет задание синхронизации HCM Link.

Метод работает только в контексте авторизации [приложения](../../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор задания синхронизации.

Идентификатор приходит в поле `jobId` событий `OnHumanResourcesHcmLinkEmployeeListRequested`, `OnHumanResourcesHcmLinkFieldValueRequested`, `OnHumanResourcesHcmLinkEmployeeListMapped`, `OnHumanResourcesHcmLinkPinRequested` или `OnHumanResourcesHcmLinkSalaryVacationRequested` ||
|| **fields***
[`object`](../../data-types.md) | Данные задания [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

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
    -d '{"id":101,"fields":{"status":"DONE","total":10,"sent":10,"data":{"batch":"2026-08-06"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/humanresources.hcmlink.job.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make({
        method: 'humanresources.hcmlink.job.update',
        params: {
          id: 101,
          fields: {
            status: 'DONE',
            total: 10,
            sent: 10,
            data: {
              batch: '2026-08-06',
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
      async function updateHcmLinkJob() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'humanresources.hcmlink.job.update',
            params: {
              id: 101,
              fields: {
                status: 'DONE',
                total: 10,
                sent: 10,
                data: {
                  batch: '2026-08-06'
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

      document.addEventListener('DOMContentLoaded', updateHcmLinkJob)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.hcmlink.job.update',
                [
                    'id' => 101,
                    'fields' => [
                        'status' => 'DONE',
                        'total' => 10,
                        'sent' => 10,
                        'data' => [
                            'batch' => '2026-08-06',
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
        echo 'Error updating job: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'humanresources.hcmlink.job.update',
        { id: 101, fields: { status: 'DONE', total: 10, sent: 10, data: { batch: '2026-08-06' } } },
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
        'humanresources.hcmlink.job.update',
        [
            'id' => 101,
            'fields' => [
                'status' => 'DONE',
                'total' => 10,
                'sent' => 10,
                'data' => [
                    'batch' => '2026-08-06',
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
    res, err := client.Core().Call(ctx, "humanresources.hcmlink.job.update", b24.Params{
    	"id": 101,
    	"fields": b24.Params{
    		"status": "DONE",
    		"total":  10,
    		"sent":   10,
    		"data": b24.Params{
    			"batch": "2026-08-06",
    		},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("humanresources.hcmlink.job.update: %w", err)
    }

    var updated bool
    if err := json.Unmarshal(res.Result, &updated); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(updated)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
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
[`boolean`](../../data-types.md) | Возвращает `true`, если задание обновлено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **200**, **403**

```json
{
    "result": {
        "error": 0,
        "error_description": "Operation failed"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `0` | Operation failed | Задание не найдено или передан неактуальный статус ||
|| `ACCESS_DENIED` | Access denied! Access denied. | Пользователь не является администратором ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван не в контексте приложения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-hcmlink-job-status-get.md)
- [{#T}](./humanresources-hcmlink-field-value-set.md)
