# Добавить конфигурируемое дело crm.activity.configurable.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на изменение элемента CRM, в который добавляется дело

Метод `crm.activity.configurable.add` добавляет конфигурируемое дело в таймлайн элемента CRM.

Приложение задает внешний вид записи само: в параметре `layout` оно передает [структуру](./structure/layout.md) — иконку, заголовок, контентные блоки и кнопки. Готовые конфигурации собраны в [примерах](./structure/examples.md). Нажатия на кнопки, теги и пункты меню приходят приложению [событием](./structure/action.md#sobytie) `onCrmTimelineItemAction`.

{% note info "" %}

Вызов метода возможен только в контексте [приложения](../../../../../settings/app-installation/index.md). Вызов через входящий вебхук вернет ошибку `ERROR_WRONG_CONTEXT`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ownerTypeId***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор [типа объекта CRM](../../../data-types.md#object_type), в элементе которого создается дело, например `2` для сделки ||
|| **ownerId***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор элемента CRM, в котором создается дело, например `1` ||
|| **fields***
[`array`](../../../../data-types.md) | Ассоциативный массив значений [полей дела](#parametr-fields) в виде структуры:

```json
{
    "typeId": "CONFIGURABLE",
    "completed": false,
    "deadline": "2025-02-01T12:00:00+03:00",
    "pingOffsets": [15, 60],
    "isIncomingChannel": "N",
    "responsibleId": 1,
    "badgeCode": "CUSTOM",
    "originatorId": "my_service",
    "originId": "42"
}
```
Параметр обязательный, но может быть пустым массивом
||
|| **layout***
[`LayoutDto`](./structure/layout.md) | Структура, которая задает внешний вид записи в таймлайне. Готовый [пример объекта](./structure/layout.md#primer) — на странице структуры ||
|#

### Параметр fields {#parametr-fields}

Все поля внутри `fields` необязательные. Поле, которое не передали, получит значение по умолчанию:

- `typeId` — `CONFIGURABLE`
- `responsibleId` — пользователь, от имени которого работает приложение
- `completed` и `isIncomingChannel` — `false`
- `pingOffsets` — пустой массив
- `originatorId`, `originId` и `badgeCode` останутся пустыми

#|
|| **Название**
`тип` | **Описание** ||
|| **typeId**
[`string`](../../../../data-types.md) | Тип конфигурируемого дела. Значение, отличное от `CONFIGURABLE`, должно соответствовать типу, который создало то же приложение методом [crm.activity.type.add](../types/crm-activity-type-add.md) с полем `IS_CONFIGURABLE_TYPE` равным `Y` ||
|| **completed**
[`boolean`](../../../../data-types.md) | Закрыто ли дело. Значение можно передать как `Y/N`, `1/0` или `true/false` ||
|| **deadline**
[`datetime`](../../../../data-types.md) | Крайний срок исполнения дела в формате ISO 8601, например `2025-02-01T12:00:00+03:00`. Входящему делу крайний срок задать нельзя — метод вернет ошибку `INCOMING_ACTIVITY_CAN_NOT_BE_WITH_DEADLINE` ||
|| **pingOffsets**
[`array`](../../../../data-types.md) | Смещения в минутах относительно крайнего срока. Задают, когда Битрикс24 сформирует по делу записи-пинги. Повторяющиеся значения Битрикс24 отбрасывает ||
|| **isIncomingChannel**
[`boolean`](../../../../data-types.md) | Создано ли дело из входящего канала. Значение можно передать как `Y/N`, `1/0` или `true/false` ||
|| **responsibleId**
[`integer`](../../../../data-types.md) | Идентификатор ответственного за дело ||
|| **badgeCode**
[`string`](../../../../data-types.md) | Код [бейджа](./badges/index.md) — значка на карточке элемента в канбане. Бейдж должен быть заранее зарегистрирован методом [crm.activity.badge.add](./badges/crm-activity-badge-add.md), иначе метод вернет ошибку `WRONG_FIELD_VALUE` ||
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
    -d '{"ownerTypeId":1,"ownerId":999,"fields":{"typeId":"CONFIGURABLE","completed":true,"deadline":"2025-02-01T12:00:00+03:00","pingOffsets":[60,300],"isIncomingChannel":"N","responsibleId":1,"badgeCode":"CUSTOM"},"layout":{"icon":{"code":"call-completed"},"header":{"title":"Входящий звонок"},"body":{"logo":{"code":"call-incoming"},"blocks":{"responsible":{"type":"lineOfBlocks","properties":{"blocks":{"client":{"type":"link","properties":{"text":"Сергей Востриков","bold":true,"action":{"type":"redirect","uri":"/crm/lead/details/789/"}}},"phone":{"type":"text","properties":{"value":"+7 999 888 7777"}}}}}}},"footer":{"buttons":{"startCall":{"title":"О клиенте","action":{"type":"openRestApp","actionParams":{"clientId":456}},"type":"primary"}}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.configurable.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AddConfigurableActivityResult = {
      activity: {
        id: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<AddConfigurableActivityResult>({
        method: 'crm.activity.configurable.add',
        params: {
          ownerTypeId: 1,
          ownerId: 999,
          fields: {
            typeId: 'CONFIGURABLE',
            completed: true,
            deadline: '2025-02-01T12:00:00+03:00',
            pingOffsets: [60, 300],
            isIncomingChannel: 'N',
            responsibleId: 1,
            badgeCode: 'CUSTOM',
          },
          layout: {
            icon: {
              code: 'call-completed',
            },
            header: {
              title: 'Входящий звонок',
            },
            body: {
              logo: {
                code: 'call-incoming',
              },
              blocks: {
                responsible: {
                  type: 'lineOfBlocks',
                  properties: {
                    blocks: {
                      client: {
                        type: 'link',
                        properties: {
                          text: 'Сергей Востриков',
                          bold: true,
                          action: {
                            type: 'redirect',
                            uri: '/crm/lead/details/789/',
                          },
                        },
                      },
                      phone: {
                        type: 'text',
                        properties: {
                          value: '+7 999 888 7777',
                        },
                      },
                    },
                  },
                },
              },
            },
            footer: {
              buttons: {
                startCall: {
                  title: 'О клиенте',
                  action: {
                    type: 'openRestApp',
                    actionParams: {
                      clientId: 456,
                    },
                  },
                  type: 'primary',
                },
              },
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added configurable activity, id:', result.activity.id)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function addConfigurableActivity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.configurable.add',
            params: {
              ownerTypeId: 1,
              ownerId: 999,
              fields: {
                typeId: 'CONFIGURABLE',
                completed: true,
                deadline: '2025-02-01T12:00:00+03:00',
                pingOffsets: [60, 300],
                isIncomingChannel: 'N',
                responsibleId: 1,
                badgeCode: 'CUSTOM',
              },
              layout: {
                icon: {
                  code: 'call-completed',
                },
                header: {
                  title: 'Входящий звонок',
                },
                body: {
                  logo: {
                    code: 'call-incoming',
                  },
                  blocks: {
                    responsible: {
                      type: 'lineOfBlocks',
                      properties: {
                        blocks: {
                          client: {
                            type: 'link',
                            properties: {
                              text: 'Сергей Востриков',
                              bold: true,
                              action: {
                                type: 'redirect',
                                uri: '/crm/lead/details/789/',
                              },
                            },
                          },
                          phone: {
                            type: 'text',
                            properties: {
                              value: '+7 999 888 7777',
                            },
                          },
                        },
                      },
                    },
                  },
                },
                footer: {
                  buttons: {
                    startCall: {
                      title: 'О клиенте',
                      action: {
                        type: 'openRestApp',
                        actionParams: {
                          clientId: 456,
                        },
                      },
                      type: 'primary',
                    },
                  },
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Added configurable activity, id:', result.activity.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addConfigurableActivity)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.activity.configurable.add(
            owner_type_id=1,
            owner_id=999,
            fields={
                "typeId": "CONFIGURABLE",
                "completed": True,
                "deadline": "2025-02-01T12:00:00+03:00",
                "pingOffsets": [60, 300],
                "isIncomingChannel": "N",
                "responsibleId": 1,
                "badgeCode": "CUSTOM",
            },
            layout={
                "icon": {
                    "code": "call-completed",
                },
                "header": {
                    "title": "Входящий звонок",
                },
                "body": {
                    "logo": {
                        "code": "call-incoming",
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
                                            "bold": True,
                                            "action": {
                                                "type": "redirect",
                                                "uri": "/crm/lead/details/789/",
                                            },
                                        },
                                    },
                                    "phone": {
                                        "type": "text",
                                        "properties": {
                                            "value": "+7 999 888 7777",
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                "footer": {
                    "buttons": {
                        "startCall": {
                            "title": "О клиенте",
                            "action": {
                                "type": "openRestApp",
                                "actionParams": {
                                    "clientId": 456,
                                },
                            },
                            "type": "primary",
                        },
                    },
                },
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
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
                        'deadline' => '2025-02-01T12:00:00+03:00',
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
                deadline: '2025-02-01T12:00:00+03:00',
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
                'deadline' => '2025-02-01T12:00:00+03:00',
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

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.activity.configurable.add", b24.Params{
    	"ownerTypeId": 1,
    	"ownerId":     999,
    	"fields": b24.Params{
    		"typeId":            "CONFIGURABLE",
    		"completed":         true,
    		"deadline":          "2025-02-01T12:00:00+03:00",
    		"pingOffsets":       []int{60, 300},
    		"isIncomingChannel": "N",
    		"responsibleId":     1,
    		"badgeCode":         "CUSTOM",
    	},
    	"layout": b24.Params{
    		"icon": b24.Params{
    			"code": "call-completed",
    		},
    		"header": b24.Params{
    			"title": "Входящий звонок",
    		},
    		"body": b24.Params{
    			"logo": b24.Params{
    				"code": "call-incoming",
    			},
    			"blocks": b24.Params{
    				"responsible": b24.Params{
    					"type": "lineOfBlocks",
    					"properties": b24.Params{
    						"blocks": b24.Params{
    							"client": b24.Params{
    								"type": "link",
    								"properties": b24.Params{
    									"text": "Сергей Востриков",
    									"bold": true,
    									"action": b24.Params{
    										"type": "redirect",
    										"uri":  "/crm/lead/details/789/",
    									},
    								},
    							},
    							"phone": b24.Params{
    								"type": "text",
    								"properties": b24.Params{
    									"value": "+7 999 888 7777",
    								},
    							},
    						},
    					},
    				},
    			},
    		},
    		"footer": b24.Params{
    			"buttons": b24.Params{
    				"startCall": b24.Params{
    					"title": "О клиенте",
    					"action": b24.Params{
    						"type": "openRestApp",
    						"actionParams": b24.Params{
    							"clientId": 456,
    						},
    					},
    					"type": "primary",
    				},
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.activity.configurable.add: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "activity": {
            "id": 999
        }
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
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../../data-types.md) | Корневой элемент ответа с единственным ключом **activity** [(подробное описание)](#activity) ||
|| **time**
[`time`](../../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект activity {#activity}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../../data-types.md) | Идентификатор созданного дела. Его передают в параметр `id` методов [crm.activity.configurable.update](./crm-activity-configurable-update.md) и [crm.activity.configurable.get](./crm-activity-configurable-get.md) ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_WRONG_CONTEXT",
    "error_description": "Вызов метода возможен только в контексте rest приложения"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок {#errors}

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав на создание дела в элементе CRM ||
|| `100` | Не передан обязательный параметр `ownerTypeId`, `ownerId`, `fields` или `layout` ||
|| `ERROR_WRONG_CONTEXT` | Метод вызван не из приложения, например через входящий вебхук ||
|| `WRONG_FIELD_VALUE` | Некорректное значение поля: неизвестный `badgeCode` или `typeId` в `fields`, неподходящий тип вложенного блока, неверный формат цвета в `sliderParams` ||
|| `INCOMING_ACTIVITY_CAN_NOT_BE_WITH_DEADLINE` | Входящее дело не может иметь крайний срок ||
|| `ERROR_EMPTY_LAYOUT` | Передан пустой `layout` ||
|| `FIELD_IS_REQUIRED` | В объекте структуры не передано обязательное поле ||
|| `FIELD_IS_REDUNDANT` | В объекте структуры передано поле, которого нет в его описании ||
|| `ENUM_FIELD` | Значение поля не входит в список допустимых, например неизвестный тип тега ||
|| `TOO_MANY_ITEMS` | Превышено количество элементов массива, например больше двух тегов или кнопок ||
|| `KEY_CONTAIN_WRONG_SYMBOLS` | Ключ в ассоциативном массиве структуры содержит недопустимые символы. Допустимы только латинские буквы, цифры, дефис и подчеркивание ||
|| `WRONG_LANG` | В мультиязычном значении передан код языка, не установленного в Битрикс24 ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-configurable-update.md)
- [{#T}](./crm-activity-configurable-get.md)
- [{#T}](./structure/layout.md)
- [{#T}](./structure/examples.md)
- [{#T}](./badges/index.md)
- [{#T}](../activity-base/crm-activity-list.md)
- [{#T}](../activity-base/crm-activity-delete.md)
- [{#T}](./index.md)
