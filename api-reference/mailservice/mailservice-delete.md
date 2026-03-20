# Удалить почтовый сервис mailservice.delete

> Scope: [`mailservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `mailservice.delete` удаляет почтовый сервис по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../data-types.md) | Идентификатор почтового сервиса.

Получить идентификатор можно методом [mailservice.list](./mailservice-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID": 31}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/mailservice.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID": 31, "auth": "**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/mailservice.delete
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'mailservice.delete',
    		{ ID: 31 }
    	);

    	console.log(response.getData().result);
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
            ->call(
                'mailservice.delete',
                ['ID' => 31]
            );

        $result = $response->getResponseData()->getResult();
        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'mailservice.delete',
        { ID: 31 },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'mailservice.delete',
        ['ID' => 31]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1710000400.123,
        "finish": 1710000400.210,
        "duration": 0.087,
        "processing": 0.031,
        "date_start": "2024-03-09T10:06:40+03:00",
        "date_finish": "2024-03-09T10:06:40+03:00",
        "operating_reset_at": 1710003600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если сервис успешно удален ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Не найден почтовый сервис"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | Доступ запрещен | Недостаточно прав для добавления почтового сервиса ||
|| `400` | `ERROR_CORE` | Не указан ID почтового сервиса | Не передан обязательный параметр `ID` ||
|| `400` | `ERROR_CORE` | Не найден почтовый сервис | Почтовый сервис с указанным `ID` не найден ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mailservice-add.md)
- [{#T}](./mailservice-update.md)
- [{#T}](./mailservice-get.md)
- [{#T}](./mailservice-list.md)
- [{#T}](./mailservice-fields.md)
