# Создать CRM-форму crm.form.add

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

Метод `crm.form.add` создает CRM-форму с настройками конструктора.

{% note warning "" %}

Через REST нельзя добавить в форму поля с вариантами выбора — список, флажки, переключатели, — а также товары и бронирование. Тему оформления изменить тоже нельзя.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Настройки формы, [подробное описание](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название формы, до 50 символов ||
|| **crm***
[`object`](../../data-types.md) | Настройки CRM. Обязательно поле `entityScheme` — схема CRM, то есть какие объекты создаст заполнение формы. Идентификаторы схем возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `entitySchemes`.

Необязательные поля раздела — `duplicateMode`, `dealCategoryId`, `smartProcessCategoryId`, `dealDuplicateControlEnabled`, `smartProcessDuplicateControlEnabled` — описаны в [структуре раздела crm](./data-types.md#crm) ||
|| **active**
[`boolean`](../../data-types.md) | Активность формы.

Возможные значения:

- `true` — форма работает сразу после создания
- `false` — форма создается выключенной

По умолчанию: `true`.

Активная форма учитывается в лимите активных форм тарифа ||
|| **fields**
[`array`](../../data-types.md) | Поля, которые заполняет клиент, например имя и телефон, в порядке отображения. Это ключ `fields` внутри параметра `fields` метода — названия совпадают.

Коды полей должны относиться к объектам схемы `crm.entityScheme` и не повторяться, [подробное описание](#form-fields) ||
|| **languageId**
[`string`](../../data-types.md) | Язык формы. Список языков возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md) ||
|| **templateId**
[`string`](../../data-types.md) | Сценарий формы. Список сценариев возвращает метод [crm.form.scenario.list](./setup/crm-form-scenario-list.md) ||
|| **appearance**
[`object`](../../data-types.md) | Заголовок, описание и кнопка. Поля `title`, `description`, `buttonCaption`, `buttonTextColor`, `buttonBackgroundColor`, `copyrightRemoved` описаны в [структуре раздела appearance](./data-types.md#appearance) ||
|| **responsible**
[`object`](../../data-types.md) | Очередь ответственных. Поля `userIds`, `checkWorkTime` описаны в [структуре раздела responsible](./data-types.md#responsible) ||
|| **agreements**
[`object`](../../data-types.md) | Соглашения. Поля `enabled`, `items` описаны в [структуре раздела agreements](./data-types.md#agreements) ||
|| **submission**
[`object`](../../data-types.md) | Сообщения и перенаправление после отправки. Поля `success`, `failure`, `redirectDelay`, `refill` описаны в [структуре раздела submission](./data-types.md#submission) ||
|| **dependencies**
[`array`](../../data-types.md) | Правила зависимых полей. Элемент — группа правил с полями `logic` и `rules`, у каждого правила есть `condition` и `action`. Описание — в [структуре элемента dependencies](./data-types.md#dependencies) ||
|| **presetFields**
[`array`](../../data-types.md) | Значения полей CRM, которые форма заполнит автоматически. Элемент с полями `entityName`, `fieldName`, `value` описан в [структуре элемента presetFields](./data-types.md#presetFields) ||
|| **payment**
[`object`](../../data-types.md) | Оплата после заполнения формы. Поля `enabled`, `disabledPaySystemsId` описаны в [структуре раздела payment](./data-types.md#payment) ||
|| **callback**
[`object`](../../data-types.md) | Обратный звонок после заполнения формы. Поля `enabled`, `from`, `text` описаны в [структуре раздела callback](./data-types.md#callback) ||
|| **analytics**
[`object`](../../data-types.md) | Счетчики веб-аналитики. Поля `googleAnalyticsId`, `googleAnalyticsPageViewEnabled`, `yandexMetricaId` описаны в [структуре раздела analytics](./data-types.md#analytics) ||
|| **spamProtection**
[`object`](../../data-types.md) | Защита от спама: поле `enabled` типа `boolean` ||
|| **integrations**
[`object`](../../data-types.md) | Форма в мессенджере и связи с рекламными сервисами. Поля `whatsAppEnabled`, `ads` описаны в [структуре раздела integrations](./data-types.md#integrations) ||
|#

#### Элемент fields.fields {#form-fields}

Один элемент массива — одно поле формы. Порядок полей задается порядком элементов, поле `sort` передавать не нужно.

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Код поля, например `LEAD_NAME`. Коды полей CRM возвращает метод [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md). Поле должно относиться к объектам схемы `crm.entityScheme`. Один код можно указать в форме один раз ||
|| **type**
[`string`](../../data-types.md) | Тип поля, например `string`, `phone`, `email`. Список типов возвращает метод [crm.form.configuration.get](./setup/crm-form-configuration-get.md) в ключе `fieldTypes`.

Через REST пока нельзя добавить поля с вариантами выбора и товары: `list`, `checkbox`, `radio`, `product`, `booking`. Такие поля, созданные в интерфейсе, сохраняются при записи, если не менять их тип ||
|| **label**
[`string`](../../data-types.md) | Подпись поля ||
|| **required**
[`boolean`](../../data-types.md) | Обязательность поля.

Возможные значения:

- `true` — поле обязательное
- `false` — поле необязательное ||
|| **multiple**
[`boolean`](../../data-types.md) | Можно ли ввести несколько значений.

Возможные значения:

- `true` — несколько значений
- `false` — одно значение ||
|| **placeholder**
[`string`](../../data-types.md) | Подсказка внутри пустого поля ||
|| **valueType**
[`string`](../../data-types.md) | Тип значения для полей контактов, например рабочий или мобильный телефон ||
|| **value**
[`string`](../../data-types.md) | Значение по умолчанию ||
|#

Поля `id`, `code`, `system`, `createdTime`, `updatedTime`, `activeChangedById`, `activeChangedTime`, `booking`, `appearance.backgroundImageId` и `fields[].sort` только для чтения: передавать их нельзя.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.add`

{% endnote %}

Пример создает выключенную форму, которая создает лид из имени и телефона.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Заявка на консультацию","active":false,"crm":{"entityScheme":1},"fields":[{"name":"LEAD_NAME","type":"string","label":"Имя","required":true},{"name":"LEAD_PHONE","type":"phone","label":"Телефон","required":true}]}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Заявка на консультацию","active":false,"crm":{"entityScheme":1},"fields":[{"name":"LEAD_NAME","type":"string","label":"Имя","required":true},{"name":"LEAD_PHONE","type":"phone","label":"Телефон","required":true}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FormAddResult = {
      id: number
    }

    try {
      const response = await $b24.actions.v3.call.make<FormAddResult>({
        method: 'crm.form.add',
        params: {
          fields: {
            name: 'Заявка на консультацию',
            active: false,
            crm: {
              entityScheme: 1,
            },
            fields: [
              {
                name: 'LEAD_NAME',
                type: 'string',
                label: 'Имя',
                required: true,
              },
              {
                name: 'LEAD_PHONE',
                type: 'phone',
                label: 'Телефон',
                required: true,
              },
            ],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.id)
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
      async function addForm() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.add',
            params: {
              fields: {
                name: 'Заявка на консультацию',
                active: false,
                crm: {
                  entityScheme: 1,
                },
                fields: [
                  {
                    name: 'LEAD_NAME',
                    type: 'string',
                    label: 'Имя',
                    required: true,
                  },
                  {
                    name: 'LEAD_PHONE',
                    type: 'phone',
                    label: 'Телефон',
                    required: true,
                  },
                ],
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
          console.info(result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addForm)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # client = Client(token, prefer_version=3)

    try:
        bitrix_response = client.crm.form.add(
            fields={
                "name": "Заявка на консультацию",
                "active": False,
                "crm": {
                    "entityScheme": 1,
                },
                "fields": [
                    {
                        "name": "LEAD_NAME",
                        "type": "string",
                        "label": "Имя",
                        "required": True,
                    },
                    {
                        "name": "LEAD_PHONE",
                        "type": "phone",
                        "label": "Телефон",
                        "required": True,
                    },
                ],
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
                'crm.form.add',
                [
                    'fields' => [
                        'name' => 'Заявка на консультацию',
                        'active' => false,
                        'crm' => [
                            'entityScheme' => 1,
                        ],
                        'fields' => [
                            [
                                'name' => 'LEAD_NAME',
                                'type' => 'string',
                                'label' => 'Имя',
                                'required' => true,
                            ],
                            [
                                'name' => 'LEAD_PHONE',
                                'type' => 'phone',
                                'label' => 'Телефон',
                                'required' => true,
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
        'crm.form.add',
        {
          fields: {
            name: 'Заявка на консультацию',
            active: false,
            crm: {
              entityScheme: 1,
            },
            fields: [
              {
                name: 'LEAD_NAME',
                type: 'string',
                label: 'Имя',
                required: true,
              },
              {
                name: 'LEAD_PHONE',
                type: 'phone',
                label: 'Телефон',
                required: true,
              },
            ],
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
        'crm.form.add',
        [
            'fields' => [
                'name' => 'Заявка на консультацию',
                'active' => false,
                'crm' => [
                    'entityScheme' => 1,
                ],
                'fields' => [
                    [
                        'name' => 'LEAD_NAME',
                        'type' => 'string',
                        'label' => 'Имя',
                        'required' => true,
                    ],
                    [
                        'name' => 'LEAD_PHONE',
                        'type' => 'phone',
                        'label' => 'Телефон',
                        'required' => true,
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
    res, err := client.Core().Call(ctx, "crm.form.add", b24.Params{
    	"fields": map[string]any{
    		"name": "Заявка на консультацию",
    		"active": false,
    		"crm": map[string]any{
    			"entityScheme": 1,
    		},
    		"fields": []any{
    			map[string]any{
    				"name": "LEAD_NAME",
    				"type": "string",
    				"label": "Имя",
    				"required": true,
    			},
    			map[string]any{
    				"name": "LEAD_PHONE",
    				"type": "phone",
    				"label": "Телефон",
    				"required": true,
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.form.add: %w", err)
    }

    var data struct {
    	ID int `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &data); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(data.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 47
    },
    "time": {
        "start": 1792593840,
        "finish": 1792593842.660519,
        "duration": 2.6605188846588135,
        "processing": 2,
        "date_start": "2026-10-21T17:44:00+03:00",
        "date_finish": "2026-10-21T17:44:02+03:00",
        "operating_reset_at": 1792594440,
        "operating": 2.563063859939575
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор созданной формы ||
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
                "message": "Name of the CRM form is required",
                "field": "name"
            },
            {
                "message": "CRM scheme of the form can not be used",
                "field": "crm.entityScheme"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

Метод возвращает все нарушения конфигурации сразу. В поле `field` указан путь к значению запроса, например `crm.entityScheme` или `fields[1].name`. Сообщения проверки конфигурации приходят на английском языке.

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте настройки формы в `fields` ||
|| `name` | Name of the CRM form is required | Передайте название формы ||
|| `name` | Name of the CRM form is longer than 50 characters | Сократите название до 50 символов ||
|| `crm.entityScheme` | CRM scheme of the form is required | Передайте схему CRM ||
|| `crm.entityScheme` | CRM scheme of the form can not be used | Возьмите идентификатор схемы из ответа [crm.form.configuration.get](./setup/crm-form-configuration-get.md) ||
|| `fields[N].type` | A field of type `list` can not be created through this contract: the variants it offers are not part of it | Не добавляйте через REST поля типов `list`, `checkbox`, `radio`, `product`, `booking` ||
|| `fields[N].name` | Form field `LEAD_NAME` is specified more than once | Укажите каждый код поля один раз ||
|| `fields[N].name` | CRM field `#NAME#` is not part of the scheme of the form | Используйте поля объектов выбранной схемы из ответа [crm.form.entityfield.list](./setup/crm-form-entityfield-list.md) ||
|| `booking` | `booking` is published for reading only | Не передавайте поля только для чтения ||
|| `payment.enabled` | Payment is not available on this portal | Оплата недоступна на этом Битрикс24 ||
|| `callback.enabled` | Callback is not available on this portal | Обратный звонок недоступен на этом Битрикс24 ||
|| `integrations.whatsAppEnabled` | Messenger forms are not available on this portal | Формы в мессенджере недоступны на этом Битрикс24 ||
|| `callback.from` | This number can not be called from on this portal | Укажите номер телефонии этого Битрикс24 ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Неизвестное поле `sort` для сущности `FormDto` | Передайте только поля из раздела [Структура CRM-формы](./data-types.md#crm_form) ||
|#

#### Форма создана частично

Код ошибки: `CRM_FORM_PARTIALLY_CREATED`

HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | CRM-форма создана, но не все данные сохранены: исправьте поля и обновите форму по ее ID | В ответе есть ключ `id` созданной формы. Не создавайте форму повторно: исправьте поля из `validation` и обновите форму методом [crm.form.update](./crm-form-update.md) ||
|#

#### Ограничения тарифа

Код ошибки: `CRM_FORM_WRITE_RESTRICTED`

HTTP-статус: **402**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | На этом тарифе нельзя изменять CRM-формы | Смените тариф Битрикс24 ||
|#

Код ошибки: `CRM_FORM_ACTIVATION_LIMIT_REACHED`

HTTP-статус: **402**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Достигнут лимит активных CRM-форм на этом тарифе: выключите ненужную форму и повторите запрос | Создайте форму с `active: false` или выключите другую форму методом [crm.form.deactivate](./crm-form-deactivate.md) ||
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

Код ошибки: `CRM_FORM_MODULE_UNAVAILABLE`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Чтобы выполнить действие, установите модуль «#MODULE#» | Установите модуль из сообщения ||
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

- [{#T}](./crm-form-validate.md)
- [{#T}](./crm-form-update.md)
- [{#T}](./data-types.md)
- [{#T}](./setup/crm-form-configuration-get.md)
- [{#T}](./crm-form-activate.md)
- [{#T}](./setup/crm-form-entityfield-list.md)
- [{#T}](./placement/crm-form-embedding-get.md)
- [{#T}](./index.md)
