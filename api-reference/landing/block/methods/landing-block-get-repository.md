# Получить список блоков из репозитория `landing.block.getrepository`

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Сайты и магазины»

Метод `landing.block.getrepository` возвращает доступные разделы репозитория блоков или данные одного раздела.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **section**
[`string`](../../../data-types.md) | Код раздела репозитория, например `text`.

Если параметр не передан, метод вернет все доступные разделы. В этом случае ключами объекта `result` будут коды разделов.

Кроме стандартных разделов, в ответ могут появляться разделы партнерских приложений и служебные разделы. Чтобы получить актуальные коды разделов, вызовите метод без `section`.

Если раздел с таким кодом не найден или передана пустая строка, метод вернет `false` без ошибки ||
|| **scope**
[`string`](../../../data-types.md) | Дополнительный верхнеуровневый параметр REST-вызова, который влияет на тип сайта, для которого собирается репозиторий.

Для сайтов типов `PAGE`, `STORE` и `SMN` параметр передавать не нужно. Для `GROUP`, `KNOWLEDGE` и `MAINPAGE` передайте соответствующий `scope`.

Подробно правила выбора значения описаны в статье [Работа с типами сайтов и скоупами](../../types.md).

Если `scope` не передан, метод использует текущий тип сайта, а если его нельзя определить из контекста, работает как для типа `PAGE` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "section": "text"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.getrepository.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "section": "text",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.getrepository.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.getrepository',
    		{
    			section: 'text'
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
                'landing.block.getrepository',
                [
                    'section' => 'text',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting repository blocks: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getrepository',
        {
            section: 'text'
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
        'landing.block.getrepository',
        [
            'section' => 'text',
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

### Пример ответа для запроса с параметром section

```json
{
    "result": {
        "name": "Текст",
        "meta": {
            "ai_text_placeholder": "text for website, family business, sale of flowers",
            "ai_text_max_tokens": 150
        },
        "new": false,
        "type": null,
        "specialType": null,
        "separator": false,
        "app_code": false,
        "items": {
            "03.1.three_cols_big_with_text_and_titles": {
                "id": null,
                "name": "Текст в 3 колонки на всю ширину страницы на цветном фоне",
                "namespace": "bitrix",
                "new": false,
                "version": null,
                "type": [],
                "section": [
                    "columns",
                    "text"
                ],
                "system": false,
                "description": "Три колонки с заголовками и текстом",
                "preview": "//example.bitrix24.ru/bitrix/blocks/bitrix/03.1.three_cols_big_with_text_and_titles/preview.jpg",
                "restricted": false,
                "repo_id": false,
                "app_code": false,
                "only_for_license": "",
                "requires_updates": false
            },
            "repo_405": {
                "id": null,
                "new": false,
                "name": "Блок \"Текст + изображение\" с кнопкой, текст справа, изображение слева",
                "description": null,
                "namespace": "krayt.monotovar",
                "type": [],
                "section": [
                    "about",
                    "text",
                    "image"
                ],
                "preview": "https://krayt.moscow/upload/iblock/5aa/5aabf5b9241876561d5db49c482dcd96.png",
                "restricted": true,
                "repo_id": "405",
                "app_code": "krayt.monotovar",
                "requires_updates": false
            }
        }
    },
    "time": {
        "start": 1774521670,
        "finish": 1774521670.823288,
        "duration": 0.8232879638671875,
        "processing": 0,
        "date_start": "2026-03-26T13:41:10+03:00",
        "date_finish": "2026-03-26T13:41:10+03:00",
        "operating_reset_at": 1774522270,
        "operating": 0
    }
}
```

### Пример ответа для запроса без параметра section

```json
{
    "result": {
        "favourite": {
            "name": "Избранное",
            "meta": [],
            "new": false,
            "type": null,
            "specialType": null,
            "separator": false,
            "app_code": false,
            "items": {}
        },
        "text": {
            "name": "Текст",
            "meta": {
                "ai_text_placeholder": "text for website, family business, sale of flowers",
                "ai_text_max_tokens": 150
            },
            "new": false,
            "type": null,
            "specialType": null,
            "separator": false,
            "app_code": false,
            "items": {
                "03.1.three_cols_big_with_text_and_titles": {
                    "id": null,
                    "name": "Текст в 3 колонки на всю ширину страницы на цветном фоне",
                    "namespace": "bitrix",
                    "new": false,
                    "version": null,
                    "type": [],
                    "section": [
                        "columns",
                        "text"
                    ],
                    "system": false,
                    "description": "Три колонки с заголовками и текстом",
                    "preview": "//example.bitrix24.ru/bitrix/blocks/bitrix/03.1.three_cols_big_with_text_and_titles/preview.jpg",
                    "restricted": false,
                    "repo_id": false,
                    "app_code": false,
                    "only_for_license": "",
                    "requires_updates": false
                }
            }
        }
    },
    "time": {
        "start": 1774521670,
        "finish": 1774521670.823288,
        "duration": 0.8232879638671875,
        "processing": 0,
        "date_start": "2026-03-26T13:41:10+03:00",
        "date_finish": "2026-03-26T13:41:10+03:00",
        "operating_reset_at": 1774522270,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) \| [`boolean`](../../../data-types.md) | Результат запроса.

Если `section` не передан, `result` содержит объект, где ключами служат коды разделов, а значениями - объекты разделов [(подробное описание)](#repository-section).

Если `section` передан и найден, `result` содержит один объект раздела [(подробное описание)](#repository-section)

Если `section` передан, но такого раздела нет, метод вернет `false` без ошибки ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект раздела {#repository-section}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название раздела ||
|| **meta**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Дополнительные данные раздела.

Например, раздел может вернуть служебные поля для AI-подсказок ||
|| **new**
[`boolean`](../../../data-types.md) | Признак того, что в разделе есть новые блоки ||
|| **type**
[`string`](../../../data-types.md) \| [`array`](../../../data-types.md) \| [`null`](../../../data-types.md) | Ограничение раздела по типу сайта, если оно задано.

Значение может быть массивом типов, строкой или `null`, если ограничение не задано. Для правил выбора типа сайта используйте статью [Работа с типами сайтов и скоупами](../../types.md) ||
|| **specialType**
[`string`](../../../data-types.md) \| [`null`](../../../data-types.md) | Дополнительный тип раздела, если он задан.

Если дополнительный тип не задан, метод вернет `null` ||
|| **separator**
[`boolean`](../../../data-types.md) | Признак служебного разделителя.

Разделы с таким флагом нужны для визуального разделения категорий в редакторе блоков. Они не содержат блоков, поэтому такие разделы можно пропускать при обходе ответа ||
|| **app_code**
[`string`](../../../data-types.md) \| [`boolean`](../../../data-types.md) | Код приложения, если раздел относится к партнерскому каталогу, иначе `false` ||
|| **items**
[`object`](../../../data-types.md) | Набор блоков раздела, где ключом служит код блока, а значением - объект блока [(подробное описание)](#repository-block).

Для избранных блоков ключ может содержать суффикс `@<ID>` ||
|#

Особенности разделов:

- `last` содержит блоки, которые пользователь недавно добавлял в редакторе. Раздел заполняется только в режиме редактирования. При обычном REST-вызове раздел обычно не возвращается,
- `favourite` содержит избранные блоки и может возвращаться даже с пустым `items`,
- пример разделителя: `separator_apps`,
- состав полей раздела может отличаться. У разделов партнерских приложений могут отсутствовать `meta`, `type` и `specialType`.

### Объект блока {#repository-block}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) \| [`null`](../../../data-types.md) | Внутренний идентификатор блока из репозитория, если он задан.

Для части блоков метод вернет `null` ||
|| **name**
[`string`](../../../data-types.md) | Название блока ||
|| **namespace**
[`string`](../../../data-types.md) | Пространство имен блока ||
|| **new**
[`boolean`](../../../data-types.md) | Признак нового блока ||
|| **version**
[`string`](../../../data-types.md) \| [`null`](../../../data-types.md) | Минимальная версия продукта, для которой рассчитан блок, если она указана.

Если ограничение не задано, метод вернет `null` ||
|| **type**
[`array`](../../../data-types.md) | Список типов сайтов, для которых доступен блок.

Пустой массив означает, что отдельное ограничение по типу сайта для блока не задано. Для правил выбора типа сайта используйте статью [Работа с типами сайтов и скоупами](../../types.md) ||
|| **section**
[`string`](../../../data-types.md) \| [`array`](../../../data-types.md) | Код раздела или список кодов разделов, в которых показывается блок.

Обычно в ответе приходит массив кодов, например `["columns", "text"]`. Эти коды можно использовать в параметре `section` при следующем вызове метода ||
|| **system**
[`boolean`](../../../data-types.md) | Признак того, что блок является служебным и используется платформой внутри — не предназначен для добавления на страницу пользователем. 

Такие блоки по умолчанию не включаются в ответ метода ||
|| **description**
[`string`](../../../data-types.md) \| [`null`](../../../data-types.md) | Краткое описание блока.

Поле может быть пустой строкой или `null` ||
|| **preview**
[`string`](../../../data-types.md) | Путь или URL изображения предпросмотра.

Для стандартных блоков может возвращаться URL без указания протокола вида `//<домен>/...`, для партнерских - абсолютный URL, а если изображения нет, поле может быть пустой строкой ||
|| **restricted**
[`boolean`](../../../data-types.md) | Признак дополнительных ограничений блока ||
|| **repo_id**
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) \| [`boolean`](../../../data-types.md) | Идентификатор партнерского блока из репозитория приложений или `false` для стандартного блока ||
|| **app_code**
[`string`](../../../data-types.md) \| [`boolean`](../../../data-types.md) | Код приложения, которому принадлежит блок, или `false` ||
|| **only_for_license**
[`string`](../../../data-types.md) | Код лицензии, для которой доступен блок, если ограничение задано.

Если поле заполнено, значение соответствует текущей лицензии портала. Блоки для других лицензий в ответ не попадают ||
|| **app_expired**
[`boolean`](../../../data-types.md) | Признак того, что срок действия приложения, которому принадлежит блок, истек.

Поле присутствует только у партнерских блоков с истекшей подпиской ||
|| **requires_updates**
[`boolean`](../../../data-types.md) | Признак того, что для корректной работы блока нужна более новая версия продукта ||
|| **favorite**
[`boolean`](../../../data-types.md) | Дополнительный флаг избранного блока ||
|| **favoriteMy**
[`boolean`](../../../data-types.md) | Дополнительный флаг избранного блока, который показывает, что блок сохранен текущим пользователем ||
|#

Состав полей блока может отличаться для стандартных, партнерских и избранных блоков. Метод возвращает только те поля, которые есть у конкретного блока.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Недостаточно прав."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | У пользователя нет доступа к разделу «Сайты и магазины» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-content-from-repository.md)
- [{#T}](./landing-block-get-manifest.md)
- [{#T}](./landing-block-get-manifest-file.md)
