# Примеры конфигураций дела

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Готовые примеры объекта [`LayoutDto`](./layout.md) — структуры, которая описывает внешний вид записи таймлайна. Такой объект передают в поле `layout` методов [crm.activity.configurable.add](../crm-activity-configurable-add.md) и [crm.activity.configurable.update](../crm-activity-configurable-update.md).

Каждый пример показывает готовую конфигурацию целиком и результат, который увидит пользователь в таймлайне:

- [Запись с набором полей](#fields-card) — пары название-значение и крайний срок
- [Запись с разными типами действий](#actions-card) — переходы по ссылкам, открытие приложения и событие по нажатию кнопки
- [Запись на нескольких языках](#multilang-card) — тексты с переводами

Примеры отдельных [контентных блоков](./content-block.md) собраны на странице их описания. Все конфигурации ниже составлены с учетом [ограничений структуры](./layout.md#limits).

Оба метода работают только в контексте приложения: через входящий вебхук такой вызов вернет ошибку `ERROR_WRONG_CONTEXT`. Права и условия вызова описаны на [странице структуры](./layout.md).

Коды иконок и логотипов в примерах — из общих списков таймлайна. Получить полные списки можно методами [crm.timeline.icon.list](../../../logmessage/icons/crm-timeline-icon-list.md) и [crm.timeline.logo.list](../../../logmessage/logo/crm-timeline-logo-list.md).

## Запись с набором полей {#fields-card}

Запись «Информационное сообщение» с четырьмя парами название-значение: крайний срок, клиент, менеджер и дополнительная информация. Каждая пара — блок `withTitle`, который выводит подпись и вложенный блок со значением. Вложенным может быть блок типа `text`, `link` или `deadline`.

Параметр `inline` управляет расположением: при `true` подпись и значение стоят в одной строке, при `false` значение переносится под подпись.

Блок `deadline` подставляет крайний срок самого дела — условия, при которых он не показывается и не редактируется, перечислены в [описании блока](./content-block.md#vybor-krajnego-sroka).

Ключи в массиве `blocks` приложение придумывает само — они не связаны с типами блоков. В примере ключ `deadline` совпадает с именем типа, но это случайность, а не требование.

```json
{
    "icon": {
        "code": "info"
    },
    "header": {
        "title": "Информационное сообщение"
    },
    "body": {
        "logo": {
            "code": "document"
        },
        "blocks": {
            "deadline": {
                "type": "withTitle",
                "properties": {
                    "title": "Крайний срок",
                    "inline": true,
                    "block": {
                        "type": "deadline"
                    }
                }
            },
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
            "manager": {
                "type": "withTitle",
                "properties": {
                    "title": "Менеджер",
                    "inline": true,
                    "block": {
                        "type": "link",
                        "properties": {
                            "text": "Сергей Востриков",
                            "bold": true,
                            "action": {
                                "type": "redirect",
                                "uri": "/company/personal/user/1/"
                            }
                        }
                    }
                }
            },
            "description": {
                "type": "withTitle",
                "properties": {
                    "title": "Дополнительная информация в большом количестве",
                    "inline": false,
                    "block": {
                        "type": "text",
                        "properties": {
                            "multiline": true,
                            "value": "Подъехать не раньше обеда. Вход со двора, пароль от калитки 555. Подняться на 5 этаж, спросить Ивана Николаевича. Расчет наличными, сдача с 5000 руб."
                        }
                    }
                }
            }
        }
    }
}
```

![Запись с набором полей](./_images/ContentBlockDto_11.png)

## Запись с разными типами действий {#actions-card}

Конфигурация, в которой собраны все типы [действий](./action.md): переход по внутренней и внешней ссылке, открытие приложения из тега и отправка события приложению по нажатию кнопки.

Оба блока `link` используют действие `redirect`, но ведут себя по-разному. Относительная ссылка на сделку открывает ее в слайдере. Внешняя ссылка с доменом открывается в новой вкладке браузера.

Оба тега открывают приложение и различаются оформлением: `warning` дает желтый фон, `primary` — голубой. Наборы `actionParams` у них тоже разные.

Обе кнопки отправляют приложению [событие](./action.md#sobytie) `onCrmTimelineItemAction` с `id = confirm` и различаются только значением `animationType`, поэтому в таймлайне выглядят одинаково — разница видна при нажатии.

Ключ `blockId` в `actionParams` придуман приложением и ни на что в самой конфигурации не ссылается: приложение само решит, как его использовать.

```json
{
    "icon": {
        "code": "document"
    },
    "header": {
        "title": "Пример разных типов действий",
        "tags": {
            "tag1": {
                "type": "warning",
                "title": "открыть приложение",
                "action": {
                    "type": "openRestApp",
                    "actionParams": {
                        "myId": 123
                    }
                }
            },
            "tag2": {
                "type": "primary",
                "title": "открыть приложение",
                "action": {
                    "type": "openRestApp",
                    "actionParams": {
                        "someImportant": "qwerty"
                    }
                }
            }
        }
    },
    "body": {
        "logo": {
            "code": "document"
        },
        "blocks": {
            "link1": {
                "type": "link",
                "properties": {
                    "text": "Открыть внутреннюю ссылку",
                    "action": {
                        "type": "redirect",
                        "uri": "/crm/deal/details/1/"
                    }
                }
            },
            "link2": {
                "type": "link",
                "properties": {
                    "text": "Открыть внешнюю ссылку",
                    "action": {
                        "type": "redirect",
                        "uri": "https://bitrix24.ru"
                    }
                }
            }
        }
    },
    "footer": {
        "buttons": {
            "button1": {
                "title": "rest событие",
                "action": {
                    "type": "restEvent",
                    "id": "confirm",
                    "animationType": "loader",
                    "actionParams": {
                        "blockId": "time"
                    }
                },
                "type": "primary"
            },
            "button2": {
                "title": "rest событие",
                "action": {
                    "type": "restEvent",
                    "id": "confirm",
                    "animationType": "disable",
                    "actionParams": {
                        "blockId": "time"
                    }
                },
                "type": "primary"
            }
        }
    }
}
```

![Запись с разными типами действий](./_images/ContentBlockDto_12.png)

## Запись на нескольких языках {#multilang-card}

Конфигурация для приложения, которым пользуются на разных языках. В заголовок записи, текст тега, содержимое блоков и подписи кнопок передают не строку, а объект с переводами: эти поля имеют тип [`textWithTranslation`](./field-types.md#textwithtranslation). Там же описаны правила для такого объекта и порядок, в котором Битрикс24 выбирает язык.

```json
{
    "icon": {
        "code": "info"
    },
    "header": {
        "title": {"ru": "Информация", "en": "Information"},
        "tags": {
            "tag": {
                "type": "warning",
                "title": {
                    "ru": "Внимание",
                    "en": "Warning"
                }
            }
        }
    },
    "body": {
        "logo": {
            "code": "notification"
        },
        "blocks": {
            "text": {
                "type": "text",
                "properties": {
                    "value": {"ru": "Этот текст будет по разному показан на разных языках", "en": "A text"}
                }
            }
        }
    },
    "footer": {
        "buttons": {
            "button1": {
                "title": {"ru": "Нажми меня", "en": "Push me"},
                "type": "primary",
                "action": {
                    "type": "redirect",
                    "uri": "https://bitrix24.ru"
                }
            }
        }
    }
}
```

Результат на русском:

![Запись на русском языке](./_images/ContentBlockDto_13.png)

Результат на английском:

![Запись на английском языке](./_images/ContentBlockDto_14.png)

## Продолжите изучение

- [{#T}](./layout.md)
- [{#T}](./icon.md)
- [{#T}](./header.md)
- [{#T}](./body.md)
- [{#T}](./content-block.md)
- [{#T}](./footer.md)
- [{#T}](./menu-item.md)
- [{#T}](./action.md)
- [{#T}](./field-types.md)
- [{#T}](./rest-app-layout-dto.md)
- [{#T}](../crm-activity-configurable-add.md)
- [{#T}](../crm-activity-configurable-update.md)
- [{#T}](../index.md)
