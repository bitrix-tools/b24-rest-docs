# Загрузка и использование B24PhpSDK

B24PhpSDK - это официальная и рекомендуемая библиотека для работы с REST API Битрикс24 на языке PHP. В отличие от CRest SDK, B24PhpSDK имеет целый ряд преимуществ:

1. Поддержку автокомплита кода и втнутренних структур в VSCode, PHPStorm, PyCharm;
2. Встроенную конвертацию данных REST API к соответствующим типам PHP (в частности, дата/время и деньги);
3. Эффективное использование возможностей PHP - использование генераторов при выполнении batch-запросов для экономии памяти, событийной модели для обработки особых ситуаций вроде обновления токенов авторизации и т.д.
4. Автогенерация и "проброс" уникальных идентификаторов исходящих запросов, что упрощает отладку в случае потери исходящих событий;
5. И многие другие.

## Установка

Для установки B24PhpSDK вы можете склонировать себе [соответствующий репозиторий](https://github.com/bitrix24/b24phpsdk) на гитхаб или скачать весь SDK архивом, но мы **настоятельно рекомендуем** использовать [composer](https://getcomposer.org/doc/00-intro.md) для установки.

```
composer require bitrix24/b24phpsdk
```

В результате, вы получите правильную файловую структуру, с которой в дальнейшем будет удобно работать. Например, для локального приложения это может быть:

```
/vendor
    /bitrix24
        /b24phpsdk - сам SDK
    /yyy - прочие open-source библиотеки, используемые в SDK
/public - папка со "страницами" приложения
    event-handler.php – обработчик событий         
    index.php - базовая страница с UI приложения
    install.php - страница установки приложения
/src
    Application.php - код с бизнес-логикой приложения         
/var
    /log
        application-YYYY-m-d.log – логи приложения
/composer.json - конфигурационный файл composer, доступный для изменения
/composer.lock - автоматически генерируемый файл настроек composer, используемый для переноса сборки используемых библиотек в prod-среду
```

Для работы со входящими вебхуками все может быть еще проще:

```
/vendor
    /bitrix24
        /b24phpsdk - сам SDK
    /yyy - прочие open-source библиотеки, используемые в SDK
/public - папка с "функционалом"  
    app.php - базовый скрипт, который обращается к REST API        
/var
    /log
        application-YYYY-m-d.log – логи приложения
/composer.json - конфигурационный файл composer, доступный для изменения
/composer.lock - автоматически генерируемый файл настроек composer, используемый для переноса сборки используемых библиотек в prod-среду
```

В обоих случаях веб-сервер должен обращаться к папке public или её аналогу на вашем сервере. Остальные папки должны быть недоступны для него из соображений безопасности.

## Использование со входящими вебхуками

Чтобы подключить SDK внутри вашего кода (предполагая, что ваш файл находится в папке public из описанной выше структуры), используйте минимально необходимую конструкцию:

```php
<?php

declare(strict_types=1);

use Bitrix24\SDK\Services\ServiceBuilderFactory;

// следите за правильностью пути к autoload.php. он может быть другим, если
// вы используете другую структуру папок 
require_once '../vendor/autoload.php'; 

$B24 = ServiceBuilderFactory::createServiceBuilderFromWebhook(
    '--сюда надо вставить код вашего вебхука--'
);
```

Когда объект инициирован, его можно использовать для вызова различных методов REST API. В примере ниже переменная $result получит значение идентификатора сделки в результате её создания:

```php
$result = $B24->getCRMScope()->deal()->add([
    'TITLE' => 'New Deal',
    'TYPE_ID' => 'SALE',
    'STAGE_ID' => 'NEW'
])->getId();
```

Если для нужного вам метода нет готовой "обёртки" в SDK, вы можете использовать универсальный способ вызова методов REST API:

```php
$result = $B24->core->call('crm.deal.add', [
    'TITLE' => 'New Deal',
    'TYPE_ID' => 'SALE',
    'STAGE_ID' => 'NEW'
]);
```

В этом случае не работает автокомплит кода в IDE и не происходит приведение типов в получаемых данных.

<iframe src="https://vk.ru/video_ext.php?oid=-211967493&id=456240173&hd=1&autoplay=0" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

[Скачать пример](https://helpdesk.bitrix24.ru/examples/b24phpsdk-webhook-example.zip)

## Использование в локальных и тиражных приложениях

Чтобы подключить SDK внутри вашего кода (предполагая, что ваш файл находится в папке public из описанной выше структуры), используйте минимально необходимую конструкцию:

```php
<?php

declare(strict_types=1);

use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
use Bitrix24\SDK\Services\ServiceBuilderFactory;
use Symfony\Component\HttpFoundation\Request;

require_once 'vendor/autoload.php';

$appProfile = ApplicationProfile::initFromArray([
    'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => 'put-your-client-id-here',
    'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => 'put-your-client-secret-here',
    'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'crm,user_basic'
]);

$B24 = ServiceBuilderFactory::createServiceBuilderFromPlacementRequest(
    Request::createFromGlobals(), 
    $appProfile
);
```

В случае локального приложения, вам нужно будет взять значения для `BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID` (Код приложения (client_id)), `BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET` (Ключ приложения (client_secret)) и `BITRIX24_PHP_SDK_APPLICATION_SCOPE` (Настройка прав) из соответствующих настроек локального приложения в вашем Битрикс24.

Код, приведенный выше, также предполагает, что приложение открывается "внутри" Битрикс24 либо в качестве основного интерфейса, либо в качестве виджета. Другие сценарии использования SDK, например, внешние приложения, требуют других способов инициализации.

Инициировав объект `$B24` вы можете использовать его для вызова различных методов REST API. В примере ниже переменная `$result` получит значение идентификатора сделки в результате её создания:

```php
$result = $B24->getCRMScope()->deal()->add([
    'TITLE' => 'New Deal',
    'TYPE_ID' => 'SALE',
    'STAGE_ID' => 'NEW'
])->getId();
```

<iframe src="https://vk.ru/video_ext.php?oid=-211967493&id=456240175&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

[Скачать пример](https://helpdesk.bitrix24.ru/examples/b24phpsdk-local-app-example.zip)