# Изменить перевод названия типа цены v 3.0 catalog.pricetype.lang.update

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

Метод `catalog.pricetype.lang.update` изменяет перевод названия типа цены и возвращает его поля.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор перевода.

Идентификатор возвращает метод [catalog.pricetype.lang.add](./catalog-price-type-lang-add-rest-v3.md). В REST 3.0 нет метода получения списка переводов, идентификаторы существующих переводов возвращает метод [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md) прежней версии API ||
|| **fields***
[`object`](../../../data-types.md) | Объект с полями перевода, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields)

Пустой объект `{}` не меняет перевод: метод вернет его текущие поля ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId**
[`integer`](../../../data-types.md) | Идентификатор типа цены. Перевод можно перенести к другому типу цены.

Идентификатор можно получить методом [catalog.pricetype.list](../catalog-price-type-list-rest-v3.md) ||
|| **lang**
[`string`](../../../data-types.md) | Код языка, например `fr`.

Коды языков возвращает метод [catalog.pricetype.lang.getlanguages](./catalog-price-type-lang-get-languages-rest-v3.md) ||
|| **name**
[`string`](../../../data-types.md) | Название типа цены на выбранном языке ||
|#

{% note warning "" %}

Если после изменения у типа цены окажется два перевода на один язык, метод возвращает HTTP-статус **500** с ошибкой `INTERNAL_SERVER_ERROR`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.pricetype.lang.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":313,"fields":{"lang":"fr","name":"Prix de gros"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.pricetype.lang.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":313,"fields":{"lang":"fr","name":"Prix de gros"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.pricetype.lang.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceTypeLangUpdateResult = {
      item: {
        id: number
        catalogGroupId: number
        lang: string
        name: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceTypeLangUpdateResult>({
        method: 'catalog.pricetype.lang.update',
        params: {
          id: 313,
          fields: {
            lang: 'fr',
            name: 'Prix de gros',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Translation updated:', result.item.lang, result.item.name)
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
      async function updatePriceTypeLang() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.pricetype.lang.update',
            params: {
              id: 313,
              fields: {
                lang: 'fr',
                name: 'Prix de gros',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Translation updated:', result.item.lang, result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updatePriceTypeLang)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.pricetype.lang.update(
            bitrix_id=313,
            fields={
                "lang": "fr",
                "name": "Prix de gros",
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
                'catalog.pricetype.lang.update',
                [
                    'id' => 313,
                    'fields' => [
                        'lang' => 'fr',
                        'name' => 'Prix de gros',
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
        'catalog.pricetype.lang.update',
        {
            id: 313,
            fields: {
                lang: 'fr',
                name: 'Prix de gros',
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
        'catalog.pricetype.lang.update',
        [
            'id' => 313,
            'fields' => [
                'lang' => 'fr',
                'name' => 'Prix de gros',
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
    res, err := client.Core().Call(ctx, "catalog.pricetype.lang.update", b24.Params{
    	"id": 313,
    	"fields": b24.Params{
    		"lang": "fr",
    		"name": "Prix de gros",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.pricetype.lang.update: %w", err)
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
            "id": 313,
            "catalogGroupId": 21,
            "lang": "fr",
            "name": "Prix de gros"
        }
    },
    "time": {
        "start": 1792668069,
        "finish": 1792668069.515849,
        "duration": 0.5158491134643555,
        "processing": 0,
        "date_start": "2026-10-22T14:21:09+03:00",
        "date_finish": "2026-10-22T14:21:09+03:00",
        "operating_reset_at": 1792668660,
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
[`object`](../../../data-types.md) | Поля перевода после изменения. [Описание полей](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор перевода ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
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
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` перевода. Вместе с этим сообщением приходит второе: «Должно быть передано только одно из значений: id, filter» ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `name` | В поле `name` требуется тип данных `string` для такого запроса | Передайте строку ||
|| `201000000000` | The specified price type does not exist | Проверьте идентификатор типа цены методом [catalog.pricetype.list](../catalog-price-type-list-rest-v3.md) ||
|| `201200000010` | The specified language does not exist | Передайте код языка из ответа метода [catalog.pricetype.lang.getlanguages](./catalog-price-type-lang-get-languages-rest-v3.md) ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не поддерживает `filter`. Передайте `id` перевода ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Перевода с таким идентификатором нет. Проверьте идентификатор методом [catalog.priceTypeLang.list](./catalog-price-type-lang-list.md) ||
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
|| `-` | Internal server error | У типа цены уже есть перевод на язык из `lang`. Измените или удалите тот перевод ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-lang-add-rest-v3.md)
- [{#T}](./catalog-price-type-lang-delete-rest-v3.md)
- [{#T}](./catalog-price-type-lang-get-languages-rest-v3.md)
- [{#T}](./catalog-price-type-lang-field-list.md)
