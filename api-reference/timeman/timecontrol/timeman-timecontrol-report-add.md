# Отправить отчет о выявленном отсутствии timeman.timecontrol.report.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- отсутствуют примеры

{% endnote %}

{% endif %}

> Scope: [`timeman`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `timeman.timecontrol.report.add` для отправки отчета о выявленном отсутствии.

## Параметры

#|
|| **Параметр** | **Пример** | **Обязательный** | **Описание** ||
|| **ID**^*^
[`unknown`](../../data-types.md) | 468 | Да | Идентификатор записи. ||
|| **TYPE**^*^
[`unknown`](../../data-types.md) | work | Да | Тип отсутствия (`work` - по рабочим вопросам, `private` - личные дела). ||
|| **TEXT**^*^
[`unknown`](../../data-types.md) | 'Был на обеде' | Да | Описание причины отсутствия. ||
|| **CALENDAR**
[`unknown`](../../data-types.md) | true | Нет | Занести отсутствие в календарь (только для первичного отчета). ||
|| **USER_ID**
[`unknown`](../../data-types.md) | 2 | Нет | Идентификатор пользователя для которого сформирован отчет (поле доступно только администраторам). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Пример вызова

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod('timeman.timecontrol.report.add', {
        'id': 468,
        'type': 'private',
        'text': 'Был на обеде',
        'calendar': true
    }, function(result){
        if(result.error())
        {
            console.error(result.error().ex);
        }
        else
        {
            console.log(result.data());
        }
    });
    ```

- PHP

    ```php
    $result = restCommand('timeman.timecontrol.report.add', Array(
        'ID' => 468,
        'TYPE' => 'private',
        'TEXT' => 'Был на обеде',
        'CALENDAR' => true
    ), $_REQUEST["auth"]);    
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK
```json
{    
    "result": true
}
```

## Ответ в случае ошибки

> 200 Error, 50x Error
```json
{
    "error": "TEXT_EMPTY",
    "error_description": "Text can't be empty"
}
```

### Описание ключей

- Ключ **error** - код возникшей ошибки.
- Ключ **error_description** - краткое описание возникшей ошибки.

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| **TEXT_EMPTY** | Не передана причина отсутствия. ||
|| **ACCESS_ERROR** | У вас нет доступа к этому отчету. ||
|#