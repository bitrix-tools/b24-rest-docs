# Получить список всех sip-линий, созданных приложением voximplant.sip.get

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

{% include notitle [Скоуп telephony admin](../../_includes/scope-telephony-admin.md) %}

Метод `voximplant.sip.get` возвращает список всех sip-линий, созданных приложением. Списочный метод. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Управление номерами - изменение - любые`.

#|
|| **Параметр** | **Описание** ||
|| **FILTER** | Поля для сортировки. ||
|| **SORT** | По какому полю производится сортировка. ||
|| **ORDER** | Порядок сортировки (ASC/DESC). ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'voximplant.sip.get',
    		{
    			"FILTER": {"CONFIG_ID":12},
    			"SORT": "CONFIG_ID",
    			"ORDER": "DESC",
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    		console.error(result.error());
    	else
    		console.info(result);
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
                'voximplant.sip.get',
                [
                    'FILTER' => ['CONFIG_ID' => 12],
                    'SORT'   => 'CONFIG_ID',
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
        echo 'Error getting SIP data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.sip.get',
        {
            "FILTER": {"CONFIG_ID":12},
            "SORT": "CONFIG_ID",
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Возвращаемые данные

#|
|| **Поле** | **Описание** ||
|| **CONFIG_ID** | Идентификатор настройки sip-линии. ||
|| **TYPE** | Тип АТС см. список типов АТС ||
|| **TITLE** | Название подключения. ||
|| **SERVER** | Адрес сервера sip-регистрации. ||
|| **LOGIN** | Логин для сервера. ||
|| **PASSWORD** | Пароль для сервера. ||
|| **REG_ID** | Идентификатор sip-регистрации (только для Облачной АТС). ||
|| **INCOMING_SERVER** | Адрес сервера для подключения при исходящем звонке (только для Облачной АТС). ||
|| **INCOMING_LOGIN** | Логин для подключения (только для Облачной АТС). ||
|| **INCOMING_PASSWORD** | Пароль для подключения (только для Облачной АТС). ||
|#
