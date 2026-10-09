# Скачать файлы товара catalog.product.download

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр каталога товаров

Метод `catalog.product.download` скачивает файлы товара торгового каталога по переданным параметрам.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields*** 
 [`object`](../../data-types.md)| Значения полей для скачивания файлов товара ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fileId*** 
 [`integer`](../../data-types.md)| Идентификатор зарегистрированного файла.

Для получения идентификаторов файлов товара необходимо использовать [catalog.product.get](./catalog-product-get.md), либо [catalog.product.list](./catalog-product-list.md)
 ||
|| **productId*** 
 [`catalog_product.id`](../data-types.md#catalog_product)| Идентификатор товара.

Для получения идентификаторов товаров необходимо использовать [catalog.product.list](./catalog-product-list.md)
 ||
|| **fieldName*** 
[`string`](../../data-types.md) | Имя поля (свойства или поля элемента информационного блока) в котором хранится файл.

- `detailPicture` — детальная картинка
- `previewPicture` — картинка для анонса
- `propertyN` — файловое свойство, где `N` — идентификатор или код свойства

В ответах [catalog.product.get](./catalog-product-get.md) и [catalog.product.list](./catalog-product-list.md) значение `fieldName` уже включено в адрес `url` и `urlMachine` файла. Передавайте его в том же виде. Внутри метода имена полей преобразуются в `DETAIL_PICTURE`, `PREVIEW_PICTURE` и `PROPERTY_N`

Для получения существующих идентификаторов, либо кодов свойств товаров, необходимо использовать [catalog.productProperty.list](../product-property/catalog-product-property-list.md)
 ||
|#

## Примеры кода

Для сохранения бинарного ответа в примерах используются прямые HTTP-запросы.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl --fail -X POST \
    -H "Content-Type: application/json" \
    -d '{"fields":{"fileId":6439,"productId":1243,"fieldName":"detailPicture"}}' \
    -o product-picture.png \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.download
    ```

- cURL (OAuth)

    ```bash
    curl --fail -X POST \
    -H "Content-Type: application/json" \
    -d '{"fields":{"fileId":6439,"productId":1243,"fieldName":"detailPicture"},"auth":"**put_access_token_here**"}' \
    -o product-picture.png \
    https://**put_your_bitrix24_address**/rest/catalog.product.download
    ```

- Python (Webhook)

    ```python
    import json
    from urllib.request import Request, urlopen

    url = "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.download"
    payload = {
        "fields": {
            "fileId": 6439,
            "productId": 1243,
            "fieldName": "detailPicture",
        }
    }
    request = Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json"},
        method="POST",
    )

    with urlopen(request) as response, open("product-picture.png", "wb") as output:
        output.write(response.read())
    ```

- PHP (Webhook)

    ```php
    <?php
    $url = 'https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.download';
    $payload = json_encode([
        'fields' => [
            'fileId' => 6439,
            'productId' => 1243,
            'fieldName' => 'detailPicture',
        ],
    ], JSON_THROW_ON_ERROR);

    $request = curl_init($url);
    curl_setopt_array($request, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
    ]);

    $file = curl_exec($request);
    $status = curl_getinfo($request, CURLINFO_HTTP_CODE);
    $error = curl_error($request);
    curl_close($request);
    if ($file === false || $status !== 200) {
        throw new RuntimeException('Не удалось скачать файл товара: HTTP ' . $status . ' ' . $error);
    }
    file_put_contents('product-picture.png', $file);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

В ответ приходит содержимое файла. Метод проверяет, что `fileId` относится к указанному товару и полю `fieldName`. Сохраняйте ответ как файл: успешный вызов не содержит JSON-поля `result`.

### Возвращаемые данные

Возвращается содержимое файла, а не JSON-объект `result`. Идентификатор и адрес файла можно получить из `detailPicture`, `previewPicture` или файлового свойства в ответе [catalog.product.get](./catalog-product-get.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{	
   "error":0,
   "error_description":"Required fields: fileId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | `Access Denied` | Нет права на просмотр каталога товаров ||
|| `400` | Пустой код | `product does not exist.` | Товар с указанным `productId` не найден ||
|| `400` | `0` | `Required fields: fieldName, fileId, productId` | Не переданы обязательные поля; в описании перечисляются отсутствующие поля ||
|| `400` | `0` | `Name file field is not available` | Поле `fieldName` не является допустимым полем файла товара ||
|| `400` | `0` | `Product file wrong` | Файл `fileId` не относится к указанному товару и полю ||
|| `400` | `0` | `Product is empty` | Запись файла не найдена ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./catalog-product-add.md)
- [{#T}](./catalog-product-update.md)
- [{#T}](./catalog-product-get.md)
- [{#T}](./catalog-product-list.md)
- [{#T}](./catalog-product-delete.md)
- [{#T}](./catalog-product-get-fields-by-filter.md)
