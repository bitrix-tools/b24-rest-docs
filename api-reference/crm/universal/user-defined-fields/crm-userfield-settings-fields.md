# Получить описание полей настроек для типа пользовательского поля crm.userfield.settings.fields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствует ответ в случае ошибки и успеха

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.userfield.settings.fields` возвращает описание полей настроек для типа пользовательского поля.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **type** | Тип пользовательского поля. Значение из списка возвращаемого методом [crm.userfield.types](crm-userfield-types.md).  ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Пример

{% list tabs %}

- CURL (webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"string"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.userfield.settings.fields
    ```

- CURL (oauth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"string"}' \
    https://**put_your_bitrix24_address**/rest/crm.userfield.settings.fields?auth=**put_access_token_here**
    ```

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const response = await $b24.callMethod(
    		"crm.userfield.settings.fields",
    		{
    			type: "string"
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    $id = $_POST['id'];
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.userfield.settings.fields',
                [
                    'type' => 'string'
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
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    BX24.callMethod(
        "crm.userfield.settings.fields",
        {
            type: "string"
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

    $type = 'string'; // Замените на нужный тип

    $result = CRest::call(
        'crm.userfield.settings.fields',
        ['type' => $type]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Продолжите изучение

- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-precision-to-user-field.md)
