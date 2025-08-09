# Получить датасет по id biconnector.dataset.get

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Рабочее место аналитика»

Метод `biconnector.dataset.get` возвращает информацию о датасете по идентификатору.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор датасета, можно получить методами [biconnector.dataset.list](./biconnector-dataset-list.md) и [biconnector.dataset.add](./biconnector-dataset-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/biconnector.dataset.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":2,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/biconnector.dataset.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'biconnector.dataset.get',
    		{
    			id: 2,
    		}
    	);
    	
    	const result = response.getData().result;
    	result.error()
    		? console.error(result.error())
    		: console.info(result);
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
                'biconnector.dataset.get',
                [
                    'id' => 2,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting dataset: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'biconnector.dataset.get',
        {
            id: 2,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'biconnector.dataset.get',
        [
            'id' => 2
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
        "item": {
            "id": 2,
            "type": "rest",
            "name": "rest_dataset11111",
            "description": "new__2_",
            "externalCode": "extrnalCode",
            "externalName": "extranalName",
            "dateCreate": "2025-03-26 15:28:06",
            "dateUpdate": "2025-03-27 07:47:43",
            "createdById": 1,
            "updatedById": 1,
            "externalId": 275,
            "fields": [
                {"id": 224, "datasetId": 2, "type": "int", "name": "ID", "externalCode": "ID", "visible": true},
                {"id": 225, "datasetId": 2, "type": "string", "name": "NAME", "externalCode": "NAME", "visible": true},
                {"id": 226, "datasetId": 2, "type": "string", "name": "SURNAME", "externalCode": "SURNAME", "visible": true},
                {"id": 227, "datasetId": 2, "type": "double", "name": "SCORE", "externalCode": "SCORE", "visible": true},
                {"id": 228, "datasetId": 2, "type": "date", "name": "DATA", "externalCode": "DATA", "visible": true},
                {"id": 229, "datasetId": 2, "type": "datetime", "name": "TIME", "externalCode": "TIME", "visible": true}
            ]
        }
    },
    "time": {
        "start": 1743061675.963969,
        "finish": 1743061676.064591,
        "duration": 0.10062193870544434,
        "processing": 0.011152029037475586,
        "date_start": "2025-03-27T07:47:55+00:00",
        "date_finish": "2025-03-27T07:47:56+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`item`](../../data-types.md) | Корневой элемент ответа. Содержит информацию о полях датасета. Описание полей в статье [Датасеты: обзор методов](./index.md#dataset) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#    

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "VALIDATION_ID_NOT_PROVIDED",
    "error_description": "ID is missing."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `VALIDATION_ID_NOT_PROVIDED` | ID is missing. | Идентификатор не указан ||
|| `VALIDATION_INVALID_ID_FORMAT` | ID has to be a positive integer. | Неверный формат ID ||
|| `DATASET_NOT_FOUND` | Dataset was not found. | Датасет не найден ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./biconnector-dataset-add.md)
- [{#T}](./biconnector-dataset-update.md)
- [{#T}](./biconnector-dataset-fields-update.md)
- [{#T}](./biconnector-dataset-fields.md)
- [{#T}](./biconnector-dataset-list.md)
- [{#T}](./biconnector-dataset-delete.md)
