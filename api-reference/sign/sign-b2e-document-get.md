# Получить документ sign.b2e.document.get

> Scope: [`sign.b2e`](../scopes/permissions.md), [`crm`](../scopes/permissions.md), [`humanresources.hcmlink`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом просмотра документов КЭДО

Метод `sign.b2e.document.get` возвращает информацию о документе и участниках подписания.

Метод работает только в контексте авторизации [приложения](../../settings/app-installation/index.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор документа ||
|| **language**
[`string`](../data-types.md) | Язык локализации статусов в ответе.

По умолчанию `en` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"uid":"b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sign.b2e.document.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sign.b2e.document.get',
    		{
    			uid: 'b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c',
    			language: 'ru'
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
                'sign.b2e.document.get',
                [
                    'uid' => 'b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c',
                    'language' => 'ru'
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
        'sign.b2e.document.get',
        {
            uid: 'b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c',
            language: 'ru'
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
        'sign.b2e.document.get',
        [
            'uid' => 'b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c',
            'language' => 'ru'
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
    "result": {
        "uid": "b6f5f1f1-9d20-4b6b-ae0f-2f0a8a0c2b3c",
        "state": {
            "code": "in_progress",
            "name": "В процессе"
        },
        "members": [
            {
                "uid": "f1c2d3e4",
                "role": "signer",
                "party": 0,
                "user": {
                    "employeeCode": "EMP-001",
                    "employeeId": 123,
                    "userId": 25
                },
                "state": {
                    "code": "signed",
                    "name": "Подписано"
                }
            }
        ]
    },
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
[`object`](../data-types.md) | Информация о документе и участниках подписания ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля объекта result

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор документа ||
|| **state**
[`object`](../data-types.md) | Текущий статус документа ||
|| **members**
[`array`](../data-types.md) | Участники подписания ||
|#

#### Поля объекта result.state

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код статуса ||
|| **name**
[`string`](../data-types.md) | Название статуса ||
|#

#### Элемент массива result.members

#|
|| **Название**
`тип` | **Описание** ||
|| **uid**
[`string`](../data-types.md) | Уникальный идентификатор участника ||
|| **role**
[`string`](../data-types.md) | Роль участника ||
|| **party**
[`integer`](../data-types.md) | Сторона подписания ||
|| **user**
[`object`](../data-types.md) | Данные пользователя ||
|| **state**
[`object`](../data-types.md) | Статус участника ||
|#

#### Поля объекта result.members.user

#|
|| **Название**
`тип` | **Описание** ||
|| **employeeCode**
[`string`](../data-types.md) | Код сотрудника в HCM Link ||
|| **employeeId**
[`integer`](../data-types.md) | Идентификатор сотрудника в HCM Link ||
|| **userId**
[`integer`](../data-types.md) | Идентификатор пользователя в Битрикс24 ||
|#

#### Поля объекта result.members.state

#|
|| **Название**
`тип` | **Описание** ||
|| **code**
[`string`](../data-types.md) | Код статуса участника ||
|| **name**
[`string`](../data-types.md) | Название статуса участника ||
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
|| `INTERNAL_ERROR` | Internal error | Ошибка при формировании ответа ||
|| `-` | Document UID is required | Не передан параметр `uid` ||
|| `-` | Document not found | Документ с указанным `uid` не найден ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sign-b2e-document-send.md)
- [{#T}](./sign-b2e-company-provider-list.md)
- [{#T}](./index.md)
