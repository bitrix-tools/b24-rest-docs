# B24PhpSDK: установка и первый вызов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

B24PhpSDK — официальная PHP-библиотека для серверных приложений и интеграций с Битрикс24. Без SDK разработчику нужно вручную отправлять HTTP-запросы к методам, передавать авторизацию и разбирать JSON-ответы. B24PhpSDK оформляет эти действия как PHP-классы и методы.

Чтобы SDK мог обращаться к Битрикс24, выберите сценарий подключения: входящий вебхук, локальное или тиражное приложение. Таблица ниже поможет выбрать подходящий вариант.

| Если нужно | Выберите вариант |
|---|---|
| Настроить внутреннюю интеграцию без создания приложения | [Входящий вебхук](#incoming-webhook) |
| Создать приложение для одного Битрикс24 | [Локальное приложение](#local-app) |
| Устанавливать приложение в разных Битрикс24 | [Тиражное приложение](#market-app) |

## Как начать работу

Создайте или откройте PHP-проект, в котором будет работать интеграция с Битрикс24. В этот проект нужно добавить библиотеку B24PhpSDK, затем выбрать способ подключения к Битрикс24 и выполнить первый вызов метода.

Перед началом проверьте, что у вас есть:

- PHP-проект на локальной машине или сервере. Подойдет и пустой каталог, в котором будет создан `composer.json`
- [Composer](https://getcomposer.org/) для установки зависимостей
- PHP 8.2–8.4 для SDK v1 или PHP 8.4+ для SDK v3 с расширениями `curl`, `intl` и `json`
- Битрикс24, в котором можно создать вебхук или установить приложение
- доступ к CRM — он понадобится для примера создания сделки

### Добавьте B24PhpSDK в PHP-проект

Откройте в терминале каталог вашего PHP-проекта. Обычно это каталог, где находится `composer.json` или где он должен быть создан.

Добавьте Composer-пакет `bitrix24/b24phpsdk`. Composer скачает B24PhpSDK и зависимости в каталог `vendor`, а также подготовит автозагрузку классов.

Актуальные требования, ветки и примеры смотрите в [официальном репозитории B24PhpSDK](https://github.com/bitrix24/b24phpsdk).

Выберите major-версию SDK под проект:

- v1 — стабильный вариант для продакшена и PHP 8.2–8.4
- v3 — вариант для PHP 8.4+ и новых методов API. В v3 есть изменения с потерей обратной совместимости

Если выполнить `composer require bitrix24/b24phpsdk` без ограничения версии, Composer выберет последнюю совместимую версию пакета. На PHP 8.4 это может быть v3. Чтобы зафиксировать major-версию, укажите ее явно:

```bash
# стабильная v1 для PHP 8.2–8.4
composer require bitrix24/b24phpsdk:"^1.0"

# v3 для PHP 8.4+ и новых методов API
composer require bitrix24/b24phpsdk:"^3.3"
```

Для веб-приложения удобно держать публичные файлы отдельно от кода и зависимостей:

```text
/vendor              # зависимости Composer, включая B24PhpSDK
/public              # файлы, доступные веб-серверу
    index.php
    install.php
/src                 # бизнес-логика приложения
/var/log             # логи приложения
/composer.json
/composer.lock
```

Веб-сервер должен открывать только каталог `public` или его аналог. `vendor`, `src`, `var`, `composer.json` и `composer.lock` не должны быть доступны из браузера.

### Подключите SDK через входящий вебхук {#incoming-webhook}

Входящий вебхук — это URL с ключом доступа, по которому можно вызывать методы Битрикс24. Вебхук подходит для внутренней интеграции без приложения.

Создайте [входящий вебхук](../../local-integrations/local-webhooks.md) в Битрикс24 и выберите для него права доступа. Для примера со сделкой понадобится CRM. Скопируйте полный URL вебхука и передайте его в `ServiceBuilderFactory::createServiceBuilderFromWebhook`:

```php
<?php

declare(strict_types=1);

use Bitrix24\SDK\Services\ServiceBuilderFactory;

require_once __DIR__ . '/../vendor/autoload.php';

$b24Service = ServiceBuilderFactory::createServiceBuilderFromWebhook(
    'https://example.bitrix24.ru/rest/1/your-webhook-code/'
);
```

После инициализации вызовите метод через готовый сервис SDK. Для сделки используйте `entityTypeId = 2` — это идентификатор типа объекта CRM «Сделка». Код ниже создает сделку и записывает ее идентификатор в `$dealId`:

```php
$result = $b24Service->getCRMScope()->item()->add(
    2,
    [
        'title' => 'New Deal',
    ]
);

$dealId = $result->item()->id;

echo 'Created deal ID: ' . $dealId;
```

Если запрос выполнен успешно, скрипт выведет идентификатор новой сделки, а сделка «New Deal» появится в CRM Битрикс24. Если вместо идентификатора возвращается ошибка, проверьте URL вебхука и его права доступа.

### Подключите SDK в локальном приложении {#local-app}

Локальное приложение работает в одном Битрикс24 и использует OAuth 2.0. При открытии приложения Битрикс24 передает параметры авторизации в HTTP-запросе. SDK берет их из объекта `Request` и создает сервис для вызова методов.

Выберите [сценарий установки локального приложения](../../settings/app-installation/local-apps/index.md) и заполните карточку приложения. Скопируйте `client_id`, `client_secret` и scope из настроек приложения в массив `ApplicationProfile::initFromArray`:

```php
<?php

declare(strict_types=1);

use Bitrix24\SDK\Core\Credentials\ApplicationProfile;
use Bitrix24\SDK\Services\ServiceBuilderFactory;
use Symfony\Component\HttpFoundation\Request;

require_once __DIR__ . '/../vendor/autoload.php';

$appProfile = ApplicationProfile::initFromArray([
    'BITRIX24_PHP_SDK_APPLICATION_CLIENT_ID' => 'put-your-client-id-here',
    'BITRIX24_PHP_SDK_APPLICATION_CLIENT_SECRET' => 'put-your-client-secret-here',
    'BITRIX24_PHP_SDK_APPLICATION_SCOPE' => 'crm,user_basic',
]);

$b24Service = ServiceBuilderFactory::createServiceBuilderFromPlacementRequest(
    Request::createFromGlobals(),
    $appProfile
);
```

`createServiceBuilderFromPlacementRequest` ожидает, что приложение открыто из Битрикс24, а в GET-параметрах запроса есть `DOMAIN`. Если открыть файл напрямую без параметров открытия приложения, SDK не сможет определить адрес Битрикс24. Для внешних приложений, которые не открываются из интерфейса Битрикс24, используйте другие способы инициализации `ServiceBuilder` — примеры смотрите в [официальном репозитории B24PhpSDK](https://github.com/bitrix24/b24phpsdk).

После инициализации используйте те же сервисы, что и для вебхука:

```php
$result = $b24Service->getCRMScope()->item()->add(
    2,
    [
        'title' => 'New Deal',
    ]
);

$dealId = $result->item()->id;
```

### Подготовьте тиражное приложение {#market-app}

Тиражное приложение устанавливают в разные Битрикс24. Для него также используется OAuth 2.0, но приложению нужно собственное хранение токенов и данных установок.

Выберите [сценарий установки тиражного приложения](../../settings/app-installation/mass-market-apps/index.md). В коде можно использовать `ApplicationProfile` и `ServiceBuilderFactory`, но хранение токенов, обновление токенов и учет разных Битрикс24 нужно проектировать отдельно.

Для реализации используйте материалы SDK:

- [пример приложения с хранением OAuth-токенов](https://github.com/bitrix24/b24phpsdk/tree/v3/tests/ApplicationBridge)
- [контракты `Bitrix24\SDK\Application\Contracts`](https://github.com/bitrix24/b24phpsdk/tree/v3/src/Application/Contracts)
- [пример подписки на `AuthTokenRenewedEvent`](https://github.com/bitrix24/b24phpsdk/blob/v3/tests/Integration/Factory.php)

### Выполните универсальный вызов метода

Если для нужного метода нет готового сервиса SDK, вызовите метод через `core->call`. В этом случае параметры нужно передавать в структуре REST-метода. Например, для `crm.item.add` нужно передать идентификатор типа объекта CRM и поля нового элемента:

```php
$response = $b24Service->core->call('crm.item.add', [
    'entityTypeId' => 2,
    'fields' => [
        'title' => 'New Deal',
    ],
]);

$dealId = $response
    ->getResponseData()
    ->getResult()['item']['id'];

echo 'Created deal ID: ' . $dealId;
```

Универсальный вызов удобен для методов, у которых еще нет отдельной обертки в SDK. При этом IDE не подскажет сигнатуру метода так же точно, как при вызове через готовый сервис.

## Видео с примерами

Текстовые сценарии выше показывают минимальный путь до первого вызова. Видео можно использовать как дополнительный разбор после настройки.

### Входящий вебхук

<iframe src="https://vk.ru/video_ext.php?oid=-211967493&id=456240173&hd=1&autoplay=0" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

[Скачать пример для входящего вебхука](https://helpdesk.bitrix24.ru/examples/b24phpsdk-webhook-example.zip)

### Локальное приложение

<iframe src="https://vk.ru/video_ext.php?oid=-211967493&id=456240175&hd=1" width="640" height="360" allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>

[Скачать пример локального приложения](https://helpdesk.bitrix24.ru/examples/b24phpsdk-local-app-example.zip)

## Связь с другими инструментами

**Другие SDK.** Сравнить B24PhpSDK с другими библиотеками можно в [обзоре SDK](../index.md). Если нужен минимальный стартовый набор PHP-файлов без типизированных сервисов, смотрите [CRest PHP SDK](../crest-php-sdk/index.md).

**Авторизация.** Для внутренней интеграции используйте [входящий вебхук](../../local-integrations/local-webhooks.md). Для приложений с OAuth 2.0 смотрите [сценарии установки приложений](../../settings/app-installation/index.md) и [описание OAuth](../../settings/oauth/index.md).

**Права доступа.** Scope зависит от методов, которые вызывает приложение или вебхук. Значения scope смотрите в справочнике [Права доступа](../../api-reference/scopes/permissions.md).

## Что важно учитывать

- Не публикуйте URL входящего вебхука, `client_secret`, access token и refresh token
- Доступ к данным зависит от прав пользователя, от имени которого выполняется запрос, и от scope вебхука или приложения
- B24PhpSDK добавляет идентификатор запроса `X-Request-ID`, а для большинства методов — параметр `bx24_request_id`, чтобы упростить диагностику запросов
- При истечении access token SDK может обновить токен и вызвать событие `AuthTokenRenewedEvent`; в приложении нужно сохранить новый токен в своем хранилище
- Для массовых операций используйте batch-сервисы SDK: они возвращают генераторы PHP и помогают обрабатывать большие наборы данных без загрузки всех результатов в память
- Типизированные сервисы SDK преобразуют часть данных REST API в PHP-типы, например дату и время, поэтому сначала используйте готовый сервис, а `core->call` оставляйте для методов без обертки
