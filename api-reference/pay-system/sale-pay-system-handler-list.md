# Получить список REST-обработчиков платежной системы sale.paysystem.handler.list

> Scope: [`pay_system `](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод возвращает список REST-обработчиков платежной системы.

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.paysystem.handler.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/sale.paysystem.handler.list?auth=**put_access_token_here**
    ```

- JS


    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    try {
      const response = await $b24.callListMethod(
        'sale.paysystem.handler.list',
        {},
        (progress) => { console.log('Progress:', progress) }
      )
      const items = response.getData() || []
      for (const entity of items) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    try {
      const generator = $b24.fetchListMethod('sale.paysystem.handler.list', {}, 'ID')
      for await (const page of generator) {
        for (const entity of page) { console.log('Entity:', entity) }
      }
    } catch (error) {
      console.error('Request failed', error)
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    try {
      const response = await $b24.callMethod('sale.paysystem.handler.list', {}, 0)
      const result = response.getData().result || []
      for (const entity of result) { console.log('Entity:', entity) }
    } catch (error) {
      console.error('Request failed', error)
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.paysystem.handler.list',
                []
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
        echo 'Error fetching paysystem handlers: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.paysystem.handler.list",
        {},
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
        'sale.paysystem.handler.list',
        []
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
            "ID": "1",
            "NAME": "Обработчик Rest",
            "CODE": "resthandlercodedoc",
            "SORT": "100",
            "SETTINGS": {
                "CURRENCY": [
                    "RUB"
                ],
                "FORM_DATA": {
                    "ACTION_URI": "http://example.com/payment_form.php",
                    "METHOD": "POST",
                    "FIELDS": {
                        "phone": {
                            "VISIBLE": "Y",
                            "CODE": {
                                "NAME": "Номер телефона",
                                "TYPE": "STRING"
                            }
                        },
                        "paymentId": {
                            "CODE": "PAYMENT_ID",
                            "VISIBLE": "Y"
                        },
                        "serviceid": {
                            "CODE": "REST_SERVICE_ID"
                        }
                    }
                },
                "CODES": {
                    "REST_SERVICE_ID": {
                        "NAME": "Номер магазина",
                        "DESCRIPTION": "Номер магазина",
                        "SORT": "100"
                    },
                    "REST_SERVICE_KEY": {
                        "NAME": "Секретный ключ",
                        "DESCRIPTION": "Секретный ключ",
                        "SORT": "300"
                    },
                    "PAYMENT_ID": {
                        "NAME": "Номер оплаты",
                        "SORT": "400",
                        "GROUP": "PAYMENT",
                        "DEFAULT": {
                            "PROVIDER_KEY": "PAYMENT",
                            "PROVIDER_VALUE": "ACCOUNT_NUMBER"
                        }
                    },
                    "PS_CHANGE_STATUS_PAY": {
                        "NAME": "Автоматическая смена статуса оплаты",
                        "SORT": "700",
                        "INPUT": {
                            "TYPE": "Y/N"
                        }
                    },
                    "PAYMENT_BUYER_ID": {
                        "NAME": "Код покупателя",
                        "SORT": "1000",
                        "GROUP": "PAYMENT",
                        "DEFAULT": {
                            "PROVIDER_KEY": "ORDER",
                            "PROVIDER_VALUE": "USER_ID"
                        }
                    },
                    "PS_WORK_MODE": {
                        "NAME": "Режим работы платёжной системы",
                        "SORT": "1100",
                        "INPUT": {
                            "TYPE": "ENUM",
                            "OPTIONS": {
                                "TEST": "Тестовый",
                                "REGULAR": "Рабочий"
                            }
                        }
                    }
                }
            }
        }
    ],
    "time": {
        "start": 1712135335.026931,
        "finish": 1712135335.407762,
        "duration": 0.3808310031890869,
        "processing": 0.0336611270904541,
        "date_start": "2024-04-03T11:08:55+02:00",
        "date_finish": "2024-04-03T11:08:55+02:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`sale_paysystem_handler[]`](../sale/data-types.md) | Список зарегистрированных REST-обработчиков платежных систем ||
|| **time**
[`time`](../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Доступ запрещен. Приложение пытается изменить обработчик, добавленный другим приложением, либо недостаточно прав для обновления обработчика | 403 ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-pay-system-handler-add.md)
- [{#T}](./sale-pay-system-handler-update.md)
- [{#T}](./sale-pay-system-handler-delete.md)
- [{#T}](./sale-pay-system-add.md)
- [{#T}](./sale-pay-system-update.md)
- [{#T}](./sale-pay-system-list.md)
- [{#T}](./sale-pay-system-settings-get.md)
- [{#T}](./sale-pay-system-settings-update.md)
- [{#T}](./sale-pay-system-delete.md)
- [{#T}](./sale-pay-system-pay-payment.md)
- [{#T}](./sale-pay-system-pay-invoice.md)
- [{#T}](./sale-pay-system-settings-payment-get.md)
- [{#T}](./sale-pay-system-settings-invoice-get.md)