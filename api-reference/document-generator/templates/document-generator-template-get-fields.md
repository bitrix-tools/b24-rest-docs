# Получить список полей шаблонов documentgenerator.template.getfields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `documentgenerator.template.getfields` на вход получает идентификатор шаблона и возвращает набор полей шаблона с их описанием.

#|
|| **Параметр** | **Описание** ||
|| **id**^*^ | Идентификатор шаблона. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример

Проверим, что поля шаблона распознались правильно. 

```php
$data = [
    'id' => 203,
    'providerClassName' => '\\Bitrix\\DocumentGenerator\\DataProvider\\Rest',
    'value' => 1,
];
$url = $webHookUrl.$prefix.'.template.getfields/';
```

# Ответ в случае успеха

> 200 OK

```php
[result] => Array
    (
        [templateFields] => Array
            (
                [DocumentNumber] => Array
                    (
                        [title] => Номер
                        [value] => 1
                        [group] => Array
                            (
                                [0] => Документ
                            )

                        [default] => 1
                    )
                [SomeDate] => Array
                    (
                        [value] =>
                        [default] =>
                    )
                [SomeName] => Array
                    (
                        [value] =>
                        [default] =>
                    )
                [Stamp] => Array
                    (
                        [value] =>
                        [default] =>
                    )
                [Image] => Array
                    (
                        [value] =>
                        [default] =>
                    )
                [TableItemImage] => Array
                    (
                        [value] =>
                        [default] =>
                    )
                [TableItemName] => Array
                    (
                        [value] =>
                        [default] =>
                    )
                [TableItemPrice] => Array
                    (
                        [value] =>
                        [default] =>
                    )
                [TableIndex] => Array
                    (
                        [value] =>
                        [default] =>
                    )
            )
    )
```
