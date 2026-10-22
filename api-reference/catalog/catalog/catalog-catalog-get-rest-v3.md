# Получить значения всех полей торгового каталога v 3.0 catalog.catalog.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.catalog.get` возвращает значения полей торгового каталога по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор торгового каталога. Совпадает с идентификатором инфоблока каталога.

Идентификатор можно получить методом [catalog.catalog.list](./catalog-catalog-list-rest-v3.md) ||
|| **select**
[`array`](../../data-types.md) | Список полей торгового каталога, которые нужно вернуть в ответе, например `["id","name","productIblockId"]`.

Доступные поля:

- `id` — идентификатор торгового каталога
- `iblockId` — идентификатор инфоблока каталога
- `yandexExport` — признак выгрузки в Яндекс Маркет
- `subscription` — признак продажи контента
- `vatId` — идентификатор ставки НДС
- `productIblockId` — идентификатор инфоблока товаров для каталога вариаций
- `skuPropertyId` — идентификатор свойства привязки вариации к товару
- `iblockTypeId` — тип инфоблока
- `lid` — идентификатор сайта
- `name` — название каталога

Поле `id` возвращается, только если указано в `select`. Значение `["*"]` не поддерживается.

По умолчанию: все поля. Пустой массив `[]` также возвращает все поля ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.catalog.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.catalog.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":27,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.catalog.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CatalogGetResult = {
      item: {
        id: number
        iblockId: number
        yandexExport: 'Y' | 'N'
        subscription: 'Y' | 'N'
        vatId: number
        productIblockId: number
        skuPropertyId: number
        iblockTypeId: string
        lid: string
        name: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<CatalogGetResult>({
        method: 'catalog.catalog.get',
        params: {
          id: 27,
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Catalog:', result.item.id, result.item.name)
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
      async function getCatalog() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.catalog.get',
            params: {
              id: 27,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Catalog:', result.item.id, result.item.name)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCatalog)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.catalog.get(
            bitrix_id=27,
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
                'catalog.catalog.get',
                [
                    'id' => 27,
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
        'catalog.catalog.get',
        {
            id: 27,
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
        'catalog.catalog.get',
        [
            'id' => 27,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.catalog.get", b24.Params{
    	"id": 27,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.catalog.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID              int    `json:"id"`
    	Name            string `json:"name"`
    	ProductIblockID int    `json:"productIblockId"`
    	SkuPropertyID   int    `json:"skuPropertyId"`
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
            "id": 27,
            "iblockId": 27,
            "yandexExport": "N",
            "subscription": "N",
            "vatId": 1,
            "productIblockId": 25,
            "skuPropertyId": 101,
            "iblockTypeId": "CRM_PRODUCT_CATALOG",
            "lid": "s1",
            "name": "Товарный каталог CRM (предложения)"
        }
    },
    "time": {
        "start": 1792665469,
        "finish": 1792665469.596805,
        "duration": 0.5968050956726074,
        "processing": 0,
        "date_start": "2026-10-22T13:37:49+03:00",
        "date_finish": "2026-10-22T13:37:49+03:00",
        "operating_reset_at": 1792666020,
        "operating": 0
    }
}
```

### Возвращаемые данные {#returned-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../data-types.md) | Объект с полями торгового каталога. Состав полей зависит от `select` ||
|| **result.item.id**
[`integer`](../../data-types.md) | Идентификатор торгового каталога. Совпадает с `iblockId` ||
|| **result.item.iblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока, который зарегистрирован как торговый каталог ||
|| **result.item.yandexExport**
[`string`](../../data-types.md) | Признак выгрузки товаров каталога в Яндекс Маркет: `Y` — да, `N` — нет ||
|| **result.item.subscription**
[`string`](../../data-types.md) | Признак продажи контента: `Y` — да, `N` — нет. Используется только в коробочной версии ||
|| **result.item.vatId**
[`integer`](../../data-types.md) | Идентификатор ставки НДС каталога. `0` — ставка не задана ||
|| **result.item.productIblockId**
[`integer`](../../data-types.md) | Идентификатор инфоблока товаров, к которому привязан каталог вариаций. `0` — каталог не является каталогом вариаций ||
|| **result.item.skuPropertyId**
[`integer`](../../data-types.md) | Идентификатор свойства, в котором вариация хранит идентификатор головного товара. `0` — каталог не является каталогом вариаций ||
|| **result.item.iblockTypeId**
[`string`](../../data-types.md) | Тип инфоблока. Для торговых каталогов CRM — `CRM_PRODUCT_CATALOG`, для каталога на основе универсального списка — `lists` ||
|| **result.item.lid**
[`string`](../../data-types.md) | Идентификатор сайта, к которому привязан инфоблок, например `s1` ||
|| **result.item.name**
[`string`](../../data-types.md) | Название инфоблока торгового каталога ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `99999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте в `id` положительное число. Ошибка возникает и при `id`, равном `0`, и при нечисловом значении ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Торгового каталога с таким идентификатором нет. Проверьте идентификатор методом [catalog.catalog.list](./catalog-catalog-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `CatalogDto` | Укажите в `select` только поля из описания параметра `select` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Нет прав на просмотр настроек торгового каталога. Вызовите метод от имени администратора ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-catalog-add.md)
- [{#T}](./catalog-catalog-update.md)
- [{#T}](./catalog-catalog-list-rest-v3.md)
- [{#T}](./catalog-catalog-is-offers-rest-v3.md)
- [{#T}](./catalog-catalog-field-list.md)
