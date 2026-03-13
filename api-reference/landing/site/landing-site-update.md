# Изменить сайт landing.site.update

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменение настроек» сайта

Метод `landing.site.update` обновляет параметры сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить методом [landing.site.getList](./landing-site-get-list.md) или из результата метода [landing.site.add](./landing-site-add.md) ||
|| **fields***
[`object`](../../data-types.md) | Набор полей для обновления сайта [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Название сайта, длина до `255` символов ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код сайта. При передаче пустой строки код генерируется из `TITLE` или из строки `site`. 

Код не может содержать `/`, код из одних цифр получает префикс `site`, максимальная длина кода `253` символа. 

Если код уже занят в домене, к нему автоматически добавляется числовой суффикс ||
|| **TYPE**
[`string`](../../data-types.md) | Тип сайта. Поддерживаются `PAGE`, `STORE`, `SMN`, `KNOWLEDGE`, `GROUP`, `MAINPAGE`. 

Это внутренний тип лендинга, он связан с внутренним `scope`. В `landing.site.update` параметр `scope` не передается [(подробное описание)](../types.md) ||
|| **DOMAIN_ID**
[`integer`](../../data-types.md) \| [`string`](../../data-types.md) | Домен сайта. Обычно передают доменное имя. Для сайтов типов `PAGE`, `STORE`, `SMN`, если параметр не передан или передана пустая строка, значение параметра игнорируется. Для `GROUP`, `KNOWLEDGE` и `MAINPAGE` параметр обычно не передают.

Для 1С-Битрикс: Управление сайтом передайте идентификатор существующего домена. Доменное имя в виде строки не поддерживается, метод вернет ошибку ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание сайта, длина до `255` символов ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор сайта ||
|| **LANDING_ID_INDEX**
[`integer`](../../data-types.md) | Идентификатор страницы сайта, которая будет главной ||
|| **LANDING_ID_404**
[`integer`](../../data-types.md) | Идентификатор страницы ошибки 404 ||
|| **LANDING_ID_503**
[`integer`](../../data-types.md) | Идентификатор страницы ошибки 503 ||
|#

Идентификаторы страниц для `LANDING_ID_INDEX`, `LANDING_ID_404` и `LANDING_ID_503` можно получить методом [landing.landing.getList](../page/methods/landing-landing-get-list.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 206,
        "fields": {
          "TITLE": "Support portal",
          "CODE": "support-portal",
          "DESCRIPTION": "Обновленное описание сайта",
          "LANDING_ID_INDEX": 987
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.update.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 206,
        "fields": {
          "TITLE": "Support portal",
          "CODE": "support-portal",
          "DESCRIPTION": "Обновленное описание сайта",
          "LANDING_ID_INDEX": 987
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.update.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.update',
    		{
    			id: 206,
    			fields: {
    				TITLE: 'Support portal',
    				CODE: 'support-portal',
    				DESCRIPTION: 'Обновленное описание сайта',
    				LANDING_ID_INDEX: 987
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
                'landing.site.update',
                [
                    'id' => 206,
                    'fields' => [
                        'TITLE' => 'Support portal',
                        'CODE' => 'support-portal',
                        'DESCRIPTION' => 'Обновленное описание сайта',
                        'LANDING_ID_INDEX' => 987,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating site: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.update',
        {
            id: 206,
            fields: {
                TITLE: 'Support portal',
                CODE: 'support-portal',
                DESCRIPTION: 'Обновленное описание сайта',
                LANDING_ID_INDEX: 987
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
        'landing.site.update',
        [
            'id' => 206,
            'fields' => [
                'TITLE' => 'Support portal',
                'CODE' => 'support-portal',
                'DESCRIPTION' => 'Обновленное описание сайта',
                'LANDING_ID_INDEX' => 987,
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
    "result": true,
    "time": {
        "start": 1773288229,
        "finish": 1773288229.999823,
        "duration": 0.9998230934143066,
        "processing": 0,
        "date_start": "2026-03-12T07:03:49+03:00",
        "date_finish": "2026-03-12T07:03:49+03:00",
        "operating_reset_at": 1773288829,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если сайт успешно обновлен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` или `fields` ||
|| `ACCESS_DENIED` | Недостаточно прав для изменения сайта или конкретных полей ||
|| `DOMAIN_NOT_FOUND` | Указан несуществующий домен ||
|| `DOMAIN_IS_INCORRECT` | Передан некорректный формат доменного имени ||
|| `DOMAIN_EXIST_TRASH` | Домен уже привязан к сайту в корзине ||
|| `DOMAIN_DISABLE` | Нельзя использовать запрещенное имя домена в Битрикс24 ||
|| `DOMAIN_EXIST` | Домен уже занят ||
|| `CODE_IS_NOT_UNIQUE` | Код сайта не уникален в рамках домена ||
|| `SLASH_IS_NOT_ALLOWED` | В `fields.CODE` передан символ `/` ||
|| `CONTROLLER_ERROR_BADRESPONSE` | Неопознанный ответ внешнего сервиса регистрации домена ||
|| `CONTROLLER_ERROR_BADLICENSE` | Ошибка лицензии во внешнем сервисе регистрации домена ||
|| `CONTROLLER_ERROR_<ERROR_CODE>` | Ошибка внешнего сервиса регистрации домена с кодом `<ERROR_CODE>` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add.md)
- [{#T}](./landing-site-get-list.md)
- [{#T}](./landing-site-publication.md)
- [{#T}](./landing-site-delete.md)
