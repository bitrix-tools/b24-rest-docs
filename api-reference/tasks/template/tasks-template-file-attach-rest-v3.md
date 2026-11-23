# Прикрепить файлы к шаблону задачи v 3.0 tasks.template.file.attach

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом редактирования шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.file.attach` прикрепляет к шаблону задачи файлы с Диска.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор можно получить методом [tasks.template.add](./tasks-template-add.md) при создании шаблона или методом [tasks.template.list](./tasks-template-list.md) ||
|| **fileIds***
[`integer[]`](../../data-types.md) | Массив идентификаторов файлов на Диске, только положительные числа.

Получить идентификаторы файлов можно двумя способами.

Использовать один из методов загрузки файла:
  - [disk.storage.uploadfile](../../disk/storage/disk-storage-upload-file.md)
  - [disk.folder.uploadfile](../../disk/folder/disk-folder-upload-file.md)

Использовать один из методов получения списка файлов:
  - [disk.storage.getchildren](../../disk/storage/disk-storage-get-children.md)
  - [disk.folder.getchildren](../../disk/folder/disk-folder-get-children.md) ||
|#

Метод добавляет файлы к уже прикрепленным, а не заменяет их. Если файл уже прикреплен к шаблону, повторный вызов не создает второе вложение.

Каждый прикрепленный файл получает идентификатор вложения. Его возвращает метод [tasks.template.file.list](./tasks-template-file-list-rest-v3.md) в поле `id`, по нему файл открепляют методом [tasks.template.file.detach](./tasks-template-file-detach-rest-v3.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.file.attach`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":113,"fileIds":[11573,11575]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.file.attach
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":113,"fileIds":[11573,11575],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.file.attach
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
    type AttachTemplateFilesResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<AttachTemplateFilesResult>(
        'tasks.template.file.attach',
        {
          templateId: 113,
          fileIds: [11573, 11575],
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Files attached:', result.result)
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
      async function attachTemplateFiles() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.file.attach',
            {
              templateId: 113,
              fileIds: [11573, 11575],
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Files attached:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', attachTemplateFiles)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.file.attach"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 113,
                "fileIds": [11573, 11575],
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
                'tasks.template.file.attach',
                [
                    'templateId' => 113,
                    'fileIds' => [11573, 11575],
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
        'tasks.template.file.attach',
        {
            templateId: 113,
            fileIds: [11573, 11575],
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
        'tasks.template.file.attach',
        [
            'templateId' => 113,
            'fileIds' => [11573, 11575],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.file.attach", b24.Params{
    	"templateId": 113,
    	"fileIds":    []int{11573, 11575},
    })
    if err != nil {
    	return fmt.Errorf("tasks.template.file.attach: %w", err)
    }

    var item struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": true
    },
    "time": {
        "start": 1795429005,
        "finish": 1795429006.002068,
        "duration": 1.002068042755127,
        "processing": 1,
        "date_start": "2026-11-23T13:16:45+03:00",
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
[`boolean`](../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если файлы прикреплены. При пустом массиве `fileIds` метод тоже возвращает `true` и ничего не меняет ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Не удалось найти файл."
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
|| `fileIds` | Обязательное поле `fileIds` не указано | Добавьте `fileIds` в тело запроса ||
|| `fileIds` | В поле `fileIds` требуется тип данных `array` для такого запроса | Передайте `fileIds` массивом, например `[11573]` ||
|| `fileIds` | В поле `fileIds` требуется тип данных `integer` для такого запроса | Передайте элементы массива числами, а не строками ||
|| `fileIds` | Each string must start with "n" followed by a positive integer. | Передайте положительные идентификаторы файлов на Диске. Ошибка возникает, если в массиве есть `0` или отрицательное число ||
|#

#### Ошибка валидации файлов

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удалось найти файл. | Проверьте идентификатор файла методом [disk.file.get](../../disk/file/disk-file-get.md). Передайте идентификатор файла на Диске, а не идентификатор вложения ||
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
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право редактирования шаблона и что на портале доступна новая карточка задач ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-file-list-rest-v3.md)
- [{#T}](./tasks-template-file-detach-rest-v3.md)
- [{#T}](./tasks-template-update-rest-v3.md)
- [{#T}](../../disk/storage/disk-storage-upload-file.md)
