# Скрывание блока со страницы

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "landing.landing.hideblock" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.landing.hideblock` скрывает блок со страницы. Возвращает *true* или ошибку.

## Параметры

#|
|| **Метод** | **Описание** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы. ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока. ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.landing.hideblock',
        {
            lid: 351,
            block: 6428
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

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}