# Загрузить и привязать изображение к блоку landing.block.uploadfile

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.block.uploadfile` загружает изображение и привязывает его к указанному блоку.

В ответе метод возвращает идентификатор файла и ссылку на него в поле `src`. Само изображение метод в блок не подставляет. Это значит, что после загрузки файл уже есть, но в содержимом блока он еще не показан. Обычно для этого после `landing.block.uploadfile` вызывают [landing.block.updatenodes](./landing-block-update-nodes.md).

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока, к которому нужно привязать изображение.

Метод принимает идентификатор любого существующего блока.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md)

Если изображение нужно добавить в черновик опубликованной страницы, используйте идентификатор блока из черновика. Обычно для этого вызывают [landing.block.getlist](./landing-block-get-list.md) с параметром `params.edit_mode = 1` ||
|| **picture***
[`string`](../../../data-types.md) \| [`string[]`](../../../data-types.md) | Изображение для загрузки.

Метод принимает только изображения. Поддерживаются два формата:

- URL изображения,
- массив `["имя_файла.png", "base64_контент"]`.

Для массива имя файла должно содержать расширение. Во втором элементе массива передавайте только содержимое Base64 без префикса `data:image/...;base64,`.

При сохранении имя файла может измениться. Кириллические буквы метод транслитерирует, а пробелы и круглые скобки заменяет на `_`.

Подробнее о подготовке Base64: [Как загрузить файлы](../../../files/how-to-upload-files.md) ||
|| **ext**
[`string`](../../../data-types.md) | Расширение файла для загрузки по URL, если его нельзя точно определить по адресу.

Параметр учитывается только для `picture`, переданного как URL. Укажите в нем расширение файла изображения.

Если параметр не передан, расширение определяется автоматически. Для массива `picture` расширение берется из имени файла ||
|| **params**
[`object`](../../../data-types.md) | Дополнительные параметры обработки изображения [(подробное описание)](#params).

Если параметр не передан, изображение сохраняется без изменения размера ||
|| **temp**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, файл помечается как временный.

По умолчанию — `false` ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **width**
[`integer`](../../../data-types.md) | Целевая ширина изображения в пикселях.

Изменение размера выполняется только если одновременно передан `height` ||
|| **height**
[`integer`](../../../data-types.md) | Целевая высота изображения в пикселях.

Изменение размера выполняется только если одновременно передан `width` ||
|| **resize_type**
[`integer`](../../../data-types.md) | Режим изменения размера.

Возможные значения:
`0` — вписать изображение в указанные размеры с сохранением пропорций,
`1` — изменить размер пропорционально по большей стороне,
`2` — привести изображение к точным размерам, при необходимости обрезав его.

По умолчанию — `1`. Параметр применяется только к растровым изображениям ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "block": 39556,
        "picture": ["banner.png", "**base64_image_content**"],
        "params": {
          "width": 1200,
          "height": 675
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.uploadfile.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "block": 39556,
        "picture": ["banner.png", "**base64_image_content**"],
        "params": {
          "width": 1200,
          "height": 675
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.uploadfile.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.uploadfile',
    		{
    			block: 39556,
    			picture: ['banner.png', '**base64_image_content**'],
    			params: {
    				width: 1200,
    				height: 675
    			}
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.block.uploadfile',
                [
                    'block' => 39556,
                    'picture' => ['banner.png', '**base64_image_content**'],
                    'params' => [
                        'width' => 1200,
                        'height' => 675,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error uploading image: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.uploadfile',
        {
            block: 39556,
            picture: ['banner.png', '**base64_image_content**'],
            params: {
                width: 1200,
                height: 675
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.block.uploadfile',
        [
            'block' => 39556,
            'picture' => ['banner.png', '**base64_image_content**'],
            'params' => [
                'width' => 1200,
                'height' => 675,
            ],
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 33873,
        "src": "https://cdn-ru.bitrix24.ru/b13743910/landing/fda/fda6c41d4b2b4f4d672601bd48c6aff1/nature.jpg"
    },
    "time": {
        "start": 1774523909,
        "finish": 1774523910.101491,
        "duration": 1.1014909744262695,
        "processing": 1,
        "date_start": "2026-03-26T14:18:29+03:00",
        "date_finish": "2026-03-26T14:18:30+03:00",
        "operating_reset_at": 1774524509,
        "operating": 0.30655694007873535
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Данные загруженного файла [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор сохраненного файла ||
|| **src**
[`string`](../../../data-types.md) | Адрес загруженного файла.

В зависимости от окружения может вернуться относительный путь или полный URL ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "FILE_ERROR",
    "error_description": "Ошибка загрузки файла. Возможно, файл не является графическим."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `block` или `picture` ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден или недоступен. Ошибка также возвращается, если по этому идентификатору нельзя определить страницу ||
|| `FILE_ERROR` | Не удалось загрузить изображение. Ошибка возвращается, если файл не скачался по URL, не прочитался из Base64, не прошел проверку как изображение, SVG не разрешен на портале или файл не удалось сохранить ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-list.md)
- [{#T}](./landing-block-update-nodes.md)
- [{#T}](./landing-block-get-by-id.md)
- [{#T}](../../page/methods/landing-landing-publication.md)
- [{#T}](../../page/block-methods/landing-landing-favorite-block.md)
- [{#T}](../../page/methods/landing-landing-remove-entities.md)
