# Скачать файлы услуги v 3.0 catalog.product.service.download

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

Метод `catalog.product.service.download` возвращает данные файла услуги: имя, тип содержимого и ссылку на файл.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Объект с параметрами файла. [Описание параметра](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **productId***
[`integer`](../../../data-types.md) | Идентификатор услуги.

Идентификатор можно получить методом [catalog.product.service.list](./catalog-product-service-list-rest-v3.md) ||
|| **fieldName***
[`string`](../../../data-types.md) | Имя поля с файлом в верхнем регистре.

Возможные значения:

- `DETAIL_PICTURE` — детальная картинка
- `PREVIEW_PICTURE` — картинка для анонса
- `PROPERTY_{id}` — свойство типа «Файл», где `{id}` — идентификатор свойства

Имена в формате `detailPicture` метод не принимает ||
|| **fileId***
[`integer`](../../../data-types.md) | Идентификатор файла.

Идентификатор возвращает метод [catalog.product.service.get](./catalog-product-service-get-rest-v3.md): в полях `detailPicture` и `previewPicture` или в ключе `VALUE` свойства типа «Файл» ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{user_id}/{токен_вебхука}/catalog.product.service.download`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":7551,"fieldName":"DETAIL_PICTURE","fileId":39453}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.service.download
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"productId":7551,"fieldName":"DETAIL_PICTURE","fileId":39453},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.product.service.download
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ServiceDownloadResult = {
      file: {
        id: number
        fileName: string
        contentType: string
        src: string
      }
    }

    try {
      const response = await $b24.actions.v3.call.make<ServiceDownloadResult>({
        method: 'catalog.product.service.download',
        params: {
          fields: {
            productId: 7551,
            fieldName: 'DETAIL_PICTURE',
            fileId: 39453,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('File:', result.file.fileName, result.file.src)
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
      async function downloadServiceFile() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.product.service.download',
            params: {
              fields: {
                productId: 7551,
                fieldName: 'DETAIL_PICTURE',
                fileId: 39453,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('File:', result.file.fileName, result.file.src)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', downloadServiceFile)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.product.service.download(
            fields={
                "productId": 7551,
                "fieldName": "DETAIL_PICTURE",
                "fileId": 39453,
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
                'catalog.product.service.download',
                [
                    'fields' => [
                        'productId' => 7551,
                        'fieldName' => 'DETAIL_PICTURE',
                        'fileId' => 39453,
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
        'catalog.product.service.download',
        {
            fields: {
                productId: 7551,
                fieldName: 'DETAIL_PICTURE',
                fileId: 39453,
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
        'catalog.product.service.download',
        [
            'fields' => [
                'productId' => 7551,
                'fieldName' => 'DETAIL_PICTURE',
                'fileId' => 39453,
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
    res, err := client.Core().Call(ctx, "catalog.product.service.download", b24.Params{
    	"fields": b24.Params{
    		"productId": 7551,
    		"fieldName": "DETAIL_PICTURE",
    		"fileId":    39453,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("catalog.product.service.download: %w", err)
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
    fmt.Println(result.File.FileName, result.File.Src)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "file": {
            "id": 39453,
            "fileName": "montazh-detail.png",
            "contentType": "image/png",
            "src": "https://cdn-ru.bitrix24.ru/b1234567/iblock/0ca/0ca00fa1be74b9ef25c6759290ad85c5/montazh-detail.png"
        }
    },
    "time": {
        "start": 1792660776,
        "finish": 1792660776.659825,
        "duration": 0.6598250865936279,
        "processing": 0,
        "date_start": "2026-10-22T12:19:36+03:00",
        "date_finish": "2026-10-22T12:19:36+03:00",
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
[`object`](../../../data-types.md) | Данные файла. [Описание полей](#file) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект file {#file}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор файла ||
|| **fileName**
[`string`](../../../data-types.md) | Имя файла ||
|| **contentType**
[`string`](../../../data-types.md) | MIME-тип файла, например `image/png` ||
|| **src**
[`string`](../../../data-types.md) | Ссылка на файл ||
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
|| `-` | Name file field is not available | Передайте в `fieldName` значение `DETAIL_PICTURE`, `PREVIEW_PICTURE` или `PROPERTY_{id}` свойства типа «Файл» в верхнем регистре ||
|| `-` | Product file wrong | Файла с таким идентификатором нет в указанном поле услуги. Проверьте `fileId` методом [catalog.product.service.get](./catalog-product-service-get-rest-v3.md) ||
|| `-` | Product is empty | Файл не найден в хранилище. Проверьте `fileId` ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Услуги с таким идентификатором нет или `productId` не передан. Ошибка приходит и для идентификатора товара другого типа ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте права пользователя на просмотр каталога и чтение элементов инфоблока ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-service-get-rest-v3.md)
- [{#T}](./catalog-product-service-update-rest-v3.md)
- [{#T}](./catalog-product-service-list-rest-v3.md)
