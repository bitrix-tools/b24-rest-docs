# Обновить документ crm.documentgenerator.document.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" документов генератора документов

Метод `crm.documentgenerator.document.update` обновляет существующий документ.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **values**
[`object`](../../data-types.md) | Объект со значениями полей документа.

Формат:

```json
{
    "field_1": "value_1",
    "field_2": "value_2"
}
```

где:
- `field_n` — код поля документа
- `value_n` — значение поля

Список доступных полей зависит от шаблона и документа.

Посмотреть поля можно методом [crm.documentgenerator.document.getfields](./crm-document-generator-document-get-fields.md) ||
|| **stampsEnabled**
[`integer`](../../data-types.md) | Подставлять печать и подпись:
- `1` — подставлять
- `0` — не подставлять

По умолчанию `1` ||
|#

{% note info "Особенность метода" %}

`pdfUrl` и `imageUrl` могут отсутствовать сразу после обновления, так как конвертация выполняется асинхронно. Проверяйте итоговое состояние через [crm.documentgenerator.document.get](./crm-document-generator-document-get.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример обновления документа, где:
- `id` документа — `61`
- новый номер документа — `2026-002`
- подстановка печатей включена

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":61,"values":{"DocumentNumber":"2026-002"},"stampsEnabled":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.document.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":61,"values":{"DocumentNumber":"2026-002"},"stampsEnabled":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.document.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.document.update',
    		{
    			id: 61,
    			values: {
    				DocumentNumber: '2026-002',
    			},
    			stampsEnabled: 1,
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
                'crm.documentgenerator.document.update',
                [
                    'id' => 61,
                    'values' => [
                        'DocumentNumber' => '2026-002',
                    ],
                    'stampsEnabled' => 1,
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
        echo 'Error updating document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.document.update',
        {
            id: 61,
            values: {
                DocumentNumber: '2026-002',
            },
            stampsEnabled: 1,
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
        'crm.documentgenerator.document.update',
        [
            'id' => 61,
            'values' => [
                'DocumentNumber' => '2026-002',
            ],
            'stampsEnabled' => 1,
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
            "number": "2026-002",
            "id": "61",
            "createTime": "2026-03-20T14:42:39+03:00",
            "createdBy": null,
            "updateTime": "2026-03-20T14:42:38+03:00",
            "updatedBy": 577,
            "stampsEnabled": true,
            "isTransformationError": false,
            "values": {
                "productsTableVariant": "",
                "_creationMethod": "rest",
                "stampsEnabled": true,
                "DocumentNumber": "2026-002"
            },
            "templateId": "39",
            "pullTag": "TRANSFORMDOCUMENT61",
            "imageUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getImage&SITE_ID=s1&id=61",
            "pdfUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getPdf&SITE_ID=s1&id=61",
            "emailDiskFile": 5611,
            "entityId": "101",
            "entityTypeId": "2",
            "downloadUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.download.json?..."
        }
    },
    "time": {
        "start": 1774006958,
        "finish": 1774006960.122164,
        "duration": 2.122164011001587,
        "processing": 2,
        "date_start": "2026-03-20T14:42:38+03:00",
        "date_finish": "2026-03-20T14:42:40+03:00",
        "operating_reset_at": 1774007558,
        "operating": 1.9965031147003174
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
[`object`](../../data-types.md) | Данные обновленного документа. Структура описана в типе [`document`](#document) ||
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
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор пользователя, создавшего документ ||
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
[`object`](../../data-types.md) | Значения полей документа после обновления ||
|| **imageUrl**
[`string`](../../data-types.md) | Ссылка на изображение документа, если уже создано ||
|| **pdfUrl**
[`string`](../../data-types.md) | Ссылка на PDF-файл документа, если уже создан ||
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
|| `100` | Bitrix\\DocumentGenerator\\Document constructor must be is public | Не передан обязательный параметр `id` ||
|| `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к документу ||
|| `0` | Документ не найден | Документ с указанным `id` не найден или недоступен ||
|| `0` | Document not found | Документ не относится к модулю CRM ||
|| `0` | You do not have permissions to modify this document | Недостаточно прав для изменения документа ||
|| `0` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|| `0` | Cant update not saved document | Попытка обновить несохраненный документ ||
|| `0` | DOCUMENT_FILE_NOT_PROCESSABLE_ERROR | Файл шаблона поврежден или имеет неверную структуру ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-document-add.md)
- [{#T}](./crm-document-generator-document-get.md)
- [{#T}](./crm-document-generator-document-get-fields.md)
- [{#T}](./crm-document-generator-document-list.md)
- [{#T}](./crm-document-generator-document-delete.md)
- [{#T}](../templates/crm-document-generator-template-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
