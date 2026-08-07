# Как загрузить файлы

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

На странице описано, как передать новый файл в Битрикс24 через REST API: как закодировать файл в Base64, в каком формате передать его в метод и какие ограничения учесть.

Единого формата для всех методов нет: одни принимают строку с Base64, другие — массив из имени файла и такой строки, третьи — отдельный параметр. Перед вызовом сверьтесь с таблицей [Как выбрать формат](#formats).

Обновление, замена и удаление файлов описаны в статье [Как обновить и удалить файлы](./how-to-update-files.md). Как получить уже загруженный файл, смотрите на странице нужного метода.

Права пользователя и [scope](../scopes/permissions.md), которые нужны для вызова, указаны в начале страницы каждого метода — проверяйте их перед загрузкой файла.

## Типы файловых полей

В Битрикс24 есть два типа файловых полей.

- **Файл.** Поле не связано с Диском. Файл передается прямо в поле — строкой в формате Base64 или массивом из имени файла и такой строки. Битрикс24 декодирует строку и сохраняет файл, а в поле остается `ID` файла.

- **Файл (диск).** Поле связано с Диском, в поле хранится `ID` объекта на Диске. Часть методов принимает Base64 и загружает файл на Диск сама — так работают поля типа «файл (диск)» в CRM. Если метод ожидает готовый `ID`, сначала загрузите файл на Диск, а потом передайте `ID` в поле. Подробнее — в разделе [Как передать файл в поле, связанное с Диском](#disk-field).

## Как кодировать файл в Base64

Base64 — стандарт кодирования, который представляет двоичные данные в виде текстовой строки. Кодирование нужно, чтобы передать файл через текстовые протоколы, например HTTP.

В JavaScript используйте встроенный объект [FileReader](https://www.w3.org/TR/FileAPI/). Код считывает файл, который выбрал пользователь, и преобразует его в Base64.

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

В PHP используйте функцию [base64_encode](https://www.php.net/manual/en/function.base64-encode.php). Код читает файл с диска и кодирует его в Base64.

```PHP
$filePath = 'path/to/your/file.jpg'; // Путь к файлу
$fileData = file_get_contents($filePath); // Читаем файл
$base64 = base64_encode($fileData); // Кодируем в base64
```

В результате кодирования получим строку вида `YmFzZSDRgtC10YHRgg==`. Чем больше размер файла, тем длиннее строка.

Учитывайте особенности формата.

- Строка в Base64 примерно на треть длиннее исходного файла: каждые 3 байта превращаются в 4 символа. Файл на 1,5 Мбайт займет в запросе около 2 Мбайт.

- Передавайте строку без префикса `data:image/png;base64,`. В примере на JavaScript префикс отсекается методом `split(',')[1]`.

- Проверяйте строку перед отправкой. Битрикс24 декодирует ее и сохраняет результат в файл как есть: из испорченной строки получится поврежденный файл, а из пустой — ошибка метода.

- Имя файла в большинстве форматов передается отдельно. Если передать только строку Base64 без имени, Битрикс24 сгенерирует имя автоматически — файл будет сложно опознать в интерфейсе.

## Как выбрать формат передачи {#formats}

Формат зависит от метода и от того, множественное поле или нет.

#|
|| **Метод** | **Один файл** | **Несколько файлов** ||
|| [documentgenerator.template.add](../document-generator/templates/document-generator-template-add.md) | [строка Base64](#string) в поле `file` | — ||
|| [crm.documentgenerator.template.add](../crm/document-generator/templates/crm-document-generator-template-add.md) | [строка Base64](#string) в поле `file` | — ||
|| [bizproc.workflow.template.add](../bizproc/template/bizproc-workflow-template-add.md) | [массив «имя — Base64»](#array) в поле `TEMPLATE_DATA` | — ||
|| [user.add](../user/user-add.md) | [массив «имя — Base64»](#array) в поле `PERSONAL_PHOTO` | — ||
|| [crm.item.add](../crm/universal/crm-item-add.md) | [массив «имя — Base64»](#array) в поле типа «файл» | [массив пар](#multiple-array) ||
|| [crm.timeline.comment.add](../crm/timeline/comments/crm-timeline-comment-add.md) | [массив пар](#multiple-array) из одного элемента в поле `FILES` | [массив пар](#multiple-array) в поле `FILES` ||
|| [log.blogpost.add](../log/log-blogpost-add.md) | [массив пар](#multiple-array) из одного элемента в поле `FILES` | [массив пар](#multiple-array) в поле `FILES` ||
|| [lists.element.add](../lists/elements/lists-element-add.md) | [массив «имя — Base64»](#array) в свойстве типа «файл» | [массив пар](#multiple-array) ||
|| [entity.item.add](../entity/items/entity-item-add.md) | [массив «имя — Base64»](#array) в свойстве типа «файл» | [массив пар](#multiple-array) ||
|| [crm.lead.add](../crm/leads/crm-lead-add.md), [crm.deal.add](../crm/deals/crm-deal-add.md), [crm.contact.add](../crm/contacts/crm-contact-add.md), [crm.company.add](../crm/companies/crm-company-add.md) | [объект `fileData`](#filedata) в поле типа «файл» | [массив объектов `fileData`](#multiple-filedata) ||
|| [catalog.product.add](../catalog/product/catalog-product-add.md) | [объект `fileData`](#filedata) в полях `previewPicture`, `detailPicture` | [массив объектов `value.fileData`](#multiple-value) ||
|| [disk.storage.uploadfile](../disk/storage/disk-storage-upload-file.md), [disk.folder.uploadfile](../disk/folder/disk-folder-upload-file.md), [disk.file.uploadversion](../disk/file/disk-file-upload-version.md) | [параметр `fileContent`](#filecontent) | — ||
|| [catalog.productImage.add](../catalog/product-image/catalog-product-image-add.md) | [параметр `fileContent`](#filecontent) | — ||
|| [telephony.externalCall.attachRecord](../telephony/telephony-external-call-attach-record.md) | [параметры `FILENAME` и `FILE_CONTENT`](#filename) | — ||
|#

Если нужного метода нет в таблице, формат смотрите в описании параметров на странице метода.

## Форматы передачи файла

{% include [Сноска о примерах](../../_includes/examples.md) %}

### Строка Base64 в поле file {#string}

Передавайте строку с Base64 в поле `file`. Имя файла в этом формате не передается.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Пример шаблона","file":"base64_encoded_content_here","code":"example_template_code"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.template.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Пример шаблона","file":"base64_encoded_content_here","code":"example_template_code"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.template.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'documentgenerator.template.add',
            {
                fields: {
                    name: "Пример шаблона",
                    file: "base64_encoded_content_here", // Контент файла, закодированный в base64
                    code: "example_template_code"
                }
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'documentgenerator.template.add',
                [
                    'fields' => [
                        'name' => 'Пример шаблона',
                        'file' => 'base64_encoded_content_here', // Контент файла, закодированный в base64
                        'code' => 'example_template_code'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding template: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
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

- PHP CRest

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

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "documentgenerator.template.add", b24.Params{
    	"fields": b24.Params{
    		"name": "Пример шаблона",
    		"file": "base64_encoded_content_here",
    		"code": "example_template_code",
    	},
    })
    if err != nil {
    	return fmt.Errorf("documentgenerator.template.add: %w", err)
    }

    var item struct {
    	ID        b24.ID `json:"ID"`
    	Name      string `json:"NAME"`
    	Type      string `json:"TYPE"`
    	StorageID b24.ID `json:"STORAGE_ID"`
    	FileID    b24.ID `json:"FILE_ID"`
    	Size      string `json:"SIZE"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

### Массив «имя файла — Base64» {#array}

Передавайте массив из двух элементов: первый — имя файла с расширением, второй — строка с Base64.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DOCUMENT_TYPE":["lists","BizprocDocument","iblock_164"],"NAME":"App template","TEMPLATE_DATA":["bp-379.bpt","base64_encoded_content_here"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/bizproc.workflow.template.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"DOCUMENT_TYPE":["lists","BizprocDocument","iblock_164"],"NAME":"App template","TEMPLATE_DATA":["bp-379.bpt","base64_encoded_content_here"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.workflow.template.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'bizproc.workflow.template.add',
            {
                DOCUMENT_TYPE: ['lists', 'BizprocDocument', 'iblock_164'],
                NAME: 'App template',
                TEMPLATE_DATA: [
                    "bp-379.bpt", // Первый элемент массива — имя файла
                    "base64_encoded_content_here" // Второй элемент массива — контент файла в base64
                ]
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'bizproc.workflow.template.add',
                [
                    'DOCUMENT_TYPE' => ['lists', 'BizprocDocument', 'iblock_164'],
                    'NAME'          => 'App template',
                    'TEMPLATE_DATA' => [
                        'bp-379.bpt', // Первый элемент массива — имя файла
                        'base64_encoded_content_here' // Второй элемент массива — контент файла в base64
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding workflow template: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'bizproc.workflow.template.add',
        {
            DOCUMENT_TYPE: ['lists', 'BizprocDocument', 'iblock_164'],
            NAME: 'App template',
            TEMPLATE_DATA: [
                "bp-379.bpt", // Первый элемент массива — имя файла
                "base64_encoded_content_here" // Второй элемент массива — контент файла в base64
            ]
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.template.add',
        [
            'DOCUMENT_TYPE' => ['lists', 'BizprocDocument', 'iblock_164'],
            'NAME' => 'App template',
            'TEMPLATE_DATA' => [
                'bp-379.bpt', // Имя файла
                'base64_encoded_content_here' // Контент файла в base64
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "bizproc.workflow.template.add", b24.Params{
    	"DOCUMENT_TYPE": []string{"lists", "BizprocDocument", "iblock_164"},
    	"NAME":          "App template",
    	"TEMPLATE_DATA": []string{"bp-379.bpt", "base64_encoded_content_here"},
    })
    if err != nil {
    	return fmt.Errorf("bizproc.workflow.template.add: %w", err)
    }

    var item struct {
    	ID        b24.ID `json:"ID"`
    	Name      string `json:"NAME"`
    	Type      string `json:"TYPE"`
    	StorageID b24.ID `json:"STORAGE_ID"`
    	FileID    b24.ID `json:"FILE_ID"`
    	Size      string `json:"SIZE"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

### Объект fileData {#filedata}

Передавайте объект с ключом `fileData`. В ключе — массив из имени файла и строки с Base64.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":"24","name":"Пример товара","previewPicture":{"fileData":["example.jpg","base64_encoded_content_here"]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":"24","name":"Пример товара","previewPicture":{"fileData":["example.jpg","base64_encoded_content_here"]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'catalog.product.add',
            {
                fields: {
                    iblockId: '24',
                    name: "Пример товара",
                    previewPicture: {
                        fileData: [
                            "example.jpg", // Имя файла изображения
                            "base64_encoded_content_here" // Контент изображения в base64
                        ]
                    }
                }
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.add',
                [
                    'fields' => [
                        'iblockId'       => '24',
                        'name'           => 'Пример товара',
                        'previewPicture' => [
                            'fileData' => [
                                'example.jpg', // Имя файла изображения
                                'base64_encoded_content_here' // Контент изображения в base64
                            ]
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding product: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.product.add',
        {
            fields: {
                iblockId: '24',
                name: "Пример товара",
                previewPicture: {
                    fileData: [
                        "example.jpg", // Имя файла изображения
                        "base64_encoded_content_here" // Контент изображения в base64
                    ]
                }
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.product.add',
        [
            'fields' => [
                'iblockId' => '24',
                'name' => 'Пример товара',
                'previewPicture' => [
                    'fileData' => [
                        'example.jpg', // Имя файла изображения
                        'base64_encoded_content_here' // Контент изображения в base64
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.add", b24.Params{
    	"fields": b24.Params{
    		"iblockId": "24",
    		"name":     "Пример товара",
    		"previewPicture": b24.Params{
    			"fileData": []string{"example.jpg", "base64_encoded_content_here"},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.add: %w", err)
    }

    var item struct {
    	ID        b24.ID `json:"ID"`
    	Name      string `json:"NAME"`
    	Type      string `json:"TYPE"`
    	StorageID b24.ID `json:"STORAGE_ID"`
    	FileID    b24.ID `json:"FILE_ID"`
    	Size      string `json:"SIZE"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

### Параметр fileContent {#filecontent}

Передавайте отдельный параметр `fileContent` с массивом из имени файла и строки с Base64. Параметр передается на верхнем уровне запроса, а не внутри `fields`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4,"fileContent":["1.gif","base64_encoded_content_here"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/disk.file.uploadversion
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":4,"fileContent":["1.gif","base64_encoded_content_here"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/disk.file.uploadversion
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'disk.file.uploadversion',
            {
                id: 4, // Идентификатор файла, для которого загружается новая версия
                fileContent: [
                    '1.gif', // Первый элемент массива — имя файла
                    'base64_encoded_content_here' // Второй элемент массива — контент файла в base64
                ]
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'disk.file.uploadversion',
                [
                    'id'          => 4, // Идентификатор файла, для которого загружается новая версия
                    'fileContent' => [
                        '1.gif', // Имя файла
                        'base64_encoded_content_here' // Контент файла в base64
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error uploading file version: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'disk.file.uploadversion',
        {
            id: 4, // Идентификатор файла, для которого загружается новая версия
            fileContent: [
                '1.gif', // Первый элемент массива — имя файла
                'base64_encoded_content_here' // Второй элемент массива — контент файла в base64
            ]
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'disk.file.uploadversion',
        [
            'id' => 4, // Идентификатор файла, для которого загружается новая версия
            'fileContent' => [
                '1.gif', // Имя файла
                'base64_encoded_content_here' // Контент файла в base64
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "disk.file.uploadversion", b24.Params{
    	"id":          4,
    	"fileContent": []string{"1.gif", "base64_encoded_content_here"},
    })
    if err != nil {
    	return fmt.Errorf("disk.file.uploadversion: %w", err)
    }

    var item struct {
    	ID        b24.ID `json:"ID"`
    	Name      string `json:"NAME"`
    	Type      string `json:"TYPE"`
    	StorageID b24.ID `json:"STORAGE_ID"`
    	FileID    b24.ID `json:"FILE_ID"`
    	Size      string `json:"SIZE"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

### Параметры FILENAME и FILE_CONTENT {#filename}

Метод [telephony.externalCall.attachRecord](../telephony/telephony-external-call-attach-record.md) принимает имя файла и его контент в двух отдельных параметрах: `FILENAME` и `FILE_CONTENT`.

Если передать `FILENAME` без `FILE_CONTENT`, метод вернет `uploadUrl` — по этому адресу файл загружается отдельным запросом. Такой способ подходит для больших записей разговоров.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CALL_ID":"externalCall.716f1cb73def9700a23842adf9c4c568.1773130779","FILENAME":"call-001.mp3","FILE_CONTENT":"base64_encoded_content_here"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/telephony.externalCall.attachRecord
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CALL_ID":"externalCall.716f1cb73def9700a23842adf9c4c568.1773130779","FILENAME":"call-001.mp3","FILE_CONTENT":"base64_encoded_content_here","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalCall.attachRecord
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'telephony.externalCall.attachRecord',
            {
                CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
                FILENAME: 'call-001.mp3', // Имя файла записи
                FILE_CONTENT: 'base64_encoded_content_here' // Контент записи в base64
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'telephony.externalCall.attachRecord',
                [
                    'CALL_ID'      => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
                    'FILENAME'     => 'call-001.mp3', // Имя файла записи
                    'FILE_CONTENT' => 'base64_encoded_content_here' // Контент записи в base64
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error attaching call record: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'telephony.externalCall.attachRecord',
        {
            CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            FILENAME: 'call-001.mp3', // Имя файла записи
            FILE_CONTENT: 'base64_encoded_content_here' // Контент записи в base64
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'telephony.externalCall.attachRecord',
        [
            'CALL_ID' => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            'FILENAME' => 'call-001.mp3', // Имя файла записи
            'FILE_CONTENT' => 'base64_encoded_content_here' // Контент записи в base64
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "telephony.externalCall.attachRecord", b24.Params{
    	"CALL_ID":      "externalCall.716f1cb73def9700a23842adf9c4c568.1773130779",
    	"FILENAME":     "call-001.mp3",
    	"FILE_CONTENT": "base64_encoded_content_here",
    })
    if err != nil {
    	return fmt.Errorf("telephony.externalCall.attachRecord: %w", err)
    }

    var item struct {
    	ID        b24.ID `json:"ID"`
    	Name      string `json:"NAME"`
    	Type      string `json:"TYPE"`
    	StorageID b24.ID `json:"STORAGE_ID"`
    	FileID    b24.ID `json:"FILE_ID"`
    	Size      string `json:"SIZE"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Как загрузить несколько файлов во множественное поле

Если у поля есть флаг «множественное», в него можно загрузить несколько файлов за один запрос. Формат зависит от метода — сверьтесь с колонкой «Несколько файлов» в таблице [Как выбрать формат](#formats).

Поле `FILES` в методах [crm.timeline.comment.add](../crm/timeline/comments/crm-timeline-comment-add.md) и [log.blogpost.add](../log/log-blogpost-add.md) всегда принимает массив, даже когда файл один. Файлы из этих методов сохраняются на Диск в служебную папку загруженных файлов.

### Массив пар «имя файла — Base64» {#multiple-array}

Передавайте массив, каждый элемент которого — массив из имени файла и строки с Base64.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"fields":{"title":"Новая сделка (специально для примера REST методов)","ufCrm_123456":[["green_pixel.png","base64_encoded_content_here"],["blue_pixel.png","base64_encoded_content_here"],["red_pixel.png","base64_encoded_content_here"]]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"fields":{"title":"Новая сделка (специально для примера REST методов)","ufCrm_123456":[["green_pixel.png","base64_encoded_content_here"],["blue_pixel.png","base64_encoded_content_here"],["red_pixel.png","base64_encoded_content_here"]]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.item.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'crm.item.add',
            {
                entityTypeId: 2,
                fields: {
                    title: "Новая сделка (специально для примера REST методов)",
                    ufCrm_123456: [ // Множественное поле с массивом файлов
                        [
                            "green_pixel.png", // Имя файла № 1
                            "base64_encoded_content_here" // Контент первого файла
                        ],
                        [
                            "blue_pixel.png", // Имя файла № 2
                            "base64_encoded_content_here" // Контент второго файла
                        ],
                        [
                            "red_pixel.png", // Имя файла № 3
                            "base64_encoded_content_here" // Контент третьего файла
                        ]
                    ]
                }
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.item.add',
                [
                    'entityTypeId' => 2,
                    'fields'       => [
                        'title'        => 'Новая сделка (специально для примера REST методов)',
                        'ufCrm_123456' => [ // Множественное поле с массивом файлов
                            [
                                'green_pixel.png', // Имя файла № 1
                                'base64_encoded_content_here' // Контент первого файла
                            ],
                            [
                                'blue_pixel.png', // Имя файла № 2
                                'base64_encoded_content_here' // Контент второго файла
                            ],
                            [
                                'red_pixel.png', // Имя файла № 3
                                'base64_encoded_content_here' // Контент третьего файла
                            ]
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding CRM item: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.item.add',
        {
            entityTypeId: 2,
            fields: {
                title: "Новая сделка (специально для примера REST методов)",
                ufCrm_123456: [ // Множественное поле с массивом файлов
                    [
                        "green_pixel.png", // Имя файла № 1
                        "base64_encoded_content_here" // Контент первого файла
                    ],
                    [
                        "blue_pixel.png", // Имя файла № 2
                        "base64_encoded_content_here" // Контент второго файла
                    ],
                    [
                        "red_pixel.png", // Имя файла № 3
                        "base64_encoded_content_here" // Контент третьего файла
                    ]
                ]
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.add',
        [
            'entityTypeId' => 2,
            'fields' => [
                'title' => 'Новая сделка (специально для примера REST методов)',
                'ufCrm_123456' => [
                    [
                        'green_pixel.png', // Имя файла № 1
                        'base64_encoded_content_here' // Контент первого файла
                    ],
                    [
                        'blue_pixel.png', // Имя файла № 2
                        'base64_encoded_content_here' // Контент второго файла
                    ],
                    [
                        'red_pixel.png', // Имя файла № 3
                        'base64_encoded_content_here' // Контент третьего файла
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.item.add", b24.Params{
    	"entityTypeId": 2,
    	"fields": b24.Params{
    		"title": "Новая сделка (специально для примера REST методов)",
    		"ufCrm_123456": []any{
    			[]string{"green_pixel.png", "base64_encoded_content_here"},
    			[]string{"blue_pixel.png", "base64_encoded_content_here"},
    			[]string{"red_pixel.png", "base64_encoded_content_here"},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.item.add: %w", err)
    }

    var item struct {
    	ID        b24.ID `json:"ID"`
    	Name      string `json:"NAME"`
    	Type      string `json:"TYPE"`
    	StorageID b24.ID `json:"STORAGE_ID"`
    	FileID    b24.ID `json:"FILE_ID"`
    	Size      string `json:"SIZE"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

### Массив объектов value.fileData {#multiple-value}

Передавайте массив объектов. В каждом объекте — поле `value` с ключом `fileData`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":1,"name":"Пример товара","PROPERTY_1077":[{"value":{"fileData":["blue_pixel.txt","YmFzZSDRgtC10YHRgg=="]}},{"value":{"fileData":["red_pixel.txt","YmFzZSDRgtC10YHRgg=="]}}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.product.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"iblockId":1,"name":"Пример товара","PROPERTY_1077":[{"value":{"fileData":["blue_pixel.txt","YmFzZSDRgtC10YHRgg=="]}},{"value":{"fileData":["red_pixel.txt","YmFzZSDRgtC10YHRgg=="]}}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.product.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
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
                                    "YmFzZSDRgtC10YHRgg==" // Контент файла в base64
                                ]
                            }
                        },
                        {
                            value: {
                                fileData: [
                                    "red_pixel.txt",
                                    "YmFzZSDRgtC10YHRgg=="
                                ]
                            }
                        }
                    ]
                }
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.product.add',
                [
                    'fields' => [
                        'iblockId'      => 1,
                        'name'          => 'Пример товара',
                        'PROPERTY_1077' => [
                            [
                                'value' => [
                                    'fileData' => [
                                        'blue_pixel.txt', // Имя файла
                                        'YmFzZSDRgtC10YHRgg==' // Контент файла в base64
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

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding product: ' . $e->getMessage();
    }
    ```

- BX24.js

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
                                "YmFzZSDRgtC10YHRgg==" // Контент файла в base64
                            ]
                        }
                    },
                    {
                        value: {
                            fileData: [
                                "red_pixel.txt",
                                "YmFzZSDRgtC10YHRgg=="
                            ]
                        }
                    }
                ]
            }
        }
    );
    ```

- PHP CRest

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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "catalog.product.add", b24.Params{
    	"fields": b24.Params{
    		"iblockId": 1,
    		"name":     "Пример товара",
    		"PROPERTY_1077": []b24.Params{
    			{
    				"value": b24.Params{
    					"fileData": []string{"blue_pixel.txt", "YmFzZSDRgtC10YHRgg=="},
    				},
    			},
    			{
    				"value": b24.Params{
    					"fileData": []string{"red_pixel.txt", "YmFzZSDRgtC10YHRgg=="},
    				},
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.product.add: %w", err)
    }

    var item struct {
    	ID        b24.ID `json:"ID"`
    	Name      string `json:"NAME"`
    	Type      string `json:"TYPE"`
    	StorageID b24.ID `json:"STORAGE_ID"`
    	FileID    b24.ID `json:"FILE_ID"`
    	Size      string `json:"SIZE"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

### Массив объектов fileData {#multiple-filedata}

Передавайте массив объектов, каждый объект содержит ключ `fileData` с именем файла и строкой Base64.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"Пример лида","UF_CRM_1711610801":[{"fileData":["file1.png","base64_encoded_content_here"]},{"fileData":["file2.png","base64_encoded_content_here"]}]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"TITLE":"Пример лида","UF_CRM_1711610801":[{"fileData":["file1.png","base64_encoded_content_here"]},{"fileData":["file2.png","base64_encoded_content_here"]}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.lead.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'crm.lead.add',
            {
                fields: {
                    TITLE: "Пример лида",
                    UF_CRM_1711610801: [
                        {
                            fileData: [
                                "file1.png", // Имя файла
                                "base64_encoded_content_here" // Контент файла в base64
                            ]
                        },
                        {
                            fileData: [
                                "file2.png",
                                "base64_encoded_content_here"
                            ]
                        }
                    ]
                }
            }
        );

        const result = response.getData().result;
        console.log(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.lead.add',
                [
                    'fields' => [
                        'TITLE'             => 'Пример лида',
                        'UF_CRM_1711610801' => [
                            [
                                'fileData' => [
                                    'file1.png', // Имя файла
                                    'base64_encoded_content_here' // Контент файла в base64
                                ]
                            ],
                            [
                                'fileData' => [
                                    'file2.png',
                                    'base64_encoded_content_here'
                                ]
                            ]
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding lead: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.lead.add',
        {
            fields: {
                TITLE: "Пример лида",
                UF_CRM_1711610801: [
                    {
                        fileData: [
                            "file1.png", // Имя файла
                            "base64_encoded_content_here" // Контент файла в base64
                        ]
                    },
                    {
                        fileData: [
                            "file2.png",
                            "base64_encoded_content_here"
                        ]
                    }
                ]
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.lead.add',
        [
            'fields' => [
                'TITLE' => 'Пример лида',
                'UF_CRM_1711610801' => [
                    [
                        'fileData' => [
                            'file1.png',
                            'base64_encoded_content_here'
                        ]
                    ],
                    [
                        'fileData' => [
                            'file2.png',
                            'base64_encoded_content_here'
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.lead.add", b24.Params{
    	"fields": b24.Params{
    		"TITLE": "Пример лида",
    		"UF_CRM_1711610801": []b24.Params{
    			{
    				"fileData": []string{"file1.png", "base64_encoded_content_here"},
    			},
    			{
    				"fileData": []string{"file2.png", "base64_encoded_content_here"},
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.lead.add: %w", err)
    }

    var item struct {
    	ID        b24.ID `json:"ID"`
    	Name      string `json:"NAME"`
    	Type      string `json:"TYPE"`
    	StorageID b24.ID `json:"STORAGE_ID"`
    	FileID    b24.ID `json:"FILE_ID"`
    	Size      string `json:"SIZE"`
    }
    if err := json.Unmarshal(res.Result, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Как передать файл в поле, связанное с Диском {#disk-field}

Поле типа «файл (диск)» хранит `ID` объекта на Диске. Если метод не принимает Base64 в такое поле, загрузка занимает два шага.

1. Загрузите файл на Диск методом [disk.folder.uploadfile](../disk/folder/disk-folder-upload-file.md) или [disk.storage.uploadfile](../disk/storage/disk-storage-upload-file.md) — файл передается в параметре [fileContent](#filecontent).

2. Возьмите `ID` из ответа и передайте его в поле объекта. Например, метод [tasks.task.file.attach](../tasks/tasks-task-file-attach.md) прикрепляет к задаче файл, который уже лежит на Диске.

Поля типа «файл (диск)» в CRM — исключение. Они принимают [объект `fileData`](#filedata) с Base64, а Битрикс24 сам сохраняет файл на Диск в служебную папку для файлов из REST.

## Что вернется в ответе

Методы `disk.*` возвращают объект файла на Диске: `ID`, имя, размер и ссылку на скачивание `DOWNLOAD_URL`.

```json
{
    "result": {
        "ID": 9035,
        "NAME": "picture.png",
        "TYPE": "file",
        "STORAGE_ID": "1357",
        "FILE_ID": 32895,
        "SIZE": "1679",
        "DOWNLOAD_URL": "https://your-domain.bitrix24.com/rest/download.json?auth=b8d880690000071b006e2cf2000004f5...",
        "DETAIL_URL": "https://your-domain.bitrix24.com/company/personal/user/1269/disk/file/picture.png"
    }
}
```

Методы, которые загружают файл в поле объекта, возвращают идентификатор созданного объекта, а не файла. Чтобы получить `ID` файла и ссылки на скачивание, запросите объект методом чтения — например, [crm.item.get](../crm/universal/crm-item-get.md). В файловом поле придет массив объектов.

```json
{
    "ufCrm_123456": [
        {
            "id": 30577,
            "url": "https://your-domain.bitrix24.com/bitrix/services/main/ajax.php?action=crm.controller.item.getFile&fileId=30577",
            "urlMachine": "https://your-domain.bitrix24.com/rest/crm.controller.item.getFile.json?auth=c2a8ad670000071b..."
        }
    ]
}
```

Эти `ID` понадобятся, когда файлы нужно будет [обновить или удалить](./how-to-update-files.md).

Чтобы скачать файл по ссылке `DOWNLOAD_URL` или `urlMachine`, выполните отдельный `GET`-запрос. Передавайте заголовки `User-Agent`, `Accept`, `Accept-Language` и `Referer` по правилам из статьи [Как выполняется запрос](../../settings/how-to-call-rest-api/general-principles.md#headers). Если HTTP-клиент не передает эти заголовки или подставляет технический `User-Agent`, файл может не скачаться, даже если ссылка подписана корректно.

## Ограничения при работе с файлами

- GET-запрос ограничен длиной URL-адреса — около 2048 символов. Это общее ограничение браузеров и веб-серверов, а не особенность Битрикс24. Строка Base64 почти всегда длиннее, поэтому передавайте файлы POST-запросом.

- Размер POST-запроса в облачном Битрикс24 ограничен настройками серверов — 2 Гбайт. Файл больше этого размера обработан не будет. Если в одном запросе передается несколько файлов суммарно больше лимита, запрос прервется — передавайте такие файлы отдельными запросами. Сверяйтесь с размером строки Base64, а не исходного файла: строка примерно на треть длиннее.

- В коробочной версии предел размера запроса задается настройками вашего сервера, а не Битрикс24. Уточняйте его у администратора портала.

- Ограничение на время выполнения запроса — 60 секунд для облачного Битрикс24. Запрос прервется по таймауту, если обработка занимает дольше. Проверить время выполнения можно в объекте [time](../data-types.md#time) ответа, параметр `duration`.

- Если метод выполняется GET-запросом в адресной строке или через cURL, строку Base64 нужно дополнительно [закодировать в urlencode](../../settings/how-to-call-rest-api/data-encoding.md), иначе файл не прочитается.

## Что дальше

- [Как обновить и удалить файлы](./how-to-update-files.md) — замена файла, удаление и сохранение остальных файлов множественного поля

- [Как работать с файлами](./index.md) — обзор раздела: типы полей, связь файлов с объектами Битрикс24 и основные методы

- [Кодирование данных](../../settings/how-to-call-rest-api/data-encoding.md) — как передавать данные в GET-запросах и cURL
