# Зарегистрировать СМС-провайдер или провайдер сообщений messageservice.sender.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`messageservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `messageservice.sender.add` регистрирует нового провайдера сообщений.

Метод работает только в контексте [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../data-types.md) | Код провайдера.

Допустимые символы: `a-z`, `A-Z`, `0-9`, `.`, `-`, `_` ||
|| **TYPE***
[`string`](../data-types.md) | Тип провайдера.

Поддерживаемое значение: `SMS` ||
|| **HANDLER***
[`string`](../data-types.md) | URL обработчика приложения, который вызывается при отправке сообщения.

Данные, которые приходят в обработчик, описаны [ниже](#handler) ||
|| **NAME***
[`string` \| `object`](../data-types.md) | Название провайдера.

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
[`string` \| `object`](../data-types.md) | Описание провайдера.

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

## Что приходит в обработчик {#handler}

#|
|| **Название**
`тип` | **Описание** ||
|| **module_id**
[`string`](../data-types.md) | Модуль, из которого отправлено сообщение.

Возможные значения:
- `crm` — сообщение отправлено из карточки CRM
- `bizproc` — сообщение отправлено из Бизнес-процессов или робота CRM ||
|| **bindings**
[`array`](../data-types.md) | Массив привязок сообщения к объектам CRM.

Параметр приходит, если `module_id` равен `crm` ||
|| **workflow_id**
[`string`](../data-types.md) | Идентификатор бизнес-процесса.

Параметр приходит, если `module_id` равен `bizproc` ||
|| **document_id**
[`array`](../data-types.md) | Идентификатор документа бизнес-процесса.

Параметр приходит, если `module_id` равен `bizproc` ||
|| **document_type**
[`array`](../data-types.md) | Тип документа бизнес-процесса.

Параметр приходит, если `module_id` равен `bizproc` ||
|| **properties**
[`object`](../data-types.md) | Объект с совместимыми [параметрами сообщения](#properties) ||
|| **type**
[`string`](../data-types.md) | Тип провайдера.

Возможное значение: `SMS` ||
|| **code**
[`string`](../data-types.md) | Код провайдера ||
|| **message_id**
[`string`](../data-types.md) | Уникальный идентификатор сообщения.

Используйте его в методе [messageservice.message.status.update](./messageservice-message-status-update.md) для обновления статуса сообщения ||
|| **message_to**
[`string`](../data-types.md) | Номер получателя сообщения ||
|| **message_body**
[`string`](../data-types.md) | Текст сообщения ||
|| **ts**
[`integer`](../data-types.md) | Время отправки запроса в формате Unix Timestamp ||
|| **auth**
[`object`](../data-types.md) | Данные авторизации приложения ||
|#

### Объект properties {#properties}

#|
|| **Название**
`тип` | **Описание** ||
|| **phone_number**
[`string`](../data-types.md) | Номер получателя сообщения ||
|| **message_text**
[`string`](../data-types.md) | Текст сообщения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CODE":"provider1","TYPE":"SMS","HANDLER":"https://provider.example/api/handler","NAME":"Provider 1","DESCRIPTION":"Основной SMS-провайдер","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/messageservice.sender.add
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
        method: 'messageservice.sender.add',
        params: {
          CODE: 'provider1',
          TYPE: 'SMS',
          HANDLER: 'https://provider.example/api/handler',
          NAME: 'Provider 1',
          DESCRIPTION: 'Main SMS provider',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Sender registered:', result)
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
      async function addSender() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'messageservice.sender.add',
            params: {
              CODE: 'provider1',
              TYPE: 'SMS',
              HANDLER: 'https://provider.example/api/handler',
              NAME: 'Provider 1',
              DESCRIPTION: 'Main SMS provider',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Sender registered:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addSender)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'messageservice.sender.add',
                [
                    'CODE' => 'provider1',
                    'TYPE' => 'SMS',
                    'HANDLER' => 'https://provider.example/api/handler',
                    'NAME' => 'Provider 1',
                    'DESCRIPTION' => 'Основной SMS-провайдер',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding sender: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'messageservice.sender.add',
        {
            CODE: 'provider1',
            TYPE: 'SMS',
            HANDLER: 'https://provider.example/api/handler',
            NAME: 'Provider 1',
            DESCRIPTION: 'Основной SMS-провайдер'
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
        'messageservice.sender.add',
        [
            'CODE' => 'provider1',
            'TYPE' => 'SMS',
            'HANDLER' => 'https://provider.example/api/handler',
            'NAME' => 'Provider 1',
            'DESCRIPTION' => 'Основной SMS-провайдер',
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
        "processing": 0,
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
[`boolean`](../data-types.md) | `true`, если провайдер успешно зарегистрирован ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_SENDER_VALIDATION_FAILURE",
    "error_description": "Empty sender code!"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Empty data!` | Пустой набор параметров ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Empty sender code!` | Не передан обязательный параметр `CODE` ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Wrong sender code!` | `CODE` содержит недопустимые символы ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Empty sender NAME!` | Не передан обязательный параметр `NAME` ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Empty sender message TYPE!` | Не передан обязательный параметр `TYPE` ||
|| `ERROR_SENDER_VALIDATION_FAILURE` | `Unknown sender message TYPE!` | Передан неподдерживаемый `TYPE` (допустимо только `SMS`) ||
|| `ERROR_SENDER_ALREADY_INSTALLED` | `Sender already installed!` | Провайдер с таким `CODE` уже зарегистрирован для текущего приложения ||
|| `ERROR_SENDER_ADD_FAILURE` | `Sender save error!` | Ошибка сохранения провайдера ||
|| `ACCESS_DENIED` | `Access denied!` | Метод запустил не администратор ||
|| `ACCESS_DENIED` | `Application context required` | Метод вызван вне контекста приложения ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./messageservice-sender-add.md)
- [{#T}](./messageservice-sender-update.md)
- [{#T}](./messageservice-sender-list.md)
- [{#T}](./messageservice-sender-delete.md)
- [{#T}](./messageservice-message-status-update.md)
