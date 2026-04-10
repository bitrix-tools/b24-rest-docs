# Удалить коммерческое предложение crm.quote.delete

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «удаления» коммерческих предложений

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.delete](../universal/crm-item-delete.md).

{% endnote %}

Метод `crm.quote.delete` удаляет коммерческое предложение.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор коммерческого предложения.

Идентификатор можно получить с помощью методов [crm.quote.list](./crm-quote-list.md) или [crm.quote.add](./crm-quote-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример удаления коммерческого предложения с `id = 43`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":43}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":43,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.delete
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.quote.delete',
    		{
    			id: 43,
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
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
                'crm.quote.delete',
                [
                    'id' => 43,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Deleted: ' . ($result ? 'true' : 'false');

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting quote: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.delete',
        {
            id: 43,
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
        'crm.quote.delete',
        [
            'id' => 43,
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
        "start": 1773414644,
        "finish": 1773414644.363449,
        "duration": 0.3634490966796875,
        "processing": 0,
        "date_start": "2026-03-13T18:10:44+03:00",
        "date_finish": "2026-03-13T18:10:44+03:00",
        "operating_reset_at": 1773415244,
        "operating": 0.2564728260040283
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Корневой элемент ответа, возвращает `true` в случае успеха ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Элемент не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `ID is not defined or invalid.` | Передан некорректный `id` ||
|| `-` | `Access denied.` | У пользователя нет прав на удаление коммерческих предложений ||
|| `ERROR_CORE` | `Элемент не найден` | Коммерческое предложение с переданным `id` не найдено ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-add.md)
- [{#T}](./crm-quote-update.md)
- [{#T}](./crm-quote-get.md)
- [{#T}](./crm-quote-list.md)
- [{#T}](./crm-quote-fields.md)
- [{#T}](./crm-quote-product-rows-set.md)
- [{#T}](./crm-quote-product-rows-get.md)





