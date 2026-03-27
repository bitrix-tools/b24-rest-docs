# Изменить атрибуты элементов блока landing.block.updateattrs

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.block.updateattrs` обновляет атрибуты HTML-элементов внутри блока в черновике страницы.

Метод не меняет текст, HTML-код блока целиком и стили. Он обновляет только значения атрибутов у уже существующих элементов, например `href`, `target`, `alt`, `title`, `data-*` и `aria-*`.

Если страница уже опубликована, изменения станут видны посетителям после повторной публикации через интерфейс или методом [landing.landing.publication](../../page/methods/landing-landing-publication.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](../../page/methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока в версии страницы для редактирования.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) с параметром `params.edit_mode = 1`. Если передать идентификатор блока из опубликованной версии страницы, метод может вернуть ошибку ||
|| **data***
[`object`](../../../data-types.md) | Набор атрибутов для обновления [(подробное описание)](#data) ||
|#

### Параметр data {#data}

#|
|| **Ключ**
`тип` | **Описание** ||
|| **<селектор>**
[`object`](../../../data-types.md) | Ключ должен совпадать с CSS-селектором из манифеста блока. Значение должно быть объектом вида `{ '<атрибут>': <значение> }`.

Метод находит элементы по селектору и записывает им новые значения атрибутов. Если селектор встречается несколько раз, можно указать позицию через `@`, например `.landing-block-node-text@1`. Позиции нумеруются с `0`.

Если позиция не указана, метод обновляет все найденные элементы с этим селектором ||
|#

Разрешенные селекторы и атрибуты метод берет из разделов `style.nodes`, `attrs`, `cards` и `style.block` манифеста блока. Их можно проверить методом [landing.block.getmanifest](./landing-block-get-manifest.md). Если вы проверяете блок из версии страницы для редактирования, передавайте в `landing.block.getmanifest` параметр `params.edit_mode = 1`.

Если нужный атрибут описан только в разделе `nodes` манифеста, используйте [landing.block.updatenodes](./landing-block-update-nodes.md). Если селектора или атрибута нет в поддерживаемых разделах манифеста, метод проигнорирует его без ошибки.

Используйте метод, когда нужно изменить настройки элемента через атрибуты, а не его содержимое. Например, можно поменять ссылку у кнопки, `target` для открытия в новой вкладке, `alt` у изображения или `data-*` у формы.

Например, у блока CRM-формы метод позволяет изменить атрибут `data-b24form` у элемента `.bitrix24forms` и подключить другую форму. Допустимые значения для такого атрибута нужно брать из манифеста конкретного блока.

Строки, числа и булевы значения метод сохраняет как HTML-атрибуты. Если передать массив или объект, метод преобразует их в JSON-строку. Формат данных должен соответствовать типу атрибута, который указан в манифесте блока. Метод не проверяет, подходит ли переданное значение для логики конкретного блока, поэтому лучше сверяться с манифестом. Примеры форматов для разных типов атрибутов есть в статье [Типы атрибутов](../attributes.md#типы-атрибутов).

Например, если у повторяющегося элемента в манифесте разрешен атрибут `data-test-checkbox`, запрос для второй карточки может выглядеть так:

```json
{
    ".container-fluid@1": {
        "data-test-checkbox": [1, 2, 3]
    }
}
```

Например, в блоке есть кнопка:

```html
<a class="landing-block-node-button" href="/old/" target="_self">Купить</a>
```

Если передать такие данные:

```json
{
    ".landing-block-node-button": {
        "href": "/catalog/",
        "target": "_blank"
    }
}
```

Текст кнопки не изменится, но метод обновит ее атрибуты. После вызова кнопка будет вести на `/catalog/` и откроется в новой вкладке.

Чтобы изменить атрибуты оболочки блока, передайте реальный идентификатор в формате `#block<blockId>`, например `#block6058`. Передавать `#wrapper` как ключ в `data` нельзя: такой запрос не сработает.

Для параметров динамических блоков и компонентов используйте [landing.block.updatenodes](./landing-block-update-nodes.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 313,
        "block": 6134,
        "data": {
          ".bitrix24forms": {
            "data-b24form": "#crmFormInline45",
            "data-b24form-use-style": "N"
          }
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.updateattrs.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 313,
        "block": 6134,
        "data": {
          ".bitrix24forms": {
            "data-b24form": "#crmFormInline45",
            "data-b24form-use-style": "N"
          }
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.updateattrs.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.updateattrs',
    		{
    			lid: 313,
    			block: 6134,
    			data: {
    				'.bitrix24forms': {
    					'data-b24form': '#crmFormInline45',
    					'data-b24form-use-style': 'N'
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
                'landing.block.updateattrs',
                [
                    'lid' => 313,
                    'block' => 6134,
                    'data' => [
                        '.bitrix24forms' => [
                            'data-b24form' => '#crmFormInline45',
                            'data-b24form-use-style' => 'N',
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
        echo 'Error updating block attributes: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.updateattrs',
        {
            lid: 313,
            block: 6134,
            data: {
                '.bitrix24forms': {
                    'data-b24form': '#crmFormInline45',
                    'data-b24form-use-style': 'N'
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
        'landing.block.updateattrs',
        [
            'lid' => 313,
            'block' => 6134,
            'data' => [
                '.bitrix24forms' => [
                    'data-b24form' => '#crmFormInline45',
                    'data-b24form-use-style' => 'N',
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

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1774442460,
        "finish": 1774442460.28751,
        "duration": 0.2875099182128906,
        "processing": 0,
        "date_start": "2026-03-25T11:01:00+03:00",
        "date_finish": "2026-03-25T11:01:00+03:00",
        "operating_reset_at": 1774443060,
        "operating": 0.09410285949707031
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат обновления атрибутов. При успешном выполнении метод возвращает `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BLOCK_NOT_FOUND",
    "error_description": "Блок не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid`, `block` или `data` ||
|| `ACCESS_DENIED` | Недостаточно прав для редактирования сайта ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден на странице `lid` или недоступен в версии страницы для редактирования ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-update-nodes.md)
- [{#T}](./landing-block-update-styles.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](./landing-block-get-manifest.md)
- [{#T}](../../page/methods/landing-landing-publication.md)
