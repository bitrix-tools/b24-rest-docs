# Создать документ складского учета catalog.document.add

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Cоздание и редактирование» на нужный тип документа

Метод `catalog.document.add` создает новый документ складского учета. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](#fields) | Поля документа ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **docType***
[`char`](../../data-types.md) | Тип документа. Возможные значения:
- `A` — поступление,
- `S` — оприходование,
- `M` — перемещение между складами,
- `R` — возврат,
- `D` — списание.

Актуальные типы документов можно получить методом [catalog.enum.getStoreDocumentTypes](../enum/catalog-enum-get-store-document-types.md) ||
|| **currency***
[`crm_currency.CURRENCY`](../../crm/data-types.md#crm_currency) | Валюта документа в формате ISO 4217, например `RUB`. Значение нельзя изменить после создания. 

Чтобы получить список валют с кодами используйте метод [crm.currency.list](../../crm/currency/crm-currency-list.md) ||
|| **responsibleId***
[`user.id`](../../data-types.md) | Идентификатор ответственного ||
|| **siteId**
[`char`](../../data-types.md) | Код сайта, к которому относится документ. По умолчанию — `s1`. 

Параметр актуален для коробочных Битрикс, для облачных Битрикс значение стандратное — `s1` ||
|| **dateDocument**
[`datetime`](../../data-types.md) | Дата проведения документа в формате ISO 8601 ||
|| **title**
[`string`](../../data-types.md) | Название документа ||
|| **commentary**
[`char`](../../data-types.md) | Комментарий к документу ||
|| **total**
[`double`](../../data-types.md) | Общая сумма по товарам документа. Значение рассчитывается автоматически после проведения, но может быть задано вручную ||
|| **docNumber**
[`string`](../../data-types.md) | Внутренний номер документа. Если не передать, генерируется автоматически ||
|| **createdBy**
[`user.id`](../../data-types.md) | Идентификатор пользователя, создавшего документ. Администратор может указать любое значение, по умолчанию заполняется текущим пользователем ||
|#

{% note info "" %}

Чтобы заполнить данные о поставщике, используйте метод [catalog.documentcontractor.add](../documentcontractor/catalog-documentcontractor-add.md).
Чтобы заполнить данные по товарам, используйте метод [catalog.document.element.add](./document-element/catalog-document-element-add.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docType":"A","currency":"RUB","responsibleId":29,"docNumber":"IN-00042","title":"Поступление от Поставщик-1","commentary":"Плановое пополнение склада"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.document.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docType":"A","currency":"RUB","responsibleId":29,"docNumber":"IN-00042","title":"Поступление от Поставщик-1","commentary":"Плановое пополнение склада"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.add
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'catalog.document.add',
            {
                fields: {
                    docType: 'A',
                    currency: 'RUB',
                    responsibleId: 29,
                    docNumber: 'IN-00042',
                    title: 'Поступление от Поставщик-1',
                    commentary: 'Плановое пополнение склада',
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Created element with ID:', result);
        
        processResult(result);
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
            'catalog.document.add',
            [
                'fields' => [
                    'docType' => 'A',
                    'currency' => 'RUB',
                    'responsibleId' => 29,
                    'docNumber' => 'IN-00042',
                    'title' => 'Поступление от Поставщик-1',
                    'commentary' => 'Плановое пополнение склада'
                ]
            ]
        );

    $result = $response
        ->getResponseData()
        ->getResult();

    echo 'Success: ' . print_r($result, true);
    processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding product row: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.add',
        {
            fields: {
                docType: 'A',
                currency: 'RUB',
                responsibleId: 29,
                docNumber: 'IN-00042',
                title: 'Поступление от Поставщик-1',
                commentary: 'Плановое пополнение склада'
            }
        },
        function(result)
        {
            if (result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.document.add',
        [
            'fields' => [
                'docType' => 'A',
                'currency' => 'RUB',
                'responsibleId' => 29,
                'docNumber' => 'IN-00042',
                'title' => 'Поступление от Поставщик-1',
                'commentary' => 'Плановое пополнение склада'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "document": {
            "commentary": "Плановое пополнение склада",
            "createdBy": 29,
            "currency": "RUB",
            "dateCreate": "2025-10-30T11:19:38+03:00",
            "dateDocument": null,
            "dateModify": "2025-10-30T11:19:38+03:00",
            "dateStatus": "2025-10-30T11:19:38+03:00",
            "docNumber": "IN-00042",
            "docType": "A",
            "id": 11,
            "modifiedBy": 29,
            "responsibleId": 29,
            "siteId": "s1",
            "status": "N",
            "statusBy": null,
            "title": "Поступление от Поставщик-1",
            "total": null
        }
    },
    "time": {
        "start": 1761805178,
        "finish": 1761805178.991429,
        "duration": 0.9914290904998779,
        "processing": 0,
        "date_start": "2025-10-30T09:19:38+03:00",
        "date_finish": "2025-10-30T09:19:38+03:00",
        "operating_reset_at": 1761805778,
        "operating": 0.2595658302307129
    }
}
```

{% note info "" %}

Документ создается в статусе `N` — черновик. Чтобы провести документ, используйте метод [catalog.document.conduct](./catalog-document-conduct.md) или [catalog.document.conductList](./catalog-document-conduct-list.md).

{% endnote %}

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md#catalog_document) | Корневой элемент ответа ||
|| **document**
[`catalog_document`](../data-types.md#catalog_document) | Объект с данными созданного документа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "DOC_TYPE isn't available"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Недостаточно прав для сохранения документа | У пользователя нет права на создание документа нужного типа ||
|| `0` | DOC_TYPE isn't available | Передан недопустимый тип документа ||
|| `0` | Складской учет недоступен на вашем тарифе | Складской учет недоступен на вашем тарифе ||
|| `0` | -  | Иные внутренние ошибки при добавлении документа ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-element/catalog-document-element-add.md)
- [{#T}](../documentcontractor/catalog-documentcontractor-add.md)
- [{#T}](./catalog-document-update.md)
- [{#T}](./catalog-document-conduct.md)

