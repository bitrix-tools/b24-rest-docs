# Получить текущую выбранную линию в качестве исходящей линии по умолчанию voximplant.line.outgoing.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% include notitle [Скоуп telephony all](../../_includes/scope-telephony-all.md) %}

Метод `voximplant.line.outgoing.get` возвращает текущую выбранную линии в качестве исходящей линии по умолчанию. Метод доступен обладателю [права](https://helpdesk.bitrix24.ru/open/18177766/) `Управление номерами - изменение - любые`.

Входных параметров нет.

## Пример

```js
BX24.callMethod(
    'voximplant.line.outgoing.get',
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

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

## Ответ в случае успеха

Возвращает идентификатор линии (цифровой для арендованных, regXXX - для Облачных АТС, sipXXX - для Офисных АТС).