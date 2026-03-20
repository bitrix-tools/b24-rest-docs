# Изменить коммерческое предложение crm.quote.update

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» коммерческих предложений

{% note warning "Развитие метода остановлено" %}

Метод `crm.quote.update` продолжает работать, но у него есть более актуальный аналог [crm.item.update](../universal/crm-item-update.md).

{% endnote %}

Метод `crm.quote.update` обновляет существующее коммерческое предложение.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор коммерческого предложения.

Идентификатор можно получить с помощью методов [crm.quote.list](./crm-quote-list.md) и [crm.quote.add](./crm-quote-add.md) ||
|| **fields**
[`object`](../data-types.md) | Объект формата:

```json
{
    "field_1": "value_1",
    "field_2": "value_2",
    "...": "..."
}
```

где:
- `field_n` — название поля
- `value_n` — новое значение поля

Передавайте в `fields` только те поля, которые нужно изменить.

Неизвестные поля в `fields` игнорируются.

Список основных полей для обновления — [ниже](#parameter-fields).

Полный список полей и типов можно получить методом [crm.quote.fields](./crm-quote-fields.md) ||
|| **params**
[`object`](../data-types.md) | Объект дополнительных параметров [(подробное описание)](#parameter-params) ||
|#

### Параметр fields {#parameter-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../data-types.md) | Тема коммерческого предложения.

Ограничение длины — до `255` символов.

Если передать значение длиннее `255`, система обрежет его до `255` символов ||
|| **STATUS_ID**
[`crm_status`](../data-types.md) | Стадия предложения.

Список доступных стадий можно получить методом [crm.status.list](../status/crm-status-list.md) с фильтром `ENTITY_ID = QUOTE_STATUS` ||
|| **CURRENCY_ID**
[`crm_currency`](../data-types.md) | Валюта суммы предложения ||
|| **OPPORTUNITY**
[`double`](../data-types.md) | Сумма предложения ||
|| **ASSIGNED_BY_ID**
[`user`](../data-types.md) | Идентификатор ответственного ||
|| **COMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор компании-клиента ||
|| **CONTACT_IDS**
[`crm_contact[]`](../data-types.md) | Массив идентификаторов контактов клиента.

Поле изменяется полностью ||
|| **MYCOMPANY_ID**
[`crm_company`](../data-types.md) | Идентификатор «вашей компании» для реквизитов продавца ||
|| **OPENED**
[`char`](../data-types.md) | Доступно ли предложение для всех. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **PERSON_TYPE_ID**
[`integer`](../data-types.md) | Идентификатор типа клиента ||
|| **BEGINDATE**
[`date`](../data-types.md) | Дата выставления ||
|| **CLOSEDATE**
[`date`](../data-types.md) | Срок действия предложения ||
|| **CLIENT_TITLE**
[`string`](../data-types.md) | Название клиента, до `255` символов ||
|| **CLIENT_ADDR**
[`string`](../data-types.md) | Адрес клиента, до `255` символов ||
|| **CLIENT_EMAIL**
[`string`](../data-types.md) | Email клиента, до `255` символов ||
|| **CLIENT_PHONE**
[`string`](../data-types.md) | Телефон клиента, до `255` символов ||
|| **COMMENTS**
[`string`](../data-types.md) | Комментарий ||
|| **PARENT_ID_...**
[`crm_entity`](../data-types.md) | Поля связей со смарт-процессами.

Например, `PARENT_ID_136` — связь со смарт-процессом `entityTypeId = 136` ||
|#

{% note info "Особенность метода" %}

Часть некорректных значений в полях может не приводить к ошибке `400`: значения нормализуются, обрезаются или заменяются значениями по умолчанию.

{% endnote %}

### Параметр params {#parameter-params}

#|
|| **Название**
`тип` | **Описание** ||
|| **REGISTER_HISTORY_EVENT**
[`boolean`](../data-types.md) | Создавать ли запись в истории изменения. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию — `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример обновления коммерческого предложения:
- идентификатор предложения — `43`
- новая стадия — `SENT`
- обновленный комментарий — `Уточнены условия и сроки`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":43,"fields":{"STATUS_ID":"SENT","COMMENTS":"Уточнены условия и сроки"},"params":{"REGISTER_HISTORY_EVENT":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.quote.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":43,"fields":{"STATUS_ID":"SENT","COMMENTS":"Уточнены условия и сроки"},"params":{"REGISTER_HISTORY_EVENT":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.quote.update
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.quote.update',
    		{
    			id: 43,
    			fields: {
    				STATUS_ID: 'SENT',
    				COMMENTS: 'Уточнены условия и сроки',
    			},
    			params: {
    				REGISTER_HISTORY_EVENT: 'Y',
    			},
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
                'crm.quote.update',
                [
                    'id' => 43,
                    'fields' => [
                        'STATUS_ID' => 'SENT',
                        'COMMENTS' => 'Уточнены условия и сроки',
                    ],
                    'params' => [
                        'REGISTER_HISTORY_EVENT' => 'Y',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Updated: ' . ($result ? 'true' : 'false');

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating quote: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.quote.update',
        {
            id: 43,
            fields: {
                STATUS_ID: 'SENT',
                COMMENTS: 'Уточнены условия и сроки',
            },
            params: {
                REGISTER_HISTORY_EVENT: 'Y',
            },
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
        'crm.quote.update',
        [
            'id' => 43,
            'fields' => [
                'STATUS_ID' => 'SENT',
                'COMMENTS' => 'Уточнены условия и сроки',
            ],
            'params' => [
                'REGISTER_HISTORY_EVENT' => 'Y',
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
        "start": 1773410167,
        "finish": 1773410167.690598,
        "duration": 0.6905980110168457,
        "processing": 0,
        "date_start": "2026-03-13T16:56:07+03:00",
        "date_finish": "2026-03-13T16:56:07+03:00",
        "operating_reset_at": 1773410767,
        "operating": 0.26904988288879395
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Корневой элемент ответа, возвращает `true` в случае успеха ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Quote is not found"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `Parameter 'fields' must be array.` | В `fields` передан не объект ||
|| `-` | `Parameter 'params' must be array.` | В `params` передан не объект ||
|| `-` | `ID is not defined or invalid.` | Передан некорректный `id` ||
|| `-` | `Access denied.` | У пользователя нет прав на изменение коммерческих предложений ||
|| `-` | `Quote is not found` | Коммерческое предложение с переданным `id` не найдено ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-quote-add.md)
- [{#T}](./crm-quote-get.md)
- [{#T}](./crm-quote-list.md)
- [{#T}](./crm-quote-delete.md)
- [{#T}](./crm-quote-fields.md)
- [{#T}](./crm-quote-product-rows-set.md)
- [{#T}](./crm-quote-product-rows-get.md)
