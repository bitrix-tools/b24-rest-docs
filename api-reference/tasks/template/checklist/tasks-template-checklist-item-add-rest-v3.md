# Добавить пункт в чек-лист шаблона задачи v 3.0 tasks.template.checklist.item.add

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

Метод `tasks.template.checklist.item.add` добавляет один пункт в чек-лист шаблона задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор можно получить методом [tasks.template.add](../tasks-template-add.md) при создании шаблона или методом [tasks.template.list](../tasks-template-list.md) ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей нового пункта [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **title***
[`string`](../../../data-types.md) | Текст пункта. Для корневого пункта — название чек-листа. Пустую строку передать нельзя ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского пункта того же шаблона. Значение `0` или `null` — корень чек-листа.

Если поле не передано, пункт добавляется в корень. Идентификаторы пунктов можно получить методом [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md) ||
|| **sortIndex**
[`integer`](../../../data-types.md) | Порядковый номер пункта среди пунктов того же родителя, счет с нуля. Значение не меньше `0`.

Если поле не передано, пункт добавляется последним. Если позиция занята, следующие пункты сдвигаются ||
|| **isComplete**
[`boolean`](../../../data-types.md) | Признак выполнения пункта.

Возможные значения:

- `true` — пункт выполнен
- `false` — пункт не выполнен

По умолчанию: `false` ||
|| **isImportant**
[`boolean`](../../../data-types.md) | Признак важного пункта.

Возможные значения:

- `true` — пункт важный
- `false` — обычный пункт

По умолчанию: `false` ||
|| **accomplices**
[`object[]`](../../../data-types.md) | Соисполнители пункта — массив объектов с ключом `id`, например `[{"id":1269}]`.

Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md) ||
|| **auditors**
[`object[]`](../../../data-types.md) | Наблюдатели пункта — массив объектов с ключом `id`, например `[{"id":1}]`.

Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md) ||
|#

Чтобы создать новый чек-лист, добавьте корневой пункт без `parentId` — его `title` станет названием чек-листа. Затем добавьте пункты с `parentId` корневого пункта.

Соисполнители и наблюдатели пункта добавляются к соисполнителям и наблюдателям шаблона.

Метод поддерживает заголовок `Idempotency-Key`: повтор запроса с тем же ключом и телом не создает второй пункт. [Подробнее о повторном вызове без дублей](../../../rest-v3.md#idempotency)

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.checklist.item.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":115,"fields":{"title":"Собрать данные","parentId":149,"isImportant":true,"accomplices":[{"id":1269}],"auditors":[{"id":1}]}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.item.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":115,"fields":{"title":"Собрать данные","parentId":149,"isImportant":true,"accomplices":[{"id":1269}],"auditors":[{"id":1}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.checklist.item.add
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
    type TemplateCheckListItemAddResult = {
      item: {
        id: number
        parentId: number | null
        sortIndex: number
        title: string
        isComplete: boolean
        isImportant: boolean
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateCheckListItemAddResult>(
        'tasks.template.checklist.item.add',
        {
          templateId: 115,
          fields: {
            title: 'Собрать данные',
            parentId: 149,
            isImportant: true,
            accomplices: [{ id: 1269 }],
            auditors: [{ id: 1 }],
          },
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Item created:', result.item.id, result.item.sortIndex)
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
      async function addTemplateCheckListItem() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.checklist.item.add',
            {
              templateId: 115,
              fields: {
                title: 'Собрать данные',
                parentId: 149,
                isImportant: true,
                accomplices: [{ id: 1269 }],
                auditors: [{ id: 1 }],
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Item created:', result.item.id, result.item.sortIndex)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addTemplateCheckListItem)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.checklist.item.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 115,
                "fields": {
                    "title": "Собрать данные",
                    "parentId": 149,
                    "isImportant": True,
                    "accomplices": [{"id": 1269}],
                    "auditors": [{"id": 1}],
                },
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
                'tasks.template.checklist.item.add',
                [
                    'templateId' => 115,
                    'fields' => [
                        'title' => 'Собрать данные',
                        'parentId' => 149,
                        'isImportant' => true,
                        'accomplices' => [['id' => 1269]],
                        'auditors' => [['id' => 1]],
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
        'tasks.template.checklist.item.add',
        {
            templateId: 115,
            fields: {
                title: 'Собрать данные',
                parentId: 149,
                isImportant: true,
                accomplices: [{ id: 1269 }],
                auditors: [{ id: 1 }],
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
        'tasks.template.checklist.item.add',
        [
            'templateId' => 115,
            'fields' => [
                'title' => 'Собрать данные',
                'parentId' => 149,
                'isImportant' => true,
                'accomplices' => [['id' => 1269]],
                'auditors' => [['id' => 1]],
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
    res, err := client.Core().Call(ctx, "tasks.template.checklist.item.add", b24.Params{
    	"templateId": 115,
    	"fields": map[string]any{
    		"title":       "Собрать данные",
    		"parentId":    149,
    		"isImportant": true,
    		"accomplices": []map[string]any{{"id": 1269}},
    		"auditors":    []map[string]any{{"id": 1}},
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.template.checklist.item.add: %w", err)
    }

    // Метод заворачивает пункт в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID        int    `json:"id"`
    	ParentID  *int   `json:"parentId"`
    	SortIndex int    `json:"sortIndex"`
    	Title     string `json:"title"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.SortIndex)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 153,
            "parentId": 149,
            "sortIndex": 0,
            "title": "Собрать данные",
            "isComplete": false,
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
            "auditors": [
                {
                    "id": 1,
                    "name": "Анна Смирнова",
                    "role": null,
                    "image": {
                        "id": null,
                        "src": "https://cdn-ru.bitrix24.ru/b13743910/resize_cache/2267/45a41af90f4a8f8ae94152f60a6ec694/main/c7b/c7bd44b1babaa5448125dd97d038ce1b/avatar.jpg",
                        "name": null,
                        "width": 100,
                        "height": 100,
                        "size": 10001,
                        "subDir": null,
                        "contentType": null,
                        "file": null
                    },
                    "gender": "F",
                    "email": null,
                    "externalAuthId": null,
                    "rights": []
                }
            ],
            "attachments": [],
            "collapsed": false
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
[`object`](../../../data-types.md) | Созданный пункт в сохраненном виде. [Описание полей пункта чек-листа](./tasks-template-checklist-get-rest-v3.md#checklist-item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Не заполнено обязательное поле \"title\"",
                "field": "title"
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
|| `fields` | Обязательное поле `fields` не указано | Добавьте `fields` в тело запроса ||
|| `-` | Property "title" must be set | Передайте в `title` непустую строку ||
|#

#### Ошибки валидации полей

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `title` | Не заполнено обязательное поле "title" | Добавьте `title` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите из `fields` поля только для чтения: `id`, `creatorId`, `toggledById`, `toggledDate`, `attachments`, `collapsed` ||
|| `sortIndex` | Значение поля должно быть не меньше, чем 0 | Передайте `sortIndex` от `0` ||
|#

#### Неизвестное поле

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `CheckListItemDto` | Передайте в `fields` только поля из [описания параметра fields](#fields) ||
|#

#### Шаблон или пункт не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999` не найдена | В сообщении — идентификатор шаблона или пункта из `parentId`. Проверьте шаблон методом [tasks.template.list](../tasks-template-list.md), а пункт — методом [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md). Пункт другого шаблона метод тоже не находит ||
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

- [{#T}](./tasks-template-checklist-item-update-rest-v3.md)
- [{#T}](./tasks-template-checklist-get-rest-v3.md)
- [{#T}](./tasks-template-checklist-item-delete-rest-v3.md)
- [{#T}](./tasks-template-checklist-save-rest-v3.md)
- [{#T}](./tasks-template-checklist-add.md)
