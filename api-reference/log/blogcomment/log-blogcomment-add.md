# Добавить комментарий к сообщению log.blogcomment.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`log`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `log.blogcomment.add` добавляет комментарий к сообщению Ленты новостей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения Ленты новостей.

Идентификатор сообщения можно получить с помощью метода [log.blogpost.get](../log-blogpost-get.md) ||
|| **TEXT***
[`string`](../../data-types.md) | Текст комментария. Учитывается при проверке на дублирование и сохраняется в поле `POST_TEXT` ||
|| **FILES**
[`array`](../../data-types.md) | Массив файлов, который описан по правилам [работы с файлами](../../files/how-to-upload-files.md). Файлы будут загружены на Диск пользователя и привязаны к комментарию ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, от имени которого публикуется комментарий. Доступно только администраторам. По умолчанию используется текущий пользователь, инициировавший вызов метода.

Идентификатор пользователя можно получить с помощью метода [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":403,"TEXT":"Комментарий к посту","USER_ID":27,"FILES":[["example.txt","SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg=="]]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogcomment.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":403,"TEXT":"Комментарий к посту","USER_ID":27,"FILES":[["example.txt","SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg=="]],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogcomment.add
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
        method: 'log.blogcomment.add',
        params: {
          POST_ID: 403,
          TEXT: 'Comment on the post',
          USER_ID: 27,
          FILES: [
            [
              'example.txt',
              'SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg==',
            ],
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created comment ID:', result)
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
      async function addBlogComment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'log.blogcomment.add',
            params: {
              POST_ID: 403,
              TEXT: 'Comment on the post',
              USER_ID: 27,
              FILES: [
                [
                  'example.txt',
                  'SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg==',
                ],
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created comment ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addBlogComment)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'log.blogcomment.add',
                [
                    'POST_ID' => 403,
                    'TEXT'    => 'Комментарий к посту',
                    'USER_ID' => 27,
                    'FILES'   => [
                        [
                            'example.txt',
                            'SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg==',
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Created comment ID: ' . $result->data();
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error adding blog comment: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('log.blogcomment.add', {
        POST_ID: 403,
        TEXT: 'Комментарий к посту',
        USER_ID: 27,
        FILES: [
            [
                'example.txt',
                'SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg==',
            ],
        ]
    }, 
    function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'log.blogcomment.add',
        [
            'POST_ID' => 403,
            'TEXT'    => 'Комментарий к посту',
            'USER_ID' => 27,
            'FILES'   => [
                [
                    'example.txt',
                    'SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg==',
                ],
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Created comment ID: ' . $result['result'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 312,
    "time": {
        "start": 1728904800.123456,
        "finish": 1728904800.398112,
        "duration": 0.2746560573577881,
        "processing": 0.10234594345092773,
        "date_start": "2025-10-14T12:40:00+03:00",
        "date_finish": "2025-10-14T12:40:00+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного комментария ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "No blog module installed"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные ошибки

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `No blog module installed` | Модуль `blog` не установлен ||
|| `-` | `No post found` | Сообщение Ленты новостей с переданным `POST_ID` не найдено или недоступно ||
|| `-` | `No blog found` | Не удалось получить блог, к которому относится сообщение ||
|| `-` | `Duplicate comment` | Аналогичный комментарий уже был опубликован, проверяется только для записей без вложений ||
|| `-` | `No permissions` | У пользователя нет прав на добавление комментария к сообщению ||
|| `-` | `Blog comment hasn't been added` | Внутренняя ошибка при сохранении комментария ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogcomment-delete.md)
- [{#T}](./log-blogcomment-user-get.md)