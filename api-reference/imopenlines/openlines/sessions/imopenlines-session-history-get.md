# Получить сообщения чата и диалога imopenlines.session.history.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает историю сессии.

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Пример** | **Описание** ||
|| **CHAT_ID***
[`unknown`](../../../data-types.md) | 2020 | Идентификатор чата ||
|| **SESSION_ID***
[`unknown`](../../../data-types.md) | 494 | Идентификатор сессии ||
|#

Если пользователь не является участником чата, то при указании в вызове **только параметра** `CHAT_ID`, будет возвращаться ошибка:

```json
{error: 'ACCESS_DENIED', error_description: 'Вы не можете открыть этот разговор, т.к. у вас недостаточно прав.', ex: s}
error
:
"ACCESS_DENIED"
error_description
:
"Вы не можете открыть этот разговор, т.к. у вас недостаточно прав."
```

Следует использовать параметр `SESSION_ID`, с ним ошибка не возвращается. Для получения `SESSION_ID` используйте метод [imopenlines.dialog.get](imopenlines-dialog-get.md). Если у чата есть сессия, то её ID будет в 6-м параметре ключа `entity_data_1`.

## Примеры

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'imopenlines.session.history.get',
    		{
    			CHAT_ID: 2024
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error(error.ex);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.session.history.get',
                [
                    'CHAT_ID' => 2024
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error()->ex;
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting session history: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.session.history.get',
        {
            CHAT_ID: 2024
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    // пример для php

{% endlist %}

## Ответ в случае успеха

```json
{
    "result":{
        "chatId":1982,
        "canJoin":"Y",
        "canVoteHead":"Y",
        "sessionId":469,
        "sessionVoteHead":0,
        "sessionCommentHead":null,
        "userId":"chat1982",
        "message":{
            "19009":{
                "id":"19009",
                "chatid":"1982",
                "senderid":"0",
                "recipientid":"chat1982",
                "date":"2023-05-30T07:45:34+02:00",
                "text":"\u0414\u0438\u0430\u043b\u043e\u0433 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d.",
                "textlegacy":"\u0414\u0438\u0430\u043b\u043e\u0433 \u0437\u0430\u0432\u0435\u0440\u0448\u0435\u043d.",
                "params":{
                    "class":"bx-messenger-content-item-ol-end",
                    "componentId":"bx-imopenlines-message",
                    "imolVoteHead":0,
                    "imolVoteSid":469,
                    "imolVoteUser":0,
                    "type":"lines"
                }
            },
            "19008":{
                "id":"19008",
                "chatid":"1982",
                "senderid":"0",
                "recipientid":"chat1982",
                "date":"2023-05-30T07:45:33+02:00",
                "text":"[USER=1 REPLACE]\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440 \u041b\u043e\u0433\u0438\u043d\u043e\u0432",
                "textlegacy":"[USER=1 REPLACE]\u0412\u043b\u0430\u0434\u0438\u043c\u0438\u0440 \u041b\u043e\u0433\u0438\u043d\u043e",
                "params":[
                
                ]
            },
            "18148":{
                "id":"18148",
                "chatid":"1982",
                "senderid":"0",
                "recipientid":"chat1982",
                "date":"2023-05-19T01:52:03+02:00",
                "text":"\u041d\u0415 \u041e\u0422\u0412\u0415\u0427\u0415\u041d\u041e! ALARM! WARNING! ATTENTION! \u041a \u0441\u04",
                "textlegacy":"\u041d\u0415 \u041e\u0422\u0412\u0415\u0427\u0415\u041d\u041e! ALARM! WARNING! ATTENTION! \u041a \u04",
                "params":{
                    "class":"bx-messenger-content-item-ol-output",
                    "componentId":"bx-imopenlines-message",
                    "connectorMid":[
                        "18149"
                    ],
                    "imolForm":"offline",
                    "type":"lines"
                }
            },
            "18113":{
                "id":"18113",
                "chatid":"1982",
                "senderid":"0",
                "recipientid":"chat1982",
                "date":"2023-05-19T01:40:26+02:00",
                "text":"\u041d\u0430\u0447\u0430\u0442 \u043d\u043e\u0432\u044b\u0439 \u0434\u0438\u0430\u043b\u043e\u0433 \u2116[U",
                "textlegacy":"\u041d\u0430\u0447\u0430\u0442 \u043d\u043e\u0432\u044b\u0439 \u0434\u0438\u0430\u043b\u043e\u0433 \u",
                "params":{
                    "class":"bx-messenger-content-item-ol-start"
                }
            },
            "18114":{
                "id":"18114",
                "chatid":"1982",
                "senderid":"0",
                "recipientid":"chat1982",
                "date":"2023-05-19T01:40:26+02:00",
                "text":"\u041f\u0435\u0440\u0435\u0434\u0430\u043d\u044b\u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435",
                "textlegacy":"\u003CB\u003E\u041f\u0435\u0440\u0435\u0434\u0430\u043d\u044b\u0434\u043e\u043f\u043e\u043b\u043d\u0",
                "params":{
                    "attach":[
                        {
                            "id":1684478426,
                            "blocks":[
                                {
                                    "message":"\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430\u0441\u0430\u0439\u0442\u0430"
                                }
                            ],
                            "description":"",
                            "color":"#df532d"
                        }
                    ],
                    "class":"bx-messenger-content-item-system"
                }
            },
            "18115":{
                "id":"18115",
                "chatid":"1982",
                "senderid":"0",
                "recipientid":"chat1982",
                "date":"2023-05-19T01:40:26+02:00",
                "text":"\u041e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u0435 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u04",
                "textlegacy":"\u041e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u0435 \u043d\u0430\u043f\u0440\u0430\u0432\u043b\u04",
                "params":[
                
                ]
            },
            "18116":{
                "id":"18116",
                "chatid":"1982",
                "senderid":"450",
                "recipientid":"chat1982",
                "date":"2023-05-19T01:40:26+02:00",
                "text":"sdfsdfsdfsdfdff",
                "textlegacy":"sdfsdfsdfsdfdff",
                "params":{
                    "connectorMid":[
                        "18112"
                    ]
                }
            },
            "18117":{
                "id":"18117",
                "chatid":"1982",
                "senderid":"0",
                "recipientid":"chat1982",
                "date":"2023-05-19T01:40:26+02:00",
                "text":"\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 \u041e\u",
                "textlegacy":"\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 \u",
                "params":{
                    "class":"bx-messenger-content-item-ol-output",
                    "connectorMid":[
                        "18118"
                    ]
                }
            },
            "18119":{
                "id":"18119",
                "chatid":"1982",
                "senderid":"0",
                "recipientid":"chat1982",
                "date":"2023-05-19T01:40:26+02:00",
                "text":"[B]\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430 \u0444\u043e\u0440\u043c\u0430 \u0022\u0424",
                "textlegacy":"\u003CB\u003E\u041e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0430 \u0444\u043e\u0440\u043c\u0",
                "params":{
                    "attach":[
                        {
                            "id":1684478426,
                            "blocks":[
                                {
                                    "link":[
                                        {
                                            "name":"http:\/\/b24-3b4hq4.bitrix24.site\/crm_form_v0fcl\/",
                                            "link":"http:\/\/b24-3b4hq4.bitrix24.site\/crm_form_v0fcl\/"
                                        }
                                    ]
                                }
                            ],
                            "description":""
                        }
                    ],
                    "componentId":"bx-imopenlines-form",
                    "connectorMid":[
                        "18120"
                    ],
                    "crmFormId":"3",
                    "crmFormSec":"huqwyy"
                }
            }
        },
        "usersMessage":{
            "chat1982":[
                "19009",
                "19008",
                "18148",
                "18113",
                "18114",
                "18115",
                "18116",
                "18117",
                "18119"
            ]
        },
        "users":{
            "450":{
                "id":"450",
                "name":"\u0413\u043e\u0441\u0442\u044c",
                "active":true,
                "firstName":"\u0413\u043e\u0441\u0442\u044c",
                "lastName":"",
                "workPosition":null,
                "color":"#ab7761",
                "avatar":"\/bitrix\/js\/im\/images\/blank.gif",
                "avatarId":null,
                "birthday":false,
                "gender":"M",
                "phoneDevice":false,
                "phones":false,
                "extranet":true,
                "tzOffset":0,
                "network":false,
                "bot":false,
                "connector":true,
                "profile":"\/company\/personal\/user\/450\/",
                "externalAuthId":"imconnector",
                "status":null,
                "idle":false,
                "lastActivityDate":"2023-05-19T15:40:26+02:00",
                "mobileLastDate":false,
                "desktopLastDate":false,
                "departments":[
                
                ],
                "absent":false,
                "services":null
            }
        },
        "openlines":{
            "canvoteashead":{
                "58":true
            }
        },
        "userInGroup":[
        
        ],
        "woUserInGroup":[
        
        ],
        "chat":{
            "1982":{
                "id":"1982",
                "name":"\u0411\u0443\u0440\u044b\u0439 \u0433\u043e\u0441\u0442\u044c \u211633 - A1",
                "owner":"0",
                "color":"#ab7761",
                "extranet":false,
                "avatar":"\/bitrix\/js\/im\/images\/blank.gif",
                "call":"0",
                "callNumber":"",
                "entityType":"LINES",
                "entityId":"livechat|58|1981|450",
                "entityData1":"N|NONE|0|N|N|0|1684478426|0|0|0",
                "entityData2":"",
                "entityData3":"N",
                "public":"",
                "muteList":{
                    "450":false
                },
                "managerList":null,
                "dateCreate":"2023-05-19T08:40:26+02:00",
                "type":"lines",
                "messageType":"L"
            }
        },
        "userBlockChat":{
            "1982":{
                "450":false
            }
        },
        "userInChat":{
            "1982":[
                450
            ]
        },
        "files":[
        
        ]
    },
    "time":{
        "start":1685712569.097672,
        "finish":1685712569.247064,
        "duration":0.14939212799072266,
        "processing":0.0682840347290039,
        "date_start":"2023-06-02T15:29:29+02:00",
        "date_finish":"2023-06-02T15:29:29+02:00"
    }
}
```

## Ответ в случае ошибки

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **ACCESS_DENIED** | У текущего пользователя нет доступа к указанному чату ||
|| **CHAT_TYPE** | Указанный чат не является открытой линией ||
|| **CHAT_ID** | Указан не корректный идентификатор чата ||
|#