# Добавить комментарий crm.timeline.comment.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод добавляет новое дело типа «Комментарий» в таймлайн.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для добавления нового дела типа «Комментарий» в виде структуры:

```json

fields:
{
    "ENTITY_ID": 'значение',
    "ENTITY_TYPE": 'значение',
    "COMMENT": 'значение',
    "AUTHOR_ID": 'значение',
    "FILES": [
        [
            "название файла", 
            "содержимое файла"
        ],
        [
            "название файла",
            "содержимое файла"
        ],
    ]
}
```

Содержимое файла передается в виде [base64-строки](../../../files/how-to-upload-files.md)

{% note warning %}

С версии crm 23.100.0 метод принимает только параметры с ключом `fields` в нижнем регистре. Другие недокументированные варианты (Fields, FIELDS, arFields) не принимаются.

{% endnote %}

 ||
|#

### Параметр fields {#parametr-fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | `ID` элемента, к которому привязан комментарий.

Значение можно получить методом [`crm.item.list`](../../universal/crm-item-list.md) или при создании элемента с помощью [`crm.item.add`](../../universal/crm-item-add.md) ||
|| **ENTITY_TYPE***
[`string`](../../../data-types.md) | Идентификатор [системного](../../index.md) или [пользовательского типа](../../universal/user-defined-object-types/index.md) объекта CRM, к элементу которого привязан комментарий. Например: `lead`, `deal`, `contact`, `company`, `order`, `dynamic_1046` ||
|| **AUTHOR_ID**
[`user`](../../../data-types.md#standart-objects) | Идентификатор пользователя, добавляющего комментарий ||
|| **COMMENT***
[`string`](../../../data-types.md) | Текст комментария ||
|| **FILES**
[`attached_diskfile`](../../../data-types.md) | Список файлов. Массив значений, описанный по [правилам](../../../files/how-to-upload-files.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_ID":10,"ENTITY_TYPE":"deal","COMMENT":"New comment was added","AUTHOR_ID":5,"FILES":[["1.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],["2.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.timeline.comment.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"ENTITY_ID":10,"ENTITY_TYPE":"deal","COMMENT":"New comment was added","AUTHOR_ID":5,"FILES":[["1.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],["2.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.timeline.comment.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.timeline.comment.add",
    		{
    			fields:
    			{
    				"ENTITY_ID": 10,
    				"ENTITY_TYPE": "deal",
    				"COMMENT": "New comment was added",
    				"AUTHOR_ID": 5,
    				"FILES": [
    					[
    						"1.gif", 
    						"R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    					],
    					[
    						"2.gif",
    						"R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
    					],
    				]
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.dir(result);
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
                'crm.timeline.comment.add',
                [
                    'fields' => [
                        'ENTITY_ID'   => 10,
                        'ENTITY_TYPE' => 'deal',
                        'COMMENT'     => 'New comment was added',
                        'AUTHOR_ID'   => 5,
                        'FILES'       => [
                            ['1.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
                            ['2.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
                        ],
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
        echo 'Error adding timeline comment: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.timeline.comment.add",
        {
            fields:
            {
                "ENTITY_ID": 10,
                "ENTITY_TYPE": "deal",
                "COMMENT": "New comment was added",
                "AUTHOR_ID": 5,
                "FILES": [
                    [
                        "1.gif", 
                        "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                    ],
                    [
                        "2.gif",
                        "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="
                    ],
                ]
            }
        }, result => {
            if (result.error())
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
        'crm.timeline.comment.add',
        [
            'fields' => [
                'ENTITY_ID' => 10,
                'ENTITY_TYPE' => 'deal',
                'COMMENT' => 'New comment was added',
                'AUTHOR_ID' => 5,
                'FILES' => [
                    ["1.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],
                    ["2.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="]
                ]
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
    "result": 999,
    "time": {
        "start": 1715091541.642592,
        "finish": 1715091541.730599,
        "duration": 0.08800697326660156,
        "date_start": "2024-05-03T17:19:01+03:00",
        "date_finish": "2024-05-03T17:19:01+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Возвращает целочисленный идентификатор добавленного комментария ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `OWNER_NOT_FOUND` | Владелец элемента не найден ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `NOT_FOUND` | Элемент не найден ||
|| `INVALID_ARG_VALUE` | Пустой коментарий ||
|| `100` | Не переданы обязательные поля ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-timeline-comment-update.md)
- [{#T}](./crm-timeline-comment-get.md)
- [{#T}](./crm-timeline-comment-list.md)
- [{#T}](./crm-timeline-comment-delete.md)
- [{#T}](./crm-timeline-comment-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-add-comment-to-spa.md)
