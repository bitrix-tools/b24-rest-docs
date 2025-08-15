# Изменить поле crm.lead.userfield.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- нужны правки под стандарты написания
- не указана обязательность параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописана ссылка на ещё не созданную страницу

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.lead.userfield.update` обновляет существующее пользовательское поле лидов.

#|
|| **Параметр** | **Описание** ||
|| **id** | Идентификатор пользовательского поля. ||
|| **fields** | Набор полей - массив вида `array("поле"=>"значение"[, ...])`, где "обновляемое поле" может принимать значения из возвращаемых методом [crm.userfield.fields](.). ||
|| **LIST** | Содержит набор значений списка для пользовательских полей типа Список. Указывается при создании/обновлении поля. Каждое значение представляет собой массив с полями: 
- **VALUE** - значение элемента списка. Поле является обязательным в случае, когда создается новый элемент. 
- **SORT** - сортировка. 
- **DEF** - если равно `Y`, то элемент списка является значением по умолчанию. Для множественного поля допустимо несколько `DEF=Y`. Для не множественного, дефолтным будет считаться первое. 
- **XML_ID** - внешний код значения. Параметр учитывается только при обновлении уже существующих значений элемента списка. 
- **ID** - идентификатор значения. Если он указан, то считается что это обновление существующего значения элемента списка, а не создание нового. 
- **DEL** - если равно `Y`, то существующий элемент списка будет удален. Применяется, если заполнен параметр ID. ||
|#

## Пример

{% list tabs %}

- JS


    ```js
    try
    {
    	const id = prompt("Введите ID");
    	const label = prompt("Введите новое название");
    
    	const response = await $b24.callMethod(
    		"crm.lead.userfield.update",
    		{
    			id: id,
    			fields:
    			{
    				"EDIT_FORM_LABEL": label,
    				"LIST_COLUMN_LABEL": label
    			}
    		}
    	);
    
    	const result = response.getData().result;
    	console.dir(result);
    	if(response.more())
    		response.next();
    }
    catch(error)
    {
    	console.error(error);
    }
    ```

- PHP


    ```php
    $id = readline("Введите ID");
    $label = readline("Введите новое название");
    
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.lead.userfield.update',
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
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            print_r($result->data());
            if ($result->more()) {
                $result->next();
            }
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating lead user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var id = prompt("Введите ID");
    var label = prompt("Введите новое название");
    BX24.callMethod(
        "crm.lead.userfield.update",
        {
            id: id,
            fields:
            {
                "EDIT_FORM_LABEL": label,
                "LIST_COLUMN_LABEL": label
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

{% endlist %}


{% include [Сноска о примерах](../../../../_includes/examples.md) %}