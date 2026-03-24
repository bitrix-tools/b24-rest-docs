# Создать новый документ crm.documentgenerator.document.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" документов генератора документов

Метод `crm.documentgenerator.document.add` создает документ по шаблону для CRM-объекта.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId**^*^
[`integer`](../../data-types.md) | Идентификатор шаблона документа ||
|| **entityTypeId**^*^
[`integer`](../../data-types.md) | Идентификатор типа CRM-объекта, для которого создается документ.

Типичные значения:
- `1` — лид
- `2` — сделка
- `3` — контакт
- `4` — компания
- `5` — счет (старая версия)
- `7` — коммерческое предложение
- `31` — счет

Для смарт-процессов передается их `entityTypeId`, например `177` ||
|| **entityId**^*^
[`integer`](../../data-types.md) | Идентификатор CRM-объекта, по данным которого создается документ ||
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

Набор ключей зависит от конкретного шаблона и провайдера данных. Посмотреть доступные поля можно методом [crm.documentgenerator.document.getfields](./crm-document-generator-document-get-fields.md) ||
|| **stampsEnabled**
[`integer`](../../data-types.md) | Подставлять печать и подпись:
- `1` — подставлять
- `0` — не подставлять

По умолчанию `0` ||
|| **fields**
[`object`](../../data-types.md) | Дополнительные описания полей документа для генерации.

Параметр `fields` используется для более точечной настройки полей. В большинстве сценариев достаточно параметра `values`.

В `fields` передается объект-описание поля (descriptor). Пример:

```json
{
    "DocumentTitle": {
        "title": "Название документа",
        "value": "Демонстрационная реализация товара 1",
        "required": "Y",
        "default": "Демонстрационная реализация товара 1",
        "chain": [
            {},
            "getTitle"
        ],
        "VALUE": "Тест через fields"
    }
}
```

Список ключей `fields` не фиксированный и зависит от шаблона.

Как получить доступные параметры:
- до создания документа — [crm.documentgenerator.template.getfields](../templates/crm-document-generator-template-get-fields.md), поле `templateFields`
- для созданного документа — [crm.documentgenerator.document.getfields](./crm-document-generator-document-get-fields.md), поле `documentFields`

Служебные поля `SOURCE` и `DOCUMENT` игнорируются.

Некоторые вычисляемые поля могут не переопределяться через `fields` ||
|#

{% note info "Особенность метода" %}

`pdfUrl` и `imageUrl` могут отсутствовать сразу после создания, так как конвертация выполняется асинхронно. Для проверки результата используйте [crm.documentgenerator.document.get](./crm-document-generator-document-get.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример создания документа, где:
- `templateId` — `39`
- `entityTypeId` — `2` (сделка)
- `entityId` — `101`
- номер документа подставляется через `values.DocumentNumber`
- для `fields.DocumentTitle` передается descriptor-объект поля

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":39,"entityTypeId":2,"entityId":101,"values":{"DocumentNumber":"2026-001"},"fields":{"DocumentTitle":{"title":"Название документа","value":"Демонстрационная реализация товара 1","required":"Y","default":"Демонстрационная реализация товара 1","chain":[{},"getTitle"],"VALUE":"Тест через fields"}},"stampsEnabled":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.document.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"templateId":39,"entityTypeId":2,"entityId":101,"values":{"DocumentNumber":"2026-001"},"fields":{"DocumentTitle":{"title":"Название документа","value":"Демонстрационная реализация товара 1","required":"Y","default":"Демонстрационная реализация товара 1","chain":[{},"getTitle"],"VALUE":"Тест через fields"}},"stampsEnabled":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.document.add
    ```

- JS

    ```js
    try
    {
    		const response = await $b24.callMethod(
    			'crm.documentgenerator.document.add',
    			{
    				templateId: 39,
    				entityTypeId: 2,
    				entityId: 101,
    				values: {
    					DocumentNumber: '2026-001',
    				},
    				fields: {
    					DocumentTitle: {
    						title: 'Название документа',
    						value: 'Демонстрационная реализация товара 1',
    						required: 'Y',
    						default: 'Демонстрационная реализация товара 1',
    						chain: [{}, 'getTitle'],
    						VALUE: 'Тест через fields',
    					},
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
                'crm.documentgenerator.document.add',
                [
                    'templateId' => 39,
                    'entityTypeId' => 2,
                    'entityId' => 101,
                    'values' => [
                        'DocumentNumber' => '2026-001',
                    ],
                    'fields' => [
                        'DocumentTitle' => [
                            'title' => 'Название документа',
                            'value' => 'Демонстрационная реализация товара 1',
                            'required' => 'Y',
                            'default' => 'Демонстрационная реализация товара 1',
                            'chain' => [
                                [],
                                'getTitle',
                            ],
                            'VALUE' => 'Тест через fields',
                        ],
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
        echo 'Error adding document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.document.add',
        {
            templateId: 39,
            entityTypeId: 2,
            entityId: 101,
            values: {
                DocumentNumber: '2026-001',
            },
            fields: {
                DocumentTitle: {
                    title: 'Название документа',
                    value: 'Демонстрационная реализация товара 1',
                    required: 'Y',
                    default: 'Демонстрационная реализация товара 1',
                    chain: [{}, 'getTitle'],
                    VALUE: 'Тест через fields',
                }
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
        'crm.documentgenerator.document.add',
        [
            'templateId' => 39,
            'entityTypeId' => 2,
            'entityId' => 101,
            'values' => [
                'DocumentNumber' => '2026-001',
            ],
            'fields' => [
                'DocumentTitle' => [
                    'title' => 'Название документа',
                    'value' => 'Демонстрационная реализация товара 1',
                    'required' => 'Y',
                    'default' => 'Демонстрационная реализация товара 1',
                    'chain' => [
                        [],
                        'getTitle',
                    ],
                    'VALUE' => 'Тест через fields',
                ],
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
            "downloadUrlMachine": "https://bitrix.bitrix24.ru/rest/crm.documentgenerator.document.download.json?...",
            "publicUrl": null,
            "id": 61,
            "title": "Демонстрационная реализация товара 2026-001",
            "number": "2026-001",
            "createTime": "2026-03-20T13:51:45+03:00",
            "createdBy": 577,
            "updateTime": "2026-03-20T13:51:45+03:00",
            "updatedBy": null,
            "stampsEnabled": true,
            "isTransformationError": false,
            "values": {
                "productsTableVariant": "",
                "_creationMethod": "rest",
                "stampsEnabled": true,
                "DocumentNumber": "2026-001"
            },
            "templateId": "39",
            "pullTag": "TRANSFORMDOCUMENT61",
            "imageUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getImage&SITE_ID=s1&id=61",
            "pdfUrl": "https://bitrix.bitrix24.ru/bitrix/services/main/ajax.php?action=crm.documentgenerator.document.getPdf&SITE_ID=s1&id=61",
            "emailDiskFile": 5605,
            "entityId": "101",
            "entityTypeId": "2"
        }
    },
    "time": {
        "start": 1774003904,
        "finish": 1774003905.448804,
        "duration": 1.4488039016723633,
        "processing": 1,
        "date_start": "2026-03-20T13:51:44+03:00",
        "date_finish": "2026-03-20T13:51:45+03:00",
        "operating_reset_at": 1774004504,
        "operating": 0.9240179061889648
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
[`object`](../../data-types.md) | Данные созданного документа. Структура описана в типе [`document`](#document) ||
|#

#### Тип document {#document}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **title**
[`string`](../../data-types.md) | Название документа ||
|| **number**
[`string`](../../data-types.md) | Номер документа ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата создания ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата обновления ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего документ ||
|| **updatedBy**
[`integer`](../../data-types.md) \| [`null`](../../data-types.md) | Идентификатор пользователя, обновившего документ ||
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
[`integer`](../../data-types.md) | Идентификатор шаблона ||
|| **pullTag**
[`string`](../../data-types.md) | Тег события трансформации документа ||
|| **emailDiskFile**
[`integer`](../../data-types.md) | Идентификатор файла в Диске для отправки по email ||
|| **entityTypeId**
[`integer`](../../data-types.md) | Идентификатор типа CRM-объекта ||
|| **entityId**
[`integer`](../../data-types.md) | Идентификатор CRM-объекта ||
|| **values**
[`object`](../../data-types.md) | Значения полей документа, переданные при создании ||
|| **imageUrl**
[`string`](../../data-types.md) | Ссылка на изображение документа, если уже создано ||
|| **pdfUrl**
[`string`](../../data-types.md) | Ссылка на PDF-файл документа, если уже создан ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "No provider for entityTypeId"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | No provider for entityTypeId | Не найден провайдер данных для переданного `entityTypeId` ||
|| `0` | Empty required parameter "value" | Не передан или передан пустой `entityId` ||
|| `0` | Cannot create document on deleted template | Нельзя создать документ по удаленному шаблону ||
|| `0` | Cannot create document | Ошибка при создании документа по шаблону ||
|| `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к созданию документа ||
|| `DOCGEN_LIMIT_ERROR` | Maximum count of documents has been reached | Превышен лимит количества документов в тарифе ||
|| `0` | Error getting next number | Не удалось получить следующий номер документа из нумератора ||
|| `100` | Bitrix\\DocumentGenerator\\Template constructor must be is public | Низкоуровневая ошибка при вызове без корректного `templateId` ||
|| `0` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|| `0` | Шаблон не найден | Шаблон с указанным `templateId` не найден или недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-document-get.md)
- [{#T}](./crm-document-generator-document-update.md)
- [{#T}](./crm-document-generator-document-get-fields.md)
- [{#T}](./crm-document-generator-document-list.md)
- [{#T}](./crm-document-generator-document-delete.md)
- [{#T}](../templates/crm-document-generator-template-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
