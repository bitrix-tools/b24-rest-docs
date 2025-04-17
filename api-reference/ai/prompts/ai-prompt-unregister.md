# Удалить промпт ai.prompt.unregister

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`ai_admin`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `ai.prompt.unregister` удаляет промпт.

#|
|| **Параметр** | **Описание** ||
|| **code^*^**
[`unknown`](../../data-types.md) | Уникальный код промпта. Всегда имеет префикс `rest_`. Этот код задается один раз при регистрации и затем изменить его нельзя ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры

{% list tabs %}

- cURL (Webhook)

    // пример для cURL (Webhook)

- cURL (OAuth)

    // пример для cURL (OAuth)

- JS

    ```js
    BX24.callMethod(
        'ai.prompt.unregister',
        {
            code: 'rest_joke_wolf'
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

- PHP

    // пример для php

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

## Ответ в случае ошибки

## Частые кейсы и сценарии

- [{#T}](../../../tutorials/ai/add-joke-prompt.md)