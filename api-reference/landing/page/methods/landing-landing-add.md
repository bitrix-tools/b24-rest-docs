# Добавить страницу или папку landing.landing.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.add` добавляет страницу или папку в указанный сайт и возвращает идентификатор созданного объекта. Новый объект создается неактивным (`ACTIVE = N`). Дополнительные поля страницы, например мета-теги и цветовую тему, задают после создания методом [landing.landing.update](./landing-landing-update.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний параметр лендингов: тип сайтов, с которыми работает метод. Он не связан с REST-скоупом `landing`.

Для страниц Базы знаний передайте `KNOWLEDGE`, для страниц Базы знаний группы — `GROUP`, регистр не важен. Без `scope` метод не найдет сайт Базы знаний и вернет ошибку `SITE_NOT_FOUND`. Для сайтов типов `PAGE`, `STORE`, `SMN` и `VIBE` параметр не нужен [(подробное описание)](../../types.md) ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей новой страницы или папки [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../../../data-types.md) | Название страницы ||
|| **SITE_ID***
[`integer`](../../../data-types.md) | Идентификатор сайта, в котором создается страница.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md) ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код страницы — часть ее адреса. Код не должен содержать `/` и [запрещенные символы](#errors) — кавычки, `$`, скобки и другие. Нельзя передавать код в формате `<буквы, цифры или _>_<число>_<число>`, например `code_12_34`.

Если поле не передать или передать строку только из пробелов, код сгенерируется из `TITLE`. Если после транслитерации код окажется пустым, будет сгенерирована строка из 12 символов.

Пустую строку `''` без параметра `FOLDER` передавать нельзя — метод вернет ошибку `CANT_BE_EMPTY`. Если параметр `FOLDER` передан с любым значением, пустая строка допускается, и код сгенерируется из `TITLE`.

Если код уже занят в пределах сайта или папки, к нему добавится суффикс вида `_<4 случайных символа>` ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Произвольное описание страницы ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний идентификатор страницы ||
|| **SITEMAP**
[`string`](../../../data-types.md) | Флаг включения страницы в карту сайта. Поддерживаются `Y` и `N`, по умолчанию `N` ||
|| **FOLDER**
[`string`](../../../data-types.md) | Создать папку вместе со страницей. Поддерживаются `Y` и `N`, по умолчанию `N`.

Со значением `Y` и без `FOLDER_ID` Битрикс24 в том же вызове создаст папку с названием и кодом страницы, а новую страницу сделает ее индексной. В ответе придет идентификатор страницы, у нее будет `FOLDER = N`, а в `FOLDER_ID` — идентификатор новой папки. Если вместе с `Y` передать `FOLDER_ID`, у новой страницы будет `FOLDER = Y` — признак папки-страницы [(подробное описание)](../fields.md) ||
|| **FOLDER_ID**
[`integer`](../../../data-types.md) | Идентификатор папки, в которой нужно создать страницу. Папка должна принадлежать тому же сайту, что и `SITE_ID`.

Идентификатор папки можно получить методом [landing.site.getFolders](../../site/landing-site-get-folders.md) ||
|| **TPL_ID**
[`integer`](../../../data-types.md) | Идентификатор шаблона представления страницы.

Идентификатор шаблона представления можно получить методом [landing.template.getlist](../../template/landing-template-get-list.md) ||
|| **ADDITIONAL_FIELDS**
[`object`](../../../data-types.md) | Дополнительные поля страницы. Их задают после создания методом [landing.landing.update](./landing-landing-update.md): в `lid` передайте идентификатор новой страницы, в `fields.ADDITIONAL_FIELDS` — коды и значения полей из статьи [Дополнительные поля страницы](../additional-fields.md) ||
|| **BLOCK_ID**
[`integer`](../../../data-types.md) | Вместе с `MENU_CODE` используется, чтобы после создания страницы добавить ссылку в меню блока с указанным идентификатором ||
|| **MENU_CODE**
[`string`](../../../data-types.md) | Вместе с `BLOCK_ID` указывает код меню в блоке, куда нужно добавить ссылку на созданную страницу ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "fields": {
          "TITLE": "Весенняя акция",
          "SITE_ID": 292,
          "CODE": "spring-sale",
          "DESCRIPTION": "Страница для сезонной акции"
        }
      }' \
      "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/landing.landing.add.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "fields": {
          "TITLE": "Весенняя акция",
          "SITE_ID": 292,
          "CODE": "spring-sale",
          "DESCRIPTION": "Страница для сезонной акции"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put_your_bitrix24_address**/rest/landing.landing.add.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'landing.landing.add',
        params: {
          fields: {
            TITLE: 'Весенняя акция',
            SITE_ID: 292,
            CODE: 'spring-sale',
            DESCRIPTION: 'Страница для сезонной акции',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created landing page ID:', result)
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
      async function addLandingPage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.landing.add',
            params: {
              fields: {
                TITLE: 'Весенняя акция',
                SITE_ID: 292,
                CODE: 'spring-sale',
                DESCRIPTION: 'Страница для сезонной акции',
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
          console.info('Created landing page ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addLandingPage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.landing.landing.add(
            fields={
                "TITLE": "Весенняя акция",
                "SITE_ID": 292,
                "CODE": "spring-sale",
                "DESCRIPTION": "Страница для сезонной акции",
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
    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.landing.add',
                [
                    'fields' => [
                        'TITLE' => 'Весенняя акция',
                        'SITE_ID' => 292,
                        'CODE' => 'spring-sale',
                        'DESCRIPTION' => 'Страница для сезонной акции',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding landing page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.add',
        {
            fields: {
                TITLE: 'Весенняя акция',
                SITE_ID: 292,
                CODE: 'spring-sale',
                DESCRIPTION: 'Страница для сезонной акции',
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.landing.add',
        [
            'fields' => [
                'TITLE' => 'Весенняя акция',
                'SITE_ID' => 292,
                'CODE' => 'spring-sale',
                'DESCRIPTION' => 'Страница для сезонной акции',
            ],
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "landing.landing.add", b24.Params{
    	"fields": b24.Params{
    		"TITLE":       "Весенняя акция",
    		"SITE_ID":     292,
    		"CODE":        "spring-sale",
    		"DESCRIPTION": "Страница для сезонной акции",
    	},
    })
    if err != nil {
    	return fmt.Errorf("landing.landing.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

{% note warning %}

Если нужно, чтобы новая страница сразу попала в меню блока, передайте в `fields` оба служебных параметра: `BLOCK_ID` и `MENU_CODE`

{% endnote %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 2227,
    "time": {
        "start": 1773694924,
        "finish": 1773694924.307754,
        "duration": 0.3077540397644043,
        "processing": 0,
        "date_start": "2026-03-17T00:02:04+03:00",
        "date_finish": "2026-03-17T00:02:04+03:00",
        "operating_reset_at": 1773695524,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданной страницы или папки ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "SLASH_IS_NOT_ALLOWED",
    "error_description": "Слеш запрещен в адресе лендинга."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок {#errors}

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный верхнеуровневый параметр `fields` ||
|| `ACCESS_DENIED` | Доступ на создание страницы запрещен: у пользователя нет права «редактирование» для указанного сайта ||
|| `SITE_NOT_FOUND` | Сайт не найден: в `fields.SITE_ID` передан несуществующий идентификатор сайта ||
|| `FOLDER_NOT_FOUND` | Папка не найдена: в `fields.FOLDER_ID` передана папка, которая не относится к указанному сайту или не существует ||
|| `SLASH_IS_NOT_ALLOWED` | Слеш запрещен в адресе лендинга: в `fields.CODE` передан символ `/` ||
|| `CANT_BE_EMPTY` | Адрес страницы не может быть пустым: в `fields.CODE` передана пустая строка `''`, а `fields.FOLDER` не передан ||
|| `WRONG_CODE_CHARS` | Адрес страницы содержит запрещенные символы: в `fields.CODE` переданы одинарные, двойные или обратные кавычки, `$`, `\`, `<`, `>`, круглые или фигурные скобки, а также управляющие символы, например перенос строки ||
|| `WRONG_CODE_FORMAT` | Недопустимый адрес страницы: в `fields.CODE` передано значение в формате `<буквы, цифры или _>_<число>_<число>`, например `code_12_34` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-additional-fields.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-publication.md)
- [{#T}](./landing-landing-update.md)
