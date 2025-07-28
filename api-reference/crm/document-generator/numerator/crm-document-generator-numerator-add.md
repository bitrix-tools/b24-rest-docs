# Добавить новый нумератор crm.documentgenerator.numerator.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- лучше добавить собственный ответ в случае успеха (не ссылкой)
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`crm.documentgenerator`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.documentgenerator.numerator.add` добавляет новый нумератор. 

#|
|| **Параметр** | **Описание** ||
|| **name** | Имя. ||
|| **template** | Шаблон. ||
|| **settings** | Настройки генераторов. ||
|#

## Ответ в случае успеха

Возвращает результат, идентичный [crm.documentgenerator.numerator.get()](./crm-document-generator-numerator-get.md).

## Продолжите изучение

- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)