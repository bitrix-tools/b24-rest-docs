# Callback установки

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Приложению без интерфейса тоже нужны токены авторизации. Callback установки — способ их получить: Битрикс24 отправляет токены на ваш обработчик сразу после того, как пользователь установит тиражное приложение.

## Когда применять

Вариант подходит приложениям, у которых нет своей страницы в Битрикс24. В карточке приложения для этого не включают опцию «Добавлять свою страницу и пункт в главном меню». Пункт в левом меню не появится, но виджеты в местах встройки приложение регистрировать может. Вся бизнес-логика такого приложения работает в обработчиках событий.

Адрес обработчика указывают в карточке приложения, в поле «Ссылка на обработчик события установки». Битрикс24 принимает адрес по протоколу http или https, но в запросе передаются токены — используйте https.

Если при установке нужны одноразовые настройки, callback не подойдет. Выберите [мастер установки](./installation-master.md) для приложения с интерфейсом или [мастер настройки для REST-only приложений](./rest-only-installation-master.md). Все четыре варианта сравниваются в обзоре [{#T}](./index.md).

## Как работает

Указанный адрес Битрикс24 регистрирует как обработчик события. Поэтому приходит обычный запрос события: поля `event`, `data`, `ts` и объект `auth` с данными авторизации OAuth 2.0 — access-токеном, refresh-токеном и сроком их жизни.

На один и тот же адрес приходят два разных события.

#|
|| **Событие** | **Когда приходит** | **Что дает приложению** ||
|| [`ONAPPUSERREADY`](../../../api-reference/common/events/on-app-user-ready.md) | Когда Битрикс24 создал или повторно активировал системного пользователя приложения | Долгоживущую авторизацию системного пользователя приложения ||
|| [`ONAPPINSTALL`](../../../api-reference/common/events/on-app-install.md) | Дополнительно, если приложение работает только через API, без своей страницы в Битрикс24 | Авторизацию сотрудника, который установил приложение ||
|#

Поэтому обработчик разбирает запрос по полю `event`. Без этого приложение примет второе событие за повторную установку.

Авторизация у событий лежит в разных местах запроса. У `ONAPPINSTALL` она передается в объекте `auth`. У `ONAPPUSERREADY` авторизация системного пользователя приходит в `data`, а в `auth` — авторизация установившего сотрудника. `application_token` для проверки подлинности есть в `auth` у обоих событий.

Пример запроса, объект `auth` сокращен:

```php
$_POST = [
  'event' => 'ONAPPINSTALL',
  'event_handler_id' => '17',
  'data' => [
    // поля события
  ],
  'ts' => '1696527000',
  'auth' => [
    'access_token' => '***',
    'refresh_token' => '***',
    'expires_in' => 3600,
    'scope' => 'crm,user',
    'domain' => 'some-domain.bitrix24.ru',
    'client_endpoint' => 'https://some-domain.bitrix24.ru/rest/',
    'server_endpoint' => 'https://oauth.bitrix24.tech/rest/',
    'member_id' => '***',
    'application_token' => '***'
  ]
];
```

Полный состав полей у каждого события свой, он описан на страницах этих событий.

## Что вернуть

Установка не зависит от ответа обработчика: у приложения без интерфейса она считается завершенной сразу при добавлении. Верните код 200, а токены сохраните на своей стороне: access-токен живет ограниченное время и обновляется по refresh-токену.

Обработчик доступен по публичному адресу, поэтому запрос на него может прислать кто угодно. Убедитесь, что запрос пришел от Битрикс24: в объекте `auth` обоих событий передается `application_token`, постоянный для приложения на конкретном Битрикс24.

При первой установке сверять `application_token` еще не с чем, поэтому подлинность запроса подтверждает рабочий access-токен: проверьте его и только после этого сохраните `application_token`. При последующих вызовах сверяйте пришедший токен с сохраненным. Подробнее — в статье [{#T}](../../../api-reference/events/safe-event-handlers.md).

```php
$event = $_POST['event'] ?? '';
$auth = $_POST['auth'] ?? [];
$data = $_POST['data'] ?? [];

if ($event !== 'ONAPPINSTALL' && $event !== 'ONAPPUSERREADY') {
    header('HTTP/1.1 200 OK');
    exit;
}

$applicationToken = $auth['application_token'] ?? '';
$memberId = $auth['member_id'] ?? '';

// функции вашего хранилища, ключ — member_id: один обработчик принимает события с разных Битрикс24
$savedToken = loadApplicationToken($memberId);

if ($savedToken === '') {
    if (!isAccessTokenValid($auth['client_endpoint'] ?? '', $auth['access_token'] ?? '')) {
        header('HTTP/1.1 403 Forbidden');
        exit;
    }

    saveApplicationToken($memberId, $applicationToken);
} elseif (!hash_equals($savedToken, $applicationToken)) {
    header('HTTP/1.1 403 Forbidden');
    exit;
}

// у ONAPPINSTALL авторизация лежит в auth, у ONAPPUSERREADY — в data
$tokens = $event === 'ONAPPUSERREADY' ? $data : $auth;

saveTokens($memberId, $event, [ // функция вашего хранилища
    'access_token' => $tokens['access_token'] ?? '',
    'refresh_token' => $tokens['refresh_token'] ?? '',
    'expires_in' => (int)($tokens['expires_in'] ?? 0),
]);

header('HTTP/1.1 200 OK');
echo 'OK';
```

Рабочий access-токен проверяют вызовом метода [profile](../../../api-reference/common/users/profile.md) по адресу из `client_endpoint`: методу не нужны скоупы, а результат он вернет только по токену, выданному этим Битрикс24. Токен передавайте в теле POST-запроса, а не в строке адреса, — так он не попадет в логи веб-сервера.

```php
function isAccessTokenValid(string $clientEndpoint, string $accessToken): bool
{
    if ($clientEndpoint === '' || $accessToken === '') {
        return false;
    }

    $ch = curl_init($clientEndpoint . 'profile');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query(['auth' => $accessToken]));
    $response = curl_exec($ch);
    curl_close($ch);

    if ($response === false) {
        return false;
    }

    $result = json_decode($response, true);

    return isset($result['result']);
}
```

Храните авторизации двух событий раздельно: от `ONAPPINSTALL` вы получаете токены установившего сотрудника, от `ONAPPUSERREADY` — токены системного пользователя приложения, которые живут дольше и не зависят от этого сотрудника.

Метод [BX24.installFinish()](../../../sdk/bx24-js-sdk/system-functions/bx24-install-finish.md) в этом сценарии вызывать не нужно, в отличие от [мастера установки](./installation-master.md). Это метод JS-библиотеки: она работает только во фрейме интерфейса приложения, а обработчик вызывается с сервера Битрикс24, браузер в процессе не участвует.

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./rest-only-installation-master.md)
- [{#T}](../../../api-reference/common/events/on-app-install.md)
- [{#T}](../../../api-reference/common/events/on-app-user-ready.md)
- [{#T}](../../../api-reference/events/safe-event-handlers.md)
