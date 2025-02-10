# Нижняя часть записи

Нижняя часть [записи таймлайна](../index.md) с блоком действий `FooterDto`.

## Параметры объекта `FooterDto`

{% include [Сноска о параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **buttons**
[`FooterButtonDto`](#footerbuttondto) | Массив объектов, описывающих кнопки действий. Допускается не более двух кнопок ||
|| **menu**
[`FooterMenuDto`](#footermenudto) | Нижнее меню ||
|#

## FooterButtonDto

Кнопка в нижней части записи таймлайна.

### Параметры объекта `FooterButtonDto`

{% include [Сноска о параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **title^*^**
[`textWithTranslation`](./field-types.md#textwithtranslation) | Текст кнопки ||
|| **type^*^**
[`string`](../../../../data-types.md) | Тип кнопки. Определяет ее внешний вид, например `primary` ||
|| **action^*^**
[`ActionDto`](./action.md) | Действие по нажатию на кнопку ||
|| **scope**
[`string`](../../../../data-types.md) | [Область видимости](./field-types.md#scope), например `web` ||
|| **hideIfReadonly**
[`boolean`](../../../../data-types.md) | Флаг. Скрывает тег, если у пользователя нет доступа на редактирование (по умолчанию `false`) ||
|#

Возможные значения поля **type**:

- **primary** - Голубой фон кнопки
- **secondary** - Белый фон кнопки

![Типы кнопок](./_images/ContentBlockDto_20.png)

### Пример

```json
{
    "title": "Открыть сделку",
    "type": "primary",
    "action": {
        "type": "redirect",
        "uri": "/crm/deal/details/123/"
    },
    "scope": "web",
    "hideIfReadonly": true
}
```

## FooterMenuDto

Выпадающее меню нижней части записи таймлайна.

### Параметры объекта `FooterMenuDto`

#|
|| **Поле** | **Описание** ||
|| **showPinItem**
[`boolean`](../../../../data-types.md) | Показ пункта меню "Закрепить". Пункт меню не будет показан, если его добавить в невыполненное дело. По-умолчанию `true` ||
|| **showPostponeItem**
[`boolean`](../../../../data-types.md) | Показ пункта меню "Отложить". Пункт меню не будет показан, если его добавить во входящее дело, в дело без дедлайна, либо в выполненное дело. По-умолчанию `true`. ||
|| **showDeleteItem**
[`boolean`](../../../../data-types.md) | Показ пункта меню "Удалить". По-умолчанию `true` ||
|| **items**
[`MenuItemDto`](./menu-item.md) | Ассоциативный массив объектов, описывающих пункты выпадающего меню ||
|#

### Пример

```json
{
    "showPostponeItem": "false",
    "showDeleteItem": "false",
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
```

## Продолжите изучение

- [{#T}](./layout.md)
- [{#T}](./icon.md)
- [{#T}](./body.md)
- [{#T}](./content-block.md)
- [{#T}](./header.md)
- [{#T}](./menu-item.md)
- [{#T}](./action.md)
- [{#T}](./field-types.md)
- [{#T}](./rest-app-layout-dto.md)
- [{#T}](./examples.md)