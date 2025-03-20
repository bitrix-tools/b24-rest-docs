# Добавить пользовательское поле task.item.userfield.add

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- не хватает 1 примера (должно быть три примера - curl, js, php)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `task.item.userfield.add` создает новое свойство.

При создании пользовательского поля, в названии поля `FIELD_NAME` обязательно использовать префикс `UF_`. Если не указать префикс, система автоматически добавит его в начало названия.

## Параметры

#|
|| **Параметр** / **Тип**| **Описание** ||
|| **auth**
[`unknown`](../../data-types.md) | Токен авторизации. ||
|| **PARAMS**
[`unknown`](../../data-types.md) | Массив с параметрами свойства вида `array("параметр": 'значение' [, ...])`, содержащий следующие параметры: 
- `USER_TYPE_ID` - тип данных пользовательского поля. Допустимые значения: 
  - `string` — строка
  - `double` — число
  - `date` — дата
  - `boolean` — да/нет  
- `FIELD_NAME` - код поля; 
- `XML_ID` - внешний код; 
- `EDIT_FORM_LABEL` - подпись в форме форматирования (указывается на английском ('en') и русском ('ru") языках); 
- `LABEL` - заголовок поля. ||
|#

## Примеры

{% list tabs %}

- cURL

    ```bash
    $appParams = array(
        'auth' => 'q21g8vhcqmxdrbhqlbd2wh6ev1debppa',
        'PARAMS' => array(
            'USER_TYPE_ID' => 'string',
            'FIELD_NAME' => 'NEW_TASKS_FIELD',
            'XML_ID' => 'MY_TASK_FIELD',
            'EDIT_FORM_LABEL' => array(
                'en' => 'New task field',
                'ru' => 'Новое поле задач'
            ),
            'LABEL' => 'New task field'
        ),
    );
    $request = 'http://your-domain.ru/rest/task.item.userfield.add.xml?' . http_build_query($appParams);
    ```

- JS

    ```js
    BX24.callMethod(
        'task.item.userfield.add',
        {
            PARAMS:
            {
                'USER_TYPE_ID' : 'string',
                'FIELD_NAME' : 'NEW_TASKS_FIELD',
                'XML_ID' : 'MY_TASK_FIELD',
                'EDIT_FORM_LABEL' : {'en':'New task field', 'ru':'Новое поле задач'},
                'LABEL' : 'New task field'
            }
        },
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}