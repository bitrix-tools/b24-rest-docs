# Скачать файлы вариации товара v 3.0 catalog.product.offer.download

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `catalog.product.offer.download` возвращает данные файла вариации: имя, тип и ссылку на файл.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с параметрами файла. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **productId***
[`integer`](../../../data-types.md) | Идентификатор вариации.

Идентификатор можно получить методом [catalog.product.offer.list](./catalog-product-offer-list-rest-v3.md) или из ответа [catalog.product.offer.add](./catalog-product-offer-add-rest-v3.md) ||
|| **fieldName***
[`string`](../../../data-types.md) | Имя поля, в котором хранится файл, в верхнем регистре через подчеркивание.

Возможные значения:

- `PREVIEW_PICTURE` — картинка для анонса
- `DETAIL_PICTURE` — детальная картинка
- `PROPERTY_{id}` — свойство типа «Файл»

Имена в формате `detailPicture` не поддерживаются ||
|| **fileId***
[`integer`](../../../data-types.md) | Идентификатор файла. Его возвращает метод [catalog.product.offer.get](./catalog-product-offer-get-rest-v3.md) в полях `previewPicture`, `detailPicture` или в значении файлового свойства в `properties` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.product.offer.download`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":7555,"fieldName":"DETAIL_PICTURE","fileId":39457}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.download
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":7555,"fieldName":"DETAIL_PICTURE","fileId":39457},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.offer.download
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DownloadResult = {
      file: {
        id: number
        fileName: string
        contentType: string
        src: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<DownloadResult>({
        method: 'catalog.product.offer.download',
        params: {
          fields: {
            productId: 7555,
            fieldName: 'DETAIL_PICTURE',
            fileId: 39457,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('File:', result.file.src)
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
      async function downloadOfferFile() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.offer.download',
            params: {
              fields: {
                productId: 7555,
                fieldName: 'DETAIL_PICTURE',
                fileId: 39457,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('File:', result.file.src)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', downloadOfferFile)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.offer.download(
            fields={
                "productId": 7555,
                "fieldName": "DETAIL_PICTURE",
                "fileId": 39457,
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
                'catalog.product.offer.download',
                [
                    'fields' => [
                        'productId' => 7555,
                        'fieldName' => 'DETAIL_PICTURE',
                        'fileId' => 39457,
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
        'catalog.product.offer.download',
        {
            fields: {
                productId: 7555,
                fieldName: 'DETAIL_PICTURE',
                fileId: 39457,
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
        'catalog.product.offer.download',
        [
            'fields' => [
                'productId' => 7555,
                'fieldName' => 'DETAIL_PICTURE',
                'fileId' => 39457,
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
    res, err := client.Core().Call(ctx, "catalog.product.offer.download", b24.Params{
    	"fields": b24.Params{
    		"productId": 7555,
    		"fieldName": "DETAIL_PICTURE",
    		"fileId": 39457,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.offer.download: %w", err)
    }

    var result struct {
    	File struct {
    		ID          int    `json:"id"`
    		FileName    string `json:"fileName"`
    		ContentType string `json:"contentType"`
    		Src         string `json:"src"`
    	} `json:"file"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.File.Src)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "file": {
            "id": 39457,
            "fileName": "futbolka.png",
            "contentType": "image/png",
            "src": "https://cdn-ru.bitrix24.ru/b1234567/iblock/f54/f54f7f571d4625527e27ec2317404c3b/futbolka.png"
        }
    },
    "time": {
        "start": 1792660771,
        "finish": 1792660771.310511,
        "duration": 0.31051111221313477,
        "processing": 0,
        "date_start": "2026-10-22T12:19:31+03:00",
        "date_finish": "2026-10-22T12:19:31+03:00",
        "operating_reset_at": 1792661340,
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
|| **result.file**
[`object`](../../../data-types.md) | Данные файла ||
|| **result.file.id**
[`integer`](../../../data-types.md) | Идентификатор файла ||
|| **result.file.fileName**
[`string`](../../../data-types.md) | Имя файла ||
|| **result.file.contentType**
[`string`](../../../data-types.md) | MIME-тип файла, например `image/png` ||
|| **result.file.src**
[`string`](../../../data-types.md) | Ссылка на файл ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
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
                "message": "Name file field is not available"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `-` | Name file field is not available | Передайте в `fieldName` `PREVIEW_PICTURE`, `DETAIL_PICTURE` или `PROPERTY_{id}` свойства типа «Файл» ||
|| `-` | Product file wrong | Файла с таким `fileId` нет в поле `fieldName`. Проверьте значение методом [catalog.product.offer.get](./catalog-product-offer-get-rest-v3.md) ||
|| `-` | Product is empty | Файл не найден. Получите актуальный идентификатор файла ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Записи нет или это не вариация. Проверьте `productId` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на каталог и на инфоблок ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add-rest-v3.md)
- [{#T}](./catalog-product-offer-update-rest-v3.md)
- [{#T}](./catalog-product-offer-get-rest-v3.md)
- [{#T}](./catalog-product-offer-list-rest-v3.md)
- [{#T}](./catalog-product-offer-delete-rest-v3.md)
- [{#T}](./catalog-product-offer-field-list.md)
- [{#T}](./catalog-product-offer-field-get.md)
