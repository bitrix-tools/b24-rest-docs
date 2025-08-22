# Получить воронку по Id crm.category.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом доступа к воронке «Чтение»

Метод получает информацию о воронке (направлении) с идентификатором `id`.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md) объекта CRM у которого мы желаем получить воронку ||
|| **id***
[`integer`][1] | Идентификатор воронки. Можно получить методом [`crm.category.list`](./crm-category-list.md) или при создании воронки методом [`crm.category.add`](./crm-category-add.md) ||
|#

## Примеры кода

Как получить информацию о воронке с `id` = `1`, находящейся в сделках.

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":1}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.category.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"id":1,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.category.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.category.get',
    		{
    			entityTypeId: 2,
    			id: 1,
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
                'crm.category.get',
                [
                    'entityTypeId' => 2,
                    'id'          => 1,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Info: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting category: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.category.get",
        {
            entityTypeId: 2,
            id: 1,
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
        'crm.category.get',
        [
            'entityTypeId' => 2,
            'id' => 1
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
        "category": {
            "id": 1,
            "name": "Новая воронка #1",
            "sort": 200,
            "entityTypeId": 2,
            "isDefault": "N",
            "originId": "",
            "originatorId": ""
        }
    },
    "time": {
        "start": 1718291429.253404,
        "finish": 1718291429.654617,
        "duration": 0.4012131690979004,
        "processing": 0.025265216827392578,
        "date_start": "2024-06-13T17:10:29+02:00",
        "date_finish": "2024-06-13T17:10:29+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`][1] | Корневой элемент ответа. Содержит объект [`category`](./crm-category-add.md#category) ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

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
|| `NOT_FOUND` | Смарт-процесс не найден | Возникает, при некорректных значениях `entityTypeId` ||
|| `ENTITY_TYPE_NOT_SUPPORTED` | Entity type `{entityTypeName}` is not supported | Возникает, если объект CRM не поддерживает воронки ||
|| `NOT_FOUND` | Элемент не найден | Возникает, если воронки с такими параметрами не существует ||
|| `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя нет прав просматривать элементы данной воронки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./crm-category-add.md)
- [{#T}](./crm-category-update.md)
- [{#T}](./crm-category-list.md)
- [{#T}](./crm-category-delete.md)
- [{#T}](./crm-category-fields.md)

[1]: ../../../data-types.md
