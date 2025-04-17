# Получить массив доступных голосов для синтеза речи voximplant.tts.voices.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony all](../_includes/scope-telephony-all.md) %}

Метод `voximplant.tts.voices.get` возвращает массив доступных голосов для синтеза речи в формате ID голоса => название голоса. Метод не имеет ограничений по [правам](https://helpdesk.bitrix24.ru/open/18177766/).

Входящих параметров нет.

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'voximplant.tts.voices.get',
        {},
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.info(result.data());
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}
