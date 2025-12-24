# Изменить документ складского учета catalog.document.update

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Cоздание и редактирование» на нужный тип документа

Метод `catalog.document.update` изменяет поля существующего документа складского учета. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`catalog_document.id`](../data-types.md#catalog_document) | Идентификатор документа, можно получить методом [catalog.document.list](./catalog-document-list.md) ||
|| **fields***
[`object`](#fields) | Поля документа ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **responsibleId**
[`user.id`](../../data-types.md) | Идентификатор ответственного ||
|| **dateModify**
[`datetime`](../../data-types.md) | Можно передать собственную дату изменения. По умолчанию — текущая дата ||
|| **dateDocument**
[`datetime`](../../data-types.md) | Дата проведения документа ||
|| **total**
[`double`](../../data-types.md) | Общая сумма по товарам документа. Пересчитывается автоматически после изменения товарных позиций ||
|| **commentary**
[`char`](../../data-types.md) | Комментарий к документу ||
|| **title**
[`string`](../../data-types.md) | Название документа ||
|| **docNumber**
[`string`](../../data-types.md) | Внутренний номер документа ||
|| **modifiedBy**
[`user.id`](../../data-types.md) | Идентификатор пользователя, изменившего документ. Администратор может указать любое значение, по умолчанию заполняется текущим пользователем ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":142,"fields":{"title":"Поступление от Поставщик-1 (корректировка)","commentary":"Обновили ответсвенного","responsibleId":21}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.document.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":142,"fields":{"title":"Поступление от Поставщик-1 (корректировка)","commentary":"Обновили ответсвенного","responsibleId":21},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'catalog.document.update',
            {
                id: 142,
                fields: {
                    title: 'Поступление от Поставщик-1 (корректировка)',
                    commentary: 'Обновили ответсвенного',
                    responsibleId: 21,
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Updated document with ID:', result);
        
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
                'catalog.document.update',
                [
                    'id' => 142,
                    'fields' => [
                        'title' => 'Поступление от Поставщик-1 (корректировка)',
                        'commentary' => 'Обновили ответсвенного',
                        'responsibleId' => 21
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
        echo 'Error updating document: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.update',
        {
            id: 142,
            fields: {
                title: 'Поступление от Поставщик-1 (корректировка)',
                commentary: 'Обновили ответсвенного',
                responsibleId: 21
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
        'catalog.document.update',
        [
            'id' => 142,
            'fields' => [
                'title' => 'Поступление от Поставщик-1 (корректировка)',
                'commentary' => 'Обновили ответсвенного',
                'responsibleId' => 21
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
            "commentary": "Обновили ответсвенного",
            "createdBy": 29,
            "currency": "RUB",
            "dateCreate": "2025-10-30T11:19:38+03:00",
            "dateDocument": null,
            "dateModify": "2025-10-30T11:33:42+03:00",
            "dateStatus": "2025-10-30T11:19:38+03:00",
            "docNumber": "IN-00042",
            "docType": "A",
            "id": 11,
            "modifiedBy": 29,
            "responsibleId": 21,
            "siteId": "s1",
            "status": "N",
            "statusBy": null,
            "title": "Поступление от Поставщик-1 (корректировка)",
            "total": null
        }
    },
    "time": {
        "start": 1761806022,
        "finish": 1761806022.36133,
        "duration": 0.3613300323486328,
        "processing": 0,
        "date_start": "2025-10-30T09:33:42+03:00",
        "date_finish": "2025-10-30T09:33:42+03:00",
        "operating_reset_at": 1761806622,
        "operating": 0.17665815353393555
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md#catalog_document) | Корневой элемент ответа ||
|| **document**
[`catalog_document`](../data-types.md#catalog_document) | Объект с обновленными данными документа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Документ не найден."
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Недостаточно прав для сохранения документа | У пользователя нет права на редактирование документа нужного типа или документ с таким идентификатором не существует ||
|| `0` | Складской учет недоступен на вашем тарифе | Складской учет недоступен на вашем тарифе ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-element/catalog-document-element-update.md)
- [{#T}](../documentcontractor/catalog-documentcontractor-add.md)
- [{#T}](./catalog-document-cancel.md)
- [{#T}](./catalog-document-add.md)
- [{#T}](./catalog-document-conduct.md)


