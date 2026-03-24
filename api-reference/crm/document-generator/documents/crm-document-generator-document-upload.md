# Загрузить сформированный документ и прикрепить его к указанному CRM-объекту crm.documentgenerator.document.upload

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" документов генератора документов

Метод `crm.documentgenerator.document.upload` загружает готовый документ и прикрепляет его к CRM-объекту.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields**^*^
[`object`](../../data-types.md) | Объект с параметрами загрузки документа [(подробнее)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId**^*^
[`integer`](../../data-types.md) | Идентификатор типа CRM-объекта.

Типичные значения:
- `1` — лид
- `2` — сделка
- `3` — контакт
- `4` — компания
- `7` — коммерческое предложение

Для смарт-процессов передается их `entityTypeId`, например `177` ||
|| **entityId**^*^
[`integer`](../../data-types.md) | Идентификатор CRM-объекта, к которому прикрепляется документ ||
|| **fileContent**^*^
[`string`](../../data-types.md) | Содержимое DOCX-файла в формате base64.

Подробнее: [Как загружать файлы](../../../files/how-to-upload-files.md) ||
|| **region**^*^
[`string`](../../data-types.md) | Код региона шаблона, например `ru` ||
|| **title**^*^
[`string`](../../data-types.md) | Название документа ||
|| **number**^*^
[`string`](../../data-types.md) | Номер документа ||
|| **pdfContent**
[`string`](../../data-types.md) | Содержимое PDF-файла в формате base64.

Подробнее: [Как загружать файлы](../../../files/how-to-upload-files.md) ||
|| **imageContent**
[`string`](../../data-types.md) | Содержимое изображения в формате base64.

Подробнее: [Как загружать файлы](../../../files/how-to-upload-files.md) ||
|#

{% note info "Особенности метода" %}

`pdfUrl` и `imageUrl` могут отсутствовать сразу после загрузки, так как конвертация выполняется асинхронно. Для проверки результата используйте [crm.documentgenerator.document.get](./crm-document-generator-document-get.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример загрузки документа, где:
- `entityTypeId` — `2` (сделка)
- `entityId` — `101`
- `region` — `ru`
- название документа — `Демонстрационная реализация товара`
- номер документа — `2026-001`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"entityTypeId":2,"entityId":101,"fileContent":"**base64_docx_content**","region":"ru","title":"Демонстрационная реализация товара","number":"2026-001","pdfContent":"**base64_pdf_content**","imageContent":"**base64_image_content**"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.document.upload
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"entityTypeId":2,"entityId":101,"fileContent":"**base64_docx_content**","region":"ru","title":"Демонстрационная реализация товара","number":"2026-001","pdfContent":"**base64_pdf_content**","imageContent":"**base64_image_content**"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.document.upload
    ```

- JS

    ```js
    try
    {
    		const response = await $b24.callMethod(
    			'crm.documentgenerator.document.upload',
    			{
    				fields: {
    					entityTypeId: 2,
    					entityId: 101,
    					fileContent: '**base64_docx_content**',
    					region: 'ru',
    					title: 'Демонстрационная реализация товара',
    					number: '2026-001',
    					pdfContent: '**base64_pdf_content**',
    					imageContent: '**base64_image_content**',
    				},
    			}
    		);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
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
                'crm.documentgenerator.document.upload',
                [
                    'fields' => [
                        'entityTypeId' => 2,
                        'entityId' => 101,
                        'fileContent' => '**base64_docx_content**',
                        'region' => 'ru',
                        'title' => 'Демонстрационная реализация товара',
                        'number' => '2026-001',
                        'pdfContent' => '**base64_pdf_content**',
                        'imageContent' => '**base64_image_content**',
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
        echo 'Error uploading document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.document.upload',
        {
            fields: {
                entityTypeId: 2,
                entityId: 101,
                fileContent: '**base64_docx_content**',
                region: 'ru',
                title: 'Демонстрационная реализация товара',
                number: '2026-001',
                pdfContent: '**base64_pdf_content**',
                imageContent: '**base64_image_content**',
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.documentgenerator.document.upload',
        [
            'fields' => [
                'entityTypeId' => 2,
                'entityId' => 101,
                'fileContent' => '**base64_docx_content**',
                'region' => 'ru',
                'title' => 'Демонстрационная реализация товара',
                'number' => '2026-001',
                'pdfContent' => '**base64_pdf_content**',
                'imageContent' => '**base64_image_content**',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "document": {
            "changeStampsEnabled": false,
            "changeStampsDisabledReason": "В шаблоне нет печатей и подписей",
            "changeQrCodeEnabled": false,
            "qrCodeEnabled": false,
            "changeQrCodeDisabledReason": "В шаблоне нет QR-кода",
            "products": {
                "currencyId": "UAH",
                "totalSum": "0.00",
                "totalRows": 0
            },
            "downloadUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.download&SITE_ID=s1&id=63",
            "publicUrl": null,
            "title": "Демонстрационная реализация товара",
            "number": "2026-001",
            "id": "63",
            "createTime": "2026-03-20T17:08:24+03:00",
            "createdBy": "577",
            "updateTime": "2026-03-20T17:08:24+03:00",
            "updatedBy": null,
            "stampsEnabled": false,
            "isTransformationError": false,
            "values": {
                "productsTableVariant": "",
                "_creationMethod": "rest"
            },
            "templateId": "55",
            "pullTag": "TRANSFORMDOCUMENT63",
            "emailDiskFile": 5619,
            "entityId": "101",
            "entityTypeId": "2",
            "downloadUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.download.json?auth=***&token=***"
        }
    },
    "time": {
        "start": 1774015704,
        "finish": 1774015705.08562,
        "duration": 1.0856199264526367,
        "processing": 1,
        "date_start": "2026-03-20T17:08:24+03:00",
        "date_finish": "2026-03-20T17:08:25+03:00",
        "operating_reset_at": 1774016304,
        "operating": 1.0284008979797363
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой объект ответа. Содержит структуру [`result`](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **document**
[`object`](../../data-types.md) | Данные загруженного документа. Структура описана в типе [`document`](#document) ||
|#

#### Тип document {#document}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор документа ||
|| **title**
[`string`](../../data-types.md) | Название документа ||
|| **number**
[`string`](../../data-types.md) | Номер документа ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата создания ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата обновления ||
|| **createdBy**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор пользователя, создавшего документ ||
|| **updatedBy**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор пользователя, обновившего документ ||
|| **changeStampsEnabled**
[`boolean`](../../data-types.md) | Можно ли изменить признак подстановки печати и подписи ||
|| **changeStampsDisabledReason**
[`string`](../../data-types.md) | Причина, почему нельзя изменить признак подстановки печати и подписи ||
|| **changeQrCodeEnabled**
[`boolean`](../../data-types.md) | Можно ли включить или выключить QR-код ||
|| **qrCodeEnabled**
[`boolean`](../../data-types.md) | Текущее состояние QR-кода ||
|| **changeQrCodeDisabledReason**
[`string`](../../data-types.md) | Причина, почему нельзя изменить QR-код ||
|| **products**
[`object`](../../data-types.md) | Сводная информация по товарам документа (`currencyId`, `totalSum`, `totalRows`) ||
|| **stampsEnabled**
[`boolean`](../../data-types.md) | Признак подстановки печати и подписи ||
|| **downloadUrl**
[`string`](../../data-types.md) | Ссылка на скачивание документа ||
|| **downloadUrlMachine**
[`string`](../../data-types.md) | Ссылка на скачивание документа для машинного доступа ||
|| **publicUrl**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Публичная ссылка на документ ||
|| **isTransformationError**
[`boolean`](../../data-types.md) | Признак ошибки конвертации документа ||
|| **transformationErrorMessage**
[`string`](../../data-types.md) | Текст ошибки конвертации, если `isTransformationError = true` ||
|| **transformationErrorCode**
[`string`](../../data-types.md) | Код ошибки конвертации, если `isTransformationError = true` ||
|| **templateId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор шаблона ||
|| **pullTag**
[`string`](../../data-types.md) | Тег события трансформации документа ||
|| **emailDiskFile**
[`integer`](../../data-types.md) | Идентификатор файла в Диске для отправки по email ||
|| **entityTypeId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор типа CRM-объекта ||
|| **entityId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор CRM-объекта ||
|| **values**
[`object`](../../data-types.md) \| [`null`](../../data-types.md) | Значения полей документа ||
|| **imageUrl**
[`string`](../../data-types.md) | Ссылка на изображение документа, если уже создано ||
|| **pdfUrl**
[`string`](../../data-types.md) | Ссылка на PDF-файл документа, если уже создан ||
|| **imageUrlMachine**
[`string`](../../data-types.md) | Ссылка на изображение документа для машинного доступа ||
|| **pdfUrlMachine**
[`string`](../../data-types.md) | Ссылка на PDF-документ для машинного доступа ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Invalid value {} to match with parameter {fields}. Should be value of type array."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `100` | Invalid value {} to match with parameter {fields}. Should be value of type array. | Параметр `fields` передан не в формате объекта ||
|| `0` | Empty required fields: entityTypeId, fileContent, region, entityId | Не переданы обязательные поля в `fields` ||
|| `0` | Empty required fields: fileContent | Не передано обязательное поле `fields.fileContent` ||
|| `0` | Wrong "entityTypeId" field value | Передан некорректный `fields.entityTypeId` ||
|| `0` | No provider for entityTypeId | Для `fields.entityTypeId` не найден подходящий CRM-провайдер ||
|| `0` | Wrong "entityId" field value | Передан некорректный `fields.entityId` ||
|| `0` | Missing file content | Не передан или не прочитан `fields.fileContent` ||
|| `0` | Could not save file | Не удалось сохранить загруженный файл ||
|| `0` | Module crm is not installed | Модуль `crm` недоступен на этапе DG-обработки ||
|| `0` | Wrong provider ... | Некорректно определен провайдер документа ||
|| `0` | Application not found | Не удалось определить текущее REST-приложение ||
|| `0` | Error generating file for template | Не удалось создать служебный файл для скрытого шаблона ||
|| `0` | Error getting template | Не удалось получить или создать скрытый шаблон для загрузки ||
|| `Пустое значение` | You do not have permissions to view documents | Недостаточно прав на просмотр документов ||
|| `Пустое значение` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-document-add.md)
- [{#T}](./crm-document-generator-document-get.md)
- [{#T}](./crm-document-generator-document-update.md)
- [{#T}](./crm-document-generator-document-list.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
