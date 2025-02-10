# Иконка

Иконка [записи таймлайна](../index.md) `IconDto`.

## Параметры объекта `IconDto`

{% include [Сноска о параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** | **Дополнительно** ||
|| **code^*^**
[`string`](../../../../data-types.md) | Код иконки | Список доступных кодов можно получить методом [crm.timeline.icon.list](../../../logmessage/icons/crm-timeline-icon-list.md) ||
|#

## Пример объекта

```json
{
    "icon": {
        "code": "call-completed"
    }
}
```

## Продолжите изучение

- [{#T}](./layout.md)
- [{#T}](./header.md)
- [{#T}](./body.md)
- [{#T}](./content-block.md)
- [{#T}](./footer.md)
- [{#T}](./menu-item.md)
- [{#T}](./action.md)
- [{#T}](./field-types.md)
- [{#T}](./rest-app-layout-dto.md)
- [{#T}](./examples.md)