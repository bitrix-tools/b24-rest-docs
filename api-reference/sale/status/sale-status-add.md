# Создать статус sale.status.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод создает статус заказа или доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для создания статуса ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_status.id`](../data-types.md) | Символьный идентификатор статуса.

Идентификатор статуса должен быть уникальным независимо от его типа. То есть нельзя добавить два статуса с одинаковым идентификатором (один для заказа, а другой для доставки)
||
|| **type***
[`string`](../../data-types.md) | Тип статуса:
- `O` — статус заказа
- `D` — статус доставки ||
|| **notify**
[`string`](../../data-types.md) | Индикатор того, нужно ли отправлять почтовое уведомление пользователю, когда заказ или доставка переходят в этот статус.

Возможные значения:
- `Y` — оповещать
- `N` — не оповещать
 ||
|| **sort**
[`integer`](../../data-types.md) | Сортировка ||
|| **color**
[`string`](../../data-types.md) | HEX-код цвета статуса (например, `#FF0000`) ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний код статуса.

Может использоваться для синхронизации со статусом заказа или доставки по идентификатору во внешней системе
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
    -d '{"fields":{"id":"MS","type":"O","notify":"Y","sort":500,"color":"#FF0000","xmlId":"myStatusXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.status.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"id":"MS","type":"O","notify":"Y","sort":500,"color":"#FF0000","xmlId":"myStatusXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.status.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.status.add', {
    			fields: {
    				id: 'MS',
    				type: 'O',
    				notify: 'Y',
    				sort: 500,
    				color: '#FF0000',
    				xmlId: 'myStatusXmlId',
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info(result);
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
                'sale.status.add',
                [
                    'fields' => [
                        'id'     => 'MS',
                        'type'   => 'O',
                        'notify' => 'Y',
                        'sort'   => 500,
                        'color'  => '#FF0000',
                        'xmlId'  => 'myStatusXmlId',
                    ],
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
        echo 'Error adding status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.status.add', {
            fields: {
                id: 'MS',
                type: 'O',
                notify: 'Y',
                sort: 500,
                color: '#FF0000',
                xmlId: 'myStatusXmlId',
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call('sale.status.add', [
        'fields' => [
            'id' => 'MS',
            'type' => 'O',
            'notify' => 'Y',
            'sort' => 500,
            'color' => '#FF0000',
            'xmlId' => 'myStatusXmlId',
        ]
    ]);

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":{
        "status":{
            "color":"#FF0000",
            "id":"MS",
            "notify":"Y",
            "sort":500,
            "type":"O",
            "xmlId":"myStatusXmlId"
        }
    },
    "time":{
        "start":1712137817.343984,
        "finish":1712137817.605804,
        "duration":0.26182007789611816,
        "processing":0.018325090408325195,
        "date_start":"2024-04-03T12:50:17+03:00",
        "date_finish":"2024-04-03T12:50:17+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **status**
[`sale_status`](../data-types.md) | Объект с информацией о добавленном статусе ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201350000001,
    "error_description":"Duplicate entry for key [id]"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201350000001` | Статус с переданным идентификатором уже существует ||
|| `201350000003` | Не передано значение типа статуса или переданное значение некорректно ||
|| `201350000004` | Передано пустое значение идентификатора статуса ||
|| `201350000005` | Превышено ограничение длины идентификатора статуса ||
|| `200040300020` | Недостаточно прав для добавления статуса ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-status-update.md)
- [{#T}](./sale-status-get.md)
- [{#T}](./sale-status-list.md)
- [{#T}](./sale-status-delete.md)
- [{#T}](./sale-status-get-fields.md)