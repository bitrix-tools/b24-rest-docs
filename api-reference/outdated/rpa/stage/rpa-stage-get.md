# Получить информацию о стадии rpa.stage.get

> Scope: [`rpa`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает информацию о стадии по `id`.

## Параметры стадии

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id*** 
[`number`](../../../data-types.md) | Идентификатор стадии ||
|#

## Обработка ответа

HTTP-статус: **200**

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

### Возвращаемые данные

#|
|| **Название** | **Описание** ||
|| **name** | Название стадии ||
|| **code** | Символьный код. Можно использовать как внешний идентификатор ||
|| **color** | HEX-код цвета стадии, 6 символов ||
|| **sort** | Индекс сортировки ||
|| **semantic** | Код семантики стадии. Может быть либо `SUCCESS`, либо `FAIL` ||
|| **typeId** | Идентификатор процесса ||
|| **isFirst** | Вычисляемое поле. Возвращает `true`, если это первая стадия процесса ||
|| **isSuccess** | Вычисляемое поле. Возвращает `true`, если эта стадия является успешной ||
|| **isFail** | Вычисляемое поле. Возвращает `true`, если эта стадия является провальной ||
|| **tasks** | Массив заданий стадии. Каждая запись имеет следующую структуру:
- `title` — заголовок задания
- `robotType` — тип задания. Может принимать одно из значений:
  - `RpaApproveActivity` — утвердить или отклонить
  - `RpaMoveActivity` — просто передвинуть
  - `RpaRequestActivity` — запрос информации
  - `RpaReviewActivity` — ознакомиться с информацией
- `robotName` — имя активити
- `users` — массив участников задания для отрисовки в канбане на стадии ||
|| **robotsCount** | вычисляемое поле. Количество роботов на стадии ||
|| **possibleNextStages** | массив идентификаторов стадий, в которые можно перенести элемент. Не используется ||
|| **permissions** | набор разрешений для канбана:
- `droppable` — в эту стадию могут быть перемещены элементы
- `canMoveFrom` — из этой стадии могут быть перемещены элементы ||
|#

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./rpa-stage-add.md)
- [{#T}](./rpa-stage-update.md)
- [{#T}](./rpa-stage-list-for-type.md)
- [{#T}](./rpa-stage-delete.md)