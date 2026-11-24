# Получить файлы шаблона задачи v 3.0 tasks.template.file.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом просмотра шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.file.list` возвращает файлы, прикрепленные к шаблону задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор можно получить методом [tasks.template.add](./tasks-template-add.md) при создании шаблона или методом [tasks.template.list](./tasks-template-list.md) ||
|| **ids**
[`integer[]`](../../data-types.md) | Массив идентификаторов вложений шаблона. Передайте, чтобы получить только эти файлы.

Идентификатор вложения возвращается в поле `id` ответа этого метода. Идентификатор файла на Диске здесь не подходит: файлы с такими значениями не вернутся.

Если массив пустой или параметр не передан, метод возвращает все файлы шаблона ||
|#

Идентификаторы вложений, которые не принадлежат шаблону, метод пропускает без ошибки.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.file.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":113,"ids":[647,649]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.file.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":113,"ids":[647,649],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.file.list
    ```

- JS (TS)

    Методы шаблонов задач REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateFileListResult = {
      items: Array<{
        id: number
        objectId: number
        name: string
        type: string
        size: number
        width: number
        height: number
        isImage: boolean
        isVideo: boolean
        downloadUrl: string
        previewUrl: string | null
        ownerId: number
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateFileListResult>(
        'tasks.template.file.list',
        {
          templateId: 113,
          ids: [647, 649],
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы шаблонов задач REST 3.0 пока не входят в список методов, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listTemplateFiles() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.file.list',
            {
              templateId: 113,
              ids: [647, 649],
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listTemplateFiles)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.file.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 113,
                "ids": [647, 649],
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
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
                'tasks.template.file.list',
                [
                    'templateId' => 113,
                    'ids' => [647, 649],
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
        'tasks.template.file.list',
        {
            templateId: 113,
            ids: [647, 649],
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
        'tasks.template.file.list',
        [
            'templateId' => 113,
            'ids' => [647, 649],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.file.list", b24.Params{
    	"templateId": 113,
    	"ids":        []int{647, 649},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.file.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var files []struct {
    	ID       int    `json:"id"`
    	ObjectID int    `json:"objectId"`
    	Name     string `json:"name"`
    	Size     int    `json:"size"`
    }
    if err := json.Unmarshal(raw, &files); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(len(files))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 647,
                "objectId": 11573,
                "name": "reglament.docx",
                "type": "text/plain",
                "size": 13,
                "width": 0,
                "height": 0,
                "isImage": false,
                "isVideo": false,
                "downloadUrl": "/bitrix/services/main/ajax.php?action=disk.attachedObject.download&SITE_ID=s1&attachedObjectId=647",
                "previewUrl": null,
                "ownerId": 1269
            },
            {
                "id": 649,
                "objectId": 11575,
                "name": "price-list.xlsx",
                "type": "text/plain",
                "size": 13,
                "width": 0,
                "height": 0,
                "isImage": false,
                "isVideo": false,
                "downloadUrl": "/bitrix/services/main/ajax.php?action=disk.attachedObject.download&SITE_ID=s1&attachedObjectId=649",
                "previewUrl": null,
                "ownerId": 1269
            }
        ]
    },
    "time": {
        "start": 1795429006,
        "finish": 1795429006.852523,
        "duration": 0.8525230884552002,
        "processing": 0,
        "date_start": "2026-11-23T13:16:46+03:00",
        "date_finish": "2026-11-23T13:16:46+03:00",
        "operating_reset_at": 1795429560,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **items**
[`object[]`](../../data-types.md) | Массив файлов шаблона [(подробное описание)](#items). Если у шаблона нет файлов, массив пустой ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор вложения шаблона. По нему файл открепляют методом [tasks.template.file.detach](./tasks-template-file-detach-rest-v3.md) ||
|| **objectId**
[`integer`](../../data-types.md) | Идентификатор файла на Диске. По нему файл прикрепляют методом [tasks.template.file.attach](./tasks-template-file-attach-rest-v3.md) ||
|| **name**
[`string`](../../data-types.md) | Имя файла с расширением ||
|| **type**
[`string`](../../data-types.md) | MIME-тип содержимого, например `image/png` ||
|| **size**
[`integer`](../../data-types.md) | Размер файла в байтах ||
|| **width**
[`integer`](../../data-types.md) | Ширина изображения в пикселях. Для файлов, которые не являются изображениями, — `0` ||
|| **height**
[`integer`](../../data-types.md) | Высота изображения в пикселях. Для файлов, которые не являются изображениями, — `0` ||
|| **isImage**
[`boolean`](../../data-types.md) | Признак изображения.

Возможные значения:

- `true` — файл является изображением
- `false` — файл не является изображением ||
|| **isVideo**
[`boolean`](../../data-types.md) | Признак видео.

Возможные значения:

- `true` — файл является видео
- `false` — файл не является видео ||
|| **downloadUrl**
[`string`](../../data-types.md) | Относительная ссылка на скачивание файла. Чтобы скачать файл, добавьте перед ней адрес Битрикс24 ||
|| **previewUrl**
[`string`](../../data-types.md) | Ссылка на предпросмотр файла. Если предпросмотра нет, возвращается `null` ||
|| **ownerId**
[`integer`](../../data-types.md) | Идентификатор пользователя, который загрузил файл ||
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
                "message": "В поле `ids` требуется тип данных `integer` для такого запроса",
                "field": "ids"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `templateId` | Обязательное поле `templateId` не указано | Добавьте `templateId` в тело запроса ||
|| `templateId` | В поле `templateId` требуется тип данных `int` для такого запроса | Передайте идентификатор шаблона числом ||
|| `ids` | В поле `ids` требуется тип данных `array` для такого запроса | Передайте `ids` массивом, например `[647]` ||
|| `ids` | В поле `ids` требуется тип данных `integer` для такого запроса | Передайте элементы массива числами, а не строками ||
|#

#### Шаблон не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999` не найдена | Проверьте идентификатор шаблона методом [tasks.template.list](./tasks-template-list.md). Удаленный шаблон метод тоже не находит ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право просмотра шаблона и что на портале доступна новая карточка задач ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-file-attach-rest-v3.md)
- [{#T}](./tasks-template-file-detach-rest-v3.md)
- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
