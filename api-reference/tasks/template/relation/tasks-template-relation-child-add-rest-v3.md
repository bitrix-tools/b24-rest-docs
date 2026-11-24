# Добавить дочерние шаблоны v 3.0 tasks.template.relation.child.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`tasks`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом чтения родительского шаблона и правом изменения каждого шаблона, который привязывают как дочерний

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `tasks.template.relation.child.add` привязывает шаблоны к родительскому шаблону как дочерние.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор родительского шаблона, к которому привязывают дочерние шаблоны.

Идентификатор шаблона можно получить при [создании шаблона](../tasks-template-add-rest-v3.md) или методом [получения списка шаблонов](../tasks-template-list-rest-v3.md) ||
|| **templateIds***
[`integer[]`](../../../data-types.md) | Массив идентификаторов шаблонов, которые нужно сделать дочерними. Передайте от одного до 20 уникальных идентификаторов, повторы метод не учитывает ||
|| **noOverride**
[`boolean`](../../../data-types.md) | Запрещает перепривязывать шаблоны, у которых уже есть родительский шаблон.

Возможные значения:

- `true` — если у одного из шаблонов из `templateIds` уже есть родительский шаблон, метод вернет ошибку и ничего не привяжет
- `false` — шаблон с другим родительским шаблоном переносится к шаблону из `templateId`

По умолчанию: `false` ||
|#

{% note info "" %}

Привязка выполняется для всех шаблонов из `templateIds` или не выполняется совсем. Если хотя бы один шаблон не найден, недоступен или привязка создаст цикл, метод вернет ошибку и не изменит связи.

{% endnote %}

{% note warning "" %}

Шаблон нельзя привязать к самому себе или к собственному дочернему шаблону любого уровня вложенности: такая привязка создаст цикл.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.relation.child.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":117,"templateIds":[119,121],"noOverride":true}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.relation.child.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":117,"templateIds":[119,121],"noOverride":true,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.relation.child.add
    ```

- JS (TS)

    Методы `tasks.template.relation.*` пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ChildAddResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ChildAddResult>(
        'tasks.template.relation.child.add',
        {
          templateId: 117,
          templateIds: [119, 121],
          noOverride: true,
        },
        Text.getUuidRfc4122()
      )

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Child templates attached:', result.result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы `tasks.template.relation.*` пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addChildTemplates() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.relation.child.add',
            {
              templateId: 117,
              templateIds: [119, 121],
              noOverride: true,
            },
            B24Js.Text.getUuidRfc4122()
          )

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Child templates attached:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addChildTemplates)
    </script>
    ```

- Python

    У методов `tasks.template.relation.*` нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.relation.child.add"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 117,
                "templateIds": [119, 121],
                "noOverride": True,
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
                'tasks.template.relation.child.add',
                [
                    'templateId' => 117,
                    'templateIds' => [119, 121],
                    'noOverride' => true,
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
        'tasks.template.relation.child.add',
        {
            templateId: 117,
            templateIds: [119, 121],
            noOverride: true,
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
        'tasks.template.relation.child.add',
        [
            'templateId' => 117,
            'templateIds' => [119, 121],
            'noOverride' => true,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.relation.child.add", b24.Params{
    	"templateId":  117,
    	"templateIds": []int{119, 121},
    	"noOverride":  true,
    })
    if err != nil {
    	return fmt.Errorf("tasks.template.relation.child.add: %w", err)
    }

    var out struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &out); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(out.Result)
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
        "start": 1795429010,
        "finish": 1795429010.41892,
        "duration": 0.41892004013061523,
        "processing": 0,
        "date_start": "2026-11-23T13:16:50+03:00",
        "date_finish": "2026-11-23T13:16:50+03:00",
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
[`object`](../../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если шаблоны привязаны ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **409**

```json
{
    "error": {
        "code": "BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_RELATIONCONFLICTEXCEPTION",
        "message": "Шаблон нельзя привязать как дочерний: у него уже есть родительский шаблон или привязка создаст цикл"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

HTTP-статус: **400**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `templateId` | Обязательное поле `templateId` не указано | Добавьте `templateId` в тело запроса ||
|| `templateId` | В поле `templateId` требуется тип данных `int` для такого запроса | Передайте идентификатор числом, а не строкой ||
|| `templateIds` | Обязательное поле `templateIds` не указано | Передайте непустой массив идентификаторов шаблонов ||
|| `templateIds` | В поле `templateIds` требуется тип данных `integer` для такого запроса | Передайте идентификаторы числами, а не строками ||
|| `templateIds` | В поле `templateIds` требуется тип данных `array` для такого запроса | Передайте массив, а не одно число. Если ошибка приходит для массива, проверьте его размер: в одном запросе допустимо не больше 20 уникальных идентификаторов ||
|#

#### Шаблон не найден

HTTP-статус: **404**

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `templateId`, `templateIds` | Запись с ID = `999999` не найдена | Проверьте идентификаторы методом [tasks.template.get](../tasks-template-get-rest-v3.md). Удаленный шаблон метод считает ненайденным ||
|#

#### Конфликт связей

HTTP-статус: **409**

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_RELATIONCONFLICTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `templateIds` | Шаблон нельзя привязать как дочерний: у него уже есть родительский шаблон или привязка создаст цикл | Если передан `noOverride: true`, проверьте методом [tasks.template.relation.child.ids](./tasks-template-relation-child-ids-rest-v3.md), нет ли у шаблонов родителя, и отвяжите их методом [tasks.template.relation.child.delete](./tasks-template-relation-child-delete-rest-v3.md) или передайте `noOverride: false`. Если ошибка из-за цикла, уберите из `templateIds` родительский шаблон и его родителей любого уровня ||
|#

#### Ошибка доступа

HTTP-статус: **403**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право чтения шаблона из `templateId` и право изменения каждого шаблона из `templateIds` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-relation-child-delete-rest-v3.md)
- [{#T}](./tasks-template-relation-child-ids-rest-v3.md)
- [{#T}](./tasks-template-relation-child-list-rest-v3.md)
- [{#T}](./tasks-template-relation-child-list-by-ids-rest-v3.md)
- [{#T}](../fields-rest-v3.md)
