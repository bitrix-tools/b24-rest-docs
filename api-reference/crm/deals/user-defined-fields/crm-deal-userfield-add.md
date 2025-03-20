# Создать новое пользовательское поле для сделок crm.deal.userfield.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (на других языках)
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- нужны правки текста под общий формат
- не прописана ссылка на ещё не созданную страницу

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.deal.userfield.add` создаёт новое пользовательское поле для сделок.

Системное ограничение на название поля – 20 знаков. К названию пользовательского поля всегда добавляется префикс UF_CRM_, то есть реальная длина названия – 13 знаков.

Возвращает ID, который потом можно идентифицировать методом [crm.deal.userfield.list](./crm-deal-userfield-list.md).

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields** | Набор [полей](*fields) – массив вида `array("поле"=>"значение"[, ...])`, содержащий описание пользовательского поля. В том числе содержит поле `LIST`, которое содержит набор значений списка для пользовательских полей типа Список. Указывается при создании/обновлении поля. Каждое значение представляет собой массив с полями:
- **VALUE** - значение элемента списка. Поле является обязательным в случае, когда создается новый элемент.
- **SORT** - сортировка.
- **DEF** - если равно `Y`, то элемент списка является значением по-умолчанию. Для множественного поля допустимо несколько `DEF=Y`. Для не множественного, дефолтным будет считаться первое.
- **XML_ID** - внешний код значения. Параметр учитывается только при обновлении уже существующих значений элемента списка.
- **ID** - идентификатор значения. Если он указан, то считается что это обновление существующего значения элемента списка, а не создание нового. Имеет смысл только при вызове методов `*.userfield.update`.
- **DEL** - если равно `Y`, то существующий элемент списка будет удален. Применяется, если заполнен параметр ID. ||
|#

Полное описание полей можно получить вызовом метода [crm.userfield.fields](../../universal/user-defined-fields/crm-userfield-fields.md).

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        "crm.deal.userfield.add",
        {
            fields:
            {
                "FIELD_NAME": "MY_STRING",
                "EDIT_FORM_LABEL": "Моя строка",
                "LIST_COLUMN_LABEL": "Моя строка",
                "USER_TYPE_ID": "string",
                "XML_ID": "MY_STRING",
                "SETTINGS": { "DEFAULT_VALUE": "Привет, мир!" }
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.deal.userfield.add",
        {
            fields:
            {
                "FIELD_NAME": "MY_LIST",
                "EDIT_FORM_LABEL": "Мой список",
                "LIST_COLUMN_LABEL": "Мой список",
                "USER_TYPE_ID": "enumeration",
                "LIST": [ { "VALUE": "Элемент #1" },
                    { "VALUE": "Элемент #2" },
                    { "VALUE": "Элемент #3" },
                    { "VALUE": "Элемент #4" },
                    { "VALUE": "Элемент #5" } ],
                "XML_ID": "MY_LIST",
                "SETTINGS": { "LIST_HEIGHT": 3 }
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP (B24PhpSdk)

    ```php
    try {
        $userfieldItemFields = [
            'FIELD_NAME' => 'Test Field',
            'USER_TYPE_ID' => 'string',
            'XML_ID' => 'test_field_1',
            'SORT' => '100',
            'MULTIPLE' => 'N',
            'MANDATORY' => 'N',
            'SHOW_FILTER' => 'Y',
            'SHOW_IN_LIST' => 'Y',
            'EDIT_IN_LIST' => 'Y',
            'IS_SEARCHABLE' => 'Y',
            'EDIT_FORM_LABEL' => 'Test Field Label',
            'LIST_COLUMN_LABEL' => 'Test Field List Label',
            'LIST_FILTER_LABEL' => 'Test Field Filter Label',
            'ERROR_MESSAGE' => 'Error occurred',
            'HELP_MESSAGE' => 'Help message for Test Field',
            'LIST' => '',
            'SETTINGS' => '',
        ];

        $result = $serviceBuilder
            ->getCRMScope()
            ->dealUserfield()
            ->add($userfieldItemFields);

        print($result->getId());
    } catch (Throwable $e) {
        print('Error: ' . $e->getMessage());
    }
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

[*fields]: На данный момент:
- ENTITY_ID
- USER_TYPE_ID
- FIELD_NAME
- LIST_FILTER_LABEL
- LIST_COLUMN_LABEL
- EDIT_FORM_LABEL
- ERROR_MESSAGE
- HELP_MESSAGE
- MULTIPLE
- MANDATORY
- SHOW_FILTER
- SETTINGS
- LIST