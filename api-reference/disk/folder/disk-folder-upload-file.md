# Загрузить новый файл в указанную папку disk.folder.uploadfile

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`disk`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `disk.folder.uploadfile` загружает новый файл в указанную папку.

## Параметры

#|
||  **Параметр** / **Тип**| **Описание** ||
|| **id**
[`unknown`](../../data-types.md) | Идентификатор папки. В текущем API загружать файл по пути к папке невозможно. Необходимо обязательно вычислить `ID` папки. ||
|| **fileContent**
[`unknown`](../../data-types.md) | Загрузка файла в формате [Base64](../../files/how-to-upload-files.md). ||
|| **data**
[`unknown`](../../data-types.md) | Массив, описывающий файл. Обязательное поле `NAME` — имя нового файла. Доступно отправка файла в виде строки, закодированной в base64. ||
|| **generateUniqueName**
[`unknown`](../../data-types.md) | Необязательный, по умолчанию `false`. При указании `true` для загружаемого файла будет уникализировано имя добавлением суффикса (1), (2) и т.п. Пример: avatar (1).jpg, avatar (2).jpg. ||
|| **rights**
[`unknown`](../../data-types.md) | Необязательный, по умолчанию пустой массив. Массив прав доступа на загружаемый файл. ||
|#

## Примеры

{% note info %}

Обратите внимание, что список доступных идентификаторов `TASK_ID` для установки прав можно получить методом [disk.rights.getTasks](../rights/disk-rights-get-tasks.md)

{% endnote %}

### Пример загрузки файла

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"disk.folder.uploadfile",
    		{
    			id: 4,
    			data: {
    				NAME: "avatar.jpg"
    			},
    			fileContent: document.getElementById('test_file_input'),
    			generateUniqueName: true,
    			rights: [
    				{
    					TASK_ID: 42,
    					ACCESS_CODE: 'U35' // доступ для пользователя с ID=35
    				},
    				{
    					TASK_ID: 38,
    					ACCESS_CODE: 'U2' // доступ для пользователя с ID=2
    				}
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
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
                'disk.folder.uploadfile',
                [
                    'id'               => 4,
                    'data'             => [
                        'NAME' => 'avatar.jpg',
                    ],
                    'fileContent'      => $_FILES['test_file_input'],
                    'generateUniqueName' => true,
                    'rights'           => [
                        [
                            'TASK_ID'     => 42,
                            'ACCESS_CODE' => 'U35', // доступ для пользователя с ID=35
                        ],
                        [
                            'TASK_ID'     => 38,
                            'ACCESS_CODE' => 'U2', // доступ для пользователя с ID=2
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error uploading file to folder: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "disk.folder.uploadfile",
        {
            id: 4,
            data: {
                NAME: "avatar.jpg"
            },
            fileContent: document.getElementById('test_file_input'),
            generateUniqueName: true,
            rights: [
                {
                    TASK_ID: 42,
                    ACCESS_CODE: 'U35' // доступ для пользователя с ID=35
                },
                {
                    TASK_ID: 38,
                    ACCESS_CODE: 'U2' // доступ для пользователя с ID=2
                }
            ]
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

### Пример прямой загрузки файла на Диск

1. Вызываем `/rest/disk.folder.uploadFile` и передаем методу только `ID` папки.
    ```
    disk.folder.uploadFile?auth=n2423m863oil59f99c9g0bm4918l5erz&id=289
    ```
2. В ответ получаем параметр `UploadUrl` и параметр `field`.
    ```json
    "result": {
    "field": "file",
    "uploadUrl": "http://b24.sigurd.bx/rest/upload.json?auth=n2423m863oil59f99c9g0bm4918l5erz&token=disk%7CaWQ9Mjg5Jl89QkYzazEzaXNnUjNHcVZQcDJZaGxGRmI4TGhXOG5EZXQ%3D%7CInVwbG9hZHxkaXNrfGFXUTlNamc1Smw4OVFrWXphekV6YVhOblVqTkhjVlpRY0RKWmFHeEdSbUk0VEdoWE9HNUVaWFE9fG4yNDIzbTg2M29pbDU5Zjk5YzlnMGJtNDkxOGw1ZXJ6Ig%3D%3D.Aga709nyY0%2BrFiv3laHjfg6XuOO5JT6ttjU%2F53ifphM%3D"
    }
    ```
3. На полученный `UploadUrl` посылаем POST-запрос в `multipart/form-data`, в котором передаем файл в поле с именем, полученном в параметре `field`.
    ```
    http --form POST "http://b24.sigurd.bx/rest/upload.json?auth=n2423m863oil59f99c9g0bm4918l5erz&token=disk%7CaWQ9Mjg5Jl89QkYzazEzaXNnUjNHcVZQcDJZaGxGRmI4TGhXOG5EZXQ%3D%7CInVwbG9hZHxkaXNrfGFXUTlNamc1Smw4OVFrWXphekV6YVhOblVqTkhjVlpRY0RKWmFHeEdSbUk0VEdoWE9HNUVaWFE9fG4yNDIzbTg2M29pbDU5Zjk5YzlnMGJtNDkxOGw1ZXJ6Ig%3D%3D.Aga709nyY0%2BrFiv3laHjfg6XuOO5JT6ttjU%2F53ifphM%3D" file@~/somelongfile.log
    ```
4. В ответ получаем данные о загруженном файле.
    ```json
    "result": {
    "CODE": null,
    "CREATED_BY": "1",
    "CREATE_TIME": "2016-03-30T14:30:41+02:00",
    "DELETED_BY": null,
    "DELETED_TYPE": 0,
    "DELETE_TIME": null,
    "DETAIL_URL": "http://b24.sigurd.bx/company/personal/user/1/disk/file/Тестируем REST/somelongfile.log",
    "DOWNLOAD_URL": "http://b24.sigurd.bx/rest/download.json?auth=n2423m863oil59f99c9g0bm4918l5erz&token=disk%7CaWQ9MjkwJl89ZTI4MG9TcDZCQno2MDAwVmV3cnRkbWxLM2hLN0JweEs%3D%7CImRvd25sb2FkfGRpc2t8YVdROU1qa3dKbDg5WlRJNE1HOVRjRFpDUW5vMk1EQXdWbVYzY25Sa2JXeExNMmhMTjBKd2VFcz18bjI0MjNtODYzb2lsNTlmOTljOWcwYm00OTE4bDVlcnoi.QlpUpx4mG9sxeyMyholPfdgkoXgc9kK9gtbOagqSo7s%3D",
    "FILE_ID": 209,
    "GLOBAL_CONTENT_VERSION": 1,
    "ID": 290,
    "NAME": "somelongfile.log",
    "PARENT_ID": "289",
    "SIZE": "496136787",
    "STORAGE_ID": "1",
    "TYPE": "file",
    "UPDATED_BY": "1",
    "UPDATE_TIME": "2016-03-30T14:30:43+02:00"
    }
    ```

### Как загрузить файл через `UploadUrl` на PHP

{% list tabs %}

- PHP (crest)

    ```php
    <?php
    require_once (__DIR__.'/crest.php');

    $path = __DIR__ . '/pic.jpg';
    $folderId = 1;

    $result = [];
    if (file_exists($path))
    {
        $file = CRest::call(
            'disk.folder.uploadfile',
            [
                'id' => $folderId,
            ]
        );
        if (!empty($file['result']['uploadUrl']))
        {
            $info = pathinfo($path);
            if ($info['basename'])
            {
                $delimiter = '-------------' . uniqid('', true);
                $name = $info['basename'];
                $mime = mime_content_type($path);
                $content = file_get_contents($path);

                $body = '--' . $delimiter. "\r\n";
                $body .= 'Content-Disposition: form-data; name="file"';
                $body .= '; filename="' . $name . '"' . "\r\n";
                $body .= 'Content-Type: ' . $mime . "\r\n\r\n";
                $body .= $content . "\r\n";
                $body .= "--" . $delimiter . "--\r\n";

                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $file['result']['uploadUrl']);
                curl_setopt($ch, CURLOPT_POST, 1);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $body);
                curl_setopt(
                    $ch,
                    CURLOPT_HTTPHEADER,
                    [
                        'Content-Type: multipart/form-data; boundary=' . $delimiter,
                        'Content-Length: ' . strlen($body),
                    ]
                );
                $out = curl_exec($ch);
                try
                {
                    $result = json_decode($out, true, 512, JSON_THROW_ON_ERROR);
                }
                catch (JsonException $e)
                {
                    $result = [
                        'error' => $e->getMessage(),
                    ];
                }
            }
        }
    }

    echo '<pre>';
        print_r($result);
    echo '</pre>';
    ?>
    ```

{% endlist %}

## Ответ в случае успеха

> 200 OK

В случае успеха возвращает структуру, аналогичную [disk.file.get](../file/disk-file-get.md).

## Продолжите изучение

- [{#T}](../../../tutorials/tasks/how-to-create-comment-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../../tutorials/tasks/how-to-upload-file-to-task.md)