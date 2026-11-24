# Создать ключ доступа biconnector.key.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом управления ключами BI-коннектора, например администратор

Метод `biconnector.key.add` создает ключ доступа BI-коннектора и возвращает его идентификатор.

{% note warning "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md). При вызове вебхуком метод возвращает ошибку `insufficient_auth_type`

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Поля ключа [(подробное описание)](#fields). Если задавать поля не нужно, передайте пустой объект ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTIVE**
[`string`](../../data-types.md) | Включить ли ключ сразу после создания. Возможные значения:

- `Y` — ключ включен
- `N` — ключ отключен

По умолчанию — `N` ||
|| **CONNECTION**
[`string`](../../data-types.md) | Подключение к базе данных, из которой BI-коннектор отдает данные по ключу. В облачном Битрикс24 — `bi`.

Если подключение не найдено, ключ создается с подключением по умолчанию ||
|#

Значение ключа Битрикс24 генерирует сам. Ключ принадлежит пользователю, от имени которого вызван метод: передать другого пользователя нельзя. Значение ключа возвращает метод [biconnector.key.list](./biconnector-key-list.md) в поле `ACCESS_KEY`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
         -H "Content-Type: application/json" \
         -H "Accept: application/json" \
         -d '{
             "fields": {
                 "ACTIVE": "Y"
             },
             "auth": "**put_access_token_here**"
             }' \
         https://**put_your_bitrix24_address**/rest/biconnector.key.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'biconnector.key.add',
        params: {
          fields: {
            ACTIVE: 'Y',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info('Key created, ID:', response.getData()!.result)
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
      async function addKey() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'biconnector.key.add',
            params: {
              fields: {
                ACTIVE: 'Y',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          console.info('Key created, ID:', response.getData().result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addKey)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        # В b24pysdk нет готовой обертки для biconnector.key.*, поэтому метод
        # вызывается напрямую через bitrix_token.call_method()
        response = bitrix_token.call_method(
            api_method="biconnector.key.add",
            params={
                "fields": {
                    "ACTIVE": "Y",
                },
            },
        )
        print("Key created, ID:", response["result"])
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
                'biconnector.key.add',
                [
                    'fields' => [
                        'ACTIVE' => 'Y',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Key created, ID: ' . print_r($result, true);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.key.add',
        {
            fields: {
                ACTIVE: 'Y',
            },
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            console.info('Key created, ID:', result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.key.add',
        [
            'fields' => [
                'ACTIVE' => 'Y',
            ],
        ]
    );

    if (isset($result['error'])) {
        echo 'Error: ' . $result['error'] . ': ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "biconnector.key.add", b24.Params{
    	"fields": b24.Params{
    		"ACTIVE": "Y",
    	},
    })
    if err != nil {
    	return fmt.Errorf("biconnector.key.add: %w", err)
    }

    var id int
    if err := json.Unmarshal(res.Result, &id); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("ключ создан, ID:", id)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 15,
    "time": {
        "start": 1795525345,
        "finish": 1795525346.017652,
        "duration": 1.0176520347595215,
        "processing": 0,
        "date_start": "2026-11-24T16:02:25+03:00",
        "date_finish": "2026-11-24T16:02:26+03:00",
        "operating_reset_at": 1795525920,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного ключа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {fields}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан параметр `fields`. Если задавать поля не нужно, передайте пустой объект ||
|| `400` | `insufficient_auth_type` | The request requires higher privileges than provided. | Метод вызван вебхуком, а не из приложения ||
|| `400` | `ACCESS_DENIED` | Access denied | У пользователя нет права управления ключами BI-коннектора ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./biconnector-key-update.md)
- [{#T}](./biconnector-key-list.md)
- [{#T}](./biconnector-key-delete.md)
