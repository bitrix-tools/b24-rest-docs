# Удалить CRM-форму crm.form.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение CRM-форм

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `crm.form.delete` удаляет CRM-форму без возможности восстановления.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор формы.

Идентификатор можно получить методом [crm.form.list](./crm-form-list.md) ||
|| **updatedTime**
[`string`](../../data-types.md) | Версия формы — значение `updatedTime` из ответа [crm.form.get](./crm-form-get.md). Если передать, форма удалится, только если ее не меняли после чтения. Если не передать, версия не проверяется ||
|| **confirmed**
[`boolean`](../../data-types.md) | Подтверждение удаления активной формы.

Возможные значения:

- `true` — удалить форму, даже если она активна
- `false` — не удалять активную форму

По умолчанию: `false`.

Выключенную форму можно удалить без подтверждения

Принимается только значение типа `boolean`: строки `"Y"` или `"true"` вернут ошибку ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.delete`

{% endnote %}

Пример удаляет активную форму с проверкой версии.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":47,"updatedTime":"2026-10-21T17:48:05+03:00","confirmed":true}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":47,"updatedTime":"2026-10-21T17:48:05+03:00","confirmed":true,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.delete
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormDeleteResult = {
      result: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<FormDeleteResult>({
        method: 'crm.form.delete',
        params: {
          id: 47,
          updatedTime: '2026-10-21T17:48:05+03:00',
          confirmed: true,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.result)
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
      async function deleteForm() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.delete',
            params: {
              id: 47,
              updatedTime: '2026-10-21T17:48:05+03:00',
              confirmed: true,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteForm)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # client = Client(token, prefer_version=3)

    try:
        bitrix_response = client.crm.form.delete(
            id=47,
            updatedTime="2026-10-21T17:48:05+03:00",
            confirmed=True,
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
                'crm.form.delete',
                [
                    'id' => 47,
                    'updatedTime' => '2026-10-21T17:48:05+03:00',
                    'confirmed' => true,
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
        'crm.form.delete',
        {
          id: 47,
          updatedTime: '2026-10-21T17:48:05+03:00',
          confirmed: true,
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
        'crm.form.delete',
        [
            'id' => 47,
            'updatedTime' => '2026-10-21T17:48:05+03:00',
            'confirmed' => true,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы, базовый адрес клиента содержит /rest/api/
    res, err := client.Core().Call(ctx, "crm.form.delete", b24.Params{
    	"id": 47,
    	"updatedTime": "2026-10-21T17:48:05+03:00",
    	"confirmed": true,
    })
    if err != nil {
    	return fmt.Errorf("crm.form.delete: %w", err)
    }

    var data struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &data); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(data.Result)
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
        "start": 1792594087,
        "finish": 1792594087.940726,
        "duration": 0.9407260417938232,
        "processing": 0,
        "date_start": "2026-10-21T17:48:07+03:00",
        "date_finish": "2026-10-21T17:48:07+03:00",
        "operating_reset_at": 1792594680,
        "operating": 0.2279191017150879
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если форма удалена ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **409**

```json
{
    "error": {
        "code": "CRM_FORM_DELETE_CONFIRMATION_REQUIRED",
        "message": "CRM-форма активна: подтвердите удаление и повторите запрос"
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
|| `confirmed` | В поле `confirmed` требуется тип данных `boolean` для такого запроса | Передайте `true` или `false` без кавычек ||
|| `updatedTime` | В поле `updatedTime` требуется тип данных `DateTime` для такого запроса | Передайте дату в формате ISO 8601 ||
|| `filter` | crm.form.delete removes one form addressed by id and takes no filter. | Передайте идентификатор одной формы в `id` без `filter` ||
|#

#### Нужно подтверждение удаления

Код ошибки: `CRM_FORM_DELETE_CONFIRMATION_REQUIRED`

HTTP-статус: **409**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `confirmed` | CRM-форма активна: подтвердите удаление и повторите запрос | Передайте `confirmed: true` или сначала выключите форму методом [crm.form.deactivate](./crm-form-deactivate.md) ||
|#

#### Версия формы устарела

Код ошибки: `CRM_FORM_VERSION_MISMATCH`

HTTP-статус: **409**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `updatedTime` | Версия CRM-формы устарела, изменения не сохранены: получите форму заново и повторите запрос | Получите форму методом [crm.form.get](./crm-form-get.md) и убедитесь, что ее по-прежнему нужно удалить. Текущая версия есть в ключе `currentUpdatedTime` ответа ||
|#

#### Системная форма

Код ошибки: `CRM_FORM_SYSTEM_IMMUTABLE`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Эту CRM-форму нельзя изменить или удалить | Системную форму удалить нельзя. Проверьте поле `system` методом [crm.form.get](./crm-form-get.md) ||
|#

#### Форма не найдена

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Форма не существует или уже удалена. Проверьте идентификатор методом [crm.form.list](./crm-form-list.md) ||
|#

#### Ограничения тарифа

Код ошибки: `CRM_FORM_WRITE_RESTRICTED`

HTTP-статус: **402**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | На этом тарифе нельзя изменять CRM-формы | Смените тариф Битрикс24 ||
|#

#### Ошибки доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право на изменение CRM-форм ||
|#

#### Ошибка после сохранения

Код ошибки: `CRM_FORM_SIDE_EFFECT_FAILED`

HTTP-статус: **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удалось завершить действие, но данные CRM-формы уже изменены: проверьте состояние формы перед повторной попыткой | Проверьте методом [crm.form.get](./crm-form-get.md), удалена ли форма ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-deactivate.md)
- [{#T}](./crm-form-list.md)
- [{#T}](./index.md)
