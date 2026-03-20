# Получить список почтовых сервисов mailservice.list

> Scope: [`mailservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `mailservice.list` возвращает список активных почтовых сервисов.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/mailservice.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth": "**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/mailservice.list
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod('mailservice.list', {});
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
            ->call('mailservice.list', []);

        $result = $response->getResponseData()->getResult();
        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'mailservice.list',
        {},
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

    $result = CRest::call('mailservice.list', []);
    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "1",
            "SITE_ID": "s1",
            "ACTIVE": "Y",
            "SORT": "100",
            "NAME": "gmail",
            "SERVER": "imap.gmail.com",
            "PORT": "993",
            "ENCRYPTION": "Y",
            "LINK": "https://mail.google.com/",
            "ICON": "https://cdn-ru.bitrix24.ru/b17053/mail/mailservices/icon/ac0/ac08d334f35100d98c1a628f4f57f25c/post_gmail_icon.png",
            "SMTP_SERVER": "smtp.gmail.com",
            "SMTP_PORT": "465",
            "SMTP_LOGIN_AS_IMAP": "Y",
            "SMTP_PASSWORD_AS_IMAP": "Y",
            "SMTP_ENCRYPTION": "Y",
            "UPLOAD_OUTGOING": "N"
        },
        ... // описание для каждого почтового сервиса
    ],
    "time": {
        "start": 1774009798,
        "finish": 1774009798.248488,
        "duration": 0.2484879493713379,
        "processing": 0,
        "date_start": "2026-03-20T15:29:58+03:00",
        "date_finish": "2026-03-20T15:29:58+03:00",
        "operating_reset_at": 1774010398,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../data-types.md) | Массив объектов с информацией о почтовых сервисах. 

Структура объекта почтового сервиса подробно описана [ниже](#mail-services) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект mailservice {#mail-services}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор почтового сервиса ||
|| **SITE_ID**
[`string`](../data-types.md) | Идентификатор сайта в Битрикс24 ||
|| **ACTIVE**
[`string`](../data-types.md) | Активность сервиса, значения `Y` или `N` ||
|| **SORT**
[`integer`](../data-types.md) | Индекс сортировки ||
|| **NAME**
[`string`](../data-types.md) | Название сервиса ||
|| **SERVER**
[`string`](../data-types.md) | Адрес IMAP-сервера в нижнем регистре ||
|| **PORT**
[`integer`](../data-types.md) | Порт IMAP-сервера ||
|| **ENCRYPTION**
[`string`](../data-types.md) | Признак защищенного подключения, значения `Y` или `N` ||
|| **LINK**
[`string`](../data-types.md) | Адрес веб-интерфейса сервиса ||
|| **ICON**
[`string`](../data-types.md) | Путь к изображению логотипа сервиса ||
|| **SMTP_SERVER**
[`string`](../data-types.md)\|[`null`](../data-types.md) | SMTP-сервер, если он настроен ||
|| **SMTP_PORT**
[`integer`](../data-types.md)\|[`null`](../data-types.md) | SMTP-порт, если он настроен ||
|| **SMTP_LOGIN_AS_IMAP**
[`string`](../data-types.md) | Использовать IMAP-логин для SMTP, значения `Y` или `N` ||
|| **SMTP_PASSWORD_AS_IMAP**
[`string`](../data-types.md) | Использовать IMAP-пароль для SMTP, значения `Y` или `N` ||
|| **SMTP_ENCRYPTION**
[`string`](../data-types.md)\|[`null`](../data-types.md) | Признак защищенного SMTP-подключения, значения `Y` или `N` ||
|| **UPLOAD_OUTGOING**
[`string`](../data-types.md)\|[`null`](../data-types.md) | Признак загрузки исходящих писем, значения `Y` или `N` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Не найдены почтовые сервисы"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | ERROR_CORE | Не найдены почтовые сервисы | Нет активных почтовых сервисов ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mailservice-add.md)
- [{#T}](./mailservice-update.md)
- [{#T}](./mailservice-get.md)
- [{#T}](./mailservice-delete.md)
- [{#T}](./mailservice-fields.md)
