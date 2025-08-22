# Удалить пользовательский тип crm.type.delete

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с административным доступом к разделу CRM

Метод удаляет существующий смарт-процесс по идентификатору `id`.

Удалить смарт-процесс возможно, только если к нему нет ни одного привязанного элемента. Если такие элементы есть, необходимо сначала их удалить, а уже потом удалять смарт-процесс.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`][1] | Идентификатор смарт-процесса. Можно получить с помощью методов: [`crm.type.list`](./crm-type-list.md), [`crm.type.add`](./crm-type-add.md) ||
|#

## Примеры кода

Удалить смарт-процесс с `id = 16`

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":16}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.type.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":16,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.type.delete
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.type.delete',
    		{
    			id: 16,
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
                'crm.type.delete',
                [
                    'id' => 16,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            return;
        }
    
        echo 'Success: ' . print_r($result->data(), true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting CRM type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.type.delete',
        {
            id: 16,
        },
        (result) => {
            if (result.error())
            {
                console.error(result.error());

                return;
            }

            console.info(result.data());
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.type.delete',
        [
            'id' => 16
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
    "result": [],
    "time": {
        "start": 1720441523.621191,
        "finish": 1720441528.162992,
        "duration": 4.5418009757995605,
        "processing": 4.141964912414551,
        "date_start": "2024-07-08T14:25:23+02:00",
        "date_finish": "2024-07-08T14:25:28+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`][1] | Корневой элемент ответа. В случае успеха `result = []`.

Если `result` вернет `null`, то скорее всего не был передан обязательный параметр `id`. В таком случае объект не удалится ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BX_ERROR",
    "error_description": "Вы не можете удалить тип сущности, у которого есть элементы"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `allowed_only_intranet_user` | Действие разрешено только интранет-пользователям | Возникает, если пользователь не является интранет-пользователем ||
|| `400` | `ACCESS_DENIED` | Доступ запрещен | Возникает, если у пользователя нет административных прав CRM ||

|| `400` | `BX_ERROR` | Вы не можете удалить тип сущности, у которого есть элементы | Возникает, при попытке удалить смарт-процесс с привязанными элементами ||
|| `400` | `0` | Смарт-процесс не найден | Смарт-процесс с переданным `id` не найден ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-type-add.md)
- [{#T}](./crm-type-update.md)
- [{#T}](./crm-type-get.md)
- [{#T}](./crm-type-get-by-entity-type-id.md)
- [{#T}](./crm-type-list.md)
- [{#T}](./crm-type-fields.md)

[1]: ../../../data-types.md