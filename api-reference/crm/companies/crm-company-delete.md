# Удалить компанию crm.company.delete

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Удаление» компаний

{% note warning "Развитие метода остановлено" %}

Метод `crm.company.delete` продолжает работать, но у него есть более актуальный аналог [crm.item.delete](../universal/crm-item-delete.md).

{% endnote %}

Метод `crm.company.delete` удаляет компанию.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор компании ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":50}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":50,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.company.delete
    ```

- JS

    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.company.delete",
    		{ id: id }
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.info(result);
    }
    catch(error)
    {
    	console.error('Error:', error);
    }
    ```

- PHP

    ```php
    $id = readline("Введите ID");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.company.delete',
                [
                    'id' => $id,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting company: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.company.delete",
        { id: id },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.company.delete',
        [
            'ID' => 50
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
    "result": true,
    "time": {
        "start": 1769497083,
        "finish": 1769497084.786988,
        "duration": 1.7869880199432373,
        "processing": 1,
        "date_start": "2026-01-27T09:58:03+03:00",
        "date_finish": "2026-01-27T09:58:04+03:00",
        "operating_reset_at": 1769497683,
        "operating": 1.564450979232788
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Корневой элемент ответа, возвращает `true` в случае успеха ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `Access denied` | У пользователя нет права на «Удаление» компаний ||
|| `-` | `Company is not found` | Компания не найдена ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-company-add.md)
- [{#T}](./crm-company-update.md)
- [{#T}](./crm-company-get.md)
- [{#T}](./crm-company-list.md)
- [{#T}](./crm-company-fields.md)

