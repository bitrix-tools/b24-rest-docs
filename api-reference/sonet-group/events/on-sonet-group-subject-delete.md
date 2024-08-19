# Вызывается перед удалением темы рабочей группы

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

{% note info "onSonetGroupSubjectDelete" %}

{% include notitle [Скоуп sonet все](../_includes/scope-sonet-all.md) %}

{% endnote %}

Событие `onSonetGroupSubjectDelete` вызывается перед удалением темы рабочей группы. Прокси к событию [OnSocNetGroupSubjectDelete](https://dev.1c-bitrix.ru/api_help/socialnetwork/events/OnSocNetGroupSubjectDelete.php).

#|
|| **Поле** | **Описание** ||
|| **ID** | Идентификатор сущности, по которой сработало событие. ||
|#
{% include [Сноска о параметрах](../../_includes/required.md) %}