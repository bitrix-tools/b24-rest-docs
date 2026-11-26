# Добавить страницу по шаблону landing.landing.addByTemplate

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.addByTemplate` создает страницу на сайте по коду шаблона и возвращает ее идентификатор. Новая страница создается неопубликованной (`ACTIVE = "N"`). Исключение — если в `fields.ID` передана опубликованная страница: тогда новая опубликуется сразу. Опубликовать страницу позже можно методом [landing.landing.publication](./landing-landing-publication.md).

Если нужно полностью управлять полями создаваемой страницы, используйте [landing.landing.add](./landing-landing-add.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний параметр лендингов: тип сайтов, с которыми работает метод. Он не связан с REST-скоупом `landing`.

Для страниц Базы знаний передайте `KNOWLEDGE`, для страниц Базы знаний группы — `GROUP`, регистр не важен. Без `scope` метод не найдет сайт Базы знаний и вернет ошибку `SITE_ERROR`. Для сайтов типов `PAGE`, `STORE`, `SMN` и `VIBE` параметр не нужен [(подробное описание)](../../types.md) ||
|| **siteId***
[`integer`](../../../data-types.md) | Идентификатор сайта, в котором нужно создать страницу.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md) ||
|| **code***
[`string`](../../../data-types.md) | Код шаблона страницы, например `krayt.monotovar@KraytPetShop`. Список шаблонов, доступных в Битрикс24, вернет метод [landing.demos.getPageList](../../demos/landing-demos-get-page-list.md).

Если шаблона с таким кодом нет, страница не создастся, а в `result` придет `null` без ошибки ||
|| **fields**
[`object`](../../../data-types.md) | Дополнительные параметры создания страницы [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../../data-types.md) | Переопределяет заголовок создаваемой страницы и SEO-заголовки шаблона.

Если не передавать, будут использованы значения из шаблона ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Переопределяет SEO-описания шаблона.

Значение записывается в дополнительные поля `METAOG_DESCRIPTION` и `METAMAIN_DESCRIPTION`, но не в поле `DESCRIPTION` самой страницы ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор существующей страницы в том же сайте. От нее новая страница получит папку и публикацию.

Если страница лежит в папке, новая страница создастся в той же папке, а параметр `fields.FOLDER_ID` не учитывается. Для страницы без папки метод возьмет значение из `fields.FOLDER_ID`, если этот параметр указан.

Если передана опубликованная страница, новая страница после создания опубликуется автоматически.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md).

Идентификатор папки из [landing.site.getFolders](../../site/landing-site-get-folders.md) сюда не подходит: в `fields.ID` метод ищет страницу и обычно возвращает ошибку `LANDING_ERROR`. Папку передавайте в `fields.FOLDER_ID` ||
|| **FOLDER_ID**
[`integer`](../../../data-types.md) | Идентификатор папки, в которой нужно создать страницу. Папка должна быть на сайте из `siteId`, иначе метод вернет ошибку `FOLDER_NOT_FOUND`.

Идентификатор папки можно получить методом [landing.site.getFolders](../../site/landing-site-get-folders.md).

Если страница из `fields.ID` лежит в папке, параметр не учитывается ||
|| **SITE_TYPE**
[`string`](../../../data-types.md) | Тип шаблонов, из которого создается страница. Используются типы сайтов из статьи [Работа с типами сайтов и скоупами](../../types.md).

Если не передавать, берется тип сайта. Для сайтов типов `STORE` и `SMN` по умолчанию используется значение `PAGE` ||
|| **ADD_IN_MENU**
[`string`](../../../data-types.md) | Добавить ли созданную страницу в меню сайта: `Y` — добавить, `N` — нет. По умолчанию `N`.

Страница попадет в меню, только если передан `TITLE` и она не добавляется в меню блока через `BLOCK_ID` и `MENU_CODE` ||
|| **BLOCK_ID**
[`integer`](../../../data-types.md) | Вместе с `MENU_CODE` добавляет ссылку на созданную страницу в меню блока с указанным идентификатором ||
|| **MENU_CODE**
[`string`](../../../data-types.md) | Вместе с `BLOCK_ID` указывает код меню внутри блока, куда нужно добавить ссылку на созданную страницу ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 157,
        "code": "krayt.monotovar@KraytPetShop",
        "fields": {
          "TITLE": "Весенняя акция",
          "DESCRIPTION": "SEO-описание страницы акции",
          "FOLDER_ID": 95
        }
      }' \
      "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/landing.landing.addByTemplate.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 157,
        "code": "krayt.monotovar@KraytPetShop",
        "fields": {
          "TITLE": "Весенняя акция",
          "DESCRIPTION": "SEO-описание страницы акции",
          "FOLDER_ID": 95
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put_your_bitrix24_address**/rest/landing.landing.addByTemplate.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number | null>({
        method: 'landing.landing.addByTemplate',
        params: {
          siteId: 157,
          code: 'krayt.monotovar@KraytPetShop',
          fields: {
            TITLE: 'Весенняя акция',
            DESCRIPTION: 'SEO-описание страницы акции',
            FOLDER_ID: 95,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created page ID:', result)
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
      async function addLandingByTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.landing.addByTemplate',
            params: {
              siteId: 157,
              code: 'krayt.monotovar@KraytPetShop',
              fields: {
                TITLE: 'Весенняя акция',
                DESCRIPTION: 'SEO-описание страницы акции',
                FOLDER_ID: 95,
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
          console.info('Created page ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addLandingByTemplate)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.landing.landing.add_by_template(
            site_id=157,
            code="krayt.monotovar@KraytPetShop",
            fields={
                "TITLE": "Весенняя акция",
                "DESCRIPTION": "SEO-описание страницы акции",
                "FOLDER_ID": 95,
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
                'landing.landing.addByTemplate',
                [
                    'siteId' => 157,
                    'code' => 'krayt.monotovar@KraytPetShop',
                    'fields' => [
                        'TITLE' => 'Весенняя акция',
                        'DESCRIPTION' => 'SEO-описание страницы акции',
                        'FOLDER_ID' => 95,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding landing page by template: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.addByTemplate',
        {
            siteId: 157,
            code: 'krayt.monotovar@KraytPetShop',
            fields: {
                TITLE: 'Весенняя акция',
                DESCRIPTION: 'SEO-описание страницы акции',
                FOLDER_ID: 95
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
        'landing.landing.addByTemplate',
        [
            'siteId' => 157,
            'code' => 'krayt.monotovar@KraytPetShop',
            'fields' => [
                'TITLE' => 'Весенняя акция',
                'DESCRIPTION' => 'SEO-описание страницы акции',
                'FOLDER_ID' => 95,
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
    res, err := client.Core().Call(ctx, "landing.landing.addByTemplate", b24.Params{
    	"siteId": 157,
    	"code":   "krayt.monotovar@KraytPetShop",
    	"fields": b24.Params{
    		"TITLE":       "Весенняя акция",
    		"DESCRIPTION": "SEO-описание страницы акции",
    		"FOLDER_ID":   95,
    	},
    })
    if err != nil {
    	return fmt.Errorf("landing.landing.addByTemplate: %w", err)
    }

    var value b24.ID
    if err := json.Unmarshal(res.Result, &value); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("результат:", value)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 2229,
    "time": {
        "start": 1773700566,
        "finish": 1773700567.67178,
        "duration": 1.6717801094055176,
        "processing": 1,
        "date_start": "2026-03-17T01:36:06+03:00",
        "date_finish": "2026-03-17T01:36:07+03:00",
        "operating_reset_at": 1773701166,
        "operating": 1.4516642093658447
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) \| `null` | Идентификатор созданной страницы. Если шаблона с кодом из `code` нет, метод вернет `null` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "Сайт не найден, или доступ к нему запрещен",
    "error_description": "SITE_ERROR"
}
```

У ошибок из таблицы код приходит в `error_description`, а текст — в `error`, как в примере выше. Исключение — `MISSING_PARAMS`: ее код приходит в `error`, как у системных ошибок, например `TYPE_ERROR`, и у других методов.

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не переданы обязательные параметры вызова: в запросе отсутствует `siteId`, `code` или оба параметра ||
|| `SITE_ERROR` | Сайт не найден, или доступ к нему запрещен: не передан нужный `scope`, в `siteId` передан несуществующий сайт или у пользователя нет доступа к нему ||
|| `LANDING_ERROR` | Страница не найдена: в `fields.ID` передан идентификатор, под которым на сайте из `siteId` нет страницы. Так бывает, если передать идентификатор папки из [landing.site.getFolders](../../site/landing-site-get-folders.md) ||
|| `ACCESS_DENIED` | Доступ на создание страницы запрещен: у пользователя нет права «редактирование» для указанного сайта ||
|| `FOLDER_NOT_FOUND` | Папка не найдена: в `fields.FOLDER_ID` передана папка, которая не относится к указанному сайту или не существует ||
|| `WRONG_DATA` | Некорректные данные шаблона: для переданного `code` не удалось получить данные шаблона страницы ||
|| `SLASH_IS_NOT_ALLOWED` | Слеш запрещен в адресе лендинга: шаблон содержит недопустимый адрес создаваемой страницы ||
|| `CANT_BE_EMPTY` | Адрес страницы не может быть пустым: шаблон содержит пустой адрес создаваемой страницы ||
|| `WRONG_CODE_FORMAT` | Недопустимый адрес страницы: шаблон содержит адрес в формате `<символы>_<число>_<число>`, например `code_12_34` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [landing.demos.getPageList](../../demos/landing-demos-get-page-list.md)
- [landing.site.getList](../../site/landing-site-get-list.md)
- [landing.site.getFolders](../../site/landing-site-get-folders.md)
- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-additional-fields.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-update.md)
