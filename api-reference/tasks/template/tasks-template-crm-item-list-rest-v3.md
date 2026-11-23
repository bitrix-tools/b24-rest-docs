# Получить элементы CRM шаблона задачи v 3.0 tasks.template.crm.item.list

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

Метод `tasks.template.crm.item.list` возвращает элементы CRM, связанные с шаблоном задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор можно получить методом [tasks.template.add](./tasks-template-add-rest-v3.md) при создании шаблона или методом [tasks.template.list](./tasks-template-list-rest-v3.md) ||
|| **select**
[`string[]`](../../data-types.md) | Поля элемента CRM, которые нужно вернуть.

Возможные значения:

- `id` — идентификатор элемента
- `type` — тип элемента
- `title` — название элемента

Если параметр не передан, метод возвращает все три поля ||
|#

Метод возвращает только элементы, которые пользователь может читать в CRM. Список приходит целиком: фильтр, сортировку и постраничную навигацию метод не поддерживает. Если модуль CRM не установлен, список пустой.

Связи шаблона с CRM задают в поле `crmItemIds` методами [tasks.template.add](./tasks-template-add-rest-v3.md) и [tasks.template.update](./tasks-template-update-rest-v3.md). Полные коды элементов вида `D_9193` возвращает метод [tasks.template.get](./tasks-template-get-rest-v3.md) в поле `crmItemIds`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/tasks.template.crm.item.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":125,"select":["id","type","title"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.crm.item.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":125,"select":["id","type","title"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/tasks.template.crm.item.list
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
    type TemplateCrmItemListResult = {
      items: Array<{
        id: number
        type: 'deal' | 'lead' | 'contact' | 'company' | 'unknown'
        title: string
      }>
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<TemplateCrmItemListResult>(
        'tasks.template.crm.item.list',
        {
          templateId: 125,
          select: ['id', 'type', 'title'],
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
      async function listTemplateCrmItems() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'tasks.template.crm.item.list',
            {
              templateId: 125,
              select: ['id', 'type', 'title'],
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

      document.addEventListener('DOMContentLoaded', listTemplateCrmItems)
    </script>
    ```

- Python

    Методы шаблонов задач REST 3.0 пока не входят в список `Config().api_v3_methods`, и без него `b24pysdk` отправит вызов на старый адрес REST. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "tasks.template.crm.item.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "templateId": 125,
                "select": ["id", "type", "title"],
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
                'tasks.template.crm.item.list',
                [
                    'templateId' => 125,
                    'select' => ['id', 'type', 'title'],
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
        'tasks.template.crm.item.list',
        {
            templateId: 125,
            select: ['id', 'type', 'title'],
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
        'tasks.template.crm.item.list',
        [
            'templateId' => 125,
            'select' => ['id', 'type', 'title'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "tasks.template.crm.item.list", b24.Params{
    	"templateId": 125,
    	"select":     []string{"id", "type", "title"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("tasks.template.crm.item.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID    int    `json:"id"`
    	Type  string `json:"type"`
    	Title string `json:"title"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(len(items))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 9193,
                "type": "deal",
                "title": "Сделка #6531"
            },
            {
                "id": 4575,
                "type": "contact",
                "title": "Поставка оборудования"
            },
            {
                "id": 2985,
                "type": "company",
                "title": "ООО «Вектор»"
            },
            {
                "id": 1001345,
                "type": "lead",
                "title": "Заполнение CRM-формы \"Docs check v7\""
            },
            {
                "id": 117,
                "type": "unknown",
                "title": "Счет на оплату оборудования"
            }
        ]
    },
    "time": {
        "start": 1795429063,
        "finish": 1795429063.161092,
        "duration": 0.16109204292297363,
        "processing": 0,
        "date_start": "2026-11-23T13:17:43+03:00",
        "date_finish": "2026-11-23T13:17:43+03:00",
        "operating_reset_at": 1795429620,
        "operating": 0.28139710426330566
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
[`object[]`](../../data-types.md) | Массив элементов CRM, связанных с шаблоном [(подробное описание)](#items). Если связей нет или пользователь не может читать связанные элементы, массив пустой ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект items {#items}

В объекте есть только поля, перечисленные в `select`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор элемента CRM без префикса типа, например `9193` для сделки `D_9193` ||
|| **type**
[`string`](../../data-types.md) | Тип элемента CRM.

Возможные значения:

- `deal` — сделка
- `lead` — лид
- `contact` — контакт
- `company` — компания
- `unknown` — другой тип, например счет или элемент смарт-процесса. Чтобы узнать тип такого элемента, сверьте `id` с кодами в поле `crmItemIds` ответа [tasks.template.get](./tasks-template-get-rest-v3.md) ||
|| **title**
[`string`](../../data-types.md) | Название элемента CRM ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**, **404**

```json
{
    "error": {
        "code": "BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
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
|#

#### Неизвестное поле в select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `CrmItemDto` | Оставьте в `select` только `id`, `type` и `title` ||
|#

#### Шаблон не найден

Код ошибки: `BITRIX_TASKS_V2_INFRASTRUCTURE_REST_EXCEPTION_TEMPLATE_NOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999` не найдена | Проверьте идентификатор шаблона методом [tasks.template.list](./tasks-template-list-rest-v3.md). Удаленный шаблон метод тоже не находит ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте право пользователя на просмотр шаблона методом [tasks.template.access.get](./tasks-template-access-get-rest-v3.md) и что на портале доступна новая карточка задач ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./tasks-template-get-rest-v3.md)
- [{#T}](./tasks-template-update-rest-v3.md)
- [{#T}](./tasks-template-access-get-rest-v3.md)
- [{#T}](./fields-rest-v3.md)
