# Обновить конфигурируемое дело crm.activity.configurable.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом на изменение элемента CRM, к которому привязано дело

Метод `crm.activity.configurable.update` обновляет поля конфигурируемого дела, структуру его записи в таймлайне или и то, и другое сразу.

Обновление частичное: поля, которые не переданы в `fields`, сохраняют прежние значения. Без `layout` запись останется с текущим внешним видом. Переданный `layout` заменяет прежнюю структуру целиком, объединения по полям не происходит.

Этим же методом снимают [блокировку записи](./structure/action.md#sobytie), которую ставит поле `animationType` действия при нажатии.

{% note info "" %}

Вызов метода возможен только в контексте того [приложения](../../../../../settings/app-installation/index.md), которое создало дело. Вызов через входящий вебхук вернет ошибку `ERROR_WRONG_CONTEXT`, вызов из другого приложения — `ERROR_WRONG_APPLICATION`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | Целочисленный идентификатор дела, например `999`. Его возвращает метод [crm.activity.configurable.add](./crm-activity-configurable-add.md) ||
|| **fields**
[`array`](../../../../data-types.md) | Ассоциативный массив значений [полей дела](./crm-activity-configurable-add.md#parametr-fields) в виде структуры:

```json
{
    "completed": true,
    "deadline": "2025-02-01T12:00:00+03:00",
    "pingOffsets": [15, 60],
    "isIncomingChannel": "N",
    "responsibleId": 5,
    "badgeCode": "CUSTOM",
    "originatorId": "my_service",
    "originId": "42"
}
```
Переданные поля обновятся, остальные сохранят прежние значения
||
|| **layout**
[`LayoutDto`](./structure/layout.md) | Структура, которая задает внешний вид записи в таймлайне. Готовый [пример объекта](./structure/layout.md#primer) — на странице структуры ||
|#

Обязателен только `id`. Параметры `fields` и `layout` можно передавать по отдельности или вместе.

### Как очистить значение поля

Пустое значение стирает не каждое поле:

#|
|| **Поле** | **Как очистить** ||
|| `badgeCode`, `originatorId`, `originId` | Передайте пустую строку ||
|| `pingOffsets` | Передайте пустой массив ||
|| `deadline` | Очистить через метод нельзя: пустое значение Битрикс24 игнорирует и оставляет прежний срок ||
|#

Тип дела `typeId` после создания не меняется: другое значение метод отклонит с ошибкой `CANT_CHANGE_PROVIDER_TYPE_ID`.

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":999,"fields":{"completed":false,"deadline":"2025-02-01T12:00:00+03:00","pingOffsets":[300],"isIncomingChannel":"Y","responsibleId":5,"badgeCode":"CUSTOM"},"layout":{"icon":{"code":"call-completed"},"header":{"title":"Входящий звонок"},"body":{"logo":{"code":"call-incoming"},"blocks":{"responsible":{"type":"lineOfBlocks","properties":{"blocks":{"client":{"type":"link","properties":{"text":"Сергей Востриков","bold":true,"action":{"type":"redirect","uri":"/crm/lead/details/789/"}}},"phone":{"type":"text","properties":{"value":"+7 999 888 7777"}}}}}}},"footer":{"buttons":{"startCall":{"title":"О клиенте","action":{"type":"openRestApp","actionParams":{"clientId":456}},"type":"primary"}}}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.activity.configurable.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ActivityUpdateResult = {
      activity: {
        id: number
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<ActivityUpdateResult>({
        method: 'crm.activity.configurable.update',
        params: {
          id: 999,
          fields: {
            completed: false,
            deadline: '2025-02-01T12:00:00+03:00',
            pingOffsets: [300],
            isIncomingChannel: 'Y',
            responsibleId: 5,
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
        console.info('Updated activity id:', result.activity.id)
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
      async function updateConfigurableActivity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.activity.configurable.update',
            params: {
              id: 999,
              fields: {
                completed: false,
                deadline: '2025-02-01T12:00:00+03:00',
                pingOffsets: [300],
                isIncomingChannel: 'Y',
                responsibleId: 5,
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
          console.info('Updated activity id:', result.activity.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateConfigurableActivity)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # Обертка b24pysdk принимает только fields — обновляются поля дела.
    # Чтобы заменить структуру записи, вызовите метод напрямую и передайте layout.
    try:
        bitrix_response = client.crm.activity.configurable.update(
            bitrix_id=999,
            fields={
                "completed": False,
                "deadline": "2025-02-01T12:00:00+03:00",
                "pingOffsets": [
                    300,
                ],
                "responsibleId": 5,
                "badgeCode": "CUSTOM",
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
                'crm.activity.configurable.update',
                [
                    'id'     => 999,
                    'fields' => [
                        'completed'         => false,
                        'deadline'          => '2025-02-01T12:00:00+03:00',
                        'pingOffsets'       => [300],
                        'isIncomingChannel' => 'Y',
                        'responsibleId'     => 5,
                        'badgeCode'         => 'CUSTOM',
                    ],
                    'layout' => [
                        'icon'   => [
                            'code' => 'call-completed',
                        ],
                        'header' => [
                            'title' => 'Входящий звонок',
                        ],
                        'body'   => [
                            'logo'   => [
                                'code' => 'call-incoming',
                            ],
                            'blocks' => [
                                'responsible' => [
                                    'type'       => 'lineOfBlocks',
                                    'properties' => [
                                        'blocks' => [
                                            'client' => [
                                                'type'       => 'link',
                                                'properties' => [
                                                    'text'   => 'Сергей Востриков',
                                                    'bold'   => true,
                                                    'action' => [
                                                        'type' => 'redirect',
                                                        'uri'  => '/crm/lead/details/789/',
                                                    ],
                                                ],
                                            ],
                                            'phone'  => [
                                                'type'       => 'text',
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
                                    'title'  => 'О клиенте',
                                    'action' => [
                                        'type'         => 'openRestApp',
                                        'actionParams' => [
                                            'clientId' => 456,
                                        ],
                                    ],
                                    'type'   => 'primary',
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
        echo 'Error updating configurable activity: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.activity.configurable.update",
        {
            id: 999,
            fields:
            {
                completed: false,
                deadline: '2025-02-01T12:00:00+03:00',
                pingOffsets: [300],
                isIncomingChannel: 'Y',
                responsibleId: 5,
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
        'crm.activity.configurable.update',
        [
            'id' => 999,
            'fields' => [
                'completed' => false,
                'deadline' => '2025-02-01T12:00:00+03:00',
                'pingOffsets' => [300],
                'isIncomingChannel' => 'Y',
                'responsibleId' => 5,
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
    res, err := client.Core().Call(ctx, "crm.activity.configurable.update", b24.Params{
    	"id": 999,
    	"fields": b24.Params{
    		"completed":         false,
    		"deadline":          "2025-02-01T12:00:00+03:00",
    		"pingOffsets":       []int{300},
    		"isIncomingChannel": "Y",
    		"responsibleId":     5,
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
    	return fmt.Errorf("crm.activity.configurable.update: %w", err)
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
[`integer`](../../../../data-types.md) | Идентификатор обновленного дела ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_WRONG_APPLICATION",
    "error_description": "Обновить дело может только приложение, которое его создало"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок {#errors}

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав на изменение дела ||
|| `NOT_FOUND` | Дело не найдено или не является конфигурируемым ||
|| `100` | Не передан обязательный параметр `id` ||
|| `ERROR_WRONG_CONTEXT` | Метод вызван не из приложения, например через входящий вебхук ||
|| `ERROR_WRONG_APPLICATION` | Обновить дело может только приложение, которое его создало ||
|| `WRONG_FIELD_VALUE` | Некорректное значение поля: неизвестный `badgeCode` или `typeId` в `fields`, неподходящий тип вложенного блока, неверный формат цвета в `sliderParams` ||
|| `INCOMING_ACTIVITY_CAN_NOT_BE_WITH_DEADLINE` | Входящее дело не может иметь крайний срок ||
|| `CANT_CHANGE_PROVIDER_TYPE_ID` | Тип дела изменить нельзя: переданный `typeId` отличается от типа, с которым дело создали ||
|| `FIELD_IS_REQUIRED` | В объекте структуры не передано обязательное поле ||
|| `FIELD_IS_REDUNDANT` | В объекте структуры передано поле, которого нет в его описании ||
|| `ENUM_FIELD` | Значение поля не входит в список допустимых, например неизвестный тип тега ||
|| `TOO_MANY_ITEMS` | Превышено количество элементов массива, например больше двух тегов или кнопок ||
|| `KEY_CONTAIN_WRONG_SYMBOLS` | Ключ в ассоциативном массиве структуры содержит недопустимые символы. Допустимы только латинские буквы, цифры, дефис и подчеркивание ||
|| `WRONG_LANG` | В мультиязычном значении передан код языка, не установленного в Битрикс24 ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-configurable-add.md)
- [{#T}](./crm-activity-configurable-get.md)
- [{#T}](./structure/layout.md)
- [{#T}](./structure/examples.md)
- [{#T}](./badges/index.md)
- [{#T}](../activity-base/crm-activity-list.md)
- [{#T}](../activity-base/crm-activity-delete.md)
- [{#T}](./index.md)
