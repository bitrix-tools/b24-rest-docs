# Получить информацию о ревизиях API

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Название метода: **imopenlines.revision.get**
>
> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает информацию о ревизиях API Открытых линий.

Без параметров.

## Примеры

{% list tabs %}

- cURL

    // пример для cURL

- JS

    ```js
    BX24.callMethod(
        'imopenlines.revision.get',
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

    {% include [Пояснение о restCommand](../../chat-bots/_includes/rest-command.md) %}

    ```php
    $result = restCommand(
        'imopenlines.revision.get',
        Array(),
        $_REQUEST["auth"]
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

```json
{    
    "result": {
        "rest": 2,
        "web": 1,
        "mobile": 1,
    }
}
```

**Описание ключей**:

- `rest` – ревизия api для rest клиентов
- `web` – ревизия api для веб/десктоп клиента
- `mobile` – ревизия api для мобильного клиента