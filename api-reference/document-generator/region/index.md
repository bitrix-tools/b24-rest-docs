# Зачем нужны страны в генераторе документов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужна пояснительная статья

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.region.get](./document-generator-region-get.md) | Возвращает информацию о регионе по его идентификатору. ||
|| [documentgenerator.region.list](./document-generator-region-list.md) | Возвращает список регионов, как установленных по умолчанию, так и пользовательских. ||
|| [documentgenerator.region.delete](./document-generator-region-delete.md) | Удаляет регион. ||
|| [documentgenerator.region.add](./document-generator-region-add.md) | Добавляет новый регион. ||
|| [documentgenerator.region.update](./document-generator-region-update.md) | Метод обновляет существующую страну. ||
|#
