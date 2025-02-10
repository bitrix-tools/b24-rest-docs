# Структура конфигурируемого дела

Объект, описывающий внешний вид [записи таймлайна](../index.md), представляет собой иерархическую структуру вложенных объектов различного типа.

Каждый из вложенных объектов имеет собственный набор полей и описан ниже в виде DTO (Data Transfer Object).

Верхнеуровневый объект записи таймлайна `LayoutDto`.

![Верхнеуровневый объект записи таймлайна](./_images/LayoutDto.png)

## Параметры объекта `LayoutDto`

{% include [Сноска о параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **icon^*^**
[`IconDto`](./icon.md) | Иконка слева от записи ||
|| **header^*^**
[`HeaderDto`](./header.md) | Заголовок записи ||
|| **body^*^**
[`BodyDto`](./body.md) | Основная контентная область записи ||
|| **footer**
[`FooterDto`](./footer.md) | Нижняя часть записи с блоком действий ||
|#

## Пример объекта

```json
{
    "icon": {
        "code": "call-completed"
    },
    "header": {
        "title": "Входящий звонок",
        "tags": {
            "status2": {
                "type": "warning",
                "title": "не расшифрован"
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
                "action": {
                    "type": "openRestApp",
                    "actionParams": {
                        "clientId": 456
                    }
                },
                "type": "primary"
            }
        },
        "menu": {
            "showPostponeItem": "false",
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
```

## Продолжите изучение

- [{#T}](./icon.md)
- [{#T}](./header.md)
- [{#T}](./body.md)
- [{#T}](./content-block.md)
- [{#T}](./footer.md)
- [{#T}](./menu-item.md)
- [{#T}](./action.md)
- [{#T}](./field-types.md)
- [{#T}](./rest-app-layout-dto.md)
- [{#T}](./examples.md)
