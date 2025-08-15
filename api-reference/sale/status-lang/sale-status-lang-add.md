# Добавить локализацию sale.statusLang.add

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет локализацию статуса заказа или доставки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления локализации статуса в виде структуры:

```js
fields: {
    statusId: 'значение',
    lid: 'значение',
    name: 'значение',
    description: 'значение'
}
```

||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **statusId***
[`sale_status.id`](../data-types.md) | Символьный идентификатор статуса ||
|| **lid***
[` sale_lang.lid`](../data-types.md) | Идентификатор языка. Текущие возможные значения приведены ниже:

- ar — арабский
- br — португальский
- de — немецкий
- en — английский
- fr — французский
- hi — хинди
- id — индонезийский
- in — английский (Индия)
- it — итальянский
- ja — японский
- la — испанский
- ms — малайский
- pl — польский
- ru — русский
- sc — китайский (упрощенный)
- tc — китайский (традиционный)
- th — тайский
- tr — турецкий
- ua — украинский
- vn — вьетнамский

Список актуальных языков можно получить методом [sale.statuslang.getlistlangs](./sale-status-lang-get-list-langs.md)
||
|| **name***
[`string`](../../data-types.md) | Название статуса для создаваемой локализации ||
|| **description**
[`string`](../../data-types.md) | Описание статуса для создаваемой локализации ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"statusId":"RD","lid":"ru","name":"Возвращен покупателем","description":"Покупатель вернул товар по причине наличия дефекта"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.statuslang.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"statusId":"RD","lid":"ru","name":"Возвращен покупателем","description":"Покупатель вернул товар по причине наличия дефекта"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.statuslang.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.statuslang.add',
    		{
    			fields: {
    				statusId: 'RD',
    				lid: 'ru',
    				name: 'Возвращен покупателем',
    				description: 'Покупатель вернул товар по причине наличия дефекта'
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
                'sale.statuslang.add',
                [
                    'fields' => [
                        'statusId'    => 'RD',
                        'lid'         => 'ru',
                        'name'        => 'Возвращен покупателем',
                        'description' => 'Покупатель вернул товар по причине наличия дефекта'
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding status language: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.statuslang.add',
        {
            fields: {
                statusId: 'RD',
                lid: 'ru',
                name: 'Возвращен покупателем',
                description: 'Покупатель вернул товар по причине наличия дефекта'
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

    $result = CRest::call(
        'sale.statuslang.add',
        [
            'fields' =>
            [
                'statusId' => 'RD',
                'lid' => 'ru',
                'name' => 'Возвращен покупателем',
                'description' => 'Покупатель вернул товар по причине наличия дефекта'
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
    "result":{
        "statusLang":{
            "description":"Покупатель вернул товар по причине наличия дефекта",
            "lid":"ru",
            "name":"Возвращен покупателем",
            "statusId":"RD"
        }
    },
    "time":{
        "start":1712218058.514339,
        "finish":1712218060.34603,
        "duration":1.831691026687622,
        "processing":0.042268991470336914,
        "date_start":"2024-04-04T11:07:38+03:00",
        "date_finish":"2024-04-04T11:07:40+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **statusLang**
[`sale_status_lang`](../data-types.md) | Объект с информацией о добавленной локализации статуса ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":201750000003,
    "error_description":"Duplicate entry for key [statusId, lid]"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201750000003` | Локализация для переданного статуса уже существует ||
|| `201750000004` | Передан неизвестный идентификатор языка локализации `lid` ||
|| `200040300020` | Недостаточно прав для добавления локализации статуса ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля структуры `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-status-lang-get-list-langs.md)
- [{#T}](./sale-status-lang-list.md)
- [{#T}](./sale-status-lang-delete-by-filter.md)
- [{#T}](./sale-status-lang-get-fields.md)