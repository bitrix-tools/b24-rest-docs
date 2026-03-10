# Удалить настройку шаблона регулярной сделки crm.deal.recurring.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «удаления» сделок

Метод `crm.deal.recurring.delete` удаляет существующую настройку для шаблона регулярной сделки. Он подходит, когда нужно удалить запись о шаблоне регулярной сделки, если связанная сделка уже отсутствует. 

Для удаления шаблона регулярной сделки можно использовать метод [crm.deal.delete](../crm-deal-delete.md). При его использовании удаляется сделка и настроенный шаблон регулярности.   

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id^*^**
[`integer`](../../../data-types.md) | Идентификатор настройки шаблона регулярной сделки.

Идентификатор можно получить с помощью методов [crm.deal.recurring.list](./crm-deal-recurring-list.md) или [crm.deal.recurring.add](./crm-deal-recurring-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.recurring.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.recurring.delete
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.recurring.delete',
    		{
    			id: 15,
    		}
    	);
    
    	const result = response.getData().result;
    	console.info('Настройка шаблона удалена:', result);
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
                'crm.deal.recurring.delete',
                [
                    'id' => 15,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . var_export($result->data(), true);
        }

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting recurring deal setting: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.recurring.delete',
        {
            id: 15
        },
        function(result)
        {
            if (result.error())
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
        'crm.deal.recurring.delete',
        [
            'id' => 15
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
        "start": 1772759802,
        "finish": 1772759802.471347,
        "duration": 0.4713470935821533,
        "processing": 0.10933709144592285,
        "date_start": "2026-03-06T04:16:42+03:00",
        "date_finish": "2026-03-06T04:16:42+03:00",
        "operating_reset_at": 1772760402,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Для успешного удаления возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Deleting is impossible. Connected recurring deal exists."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `id is not defined or invalid` | В параметр `id` передано пустое или некорректное значение ||
|| `Recurring is not allowed` | Регулярные сделки недоступны в Битрикс24 ||
|| `Recurring deal is not found` | Шаблон регулярной сделки не найден ||
|| `Deleting is impossible. Connected recurring deal exists` | Нельзя удалить настройку, пока существует связанная сделка-шаблон ||
|| `Access denied` | Недостаточно прав для удаления сделок ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-deal-recurring-fields.md)
- [{#T}](./crm-deal-recurring-get.md)
- [{#T}](./crm-deal-recurring-list.md)
- [{#T}](./crm-deal-recurring-add.md)
- [{#T}](./crm-deal-recurring-update.md)
- [{#T}](./crm-deal-recurring-expose.md)
