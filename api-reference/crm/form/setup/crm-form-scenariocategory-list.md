# Получить список категорий сценариев CRM-форм crm.form.scenariocategory.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр CRM-форм

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.form.scenariocategory.list` возвращает категории, по которым сгруппированы сценарии CRM-форм.

## Параметры метода

Без параметров. Метод возвращает весь справочник. Фильтр, сортировка, постраничная навигация и `select` не поддерживаются: если передать их в запросе, метод их не учитывает.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.scenariocategory.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.scenariocategory.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.scenariocategory.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormScenarioCategoryListResult = {
      items: Array<{
        id: string
        title: string
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<FormScenarioCategoryListResult>({
        method: 'crm.form.scenariocategory.list',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

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

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getFormScenarioCategories() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.scenariocategory.list',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

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

      document.addEventListener('DOMContentLoaded', getFormScenarioCategories)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.form.scenariocategory.list().response
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
                'crm.form.scenariocategory.list',
                []
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'crm.form.scenariocategory.list',
        {},
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
        'crm.form.scenariocategory.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.form.scenariocategory.list", b24.Params{}, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.scenariocategory.list: %w", err)
    }

    // Метод заворачивает список в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID    string `json:"id"`
    	Title string `json:"title"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, category := range items {
    	fmt.Println(category.ID, category.Title)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": "crm",
                "title": "Коммуникации с клиентами"
            },
            {
                "id": "booking",
                "title": "Онлайн-запись"
            },
            {
                "id": "products",
                "title": "Продажа"
            },
            {
                "id": "social",
                "title": "Заявки из социальных сетей"
            },
            {
                "id": "crm_automation",
                "title": "Автозаполнение полей"
            },
            {
                "id": "delivery",
                "title": "Доставка заказа"
            },
            {
                "id": "events",
                "title": "Регистрация на мероприятие"
            },
            {
                "id": "crm_filling",
                "title": "Заполнение CRM"
            },
            {
                "id": "dependency_field",
                "title": "Формы с зависимыми полями"
            },
            {
                "id": "other",
                "title": "Прочее"
            }
        ]
    },
    "time": {
        "start": 1792593643,
        "finish": 1792593643.703442,
        "duration": 0.7034420967102051,
        "processing": 0,
        "date_start": "2026-10-21T17:40:43+03:00",
        "date_finish": "2026-10-21T17:40:43+03:00",
        "operating_reset_at": 1792594200,
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
[`object[]`](../../../data-types.md) | Массив категорий сценариев [(подробное описание)](#items) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Код категории. Совпадает с полем `categoryId` сценария из [crm.form.scenario.list](./crm-form-scenario-list.md) ||
|| **title**
[`string`](../../../data-types.md) | Название категории ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION",
        "message": "Доступ запрещен"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Выдайте пользователю право на просмотр CRM-форм ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-scenario-list.md)
- [{#T}](./crm-form-scenariocategory-field-list.md)
- [{#T}](./index.md)
