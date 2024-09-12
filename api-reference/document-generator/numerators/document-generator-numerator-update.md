# Изменить нумератор documentgenerator.numerator.update

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `documentgenerator.numerator.update` обновляет существующий нумератор с новыми значениями.

{% note warning %}

Обновить можно только те нумераторы, которые были созданы через [documentgenerator.numerator.add()](./index.md).

{% endnote %}

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | ID нумератора. ||
|| **fields** | Массив, аналогичный [documentgenerator.numerator.add()](./index.md), только все поля необязательны. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Ответ в случае успеха

Возвращает результат, идентичный [documentgenerator.numerator.get()](./document-generator-numerator-get.md).