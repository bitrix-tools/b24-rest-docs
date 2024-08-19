# Получение блока по идентификатору

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "landing.block.getbyid" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.block.getbyid` получает блок по его идентификатору. Возвращает блок или ошибку.

## Параметры

#|
|| **Метод** | **Описание** | **С версии** ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока | ||
|| **params**
[`unknown`](../../../data-types.md) | Параметры: **edit_mode** - Режим редактирования (1) или нет (0 - по умолчанию), вернется разный набор блоков. | ||
|#

## Примеры

```js
BX24.callMethod(
    'landing.block.getbyid',
    {
        block: 6102,
        params: {
            edit_mode: 0
        }
    },
    function(result)
    {
        if(result.error())
        {
            console.error(result.error());
        }
        else
        {
            console.info(result.data());
        }
    }
);
```

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

