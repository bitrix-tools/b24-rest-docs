# Получить коммерческое предложение по идентификатору crm.quote.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «чтения» коммерческих предложений

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.get](../universal/crm-item-get.md).

{% endnote %}

Метод `crm.quote.get` возвращает коммерческое предложение по идентификатору.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор коммерческого предложения.

Идентификатор можно получить с помощью методов [crm.quote.list](./crm-quote-list.md) и [crm.quote.add](./crm-quote-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример получения предложения с `id = 43`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":43}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":43,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.get
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.quote.get',
    		{
    			id: 43,
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch( error )
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
                'crm.quote.get',
                [
                    'id' => 43,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting quote: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.get',
        {
            id: 43,
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.quote.get',
        [
            'id' => 43,
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
    "result": {
        "ID": "43",
        "TITLE": "КП на поставку мебели",
        "STATUS_ID": "SENT",
        "CURRENCY_ID": "RUB",
        "OPPORTUNITY": "150000.00",
        "TAX_VALUE": "0.00",
        "COMPANY_ID": "1",
        "CONTACT_ID": null,
        "MYCOMPANY_ID": "340",
        "BEGINDATE": "2026-03-13T03:00:00+03:00",
        "CLOSEDATE": "2026-03-20T03:00:00+03:00",
        "ACTUAL_DATE": "2026-03-20T03:00:00+03:00",
        "ASSIGNED_BY_ID": "1",
        "CREATED_BY_ID": "577",
        "MODIFY_BY_ID": "577",
        "DATE_CREATE": "2026-03-13T13:15:37+03:00",
        "DATE_MODIFY": "2026-03-13T16:56:07+03:00",
        "OPENED": "Y",
        "CLOSED": "N",
        "COMMENTS": "Уточнены условия и сроки",
        "LEAD_ID": null,
        "DEAL_ID": null,
        "QUOTE_NUMBER": "43",
        "CONTENT": null,
        "TERMS": null,
        "PERSON_TYPE_ID": "1",
        "LOCATION_ID": null,
        "CLIENT_TITLE": null,
        "CLIENT_ADDR": null,
        "CLIENT_CONTACT": null,
        "CLIENT_EMAIL": null,
        "CLIENT_PHONE": null,
        "CLIENT_TP_ID": null,
        "CLIENT_TPA_ID": null,
        "UTM_SOURCE": null,
        "UTM_MEDIUM": null,
        "UTM_CAMPAIGN": null,
        "UTM_CONTENT": null,
        "UTM_TERM": null,
        "PARENT_ID_136": null,
        "LAST_COMMUNICATION_TIME": null,
        "LAST_ACTIVITY_BY": "577",
        "LAST_ACTIVITY_TIME": "2026-03-13T13:15:37+03:00",
        "UF_CRM_566EB0AC9B7FC": "",
        "UF_CRM_566EB0AFA9895": "0",
        "UF_CRM_566EB0AFB84F1": "Интернет-магазин",
        "UF_CRM_566EB0AFC58FD": "0",
        "UF_CRM_566EB0AFDA4EF": "",
        "UF_CRM_566EB0AFEDB2F": "",
        "UF_CRM_566EB0B014EC2": "",
        "UF_CRM_566EB0B0231B2": "",
        "UF_CRM_566EB0B02F46F": "",
        "UF_CRM_566EB0B03CDCD": "",
        "UF_CRM_566EB0B04D190": "267",
        "UF_CRM_577BBCE34CC90": "",
        "UF_CRM_577BBCE354F86": ""
    },
    "time": {
        "start": 1773411068,
        "finish": 1773411068.183631,
        "duration": 0.18363094329833984,
        "processing": 0,
        "date_start": "2026-03-13T17:11:08+03:00",
        "date_finish": "2026-03-13T17:11:08+03:00",
        "operating_reset_at": 1773411668,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа. Содержит поля коммерческого предложения.

Набор и типы полей можно получить методом [crm.quote.fields](./crm-quote-fields.md) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `ID is not defined or invalid.` | Передан некорректный `id` ||
|| `-` | `Access denied.` | У пользователя нет прав на чтение коммерческих предложений ||
|| `-` | `Not found` | Коммерческое предложение с переданным `id` не найдено ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-add.md)
- [{#T}](./crm-quote-update.md)
- [{#T}](./crm-quote-list.md)
- [{#T}](./crm-quote-delete.md)
- [{#T}](./crm-quote-fields.md)





