# Добавить изображение в товар v 3.0 catalog.product.image.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Редактирование товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.product.image.add` загружает изображение и добавляет его в товар или вариацию.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями нового изображения. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **productId***
[`integer`](../../data-types.md) | Идентификатор товара или вариации.

Идентификатор товара можно получить методом [catalog.product.list](../product/catalog-product-list-rest-v3.md), вариации — методом [catalog.product.offer.list](../product/offer/catalog-product-offer-list-rest-v3.md) ||
|| **type***
[`string`](../../data-types.md) | Куда добавить изображение.

Возможные значения:

- `PREVIEW_PICTURE` — картинка для анонса. Заменяет текущую картинку для анонса
- `DETAIL_PICTURE` — детальная картинка. Заменяет текущую детальную картинку
- `MORE_PHOTO` — дополнительная картинка. Добавляется к уже загруженным ||
|| **file***
[`object`](../../data-types.md) | Файл изображения. [Описание объекта](#file) ||
|#

### Параметр file {#file}

#|
|| **Название**
`тип` | **Описание** ||
|| **upload***
[`object`](../../data-types.md) | Данные загружаемого файла. [Описание объекта](#upload) ||
|#

### Объект file.upload {#upload}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Имя файла с расширением, например `photo.png`. Тип файла проверяется по расширению: можно загрузить только изображение ||
|| **data**
[`string`](../../data-types.md) | Содержимое файла в формате Base64.

Передайте `data` или `url`, но не оба параметра сразу ||
|| **url**
[`string`](../../data-types.md) | Публичная ссылка на файл. Битрикс24 скачает файл по ссылке.

Передайте `data` или `url`, но не оба параметра сразу ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.image.add`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":7537,"type":"MORE_PHOTO","file":{"upload":{"name":"photo.png","data":"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg=="}}}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.image.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":7537,"type":"MORE_PHOTO","file":{"upload":{"name":"photo.png","data":"iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg=="}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.image.add
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ProductImageAddResult = {
      item: {
        id: number
        productId: number
        type: 'PREVIEW_PICTURE' | 'DETAIL_PICTURE' | 'MORE_PHOTO'
        name: string
        createTime: ISODate
        detailUrl: string
        downloadUrl: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ProductImageAddResult>({
        method: 'catalog.product.image.add',
        params: {
          fields: {
            productId: 7537,
            type: 'MORE_PHOTO',
            file: {
              upload: {
                name: 'photo.png',
                data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==',
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Image added:', result.item.id, result.item.detailUrl)
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
      async function addProductImage() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.image.add',
            params: {
              fields: {
                productId: 7537,
                type: 'MORE_PHOTO',
                file: {
                  upload: {
                    name: 'photo.png',
                    data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==',
                  },
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Image added:', result.item.id, result.item.detailUrl)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addProductImage)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.image.add(
            fields={
                "productId": 7537,
                "type": "MORE_PHOTO",
                "file": {
                    "upload": {
                        "name": "photo.png",
                        "data": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==",
                    },
                },
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
                'catalog.product.image.add',
                [
                    'fields' => [
                        'productId' => 7537,
                        'type' => 'MORE_PHOTO',
                        'file' => [
                            'upload' => [
                                'name' => 'photo.png',
                                'data' => base64_encode(file_get_contents('photo.png')),
                            ],
                        ],
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
        'catalog.product.image.add',
        {
            fields: {
                productId: 7537,
                type: 'MORE_PHOTO',
                file: {
                    upload: {
                        name: 'photo.png',
                        data: 'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==',
                    },
                },
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
        'catalog.product.image.add',
        [
            'fields' => [
                'productId' => 7537,
                'type' => 'MORE_PHOTO',
                'file' => [
                    'upload' => [
                        'name' => 'photo.png',
                        'data' => base64_encode(file_get_contents('photo.png')),
                    ],
                ],
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
    res, err := client.Core().Call(ctx, "catalog.product.image.add", b24.Params{
    	"fields": b24.Params{
    		"productId": 7537,
    		"type":      "MORE_PHOTO",
    		"file": b24.Params{
    			"upload": b24.Params{
    				"name": "photo.png",
    				"data": "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAAFklEQVR4nGO4o6FBEmIY1TCqYfhqAAAyBCwQhvh37QAAAABJRU5ErkJggg==",
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.image.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID        int    `json:"id"`
    	ProductID int    `json:"productId"`
    	Type      string `json:"type"`
    	DetailURL string `json:"detailUrl"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.DetailURL)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 39451,
            "productId": 7537,
            "type": "MORE_PHOTO",
            "name": "photo.png",
            "createTime": "2026-10-22T12:15:59+03:00",
            "detailUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png",
            "downloadUrl": "https://cdn-ru.bitrix24.ru/b1234567/catalog/c02/c020af94aac1804f57f3a5092b8cb4b4/b3759501f5e66f5238a54d2654a7b0cc.png"
        }
    },
    "time": {
        "start": 1792660559,
        "finish": 1792660559.878817,
        "duration": 0.878817081451416,
        "processing": 0,
        "date_start": "2026-10-22T12:15:59+03:00",
        "date_finish": "2026-10-22T12:15:59+03:00",
        "operating_reset_at": 1792661040,
        "operating": 4.06761908531189
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
[`object`](../../data-types.md) | Поля добавленного изображения. [Описание полей](#item) ||
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
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_INVALIDFILEEXCEPTION",
        "message": "REST_V3_EXCEPTION_VALIDATION_INVALIDFILEEXCEPTION",
        "validation": [
            {
                "message": "Файл неверного типа.",
                "field": "FILE_TYPE_NOT_ALLOWED"
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
|| `productId` | Не заполнено обязательное поле "productId" | Передайте `productId` в `fields` ||
|| `type` | Не заполнено обязательное поле "type" | Передайте `type` в `fields` ||
|| `file` | Не заполнено обязательное поле "file" | Передайте объект `file` с вложенным объектом `upload` ||
|| `file.upload` | Не заполнено значение хотя бы одного обязательного поля | Передайте в `upload` параметр `data` или `url` ||
|| `file.upload` | Должно быть передано только одно из значений: data, url | Оставьте в `upload` только `data` или только `url` ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `type` | В поле `type` требуется тип данных `ProductImageType` для такого запроса | Передайте `PREVIEW_PICTURE`, `DETAIL_PICTURE` или `MORE_PHOTO` ||
|| `-` | Image product property does not exists. Create MORE_PHOTO property | В каталоге нет свойства `MORE_PHOTO`. Добавьте изображение в `PREVIEW_PICTURE` или `DETAIL_PICTURE` ||
|| `file` | Could not save image. | Повторите запрос ||
|#

#### Ошибки файла

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_INVALIDFILEEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `FILE_TYPE_NOT_ALLOWED` | Файл неверного типа. | Загрузите изображение. Укажите в `name` имя файла с расширением изображения, например `photo.png` ||
|| `-` | Service response status code is 404 | Файл по ссылке из `url` недоступен. Проверьте, что ссылка открывается без авторизации ||
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
|| `-` | Неизвестное поле `#FIELD#` для сущности `ProductImageDto` | Передайте в `fields` только `productId`, `type` и `file` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Редактирование товара» и право на изменение товара в инфоблоке ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-image-get-rest-v3.md)
- [{#T}](./catalog-product-image-list-rest-v3.md)
- [{#T}](./catalog-product-image-delete-rest-v3.md)
- [{#T}](./catalog-product-image-field-list.md)
