# Добавить тип плательщика sale.persontype.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет новый тип плательщика.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для создания нового типа плательщика в виде структуры:

```js
fields: {
    name: 'значение',
    code: 'значение',
    sort: 'значение',
    active: 'значение',
    xmlId: 'значение'
}
```

||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название типа плательщика ||
|| **code**
[`string`](../../data-types.md) | Код типа плательщика. Должен быть уникальным ||
|| **sort**
[`string`](../../data-types.md) | Сортировка. По умолчанию значение равно `150` ||
|| **active**
[`string`](../../data-types.md) | Флаг активности. Может принимать значения `Y` / `N`. По умолчанию установлено `Y` ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор.

Можно использовать для синхронизации текущего типа плательщика с аналогичной позицией во внешней системе
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Физическое лицо","sort":"100","active":"Y","code":"MY_CRM_COMPANY","xmlId":"myXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.persontype.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Физическое лицо","sort":"100","active":"Y","code":"MY_CRM_COMPANY","xmlId":"myXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.persontype.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.persontype.add', 
    		{
    			fields: {
    				name: 'Физическое лицо',
    				sort: '100',
    				active: 'Y',
    				code: 'MY_CRM_COMPANY',
    				xmlId: 'myXmlId'
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                'sale.persontype.add',
                [
                    'fields' => [
                        'name'   => 'Физическое лицо',
                        'sort'   => '100',
                        'active' => 'Y',
                        'code'   => 'MY_CRM_COMPANY',
                        'xmlId'  => 'myXmlId',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding person type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.persontype.add', 
        {
            fields: {
                name: 'Физическое лицо',
                sort: '100',
                active: 'Y',
                code: 'MY_CRM_COMPANY',
                xmlId: 'myXmlId'
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.persontype.add',
        [
            'fields' => [
                'name' => 'Физическое лицо',
                'sort' => '100',
                'active' => 'Y',
                'code' => 'MY_CRM_COMPANY',
                'xmlId' => 'myXmlId'
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
    "result": {
        "personType": {
            "active": "Y",
            "code": "MY_CRM_COMPANY",
            "id": 68,
            "name": "Физическое лицо",
            "sort": "100",
            "xmlId": "myXmlId"
        }
    },
    "time": {
        "start": 1712325812.35051,
        "finish": 1712325812.58676,
        "duration": 0.236255884170532,
        "processing": 0.011207103729248,
        "date_start": "2024-04-05T16:03:32+02:00",
        "date_finish": "2024-04-05T16:03:32+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **personType**
[`sale_person_type`](../data-types.md) | Объект с информацией о добавленном типе плательщика ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200750000005,
    "error_description": "person type code exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200750000005` | Недостаточно прав для выполнения метода ||
|| `200750000001`
`200750000006 ` | Не удалось создать новый тип плательщика ||
|| `200040300020` | Нет доступа к редактированию ||
|| `100` | Не передан обязательный параметр `fields` ||
|| `0` | Не установлены обязательные поля ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}