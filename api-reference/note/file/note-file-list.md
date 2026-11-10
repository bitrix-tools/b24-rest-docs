# Получить список файлов документа note.file.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`note`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к модулю База знаний и правом «Просмотр» для документа

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `note.file.list` возвращает постранично файлы, прикрепленные к документу, с датой прикрепления.

{% note info "" %}

Файл, загруженный методом [note.file.add](./note-file-add.md) и не вставленный в текст документа, со временем удаляется фоновой очисткой. Срок отсчитывается от даты `createdAt`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentId***
[`integer`](../../data-types.md) | Идентификатор документа.

Идентификатор можно получить методом [note.document.list](../document/note-document-list.md).

Список доступен и для документа в архиве или корзине, если пользователь может его открыть ||
|| **pagination**
[`object`](../../data-types.md) | Объект постраничной навигации. [Описание структуры объекта](#pagination).

Для первой страницы не передавайте параметр ||
|#

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество файлов на странице.

Допустимые значения: от `1` до `200`. Значения больше `200` уменьшаются до `200`, нулевое и отрицательное значение заменяется на `50`. Нечисловое значение вызывает ошибку валидации.

По умолчанию: `50` ||
|| **afterCursor**
[`object`](../../data-types.md) | Курсор следующей страницы. Передавайте значение `result.nextCursor` из предыдущего ответа без изменений.

Структура курсора служебная и может измениться. Не собирайте курсор вручную ||
|#

Чтобы получить все файлы документа, вызовите метод без `pagination.afterCursor`, затем передавайте `result.nextCursor` из каждого ответа в `pagination.afterCursor`, пока `result.nextCursor` не станет `null`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/note.file.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":131,"pagination":{"limit":1}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/note.file.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":131,"pagination":{"limit":1},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/note.file.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FileListResult = {
      items: Array<{
        id: number
        documentId: number
        name: string
        size: number
        mimeType: string
        assetType: 'image' | 'video' | 'file'
        assetMarkdown: string
        createdAt: ISODate
      }>
      nextCursor: Record<string, unknown> | null
    }

    try {
      const response = await $b24.actions.v3.call.make<FileListResult>({
        method: 'note.file.list',
        params: {
          documentId: 131,
          pagination: {
            limit: 1,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Files:', result.items.length, result.nextCursor)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listFiles() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'note.file.list',
            params: {
              documentId: 131,
              pagination: {
                limit: 1,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Files:', result.items.length, result.nextCursor)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listFiles)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.note.file.list(
            document_id=131,
            pagination={
                "limit": 1,
            },
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'note.file.list',
                [
                    'documentId' => 131,
                    'pagination' => [
                        'limit' => 1,
                    ],
                ]
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'note.file.list',
        {
            documentId: 131,
            pagination: {
                limit: 1,
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'note.file.list',
        [
            'documentId' => 131,
            'pagination' => [
                'limit' => 1,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "note.file.list", b24.Params{
    	"documentId": 131,
    	"pagination": b24.Params{
    		"limit": 1,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("note.file.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID            int    `json:"id"`
    		Name          string `json:"name"`
    		AssetMarkdown string `json:"assetMarkdown"`
    		CreatedAt     string `json:"createdAt"`
    	} `json:"items"`
    	// Курсор передается в следующий запрос без изменений.
    	NextCursor json.RawMessage `json:"nextCursor"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range result.Items {
    	fmt.Println(item.ID, item.Name, item.CreatedAt)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "nextCursor": {
            "id": 39387
        },
        "items": [
            {
                "id": 39387,
                "documentId": 131,
                "name": "diagram.png",
                "size": 70,
                "mimeType": "image/png",
                "assetType": "image",
                "assetMarkdown": "[[image fileId=39387]]",
                "createdAt": "2026-10-21T15:38:14+03:00"
            }
        ]
    },
    "time": {
        "start": 1792586295,
        "finish": 1792586295.867693,
        "duration": 0.8676929473876953,
        "processing": 0,
        "date_start": "2026-10-21T15:38:15+03:00",
        "date_finish": "2026-10-21T15:38:15+03:00",
        "operating_reset_at": 1792586880,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект со списком файлов и курсором ||
|| **result.items**
[`array`](../../data-types.md) | Массив файлов на странице, по возрастанию идентификатора ||
|| **result.items[].id**
[`integer`](../../data-types.md) | Идентификатор файла ||
|| **result.items[].documentId**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **result.items[].name**
[`string`](../../data-types.md) | Имя файла ||
|| **result.items[].size**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **result.items[].mimeType**
[`string`](../../data-types.md) | MIME-тип файла ||
|| **result.items[].assetType**
[`string`](../../data-types.md) | Тип вложения.

Возможные значения:

- `image` — изображение
- `video` — видео
- `file` — другой файл ||
|| **result.items[].assetMarkdown**
[`string`](../../data-types.md) | Блок Markdown для вставки файла в текст документа. Чтобы проверить, вставлен ли файл в текст, найдите этот блок в `markdown` документа из [note.document.get](../document/note-document-get.md) ||
|| **result.items[].createdAt**
[`datetime`](../../data-types.md) | Дата и время прикрепления файла к документу в формате ISO 8601 с часовым поясом. От нее отсчитывается срок фоновой очистки невставленных файлов ||
|| **result.nextCursor**
[`object`](../../data-types.md) или `null` | Курсор следующей страницы. Передайте его в `pagination.afterCursor` без изменений. `null` — страниц больше нет ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "Обязательное поле `documentId` не указано",
                "field": "documentId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `documentId` | Обязательное поле `documentId` не указано | Добавьте `documentId` в тело запроса ||
|| `documentId` | В поле `documentId` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|| `pagination.limit` | must be a number | Передайте число ||
|| `afterCursor.id` | must be a number | Передайте курсор из `result.nextCursor` без изменений ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет доступа к модулю База знаний ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `documentId` | Запись с ID = `#ID#` не найдена | Документ не существует или недоступен пользователю ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./note-file-add.md)
- [{#T}](./note-file-get.md)
- [{#T}](../document/note-document-get.md)
- [{#T}](./index.md)
