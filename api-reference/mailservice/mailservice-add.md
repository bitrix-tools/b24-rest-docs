# Создать почтовый сервис mailservice.add

> Scope: [`mailservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `mailservice.add` создает почтовый сервис для текущего Битрикс24.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../data-types.md) | Название почтового сервиса ||
|| **ACTIVE**
[`string`](../data-types.md) | Признак активности сервиса. Допустимые значения:
- `Y` — да
- `N` — нет

Значение по умолчанию: `Y` ||
|| **SERVER**
[`string`](../data-types.md) | Адрес IMAP-сервера. В базе сохраняется в нижнем регистре ||
|| **PORT**
[`integer`](../data-types.md) | Порт IMAP-сервера ||
|| **ENCRYPTION**
[`string`](../data-types.md) | Признак защищенного подключения. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **LINK**
[`string`](../data-types.md) | Адрес веб-интерфейса почтового сервиса ||
|| **ICON**
[`file`](../data-types.md)
[`integer`](../data-types.md)
[`string`](../data-types.md) | Логотип сервиса. Можно передать файл или существующий идентификатор файла ||
|| **SORT**
[`integer`](../data-types.md) | Индекс сортировки. Значение по умолчанию: `100` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "NAME": "Мой почтовый сервис",
        "ACTIVE": "Y",
        "SERVER": "imap.my-mail.ru",
        "PORT": 993,
        "ENCRYPTION": "Y",
        "LINK": "https://mail.my-mail.ru/",
        "SORT": 500
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/mailservice.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "NAME": "Мой почтовый сервис",
        "ACTIVE": "Y",
        "SERVER": "imap.my-mail.ru",
        "PORT": 993,
        "ENCRYPTION": "Y",
        "LINK": "https://mail.my-mail.ru/",
        "SORT": 500,
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/mailservice.add
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'mailservice.add',
    		{
    			NAME: 'Мой почтовый сервис',
    			ACTIVE: 'Y',
    			SERVER: 'imap.my-mail.ru',
    			PORT: 993,
    			ENCRYPTION: 'Y',
    			LINK: 'https://mail.my-mail.ru/',
    			SORT: 500
    		}
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
                'mailservice.add',
                [
                    'NAME' => 'Мой почтовый сервис',
                    'ACTIVE' => 'Y',
                    'SERVER' => 'imap.my-mail.ru',
                    'PORT' => 993,
                    'ENCRYPTION' => 'Y',
                    'LINK' => 'https://mail.my-mail.ru/',
                    'SORT' => 500,
                ]
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
        'mailservice.add',
        {
            NAME: 'Мой почтовый сервис',
            ACTIVE: 'Y',
            SERVER: 'imap.my-mail.ru',
            PORT: 993,
            ENCRYPTION: 'Y',
            LINK: 'https://mail.my-mail.ru/',
            SORT: 500
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
        'mailservice.add',
        [
            'NAME' => 'Мой почтовый сервис',
            'ACTIVE' => 'Y',
            'SERVER' => 'imap.my-mail.ru',
            'PORT' => 993,
            'ENCRYPTION' => 'Y',
            'LINK' => 'https://mail.my-mail.ru/',
            'SORT' => 500,
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 31,
    "time": {
        "start": 1774005930,
        "finish": 1774005930.256403,
        "duration": 0.25640296936035156,
        "processing": 0,
        "date_start": "2026-03-20T14:25:30+03:00",
        "date_finish": "2026-03-20T14:25:30+03:00",
        "operating_reset_at": 1774006530,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданного почтового сервиса ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Доступ запрещен"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_CORE` | Доступ запрещен | Недостаточно прав для добавления почтового сервиса ||
|| `400` | `ERROR_CORE` | Не заполнено обязательное поле "Название" | Не передан обязательный параметр `NAME` ||
|| `400` | `ERROR_CORE` | Неправильное значение для "*название_поля*" | Передано недопустимое значение указанного поля  ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mailservice-update.md)
- [{#T}](./mailservice-get.md)
- [{#T}](./mailservice-list.md)
- [{#T}](./mailservice-delete.md)
- [{#T}](./mailservice-fields.md)
