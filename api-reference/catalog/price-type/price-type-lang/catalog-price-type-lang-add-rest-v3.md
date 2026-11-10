# Добавить перевод названия типа цены v 3.0 catalog.pricetype.lang.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Управление типами цен»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.pricetype.lang.add` добавляет перевод названия типа цены и возвращает его поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями нового перевода. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId***
[`integer`](../../../data-types.md) | Идентификатор типа цены.

Идентификатор можно получить методом [catalog.pricetype.list](../catalog-price-type-list-rest-v3.md) ||
|| **lang***
[`string`](../../../data-types.md) | Код языка, например `en` или `de`.

Коды языков возвращает метод [catalog.pricetype.lang.getlanguages](./catalog-price-type-lang-get-languages-rest-v3.md). Метод принимает и коды неактивных языков.

Для одного типа цены можно добавить только один перевод на каждый язык. Чтобы изменить перевод, используйте [catalog.pricetype.lang.update](./catalog-price-type-lang-update-rest-v3.md) ||
|| **name***
[`string`](../../../data-types.md) | Название типа цены на выбранном языке. Пустая строка допустима ||
|#

Поле `id` заполняется автоматически, если передать его в `fields`, метод вернет ошибку.

{% note warning "" %}

Если у типа цены уже есть перевод на этот язык, метод возвращает HTTP-статус **500** с ошибкой `INTERNAL_SERVER_ERROR`. Проверьте существующие переводы методом [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md) прежней версии API.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.pricetype.lang.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":21,"lang":"en","name":"Wholesale price"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.pricetype.lang.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"catalogGroupId":21,"lang":"en","name":"Wholesale price"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.pricetype.lang.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceTypeLangAddResult = {
      item: {
        id: number
        catalogGroupId: number
        lang: string
        name: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceTypeLangAddResult>({
        method: 'catalog.pricetype.lang.add',
        params: {
          fields: {
            catalogGroupId: 21,
            lang: 'en',
            name: 'Wholesale price',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Translation created:', result.item.id)
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
      async function addPriceTypeLang() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.pricetype.lang.add',
            params: {
              fields: {
                catalogGroupId: 21,
                lang: 'en',
                name: 'Wholesale price',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Translation created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPriceTypeLang)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.pricetype.lang.add(
            fields={
                "catalogGroupId": 21,
                "lang": "en",
                "name": "Wholesale price",
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
                'catalog.pricetype.lang.add',
                [
                    'fields' => [
                        'catalogGroupId' => 21,
                        'lang' => 'en',
                        'name' => 'Wholesale price',
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
        'catalog.pricetype.lang.add',
        {
            fields: {
                catalogGroupId: 21,
                lang: 'en',
                name: 'Wholesale price',
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
        'catalog.pricetype.lang.add',
        [
            'fields' => [
                'catalogGroupId' => 21,
                'lang' => 'en',
                'name' => 'Wholesale price',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.pricetype.lang.add", b24.Params{
    	"fields": b24.Params{
    		"catalogGroupId": 21,
    		"lang":           "en",
    		"name":           "Wholesale price",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.pricetype.lang.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID             int    `json:"id"`
    	CatalogGroupID int    `json:"catalogGroupId"`
    	Lang           string `json:"lang"`
    	Name           string `json:"name"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Lang, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 309,
            "catalogGroupId": 21,
            "lang": "en",
            "name": "Wholesale price"
        }
    },
    "time": {
        "start": 1792668051,
        "finish": 1792668051.073813,
        "duration": 0.07381296157836914,
        "processing": 0,
        "date_start": "2026-10-22T14:20:51+03:00",
        "date_finish": "2026-10-22T14:20:51+03:00",
        "operating_reset_at": 1792668600,
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
|| **result.item**
[`object`](../../../data-types.md) | Поля созданного перевода. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор перевода. Нужен для изменения и удаления перевода ||
|| **catalogGroupId**
[`integer`](../../../data-types.md) | Идентификатор типа цены ||
|| **lang**
[`string`](../../../data-types.md) | Код языка ||
|| **name**
[`string`](../../../data-types.md) | Название типа цены на этом языке ||
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
                "message": "The specified price type does not exist",
                "field": "201000000000"
            },
            {
                "message": "The specified language does not exist",
                "field": "201200000010"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

В ошибках проверки типа цены и языка поле `field` содержит не имя параметра, а числовой код ошибки.

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `201000000000` | The specified price type does not exist | Проверьте идентификатор типа цены методом [catalog.pricetype.list](../catalog-price-type-list-rest-v3.md) ||
|| `201200000010` | The specified language does not exist | Передайте код языка из ответа метода [catalog.pricetype.lang.getlanguages](./catalog-price-type-lang-get-languages-rest-v3.md) ||
|| `name` | В поле `name` требуется тип данных `string` для такого запроса | Передайте строку ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `catalogGroupId` | Не заполнено обязательное поле "catalogGroupId" | Передайте `catalogGroupId` в `fields` ||
|| `lang` | Не заполнено обязательное поле "lang" | Передайте `lang` в `fields` ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `PriceTypeLangDto` | Передайте в `fields` только `catalogGroupId`, `lang`, `name` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Управление типами цен» ||
|#

#### Внутренняя ошибка

Код ошибки: `INTERNAL_SERVER_ERROR`

HTTP-статус: **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Internal server error | У типа цены уже есть перевод на этот язык. Измените существующий перевод методом [catalog.pricetype.lang.update](./catalog-price-type-lang-update-rest-v3.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-lang-update-rest-v3.md)
- [{#T}](./catalog-price-type-lang-delete-rest-v3.md)
- [{#T}](./catalog-price-type-lang-get-languages-rest-v3.md)
- [{#T}](./catalog-price-type-lang-field-list.md)
