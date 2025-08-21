# Обновить данные пользователя user.update

> Scope: [`user`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `user.update` обновляет данные пользователя. Возможно только от имени пользователя с правами приглашения пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../data-types.md) | Идентификатор пользователя ||
|| **EMAIL**
[`string`](../data-types.md) | E-mail пользователя ||
|| **NAME**
[`string`](../data-types.md) | Имя ||
|| **LAST_NAME**
[`string`](../data-types.md) | Фамилия ||
|| **SECOND_NAME**
[`string`](../data-types.md) | Отчество ||
|| **PERSONAL_GENDER**
[`string`](../data-types.md) | Пол ||
|| **PERSONAL_PROFESSION**
[`string`](../data-types.md) | Профессия ||
|| **PERSONAL_WWW**
[`string`](../data-types.md) | Домашняя страничка ||
|| **PERSONAL_BIRTHDAY**
[`string`](../data-types.md) | Дата рождения ||
|| **PERSONAL_PHOTO**
[`array`](../data-types.md) | Фотография ||
|| **PERSONAL_ICQ**
[`string`](../data-types.md) | ICQ ||
|| **PERSONAL_PHONE**
[`string`](../data-types.md) | Личный телефон ||
|| **PERSONAL_FAX**
[`string`](../data-types.md) | Факс ||
|| **PERSONAL_MOBILE**
[`string`](../data-types.md) | Личный мобильный ||
|| **PERSONAL_PAGER**
[`string`](../data-types.md) | Пейджер ||
|| **PERSONAL_STREET**
[`string`](../data-types.md) | Улица проживания ||
|| **PERSONAL_CITY**
[`string`](../data-types.md) | Город проживания ||
|| **PERSONAL_STATE**
[`string`](../data-types.md) | Область / край ||
|| **PERSONAL_ZIP**
[`string`](../data-types.md) | Почтовый индекс ||
|| **PERSONAL_COUNTRY**
[`string`](../data-types.md) | Страна ||
|| **PERSONAL_MAILBOX**
[`string`](../data-types.md) | Почтовый ящик ||
|| **PERSONAL_NOTES**
[`string`](../data-types.md) | Дополнительные заметки ||
|| **WORK_PHONE**
[`string`](../data-types.md) | Телефон компании ||
|| **WORK_COMPANY**
[`string`](../data-types.md) | Компания ||
|| **WORK_POSITION**
[`string`](../data-types.md) | Должность ||
|| **WORK_DEPARTMENT**
[`string`](../data-types.md) | Отдел ||
|| **WORK_WWW**
[`string`](../data-types.md) | Сайт компании ||
|| **WORK_FAX**
[`string`](../data-types.md) | WORK_FAX ||
|| **WORK_PAGER**
[`string`](../data-types.md) | WORK_PAGER ||
|| **WORK_STREET**
[`string`](../data-types.md) | WORK_STREET ||
|| **WORK_MAILBOX**
[`string`](../data-types.md) | WORK_MAILBOX ||
|| **WORK_CITY**
[`string`](../data-types.md) | Город работы ||
|| **WORK_STATE**
[`string`](../data-types.md) | WORK_STATE ||
|| **WORK_ZIP**
[`string`](../data-types.md) | WORK_ZIP ||
|| **WORK_COUNTRY**
[`string`](../data-types.md) | WORK_COUNTRY ||
|| **WORK_PROFILE**
[`string`](../data-types.md) | WORK_PROFILE ||
|| **WORK_LOGO**
[`array`](../data-types.md) | WORK_LOGO ||
|| **WORK_NOTES**
[`string`](../data-types.md) | WORK_NOTES ||
|| **UF_SKYPE_LINK**
[`string`](../data-types.md) | Ссылка на чат в Skype ||
|| **UF_ZOOM**
[`string`](../data-types.md) | Zoom ||
|| **UF_DEPARTMENT**
[`string`](../data-types.md) | Подразделения ||
|| **UF_INTERESTS**
[`string`](../data-types.md) | Интересы ||
|| **UF_SKILLS**
[`string`](../data-types.md) | Навыки ||
|| **UF_WEB_SITES**
[`string`](../data-types.md) | Другие сайты ||
|| **UF_XING**
[`string`](../data-types.md) | Xing ||
|| **UF_LINKEDIN**
[`string`](../data-types.md) | LinkedIn ||
|| **UF_FACEBOOK**
[`string`](../data-types.md) | Facebook** ||
|| **UF_TWITTER**
[`string`](../data-types.md) | Twitter ||
|| **UF_SKYPE**
[`string`](../data-types.md) | Skype ||
|| **UF_DISTRICT**
[`string`](../data-types.md) | Район ||
|| **UF_PHONE_INNER**
[`string`](../data-types.md) | Внутренний телефон ||
|#

{% note info "" %}

**Социальная сеть признана экстремистской и запрещена на территории Российской Федерации.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ID": 1,
        "NAME": "Administrator",
        "LAST_NAME": "SomeLastName"
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/user.update
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ID": 1,
        "NAME": "Administrator",
        "LAST_NAME": "SomeLastName",
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"user.update",
    		{
    			"ID": 1,
    			"NAME": "Administrator",
    			"LAST_NAME": "SomeLastName"
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
    	}
    }
    catch(error)
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
                'user.update',
                [
                    'ID'       => 1,
                    'NAME'     => 'Administrator',
                    'LAST_NAME' => 'SomeLastName',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating user: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "user.update",
        {
            "ID": 1,
            "NAME": "Administrator",
            "LAST_NAME": "SomeLastName"
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.update',
        [
            'ID' => 1,
            'NAME' => 'Administrator',
            'LAST_NAME' => 'SomeLastName'
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
            "start": 1721807581.02493,
            "finish": 1721807581.20039,
            "duration": 0.17546010017395,
            "processing": 0.133708000183105,
            "date_start": "2024-07-24T07:53:01+00:00",
            "date_finish": "2024-07-24T07:53:01+00:00",
            "operating": 0.133685827255249
        }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Успешность выполнения ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "access_denied"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Cообщение об ошибке** | **Описание** ||
|| `ERROR_CORE` | access_denied | Передан неверный `ID` пользователя ||
|| `ERROR_CORE` | access_denied | У пользователя нет прав на вызов метода ||
|| `ERROR_CORE` |  | Передан неверный `ID` пользователя||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-add.md)
- [{#T}](./user-get.md)
- [{#T}](./user-current.md)
- [{#T}](./user-search.md)
- [{#T}](./user-fields.md)
