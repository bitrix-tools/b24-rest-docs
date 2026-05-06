# Изменить страницу landing.landing.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменение настроек» сайта. Чтобы удалить страницу или изменить дату ее публикации, дополнительно нужны права «удаление» и «публикация» на сайте

Метод `landing.landing.update` обновляет параметры страницы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы, которую нужно обновить.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) и [landing.landing.copy](./landing-landing-copy.md) ||
|| **fields***
[`object`](../../../data-types.md) | Набор полей страницы для обновления [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../../data-types.md) | Название страницы ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код страницы. Код не может содержать символ `/` и не должен быть в формате `<буквы, цифры или _>_<число>_<число>`, например `code_12_34`.

Если передать пустую строку и не указать поле `FOLDER`, метод вернет ошибку. Если поле `FOLDER` передано с любым значением, ошибки не будет ||
|| **DESCRIPTION**
[`string`](../../../data-types.md) | Произвольное описание страницы ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний идентификатор страницы ||
|| **SITE_ID**
[`integer`](../../../data-types.md) | Идентификатор сайта, к которому нужно привязать страницу. Если параметр не передан, используется текущий сайт страницы. 

Если одновременно указать новый сайт и папку, папка будет проверяться не в новом, а в текущем сайте страницы. Для такого сценария лучше использовать [landing.landing.move](./landing-landing-move.md) ||
|| **SITEMAP**
[`string`](../../../data-types.md) | Флаг включения страницы в карту сайта. Поддерживаются значения `Y` и `N`. Любое другое значение будет сохранено как `N` ||
|| **FOLDER**
[`string`](../../../data-types.md) | Признак папки. Поддерживаются значения `Y` и `N`. Любое другое значение будет сохранено как `N` ||
|| **FOLDER_ID**
[`integer`](../../../data-types.md) | Идентификатор папки, в которую нужно поместить страницу. Папка должна находиться в текущем сайте страницы. Если передать `0`, страница будет перенесена в корень сайта.

Идентификатор папки можно получить методом [landing.site.getFolders](../../site/landing-site-get-folders.md) ||
|| **TPL_ID**
[`integer`](../../../data-types.md) | Идентификатор шаблона представления страницы.

Идентификатор шаблона представления можно получить методом [landing.template.getlist](../../template/landing-template-get-list.md) ||
|| **DELETED**
[`string`](../../../data-types.md) | Управляет состоянием страницы в корзине. При передаче этого поля страница становится неактивной. 

`Y` — страница помещается в корзину и становится неактивной.
`N` — страница восстанавливается из корзины, но остается неактивной, пока ее не опубликуют отдельно.

Для удаления и восстановления страницы лучше использовать методы [landing.landing.markDelete](./landing-landing-mark-delete.md) и [landing.landing.markUnDelete](./landing-landing-mark-undelete.md).

Если страница установлена главной в настройках сайта и в этом сайте есть другие неудаленные страницы, метод вернет ошибку `CANT_DELETE_MAIN` ||
|| **DATE_PUBLIC**
[`string`](../../../data-types.md) | Дата и время публикации страницы. 

Для изменения этого поля нужно право «публикация» на сайт. Изменение поля не публикует страницу, а только обновляет дату публикации.

Для публикации и снятия с публикации используйте методы [landing.landing.publication](./landing-landing-publication.md) и [landing.landing.unpublic](./landing-landing-unpublic.md) ||
|| **ADDITIONAL_FIELDS**
[`object`](../../../data-types.md) | Дополнительные поля страницы. Доступные коды и значения описаны в статье [Дополнительные поля страницы](../additional-fields.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 349,
        "fields": {
          "TITLE": "Весенняя акция 2026",
          "CODE": "spring-sale-2026",
          "DESCRIPTION": "Обновленное описание страницы акции",
          "XML_ID": "promo-2026-landing"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.update.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 349,
        "fields": {
          "TITLE": "Весенняя акция 2026",
          "CODE": "spring-sale-2026",
          "DESCRIPTION": "Обновленное описание страницы акции",
          "XML_ID": "promo-2026-landing"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.update.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.update',
    		{
    			lid: 349,
    			fields: {
    				TITLE: 'Весенняя акция 2026',
    				CODE: 'spring-sale-2026',
    				DESCRIPTION: 'Обновленное описание страницы акции',
    				XML_ID: 'promo-2026-landing'
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
                'landing.landing.update',
                [
                    'lid' => 349,
                    'fields' => [
                        'TITLE' => 'Весенняя акция 2026',
                        'CODE' => 'spring-sale-2026',
                        'DESCRIPTION' => 'Обновленное описание страницы акции',
                        'XML_ID' => 'promo-2026-landing',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.update',
        {
            lid: 349,
            fields: {
                TITLE: 'Весенняя акция 2026',
                CODE: 'spring-sale-2026',
                DESCRIPTION: 'Обновленное описание страницы акции',
                XML_ID: 'promo-2026-landing'
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
        'landing.landing.update',
        [
            'lid' => 349,
            'fields' => [
                'TITLE' => 'Весенняя акция 2026',
                'CODE' => 'spring-sale-2026',
                'DESCRIPTION' => 'Обновленное описание страницы акции',
                'XML_ID' => 'promo-2026-landing',
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
        "start": 1773835076,
        "finish": 1773835076.29,
        "duration": 0.28999996185302734,
        "processing": 0,
        "date_start": "2026-03-18T14:57:56+03:00",
        "date_finish": "2026-03-18T14:57:56+03:00",
        "operating_reset_at": 1773835676,
        "operating": 0.1001579761505127
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат обновления. При успехе возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: lid"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` или `fields` ||
|| `ACCESS_DENIED` | Недостаточно прав для изменения страницы или конкретного поля. Например, для `fields.DELETED` нужно право «удаление» сайта, а для `fields.DATE_PUBLIC` нужно право «публикация» сайта ||
|| `SITE_NOT_FOUND` | В `fields.SITE_ID` передан идентификатор несуществующего сайта ||
|| `FOLDER_NOT_FOUND` | В `fields.FOLDER_ID` передана папка, которая не относится к текущему сайту страницы или не существует ||
|| `SLASH_IS_NOT_ALLOWED` | В `fields.CODE` передан символ `/` ||
|| `CANT_BE_EMPTY` | В `fields.CODE` передана пустая строка `''`, и в том же запросе отсутствует ключ `fields.FOLDER` ||
|| `WRONG_CODE_FORMAT` | В `fields.CODE` передано значение в формате `<буквы, цифры или _>_<число>_<число>`, например `code_12_34` или `my_page_1_2` ||
|| `CANT_DELETE_MAIN` | Нельзя пометить как удаленную главную страницу сайта, если в сайте есть другие неудаленные страницы ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add.md)
- [{#T}](./landing-landing-add-by-template.md)
- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-get-list.md)
- [{#T}](./landing-landing-mark-delete.md)
- [{#T}](./landing-landing-mark-undelete.md)
- [{#T}](./landing-landing-move.md)
- [{#T}](./landing-landing-publication.md)
- [{#T}](./landing-landing-unpublic.md)
