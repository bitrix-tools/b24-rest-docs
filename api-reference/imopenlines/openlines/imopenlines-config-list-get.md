# Получить список открытых линий imopenlines.config.list.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют параметры или поля
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список открытых линий.

## Параметры метода

#|
|| **Название**
`Тип` | **Описание** ||
|| **PARAMS**
[`array`](../../data-types.md) | Массив параметров для выборки (select, order, filter) (необязательный). Список доступных полей есть в описании метода [imopenlines.config.add](./imopenlines-config-add.md) ||
|| **OPTIONS**
[`array`](../../data-types.md) | Массив дополнительных опций (необязательный). Сейчас включает только поле 'QUEUE' => 'Y'/'N' — очередь ответственных сотрудников ||
|#

## Примеры

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'imopenlines.config.list.get',
    		{
    			PARAMS: {
    				select: [
    					'ID',
    					...
    				],
    				order: {
    					ID: 'ASC',
    					...
    				},
    				filter: {
    					ID: 1,
    					...
    				}
    			},
    			OPTIONS: {
    				QUEUE: 'Y'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    		alert("Error: " + result.error());
    	else
    		alert("Успешно: " + result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $params = [
            'PARAMS' => [
                'select' => [
                    'ID',
                    ...
                ],
                'order' => [
                    'ID' => 'ASC',
                    ...
                ],
                'filter' => [
                    'ID' => 1,
                    ...
                ]
            ],
            'OPTIONS' => [
                'QUEUE' => 'Y'
            ]
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.config.list.get',
                $params
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Успешно: ' . $result->data();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling imopenlines.config.list.get: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    //imopenlines.config.list.get
    function configListGet()
    {
        var params = {
            PARAMS: {
                select: [
                    'ID',
                    ...
                ],
                order: {
                    ID: 'ASC',
                    ...
                },
                filter: {
                    ID: 1,
                    ...
                }
            },
            OPTIONS: {
                QUEUE: 'Y'
            }
        };
        BX24.callMethod(
            'imopenlines.config.list.get',
            params,
            function (result) {
                if (result.error())
                    alert("Error: " + result.error());
                else
                    alert("Успешно: " + result.data());
            }
        );
    }
    ```

- PHP CRest

    // пример для php

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "1",
            "ACTIVE": "Y",
            "LINE_NAME": "WhatsApp",
            "CRM": "Y",
            "CRM_CREATE": "lead",
            "CRM_CREATE_SECOND": "0",
            "CRM_CREATE_THIRD": "Y",
            "CRM_FORWARD": "Y",
            "CRM_CHAT_TRACKER": "N",
            "CRM_TRANSFER_CHANGE": "Y",
            "CRM_SOURCE": "1|WZ_WHATSAPP_CASJK2QWBRWQ5ASBQWKEBN4QWBENAL2BA",
            "QUEUE_TIME": "900",
            "NO_ANSWER_TIME": "60",
            "QUEUE_TYPE": "all",
            "CHECK_AVAILABLE": "N",
            "WATCH_TYPING": "Y",
            "WELCOME_BOT_ENABLE": "N",
            "WELCOME_MESSAGE": "N",
            "WELCOME_MESSAGE_TEXT": "Добро пожаловать в Открытую линию [br]Вам ответит первый освободившийся оператор.",
            "VOTE_MESSAGE": "N",
            "VOTE_TIME_LIMIT": "0",
            "VOTE_BEFORE_FINISH": "Y",
            "VOTE_CLOSING_DELAY": "N",
            "VOTE_MESSAGE_1_TEXT": "Пожалуйста, оцените качество обслуживания.",
            "VOTE_MESSAGE_1_LIKE": "Спасибо за оценку!",
            "VOTE_MESSAGE_1_DISLIKE": "Очень жаль, что мы не смогли помочь вам, мы постараемся стать лучше.",
            "VOTE_MESSAGE_2_TEXT": "Пожалуйста, оцените качество обслуживания.\r\n\r\nОтправьте: 1 - хорошо, 0 - плохо",
            "VOTE_MESSAGE_2_LIKE": "Спасибо за оценку!",
            "VOTE_MESSAGE_2_DISLIKE": "Очень жаль, что мы не смогли помочь вам, мы постараемся стать лучше.",
            "AGREEMENT_MESSAGE": "N",
            "AGREEMENT_ID": "0",
            "CATEGORY_ENABLE": "N",
            "CATEGORY_ID": "0",
            "WELCOME_BOT_JOIN": "always",
            "WELCOME_BOT_ID": "0",
            "WELCOME_BOT_TIME": "600",
            "WELCOME_BOT_LEFT": "queue",
            "NO_ANSWER_RULE": "none",
            "NO_ANSWER_FORM_ID": "0",
            "NO_ANSWER_BOT_ID": "0",
            "NO_ANSWER_TEXT": "К сожалению, в данный момент мы не можем вам ответить, мы обязательно с вами свяжемся.",
            "WORKTIME_ENABLE": "N",
            "WORKTIME_FROM": "9",
            "WORKTIME_TO": "18",
            "WORKTIME_TIMEZONE": "Asia/Yekaterinburg",
            "WORKTIME_HOLIDAYS": [
                ""
            ],
            "WORKTIME_DAYOFF": [
                "SA",
                "SU"
            ],
            "WORKTIME_DAYOFF_RULE": "text",
            "WORKTIME_DAYOFF_FORM_ID": "0",
            "WORKTIME_DAYOFF_BOT_ID": "0",
            "WORKTIME_DAYOFF_TEXT": "Добро пожаловать в Открытую линию [br]К сожалению, в данный момент мы не можем вам ответить.[br][br]Напишите свой вопрос и мы обязательно свяжемся с вами в рабочее время.",
            "CLOSE_RULE": "none",
            "CLOSE_FORM_ID": "0",
            "CLOSE_BOT_ID": "0",
            "CLOSE_TEXT": "Спасибо, что обратились в нашу компанию.",
            "FULL_CLOSE_TIME": "10",
            "AUTO_CLOSE_RULE": "none",
            "AUTO_CLOSE_FORM_ID": "0",
            "AUTO_CLOSE_BOT_ID": "0",
            "AUTO_CLOSE_TIME": "2678400",
            "AUTO_CLOSE_TEXT": "",
            "AUTO_EXPIRE_TIME": "86400",
            "DATE_CREATE": {},
            "DATE_MODIFY": {},
            "MODIFY_USER_ID": "177",
            "TEMPORARY": "N",
            "XML_ID": None,
            "LANGUAGE_ID": "ru",
            "QUICK_ANSWERS_IBLOCK_ID": "53",
            "SESSION_PRIORITY": "0",
            "TYPE_MAX_CHAT": "answered",
            "MAX_CHAT": "0",
            "OPERATOR_DATA": "queue",
            "DEFAULT_OPERATOR_DATA": [],
            "KPI_FIRST_ANSWER_TIME": "0",
            "KPI_FIRST_ANSWER_ALERT": "N",
            "KPI_FIRST_ANSWER_LIST": False,
            "KPI_FIRST_ANSWER_TEXT": "Сотрудник #OPERATOR# превысил допустимое время ответа клиенту на первое сообщение. Диалог №#DIALOG#.",
            "KPI_FURTHER_ANSWER_TIME": "0",
            "KPI_FURTHER_ANSWER_ALERT": "N",
            "KPI_FURTHER_ANSWER_LIST": False,
            "KPI_FURTHER_ANSWER_TEXT": "Сотрудник #OPERATOR# превысил допустимое время ответа клиенту на сообщение. Диалог №#DIALOG#.",
            "KPI_CHECK_OPERATOR_ACTIVITY": "N",
            "SEND_NOTIFICATION_EMPTY_QUEUE": "N",
            "USE_WELCOME_FORM": "N",
            "WELCOME_FORM_ID": "5",
            "WELCOME_FORM_DELAY": "Y",
            "SEND_WELCOME_EACH_SESSION": "N",
            "CONFIRM_CLOSE": "Y",
            "IGNORE_WELCOME_FORM_RESPONSIBLE": "N"
        },
        // .. Еще 49 элементов
    ],
    "next": 50,
    "total": 123456,
    "time": {
        "start": 1730383163.284897,
        "finish": 1730383163.308128,
        "duration": 0.023231029510498047,
        "processing": 0.001950979232788086,
        "date_start": "2024-10-31T16:59:23+03:00",
        "date_finish": "2024-10-31T16:59:23+03:00",
        "operating_reset_at": 1730383763,
        "operating": 0
    }
}
```
