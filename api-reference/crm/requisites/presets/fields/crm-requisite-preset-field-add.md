# Добавить настраиваемое поле в шаблон реквизитов crm.requisite.preset.field.add

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет настраиваемое поле в шаблон реквизитов. С помощью метода [crm.requisite.preset.field.availabletoadd](./crm-requisite-preset-field-available-to-add.md) можно получить поля, доступные для добавления в шаблон. 

Прежде чем добавить пользовательское поле `UF_...` в шаблон, его нужно создать при помощи метода [crm.requisite.userfield.add](../../user-fields/crm-requisite-userfield-add.md) или убедиться, что оно существует.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **preset***
[`object`](../../../../data-types.md) | Объект, содержащий значение идентификатора шаблона, в который добавляется настраиваемое поле (например, `{"ID": 27}`). 

Идентификаторы шаблонов можно получить с помощью метода [crm.requisite.preset.list](../crm-requisite-preset-list.md) ||
|| **fields***
[`object`](../../../../data-types.md) | Набор полей — объект вида `{"поле": "значение"[, ...]}` для добавления настраиваемого поля шаблона ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
||  **Название**
`тип` | **Описание** ||
|| **FIELD_NAME***
[`string`](../../../../data-types.md) | Название поля. ||
|| **FIELD_TITLE**
[`string`](../../../../data-types.md) | Альтернативное название поля для реквизита.

Альтернативное название отображается в различных формах для заполнения реквизитов. В зависимости от конкретной формы альтернативное название может использоваться или нет
||
|| **SORT**
[`integer`](../../../../data-types.md) | Сортировка. Порядок в списке полей шаблона ||
|| **IN_SHORT_LIST**
[`char`](../../../../data-types.md) | Показывать в кратком списке. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости. Может принимать значения `Y` или `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"preset":{"ID":27},"fields":{"FIELD_NAME":"RQ_NAME","FIELD_TITLE":"TEST","IN_SHORT_LIST":"N","SORT":580}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.preset.field.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"preset":{"ID":27},"fields":{"FIELD_NAME":"RQ_NAME","FIELD_TITLE":"TEST","IN_SHORT_LIST":"N","SORT":580},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.field.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.requisite.preset.field.add",
    		{
    			preset:
    			{
    				"ID": 27    // Идентификатор шаблона
    			},
    			fields:        // Объект с описанием настраиваемого поля
    			{
    				"FIELD_NAME": "RQ_NAME",
    				"FIELD_TITLE": "TEST",
    				"IN_SHORT_LIST": "N",
    				"SORT": 580
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info("В шаблон добавлено настраиваемое поле с ID " + result);
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
                'crm.requisite.preset.field.add',
                [
                    'preset' => [
                        'ID' => 27, // Идентификатор шаблона
                    ],
                    'fields' => [ // Объект с описанием настраиваемого поля
                        'FIELD_NAME'    => 'RQ_NAME',
                        'FIELD_TITLE'   => 'TEST',
                        'IN_SHORT_LIST' => 'N',
                        'SORT'          => 580,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'В шаблон добавлено настраиваемое поле с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при добавлении настраиваемого поля: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.field.add",
        {
            preset:
            {
                "ID": 27    // Идентификатор шаблона
            },
            fields:        // Объект с описанием настраиваемого поля
            {
                "FIELD_NAME": "RQ_NAME",
                "FIELD_TITLE": "TEST",
                "IN_SHORT_LIST": "N",
                "SORT": 580
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("В шаблон добавлено настаиваемое поле с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.preset.field.add',
        [
            'preset' => ['ID' => 27],
            'fields' => [
                'FIELD_NAME' => 'RQ_NAME',
                'FIELD_TITLE' => 'TEST',
                'IN_SHORT_LIST' => 'N',
                'SORT' => 580
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
    "result": 3,
    "time": {
        "start": 1716811635.108203,
        "finish": 1716811635.503093,
        "duration": 0.39489006996154785,
        "processing": 0.043524980545043945,
        "date_start": "2024-05-27T14:07:15+02:00",
        "date_finish": "2024-05-27T14:07:15+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../../data-types.md) | Идентификатор добавленного поля ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The field 'RQ_NAME' can not be added."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `The field 'RQ_NAME' can not be added` | Поле не может быть добавлено. Возможно, поле уже есть в шаблоне или же оно не доступно для страны, к которой относится шаблон ||
|| `The Preset with ID '27' is not found` | Не найден шаблон с указанным идентификатором ||
|| `Access denied` | Недостаточно прав доступа для добавления настаиваемого поля в шаблон реквизитов ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-field-update.md)
- [{#T}](./crm-requisite-preset-field-available-to-add.md)
- [{#T}](./crm-requisite-preset-field-get.md)
- [{#T}](./crm-requisite-preset-field-list.md)
- [{#T}](./crm-requisite-preset-field-delete.md)
- [{#T}](./crm-requisite-preset-field-fields.md)