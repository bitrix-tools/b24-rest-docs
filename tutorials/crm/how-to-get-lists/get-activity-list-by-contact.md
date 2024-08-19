# Как получить список дел на примере контакта

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример получает список грядущих дел контакта. Для получения дел других сущностей необходимо заменить поле `OWNER_TYPE_ID`, список возможных значений поля можно получить сделав запрос `CRest::call('crm.enum.ownertype');`.

{% note info %}

Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../how-to-use-examples.md)

{% endnote %}

{% list tabs %}

- JS

    ```js
    var contactID = 1;
    var resultActivity = [];

    BX24.callMethod(
        "crm.activity.list",
        {
            filter: {
                COMPLETED: "N", //only new activity
                OWNER_ID: contactID,
                OWNER_TYPE_ID: 3 // CRest::call('crm.enum.ownertype');
            },
            select: [
                "*",
                "COMMUNICATIONS"
            ]
        },
        function(result) {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP

    {% note info %}

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../how-to-use-examples.md)

    {% endnote %}

    ```php
    $contactID = 1;
    $resultActivity = [];
    $resultActivity = CRest::call(
        'crm.activity.list',
        [
            'filter' => [
                'COMPLETED' => 'N',//only new activity
                'OWNER_ID' => $contactID,
                'OWNER_TYPE_ID' => 3, // CRest::call('crm.enum.ownertype');
            ],
            'select' => [
                '*',
                'COMMUNICATIONS'
            ]
        ]
    );
    echo '<pre>';
        print_r($resultActivity);
    echo '</pre>';
    ```

{% endlist %}

