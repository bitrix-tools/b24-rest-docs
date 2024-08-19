# На добавление новой рабочей группы

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

{% note info "onSonetGroupAdd" %}

{% include notitle [Скоуп sonet все](../_includes/scope-sonet-all.md) %}

{% endnote %}

Событие `onSonetGroupAdd` вызывается после добавления новой рабочей группы. Прокси к событию [OnSocNetGroupAdd](https://dev.1c-bitrix.ru/api_help/socialnetwork/events/OnSocNetGroupAdd.php).

#|
|| **Поле** | **Описание** ||
|| **ID** | Идентификатор сущности, по которой сработало событие. ||
|#
{% include [Сноска о параметрах](../../_includes/required.md) %}