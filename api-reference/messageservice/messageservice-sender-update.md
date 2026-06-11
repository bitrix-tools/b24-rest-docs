# Обновить провайдер сообщений messageservice.sender.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`messageservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `messageservice.sender.update` обновляет данные зарегистрированного провайдера сообщений.

Метод работает только в контексте [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../data-types.md) | Код провайдера, который нужно обновить.

Код провайдера можно получить методом [messageservice.sender.list](./messageservice-sender-list.md) ||
|| **HANDLER**
[`string`](../data-types.md) | Новый URL обработчика приложения ||
|| **NAME**
[`string` \| `object`](../data-types.md) | Новое название провайдера.

Может быть строкой или ассоциативным массивом локализированных строк вида:

```js
'NAME': {
    'ru': 'название провайдера',
    'en': 'provider name',
    ...
},
```
 ||
|| **DESCRIPTION**
[`string` \| `object`](../data-types.md) | Новое описание провайдера.

Может быть строкой или ассоциативным массивом локализированных строк вида:

```js
'DESCRIPTION': {
    'ru': 'описание провайдера',
    'en': 'provider description',
    ...
},
```
||
|#

{% note info "" %}

В запросе должен быть передан `CODE` и хотя бы один из параметров `HANDLER`, `NAME`, `DESCRIPTION`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"provider1","HANDLER":"https://provider.example/api/new-handler","NAME":"Provider 1 Updated","DESCRIPTION":"Обновленное описание","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/messageservice.sender.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'messageservice.sender.update',
        params: {
          CODE: 'provider1',
          HANDLER: 'https://provider.example/api/new-handler',
          NAME: 'Provider 1 Updated',
          DESCRIPTION: 'Updated provider description',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Sender updated:', result)
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
      async function updateSender() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'messageservice.sender.update',
            params: {
              CODE: 'provider1',
              HANDLER: 'https://provider.example/api/new-handler',
              NAME: 'Provider 1 Updated',
              DESCRIPTION: 'Updated provider description',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Sender updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateSender)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'messageservice.sender.update',
                [
                    'CODE' => 'provider1',
                    'HANDLER' => 'https://provider.example/api/new-handler',
                    'NAME' => 'Provider 1 Updated',
                    'DESCRIPTION' => 'Обновленное описание',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating sender: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'messageservice.sender.update',
        {
            CODE: 'provider1',
            HANDLER: 'https://provider.example/api/new-handler',
            NAME: 'Provider 1 Updated',
            DESCRIPTION: 'Обновленное описание'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'messageservice.sender.update',
        [
            'CODE' => 'provider1',
            'HANDLER' => 'https://provider.example/api/new-handler',
            'NAME' => 'Provider 1 Updated',
            'DESCRIPTION' => 'Обновленное описание',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1742895600,
        "finish": 1742895600.845505,
        "duration": 0.845505952835083,
        "processing": 0.1402289867401123,
        "date_start": "2025-03-25T10:00:00+03:00",
        "date_finish": "2025-03-25T10:00:00+03:00",
        "operating_reset_at": 1742896200,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если провайдер успешно обновлен ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_SENDER_OTHER_PARAMS_REQUIRED",
    "error_description": "At least one other parameter is required!"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_SENDER_CODE_REQUIRED` | `CODE is required!` | Не передан обязательный параметр `CODE` ||
|| `ERROR_SENDER_OTHER_PARAMS_REQUIRED` | `At least one other parameter is required!` | Не передан ни один параметр для обновления (`HANDLER`, `NAME`, `DESCRIPTION`) ||
|| `ERROR_SENDER_NOT_FOUND` | `Sender not found!` | Провайдер с переданным `CODE` не найден ||
|| `ERROR_SENDER_UPDATE_FAILURE` | `Sender update error!` | Ошибка обновления провайдера ||
|| `ACCESS_DENIED` | `Application context required` | Метод вызван вне контекста приложения ||
|| `ACCESS_DENIED` | `Access denied!` | Метод запустил не администратор ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./messageservice-sender-add.md)
- [{#T}](./messageservice-sender-update.md)
- [{#T}](./messageservice-sender-list.md)
- [{#T}](./messageservice-sender-delete.md)
- [{#T}](./messageservice-message-status-update.md)
