# Основная контентная область конфигурируемого дела

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

`BodyDto` — основная контентная область [записи таймлайна](../index.md): логотип и набор контентных блоков, из которых складывается содержимое записи. Объект передают в поле `body` [структуры конфигурируемого дела](./layout.md) при вызове методов [crm.activity.configurable.add](../crm-activity-configurable-add.md) и [crm.activity.configurable.update](../crm-activity-configurable-update.md).

Типы блоков и их поля описаны на странице [контентного блока](./content-block.md). Готовые сочетания — карточка с набором полей, с разными типами действий и на нескольких языках — собраны в [примерах конфигураций дела](./examples.md).

## Параметры объекта `BodyDto`

{% include [Сноска об обязательных параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **logo^*^**
[`LogoDto`](#logo-dto) | Логотип записи ||
|| **blocks^*^**
[`object`](../../../../../data-types.md) | Контентные блоки записи: ключ — идентификатор блока, который вы задаете сами, значение — объект [ContentBlockDto](./content-block.md). В ключе допустимы латинские буквы, цифры, дефис и подчеркивание. Передайте хотя бы один блок, но не более 20 ||
|#

Если структура нарушает эти ограничения, метод вернет ошибку валидации. Коды ошибок перечислены на страницах [crm.activity.configurable.add](../crm-activity-configurable-add.md#errors) и [crm.activity.configurable.update](../crm-activity-configurable-update.md#errors).

## Объект `LogoDto` {#logo-dto}

Логотип записи таймлайна.

### Параметры объекта `LogoDto`

{% include [Сноска об обязательных параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **code^*^**
[`string`](../../../../../data-types.md) | Код логотипа, например `call-incoming` или `notification`. Все доступные коды возвращает метод [crm.timeline.logo.list](../../../logmessage/logo/crm-timeline-logo-list.md). Свой логотип добавляет метод [crm.timeline.logo.add](../../../logmessage/logo/crm-timeline-logo-add.md) ||
|| **action**
[`ActionDto`](./action.md) | Действие по нажатию на логотип ||
|#

## Пример объекта

Значение поля `body`: логотип входящего звонка со ссылкой на сделку и один текстовый блок.

```json
{
    "logo": {
        "code": "call-incoming",
        "action": {
            "type": "redirect",
            "uri": "/crm/deal/details/123/"
        }
    },
    "blocks": {
        "text": {
            "type": "text",
            "properties": {
                "value": "Клиент подтвердил встречу"
            }
        }
    }
}
```

## Продолжите изучение

- [{#T}](./layout.md)
- [{#T}](./header.md)
- [{#T}](./icon.md)
- [{#T}](./content-block.md)
- [{#T}](./footer.md)
- [{#T}](./menu-item.md)
- [{#T}](./action.md)
- [{#T}](./field-types.md)
- [{#T}](./rest-app-layout-dto.md)
- [{#T}](./examples.md)
