# Изменить существующую sip-линию voximplant.sip.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony admin](../../_includes/scope-telephony-admin.md) %}

Метод `voximplant.sip.update` обновляет существующую sip-линию (созданную приложением). Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Управление номерами - изменение - любые`.

#|
|| **Параметр** | **Описание** ||
|| **CONFIG_ID**^*^ | Идентификатор настройки sip-линии. ||
|| **TYPE** | Тип АТС список типов АТС, необязательный параметр, по умолчанию - `Облачная АТС`. ||
|| **TITLE** | Название подключения (необязательное поле). ||
|| **SERVER** | Адрес сервера sip-регистрации (необязательное поле). ||
|| **LOGIN** | Логин для сервера (необязательное поле). ||
|| **PASSWORD** | Пароль для сервера (необязательное поле). ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

Для успешного вызова необходимо наличие одного из полей: `TITLE`, `SERVER`, `LOGIN`, `PASSWORD`.

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"voximplant.sip.update",
    		{
    			"CONFIG_ID": 69,
    			"TITLE": "название линии",
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
                'voximplant.sip.update',
                [
                    'CONFIG_ID' => 69,
                    'TITLE'     => 'название линии',
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
        echo 'Error updating SIP line: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "voximplant.sip.update",
        {
            "CONFIG_ID": 69,
            "TITLE": "название линии",
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

## Ответ в случае успеха

Возвращает 1 при успешном выполнении или исключение.

## Коды специфических ошибок

#|
|| **Код** | **Описание** ||
|| TITLE_EXISTS | Линия с таким названием уже существует. ||
|#