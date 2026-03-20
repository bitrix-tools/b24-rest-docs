# Изменить почтовый сервис mailservice.update

> Scope: [`mailservice`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `mailservice.update` изменяет параметры существующего почтового сервиса.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../data-types.md) | Идентификатор почтового сервиса. 

Получить идентификатор можно методом [mailservice.list](./mailservice-list.md) ||
|| **ACTIVE**
[`string`](../data-types.md) | Признак активности сервиса. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **NAME**
[`string`](../data-types.md) | Название сервиса ||
|| **SERVER**
[`string`](../data-types.md) | Адрес IMAP-сервера. В базе сохраняется в нижнем регистре ||
|| **PORT**
[`integer`](../data-types.md) | Порт IMAP-сервера ||
|| **ENCRYPTION**
[`string`](../data-types.md) | Признак защищенного подключения. Допустимые значения:
- `Y` — да
- `N` — нет ||
|| **LINK**
[`string`](../data-types.md) | Адрес веб-интерфейса сервиса ||
|| **ICON**
[`file`](../data-types.md)
[`integer`](../data-types.md)
[`string`](../data-types.md) | Логотип сервиса. Можно передать файл или существующий идентификатор файла ||
|| **SORT**
[`integer`](../data-types.md) | Индекс сортировки ||
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
        "ID": 31,
        "NAME": "Обновленный почтовый сервис",
        "ACTIVE": "N",
        "SERVER": "imap.my2-mail.ru",
        "PORT": 993,
        "ENCRYPTION": "Y",
        "LINK": "https://mail.my2-mail.ru/",
        "SORT": 600
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/mailservice.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "ID": 31,
        "NAME": "Обновленный почтовый сервис",
        "ACTIVE": "N",
        "SERVER": "imap.my2-mail.ru",
        "PORT": 993,
        "ENCRYPTION": "Y",
        "LINK": "https://mail.my2-mail.ru/",
        "SORT": 600,
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/mailservice.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'mailservice.update',
    		{
    			ID: 31,
    			NAME: 'Обновленный почтовый сервис',
    			ACTIVE: 'N',
    			SERVER: 'imap.my2-mail.ru',
    			PORT: 993,
    			ENCRYPTION: 'Y',
    			LINK: 'https://mail.my2-mail.ru/',
    			SORT: 600
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
                'mailservice.update',
                [
                    'ID' => 31,
                    'NAME' => 'Обновленный почтовый сервис',
                    'ACTIVE' => 'N',
                    'SERVER' => 'imap.my2-mail.ru',
                    'PORT' => 993,
                    'ENCRYPTION' => 'Y',
                    'LINK' => 'https://mail.my2-mail.ru/',
                    'SORT' => 600,
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
        'mailservice.update',
        {
            ID: 31,
            NAME: 'Обновленный почтовый сервис',
            ACTIVE: 'N',
            SERVER: 'imap.my2-mail.ru',
            PORT: 993,
            ENCRYPTION: 'Y',
            LINK: 'https://mail.my2-mail.ru/',
            SORT: 600
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
        'mailservice.update',
        [
            'ID' => 31,
            'NAME' => 'Обновленный почтовый сервис',
            'ACTIVE' => 'N',
            'SERVER' => 'imap.my2-mail.ru',
            'PORT' => 993,
            'ENCRYPTION' => 'Y',
            'LINK' => 'https://mail.my2-mail.ru/',
            'SORT' => 600,
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
        "start": 1774008238,
        "finish": 1774008238.539154,
        "duration": 0.539154052734375,
        "processing": 0,
        "date_start": "2026-03-20T15:03:58+03:00",
        "date_finish": "2026-03-20T15:03:58+03:00",
        "operating_reset_at": 1774008838,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если сервис успешно обновлен ||
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
|| `400` | `ERROR_CORE` | Неправильное значение для "*название_поля*" | Передано недопустимое значение указанного поля  ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./mailservice-add.md)
- [{#T}](./mailservice-get.md)
- [{#T}](./mailservice-list.md)
- [{#T}](./mailservice-delete.md)
- [{#T}](./mailservice-fields.md)
