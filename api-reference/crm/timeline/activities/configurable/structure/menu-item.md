# Выпадающее меню нижней части

Пункты выпадающего меню нижней части [записи таймлайна](../index.md) `MenuItemDto`.

## Параметры объекта `MenuItemDto`

{% include [Сноска о параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **title^*^**
[`textWithTranslation`](./field-types.md#textwithtranslation) | Текст кнопки ||
|| **action^*^**
[`ActionDto`](./action.md) | Действие по нажатию на кнопку ||
|| **scope**
[`string`](../../../../data-types.md) | [Область видимости](./field-types.md#scope), например `web` ||
|| **hideIfReadonly**
[`boolean`](../../../../data-types.md) | Флаг. Скрывает тег, если у пользователя нет доступа на редактирование, по умолчанию `false` ||
|#

## Пример

```json
{
    "title": "Подтвердить процесс",
    "action": {
        "type": "restEvent",
        "id": "confirmProcess",
        "animationType": "loader"
    },
    "scope": "web",
    "hideIfReadonly": true
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
