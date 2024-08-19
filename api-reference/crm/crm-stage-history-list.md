# Получить историю движения по стадиям

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Название метода: **crm.stagehistory.list**
>
> Scope: [`crm`](../scopes/permissions.md)
>
> Кто может выполнять метод: `любой пользователь`

Метод поддерживает извлечение записей из истории движения по стадиям для лидов, сделок и счетов.

## Параметры метода

#|
|| **Название** | **Описание** ||
|| **entityTypeId** | Идентификатор типа объекта. Может принимать значения:
- `1` — лид
- `2` — сделка
- `5` — счет
||
|| **order** | Список для сортировки, где ключ — поле, а значение — `ASC` или `DESC` ||
|| **filter** | Список для фильтрации. Фильтр поддерживает использование точных значений, массивов значений, а также модификаторы:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `=` — равно, точное совпадение
- `!=` — не равно
||
|| **start** | Сдвиг для постраничной навигации. Логика работы с постраничной навигацией стандартная для списочных методов REST ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Получение истории движения по стадиям для сделки с `ID=1`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"order":{"ID":"ASC"},"filter":{"OWNER_ID":1},"select":["ID","STAGE_ID","CREATED_TIME"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.stagehistory.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"entityTypeId":2,"order":{"ID":"ASC"},"filter":{"OWNER_ID":1},"select":["ID","STAGE_ID","CREATED_TIME"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.stagehistory.list
    ```

- JS

    ```js
    BX24.callMethod(
        "crm.stagehistory.list",
        {
            entityTypeId: 2,
            order: { "ID": "ASC" },
            filter: { "OWNER_ID": 1 },
            select: [ "ID", "STAGE_ID", "CREATED_TIME" ]
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
            {
                console.dir(result.data());
                if(result.more())
                    result.next();
            }
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.stagehistory.list',
        [
            'entityTypeId' => 2,
            'order' => ['ID' => 'ASC'],
            'filter' => ['OWNER_ID' => 1],
            'select' => ['ID', 'STAGE_ID', 'CREATED_TIME']
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

Метод вернет массив записей из истории:

```
{
    "items": []
}
```

### Возвращаемые данные

Каждый элемент массива — массив с ключами:

- `ID` — идентификатор записи
- `TYPE_ID` — тип записи. Может принимать значения: 
  - `1` — создание объекта 
  - `2` — перевод на промежуточную стадию 
  - `3` — перевод на финальную стадию
- `OWNER_ID` — идентификатор объекта, в котором изменилась стадия
- `CREATED_TIME` — дата и время попадания на стадию

Помимо этого, имеются специфичные для разных типов объектов поля:

- для лидов и счетов это:
  - `STATUS_SEMANTIC_ID` — семантика статуса (стадии):
     - `P` — промежуточная стадия
     - `S` — успешная стадия
     - `F` — провальная стадия
  - `STATUS_ID` — идентификатор статуса (стадии)
- для сделок это:
  - `CATEGORY_ID` — идентификатор направления (воронки)
  - `STAGE_SEMANTIC_ID` — семантика статуса (стадии):
     - `P` — промежуточная стадия
     - `S` — успешная стадия
     - `F` — провальная стадия
  - `STAGE_ID` — идентификатор стадии