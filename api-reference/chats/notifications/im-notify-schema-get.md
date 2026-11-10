# Получить схему типов уведомлений im.notify.schema.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.schema.get` возвращает типы уведомлений портала, сгруппированные по модулям.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify.schema.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify.schema.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    // Keys of result are module codes: blog, calendar, tasks and so on
    type NotificationSchemaResult = Record<string, ModuleSchema>

    type ModuleSchema = {
      NAME: string
      MODULE_ID: string
      LIST: Array<{
        ID: string
        NAME: string
      }>
    }

    try {
      const response = await $b24.actions.v2.call.make<NotificationSchemaResult>({
        method: 'im.notify.schema.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        for (const module of Object.values(result)) {
          console.info(module.NAME, module.LIST.map((item) => item.ID))
        }
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
      async function getNotificationSchema() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.notify.schema.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          for (const module of Object.values(result)) {
            console.info(module.NAME, module.LIST.map((item) => item.ID))
          }
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getNotificationSchema)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.im.notify.schema.get().response
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

    ```php
    try {
        $response = $b24Service->core->call('im.notify.schema.get', []);
        $result = $response->getResponseData()->getResult();

        print_r($result);
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('im.notify.schema.get', {}, function(result) {
        if (result.error()) {
            console.error(result.error().ex);
        } else {
            console.log(result.data());
        }
    });
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call('im.notify.schema.get', []);

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        var_dump($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.notify.schema.get", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("im.notify.schema.get: %w", err)
    }

    // Ключи result — коды модулей: blog, calendar, tasks и другие
    var modules map[string]struct {
    	Name     string `json:"NAME"`
    	ModuleID string `json:"MODULE_ID"`
    	List     []struct {
    		ID   string `json:"ID"`
    		Name string `json:"NAME"`
    	} `json:"LIST"`
    }
    if err := json.Unmarshal(res.Result, &modules); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for code, module := range modules {
    	fmt.Println(code, module.Name, len(module.List))
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "tasks": {
            "NAME": "Задачи",
            "MODULE_ID": "tasks",
            "LIST": [
                {
                    "ID": "tasks|comment",
                    "NAME": "Новый комментарий к задаче"
                },
                {
                    "ID": "tasks|reminder",
                    "NAME": "Напоминание о задаче"
                },
                {
                    "ID": "tasks|manage",
                    "NAME": "Создание или изменение задачи"
                },
                {
                    "ID": "tasks|task_assigned",
                    "NAME": "Вас назначили исполнителем"
                },
                {
                    "ID": "tasks|task_expired_soon",
                    "NAME": "Задача почти просрочена"
                }
            ]
        },
        "rest": {
            "NAME": "Маркетплейс",
            "MODULE_ID": "rest",
            "LIST": [
                {
                    "ID": "rest|app_install",
                    "NAME": "Установлено новое приложение"
                },
                {
                    "ID": "rest|app_install_request",
                    "NAME": "Запрос на установку приложения"
                },
                {
                    "ID": "rest|vi_user_data_request",
                    "NAME": "Приложение запрашивает доступ к данным"
                }
            ]
        }
    },
    "time": {
        "start": 1794317532,
        "finish": 1794317532.176408,
        "duration": 0.176408052444458,
        "processing": 0,
        "date_start": "2026-11-10T16:32:12+03:00",
        "date_finish": "2026-11-10T16:32:12+03:00",
        "operating_reset_at": 1794318120,
        "operating": 0
    }
}
```

В примере показаны два модуля из ответа. Полный ответ содержит все модули портала, которые отправляют уведомления, например `blog`, `calendar`, `crm`, `disk`, `im`, `tasks`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект, в котором ключ — код модуля, например `tasks`, а значение — описание модуля и его типов уведомлений [(подробное описание)](#module-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект модуля {#module-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME**
[`string`](../../data-types.md) | Название модуля ||
|| **MODULE_ID**
[`string`](../../data-types.md) | Код модуля. Совпадает с ключом объекта в `result` и с полем `notify_module` уведомления ||
|| **LIST**
[`array`](../../data-types.md) | Массив типов уведомлений модуля [(подробное описание)](#list-item-object) ||
|#

#### Элемент LIST {#list-item-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Код типа уведомления в формате ```MODULE|EVENT```, например ```tasks|comment```.

Используйте в параметрах `SEARCH_TYPE` и `SEARCH_TYPES` метода [im.notify.history.search](./im-notify-history-search.md). Совпадает с полем `setting_name` уведомления в ответе [im.notify.get](./im-notify-get.md).

В схеме есть не все коды, которые встречаются в уведомлениях: например, уведомления приложений приходят с кодом ```rest|rest_notify```, которого нет в `LIST` ||
|| **NAME**
[`string`](../../data-types.md) | Название типа уведомления ||
|#

## Обработка ошибок

HTTP-статус: **401**

```json
{
    "error": "INVALID_CREDENTIALS",
    "error_description": "Invalid request credentials"
}
```

У метода нет собственных кодов ошибок, возможны только системные ошибки REST API.

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify.md)
- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-system-add.md)
- [{#T}](./im-notify-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-delete.md)
- [{#T}](./im-notify-history-search.md)
