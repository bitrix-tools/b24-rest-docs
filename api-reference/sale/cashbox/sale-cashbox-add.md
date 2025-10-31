# Добавить кассу sale.cashbox.add

> Scope: [`sale, cashbox`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор CRM (право «Разрешить изменять настройки»)

Метод добавляет кассу.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}
 
#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../data-types.md) | Название кассы ||
|| **REST_CODE***
[`sale_cashbox_handler.CODE`](../data-types.md#sale_cashbox_handler) | Код REST-обработчика кассы. Указывается при добавлении обработчика в методе [sale.cashbox.handler.add](./sale-cashbox-handler-add.md) в параметре `CODE` ||
|| **EMAIL***
[`string`](../../data-types.md) | Адрес электронной почты, на который будут отправляться уведомления в случае возникновения ошибок при печати чеков ||
|| **OFD**
[`string`](../../data-types.md) | Код обработчика ОФД. Доступные обработчики ОФД: 
- `bx_firstofd` — Первый ОФД 
- `bx_platformaofd` — Платформа ОФД 
- `bx_yarusofd` — ОФД ЯРУС
- `bx_taxcomofd` — Такском ОФД 
- `bx_ofdruofd` — OFD.RU 
- `bx_tenzorofd` — Тензор ОФД 
- `bx_conturofd` — Контур ОФД 

По умолчанию без ОФД
||
|| **OFD_SETTINGS**
[`object`](../../data-types.md) | Настройки ОФД (подробное описание приведено [ниже](#ofd_settings)). 

По умолчанию пустой массив 
||
|| **NUMBER_KKM**
[`string`](../../data-types.md) | Внешний идентификатор кассы.

По умолчанию пуст ||
|| **ACTIVE**
[`string`](../../data-types.md) | Активность кассы. Возможные значения:
- `Y` — да
- `N` — нет
  
Значение по умолчанию: `N` ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка. По умолчанию `100` ||
|| **USE_OFFLINE**
[`string`](../../data-types.md) | Используется ли касса офлайн. Возможные значения:
- `Y` — да
- `N` — нет
  
Значение по умолчанию: `N`
||
|| **SETTINGS**
[`array`](../../data-types.md) | Настройки кассы в соответствии со структурой настроек, переданной в ключе `CONFIG` поля `SETTINGS` метода [sale.cashbox.handler.add](./sale-cashbox-handler-add.md).

По умолчанию пусты ||
|#

### Параметр OFD_SETTINGS {#ofd_settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Настройки для всех ОФД** |  ||
|| **OFD_MODE**
[`object`](../../data-types.md) | Настройки, относящиеся к режиму работы ОФД. Передается параметр `IS_TEST` ([`string`](../../data-types.md) со значениями `Y/N`) — режим работы ОФД: 
- `Y` — тестовый режим 
- `N` — рабочий режим ||
|| **Дополнительные настройки для OFD.RU** |  ||
|| **SELLER_INFO**
[`object`](../../data-types.md) | Настройки раздела «Информация о продавце». Передается обязательный параметр `INN` ([`string`](../../data-types.md)) — ИНН продавца
||
|| **Дополнительные настройки для ОФД ЯРУС** |  ||
|| **AUTH**
[`object`](../../data-types.md) | Настройки авторизации. Передается параметр `INN` ([`string`](../../data-types.md)) — ключ безопасности
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Rest-касса","REST_CODE":"restcashbox01","EMAIL":"user@example.com","NUMBER_KKM":"123","ACTIVE":"Y","SORT":100,"OFD":"bx_ofdruofd","OFD_SETTINGS":{"OFD_MODE":{"IS_TEST":"N"}},"SETTINGS":{"AUTH":{"KEYWORD":"top_secret!","PREFERENCE":"SECOND"},"INTERACTION":{"MODE":"ACTIVE"}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.cashbox.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NAME":"Rest-касса","REST_CODE":"restcashbox01","EMAIL":"user@example.com","NUMBER_KKM":"123","ACTIVE":"Y","SORT":100,"OFD":"bx_ofdruofd","OFD_SETTINGS":{"OFD_MODE":{"IS_TEST":"N"}},"SETTINGS":{"AUTH":{"KEYWORD":"top_secret!","PREFERENCE":"SECOND"},"INTERACTION":{"MODE":"ACTIVE"}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.cashbox.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"sale.cashbox.add",
    		{
    			"NAME": 'Rest-касса',
    			"REST_CODE": 'restcashbox01',
    			"EMAIL": "user@example.com",
    			"NUMBER_KKM": "123",
    			"ACTIVE": "Y",
    			"SORT": 100,
    			"OFD": "bx_ofdruofd",
    			"OFD_SETTINGS":
    			{
    				"OFD_MODE":
    				{
    					"IS_TEST": "N"
    				}
    			},
    			"SETTINGS":
    			{
    				"AUTH":
    				{
    					"KEYWORD": "top_secret!",
    					"PREFERENCE": "SECOND"
    				},
    				"INTERACTION":
    				{
    					"MODE": "ACTIVE"
    				}
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.dir(result);
    }
    catch(error)
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
                'sale.cashbox.add',
                [
                    'NAME'       => 'Rest-касса',
                    'REST_CODE'  => 'restcashbox01',
                    'EMAIL'      => 'user@example.com',
                    'NUMBER_KKM' => '123',
                    'ACTIVE'     => 'Y',
                    'SORT'       => 100,
                    'OFD'        => 'bx_ofdruofd',
                    'OFD_SETTINGS' => [
                        'OFD_MODE' => [
                            'IS_TEST' => 'N'
                        ]
                    ],
                    'SETTINGS' => [
                        'AUTH' => [
                            'KEYWORD'    => 'top_secret!',
                            'PREFERENCE' => 'SECOND'
                        ],
                        'INTERACTION' => [
                            'MODE' => 'ACTIVE'
                        ]
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding cashbox: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "sale.cashbox.add",
        {
            "NAME": 'Rest-касса',
            "REST_CODE": 'restcashbox01',
            "EMAIL": "user@example.com",
            "NUMBER_KKM": "123",
            "ACTIVE": "Y",
            "SORT": 100,
            "OFD": "bx_ofdruofd",
            "OFD_SETTINGS":
            {
                "OFD_MODE":
                {
                    "IS_TEST": "N"
                }
            },
            "SETTINGS":
            {
                "AUTH":
                {
                    "KEYWORD": "top_secret!",
                    "PREFERENCE": "SECOND"
                },
                "INTERACTION":
                {
                    "MODE": "ACTIVE"
                }
            }
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
        'sale.cashbox.add',
        [
            'NAME' => 'Rest-касса',
            'REST_CODE' => 'restcashbox01',
            'EMAIL' => 'user@example.com',
            'NUMBER_KKM' => '123',
            'ACTIVE' => 'Y',
            'SORT' => 100,
            'OFD' => 'bx_ofdruofd',
            'OFD_SETTINGS' =>
            [
                'OFD_MODE' =>
                [
                    'IS_TEST' => 'N'
                ]
            ],
            'SETTINGS' =>
            [
                'AUTH' =>
                [
                    'KEYWORD' => 'top_secret!',
                    'PREFERENCE' => 'SECOND'
                ],
                'INTERACTION' =>
                [
                    'MODE' => 'ACTIVE'
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../../../tutorials/sale/cashbox-add-example.md)

{% endnote %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 5,
    "time": {
        "start": 1712132792.910734,
        "finish": 1712132793.530359,
        "duration": 0.6196250915527344,
        "processing": 0.032338857650756836,
        "date_start": "2024-04-03T10:26:32+02:00",
        "date_finish": "2024-04-03T10:26:33+02:00",
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
[`sale_cashbox.ID`](../data-types.md#sale_cashbox) | Идентификатор добавленной кассы ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ERROR_CHECK_FAILURE",
    "error_description": "Parameter NAME is not defined"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Статус** ||
|| `ACCESS_DENIED` | Недостаточно прав для добавления кассы | 403 ||
|| `ERROR_CHECK_FAILURE` | Не указано значение обязательного поля либо значение одного из полей указано неверно | 400 ||
|| `ERROR_CASHBOX_ADD` | Прочие ошибки. Более подробную информацию об ошибке можно найти в `error_description` | 400 ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sale-cashbox-handler-add.md)
- [{#T}](./sale-cashbox-handler-update.md)
- [{#T}](./sale-cashbox-handler-list.md)
- [{#T}](./sale-cashbox-handler-delete.md)
- [{#T}](./sale-cashbox-update.md)
- [{#T}](./sale-cashbox-list.md)
- [{#T}](./sale-cashbox-delete.md)
- [{#T}](./sale-cashbox-check-apply.md)
- [{#T}](../../../tutorials/sale/cashbox-add-example.md)