# Подключить внешнюю открытую линию к порталу imopenlines.network.join

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imopenlines.network.join` подключает к текущему Битрикс24 внешнюю открытую линию с другого Битрикс24.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../data-types.md) | Код открытой линии в виде строки из 32 символов.

Найти код линии можно в карточке подключенной открытой линии Битрикс24 Network на странице Контакт-центра

{% note tip "Пользовательская документация" %}

- [Контакт-центр: Битрикс24.Network](https://helpdesk.bitrix24.ru/open/19124962/)

{% endnote %}

||
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
        "CODE": "ab515f5d85a8b844d484f6ea75a2e494"
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.network.join
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CODE": "ab515f5d85a8b844d484f6ea75a2e494",
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.network.join
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.network.join',
            {
                CODE: 'ab515f5d85a8b844d484f6ea75a2e494'
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
                'imopenlines.network.join',
                [
                    'CODE' => 'ab515f5d85a8b844d484f6ea75a2e494',
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
        'imopenlines.network.join',
        {
            CODE: 'ab515f5d85a8b844d484f6ea75a2e494'
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
        'imopenlines.network.join',
        [
            'CODE' => 'ab515f5d85a8b844d484f6ea75a2e494',
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 603,
    "time": {
        "start": 1773735146,
        "finish": 1773735146.911103,
        "duration": 0.9111030101776123,
        "processing": 0,
        "date_start": "2026-03-17T11:12:26+03:00",
        "date_finish": "2026-03-17T11:12:26+03:00",
        "operating_reset_at": 1773735746,
        "operating": 0.44127893447875977
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор network-бота подключенной внешней открытой линии. 

Если линия была подключена ранее, метод возвращает существующий идентификатор ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "LINE_NOT_FOUND",
    "error_description": "Line not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CODE` | You entered an invalid code | Некорректный код в параметре `CODE`, ожидается строка из 32 символов ||
|| `400` | `IMBOT_ERROR` | Module IMBOT is not installed | Не установлен модуль imbot ||
|| `400` | `LINE_NOT_FOUND` | Line not found | Открытая линия не найдена ||
|| `400` | `INACTIVE` | Openline is inactive | Открытая линия в данный момент недоступна ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-network-message-add.md)
