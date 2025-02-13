# Основная контентная область конфигурируемого дела

`BodyDto` — это основная контентная область [записи таймлайна](../index.md).

## Параметры объекта `BodyDto`

{% include [Сноска о параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **logo^*^**
[`LogoDto`](#obuekt) | Объект, описывающий логотип записи таймлайна ||
|| **blocks**
[`ContentBlockDto`](./content-block.md) | Ассоциативный массив объектов, описывающих контентные блоки 

{% note warning %}

Массив должен содержать хотя бы один элемент и не более 20 элементов.

{% endnote %}

||
|#

## Объект `LogoDto`

Логотип записи таймлайна.

### Параметры объекта `LogoDto`

{% include [Сноска о параметрах](../../../../../../_includes/required.md) %}

#|
|| **Поле** | **Описание** ||
|| **code^*^**
[`string`](../../../../data-types.md) | Код логотипа, например `call`. Список доступных кодов можно получить с помощью метода [crm.timeline.logo.list](../../../logmessage/logo/crm-timeline-logo-list.md) ||
|| **action**
[`ActionDto`](./action.md) | Действие по нажатию на логотип ||
|#

## Пример объекта (без контентных блоков)

```json
{
    "body": {
        "logo": {
            "code": "call-incoming",
            "action": {
                "type": "redirect",
                "uri": "/crm/deal/details/123/"
            }
        },
        "blocks": {

        }
    },
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