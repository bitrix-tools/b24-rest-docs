# Получить поля шаблона документа crm.documentgenerator.template.getfields

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.template.getfields` возвращает карточку полей шаблона: какие поля доступны, их текущие значения, значения по умолчанию и служебные признаки.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../data-types.md) | Идентификатор шаблона ||
|| **entityTypeId**^*^
[`integer`](../../data-types.md) | Идентификатор типа CRM-элемента. Нужен для выбора провайдера данных ||
|| **entityId**
[`integer`](../../data-types.md) | Идентификатор CRM-элемента, данные которого будут использованы для вычисления значений полей ||
|| **values**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля
- `value_n` — значение поля

`values` — это временные подстановки поверх данных CRM. Метод берет данные по `entityTypeId` и `entityId`, затем накладывает значения из `values` и пересчитывает поля шаблона.

Это позволяет проверить результат без изменения данных в CRM. Например, если передать `values.DocumentNumber = "2026-001"`, в ответе поле `DocumentNumber` вернется уже с этим значением.

Если `values` не передавать, метод вернет карточку полей на основе исходных данных CRM и логики шаблона
||
|#

### Параметр values {#parameter-values-fields}

Состав ключей `values` определяется шаблоном, провайдером данных и контекстом (`entityTypeId`, `entityId`), поэтому в разных сценариях может отличаться.

#|
|| **Название**
`тип` | **Описание** ||
|| **MyCompanyRequisiteRqCompanyName**
[`string`](../../data-types.md) | Сокращенное наименование организации ||
|| **MyCompanyRequisiteRegisteredAddressText**
[`string`](../../data-types.md) | Полный адрес ||
|| **MyCompanyPhone**
[`string`](../../data-types.md) | Телефон ||
|| **MyCompanyEmail**
[`string`](../../data-types.md) | E-mail ||
|| **MyCompanyWeb**
[`string`](../../data-types.md) | Сайт ||
|| **MyCompanyUfLogo**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Логотип ||
|| **RequisiteRqCompanyName**
[`string`](../../data-types.md) | Сокращенное наименование организации ||
|| **RequisiteRegisteredAddressText**
[`string`](../../data-types.md) | Полный адрес ||
|| **ClientPhone**
[`string`](../../data-types.md) | Телефон ||
|| **ClientEmail**
[`string`](../../data-types.md) | Email ||
|| **ClientWeb**
[`string`](../../data-types.md) | Сайт ||
|| **DocumentNumber**
[`string`](../../data-types.md) | Номер ||
|| **DocumentCreateTime**
[`string`](../../data-types.md) | Дата генерации ||
|| **ProductsIndex**
[`string`](../../data-types.md) | Текущий номер ||
|| **ProductsProductName**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Название ||
|| **ProductsProductQuantity**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Количество ||
|| **ProductsProductMeasureName**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Единицы измерения ||
|| **ProductsProductPriceRaw**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Исходная цена ||
|| **ProductsProductPriceRawSum**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Сумма исходной цены ||
|| **TotalRaw**
[`string`](../../data-types.md) | Сумма исходных цен ||
|| **TaxesTaxTitle**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Заголовок ||
|| **TaxesTaxRate**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Ставка ||
|| **TaxesTaxValue**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Сумма ||
|| **TotalSum**
[`string`](../../data-types.md) | Общая сумма ||
|| **MyCompanyAssignedName**
[`string`](../../data-types.md) | Имя ||
|| **MyCompanyAssignedLastName**
[`string`](../../data-types.md) | Фамилия ||
|| **MyCompanyAssignedPersonalPhone**
[`string`](../../data-types.md) | Телефон ||
|| **MyCompanyAssignedEmail**
[`string`](../../data-types.md) | E-Mail ||
|| **DocumentTitle**
[`string`](../../data-types.md) | Название документа ||
|| **MY_COMPANY**
[`array`](../../data-types.md) | Моя компания ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения полей шаблона документа, где:
- идентификатор шаблона — `1`
- идентификатор типа CRM-элемента — `2` (сделка)
- идентификатор CRM-элемента — `123`
- значение поля `DocumentNumber` — `2026-001`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"entityTypeId":2,"entityId":123,"values":{"DocumentNumber":"2026-001"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.template.getfields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"entityTypeId":2,"entityId":123,"values":{"DocumentNumber":"2026-001"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.template.getfields
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.template.getfields',
    		{
    			id: 1,
    			entityTypeId: 2,
    			entityId: 123,
    			values: {
    				DocumentNumber: '2026-001',
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
                'crm.documentgenerator.template.getfields',
                [
                    'id' => 1,
                    'entityTypeId' => 2,
                    'entityId' => 123,
                    'values' => [
                        'DocumentNumber' => '2026-001',
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
        echo 'Error getting template fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.template.getfields',
        {
            id: 1,
            entityTypeId: 2,
            entityId: 123,
            values: {
                DocumentNumber: '2026-001',
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
        'crm.documentgenerator.template.getfields',
        [
            'id' => 1,
            'entityTypeId' => 2,
            'entityId' => 123,
            'values' => [
                'DocumentNumber' => '2026-001',
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
        "templateFields": {
            "DocumentNumber": {
                "title": "Номер",
                "value": "2026-001",
                "required": "Y",
                "group": [
                    "Документ"
                ],
                "chain": "this.DOCUMENT.DOCUMENT_NUMBER",
                "default": "2026-001"
            },
            "MyCompanyUfLogo": {
                "title": "Логотип",
                "value": null,
                "type": "IMAGE",
                "group": [
                    "Документ",
                    "Моя компания"
                ],
                "chain": "this.SOURCE.MY_COMPANY.UF_LOGO",
                "default": null
            },
            "MY_COMPANY": {
                "title": "Моя компания",
                "value": [
                    {
                        "value": "340",
                        "title": "Колесо Фортуны",
                        "selected": true
                    },
                    {
                        "value": "358",
                        "title": "Битрикс-Разработка",
                        "selected": false
                    }
                ],
                "group": [
                    "Документ",
                    "Моя компания"
                ]
            }
        }
    },
    "time": {
        "start": 1773821944,
        "finish": 1773821944.196063,
        "duration": 0.19606304168701172,
        "processing": 0,
        "date_start": "2026-03-18T11:19:04+03:00",
        "date_finish": "2026-03-18T11:19:04+03:00",
        "operating_reset_at": 1773822544,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит объект [`templateFields`](#templatefields) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateFields**
[`object`](../../data-types.md) | Объект полей шаблона, где ключом является код поля, а значением — структура [`templateField`](#templatefield) ||
|#

#### Тип templateField {#templatefield}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название поля ||
|| **value**
[`string`](../../data-types.md) \| [`array`](../../data-types.md) | Текущее значение поля ||
|| **default**
[`string`](../../data-types.md) | Значение поля по умолчанию ||
|| **required**
[`char`](../../data-types.md) | Признак обязательности поля: `Y` или `N` ||
|| **type**
[`string`](../../data-types.md) | Тип поля, например `IMAGE` ||
|| **group**
[`array`](../../data-types.md) | Группы, к которым относится поле ||
|| **chain**
[`string`](../../data-types.md) | Путь поля в провайдере данных, например `this.SOURCE.MY_COMPANY.UF_LOGO` ||
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
|| `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к шаблону или недостаточно прав для работы с шаблонами генератора документов ||
|| `0` | Шаблон не найден | Шаблон с указанным `id` не найден или недоступен ||
|| `100` | Bitrix\\DocumentGenerator\\Template constructor must be is public | Не передан обязательный параметр ||
|| `Пустое значение` | Cannot get fields from deleted template | Нельзя получить поля удаленного шаблона ||
|| `Пустое значение` | You do not have permissions to modify templates | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-template-add.md)
- [{#T}](./crm-document-generator-template-update.md)
- [{#T}](./crm-document-generator-template-get.md)
- [{#T}](./crm-document-generator-template-list.md)
- [{#T}](./crm-document-generator-template-delete.md)
- [{#T}](../documents/crm-document-generator-document-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
