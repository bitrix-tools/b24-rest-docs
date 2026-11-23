# Сохранить чек-лист шаблона задачи целиком v 3.0 tasks.template.checklist.save

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

Метод `tasks.template.checklist.save` заменяет чек-лист шаблона задачи переданным набором пунктов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор можно получить методом [tasks.template.add](../tasks-template-add.md) при создании шаблона или методом [tasks.template.list](../tasks-template-list.md) ||
|| **items***
[`object[]`](../../../data-types.md) | Массив пунктов чек-листа, который должен остаться в шаблоне после вызова [(подробное описание)](#items).

Пустой массив `[]` удаляет все пункты чек-листа ||
|#

### Параметр items {#items}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор существующего пункта чек-листа этого шаблона. Пункт с `id` сохраняется, пункт без `id` создается.

Идентификаторы пунктов можно получить методом [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md) ||
|| **title**
[`string`](../../../data-types.md) | Текст пункта. Для корневого пункта — название чек-листа.

Обязателен для нового пункта, то есть для пункта без `id` ||
|| **parentId**
[`integer`](../../../data-types.md) | Идентификатор родительского пункта. Значение `0` или `null` — корень чек-листа.

Родителем может быть только пункт, который уже сохранен в шаблоне. Нельзя указать сам пункт или вложенный в него пункт.

Если у пункта с `id` поле не передано, родитель не меняется ||
|| **sortIndex**
[`integer`](../../../data-types.md) | Порядковый номер пункта среди пунктов того же родителя, счет с нуля. Значение не меньше `0`.

Если поле не передано, новый пункт встает по порядку в запросе ||
|| **isComplete**
[`boolean`](../../../data-types.md) | Признак выполнения пункта.

Возможные значения:

- `true` — пункт выполнен
- `false` — пункт не выполнен

По умолчанию для нового пункта: `false` ||
|| **isImportant**
[`boolean`](../../../data-types.md) | Признак важного пункта.

Возможные значения:

- `true` — пункт важный
- `false` — обычный пункт

По умолчанию для нового пункта: `false` ||
|| **accomplices**
[`object[]`](../../../data-types.md) | Соисполнители пункта — массив объектов с ключом `id`, например `[{"id":1269}]`.

Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md) ||
|| **auditors**
[`object[]`](../../../data-types.md) | Наблюдатели пункта — массив объектов с ключом `id`, например `[{"id":1}]`.

Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md) ||
|#

Как метод обрабатывает пункты:

- пункт с `id` сохраняется, поля, которых нет в запросе, сохраняют текущие значения
- пункт без `id` создается
- пункты шаблона, которых нет в `items`, удаляются
- вложения сохраненных пунктов не меняются: вложения меняют только методы `tasks.template.checklist.item.attachment.*`

Новый пункт можно вложить только в пункт, который уже есть в шаблоне. Новый корневой пункт и его подпункты одним вызовом не создать: сначала сохраните корневой пункт, получите его `id` методом [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md) и передайте его в `parentId` подпунктов следующим вызовом. Можно также добавить пункт методом [tasks.template.checklist.item.add](./tasks-template-checklist-item-add-rest-v3.md) — он сразу возвращает `id`.

Соисполнители и наблюдатели пунктов добавляются к соисполнителям и наблюдателям шаблона.

Метод поддерживает заголовок `Idempotency-Key`: повтор запроса с тем же ключом и телом не выполняет сохранение второй раз. [Подробнее о повторном вызове без дублей](../../../rest-v3.md#idempotency)

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.checklist.save`

{% endnote %}

В примере пункт `159` сохраняется с новым текстом, в него добавляются два новых подпункта, а остальные пункты шаблона удаляются.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":129,"items":[{"id":159,"title":"Этап 2"},{"title":"Шаг 1","parentId":159},{"title":"Шаг 2","parentId":159,"isImportant":true,"accomplices":[{"id":1269}]}]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.save
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":129,"items":[{"id":159,"title":"Этап 2"},{"title":"Шаг 1","parentId":159},{"title":"Шаг 2","parentId":159,"isImportant":true,"accomplices":[{"id":1269}]}],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.checklist.save
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
    type TemplateCheckListSaveResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateCheckListSaveResult>(
        'tasks.template.checklist.save',
        {
          templateId: 129,
          items: [
            { id: 159, title: 'Этап 2' },
            { title: 'Шаг 1', parentId: 159 },
            { title: 'Шаг 2', parentId: 159, isImportant: true, accomplices: [{ id: 1269 }] },
          ],
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Checklist saved:', result.result)
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
      async function saveTemplateCheckList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.checklist.save',
            {
              templateId: 129,
              items: [
                { id: 159, title: 'Этап 2' },
                { title: 'Шаг 1', parentId: 159 },
                { title: 'Шаг 2', parentId: 159, isImportant: true, accomplices: [{ id: 1269 }] },
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
          console.info('Checklist saved:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', saveTemplateCheckList)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.checklist.save"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 129,
                "items": [
                    {"id": 159, "title": "Этап 2"},
                    {"title": "Шаг 1", "parentId": 159},
                    {"title": "Шаг 2", "parentId": 159, "isImportant": True, "accomplices": [{"id": 1269}]},
                ],
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
                'tasks.template.checklist.save',
                [
                    'templateId' => 129,
                    'items' => [
                        ['id' => 159, 'title' => 'Этап 2'],
                        ['title' => 'Шаг 1', 'parentId' => 159],
                        ['title' => 'Шаг 2', 'parentId' => 159, 'isImportant' => true, 'accomplices' => [['id' => 1269]]],
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
        'tasks.template.checklist.save',
        {
            templateId: 129,
            items: [
                { id: 159, title: 'Этап 2' },
                { title: 'Шаг 1', parentId: 159 },
                { title: 'Шаг 2', parentId: 159, isImportant: true, accomplices: [{ id: 1269 }] },
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
        'tasks.template.checklist.save',
        [
            'templateId' => 129,
            'items' => [
                ['id' => 159, 'title' => 'Этап 2'],
                ['title' => 'Шаг 1', 'parentId' => 159],
                ['title' => 'Шаг 2', 'parentId' => 159, 'isImportant' => true, 'accomplices' => [['id' => 1269]]],
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
    res, err := client.Core().Call(ctx, "tasks.template.checklist.save", b24.Params{
    	"templateId": 129,
    	"items": []map[string]any{
    		{"id": 159, "title": "Этап 2"},
    		{"title": "Шаг 1", "parentId": 159},
    		{"title": "Шаг 2", "parentId": 159, "isImportant": true, "accomplices": []map[string]any{{"id": 1269}}},
    	},
    })
    if err != nil {
    	return fmt.Errorf("tasks.template.checklist.save: %w", err)
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
[`boolean`](../../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если чек-лист сохранен. Получить сохраненные пункты и их идентификаторы можно методом [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md) ||
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
                "message": "Обязательное поле `items.0.title` не указано",
                "field": "items.0.title"
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
|| `items` | Обязательное поле `items` не указано | Добавьте `items` в тело запроса. Чтобы очистить чек-лист, передайте пустой массив ||
|| `items.0` | В поле `items.0` требуется тип данных `array` для такого запроса | Передайте каждый пункт объектом, например `{"title":"Шаг 1"}`. Число в имени поля — номер пункта в массиве, счет с нуля ||
|| `items.0.title` | Обязательное поле `items.0.title` не указано | Передайте `title` для нового пункта или `id` для существующего ||
|#

#### Ошибки валидации пункта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `creatorId` | Поле "creatorId" не доступно к заполнению | Уберите из пункта поля только для чтения: `creatorId`, `toggledById`, `toggledDate`, `attachments`, `collapsed` ||
|| `sortIndex` | Значение поля должно быть не меньше, чем 0 | Передайте `sortIndex` от `0` ||
|#

#### Неизвестное поле пункта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `CheckListItemDto` | Передайте в пункте только поля из [описания параметра items](#items) ||
|#

#### Пункт нельзя вложить в себя

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_CHECKLIST_ITEMCYCLEEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Пункт с ID = `159` нельзя вложить в пункт с ID = `159`: это тот же пункт или пункт, вложенный в него | Укажите в `parentId` пункт, который не является самим пунктом и не вложен в него ||
|#

#### Шаблон или пункт не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999` не найдена | В сообщении — идентификатор шаблона, пункта из `id` или пункта из `parentId`. Проверьте шаблон методом [tasks.template.list](../tasks-template-list.md), а пункты — методом [tasks.template.checklist.get](./tasks-template-checklist-get-rest-v3.md). Пункт другого шаблона метод тоже не находит ||
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

- [{#T}](./tasks-template-checklist-get-rest-v3.md)
- [{#T}](./tasks-template-checklist-item-add-rest-v3.md)
- [{#T}](./tasks-template-checklist-item-update-rest-v3.md)
- [{#T}](./tasks-template-checklist-item-delete-rest-v3.md)
