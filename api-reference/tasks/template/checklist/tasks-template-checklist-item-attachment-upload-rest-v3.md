# Загрузить файл в пункт чек-листа шаблона v 3.0 tasks.template.checklist.item.attachment.upload

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом изменения шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `tasks.template.checklist.item.attachment.upload` создает файл из переданного содержимого и прикрепляет его к пункту чек-листа шаблона задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор можно получить методом [tasks.template.add](../tasks-template-add.md) при создании шаблона или методом [tasks.template.list](../tasks-template-list.md) ||
|| **itemId***
[`integer`](../../../data-types.md) | Идентификатор пункта чек-листа. Пункт должен относиться к шаблону `templateId`.

Идентификаторы пунктов можно получить методом [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md) ||
|| **name***
[`string`](../../../data-types.md) | Имя файла с расширением, например `notes.txt` ||
|| **content***
[`string`](../../../data-types.md) | Содержимое файла в кодировке Base64 ||
|#

Файл сохраняется на Диске пользователя, от имени которого сделан запрос, в папке «Загруженные файлы». Если файл с таким именем там уже есть, к имени добавляется номер, например `notes (1).txt`.

Повтор запроса без заголовка `Idempotency-Key` создаст второй файл. С заголовком повтор с тем же ключом и телом вернет прежний ответ. [Подробнее о повторном вызове без дублей](../../../rest-v3.md#idempotency)

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.checklist.item.attachment.upload`

{% endnote %}

В примерах cURL передается заголовок `Idempotency-Key`, чтобы повтор запроса не создал второй файл.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Idempotency-Key: 9f1c1a7e-5f1b-4a1e-9a2c-2f5f2b6c7d80" \
    -d '{"templateId":115,"itemId":153,"name":"notes.txt","content":"VGVzdCBmaWxlIGZvciBjaGVja2xpc3QgZG9jcw=="}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.item.attachment.upload
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -H "Idempotency-Key: 9f1c1a7e-5f1b-4a1e-9a2c-2f5f2b6c7d80" \
    -d '{"templateId":115,"itemId":153,"name":"notes.txt","content":"VGVzdCBmaWxlIGZvciBjaGVja2xpc3QgZG9jcw==","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.checklist.item.attachment.upload
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
    type TemplateCheckListUploadResult = {
      item: {
        id: number
        objectId: number
        name: string
        size: number
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateCheckListUploadResult>(
        'tasks.template.checklist.item.attachment.upload',
        {
          templateId: 115,
          itemId: 153,
          name: 'notes.txt',
          content: 'VGVzdCBmaWxlIGZvciBjaGVja2xpc3QgZG9jcw==',
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Attachment created:', result.item.id, result.item.objectId)
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
      async function uploadTemplateCheckListFile() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.checklist.item.attachment.upload',
            {
              templateId: 115,
              itemId: 153,
              name: 'notes.txt',
              content: 'VGVzdCBmaWxlIGZvciBjaGVja2xpc3QgZG9jcw==',
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Attachment created:', result.item.id, result.item.objectId)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', uploadTemplateCheckListFile)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.checklist.item.attachment.upload"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 115,
                "itemId": 153,
                "name": "notes.txt",
                "content": "VGVzdCBmaWxlIGZvciBjaGVja2xpc3QgZG9jcw==",
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
                'tasks.template.checklist.item.attachment.upload',
                [
                    'templateId' => 115,
                    'itemId' => 153,
                    'name' => 'notes.txt',
                    'content' => 'VGVzdCBmaWxlIGZvciBjaGVja2xpc3QgZG9jcw==',
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
        'tasks.template.checklist.item.attachment.upload',
        {
            templateId: 115,
            itemId: 153,
            name: 'notes.txt',
            content: 'VGVzdCBmaWxlIGZvciBjaGVja2xpc3QgZG9jcw==',
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
        'tasks.template.checklist.item.attachment.upload',
        [
            'templateId' => 115,
            'itemId' => 153,
            'name' => 'notes.txt',
            'content' => 'VGVzdCBmaWxlIGZvciBjaGVja2xpc3QgZG9jcw==',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.checklist.item.attachment.upload", b24.Params{
    	"templateId": 115,
    	"itemId":     153,
    	"name":       "notes.txt",
    	"content":    "VGVzdCBmaWxlIGZvciBjaGVja2xpc3QgZG9jcw==",
    })
    if err != nil {
    	return fmt.Errorf("tasks.template.checklist.item.attachment.upload: %w", err)
    }

    // Метод заворачивает вложение в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID       int    `json:"id"`
    	ObjectID int    `json:"objectId"`
    	Name     string `json:"name"`
    	Size     int    `json:"size"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.ObjectID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 653,
            "objectId": 11579,
            "name": "notes.txt",
            "type": "text/plain",
            "size": 28,
            "width": 0,
            "height": 0,
            "isImage": false,
            "isVideo": false,
            "downloadUrl": "/bitrix/services/main/ajax.php?action=disk.attachedObject.download&SITE_ID=s1&attachedObjectId=653",
            "previewUrl": null,
            "ownerId": 1269
        }
    },
    "time": {
        "start": 1795428995,
        "finish": 1795428995.564208,
        "duration": 0.5642080307006836,
        "processing": 0,
        "date_start": "2026-11-23T13:16:35+03:00",
        "date_finish": "2026-11-23T13:16:35+03:00",
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
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **item**
[`object`](../../../data-types.md) | Созданное вложение. [Описание полей вложения](./tasks-template-checklist-get-rest-v3.md#attachment) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Значение поля не может быть пустым",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `templateId` | Обязательное поле `templateId` не указано | Добавьте `templateId` в тело запроса ||
|| `templateId` | В поле `templateId` требуется тип данных `int` для такого запроса | Передайте идентификатор шаблона числом ||
|| `itemId` | Обязательное поле `itemId` не указано | Добавьте `itemId` в тело запроса ||
|| `name` | Обязательное поле `name` не указано | Добавьте `name` в тело запроса ||
|| `name` | Значение поля не может быть пустым | Передайте имя файла с расширением ||
|| `content` | Обязательное поле `content` не указано | Добавьте `content` в тело запроса ||
|| `content` | Значение поля не может быть пустым | Передайте содержимое файла в кодировке Base64 ||
|#

#### Шаблон или пункт не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999` не найдена | В сообщении — идентификатор шаблона или пункта. Проверьте шаблон методом [tasks.template.list](../tasks-template-list.md), а пункт — методом [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md). Пункт другого шаблона метод тоже не находит ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право изменения шаблона и что в Битрикс24 доступна новая карточка задач ||
|#

#### Ошибка выполнения

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_OPERATIONFAILEDEXCEPTION`

HTTP-статус: **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удалось выполнить запрос. Попробуйте еще раз — если не поможет, обратитесь к администратору Битрикс24 | Повторите запрос. Если ошибка сохраняется, обратитесь к администратору Битрикс24 ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-checklist-item-attachment-attach-rest-v3.md)
- [{#T}](./tasks-template-checklist-item-attachment-detach-rest-v3.md)
- [{#T}](./tasks-template-checklist-get-rest-v3.md)
- [{#T}](./tasks-template-checklist-add-attachment-by-content.md)
