# Создать дела из приложений

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров

{% endnote %}

{% endif %}

Приложения могут создавать дела с провайдером специального типа. У такого дела будет соответствующая [иконка](*icon), оно будет отображаться в таймлайн и по клику на дело будет открываться приложение в слайдере с опциями в PLACEMENT_OPTIONS.

Изменять/удалять дела такого подтипа можно только в контексте приложение, которым оно создано. То есть при обновлении такого дела методом [crm.activity.update](../activity-base/crm-activity-update.md) через вебхук будет ошибка: `Access denied! Application context required`.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **PROVIDER_ID**
[`unknown`](../../../../data-types.md) | Идентификатор провайдера. Для специального типа значение должно быть равно 'REST_APP'. ||
|| **PROVIDER_TYPE_ID**
[`unknown`](../../../../data-types.md)
| Идентификатор типа дела. В случае использования провайдера 'REST_APP' разработчик может указывать произвольные идентификаторы типа в зависимости от своих задач. ||
|#

## Пример

{% list tabs %}

- PHP

    ```php
    <?php
    header('Content-Type: text/html; charset=UTF-8');
    ?>
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        <style type="text/css">

        </style>
    </head>
    <body style="display: none">
    <script src="//api.bitrix24.com/api/v1/"></script>

    <?if (isset($_POST['PLACEMENT']) && !empty($_POST['PLACEMENT_OPTIONS'])):
        $opt = json_decode($_POST['PLACEMENT_OPTIONS'], true);
    ?>
    <p>Activity ID: <?= (int)$opt['activity_id']?></p>
    <button onclick="updateActivity(<?= (int)$opt['activity_id']?>);">Update activity (set new description + completed)</button>
    <p><button onclick="deleteActivity(<?= (int)$opt['activity_id']?>);">Delete activity</button>
    <?else:?>
    <button onclick="selectCRMEntity();">Select LEAD</button>
    <span id="selected-entity"></span>
    <p>
    <button onclick="addActivity();">Add activity</button>
    <?endif;?>
    <script type="text/javascript">
        BX24.init(function()
        {
            document.body.style.display = '';
        });

        var selectedEntityId = null;

        function addActivity()
        {

            if (!selectedEntityId)
            {
                alert('Lead not selected');
                return;
            }
            BX24.callMethod(
                'crm.activity.add',
                {
                    fields:
                        {
                            "OWNER_TYPE_ID": 1,
                            "OWNER_ID": selectedEntityId,
                            "PROVIDER_ID": 'REST_APP',
                            "PROVIDER_TYPE_ID": 'LINK',
                            "SUBJECT": "Новое дело",
                            "COMPLETED": "N",
                            "RESPONSIBLE_ID": 1,
                            "DESCRIPTION": "Описание нового дела"
                        }
                },
                function(result)
                {
                    if(result.error())
                        alert("Error: " + result.error());
                    else
                    {
                        alert("Success: " + result.data());
                    }
                }
            );
        }
        function updateActivity(id)
        {
            BX24.callMethod(
                'crm.activity.update',
                {
                    id: id,
                    fields:
                        {
                            COMPLETED: 'Y',
                            SUBJECT: "Дело выполнено!",
                            DESCRIPTION: "Описание нового дела (выполнено)"
                        }
                },
                function(result)
                {
                    if(result.error())
                        alert("Error: " + result.error());
                    else
                    {
                        alert("Success: " + result.data());
                    }
                }
            );
        }

        function deleteActivity(id)
        {
            BX24.callMethod(
                'crm.activity.delete',
                {
                    id: id
                },
                function(result)
                {
                    if(result.error())
                        alert("Error: " + result.error());
                    else
                    {
                        alert("Success: " + result.data());
                    }
                }
            );
        }

        function selectCRMEntity()
        {
            document.getElementById('selected-entity').textContent = '';
            BX24.selectCRM({
                entityType: ['lead']
            }, function(selected)
            {
                if (selected['lead'] && selected['lead'][0])
                {
                    document.getElementById('selected-entity').textContent = selected['lead'][0]['title'];
                    var    id = selected['lead'][0]['id'];

                    selectedEntityId = id.substring(2);

                    console.log(selectedEntityId);
                }
            })
        }
    </script>
    </body>
    </html>
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

[*icon]: ![иконка](./_images/activity_application.png)