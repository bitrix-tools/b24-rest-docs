# Получить CRM-форму crm.form.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр CRM-форм

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `crm.form.get` возвращает CRM-форму по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор формы.

Идентификатор можно получить методом [crm.form.list](./crm-form-list.md) ||
|| **select**
[`array`](../../data-types.md) | Список полей, которые нужно вернуть.

Можно указать раздел целиком, например `crm`, или поле раздела через точку, например `crm.entityScheme`. Описание всех полей — в разделе [Структура CRM-формы](./data-types.md#crm_form).

По умолчанию возвращаются простые поля: `id`, `code`, `name`, `active`, `system`, `languageId`, `templateId`, `createdTime`, `updatedTime`, `activeChangedById`, `activeChangedTime`.

Разделы `appearance`, `crm`, `fields`, `dependencies`, `presetFields`, `responsible`, `agreements`, `submission`, `payment`, `callback`, `booking`, `analytics`, `spamProtection`, `integrations` возвращаются, только если указаны в `select` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45,"select":["id","name","active","updatedTime","crm","fields"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45,"select":["id","name","active","updatedTime","crm","fields"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormGetResult = {
      item: {
        id: number
        name: string
        active: boolean
        updatedTime: string
        crm: {
          entityScheme: number
          duplicateMode: string | null
        }
        fields: Array<{
          name: string
          type: string
          label: string | null
          required: boolean
        }>
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<FormGetResult>({
        method: 'crm.form.get',
        params: {
          id: 45,
          select: ['id', 'name', 'active', 'updatedTime', 'crm', 'fields'],
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item)
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
      async function getForm() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.get',
            params: {
              id: 45,
              select: ['id', 'name', 'active', 'updatedTime', 'crm', 'fields'],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getForm)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # client = Client(token, prefer_version=3)

    try:
        bitrix_response = client.crm.form.get(
            id=45,
            select=["id", "name", "active", "updatedTime", "crm", "fields"],
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.form.get',
                [
                    'id' => 45,
                    'select' => ['id', 'name', 'active', 'updatedTime', 'crm', 'fields'],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'crm.form.get',
        {
          id: 45,
          select: ['id', 'name', 'active', 'updatedTime', 'crm', 'fields'],
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
        'crm.form.get',
        [
            'id' => 45,
            'select' => ['id', 'name', 'active', 'updatedTime', 'crm', 'fields'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "crm.form.get", b24.Params{
    	"id": 45,
    	"select": []string{"id", "name", "active", "updatedTime", "crm", "fields"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var form struct {
    	ID          int    `json:"id"`
    	Name        string `json:"name"`
    	Active      bool   `json:"active"`
    	UpdatedTime string `json:"updatedTime"`
    }
    if err := json.Unmarshal(raw, &form); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(form.ID, form.Name, form.Active)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 45,
            "name": "Контактные данные",
            "active": true,
            "updatedTime": "2026-03-11T16:47:17+03:00",
            "crm": {
                "entityScheme": 1,
                "duplicateMode": "MERGE",
                "dealCategoryId": null,
                "dealDuplicateControlEnabled": true,
                "smartProcessCategoryId": null,
                "smartProcessDuplicateControlEnabled": false
            },
            "fields": [
                {
                    "name": "LEAD_NAME",
                    "type": "string",
                    "label": "Имя",
                    "sort": 100,
                    "required": false,
                    "multiple": false,
                    "placeholder": "",
                    "valueType": null,
                    "value": null
                },
                {
                    "name": "LEAD_PHONE",
                    "type": "phone",
                    "label": "Телефон",
                    "sort": 300,
                    "required": false,
                    "multiple": false,
                    "placeholder": "",
                    "valueType": null,
                    "value": null
                }
            ]
        }
    },
    "time": {
        "start": 1792593811,
        "finish": 1792593811.215759,
        "duration": 0.2157590389251709,
        "processing": 0,
        "date_start": "2026-10-21T17:43:31+03:00",
        "date_finish": "2026-10-21T17:43:31+03:00",
        "operating_reset_at": 1792594380,
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
|| **item**
[`object`](../../data-types.md) | Объект с полями формы. Состав полей зависит от `select`. [Структура CRM-формы](./data-types.md#crm_form) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
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
|| `id` | Обязательное поле `id` не указано | Передайте идентификатор формы ||
|#

#### Ошибки в параметре select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `foo` для сущности `FormDto` | Передайте поля из раздела [Структура CRM-формы](./data-types.md#crm_form) ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Не удается распознать выражение select `abc` | Передайте `select` массивом строк, например `["id","crm"]` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право на просмотр CRM-форм ||
|#

#### Форма не найдена

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [crm.form.list](./crm-form-list.md) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-list.md)
- [{#T}](./crm-form-update.md)
- [{#T}](./data-types.md)
- [{#T}](./placement/crm-form-embedding-get.md)
- [{#T}](./index.md)
