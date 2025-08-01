# Активировать коннектор imconnector.activate

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- в структуре не было этих файлов, а на них ссылки из Примечания: imconnector.connector.data.set и cases/example_connector_chat
  
{% endnote %}

{% endif %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод устанавливает, активировать или деактивировать канал конкретной ОЛ.

{% note info "Примечание" %}

Если нужно чтобы коннектор отображался в общем списке коннекторов в виджете на сайте, нужно использовать метод [imconnector.connector.data.set](./imconnector-connector-data-set.md). [Пример использования](../../../tutorials/openlines/example-connector.md).

{% endnote %}

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **CONNECTOR**
[`unknown`](../../data-types.md) | ID коннектора (который был указан при регистрации обработчика). | ||
|| **LINE**
[`unknown`](../../data-types.md) | ID открытой линии. | ||
|| **ACTIVE**
[`unknown`](../../data-types.md) | 1 или 0. Активировать или деактивировать. | ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Продолжите изучение 

- [{#T}](../../../tutorials/openlines/example-connector.md)