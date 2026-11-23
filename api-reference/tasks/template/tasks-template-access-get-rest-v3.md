# Получить права на шаблон задачи v 3.0 tasks.template.access.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `tasks.template.access.get` возвращает, какие действия с шаблоном задачи доступны пользователю.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор шаблона задачи, больше `0`.

Идентификатор можно получить методом [tasks.template.add](./tasks-template-add-rest-v3.md) при создании шаблона или методом [tasks.template.list](./tasks-template-list-rest-v3.md) ||
|#

Метод проверяет права того, от чьего имени его вызвали: владельца вебхука или пользователя приложения. Узнать права другого пользователя этим методом нельзя.

Метод не проверяет, есть ли шаблон: для несуществующего или удаленного `id` ошибки не будет. Если шаблон недоступен, права равны `false`. Администратор получает `true` во всех полях, даже если шаблона нет. Проверить, что шаблон существует, можно методом [tasks.template.get](./tasks-template-get-rest-v3.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.access.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":125}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.access.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":125,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.access.get
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
    type TemplateAccessResult = {
      read: boolean
      edit: boolean
      remove: boolean
      create: boolean
      changeRights: boolean
      detachParent: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateAccessResult>(
        'tasks.template.access.get',
        {
          id: 125,
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Template access rights — read:', result.read, 'edit:', result.edit, 'remove:', result.remove)
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
      async function getTemplateAccess() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.access.get',
            {
              id: 125,
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Template access rights — read:', result.read, 'edit:', result.edit, 'remove:', result.remove)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTemplateAccess)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.access.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 125,
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
                'tasks.template.access.get',
                [
                    'id' => 125,
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
        'tasks.template.access.get',
        {
            id: 125,
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
        'tasks.template.access.get',
        [
            'id' => 125,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.access.get", b24.Params{
    	"id": 125,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.access.get: %w", err)
    }

    var rights struct {
    	Read         bool `json:"read"`
    	Edit         bool `json:"edit"`
    	Remove       bool `json:"remove"`
    	Create       bool `json:"create"`
    	ChangeRights bool `json:"changeRights"`
    	DetachParent bool `json:"detachParent"`
    }
    if err := json.Unmarshal(res.Result, &rights); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(rights.Read, rights.Edit)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "read": true,
        "edit": true,
        "remove": true,
        "create": true,
        "changeRights": true,
        "detachParent": true
    },
    "time": {
        "start": 1795429013,
        "finish": 1795429013.590555,
        "duration": 0.59055495262146,
        "processing": 0,
        "date_start": "2026-11-23T13:16:53+03:00",
        "date_finish": "2026-11-23T13:16:53+03:00",
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
[`object`](../../data-types.md) | Права текущего пользователя на шаблон [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

Каждое поле — право на действие: `true` — разрешено, `false` — запрещено.

#|
|| **Название**
`тип` | **Описание** ||
|| **read**
[`boolean`](../../data-types.md) | Просматривать шаблон и создавать по нему задачи методом [tasks.template.task.add](./tasks-template-task-add-rest-v3.md) ||
|| **edit**
[`boolean`](../../data-types.md) | Изменять шаблон методом [tasks.template.update](./tasks-template-update-rest-v3.md) ||
|| **remove**
[`boolean`](../../data-types.md) | Удалять шаблон ||
|| **create**
[`boolean`](../../data-types.md) | Создавать шаблоны ||
|| **changeRights**
[`boolean`](../../data-types.md) | Менять права доступа к шаблону в поле [permissions](./fields-rest-v3.md#permissions) ||
|| **detachParent**
[`boolean`](../../data-types.md) | Отвязывать шаблон от родительского шаблона ||
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

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Добавьте `id` в тело запроса ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор шаблона числом, а не строкой ||
|| `id` | В поле `id` требуется тип данных `integer` для такого запроса | Передайте идентификатор больше `0` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что на портале доступна новая карточка задач ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](./tasks-template-update-rest-v3.md)
- [{#T}](./tasks-template-task-add-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
