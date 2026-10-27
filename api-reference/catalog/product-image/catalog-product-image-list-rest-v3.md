# Получить список изображений товара v 3.0 catalog.product.image.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.image.list` возвращает изображения одного товара или вариации.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter***
[`array`](../../data-types.md) | Фильтр в формате REST 3.0: массив условий вида `["поле", "оператор", "значение"]`. Синтаксис фильтра описан в [обзоре REST 3.0](../../rest-v3.md#filter).

Фильтр должен содержать условие по `productId` с оператором `=`, например `[["productId","=",7537]]`. Другие поля и операторы метод не поддерживает.

Идентификатор товара можно получить методом [catalog.product.list](../product/catalog-product-list-rest-v3.md), вариации — методом [catalog.product.offer.list](../product/offer/catalog-product-offer-list-rest-v3.md) ||
|| **select**
[`array`](../../data-types.md) | Список полей изображения, которые нужно вернуть в ответе.

Доступные поля:

- `id` — идентификатор изображения
- `productId` — идентификатор товара или вариации
- `type` — тип изображения
- `name` — имя файла
- `createTime` — дата и время загрузки файла
- `detailUrl` — ссылка для просмотра
- `downloadUrl` — ссылка для скачивания

По умолчанию: все поля. Пустой массив `[]` также возвращает все поля ||
|| **pagination**
[`object`](../../data-types.md) | Постраничная навигация. [Описание объекта](#pagination) ||
|#

Сортировка `order` не поддерживается. Изображения возвращаются в порядке: картинка для анонса, детальная картинка, дополнительные картинки.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../data-types.md) | Количество изображений на странице. Значение `0` вызывает ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../data-types.md) | Номер страницы, начиная с `1` ||
|| **offset**
[`integer`](../../data-types.md) | Количество изображений, которые нужно пропустить ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.image.list`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["productId","=",7537]]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.image.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":[["productId","=",7537]],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.image.list
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductImageListResult = {
      items: Array<{
        id: number
        productId: number
        type: 'PREVIEW_PICTURE' | 'DETAIL_PICTURE' | 'MORE_PHOTO'
        name: string
        createTime: ISODate
        detailUrl: string
        downloadUrl: string
      }>
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductImageListResult>({
        method: 'catalog.product.image.list',
        params: {
          filter: [
            ['productId', '=', 7537],
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        result.items.forEach(image => console.info(image.id, image.type, image.detailUrl))
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
      async function listProductImages() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.image.list',
            params: {
              filter: [
                ['productId', '=', 7537],
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          result.items.forEach(image => console.info(image.id, image.type, image.detailUrl))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listProductImages)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.image.list(
            filter=[
                ["productId", "=", 7537],
            ],
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
                'catalog.product.image.list',
                [
                    'filter' => [
                        ['productId', '=', 7537],
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
        'catalog.product.image.list',
        {
            filter: [
                ['productId', '=', 7537],
            ],
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
        'catalog.product.image.list',
        [
            'filter' => [
                ['productId', '=', 7537],
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
    res, err := client.Core().Call(ctx, "catalog.product.image.list", b24.Params{
    	"filter": []any{
    		[]any{"productId", "=", 7537},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.image.list: %w", err)
    }

    var result struct {
    	Items []struct {
    		ID        int    `json:"id"`
    		Type      string `json:"type"`
    		Name      string `json:"name"`
    		DetailURL string `json:"detailUrl"`
    	} `json:"items"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, image := range result.Items {
    	fmt.Println(image.ID, image.Type, image.DetailURL)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": 39443,
                "productId": 7537,
                "type": "PREVIEW_PICTURE",
                "name": "preview.png",
                "createTime": "2026-10-22T12:14:32+03:00",
                "detailUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png",
                "downloadUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png"
            },
            {
                "id": 39447,
                "productId": 7537,
                "type": "DETAIL_PICTURE",
                "name": "red2.png",
                "createTime": "2026-10-22T12:14:34+03:00",
                "detailUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png",
                "downloadUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png"
            },
            {
                "id": 39439,
                "productId": 7537,
                "type": "MORE_PHOTO",
                "name": "more.png",
                "createTime": "2026-10-22T12:14:20+03:00",
                "detailUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png",
                "downloadUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png"
            },
            {
                "id": 39451,
                "productId": 7537,
                "type": "MORE_PHOTO",
                "name": "photo.png",
                "createTime": "2026-10-22T12:15:59+03:00",
                "detailUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png",
                "downloadUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png"
            }
        ]
    },
    "time": {
        "start": 1792660562,
        "finish": 1792660562.218583,
        "duration": 0.2185831069946289,
        "processing": 0,
        "date_start": "2026-10-22T12:16:02+03:00",
        "date_finish": "2026-10-22T12:16:02+03:00",
        "operating_reset_at": 1792661160,
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
|| **result.items**
[`array`](../../data-types.md) | Массив изображений. Состав полей зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент items {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор изображения. Совпадает с идентификатором файла в Битрикс24 ||
|| **productId**
[`integer`](../../data-types.md) | Идентификатор товара или вариации ||
|| **type**
[`string`](../../data-types.md) | Тип изображения: `PREVIEW_PICTURE` — картинка для анонса, `DETAIL_PICTURE` — детальная картинка, `MORE_PHOTO` — дополнительная картинка ||
|| **name**
[`string`](../../data-types.md) | Имя файла ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время загрузки файла ||
|| **detailUrl**
[`string`](../../data-types.md) | Ссылка для просмотра изображения ||
|| **downloadUrl**
[`string`](../../data-types.md) | Ссылка для скачивания изображения ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации фильтров объекта запроса",
        "validation": [
            {
                "message": "Требуется указать фильтр по обязательному полю `productId`",
                "field": "filter.productId"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTFILTERVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter.productId` | Требуется указать фильтр по обязательному полю `productId` | Передайте в `filter` условие `["productId","=",<идентификатор>]` с оператором `=` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Значение поля не может быть пустым | Передайте `filter` с условием по `productId` ||
|| `#FIELD#` | В DTO `ProductImageDto` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Фильтруйте только по `productId` ||
|| `id` | В DTO `ProductImageDto` в поле `id` требуется наличие атрибута `Sortable` для такого запроса | Уберите `order` из запроса: сортировка не поддерживается ||
|#

#### Ошибка пагинации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `pagination` | Не удается распознать параметр пагинации `{"limit":0}` | Передайте в `limit` число больше `0` ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `productId` | Запись с ID = `#ID#` не найдена | Товар не найден или не относится к торговому каталогу. Проверьте идентификатор методом [catalog.product.list](../product/catalog-product-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `select` | Неизвестное поле `#FIELD#` для сущности `ProductImageDto` | Укажите в `select` только поля из описания параметра `select` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на просмотр каталога и на чтение товара в инфоблоке ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-image-add-rest-v3.md)
- [{#T}](./catalog-product-image-get-rest-v3.md)
- [{#T}](./catalog-product-image-delete-rest-v3.md)
- [{#T}](./catalog-product-image-field-list.md)
