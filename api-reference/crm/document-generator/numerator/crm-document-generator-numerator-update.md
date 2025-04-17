# Изменить существующий нумератор crm.documentgenerator.numerator.update

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

Метод `crm.documentgenerator.numerator.update` обновляет существующий нумератор с новыми значениями.

Обновить можно только те нумераторы, которые были созданы через [crm.documentgenerator.numerator.add()](./crm-document-generator-numerator-add.md). 

#|
|| **Параметр** | **Описание** ||
|| **id** | ID нумератора. ||
|| **fields** | Массив, аналогичный [crm.documentgenerator.numerator.add()](./crm-document-generator-numerator-add.md), только все поля необязательны. ||
|#

## Ответ в случае успеха

Возвращает результат, идентичный [crm.documentgenerator.numerator.get()](./crm-document-generator-numerator-get.md).