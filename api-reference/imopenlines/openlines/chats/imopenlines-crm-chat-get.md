# Получить чат для объекта CRM imopenlines.crm.chat.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает чаты для объекта CRM.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **CRM_ENTITY_TYPE***
[`string`](../../../data-types.md) | Тип объекта CRM: 
- `lead` — лид
- `deal` — сделка
- `company` — компания
- `contact` — контакт
 ||
|| **CRM_ENTITY***
[`integer`](../../../data-types.md) | Идентификатор объекта CRM ||
|| **ACTIVE_ONLY**
[`boolean`](../../../data-types.md) | Вернуть только активные чаты.

Возможные значения:
- `Y` — вернет только активные чаты
- `N` — вернет все чаты
 
По умолчанию — `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CRM_ENTITY_TYPE":"deal","CRM_ENTITY":288,"ACTIVE_ONLY":"N"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/imopenlines.crm.chat.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CRM_ENTITY_TYPE":"deal","CRM_ENTITY":288,"ACTIVE_ONLY":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/imopenlines.crm.chat.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'imopenlines.crm.chat.get',
    		{
    			CRM_ENTITY_TYPE: 'deal',
    			CRM_ENTITY: 288,
    			ACTIVE_ONLY: 'N'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.crm.chat.get',
                [
                    'CRM_ENTITY_TYPE' => 'deal',
                    'CRM_ENTITY'      => 288,
                    'ACTIVE_ONLY'     => 'N',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error()->ex);
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting CRM chat: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.crm.chat.get',
        {
            CRM_ENTITY_TYPE: 'deal',
            CRM_ENTITY: 288,
            ACTIVE_ONLY: 'N'
        },
        function(result) {
            if(result.error())
            {
                console.error(result.error().ex);
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
        'imopenlines.crm.chat.get',
        [
            'CRM_ENTITY_TYPE' => 'deal',
            'CRM_ENTITY' => 288,
            'ACTIVE_ONLY' => 'N'
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
    "result": [
        {
            "CHAT_ID": "9852",
            "CONNECTOR_ID": "livechat",
            "CONNECTOR_TITLE": "Онлайн-чат"
        }
    ]
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Массив объектов. Каждый объект содержит описание чата ||
|| **CHAT_ID**
[`string`](../../data-types.md) | Идентификатор чата ||
|| **CONNECTOR_ID**
[`string`](../../data-types.md) | Идентификатор коннектора ||
|| **CONNECTOR_TITLE**
[`string`](../../data-types.md) | Название коннектора ||
|#

## Обработка ошибок

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_DENIED** | У текущего пользователя нет доступа ||
|| **ERROR_ARGUMENT** | Один из аргументов не указан или указан неверно ||
|#
