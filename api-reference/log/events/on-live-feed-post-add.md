# На добавление сообщения в Ленту новостей OnLiveFeedPostAdd

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- какие данные передаются в событие
- не прописаны ссылки на ещё не созданные страницы
- отсутствуют примеры

{% endnote %}

{% endif %}

{% note info "OnLiveFeedPostAdd" %}

{% include notitle [Скоуп log все](../_includes/scope-log-all.md) %}

{% endnote %}

Событие `OnLiveFeedPostAdd` вызывается после добавления нового поста в Ленту новостей. Прокси к событию [OnAfterSocNetLogAdd](.).

#|
|| **Поле** | **Описание** ||
|| **ID** | Идентификатор нового сообщения ||
|#
{% include [Сноска о параметрах](../../_includes/required.md) %}