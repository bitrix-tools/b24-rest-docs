# Добавить страницу или папку landing.landing.add

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.add` добавляет страницу или папку в указанный сайт и возвращает идентификатор созданного объекта. Новый объект создается неактивным (`ACTIVE = N`).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей новой страницы или папки [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE***
[`string`](../../../data-types.md) | Название страницы ||
|| **SITE_ID***
[`integer`](../../../data-types.md) | Идентификатор сайта, в котором создается страница.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md) ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код страницы. Он не должен содержать символ `/` и не должен быть в формате `<символы>_<число>_<число>`, например `code_12_34`.

Если поле не передать или передать строку только из пробелов, код сгенерируется из `TITLE`. Если после транслитерации код окажется пустым, будет сгенерирована строка из 12 символов.

Пустую строку `''` без параметра `FOLDER` передавать нельзя — метод вернет ошибку. Если параметр `FOLDER` передан с любым значением, пустая строка допускается, и код сгенерируется из `TITLE`.

Если после создания такой код уже используется в пределах сайта или папки, к нему добавится суффикс вида `_<4 случайных символа>` ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Произвольное описание страницы ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний идентификатор страницы ||
|| **SITEMAP**
[`string`](../../../data-types.md) | Флаг включения страницы в карту сайта. Поддерживаются `Y` и `N`, по умолчанию `N` ||
|| **FOLDER**
[`string`](../../../data-types.md) | Используется, если вместо страницы нужно создать папку. Поддерживаются `Y` и `N`, по умолчанию `N` ||
|| **FOLDER_ID**
[`integer`](../../../data-types.md) | Идентификатор папки, в которой нужно создать страницу. Папка должна принадлежать тому же сайту, что и `SITE_ID`.

Идентификатор папки можно получить методом [landing.site.getFolders](../../site/landing-site-get-folders.md) ||
|| **TPL_ID**
[`integer`](../../../data-types.md) | Идентификатор шаблона представления страницы.

Идентификатор шаблона представления можно получить методом [landing.template.getlist](../../template/landing-template-get-list.md) ||
|| **ADDITIONAL_FIELDS**
[`object`](../../../data-types.md) | Дополнительные поля страницы. Доступные коды и значения описаны в статье [Дополнительные поля страницы](../additional-fields.md) ||
|| **BLOCK_ID**
[`integer`](../../../data-types.md) | Вместе с `MENU_CODE` используется, чтобы после создания страницы добавить ссылку в меню блока с указанным идентификатором ||
|| **MENU_CODE**
[`string`](../../../data-types.md) | Вместе с `BLOCK_ID` указывает код меню в блоке, куда нужно добавить ссылку на созданную страницу ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "fields": {
          "TITLE": "Весенняя акция",
          "SITE_ID": 292,
          "CODE": "spring-sale",
          "DESCRIPTION": "Страница для сезонной акции",
          "ADDITIONAL_FIELDS": {
            "THEME_CODE": "wedding"
          }
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.add.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "fields": {
          "TITLE": "Весенняя акция",
          "SITE_ID": 292,
          "CODE": "spring-sale",
          "DESCRIPTION": "Страница для сезонной акции",
          "ADDITIONAL_FIELDS": {
            "THEME_CODE": "wedding"
          }
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.add.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.add',
    		{
    			fields: {
    				TITLE: 'Весенняя акция',
    				SITE_ID: 292,
    				CODE: 'spring-sale',
    				DESCRIPTION: 'Страница для сезонной акции',
    				ADDITIONAL_FIELDS: {
    					THEME_CODE: 'wedding'
    				}
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
                'landing.landing.add',
                [
                    'fields' => [
                        'TITLE' => 'Весенняя акция',
                        'SITE_ID' => 292,
                        'CODE' => 'spring-sale',
                        'DESCRIPTION' => 'Страница для сезонной акции',
                        'ADDITIONAL_FIELDS' => [
                            'THEME_CODE' => 'wedding',
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding landing page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.add',
        {
            fields: {
                TITLE: 'Весенняя акция',
                SITE_ID: 292,
                CODE: 'spring-sale',
                DESCRIPTION: 'Страница для сезонной акции',
                ADDITIONAL_FIELDS: {
                    THEME_CODE: 'wedding'
                }
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
        'landing.landing.add',
        [
            'fields' => [
                'TITLE' => 'Весенняя акция',
                'SITE_ID' => 292,
                'CODE' => 'spring-sale',
                'DESCRIPTION' => 'Страница для сезонной акции',
                'ADDITIONAL_FIELDS' => [
                    'THEME_CODE' => 'wedding',
                ],
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

{% note warning %}

Если нужно, чтобы новая страница сразу попала в меню блока, передайте в `fields` оба служебных параметра: `BLOCK_ID` и `MENU_CODE`

{% endnote %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 2227,
    "time": {
        "start": 1773694924,
        "finish": 1773694924.307754,
        "duration": 0.3077540397644043,
        "processing": 0,
        "date_start": "2026-03-17T00:02:04+03:00",
        "date_finish": "2026-03-17T00:02:04+03:00",
        "operating_reset_at": 1773695524,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданной страницы или папки ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "SLASH_IS_NOT_ALLOWED",
    "error_description": "Слеш запрещен в адресе лендинга."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный верхнеуровневый параметр `fields` ||
|| `ACCESS_DENIED` | Доступ на создание страницы запрещен: у пользователя нет права «редактирование» для указанного сайта ||
|| `SITE_NOT_FOUND` | Сайт не найден: в `fields.SITE_ID` передан несуществующий идентификатор сайта ||
|| `FOLDER_NOT_FOUND` | Папка не найдена: в `fields.FOLDER_ID` передана папка, которая не относится к указанному сайту или не существует ||
|| `SLASH_IS_NOT_ALLOWED` | Слеш запрещен в адресе лендинга: в `fields.CODE` передан символ `/` ||
|| `CANT_BE_EMPTY` | Адрес страницы не может быть пустым: в `fields.CODE` передана пустая строка `''` ||
|| `WRONG_CODE_FORMAT` | Недопустимый адрес страницы: в `fields.CODE` передано значение в формате `<символы>_<число>_<число>`, например `code_12_34` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-additional-fields.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-publication.md)
- [{#T}](./landing-landing-update.md)
