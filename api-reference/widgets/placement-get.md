# Получить обработчики, зарегистрированные приложением placement.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `placement.get` возвращает список обработчиков виджетов, которые приложение зарегистрировало методом [placement.bind](./placement-bind.md). Для каждого обработчика метод отдает код точки встраивания, адрес обработчика, пользователя, для которого зарегистрирован виджет, настройки и названия на разных языках.

Используйте метод, чтобы проверить текущие регистрации: перед повторным вызовом [placement.bind](./placement-bind.md) или перед удалением обработчика методом [placement.unbind](./placement-unbind.md). Список точек встраивания, доступных приложению, возвращает другой метод — [placement.list](./placement-list.md).

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/placement.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each PlacementHandler returned in result[]
    type PlacementHandler = {
      id: number
      placement: string
      userId: number
      handler: string
      options: Record<string, string> | unknown[]
      title: string
      description: string
      langAll: Record<string, { TITLE: string; DESCRIPTION: string; GROUP_NAME: string }>
    }

    try {
      const response = await $b24.actions.v2.call.make<PlacementHandler[]>({
        method: 'placement.get',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Registered handlers count:', result.length, result)
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
      async function getPlacementHandlers() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.get',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Registered handlers count:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getPlacementHandlers)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.placement.get().response
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
                'placement.get',
                []
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting placements: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
 	BX24.callMethod(
        "placement.get",
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.get',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "placement.get", nil, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("placement.get: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "id": 41,
            "placement": "CRM_DEAL_LIST_TOOLBAR",
            "userId": 0,
            "handler": "https://myapp.com/?handler=1",
            "options": [],
            "title": "Add invoice",
            "description": "",
            "langAll": {
                "ru": {
                    "TITLE": "Add invoice",
                    "DESCRIPTION": "",
                    "GROUP_NAME": "Documents"
                }
            }
        },
        {
            "id": 42,
            "placement": "CRM_DEAL_LIST_TOOLBAR",
            "userId": 0,
            "handler": "https://myapp.com/?handler=1",
            "options": [],
            "title": "Import invoice",
            "description": "",
            "langAll": {
                "ru": {
                    "TITLE": "Import invoice",
                    "DESCRIPTION": "",
                    "GROUP_NAME": "Documents"
                }
            }
        },
        {
            "id": 43,
            "placement": "IM_CONTEXT_MENU",
            "userId": 0,
            "handler": "https://myapp.com/?handler=2",
            "options": {
                "extranet": "N",
                "context": "ALL",
                "role": "USER"
            },
            "title": "My App 1",
            "description": "",
            "langAll": {
                "ru": {
                    "TITLE": "My App 1",
                    "DESCRIPTION": "",
                    "GROUP_NAME": ""
                }
            }
        },
        {
            "id": 44,
            "placement": "PAGE_BACKGROUND_WORKER",
            "userId": 1,
            "handler": "https://myapp.com/?handler=3",
            "options": {
                "errorHandlerUrl": "https://myapp.com/?handler=3"
            },
            "title": "My App 2",
            "description": "",
            "langAll": {
                "ru": {
                    "TITLE": "My App 2",
                    "DESCRIPTION": "",
                    "GROUP_NAME": ""
                }
            }
        }
    ],
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Список зарегистрированных обработчиков виджетов [(подробное описание)](#result). Если приложение не зарегистрировало ни одного обработчика, список пустой ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result {#result}

Кроме `id`, значения полей приложение задает при регистрации обработчика методом [placement.bind](./placement-bind.md). В ответе имена полей записаны в стиле camelCase, а не заглавными буквами, как параметры регистрации: `placement` вместо `PLACEMENT`, `userId` вместо `USER_ID`. Соответствие для каждого поля указано в таблице.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../data-types.md) | Идентификатор зарегистрированного обработчика ||
|| **placement**
[`string`](../data-types.md) | Код точки встраивания. Параметр `PLACEMENT` при регистрации ||
|| **userId**
[`integer`](../data-types.md) | Идентификатор пользователя, для которого зарегистрирован виджет. Параметр `USER_ID` при регистрации. Значение `0` — виджет доступен всем пользователям ||
|| **handler**
[`string`](../data-types.md) | Адрес обработчика виджета. Параметр `HANDLER` при регистрации ||
|| **options**
[`object`](../data-types.md) или [`array`](../data-types.md) | Дополнительные параметры отображения виджета. Параметр `OPTIONS` при регистрации. Если параметры заданы — объект, если нет — пустой массив `[]` ||
|| **title**
[`string`](../data-types.md) | Название виджета для одного языка: того, на котором выполнялась регистрация, или первого из `LANG_ALL`, если такого перевода нет. Параметр `TITLE` при регистрации ||
|| **description**
[`string`](../data-types.md) | Описание виджета для того же языка, что и `title`. Параметр `DESCRIPTION` при регистрации ||
|| **langAll**
[`object`](../data-types.md) | Название, описание и группа виджета для языков, переданных при регистрации. Ключ — код языка, значение — объект с полями `TITLE`, `DESCRIPTION` и `GROUP_NAME`. Параметр `LANG_ALL` при регистрации ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method Application context required"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения, например через вебхук ||
|| `403` | `ACCESS_DENIED` | Access denied! | Метод вызвал пользователь без прав администратора ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./placements.md)
- [{#T}](./placement-list.md)
- [{#T}](./placement-bind.md)
- [{#T}](./placement-unbind.md)
- [{#T}](./ui-interaction/index.md)
