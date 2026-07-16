# Как встроить приложение в календарь

> Scope: [`calendar`](../scopes/permissions.md), [`placement`](../scopes/permissions.md)
>
> Кто может выполнять:
> - [placement.bind](../widgets/placement-bind.md) — администратор
> - [calendar.event.get](./calendar-event/calendar-event-get.md) — пользователь с доступом к календарю
> - `BX24.placement.call` и `BX24.placement.bindEvent` — приложение, открытое в точке встройки `CALENDAR_GRIDVIEW`

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В календарь можно встроить приложение через точку встройки `CALENDAR_GRIDVIEW`. После регистрации обработчика в списке видов календаря появится новый пункт. Когда пользователь откроет этот пункт, Битрикс24 вызовет обработчик и передаст диапазон дат, который сейчас отображается в календаре.

Сценарий состоит из пяти шагов.

1. Зарегистрировать обработчик методом [placement.bind](../widgets/placement-bind.md)
2. Проверить, что пункт появился в календаре
3. Получить диапазон дат из `PLACEMENT_OPTIONS`
4. Получить события за период методом [calendar.event.get](./calendar-event/calendar-event-get.md)
5. Управлять календарем из iframe приложения через [BX24.placement.call](../widgets/ui-interaction/bx24-placement-call.md)

Подробное описание точки встройки и входящих данных находится в статье [Виджет в календаре](../widgets/calendar.md). Эта страница показывает практический сценарий работы с точкой встройки.

## Подготовьте приложение

Для сценария нужен обработчик, доступный из интернета по HTTPS. Если вы разрабатываете приложение локально, настройте публичный адрес для локального сервера.

Проверьте, что:

- приложение установлено и установка завершена
- у приложения есть права `calendar` и `placement`
- обработчик принимает POST-запросы
- пользователь имеет доступ к календарю, события которого нужно показать
- известны `type` и `ownerId` календаря для метода `calendar.event.get`

Для календаря пользователя передайте `type: user` и идентификатор пользователя в `ownerId`. Для календаря компании передайте `type: company_calendar` и `ownerId: 0`.

Если установка приложения не завершена, точка встройки может не отображаться. Завершите установку методом или действием из статьи [Завершить установку приложения](../../settings/app-installation/installation-finish.md).

## 1. Зарегистрируйте пункт в календаре

Зарегистрируйте обработчик методом [placement.bind](../widgets/placement-bind.md). В параметре `PLACEMENT` передайте код точки встройки `CALENDAR_GRIDVIEW`.

Параметры регистрации:

- `PLACEMENT` — код точки встройки `CALENDAR_GRIDVIEW`
- `HANDLER` — публичный HTTPS-адрес обработчика приложения
- `TITLE` — название пункта в списке видов календаря

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    // Страница настроек приложения, открытая в iframe Битрикс24
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    const response = await $b24.actions.v2.call.make({
        method: 'placement.bind',
        params: {
            PLACEMENT: 'CALENDAR_GRIDVIEW',
            HANDLER: 'https://example.com/calendar-handler.php',
            TITLE: 'План работ',
        },
        requestId: 'calendar-grid-view-bind',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    console.info(response.getData().result)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Exceptions\BaseException;

    // $b24 построен на токене приложения
    try
    {
        $b24->getPlacementScope()->placement()->bind(
            'CALENDAR_GRIDVIEW',
            'https://example.com/calendar-handler.php',
            [
                'ru' => ['TITLE' => 'План работ'],
                'en' => ['TITLE' => 'Work plan'],
            ]
        );

        echo 'Пункт календаря зарегистрирован';
    }
    catch (BaseException $exception)
    {
        echo $exception->getMessage();
    }
    ```

{% endlist %}

Если обработчик зарегистрирован, метод вернет `true`.

```json
{
    "result": true
}
```

## 2. Проверьте пункт в календаре

Откройте календарь Битрикс24. В списке видов календаря должен появиться пункт с названием из параметра `TITLE`.

Если пункт не появился, проверьте:

- приложение установлено до конца
- в `PLACEMENT` передан код `CALENDAR_GRIDVIEW`
- обработчик доступен по HTTPS
- пользователь работает в Битрикс24 с установленным приложением

## 3. Получите диапазон дат в обработчике

Когда пользователь открывает пункт в календаре, Битрикс24 вызывает обработчик из параметра `HANDLER` и передает данные виджета в POST-запросе. Диапазон текущего представления календаря находится в параметре `PLACEMENT_OPTIONS`.

Пример входящих данных:

```php
Array
(
    [DOMAIN] => example.bitrix24.ru
    [AUTH_ID] => be56ba6600705a0700005a4b00000001f0f107e5806d5fe9a98e02021a72e57645f86a
    [PLACEMENT] => CALENDAR_GRIDVIEW
    [PLACEMENT_OPTIONS] => {"viewRangeFrom":"2024-08-12","viewRangeTo":"2024-08-18"}
)
```

В обработчике преобразуйте `PLACEMENT_OPTIONS` из JSON-строки в массив и получите даты.

```php
<?php

$placementOptions = json_decode($_REQUEST['PLACEMENT_OPTIONS'] ?? '{}', true);

$dateFrom = $placementOptions['viewRangeFrom'] ?? null;
$dateTo = $placementOptions['viewRangeTo'] ?? null;

if ($dateFrom === null || $dateTo === null)
{
    http_response_code(400);
    echo 'Date range is required';
    exit;
}
```

Полный список данных, которые получает обработчик, смотрите в статье [Виджет в календаре](../widgets/calendar.md).

## 4. Получите события за выбранный период

Передайте даты из `PLACEMENT_OPTIONS` в метод [calendar.event.get](./calendar-event/calendar-event-get.md). Для календаря пользователя укажите:

- `type` — `user`
- `ownerId` — идентификатор пользователя
- `from` — дата начала периода из `viewRangeFrom`
- `to` — дата окончания периода из `viewRangeTo`

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    // Пример для iframe приложения
    import { initializeB24Frame } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    // Для calendar.event.get используется прямой вызов метода по имени
    const response = await $b24.actions.v2.call.make({
        method: 'calendar.event.get',
        params: {
            type: 'user',
            ownerId: 1,
            from: '2024-08-12',
            to: '2024-08-18',
        },
        requestId: 'calendar-event-get',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    const events = response.getData().result
    console.info(events)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    use Bitrix24\SDK\Core\Exceptions\BaseException;

    // $b24Service построен на токене приложения или OAuth-токене
    try
    {
        // Для calendar.event.get используется прямой вызов метода по имени
        $response = $b24Service->core->call(
            'calendar.event.get',
            [
                'type' => 'user',
                'ownerId' => 1,
                'from' => '2024-08-12',
                'to' => '2024-08-18',
            ]
        );

        $events = $response->getResponseData()->getResult();
        print_r($events);
    }
    catch (BaseException $exception)
    {
        echo $exception->getMessage();
    }
    ```

{% endlist %}

Если нужно получить события только из отдельных календарей, добавьте параметр `section` с массивом идентификаторов календарей.

```json
{
    "type": "user",
    "ownerId": 1,
    "from": "2024-08-12",
    "to": "2024-08-18",
    "section": [21, 44]
}
```

Метод вернет массив событий за период. Если событий нет, массив `result` будет пустым.

```json
{
    "result": []
}
```

В серверном обработчике можно использовать авторизационный токен `AUTH_ID`, который Битрикс24 передает в POST-запросе виджета.

```php
<?php

$domain = $_REQUEST['DOMAIN'] ?? null;
$authId = $_REQUEST['AUTH_ID'] ?? null;
$placementOptions = json_decode($_REQUEST['PLACEMENT_OPTIONS'] ?? '{}', true);

$dateFrom = $placementOptions['viewRangeFrom'] ?? null;
$dateTo = $placementOptions['viewRangeTo'] ?? null;

if ($domain === null || $authId === null || $dateFrom === null || $dateTo === null)
{
    http_response_code(400);
    echo 'Required data is missing';
    exit;
}

$payload = http_build_query([
    'type' => 'user',
    'ownerId' => 1,
    'from' => $dateFrom,
    'to' => $dateTo,
    'auth' => $authId,
]);

$context = stream_context_create([
    'http' => [
        'method' => 'POST',
        'header' => 'Content-Type: application/x-www-form-urlencoded',
        'content' => $payload,
    ],
]);

$response = file_get_contents('https://' . $domain . '/rest/calendar.event.get', false, $context);
$result = json_decode($response, true);

$events = $result['result'] ?? [];
?>
```

После запроса сформируйте HTML-страницу обработчика и выведите на ней список событий или сообщение, что событий за период нет.

## 5. Управляйте календарем из iframe приложения

Внутри открытой точки встройки приложение может вызывать команды календаря методом [BX24.placement.call](../widgets/ui-interaction/bx24-placement-call.md). Эти команды не являются REST-методами и работают только в iframe приложения, открытом из `CALENDAR_GRIDVIEW`.

Команды календаря:

#|
|| **Команда** | **Что делает** | **Параметры** ||

|| `getEvents`
| Служебная команда для работы со списком событий за период внутри интерфейса календаря. Для получения событий в приложении используйте метод `calendar.event.get` из шага 4
| `dateFrom`, `dateTo`, `entries` ||

|| `viewEvent`
| Открывает карточку события
| `id` или `uid`. Для регулярного события можно передать `dateFrom` ||

|| `addEvent`
| Открывает карточку создания события
| Параметры не требуются ||

|| `editEvent`
| Открывает карточку редактирования события
| `id` или `uid`. Для регулярного события можно передать `dateFrom` ||

|| `deleteEvent`
| Запускает удаление события
| `id` или `uid`. Для регулярного события можно передать `dateFrom` ||
|#

Пример открытия карточки события:

```js
BX24.ready(function () {
    BX24.init(function () {
        BX24.placement.call(
            'viewEvent',
            {
                id: '1265',
                dateFrom: '2024-08-12'
            },
            function(response) {
                console.log(response);
            }
        );
    });
});
```

Для редактирования или удаления регулярного события передавайте `uid`, если он есть в данных события. Если `uid` неизвестен, передайте `id` и дату экземпляра события в `dateFrom`.

## 6. Подпишитесь на события интерфейса

Календарь отправляет события интерфейса, когда пользователь меняет диапазон или обновляет отображение. В iframe приложения на них можно подписаться методом [BX24.placement.bindEvent](../widgets/ui-interaction/bx24-placement-bind-event.md).

#|
|| **Событие** | **Когда отправляется** | **Что получает обработчик** ||

|| `Calendar.customView:refreshEntries`
| При обновлении событий календаря
| Пустой объект `{}` ||

|| `Calendar.customView:decreaseViewRangeDate`
| При переходе к предыдущему диапазону дат
| Пустой объект `{}` ||

|| `Calendar.customView:increaseViewRangeDate`
| При переходе к следующему диапазону дат
| Пустой объект `{}` ||

|| `Calendar.customView:adjustToDate`
| При переходе к конкретной дате
| Дату в формате `Y-m-d` ||
|#

```js
BX24.ready(function () {
    BX24.init(function () {
        BX24.placement.bindEvent('Calendar.customView:refreshEntries', function () {
            console.log('Calendar entries should be refreshed');
        });

        BX24.placement.bindEvent('Calendar.customView:adjustToDate', function (date) {
            console.log(date);
        });
    });
});
```

## Проверим результат

Сценарий работает корректно, если:

- в календаре появился новый пункт
- при открытии пункта вызывается обработчик приложения
- обработчик получает `PLACEMENT_OPTIONS.viewRangeFrom` и `PLACEMENT_OPTIONS.viewRangeTo`
- метод `calendar.event.get` возвращает массив `result`
- приложение показывает пользователю события или сообщение, что событий за период нет
- команды `BX24.placement.call` выполняются только внутри iframe точки `CALENDAR_GRIDVIEW`
- обработчики `BX24.placement.bindEvent` реагируют на изменения вида календаря

## Частые проблемы

#|
|| **Проблема**
| **Что проверить** ||

|| Пункт не появился в календаре
| Приложение установлено до конца, `PLACEMENT` равен `CALENDAR_GRIDVIEW`, пользователь открыл Битрикс24 с установленным приложением ||

|| Обработчик не вызывается
| URL из `HANDLER` доступен из интернета по HTTPS и возвращает страницу без ошибок ||

|| В обработчике нет диапазона дат
| Запрос пришел именно из точки `CALENDAR_GRIDVIEW`, параметр `PLACEMENT_OPTIONS` разобран как JSON ||

|| Метод `calendar.event.get` возвращает пустой массив
| В периоде есть события, правильно указаны `type`, `ownerId` и `section`, у пользователя есть доступ к календарю ||

|| `BX24.placement.call` не выполняет команду
| Код запущен внутри iframe точки `CALENDAR_GRIDVIEW`, библиотека `BX24` инициализирована, команда поддерживается календарем ||

|| `viewEvent`, `editEvent` или `deleteEvent` не находит событие
| Передан корректный `id` или `uid`. Для регулярного события передана дата экземпляра в `dateFrom` ||
|#

## Что важно учитывать

- `PLACEMENT_OPTIONS` передается как JSON-строка, ее нужно разобрать перед использованием
- `viewRangeFrom` и `viewRangeTo` показывают диапазон, который открыт в календаре на момент вызова обработчика
- `calendar.event.get` — метод REST API для получения событий календаря
- `BX24.placement.call` — механизм интерфейсных команд внутри iframe приложения, а не REST-метод
- команды интерфейса `getEvents`, `viewEvent`, `addEvent`, `editEvent` и `deleteEvent` доступны только в точке встройки `CALENDAR_GRIDVIEW`
- события `Calendar.customView:refreshEntries`, `Calendar.customView:decreaseViewRangeDate` и `Calendar.customView:increaseViewRangeDate` передают пустой объект `{}`
- событие `Calendar.customView:adjustToDate` передает дату в формате `Y-m-d`

## Продолжите изучение

- [{#T}](../widgets/calendar.md)
- [{#T}](../widgets/placement-bind.md)
- [{#T}](../widgets/ui-interaction/bx24-placement-call.md)
- [{#T}](../widgets/ui-interaction/bx24-placement-bind-event.md)
- [{#T}](./calendar-event/calendar-event-get.md)
- [{#T}](./calendar-event/index.md)
- [{#T}](../../settings/app-installation/installation-finish.md)
- [{#T}](../../local-integrations/local-apps.md)
