# Как создать коннектор открытых линий для чата на сайте

{% note info "" %}

Пример работает только с авторизацией приложения. При использования вебхуков он не сработает.

Чтобы использовать пример, настройте работу класса CRest. Подробную информацию читайте в статье [Загрузка и использование CRest PHP SDK](../../sdk/crest-php-sdk/index.md).

{% endnote %}

На сайте можно создать онлайн-чат. Когда посетитель пишет сообщение, коннектор открытой линии передает текст в Битрикс24. Сотрудник отвечает из Битрикс24 — ответ отображается на сайте.

Чтобы настроить коннектор и создать онлайн-чат, выполним шесть шагов:

1. Создадим файл `function.php` со вспомогательными функциями и классом для работы с API.

2. Создадим файл `install_connector.php` для регистрации коннектора. В файле вызовем методы:

    - [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md) — зарегистрируем коннектор в Битрикс24,

    - [event.bind](../../api-reference/events/event-bind.md) — подпишемся на событие [OnImConnectorMessageAdd](../../api-reference/imopenlines/imconnector/events/on-im-connector-message-add.md).

3. Создадим обработчик `handler.php` для событий из Битрикс24. В файле вызовем методы:

    - [imconnector.activate](../../api-reference/imopenlines/imconnector/imconnector-activate.md) — активируем коннектор,

    - [imconnector.connector.data.set](../../api-reference/imopenlines/imconnector/imconnector-connector-data-set.md) — передадим данные виджета,

    - [imconnector.send.status.delivery](../../api-reference/imopenlines/imconnector/imconnector-send-status-delivery.md) — подтвердим доставку сообщений.

4. Создадим файл `ajax.php` для обмена данными между виджетом и Битрикс24. В файле вызовем метод [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md) для отправки сообщений.

5. Создадим публичную страницу `index.php` с интерфейсом чата.

6. Запустим скрипт `install_connector.php` для регистрации коннектора в системе.

В результате получим чат, который интегрирован с Битрикс24 и готов к приему сообщений от пользователей.

Диалог привязывается:

- к сессии пользователя — каждый посетитель получает независимую переписку,

- домену сайта — обмен сообщениями работает только на указанном адресе.

## 1\. Создадим файл function.php

Создадим файл `function.php` и определим вспомогательные функции.

{% note info "" %}

В примере история чата в файлах. В реальных проектах рекомендуется использовать базу данных.

{% endnote %}

### getConnectorID

Функция `getConnectorID` возвращает уникальный идентификатор коннектора `example_connector_1`.

{% include [Сноска о примерах](../../_includes/examples.md) %}

```php
include_once('crest.php');
function getConnectorID()
{
    return 'example_connector_1';
}
```

### getChat

Функция `getChat` возвращает историю чата `$chatID` из файла. Если файл есть, возвращает массив сообщений `$result`. Если нет — пустой массив.

Принимает параметр `$chatID` — идентификатор чата.

```php
function getChat($chatID)
{
    $result = [];
    if (file_exists(__DIR__ . '/chats/' . $chatID . '.txt'))
    {
        $result = json_decode(file_get_contents(__DIR__ . '/chats/' . $chatID . '.txt'), 1);
    }
    return $result;
}
```

### saveMessage

Функция `saveMessage` сохраняет новое сообщение `$arMessage` в файл чата `$chatID`.

Параметры:

- `$chatID` — идентификатор чата,

- `$arMessage` — массив с данными сообщения.

Функция возвращает номер сообщения, если оно сохранилось, или `false` в случае ошибки записи.

```php
function saveMessage($chatID, $arMessage)
{
    $arMessages = getChat($chatID);
    $count = count($arMessages);
    $arMessages['message' . $count] = $arMessage;
    if (file_put_contents(__DIR__ . '/chats/' . $chatID . '.txt', json_encode($arMessages)))
    {
        $return = $count;
    }
    else
    {
        $return = false;
    }
    return $return;
}
```

### getLine

Функция `getLine` возвращает идентификатор линии из файла `line_id.txt`, если файл есть. Если файла нет, возвращается `false` или пустая строка.

```php
function getLine()
{
    return file_get_contents(__DIR__ . '/line_id.txt');
}
```

### setLine

Функция `setLine` сохраняет идентификатор  линии в файл `line_id.txt`. Принимает параметр `$line_id` — идентификатор открытой линии. В случае успешной записи функция возвращает количество записанных байт, иначе — `false`.

```php
function setLine($line_id)
{
    return file_put_contents(__DIR__ . '/line_id.txt', intVal($line_id));
}
```

### convertBB

Функция `convertBB` преобразует BB-коды в HTML. Принимает параметр `$var` — текст с тегами вида `[b]жирный[/b]`. Возвращает текст с HTML-тегами, например, `<strong>жирный</strong>`.

```php
function convertBB($var)
{
    $search = array(
        '/\[b\](.*?)\[\/b\]/is',
        '/\[br\]/is',
        '/\[i\](.*?)\[\/i\]/is',
        '/\[u\](.*?)\[\/u\]/is',
        '/\[img\](.*?)\[\/img\]/is',
        '/\[url\](.*?)\[\/url\]/is',
        '/\[url\=(.*?)\](.*?)\[\/url\]/is'
    );
    $replace = array(
        '<strong>$1</strong>',
        '<br>',
        '<em>$1</em>',
        '<u>$1</u>',
        '<img src="$1" />',
        '<a href="$1">$1</a>',
        '<a href="$1">$2</a>'
    );
    $var = preg_replace($search, $replace, $var);
    return $var;
}
```

### Пример кода файла function.php

```php
<?php
include_once('crest.php');
function getConnectorID()
{
    return 'example_connector_1';
}
function getChat($chatID)
{
    $result = [];
    if (file_exists(__DIR__ . '/chats/' . $chatID . '.txt'))
    {
        $result = json_decode(file_get_contents(__DIR__ . '/chats/' . $chatID . '.txt'), 1);
    }
    return $result;
}
function saveMessage($chatID, $arMessage)
{
    $arMessages = getChat($chatID);
    $count = count($arMessages);
    $arMessages['message' . $count] = $arMessage;
    if (file_put_contents(__DIR__ . '/chats/' . $chatID . '.txt', json_encode($arMessages)))
    {
        $return = $count;
    }
    else
    {
        $return = false;
    }
    return $return;
}
function getLine()
{
    return file_get_contents(__DIR__ . '/line_id.txt');
}
function setLine($line_id)
{
    return file_put_contents(__DIR__ . '/line_id.txt', intVal($line_id));
}
function convertBB($var)
{
    $search = array(
        '/\[b\](.*?)\[\/b\]/is',
        '/\[br\]/is',
        '/\[i\](.*?)\[\/i\]/is',
        '/\[u\](.*?)\[\/u\]/is',
        '/\[img\](.*?)\[\/img\]/is',
        '/\[url\](.*?)\[\/url\]/is',
        '/\[url\=(.*?)\](.*?)\[\/url\]/is'
    );
    $replace = array(
        '<strong>$1</strong>',
        '<br>',
        '<em>$1</em>',
        '<u>$1</u>',
        '<img src="$1" />',
        '<a href="$1">$1</a>',
        '<a href="$1">$2</a>'
    );
    $var = preg_replace($search, $replace, $var);
    return $var;
}
```

## 2\. Создадим файл install_connector.php

Чтобы зарегистрировать коннектор в Битрикс24, создадим файл `install_connector.php`. В файле подключим `function.php`, который создали на первом шаге.

```php
require_once('function.php');
```

### Настроим URL обработчика событий

В параметре `$handlerUrl` укажем адрес скрипта, который будет принимать события от Битрикс24. Файл со скриптом `handler.php` создадим на третьем шаге.

{% note warning "" %}

Адрес должен быть действующим, доступным извне и с поддержкой HTTPS.

{% endnote %}

```php
$handlerUrl = 'https://yourdomain.ru/handler.php';
```

### Создадим директорию для хранения чатов

Создадим папку `/chats/` для хранения истории переписок.

1. Используем `@mkdir()` для создания директории с правами `0775`.

2. Флаг `true` позволяет создавать вложенные папки.

3. Проверим, успешно ли создана папка.

```php
@mkdir(__DIR__ . '/chats/', 0775, true);
if(!file_exists(__DIR__ . '/chats/'))
{
    echo 'error create dir "chats"';
}
```

### Зарегистрируем коннектор

Получим идентификатор коннектора `$connector_id` через функцию `getConnectorID()` из `function.php`.

Чтобы зарегистрировать коннектор, используем метод [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md). В него передадим следующие данные:

- `ID` — идентификатор коннектора `$connector_id`.

- `NAME` — название коннектора. Укажем, `ExampleSiteChat`.

- `ICON` — массив для описания иконки коннектора в активном состоянии.

    - `DATA_IMAGE` — DATA-представление иконки SVG. Например, `data:image/svg+xml;charset=US-ASCII,…`.

    - `COLOR` — цвет. Укажем `#a6ffa3`.

    - `SIZE` — размер. Передадим `100%`.

    - `POSITION` — позиция SVG. Зададим `center`.

- `ICON_DISABLED` — массив для описания иконки, когда коннектор отключен. Аналогичен массиву `ICON`.

- `PLACEMENT_HANDLER` — URL обработчика событий. Передадим `$handlerUrl`.

```php
$connector_id = getConnectorID();
$result = CRest::call(
    'imconnector.register',
    [
        'ID' => $connector_id,
        'NAME' => 'ExampleSiteChat',
        'ICON' => [
            'DATA_IMAGE' => 'data:image/svg+xml;charset=US-ASCII,...',
            'COLOR' => '#a6ffa3',
            'SIZE' => '100%',
            'POSITION' => 'center',
        ],
        'ICON_DISABLED' => [
            'DATA_IMAGE' => 'data:image/svg+xml;charset=US-ASCII,...',
            'SIZE' => '100%',
            'POSITION' => 'center',
            'COLOR' => '#ffb3a3',
        ],
        'PLACEMENT_HANDLER' => $handlerUrl,
    ]
);
```

### Зарегистрируем обработчик события

После успешной регистрации коннектора подпишемся на событие [OnImConnectorMessageAdd](../../api-reference/imopenlines/imconnector/events/on-im-connector-message-add.md). Оно срабатывает при поступлении нового сообщения от пользователя.

Чтобы зарегистрировать обработчик события, используем метод [event.bind](../../api-reference/events/event-bind.md). В него передадим следующие параметры:

- `event` — название события. Передадим `OnImConnectorMessageAdd`.

- `handler` — ссылка на обработчик события. Укажем `$handlerUrl`.

После регистрации выведем сообщение `successfully`.

```php
if (!empty($result['result']))
{
    $resultEvent = CRest::call(
        'event.bind',
        [
            'event' => 'OnImConnectorMessageAdd',
            'handler' => $handlerUrl,
        ]
    );
    if (!empty($resultEvent['result']))
    {
        echo 'successfully';
    }
}
```

### Пример кода файла install_connector.php

```php
<?php
require_once('function.php');
$handlerUrl = 'https://yourdomain.ru/handler.php';
//create dir for save chats (recommend using database)
@mkdir(__DIR__ . '/chats/', 0775, true);
if(!file_exists(__DIR__ . '/chats/'))
{
    echo 'error create dir "chats"';
}
else
{
    $connector_id = getConnectorID();
    $result = CRest::call(
        'imconnector.register',
        [
            'ID' => $connector_id,
            'NAME' => 'ExampleSiteChat',
            'ICON' => [
                'DATA_IMAGE' => 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%2070%2071%22%20style%3D%22enable-background%3Anew%200%200%2070%2071%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cpath%20fill%3D%22%230C99BA%22%20class%3D%22st0%22%20d%3D%22M34.7%2C64c-11.6%2C0-22-7.1-26.3-17.8C4%2C35.4%2C6.4%2C23%2C14.5%2C14.7c8.1-8.2%2C20.4-10.7%2C31-6.2%0A%09c12.5%2C5.4%2C19.6%2C18.8%2C17%2C32.2C60%2C54%2C48.3%2C63.8%2C34.7%2C64L34.7%2C64z%20M27.8%2C29c0.8-0.9%2C0.8-2.3%2C0-3.2l-1-1.2h19.3c1-0.1%2C1.7-0.9%2C1.7-1.8%0A%09v-0.9c0-1-0.7-1.8-1.7-1.8H26.8l1.1-1.2c0.8-0.9%2C0.8-2.3%2C0-3.2c-0.4-0.4-0.9-0.7-1.5-0.7s-1.1%2C0.2-1.5%2C0.7l-4.6%2C5.1%0A%09c-0.8%2C0.9-0.8%2C2.3%2C0%2C3.2l4.6%2C5.1c0.4%2C0.4%2C0.9%2C0.7%2C1.5%2C0.7C26.9%2C29.6%2C27.4%2C29.4%2C27.8%2C29L27.8%2C29z%20M44%2C41c-0.5-0.6-1.3-0.8-2-0.6%0A%09c-0.7%2C0.2-1.3%2C0.9-1.5%2C1.6c-0.2%2C0.8%2C0%2C1.6%2C0.5%2C2.2l1%2C1.2H22.8c-1%2C0.1-1.7%2C0.9-1.7%2C1.8v0.9c0%2C1%2C0.7%2C1.8%2C1.7%2C1.8h19.3l-1%2C1.2%0A%09c-0.5%2C0.6-0.7%2C1.4-0.5%2C2.2c0.2%2C0.8%2C0.7%2C1.4%2C1.5%2C1.6c0.7%2C0.2%2C1.5%2C0%2C2-0.6l4.6-5.1c0.8-0.9%2C0.8-2.3%2C0-3.2L44%2C41z%20M23.5%2C32.8%0A%09c-1%2C0.1-1.7%2C0.9-1.7%2C1.8v0.9c0%2C1%2C0.7%2C1.8%2C1.7%2C1.8h23.4c1-0.1%2C1.7-0.9%2C1.7-1.8v-0.9c0-1-0.7-1.8-1.7-1.9L23.5%2C32.8L23.5%2C32.8z%22/%3E%0A%3C/svg%3E%0A',
                'COLOR' => '#a6ffa3',
                'SIZE' => '100%',
                'POSITION' => 'center',
            ],
            'ICON_DISABLED' => [
                'DATA_IMAGE' => 'data:image/svg+xml;charset=US-ASCII,%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20x%3D%220px%22%20y%3D%220px%22%0A%09%20viewBox%3D%220%200%2070%2071%22%20style%3D%22enable-background%3Anew%200%200%2070%2071%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%3Cpath%20fill%3D%22%230C99BA%22%20class%3D%22st0%22%20d%3D%22M34.7%2C64c-11.6%2C0-22-7.1-26.3-17.8C4%2C35.4%2C6.4%2C23%2C14.5%2C14.7c8.1-8.2%2C20.4-10.7%2C31-6.2%0A%09c12.5%2C5.4%2C19.6%2C18.8%2C17%2C32.2C60%2C54%2C48.3%2C63.8%2C34.7%2C64L34.7%2C64z%20M27.8%2C29c0.8-0.9%2C0.8-2.3%2C0-3.2l-1-1.2h19.3c1-0.1%2C1.7-0.9%2C1.7-1.8%0A%09v-0.9c0-1-0.7-1.8-1.7-1.8H26.8l1.1-1.2c0.8-0.9%2C0.8-2.3%2C0-3.2c-0.4-0.4-0.9-0.7-1.5-0.7s-1.1%2C0.2-1.5%2C0.7l-4.6%2C5.1%0A%09c-0.8%2C0.9-0.8%2C2.3%2C0%2C3.2l4.6%2C5.1c0.4%2C0.4%2C0.9%2C0.7%2C1.5%2C0.7C26.9%2C29.6%2C27.4%2C29.4%2C27.8%2C29L27.8%2C29z%20M44%2C41c-0.5-0.6-1.3-0.8-2-0.6%0A%09c-0.7%2C0.2-1.3%2C0.9-1.5%2C1.6c-0.2%2C0.8%2C0%2C1.6%2C0.5%2C2.2l1%2C1.2H22.8c-1%2C0.1-1.7%2C0.9-1.7%2C1.8v0.9c0%2C1%2C0.7%2C1.8%2C1.7%2C1.8h19.3l-1%2C1.2%0A%09c-0.5%2C0.6-0.7%2C1.4-0.5%2C2.2c0.2%2C0.8%2C0.7%2C1.4%2C1.5%2C1.6c0.7%2C0.2%2C1.5%2C0%2C2-0.6l4.6-5.1c0.8-0.9%2C0.8-2.3%2C0-3.2L44%2C41z%20M23.5%2C32.8%0A%09c-1%2C0.1-1.7%2C0.9-1.7%2C1.8v0.9c0%2C1%2C0.7%2C1.8%2C1.7%2C1.8h23.4c1-0.1%2C1.7-0.9%2C1.7-1.8v-0.9c0-1-0.7-1.8-1.7-1.9L23.5%2C32.8L23.5%2C32.8z%22/%3E%0A%3C/svg%3E%0A',
                'SIZE' => '100%',
                'POSITION' => 'center',
                'COLOR' => '#ffb3a3',
            ],
            'PLACEMENT_HANDLER' => $handlerUrl,
        ]
    );
    if (!empty($result['result']))
    {
        $resultEvent = CRest::call(
            'event.bind',
            [
                'event' => 'OnImConnectorMessageAdd',
                'handler' => $handlerUrl,
            ]
        );
        if (!empty($resultEvent['result']))
        {
            echo 'successfully';
        }
    }
}
```

## 3\. Создадим файл handler.php

Создадим файл `handler.php`, чтобы обрабатывать события из Битрикс24. В файле подключим `function.php`, который создали на первом шаге.

```php
require_once('function.php');
```

### Настроим параметры виджета

- `$widgetUri` — укажем URL страницы с иконки виджета.

- `$widgetName` — зададим название коннектора в виджете.

- `$connector_id` — передадим идентификатор коннектора через функцию `getConnectorID` из файла `function.php`.

```php
$widgetUri = '';
$widgetName = 'ExampleSiteChatWidget';
$connector_id = getConnectorID();
```

Переменные `$widgetUri` и `$widgetName` обязательны, если необходимо показать коннектор в списке коннекторов в виджете на сайте. В других случаях их можно не заполнять.

### Активируем коннектор

В массив `$options` передадим обработанные данные из `PLACEMENT_OPTIONS` . Массив содержит идентификатор линии и статус коннектора.

Чтобы активировать коннектор, используем метод [imconnector.activate](../../api-reference/imopenlines/imconnector/imconnector-activate.md). В него передадим следующие данные:

- `CONNECTOR` — идентификатор коннектора `$connector_id`.

- `LINE` — идентификатор открытой линии. Укажем `intVal($options['LINE'])`.

- `ACTIVE` — статус коннектора. Передадим `intVal($options['ACTIVE_STATUS'])`. Возможные значения: `1` — активен, `0` — неактивен.

```php
$options = json_decode($_REQUEST['PLACEMENT_OPTIONS'], true);
$result = CRest::call(
    'imconnector.activate',
    [
        'CONNECTOR' => $connector_id,
        'LINE' => intVal($options['LINE']),
        'ACTIVE' => intVal($options['ACTIVE_STATUS']),
    ]
);
```

### Дополним настройки коннектора

Если активирован коннектор и указаны `widgetUri` и `widgetNamе`, дополним настройки коннектора с помощью метода [imconnector.connector.data.set](../../api-reference/imopenlines/imconnector/imconnector-connector-data-set.md). В него передадим следующие данные:

- `CONNECTOR` — идентификатор коннектора `$connector_id`.

- `LINE` — идентификатор открытой линии. Укажем `intVal($options['LINE'])`.

- `DATA` — массив с данными для сохранения.

    - `id` — идентификатор учетной записи, которая подключена к этому коннектору. Укажем  `$connector_id.'line'.intVal($options['LINE'])` — комбинация идентификаторов коннектора и линии.

    - `url_im` — ссылка на чат. Передадим параметр `$widgetUri`.

    - `name` — название коннектора в виджете. Передадим параметр `$widgetName`.

```php
$resultWidgetData = CRest::call(
    'imconnector.connector.data.set',
    [
        'CONNECTOR' => $connector_id,
        'LINE' => intVal($options['LINE']),
        'DATA' => [
            'id' => $connector_id.'line'.intVal($options['LINE']),
            'url_im' => $widgetUri,
            'name' => $widgetName
        ],
    ]
);
```

### Сохраним открытую линию

После успешной активации:

- сохраним идентификатор линии в файл с помощью функции `setLine` из файла `function.php`,

- выведем сообщение `successfully`.

```php
if(!empty($resultWidgetData['result']))
{
    setLine($options['LINE']);
    echo 'successfully';
}
```

### Подтвердим доставку сообщения

Когда сработало событие `ONIMCONNECTORMESSAGEADD`, и сообщение пришло для коннектора с идентификатором `$connector_id`, сохраним сообщение с помощью функции `saveMessage`.

Подтвердим доставку сообщения с помощью метода [imconnector.send.status.delivery](../../api-reference/imopenlines/imconnector/imconnector-send-status-delivery.md). В него передадим следующие данные:

- `CONNECTOR` — идентификатор коннектора `$connector_id`.

- `LINE` — идентификатор открытой линии. Укажем с помощью функции `getLine` из файла `function.php`.

- `MESSAGES` — массив сообщений.

    - `im` — элемент из входящего сообщения открытой линии.

    - `message` — массив идентификатор сообщений. Передадим `$idMess`, который получен из функции `saveMessage`.

    - `chat` — идентификатор чата.

```php
if(
    $_REQUEST['event'] == 'ONIMCONNECTORMESSAGEADD'
    && !empty($_REQUEST['data']['CONNECTOR'])
    && $_REQUEST['data']['CONNECTOR'] == $connector_id
    && !empty($_REQUEST['data']['MESSAGES'])
)
{
    foreach ($_REQUEST['data']['MESSAGES'] as $arMessage)
    {
        $idMess = saveMessage($arMessage['chat']['id'], $arMessage);
        $resultDelivery = CRest::call(
            'imconnector.send.status.delivery',
            [
                'CONNECTOR' => $connector_id,
                'LINE' => getLine(),
                'MESSAGES' => [
                    [
                        'im' => $arMessage['im'],
                        'message' => [
                            'id' => [$idMess]
                        ],
                        'chat' => [
                            'id' => $arMessage['chat']['id']
                        ],
                    ],
                ]
            ]
        );
    }
}
```

### Пример кода файла handler.php

```php
<?php
require_once('function.php');
$widgetUri = '';
$widgetName = 'ExampleSiteChatWidget';
$connector_id = getConnectorID();
if (!empty($_REQUEST['PLACEMENT_OPTIONS']) && $_REQUEST['PLACEMENT'] == 'SETTING_CONNECTOR')
{
    //activate connector
    $options = json_decode($_REQUEST['PLACEMENT_OPTIONS'], true);
    $result = CRest::call(
        'imconnector.activate',
        [
            'CONNECTOR' => $connector_id,
            'LINE' => intVal($options['LINE']),
            'ACTIVE' => intVal($options['ACTIVE_STATUS']),
        ]
    );
    if (!empty($result['result']))
    {
        //add data widget
        if(!empty($widgetUri) && !empty($widgetName))
        {
            $resultWidgetData = CRest::call(
                'imconnector.connector.data.set',
                [
                    'CONNECTOR' => $connector_id,
                    'LINE' => intVal($options['LINE']),
                    'DATA' => [
                        'id' => $connector_id.'line'.intVal($options['LINE']),
                        'url_im' => $widgetUri,
                        'name' => $widgetName
                    ],
                ]
            );
            if(!empty($resultWidgetData['result']))
            {
                setLine($options['LINE']);
                echo 'successfully';
            }
        }
        else
        {
            setLine($options['LINE']);
            echo 'successfully';
        }
    }
}
if(
    $_REQUEST['event'] == 'ONIMCONNECTORMESSAGEADD'
    && !empty($_REQUEST['data']['CONNECTOR'])
    && $_REQUEST['data']['CONNECTOR'] == $connector_id
    && !empty($_REQUEST['data']['MESSAGES'])
)
{
    foreach ($_REQUEST['data']['MESSAGES'] as $arMessage)
    {
        $idMess = saveMessage($arMessage['chat']['id'], $arMessage);
        $resultDelivery = CRest::call(
            'imconnector.send.status.delivery',
            [
                'CONNECTOR' => $connector_id,
                'LINE' => getLine(),
                'MESSAGES' => [
                    [
                        'im' => $arMessage['im'],
                        'message' => [
                            'id' => [$idMess]
                        ],
                        'chat' => [
                            'id' => $arMessage['chat']['id']
                        ],
                    ],
                ]
            ]
        );
    }
}
```

## 4\. Создадим файл ajax.php

Создадим файл `ajax.php`, чтобы обрабатывать AJAX-запросы от виджета чата на сайте. В файле подключим `function.php`, который содержит необходимые функции.

```php
require_once('function.php');
session_start();
```

### Подготовим переменные

- `$chatID` — идентификатор чата. Создадим на основе домена `HTTP_ORIGIN` и сессии пользователя `session_id()`.

- `$type` — тип запроса. Передадим значение из формы `$_POST['type']`. Возможные значения: `chat_history` —загрузка истории, `send_message` — отправка сообщения.

- `$connector_id` — идентификатор коннектора. Получим с помощью функции `getConnectorID` из `function.php`.

- `$line_id` — идентификатор открытой линии. Получим с помощью функции `getLine` из `function.php`.

```php
$chatID = 'chat' . md5($_SERVER['HTTP_ORIGIN']) . md5(session_id());
$type = $_POST['type'];
$connector_id = getConnectorID();
$line_id = getLine();
```

### Загрузим историю чата

Для AJAX-запроса типа `chat_history` загрузим сообщения с помощью функции `getChat` из `function.php`.

1. Каждое сообщение выведем в виде блока.

    - Если есть элемент `im`, сообщение пришло из Битрикс24. Отобразим его слева на сером фоне `#fbfbfb`.

    - Если нет элемента `im` — сообщение от пользователя. Отобразим справа на голубом фоне `#ccf2ff`.

2. Текст обработаем с помощью функции `convertBB()` из `function.php`.

```php
if ($type == 'chat_history'):
    $arChat = getChat($chatID);
    if (!empty($arChat)):
        foreach ($arChat as $item): ?>
            <div class="col-12 alert alert-warning text-<?=(!empty($item['im'])) ? 'left' : 'right'?>"
                style=" background-color: <?=(!empty($item['im'])) ? '#fbfbfb' : '#ccf2ff'?>">
                <?=convertBB($item['message']['text'])?>
            </div>
        <?php endforeach;
    endif;
```

### Отправим сообщение

Для AJAX-запроса типа `send_message` сформируем структуру сообщения `$arMessage` и отправим его в Битрикс24.

#### Структура массива \$arMessage

- `user` — массив описания пользователя:

    - `id` — идентификатор пользователя, совпадает с идентификатором чата. Передадим `$chatID`.

    - `name` — имя пользователя. Защитим от XSS-атак с помощью `htmlspecialchars` и передадим значение из формы `$_POST['name']`.

- `message` — массив описания сообщения:

    - `date` — время сообщения в формате `timestamp`.

    - `text` — текст сообщения. Защитим от XSS-атак с помощью `htmlspecialchars` и передадим значение из формы `$_POST['message']`.

- `chat` — массив описания чата:

    - `id` — идентификатор чата. Передадим `$chatID`.

    - `url` — ссылка на чат во внешней системе. Защитим от XSS-атак с помощью `htmlspecialchars` и передадим адрес страницы `HTTP_REFERER`.

```php
elseif ($type == 'send_message'):
    $arMessage = [
        'user' => [
            'id' => $chatID,
            'name' => htmlspecialchars($_POST['name']),
        ],
        'message' => [
            'id' => false,
            'date' => time(),
            'text' => htmlspecialchars($_POST['message']),
        ],
        'chat' => [
            'id' => $chatID,
            'url' => htmlspecialchars($_SERVER['HTTP_REFERER']),
        ],
    ];
```

#### Сохраним сообщение локально

Добавим сообщение в файл с помощью функции `saveMessage`. Номер сообщения сохраним в переменной `$id`.

```php
$id = saveMessage($chatID, $arMessage);
```

#### Передадим сообщение в Битрикс24

Чтобы отправить сообщение в открытую линию, используем метод [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md). В него передадим следующие данные:

- `CONNECTOR` — идентификатор коннектора `$connector_id`.

- `LINE` — идентификатор открытой линии. Укажем `$line_id`, которые получен с помощью `getLine`.

- `MESSAGES` — массив сообщений. Каждое сообщение описывается отдельным массивом. Передадим `[$arMessage]`.

```php
if ($id !== false)
{
    $arMessage['message']['id'] = $id;
    $result = CRest::call(
        'imconnector.send.messages',
        [
            'CONNECTOR' => $connector_id,
            'LINE' => $line_id,
            'MESSAGES' => [$arMessage],
        ]
    );
}
echo json_encode(
    [
        'chat' => $chatID,
        'post' => $_POST,
        'result' => $result
    ]
);
```

### Пример кода файла ajax.php

```php
<?php
require_once('function.php');
session_start();
$chatID = 'chat' . md5($_SERVER['HTTP_ORIGIN']) . md5(session_id());
$type = $_POST['type'];
$connector_id = getConnectorID();
$line_id = getLine();
/*
    simple example save chat, must lost any data
    recommend using database
*/
if ($type == 'chat_history'):
    $arChat = getChat($chatID);
    if (!empty($arChat)):
        foreach ($arChat as $item): ?>
            <div class="col-12 alert alert-warning text-<?=(!empty($item['im'])) ? 'left' : 'right'?>"
                style=" background-color: <?=(!empty($item['im'])) ? '#fbfbfb' : '#ccf2ff'?>">
                <?=convertBB($item['message']['text'])?>
            </div>
        <?php endforeach;
    endif;
elseif ($type == 'send_message'):
    $arMessage = [
        'user' => [
            'id' => $chatID,
            'name' => htmlspecialchars($_POST['name']),
        ],
        'message' => [
            'id' => false,
            'date' => time(),
            'text' => htmlspecialchars($_POST['message']),
        ],
        'chat' => [
            'id' => $chatID,
            'url' => htmlspecialchars($_SERVER['HTTP_REFERER']),
        ],
    ];
    $id = saveMessage($chatID, $arMessage);
    $result['error'] = 'error_save';
    if ($id !== false)
    {
        $arMessage['message']['id'] = $id;
        $result = CRest::call(
            'imconnector.send.messages',
            [
                'CONNECTOR' => $connector_id,
                'LINE' => $line_id,
                'MESSAGES' => [$arMessage],
            ]
        );
    }
    echo json_encode(
        [
            'chat' => $chatID,
            'post' => $_POST,
            'result' => $result
        ]
    );
endif;
```

## 5\. Создадим файл index.php

Создадим публичную страницу чата для посетителя — файл `index.php`.

1. Подключим внешние библиотеки Bootstrap и jQuery.

2. Создадим контейнер чата из двух частей:

    - `chat_history` — история сообщений,

    - `chat_form` — форма отправки сообщения.

3. Реализуем логику работы чата через JavaScript.

    - Добавим функцию `updateChat`, которая обновляет историю сообщений каждые пять секунд. Она отправляет POST-запрос в `ajax.php` с параметром `type=chat_history`, получает HTML-разметку сообщений и вставляет ее в `#chat_history`.

    - Обработаем отправку сообщения. Соберем данные с помощью функции `serialize` и выполним запрос в `ajax.php` с параметром `type=send_message`.

### Пример кода файла index.php

```javascript
<body>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
         crossorigin="anonymous">
    <sc ript src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></sc ript>
    <div class="container-fluid">
        <div class=" m-5">
            <div id="chat_history" class="row">
                <div class="spinner-border m-5 text-success" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div id="chat_form" class=" mt-5 mr-auto ml-auto mb-5">
                <fo rm id="form_message">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" class="form-control" placeholder="Name">
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea class="form-control" name="message" rows="3" placeholder="your message here"></textarea>
                    </div>
                    <input class="btn btn-primary" type="submit" name="send" value="send">
                </form>
            </div>
        </div>
    </div>
    <script>
        $(document).ready(function () {
            function updateChat()
            {
                $.ajax({
                    'method': 'POST',
                    'dataType': 'html',
                    'url': 'ajax.php',
                    'data': 'type=chat_history',
                    success: function (data) {//success callback
                        $('#chat_history').text('').html(data);
                    }
                });
            }
            setInterval(updateChat, 5000);
            updateChat();
            $('#form_message').on('submit', function (el) {//event submit form
                el.preventDefault();//the default action of the event will not be triggered
                $('#chat_form').addClass('spinner-border');
                $('#form_message').hide();
                var formData = $(this).serialize();
                $.ajax({
                    'method': 'POST',
                    'dataType': 'json',
                    'url': 'ajax.php',
                    'data': formData + '&type=send_message',
                    success: function (data) {//success callback
                        updateChat();
                        $('#chat_form').removeClass('spinner-border');
                        $('#form_message textarea[name=message]').val('');
                        $('#form_message').show();
                    }
                });
            });
        });
    </script>
</body>
```

## 6\. Запустим коннектор

1. Разместим файлы `function.php`, `handler.php`, `install_connector.php`, `ajax.php`, `index.php` в одной папке на сервере. Например, в папке `/myconnector/`.

2. В браузере откроем страницу `https://ваш_сайт.ru/myconnector/install_connector.php` и увидим одно из двух сообщений:

    - `successfully` — папка `/chats/` создана, коннектор зарегистрирован,

    - `error create dir "chats"` — скрипт не может создать папку `/chats/`, настройка коннектора не выполнена. Чтобы это исправить, нужно корректно настроить права.

3. Подключим коннектор в Битрикс24.

    - В Битрикс24 перейдем на страницу *CRM > Клиенты > Контакт-центр*.

    - Найдем блок с названием ExampleSiteChat.

    - Нажмем Подключить.

    - Если появилось сообщение `successfully`, коннектор активирован.

4. Начнем диалог в чате.

    - В браузере откроем страницу `https://ваш_сайт.ru/myconnector/index.php`.

    - Напишем сообщение. Оно должно прийти в Битрикс24.

    - Ответим — ответ появится на сайте.