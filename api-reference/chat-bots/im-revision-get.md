# Получить информацию о ревизиях API

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "im.revision.get" %}

**Scope**: [`im`](../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `im.revision.get` получает информацию о ревизиях API.

## Примеры

{% list tabs %}

- cURL

    // пример для cURL

- JS

    ```javascript
    BX24.callMethod(
        'im.revision.get',
        {},
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
    
    {% include [Пояснение о restCommand](./_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'im.revision.get',
        Array(

        ),
        $_REQUEST[
            "auth"
        ]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{    
    "result": {
        "rest": 18,
        "web": 117,
        "mobile": 9,
    }
}
```

### Описание ключей

- `rest` – ревизия API для REST клиентов.
- `web` – ревизия API для веб/десктоп клиента.
- `mobile` – ревизия API для мобильного клиента.