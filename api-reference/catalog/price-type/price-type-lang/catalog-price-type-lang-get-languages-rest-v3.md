# Получить доступные для перевода языки v 3.0 catalog.pricetype.lang.getlanguages

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров» или «Управление типами цен»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.pricetype.lang.getlanguages` возвращает список языков, на которые можно перевести название типа цены.

{% note warning "" %}

Имя метода в REST 3.0 пишется только в нижнем регистре. Вызов `catalog.pricetype.lang.getLanguages` по адресу `/rest/api/` вернет ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`.

{% endnote %}

## Параметры метода

Без параметров.

Метод всегда возвращает все языки Битрикс24, параметр `filter` не учитывается.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/catalog.pricetype.lang.getlanguages`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.pricetype.lang.getlanguages
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.pricetype.lang.getlanguages
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceTypeLangGetLanguagesResult = {
      languages: Array<{
        ACTIVE: 'Y' | 'N'
        NAME: string
        LID: string
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceTypeLangGetLanguagesResult>({
        method: 'catalog.pricetype.lang.getlanguages',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        const active = result.languages.filter(language => language.ACTIVE === 'Y')
        console.info('Active languages:', active.map(language => language.LID))
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
      async function getLanguages() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.pricetype.lang.getlanguages',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          const active = result.languages.filter(language => language.ACTIVE === 'Y')
          console.info('Active languages:', active.map(language => language.LID))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getLanguages)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.pricetype.lang.getlanguages().response
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
                'catalog.pricetype.lang.getlanguages',
                []
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
        'catalog.pricetype.lang.getlanguages',
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
        'catalog.pricetype.lang.getlanguages',
        []
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.pricetype.lang.getlanguages", b24.Params{}, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.pricetype.lang.getlanguages: %w", err)
    }

    var result struct {
    	Languages []struct {
    		Active string `json:"ACTIVE"`
    		Name   string `json:"NAME"`
    		LID    string `json:"LID"`
    	} `json:"languages"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, language := range result.Languages {
    	fmt.Println(language.LID, language.Name, language.Active)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "languages": [
            {
                "ACTIVE": "Y",
                "NAME": "Deutsch",
                "LID": "de"
            },
            {
                "ACTIVE": "Y",
                "NAME": "English",
                "LID": "en"
            },
            {
                "ACTIVE": "Y",
                "NAME": "Français",
                "LID": "fr"
            },
            {
                "ACTIVE": "N",
                "NAME": "हिन्दी",
                "LID": "hi"
            },
            {
                "ACTIVE": "Y",
                "NAME": "Русский",
                "LID": "ru"
            },
            {
                "ACTIVE": "Y",
                "NAME": "Українська",
                "LID": "ua"
            }
        ]
    },
    "time": {
        "start": 1792668096,
        "finish": 1792668096.518782,
        "duration": 0.5187819004058838,
        "processing": 0,
        "date_start": "2026-10-22T14:21:36+03:00",
        "date_finish": "2026-10-22T14:21:36+03:00",
        "operating_reset_at": 1792668660,
        "operating": 0
    }
}
```

В примере показана часть списка. Метод возвращает все языки Битрикс24, отсортированные по коду языка.

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.languages**
[`array`](../../../data-types.md) | Массив языков. [Описание элемента](#languages) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент languages {#languages}

Ключи элемента приходят в верхнем регистре.

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Активность языка: `Y` — активен, `N` — неактивен. Перевод можно добавить и на неактивный язык ||
|| **NAME**
[`string`](../../../data-types.md) | Название языка ||
|| **LID**
[`string`](../../../data-types.md) | Код языка. Передается в поле `lang` методов [catalog.pricetype.lang.add](./catalog-price-type-lang-add-rest-v3.md) и [catalog.pricetype.lang.update](./catalog-price-type-lang-update-rest-v3.md) ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION",
        "message": "Метод `catalog.pricetype.lang.getLanguages` не найден"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибка имени метода

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`

HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `catalog.pricetype.lang.getLanguages` не найден | Вызовите метод в нижнем регистре: `catalog.pricetype.lang.getlanguages` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Просмотр каталога товаров» или «Управление типами цен» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-lang-add-rest-v3.md)
- [{#T}](./catalog-price-type-lang-update-rest-v3.md)
- [{#T}](./catalog-price-type-lang-delete-rest-v3.md)
