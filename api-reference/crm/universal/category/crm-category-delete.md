# Удалить воронку crm.category.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с административным доступом к разделу CRM

Метод удаляет воронку (направление) с идентификатором `id`.

{% note warning "Не получится удалить:" %}

* Воронки по умолчанию
* Воронки у которых есть хотя бы один элемент

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](./../../index.md) или [пользовательского типа](./../user-defined-object-types/index.md) сущности CRM у которой будет удалена воронка   ||
|| **id***
[`integer`][1] | Идентификатор удаляемой воронки. Можно получить методом [`crm.category.list`](./crm-category-list.md) или при создании воронки методом [`crm.category.add`](./crm-category-add.md) ||
|#

## Примеры кода

Удалить воронку с `id = 5`, находящуюся в сделках.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":5}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.category.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":5,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.category.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.category.delete',
    		{
    			entityTypeId: 2,
    			id: 5,
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.category.delete',
                [
                    'entityTypeId' => 2,
                    'id'          => 5,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting category: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "crm.category.delete",
        {
            entityTypeId: 2,
            id: 5,
        },
        (result) => 
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.category.delete',
        [
            'entityTypeId' => 2,
            'id' => 5
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
    "result": null,
    "time": {
        "start": 1718288046.047386,
        "finish": 1718288046.892514,
        "duration": 0.845128059387207,
        "processing": 0.4207921028137207,
        "date_start": "2024-06-13T16:14:06+02:00",
        "date_finish": "2024-06-13T16:14:06+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`null`][1] | Корневой элемент ответа, равный `null` ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **160**, **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `NOT_FOUND` | Смарт-процесс не найден | Возникает при некорректных значениях `entityTypeId` ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | Entity type `{entityTypeName}` is not supported | Возникает, если объект CRM не поддерживает воронки ||
|| `NOT_FOUND` | Элемент не найден | Возникает, если удаляемой воронки не существует ||
|| `REMOVING_DISABLED` | Удаление системной категории запрещено | Возникает, при попытке удалить системную воронку ||
|| `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя, удаляющего воронку, недостаточно прав ||
|| `0` | Найдены сделки, относящиеся к воронке `{categoryName}` | Возникает, если у удаляемой воронки есть хотя бы один элемент. Актуально только для `сделок` ||
|| `0` | Default deal category can not be deleted | Возникает при попытке удалить воронку по умолчанию. Актуально только для `сделок` ||
|| `BX_ERROR` | Найдены элементы, относящиеся к воронке | Возникает, если у удаляемой воронки есть хотя бы один элемент. Актуально для `смарт-процессов` ||
|| `BX_ERROR` | Эта воронка является воронкой по умолчанию | Возникает при попытке удалить воронку по умолчанию. Актуально для `смарт-процессов` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-category-add.md)
- [{#T}](./crm-category-update.md)
- [{#T}](./crm-category-get.md)
- [{#T}](./crm-category-list.md)
- [{#T}](./crm-category-fields.md)

[1]: ../../../data-types.md
