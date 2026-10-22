# Получить информацию об изображении товара v 3.0 catalog.product.image.get

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

Метод `catalog.product.image.get` возвращает информацию об изображении товара или вариации по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор изображения.

Идентификатор можно получить методом [catalog.product.image.list](./catalog-product-image-list-rest-v3.md) или из ответа метода [catalog.product.image.add](./catalog-product-image-add-rest-v3.md) ||
|| **productId***
[`integer`](../../data-types.md) | Идентификатор товара или вариации, к которому относится изображение.

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
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.image.get`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":39439,"productId":7537,"select":["id","productId","type","name","detailUrl"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.image.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":39439,"productId":7537,"select":["id","productId","type","name","detailUrl"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.image.get
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductImageGetResult = {
      item: {
        id: number
        productId: number
        type: 'PREVIEW_PICTURE' | 'DETAIL_PICTURE' | 'MORE_PHOTO'
        name: string
        detailUrl: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductImageGetResult>({
        method: 'catalog.product.image.get',
        params: {
          id: 39439,
          productId: 7537,
          select: [
            'id',
            'productId',
            'type',
            'name',
            'detailUrl',
          ],
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Image:', result.item.type, result.item.detailUrl)
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
      async function getProductImage() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.image.get',
            params: {
              id: 39439,
              productId: 7537,
              select: [
                'id',
                'productId',
                'type',
                'name',
                'detailUrl',
              ],
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Image:', result.item.type, result.item.detailUrl)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getProductImage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.image.get(
            bitrix_id=39439,
            product_id=7537,
            select=["id", "productId", "type", "name", "detailUrl"],
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
                'catalog.product.image.get',
                [
                    'id' => 39439,
                    'productId' => 7537,
                    'select' => ['id', 'productId', 'type', 'name', 'detailUrl'],
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
        'catalog.product.image.get',
        {
            id: 39439,
            productId: 7537,
            select: ['id', 'productId', 'type', 'name', 'detailUrl'],
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
        'catalog.product.image.get',
        [
            'id' => 39439,
            'productId' => 7537,
            'select' => ['id', 'productId', 'type', 'name', 'detailUrl'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.image.get", b24.Params{
    	"id":        39439,
    	"productId": 7537,
    	"select":    []string{"id", "productId", "type", "name", "detailUrl"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.image.get: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID        int    `json:"id"`
    	Type      string `json:"type"`
    	Name      string `json:"name"`
    	DetailURL string `json:"detailUrl"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Type, item.DetailURL)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 39439,
            "productId": 7537,
            "type": "MORE_PHOTO",
            "name": "more.png",
            "detailUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png"
        }
    },
    "time": {
        "start": 1792660560,
        "finish": 1792660560.964274,
        "duration": 0.9642739295959473,
        "processing": 0,
        "date_start": "2026-10-22T12:16:00+03:00",
        "date_finish": "2026-10-22T12:16:00+03:00",
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
|| **result.item**
[`object`](../../data-types.md) | Поля изображения. Состав зависит от `select`. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

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
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `1` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте в `id` положительное число ||
|| `productId` | Обязательное поле `productId` не указано | Передайте в `productId` положительное число ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id`, `productId` | Запись с ID = `#ID#` не найдена | Товар или изображение не найдены. В сообщении указан идентификатор, который не найден. Проверьте идентификаторы методом [catalog.product.image.list](./catalog-product-image-list-rest-v3.md) ||
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
- [{#T}](./catalog-product-image-list-rest-v3.md)
- [{#T}](./catalog-product-image-delete-rest-v3.md)
- [{#T}](./catalog-product-image-field-list.md)
