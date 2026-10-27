# Проверить конфигурацию CRM-формы crm.form.validate

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

Метод `crm.form.validate` проверяет конфигурацию CRM-формы без сохранения и возвращает все нарушения сразу.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор сохраненной формы.

Идентификатор можно получить методом [crm.form.list](./crm-form-list.md) ||
|| **fields**
[`object`](../../data-types.md) | Конфигурация формы в том же формате, что в [crm.form.add](./crm-form-add.md) и [crm.form.update](./crm-form-update.md). Описание полей — в разделе [Структура CRM-формы](./data-types.md#crm_form).

Если передан `id`, поле `active` указывать нельзя, как и в [crm.form.update](./crm-form-update.md) ||
|#

Нужно передать хотя бы один параметр: `id` или `fields`. От их набора зависит, что проверяет метод:

- только `fields` — конфигурацию новой формы, как ее проверит [crm.form.add](./crm-form-add.md)
- только `id` — сохраненную форму в текущем виде
- `id` и `fields` — изменения поверх сохраненной формы, как их проверит [crm.form.update](./crm-form-update.md)

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.validate`

{% endnote %}

Пример проверяет конфигурацию новой формы, в которой нет названия и указана несуществующая схема CRM.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"crm":{"entityScheme":999}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.validate
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"crm":{"entityScheme":999}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.validate
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormValidateResult = {
      valid: boolean
      violations: Array<{
        field: string
        message: string
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<FormValidateResult>({
        method: 'crm.form.validate',
        params: {
          fields: {
            crm: {
              entityScheme: 999,
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.valid, result.violations)
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
      async function validateForm() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.validate',
            params: {
              fields: {
                crm: {
                  entityScheme: 999,
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.valid, result.violations)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', validateForm)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # client = Client(token, prefer_version=3)

    try:
        bitrix_response = client.crm.form.validate(
            fields={
                "crm": {
                    "entityScheme": 999,
                },
            },
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
                'crm.form.validate',
                [
                    'fields' => [
                        'crm' => [
                            'entityScheme' => 999,
                        ],
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
        'crm.form.validate',
        {
          fields: {
            crm: {
              entityScheme: 999,
            },
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
        'crm.form.validate',
        [
            'fields' => [
                'crm' => [
                    'entityScheme' => 999,
                ],
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
    res, err := client.Core().Call(ctx, "crm.form.validate", b24.Params{
    	"fields": map[string]any{
    		"crm": map[string]any{
    			"entityScheme": 999,
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.form.validate: %w", err)
    }

    var data struct {
    	Valid      bool `json:"valid"`
    	Violations []struct {
    		Field   string `json:"field"`
    		Message string `json:"message"`
    	} `json:"violations"`
    }
    if err := json.Unmarshal(res.Result, &data); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(data.Valid, data.Violations)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "valid": false,
        "violations": [
            {
                "field": "name",
                "message": "Name of the CRM form is required"
            },
            {
                "field": "crm.entityScheme",
                "message": "CRM scheme of the form can not be used"
            }
        ]
    },
    "time": {
        "start": 1792593823,
        "finish": 1792593823.067024,
        "duration": 0.06702399253845215,
        "processing": 0,
        "date_start": "2026-10-21T17:43:43+03:00",
        "date_finish": "2026-10-21T17:43:43+03:00",
        "operating_reset_at": 1792594380,
        "operating": 0
    }
}
```

Если нарушений нет:

```json
{
    "result": {
        "valid": true,
        "violations": []
    }
}
```

Нарушения конфигурации не считаются ошибкой запроса: метод отвечает с HTTP-статусом `200` и перечисляет нарушения в `violations`.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с результатом проверки ||
|| **valid**
[`boolean`](../../data-types.md) | Результат проверки.

Возможные значения:

- `true` — конфигурация корректна, форму можно сохранить
- `false` — есть нарушения ||
|| **violations**
[`array`](../../data-types.md) | Нарушения. Каждый элемент содержит:

- `field` — путь к значению, например `crm.entityScheme` или `fields[0].type`
- `message` — описание нарушения на английском языке

Возможные сообщения перечислены на странице [crm.form.add](./crm-form-add.md) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Не заполнено значение хотя бы одного обязательного поля: id, fields"
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
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, fields | Передайте `id`, `fields` или оба параметра ||
|| `active` | `active` is published for reading only | Не передавайте `active` при проверке сохраненной формы ||
|| `filter` | crm.form.validate checks one form addressed by id and takes no filter. | Передайте идентификатор одной формы в `id` без `filter` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `sort` для сущности `FormDto` | Передайте только поля из раздела [Структура CRM-формы](./data-types.md#crm_form) ||
|#

#### Форма не найдена

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [crm.form.list](./crm-form-list.md) ||
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

Код ошибки: `CRM_FORM_SYSTEM_IMMUTABLE`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Эту CRM-форму нельзя изменить или удалить | Системную форму изменить нельзя ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-add.md)
- [{#T}](./crm-form-update.md)
- [{#T}](./data-types.md)
- [{#T}](./index.md)
