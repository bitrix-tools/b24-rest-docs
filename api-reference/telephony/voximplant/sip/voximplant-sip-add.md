# Создать новую sip-линию с привязкой к приложению voximplant.sip.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony admin](../../_includes/scope-telephony-admin.md) %}

Метод `voximplant.sip.add` создает новую sip-линию с привязкой к приложению. После создания данная линия становится исходящей линией по умолчанию. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Управление номерами - изменение - любые`.

#|
|| **Параметр** | **Описание** ||
|| **TYPE** | Тип АТС. Возможные значения:
- `cloud` —	облачная АТС
- `office` — офисная АТС

По умолчанию `cloud` ||
|| **TITLE**^*^ | Название подключения. ||
|| **SERVER**^*^ | Адрес сервера sip-регистрации. ||
|| **LOGIN**^*^ | Логин для сервера. ||
|| **PASSWORD**^*^ | Пароль для сервера. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'voximplant.sip.add',
    		{
    			"TYPE": "cloud",
    			"TITLE": "sipnet",
    			"SERVER": "sipnet.ru",
    			"LOGIN": "YYYYY",
    			"PASSWORD": "ZZZZZ"
    		}
    	);
    	
    	const result = response.getData().result;
    	if(result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.info(result);
    	}
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
                'voximplant.sip.add',
                [
                    'TYPE'     => 'cloud',
                    'TITLE'    => 'sipnet',
                    'SERVER'   => 'sipnet.ru',
                    'LOGIN'    => 'YYYYY',
                    'PASSWORD' => 'ZZZZZ',
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
        echo 'Error adding SIP: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.sip.add',
        {
            "TYPE": "cloud",
            "TITLE": "sipnet",
            "SERVER": "sipnet.ru",
            "LOGIN": "YYYYY",
            "PASSWORD": "ZZZZZ"
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
|| **TYPE** | Тип АТС. Возможные значения:
- `cloud` —	облачная АТС
- `office` — офисная АТС ||
|| **TITLE** | Название подключения. ||
|| **SERVER** | Адрес сервера sip-регистрации для Облачной АТС или адрес сервера Офисной АТС. ||
|| **LOGIN** | Логин для сервера. ||
|| **PASSWORD** | Пароль для сервера. ||
|| **REG_ID** | Идентификатор sip-регистрации (только для Облачной АТС). ||
|| **INCOMING_SERVER** | Адрес сервера для подключения при исходящем звонке (только для Облачной АТС). ||
|| **INCOMING_LOGIN** | Логин для подключения (только для Облачной АТС). ||
|| **INCOMING_PASSWORD** | Пароль для подключения (только для Облачной АТС). ||
|#

## Коды специфических ошибок

#|
|| **Код** | **Описание** ||
|| **MAX_CLOUD_PBX** | Вы не можете подключить более 5 облачных АТС. ||
|| **TITLE_EXISTS** | Линия с таким названием уже существует. ||
|#