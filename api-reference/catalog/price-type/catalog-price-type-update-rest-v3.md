# Обновить тип цены v 3.0 catalog.pricetype.update

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

Метод `catalog.pricetype.update` изменяет поля типа цены и возвращает его поля после изменения.

{% note warning "" %}

В REST 3.0 имя метода пишется в нижнем регистре: `catalog.pricetype.update`. Вызов `catalog.priceType.update` по адресу `/rest/api/` возвращает ошибку `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор типа цены.

Идентификатор можно получить методом [catalog.pricetype.list](./catalog-price-type-list-rest-v3.md) или при создании типа цены методом [catalog.pricetype.add](./catalog-price-type-add-rest-v3.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями типа цены, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields)

Пустой объект `{}` вызывает ошибку валидации ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../data-types.md) | Название типа цены. Пустая строка и `null` вызывают ошибку валидации ||
|| **base**
[`boolean`](../../data-types.md) | Признак базового типа цены.

Возможные значения:

- `true` — тип цены станет базовым. Признак у прежнего базового типа снимается автоматически
- `false` — снять признак базового типа

Строки `Y` и `N` не принимаются, `null` вызывает ошибку валидации ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка. Ноль и отрицательное значение заменяются на `100`, `null` вызывает ошибку валидации ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код типа цены ||
|#

Поля `id`, `timestampX`, `modifiedBy`, `dateCreate` и `createdBy` изменить нельзя. Если передать их в `fields`, метод вернет ошибку.

{% note warning "" %}

Если передать `base: false` для базового типа цены, признак снимется, а другой тип базовым не станет. В Битрикс24 не останется базового типа цены. Чтобы сменить базовый тип, передайте `base: true` для нового типа.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.pricetype.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":31,"fields":{"name":"Оптовая цена для партнеров","sort":150}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.pricetype.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":31,"fields":{"name":"Оптовая цена для партнеров","sort":150},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.pricetype.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type PriceTypeUpdateResult = {
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
      const response = await $b24.actions.v3.call.make<PriceTypeUpdateResult>({
        method: 'catalog.pricetype.update',
        params: {
          id: 31,
          fields: {
            name: 'Оптовая цена для партнеров',
            sort: 150,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Price type updated:', result.item.id, result.item.name)
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
      async function updatePriceType() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.pricetype.update',
            params: {
              id: 31,
              fields: {
                name: 'Оптовая цена для партнеров',
                sort: 150,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Price type updated:', result.item.id, result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updatePriceType)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.pricetype.update(
            bitrix_id=31,
            fields={
                "name": "Оптовая цена для партнеров",
                "sort": 150,
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
                'catalog.pricetype.update',
                [
                    'id' => 31,
                    'fields' => [
                        'name' => 'Оптовая цена для партнеров',
                        'sort' => 150,
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
        'catalog.pricetype.update',
        {
            id: 31,
            fields: {
                name: 'Оптовая цена для партнеров',
                sort: 150,
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
        'catalog.pricetype.update',
        [
            'id' => 31,
            'fields' => [
                'name' => 'Оптовая цена для партнеров',
                'sort' => 150,
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
    res, err := client.Core().Call(ctx, "catalog.pricetype.update", b24.Params{
    	"id": 31,
    	"fields": b24.Params{
    		"name": "Оптовая цена для партнеров",
    		"sort": 150,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.pricetype.update: %w", err)
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
            "name": "Оптовая цена для партнеров",
            "base": false,
            "sort": 150,
            "xmlId": "wholesale-opt",
            "timestampX": "2026-10-22T14:23:13+03:00",
            "modifiedBy": 1,
            "dateCreate": "2026-10-22T14:23:07+03:00",
            "createdBy": 1
        }
    },
    "time": {
        "start": 1792668193,
        "finish": 1792668193.714955,
        "duration": 0.7149550914764404,
        "processing": 0,
        "date_start": "2026-10-22T14:23:13+03:00",
        "date_finish": "2026-10-22T14:23:13+03:00",
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
[`object`](../../data-types.md) | Поля типа цены после изменения. [Описание полей](#item) ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте в `id` положительное число. Вместе с этим сообщением приходит второе: «Должно быть передано только одно из значений: id, filter» ||
|| `fields` | At least one field to update must be provided | Передайте в `fields` хотя бы одно поле ||
|| `name` | The field name must not be null | Передайте в `name` непустую строку ||
|| `-` | Не указан код типа цен`<br>` | Передайте в `name` непустую строку ||
|| `base` | В поле `base` требуется тип данных `bool` для такого запроса | Передайте `true` или `false`, а не `Y` или `N` ||
|| `base` | The field base must be true or false | Не передавайте `null` в `base` ||
|| `sort` | The field sort must be an integer | Не передавайте `null` в `sort` ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля только для чтения: `id`, `timestampX`, `modifiedBy`, `dateCreate`, `createdBy` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не поддерживает `filter`. Передайте `id` типа цены ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор методом [catalog.pricetype.list](./catalog-price-type-list-rest-v3.md) ||
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

- [{#T}](./catalog-price-type-add-rest-v3.md)
- [{#T}](./catalog-price-type-get-rest-v3.md)
- [{#T}](./catalog-price-type-list-rest-v3.md)
- [{#T}](./catalog-price-type-delete-rest-v3.md)
- [{#T}](./catalog-price-type-field-list.md)
