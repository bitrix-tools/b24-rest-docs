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

```javascript
BX24.callMethod('placement.bind', {
    PLACEMENT:'CALENDAR_GRIDVIEW',
    HANDLER: 'http://svd.org/svdapp.php',
    TITLE: 'Custom tab'
}, (result) => {console.log(result)});
```

Если в самом приложении вызвать:

```php
echo "<pre>";
print_r($_REQUEST);
echo "</pre>";
```

то увидим, что туда приходят определенные параметры. В частности:

```php
[PLACEMENT_OPTIONS] => {
    "viewRangeFrom":"2018-09-30",
    "viewRangeTo":"2018-11-04"
}
```

Также при работе во встройке есть определенный интерфейс: методы и события.

## Методы (js методы)

- **getEvents** – получение событий.

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
  
- **viewEvent** – просмотр события (открытие карточки просмотра).

```javascript
BX24.placement.call('viewEvent',
	{
		id: "1431170", - id события
		dateFrom: "11.07.2018" - дата события (не обязательно, но важно для регулярных)
	},
	function(){}
);
```

- **addEvent** – добавление нового события (открытие карточки).

```javascript
BX24.placement.call('addEvent', function(){});
```

- **editEvent** – редактирование события (открытие карточки).

```javascript
BX24.placement.call('editEvent', {uid: "1431171|19.07.2018"}, function(){});
```

- **deleteEvent** – удаление события.

```javascript
BX24.placement.call('deleteEvent',
	{
		id: "1431169"
	},
	function(){}
);
```

## События, которые можно отслеживать в плейсменте

#|
|| **Событие** | **Описание** ||
|| Calendar.customView:refreshEntries | Обновление событий. ||
|| Calendar.customView:decreaseViewRangeDate | Нажимаем на стрелочку назад, т.е. отматываем календарь на предыдущие даты. ||
|| Calendar.customView:increaseViewRangeDate | Нажимаем на стрелочку вперед, т.е. отматываем календарь на следующие даты. ||
|| Calendar.customView:adjustToDate | Переход к конкретной дате. ||
|#

## Смотри также

- [Встраивание приложений (REST)](https://dev.1c-bitrix.ru/rest_help/application_embedding/index.php).
- [Встраивание приложений](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=99&LESSON_ID=7114) в курсе Маркетплейс Битрикс24.
- [Встраивание приложений в виде пользовательских типов полей](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=99&LESSON_ID=8633) в учебном курсе.
- [Добавление своих методов REST API](https://dev.1c-bitrix.ru/learning/course/index.php?COURSE_ID=43&LESSON_ID=7985) в учебном курсе.