# Получить конфигурируемое дело по id crm.activity.configurable.get

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод возвращает информацию о конфигурируемом деле. 

{% note warning %}

Вызов метода возможен только в контексте [Rest приложения](https://dev.1c-bitrix.ru/docs/chm_files/app.zip).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../../data-types.md) | [Целочисленный идентификатор дела] (например, `999`) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

- cURL (OAuth)

- JS

    ```js
    BX24.callMethod(
        "crm.activity.configurable.get",
        {
            id: 999,
        }, result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }    
);
    ```

- PHP

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "activity": {
            "id": 8903,
            "ownerTypeId": 1,
            "ownerId": 2975,
            "fields": {
                "typeId": "CONFIGURABLE",
                "completed": false,
                "deadline": "2025-02-01T01:00:00+03:00",
                "pingOffsets": [],
                "isIncomingChannel": false,
                "responsibleId": 1,
                "badgeCode": "",
                "originatorId": null,
                "originId": null
            },
            "layout": {
                "icon": {
                    "code": "call-completed"
                },
                "header": {
                    "title": "Входящий звонок",
                    "tags": {
                        "status2": {
                            "title": "не расшифрован",
                            "type": "warning"
                        }
                    }
                },
                "body": {
                    "logo": {
                        "code": "call-incoming",
                        "action": {
                            "type": "redirect",
                            "uri": "/crm/deal/details/123/"
                        }
                    },
                    "blocks": {
                        "client": {
                            "type": "withTitle",
                            "properties": {
                                "title": "Клиент",
                                "inline": true,
                                "block": {
                                    "type": "text",
                                    "properties": {
                                        "value": "ООО Рога и Копыта"
                                    }
                                }
                            }
                        },
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
                            "type": "primary",
                            "action": {
                                "type": "openRestApp",
                                "actionParams": {
                                    "clientId": "456"
                                }
                            }
                        }
                    },
                    "menu": {
                        "showPostponeItem": false,
                        "items": {
                            "confirm": {
                                "title": "Подтвердить заявку",
                                "action": {
                                    "type": "restEvent",
                                    "id": "confirm",
                                    "animationType": "loader"
                                }
                            },
                            "decline": {
                                "title": "Отклонить заявку",
                                "action": {
                                    "type": "restEvent",
                                    "id": "decline",
                                    "animationType": "loader"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
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
[`object`](../../../../data-types.md) | Корневой элемент ответа - ассоциативный массив с ключом **activity**, в котором будет содержаться [поля](./crm-activity-configurable-add.md#параметры-метода) ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
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
|| `NOT_FOUND` | Элемент не найден ||
|| `ERROR_WRONG_CONTEXT` | Вызов метода возможен только в контексте rest приложения ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-activity-configurable-update.md)
- [{#T}](./crm-activity-configurable-add.md)