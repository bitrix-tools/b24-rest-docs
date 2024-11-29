# Получить список пользователей timeman.timecontrol.reports.users.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.timecontrol.reports.users.get` для получения списка пользователей, относящихся к указанному подразделению.

## Параметры

#|
|| **Параметр** | **Пример** | **Обязательный** | **Описание** ||
|| **DEPARTMENT_ID**
[`unknown`](../../data-types.md) | 52 | Да* | Идентификатор подразделения. ||
|#

*Параметр `DEPARTMENT_ID` необходимо указывать только, если пользователь - руководитель или администратор.

## Пример вызова

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'timeman.timecontrol.reports.users.get',
        {
            'DEPARTMENT_ID': 52
        },
        function(result){
            if(result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP

    ```php
    $result = restCommand(
        'timeman.timecontrol.reports.users.get',
        Array(
            'DEPARTMENT_ID' => 52
        ),
        $_REQUEST["auth"]
    );    
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{
    "result": [
        {
            "id":2,
            "name":"Мария Ившина",
            "first_name":"Мария",
            "last_name":"Ившина",
            "work_position":"IT-специалист",
            "avatar":"http://test.bitrix24.com/upload/resize_cache/main/072/100_100_2/42-17948709.gif",
            "last_activity_date":"2018-08-15T16:25:34+03:00"
        }
    ]
}
```

### Описание ключей

- **id** - идентификатор пользователя.
- **name** - имя и фамилия пользователя.
- **first_name** - имя пользователя.
- **last_name** - фамилия пользователя.
- **work_position** - должность.
- **avatar** - ссылка на аватар (если пусто, значит аватар не задан).
- **personal_gender** - пол пользователя.
- **last_activity_date** - дата последнего действия пользователя в формате АТОМ.