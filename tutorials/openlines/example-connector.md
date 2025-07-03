# Как создать коннектор Открытых линий для онлайн-чата на сайте

{% note info %}

Пример работает только на локальном приложении. При использования вебхуков он не сработает.

Для использования примера необходимо настроить работу класса CRest и подключить файл crest.php в файлах, где используется данный класс. Подробнее читайте в статье [Как использовать примеры в документации](../../how-to-use-examples.md).

{% endnote %}

Пример позволит создать на вашем сайте онлайн чат. Диалог привязывается к сессии пользователя на вашем сайте и к домену сайту.

1. После установки всех файлов запустите через браузер файл install_connector.php для первоначальной настройки ОЛ. При успешной первоначальной настройке у вас отобразится надпись `successfully`.
2. Откройте раздел с открытыми линиями и там найдите блок с названием «ExampleSiteChat».
3. Откройте раздел «ExampleSiteChat» и нажмите «Подключить».
4. Если вы все верно настроили, то увидите надпись `successfully`.
5. Установка закончена. Можете открыть файл index.php и начать первый диалог в чате.

В примере предусмотрена проверка: при вызове файла install_connector.php должна создаваться папка \chats в той же директории, где расположен этот файл. В этой папке хранится информация по чатам.

Если появится сообщение `error creat dir /chats`, то первоначальная настройка коннектора не выполнилась. Это означает, что права настроены неверно и скрипт не может создать папку /chats.

Создайте файл function.php.

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

Создайте файл handler.php.

Переменные `$widgetUri` и `$widgetName` обязательны в том случае, если необходимо показывать данный коннектор в списке коннекторов в виджете на сайте. Иначе их можно не заполнять.

- `widgetUri` — путь с иконки в виджете. Например при нажатии на иконку социальной сети открывается чат в этой социальной сети.
- `widgetName` — название коннектора в виджете.

```php
<?php
require_once('function.php');
$widgetUri = '';//detail page chat "https://example.com/index.php"
$widgetName = 'ExampleSiteChatWidget';//name connector in widget
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
                        'id' => $connector_id.'line'.intVal($options['LINE']),//
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

Создайте файл install_connector.php. Необходимо указать в `$handlerUrl` путь до файла handler.php, созданного выше.

```php
<?php
require_once('function.php');
$handlerUrl = 'https://yourdomain.yyy/handler.php';
//creat dir for save chats (recommend using database)
@mkdir(__DIR__ . '/chats/', 0775, true);
if(!file_exists(__DIR__ . '/chats/'))
{
    echo 'error creat dir "chats"';
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

Создайте файл ajax.php.

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

Создайте файл index.php.

```php
<body>
    <li nk rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
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
    <sc ript>
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
    </sc ript>
</body>
```
