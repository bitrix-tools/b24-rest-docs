# Проверить права доступа v 3.0 tasks.task.access.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../rest-v3.md).

{% endnote %}

Метод `tasks.task.access.get` возвращает, какие действия с задачей доступны пользователю, например просматривать, редактировать, завершать или делегировать.

Метод проверяет права того, от чьего имени его вызвали: владельца вебхука или пользователя приложения. Узнать этим методом права другого пользователя нельзя — для этого есть метод [tasks.task.getaccess](./tasks-task-get-access.md) с параметром `users`.

Если у пользователя нет доступа к задаче, метод вернет `false` во всех полях, кроме `automate` и `admin`: они зависят от прав пользователя, а не от задачи.

Метод не проверяет, есть ли задача: для несуществующего `id` ошибки не будет.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор задачи.

Идентификатор задачи можно получить при [создании новой задачи](./tasks-task-add-rest-v3.md) или методом [получения списка задач](./tasks-task-list-rest-v3.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% note info "" %}

Вызов нового api отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.task.access.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8017}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.task.access.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":8017,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.task.access.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TaskAccessResult = {
      read: boolean
      watch: boolean
      mute: boolean
      createSubtask: boolean
      createResult: boolean
      edit: boolean
      remove: boolean
      complete: boolean
      approve: boolean
      disapprove: boolean
      start: boolean
      take: boolean
      delegate: boolean
      defer: boolean
      renew: boolean
      deadline: boolean
      datePlan: boolean
      changeDirector: boolean
      changeResponsible: boolean
      changeAccomplices: boolean
      pause: boolean
      timeTracking: boolean
      mark: boolean
      changeStatus: boolean
      reminder: boolean
      addAuditors: boolean
      elapsedTime: boolean
      favorite: boolean
      checklistAdd: boolean
      checklistEdit: boolean
      checklistSave: boolean
      checklistToggle: boolean
      automate: boolean
      resultEdit: boolean
      completeResult: boolean
      removeResult: boolean
      resultRead: boolean
      admin: boolean
      copy: boolean
      saveAsTemplate: boolean
      attachFile: boolean
      detachFile: boolean
      detachParent: boolean
      createGanttDependence: boolean
      sort: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<TaskAccessResult>({
        method: 'tasks.task.access.get',
        params: {
          id: 8017,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Task access rights — edit:', result.edit, 'complete:', result.complete, 'remove:', result.remove)
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
      async function getTaskAccess() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'tasks.task.access.get',
            params: {
              id: 8017,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Task access rights — edit:', result.edit, 'complete:', result.complete, 'remove:', result.remove)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTaskAccess)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.tasks.task.access.get(
            bitrix_id=8017,
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

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'tasks.task.access.get',
                [
                    'id' => 8017,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```js
    BX24.callMethod(
        'tasks.task.access.get',
        {
            id: 8017,
        },
        function(result){
            console.info(result.data());
            console.log(result);
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживают в вызовах адрес /rest/api/. Используйте прямые HTTP-запросы, например, через curl, fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'tasks.task.access.get',
        [
            'id' => 8017,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "tasks.task.access.get", b24.Params{
    	"id": 8017,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.task.access.get: %w", err)
    }

    var item struct {
    	Read          bool `json:"read"`
    	Watch         bool `json:"watch"`
    	Mute          bool `json:"mute"`
    	CreateSubtask bool `json:"createSubtask"`
    	CreateResult  bool `json:"createResult"`
    	Edit          bool `json:"edit"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Read, item.Watch)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "read": true,
        "watch": true,
        "mute": true,
        "createSubtask": true,
        "createResult": true,
        "edit": true,
        "remove": true,
        "complete": true,
        "approve": false,
        "disapprove": false,
        "start": false,
        "take": false,
        "delegate": true,
        "defer": false,
        "renew": false,
        "deadline": true,
        "datePlan": true,
        "changeDirector": false,
        "changeResponsible": true,
        "changeAccomplices": true,
        "pause": false,
        "timeTracking": false,
        "mark": true,
        "changeStatus": true,
        "reminder": true,
        "addAuditors": true,
        "elapsedTime": true,
        "favorite": true,
        "checklistAdd": true,
        "checklistEdit": true,
        "checklistSave": true,
        "checklistToggle": true,
        "automate": true,
        "resultEdit": false,
        "completeResult": true,
        "removeResult": false,
        "resultRead": false,
        "admin": true,
        "copy": true,
        "saveAsTemplate": true,
        "attachFile": true,
        "detachFile": true,
        "detachParent": true,
        "createGanttDependence": true,
        "sort": false
    },
    "time": {
        "start": 1764849882,
        "finish": 1764849882.731575,
        "duration": 0.7315750122070312,
        "processing": 0,
        "date_start": "2025-12-04T15:04:42+03:00",
        "date_finish": "2025-12-04T15:04:42+03:00",
        "operating_reset_at": 1764850482,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Права текущего пользователя в задаче [(подробное описание)](#result) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

Каждое поле — право на действие: `true` — разрешено, `false` — запрещено. Исключение — `changeDirector`, `resultEdit`, `removeResult` и `resultRead`: в них метод всегда возвращает `false`.

#|
|| **Название**
`тип` | **Описание** ||
|| **read**
[`boolean`](../data-types.md) | Просматривать задачу ||
|| **watch**
[`boolean`](../data-types.md) | Следить за задачей как наблюдатель. Значение совпадает с `read` ||
|| **mute**
[`boolean`](../data-types.md) | Отключать уведомления по задаче. Значение совпадает с `read` ||
|| **createSubtask**
[`boolean`](../data-types.md) | Создавать подзадачи ||
|| **createResult**
[`boolean`](../data-types.md) | Добавлять результат задачи. Значение совпадает с `read` ||
|| **edit**
[`boolean`](../data-types.md) | Редактировать задачу ||
|| **remove**
[`boolean`](../data-types.md) | Удалять задачу ||
|| **complete**
[`boolean`](../data-types.md) | Завершать задачу ||
|| **approve**
[`boolean`](../data-types.md) | Принимать работу по задаче, которая ждет контроля ||
|| **disapprove**
[`boolean`](../data-types.md) | Возвращать на доработку задачу, которая ждет контроля ||
|| **start**
[`boolean`](../data-types.md) | Начинать выполнение задачи ||
|| **take**
[`boolean`](../data-types.md) | Брать в работу задачу из потока с самостоятельным распределением ||
|| **delegate**
[`boolean`](../data-types.md) | Делегировать задачу ||
|| **defer**
[`boolean`](../data-types.md) | Откладывать задачу ||
|| **renew**
[`boolean`](../data-types.md) | Возобновлять завершенную или отложенную задачу ||
|| **deadline**
[`boolean`](../data-types.md) | Менять крайний срок ||
|| **datePlan**
[`boolean`](../data-types.md) | Менять плановые даты начала и завершения ||
|| **changeDirector**
[`boolean`](../data-types.md) | Менять постановщика. Метод всегда возвращает `false`, даже если право есть ||
|| **changeResponsible**
[`boolean`](../data-types.md) | Менять исполнителя ||
|| **changeAccomplices**
[`boolean`](../data-types.md) | Менять соисполнителей ||
|| **pause**
[`boolean`](../data-types.md) | Приостанавливать выполнение задачи ||
|| **timeTracking**
[`boolean`](../data-types.md) | Запускать учет времени по задаче ||
|| **mark**
[`boolean`](../data-types.md) | Оценивать задачу ||
|| **changeStatus**
[`boolean`](../data-types.md) | Менять статус задачи ||
|| **reminder**
[`boolean`](../data-types.md) | Создавать напоминания ||
|| **addAuditors**
[`boolean`](../data-types.md) | Добавлять наблюдателей ||
|| **elapsedTime**
[`boolean`](../data-types.md) | Добавлять затраченное время ||
|| **favorite**
[`boolean`](../data-types.md) | Добавлять задачу в избранное. Значение совпадает с `read` ||
|| **checklistAdd**
[`boolean`](../data-types.md) | Добавлять пункты чек-листа ||
|| **checklistEdit**
[`boolean`](../data-types.md) | Изменять пункты чек-листа ||
|| **checklistSave**
[`boolean`](../data-types.md) | Сохранять чек-лист ||
|| **checklistToggle**
[`boolean`](../data-types.md) | Отмечать пункты чек-листа выполненными ||
|| **automate**
[`boolean`](../data-types.md) | Настраивать роботов задач. Право пользователя, не зависит от задачи ||
|| **resultEdit**
[`boolean`](../data-types.md) | Изменять результат задачи. Метод всегда возвращает `false`, даже если право есть ||
|| **completeResult**
[`boolean`](../data-types.md) | Завершать задачу, для которой нужен результат ||
|| **removeResult**
[`boolean`](../data-types.md) | Удалять результат задачи. Метод всегда возвращает `false`, даже если право есть ||
|| **resultRead**
[`boolean`](../data-types.md) | Читать результат задачи. Метод всегда возвращает `false`, даже если право есть ||
|| **admin**
[`boolean`](../data-types.md) | Управлять правами доступа к задачам. Право пользователя, не зависит от задачи ||
|| **copy**
[`boolean`](../data-types.md) | Копировать задачу ||
|| **saveAsTemplate**
[`boolean`](../data-types.md) | Сохранять задачу как шаблон ||
|| **attachFile**
[`boolean`](../data-types.md) | Прикреплять файлы к задаче ||
|| **detachFile**
[`boolean`](../data-types.md) | Откреплять файлы от задачи ||
|| **detachParent**
[`boolean`](../data-types.md) | Отвязывать задачу от родительской ||
|| **createGanttDependence**
[`boolean`](../data-types.md) | Создавать связи задачи на диаграмме Ганта ||
|| **sort**
[`boolean`](../data-types.md) | Менять порядок задачи в группе. Бывает `true` только у задачи в группе ||
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
                "message": "Обязательное поле `id` не указано",
                "field": "id"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Убедитесь, что значение — число, а не строка ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-task-get-access.md)
- [{#T}](./tasks-task-update-rest-v3.md)
- [{#T}](./tasks-task-chat-message-send.md)
- [{#T}](./tasks-task-delete-rest-v3.md)
