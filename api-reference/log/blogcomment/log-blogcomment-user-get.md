# Получить комментарии пользователя log.blogcomment.user.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`log`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `log.blogcomment.user.get` возвращает комментарии пользователя к сообщениям Ленты новостей и сведения о прикрепленных к ним файлах.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, чьи комментарии нужно получить. Если параметр не передан или его передает не администратор, вернутся комментарии текущего пользователя.

Комментарии другого пользователя может получить только администратор. Поле `text` в них пустое, кроме служебных комментариев: у них приходит служебный текст.

Идентификатор пользователя можно получить с помощью метода [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md) ||
|| **FIRST_ID**
[`integer`](../../data-types.md) | Метод вернет комментарии, у которых `id` больше этого значения. Не передавайте сюда `comment_id`: это другой идентификатор ||
|| **LAST_ID**
[`integer`](../../data-types.md) | Метод вернет комментарии, у которых `id` меньше этого значения. Если передан и `FIRST_ID`, метод учтет только `FIRST_ID` ||
|| **LIMIT**
[`integer`](../../data-types.md) | Сколько комментариев вернуть, от `1` до `1000`. По умолчанию `100`. Большее значение метод заменит на `1000` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":28,"FIRST_ID":215}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogcomment.user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"USER_ID":28,"FIRST_ID":215,"auth":"**put_access_token_here**"}' \
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
      COMMENTS: {
        id: number
        comment_id: number
        post_id: number
        date: ISODate
        text: string
        attach: number[]
      }[]
      // An empty array is returned when no files are attached
      FILES: [] | Record<string, {
        id: number
        date: ISODate
        type: string
        name: string
        size: number
        // Image or video preview size; false for other files
        image: {
          width: number
          height: number
        } | false
        authorId: number
        authorName: string
        urlPreview: string | null
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
      async function getBlogCommentsForUser() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'log.blogcomment.user.get',
            params: {
              USER_ID: 28,
              FIRST_ID: 215,
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

      document.addEventListener('DOMContentLoaded', getBlogCommentsForUser)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.log.blogcomment.user.get(
            user_id=28,
            first_id=215,
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
                'log.blogcomment.user.get',
                [
                    'USER_ID' => 28,
                    'FIRST_ID' => 215,
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
    BX24.callMethod('log.blogcomment.user.get', {
        USER_ID: 28,
        FIRST_ID: 215
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
        ]
    );

    if (array_key_exists('error', $result)) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Comments: ' . print_r($result['result'], true);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "log.blogcomment.user.get", b24.Params{
    	"USER_ID":  28,
    	"FIRST_ID": 215,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("log.blogcomment.user.get: %w", err)
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
                "id": 4821,
                "comment_id": 4821,
                "post_id": 13579,
                "date": "2024-10-14T11:05:42+03:00",
                "text": "Поддерживаю идею!",
                "attach": [
                    90210
                ]
            }
        ],
        "FILES": {
            "90210": {
                "id": 90210,
                "date": "2024-10-14T11:02:18+03:00",
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
        "date_start": "2024-10-14T14:25:00+03:00",
        "date_finish": "2024-10-14T14:25:00+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа. Содержит массив комментариев и информацию о прикрепленных файлах [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMMENTS**
[`object[]`](../../data-types.md) | Массив комментариев пользователя, от новых к старым: по убыванию `comment_id`. Структура элемента описана [ниже](#comments) ||
|| **FILES**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Файлы, прикрепленные к комментариям, в формате `{"<идентификатор файла>": {…}}`. Ключ — идентификатор файла на Диске из массива `attach` комментария. Структура файла описана [ниже](#files).

Если файлов нет, возвращается пустой массив `[]` ||
|#

#### Элемент массива COMMENTS {#comments}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор записи о комментарии в Ленте новостей. Его передают в `FIRST_ID` и `LAST_ID` ||
|| **comment_id**
[`integer`](../../data-types.md) | Идентификатор самого комментария. Передайте его в метод [log.blogcomment.delete](./log-blogcomment-delete.md) ||
|| **post_id**
[`integer`](../../data-types.md) | Идентификатор сообщения Ленты новостей, к которому оставлен комментарий ||
|| **date**
[`datetime`](../../data-types.md) | Дата и время создания комментария в формате ISO 8601 ||
|| **text**
[`string`](../../data-types.md) | Текст комментария. Если администратор запрашивает комментарии другого пользователя, текст пустой, кроме служебных комментариев ||
|| **attach**
[`integer[]`](../../data-types.md) | Идентификаторы файлов Диска, прикрепленных к комментарию. Описание файлов — в объекте `FILES` ||
|#

#### Объект файла в FILES {#files}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор файла на Диске ||
|| **date**
[`datetime`](../../data-types.md) | Дата и время загрузки файла в формате ISO 8601 ||
|| **type**
[`string`](../../data-types.md) | Тип файла: `image` — изображение, `video` — видео, `file` — другой файл ||
|| **name**
[`string`](../../data-types.md) | Имя файла ||
|| **size**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **image**
[`object`](../../data-types.md) \| [`boolean`](../../data-types.md) | Размеры изображения или превью видео: `width` и `height` — ширина и высота в пикселях, целые числа. Для других файлов — `false` ||
|| **authorId**
[`integer`](../../data-types.md) | Идентификатор пользователя, который загрузил файл ||
|| **authorName**
[`string`](../../data-types.md) | Имя пользователя, который загрузил файл ||
|| **urlPreview**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Ссылка на превью файла. Если превью нет, возвращается `null` ||
|| **urlShow**
[`string`](../../data-types.md) | Ссылка для просмотра изображения. Для других файлов совпадает со ссылкой на скачивание ||
|| **urlDownload**
[`string`](../../data-types.md) | Ссылка для скачивания файла ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./log-blogcomment-add.md)
- [{#T}](./log-blogcomment-get.md)
- [{#T}](./log-blogcomment-delete.md)
