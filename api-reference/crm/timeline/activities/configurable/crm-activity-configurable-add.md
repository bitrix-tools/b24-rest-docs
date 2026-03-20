# Добавить конфигурируемое дело crm.activity.configurable.add

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.activity.configurable.add` добавляет конфигурируемое дело в таймлайн. 

{% note warning %}

Вызов метода возможен только в контексте [приложения](https://helpdesk.bitrix24.ru/examples/app.zip).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerTypeId***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор [типа собъекта CRM](../../../data-types.md#object_type), в котором создаем дело, например `2` для сделки ||
|| **ownerId***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор элемента CRM, в котором создаем дело, например `1` ||
|| **fields***
[`array`](../../../../data-types.md) | Ассоциативный массив значений [полей дела](#parametr-fields) в виде структуры:
```json
fields:
{
    "typeId": 'значение',
    "completed": 'значение',
    "deadline": 'значение',
    "pingOffsets": 'значение',
    "isIncomingChannel": 'значение',
    "responsibleId": 'значение',
    "badgeCode": 'значение',
    "originatorId": 'значение',
    "originId": 'значение',
}
```
||
|| **layout***
[`LayoutDto`](./structure/layout.md) | [Ассоциативный массив особой структуры](./structure/layout.md#primer), описывающий внешний вид дела в таймлайне ||
|#

### Параметр fields {#parametr-fields}

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId**
[`string`](../../../../data-types.md) | Тип конфигурируемого дела. Если значение не указано, то оно устанавливается в значение по умолчанию `CONFIGURABLE`. Если указано, то значение должно соответствовать одному из типов, созданных методом [crm.activity.type.add](../types/crm-activity-type-add.md) с полем `IS_CONFIGURABLE_TYP0` равным `Y` в контексте того же приложения ||
|| **completed**
[`boolean`](../../../../data-types.md) | Флаг, говорящий закрыто ли дело. Для установки значения можно использовать `Y/N`, `1/0`, `true/false` ||
|| **deadline**
[`datetime`](../../../../data-types.md) | Крайний срок исполнения дела ||
|| **pingOffsets**
[`array`](../../../../data-types.md) | Массив смещений в минутах относительно крайнего срока, определяющий когда нужно сформировать записи-пинги по этому делу ||
|| **isIncomingChannel**
[`boolean`](../../../../data-types.md) | Флаг, говорящий создано ли дело из входящего канала. Для установки значения можно использовать `Y/N`, `1/0`, `true/false` ||
|| **responsibleId**
[`integer`](../../../../data-types.md) | Ответственный за дело ||
|| **badgeCode**
[`string`](../../../../data-types.md) | Код [значка на канбане](./badges/crm-activity-badge-list.md), соответствующего делу ||
|| **originatorId**
[`string`](../../../../data-types.md) | Идентификатор источника данных ||
|| **originId**
[`string`](../../../../data-types.md) | Идентификатор элемента в источнике данных ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ownerTypeId":1,"ownerId":999,"fields":{"typeId":"CONFIGURABLE","completed":true,"deadline":"**put_current_date_time_here**","pingOffsets":[60,300],"isIncomingChannel":"N","responsibleId":1,"badgeCode":"CUSTOM"},"layout":{"icon":{"code":"call-completed"},"header":{"title":"Входящий звонок"},"body":{"logo":{"code":"call-incoming"},"blocks":{"responsible":{"type":"lineOfBlocks","properties":{"blocks":{"client":{"type":"link","properties":{"text":"Сергей Востриков","bold":true,"action":{"type":"redirect","uri":"/crm/lead/details/789/"}}},"phone":{"type":"text","properties":{"value":"+7 999 888 7777"}}}}}}},"footer":{"buttons":{"startCall":{"title":"О клиенте","action":{"type":"openRestApp","actionParams":{"clientId":456}},"type":"primary"}}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.configurable.add
    ```

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		"crm.activity.configurable.add",
    		{
    			ownerTypeId: 1,
    			ownerId: 999,
    			fields:
    			{
    				typeId: 'CONFIGURABLE',
    				completed: true,
    				deadline: new Date(),
    				pingOffsets: [60, 300],
    				isIncomingChannel: 'N',
    				responsibleId: 1,
    				badgeCode: 'CUSTOM',
    			},
    			layout:
    			{
    				"icon": {
    					"code": "call-completed"
    				},
    				"header": {
    					"title": "Входящий звонок"
    				},
    				"body": {
    					"logo": {
    						"code": "call-incoming"
    					},
    					"blocks": {
    						"responsible": {
    							"type": "lineOfBlocks",
    							"properties": {
    								"blocks": {
    									"client": {
    										"type": "link",
    										"properties": {
    											"text": "Сергей Востриков",
    											"bold": true,
    											"action": {
    												"type": "redirect",
    												"uri": "/crm/lead/details/789/"
    											}
    										}
    									},
    									"phone": {
    										"type": "text",
    										"properties": {
    											"value": "+7 999 888 7777"
    										}
    									}
    								}
    							}
    						}
    					}
    				},
    				"footer": {
    					"buttons": {
    						"startCall": {
    							"title": "О клиенте",
    							"action": {
    								"type": "openRestApp",
    								"actionParams": {
    									"clientId": 456
    								}
    							},
    							"type": "primary"
    						}
    					}
    				}
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
                'crm.activity.configurable.add',
                [
                    'ownerTypeId' => 1,
                    'ownerId' => 999,
                    'fields' => [
                        'typeId' => 'CONFIGURABLE',
                        'completed' => true,
                        'deadline' => new DateTime(),
                        'pingOffsets' => [60, 300],
                        'isIncomingChannel' => 'N',
                        'responsibleId' => 1,
                        'badgeCode' => 'CUSTOM',
                    ],
                    'layout' => [
                        'icon' => [
                            'code' => 'call-completed',
                        ],
                        'header' => [
                            'title' => 'Входящий звонок',
                        ],
                        'body' => [
                            'logo' => [
                                'code' => 'call-incoming',
                            ],
                            'blocks' => [
                                'responsible' => [
                                    'type' => 'lineOfBlocks',
                                    'properties' => [
                                        'blocks' => [
                                            'client' => [
                                                'type' => 'link',
                                                'properties' => [
                                                    'text' => 'Сергей Востриков',
                                                    'bold' => true,
                                                    'action' => [
                                                        'type' => 'redirect',
                                                        'uri' => '/crm/lead/details/789/',
                                                    ],
                                                ],
                                            ],
                                            'phone' => [
                                                'type' => 'text',
                                                'properties' => [
                                                    'value' => '+7 999 888 7777',
                                                ],
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ],
                        'footer' => [
                            'buttons' => [
                                'startCall' => [
                                    'title' => 'О клиенте',
                                    'action' => [
                                        'type' => 'openRestApp',
                                        'actionParams' => [
                                            'clientId' => 456,
                                        ],
                                    ],
                                    'type' => 'primary',
                                ],
                            ],
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
        echo 'Error adding configurable activity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.configurable.add",
        {
            ownerTypeId: 1,
            ownerId: 999,
            fields:
            {
                typeId: 'CONFIGURABLE',
                completed: true,
                deadline: new Date(),
                pingOffsets: [60, 300],
                isIncomingChannel: 'N',
                responsibleId: 1,
                badgeCode: 'CUSTOM',
            },
            layout:
            {
                "icon": {
                    "code": "call-completed"
                },
                "header": {
                    "title": "Входящий звонок"
                },
                "body": {
                    "logo": {
                        "code": "call-incoming"
                    },
                    "blocks": {
                        "responsible": {
                            "type": "lineOfBlocks",
                            "properties": {
                                "blocks": {
                                    "client": {
                                        "type": "link",
                                        "properties": {
                                            "text": "Сергей Востриков",
                                            "bold": true,
                                            "action": {
                                                "type": "redirect",
                                                "uri": "/crm/lead/details/789/"
                                            }
                                        }
                                    },
                                    "phone": {
                                        "type": "text",
                                        "properties": {
                                            "value": "+7 999 888 7777"
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                "footer": {
                    "buttons": {
                        "startCall": {
                            "title": "О клиенте",
                            "action": {
                                "type": "openRestApp",
                                "actionParams": {
                                    "clientId": 456
                                }
                            },
                            "type": "primary"
                        }
                    }
                }
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
        'crm.activity.configurable.add',
        [
            'ownerTypeId' => 1,
            'ownerId' => 999,
            'fields' => [
                'typeId' => 'CONFIGURABLE',
                'completed' => true,
                'deadline' => date('c'), // Используем текущую дату и время в формате ISO 8601
                'pingOffsets' => [60, 300],
                'isIncomingChannel' => 'N',
                'responsibleId' => 1,
                'badgeCode' => 'CUSTOM',
            ],
            'layout' => [
                'icon' => [
                    'code' => 'call-completed'
                ],
                'header' => [
                    'title' => 'Входящий звонок'
                ],
                'body' => [
                    'logo' => [
                        'code' => 'call-incoming'
                    ],
                    'blocks' => [
                        'responsible' => [
                            'type' => 'lineOfBlocks',
                            'properties' => [
                                'blocks' => [
                                    'client' => [
                                        'type' => 'link',
                                        'properties' => [
                                            'text' => 'Сергей Востриков',
                                            'bold' => true,
                                            'action' => [
                                                'type' => 'redirect',
                                                'uri' => '/crm/lead/details/789/'
                                            ]
                                        ]
                                    ],
                                    'phone' => [
                                        'type' => 'text',
                                        'properties' => [
                                            'value' => '+7 999 888 7777'
                                        ]
                                    ]
                                ]
                            ]
                        ]
                    ]
                ],
                'footer' => [
                    'buttons' => [
                        'startCall' => [
                            'title' => 'О клиенте',
                            'action' => [
                                'type' => 'openRestApp',
                                'actionParams' => [
                                    'clientId' => 456
                                ]
                            ],
                            'type' => 'primary'
                        ]
                    ]
                ]
            ]
        ]
    );

    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        echo '<PRE>';
        print_r($result['result']);
        echo '</PRE>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
		"activity": {
			"id": 999,
		},
    "time": {
        "start": 1724068028.331234,
        "finish": 1724068028.726591,
        "duration": 0.3953571319580078,
        "processing": 0.13033390045166016,
        "date_start": "2025-01-21T13:47:08+02:00",
        "date_finish": "2025-01-21T13:47:08+02:00",
        "operating": 0
        }
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Корневой элемент ответа, содержащий информацию о добавленном идентифокаторе дела `id` в случае успеха. В случае неудачи вернет `null` ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NOT_FOUND",
    "error_description": "Not found."
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для выполнения операции ||
|| `100` | Не заполнены обязательные поля ||
|| `ERROR_WRONG_CONTEXT` | Вызов метода возможен только в контексте приложения ||
|| `ERROR_WRONG_APPLICATION` | Обновить дело может только приложение, которое его создало ||
|| `WRONG_FIELD_VALUE` | Некорректное значение поля ||
|| `INCOMING_ACTIVITY_CAN_NOT_BE_WITH_DEADLINE` | Входящее дело не может иметь крайний срок ||
|| `ERROR_EMPTY_LAYOUT` | Поле layout должно быть заполнено ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-configurable-update.md)
- [{#T}](./crm-activity-configurable-get.md)