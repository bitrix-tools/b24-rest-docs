# Как загрузить файлы 

В Битрикс24 есть два типа файловых полей.

- **Файл.** Поле не связано с Диском, в него файлы загружаются напрямую, через строку формата Base64.

- **Файл (диск).** Поле связано с Диском, в поле хранится ID объекта диска. Формат Bаse64 в поле не обрабатывается, поэтому сначала файл загружается на Диск Битрикс24 методами [disk.folder.uploadfile](../disk/folder/disk-folder-upload-file.md) или [disk.storage.uploadfile](../disk/storage/disk-storage-upload-file.md).

Для загрузки файлов в Битрикс24 используйте стандарт кодирования Base64. Кодирование используется, когда нужно передать файл через текстовые протоколы, например HTTP.

## Как кодировать файл в Bаse64

В JavaScript можно использовать встроенный объект [FileReader](https://www.w3.org/TR/FileAPI/). Код считывает файл, который выбрал пользователь, и преобразует его в Bаse64.

```JavaScript
const fileInput = document.getElementById('fileInput'); // Поле для выбора файла

fileInput.addEventListener('change', function() {
    const file = fileInput.files[0]; // Получаем выбранный файл
    const reader = new FileReader();

    reader.onload = function() {
        const base64 = reader.result.split(',')[1]; // Получаем base64 без префикса
        console.log(base64); // Выводим результат
    };

    reader.readAsDataURL(file); // Кодируем файл в base64
});
```

В PHP можно использовать функцию [base64_encode](https://www.php.net/manual/en/function.base64-encode.php). Код читает файл с диска и кодирует его в Bаse64.

```PHP
$filePath = 'path/to/your/file.jpg'; // Путь к файлу
$fileData = file_get_contents($filePath); // Читаем файл
$base64 = base64_encode($fileData); // Кодируем в base64
```

В результате кодирования файла получим строку вида `YmFzZSDRgtC10YHRgg==`. Чем больше размер файла, тем длиннее будет строка.

## Как передать строку с Bаse64 в поле

В Битрикс24 есть 4 особенности загрузки файлов.


1. Передавайте строку с Bаse64 в поле `file`, если используете методы:

   - [documentgenerator.template.add](../document-generator/templates/document-generator-template-add.md)

   - [crm.documentgenerator.template.add](../crm/document-generator/templates/crm-document-generator-template-add.md)

    {% list tabs %}

    - JS
    
        ```JavaScript
        BX24.callMethod(
            'documentgenerator.template.add',
            {
                fields: {
                    name: "Пример шаблона",
                    file: "base64_encoded_content_here", // Контент файла, закодированный в base64
                    code: "example_template_code"
                }
            }
        );
        ```

    - PHP
    
        ```php
        require_once('crest.php');

        $result = CRest::call(
            'documentgenerator.template.add',
            [
                'fields' => [
                    'name' => 'Пример шаблона',
                    'file' => 'base64_encoded_content_here', // Контент файла, закодированный в base64
                    'code' => 'example_template_code' 
                ]
            ]
        );
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"name":"Пример шаблона","file":"base64_encoded_content_here","code":"example_template_code"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/documentgenerator.template.add
        ```

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"name":"Пример шаблона","file":"base64_encoded_content_here","code":"example_template_code"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/documentgenerator.template.add
        ```

    {% endlist %}

2. Передавайте массив из имени файла и строки с Bаse64, если используете методы:

   - [crm.timeline.comment.add](../crm/timeline/comments/crm-timeline-comment-add.md) — в поле `FILES`

   - [crm.item.add](../crm/universal/crm-item-add.md) — в поля типа «файл» объектов CRM

   - [log.blogpost.add](../log/log-blogpost-add.md) — в поле `FILES`

   - [lists.element.add](../lists/elements/lists-element-add.md) — в свойства типа «файл»

   - [entity.item.add](../entity/items/entity-item-add.md) — в свойства типа «файл»

   - [bizproc.workflow.template.add](../bizproc/template/bizproc-workflow-template-add.md) — в поле `TEMPLATE_DATA`


    {% list tabs %}

    - JS
    
        ```JavaScript
        BX24.callMethod(
            'bizproc.workflow.template.add',
            {
                DOCUMENT_TYPE: ['lists', 'BizprocDocument', 'iblock_164'],
                NAME: 'App template', 
                // Контент файла с шаблоном бизнес-процесса
                TEMPLATE_DATA: [   
                    "bp-379.bpt", // Первый элемент массива - имя файла
                    "base64_encoded_content_here" // Второй элемент массива - контент файла, закодированный в base64
                ]
            }
        );
        ```

    - PHP
    
        ```php
        require_once('crest.php');

        $result = CRest::call(
            'bizproc.workflow.template.add',
            [
                'DOCUMENT_TYPE' => ['lists', 'BizprocDocument', 'iblock_164'],
                'NAME' => 'App template',
                // Контент файла с шаблоном бизнес-процесса
                'TEMPLATE_DATA' => [
                    'bp-379.bpt', // Имя файла
                    'base64_encoded_content_here' // Контент файла, закодированный в base64
                ]
            ]
        );
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"DOCUMENT_TYPE":["lists","BizprocDocument","iblock_164"],"NAME":"App template","TEMPLATE_DATA":["bp-379.bpt","base64_encoded_content_here"],"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/bizproc.workflow.template.add
        ```

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"DOCUMENT_TYPE":["lists","BizprocDocument","iblock_164"],"NAME":"App template","TEMPLATE_DATA":["bp-379.bpt","base64_encoded_content_here"]}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.workflow.template.add
        ```

    {% endlist %}

3. Передавайте объект с ключом `fileData`, который содержит массив из имени файла и строки с Bаse64, если используете методы:

   - [catalog.product.add](../catalog/product/catalog-product-add.md) — в поля `previewPicture`, `detailPicture`

    {% list tabs %}

    - JS
    
        ```JavaScript
        BX24.callMethod(
            "catalog.product.add",
            {
                fields: {
                    iblockId: '24', 
                    name: "Пример товара",
                    // Превью изображение товара, fileData - массив, где первый элемент - имя файла, второй - контент файла в формате base64
                    previewPicture: {
                        fileData: [
                            "example.jpg", // Имя файла изображения
                            "base64_encoded_content_here" // Контент изображения в формате base64
                        ]
                    }
                }
            }
        );
        ```

    - PHP
    
        ```php
        require_once('crest.php');

        $result = CRest::call(
            'catalog.product.add',
            [
                'fields' => [
                    'iblockId' => '24', 
                    'name' => 'Пример товара', 
                    // Превью изображение товара, fileData - массив, где первый элемент - имя файла, второй - контент файла в формате base64            
                    'previewPicture' => [
                        'fileData' => [
                            'example.jpg', // Имя файла изображения
                            'base64_encoded_content_here' // Контент изображения в формате base64
                        ]
                    ]
                ]
            ]
        );
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"iblockId":"24","name":"Пример товара","previewPicture":{"fileData":["example.jpg","base64_encoded_content_here"]}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/catalog.product.add
        ```

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"iblockId":"24","name":"Пример товара","previewPicture":{"fileData":["example.jpg","base64_encoded_content_here"]}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.product.add
        ```

    {% endlist %}

4. Передавайте параметр `fileContent`, который содержит массив из имени файла и строки с Bаse64, если используете методы:

   - [disk.file.uploadversion](../disk/file/disk-file-upload-version.md)

   - [disk.storage.uploadfile](../disk/storage/disk-storage-upload-file.md)

   - [disk.folder.uploadfile](../disk/folder/disk-folder-upload-file.md)

   - [telephony.externalCall.attachRecord](../telephony/telephony-external-call-attach-record.md)

   - [catalog.productImage.add](../catalog/product-image/catalog-product-image-add.md)

    {% list tabs %}

    - JS
    
        ```JavaScript
        BX24.callMethod(
            "disk.file.uploadversion",
            {    
                id: 4, // Идентификатор файла, для которого загружается новая версия
                // Содержимое файла, который загружается как новая версия
                fileContent: [
                    '1.gif', // Первый элемент массива - имя файла
                    'base64_encoded_content_here' // Второй элемент массива - контент файла в формате base64
                ]
            }
        );
        ```

    - PHP
    
        ```php
        require_once('crest.php');

        $result = CRest::call(
            'disk.file.uploadversion',
            [
                'id' => 4, // Идентификатор файла, для которого загружается новая версия
                'fileContent' => [
                    '1.gif', // Имя файла
                    'base64_encoded_content_here' // Контент файла в формате base64
                ]
            ]
        );
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":4,"fileContent":["1.gif","base64_encoded_content_here"],"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/disk.file.uploadversion
        ```

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":4,"fileContent":["1.gif","base64_encoded_content_here"]}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/disk.file.uploadversion
        ```

    {% endlist %}

## Как загрузить файлы во множественное поле

Если у поля есть флаг «множественное», в него можно загрузить несколько файлов. Загрузка нескольких файлов работает в методах:

- [crm.item.add](../crm/universal/crm-item-add.md) — поля типа «файл»

- [lists.element.add](../lists/elements/lists-element-add.md) — свойства типа «файл»

- [crm.timeline.comment.add](../crm/timeline/comments/crm-timeline-comment-add.md) — поле `FILES`

- [log.blogpost.add](../log/log-blogpost-add.md) — поле `FILES`

- [catalog.product.add](../catalog/product/catalog-product-add.md) —  поля типа «файл»

Для загрузки нескольких файлов передавайте массив, где каждый элемент — это имя файла и сам файл, в формате строки закодированной в Bаse64.

{% list tabs %}

- JS
  
    ```JavaScript
    BX24.callMethod(
        'crm.item.add',
        {
            entityTypeId: 2, 
            fields: {
                title: "Новая сделка (специально для примера REST методов)", 
                // Множественное поле с массивом файлов
                ufCrm_123456: [ 
                    [
                        "green_pixel.png", // Имя файла №1
                        "base64_encoded_content_here" // Base64-контент первого файла
                    ],
                    [
                        "blue_pixel.png", // Имя файла №2
                        "base64_encoded_content_here" // Base64-контент второго файла
                    ],
                    [
                        "red_pixel.png", // Имя файла №3
                        "base64_encoded_content_here" // Base64-контент третьего файла
                    ]
                ]
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.add',
        [
            'entityTypeId' => 2, 
            'fields' => [
                'title' => 'Новая сделка (специально для примера REST методов)', 
                // Множественное поле с массивом файлов
                'ufCrm_123456' => [
                    [
                        'green_pixel.png', // Имя файла №1
                        'base64_encoded_content_here' // Base64-контент первого файла
                    ],
                    [
                        'blue_pixel.png', // Имя файла №2
                        'base64_encoded_content_here' // Base64-контент второго файла
                    ],
                    [
                        'red_pixel.png', // Имя файла №3
                        'base64_encoded_content_here' // Base64-контент третьего файла
                    ]
                ]
            ]
        ]
    );
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"fields":{"title":"Новая сделка (специально для примера REST методов)","ufCrm_123456":[["green_pixel.png","base64_encoded_content_here"],["blue_pixel.png","base64_encoded_content_here"],["red_pixel.png","base64_encoded_content_here"]]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.add
    ```

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"fields":{"title":"Новая сделка (специально для примера REST методов)","ufCrm_123456":[["green_pixel.png","base64_encoded_content_here"],["blue_pixel.png","base64_encoded_content_here"],["red_pixel.png","base64_encoded_content_here"]]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.item.add
    ```

{% endlist %}

Для загрузки нескольких файлов в методе [catalog.product.add](../catalog/product/catalog-product-add.md) передавайте массив объектов, где каждый объект содержит поле `value`, в котором находится объект с ключом `fileData`. Значение `fileData` — массив из двух элементов: имя файла и сам файл, в формате строки закодированной в Bаse64.

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'catalog.product.add',
        {
            fields: {
                iblockId: 1,
                name: "Пример товара",
                PROPERTY_1077: [
                    {
                        value: {
                            fileData: [
                                "blue_pixel.txt", // Имя файла
                                "YmFzZSDRgtC10YHRgg==" // Base64-контент
                            ]
                        }
                    },
                    {
                        value: {
                            fileData: [
                                "red_pixel.txt", // Имя файла
                                "YmFzZSDRgtC10YHRgg==" // Base64-контент
                            ]
                        }
                    }
                ]
            }
        }
    );
    ```

- cURL (Webhook)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"fields": {"iblockId": 1, "name": "Пример товара", "PROPERTY_1077": [{"value": {"fileData": ["blue_pixel.txt", "YmFzZSDRgtC10YHRgg=="]}}, {"value": {"fileData": ["red_pixel.txt", "YmFzZSDRgtC10YHRgg=="]}}]}}' https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.product.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST -H "Content-Type: application/json" -H "Accept: application/json" -d '{"fields": {"iblockId": 1, "name": "Пример товара", "PROPERTY_1077": [{"value": {"fileData": ["blue_pixel.txt", "YmFzZSDRgtC10YHRgg=="]}}, {"value": {"fileData": ["red_pixel.txt", "YmFzZSDRgtC10YHRgg=="]}}]}, "auth": "**put_access_token_here**"}' https://**put_your_bitrix24_address**/rest/catalog.product.add
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.add',
        [
            'fields' => [
                'iblockId' => 1,
                'name' => 'Пример товара',
                'PROPERTY_1077' => [
                    [
                        'value' => [
                            'fileData' => [
                                'blue_pixel.txt',
                                'YmFzZSDRgtC10YHRgg=='
                            ]
                        ]
                    ],
                    [
                        'value' => [
                            'fileData' => [
                                'red_pixel.txt',
                                'YmFzZSDRgtC10YHRgg=='
                            ]
                        ]
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}


## Ограничения при работе с файлами

- Ограничение на длину GET-запроса — 2048 символов, это длина URL-адреса. Файлы, кодированные в Bаse64, часто превышают это значение. Для передачи больших файлов используйте POST-запрос.

- Ограничение на размер POST-запроса в Битрикс24 — 2Гб. Файлы больше 2Гб обработаны не будут. Если в одном в запросе передается несколько файлов суммарно больше 2Гб — запрос прервется. Для загрузки нескольких файлов большого размера передавайте данные в отдельных запросах.

- Ограничение на время выполнения запроса — 60 секунд для облачного Битрикс24. Запрос прервется по таймауту, если обработка занимает дольше 60 секунд. Проверить время выполнения запроса можно в объекте [time](../data-types.md#time) ответа на запрос, параметр `duration`.

- Если при передаче файла, закодированного строку в Bаse64, метод выполняется в адресной строке GET-запросом или метод выполняется через curl — Bаse64 нужно дополнительно [закодировать в urlencode](../../settings/how-to-call-rest-api/data-encoding.md), иначе файл не прочитается.
