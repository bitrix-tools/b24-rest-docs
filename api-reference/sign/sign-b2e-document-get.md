# Получить документ sign.b2e.document.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sign.b2e`](../scopes/permissions.md), [`crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом просмотра документов КЭДО

Метод `sign.b2e.document.get` возвращает информацию о документе и участниках подписания.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор документа ||
|| **language**
[`string`](../data-types.md) | Язык локализации статусов в ответе.

По умолчанию `en` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"uid":"b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.document.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DocumentGetResult = {
      uid: string
      state: {
        code: string
        name: string
      }
      members: {
        uid: string
        role: string
        party: number
        user: {
          employeeCode: string
          employeeId: number
          userId: number
        }
        state: {
          code: string
          name: string
        }
      }[]
    }

    try {
      const response = await $b24.actions.v2.call.make<DocumentGetResult>({
        method: 'sign.b2e.document.get',
        params: {
          uid: 'b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c',
          language: 'ru',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.uid, result.state.code, result.members.length)
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
      async function getDocument() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sign.b2e.document.get',
            params: {
              uid: 'b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c',
              language: 'ru',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.uid, result.state.code, result.members.length)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDocument)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sign.b2e.document.get',
                [
                    'uid' => 'b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c',
                    'language' => 'ru'
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'sign.b2e.document.get',
        {
            uid: 'b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c',
            language: 'ru'
        },
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sign.b2e.document.get',
        [
            'uid' => 'b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c',
            'language' => 'ru'
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "uid": "b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c",
        "state": {
            "code": "in_progress",
            "name": "В процессе"
        },
        "members": [
            {
                "uid": "f1c2d3e4",
                "role": "signer",
                "party": 0,
                "user": {
                    "employeeCode": "EMP-001",
                    "employeeId": 123,
                    "userId": 25
                },
                "state": {
                    "code": "signed",
                    "name": "Подписано"
                }
            }
        ]
    },
    "time": {
        "start": 1739860000.123,
        "finish": 1739860000.456,
        "duration": 0.333,
        "processing": 0.111,
        "date_start": "2025-02-18T09:19:34+03:00",
        "date_finish": "2025-02-18T09:19:34+03:00",
        "operating_reset_at": 1739860600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Информация о документе и участниках подписания ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор документа ||
|| **state**
[`object`](../data-types.md) | Текущий статус документа ||
|| **members**
[`array`](../data-types.md) | Участники подписания ||
|#

#### Поля объекта result.state

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код статуса ||
|| **name**
[`string`](../data-types.md) | Название статуса ||
|#

#### Элемент массива result.members

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор участника ||
|| **role**
[`string`](../data-types.md) | Роль участника ||
|| **party**
[`integer`](../data-types.md) | Сторона подписания ||
|| **user**
[`object`](../data-types.md) | Данные пользователя ||
|| **state**
[`object`](../data-types.md) | Статус участника ||
|#

#### Поля объекта result.members.user

#|
|| **Название**
`тип` | **Описание** ||
|| **employeeCode**
[`string`](../data-types.md) | Код сотрудника в HCM Link.

Возвращается только для компании, связанной с HCM Link ||
|| **employeeId**
[`integer`](../data-types.md) | Идентификатор сотрудника в HCM Link.

Возвращается только для компании, связанной с HCM Link ||
|| **userId**
[`integer`](../data-types.md) | Идентификатор пользователя в Битрикс24 ||
|#

#### Поля объекта result.members.state

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код статуса участника ||
|| **name**
[`string`](../data-types.md) | Название статуса участника ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав ||
|| `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Вызов не из контекста приложения ||
|| `INTERNAL_ERROR` | Internal error | Ошибка при формировании ответа ||
|| `-` | Document UID is required | Не передан параметр `uid` ||
|| `-` | Document not found | Документ с указанным `uid` не найден ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-document-send.md)
- [{#T}](./sign-b2e-company-provider-list.md)
- [{#T}](./index.md)
