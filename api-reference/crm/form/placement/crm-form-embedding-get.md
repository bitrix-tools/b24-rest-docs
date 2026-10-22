# Получить варианты размещения CRM-формы crm.form.embedding.get

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

Метод `crm.form.embedding.get` возвращает код для размещения CRM-формы на сайте и публичную ссылку на форму.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор CRM-формы.

Идентификатор можно получить методом [crm.form.list](../crm-form-list.md) ||
|| **variant**
[`string`](../../../data-types.md) | Вариант размещения, который нужно вернуть. Если параметр не передан, метод возвращает все варианты.

Возможные значения:

- `inline` — форма встроена в страницу сайта
- `click` — форма открывается по клику на кнопку или ссылку
- `auto` — форма открывается автоматически через заданное время
- `link` — публичная ссылка на форму ||
|| **buttonText**
[`string`](../../../data-types.md) | Текст кнопки или ссылки, по которой открывается форма. Значение подставляется только в возвращаемый код и не сохраняется в форме.

Используйте, если `variant` равно `click`. Если передан только `buttonType`, метод берет текст кнопки из настроек формы, а при его отсутствии — текст по умолчанию ||
|| **buttonType**
[`string`](../../../data-types.md) | Вид элемента, по которому открывается форма. Значение подставляется только в возвращаемый код и не сохраняется в форме.

Возможные значения:

- `button` — кнопка
- `link` — ссылка

По умолчанию: `button`

Используйте, если `variant` равно `click` ||
|| **delay**
[`integer`](../../../data-types.md) | Задержка автопоказа формы в секундах. Значение подставляется только в возвращаемый код и не сохраняется в форме.

Допустимые значения перечислены в `auto.options.delay` ответа метода без параметра `variant`, например `3`, `5`, `7`, `10`, `15`, `20`, `25`, `30`, `40`, `60`, `120`.

Используйте, если `variant` равно `auto` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.form.embedding.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.form.embedding.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":45,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.form.embedding.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type EmbeddingVariant = {
      code: string | null
      previewUrl: string
      settings: Record<string, unknown> | null
      options: Record<string, unknown> | null
    }

    type FormEmbeddingGetResult = {
      item: {
        formActive: boolean
        resourcesReady: boolean
        publicUrl: string
        inline: EmbeddingVariant
        click: EmbeddingVariant
        auto: EmbeddingVariant
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<FormEmbeddingGetResult>({
        method: 'crm.form.embedding.get',
        params: {
          id: 45,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item.publicUrl, result.item.inline.code)
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
      async function getFormEmbedding() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'crm.form.embedding.get',
            params: {
              id: 45,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item.publicUrl, result.item.inline.code)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getFormEmbedding)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.form.embedding.get(
            id=45,
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
                'crm.form.embedding.get',
                [
                    'id' => 45,
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
        'crm.form.embedding.get',
        {
            id: 45,
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
        'crm.form.embedding.get',
        [
            'id' => 45,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    res, err := client.Core().Call(ctx, "crm.form.embedding.get", b24.Params{
    	"id": 45,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.form.embedding.get: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	FormActive     bool   `json:"formActive"`
    	ResourcesReady bool   `json:"resourcesReady"`
    	PublicURL      string `json:"publicUrl"`
    	Inline         struct {
    		Code       *string `json:"code"`
    		PreviewURL string  `json:"previewUrl"`
    	} `json:"inline"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.PublicURL)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Ответ без параметра `variant`:

```json
{
    "result": {
        "item": {
            "formActive": true,
            "resourcesReady": true,
            "publicUrl": "https://example.bitrix24site.ru/crm_form_nscnl/?telemetry_sign=v1%3A45%3Adirect_link.0960d174ab4aa87739668fbe63deae0a790b4f7254670a3b36d646588fa04242",
            "inline": {
                "code": "<script data-b24-form=\"inline/45/6el0zj\" data-b24-form-telemetry-sign=\"v1:45:site.d77c41d60d0649b2310bbe359cfd319772d16a2387b2e14f10c9e830ae76eb39\" data-skip-moving=\"true\">\n\t(function(w,d,u){\n\t\tvar s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);\n\t\tvar h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);\n\t})(window,document,'https://cdn-ru.bitrix24.ru/b1234567/crm/form/loader_45.js');\n</script>",
                "previewUrl": "https://test.bitrix24.ru/pub/form/45/6el0zj/?view=preview&preview=inline",
                "settings": null,
                "options": null
            },
            "click": {
                "code": "<script data-b24-form=\"click/45/6el0zj\" data-b24-form-telemetry-sign=\"v1:45:site.d77c41d60d0649b2310bbe359cfd319772d16a2387b2e14f10c9e830ae76eb39\" data-skip-moving=\"true\">\n\t(function(w,d,u){\n\t\tvar s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);\n\t\tvar h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);\n\t})(window,document,'https://cdn-ru.bitrix24.ru/b1234567/crm/form/loader_45.js');\n</script>",
                "previewUrl": "https://test.bitrix24.ru/pub/form/45/6el0zj/?view=preview&preview=click",
                "settings": {
                    "type": "panel",
                    "position": "right",
                    "vertical": "bottom",
                    "button": {
                        "use": false,
                        "text": null,
                        "font": null,
                        "align": null,
                        "plain": false,
                        "rounded": false,
                        "outlined": false,
                        "decoration": null,
                        "color": {
                            "text": null,
                            "textHover": null,
                            "background": null,
                            "backgroundHover": null
                        }
                    }
                },
                "options": {
                    "type": ["popup", "panel"],
                    "position": ["left", "center", "right"],
                    "vertical": ["bottom", "top"],
                    "button": {
                        "font": ["modern", "classic", "elegant"],
                        "align": ["inline", "left", "center", "right"]
                    }
                }
            },
            "auto": {
                "code": "<script data-b24-form=\"auto/45/6el0zj\" data-b24-form-telemetry-sign=\"v1:45:site.d77c41d60d0649b2310bbe359cfd319772d16a2387b2e14f10c9e830ae76eb39\" data-skip-moving=\"true\">\n\t(function(w,d,u){\n\t\tvar s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/180000|0);\n\t\tvar h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);\n\t})(window,document,'https://cdn-ru.bitrix24.ru/b1234567/crm/form/loader_45.js');\n</script>",
                "previewUrl": "https://test.bitrix24.ru/pub/form/45/6el0zj/?view=preview&preview=auto",
                "settings": {
                    "type": "popup",
                    "position": "center",
                    "vertical": "bottom",
                    "delay": 5
                },
                "options": {
                    "type": ["popup", "panel"],
                    "position": ["left", "center", "right"],
                    "vertical": ["bottom", "top"],
                    "delay": [3, 5, 7, 10, 15, 20, 25, 30, 40, 60, 120]
                }
            }
        }
    },
    "time": {
        "start": 1792593809,
        "finish": 1792593809.843669,
        "duration": 0.8436689376831055,
        "processing": 0,
        "date_start": "2026-10-21T17:43:29+03:00",
        "date_finish": "2026-10-21T17:43:29+03:00",
        "operating_reset_at": 1792594380,
        "operating": 0
    }
}
```

Ответ с параметрами `"variant":"auto"` и `"delay":10`:

```json
{
    "result": {
        "item": {
            "variant": "auto",
            "code": "<script id=\"bx24_form_delay\" data-skip-moving=\"true\">\n\t(function(w,d,u,b){w['Bitrix24FormObject']=b;w[b] = w[b] || function(){arguments[0].ref=u;\n\t\t(w[b].forms=w[b].forms||[]).push(arguments[0])};\n\t\tif(w[b]['forms']) return;\n\t\tvar s=d.createElement('script');s.async=1;s.src=u+'?'+(1*new Date());\n\t\tvar h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);\n\t})(window,document,'https://test.bitrix24.ru/bitrix/js/crm/form_loader.js','b24form');\n\n\tb24form({\"id\":45,\"lang\":\"ru\",\"sec\":\"6el0zj\",\"type\":\"delay\",\"delay\":10});\n</script>"
        }
    },
    "time": {
        "start": 1792594117,
        "finish": 1792594117.571196,
        "duration": 0.5711960792541504,
        "processing": 0,
        "date_start": "2026-10-21T17:48:37+03:00",
        "date_finish": "2026-10-21T17:48:37+03:00",
        "operating_reset_at": 1792594680,
        "operating": 0.4092140197753906
    }
}
```

Ответ с параметром `"variant":"link"`:

```json
{
    "result": {
        "item": {
            "variant": "link",
            "url": "https://example.bitrix24site.ru/crm_form_nscnl/?telemetry_sign=v1%3A45%3Adirect_link.0960d174ab4aa87739668fbe63deae0a790b4f7254670a3b36d646588fa04242"
        }
    },
    "time": {
        "start": 1792594113,
        "finish": 1792594113.75192,
        "duration": 0.7519199848175049,
        "processing": 0,
        "date_start": "2026-10-21T17:48:33+03:00",
        "date_finish": "2026-10-21T17:48:33+03:00",
        "operating_reset_at": 1792594680,
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
|| **item**
[`object`](../../../data-types.md) | Варианты размещения формы. Состав зависит от параметра `variant`:

- без `variant` — все варианты, [подробное описание](#item)
- с `variant` — один выбранный вариант, [подробное описание](#item-variant) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item без параметра variant {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **formActive**
[`boolean`](../../../data-types.md) | Активна ли форма.

Возможные значения:

- `true` — форма активна и принимает заполнения
- `false` — форма выключена. Включить ее можно методом [crm.form.activate](../crm-form-activate.md) ||
|| **resourcesReady**
[`boolean`](../../../data-types.md) | Собраны ли файлы формы для публикации.

Возможные значения:

- `true` — файлы собраны, коды размещения готовы
- `false` — файлы еще не собраны, у всех вариантов `code` равен `null` ||
|| **publicUrl**
[`string`](../../../data-types.md) | Публичная ссылка на форму ||
|| **inline**
[`object`](../../../data-types.md) | Вариант встраивания формы в страницу сайта. У варианта нет настроек, поэтому `settings` и `options` равны `null`, [подробное описание](#variant) ||
|| **click**
[`object`](../../../data-types.md) | Вариант показа формы по клику на кнопку или ссылку, [подробное описание](#variant) ||
|| **auto**
[`object`](../../../data-types.md) | Вариант автоматического показа формы через заданное время, [подробное описание](#variant) ||
|#

#### Объекты inline, click, auto {#variant}

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../../../data-types.md) | HTML-код для вставки на сайт. Равен `null`, пока файлы формы не собраны ||
|| **previewUrl**
[`string`](../../../data-types.md) | Ссылка на предпросмотр формы в этом варианте размещения ||
|| **settings**
[`object`](../../../data-types.md) | Текущие настройки показа. Есть только у вариантов `click` и `auto`, [подробное описание](#settings) ||
|| **options**
[`object`](../../../data-types.md) | Допустимые значения настроек показа. Есть только у вариантов `click` и `auto`, [подробное описание](#options) ||
|#

#### Объект settings {#settings}

Если значение настройки не сохранено в форме, возвращается `null`. В этом случае на сайте применяется значение по умолчанию.

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
|| **delay**
[`integer`](../../../data-types.md) | Задержка автопоказа в секундах. Есть только у варианта `auto` ||
|| **button**
[`object`](../../../data-types.md) | Настройки кнопки, по которой открывается форма. Есть только у варианта `click`, [подробное описание](#button) ||
|#

#### Объект button {#button}

#|
|| **Название**
`тип` | **Описание** ||
|| **use**
[`boolean`](../../../data-types.md) | Показывать ли кнопку Битрикс24 на сайте.

Возможные значения:

- `true` — показывать кнопку с настройками из этого объекта
- `false` — не показывать кнопку ||
|| **text**
[`string`](../../../data-types.md) | Текст кнопки ||
|| **font**
[`string`](../../../data-types.md) | Шрифт кнопки. Допустимые значения перечислены в `click.options.button.font`, например `modern`, `classic`, `elegant` ||
|| **align**
[`string`](../../../data-types.md) | Выравнивание кнопки. Допустимые значения перечислены в `click.options.button.align`, например `inline`, `left`, `center`, `right` ||
|| **plain**
[`boolean`](../../../data-types.md) | Признак кнопки без фона.

Возможные значения:

- `true` — кнопка без фона
- `false` — кнопка с фоном ||
|| **rounded**
[`boolean`](../../../data-types.md) | Признак скругленных углов.

Возможные значения:

- `true` — углы скруглены
- `false` — углы прямые ||
|| **outlined**
[`boolean`](../../../data-types.md) | Признак обводки кнопки.

Возможные значения:

- `true` — у кнопки есть обводка
- `false` — обводки нет ||
|| **decoration**
[`string`](../../../data-types.md) | Подчеркивание текста кнопки. В интерфейсе доступны значения `dotted`, `solid` или пустое значение ||
|| **color**
[`object`](../../../data-types.md) | Цвета кнопки в формате HEX, например `#3bc8f5` или `#3eddffa6` с прозрачностью:

- `text` — цвет текста
- `textHover` — цвет текста при наведении
- `background` — цвет фона
- `backgroundHover` — цвет фона при наведении ||
|#

#### Объект options {#options}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string[]`](../../../data-types.md) | Допустимые значения `settings.type` ||
|| **position**
[`string[]`](../../../data-types.md) | Допустимые значения `settings.position` ||
|| **vertical**
[`string[]`](../../../data-types.md) | Допустимые значения `settings.vertical` ||
|| **delay**
[`integer[]`](../../../data-types.md) | Допустимые значения `settings.delay`. Есть только у варианта `auto` ||
|| **button**
[`object`](../../../data-types.md) | Допустимые значения настроек кнопки: `font` и `align`. Есть только у варианта `click` ||
|#

#### Объект item с параметром variant {#item-variant}

#|
|| **Название**
`тип` | **Описание** ||
|| **variant**
[`string`](../../../data-types.md) | Выбранный вариант размещения: `inline`, `click`, `auto` или `link` ||
|| **code**
[`string`](../../../data-types.md) | HTML-код для вставки на сайт. Возвращается для вариантов `inline`, `click` и `auto` ||
|| **url**
[`string`](../../../data-types.md) | Публичная ссылка на форму. Возвращается для варианта `link` ||
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
                "message": "delay is available only for the auto embedding variant.",
                "field": "delay"
            }
        ]
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` формы ||
|| `variant` | Значение поля не содержится в списке допустимых значений: inline, click, auto, link | Передайте одно из значений `inline`, `click`, `auto`, `link` ||
|| `buttonType` | Значение поля не содержится в списке допустимых значений: button, link | Передайте `button` или `link` ||
|| `buttonText` | buttonText is available only for the click embedding variant. | Передайте `buttonText` только вместе с `"variant":"click"` ||
|| `buttonType` | buttonType is available only for the click embedding variant. | Передайте `buttonType` только вместе с `"variant":"click"` ||
|| `delay` | delay is available only for the auto embedding variant. | Передайте `delay` только вместе с `"variant":"auto"` ||
|| `delay` | Embedding delay `11` is not supported | Передайте значение из `auto.options.delay` ||
|#

#### Форма не найдена

HTTP-статус: **404**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `999999` не найдена | Проверьте идентификатор формы методом [crm.form.list](../crm-form-list.md) ||
|#

#### Ошибки доступа

HTTP-статус: **403**

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право на просмотр CRM-форм ||
|#

Код ошибки: `BITRIX_CRM_V2_INFRASTRUCTURE_REST_EXCEPTION_FORM_PHONEVERIFICATIONREQUIREDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Чтобы добавить CRM-форму, подтвердите номер телефона | Подтвердите номер телефона в Битрикс24 и повторите запрос ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-form-embedding-update.md)
- [{#T}](./crm-form-embedding-field-list.md)
- [{#T}](../crm-form-activate.md)
- [{#T}](./index.md)
- [{#T}](../crm-form-get.md)
