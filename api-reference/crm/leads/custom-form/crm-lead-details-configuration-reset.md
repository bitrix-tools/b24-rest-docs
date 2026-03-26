# Сбросить параметры карточки crm.lead.details.configuration.reset

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
>  - любой пользователь может сбросить свои настройки,
>  - пользователь с правом «Разрешить изменять настройки» в CRM может сбросить общие и чужие настройки

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.details.configuration.reset](../../universal/item-details-configuration/crm-item-details-configuration-reset.md).

{% endnote %}

Метод `crm.lead.details.configuration.reset` сбрасывает настройки карточки лидов.

{% note warning %}

Настройки карточки повторных лидов могут отличаться от настроек карточки простых лидов. Для переключения между настройками карточек лидов используйте параметр `lead.customer.type` в `extras`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя, для которого нужно сбросить личную конфигурацию.

Если параметр не передан, будет использован `userId` пользователя, который вызывает метод.

Нужен только при сбросе личных настроек ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек. Возможные значения:
- `'P'` - личные настройки
- `'C'` - общие настройки

По умолчанию используется значение `'P'` ||
|| **extras**
[`object`](../../../data-types.md) | Дополнительные параметры для выбора типа лида. Структура описана [ниже](#extras) ||
|#

### Параметр extras {#extras}

#|
|| **Название**
`тип` | **Описание** ||
|| **lead.customer.type**
[`integer`](../../../data-types.md) | Тип лида. Возможные значения:
- `1` - простой лид
- `2` - повторный лид ||
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
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.details.configuration.reset
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":1,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.lead.details.configuration.reset
        ```

    - JS

        ```js
        try
        {
            const response = await $b24.callMethod(
                'crm.lead.details.configuration.reset',
                {
                    scope: 'P',
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
                    'crm.lead.details.configuration.reset',
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
            echo 'Error resetting lead details configuration: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            "crm.lead.details.configuration.reset",
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
            'crm.lead.details.configuration.reset',
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
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.details.configuration.reset
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C","auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.lead.details.configuration.reset
        ```

    - JS

        ```js
        try
        {
        	const response = await $b24.callMethod(
        		"crm.lead.details.configuration.reset",
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
                    'crm.lead.details.configuration.reset',
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
            echo 'Error resetting lead details configuration: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            "crm.lead.details.configuration.reset",
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
            'crm.lead.details.configuration.reset',
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
        "start": 1720687072.190654,
        "finish": 1720687072.586945,
        "duration": 0.39629101753234863,
        "processing": 0.057084083557128906,
        "date_start": "2024-07-11T10:37:52+02:00",
        "date_finish": "2024-07-11T10:37:52+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Возвращает `true`, если настройки успешно сброшены ||
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
|| `-` | Access denied | Недостаточно прав для сброса запрошенной конфигурации ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-lead-details-configuration-get.md)
- [{#T}](./crm-lead-details-configuration-set.md)
- [{#T}](./crm-lead-details-configuration-force-common-scope-for-all.md)





