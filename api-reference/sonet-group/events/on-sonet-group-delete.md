# Вызывается в момент удаления рабочей группы

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- какие данные передаются в событие
- отсутствуют параметры, типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

{% note info "onSonetGroupDelete" %}

{% include notitle [Скоуп sonet все](../_includes/scope-sonet-all.md) %}

{% endnote %}

Событие `onSonetGroupDelete` вызывается в момент удаления рабочей группы. Прокси к событию [OnSocNetGroupDelete](https://dev.1c-bitrix.ru/api_help/socialnetwork/events/OnSocNetGroupDelete.php).


#|
|| **Поле** | **Описание** ||
|| **ID** | Идентификатор сущности, по которой сработало событие. ||
|#
{% include [Сноска о параметрах](../../_includes/required.md) %}