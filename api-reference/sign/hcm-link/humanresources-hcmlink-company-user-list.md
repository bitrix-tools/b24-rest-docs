# Получить список компаний HCM Link текущего пользователя humanresources.hcmlink.company.user.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`humanresources.hcmlink`](../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь

Метод `humanresources.hcmlink.company.user.list` возвращает компании из системы кадрового учета, связанные с текущим пользователем Битрикс24.

Метод работает только в контексте авторизации [приложения](../../../settings/app-installation/index.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество записей на странице.

Допустимые значения — от 1 до 1000. По умолчанию 100 ||
|| **offset**
[`integer`](../../data-types.md) | Смещение для постраничной навигации.

По умолчанию 0 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"limit":50,"offset":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/humanresources.hcmlink.company.user.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make({
        method: 'humanresources.hcmlink.company.user.list',
        params: {
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
      async function getUserHcmLinkCompanies() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'humanresources.hcmlink.company.user.list',
            params: {
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

      document.addEventListener('DOMContentLoaded', getUserHcmLinkCompanies)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'humanresources.hcmlink.company.user.list',
                [
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
        echo 'Error getting user companies: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'humanresources.hcmlink.company.user.list',
        {
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
        'humanresources.hcmlink.company.user.list',
        [
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
    res, err := client.Core().Call(ctx, "humanresources.hcmlink.company.user.list", b24.Params{
    	"limit":  50,
    	"offset": 0,
    })
    if err != nil {
    	return fmt.Errorf("humanresources.hcmlink.company.user.list: %w", err)
    }

    var items []struct {
    	ID           int            `json:"id"`
    	Company      string         `json:"company"`
    	CrmCompanyID int            `json:"crmCompanyId"`
    	Title        string         `json:"title"`
    	Data         map[string]any `json:"data"`
    	Person       string         `json:"person"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range items {
    	fmt.Println(item.ID, item.Company, item.Person)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "id": 15,
            "company": "hr-company-001",
            "crmCompanyId": 12,
            "title": "ООО Ромашка",
            "data": {
                "inn": "1234567890"
            },
            "person": "person-001"
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
[`array`](../../data-types.md) | Список компаний HCM Link, связанных с текущим пользователем [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор компании HCM Link ||
|| **company**
[`string`](../../data-types.md) | Код компании в системе кадрового учета ||
|| **crmCompanyId**
[`integer`](../../data-types.md) | Идентификатор компании CRM ||
|| **title**
[`string`](../../data-types.md) | Название компании ||
|| **data**
[`object`](../../data-types.md) | Дополнительные данные компании ||
|| **person**
[`string`](../../data-types.md) | Код физического лица в системе кадрового учета ||
|#

## Обработка ошибок

HTTP-статус: **200**, **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Application context required"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `ACCESS_DENIED` | User authorization required. | Пользователь не авторизован ||
|| `WRONG_AUTH_TYPE` | Application context required | Метод вызван не в контексте приложения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./humanresources-hcmlink-company-list.md)
- [{#T}](./humanresources-hcmlink-employee-list.md)
