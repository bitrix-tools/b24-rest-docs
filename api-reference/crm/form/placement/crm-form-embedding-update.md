# Изменить настройки размещения CRM-формы crm.form.embedding.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение CRM-форм

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.form.embedding.update` сохраняет настройки показа CRM-формы по клику и автопоказа.

{% note info "" %}

Метод меняет версию формы `updatedTime`. Перед следующим изменением формы или ее размещения получите новую версию методом [crm.form.get](../crm-form-get.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор CRM-формы.

Идентификатор можно получить методом [crm.form.list](../crm-form-list.md) ||
|| **updatedTime***
[`datetime`](../../../data-types.md) | Версия формы — дата последнего изменения в формате ISO 8601, например `2026-10-21T17:48:29+03:00`.

Значение можно получить методом [crm.form.get](../crm-form-get.md) из поля `updatedTime`. Если форму изменили после того, как вы получили значение, метод вернет ошибку `CRM_FORM_VERSION_MISMATCH` ||
|| **fields***
[`object`](../../../data-types.md) | Настройки, которые нужно изменить. Непереданные настройки остаются без изменений, чтобы сбросить настройку, передайте для нее `null`. Пустой объект `{}` допустим: в этом случае метод ничего не меняет, [подробное описание](#fields) ||
|#

### Параметр fields {#fields}

Структура `fields` повторяет структуру ответа [crm.form.embedding.get](./crm-form-embedding-get.md#item): настройки варианта передаются в объекте `settings` внутри `click` или `auto`. Другие поля ответа изменить нельзя, у варианта `inline` настроек нет.

#|
|| **Название**
`тип` | **Описание** ||
|| **click.settings**
[`object`](../../../data-types.md) | Настройки показа формы по клику, [подробное описание](#click-settings) ||
|| **auto.settings**
[`object`](../../../data-types.md) | Настройки автопоказа формы, [подробное описание](#auto-settings) ||
|#

#### Объект click.settings {#click-settings}

Допустимые значения `type`, `position`, `vertical`, `button.font` и `button.align` возвращает метод [crm.form.embedding.get](./crm-form-embedding-get.md) в объекте `click.options`.

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Вид окна формы.

Возможные значения:

- `popup` — всплывающее окно
- `panel` — боковая панель ||
|| **position**
[`string`](../../../data-types.md) | Положение окна по горизонтали.

Возможные значения:

- `left` — слева
- `center` — по центру
- `right` — справа ||
|| **vertical**
[`string`](../../../data-types.md) | Положение окна по вертикали.

Возможные значения:

- `bottom` — снизу
- `top` — сверху ||
|| **button**
[`object`](../../../data-types.md) | Настройки кнопки, [подробное описание](#button) ||
|#

#### Объект click.settings.button {#button}

#|
|| **Название**
`тип` | **Описание** ||
|| **use**
[`boolean`](../../../data-types.md) | Показывать ли кнопку Битрикс24 на сайте.

Возможные значения:

- `true` — показывать кнопку с настройками из этого объекта
- `false` — не показывать кнопку ||
|| **text**
[`string`](../../../data-types.md) | Текст кнопки, не длиннее 255 символов ||
|| **font**
[`string`](../../../data-types.md) | Шрифт кнопки.

Возможные значения:

- `modern`
- `classic`
- `elegant` ||
|| **align**
[`string`](../../../data-types.md) | Выравнивание кнопки.

Возможные значения:

- `inline` — в строку с текстом
- `left` — по левому краю
- `center` — по центру
- `right` — по правому краю ||
|| **plain**
[`boolean`](../../../data-types.md) | Кнопка без фона.

Возможные значения:

- `true` — кнопка без фона
- `false` — кнопка с фоном ||
|| **rounded**
[`boolean`](../../../data-types.md) | Скругленные углы кнопки.

Возможные значения:

- `true` — углы скруглены
- `false` — углы прямые ||
|| **outlined**
[`boolean`](../../../data-types.md) | Обводка кнопки.

Возможные значения:

- `true` — у кнопки есть обводка
- `false` — обводки нет ||
|| **decoration**
[`string`](../../../data-types.md) | Подчеркивание текста кнопки, не длиннее 20 символов. В интерфейсе используются значения `dotted` и `solid` ||
|| **color**
[`object`](../../../data-types.md) | Цвета кнопки в формате HEX: `#3bc8f5` или с прозрачностью `#3eddffa6`. Допустимы 3, 4, 6 или 8 шестнадцатеричных цифр после `#`:

- `text` — цвет текста
- `textHover` — цвет текста при наведении
- `background` — цвет фона
- `backgroundHover` — цвет фона при наведении ||
|#

#### Объект auto.settings {#auto-settings}

Допустимые значения возвращает метод [crm.form.embedding.get](./crm-form-embedding-get.md) в объекте `auto.options`.

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Вид окна формы: `popup` или `panel` ||
|| **position**
[`string`](../../../data-types.md) | Положение окна по горизонтали: `left`, `center` или `right` ||
|| **vertical**
[`string`](../../../data-types.md) | Положение окна по вертикали: `bottom` или `top` ||
|| **delay**
[`integer`](../../../data-types.md) | Задержка автопоказа в секундах.

Возможные значения: `3`, `5`, `7`, `10`, `15`, `20`, `25`, `30`, `40`, `60`, `120` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.embedding.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":49,"updatedTime":"2026-10-21T17:48:29+03:00","fields":{"click":{"settings":{"type":"popup","position":"left","vertical":"bottom","button":{"use":true,"text":"Оставить заявку","font":"modern","align":"right","rounded":true,"color":{"text":"#ffffff","background":"#3bc8f5"}}}},"auto":{"settings":{"type":"panel","delay":10}}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.embedding.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":49,"updatedTime":"2026-10-21T17:48:29+03:00","fields":{"click":{"settings":{"type":"popup","position":"left","vertical":"bottom","button":{"use":true,"text":"Оставить заявку","font":"modern","align":"right","rounded":true,"color":{"text":"#ffffff","background":"#3bc8f5"}}}},"auto":{"settings":{"type":"panel","delay":10}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.embedding.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type FormEmbeddingUpdateResult = {
      result: boolean
    }

    try {
      const response = await $b24.actions.v3.call.make<FormEmbeddingUpdateResult>({
        method: 'crm.form.embedding.update',
        params: {
          id: 49,
          updatedTime: '2026-10-21T17:48:29+03:00',
          fields: {
            click: {
              settings: {
                type: 'popup',
                position: 'left',
                vertical: 'bottom',
                button: {
                  use: true,
                  text: 'Оставить заявку',
                  font: 'modern',
                  align: 'right',
                  rounded: true,
                  color: {
                    text: '#ffffff',
                    background: '#3bc8f5',
                  },
                },
              },
            },
            auto: {
              settings: {
                type: 'panel',
                delay: 10,
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

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
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateFormEmbedding() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.embedding.update',
            params: {
              id: 49,
              updatedTime: '2026-10-21T17:48:29+03:00',
              fields: {
                click: {
                  settings: {
                    type: 'popup',
                    position: 'left',
                    vertical: 'bottom',
                    button: {
                      use: true,
                      text: 'Оставить заявку',
                      font: 'modern',
                      align: 'right',
                      rounded: true,
                      color: {
                        text: '#ffffff',
                        background: '#3bc8f5',
                      },
                    },
                  },
                },
                auto: {
                  settings: {
                    type: 'panel',
                    delay: 10,
                  },
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

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

      document.addEventListener('DOMContentLoaded', updateFormEmbedding)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    fields = {
        "click": {
            "settings": {
                "type": "popup",
                "position": "left",
                "vertical": "bottom",
                "button": {
                    "use": True,
                    "text": "Оставить заявку",
                    "font": "modern",
                    "align": "right",
                    "rounded": True,
                    "color": {
                        "text": "#ffffff",
                        "background": "#3bc8f5",
                    },
                },
            },
        },
        "auto": {
            "settings": {
                "type": "panel",
                "delay": 10,
            },
        },
    }

    try:
        bitrix_response = client.crm.form.embedding.update(
            id=49,
            updatedTime="2026-10-21T17:48:29+03:00",
            fields=fields,
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
                'crm.form.embedding.update',
                [
                    'id' => 49,
                    'updatedTime' => '2026-10-21T17:48:29+03:00',
                    'fields' => [
                        'click' => [
                            'settings' => [
                                'type' => 'popup',
                                'position' => 'left',
                                'vertical' => 'bottom',
                                'button' => [
                                    'use' => true,
                                    'text' => 'Оставить заявку',
                                    'font' => 'modern',
                                    'align' => 'right',
                                    'rounded' => true,
                                    'color' => [
                                        'text' => '#ffffff',
                                        'background' => '#3bc8f5',
                                    ],
                                ],
                            ],
                        ],
                        'auto' => [
                            'settings' => [
                                'type' => 'panel',
                                'delay' => 10,
                            ],
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
        'crm.form.embedding.update',
        {
            id: 49,
            updatedTime: '2026-10-21T17:48:29+03:00',
            fields: {
                click: {
                    settings: {
                        type: 'popup',
                        position: 'left',
                        vertical: 'bottom',
                        button: {
                            use: true,
                            text: 'Оставить заявку',
                            font: 'modern',
                            align: 'right',
                            rounded: true,
                            color: {
                                text: '#ffffff',
                                background: '#3bc8f5',
                            },
                        },
                    },
                },
                auto: {
                    settings: {
                        type: 'panel',
                        delay: 10,
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
        'crm.form.embedding.update',
        [
            'id' => 49,
            'updatedTime' => '2026-10-21T17:48:29+03:00',
            'fields' => [
                'click' => [
                    'settings' => [
                        'type' => 'popup',
                        'position' => 'left',
                        'vertical' => 'bottom',
                        'button' => [
                            'use' => true,
                            'text' => 'Оставить заявку',
                            'font' => 'modern',
                            'align' => 'right',
                            'rounded' => true,
                            'color' => [
                                'text' => '#ffffff',
                                'background' => '#3bc8f5',
                            ],
                        ],
                    ],
                ],
                'auto' => [
                    'settings' => [
                        'type' => 'panel',
                        'delay' => 10,
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
    res, err := client.Core().Call(ctx, "crm.form.embedding.update", b24.Params{
    	"id":          49,
    	"updatedTime": "2026-10-21T17:48:29+03:00",
    	"fields": map[string]any{
    		"click": map[string]any{
    			"settings": map[string]any{
    				"type":     "popup",
    				"position": "left",
    				"vertical": "bottom",
    				"button": map[string]any{
    					"use":     true,
    					"text":    "Оставить заявку",
    					"font":    "modern",
    					"align":   "right",
    					"rounded": true,
    					"color": map[string]any{
    						"text":       "#ffffff",
    						"background": "#3bc8f5",
    					},
    				},
    			},
    		},
    		"auto": map[string]any{
    			"settings": map[string]any{
    				"type":  "panel",
    				"delay": 10,
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.form.embedding.update: %w", err)
    }

    var result struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Result)
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
        "start": 1792594145,
        "finish": 1792594146.982679,
        "duration": 1.9826788902282715,
        "processing": 1,
        "date_start": "2026-10-21T17:49:05+03:00",
        "date_finish": "2026-10-21T17:49:06+03:00",
        "operating_reset_at": 1792594740,
        "operating": 1.0246188640594482
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа.

Содержит объект с ключом `result` и значением `true`, если настройки сохранены ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **409**

```json
{
    "error": {
        "code": "CRM_FORM_VERSION_MISMATCH",
        "message": "Версия CRM-формы устарела, изменения не сохранены: получите форму заново и повторите запрос",
        "currentUpdatedTime": "2026-10-21T17:49:05+03:00"
    }
}
```

В ошибке `CRM_FORM_VERSION_MISMATCH` поле `currentUpdatedTime` содержит текущую версию формы. Ее можно передать в `updatedTime` при повторном запросе, если вы уверены, что изменения другого пользователя можно перезаписать.

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

HTTP-статус: **400**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

Если в `fields` несколько ошибок, метод возвращает их вместе в массиве `validation`.

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `updatedTime` | Обязательное поле `updatedTime` не указано | Передайте `updatedTime` из ответа [crm.form.get](../crm-form-get.md) ||
|| `updatedTime` | В поле `updatedTime` требуется тип данных `DateTime` для такого запроса | Передайте дату в формате ISO 8601, например `2026-10-21T17:48:29+03:00` ||
|| `filter` | crm.form.embedding.update changes the embedding of one form addressed by id and takes no filter. | Уберите `filter` из запроса и передайте `id` формы ||
|| `inline` | `inline` carries no settings of its own | Не передавайте `inline`: у этого варианта нет настроек ||
|| `click` | `click` is cleared through its own settings, not as a whole | Не передавайте `null` для всего варианта. Чтобы сбросить настройку, передайте `null` для нее, например `click.settings.type` ||
|| `click.settings.delay` | `click.settings.delay` is no setting of the `click` variant | Передавайте `delay` только в `auto.settings`, а `button` — только в `click.settings` ||
|| `click.code` | `click.code` is no setting of the `click` variant | Передавайте внутри варианта только объект `settings` ||
|| `publicUrl` | `publicUrl` is published for reading only | Не передавайте `formActive`, `resourcesReady` и `publicUrl`: они доступны только для чтения ||
|| `click.settings.type` | `click.settings.type` accepts one of: popup, panel | Передайте значение из `click.options` ответа [crm.form.embedding.get](./crm-form-embedding-get.md) ||
|| `auto.settings.delay` | `auto.settings.delay` accepts one of: 3, 5, 7, 10, 15, 20, 25, 30, 40, 60, 120 | Передайте значение из `auto.options.delay` ||
|| `click.settings.button.color.text` | `click.settings.button.color.text` expects a hex colour, `#3bc8f5` or `#3eddffa6` | Передайте цвет в формате HEX ||
|| `click.settings.button.text` | `click.settings.button.text` is longer than 255 characters | Сократите текст кнопки до 255 символов ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `click.settings.size` для сущности `EmbeddingDto` | Передайте только настройки из описания параметра `fields` ||
|#

#### Ошибки версии и состояния формы

Код ошибки: `CRM_FORM_VERSION_MISMATCH`

HTTP-статус: **409**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Версия CRM-формы устарела, изменения не сохранены: получите форму заново и повторите запрос | Получите актуальное `updatedTime` методом [crm.form.get](../crm-form-get.md) или возьмите его из `currentUpdatedTime` и повторите запрос ||
|#

Код ошибки: `CRM_FORM_SYSTEM_IMMUTABLE`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Эту CRM-форму нельзя изменить или удалить | Системную форму изменить нельзя. Выберите форму, у которой в ответе [crm.form.get](../crm-form-get.md) поле `system` равно `false` ||
|#

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `999999` не найдена | Проверьте идентификатор формы методом [crm.form.list](../crm-form-list.md) ||
|#

#### Ошибки доступа и тарифа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право на изменение CRM-форм ||
|#

Код ошибки: `CRM_FORM_WRITE_RESTRICTED`

HTTP-статус: **402**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | На этом тарифе нельзя изменять CRM-формы | Перейдите на тариф, в котором доступно редактирование CRM-форм ||
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
|| `-` | Не удалось завершить действие, но данные CRM-формы уже изменены: проверьте состояние формы перед повторной попыткой | Настройки сохранены, но файлы формы не пересобраны. Проверьте настройки методом [crm.form.embedding.get](./crm-form-embedding-get.md) и повторите запрос ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-embedding-get.md)
- [{#T}](./crm-form-embedding-field-list.md)
- [{#T}](./index.md)
- [{#T}](../crm-form-update.md)
