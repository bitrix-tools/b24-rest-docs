# Удалить локализацию sale.statusLang.deleteByFilter

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет записи локазации статуса заказа или доставки по идентификатору статуса и языку.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип`| **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей фильтра (подробное описание приведено [ниже](#parametr-fields)) для удаления записи локализации в виде структуры:

```js
fields: {
    statusId: 'значение',
    lid: 'значение'
    name: 'значение'
}
```

||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип`| **Описание** ||
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

Список актуальных языков можно получить методом [sale.statuslang.getlistlangs](./sale-status-lang-get-list-langs.md) ||
|| **name***
[`string`](../../data-types.md) | 

{% note alert "Внимание" %}

Для корректной работы метода передайте любое непустое значение в этот параметр 

{% endnote %}

||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"statusId":"RD","lid":"la","name":"-"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.statusLang.deleteByFilter
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"statusId":"RD","lid":"la","name":"-"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.statusLang.deleteByFilter
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'sale.statusLang.deleteByFilter',
    		{
    			fields: {
    				statusId: 'RD',
    				lid: 'la',
    				name: '-',
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
                'sale.statusLang.deleteByFilter',
                [
                    'fields' => [
                        'statusId' => 'RD',
                        'lid'     => 'la',
                        'name'    => '-',
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
        echo 'Error deleting status language: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.statusLang.deleteByFilter',
        {
            fields: {
                statusId: 'RD',
                lid: 'la',
                name: '-',
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
        'sale.statusLang.deleteByFilter',
        [
            'fields' =>
            [
                'statusId' => 'RD',
                'lid' => 'la',
                'name' => '-',
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
    "result":true,
    "time":{
        "start":1712223882.72792,
        "finish":1712223882.978806,
        "duration":0.2508859634399414,
        "processing":0.022897958755493164,
        "date_start":"2024-04-04T12:44:42+03:00",
        "date_finish":"2024-04-04T12:44:42+03:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат удаления локализации статуса ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":0,
    "error_description":"Required fields: name"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `201740400001` | Локализация для удаления по указанному фильтру не найдена ||
|| `201750000004` | Передан неизвестный идентификатор языка локализации `lid` ||
|| `200040300010` | Недостаточно прав для удаления локализации статуса ||
|| `100` | Не указан или пустой параметр `fields` ||
|| `0` | Не переданы обязательные поля структуры `fields` ||
|| `0` | Другие ошибки (например, фатальные ошибки) ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./sale-status-lang-get-list-langs.md)
- [{#T}](./sale-status-lang-add.md)
- [{#T}](./sale-status-lang-list.md)
- [{#T}](./sale-status-lang-get-fields.md)