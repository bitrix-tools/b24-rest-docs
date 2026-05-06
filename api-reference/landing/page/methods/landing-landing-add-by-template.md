# Добавить страницу по шаблону landing.landing.addByTemplate

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.addByTemplate` создает страницу в указанном сайте по коду шаблона и возвращает идентификатор созданной страницы. Новая страница создается неактивной (`ACTIVE = N`). 

Если нужно полностью управлять полями создаваемой страницы, используйте [landing.landing.add](./landing-landing-add.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **siteId***
[`integer`](../../../data-types.md) | Идентификатор сайта, в котором нужно создать страницу.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md) ||
|| **code***
[`string`](../../../data-types.md) | Код шаблона страницы.

Список доступных шаблонов можно получить методом [landing.demos.getPageList](../../demos/landing-demos-get-page-list.md). Код зависит от шаблонов, доступных в Битрикс24. Например, значение может выглядеть как `krayt.monotovar@KraytPetShop` ||
|| **fields**
[`object`](../../../data-types.md) | Дополнительные параметры создания страницы [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../../data-types.md) | Переопределяет заголовок создаваемой страницы и SEO-заголовки шаблона.

Если не передавать, будут использованы значения из шаблона ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Переопределяет SEO-описания шаблона.

Значение записывается в дополнительные поля `METAOG_DESCRIPTION` и `METAMAIN_DESCRIPTION`, но не в поле `DESCRIPTION` самой страницы ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор существующей страницы или папки в том же сайте.

Если передать папку, новая страница создастся в ней. Если передать страницу из папки, новая страница создастся в той же папке. Для элемента без папки метод возьмет значение из `fields.FOLDER_ID`, если этот параметр указан. 

Если передан активный элемент, новая страница после создания опубликуется автоматически. Если `ID` указывает на папку или на элемент с заполненным `FOLDER_ID`, параметр `fields.FOLDER_ID` не учитывается.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), идентификатор папки — методом [landing.site.getFolders](../../site/landing-site-get-folders.md) ||
|| **FOLDER_ID**
[`integer`](../../../data-types.md) | Идентификатор папки, в которой нужно создать страницу. Папка должна относиться к тому же сайту, что и `siteId`, иначе метод вернет ошибку.

Идентификатор папки можно получить методом [landing.site.getFolders](../../site/landing-site-get-folders.md).

Параметр используется, если папка создания не определилась по `fields.ID` ||
|| **SITE_TYPE**
[`string`](../../../data-types.md) | Тип шаблонов, из которого создается страница. Используются типы сайтов из статьи [Работа с типами сайтов и скоупами](../../types.md).

Если не передавать, берется тип сайта. Для сайтов типов `STORE` и `SMN` по умолчанию используется значение `PAGE` ||
|| **PREPARE_BLOCKS**
[`boolean`](../../../data-types.md) | Включает подготовку блоков шаблона при создании страницы.

Работает только вместе с `PREPARE_BLOCKS_DATA`. Передавайте именно boolean `true` ||
|| **PREPARE_BLOCKS_DATA**
[`object`](../../../data-types.md) | Дополнительные данные для подготовки блоков шаблона при создании страницы.

В `PREPARE_BLOCKS_DATA` сначала укажите код блока из шаблона страницы, а внутри - параметры для этого блока [(подробное описание)](#prepare-blocks-data) ||
|| **ADD_IN_MENU**
[`string`](../../../data-types.md) | Флаг добавления созданной страницы в меню сайта. Поддерживаются `Y` и `N`.

Логика срабатывает только при значении `Y`, если страница еще не добавляется в меню через `BLOCK_ID` и `MENU_CODE`, и если передан `TITLE` ||
|| **BLOCK_ID**
[`integer`](../../../data-types.md) | Вместе с `MENU_CODE` добавляет ссылку на созданную страницу в меню блока с указанным идентификатором ||
|| **MENU_CODE**
[`string`](../../../data-types.md) | Вместе с `BLOCK_ID` указывает код меню внутри блока, куда нужно добавить ссылку на созданную страницу ||
|#

### Параметр PREPARE_BLOCKS_DATA {#prepare-blocks-data}

Позволяет передать настройки для отдельных блоков шаблона еще до создания страницы.

Используется только вместе с `PREPARE_BLOCKS: true`. Если `PREPARE_BLOCKS` не передан или передан не как boolean `true`, параметр игнорируется.

Структура объекта:

```json
{
    "код_блока_из_шаблона": {
        "ACTION": "changeComponentParams",
        "PARAMS": {
            "НАЗВАНИЕ_ПАРАМЕТРА": "значение"
        }
    }
}
```

#|
|| **Название**
`тип` | **Описание** ||
|| **ACTION**
[`string`](../../../data-types.md) | Что нужно сделать с блоком. Поддерживается значение `changeComponentParams` ||
|| **PARAMS**
[`object`](../../../data-types.md) | Параметры компонента, которые нужно подставить в блок при создании страницы.

Замена применяется только к параметрам, которые в шаблоне блока заданы пустой строкой ||
|#

Набор поддерживаемых параметров зависит от конкретного блока. Например, в блоках могут использоваться такие параметры:

#|
|| **Параметр** | **Описание** ||
|| `IBLOCK_ID` | Идентификатор инфоблока каталога ||
|| `SECTION_ID` | Идентификатор раздела каталога ||
|| `ELEMENT_ID` | Идентификатор элемента каталога ||
|| `REQUISITE` | Идентификатор реквизита компании в формате `{ID_компании}_{ID_реквизита}` для блоков `69.1.contacts` и `69.2.requisites` ||
|| `BANK_REQUISITE` | Идентификатор банковского реквизита в формате `{ID_компании}_{ID_банковского_реквизита}` для блока `69.3.bank_requisites` ||
|#

Код блока должен совпадать с кодом блока в шаблоне.

Если [landing.demos.getPageList](../../demos/landing-demos-get-page-list.md) возвращает состав блоков для выбранного шаблона, код блока можно взять из `DATA.items[].code`.

Если состав блоков не возвращается, создайте тестовую страницу и посмотрите коды блоков методом [landing.block.getList](../../block/methods/landing-block-get-list.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 157,
        "code": "krayt.monotovar@KraytPetShop",
        "fields": {
          "TITLE": "Весенняя акция",
          "DESCRIPTION": "SEO-описание страницы акции",
          "FOLDER_ID": 95
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.addByTemplate.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 157,
        "code": "krayt.monotovar@KraytPetShop",
        "fields": {
          "TITLE": "Весенняя акция",
          "DESCRIPTION": "SEO-описание страницы акции",
          "FOLDER_ID": 95
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.addByTemplate.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.addByTemplate',
    		{
    			siteId: 157,
    			code: 'krayt.monotovar@KraytPetShop',
    			fields: {
    				TITLE: 'Весенняя акция',
    				DESCRIPTION: 'SEO-описание страницы акции',
    				FOLDER_ID: 95
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
                'landing.landing.addByTemplate',
                [
                    'siteId' => 157,
                    'code' => 'krayt.monotovar@KraytPetShop',
                    'fields' => [
                        'TITLE' => 'Весенняя акция',
                        'DESCRIPTION' => 'SEO-описание страницы акции',
                        'FOLDER_ID' => 95,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding landing page by template: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.addByTemplate',
        {
            siteId: 157,
            code: 'krayt.monotovar@KraytPetShop',
            fields: {
                TITLE: 'Весенняя акция',
                DESCRIPTION: 'SEO-описание страницы акции',
                FOLDER_ID: 95
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
        'landing.landing.addByTemplate',
        [
            'siteId' => 157,
            'code' => 'krayt.monotovar@KraytPetShop',
            'fields' => [
                'TITLE' => 'Весенняя акция',
                'DESCRIPTION' => 'SEO-описание страницы акции',
                'FOLDER_ID' => 95,
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
    "result": 2229,
    "time": {
        "start": 1773700566,
        "finish": 1773700567.67178,
        "duration": 1.6717801094055176,
        "processing": 1,
        "date_start": "2026-03-17T01:36:06+03:00",
        "date_finish": "2026-03-17T01:36:07+03:00",
        "operating_reset_at": 1773701166,
        "operating": 1.4516642093658447
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор созданной страницы ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "SITE_ERROR",
    "error_description": "Сайт не найден, или доступ к нему запрещен"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не переданы обязательные параметры вызова: в запросе отсутствует `siteId`, `code` или оба параметра ||
|| `SITE_ERROR` | Сайт не найден, или доступ к нему запрещен: в `siteId` передан несуществующий сайт или у пользователя нет доступа к нему ||
|| `LANDING_ERROR` | Страница или папка не найдена: в `fields.ID` передан идентификатор элемента, которого нет в указанном сайте ||
|| `ACCESS_DENIED` | Доступ на создание страницы запрещен: у пользователя нет права «редактирование» для указанного сайта ||
|| `FOLDER_NOT_FOUND` | Папка не найдена: в `fields.FOLDER_ID` передана папка, которая не относится к указанному сайту или не существует ||
|| `WRONG_DATA` | Некорректные данные шаблона: для переданного `code` не удалось получить данные шаблона страницы ||
|| `SLASH_IS_NOT_ALLOWED` | Слеш запрещен в адресе лендинга: шаблон содержит недопустимый адрес создаваемой страницы ||
|| `CANT_BE_EMPTY` | Адрес страницы не может быть пустым: шаблон содержит пустой адрес создаваемой страницы ||
|| `WRONG_CODE_FORMAT` | Недопустимый адрес страницы: шаблон содержит адрес в формате `<символы>_<число>_<число>`, например `code_12_34` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [landing.demos.getPageList](../../demos/landing-demos-get-page-list.md)
- [landing.site.getList](../../site/landing-site-get-list.md)
- [landing.site.getFolders](../../site/landing-site-get-folders.md)
- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-copy.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-additional-fields.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-update.md)
