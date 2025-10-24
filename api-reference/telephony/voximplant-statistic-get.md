# Получить список истории звонков voximplant.statistic.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony all](./_includes/scope-telephony-all.md) %}

Метод `voximplant.statistic.get` Возвращает список истории звонков. Списочный метод. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Статистика звонков - Просмотр` в соответствии с его значением этого права.

#|
|| **Параметр** | **Описание** ||
|| **FILTER** | Поля для фильтрации ||
|| **SORT** | По какому полю производится сортировка ||
|| **ORDER** | Порядок сортировки (ASC/DESC) ||
|#

## Возвращаемые данные

#|
|| **Параметр** | **Описание** ||
|| **CALL_ID** | Идентификатор звонка ||
|| **ID** | Идентификатор звонка (для внутренних целей) ||
|| **CALL_TYPE** | Тип звонка: 
- `1` — исходящий,
- `2` — входящий,
- `3` — входящий с перенаправлением на мобильный или стационарный телефон,
- `4` — обратный звонок ||
|| **CALL_VOTE** | По умолчанию - 0. Оценка звонка используется только для внутренней телефонии ||
|| **COMMENT** | Комментарий к звонку ||
|| **PORTAL_USER_ID** | Идентификатор ответившего оператора (если это тип звонка: 2 - Входящий) или идентификатор позвонившего оператора (если это тип звонка: 1 - Исходящий) ||
|| **PORTAL_NUMBER** | Номер, на который поступил звонок (если это тип звонка: 2 - Входящий) или номер, с которого был совершен звонок (1 - Исходящий) ||
|| **PHONE_NUMBER** | Номер, с которого звонит абонент (если это тип звонка: 2 - Входящий) или номер, которому звонит оператор (1 - Исходящий) ||
|| **CALL_DURATION** | Продолжительность звонка в секундах ||
|| **CALL_START_DATE** | Время инициализации звонка. При сортировке по этому полю нужно указывать дату в формате ISO-8601 ||
|| **CALL_LOG** | Строка содержит ссылку на лог звонка ||
|| **COST** | Стоимость звонка ||
|| **COST_CURRENCY** | Валюта звонка (RUR, USD, EUR) ||
|| **CALL_FAILED_CODE** | Код вызова (см. таблицу кодов вызова) ||
|| **CALL_FAILED_REASON** | Текстовое описание кода вызова (латиница) ||
|| **CRM_ACTIVITY_ID** | Идентификатор дела CRM, созданного на основании звонка ||
|| **CRM_ENTITY_ID** | Идентификатор объекта CRM, к которому прикреплено дело ||
|| **CRM_ENTITY_TYPE** | Тип объекта CRM, к которому прикреплено дело, например: LEAD ||
|| **REST_APP_ID** | Идентификатор приложения интеграции внешней телефонии ||
|| **REST_APP_NAME** | Название приложения интеграции внешней телефонии ||
|| **REDIAL_ATTEMPT** | Номер попытки дозвониться (для обратных звонков) ||
|| **SESSION_ID** | Идентификатор сессии звонка на стороне Voximplant ||
|| **TRANSCRIPT_ID** | Идентификатор расшифровки звонка ||
|| **TRANSCRIPT_PENDING** | Y\N. Признак того, что расшифровка будет получена позднее ||
|| **RECORD_FILE_ID** | Идентификатор файла с записью звонка ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'voximplant.statistic.get',
    		{
    			"FILTER": {">CALL_DURATION":60},
    			"SORT": "CALL_DURATION",
    			"ORDER": "DESC",
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
                'voximplant.statistic.get',
                [
                    'FILTER' => ['>CALL_DURATION' => 60],
                    'SORT'   => 'CALL_DURATION',
                    'ORDER'  => 'DESC',
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
        echo 'Error getting Voximplant statistics: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.statistic.get',
        {
            "FILTER": {">CALL_DURATION":60},
            "SORT": "CALL_DURATION",
            "ORDER": "DESC",
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}