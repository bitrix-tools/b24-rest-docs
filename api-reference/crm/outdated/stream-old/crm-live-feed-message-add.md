# Отправить сообщение в Ленту CRM crm.livefeedmessage.add

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет сообщение в ленту CRM.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_TITLE**
[`string`](../../../data-types.md) | Заголовок сообщения ||
|| **MESSAGE**
[`text`](../../../data-types.md) | Текст сообщения. ||
|| **SPERM** | Права на просмотр сообщения, пример:
```
"SPERM": {
    "CRMCONTACT": ["CRMCONTACT3", "CRMCONTACT7"], // контакты CRM
    "CRMCOMPANY": ["CRMCOMPANY1", "CRMCOMPANY3"], // компании CRM
    "CRMDEAL": ["CRMDEAL3", "CRMDEAL5"], // сделки CRM
    "CRMLEAD": ["CRMLEAD9", "CRMLEAD11"], // лиды CRM
    "SG": ["SG5", "SG9"], // рабочие группы соцсети
    "U": ["U1", "U3"], // пользователи
    "DR": ["DR1", "DR7"], // подразделения с подотделами
}
``` 
||
|| **ENTITYTYPEID** 
[`integer`](../../../data-types.md)| Тип сущности, в которой опубликовано сообщение:
- 1 - лид;
- 2 - сделка;
- 3 - контакт;
- 4 - компания ||
|| **ENTITYID** 
[`integer`](../../../data-types.md)| ID конкретного лида/сделки/контакта/компании, в которой опубликовано сообщение. ||
|| **FILES**
[`file`](../../../data-types.md) | Файлы сообщения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

### Пример 1

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"POST_TITLE":"Немного о сервисе","MESSAGE":"Битрикс24 создан на базе платформы Bitrix Framework.","SPERM":{"CRMCONTACT":["CRMCONTACT3","CRMCONTACT7"],"CRMCOMPANY":["CRMCOMPANY1","CRMCOMPANY3"],"CRMDEAL":["CRMDEAL3","CRMDEAL5"],"CRMLEAD":["CRMLEAD9","CRMLEAD11"],"SG":["SG5","SG9"],"U":["U1","U3"],"DR":["DR1","DR7"]},"ENTITYTYPEID":3,"ENTITYID":3}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.livefeedmessage.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"POST_TITLE":"Немного о сервисе","MESSAGE":"Битрикс24 создан на базе платформы Bitrix Framework.","SPERM":{"CRMCONTACT":["CRMCONTACT3","CRMCONTACT7"],"CRMCOMPANY":["CRMCOMPANY1","CRMCOMPANY3"],"CRMDEAL":["CRMDEAL3","CRMDEAL5"],"CRMLEAD":["CRMLEAD9","CRMLEAD11"],"SG":["SG5","SG9"],"U":["U1","U3"],"DR":["DR1","DR7"]},"ENTITYTYPEID":3,"ENTITYID":3},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.livefeedmessage.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.livefeedmessage.add",
    		{
    			fields:
    			{
    				"POST_TITLE": "Немного о сервисе",
    				"MESSAGE": "Битрикс24 создан на базе платформы Bitrix Framework.",
    				"SPERM": {
    					"CRMCONTACT": ["CRMCONTACT3", "CRMCONTACT7"],
    					"CRMCOMPANY": ["CRMCOMPANY1", "CRMCOMPANY3"],
    					"CRMDEAL": ["CRMDEAL3", "CRMDEAL5"],
    					"CRMLEAD": ["CRMLEAD9", "CRMLEAD11"],
    					"SG": ["SG5", "SG9"],
    					"U": ["U1", "U3"],
    					"DR": ["DR1", "DR7"],
    				},
    				"ENTITYTYPEID": 3,
    				"ENTITYID": 3,
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info("Создано сообщение с ID " + result);
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
                'crm.livefeedmessage.add',
                [
                    'fields' => [
                        'POST_TITLE'   => 'Немного о сервисе',
                        'MESSAGE'      => 'Битрикс24 создан на базе платформы Bitrix Framework.',
                        'SPERM'        => [
                            'CRMCONTACT'  => ['CRMCONTACT3', 'CRMCONTACT7'],
                            'CRMCOMPANY'  => ['CRMCOMPANY1', 'CRMCOMPANY3'],
                            'CRMDEAL'     => ['CRMDEAL3', 'CRMDEAL5'],
                            'CRMLEAD'     => ['CRMLEAD9', 'CRMLEAD11'],
                            'SG'          => ['SG5', 'SG9'],
                            'U'           => ['U1', 'U3'],
                            'DR'          => ['DR1', 'DR7'],
                        ],
                        'ENTITYTYPEID' => 3,
                        'ENTITYID'     => 3,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Создано сообщение с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error creating live feed message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.livefeedmessage.add",
        {
            fields:
            {
                "POST_TITLE": "Немного о сервисе",
                "MESSAGE": "Битрикс24 создан на базе платформы Bitrix Framework.",
                "SPERM": {
                    "CRMCONTACT": ["CRMCONTACT3", "CRMCONTACT7"],
                    "CRMCOMPANY": ["CRMCOMPANY1", "CRMCOMPANY3"],
                    "CRMDEAL": ["CRMDEAL3", "CRMDEAL5"],
                    "CRMLEAD": ["CRMLEAD9", "CRMLEAD11"],
                    "SG": ["SG5", "SG9"],
                    "U": ["U1", "U3"],
                    "DR": ["DR1", "DR7"],
                },
                "ENTITYTYPEID": 3,
                "ENTITYID": 3,
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создано сообщение с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.livefeedmessage.add',
        [
            'fields' => [
                'POST_TITLE' => 'Немного о сервисе',
                'MESSAGE' => 'Битрикс24 создан на базе платформы Bitrix Framework.',
                'SPERM' => [
                    'CRMCONTACT' => ['CRMCONTACT3', 'CRMCONTACT7'],
                    'CRMCOMPANY' => ['CRMCOMPANY1', 'CRMCOMPANY3'],
                    'CRMDEAL' => ['CRMDEAL3', 'CRMDEAL5'],
                    'CRMLEAD' => ['CRMLEAD9', 'CRMLEAD11'],
                    'SG' => ['SG5', 'SG9'],
                    'U' => ['U1', 'U3'],
                    'DR' => ['DR1', 'DR7'],
                ],
                'ENTITYTYPEID' => 3,
                'ENTITYID' => 3,
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

### Пример 2

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"POST_TITLE":"POST_TITLE","MESSAGE":"MESSAGE","SPERM":{"CRMLEAD":["CRMLEAD9","CRMLEAD11"],"U":["U1"]},"ENTITYTYPEID":1,"ENTITYID":56374,"FILES":[["1.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],["2.gif","..."]]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.livefeedmessage.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"POST_TITLE":"POST_TITLE","MESSAGE":"MESSAGE","SPERM":{"CRMLEAD":["CRMLEAD9","CRMLEAD11"],"U":["U1"]},"ENTITYTYPEID":1,"ENTITYID":56374,"FILES":[["1.gif","R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],["2.gif","..."]]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.livefeedmessage.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.livefeedmessage.add",
    		{
    			fields:
    			{
    				"POST_TITLE": "POST_TITLE",
    				"MESSAGE": "MESSAGE",
    				"SPERM": {
    					"CRMLEAD": ["CRMLEAD9", "CRMLEAD11"],
    					"U": ["U1"],
    				},
    				"ENTITYTYPEID": 1,
    				"ENTITYID": 56374,
    				"FILES": [
    					["1.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],
    					["2.gif", "..."]
    				],
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    	console.info("Создано сообщение с ID " + result);
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
                'crm.livefeedmessage.add',
                [
                    'fields' => [
                        'POST_TITLE'   => 'POST_TITLE',
                        'MESSAGE'      => 'MESSAGE',
                        'SPERM'        => [
                            'CRMLEAD' => ['CRMLEAD9', 'CRMLEAD11'],
                            'U'       => ['U1'],
                        ],
                        'ENTITYTYPEID' => 1,
                        'ENTITYID'     => 56374,
                        'FILES'        => [
                            ['1.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
                            ['2.gif', '...'],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Создано сообщение с ID ' . $result;
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при создании сообщения: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.livefeedmessage.add",
        {
            fields:
            {
                "POST_TITLE": "POST_TITLE",
                "MESSAGE": "MESSAGE",
                "SPERM": {
                    "CRMLEAD": ["CRMLEAD9", "CRMLEAD11"],
                    "U": ["U1"],
                },
                "ENTITYTYPEID": 1,
                "ENTITYID": 56374,
                "FILES": [
                    ["1.gif", "R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=="],
                    ["2.gif", "..."]
                ],
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info("Создано сообщение с ID " + result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.livefeedmessage.add',
        [
            'fields' => [
                'POST_TITLE' => 'POST_TITLE',
                'MESSAGE' => 'MESSAGE',
                'SPERM' => [
                    'CRMLEAD' => ['CRMLEAD9', 'CRMLEAD11'],
                    'U' => ['U1'],
                ],
                'ENTITYTYPEID' => 1,
                'ENTITYID' => 56374,
                'FILES' => [
                    ['1.gif', 'R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw=='],
                    ['2.gif', '...']
                ],
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Дополнительно

- [`crm.timeline.comment.add`](../../timeline/comments/crm-timeline-comment-add.md)