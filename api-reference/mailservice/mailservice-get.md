# Получить почтовый сервис mailservice.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`mailservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `mailservice.get` возвращает параметры почтового сервиса по его идентификатору.

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
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/mailservice.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID": 31, "auth": "**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/mailservice.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'mailservice.get',
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
                'mailservice.get',
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
        'mailservice.get',
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
        'mailservice.get',
        ['ID' => 31]
    );

    print_r($result);
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    client: BaseClient

    try:
        bitrix_response = client.mailservice.get(
            bitrix_id=31,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "31",
        "SITE_ID": "s1",
        "ACTIVE": "N",
        "SORT": "600",
        "NAME": "Обновленный почтовый сервис",
        "SERVER": "imap.my2-mail.ru",
        "PORT": "993",
        "ENCRYPTION": "Y",
        "LINK": "https://mail.my2-mail.ru/",
        "ICON": null,
        "SMTP_SERVER": null,
        "SMTP_PORT": null,
        "SMTP_LOGIN_AS_IMAP": "N",
        "SMTP_PASSWORD_AS_IMAP": "N",
        "SMTP_ENCRYPTION": null,
        "UPLOAD_OUTGOING": null
    },
    "time": {
        "start": 1774009408,
        "finish": 1774009408.234421,
        "duration": 0.2344210147857666,
        "processing": 0,
        "date_start": "2026-03-20T15:23:28+03:00",
        "date_finish": "2026-03-20T15:23:28+03:00",
        "operating_reset_at": 1774010008,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Параметры почтового сервиса. Структура объекта подробно описана [ниже](#mail-service) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#mail-service}

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
    "error_description": "Не найден почтовый сервис"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | Не указан ID почтового сервиса | Не передан обязательный параметр `ID` ||
|| `400` | `ERROR_CORE` | Не найден почтовый сервис | Почтовый сервис с указанным `ID` не найден ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mailservice-add.md)
- [{#T}](./mailservice-update.md)
- [{#T}](./mailservice-list.md)
- [{#T}](./mailservice-delete.md)
- [{#T}](./mailservice-fields.md)
