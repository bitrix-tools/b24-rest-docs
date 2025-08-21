# Как встроить приложение в календарь CALENDAR_GRIDVIEW

В календарь можно встроить приложение. В верхней части календаря в списке видов отображения есть место для встройки `CALENDAR_GRIDVIEW`, куда можно добавить свой пункт. 

Подробнее о виджете — в статье [Виджет в календаре](../widgets/calendar.md).

## Как привязать приложение к календарю

Исспользуйте метод [placement.bind](../widgets/placement-bind.md), чтобы связать приложение с календарем. Параметры `PLACEMENT`, `HANDLER` и `TITLE` определяют, где и как будет отображаться ваше приложение.

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'placement.bind',
    		{
    			PLACEMENT: 'CALENDAR_GRIDVIEW',
    			HANDLER: 'http://your_site/handler.php',
    			TITLE: 'Custom tab'
    		}
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bind',
                [
                    'PLACEMENT' => 'CALENDAR_GRIDVIEW',
                    'HANDLER'   => 'http://your_site/handler.php',
                    'TITLE'     => 'Custom tab',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.bind',
        {
            PLACEMENT:'CALENDAR_GRIDVIEW',
            HANDLER: 'http://your_site/handler.php',
            TITLE: 'Custom tab'
        },
        (result) => {console.log(result)}
    );
    ```

{% endlist %}

Если в приложении вывести все параметры, которые передаются в запросе к приложению:

{% list tabs %}

- PHP CRest

    ```php
    echo "<pre>";
    print_r($_REQUEST);
    echo "</pre>";
    ```

{% endlist %}

Можно увидеть, что передаются определенные параметры, например диапазон дат, который отображается в календаре:

{% list tabs %}

- PHP CRest

    ```php
    [PLACEMENT_OPTIONS] => {
        "viewRangeFrom":"2018-09-30",
        "viewRangeTo":"2018-11-04"
    }
    ```

{% endlist %}

Эти параметры можно использовать для настройки отображения вашего приложения.

## JS методы

### Получить события

Метод `getEvents` получает события календаря.

{% list tabs %}

- JS


    ```js
    try
    {
    	const dateFrom = new Date();
    	const dateTo = new Date(dateFrom.getTime() + 86400 * 30 * 1000); // Умножаем на 1000, чтобы преобразовать секунды в миллисекунды
    	dateFrom.setHours(0, 0, 0, 0);
    	dateTo.setHours(0, 0, 0, 0);
    
    	const response = await $b24.callMethod(
    		'placement.getEvents',
    		{
    			dateFrom: dateFrom,
    			dateTo: dateTo
    		}
    	);
    
    	const events = response.getData().result;
    	console.log('getEvents response:');
    	console.dir(events);
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $dateFrom = new DateTime();
        $dateTo = new DateTime($dateFrom->getTimestamp() + 86400 * 30 * 1000);
        $dateFrom->setTime(0, 0, 0, 0);
        $dateTo->setTime(0, 0, 0, 0);
    
        $response = $b24Service
            ->placement
            ->call(
                'getEvents',
                [
                    'dateFrom' => $dateFrom,
                    'dateTo' => $dateTo
                ]
            );
    
        $events = $response
            ->getResponseData()
            ->getResult();
    
        echo 'getEvents response:';
        print_r($events);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting events: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var dateFrom = new Date();
    var dateTo = new Date(dateFrom.getTime() + 86400 * 30 * 1000); // Умножаем на 1000, чтобы преобразовать секунды в миллисекунды
    dateFrom.setHours(0, 0, 0, 0);
    dateTo.setHours(0, 0, 0, 0);

    BX24.placement.call(
        'getEvents',
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

### Открыть карточку и просмотреть событие

Метод `viewEvent` открывает карточку для просмотра события.

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'placement.call',
    		{
    			id: "1431170", // идентификатор события
    			dateFrom: "11.07.2018" // дата события. Не обязательна, но важна для регулярных событий
    		}
    	);
    	
    	const result = response.getData().result;
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->placement
            ->call(
                'viewEvent',
                [
                    'id'      => "1431170", // идентификатор события
                    'dateFrom' => "11.07.2018" // дата события. Не обязательна, но важна для регулярных событий
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        // Не требуется никакой логики обработки данных
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling viewEvent placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'viewEvent',
        {
            id: "1431170", // идентификатор события
            dateFrom: "11.07.2018" // дата события. Не обязательна, но важна для регулярных событий
        },
        function(){}
    );
    ```

{% endlist %}

### Добавить новое событие

Метод `addEvent` открывает карточку для добавления нового события.

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'placement.addEvent',
    		{}
    	);
    	
    	const result = response.getData().result;
    	// Нужная вам логика обработки данных
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->placement
            ->call('addEvent', []);
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling addEvent: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'addEvent',
        function(){}
    );
    ```

{% endlist %}

### Обновить событие

Метод `editEvent` открывает карточку для редактирования события.

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'placement.call',
    		{
    			placement: 'editEvent',
    			params: {
    				uid: "1431171|19.07.2018"
    			}
    		}
    	);
    	
    	const result = response.getData().result;
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->placement
            ->call(
                'editEvent',
                [
                    'uid' => "1431171|19.07.2018"
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling editEvent placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'editEvent',
        {
            uid: "1431171|19.07.2018"
        },
        function(){}
    );
    ```

{% endlist %}

### Удалить событие

Метод `deleteEvent` удаляет событие.

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'placement.deleteEvent',
    		{
    			id: "1431169"
    		}
    	);
    	
    	const result = response.getData().result;
    }
    catch( error )
    {
    	console.error('Error:', error);
    }
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->placement
            ->call(
                'deleteEvent',
                [
                    'id' => "1431169"
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling deleteEvent: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'deleteEvent',
        {
            id: "1431169"
        },
        function(){}
    );
    ```

{% endlist %}

## События

События, которые можно отслеживать в месте встройки:

#|
|| **Событие** | **Описание** ||
|| `Calendar.customView:refreshEntries` | Обновление событий ||
|| `Calendar.customView:decreaseViewRangeDate` | Нажатие на стрелочку назад, то есть открытие календаря за предыдущие даты ||
|| `Calendar.customView:increaseViewRangeDate` | Нажатие на стрелочку вперед, то есть открытие календаря на следующие даты ||
|| `Calendar.customView:adjustToDate` | Переход к конкретной дате ||
|#

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../widgets/index.md)
- [{#T}](../widgets/calendar.md)
- [{#T}](../widgets/user-field/index.md)
- [{#T}](../../local-integrations/local-apps.md)
