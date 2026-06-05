# Выпадающее меню нижней части

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

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
