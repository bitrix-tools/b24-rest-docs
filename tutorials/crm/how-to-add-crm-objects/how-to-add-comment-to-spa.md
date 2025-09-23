# Как добавить комментарий в таймлайн смарт-процесса

> Scope: [`crm`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с правом на изменение элемента CRM

Ключевой параметр для добавления комментария в элемент CRM — [идентификатор типа объекта](../../../api-reference/crm/data-types.md#object_type). Идентификатор показывает, в какой тип объекта комментарий будет добавлен: в сделку, в лид, в определенный смарт-процесс.
Идентификатор используется в параметрах `OWNER_TYPE`,  `OWNER_TYPE_ID` и `ENTITY_TYPE`, `ENTITY_TYPE_ID`  групп методов [crm.item.*](../../../api-reference/crm/universal/index.md), [crm.timeline.*](../../../api-reference/crm/timeline/index.md), [crm.activity.*](../../../api-reference/crm/timeline/activities/index.md). 

В CRM есть два типа идентификаторов объектов:  
* **Предустановленные** — это идентификаторы [лидов](../../../api-reference/crm/leads/index.md), [сделок](../../../api-reference/crm/deals/index.md), [компаний](../../../api-reference/crm/companies/index.md), [контактов](../../../api-reference/crm/contacts/index.md), [счетов](../../../api-reference/crm/universal/invoice.md), [предложений](../../../api-reference/crm/quote/index.md). Идентификаторы предустановленных объектов есть в [документации](../../../api-reference/crm/data-types.md#object_type)
* **Динамические** — это идентификаторы смарт-процессов. Идентификатор смарт-процесса генерируется в момент создания, он не зависит от названия смарт-процесса

Получить идентификатор смарт-процесса можно двумя методами:
* [crm.enum.ownertype](../../../api-reference/crm/auxiliary/enum/crm-enum-owner-type.md) — метод без параметров, возвращает перечисление типов объектов CRM, как предустановленных, так и динамических
* [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) — метод с фильтром, возвращает только динамические объекты CRM

Для создания комментария в элементе смарт-процесса последовательно выполним два метода: 
1.	[crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) — получаем смарт-процесс по фильтру
2.	[crm.timeline.comment.add](../../../api-reference/crm/timeline/comments/crm-timeline-comment-add.md) — создаем комментарий

## 1. Получаем идентификатор типа смарт-процесса

Для получения идентификатора типа используем метод [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md) с фильтром:
* `title`  —   укажем название смарт-процесса

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- JS
  
    ```javascript
    BX24.callMethod(
        'crm.type.list',
        {
            filter: {
                "title": "Закупка оборудования"
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.type.list',
        [
            'filter' => [
                'title' => 'Закупка оборудования'
            ]
        ]
    );
    ```

{% endlist %}

В результате получили два значения ID:
* `id`: `7` — порядковый номер смарт-процесса в Битрикс
* `entityTypeId`: `177` — идентификатор типа смарт-процесса. Параметр, необходимый для следующего запроса
  
```json
{
    "result": {
        "types": [
            {
                "id": 7,
                "title": "Закупка оборудования",
                "code": "",
                "createdBy": 1,
                "entityTypeId": 177,
                "customSectionId": null,
                "isCategoriesEnabled": "Y",
                "isStagesEnabled": "Y",
                "isBeginCloseDatesEnabled": "Y",
                "isClientEnabled": "Y",
                "isUseInUserfieldEnabled": "Y",
                "isLinkWithProductsEnabled": "Y",
                "isMycompanyEnabled": "Y",
                "isDocumentsEnabled": "Y",
                "isSourceEnabled": "Y",
                "isObserversEnabled": "Y",
                "isRecyclebinEnabled": "Y",
                "isAutomationEnabled": "Y",
                "isBizProcEnabled": "Y",
                "isSetOpenPermissions": "Y",
                "isPaymentsEnabled": "N",
                "isCountersEnabled": "N",
                "createdTime": "2021-11-26T10:52:17+03:00",
                "updatedTime": "2024-11-12T15:32:39+03:00",
                "updatedBy": 1
            }
        ]
    }
}
```
## 2.  Добавляем комментарий к элементу смарт-процесса

Для добавления комментария используем метод [crm.timeline.comment.add](../../../api-reference/crm/timeline/comments/crm-timeline-comment-add.md) с параметрами:
* `ENTITY_ID`  —   ID элемента. Для получения значения ID используйте метод [crm.item.list](../../../api-reference/crm/universal/crm-item-list.md), где `entityTypeId` фильтра равно значению `entityTypeId` из [crm.type.list](../../../api-reference/crm/universal/user-defined-object-types/crm-type-list.md)
* `ENTITY_TYPE`  — укажем `DYNAMIC_177`. Значение состоит из `entityTypeId`  из результата предыдущего метода и префикса динамического объекта `DYNAMIC_`
* `COMMENT` — текстовое значение комментария

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod(
        "crm.timeline.comment.add",
        {
            fields:
            {
                "ENTITY_ID": 19,
                "ENTITY_TYPE": "DYNAMIC_177",
                "COMMENT": "Подтвердить закупку по почте!",
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.timeline.comment.add',
        [
            'fields' => [
                'ENTITY_ID' => 19,
                'ENTITY_TYPE' => 'DYNAMIC_177',
                'COMMENT' => 'Подтвердить закупку по почте!',
            ]
        ]
    );
    ```

{% endlist %}

Мы добавили комментарий в таймлайн элемента смарт-процесса и в ответ получили ID записи таймлайна `55771`. ID записи можно использовать в методах [обновления](../../../api-reference/crm/timeline/comments/crm-timeline-comment-update.md) и [удаления](../../../api-reference/crm/timeline/comments/crm-timeline-comment-delete.md) комментария.

```json
{
    "result": 55771
}
```

## Пример кода

{% list tabs %}

- JS

    ```javascript
    // Функция для поиска идентификатора смарт-процесса
    function findSPA() {
        // Название смарт-процесса, для получения entityTypeId
        var SPAtitle = 'название_вашего_смарт_процесса';

        // Вызываем метод crm.type.list для получения entityTypeId
        BX24.callMethod(
            'crm.type.list',
            {
                filter: {
                    title: SPAtitle
                }
            },
            function(result) {
                if (result.error()) {
                    console.error('Ошибка при поиске смарт-процесса:', result.error());
                } else {
                    var types = result.data().types;
                    if (Array.isArray(types) && types.length > 0) {
                        var SPAId = types[0].entityTypeId; // Предполагаем, что нужный объект первый в массиве
                        console.log('Смарт-процесс найден', SPAId);
                        createComment(SPAId);
                    } else {
                        console.error('Смарт-процесс не найден или данные пусты');
                    }
                }
            }
        );
    }

    // Функция для создания комментария в элементе смарт-процесса
    function createComment(SPAId) {
        // ID элемента, в который будет добавлен комментарий
        var elementId = 'ваш_ID_элемента';
        // Текст комментария
        var commentText = 'ваш_комментарий';

        // Вызываем метод crm.timeline.comment.add для добавления комментария
        BX24.callMethod(
            "crm.timeline.comment.add",
            {
                fields: {
                    ENTITY_ID: elementId,
                    ENTITY_TYPE: 'DYNAMIC_' + SPAId,
                    COMMENT: commentText
                }
            },
            function(result) {
                if (result.error()) {
                    console.error('Ошибка при создании комментария:', result.error());
                } else {
                    console.log('Комментарий добавлен', result.data());
                }
            }
        );
    }

    // Вызов функции для поиска смарт-процесса и добавления комментария
    findSPA();
    ```


- PHP

    ```php
    require_once('crest.php');

    // Функция для поиска идентификатора смарт-процесса
    function findSPA() {
        // Название смарт-процесса, для получения entityTypeId
        $SPAtitle = 'название_вашего_смарт_процесса';

        // Вызываем метод crm.type.list для получения entityTypeId
        $result = CRest::call(
            'crm.type.list',
            [
                'filter' => [
                    'title' => $SPAtitle
                ]
            ]
        );

        if (isset($result['error'])) {
            echo 'Ошибка при поиске смарт-процесса: ' . $result['error'];
        } else {
            $types = $result['result']['types'];
            if (is_array($types) && count($types) > 0) {
                $SPAId = $types[0]['entityTypeId']; // Предполагаем, что нужный объект первый в массиве
                echo 'Смарт-процесс найден: ' . $SPAId;
                createComment($SPAId);
            } else {
                echo 'Смарт-процесс не найден или данные пусты';
            }
        }
    }

    // Функция для создания комментария в элементе смарт-процесса
    function createComment($SPAId) {
        // ID элемента, в который будет добавлен комментарий
        $elementId = 'ваш_ID_элемента';
        // Текст комментария
        $commentText = 'ваш_комментарий';

        // Вызываем метод crm.timeline.comment.add для добавления комментария
        $result = CRest::call(
            'crm.timeline.comment.add',
            [
                'fields' => [
                    'ENTITY_ID' => $elementId,
                    'ENTITY_TYPE' => 'DYNAMIC_' . $SPAId,
                    'COMMENT' => $commentText
                ]
            ]
        );

        if (isset($result['error'])) {
            echo 'Ошибка при создании комментария: ' . $result['error'];
        } else {
            echo 'Комментарий добавлен';
        }
    }

    // Вызов функции для поиска смарт-процесса и добавления комментария
    findSPA();
    ```

{% endlist %}
