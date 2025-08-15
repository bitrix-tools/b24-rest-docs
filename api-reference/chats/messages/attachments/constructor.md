# Конструктор, примеры

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

Объект **Вложение** является конструктором, вы можете «собрать» его так, как вам требуется, используя доступные блоки. Порядок добавления блоков имеет значение.

## «Баг-трекер»

Этот пример демонстрирует, как можно использовать различные типы вложений для создания информативного и структурированного сообщения в боте, имитирующего систему отслеживания ошибок (баг-трекер).

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'imbot.message.add',
    		{
    			DIALOG_ID: 'chat20921',
    			MESSAGE: 'Message from bot',
    			ATTACH: [
    				{
    					USER: {
    						NAME: "Уведомления Mantis",
    						AVATAR: "http://files.shelenkov.com/bitrix/images/mantis2.jpg",
    						LINK: "http://shelenkov.com/",
    					}
    				},
    				{
    					LINK: {
    						NAME: "Открыть Mantis из внешней сети",
    						LINK: "http://shelenkov.com/",
    					}
    				},
    				{
    					DELIMITER: {
    						SIZE: 200,
    						COLOR: "#c6c6c6"
    					}
    				},
    				{
    					GRID: [
    						{
    							NAME: "Проект",
    							VALUE: "BUGS",
    							DISPLAY: "LINE",
    							WIDTH: 100
    						},
    						{
    							NAME: "Категория",
    							VALUE: "im",
    							DISPLAY: "LINE",
    							WIDTH: 100
    						},
    						{
    							NAME: "Сводка",
    							VALUE: "Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.",
    							DISPLAY: "BLOCK"
    						},
    					]
    				},
    				{
    					DELIMITER: {
    						SIZE: 200,
    						COLOR: "#c6c6c6"
    					}
    				},
    				{
    					GRID: [
    						{
    							NAME: "Новое обращение",
    							VALUE: "",
    							DISPLAY: "ROW",
    							WIDTH: 100
    						},
    						{
    							NAME: "Назначено",
    							VALUE: "Шеленков Евгений",
    							DISPLAY: "ROW",
    							WIDTH: 100
    						},
    						{
    							NAME: "Дедлайн",
    							VALUE: "04.11.2015 17:50:43",
    							DISPLAY: "ROW",
    							WIDTH: 100
    						},
    					]
    				},
    			]
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch(error)
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
                'imbot.message.add',
                [
                    'DIALOG_ID' => 'chat20921',
                    'MESSAGE' => 'Message from bot',
                    'ATTACH' => [
                        [
                            'USER' => [
                                'NAME' => "Уведомления Mantis",
                                'AVATAR' => "http://files.shelenkov.com/bitrix/images/mantis2.jpg",
                                'LINK' => "http://shelenkov.com/",
                            ]
                        ],
                        [
                            'LINK' => [
                                'NAME' => "Открыть Mantis из внешней сети",
                                'LINK' => "http://shelenkov.com/",
                            ]
                        ],
                        [
                            'DELIMITER' => [
                                'SIZE' => 200,
                                'COLOR' => "#c6c6c6"
                            ]
                        ],
                        [
                            'GRID' => [
                                [
                                    'NAME' => "Проект",
                                    'VALUE' => "BUGS",
                                    'DISPLAY' => "LINE",
                                    'WIDTH' => 100
                                ],
                                [
                                    'NAME' => "Категория",
                                    'VALUE' => "im",
                                    'DISPLAY' => "LINE",
                                    'WIDTH' => 100
                                ],
                                [
                                    'NAME' => "Сводка",
                                    'VALUE' => "Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.",
                                    'DISPLAY' => "BLOCK"
                                ],
                            ]
                        ],
                        [
                            'DELIMITER' => [
                                'SIZE' => 200,
                                'COLOR' => "#c6c6c6"
                            ]
                        ],
                        [
                            'GRID' => [
                                [
                                    'NAME' => "Новое обращение",
                                    'VALUE' => "",
                                    'DISPLAY' => "ROW",
                                    'WIDTH' => 100
                                ],
                                [
                                    'NAME' => "Назначено",
                                    'VALUE' => "Шеленков Евгений",
                                    'DISPLAY' => "ROW",
                                    'WIDTH' => 100
                                ],
                                [
                                    'NAME' => "Дедлайн",
                                    'VALUE' => "04.11.2015 17:50:43",
                                    'DISPLAY' => "ROW",
                                    'WIDTH' => 100
                                ],
                            ]
                        ],
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.message.add',
        {
            DIALOG_ID: 'chat20921',
            MESSAGE: 'Message from bot',
            ATTACH: [
                {
                    USER: {
                        NAME: "Уведомления Mantis",
                        AVATAR: "http://files.shelenkov.com/bitrix/images/mantis2.jpg",
                        LINK: "http://shelenkov.com/",
                    }
                },
                {
                    LINK: {
                        NAME: "Открыть Mantis из внешней сети",
                        LINK: "http://shelenkov.com/",
                    }
                },
                {
                    DELIMITER: {
                        SIZE: 200,
                        COLOR: "#c6c6c6"
                    }
                },
                {
                    GRID: [
                        {
                            NAME: "Проект",
                            VALUE: "BUGS",
                            DISPLAY: "LINE",
                            WIDTH: 100
                        },
                        {
                            NAME: "Категория",
                            VALUE: "im",
                            DISPLAY: "LINE",
                            WIDTH: 100
                        },
                        {
                            NAME: "Сводка",
                            VALUE: "Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.",
                            DISPLAY: "BLOCK"
                        },
                    ]
                },
                {
                    DELIMITER: {
                        SIZE: 200,
                        COLOR: "#c6c6c6"
                    }
                },
                {
                    GRID: [
                        {
                            NAME: "Новое обращение",
                            VALUE: "",
                            DISPLAY: "ROW",
                            WIDTH: 100
                        },
                        {
                            NAME: "Назначено",
                            VALUE: "Шеленков Евгений",
                            DISPLAY: "ROW",
                            WIDTH: 100
                        },
                        {
                            NAME: "Дедлайн",
                            VALUE: "04.11.2015 17:50:43",
                            DISPLAY: "ROW",
                            WIDTH: 100
                        },
                    ]
                },
            ]
        }, function(result){
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

    {% include [Пояснение о restCommand](../../_includes/rest-command.md) %}

    ```php
    restCommand(
        'imbot.message.add',
        Array(
            "DIALOG_ID" => $_REQUEST['data']['PARAMS']['DIALOG_ID'],
            "MESSAGE" => "У вас новое уведомление",
            "ATTACH" => Array(
                Array(
                    "USER" => Array(
                        "NAME" => "Уведомления Mantis",
                        "AVATAR" => "http://files.shelenkov.com/bitrix/images/mantis2.jpg",
                        "LINK" => "http://shelenkov.com/",
                    )
                ),
                Array(
                    "LINK" => Array(
                        "NAME" => "Открыть Mantis из внешней сети",
                        "LINK" => "http://shelenkov.com/",
                    )
                ),
                Array(
                    "DELIMITER" => Array(
                        'SIZE' => 200,
                        'COLOR' => "#c6c6c6"
                    )
                ),
                Array(
                    "GRID" => Array(
                        Array(
                            "NAME" => "Проект",
                            "VALUE" => "BUGS",
                            "DISPLAY" => "LINE",
                            "WIDTH" => 100
                        ),
                        Array(
                            "NAME" => "Категория",
                            "VALUE" => "im",
                            "DISPLAY" => "LINE",
                            "WIDTH" => 100
                        ),
                        Array(
                            "NAME" => "Сводка",
                            "VALUE" => "Требуется реализовать возможность добавлять структурированные сущности в сообщения и уведомления мессенджера.",
                            "DISPLAY" => "BLOCK"
                        ),
                    )
                ),
                Array(
                    "DELIMITER" => Array(
                        'SIZE' => 200,
                        'COLOR' => "#c6c6c6"
                    )
                ),
                Array(
                    "GRID" => Array(
                        Array(
                            "NAME" => "Новое обращение",
                            "VALUE" => "",
                            "DISPLAY" => "ROW",
                            "WIDTH" => 100
                        ),
                        Array(
                            "NAME" => "Назначено",
                            "VALUE" => "Шеленков Евгений",
                            "DISPLAY" => "ROW",
                            "WIDTH" => 100
                        ),
                        Array(
                            "NAME" => "Дедлайн",
                            "VALUE" => "04.11.2015 17:50:43",
                            "DISPLAY" => "ROW",
                            "WIDTH" => 100
                        ),
                    )
                ),
            )
        ),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## «Информационный листок»

Этот пример показывает, как можно создать информационное сообщение с использованием различных типов вложений, включая текст и изображение.

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'imbot.message.add',
    		{
    			DIALOG_ID: 'chat20921',
    			MESSAGE: 'У вас новое уведомление',
    			ATTACH: {
    				ID: 1,
    				COLOR: "#29619b",
    				BLOCKS: [
    					{MESSAGE: "Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем."},
    					{IMAGE: {LINK: "http://files.shelenkov.com/bitrix/images/win.jpg"}}
    				]
    			}
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
                'imbot.message.add',
                [
                    'DIALOG_ID' => 'chat20921',
                    'MESSAGE'   => 'У вас новое уведомление',
                    'ATTACH'    => [
                        'ID'     => 1,
                        'COLOR'  => "#29619b",
                        'BLOCKS' => [
                            ['MESSAGE' => "Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем."],
                            ['IMAGE'   => ['LINK' => "http://files.shelenkov.com/bitrix/images/win.jpg"]],
                        ],
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding message: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.message.add',
        {
            DIALOG_ID: 'chat20921',
            MESSAGE: 'У вас новое уведомление',
            ATTACH: {
                ID: 1,
                COLOR: "#29619b",
                BLOCKS: [
                    {MESSAGE: "Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем."},
                    {IMAGE: {LINK: "http://files.shelenkov.com/bitrix/images/win.jpg"}}
                ]
            }
        }, function(result){
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

    {% include [Пояснение о restCommand](../../_includes/rest-command.md) %}

    ```php
    restCommand(
        'imbot.message.add',
        Array(
            "DIALOG_ID" => $_REQUEST['data']['PARAMS']['DIALOG_ID'],
            "MESSAGE" => "У вас новое уведомление",
            "ATTACH" => Array(
                Array(
                    "MESSAGE" => "Коллеги, обновление im 16.0.0 проверено и готово к выгрузке. Необходимо поставить тег. В обновление больше не подкладываем."
                ),
                Array(
                    "IMAGE" => Array(
                        "LINK" => "http://files.shelenkov.com/bitrix/images/win.jpg",
                    )
                ),
            )
        ),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}