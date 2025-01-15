# Встроиться в календарь CALENDAR_GRIDVIEW

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

Плейсмент **CALENDAR_GRIDVIEW** позволяет встроиться в календарный вид (вверху - там, где день/неделя/месяц/список).

## Пример

Как можно забиндить (привязать) приложение к календарной встройке:

{% list tabs %}

- JS

    ```javascript
    BX24.callMethod('placement.bind', {
        PLACEMENT:'CALENDAR_GRIDVIEW',
        HANDLER: 'http://svd.org/svdapp.php',
        TITLE: 'Custom tab'
    }, (result) => {console.log(result)});
    ```

{% endlist %}

Если в самом приложении вызвать:

{% list tabs %}

- PHP

    ```php
    echo "<pre>";
    print_r($_REQUEST);
    echo "</pre>";
    ```

{% endlist %}

то увидим, что туда приходят определенные параметры. В частности:

{% list tabs %}

- PHP

    ```php
    [PLACEMENT_OPTIONS] => {
        "viewRangeFrom":"2018-09-30",
        "viewRangeTo":"2018-11-04"
    }
    ```

{% endlist %}

Также при работе во встройке есть определенный интерфейс: методы и события.

## Методы (js методы)

- **getEvents** – получение событий.

{% list tabs %}

- JS

    ```javascript
    var dateFrom = new Date();
    var dateTo = new Date(dateFrom.getTime() + 86400 * 30 * 1000); // Умножаем на 1000, чтобы преобразовать секунды в миллисекунды
    dateFrom.setHours(0, 0, 0, 0);
    dateTo.setHours(0, 0, 0, 0);

    BX24.placement.call('getEvents',
        {
            dateFrom: dateFrom,
            dateTo: dateTo
        },
        function(events) {
            console.log('getEvents response:');
            console.dir(events);
        }
    );
    ```

{% endlist %}

- **viewEvent** – просмотр события (открытие карточки просмотра).

{% list tabs %}

- JS

    ```javascript
    BX24.placement.call('viewEvent',
        {
            id: "1431170", - id события
            dateFrom: "11.07.2018" - дата события (не обязательно, но важно для регулярных)
        },
        function(){}
    );
    ```

{% endlist %}

- **addEvent** – добавление нового события (открытие карточки).

{% list tabs %}

- JS

    ```javascript
    BX24.placement.call('addEvent', function(){});
    ```

{% endlist %}

- **editEvent** – редактирование события (открытие карточки).

{% list tabs %}

- JS

    ```javascript
    BX24.placement.call('editEvent', {uid: "1431171|19.07.2018"}, function(){});
    ```

{% endlist %}

- **deleteEvent** – удаление события.

{% list tabs %}

- JS

    ```javascript
    BX24.placement.call('deleteEvent',
        {
            id: "1431169"
        },
        function(){}
    );
    ```

{% endlist %}

## События, которые можно отслеживать в плейсменте

#|
|| **Событие** | **Описание** ||
|| Calendar.customView:refreshEntries | Обновление событий. ||
|| Calendar.customView:decreaseViewRangeDate | Нажимаем на стрелочку назад, т.е. отматываем календарь на предыдущие даты. ||
|| Calendar.customView:increaseViewRangeDate | Нажимаем на стрелочку вперед, т.е. отматываем календарь на следующие даты. ||
|| Calendar.customView:adjustToDate | Переход к конкретной дате. ||
|#

## Смотри также

- [{#T}](../widgets/index.md)
- [{#T}](../../local-integrations/local-apps.md)
- [{#T}](../widgets/user-field/index.md)