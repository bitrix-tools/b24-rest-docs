# Получить пользовательское поле по id crm.requisite.userfield.get

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает пользовательское поле реквизита по идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор пользовательского поля. Можно получить с помощью метода [crm.requisite.userfield.list](./crm-requisite-userfield-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":235}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.requisite.userfield.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":235,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.userfield.get
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'crm.requisite.userfield.get',
    		{
    			id: 235
    		}
    	);
    	
    	const result = response.getData().result;
    	if (result.error())
    	{
    		console.error(result.error());
    	}
    	else
    	{
    		console.dir(result);
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
                'crm.requisite.userfield.get',
                [
                    'id' => 235
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
        echo 'Error getting user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.userfield.get",
        {
            id: 235
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
        'crm.requisite.userfield.get',
        [
            'id' => 235
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": "235",
        "ENTITY_ID": "CRM_REQUISITE",
        "FIELD_NAME": "UF_CRM_NEWTECH_V1_STRING",
        "USER_TYPE_ID": "string",
        "XML_ID": null,
        "SORT": "100",
        "MULTIPLE": "N",
        "MANDATORY": "N",
        "SHOW_FILTER": "N",
        "SHOW_IN_LIST": "Y",
        "EDIT_IN_LIST": "Y",
        "IS_SEARCHABLE": "N",
        "SETTINGS": {
            "SIZE": 20,
            "ROWS": 1,
            "REGEXP": "",
            "MIN_LENGTH": 0,
            "MAX_LENGTH": 0,
            "DEFAULT_VALUE": ""
        },
        "EDIT_FORM_LABEL": {
            "en": "ПП - Строка",
            "ru": "ПП - Строка"
        },
        "LIST_COLUMN_LABEL": {
            "en": "ПП - Строка",
            "ru": "ПП - Строка"
        },
        "LIST_FILTER_LABEL": {
            "en": "ПП - Строка",
            "ru": "ПП - Строка"
        },
        "ERROR_MESSAGE": {
            "en": "UF_CRM_NEWTECH_V1_STRING",
            "ru": "UF_CRM_NEWTECH_V1_STRING"
        },
        "HELP_MESSAGE": {
            "en": "UF_CRM_NEWTECH_V1_STRING",
            "ru": "UF_CRM_NEWTECH_V1_STRING"
        }
    },
    "time": {
        "start": 1717686921.82579,
        "finish": 1717686922.874864,
        "duration": 1.0490741729736328,
        "processing": 0.05396890640258789,
        "date_start": "2024-06-06T17:15:21+02:00",
        "date_finish": "2024-06-06T17:15:22+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект, содержащий значения полей, описывающих пользовательское поле реквизита ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Описание полей пользовательского поля реквизита

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`int`](../../../data-types.md) | Идентификатор пользовательского поля ||
|| **ENTITY_ID**
[`string`](../../../data-types.md) | Идентификатор сущности, к которой относится пользовательское поле. Для реквизитов это всегда `CRM_REQUISITE` ||
|| **FIELD_NAME**
[`string`](../../../data-types.md) | Символьный код. Для реквизитов всегда начинается с префикса `UF_CRM_` ||
|| **USER_TYPE_ID**
[`string`](../../../data-types.md) | Тип данных ([`string`](../../universal/user-defined-fields/crm-userfield-types.md), [`boolean`](../../universal/user-defined-fields/crm-userfield-types.md), [`double`](../../universal/user-defined-fields/crm-userfield-types.md) или [`datetime`](../../universal/user-defined-fields/crm-userfield-types.md)) ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком ||
|| **SORT**
[`int`](../../../data-types.md) | Сортировка ||
|| **MULTIPLE**
[`char`](../../../data-types.md) | Признак множественности. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **MANDATORY**
[`char`](../../../data-types.md) | Признак обязательности. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Показывать ли в фильтре списка. Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока 
||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать ли в списке. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения:
- `Y` — да
- `N` — нет 
||
|| **EDIT_FORM_LABEL**
[`string`](../../../data-types.md) | Подпись в форме редактирования ||
|| **LIST_COLUMN_LABEL**
[`string`](../../../data-types.md) | Заголовок в списке ||
|| **LIST_FILTER_LABEL**
[`string`](../../../data-types.md) | Подпись фильтра в списке ||
|| **ERROR_MESSAGE**
[`string`](../../../data-types.md) | Сообщение об ошибке ||
|| **HELP_MESSAGE**
[`string`](../../../data-types.md) | Помощь ||
|| **LIST**
[`uf_enum_element`](../../../data-types.md) | Элементы списка. Для получения подробной информации смотрите раздел [{#T}](../../universal/user-defined-fields/crm-userfield-enumeration-fields.md) ||
|| **SETTINGS**
[`object`](../../../data-types.md) | Дополнительные настройки (зависят от типа). Для получения подробной информации смотрите раздел [{#T}](../../universal/user-defined-fields/crm-userfield-settings-fields.md) ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "ERROR_NOT_FOUND",
    "error_description": "The entity with ID '235' is not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Текст ошибки** | **Описание** ||
|| Пустая строка | `ID is not defined or invalid` | Идентификатор пользовательского поля не задан или имеет недопустимое значение ||
|| `ERROR_NOT_FOUND` | `The entity with ID '235' is not found` | Пользовательское поле с указанным идентификатором не найдено ||
|| Пустая строка" | `Access denied` | Недостаточно прав доступа для получения пользовательского поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-userfield-add.md)
- [{#T}](./crm-requisite-userfield-update.md)
- [{#T}](./crm-requisite-userfield-list.md)
- [{#T}](./crm-requisite-userfield-delete.md)
