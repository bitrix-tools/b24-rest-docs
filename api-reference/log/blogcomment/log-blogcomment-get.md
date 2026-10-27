# Получить комментарии к сообщению log.blogcomment.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`log`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на чтение сообщения

Метод `log.blogcomment.get` возвращает опубликованные комментарии к сообщению Ленты новостей и информацию о прикрепленных к ним файлах.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения Ленты новостей.

Идентификатор сообщения можно получить с помощью метода [log.blogpost.get](../log-blogpost-get.md) ||
|| **FIRST_ID**
[`integer`](../../data-types.md) | Метод вернет комментарии с идентификаторами больше указанного значения. Комментарии сортируются по возрастанию идентификатора.

Если передать `0`, метод вернет комментарии с начала списка по возрастанию идентификатора.

Нельзя передавать вместе с `LAST_ID` ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Метод вернет комментарии с идентификаторами меньше указанного значения. Комментарии сортируются по убыванию идентификатора.

Нельзя передавать вместе с `FIRST_ID` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Количество комментариев в ответе. Максимальное значение — `1000`, большее значение заменяется на `1000`. Если значение не передано или меньше `1`, метод вернет `100` комментариев ||
|#

Если не передать `FIRST_ID` и `LAST_ID`, метод вернет последние комментарии по убыванию идентификатора. Чтобы получить следующую порцию, передайте в `LAST_ID` наименьший `id` из предыдущего ответа.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":319,"LAST_ID":62,"LIMIT":3}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogcomment.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":319,"LAST_ID":62,"LIMIT":3,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogcomment.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BlogCommentGetResult = {
      COMMENTS: {
        id: number
        comment_id: number
        post_id: number
        parent_id: number
        author_id: number
        date: ISODate
        text: string
        attach: number[]
      }[]
      // An empty array is returned when no files are attached
      FILES: [] | Record<string, {
        id: number
        date: ISODate
        type: 'file' | 'image' | 'video'
        name: string
        size: number
        image: { width: number, height: number } | false
        authorId: number
        authorName: string
        urlPreview: string | null
        urlShow: string
        urlDownload: string
      }>
    }

    try {
      const response = await $b24.actions.v2.call.make<BlogCommentGetResult>({
        method: 'log.blogcomment.get',
        params: {
          POST_ID: 319,
          LAST_ID: 62,
          LIMIT: 3,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Comments:', result.COMMENTS, 'Files:', result.FILES)
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
      async function getBlogComments() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'log.blogcomment.get',
            params: {
              POST_ID: 319,
              LAST_ID: 62,
              LIMIT: 3,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Comments:', result.COMMENTS, 'Files:', result.FILES)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getBlogComments)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.log.blogcomment.get(
            post_id=319,
            last_id=62,
            limit=3,
        ).response
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
                'log.blogcomment.get',
                [
                    'POST_ID' => 319,
                    'LAST_ID' => 62,
                    'LIMIT'   => 3,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('log.blogcomment.get', {
        POST_ID: 319,
        LAST_ID: 62,
        LIMIT: 3
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
        'log.blogcomment.get',
        [
            'POST_ID' => 319,
            'LAST_ID' => 62,
            'LIMIT'   => 3,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Comments: ' . print_r($result['result'], true);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "log.blogcomment.get", b24.Params{
    	"POST_ID": 319,
    	"LAST_ID": 62,
    	"LIMIT":   3,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("log.blogcomment.get: %w", err)
    }

    // Форма ответа показана ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "COMMENTS": [
            {
                "id": 61,
                "comment_id": 61,
                "post_id": 319,
                "parent_id": 0,
                "author_id": 28,
                "date": "2026-10-21T16:38:05+03:00",
                "text": "Схема процесса во вложении",
                "attach": [
                    10885
                ]
            },
            {
                "id": 59,
                "comment_id": 59,
                "post_id": 319,
                "parent_id": 0,
                "author_id": 28,
                "date": "2026-10-21T16:37:30+03:00",
                "text": "Поддерживаю идею",
                "attach": [
                    10883
                ]
            },
            {
                "id": 57,
                "comment_id": 57,
                "post_id": 319,
                "parent_id": 0,
                "author_id": 28,
                "date": "2026-10-21T16:37:27+03:00",
                "text": "Первый комментарий",
                "attach": []
            }
        ],
        "FILES": {
            "10883": {
                "id": 10883,
                "date": "2026-10-21T16:37:55+03:00",
                "type": "file",
                "name": "notes.txt",
                "size": 37,
                "image": false,
                "authorId": 28,
                "authorName": "Иван Иванов",
                "urlPreview": null,
                "urlShow": "https://test.bitrix24.ru/disk/downloadFile/10883/?&ncc=1&filename=notes.txt",
                "urlDownload": "https://test.bitrix24.ru/disk/downloadFile/10883/?&ncc=1&filename=notes.txt"
            },
            "10885": {
                "id": 10885,
                "date": "2026-10-21T16:38:20+03:00",
                "type": "image",
                "name": "diagram.png",
                "size": 70,
                "image": {
                    "width": 1,
                    "height": 1
                },
                "authorId": 28,
                "authorName": "Иван Иванов",
                "urlPreview": "https://test.bitrix24.ru/disk/showFile/10885/?&ncc=1&width=640&height=640&signature=**signature**&ts=1792589900&filename=diagram.png",
                "urlShow": "https://test.bitrix24.ru/disk/showFile/10885/?&ncc=1&ts=1792589900&filename=diagram.png",
                "urlDownload": "https://test.bitrix24.ru/disk/downloadFile/10885/?&ncc=1&filename=diagram.png"
            }
        }
    },
    "time": {
        "start": 1792589984,
        "finish": 1792589984.324943,
        "duration": 0.32494306564331055,
        "processing": 0,
        "date_start": "2026-10-21T16:39:44+03:00",
        "date_finish": "2026-10-21T16:39:44+03:00",
        "operating_reset_at": 1792590540,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMMENTS**
[`object[]`](../../data-types.md) | Массив комментариев [(подробное описание)](#comments). Если комментариев нет или модуль `blog` не установлен, возвращается пустой массив ||
|| **FILES**
[`object`](../../data-types.md) | Файлы, прикрепленные к комментариям. Ключ — идентификатор файла на Диске, значение — описание файла [(подробное описание)](#files). Если файлов нет, возвращается пустой массив `[]` ||
|#

#### Элемент массива COMMENTS {#comments}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор комментария ||
|| **comment_id**
[`integer`](../../data-types.md) | Идентификатор комментария, совпадает с `id` ||
|| **post_id**
[`integer`](../../data-types.md) | Идентификатор сообщения Ленты новостей ||
|| **parent_id**
[`integer`](../../data-types.md) | Идентификатор родительского комментария ||
|| **author_id**
[`integer`](../../data-types.md) | Идентификатор автора комментария ||
|| **date**
[`datetime`](../../data-types.md) | Дата и время создания комментария в формате ISO 8601 ||
|| **text**
[`string`](../../data-types.md) | Текст комментария. Для служебных комментариев возвращается текст, который отображается в Ленте ||
|| **attach**
[`integer[]`](../../data-types.md) | Идентификаторы файлов на Диске, прикрепленных к комментарию. Описание каждого файла находится в объекте `FILES` по этому идентификатору ||
|#

#### Объект файла в FILES {#files}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор файла на Диске ||
|| **date**
[`datetime`](../../data-types.md) | Дата и время создания файла в формате ISO 8601 ||
|| **type**
[`string`](../../data-types.md) | Тип файла: `image`, `video` или `file` ||
|| **name**
[`string`](../../data-types.md) | Имя файла ||
|| **size**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **image**
[`object`](../../data-types.md) \| [`boolean`](../../data-types.md) | Размеры изображения или видео в пикселях: `width` и `height`. Для остальных файлов возвращается `false` ||
|| **authorId**
[`integer`](../../data-types.md) | Идентификатор пользователя, загрузившего файл ||
|| **authorName**
[`string`](../../data-types.md) | Имя пользователя, загрузившего файл ||
|| **urlPreview**
[`string`](../../data-types.md) | Ссылка на превью размером до 640×640 пикселей. Для файла без превью, который не является изображением, возвращается `null` ||
|| **urlShow**
[`string`](../../data-types.md) | Ссылка на просмотр изображения. Для остальных файлов — ссылка на скачивание ||
|| **urlDownload**
[`string`](../../data-types.md) | Ссылка на скачивание файла ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "POST_ID must be a positive integer"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | POST_ID must be a positive integer | Не передан `POST_ID` или передано значение меньше `1` ||
|| `400` | `ERROR_ARGUMENT` | FIRST_ID and LAST_ID cannot be used together | Переданы одновременно `FIRST_ID` и `LAST_ID` ||
|| `404` | `ERROR_NOT_FOUND` | Post not found | Сообщение с переданным `POST_ID` не найдено или у пользователя нет доступа на его чтение ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogcomment-add.md)
- [{#T}](./log-blogcomment-user-get.md)
- [{#T}](./log-blogcomment-delete.md)
