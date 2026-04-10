# Обновить карточки блока landing.block.updateCards

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.block.updateCards` обновляет набор карточек блока и ноды внутри этих карточек в черновике страницы.

Метод работает с карточками, описанными в ключе `cards` манифеста блока. Если страница уже опубликована, изменения станут видны посетителям после публикации через интерфейс или методом [landing.landing.publication](../../page/methods/landing-landing-publication.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getlist](../../page/methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока в черновике страницы.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) с параметром `params.edit_mode = 1` ||
|| **data***
[`object`](../../../data-types.md) | Набор изменений для карточек блока [(подробное описание)](#data) ||
|#

### Параметр data {#data}

#|
|| **Ключ**
`тип` | **Описание** ||
|| **<селектор карточки из manifest.cards>**
[`object`](../../../data-types.md) | Селектор карточки из [раздела `cards` манифеста блока](../manifest.md#ключ-cards).

Значение описывает итоговый набор карточек по этому селектору и изменения их нод [(подробное описание)](#card-data).

Чтобы узнать доступные селекторы карточек и пресеты конкретного блока, получите манифест методом [landing.block.getmanifest](./landing-block-get-manifest.md) ||
|#

### Объект <селектор карточки из manifest.cards> {#card-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **source**
[`array`](../../../data-types.md) | Определяет итоговый порядок и количество карточек [(подробное описание)](#source) ||
|| **values**
[`array`](../../../data-types.md) | Обновляет ноды внутри карточек после применения `source` [(подробное описание)](#values) ||
|#

### Элемент массива source {#source}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип источника карточки.

Возможные значения:
`card` - взять текущую карточку по индексу,
`preset` - создать карточку из пресета из `manifest.cards.<селектор>.presets`.

По умолчанию - `card` ||
|| **value**
[`integer`](../../../data-types.md) \| [`string`](../../../data-types.md) | Значение источника карточки.

Для `card` это индекс текущей карточки по селектору, начиная с `0`.

Для `preset` это код пресета из манифеста блока ||
|#

Если элемент `source` не содержит `type`, метод использует значение `card`. Если не передать `value`, метод использует индекс `0`.

Чтобы создать новую карточку из пресета, укажите `type` со значением `preset` и передайте в `value` код пресета из манифеста блока. Например:

```json
"source": [
  {
    "type": "card",
    "value": 0
  },
  {
    "type": "preset",
    "value": "preset_code"
  }
]
```

### Элемент массива values {#values}

Каждый элемент массива `values` должен быть объектом, который содержит одно или несколько изменений нод.

#|
|| **Ключ**
`тип` | **Описание** ||
|| **<селектор ноды>@<позиция>**
[`string`](../../../data-types.md) \| [`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Селектор ноды внутри карточки с позицией через `@`.

Позиция нумеруется с `0` и указывает, в какой карточке после применения `source` нужно изменить ноду.

Формат значения такой же, как у параметра `data` в методе [landing.block.updatenodes](./landing-block-update-nodes.md).

Один объект в массиве `values` может содержать несколько ключей для разных нод и позиций ||
|#

Если элемент массива `values` не является объектом, метод пропустит его без ошибки. Например, в одном элементе массива можно изменить сразу несколько карточек:

```json
"values": [
  {
    ".landing-block-node-title@0": "Первая карточка",
    ".landing-block-node-title@1": "Вторая карточка"
  }
]
```
Подробно про форматы значений для разных типов нод читайте в статье [landing.block.updatenodes](./landing-block-update-nodes.md) и в обзоре [Типы нод](../node-types.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 311,
        "block": 6058,
        "data": {
          ".landing-block-card": {
            "source": [
              {
                "type": "card",
                "value": 0
              },
              {
                "type": "preset",
                "value": "preset_code"
              }
            ],
            "values": [
              {
                ".landing-block-node-title@0": "Первая карточка",
                ".landing-block-node-title@1": "Карточка из пресета"
              }
            ]
          }
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.updateCards.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 311,
        "block": 6058,
        "data": {
          ".landing-block-card": {
            "source": [
              {
                "type": "card",
                "value": 0
              },
              {
                "type": "preset",
                "value": "preset_code"
              }
            ],
            "values": [
              {
                ".landing-block-node-title@0": "Первая карточка",
                ".landing-block-node-title@1": "Карточка из пресета"
              }
            ]
          }
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.updateCards.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.updateCards',
    		{
    			lid: 311,
    			block: 6058,
    			data: {
    				'.landing-block-card': {
    					source: [
    						{
    							type: 'card',
    							value: 0
    						},
    						{
    							type: 'preset',
    							value: 'preset_code'
    						}
    					],
    					values: [
    						{
    							'.landing-block-node-title@0': 'Первая карточка',
    							'.landing-block-node-title@1': 'Карточка из пресета'
    						}
    					]
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
                'landing.block.updateCards',
                [
                    'lid' => 311,
                    'block' => 6058,
                    'data' => [
                        '.landing-block-card' => [
                            'source' => [
                                [
                                    'type' => 'card',
                                    'value' => 0,
                                ],
                                [
                                    'type' => 'preset',
                                    'value' => 'preset_code',
                                ],
                            ],
                            'values' => [
                                [
                                    '.landing-block-node-title@0' => 'Первая карточка',
                                    '.landing-block-node-title@1' => 'Карточка из пресета',
                                ],
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
        echo 'Error updating block cards: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.updateCards',
        {
            lid: 311,
            block: 6058,
            data: {
                '.landing-block-card': {
                    source: [
                        {
                            type: 'card',
                            value: 0
                        },
                        {
                            type: 'preset',
                            value: 'preset_code'
                        }
                    ],
                    values: [
                        {
                            '.landing-block-node-title@0': 'Первая карточка',
                            '.landing-block-node-title@1': 'Карточка из пресета'
                        }
                    ]
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
        'landing.block.updateCards',
        [
            'lid' => 311,
            'block' => 6058,
            'data' => [
                '.landing-block-card' => [
                    'source' => [
                        [
                            'type' => 'card',
                            'value' => 0,
                        ],
                        [
                            'type' => 'preset',
                            'value' => 'preset_code',
                        ],
                    ],
                    'values' => [
                        [
                            '.landing-block-node-title@0' => 'Первая карточка',
                            '.landing-block-node-title@1' => 'Карточка из пресета',
                        ],
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
        "start": 1774525085,
        "finish": 1774525085.858169,
        "duration": 0.8581690788269043,
        "processing": 0,
        "date_start": "2026-03-26T14:38:05+03:00",
        "date_finish": "2026-03-26T14:38:05+03:00",
        "operating_reset_at": 1774525685,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат обновления карточек. При успешном выполнении возвращается `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: data"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid`, `block` или `data` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден на странице `lid` или недоступен в черновике страницы ||
|| `ACCESS_DENIED` | У пользователя нет права на редактирование сайта ||
|| `INCORRECT_AFFECTED` | Сервер не смог подтвердить, что изменения применились корректно. Ошибка зависит от настроек сервера и не связана с параметрами запроса ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-clone-card.md)
- [{#T}](./landing-block-remove-card.md)
- [{#T}](./landing-block-update-nodes.md)
- [{#T}](./landing-block-add-card.md)
- [{#T}](./landing-block-get-manifest.md)
