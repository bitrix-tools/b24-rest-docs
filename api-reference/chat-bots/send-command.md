# Как отправлять команды и продлевать ключ_авторизации

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

## Взаимодействие с помощью PHP

В рамках нашего курса мы взаимодействуем c Битрикс24 с помощью **PHP**.

Все примеры указаны с использованием функций **restCommand**:

```php
restCommand(
    'imbot.message.add',
    Array(
        "DIALOG_ID" => $_REQUEST['data']['PARAMS']['DIALOG_ID'],
        "MESSAGE" => "Введите строку поиска",
    ),
    $_REQUEST["auth"]
);
```

где:
- **Первый параметр** – это название API (`imbot.message.add`);
- **Второй параметр** – это передаваемые данные в API (`Array(...)`);
- **Третий параметр** – это данные для авторизации запроса (`$_REQUEST["auth"]`).

### Функция `restCommand`

Функция `restCommand` отправляет REST запрос к Битрикс24:

{% note info %}

Эта функция используется в качестве примера. Вы можете использовать свою функцию, основанную на [протоколе взаимодействия](../../settings/how-to-call-rest-api/general-principles.md), или javascript-метод [BX24.callMethod](../../sdk/bx24-js-sdk/how-to-call-rest-methods/bx24-call-method.md), или партнерскую разработку [bitrix24-php-sdk](https://github.com/mesilov/bitrix24-php-sdk).

{% endnote %}

## Функция restCommand

```php
/**
* Send rest query to Bitrix24.
*
* @param $method - Rest method, ex: methods
* @param array $params - Method params, ex: Array()
* @param array $auth - Authorize data, ex: Array('domain' => 'https://test.bitrix24.com', 'access_token' => '7inpwszbuu8vnwr5jmabqa467rqur7u6')
* @param boolean $authRefresh - If authorize is expired, refresh token
* @return mixed
*/
function restCommand($method, array $params = Array(), array $auth = Array(), $authRefresh = true)
{
$queryUrl = "https://".$auth["domain"]."/rest/".$method;
$queryData = http_build_query(array_merge($params, array("auth" => $auth["access_token"])));

$curl = curl_init();

curl_setopt_array($curl, array(
     CURLOPT_POST => 1,
     CURLOPT_HEADER => 0,
     CURLOPT_RETURNTRANSFER => 1,
     CURLOPT_SSL_VERIFYPEER => 1,
     CURLOPT_URL => $queryUrl,
     CURLOPT_POSTFIELDS => $queryData,
));

$result = curl_exec($curl);
curl_close($curl);

$result = json_decode($result, 1);

if ($authRefresh && isset($result['error']) && in_array($result['error'], array('expired_token', 'invalid_token')))
{
     $auth = restAuth($auth);
     if ($auth)
     {
         $result = restCommand($method, $params, $auth, false);
     }
}

return $result;
}
```

## Функция restAuth

```php
/**
* Get new authorize data if you authorize is expire.
*
* @param array $auth - Authorize data, ex: Array('domain' => 'https://test.bitrix24.com', 'access_token' => '7inpwszbuu8vnwr5jmabqa467rqur7u6')
* @return bool|mixed
*/
function restAuth($auth)
{
if (!CLIENT_ID || !CLIENT_SECRET)
     return false;

if(!isset($auth['refresh_token']) || !isset($auth['scope']) || !isset($auth['domain']))
     return false;

$queryUrl = 'https://'.$auth['domain'].'/oauth/token/';
$queryData = http_build_query($queryParams = array(
     'grant_type' => 'refresh_token',
     'client_id' => CLIENT_ID,
     'client_secret' => CLIENT_SECRET,
     'refresh_token' => $auth['refresh_token'],
     'scope' => $auth['scope'],
));

$curl = curl_init();

curl_setopt_array($curl, array(
     CURLOPT_HEADER => 0,
     CURLOPT_RETURNTRANSFER => 1,
     CURLOPT_URL => $queryUrl.'?'.$queryData,
));

$result = curl_exec($curl);
curl_close($curl);

$result = json_decode($result, 1);

return $result;
}
```