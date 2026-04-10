# Удалить блоки и очистить файловые привязки изображений страницы landing.landing.removeEntities

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.removeEntities` удаляет со страницы указанные блоки и связанные с ними изображения. Также с его помощью можно очистить файловые привязки у отдельных изображений без удаления самих блоков.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](./landing-landing-get-list.md), а также из результата методов [landing.landing.add](./landing-landing-add.md), [landing.landing.addByTemplate](./landing-landing-add-by-template.md) и [landing.landing.copy](./landing-landing-copy.md) ||
|| **data***
[`object`](../../../data-types.md) | Набор объектов для удаления [(подробное описание)](#data).

Если не указать блоки или изображения для удаления, страница останется без изменений. При этом метод все равно вернет `true`, если страница существует ||
|#

### Параметр data {#data}

#|
|| **Название**
`тип` | **Описание** ||
|| **blocks**
[`integer[]`](../../../data-types.md) | Идентификаторы блоков страницы, которые нужно удалить полностью.

Для каждого блока метод также удаляет все связанные изображения. 

Если в списке есть блоки, которых нет на странице, или блоки, которые пользователь не может удалить, метод пропустит их. Для существующей доступной страницы он может вернуть `true`, даже если часть блоков или все блоки из списка не были удалены ||
|| **images**
[`object[]`](../../../data-types.md) | Пары идентификаторов блока и изображения для удаления файловой привязки. Содержимое блока не изменяется — используйте, когда изображение уже убрано из блока и нужно очистить оставшуюся служебную запись. [(подробное описание)](#images).

Метод не вернет отдельную ошибку в трех случаях: если блок не найден, если он уже указан в параметре `blocks` или если изображение не связано с этим блоком ||
|#

### Параметр images {#images}

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока, с которым связана файловая привязка изображения ||
|| **image***
[`integer`](../../../data-types.md) | Внутренний идентификатор файловой привязки изображения (`FILE_ID`), связанной с блоком `block`. 

Для существующих изображений `FILE_ID` можно получить методом [landing.block.getcontent](../../block/methods/landing-block-get-content.md). В ответе нужно найти HTML блока в поле `content` и посмотреть значение атрибута `data-fileid` у нужного изображения
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример показывает смешанный сценарий: блоки из `blocks` удаляются полностью, а элементы `images` очищают файловые привязки изображений в других блоках.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 648,
        "data": {
          "blocks": [12167, 123],
          "images": [
            {
              "block": 12269,
              "image": 6866
            },
            {
              "block": 12268,
              "image": 6861
            }
          ]
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.removeEntities.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 648,
        "data": {
          "blocks": [12167, 123],
          "images": [
            {
              "block": 12269,
              "image": 6866
            },
            {
              "block": 12268,
              "image": 6861
            }
          ]
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.removeEntities.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.landing.removeEntities',
    		{
    			lid: 648,
    			data: {
    				blocks: [12167, 123],
    				images: [
    					{
    						block: 12269,
    						image: 6866
    					},
    					{
    						block: 12268,
    						image: 6861
    					}
    				]
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
                'landing.landing.removeEntities',
                [
                    'lid' => 648,
                    'data' => [
                        'blocks' => [12167, 123],
                        'images' => [
                            [
                                'block' => 12269,
                                'image' => 6866,
                            ],
                            [
                                'block' => 12268,
                                'image' => 6861,
                            ],
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
        echo 'Error removing blocks and images: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.removeEntities',
        {
            lid: 648,
            data: {
                blocks: [12167, 123],
                images: [
                    {
                        block: 12269,
                        image: 6866
                    },
                    {
                        block: 12268,
                        image: 6861
                    }
                ]
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
        'landing.landing.removeEntities',
        [
            'lid' => 648,
            'data' => [
                'blocks' => [12167, 123],
                'images' => [
                    [
                        'block' => 12269,
                        'image' => 6866,
                    ],
                    [
                        'block' => 12268,
                        'image' => 6861,
                    ],
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
        "start": 1773796328,
        "finish": 1773796328.413521,
        "duration": 0.41352105140686035,
        "processing": 0,
        "date_start": "2026-03-18T04:12:08+03:00",
        "date_finish": "2026-03-18T04:12:08+03:00",
        "operating_reset_at": 1773796928,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат удаления, при успехе возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "LANDING_NOT_EXIST",
    "error_description": "Лендинг не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не переданы обязательные параметры вызова: в запросе отсутствует `lid`, `data` или оба параметра ||
|| `LANDING_NOT_EXIST` | Страница не найдена, удалена или недоступна текущему пользователю ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-delete.md)
- [{#T}](./landing-landing-mark-delete.md)
- [{#T}](./landing-landing-mark-undelete.md)
- [{#T}](./landing-landing-move.md)
- [{#T}](./landing-landing-publication.md)
- [{#T}](./landing-landing-update.md)
