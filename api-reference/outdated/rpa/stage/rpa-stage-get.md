# Получение информации о стадии по её ID

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- отсутствуют примеры
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

{% note info "rpa.stage.get" %}

**Scope**: [`rpa`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `rpa.stage.get` отдаёт информацию о стадии по её ID.

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **id**^*^ 
[`number`](../../../data-types.md) | ID стадии. ||
|#

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

## Ответ в случае успеха

> 200 OK

```json
{
    "id": 1,
    "name": "Запуск",
    "code": "",
    "color": "22B9FF",
    "sort": 1000,
    "semantic": null,
    "typeId": 1,
    "isFirst": true,
    "isSuccess": false,
    "isFail": false,
    "tasks": [
        {
            "title": "Задание",
            "robotType": "RpaApproveActivity",
            "robotName": "A43555_78925_98855_46118",
            "canAppendResponsibles": true,
            "users": [
                {
                    "id": "U1",
                    "entityId": 1,
                    "name": "Anton",
                    "photoSrc": "",
                    "url": "\/company\/personal\/user\/1\/",
                    "entityType": "users"
                },
                {
                    "id": "U4",
                    "entityId": 4,
                    "name": "Piter",
                    "photoSrc": "",
                    "url": "\/company\/personal\/user\/4\/",
                    "entityType": "users"
                }
            ]
        }
    ],
    "robotsCount": 0,
    "possibleNextStages": [1,2,3,4,5],
    "permissions": {
        "droppable": true,
        "canMoveFrom": true
    }
}
```

- `name` - название стадии
- `code` - символьный код. Можно использовать как внешний идентификатор
- `color` - HEX-код цвета стадии, 6 символов
- `sort` - индекс сортировки
- `semantic` - код семантики стадии. Может быть либо `SUCCESS`, либо `FAIL`
- `typeId` - идентификатор процесса
- `isFirst` - вычисляемое поле. `true`, если это первая стадия процесса
- `isSuccess` - вычисляемое поле. `true`, если эта стадия является успешной
- `isFail` - вычисляемое поле. `true`, если эта стадия является провальной
- `tasks` - массив заданий стадии. Каждая запись состоит имеет следующую структуру:
- `title` - заголовок задания
- `robotType` - тип задания. Может принимать одно из значений:
    - `RpaApproveActivity` - утвердить или отклонить
    - `RpaMoveActivity` - просто передвинуть
    - `RpaRequestActivity` - запрос информации
    - `RpaReviewActivity` - ознакомиться с информацией
- `robotName` - имя активити
- `users` - массив участников задания (для отрисовки в канбане на стадии)
- `robotsCount` - вычисляемое поле. Количество роботов на стадии
- `possibleNextStages` - массив идентификаторов стадий, в которые можно перенести элемент. Не используется
- `permissions` - набор разрешений (для канбана).
- `droppable` - в эту стадию могут быть перемещены элементы
- `canMoveFrom` - из этой стадии могут быть перемещены элементы