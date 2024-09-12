# Получить список названий полей подразделения department.fields

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствует ответ в случае ошибки
- нет примеров
- запрос и ответ в xml, если убрать, то вообще ничего не будет
  
{% endnote %}

{% endif %}

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Получение списка названий полей подразделения. Метод не имеет параметров.

## Вызов

```js
BX24.callMethod('department.fields');
```

## Запрос (xml для наглядности ответа)

```
https://my.bitrix24.ru/rest/department.fields.xml?auth=7c9d8f00ea0ddd9e02cab3eb2b3bd0d1
```

## Ответ

> 200 OK

```xml
<response>
    <result>
        <ID>ID</ID>
        <NAME>Название подразделения</NAME>
        <SORT>Порядок сортировки</SORT>
        <PARENT>Вышестоящее подразделение</PARENT>
        <UF_HEAD>Руководитель</UF_HEAD>
    </result>
</response>
```