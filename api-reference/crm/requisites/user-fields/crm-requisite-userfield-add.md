# Создать новое пользовательское поле реквизита crm.requisite.userfield.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает новое пользовательское поле для реквизита.

{% note info "Ограничения для символьного кода пользовательского поля" %}

Системное ограничение на название поля — 20 знаков. К названию пользовательского поля всегда добавляется префикс `UF_CRM_`, то есть реальная длина названия — 13 знаков.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей — объект вида `{"поле": "значение"[, ...]}` для добавления пользовательского поля реквизита ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_ID***
[`string`](../../../data-types.md) | Идентификатор сущности, к которой относится пользовательское поле. Для реквизитов это всегда `CRM_REQUISITE` ||
|| **FIELD_NAME***
[`string`](../../../data-types.md) | Символьный код. Для реквизитов всегда начинается с префикса `UF_CRM_` ||
|| **USER_TYPE_ID***
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

По умолчанию устанавливается `N` 
||
|| **MANDATORY**
[`char`](../../../data-types.md) | Признак обязательности. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию устанавливается `N`
||
|| **SHOW_FILTER**
[`char`](../../../data-types.md) | Показывать ли в фильтре списка. Возможные значения:
- `N` — не показывать
- `I` — точное совпадение
- `E` — маска
- `S` — подстрока

По умолчанию устанавливается `N` 
||
|| **SHOW_IN_LIST**
[`char`](../../../data-types.md) | Показывать ли в списке. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию устанавливается `Y` 
||
|| **EDIT_IN_LIST**
[`char`](../../../data-types.md) | Разрешать ли редактирование пользователем. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию устанавливается `Y` 
||
|| **IS_SEARCHABLE**
[`char`](../../../data-types.md) | Участвуют ли значения поля в поиске. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию устанавливается `N` 
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

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"USER_TYPE_ID":"string","ENTITY_ID":"CRM_REQUISITE","SORT":100,"MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"E","SHOW_IN_LIST":"Y","EDIT_FORM_LABEL":"ПП - Строка","LIST_COLUMN_LABEL":"ПП - Строка","LIST_FILTER_LABEL":"ПП - Строка","FIELD_NAME":"NEWTECH_v1_STRING"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.requisite.userfield.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"USER_TYPE_ID":"string","ENTITY_ID":"CRM_REQUISITE","SORT":100,"MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"E","SHOW_IN_LIST":"Y","EDIT_FORM_LABEL":"ПП - Строка","LIST_COLUMN_LABEL":"ПП - Строка","LIST_FILTER_LABEL":"ПП - Строка","FIELD_NAME":"NEWTECH_v1_STRING"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.userfield.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.userfield.add",
    		{
    			fields:
    			{
    				"USER_TYPE_ID": "string",
    				"ENTITY_ID": "CRM_REQUISITE",
    				"SORT": 100,
    				"MULTIPLE": "N",
    				"MANDATORY": "N",
    				"SHOW_FILTER": "E",
    				"SHOW_IN_LIST": "Y",
    				"EDIT_FORM_LABEL": "ПП - Строка",
    				"LIST_COLUMN_LABEL": "ПП - Строка",
    				"LIST_FILTER_LABEL": "ПП - Строка",
    				"FIELD_NAME": "NEWTECH_v1_STRING"
    			}
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
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.userfield.add',
                [
                    'fields' => [
                        'USER_TYPE_ID'      => 'string',
                        'ENTITY_ID'         => 'CRM_REQUISITE',
                        'SORT'              => 100,
                        'MULTIPLE'          => 'N',
                        'MANDATORY'         => 'N',
                        'SHOW_FILTER'       => 'E',
                        'SHOW_IN_LIST'      => 'Y',
                        'EDIT_FORM_LABEL'   => 'ПП - Строка',
                        'LIST_COLUMN_LABEL' => 'ПП - Строка',
                        'LIST_FILTER_LABEL' => 'ПП - Строка',
                        'FIELD_NAME'        => 'NEWTECH_v1_STRING',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding user field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.userfield.add",
        {
            fields:
            {
              "USER_TYPE_ID": "string",
              "ENTITY_ID": "CRM_REQUISITE",
              "SORT": 100,
              "MULTIPLE": "N",
              "MANDATORY": "N",
              "SHOW_FILTER": "E",
              "SHOW_IN_LIST": "Y",
              "EDIT_FORM_LABEL": "ПП - Строка",
              "LIST_COLUMN_LABEL": "ПП - Строка",
              "LIST_FILTER_LABEL": "ПП - Строка",
              "FIELD_NAME": "NEWTECH_v1_STRING"
          }
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
        'crm.requisite.userfield.add',
        [
            'fields' => [
                'USER_TYPE_ID' => 'string',
                'ENTITY_ID' => 'CRM_REQUISITE',
                'SORT' => 100,
                'MULTIPLE' => 'N',
                'MANDATORY' => 'N',
                'SHOW_FILTER' => 'E',
                'SHOW_IN_LIST' => 'Y',
                'EDIT_FORM_LABEL' => 'ПП - Строка',
                'LIST_COLUMN_LABEL' => 'ПП - Строка',
                'LIST_FILTER_LABEL' => 'ПП - Строка',
                'FIELD_NAME' => 'NEWTECH_v1_STRING'
            ]
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
    "result": 235,
    "time": {
        "start": 1717681176.885836,
        "finish": 1717681177.353738,
        "duration": 0.46790218353271484,
        "processing": 0.084564208984375,
        "date_start": "2024-06-06T15:39:36+02:00",
        "date_finish": "2024-06-06T15:39:37+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданного пользовательского поля ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "ERROR_CORE",
    "error_description": "Поле UF_CRM_NEWTECH_V1_STRING для объекта CRM_REQUISITE уже существует."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Текст ошибки** | **Описание** ||
|| `ERROR_CORE` | `Поле UF_CRM_NEWTECH_V1_STRING для объекта CRM_REQUISITE уже существует` | Попытка повторно создать пользовательское поле с таким же символьным кодом ||
|| Пустая строка | `The 'USER_TYPE_ID' field is not found` | Не задан тип данных пользовательского поля ||
|| Пустая строка | `The 'FIELD_NAME' field is not found` | Не задан символьный код пользовательского поля ||
|| Пустая строка | `Access denied` | Недостаточно прав доступа для добавления пользовательского поля ||
|| `ERROR_CORE` | `Fail to create new user field` | Не удалось создать пользовательское поле ||
|| `ERROR_CORE` | `Fail to save enumumeration field values` | Не удалось сохранить значения пользовательского поля списочного типа (например, когда произошло дублирование внешнего ключа одного из значений) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-userfield-update.md)
- [{#T}](./crm-requisite-userfield-get.md)
- [{#T}](./crm-requisite-userfield-list.md)
- [{#T}](./crm-requisite-userfield-delete.md)
