# Получить документ crm.documentgenerator.document.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "просмотра" документов генератора документов

Метод `crm.documentgenerator.document.get` возвращает данные документа по его идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../data-types.md) | Идентификатор документа ||
|#

{% note info "Особенность метода" %}

`pdfUrl` и `imageUrl` могут отсутствовать сразу после создания или обновления документа, так как конвертация выполняется асинхронно. Если ссылки нужны сразу, повторите запрос через 30-40 секунд.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения документа с идентификатором `61`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":61}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.document.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":61,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.document.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.document.get',
    		{
    			id: 61,
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
                'crm.documentgenerator.document.get',
                [
                    'id' => 61,
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
        echo 'Error getting document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.document.get',
        {
            id: 61,
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
        'crm.documentgenerator.document.get',
        [
            'id' => 61,
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
            "downloadUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.download&SITE_ID=s1&id=61",
            "publicUrl": null,
            "title": "Демонстрационная реализация товара 2026-001",
            "number": "2026-001",
            "id": "61",
            "createTime": "2026-03-20T13:51:45+03:00",
            "createdBy": "577",
            "updateTime": "2026-03-20T13:51:45+03:00",
            "updatedBy": null,
            "stampsEnabled": true,
            "isTransformationError": false,
            "values": {
                "productsTableVariant": "",
                "_creationMethod": "rest",
                "stampsEnabled": true
            },
            "templateId": "39",
            "pullTag": "TRANSFORMDOCUMENT61",
            "imageUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getImage&SITE_ID=s1&id=61",
            "pdfUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getPdf&SITE_ID=s1&id=61",
            "emailDiskFile": 5609,
            "entityId": "101",
            "entityTypeId": "2",
            "downloadUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.download.json?...",
            "imageUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.getImage.json?...",
            "pdfUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.getPdf.json?..."
        }
    },
    "time": {
        "start": 1774006578,
        "finish": 1774006578.790473,
        "duration": 0.7904729843139648,
        "processing": 0,
        "date_start": "2026-03-20T14:36:18+03:00",
        "date_finish": "2026-03-20T14:36:18+03:00",
        "operating_reset_at": 1774007178,
        "operating": 0.23765993118286133
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Возвращает объект [`result`](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **document**
[`object`](../../data-types.md) | Данные документа. Структура описана в типе [`document`](#document) ||
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
[`datetime`](../../data-types.md) | Дата создания документа ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата обновления документа ||
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
|| **imageUrl**
[`string`](../../data-types.md) | Ссылка на изображение документа. Может быть пустой строкой сразу после создания или обновления ||
|| **imageUrlMachine**
[`string`](../../data-types.md) | Ссылка на изображение документа для машинного доступа ||
|| **pdfUrl**
[`string`](../../data-types.md) | Ссылка на PDF-документ. Может быть пустой строкой сразу после создания или обновления ||
|| **pdfUrlMachine**
[`string`](../../data-types.md) | Ссылка на PDF-документ для машинного доступа ||
|| **publicUrl**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Публичная ссылка на документ ||
|| **isTransformationError**
[`boolean`](../../data-types.md) | Признак ошибки конвертации документа ||
|| **transformationErrorMessage**
[`string`](../../data-types.md) | Текст ошибки конвертации, если `isTransformationError = true` ||
|| **transformationErrorCode**
[`string`](../../data-types.md) | Код ошибки конвертации, если `isTransformationError = true` ||
|| **templateId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор шаблона документа ||
|| **pullTag**
[`string`](../../data-types.md) | Тег события трансформации документа ||
|| **emailDiskFile**
[`integer`](../../data-types.md) | Идентификатор файла на Диске для отправки по email ||
|| **entityTypeId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор типа CRM-объекта ||
|| **entityId**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Идентификатор CRM-объекта ||
|| **values**
[`object`](../../data-types.md) | Значения полей документа ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DOCGEN_ACCESS_ERROR",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к документу ||
|| `0` | Документ не найден | Документ с указанным `id` не найден или недоступен ||
|| `Пустое значение` | Document not found | Документ не относится к модулю `crm` ||
|| `100` | Bitrix\\DocumentGenerator\\Document constructor must be is public | Не передан обязательный параметр `id` ||
|| `Пустое значение` | You do not have permissions to view documents | Недостаточно прав для просмотра документов генератора ||
|| `Пустое значение` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-document-add.md)
- [{#T}](./crm-document-generator-document-update.md)
- [{#T}](./crm-document-generator-document-get-fields.md)
- [{#T}](./crm-document-generator-document-list.md)
- [{#T}](./crm-document-generator-document-delete.md)
- [{#T}](../templates/crm-document-generator-template-get.md)
