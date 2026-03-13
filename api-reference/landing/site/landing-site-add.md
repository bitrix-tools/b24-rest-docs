# Добавить сайт landing.site.add

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «создание» сайтов  

Метод `landing.site.add` создает новый сайт и возвращает идентификатор созданного сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода. 
Для `GROUP`, `KNOWLEDGE` и `MAINPAGE` значение `scope` должно совпадать со значением `fields.TYPE` [(подробное описание)](#type-scope) ||
|| **fields***
[`object`](../../data-types.md) | Набор полей нового сайта [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../../data-types.md) | Название сайта, длина до `255` символов ||
|| **CODE***
[`string`](../../data-types.md) | Символьный код сайта. Если передать пустую строку, код сгенерируется из поля `TITLE`. Для кода, который состоит только из цифр, автоматически добавится префикс `site`. 

Если такое значение уже есть в домене, к нему добавится числовой суффикс, например `code2` или `code3` ||
|| **TYPE**
[`string`](../../data-types.md) | Тип сайта. По умолчанию `PAGE`. Поддерживаются `PAGE`, `STORE`, `SMN`, `KNOWLEDGE`, `GROUP`, `MAINPAGE`. 

Значение должно соответствовать параметру `scope` [(подробное описание)](#type-scope) ||
|| **DOMAIN_ID**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Домен сайта. Значение зависит от платформы.

Для Битрикс24 укажите доменное имя сайта. Если параметр не заполнить или передать пустую строку, домен будет сгенерирован автоматически по системному шаблону.

Для 1С-Битрикс: Управление сайтом нужно передать идентификатор уже существующего домена. Доменное имя в виде строки не поддерживается, метод вернет ошибку ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание сайта, до `255` символов ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор, до `255` символов ||
|| **ADDITIONAL_FIELDS**
[`object`](../../data-types.md) | Дополнительные поля сайта, сохраняются отдельно после создания ||
|#

### Соответствие TYPE и scope {#type-scope}

Типы сайтов и правила выбора параметра `scope` описаны в статье [Работа с типами сайтов и скоупами](../types.md).

#|
|| **fields.TYPE** | **scope в запросе** | **Когда использовать** ||
|| `PAGE`, `STORE`, `SMN` | не передавать | Сайт или магазин, когда параметр `scope` не передается ||
|| `GROUP` | `GROUP` | Сайт группы ||
|| `KNOWLEDGE` | `KNOWLEDGE` | База знаний ||
|| `MAINPAGE` | `MAINPAGE` | Главная страница или вайб ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "scope": "KNOWLEDGE",
        "fields": {
          "TITLE": "База знаний компании",
          "CODE": "",
          "TYPE": "KNOWLEDGE",
          "DESCRIPTION": "Сайт базы знаний"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.add.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "scope": "KNOWLEDGE",
        "fields": {
          "TITLE": "База знаний компании",
          "CODE": "",
          "TYPE": "KNOWLEDGE",
          "DESCRIPTION": "Сайт базы знаний"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.add.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.add',
    		{
                scope: 'KNOWLEDGE',
    			fields: {
    				TITLE: 'База знаний компании',
    				CODE: '',
    				TYPE: 'KNOWLEDGE',
    				DESCRIPTION: 'Сайт базы знаний'
    			}
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.site.add',
                [
                    'scope' => 'KNOWLEDGE',
                    'fields' => [
                        'TITLE' => 'База знаний компании',
                        'CODE' => '',
                        'TYPE' => 'KNOWLEDGE',
                        'DESCRIPTION' => 'Сайт базы знаний',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding site: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.add',
        {
            scope: 'KNOWLEDGE',
            fields: {
                TITLE: 'База знаний компании',
                CODE: '',
                TYPE: 'KNOWLEDGE',
                DESCRIPTION: 'Сайт базы знаний'
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.site.add',
        [
            'scope' => 'KNOWLEDGE',
            'fields' => [
                'TITLE' => 'База знаний компании',
                'CODE' => '',
                'TYPE' => 'KNOWLEDGE',
                'DESCRIPTION' => 'Сайт базы знаний',
            ],
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 159,
    "time": {
        "start": 1773161828,
        "finish": 1773161828.444154,
        "duration": 0.4441540241241455,
        "processing": 0,
        "date_start": "2026-03-10T19:57:08+03:00",
        "date_finish": "2026-03-10T19:57:08+03:00",
        "operating_reset_at": 1773162428,
        "operating": 0.14034819602966309
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного сайта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DOMAIN_IS_INCORRECT",
    "error_description": "Адрес сайта введен неверно. Вы можете использовать только следующие символы: \"a-z\", \"0-9\", \"-\", \".\"."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Доступ на создание сайта запрещен: недостаточно прав на создание сайта или передан недоступный для текущего скоупа `TYPE` ||
|| `SITE_LIMIT_REACHED` | Достигнут лимит количества сайтов: тариф или лицензия не позволяют создать еще один сайт ||
|| `DOMAIN_NOT_FOUND` | Домен не существует ||
|| `DOMAIN_IS_INCORRECT` | Адрес сайта введен неверно: передан некорректный формат доменного имени ||
|| `DOMAIN_EXIST_TRASH` | Домен уже привязан к сайту в корзине: сначала отвяжите домен от сайта в корзине ||
|| `DOMAIN_DISABLE` | Нельзя использовать слово bitrix в домене: ограничение для доменов в Битрикс24 ||
|| `DOMAIN_EXIST` | Такой домен уже существует: домен уже занят ||
|| `SLASH_IS_NOT_ALLOWED` | Слеш запрещен в адресе сайта: в `fields.CODE` передан символ `/` ||
|| `CONTROLLER_ERROR_BADRESPONSE` | Неопознанный ответ сервиса регистраций: ошибка внешнего сервиса регистрации домена ||
|| `CONTROLLER_ERROR_BADLICENSE` | Лицензия истекла или ключ некорректен ||
|| `CONTROLLER_ERROR_<ERROR_CODE>` | Ошибка внешнего сервиса регистрации домена: код ошибки зависит от ответа контроллера регистрации доменов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-update.md)
- [{#T}](./landing-site-get-list.md)
- [{#T}](./landing-site-delete.md)
