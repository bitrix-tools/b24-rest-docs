# Получить поля документа crm.documentgenerator.document.getfields

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" документов генератора документов

Метод `crm.documentgenerator.document.getfields` возвращает карточку полей уже созданного документа: какие поля доступны, их текущие значения, значения по умолчанию и служебные признаки.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../data-types.md) | Идентификатор документа ||
|| **values**
[`object`](../../data-types.md) | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n
}
```

где:
- `field_n` — код поля документа
- `value_n` — значение поля

`values` — это временные подстановки поверх текущих значений документа. Метод берет данные документа, накладывает `values` и пересчитывает поля.

Это позволяет проверить результат без изменения самого документа. Например, если передать `values.DocumentNumber = "2026-001"`, в ответе поле `DocumentNumber` вернется со значением `2026-001`. Если не передавать `values`, для того же поля вернется текущее значение документа, например `1`.

Если `values` не передавать, метод вернет карточку полей на основе текущих данных документа и логики шаблона ||
|#

### Параметр values {#parameter-values-fields}

Состав ключей `values` зависит от шаблона, который использовался для создания документа, поэтому в разных документах может отличаться.

#|
|| **Название**
`тип` | **Описание** ||
|| **DocumentNumber**
[`string`](../../data-types.md) | Номер документа ||
|| **DocumentCreateTime**
[`string`](../../data-types.md) | Дата генерации ||
|| **DocumentTitle**
[`string`](../../data-types.md) | Название документа ||
|| **ClientPhone**
[`string`](../../data-types.md) | Телефон клиента ||
|| **ClientEmail**
[`string`](../../data-types.md) | Email клиента ||
|| **ProductsProductName**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Название товара ||
|| **ProductsProductQuantity**
[`array`](../../data-types.md) \| [`string`](../../data-types.md) | Количество ||
|| **TotalSum**
[`string`](../../data-types.md) | Общая сумма ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения полей документа, где:
- идентификатор документа — `101`
- значение поля `DocumentNumber` — `2026-001`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":101,"values":{"DocumentNumber":"2026-001"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.document.getfields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":101,"values":{"DocumentNumber":"2026-001"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.document.getfields
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.documentgenerator.document.getfields',
    		{
    			id: 101,
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
                'crm.documentgenerator.document.getfields',
                [
                    'id' => 101,
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
        echo 'Error getting document fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.document.getfields',
        {
            id: 101,
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
        'crm.documentgenerator.document.getfields',
        [
            'id' => 101,
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
        "documentFields": {
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
        "start": 1773909500,
        "finish": 1773909500.192341,
        "duration": 0.19234108924865723,
        "processing": 0,
        "date_start": "2026-03-19T11:38:20+03:00",
        "date_finish": "2026-03-19T11:38:20+03:00",
        "operating_reset_at": 1773910100,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа. Содержит объект [`result`](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentFields**
[`object`](../../data-types.md) | Объект полей документа, где ключом является код поля, а значением — структура [`documentField`](#documentfield) ||
|#

#### Тип documentField {#documentfield}

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название поля ||
|| **value**
[`string`](../../data-types.md) \| [`array`](../../data-types.md) \| [`null`](../../data-types.md) | Текущее значение поля ||
|| **default**
[`string`](../../data-types.md) \| [`null`](../../data-types.md) | Значение поля по умолчанию ||
|| **required**
[`char`](../../data-types.md) | Признак обязательности поля: `Y` или `N` ||
|| **type**
[`string`](../../data-types.md) | Тип поля, например `IMAGE` ||
|| **group**
[`array`](../../data-types.md) | Группы, к которым относится поле ||
|| **chain**
[`string`](../../data-types.md) \| [`array`](../../data-types.md) | Путь поля в провайдере данных, например `this.SOURCE.MY_COMPANY.UF_LOGO` ||
|| **format**
[`object`](../../data-types.md) | Параметры форматирования поля, например `{"currencyId":"RUB","withZeros":true}` ||
|| **options**
[`object`](../../data-types.md) | Дополнительные параметры поля, например `{"isArray":true}` ||
|| **hideRow**
[`char`](../../data-types.md) | Служебный признак скрытия строки: `Y` или `N` ||
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
|| `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к документу или недостаточно прав для работы с документами генератора ||
|| `0` | Документ не найден | Документ с указанным `id` не найден или недоступен ||
|| `Пустое значение` | You do not have permissions to modify documents | Недостаточно прав для изменения документов генератора ||
|| `Пустое значение` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-document-add.md)
- [{#T}](./crm-document-generator-document-update.md)
- [{#T}](./crm-document-generator-document-get.md)
- [{#T}](./crm-document-generator-document-list.md)
- [{#T}](./crm-document-generator-document-delete.md)
- [{#T}](../templates/crm-document-generator-template-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
