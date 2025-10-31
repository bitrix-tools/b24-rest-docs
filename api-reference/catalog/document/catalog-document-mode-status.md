# Проверить состояние складского учета catalog.document.mode.status

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Просмотр каталога товаров»

Метод `catalog.document.mode.status` проверяет активность складского учета. 

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.document.mode.status
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.mode.status
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'catalog.document.mode.status',
    		{}
    	);

    	const result = response.getData().result;
    	console.log(result);
    }
    catch (error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call('catalog.document.mode.status', []);

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Status: ' . $result;
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting inventory mode: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.document.mode.status',
        {},
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

    $result = CRest::call('catalog.document.mode.status', []);

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": "Y",
    "time": {
        "start": 1759484053.115812,
        "finish": 1759484053.162347,
        "duration": 0.04653501510620117,
        "processing": 0.006915092468261719,
        "date_start": "2025-11-02T12:54:13+03:00",
        "date_finish": "2025-11-02T12:54:13+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Активность складского учета. Возможные значения:
- `'Y'` — включен,
- `'N'` — отключен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "Access denied"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | Access denied | У пользователя нет права на чтение каталога товаров ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-document-list.md)
- [{#T}](./catalog-document-add.md)
- [{#T}](./catalog-document-delete.md)


