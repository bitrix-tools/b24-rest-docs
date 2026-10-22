# Создать тип цены v 3.0 catalog.pricetype.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Управление типами цен»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.pricetype.add` создает тип цены и возвращает его поля.

{% note warning "" %}

В REST 3.0 имя метода пишется в нижнем регистре: `catalog.pricetype.add`. Вызов `catalog.priceType.add` по адресу `/rest/api/` возвращает ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового типа цены. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название типа цены. Пустая строка и `null` вызывают ошибку валидации. Названия типов цен могут повторяться ||
|| **base**
[`boolean`](../../data-types.md) | Признак базового типа цены.

Возможные значения:

- `true` — тип цены станет базовым. Признак у прежнего базового типа снимается автоматически
- `false` — обычный тип цены

Строки `Y` и `N` не принимаются, `null` вызывает ошибку валидации.

По умолчанию: `false` ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка. Ноль и отрицательное значение заменяются на `100`, `null` вызывает ошибку валидации.

По умолчанию: `100` ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код типа цены. Можно использовать для синхронизации с внешней системой ||
|#

Поля `id`, `timestampX`, `modifiedBy`, `dateCreate` и `createdBy` заполняются автоматически. Если передать их в `fields`, метод вернет ошибку.

Новый тип цены доступен для просмотра и покупки только группе администраторов. Чтобы открыть его другим группам пользователей, используйте методы [catalog.pricetype.group.*](./price-type-group/index.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.pricetype.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Оптовая цена","sort":200,"xmlId":"wholesale-opt"}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.pricetype.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Оптовая цена","sort":200,"xmlId":"wholesale-opt"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.pricetype.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceTypeAddResult = {
      item: {
        id: number
        name: string
        base: boolean
        sort: number
        xmlId: string
        timestampX: ISODate
        modifiedBy: number
        dateCreate: ISODate
        createdBy: number
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<PriceTypeAddResult>({
        method: 'catalog.pricetype.add',
        params: {
          fields: {
            name: 'Оптовая цена',
            sort: 200,
            xmlId: 'wholesale-opt',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Price type created:', result.item.id)
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
      async function addPriceType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.pricetype.add',
            params: {
              fields: {
                name: 'Оптовая цена',
                sort: 200,
                xmlId: 'wholesale-opt',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Price type created:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPriceType)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.pricetype.add(
            fields={
                "name": "Оптовая цена",
                "sort": 200,
                "xmlId": "wholesale-opt",
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
                'catalog.pricetype.add',
                [
                    'fields' => [
                        'name' => 'Оптовая цена',
                        'sort' => 200,
                        'xmlId' => 'wholesale-opt',
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
        'catalog.pricetype.add',
        {
            fields: {
                name: 'Оптовая цена',
                sort: 200,
                xmlId: 'wholesale-opt',
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
        'catalog.pricetype.add',
        [
            'fields' => [
                'name' => 'Оптовая цена',
                'sort' => 200,
                'xmlId' => 'wholesale-opt',
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
    res, err := client.Core().Call(ctx, "catalog.pricetype.add", b24.Params{
    	"fields": b24.Params{
    		"name":  "Оптовая цена",
    		"sort":  200,
    		"xmlId": "wholesale-opt",
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.pricetype.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID   int    `json:"id"`
    	Name string `json:"name"`
    	Base bool   `json:"base"`
    	Sort int    `json:"sort"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 31,
            "name": "Оптовая цена",
            "base": false,
            "sort": 200,
            "xmlId": "wholesale-opt",
            "timestampX": "2026-10-22T14:23:07+03:00",
            "modifiedBy": 1,
            "dateCreate": "2026-10-22T14:23:07+03:00",
            "createdBy": 1
        }
    },
    "time": {
        "start": 1792668187,
        "finish": 1792668187.97024,
        "duration": 0.9702401161193848,
        "processing": 0,
        "date_start": "2026-10-22T14:23:07+03:00",
        "date_finish": "2026-10-22T14:23:07+03:00",
        "operating_reset_at": 1792668780,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../data-types.md) | Поля созданного типа цены. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор типа цены ||
|| **name**
[`string`](../../data-types.md) | Название типа цены ||
|| **base**
[`boolean`](../../data-types.md) | Признак базового типа цены: `true` — базовый, `false` — обычный ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код типа цены. Пустая строка, если код не задан ||
|| **timestampX**
[`datetime`](../../data-types.md) | Дата и время последнего изменения ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил тип цены ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал тип цены ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Не заполнено обязательное поле \"name\"",
                "field": "name"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `name` | Не заполнено обязательное поле "name" | Передайте `name` в `fields` ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля только для чтения: `id`, `timestampX`, `modifiedBy`, `dateCreate`, `createdBy` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `name` | The field name must not be null | Передайте в `name` непустую строку ||
|| `-` | Не указан код типа цен`<br>` | Передайте в `name` непустую строку ||
|| `base` | В поле `base` требуется тип данных `bool` для такого запроса | Передайте `true` или `false`, а не `Y` или `N` ||
|| `base` | The field base must be true or false | Не передавайте `null` в `base` ||
|| `sort` | The field sort must be an integer | Не передавайте `null` в `sort` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `PriceTypeDto` | Передайте в `fields` только `name`, `base`, `sort`, `xmlId` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Управление типами цен» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-price-type-update-rest-v3.md)
- [{#T}](./catalog-price-type-get-rest-v3.md)
- [{#T}](./catalog-price-type-list-rest-v3.md)
- [{#T}](./catalog-price-type-delete-rest-v3.md)
- [{#T}](./catalog-price-type-field-list.md)
