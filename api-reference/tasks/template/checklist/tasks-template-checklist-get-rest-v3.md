# Получить чек-лист шаблона задачи v 3.0 tasks.template.checklist.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения шаблона

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `tasks.template.checklist.get` возвращает все пункты чек-листа шаблона задачи одним списком.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор можно получить методом [tasks.template.add](../tasks-template-add.md) при создании шаблона или методом [tasks.template.list](../tasks-template-list.md) ||
|| **select**
[`array`](../../../data-types.md) | Массив полей пункта, которые вернет метод. Если `select` не задан, метод возвращает все поля.

Доступные поля: `id`, `parentId`, `sortIndex`, `title`, `isComplete`, `isImportant`, `creatorId`, `toggledById`, `toggledDate`, `accomplices`, `auditors`, `attachments`, `collapsed`. [Описание полей пункта](#checklist-item)

Для полей `accomplices`, `auditors` и `attachments` можно запросить отдельные поля вложенного объекта через точку, например `["id","title","accomplices.name","attachments.objectId"]` ||
|#

Метод читает чек-лист целиком, без постраничной навигации. Вложенность пунктов задает поле `parentId`, порядок внутри родителя — поле `sortIndex`. Пункты в ответе не отсортированы по дереву, поэтому стройте дерево по `parentId`.

Пункт с `parentId` = `null` находится в корне. Корневой пункт — это название отдельного чек-листа, его подпункты — пункты этого чек-листа. У шаблона без чек-листа метод возвращает пустой массив `items`.

{% note warning "" %}

Метод прошлой версии с тем же именем [tasks.template.checklist.get](./tasks-template-checklist-get.md) возвращает один пункт по идентификатору. Весь чек-лист в прошлой версии возвращает метод [tasks.template.checklist.list](./tasks-template-checklist-list.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.checklist.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":115,"select":["id","parentId","sortIndex","title","isComplete","accomplices.name","attachments.objectId"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":115,"select":["id","parentId","sortIndex","title","isComplete","accomplices.name","attachments.objectId"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.checklist.get
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
    type TemplateCheckListGetResult = {
      items: Array<{
        id: number
        parentId: number | null
        sortIndex: number
        title: string
        isComplete: boolean
        accomplices: Array<{ name: string }>
        attachments: Array<{ objectId: number }>
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateCheckListGetResult>(
        'tasks.template.checklist.get',
        {
          templateId: 115,
          select: [
            'id',
            'parentId',
            'sortIndex',
            'title',
            'isComplete',
            'accomplices.name',
            'attachments.objectId',
          ],
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        // Items come as a flat list: build the tree by parentId
        for (const item of result.items) {
          console.info(item.id, item.parentId, item.title, item.isComplete)
        }
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
      async function getTemplateCheckList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.checklist.get',
            {
              templateId: 115,
              select: [
                'id',
                'parentId',
                'sortIndex',
                'title',
                'isComplete',
                'accomplices.name',
                'attachments.objectId',
              ],
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(item => console.info(item.id, item.parentId, item.title, item.isComplete))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTemplateCheckList)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.checklist.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 115,
                "select": [
                    "id",
                    "parentId",
                    "sortIndex",
                    "title",
                    "isComplete",
                    "accomplices.name",
                    "attachments.objectId",
                ],
            },
            prefer_version=3,
        )
        result = response["result"]
        for item in result["items"]:
            print(item["id"], item["parentId"], item["title"], item["isComplete"])
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
                'tasks.template.checklist.get',
                [
                    'templateId' => 115,
                    'select' => [
                        'id',
                        'parentId',
                        'sortIndex',
                        'title',
                        'isComplete',
                        'accomplices.name',
                        'attachments.objectId',
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
        'tasks.template.checklist.get',
        {
            templateId: 115,
            select: [
                'id',
                'parentId',
                'sortIndex',
                'title',
                'isComplete',
                'accomplices.name',
                'attachments.objectId',
            ],
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
        'tasks.template.checklist.get',
        [
            'templateId' => 115,
            'select' => [
                'id',
                'parentId',
                'sortIndex',
                'title',
                'isComplete',
                'accomplices.name',
                'attachments.objectId',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.checklist.get", b24.Params{
    	"templateId": 115,
    	"select": []string{
    		"id", "parentId", "sortIndex", "title", "isComplete",
    		"accomplices.name", "attachments.objectId",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.checklist.get: %w", err)
    }

    // Метод заворачивает пункты в массив с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID         int    `json:"id"`
    	ParentID   *int   `json:"parentId"`
    	SortIndex  int    `json:"sortIndex"`
    	Title      string `json:"title"`
    	IsComplete bool   `json:"isComplete"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, item := range items {
    	fmt.Println(item.ID, item.ParentID, item.Title, item.IsComplete)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Пример ответа без параметра `select`:

```json
{
    "result": {
        "items": [
            {
                "id": 155,
                "parentId": 149,
                "sortIndex": 0,
                "title": "Перепроверить данные",
                "isComplete": false,
                "isImportant": true,
                "creatorId": null,
                "toggledById": null,
                "toggledDate": null,
                "accomplices": [],
                "auditors": [],
                "attachments": [
                    {
                        "id": 657,
                        "objectId": 11583,
                        "name": "report.txt",
                        "type": "text/plain",
                        "size": 28,
                        "width": 0,
                        "height": 0,
                        "isImage": false,
                        "isVideo": false,
                        "downloadUrl": "/bitrix/services/main/ajax.php?action=disk.attachedObject.download&SITE_ID=s1&attachedObjectId=657",
                        "previewUrl": null,
                        "ownerId": 1269
                    }
                ],
                "collapsed": false
            },
            {
                "id": 149,
                "parentId": null,
                "sortIndex": 0,
                "title": "Чек-лист",
                "isComplete": false,
                "isImportant": false,
                "creatorId": null,
                "toggledById": null,
                "toggledDate": null,
                "accomplices": [],
                "auditors": [],
                "attachments": [],
                "collapsed": false
            },
            {
                "id": 153,
                "parentId": 149,
                "sortIndex": 1,
                "title": "Собрать данные",
                "isComplete": true,
                "isImportant": true,
                "creatorId": null,
                "toggledById": null,
                "toggledDate": null,
                "accomplices": [
                    {
                        "id": 1269,
                        "name": "Иван Петров",
                        "role": null,
                        "image": {
                            "id": null,
                            "src": "https://cdn-ru.bitrix24.ru/b13743910/resize_cache/32741/45a41af90f4a8f8ae94152f60a6ec694/main/bd3/bd36722eacdbe1263e452943ce21a820/avatar.png",
                            "name": null,
                            "width": 100,
                            "height": 100,
                            "size": 24131,
                            "subDir": null,
                            "contentType": null,
                            "file": null
                        },
                        "gender": "M",
                        "email": null,
                        "externalAuthId": null,
                        "rights": []
                    }
                ],
                "auditors": [],
                "attachments": [],
                "collapsed": false
            },
            {
                "id": 151,
                "parentId": null,
                "sortIndex": 1,
                "title": "Подготовить отчет",
                "isComplete": false,
                "isImportant": false,
                "creatorId": null,
                "toggledById": null,
                "toggledDate": null,
                "accomplices": [],
                "auditors": [],
                "attachments": [],
                "collapsed": false
            }
        ]
    },
    "time": {
        "start": 1795429337,
        "finish": 1795429337.807546,
        "duration": 0.8075459003448486,
        "processing": 0,
        "date_start": "2026-11-23T13:22:17+03:00",
        "date_finish": "2026-11-23T13:22:17+03:00",
        "operating_reset_at": 1795429920,
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
|| **items**
[`object[]`](../../../data-types.md) | Массив пунктов чек-листа шаблона. Каждый элемент — [объект пункта чек-листа](#checklist-item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект пункта чек-листа {#checklist-item}

Набор полей зависит от параметра `select`. Поля, отмеченные «только для чтения», нельзя передать в методы [tasks.template.checklist.item.add](./tasks-template-checklist-item-add-rest-v3.md), [tasks.template.checklist.item.update](./tasks-template-checklist-item-update-rest-v3.md) и [tasks.template.checklist.save](./tasks-template-checklist-save-rest-v3.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор пункта чек-листа ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского пункта того же шаблона. У корневого пункта — `null` ||
|| **sortIndex**
[`integer`](../../../data-types.md) | Порядковый номер пункта среди пунктов того же родителя, счет с нуля ||
|| **title**
[`string`](../../../data-types.md) | Текст пункта. У корневого пункта — название чек-листа ||
|| **isComplete**
[`boolean`](../../../data-types.md) | Признак выполнения пункта.

Возможные значения:

- `true` — пункт отмечен выполненным
- `false` — пункт не выполнен ||
|| **isImportant**
[`boolean`](../../../data-types.md) | Признак важного пункта.

Возможные значения:

- `true` — пункт отмечен важным
- `false` — обычный пункт ||
|| **creatorId**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который создал пункт. Только для чтения.

В чек-листе шаблона приходит `null` ||
|| **toggledById**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который последним отметил пункт выполненным или снял отметку. Только для чтения.

В чек-листе шаблона приходит `null` ||
|| **toggledDate**
[`datetime`](../../../data-types.md) | Дата и время последней отметки о выполнении. Только для чтения.

В чек-листе шаблона приходит `null` ||
|| **accomplices**
[`object[]`](../../../data-types.md) | Соисполнители пункта. Каждый элемент — [объект пользователя](#user).

Соисполнители пункта добавляются к соисполнителям шаблона ||
|| **auditors**
[`object[]`](../../../data-types.md) | Наблюдатели пункта. Каждый элемент — [объект пользователя](#user).

Наблюдатели пункта добавляются к наблюдателям шаблона ||
|| **attachments**
[`object[]`](../../../data-types.md) | Файлы, прикрепленные к пункту. Каждый элемент — [объект вложения](#attachment). Только для чтения.

Вложения меняют методы [tasks.template.checklist.item.attachment.attach](./tasks-template-checklist-item-attachment-attach-rest-v3.md), [tasks.template.checklist.item.attachment.upload](./tasks-template-checklist-item-attachment-upload-rest-v3.md) и [tasks.template.checklist.item.attachment.detach](./tasks-template-checklist-item-attachment-detach-rest-v3.md) ||
|| **collapsed**
[`boolean`](../../../data-types.md) | Признак свернутого пункта. Значение свое у каждого пользователя, в ответе — значение пользователя, от имени которого сделан запрос. Только для чтения.

Возможные значения:

- `true` — вложенные пункты свернуты
- `false` — вложенные пункты развернуты

Значение меняют методы [tasks.template.checklist.item.collapse](./tasks-template-checklist-item-collapse-rest-v3.md) и [tasks.template.checklist.item.expand](./tasks-template-checklist-item-expand-rest-v3.md) ||
|#

#### Объект пользователя {#user}

При записи в `accomplices` и `auditors` достаточно передать объекты с ключом `id`, например `[{"id":1269}]`. Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор пользователя ||
|| **name**
[`string`](../../../data-types.md) | Имя и фамилия пользователя ||
|| **role**
[`string`](../../../data-types.md) | Роль пользователя. В чек-листе шаблона приходит `null` ||
|| **image**
[`object`](../../../data-types.md) | Аватар пользователя. Ключи объекта: `id`, `src`, `name`, `width`, `height`, `size`, `subDir`, `contentType`, `file`. Ссылка на изображение — в ключе `src`, размеры в пикселях — в ключах `width` и `height`, размер в байтах — в ключе `size` ||
|| **gender**
[`string`](../../../data-types.md) | Пол пользователя.

Возможные значения:

- `M` — мужской
- `F` — женский ||
|| **email**
[`string`](../../../data-types.md) | Электронная почта пользователя. В чек-листе шаблона приходит `null` ||
|| **externalAuthId**
[`string`](../../../data-types.md) | Тип внешней авторизации пользователя. В чек-листе шаблона приходит `null` ||
|| **rights**
[`array`](../../../data-types.md) | Права пользователя. В чек-листе шаблона приходит пустой массив ||
|#

#### Объект вложения {#attachment}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор вложения. Его передают в метод [tasks.template.checklist.item.attachment.detach](./tasks-template-checklist-item-attachment-detach-rest-v3.md) ||
|| **objectId**
[`integer`](../../../data-types.md) | Идентификатор файла на Диске. Его передают в метод [tasks.template.checklist.item.attachment.attach](./tasks-template-checklist-item-attachment-attach-rest-v3.md) и в методы `disk.file.*`, например [disk.file.get](../../../disk/file/disk-file-get.md) ||
|| **name**
[`string`](../../../data-types.md) | Имя файла с расширением ||
|| **type**
[`string`](../../../data-types.md) | MIME-тип файла, например `text/plain` ||
|| **size**
[`integer`](../../../data-types.md) | Размер файла в байтах ||
|| **width**
[`integer`](../../../data-types.md) | Ширина изображения в пикселях. У файла, который не является изображением, — `0` ||
|| **height**
[`integer`](../../../data-types.md) | Высота изображения в пикселях. У файла, который не является изображением, — `0` ||
|| **isImage**
[`boolean`](../../../data-types.md) | Признак изображения.

Возможные значения:

- `true` — файл является изображением
- `false` — файл не является изображением ||
|| **isVideo**
[`boolean`](../../../data-types.md) | Признак видео.

Возможные значения:

- `true` — файл является видео
- `false` — файл не является видео ||
|| **downloadUrl**
[`string`](../../../data-types.md) | Относительная ссылка на скачивание файла ||
|| **previewUrl**
[`string`](../../../data-types.md) | Ссылка на предпросмотр файла. Если предпросмотра нет — `null` ||
|| **ownerId**
[`integer`](../../../data-types.md) | Идентификатор пользователя, который загрузил файл ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
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
|#

#### Неизвестное поле в select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `CheckListItemDto` | Укажите в `select` поля из [описания пункта чек-листа](#checklist-item) ||
|#

#### Шаблон не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999` не найдена | Проверьте идентификатор шаблона методом [tasks.template.list](../tasks-template-list.md). Удаленный шаблон метод тоже не находит ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право чтения шаблона и что в Битрикс24 доступна новая карточка задач ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-checklist-save-rest-v3.md)
- [{#T}](./tasks-template-checklist-item-add-rest-v3.md)
- [{#T}](./tasks-template-checklist-item-update-rest-v3.md)
- [{#T}](../tasks-template-get-rest-v3.md)
- [{#T}](./tasks-template-checklist-list.md)
