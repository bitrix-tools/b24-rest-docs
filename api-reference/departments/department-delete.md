# Удаление подразделения

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

{% note info "department.delete" %}

{% include notitle [Скоуп department admin](./_include/scope-department-admin.md) %}

{% endnote %}

Удаляет указанное подразделение

#|
|| **Параметр** | **Описание** ||
|| **ID^*^** | идентификатор подразделения ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Вызов

```js
BX24.callMethod('department.delete', {"ID": 222});
```

## Запрос

```
https://my.bitrix24.ru/rest/department.delete.json?ID=222&auth=70a32986f1bf204dec4567147ca6a2af
```

## Ответ

> 200 OK

```json
{"result":true}
```