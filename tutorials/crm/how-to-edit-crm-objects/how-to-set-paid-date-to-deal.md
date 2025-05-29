# Как сохранить дату оплаты в поле сделки

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение элемента CRM

В Битрикс24 дата платежа хранится в документах оплаты. Иногда дата оплаты может понадобиться в поле сделки:

- для интеграций с внешними системами,
- отчетов BI-конструктора,
- автоматизаций через роботы и бизнес-процессы.
  
Чтобы перенести информацию о дате оплаты в сделку, последовательно выполним три метода:

1. [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) — получим идентификатор поля сделки, в которое сохраним информацию о дате
2. [crm.item.payment.list](../../../api-reference/crm/universal/payment/crm-item-payment-list.md) — получим информацию об оплате
3. [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md) — сохраним дату оплаты в поле сделки

## 1. Получаем идентификатор поля {#field_id}

Чтобы получить идентификатор поля cделки, используем метод [crm.deal.userfield.list](../../../api-reference/crm/deals/user-defined-fields/crm-deal-userfield-list.md) с параметрами:

- `filter[LANG]` — фильтр по языку используем для вывода названий полей на нужном языке. Без данного фильтра названия выведены не будут.
- `filter[USER_TYPE_ID]` — фильтр по типу поля используем, чтобы получить только поля с типом «Дата» в результате.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'crm.deal.userfield.list',
        {
            filter: {
                LANG: 'ru', 
                USER_TYPE_ID: 'date'
            }
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.userfield.list',
        [
            'filter' => [
                'LANG' => 'ru',
                'USER_TYPE_ID' => 'date'
            ]
        ]
    );
    ```

{% endlist %}

В результате получим информацию обо всех полях сделок с типом «Дата». Определим подходящее поле по названию в параметре `EDIT_FORM_LABEL`. Идентификатор поля возьмем из поля `FIELD_NAME`.

```json
{
    "result": [
        {
            "ID": "6787",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1723209318",
            "USER_TYPE_ID": "date",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "DEFAULT_VALUE": {
                    "TYPE": "NONE",
                    "VALUE": ""
                }
            },
            "EDIT_FORM_LABEL": "Дата оплаты",
            "LIST_COLUMN_LABEL": "Дата оплаты",
            "LIST_FILTER_LABEL": "Дата оплаты",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "6795",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1723206732",
            "USER_TYPE_ID": "date",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "DEFAULT_VALUE": {
                    "TYPE": "NONE",
                    "VALUE": ""
                }
            },
            "EDIT_FORM_LABEL": "Окончание РК",
            "LIST_COLUMN_LABEL": "Окончание РК",
            "LIST_FILTER_LABEL": "Окончание РК",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        },
        {
            "ID": "6805",
            "ENTITY_ID": "CRM_DEAL",
            "FIELD_NAME": "UF_CRM_1723206709",
            "USER_TYPE_ID": "date",
            "XML_ID": null,
            "SORT": "150",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "E",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
                "DEFAULT_VALUE": {
                    "TYPE": "NONE",
                    "VALUE": ""
                }
            },
            "EDIT_FORM_LABEL": "Старт РК",
            "LIST_COLUMN_LABEL": "Старт РК",
            "LIST_FILTER_LABEL": "Старт РК",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null
        }
    ],
    "total": 3,
}
```

## 2. Получаем дату оплаты {#date}

Используем метод [crm.item.payment.list](../../../api-reference/crm/universal/payment/crm-item-payment-list.md) с параметрами:

- `entityId` — `ID` сделки, для которой получаем дату оплаты
- `entityTypeId` — [тип объекта](../../../api-reference/crm/data-types.md#object_type), укажем `2` для сделки

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'crm.item.payment.list', {
            entityId: 6917,
            entityTypeId: 2,
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.item.payment.list',
        [
            'entityId' => 6917,
            'entityTypeId' => 2
        ]
    );
    ```

{% endlist %}

В результате получим список оплат с полями для сделки. Дату оплаты возьмем из поля `datePaid`.

```json
{
    "result": [
        {
            "id": 503,
            "accountNumber": "831/1",
            "paid": "Y",
            "datePaid": "2025-04-29T13:03:20+03:00",
            "empPaidId": 1,
            "paySystemId": 19,
            "sum": 15,
            "currency": "RUB",
            "paySystemName": "ЮKassa"
        }
    ],
}
```

## 3. Сохраним дату в поле сделки
   
Чтобы изменить поле сделки и записать в него дату оплаты, используем метод [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md) с параметрами:

- `id` — `ID` сделки, обязательный параметр
- `fields[UF_CRM_1723209318]` — укажем значение из поля `datePaid`, полученного на [шаге 2](#date). Как идентификатор поля передадим `FIELD_NAME` поля, полученное на [шаге 1](#field_id)

{% list tabs %}

- JS
    
    ```javascript
    BX24.callMethod(
        'crm.deal.update',
        {
            id: 6917,
            fields: {
                UF_CRM_1723209318: "2025-04-29T13:03:20+03:00",
            },
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.update',
        [
            'id' => 6917,
            'fields' => [
                'UF_CRM_1723209318' => '2025-04-29T13:03:20+03:00'
            ]
        ]
    );
    ```

{% endlist %}

В результате получим `true`, изменение сделки прошло успешно. Если в результате вы получили ошибку `error`, изучите описание возможных ошибок в документации метода [crm.deal.update](../../../api-reference/crm/deals/crm-deal-update.md#обработка-ошибок).

```json
{
    "result": true,
}
```

## Проверяем значение поля сделки

В полученном результате нет информации о полях сделки. Чтобы проверить, успешно ли обновилось поле с датой оплаты, выполним метод [crm.deal.get](../../../api-reference/crm/deals/crm-deal-get.md) с параметрами:

- `id` — `ID` сделки, обязательный параметр

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'crm.deal.get',
        {
            id: 6917,
        },
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.deal.get',
        [
            'id' => 6917
        ]
    );
    ```

{% endlist %}

В результате получим значения всех полей сделки, включая пользовательские поля. Значение поля «Дата оплаты» `UF_CRM_1723209318`: `2025-04-29T03:00:00+03:00` установлено успешно.

```json
{
    "result": {
        "ID": "6917",
        "TITLE": "Сделка #6531",
        "TYPE_ID": "SALE",
        "STAGE_ID": "C9:NEW",
        "PROBABILITY": "0",
        "CURRENCY_ID": "RUB",
        "OPPORTUNITY": "30.00",
        "IS_MANUAL_OPPORTUNITY": "N",
        "TAX_VALUE": "0.00",
        "LEAD_ID": null,
        "COMPANY_ID": "0",
        "CONTACT_ID": "275",
        "QUOTE_ID": null,
        "BEGINDATE": "2024-08-20T03:00:00+03:00",
        "CLOSEDATE": "2024-08-27T03:00:00+03:00",
        "ASSIGNED_BY_ID": "1",
        "CREATED_BY_ID": "1",
        "MODIFY_BY_ID": "1",
        "DATE_CREATE": "2025-04-29T00:03:19+03:00",
        "DATE_MODIFY": "2025-05-05T10:17:08+03:00",
        "OPENED": "Y",
        "CLOSED": "N",
        "COMMENTS": "",
        "ADDITIONAL_INFO": null,
        "LOCATION_ID": null,
        "CATEGORY_ID": "9",
        "STAGE_SEMANTIC_ID": "P",
        "IS_NEW": "Y",
        "IS_RECURRING": "N",
        "IS_RETURN_CUSTOMER": "Y",
        "IS_REPEATED_APPROACH": "N",
        "SOURCE_ID": "",
        "SOURCE_DESCRIPTION": "",
        "ORIGINATOR_ID": null,
        "ORIGIN_ID": null,
        "MOVED_BY_ID": "0",
        "MOVED_TIME": "2025-04-29T00:03:19+03:00",
        "LAST_ACTIVITY_TIME": "2025-04-29T13:03:21+03:00",
        "UTM_SOURCE": null,
        "UTM_MEDIUM": null,
        "UTM_CAMPAIGN": null,
        "UTM_CONTENT": null,
        "UTM_TERM": null,
        "PARENT_ID_156": null,
        "PARENT_ID_177": null,
        "LAST_COMMUNICATION_TIME": null,
        "LAST_ACTIVITY_BY": "1",
        "UF_CRM_66976FE3B2425": [],
        "UF_CRM_1723206732": "",
        "UF_CRM_1723206709": "",
        "UF_CRM_1740471712": "",
        "UF_CRM_1723209318": "2025-04-29T03:00:00+03:00",
        "UF_CRM_1722577765": "",
        "UF_CRM_1723188121": ""
    },
}
```

## Пример кода

{% list tabs %}

- JS
  
    ```javascript
    // Шаг 1: Получение FIELD_NAME для поля с EDIT_FORM_LABEL "Дата оплаты"
    BX24.callMethod(
        'crm.deal.userfield.list',
        {
            filter: {
                LANG: 'ru',
                USER_TYPE_ID: 'date'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                const fields = result.data();
                const dateField = fields.find(field => field.EDIT_FORM_LABEL === "Дата оплаты");
                if (dateField) {
                    const fieldName = dateField.FIELD_NAME;
                    console.log("FIELD_NAME для 'Дата оплаты':", fieldName);

                    // Шаг 2: Запрос ID сделки у пользователя и получение даты оплаты
                    const dealId = prompt("Введите ID сделки:");
                    BX24.callMethod(
                        'crm.item.payment.list',
                        {
                            entityId: dealId,
                            entityTypeId: 2
                        },
                        function(result) {
                            if (result.error()) {
                                console.error(result.error());
                            } else {
                                const payments = result.data();
                                if (payments.length > 0) {
                                    const datePaid = payments[0].datePaid;
                                    console.log("Дата оплаты:", datePaid);

                                    // Шаг 3: Изменение сделки
                                    BX24.callMethod(
                                        'crm.deal.update',
                                        {
                                            id: dealId,
                                            fields: {
                                                [fieldName]: datePaid
                                            }
                                        },
                                        function(result) {
                                            if (result.error()) {
                                                console.error(result.error());
                                            } else {
                                                console.log("Сделка успешно обновлена");
                                            }
                                        }
                                    );
                                }
                            }
                        }
                    );
                }
            }
        }
    );
    ```

- PHP
  
    ```php
    require_once('crest.php');

    // Шаг 1: Получение FIELD_NAME для поля с EDIT_FORM_LABEL "Дата оплаты"
    $result = CRest::call(
        'crm.deal.userfield.list',
        [
            'filter' => [
                'LANG' => 'ru',
                'USER_TYPE_ID' => 'date'
            ]
        ]
    );

    if (!empty($result['error'])) {
        echo "Error: " . $result['error_description'];
    } else {
        $fields = $result['result'];
        $dateField = null;

        foreach ($fields as $field) {
            if ($field['EDIT_FORM_LABEL'] === "Дата оплаты") {
                $dateField = $field;
                break;
            }
        }

        if ($dateField) {
            $fieldName = $dateField['FIELD_NAME'];
            echo "FIELD_NAME для 'Дата оплаты': " . $fieldName . "\n";

            // Шаг 2: Запрос ID сделки у пользователя и получение даты оплаты
            $dealId = readline("Введите ID сделки: ");
            $paymentResult = CRest::call(
                'crm.item.payment.list',
                [
                    'entityId' => $dealId,
                    'entityTypeId' => 2
                ]
            );

            if (!empty($paymentResult['error'])) {
                echo "Error: " . $paymentResult['error_description'];
            } else {
                $payments = $paymentResult['result'];
                if (count($payments) > 0) {
                    $datePaid = $payments[0]['datePaid'];
                    echo "Дата оплаты: " . $datePaid . "\n";

                    // Шаг 3: Изменение сделки
                    $updateResult = CRest::call(
                        'crm.deal.update',
                        [
                            'id' => $dealId,
                            'fields' => [
                                $fieldName => $datePaid
                            ]
                        ]
                    );

                    if (!empty($updateResult['error'])) {
                        echo "Error: " . $updateResult['error_description'];
                    } else {
                        echo "Сделка успешно обновлена\n";
                    }
                }
            }
        }
    }
    ```

{% endlist %}