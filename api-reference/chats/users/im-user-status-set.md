# Установить статус пользователя

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "im.user.status.set" %}

**Scope**: [`im`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `im.user.status.set` устанавливает статус пользователя.

#|
|| **Параметр** | **Пример** | **Описание** | **Ревизия** ||
|| **STATUS^*^**
[`unknown`](../../data-types.md) | `online` | Новый статус пользователя | 18 ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

Доступны следующие статусы:

- `online` – Онлайн
- `dnd` – Не беспокоить
- `away` – Отсутствую

## Примеры

{% list tabs %}

- cURL

    // пример для cURL

- JS

    ```javascript
    BX24.callMethod(
        'im.user.status.set',
        {
            STATUS: 'online'
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP

    {% include [Пояснение о restCommand](../_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.user.status.set',
        Array(
            'STATUS' => 'online',
        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{
    "result": true
}
```

