# Получить список сценариев CRM-форм crm.form.scenario.list

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

Метод `crm.form.scenario.list` возвращает сценарии CRM-форм — заготовки форм под задачи, например обратный звонок или регистрацию на мероприятие.

## Параметры метода

Без параметров. Метод возвращает весь справочник. Фильтр, сортировка, постраничная навигация и `select` не поддерживаются: если передать их в запросе, метод их не учитывает.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.scenario.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.scenario.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.scenario.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormScenarioListResult = {
      items: Array<{
        id: string
        title: string
        description: string | null
        categoryId: string
        iconUrl: string | null
        sections: string[]
        expertSections: string[]
        defaultSection: string | null
        openable: boolean
        soon: boolean
        actions: string[]
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<FormScenarioListResult>({
        method: 'crm.form.scenario.list',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        // Scenarios that open the form editor right away
        console.info(result.items.filter(scenario => scenario.openable && !scenario.soon))
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
      async function getFormScenarios() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.scenario.list',
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

      document.addEventListener('DOMContentLoaded', getFormScenarios)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.form.scenario.list().response
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
                'crm.form.scenario.list',
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
        'crm.form.scenario.list',
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
        'crm.form.scenario.list',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.form.scenario.list", b24.Params{}, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.scenario.list: %w", err)
    }

    // Метод заворачивает список в объект с ключом "items".
    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID         string `json:"id"`
    	Title      string `json:"title"`
    	CategoryID string `json:"categoryId"`
    	Openable   bool   `json:"openable"`
    	Soon       bool   `json:"soon"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, scenario := range items {
    	fmt.Println(scenario.ID, scenario.Title)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Пример сокращен: в списке оставлено три сценария из 26.

```json
{
    "result": {
        "items": [
            {
                "id": "callback",
                "title": "Обратный звонок",
                "description": "Узнайте номер телефона и запустите обратный звонок",
                "categoryId": "crm",
                "iconUrl": "/bitrix/images/crm/webform/icons/revertcall.svg",
                "sections": ["fields", "agreements", "header-and-button", "crm", "callback", "design", "other"],
                "expertSections": ["fields", "booking-resource-auto-selection", "agreements", "crm", "pay-systems", "header-and-button", "spam-protection", "fields-rules", "actions", "default-values", "analytics", "callback", "design", "other"],
                "defaultSection": "callback",
                "openable": true,
                "soon": false,
                "actions": []
            },
            {
                "id": "contacts",
                "title": "Контактные данные",
                "description": "Получите телефон, адрес почты, имя клиента",
                "categoryId": "crm",
                "iconUrl": "/bitrix/images/crm/webform/icons/contacts.svg",
                "sections": ["fields", "agreements", "header-and-button", "crm", "design", "other"],
                "expertSections": ["fields", "booking-resource-auto-selection", "agreements", "crm", "pay-systems", "header-and-button", "spam-protection", "fields-rules", "actions", "default-values", "analytics", "callback", "design", "other"],
                "defaultSection": "fields",
                "openable": true,
                "soon": false,
                "actions": []
            },
            {
                "id": "personalisation",
                "title": "Персональная форма",
                "description": "Если у вас уже есть данные, заполните эти поля формы за клиента",
                "categoryId": "crm_automation",
                "iconUrl": "/bitrix/images/crm/webform/icons/personalization.svg",
                "sections": ["fields", "agreements", "header-and-button", "crm", "design", "other"],
                "expertSections": [],
                "defaultSection": "fields",
                "openable": false,
                "soon": false,
                "actions": ["showHelp"]
            }
        ]
    },
    "time": {
        "start": 1792593642,
        "finish": 1792593642.129926,
        "duration": 0.12992596626281738,
        "processing": 0,
        "date_start": "2026-10-21T17:40:42+03:00",
        "date_finish": "2026-10-21T17:40:42+03:00",
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
[`object[]`](../../../data-types.md) | Массив сценариев [(подробное описание)](#items) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#items}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Код сценария, например `callback`, `contacts`, `event_registration` ||
|| **title**
[`string`](../../../data-types.md) | Название сценария ||
|| **description**
[`string`](../../../data-types.md) | Описание сценария или `null` ||
|| **categoryId**
[`string`](../../../data-types.md) | Код категории сценария. Названия категорий возвращает метод [crm.form.scenariocategory.list](./crm-form-scenariocategory-list.md) ||
|| **iconUrl**
[`string`](../../../data-types.md) | Путь к иконке сценария на Битрикс24 или `null`, если иконки нет ||
|| **sections**
[`string[]`](../../../data-types.md) | Разделы конструктора, которые сценарий открывает для настройки, например `fields`, `agreements`, `crm`, `design` ||
|| **expertSections**
[`string[]`](../../../data-types.md) | Разделы конструктора, которые сценарий открывает в расширенном режиме. Может быть пустым ||
|| **defaultSection**
[`string`](../../../data-types.md) | Раздел, с которого открывается конструктор, или `null` ||
|| **openable**
[`boolean`](../../../data-types.md) | Признак того, что сценарий открывает конструктор формы.

Возможные значения:

- `true` — сценарий открывает конструктор
- `false` — сценарий не открывает конструктор, а выполняет действие из `actions` ||
|| **soon**
[`boolean`](../../../data-types.md) | Признак анонсированного сценария.

Возможные значения:

- `true` — сценарий анонсирован, но пока недоступен
- `false` — сценарий доступен ||
|| **actions**
[`string[]`](../../../data-types.md) | Дополнительные действия сценария, например `showHelp` или `check`. Для большинства сценариев массив пустой ||
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

- [{#T}](./crm-form-scenariocategory-list.md)
- [{#T}](./crm-form-configuration-get.md)
- [{#T}](../crm-form-add.md)
- [{#T}](./crm-form-scenario-field-list.md)
- [{#T}](./index.md)
