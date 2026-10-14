# Скачать файлы вариации товара catalog.product.offer.download

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `catalog.product.offer.download` скачивает файл вариации товара из поля изображения или файлового свойства.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Параметры файла вариации товара [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fileId***
[`integer`](../../../data-types.md) | Идентификатор зарегистрированного файла.

Идентификатор возьмите из поля `id` объекта файла в ответе метода [catalog.product.offer.get](./catalog-product-offer-get.md) или [catalog.product.offer.list](./catalog-product-offer-list.md)
||
|| **productId***
[`catalog_product_offer.id`](../../data-types.md#catalog_product_offer) | Идентификатор вариации товара.

Для получения идентификаторов вариаций товара необходимо использовать [catalog.product.offer.list](./catalog-product-offer-list.md)
||
|| **fieldName***
[`string`](../../../data-types.md) | Имя поля, в котором хранится файл. Передавайте имя в camelCase — в том же формате, в котором поле возвращают методы [catalog.product.offer.get](./catalog-product-offer-get.md) и [catalog.product.offer.list](./catalog-product-offer-list.md).

Возможные значения:

- `detailPicture` — детальная картинка, поле доступно в старой карточке товара
- `previewPicture` — картинка для анонса, поле доступно в старой карточке товара
- `propertyN` — файловое свойство, где `N` — идентификатор или символьный код свойства, например `property258` или `propertyMorePhoto`

Получить идентификаторы и символьные коды свойств вариации можно методом [catalog.productProperty.list](../../product-property/catalog-product-property-list.md). Для скачивания подходят только свойства файлового типа
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Метод возвращает содержимое файла, а не JSON. Выполняйте прямой HTTP-запрос и сохраняйте тело успешного ответа как файл.

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"fields":{"fileId":6538,"productId":1286,"fieldName":"detailPicture"}}' \
    --output offer-file \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.download
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -d '{"fields":{"fileId":6538,"productId":1286,"fieldName":"detailPicture"},"auth":"**put_access_token_here**"}' \
    --output offer-file \
    https://**put_your_bitrix24_address**/rest/catalog.product.offer.download
    ```

- JS (TS)

    ```ts
    import { writeFile } from 'node:fs/promises'

    const response = await fetch(
      'https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.download',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fields: {
            fileId: 6538,
            productId: 1286,
            fieldName: 'detailPicture',
          },
        }),
      },
    )

    if (!response.ok) {
      throw new Error(await response.text())
    }

    const file = new Uint8Array(await response.arrayBuffer())
    await writeFile('offer-file', file)
    ```

- JS (UMD)

    ```html
    <script>
      async function downloadOfferFile() {
        const response = await fetch(
          'https://**put_your_bitrix24_address**/rest/catalog.product.offer.download',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              fields: {
                fileId: 6538,
                productId: 1286,
                fieldName: 'detailPicture',
              },
              auth: '**put_access_token_here**',
            }),
          },
        )

        if (!response.ok) {
          throw new Error(await response.text())
        }

        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'offer-file'
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(url)
      }

      document.addEventListener('DOMContentLoaded', downloadOfferFile)
    </script>
    ```

- Python

    ```python
    import requests

    response = requests.post(
        "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.download",
        json={
            "fields": {
                "fileId": 6538,
                "productId": 1286,
                "fieldName": "detailPicture",
            }
        },
    )
    response.raise_for_status()

    with open("offer-file", "wb") as file:
        file.write(response.content)
    ```

- PHP


    ```php
    $curl = curl_init('https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.download');
    curl_setopt_array($curl, [
        CURLOPT_POST => true,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => json_encode([
            'fields' => [
                'fileId' => 6538,
                'productId' => 1286,
                'fieldName' => 'detailPicture',
            ],
        ]),
    ]);

    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    curl_close($curl);

    if ($httpCode === 200) {
        file_put_contents('offer-file', $response);
    } else {
        echo $response;
    }
    ```

- BX24.js

    ```js
    const auth = BX24.getAuth()
    const url = new URL(`https://${auth.domain}/rest/catalog.product.offer.download`)
    url.searchParams.set('auth', auth.access_token)
    url.searchParams.set('fields[fileId]', 6538)
    url.searchParams.set('fields[productId]', 1286)
    url.searchParams.set('fields[fieldName]', 'detailPicture')

    fetch(url)
      .then(async response => {
        if (!response.ok) {
          throw new Error(await response.text())
        }
        return response.blob()
      })
      .then(blob => {
        const objectUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = objectUrl
        link.download = 'offer-file'
        document.body.appendChild(link)
        link.click()
        link.remove()
        URL.revokeObjectURL(objectUrl)
      })
      .catch(error => console.error(error))
    ```

- Go

    ```go
    payload, err := json.Marshal(map[string]any{
        "fields": map[string]any{
            "fileId": 6538, "productId": 1286, "fieldName": "detailPicture",
        },
    })
    if err != nil {
        return err
    }

    url := "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.offer.download"
    response, err := http.Post(url, "application/json", bytes.NewReader(payload))
    if err != nil {
        return err
    }
    defer response.Body.Close()

    body, err := io.ReadAll(response.Body)
    if err != nil {
        return err
    }
    if response.StatusCode != http.StatusOK {
        return fmt.Errorf("download failed: %s", body)
    }

    return os.WriteFile("offer-file", body, 0o644)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

В теле ответа приходит содержимое файла. Это бинарный ответ, а не JSON: заголовок `Content-Type` зависит от формата файла, а `Content-Disposition: attachment` содержит имя файла для скачивания.

### Возвращаемые данные

Файл с идентификатором `fileId` из поля `fieldName` вариации `productId`.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Required fields: fileId"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **error_description** | **Описание** ||
|| `200040300010` | `Access denied` | Недостаточно прав для чтения торгового каталога
|| 
|| Пустое значение | `offer does not exist.` | Вариация товара с указанным `productId` не существует
|| 
|| `0` | `Name file field is not available` | Поле `fieldName` недоступно для скачивания: имя указано неверно, свойство не существует или не относится к файловому типу
|| 
|| `0` | `Product file wrong` | Файл `fileId` не принадлежит указанному полю вариации
||
|| `0` | `Product is empty` | Файл с указанным `fileId` не найден в файловом хранилище
|| 
|| `0` | `Required fields: fieldName, fileId, productId` | Не передан один или несколько обязательных параметров. В сообщении перечислены отсутствующие параметры
|| 
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-product-offer-add.md)
- [{#T}](./catalog-product-offer-update.md)
- [{#T}](./catalog-product-offer-get.md)
- [{#T}](./catalog-product-offer-list.md)
- [{#T}](./catalog-product-offer-delete.md)
- [{#T}](./catalog-product-offer-get-fields-by-filter.md)
