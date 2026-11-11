# Как встроить приложение в календарь

> Scope: [`calendar`](../scopes/permissions.md), [`placement`](../scopes/permissions.md), [`user`](../scopes/permissions.md), [`user_brief`](../scopes/permissions.md) или [`user_basic`](../scopes/permissions.md) — для метода `user.current`
>
> Кто может выполнять методы: чтобы пройти сценарий целиком, нужно самое строгое из перечисленных прав — «пользователь с правом администратора или с правом создавать приложения, а также владелец персонального приложения»
>
> - [placement.bind](../widgets/placement-bind.md) и [placement.unbind](../widgets/placement-unbind.md) — пользователь с правом администратора или с правом создавать приложения, а также владелец персонального приложения
> - [calendar.event.get](./calendar-event/calendar-event-get.md), [user.current](../user/user-current.md), [BX24.placement.call](../widgets/ui-interaction/bx24-placement-call.md) и [BX24.placement.bindEvent](../widgets/ui-interaction/bx24-placement-bind-event.md) — любой пользователь

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В календарь можно встроить приложение через точку встраивания `CALENDAR_GRIDVIEW`. После регистрации обработчика в списке видов календаря появится новый пункт. Когда пользователь откроет этот пункт, Битрикс24 вызовет обработчик и передаст диапазон дат, который сейчас отображается в календаре.

Сценарий состоит из семи шагов: шесть основных и завершающее удаление обработчика. Шаги идут в таком порядке, потому что пункт в календаре появляется только после регистрации обработчика, а диапазон дат и команды календаря доступны только в открытом пункте.

1. Зарегистрировать обработчик методом [placement.bind](../widgets/placement-bind.md)
2. Проверить, что пункт появился в календаре
3. Получить диапазон дат из `PLACEMENT_OPTIONS`
4. Получить события за период методом [calendar.event.get](./calendar-event/calendar-event-get.md)
5. Управлять календарем из iframe приложения через [BX24.placement.call](../widgets/ui-interaction/bx24-placement-call.md)
6. Подписаться на события интерфейса календаря через [BX24.placement.bindEvent](../widgets/ui-interaction/bx24-placement-bind-event.md)
7. Снять регистрацию обработчика методом [placement.unbind](../widgets/placement-unbind.md), если приложение больше не нужно

Подробное описание точки встраивания и входящих данных находится в статье [Вид отображения в календаре CALENDAR_GRIDVIEW](../widgets/calendar.md).

Примеры на JS, PHP и Python — альтернативы, а не части одного файла: выберите один способ получения данных на шаг. JS-примеры написаны как ES-модули, подключайте их через `<script type="module">` или собирайте бандлером.

## Подготовьте приложение

Для сценария нужен обработчик, доступный из интернета по HTTPS. Если вы разрабатываете приложение локально, настройте публичный адрес для локального сервера.

Проверьте, что:

- приложение установлено и установка завершена
- у приложения есть scope `calendar` и `placement`, а для метода `user.current` — один из scope `user`, `user_brief` или `user_basic`
- обработчик принимает POST-запросы
- обработчик не запрещает встраивание в iframe: в ответе нет `X-Frame-Options: DENY`, а `Content-Security-Policy` разрешает фрейм Битрикс24
- пользователь имеет доступ к календарю, события которого нужно показать
- известны `type` и `ownerId` календаря для метода `calendar.event.get`

Для календаря пользователя передайте `type: user` и идентификатор пользователя в `ownerId`. Для календаря компании передайте `type: company_calendar` и `ownerId: 0`.

Если установка приложения не завершена, точка встраивания может не отображаться. Завершите установку методом или действием из статьи [Завершить установку приложения](../../settings/app-installation/installation-finish.md).

## 1. Зарегистрируйте пункт в календаре

Зарегистрируйте обработчик методом [placement.bind](../widgets/placement-bind.md). В параметре `PLACEMENT` передайте код точки встраивания `CALENDAR_GRIDVIEW`.

Параметры регистрации:

- `PLACEMENT` — код точки встраивания `CALENDAR_GRIDVIEW`
- `HANDLER` — публичный HTTPS-адрес обработчика приложения
- `TITLE` — название пункта в списке видов календаря
- `LANG_ALL` — необязательный параметр с названиями пункта для разных языков интерфейса. Объект, в котором ключ — код языка (`ru`, `en`), значение — объект с полем `TITLE`. Если передан `LANG_ALL`, значения `TITLE` и `DESCRIPTION` верхнего уровня не используются

{% include [Сноска о примерах](../../_includes/examples.md) %}

Во всех примерах пункт называется по языкам через `LANG_ALL`: обертка `placement.bind` в B24PhpSDK принимает названия только в этом параметре. В примерах на PHP и Python `$b24Service` и `client` — заранее созданные клиенты SDK на токене приложения. Как их создать, описано в статьях [B24PhpSDK](../../sdk/b24phpsdk/index.md) и [B24PySDK](../../sdk/b24pysdk/index.md#local-token).

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    // Страница настроек приложения, открытая в iframe Битрикс24
    import { initializeB24Frame, Text } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    // Типизированных оберток для методов REST в B24JsSDK нет, поэтому метод вызывается по имени
    const response = await $b24.actions.v2.call.make({
        method: 'placement.bind',
        params: {
            PLACEMENT: 'CALENDAR_GRIDVIEW',
            HANDLER: 'https://example.com/calendar-handler.php',
            LANG_ALL: {
                ru: { TITLE: 'План работ' },
                en: { TITLE: 'Work plan' },
            },
        },
        requestId: Text.getUuidRfc4122(),
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

    // $b24Service — заранее созданный клиент SDK на токене приложения
    try
    {
        // Третий аргумент — названия пункта по языкам, SDK передает их в LANG_ALL
        $result = $b24Service->getPlacementScope()->placement()->bind(
            'CALENDAR_GRIDVIEW',
            'https://example.com/calendar-handler.php',
            [
                'ru' => ['TITLE' => 'План работ'],
                'en' => ['TITLE' => 'Work plan'],
            ]
        );

        var_dump($result->isSuccess());
    }
    catch (Throwable $exception)
    {
        echo $exception->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # client — заранее созданный клиент b24pysdk на токене приложения
    try:
        bitrix_response = client.placement.bind(
            placement="CALENDAR_GRIDVIEW",
            handler="https://example.com/calendar-handler.php",
            lang_all={
                "ru": {"TITLE": "План работ"},
                "en": {"TITLE": "Work plan"},
            },
        ).response
        print(bitrix_response.result)
    except BitrixAPIError as error:
        print(f"error: {error.error}", f"error_description: {error.error_description}", sep="\n")
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    ```

{% endlist %}

Если обработчик зарегистрирован, метод вернет `true`.

```json
{
    "result": true
}
```

Если метод вернул ошибку, причины и действия собраны в разделе [Ошибки и диагностика](#errors).

## 2. Проверьте пункт в календаре

Откройте календарь Битрикс24. В списке видов календаря должен появиться пункт с названием из параметра `TITLE`. Если вы передали `LANG_ALL`, название берется из локализованного `TITLE` для языка пользователя.

Если пункт не появился, причины и проверки собраны в разделе [Ошибки и диагностика](#errors).

## 3. Получите диапазон дат в обработчике

Когда пользователь открывает пункт в календаре, Битрикс24 вызывает обработчик из параметра `HANDLER` и передает данные точки встраивания в POST-запросе. Диапазон текущего представления календаря находится в параметре `PLACEMENT_OPTIONS`.

Пример входящих данных (показана часть полей):

```php
Array
(
    [DOMAIN] => example.bitrix24.ru
    [AUTH_ID] => be56ba6600705a0700005a4b00000001f0f107e5806d5fe9a98e02021a72e57645f86a
    [PLACEMENT] => CALENDAR_GRIDVIEW
    [PLACEMENT_OPTIONS] => {"viewRangeFrom":"2024-12-10","viewRangeTo":"2024-12-16","URI":"\/calendar\/"}
)
```

В серверном обработчике `PLACEMENT_OPTIONS` приходит JSON-строкой и ее нужно разобрать. В iframe SDK отдает готовый объект в `$b24.placement.options`.

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

Полный список данных, которые получает обработчик, приведен в статье [Вид отображения в календаре CALENDAR_GRIDVIEW](../widgets/calendar.md).

## 4. Получите события за выбранный период

Передайте даты из `PLACEMENT_OPTIONS` в метод [calendar.event.get](./calendar-event/calendar-event-get.md). Для календаря пользователя укажите:

- `type` — `user`
- `ownerId` — идентификатор пользователя, чей календарь показывает приложение
- `from` — дата начала периода из `viewRangeFrom`
- `to` — дата окончания периода из `viewRangeTo`

Примеры показывают календарь текущего пользователя: его идентификатор приложение получает методом [user.current](../user/user-current.md) и передает в `ownerId`. Даты берутся из `PLACEMENT_OPTIONS`: в JS — из `$b24.placement.options`, в PHP и Python — из POST-запроса обработчика, как в шаге 3.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    // Пример для iframe приложения
    import { initializeB24Frame, Text } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    const { viewRangeFrom: dateFrom, viewRangeTo: dateTo } = $b24.placement.options

    // Типизированных оберток для методов REST в B24JsSDK нет, поэтому методы вызываются по имени
    const me = await $b24.actions.v2.call.make({
        method: 'user.current',
        params: {},
        requestId: Text.getUuidRfc4122(),
    })

    if (!me.isSuccess) {
        throw new Error(me.getErrorMessages().join('; '))
    }

    // Идентификатор текущего пользователя для ownerId
    const ownerId = Number(me.getData().result.ID)

    const response = await $b24.actions.v2.call.make({
        method: 'calendar.event.get',
        params: {
            type: 'user',
            ownerId,
            from: dateFrom,
            to: dateTo,
        },
        requestId: Text.getUuidRfc4122(),
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

    // $b24Service — заранее созданный клиент SDK на токене приложения
    // $dateFrom и $dateTo получены из PLACEMENT_OPTIONS в шаге 3
    try
    {
        // Идентификатор текущего пользователя для ownerId
        $ownerId = $b24Service->getUserScope()->user()->current()->user()->ID;

        $events = $b24Service->getCalendarScope()->event()->get(
            'user',
            $ownerId,
            [
                'from' => $dateFrom,
                'to' => $dateTo,
            ]
        )->getEvents();

        foreach ($events as $event)
        {
            echo $event->NAME . PHP_EOL;
        }
    }
    catch (Throwable $exception)
    {
        echo $exception->getMessage();
    }
    ```

- Python

    ```python
    import json

    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # client — заранее созданный клиент b24pysdk на токене приложения
    # post_data — поля POST-запроса, который Битрикс24 отправил обработчику (шаг 3)
    placement_options = json.loads(post_data["PLACEMENT_OPTIONS"])
    date_from = placement_options["viewRangeFrom"]
    date_to = placement_options["viewRangeTo"]

    try:
        # Идентификатор текущего пользователя для owner_id
        owner_id = int(client.user.current().response.result["ID"])

        bitrix_response = client.calendar.event.get(
            type="user",
            owner_id=owner_id,
            from_date=date_from,
            to=date_to,
        ).response
        print(bitrix_response.result)
    except BitrixAPIError as error:
        print(f"error: {error.error}", f"error_description: {error.error_description}", sep="\n")
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    ```

{% endlist %}

Если нужно получить события только из отдельных календарей, добавьте параметр `section` с массивом идентификаторов календарей.

Идентификаторы календарей для параметра `section` получите методом [calendar.section.get](./calendar-section-get.md). В примере `4` и `191` — демонстрационные значения.

```json
{
    "type": "user",
    "ownerId": 1,
    "from": "2024-12-10",
    "to": "2024-12-16",
    "section": [4, 191]
}
```

Метод вернет массив событий за период. В примере ниже — сокращенный ответ на запрос из примера выше: показано одно событие календаря `4`, события календаря `191` и часть служебных полей опущены.

```json
{
    "result": [
        {
            "ID": "1265",
            "NAME": "Встреча с клиентом",
            "DESCRIPTION": "Обсудить условия договора",
            "CAL_TYPE": "user",
            "OWNER_ID": "1",
            "CREATED_BY": "1",
            "DATE_FROM": "12/11/2024 05:59:00 pm",
            "DATE_TO": "12/11/2024 06:59:00 pm",
            "DATE_FROM_TS_UTC": "1733932740",
            "DATE_TO_TS_UTC": "1733936340",
            "TZ_FROM": "Europe/Riga",
            "TZ_TO": "Europe/Riga",
            "SECTION_ID": "4",
            "IS_MEETING": true,
            "MEETING_STATUS": "H",
            "ACCESSIBILITY": "busy",
            "IMPORTANCE": "normal"
        }
    ]
}
```

Ключевые поля события:

- `ID` — идентификатор события, нужен для команд `viewEvent`, `editEvent` и `deleteEvent`
- `NAME` и `DESCRIPTION` — название и описание, которые приложение показывает пользователю
- `CREATED_BY` — идентификатор пользователя, создавшего событие
- `DATE_FROM` и `DATE_TO` — локальное время начала и окончания в часовом поясе `TZ_FROM` и `TZ_TO`
- `DATE_FROM_TS_UTC` и `DATE_TO_TS_UTC` — время начала и окончания в формате timestamp. Несмотря на название, значение сдвинуто на смещение часового пояса сервера, поэтому читать его как время UTC нельзя. Точное время задают `DATE_FROM` вместе с `TZ_FROM` и `DATE_TO` вместе с `TZ_TO`. В примере смещение сервера нулевое, поэтому значение совпало с UTC
- `TZ_FROM` и `TZ_TO` — часовые пояса начала и окончания события
- `SECTION_ID` — идентификатор календаря, в котором создано событие
- `CAL_TYPE` и `OWNER_ID` — тип и владелец календаря события
- `IS_MEETING` и `MEETING_STATUS` — признак встречи с участниками и статус участия текущего пользователя
- `ACCESSIBILITY` и `IMPORTANCE` — занятость и важность события

Если событий нет, массив `result` будет пустым.

```json
{
    "result": []
}
```

В серверном обработчике можно использовать авторизационный токен `AUTH_ID`, который Битрикс24 передает в POST-запросе к обработчику.

```php
<?php

$domain = $_REQUEST['DOMAIN'] ?? null;
$authId = $_REQUEST['AUTH_ID'] ?? null;
$placementOptions = json_decode($_REQUEST['PLACEMENT_OPTIONS'] ?? '{}', true);

$dateFrom = $placementOptions['viewRangeFrom'] ?? null;
$dateTo = $placementOptions['viewRangeTo'] ?? null;

// Идентификатор пользователя, чей календарь показываем: 1 — демонстрационное значение
$ownerId = 1;

// Домен Битрикс24 проверяем по списку, а не доверяем значению из запроса.
// Замените список на домены вашего Битрикс24
$allowedDomains = ['example.bitrix24.ru', 'example.bitrix24.com'];

if (
    $domain === null || !in_array($domain, $allowedDomains, true)
    || $authId === null || !preg_match('/^[a-zA-Z0-9]{32,}$/', $authId)
    || $dateFrom === null || $dateTo === null
)
{
    http_response_code(400);
    echo 'Required data is missing';
    exit;
}

$payload = http_build_query([
    'type' => 'user',
    'ownerId' => $ownerId,
    'from' => $dateFrom,
    'to' => $dateTo,
    'auth' => $authId,
]);

$curl = curl_init();
curl_setopt_array($curl, [
    CURLOPT_URL => 'https://' . $domain . '/rest/calendar.event.get',
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 10,
]);

$response = curl_exec($curl);
$httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
$curlError = curl_error($curl);
curl_close($curl);

if ($response === false)
{
    error_log('Calendar request failed: ' . $curlError);
    http_response_code(502);
    echo 'Calendar request failed';
    exit;
}

$result = json_decode($response, true);

if ($httpCode >= 400 || !is_array($result) || isset($result['error']))
{
    http_response_code(502);
    echo 'Calendar request returned an error: '
        . 'HTTP ' . $httpCode . ' '
        . htmlspecialchars((string)($result['error'] ?? 'unknown'), ENT_QUOTES, 'UTF-8')
        . ' '
        . htmlspecialchars((string)($result['error_description'] ?? ''), ENT_QUOTES, 'UTF-8');
    exit;
}

$events = $result['result'] ?? [];
?>
```

Для примера нужно расширение PHP `curl`. `$ownerId` получите отдельным вызовом `user.current` с тем же `AUTH_ID`.

`AUTH_ID` — временный токен пользователя. Передавайте его только в серверный обработчик: не выводите в HTML, не записывайте в логи и не отправляйте в клиентский код. Домен для вызова REST берите из параметра `DOMAIN` этого же запроса и сверяйте его со списком доменов вашего Битрикс24, как в примере выше: значение из запроса нельзя подставлять в адрес вызова без проверки.

После запроса сформируйте HTML-страницу обработчика и выведите на ней список событий или сообщение, что событий за период нет. Названия событий приходят из Битрикс24, поэтому экранируйте их перед выводом.

```php
<?php
if ($events === [])
{
    echo '<p>Событий за период нет</p>';
}
else
{
    echo '<ul>';
    foreach ($events as $event)
    {
        echo '<li>'
            . htmlspecialchars((string)($event['NAME'] ?? ''), ENT_QUOTES, 'UTF-8')
            . ' — '
            . htmlspecialchars((string)($event['DATE_FROM'] ?? ''), ENT_QUOTES, 'UTF-8')
            . '</li>';
    }
    echo '</ul>';
}
?>
```

## 5. Управляйте календарем из iframe приложения

Внутри открытой точки встраивания приложение может вызывать команды календаря методом [BX24.placement.call](../widgets/ui-interaction/bx24-placement-call.md). Эти команды не являются методами REST API и работают только в iframe приложения, открытом из `CALENDAR_GRIDVIEW`.

Команды календаря:

#|
|| **Команда** | **Что делает** | **Параметры** ||

|| `getEvents`
| Загружает события за диапазон в календарь: после нее `viewEvent`, `editEvent` и `deleteEvent` находят эти события. Может ответить приложению дважды. Первый ответ отправляется сразу, до загрузки: в нем записи, которые календарь загрузил раньше, при первом вызове — пустой массив. Второй ответ приходит, если загрузка завершилась успешно: это переданный массив `entries`, в котором календарь дописал каждой записи поле `UID`
| `dateFrom` и `dateTo` — границы диапазона. `entries` — обязательный массив событий от приложения, например из ответа `calendar.event.get` ||

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

Сначала вызовите `getEvents` для нужного диапазона — без нее команды ниже не находят события. Затем откройте карточку. В разметке страницы приложения нужна кнопка, по нажатию на которую откроется карточка:

```html
<button id="open-event" type="button">Открыть событие</button>
```

```js
import { initializeB24Frame } from '@bitrix24/b24jssdk'

const $b24 = await initializeB24Frame()

const { viewRangeFrom, viewRangeTo } = $b24.placement.options

await $b24.placement.call('getEvents', {
    dateFrom: viewRangeFrom,
    dateTo: viewRangeTo,
    entries: [],
})

// Карточку открываем по действию пользователя, когда события уже загружены
async function openEvent(id) {
    const result = await $b24.placement.call('viewEvent', { id })
    console.log(result)
}

document.querySelector('#open-event').addEventListener('click', () => openEvent('1265'))
```

Первый ответ `getEvents` календарь отправляет до окончания загрузки. Если вызвать `viewEvent` сразу за ним, событие может быть еще не загружено, поэтому в примере карточка открывается по нажатию кнопки `#open-event`.

Команды `viewEvent`, `editEvent` и `deleteEvent` принимают `id` обычного события. Для встречи, в которой пользователь только участвует, событие хранится под идентификатором родительской записи, поэтому передавайте `PARENT_ID`, если он есть в ответе `calendar.event.get`, иначе `ID`.

Для экземпляра повторяющегося события дополнительно передайте дату этого экземпляра в `dateFrom` — только дату в формате даты Битрикс24, без времени. Например, для русского интерфейса это `11.12.2024`.

Поле `UID` календарь вычисляет сам: это `PARENT_ID || ID`, а для повторяющегося события — с датой экземпляра. Метод `calendar.event.get` такое поле не возвращает. Чтобы получить `UID`, передайте события из ответа `calendar.event.get` в `entries` команды `getEvents`: календарь допишет каждой записи `UID`. Без этого собирайте `id` и `dateFrom` из данных ответа, как в примере ниже.

```js
// event — элемент массива из ответа calendar.event.get
const id = event.PARENT_ID || event.ID
// DATE_FROM: "12/11/2024 05:59:00 pm" — берем только дату экземпляра,
// она уже записана в формате даты Битрикс24
const dateFrom = event.DATE_FROM.split(' ')[0]

await $b24.placement.call('viewEvent', { id, dateFrom })
```

## 6. Подпишитесь на события интерфейса

Календарь отправляет события интерфейса, когда пользователь меняет диапазон или обновляет отображение. Подписаться на них можно методом [BX24.placement.bindEvent](../widgets/ui-interaction/bx24-placement-bind-event.md) — в примерах ниже через `$b24.placement.bindEvent`. Подписка работает только в iframe приложения, открытом в точке встраивания `CALENDAR_GRIDVIEW`.

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
import { initializeB24Frame, Text } from '@bitrix24/b24jssdk'

const $b24 = await initializeB24Frame()

// Заглушка: замените на отрисовку событий в интерфейсе приложения
function renderEvents(events) {
    console.log(events)
}

// Загружает события за диапазон и перерисовывает интерфейс приложения
async function refreshEvents(dateFrom, dateTo) {
    const ownerId = 1 // идентификатор из user.current

    // Типизированных оберток для методов REST в B24JsSDK нет, поэтому метод вызывается по имени
    const response = await $b24.actions.v2.call.make({
        method: 'calendar.event.get',
        params: {
            type: 'user',
            ownerId,
            from: dateFrom,
            to: dateTo,
        },
        requestId: Text.getUuidRfc4122(),
    })

    if (response.isSuccess) {
        renderEvents(response.getData().result)
    }
}

// Диапазон, который приложение показывает сейчас
let viewRangeFrom = $b24.placement.options.viewRangeFrom
let viewRangeTo = $b24.placement.options.viewRangeTo

// Сдвигает диапазон на его длину: -1 — назад, 1 — вперед
function shiftRange(dateFrom, dateTo, direction) {
    const dayMs = 24 * 60 * 60 * 1000
    const length = Date.parse(dateTo) - Date.parse(dateFrom) + dayMs
    const shift = length * direction

    return [
        new Date(Date.parse(dateFrom) + shift).toISOString().slice(0, 10),
        new Date(Date.parse(dateTo) + shift).toISOString().slice(0, 10),
    ]
}

await $b24.placement.bindEvent('Calendar.customView:refreshEntries', () => {
    refreshEvents(viewRangeFrom, viewRangeTo)
})

await $b24.placement.bindEvent('Calendar.customView:adjustToDate', (date) => {
    // Дату берем из аргумента события: в placement.options новый диапазон
    // появится только после перезагрузки iframe
    const day = String(date).slice(0, 10)

    viewRangeFrom = day
    viewRangeTo = day
    refreshEvents(viewRangeFrom, viewRangeTo)
})

// Переход к предыдущему и следующему диапазону
for (const [eventName, direction] of [
    ['Calendar.customView:decreaseViewRangeDate', -1],
    ['Calendar.customView:increaseViewRangeDate', 1],
]) {
    await $b24.placement.bindEvent(eventName, () => {
        [viewRangeFrom, viewRangeTo] = shiftRange(viewRangeFrom, viewRangeTo, direction)
        refreshEvents(viewRangeFrom, viewRangeTo)
    })
}
```

`renderEvents` — заглушка, которую заменяют отрисовкой событий в интерфейсе приложения.

События `refreshEntries`, `decreaseViewRangeDate` и `increaseViewRangeDate` приходят с пустым объектом `{}`. Календарь не передает в них новый диапазон, а `$b24.placement.options` хранит диапазон на момент загрузки iframe. Поэтому приложение само сдвигает диапазон на его длину и запрашивает события за новый период.

Событие `adjustToDate` передает дату в формате `Y-m-d`. Если пользователь переключается на вид приложения из другого вида календаря, iframe перезагружается и обработчик получает свежие `placement.options`. При переходе внутри вида перезагрузки нет, поэтому дату берите из аргумента события.

Если приложение собрано на `BX24.js`, те же команды и события вызываются через `BX24.placement.call` и `BX24.placement.bindEvent`.

## 7. Удалите обработчик, если приложение больше не нужно

Если приложение удаляют или меняют адрес обработчика, снимите регистрацию методом [placement.unbind](../widgets/placement-unbind.md). Передайте `PLACEMENT` и прежний `HANDLER`: без `HANDLER` метод удаляет все обработчики этого приложения в точке встраивания.

Код ниже выполняется не в приложении, открытом в точке встраивания `CALENDAR_GRIDVIEW`, а на странице настройки или удаления приложения, открытой в iframe Битрикс24, или на сервере приложения. Выполнять его может администратор, сотрудник с правом создавать приложения или владелец персонального приложения.

{% list tabs %}

- JS

    ```js
    // npm install @bitrix24/b24jssdk
    // Страница настроек приложения, открытая в iframe Битрикс24
    import { initializeB24Frame, Text } from '@bitrix24/b24jssdk'

    const $b24 = await initializeB24Frame()

    // Типизированных оберток для методов REST в B24JsSDK нет, поэтому метод вызывается по имени
    const response = await $b24.actions.v2.call.make({
        method: 'placement.unbind',
        params: {
            PLACEMENT: 'CALENDAR_GRIDVIEW',
            HANDLER: 'https://example.com/calendar-handler.php',
        },
        requestId: Text.getUuidRfc4122(),
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }

    console.info('count:', response.getData().result.count)
    ```

- PHP

    ```php
    <?php
    // composer require bitrix24/b24phpsdk:"^3.0"
    require_once 'vendor/autoload.php';

    // $b24Service — заранее созданный клиент SDK на токене приложения
    try
    {
        $result = $b24Service->getPlacementScope()->placement()->unbind(
            'CALENDAR_GRIDVIEW',
            'https://example.com/calendar-handler.php'
        );

        var_dump($result->getDeletedPlacementHandlersCount());
    }
    catch (Throwable $exception)
    {
        echo $exception->getMessage();
    }
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    # client — заранее созданный клиент b24pysdk на токене приложения
    try:
        bitrix_response = client.placement.unbind(
            placement="CALENDAR_GRIDVIEW",
            handler="https://example.com/calendar-handler.php",
        ).response
        print(bitrix_response.result)
    except BitrixAPIError as error:
        print(f"error: {error.error}", f"error_description: {error.error_description}", sep="\n")
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    ```

{% endlist %}

Метод вернет объект с полем `count` — число удаленных обработчиков. Если `count` равен `0`, обработчик с таким `HANDLER` не найден.

```json
{
    "result": {
        "count": 1
    }
}
```

## Проверим результат

Сценарий работает корректно, если:

- в календаре появился новый пункт
- при открытии пункта вызывается обработчик приложения
- обработчик получает `PLACEMENT_OPTIONS.viewRangeFrom` и `PLACEMENT_OPTIONS.viewRangeTo`
- метод `calendar.event.get` возвращает массив `result`
- приложение показывает пользователю события или сообщение, что событий за период нет
- после вызова `getEvents` команда `viewEvent` открывает карточку события и возвращает `{"result": true}`
- при переходе к предыдущему или следующему диапазону срабатывает обработчик `$b24.placement.bindEvent`, а приложение показывает события за новый период
- после `placement.unbind` метод вернул `count` больше нуля, а пункт пропал из списка видов календаря

## Ошибки и диагностика {#errors}

Если метод вернул ошибку, проверьте данные запроса.

- `ERROR_PLACEMENT_NOT_FOUND` — `placement.bind` не нашел точку встраивания: у приложения нет scope `calendar`, в котором регистрируется `CALENDAR_GRIDVIEW`. Добавьте приложению scope `calendar`
- `ERROR_ARGUMENT` с текстом `Argument 'The placement code is not specified' is null or empty` — в `placement.bind` передан пустой `PLACEMENT`. Передайте `CALENDAR_GRIDVIEW`
- `WRONG_AUTH_TYPE` — `placement.bind` или `placement.unbind` вызван вне приложения, например через вебхук. Повторите вызов из приложения
- `ACCESS_DENIED` — `placement.bind` вызвал пользователь без нужного права. Вызовите метод от администратора, сотрудника с правом создавать приложения или владельца персонального приложения
- `insufficient_scope` — у приложения нет scope `calendar` для `calendar.event.get`. Добавьте приложению scope `calendar`
- `expired_token` — токен `AUTH_ID`, с которым вызван `calendar.event.get`, истек. Переоткройте пункт в календаре: обработчик получит новый `AUTH_ID`

Ошибка приходит в формате:

```json
{
    "error": "ERROR_PLACEMENT_NOT_FOUND",
    "error_description": "Placement not found"
}
```

Если ошибки нет, но сценарий не работает, проверьте признаки из таблицы.

#|
|| **Проблема**
| **Что проверить** ||

|| Пункт не появился в календаре
| Приложение установлено до конца, `PLACEMENT` равен `CALENDAR_GRIDVIEW`, обработчик доступен по HTTPS, пользователь открыл Битрикс24 с установленным приложением ||

|| Обработчик не вызывается
| URL из `HANDLER` доступен из интернета по HTTPS и возвращает страницу без ошибок ||

|| Пункт появился, но область приложения пустая
| Обработчик не запрещает iframe, как указано в разделе «Подготовьте приложение» ||

|| В обработчике нет диапазона дат
| Запрос пришел именно из точки встраивания `CALENDAR_GRIDVIEW`, параметр `PLACEMENT_OPTIONS` разобран как JSON ||

|| Метод `calendar.event.get` возвращает пустой массив
| В периоде есть события, правильно указаны `type`, `ownerId` и `section`, у пользователя есть доступ к календарю ||

|| `$b24.placement.call` не выполняет команду
| Код запущен внутри iframe приложения, открытого в точке встраивания `CALENDAR_GRIDVIEW`, SDK инициализирован через `initializeB24Frame()`, команда поддерживается календарем ||

|| Обработчик `$b24.placement.bindEvent` не срабатывает
| Имя события совпадает с таблицей шага 6 символ в символ, приложение открыто в точке встраивания `CALENDAR_GRIDVIEW`, подписка выполнена после `initializeB24Frame()`. На неизвестное имя события SDK ошибку не возвращает — проверьте имя и точку встраивания ||

|| `viewEvent`, `editEvent` или `deleteEvent` не находит событие
| Перед командой вызвана `getEvents` для диапазона, в который попадает событие. Передан корректный `id` или `uid`, для встречи, в которой пользователь только участвует, — `PARENT_ID`. Для регулярного события передана дата экземпляра в `dateFrom` ||
|#

## Что важно учитывать

- команды `getEvents`, `viewEvent`, `addEvent`, `editEvent` и `deleteEvent` не являются методами REST API: их нельзя вызвать вебхуком или с сервера, они работают только в iframe приложения, открытом в точке встраивания `CALENDAR_GRIDVIEW`
- диапазон `viewRangeFrom` и `viewRangeTo` в `$b24.placement.options` фиксируется при загрузке iframe и не меняется, когда пользователь листает календарь внутри вида
- поля `DATE_FROM_TS_UTC` и `DATE_TO_TS_UTC` сдвинуты на смещение часового пояса сервера, поэтому читать их как время UTC нельзя
- метод `placement.unbind` без параметра `HANDLER` удаляет все обработчики приложения в точке встраивания `CALENDAR_GRIDVIEW`

## Продолжите изучение

- [{#T}](../widgets/calendar.md)
- [{#T}](../widgets/placement-bind.md)
- [{#T}](../widgets/ui-interaction/bx24-placement-call.md)
- [{#T}](../widgets/ui-interaction/bx24-placement-bind-event.md)
- [{#T}](./calendar-event/calendar-event-get.md)
- [{#T}](./calendar-event/index.md)
- [{#T}](../../settings/app-installation/installation-finish.md)
- [{#T}](../../local-integrations/local-apps.md)
