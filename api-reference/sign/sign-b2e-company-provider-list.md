# Получить список провайдеров компании sign.b2e.company.provider.list

> Scope: [`sign.b2e`](../scopes/permissions.md), [`crm`](../scopes/permissions.md), [`humanresources.hcmlink`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом создавать документы КЭДО

Метод `sign.b2e.company.provider.list` возвращает список провайдеров подписи для выбранной компании.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **companyUuid***
[`string`](../data-types.md) | UUID компании в HCM Link.

Обязателен, если не передан параметр `companyCrmId` ||
|| **companyCrmId***
[`integer`](../data-types.md) | Идентификатор компании в CRM, подключенный в интеграции как «моя компания».

Обязателен, если не передан параметр `companyUuid` ||
|| **language**
[`string`](../data-types.md) | Язык локализации названий провайдеров.

По умолчанию `en` ||
|| **limit**
[`integer`](../data-types.md) | Количество записей на странице.

Параметр принимает значение от 1 до 1000.

По умолчанию 100 ||
|| **offset**
[`integer`](../data-types.md) | Параметр для управления постраничной навигацией.

По умолчанию 0 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"companyCrmId":12,"limit":2,"offset":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.company.provider.list
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sign.b2e.company.provider.list',
    		{
    			// UUID компании в HCM Link или ID компании в CRM
    			companyCrmId: 12,
    
    			// Язык локализации названий провайдеров
    			language: 'ru',
    
    			// Параметры постраничной навигации
    			limit: 2,
    			offset: 0
    		}
    	);
    
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch( error )
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
                'sign.b2e.company.provider.list',
                [
                    'companyCrmId' => 12,
                    'language' => 'ru',
                    'limit' => 2,
                    'offset' => 0
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        'sign.b2e.company.provider.list',
        {
            companyCrmId: 12,
            language: 'ru',
            limit: 2,
            offset: 0
        },
        result => {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.dir(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sign.b2e.company.provider.list',
        [
            'companyCrmId' => 12,
            'language' => 'ru',
            'limit' => 2,
            'offset' => 0
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "code": "ses-ru",
            "uid": "d4f6b8a1-4c6d-4d8c-9c7c-2d1b1f6d0f2b",
            "name": "Битрикс24 КЭДО",
            "date": "2025-02-18T10:15:30+03:00",
            "expires": "2026-02-18T10:15:30+03:00"
        }
    ],
    "time": {
        "start": 1739860000.123,
        "finish": 1739860000.456,
        "duration": 0.333,
        "processing": 0.111,
        "date_start": "2026-02-10T09:19:34+03:00",
        "date_finish": "2026-02-10T09:19:34+03:00",
        "operating_reset_at": 1739860600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Список провайдеров подписи компании ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Элемент массива result

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код провайдера ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор провайдера ||
|| **name**
[`string`](../data-types.md) | Название провайдера с учетом языка ||
|| **date**
[`string`](../data-types.md) | Дата регистрации провайдера в формате ISO 8601 ||
|| **expires**
[`string`](../data-types.md) | Дата окончания действия провайдера в формате ISO 8601 ||
|#

## Обработка ошибок

HTTP-статус: **200**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Когда возникает** ||
|| `ACCESS_DENIED` | Access denied! | Недостаточно прав ||
|| `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Вызов не из контекста приложения ||
|| `510` | Company was not found. | Компания не найдена по `companyUuid` или `companyCrmId` ||
|| `510` | My company ... not found | Компания CRM не найдена ||
|| `-` | Parameter 'companyUuid' or 'companyCrmId' is required | Не переданы идентификаторы компании ||
|| `-` | humanresources module is not installed | Модуль `humanresources` не установлен ||
|| `-` | Error while autoregistering providers | Ошибка автрегистрации виртуальных провайдеров. Проверьте данные моей компании в CRM ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-document-send.md)
- [{#T}](./sign-b2e-document-get.md)
- [{#T}](./index.md)
