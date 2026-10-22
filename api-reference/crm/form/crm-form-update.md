# Изменить CRM-форму crm.form.update

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

Метод `crm.form.update` частично изменяет CRM-форму: меняются только поля, переданные в `fields`.

{% note info "" %}

Метод требует версию формы `updatedTime` из ответа [crm.form.get](./crm-form-get.md). Если форму успели изменить, метод вернет ошибку `CRM_FORM_VERSION_MISMATCH`: получите форму заново и повторите запрос.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор формы.

Идентификатор можно получить методом [crm.form.list](./crm-form-list.md) ||
|| **updatedTime***
[`string`](../../data-types.md) | Версия формы — значение `updatedTime` из ответа [crm.form.get](./crm-form-get.md) в формате ISO 8601, например `2026-10-21T17:44:00+03:00` ||
|| **fields***
[`object`](../../data-types.md) | Поля, которые нужно изменить. Формат полей такой же, как в ответе [crm.form.get](./crm-form-get.md). Описание — в разделе [Структура CRM-формы](./data-types.md#crm_form).

Правила частичного изменения:

- переданное поле раздела меняет только это поле, например `appearance.title`
- коллекции `fields`, `dependencies`, `presetFields`, `responsible.userIds`, `agreements.items` и другие заменяются целиком. Пустой массив очищает коллекцию
- раздел нельзя очистить через `null`
- поле `active` и поля только для чтения передавать нельзя. Активность меняют методы [crm.form.activate](./crm-form-activate.md) и [crm.form.deactivate](./crm-form-deactivate.md)

Поля, которые заполняет клиент, передаются в ключе `fields` внутри этого параметра. Свойства элемента `name`, `type`, `label`, `required`, `multiple`, `placeholder`, `valueType`, `value` описаны в [структуре элемента fields.fields](./crm-form-add.md#form-fields).

Пустой объект `{}` ничего не меняет, но проверяет, что форма существует и ее можно изменить ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.update`

{% endnote %}

Пример меняет заголовок формы, текст кнопки и сообщение после отправки. Остальные настройки формы не меняются.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":47,"updatedTime":"2026-10-21T17:44:00+03:00","fields":{"appearance":{"title":"Оставьте заявку","buttonCaption":"Отправить заявку"},"submission":{"success":{"text":"Спасибо! Мы перезвоним в течение часа."}}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":47,"updatedTime":"2026-10-21T17:44:00+03:00","fields":{"appearance":{"title":"Оставьте заявку","buttonCaption":"Отправить заявку"},"submission":{"success":{"text":"Спасибо! Мы перезвоним в течение часа."}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormUpdateResult = {
      result: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<FormUpdateResult>({
        method: 'crm.form.update',
        params: {
          id: 47,
          updatedTime: '2026-10-21T17:44:00+03:00',
          fields: {
            appearance: {
              title: 'Оставьте заявку',
              buttonCaption: 'Отправить заявку',
            },
            submission: {
              success: {
                text: 'Спасибо! Мы перезвоним в течение часа.',
              },
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
      async function updateForm() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.update',
            params: {
              id: 47,
              updatedTime: '2026-10-21T17:44:00+03:00',
              fields: {
                appearance: {
                  title: 'Оставьте заявку',
                  buttonCaption: 'Отправить заявку',
                },
                submission: {
                  success: {
                    text: 'Спасибо! Мы перезвоним в течение часа.',
                  },
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
          console.info(result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateForm)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # client = Client(token, prefer_version=3)

    try:
        bitrix_response = client.crm.form.update(
            id=47,
            updatedTime="2026-10-21T17:44:00+03:00",
            fields={
                "appearance": {
                    "title": "Оставьте заявку",
                    "buttonCaption": "Отправить заявку",
                },
                "submission": {
                    "success": {
                        "text": "Спасибо! Мы перезвоним в течение часа.",
                    },
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
                'crm.form.update',
                [
                    'id' => 47,
                    'updatedTime' => '2026-10-21T17:44:00+03:00',
                    'fields' => [
                        'appearance' => [
                            'title' => 'Оставьте заявку',
                            'buttonCaption' => 'Отправить заявку',
                        ],
                        'submission' => [
                            'success' => [
                                'text' => 'Спасибо! Мы перезвоним в течение часа.',
                            ],
                        ],
                    ],
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
        'crm.form.update',
        {
          id: 47,
          updatedTime: '2026-10-21T17:44:00+03:00',
          fields: {
            appearance: {
              title: 'Оставьте заявку',
              buttonCaption: 'Отправить заявку',
            },
            submission: {
              success: {
                text: 'Спасибо! Мы перезвоним в течение часа.',
              },
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
        'crm.form.update',
        [
            'id' => 47,
            'updatedTime' => '2026-10-21T17:44:00+03:00',
            'fields' => [
                'appearance' => [
                    'title' => 'Оставьте заявку',
                    'buttonCaption' => 'Отправить заявку',
                ],
                'submission' => [
                    'success' => [
                        'text' => 'Спасибо! Мы перезвоним в течение часа.',
                    ],
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
    res, err := client.Core().Call(ctx, "crm.form.update", b24.Params{
    	"id": 47,
    	"updatedTime": "2026-10-21T17:44:00+03:00",
    	"fields": map[string]any{
    		"appearance": map[string]any{
    			"title": "Оставьте заявку",
    			"buttonCaption": "Отправить заявку",
    		},
    		"submission": map[string]any{
    			"success": map[string]any{
    				"text": "Спасибо! Мы перезвоним в течение часа.",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.form.update: %w", err)
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
        "start": 1792593882,
        "finish": 1792593883.117865,
        "duration": 1.1178650856018066,
        "processing": 1,
        "date_start": "2026-10-21T17:44:42+03:00",
        "date_finish": "2026-10-21T17:44:43+03:00",
        "operating_reset_at": 1792594440,
        "operating": 0.9873239994049072
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если форма изменена ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

После изменения у формы новая версия `updatedTime`. Для следующего изменения получите ее методом [crm.form.get](./crm-form-get.md).

## Обработка ошибок

HTTP-статус: **409**

```json
{
    "error": {
        "code": "CRM_FORM_VERSION_MISMATCH",
        "message": "Версия CRM-формы устарела, изменения не сохранены: получите форму заново и повторите запрос",
        "currentUpdatedTime": "2026-10-21T17:44:00+03:00"
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
|| `updatedTime` | Обязательное поле `updatedTime` не указано | Передайте версию формы из ответа [crm.form.get](./crm-form-get.md) ||
|| `updatedTime` | В поле `updatedTime` требуется тип данных `DateTime` для такого запроса | Передайте дату в формате ISO 8601, например `2026-10-21T17:44:00+03:00` ||
|| `active` | `active` is published for reading only | Меняйте активность методами [crm.form.activate](./crm-form-activate.md) и [crm.form.deactivate](./crm-form-deactivate.md) ||
|| `booking` | `booking` is published for reading only | Не передавайте поля только для чтения ||
|| `filter` | crm.form.update changes one form addressed by id and takes no filter. | Передайте идентификатор одной формы в `id` без `filter` ||
|| `fields[N].type` | A stored field can not be turned into a `list` one: the variants it offers are not part of this contract | Не меняйте тип поля на `list`, `checkbox`, `radio`, `product`, `booking` ||
|| `-` | Другие нарушения конфигурации | Сообщения те же, что у [crm.form.add](./crm-form-add.md). Проверьте изменения заранее методом [crm.form.validate](./crm-form-validate.md) ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `sort` для сущности `FormDto` | Передайте только поля из раздела [Структура CRM-формы](./data-types.md#crm_form) ||
|#

#### Версия формы устарела

Код ошибки: `CRM_FORM_VERSION_MISMATCH`

HTTP-статус: **409**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `updatedTime` | Версия CRM-формы устарела, изменения не сохранены: получите форму заново и повторите запрос | Получите форму методом [crm.form.get](./crm-form-get.md), примените изменения к актуальной версии и повторите запрос. Текущая версия есть в ключе `currentUpdatedTime` ответа ||
|#

#### Системная форма

Код ошибки: `CRM_FORM_SYSTEM_IMMUTABLE`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Эту CRM-форму нельзя изменить или удалить | Системную форму изменить нельзя. Проверьте поле `system` методом [crm.form.get](./crm-form-get.md) ||
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

Код ошибки: `CRM_FORM_PHONE_VERIFICATION_REQUIRED`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Подтвердите номер телефона в Битрикс24, чтобы работать с CRM-формами | Подтвердите номер телефона в Битрикс24 и повторите запрос ||
|#

#### Ошибка после сохранения

Код ошибки: `CRM_FORM_SIDE_EFFECT_FAILED`

HTTP-статус: **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удалось завершить действие, но данные CRM-формы уже изменены: проверьте состояние формы перед повторной попыткой | Получите форму методом [crm.form.get](./crm-form-get.md) и проверьте ее состояние ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-get.md)
- [{#T}](./crm-form-validate.md)
- [{#T}](./data-types.md)
- [{#T}](./placement/crm-form-embedding-update.md)
- [{#T}](./index.md)
