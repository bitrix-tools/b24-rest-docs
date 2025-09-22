# Как изменить время запланированного дела

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

Туториал убран из меню. Надо переделывать, crm.activity.update не актуален

{% endnote %}

{% endif %}

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Пример изменения времени запланированного дела на завтра с началом в то же время и завершением позднее на 2 часа.

{% list tabs %}

- JS

    ```javascript
    let activityID = 42;
    let timeStart = Math.floor(Date.now() / 1000) + 86400; // tomorrow
    let timeEnd = timeStart + 7200; // tomorrow plus 2 hours

    BX24.callMethod(
        "crm.activity.update",
        {
            id: activityID,
            fields: {
                "START_TIME": new Date(timeStart * 1000).toISOString().slice(0, 19).replace('T', ' '),
                "END_TIME": new Date(timeEnd * 1000).toISOString().slice(0, 19).replace('T', ' ')
            }
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

    Для использования примеров на PHP настройте работу класса *CRest* и подключите файл **crest.php** в файлах, где используется этот класс. [Подробнее](../../../first-steps/how-to-use-examples.md)

    {% endnote %}

    ```php
    <?php
    $activityID = 42;
    $timeStart = time() + 86400; //tomorrow
    $timeEnd = time() + 86400 + 7200; //tomorrow plus 2 hours
    CRest::call(
        'crm.activity.update',
        [
            'id' => $activityID,
            'fields' => [
                "START_TIME" => date("Y-m-d H:i:s", $timeStart),
                "END_TIME" => date("Y-m-d H:i:s", $timeEnd),
            ]
        ]
    );
    ?>
    ```

{% endlist %}
