# Обновить статус sale.status.update

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет статус заказа или доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`sale_status.id`](../data-types.md) | Символьный идентификатор статуса ||
|| **fields***
[`object`](../../data-types.md) | Значения полей для обновления статуса ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
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
    -d '{"id":"MS","fields":{"type":"D","notify":"N","sort":100,"color":"#00FF00","xmlId":"updatedXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/sale.status.update
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":"MS","fields":{"type":"D","notify":"N","sort":100,"color":"#00FF00","xmlId":"updatedXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.status.update
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.status.update', {
    			id: 'MS',
    			fields: {
    				type: 'D',
    				notify: 'N',
    				sort: 100,
    				color: '#00FF00',
    				xmlId: 'updatedXmlId',
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
                'sale.status.update',
                [
                    'id' => 'MS',
                    'fields' => [
                        'type'   => 'D',
                        'notify' => 'N',
                        'sort'   => 100,
                        'color'  => '#00FF00',
                        'xmlId'  => 'updatedXmlId',
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
        echo 'Error updating sale status: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.status.update', {
            id: 'MS',
            fields: {
                type: 'D',
                notify: 'N',
                sort: 100,
                color: '#00FF00',
                xmlId: 'updatedXmlId',
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

    $result = CRest::call('sale.status.update', [
        'id' => 'MS',
        'fields' => [
            'type' => 'D',
            'notify' => 'N',
            'sort' => 100,
            'color' => '#00FF00',
            'xmlId' => 'updatedXmlId',
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
            "color":"#00FF00",
            "id":"MS",
            "notify":"N",
            "sort":100,
            "type":"D",
            "xmlId":"updatedXmlId"
        }
    },
    "time":{
        "start":1712142575.655577,
        "finish":1712142575.940234,
        "duration":0.28465700149536133,
        "processing":0.02240896224975586,
        "date_start":"2024-04-03T14:09:35+03:00",
        "date_finish":"2024-04-03T14:09:35+03:00"
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
[`sale_status`](../data-types.md) | Объект с информацией об обновленном статусе ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"Required fields: type"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201340400001` | Статус с переданным идентификатором не найден ||
|| `200040300020` | Недостаточно прав для обновления статуса ||
|| `201350000003` | Не передано значение типа статуса или переданное значение некорректно ||
|| `201350000006` | Ошибка возникает при попытке сменить тип некоторых [системных статусов](./index.md):

- статусы `F` и `N` всегда должны иметь тип `O` (заказ)
- статусы `DF` и `DN` всегда должны иметь тип `D` (доставка)
||
|| `201350000007` | Ошибка возникает при попытке сменить тип статуса заказа в том случае, если к данному статусу уже прикреплены заказы ||
|| `201350000008` | Ошибка возникает при попытке сменить тип статуса отгрузки в том случае, если к данному статусу уже прикреплены отгрузки ||
|| `100` | Не указан параметр `id` ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля структуры `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./sale-status-add.md)
- [{#T}](./sale-status-get.md)
- [{#T}](./sale-status-list.md)
- [{#T}](./sale-status-delete.md)
- [{#T}](./sale-status-get-fields.md)