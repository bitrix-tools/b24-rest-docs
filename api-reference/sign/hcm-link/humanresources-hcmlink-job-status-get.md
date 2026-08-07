# Получить статус задания HCM Link humanresources.hcmlink.job.status.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources.hcmlink`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `humanresources.hcmlink.job.status.get` проверяет, активно ли задание синхронизации HCM Link.

Метод работает только в контексте авторизации [приложения](../../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор задания синхронизации.

Идентификатор приходит в поле `jobId` событий `OnHumanResourcesHcmLinkEmployeeListRequested`, `OnHumanResourcesHcmLinkFieldValueRequested`, `OnHumanResourcesHcmLinkEmployeeListMapped`, `OnHumanResourcesHcmLinkPinRequested` или `OnHumanResourcesHcmLinkSalaryVacationRequested` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":101,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/humanresources.hcmlink.job.status.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make({
        method: 'humanresources.hcmlink.job.status.get',
        params: {
          id: 101,
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
      async function getHcmLinkJobStatus() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'humanresources.hcmlink.job.status.get',
            params: {
              id: 101
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

      document.addEventListener('DOMContentLoaded', getHcmLinkJobStatus)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.hcmlink.job.status.get',
                [
                    'id' => 101,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting job status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'humanresources.hcmlink.job.status.get',
        {
            id: 101
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
        'humanresources.hcmlink.job.status.get',
        [
            'id' => 101,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "humanresources.hcmlink.job.status.get", b24.Params{
    	"id": 101,
    })
    if err != nil {
    	return fmt.Errorf("humanresources.hcmlink.job.status.get: %w", err)
    }

    var result struct {
    	Alive bool `json:"alive"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Alive)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "alive": true
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
[`object`](../../data-types.md) | Информация о состоянии задания ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result

#|
|| **Название**
`тип` | **Описание** ||
|| **alive**
[`boolean`](../../data-types.md) | Признак активного задания. Возвращает `true`, если задание не завершено ||
|#

## Обработка ошибок

HTTP-статус: **200**, **403**

```json
{
    "error": 0,
    "error_description": "Operation failed"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `0` | Operation failed | Задание не найдено ||
|| `ACCESS_DENIED` | Access denied! Access denied. | Пользователь не является администратором ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван не в контексте приложения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-hcmlink-job-update.md)
- [{#T}](./humanresources-hcmlink-field-value-set.md)
