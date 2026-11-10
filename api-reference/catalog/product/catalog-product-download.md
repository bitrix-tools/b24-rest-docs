# Скачать файлы товара catalog.product.download

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на чтение товара в инфоблоке

Метод `catalog.product.download` скачивает файлы товара торгового каталога по переданным параметрам.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Параметры файла для скачивания. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **fileId***
[`integer`](../../data-types.md) | Идентификатор файла.

Идентификатор возвращают методы [catalog.product.get](./catalog-product-get.md) и [catalog.product.list](./catalog-product-list.md): в полях `detailPicture`, `previewPicture` или в `value` свойства типа «Файл» ||
|| **productId***
[`catalog_product.id`](../data-types.md#catalog_product) | Идентификатор товара.

Получить идентификаторы товаров можно методом [catalog.product.list](./catalog-product-list.md) ||
|| **fieldName***
[`string`](../../data-types.md) | Поле товара, в котором хранится файл:

- `detailPicture` — детальная картинка
- `previewPicture` — картинка для анонса
- `propertyN` — свойство типа «Файл», где `N` — идентификатор свойства. Вместо идентификатора можно указать символьный код свойства в camelCase, например `propertyMorePhoto` для кода `MORE_PHOTO`

В ответах [catalog.product.get](./catalog-product-get.md) и [catalog.product.list](./catalog-product-list.md) значение `fieldName` уже включено в адрес `url` и `urlMachine` файла. Передавайте его в том же виде. Имена в верхнем регистре, например `DETAIL_PICTURE` или `PROPERTY_N`, метод не принимает.

Получить идентификаторы свойств можно методом [catalog.productProperty.list](../product-property/catalog-product-property-list.md) ||
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

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const auth = $b24.auth.getAuthData()
      if (!auth) {
        throw new Error('No auth data')
      }

      // The method returns a binary file, so the request is sent directly
      const response = await fetch(`${$b24.getTargetOriginWithPath()}/catalog.product.download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: {
            fileId: 6439,
            productId: 1243,
            fieldName: 'detailPicture',
          },
          auth: auth.access_token,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error_description)
      }

      const blob: Blob = await response.blob()
      console.info('File size:', blob.size, 'type:', blob.type)
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function downloadProductFile() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()
          const auth = $b24.auth.getAuthData()
          if (!auth) {
            throw new Error('No auth data')
          }

          // The method returns a binary file, so the request is sent directly
          const response = await fetch(`${$b24.getTargetOriginWithPath()}/catalog.product.download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fields: {
                fileId: 6439,
                productId: 1243,
                fieldName: 'detailPicture',
              },
              auth: auth.access_token,
            }),
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.error_description)
          }

          // Save the file in the browser
          const blob = await response.blob()
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = 'product-picture.png'
          link.click()
          URL.revokeObjectURL(link.href)
        } catch (error) {
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', downloadProductFile)
    </script>
    ```

- Python

    ```python
    import json
    from urllib.error import HTTPError
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

    try:
        with urlopen(request) as response, open("product-picture.png", "wb") as output:
            output.write(response.read())
    except HTTPError as error:
        print("Ошибка Bitrix API:", json.loads(error.read()).get("error_description"))
    ```

- PHP

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

- BX24.js

    ```js
    // The method returns a binary file, so the request is sent directly
    const auth = BX24.getAuth();

    fetch(`https://${auth.domain}/rest/catalog.product.download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            fields: {
                fileId: 6439,
                productId: 1243,
                fieldName: 'detailPicture'
            },
            auth: auth.access_token
        })
    })
        .then(response => response.ok
            ? response.blob()
            : response.json().then(error => { throw new Error(error.error_description); }))
        .then(blob => {
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'product-picture.png';
            link.click();
            URL.revokeObjectURL(link.href);
        })
        .catch(error => console.error(error));
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    // CRest::call() decodes the response as JSON, so the binary file is requested directly.
    // C_REST_WEB_HOOK_URL is set in settings.php
    $request = curl_init(C_REST_WEB_HOOK_URL . 'catalog.product.download');
    curl_setopt_array($request, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => http_build_query([
            'fields' => [
                'fileId' => 6439,
                'productId' => 1243,
                'fieldName' => 'detailPicture',
            ],
        ]),
        CURLOPT_RETURNTRANSFER => true,
    ]);

    $file = curl_exec($request);
    $status = curl_getinfo($request, CURLINFO_HTTP_CODE);
    curl_close($request);

    if ($status === 200) {
        file_put_contents('product-picture.png', $file);
    } else {
        echo '<PRE>';
        print_r(json_decode($file, true));
        echo '</PRE>';
    }
    ```

- Go

    ```go
    // The method returns a binary file, so the request is sent directly
    url := "https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.download"
    body, err := json.Marshal(map[string]any{
    	"fields": map[string]any{
    		"fileId":    6439,
    		"productId": 1243,
    		"fieldName": "detailPicture",
    	},
    })
    if err != nil {
    	return err
    }

    resp, err := http.Post(url, "application/json", bytes.NewReader(body))
    if err != nil {
    	return fmt.Errorf("catalog.product.download: %w", err)
    }
    defer resp.Body.Close()

    if resp.StatusCode != http.StatusOK {
    	var apiErr struct {
    		Error            string `json:"error"`
    		ErrorDescription string `json:"error_description"`
    	}
    	_ = json.NewDecoder(resp.Body).Decode(&apiErr)
    	return fmt.Errorf("catalog.product.download: %s", apiErr.ErrorDescription)
    }

    file, err := os.Create("product-picture.png")
    if err != nil {
    	return err
    }
    defer file.Close()
    if _, err := io.Copy(file, resp.Body); err != nil {
    	return fmt.Errorf("сохранение файла: %w", err)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

В ответ приходит содержимое файла с заголовками `Content-Type` и `Content-Disposition`, например `Content-Type: image/png` и `Content-Disposition: attachment; filename="logo.png"`. Метод проверяет, что `fileId` относится к указанному товару и полю `fieldName`. Сохраняйте ответ как файл: успешный вызов не содержит JSON-поля `result`.

### Возвращаемые данные

Возвращается содержимое файла, а не JSON-объект `result`. Идентификатор и адрес файла можно получить из `detailPicture`, `previewPicture` или файлового свойства в ответе [catalog.product.get](./catalog-product-get.md).

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Product file wrong"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `200040300010` | `Access Denied` | Нет ни одного из прав «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» ||
|| `400` | `200040300000` | `Iblock Not Found` | Инфоблок товара не найден ||
|| `400` | `200040300040` | `Access Denied` | Нет права на чтение товара в инфоблоке ||
|| `400` | Пустое значение | `product does not exist.` | Товар с указанным `productId` не найден ||
|| `400` | `100` | `Could not find value for parameter {fields}` | Не передан параметр `fields` ||
|| `400` | `0` | `Required fields: fieldName, fileId, productId` | Не переданы обязательные поля. Описание перечисляет только отсутствующие поля ||
|| `400` | `0` | `Name file field is not available` | `fieldName` не является полем или свойством типа «Файл», или передано в верхнем регистре ||
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
