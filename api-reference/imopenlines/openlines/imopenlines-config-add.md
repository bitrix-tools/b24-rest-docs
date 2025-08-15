# Добавить новую открытую линию imopenlines.config.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет новую открытую линию.

## Параметры метода

#|
|| **Название**
`Тип`  | **Описание** | **С версии** ||
|| **PARAMS**
[`unknown`](../../data-types.md) | Массив параметров для добавления (необязательный). Список полей — ниже | ||
|#

## Список полей

#|
|| **Название**
`Тип` | **Описание** ||
|| **WELCOME_BOT_ENABLE**
[`unknown`](../../data-types.md) | При обращении клиента назначить ответственным чат-бота. [Y/N (по умолчанию)] — эта опция должна быть Y, чтобы бот работал ||
|| **WELCOME_BOT_JOIN**
[`unknown`](../../data-types.md) | Когда подключать чат-бота (`first` (по-умолчанию), always) ||
|| **WELCOME_BOT_ID**
[`unknown`](../../data-types.md) | Идентификатор бота (int, по-умолчанию 0) ||
|| **WELCOME_BOT_TIME**
[`unknown`](../../data-types.md) | Через какое время переводить разговор от чат-бота в очередь (int, 60 по умолчанию) ||
|| **WELCOME_BOT_LEFT**
[`unknown`](../../data-types.md) | Когда отключать чат-бота (`queue` (по-умолчанию), close) ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | Активность линии [Y/N (по умолчанию)] ||
|| **LINE_NAME**
[`unknown`](../../data-types.md) | Название линии (необязательный) ||
|| **CRM**
[`unknown`](../../data-types.md) | Проверять пользователя по CRM [Y/N (по умолчанию)] ||
|| **CRM_CREATE**
[`unknown`](../../data-types.md) | Если клиент не найден в CRM (строка, по-умолчанию `none`) ||
|| **CRM_FORWARD**
[`unknown`](../../data-types.md) | Направлять обращение на ответственного сотрудника в случае идентификации клиента [Y (по умолчанию)/N] ||
|| **CRM_SOURCE**
[`unknown`](../../data-types.md) | Источник для нового лида (строка, по-умолчанию 'create') ||
|| **CRM_TRANSFER_CHANGE**
[`unknown`](../../data-types.md) | Автоматически менять ответственного за лид при ручном перенаправлении обращения на другого оператора [Y (по умолчанию)/N] ||
|| **QUEUE_TIME**
[`unknown`](../../data-types.md) | Время до перехода обращения к следующему сотруднику из очереди (int, 60 по умолчанию) ||
|| **NO_ANSWER_TIME**
[`unknown`](../../data-types.md) | Время до отметки сообщения как неотвеченного (int, 60 по умолчанию) ||
|| **QUEUE_TYPE**
[`unknown`](../../data-types.md) | Тип очереди (`evenly` (по-умолчанию), strictly, all) ||
|| **TIMEMAN**
[`unknown`](../../data-types.md) | Не направлять обращение на оператора, если не начат рабочий день или установлен перерыв [Y/N (по умолчанию)] ||
|| **CHECK_ONLINE**
[`unknown`](../../data-types.md) | При распределении обращений проверять доступность оператора [Y/N (по умолчанию)] ||
|| **CHECKING_OFFLINE**
[`unknown`](../../data-types.md) | Постоянная проверка доступности оператора при распределении обращений [Y/N (по умолчанию)] ||
|| **WELCOME_MESSAGE**
[`unknown`](../../data-types.md) | Отправить автоматический ответ на первое сообщение клиента [Y (по умолчанию)/N] ||
|| **WELCOME_MESSAGE_TEXT**
[`unknown`](../../data-types.md) | Текст автоматического ответа (строка, по-умолчанию null) ||
|| **AGREEMENT_MESSAGE**
[`unknown`](../../data-types.md) | Отправить предупреждение о сборе персональных данных [Y/N (по умолчанию)] ||
|| **AGREEMENT_ID**
[`unknown`](../../data-types.md) | ID соглашения в системе (int, 0 по-умолчанию) ||
|| **NO_ANSWER_RULE**
[`unknown`](../../data-types.md) | Действие если операторы не ответили на обращение (`none` (по-умолчанию), text) ||
|| **NO_ANSWER_TEXT**
[`unknown`](../../data-types.md) | Текст автоматического ответа (строка, по-умолчанию `null`) ||
|| **WORKTIME_ENABLE**
[`unknown`](../../data-types.md) | Настройка рабочего времени Открытой линии [Y/N (по умолчанию)] ||
|| **WORKTIME_FROM**
[`unknown`](../../data-types.md) | Режим работы "c" (строка формата '00:00') ||
|| **WORKTIME_TO**
[`unknown`](../../data-types.md) | Режим работы "до" (строка формата '00:00') ||
|| **WORKTIME_TIMEZONE**
[`unknown`](../../data-types.md) | Временная зона (формат типа 'Europe/Kaliningrad') ||
|| **WORKTIME_HOLIDAYS**
[`unknown`](../../data-types.md) | Список праздничных дней (строка, Пример: 1.01,2.01,7.01,23.02,8.03,1.05,9.05,12.06,4.11,12.12) ||
|| **WORKTIME_DAYOFF**
[`unknown`](../../data-types.md) | Список кодов выходных дней (массив, пример ['MO', 'TU']) ||
|| **WORKTIME_DAYOFF_RULE**
[`unknown`](../../data-types.md) | Обработка обращения в нерабочее время (`none` (по-умолчанию), 'text') ||
|| **WORKTIME_DAYOFF_TEXT**
[`unknown`](../../data-types.md) | Текст автоматического ответа (в нерабочее время) (строка, по-умолчанию `null`) ||
|| **CLOSE_RULE**
[`unknown`](../../data-types.md) | Действие при завершении обращения клиента ('none', `text` (по-умолчанию)) ||
|| **CLOSE_TEXT**
[`unknown`](../../data-types.md) | Текст автоматического ответа (строка, по-умолчанию `null`) ||
|| **FULL_CLOSE_TIME**
[`unknown`](../../data-types.md) | Время до полного закрытия обращения (с момента закрытия его оператором) (int, по-умолчанию 10 минут) ||
|| **AUTO_CLOSE_RULE**
[`unknown`](../../data-types.md) | Будет выполнено действие при автоматическом закрытии (`none` (по-умолчанию), 'text') ||
|| **AUTO_CLOSE_TEXT**
[`unknown`](../../data-types.md) | Текст автоматического ответа (строка, по-умолчанию null) ||
|| **AUTO_CLOSE_TIME**
[`unknown`](../../data-types.md) | Время последней активности для автозакрытия диалога (int, по-умолчанию 0) ||
|| **VOTE_MESSAGE**
[`unknown`](../../data-types.md) | Отправлять запрос клиенту на оценку качества обслуживания, char(1),[Y (по умолчанию)/N] ||
|| **VOTE_CLOSING_DELAY**
[`unknown`](../../data-types.md) | Закрывать сессию сразу после оценки клиентом, char(1), [Y/N (по умолчанию)] ||
|| **VOTE_MESSAGE_1_TEXT**
[`unknown`](../../data-types.md) | Текст для запроса оценки в онлайн-чате и bitrix24 network ||
|| **VOTE_MESSAGE_1_LIKE**
[`unknown`](../../data-types.md) | Текст для положительной оценки в онлайн-чате и bitrix24 network ||
|| **VOTE_MESSAGE_1_DISLIKE**
[`unknown`](../../data-types.md) | Текст для отрицательной оценки в онлайн-чате и bitrix24 network ||
|| **VOTE_MESSAGE_2_TEXT**
[`unknown`](../../data-types.md) | Текст для запроса оценки в других каналах (Viber, Telegram, Facebook*, Вконтакте и другие) ||
|| **VOTE_MESSAGE_2_LIKE**
[`unknown`](../../data-types.md) | Текст для положительной оценки в других каналах (Viber, Telegram, Facebook*, Вконтакте и другие) ||
|| **VOTE_MESSAGE_2_DISLIKE**
[`unknown`](../../data-types.md) | Текст для отрицательной оценки в других каналах (Viber, Telegram, Facebook*, Вконтакте и другие) ||
|| **QUICK_ANSWERS_IBLOCK_ID**
[`unknown`](../../data-types.md) | Идентификатор инфоблока быстрых ответов (по-умолчанию, 0) ||
|| **LANGUAGE_ID**
[`unknown`](../../data-types.md) | Настройка языковых предпочтений (char(2), по-умолчанию `null`) ||
|| **OPERATOR_DATA**
[`unknown`](../../data-types.md) | Информация об операторах в очереди (`profile` (по-умолчанию), queue, hide) ||
|| **DEFAULT_OPERATOR_DATA**
[`unknown`](../../data-types.md) | Информация об операторах по-умолчанию. Массив, поля:
- NAME — имя
- AVATAR — ссылка на аватар
- AVATAR_ID — идентификатор файла аватара на портале ||
|| **QUEUE**
[`unknown`](../../data-types.md) | Очередь ответственных сотрудников. Массив, поля:
- U — массив id пользователей, которых добавить в очередь. Можно передавать в формате
    ```js
    `QUEUE: [
        {
            ENTITY_TYPE: "user",
            ENTITY_ID: "1"
        }
    ]
    ```
 ||
|| **QUEUE_OPERATOR_DATA**
[`unknown`](../../data-types.md) | Данные операторов для отображения в чате. Массив, поля:
- U — массив пользователей с данными вида "ID пользователя" => массив данных:
  - NAME — имя
  - USER_WORK_POSITION — должность
  - AVATAR — ссылка на аватар
  - AVATAR_ID — идентификатор файла аватара на портале ||
|#

\* — *Социальная сеть признана экстремистской и запрещена на территории Российской Федерации.*


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
    	const params = {
    		PARAMS: {
    			LINE_NAME: 'New line name',
    			...
    		}
    	};
    	
    	const response = await $b24.callMethod(
    		'imopenlines.config.add',
    		params
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
                'LINE_NAME' => 'New line name',
                // Другие параметры
            ],
        ];
    
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.config.add',
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
        echo 'Error adding configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    //imopenlines.config.add
    function configAdd()
    {
        var params = {
            PARAMS: {
                LINE_NAME: 'New line name',
                ...
            }
        };
        BX24.callMethod(
            'imopenlines.config.add',
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

