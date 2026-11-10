# Выпадающее меню нижней части

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

`MenuItemDto` — пункт выпадающего меню в нижней части [записи таймлайна](../index.md). Меню открывается по кнопке с тремя точками. Приложение добавляет в него свои действия — например, подтвердить или отклонить заявку.

Пункты передают в поле `items` объекта [FooterMenuDto](./footer.md#footermenudto): ключ — идентификатор пункта из латинских букв, цифр, дефиса и подчеркивания, значение — объект `MenuItemDto`. Приложение может добавить не более 10 пунктов. В структуре дела путь до пункта — `layout.footer.menu.items.<ключ>`, структуру передают в параметре `layout` методов [crm.activity.configurable.add](../crm-activity-configurable-add.md) и [crm.activity.configurable.update](../crm-activity-configurable-update.md). Условия вызова и коды ошибок валидации — на страницах методов.

После пунктов приложения Битрикс24 добавляет в то же меню системные пункты «Закрепить», «Отложить» и «Удалить». Флаги `showPinItem`, `showPostponeItem` и `showDeleteItem` объекта `FooterMenuDto` разрешают их показ, а покажет ли Битрикс24 пункт на самом деле, зависит еще и от состояния дела — условия описаны на странице [FooterMenuDto](./footer.md#footermenudto). Пункт «О приложении» Битрикс24 добавляет всегда, отключить его нельзя.

## Параметры объекта `MenuItemDto`

{% include [Сноска об обязательных параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **title^*^**
[`textWithTranslation`](./field-types.md#textwithtranslation) | Текст пункта меню ||
|| **action^*^**
[`ActionDto`](./action.md) | Действие по нажатию на пункт ||
|| **subtitle**
[`textWithTranslation`](./field-types.md#textwithtranslation) | Вторая строка пункта, под текстом ||
|| **scope**
[`string`](../../../../../data-types.md) | [Область видимости](./field-types.md#scope), например `web` ||
|| **hideIfReadonly**
[`boolean`](../../../../../data-types.md) | Если `true`, пункт не покажется пользователю, у которого нет права редактировать элемент CRM. По умолчанию `false` ||
|| **design**
[`string`](../../../../../data-types.md) | Оформление пункта: `default`, `accent-1`, `accent-2`, `alert`, `copilot` или `disabled`. Другое значение Битрикс24 отклонит с ошибкой `ENUM_FIELD`. Пункт с `disabled` выглядит недоступным, но действие по нажатию выполняется — например, чтобы показать, почему пункт отключен ||
|| **isSelected**
[`boolean`](../../../../../data-types.md) | Пункт-переключатель: при `true` показывается галочка, при `false` — пустое место под нее. Без поля пункт обычный ||
|| **isLocked**
[`boolean`](../../../../../data-types.md) | Если `true`, рядом с пунктом показывается значок замка ||
|| **badgeText**
[`BadgeTextDto`](#badge-text-dto) | Бейдж рядом с текстом пункта, например «Новое» ||
|| **sectionCode**
[`string`](../../../../../data-types.md) | Код [раздела меню](#sections), в который попадет пункт. Если разделы объявлены, поле обязательно у каждого пункта и должно совпадать с кодом одного из них ||
|#

## Объект `BadgeTextDto` {#badge-text-dto}

Бейдж у пункта меню.

### Параметры объекта `BadgeTextDto`

{% include [Сноска об обязательных параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **title^*^**
[`textWithTranslation`](./field-types.md#textwithtranslation) | Текст бейджа ||
|| **color**
[`string`](../../../../../data-types.md) | Цвет бейджа в формате CSS, например `#2fc6f6` ||
|#

## Разделы меню {#sections}

Пункты можно сгруппировать по разделам с заголовками. Разделы объявляют в поле `sections` объекта `FooterMenuDto` — массивом объектов `MenuSectionDto`, не более 10 разделов. Когда разделы объявлены, у каждого пункта в `items` должен быть `sectionCode` с кодом одного из них, иначе Битрикс24 отклонит структуру. Системные пункты Битрикс24 помещает в свой раздел `system`, пункт «О приложении» — в раздел `about`; коды `system`, `about`, `base` и `extensions` для своих разделов использовать нельзя.

### Параметры объекта `MenuSectionDto`

{% include [Сноска об обязательных параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **code^*^**
[`string`](../../../../../data-types.md) | Код раздела. Его указывают в поле `sectionCode` пунктов ||
|| **title**
[`textWithTranslation`](./field-types.md#textwithtranslation) | Заголовок раздела в меню ||
|| **design**
[`string`](../../../../../data-types.md) | Оформление раздела: `default` или `accent` ||
|#

## Пример объекта

Пункт меню с подзаголовком, акцентным оформлением и бейджем. Пункт скрыт от пользователей без права редактировать элемент.

```json
{
    "title": "Подтвердить заявку",
    "subtitle": "Отправить клиенту договор",
    "action": {
        "type": "restEvent",
        "id": "confirmRequest",
        "animationType": "loader"
    },
    "design": "accent-1",
    "badgeText": {
        "title": "Новое",
        "color": "#2fc6f6"
    },
    "hideIfReadonly": true
}
```

## Пример меню с разделами

Значение поля `menu` объекта `FooterDto`: два пункта приложения в разделе «Заявка», системные пункты «Отложить» и «Удалить» отключены.

```json
{
    "showPostponeItem": false,
    "showDeleteItem": false,
    "sections": [
        {
            "code": "request",
            "title": "Заявка"
        }
    ],
    "items": {
        "confirm": {
            "title": "Подтвердить",
            "sectionCode": "request",
            "action": {
                "type": "restEvent",
                "id": "confirmRequest",
                "animationType": "loader"
            }
        },
        "decline": {
            "title": "Отклонить",
            "sectionCode": "request",
            "design": "alert",
            "action": {
                "type": "restEvent",
                "id": "declineRequest",
                "animationType": "loader"
            }
        }
    }
}
```

## Продолжите изучение

- [{#T}](./layout.md)
- [{#T}](./icon.md)
- [{#T}](./body.md)
- [{#T}](./content-block.md)
- [{#T}](./header.md)
- [{#T}](./footer.md)
- [{#T}](./action.md)
- [{#T}](./field-types.md)
- [{#T}](./rest-app-layout-dto.md)
- [{#T}](./examples.md)
