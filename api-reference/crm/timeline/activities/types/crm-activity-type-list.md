# Получить список пользовательских типов дел crm.activity.type.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор, только в контексте [приложения](../../../../../settings/app-installation/index.md)

Метод `crm.activity.type.list` получает список пользовательских типов дел, которые зарегистрировало текущее приложение.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.type.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each ActivityTypeItem returned in result[]
    type ActivityTypeItem = {
      TYPE_ID: string,
      NAME: string,
      IS_CONFIGURABLE_TYPE: string,
      ICON_ID: string,
    }

    try {
      // crm.activity.type.list returns all types of the current application at once, without pagination
      const response = await $b24.actions.v2.call.make<ActivityTypeItem[]>({
        method: 'crm.activity.type.list',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Activity types:', result.length, result)
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
      async function fetchActivityTypeList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.activity.type.list returns all types of the current application at once, without pagination
          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.type.list',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Activity types:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchActivityTypeList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.type.list().response
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
        $response = $b24Service
            ->core
            ->call(
                'crm.activity.type.list',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.type.list",
        {
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.activity.type.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.type.list", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.activity.type.list: %w", err)
    }

    var items []struct {
    	TypeID             string `json:"TYPE_ID"`
    	Name               string `json:"NAME"`
    	IsConfigurableType string `json:"IS_CONFIGURABLE_TYPE"`
    	IconID             b24.ID `json:"ICON_ID"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.TypeID, it.Name)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "TYPE_ID": "1C",
            "NAME": "Дело 1C",
            "IS_CONFIGURABLE_TYPE": "Y",
            "ICON_ID": "0"
        }
    ],
    "time": {
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../../data-types.md) | Массив типов дел текущего приложения [(подробное описание)](#type). Если приложение не зарегистрировало ни одного типа, возвращается пустой массив `[]` ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#type}

#|
|| **Название**
`тип` | **Описание** ||
|| **TYPE_ID**
[`string`](../../../../data-types.md) | Код типа дела. Его передают в `PROVIDER_TYPE_ID` метода [crm.activity.add](../activity-base/crm-activity-add.md) и в `typeId` метода [crm.activity.configurable.add](../configurable/crm-activity-configurable-add.md) ||
|| **NAME**
[`string`](../../../../data-types.md) | Название типа дела ||
|| **IS_CONFIGURABLE_TYPE**
[`string`](../../../../data-types.md) | Признак типа для конфигурируемых дел:

- `Y` — тип используется в [crm.activity.configurable.add](../configurable/crm-activity-configurable-add.md)
- `N` — тип используется в [crm.activity.add](../activity-base/crm-activity-add.md) ||
|| **ICON_ID**
[`string`](../../../../data-types.md) | Идентификатор файла иконки, например `"39755"`. Значение `"0"` — иконка не загружена ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied! Application context required"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! Admin permissions required | Метод вызывает пользователь без прав администратора ||
|| `403` | `ACCESS_DENIED` | Access denied! Application context required | Метод вызван через входящий вебхук или без авторизации приложения ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-activity-type-add.md)
- [{#T}](./crm-activity-type-delete.md)
- [{#T}](../activity-base/crm-activity-add.md)
- [{#T}](../configurable/crm-activity-configurable-add.md)
