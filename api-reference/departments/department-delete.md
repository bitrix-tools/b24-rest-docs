# Удалить подразделение department.delete

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указан тип параметра
- отсутствует ответ в случае ошибки
- нет примеров
  
{% endnote %}

{% endif %}

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение структуры

Удаляет указанное подразделение

#|
|| **Параметр** | **Описание** ||
|| **ID^*^** | идентификатор подразделения ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Примеры кода

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'department.delete',
        {
            "ID": 222
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

## Запрос

```
https://my.bitrix24.ru/rest/department.delete.json?ID=222&auth=70a32986f1bf204dec4567147ca6a2af
```

## Ответ

> 200 OK

```json
{"result":true}
```