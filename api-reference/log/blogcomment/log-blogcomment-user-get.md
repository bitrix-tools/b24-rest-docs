# Получить комментарии пользователя log.blogcomment.user.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`log`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `log.blogcomment.user.get` возвращает список комментариев к сообщению Ленты новостей для указанного пользователя и информацию о прикрепленных файлах.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, чьи комментарии нужно получить. Если идентификатор не указан, метод вернет комментарии текущего пользователя.

Если запрос выполняется администратором за другого пользователя, в ответе поле `text` может быть пустым.

Идентификатор пользователя можно получить с помощью метода [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md) ||
|| **FIRST_ID**
[`integer`](../../data-types.md) | Метод вернет комментарии с идентификаторами, которые больше указанного значения ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Метод вернет комментарии с идентификаторами, которые меньше указанного значения ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество записей в ответе. Допустимое значение — от `1` до `100`.  По умолчанию возвращается `100` комментариев ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":28,"FIRST_ID":215,"LAST_ID":216}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogcomment.user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":28,"FIRST_ID":215,"LAST_ID":216,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogcomment.user.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BlogCommentUserGetResult = {
      comments: {
        id: number
        comment_id: number
        log_id: number
        date: ISODate
        text: string
        attach: number[]
      }[]
      files: Record<string, {
        id: number
        date: ISODate
        type: string
        name: string
        size: number
        image?: {
          width: number
          height: number
        }
        authorId: number
        authorName: string
        urlPreview: string
        urlShow: string
        urlDownload: string
      }>
    }

    try {
      const response = await $b24.actions.v2.call.make<BlogCommentUserGetResult>({
        method: 'log.blogcomment.user.get',
        params: {
          USER_ID: 28,
          FIRST_ID: 215,
          LAST_ID: 216,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Comments:', result.comments, 'Files:', result.files)
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
      async function getBlogCommentsForUser() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'log.blogcomment.user.get',
            params: {
              USER_ID: 28,
              FIRST_ID: 215,
              LAST_ID: 216,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Comments:', result.comments, 'Files:', result.files)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getBlogCommentsForUser)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'log.blogcomment.user.get',
                [
                    'USER_ID' => 28,
                    'FIRST_ID' => 215,
                    'LAST_ID' => 216,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Comments: ' . print_r($result->data(), true);
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error getting blog comments: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('log.blogcomment.user.get', {
        USER_ID: 28,
        FIRST_ID: 215,
        LAST_ID: 216
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
        'log.blogcomment.user.get',
        [
            'USER_ID'  => 28,
            'FIRST_ID' => 215,
            'LAST_ID'  => 216,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Comments: ' . print_r($result['result'], true);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "comments": [
            {
                "id": 4821,
                "comment_id": 4821,
                "log_id": 13579,
                "date": "2025-01-28T11:05:42+03:00",
                "text": "Поддерживаю идею!",
                "attach": [
                    90210
                ]
            }
        ],
        "files": {
            "90210": {
                "id": 90210,
                "date": "2025-01-28T11:02:18+03:00",
                "type": "image",
                "name": "diagram.png",
                "size": 184320,
                "image": {
                    "width": 1280,
                    "height": 720
                },
                "authorId": 28,
                "authorName": "Иван Иванов",
                "urlPreview": "https://example.bitrix24.ru/disk/showPreview/90210",
                "urlShow": "https://example.bitrix24.ru/disk/showFile/90210",
                "urlDownload": "https://example.bitrix24.ru/disk/downloadFile/90210"
            }
        }
    },
    "time": {
        "start": 1728905100.112233,
        "finish": 1728905100.498321,
        "duration": 0.38608813285827637,
        "processing": 0.14598798751831055,
        "date_start": "2025-10-14T12:45:00+03:00",
        "date_finish": "2025-10-14T12:45:00+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа. Содержит массив комментариев и информацию о прикрепленных файлах ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Структура объекта `result`

#|
|| **Название**
`тип` | **Описание** ||
|| **comments**
[`object[]`](../../data-types.md) | Массив комментариев. Каждый элемент содержит поля:
- `id`, `comment_id`, `log_id`, `date` — в формате ISO 8601
- `text` и `attach` — массив идентификаторов файлов Диска из массива `FILES` ||
|| **files**
[`object`](../../data-types.md) | Ассоциативный массив с описанием файлов, где ключ — идентификатор объекта Диска. Для каждого файла передаются `id`, `date`, `type`, `name`, `size`, сведения об авторе, а также прямые ссылки `urlPreview`, `urlShow`, `urlDownload` ||
|#

## Обработка ошибок

Метод не возвращает ошибки. 

Если идентификатор пользователя не указан или передано некорректное значение, метод возвращает комментарии текущего пользователя.

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

- [{#T}](./log-blogcomment-add.md)
- [{#T}](./log-blogcomment-delete.md)
