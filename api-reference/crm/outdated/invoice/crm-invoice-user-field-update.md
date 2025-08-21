# Изменить пользовательское поле crm.invoice.userfield.update

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

{% note warning %}

Метод устарел. Рекомендуется использовать  [`Универсальные методы для счетов`](../../universal/invoice.md)

{% endnote %}

Метод обновляет существующее пользовательское поле счетов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id** | Идентификатор пользовательского поля ||
|| **fields** | Набор полей - массив вида `array("обновляемое поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.userfield.fields](../../universal/user-defined-fields/crm-userfield-fields.md) ||
|| **LIST** | Содержит набор значений списка для пользовательских полей типа Список. Указывается при создании/обновлении поля. Каждое значение представляет собой массив с полями: 
- **VALUE** -  значение элемента списка. Поле является обязательным в случае, когда создается новый элемент  
- **SORT** - сортировка 
- **DEF** - если равно Y, то элемент списка является значением по-умолчанию. Для множественного поля допустимо несколько DEF=Y. Для не множественного, дефолтным будет считаться первое  
- **XML_ID** - внешний код значения. Параметр учитывается только при обновлении уже существующих значений элемента списка
- **ID** - идентификатор значения. Если он указан, то считается что это обновление существующего значения элемента списка, а не создание нового. Имеет смысл только при вызове методов `*.userfield.update`
- **DEL** - если равно Y, то существующий элемент списка будет удален. Применяется, если заполнен параметр ID  ||
|#

## Примеры кода

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": "**put_id_here**", "fields": {"EDIT_FORM_LABEL": "**put_label_here**", "LIST_COLUMN_LABEL": "**put_label_here**"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.invoice.userfield.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id": "**put_id_here**", "fields": {"EDIT_FORM_LABEL": "**put_label_here**", "LIST_COLUMN_LABEL": "**put_label_here**"}, "auth": "**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.invoice.userfield.update
    ```

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const label = prompt("Введите новое название");
    
    	const response = await $b24.callMethod(
    		"crm.invoice.userfield.update",
    		{
    			id: id,
    			fields: {
    				"EDIT_FORM_LABEL": label,
    				"LIST_COLUMN_LABEL": label
    			}
    		}
    	);
    
    	const result = response.getData().result;
    	console.dir(result);
    	if (response.more())
    		response.next();
    }
    catch( error )
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    $id = $_POST['id'];
    $label = $_POST['label'];
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.invoice.userfield.update',
                [
                    'id' => $id,
                    'fields' => [
                        'EDIT_FORM_LABEL'   => $label,
                        'LIST_COLUMN_LABEL' => $label
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        if ($response->more()) {
            $response->next();
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    var label = prompt("Введите новое название");
    BX24.callMethod(
        "crm.invoice.userfield.update",
        {
            id: id,
            fields: {
                "EDIT_FORM_LABEL": label,
                "LIST_COLUMN_LABEL": label
            }
        },
        function (result)
        {
            if (result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if (result.more())
                    result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $id = $_REQUEST['id']; // Assuming ID is passed as a request parameter
    $label = $_REQUEST['label']; // Assuming label is passed as a request parameter

    $result = CRest::call(
        'crm.invoice.userfield.update',
        [
            'id' => $id,
            'fields' => [
                'EDIT_FORM_LABEL' => $label,
                'LIST_COLUMN_LABEL' => $label
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}