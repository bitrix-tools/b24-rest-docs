# Удалить открытую линию imopenlines.config.delete

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом изменения открытых линий

Метод `imopenlines.config.delete` удаляет открытую линию.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONFIG_ID***
[`integer`](../../data-types.md) | Идентификатор открытой линии.

Получить идентификатор открытой линии можно при [создании открытой линии](./imopenlines-config-add.md) или методом [получения списка открытых линий](./imopenlines-config-list-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONFIG_ID": 15
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.config.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONFIG_ID": 15,
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.config.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.config.delete',
            {
                CONFIG_ID: 15
            }
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
            ->call(
                'imopenlines.config.delete',
                [
                    'CONFIG_ID' => 15,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.config.delete',
        {
            CONFIG_ID: 15
        },
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
        'imopenlines.config.delete',
        [
            'CONFIG_ID' => 15,
        ]
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
        "start": 1741688626.157568,
        "finish": 1741688626.261411,
        "duration": 0.10384297370910645,
        "processing": 0.04578208923339844,
        "date_start": "2025-03-11T10:30:26+03:00",
        "date_finish": "2025-03-11T10:30:26+03:00",
        "operating_reset_at": 1741689226,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает:
- `true` — если линия успешно удалена
- `false` — если линия с указанным `CONFIG_ID` не существует ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CONFIG_ID_EMPTY",
    "error_description": "Config ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CONFIG_ID_EMPTY` | Config ID can't be empty | Параметр `CONFIG_ID` не передан или передан некорректно ||
|| `403` | `CONFIG_WRONG_USER_PERMISSION` | Permission denied | Недостаточно прав для удаления линии ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-config-add.md)
- [{#T}](./imopenlines-config-update.md)
- [{#T}](./imopenlines-config-get.md)
- [{#T}](./imopenlines-config-list-get.md)
- [{#T}](./imopenlines-config-path-get.md)
