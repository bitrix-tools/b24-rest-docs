# Создать шаблон crm.requisite.preset.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод создает новый шаблон реквизитов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей — объект вида `{"поле": "значение"[, ...]}` для добавления шаблона ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE_ID***
[`integer`](../../../data-types.md) | Идентификатор типа родительского объекта. Сейчас это только «Реквизит» (идентификатор `8`).

Идентификаторы типов объектов CRM отдает метод [crm.enum.ownertype](../../auxiliary/enum/crm-enum-owner-type.md) 
||
|| **COUNTRY_ID***
[`integer`](../../../data-types.md) | Идентификатор страны, которой соответствует набор полей шаблона реквизита (для получения доступных значений смотрите метод [crm.requisite.preset.countries](./crm-requisite-preset-countries.md)) ||
|| **NAME***
[`string`](../../../data-types.md) | Название реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы. 

Назначение поля может меняться конечным разработчиком. 

Каждое приложение обеспечивает уникальность значений в этом поле. Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями. 

В CRM зарезервированы значения вида `#CRM_REQUISITE_PRESET_DEF_...` для идентификации шаблонов, которые используются по умолчанию. Не следует использовать эти идентификаторы для своих целей, так как это может привести к нарушению логики ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности. Используются значения `Y` или `N`. Определяет доступность шаблона в списке выбора при добавлении реквизитов ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_TYPE_ID":8,"COUNTRY_ID":1,"NAME":"ИП","XML_ID":"EXAMPLE_COMPANY__VALUE_1","ACTIVE":"Y","SORT":520}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.requisite.preset.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_TYPE_ID":8,"COUNTRY_ID":1,"NAME":"ИП","XML_ID":"EXAMPLE_COMPANY__VALUE_1","ACTIVE":"Y","SORT":520},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.preset.add",
    		{
    			fields:
    			{
    				"ENTITY_TYPE_ID": 8,    // Для шаблона реквизитов всегда указывается "Реквизит" (идентификатор 8), см. crm.enum.ownertype
    				"COUNTRY_ID": 1,        // Россия
    				"NAME": "ИП",
    				"XML_ID": "EXAMPLE_COMPANY__VALUE_1",    // Уникальный внешний идентификатор
    				"ACTIVE": "Y",
    				"SORT": 520    // Порядок в списке шаблонов
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info("Создан шаблон с ID " + result);
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
                'crm.requisite.preset.add',
                [
                    'fields' => [
                        'ENTITY_TYPE_ID' => 8,
                        'COUNTRY_ID'     => 1,
                        'NAME'           => 'ИП',
                        'XML_ID'         => 'EXAMPLE_COMPANY__VALUE_1',
                        'ACTIVE'         => 'Y',
                        'SORT'           => 520,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Создан шаблон с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при создании шаблона: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.add",
        {
            fields:
            {
                "ENTITY_TYPE_ID": 8,    // Для шаблона реквизитов всегда указывается "Реквизит" (идентификатор 8), см. crm.enum.ownertype
                "COUNTRY_ID": 1,        // Россия
                "NAME": "ИП",
                "XML_ID": "EXAMPLE_COMPANY__VALUE_1",    // Уникальный внешний идентификатор
                "ACTIVE": "Y",
                "SORT": 520    // Порядок в списке шаблонов
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создан шаблон с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.preset.add',
        [
            'fields' =>
            [
                'ENTITY_TYPE_ID' => 8,
                'COUNTRY_ID' => 1,
                'NAME' => 'ИП',
                'XML_ID' => 'EXAMPLE_COMPANY__VALUE_1',
                'ACTIVE' => 'Y',
                'SORT' => 520
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
    "result": 347,
    "time": {
        "start": 1716543593.35189,
        "finish": 1716543593.683898,
        "duration": 0.33200788497924805,
        "processing": 0.016175031661987305,
        "date_start": "2024-05-24T11:39:53+02:00",
        "date_finish": "2024-05-24T11:39:53+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданного шаблона реквизитов ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "ENTITY_TYPE_ID is not defined or invalid"
}
```
{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ENTITY_TYPE_ID is not defined or invalid` | Идентификатор типа родительского объекта не определен или имеет недопустимое значение ||
|| `Access denied` | Недостаточно прав доступа для добавления шаблона ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-update.md)
- [{#T}](./crm-requisite-preset-countries.md)
- [{#T}](./crm-requisite-preset-get.md)
- [{#T}](./crm-requisite-preset-list.md)
- [{#T}](./crm-requisite-preset-delete.md)
- [{#T}](./crm-requisite-preset-fields.md)


