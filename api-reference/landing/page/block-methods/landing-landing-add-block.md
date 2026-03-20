# Добавить блок на страницу `landing.landing.addblock`

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.addblock` добавляет новый блок на страницу и возвращает идентификатор созданного блока.

Если страница уже опубликована, для посетителей новый блок станет виден после команды «Опубликовать изменения» в интерфейсе или после вызова метода [landing.landing.publication](../methods/landing-landing-publication.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Для страниц типов `PAGE`, `STORE` и `SMN` параметр передавать не нужно. Для страниц в скоупах `GROUP`, `KNOWLEDGE` и `MAINPAGE` передайте такое же значение `scope`. Правила выбора значения описаны в статье [Работа с типами сайтов и скоупами](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](../methods/landing-landing-get-list.md), а также из результата методов [landing.landing.add](../methods/landing-landing-add.md), [landing.landing.addByTemplate](../methods/landing-landing-add-by-template.md) и [landing.landing.copy](../methods/landing-landing-copy.md) ||
|| **fields***
[`object`](../../../data-types.md) | Набор параметров нового блока [(подробное описание)](#fields) ||
|| **preventHistory**
[`boolean`](../../../data-types.md) | Если `true`, метод не добавляет действие в историю изменений страницы. По умолчанию `false` ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CODE***
[`string`](../../../data-types.md) | Символьный код блока из репозитория.

Код можно получить методом [landing.block.getrepository](../../block/methods/landing-block-get-repository.md): для `fields.CODE` нужно брать ключ элемента из `result.items`, например `02.three_cols_big_1` или `repo_385`.

Для блока, зарегистрированного приложением через [landing.repo.register](../../user-blocks/landing-repo-register.md), используйте значение вида `repo_<ID>`.

Доступность кода зависит от типа страницы и от верхнеуровневого параметра `scope`, если он передан. Если получаете код через `landing.block.getrepository`, используйте тот же `scope`, что и в `landing.landing.addblock`.

Если параметр не передан или передан пустой строкой, метод вернет ошибку ||
|| **AFTER_ID**
[`integer`](../../../data-types.md) | Идентификатор блока, после которого нужно вставить новый блок.

Идентификатор блока можно получить методом [landing.block.getList](../../block/methods/landing-block-get-list.md).

Если передать идентификатор существующего блока на странице, новый блок будет добавлен сразу после него. Если параметр не передан, новый блок добавится в начало страницы.

Если `AFTER_ID` передан, но блока с таким идентификатором на странице нет, отдельной ошибки не будет. В этом случае новый блок тоже добавится в начало страницы ||
|| **ACTIVE**
[`string`](../../../data-types.md) | Флаг активности нового блока. Возможные значения:

`Y` — блок активен
`N` — блок неактивен

По умолчанию — `Y` ||
|| **CONTENT**
[`string`](../../../data-types.md) | HTML-содержимое блока. Позволяет заменить стандартный контент блока своим HTML-кодом. При этом код блока все равно должен быть доступен в репозитории для текущего типа страницы и `scope`. Перед сохранением значение очищается и проверяется ||
|| **RETURN_CONTENT**
[`string`](../../../data-types.md) | Если передать `Y`, после добавления блока метод вернет не только его идентификатор, но и данные блока [(подробное описание)](#result-content). При любом другом значении метод вернет только идентификатор блока ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "fields": {
          "CODE": "02.three_cols_big_1",
          "AFTER_ID": 6428,
          "ACTIVE": "Y"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.addblock.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "fields": {
          "CODE": "02.three_cols_big_1",
          "AFTER_ID": 6428,
          "ACTIVE": "Y"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.addblock.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.addblock',
    		{
    			lid: 351,
    			fields: {
    				CODE: '02.three_cols_big_1',
    				AFTER_ID: 6428,
    				ACTIVE: 'Y'
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
                'landing.landing.addblock',
                [
                    'lid' => 351,
                    'fields' => [
                        'CODE' => '02.three_cols_big_1',
                        'AFTER_ID' => 6428,
                        'ACTIVE' => 'Y',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding block: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.addblock',
        {
            lid: 351,
            fields: {
                CODE: '02.three_cols_big_1',
                AFTER_ID: 6428,
                ACTIVE: 'Y'
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
        'landing.landing.addblock',
        [
            'lid' => 351,
            'fields' => [
                'CODE' => '02.three_cols_big_1',
                'AFTER_ID' => 6428,
                'ACTIVE' => 'Y',
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
    "result": 28597,
    "time": {
        "start": 1773923439,
        "finish": 1773923439.57418,
        "duration": 0.5741798877716064,
        "processing": 0,
        "date_start": "2026-03-19T15:30:39+03:00",
        "date_finish": "2026-03-19T15:30:39+03:00",
        "operating_reset_at": 1773924039,
        "operating": 0.10522103309631348
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) \| [`object`](../../../data-types.md) | Идентификатор созданного блока. Если передан `fields.RETURN_CONTENT = 'Y'`, метод вернет объект блока [(подробное описание)](#result-content) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result при `RETURN_CONTENT = 'Y'` {#result-content}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор созданного блока ||
|| **sections**
[`string`](../../../data-types.md) | Коды разделов блока из манифеста, объединенные в одну строку через запятую ||
|| **active**
[`boolean`](../../../data-types.md) | Признак активности блока ||
|| **access**
[`string`](../../../data-types.md) | Уровень доступа к блоку ||
|| **anchor**
[`string`](../../../data-types.md) | Локальный якорь блока. По умолчанию новый блок получает якорь вида `b<ID>`, например `b28597` ||
|| **php**
[`boolean`](../../../data-types.md) | Признак того, что в контенте блока есть PHP-код ||
|| **designed**
[`boolean`](../../../data-types.md) | Признак дизайнерского блока ||
|| **repoId**
[`integer`](../../../data-types.md) | Идентификатор rest-блока из репозитория или `null`, если блок не связан с rest-репозиторием ||
|| **content**
[`string`](../../../data-types.md) | Подготовленный HTML-код блока ||
|| **content_ext**
[`string`](../../../data-types.md) | Дополнительный HTML-код подключаемых расширений ||
|| **css**
[`array`](../../../data-types.md) | Список CSS-ресурсов блока ||
|| **js**
[`array`](../../../data-types.md) | Список JS-ресурсов блока. Для стандартных блоков из репозитория поле может содержать подключения. Для REST-блоков вида `repo_<ID>` при `RETURN_CONTENT = 'Y'` поле возвращается пустым массивом ||
|| **assetStrings**
[`array`](../../../data-types.md) | Строки инициализации ресурсов, которые нужно добавить на страницу ||
|| **lang**
[`array`](../../../data-types.md) \| [`object`](../../../data-types.md) | Языковые сообщения подключенных расширений. Если сообщения есть, поле возвращается как объект вида ключ-значение. Если дополнительных сообщений нет, может вернуться пустой массив ||
|| **manifest**
[`object`](../../../data-types.md) | Манифест блока. Формат описан в разделе [Манифест блока](../../block/manifest.md) ||
|| **dynamicParams**
[`array`](../../../data-types.md) | Параметры динамического блока ||
|| **requiredUserAction**
[`array`](../../../data-types.md) | Поле содержит те же данные, что и `manifest.requiredUserAction`. Оно возвращается только тогда, когда после добавления блока пользователь должен выполнить дополнительное действие на стороне клиента. Какие именно данные будут в поле, зависит от манифеста блока ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BLOCK_CANT_BE_ADDED",
    "error_description": "Cannot add block because it is not intended for this type of page."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный верхнеуровневый параметр `lid` или `fields` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена ||
|| `ACCESS_DENIED` | У пользователя нет прав для вызова метода или нет права редактировать страницу ||
|| `BLOCK_CANT_BE_ADDED` | Код из `fields.CODE` отсутствует в доступном репозитории, этот блок нельзя добавить на страницу текущего типа или переданный `scope` ограничил набор доступных блоков. Та же ошибка возвращается, если `fields.CODE` не передан или передан пустой строкой ||
|| `BLOCK_WRONG_VERSION` | Версия блока из репозитория выше версии установленного модуля landing ||
|| `BLOCK_NOT_FOUND` | Для блока не найден контент, в том числе если передан пустой `fields.CONTENT` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-copy-block.md)
- [{#T}](./landing-landing-delete-block.md)
- [{#T}](./landing-landing-down-block.md)
- [{#T}](./landing-landing-move-block.md)
- [{#T}](./landing-landing-show-block.md)
- [{#T}](./landing-landing-up-block.md)
- [{#T}](../methods/landing-landing-publication.md)
