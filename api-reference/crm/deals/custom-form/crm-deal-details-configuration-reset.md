# Сбросить параметры карточки сделки crm.deal.details.configuration.reset

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - любой пользователь может сбрасывать свои личные настройки
> - сбросить личные настройки другого пользователя можно при наличии прав на редактирование персонального вида для пользователя
> - сбросить общие настройки можно при наличии прав на редактирование общего вида

{% note warning "Развитие метода остановлено" %}

Метод `crm.deal.details.configuration.reset` продолжает работать, но у него есть более актуальный аналог [crm.item.details.configuration.reset](../../universal/item-details-configuration/crm-item-details-configuration-reset.md).

{% endnote %}

Метод `crm.deal.details.configuration.reset` сбрасывает настройки карточки сделки. Метод удаляет личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.

{% note info %}

Настройки карточки сделок в разных воронках могут отличаться. Для выбора воронки используйте параметр `extras.dealCategoryId`.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

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
[`user`](../../../data-types.md) | Идентификатор пользователя. Нужен только при сбросе личных настроек другого пользователя.

Если не задан, берется текущий
||
|| **extras**
[`object`](../../../data-types.md) | Дополнительные параметры [(подробное описание)](#parameter-extras) ||
|#

### Параметр extras {#parameter-extras}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **dealCategoryId**
[`integer`](../../../data-types.md) | Идентификатор воронки сделок. Можно получить с помощью [crm.category.list](../../universal/category/crm-category-list.md)

Если не указан, используется воронка по умолчанию для сделок
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Сбросить личную конфигурацию карточки сделки для пользователя с `id = 1` в воронке с `id = 32`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"scope":"P","userId":1,"extras":{"dealCategoryId":32}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.details.configuration.reset
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"scope":"P","userId":1,"extras":{"dealCategoryId":32},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.details.configuration.reset
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.deal.details.configuration.reset',
    		{
    			scope: "P",
    			userId: 1,
    			extras: {
    				dealCategoryId: 32,
    			},
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'crm.deal.details.configuration.reset',
                [
                    'scope'  => 'P',
                    'userId' => 1,
                    'extras' => [
                        'dealCategoryId' => 32,
                    ],
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
        echo 'Error resetting deal details configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.details.configuration.reset',
        {
            scope: "P",
            userId: 1,
            extras: {
                dealCategoryId: 32,
            },
        },
        (result) => {
            if (result.error())
            {
                console.error(result.error());

                return;
            }

            console.info(result.data());
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.details.configuration.reset',
        [
            'scope' => 'P',
            'userId' => 1,
            'extras' => [
                'dealCategoryId' => 32,
            ],
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
        "start": 1773307850,
        "finish": 1773307850.136405,
        "duration": 0.13640499114990234,
        "processing": 0,
        "date_start": "2026-03-12T12:30:50+03:00",
        "date_finish": "2026-03-12T12:30:50+03:00",
        "operating_reset_at": 1773308450,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Корневой элемент ответа. Возвращает `true` в случае успешного сброса настроек ||
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
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Access denied | Нет прав на сброс настроек карточки сделки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-deal-details-configuration-get.md)
- [{#T}](./crm-deal-details-configuration-set.md)
- [{#T}](./crm-deal-details-configuration-force-common-scope-for-all.md)
