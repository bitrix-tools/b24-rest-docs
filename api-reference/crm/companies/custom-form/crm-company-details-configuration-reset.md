# Сбросить параметры карточки crm.company.details.configuration.reset

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
>  - любой пользователь может сбросить свои настройки,
>  - пользователь с правом «Разрешить изменять настройки» в CRM может сбросить общие и чужие настройки

{% note warning "Развитие метода остановлено" %}

Метод `crm.company.details.configuration.reset` продолжает работать, но у него есть более актуальный аналог [crm.item.details.configuration.reset](../../universal/item-details-configuration/crm-item-details-configuration-reset.md).

{% endnote %}

Метод `crm.company.details.configuration.reset` сбрасывает настройки карточки компаний: удаляет личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек.

Возможные значения:
- `P` — личные настройки
- `C` — общие настройки

По умолчанию — `P`
||
|| **userId**
[`user`](../../../data-types.md) |  Идентификатор пользователя, получить можно методом [user.get](../../../user/user-get.md). Нужен только при сбросе личных настроек.

Если не задан — берется `id` текущего пользователя
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Сбросить личные настройки карточки

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":1}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.details.configuration.reset
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":1,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.company.details.configuration.reset
        ```

    - JS

        ```js
        try
        {
        	const response = await $b24.callMethod(
        		"crm.company.details.configuration.reset",
        		{
        			scope: "P",
        			userId: 1
        		}
        	);
        	
        	const result = response.getData().result;
        	console.dir(result);
        }
        catch(error)
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
                    'crm.company.details.configuration.reset',
                    [
                        'scope'  => 'P',
                        'userId' => 1,
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
            echo 'Error resetting company details configuration: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            "crm.company.details.configuration.reset",
            {
                scope: "P",
                userId: 1
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
            'crm.company.details.configuration.reset',
            [
                'scope' => 'P',
                'userId' => 1
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Сбросить общие настройки карточки

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C"}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.details.configuration.reset
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C","auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.company.details.configuration.reset
        ```

    - JS

        ```js
        try
        {
        	const response = await $b24.callMethod(
        		"crm.company.details.configuration.reset",
        		{
        			scope: "C"
        		}
        	);
        	
        	const result = response.getData().result;
        	console.dir(result);
        }
        catch(error)
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
                    'crm.company.details.configuration.reset',
                    [
                        'scope'  => 'C',
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
            echo 'Error resetting company details configuration: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            "crm.company.details.configuration.reset",
            {
                scope: "C"
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
            'crm.company.details.configuration.reset',
            [
                'scope' => 'C'
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
        "start": 1769420530,
        "finish": 1769420530.756109,
        "duration": 0.7561089992523193,
        "processing": 0,
        "date_start": "2026-01-26T12:42:10+03:00",
        "date_finish": "2026-01-26T12:42:10+03:00",
        "operating_reset_at": 1769421130,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа.

Возвращает `true` в случае успешного сброса настроек ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `Access denied` | У пользователя нет прав на сброс настроек ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-company-details-configuration-get.md)
- [{#T}](.//crm-company-details-configuration-set.md)
- [{#T}](./crm-company-details-configuration-force-common-scope-for-all.md)
