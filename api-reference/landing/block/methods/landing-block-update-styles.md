# Изменить стили блока landing.block.updateStyles

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирования» сайта

Метод `landing.block.updateStyles` обновляет CSS-классы и инлайновые стили элементов блока в черновике страницы.

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
[`object`](../../../data-types.md) | Объект формата:

```json
{
    "<селектор>": {
        "classList": [],
        "affect": [],
        "style": {}
    }
}
```

где:
- `<селектор>` — CSS-селектор из манифеста блока или `#wrapper`,
- `classList` — список CSS-классов элемента после обновления,
- `affect` — список CSS-свойств, которые нужно удалить у вложенных элементов,
- `style` — набор инлайновых стилей самого элемента.

Подробное описание значения селектора приведено [ниже](#selector-value) ||
|| **preventHistory**
[`boolean`](../../../data-types.md) | Если передать `true`, метод не добавит изменение в историю страницы.

По умолчанию `false` ||
|#

### Параметр data {#data}

#|
|| **Ключ**
`тип` | **Описание** ||
|| **<селектор>**
[`string`](../../../data-types.md) \| [`array`](../../../data-types.md) \| [`object`](../../../data-types.md) | CSS-селектор из раздела `style` манифеста блока или специальный селектор `#wrapper` для оболочки блока.

Если один и тот же селектор встречается несколько раз, можно указать позицию через `@`, например `.landing-block-node-text@1`. Позиции нумеруются с `0`. Если позиция не указана, метод применяет изменения ко всем найденным элементам с этим селектором.

Формат значения зависит от передаваемых данных [(подробное описание)](#selector-value) ||
|#

Метод обрабатывает только те селекторы, которые описаны в манифесте блока. Специальный селектор `#wrapper` позволяет изменить оболочку блока. Список доступных селекторов можно получить методом [landing.block.getmanifest](./landing-block-get-manifest.md).

### Значение селектора {#selector-value}

#|
|| **Название**
`тип` | **Описание** ||
|| **classList**
[`array`](../../../data-types.md) | Список CSS-классов элемента после обновления.

Метод заменяет атрибут `class` целиком, а не добавляет классы к текущему списку ||
|| **affect**
[`array`](../../../data-types.md) | Список CSS-свойств, которые нужно удалить из инлайновых стилей всех вложенных элементов найденного узла. Например, `["text-align", "color"]` ||
|| **style**
[`object`](../../../data-types.md) | Набор инлайновых стилей для найденного элемента в формате `{ "css-property": "value" }`. Метод объединяет переданные значения с текущим атрибутом `style`.

Если поле не передано и у элемента нет `background-image`, текущий инлайновый стиль остается без изменений. Если `background-image` уже задан, метод сохраняет только это свойство, а остальные инлайновые стили удаляет ||
|#

Вместо объекта можно передать строку с одним классом или массив классов напрямую. Такой формат эквивалентен полю `classList`.

{% note warning %}

Если не включить в `classList` системные классы блока, например `landing-block-node-text`, элемент может перестать корректно редактироваться через интерфейс. Метод полностью заменяет список классов

{% endnote %}

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
          ".landing-block-node-text": {
            "classList": [
              "landing-block-node-text",
              "g-color-white",
              "text-right"
            ],
            "affect": [
              "text-align",
              "color"
            ],
            "style": {
              "font-weight": "700"
            }
          }
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.updateStyles.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 313,
        "block": 6134,
        "data": {
          ".landing-block-node-text": {
            "classList": [
              "landing-block-node-text",
              "g-color-white",
              "text-right"
            ],
            "affect": [
              "text-align",
              "color"
            ],
            "style": {
              "font-weight": "700"
            }
          }
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.updateStyles.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.block.updateStyles',
            {
                lid: 313,
                block: 6134,
                data: {
                    '.landing-block-node-text': {
                        classList: [
                            'landing-block-node-text',
                            'g-color-white',
                            'text-right'
                        ],
                        affect: [
                            'text-align',
                            'color'
                        ],
                        style: {
                            'font-weight': '700'
                        }
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
                'landing.block.updateStyles',
                [
                    'lid' => 313,
                    'block' => 6134,
                    'data' => [
                        '.landing-block-node-text' => [
                            'classList' => [
                                'landing-block-node-text',
                                'g-color-white',
                                'text-right',
                            ],
                            'affect' => [
                                'text-align',
                                'color',
                            ],
                            'style' => [
                                'font-weight' => '700',
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
        echo 'Error updating block styles: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.updateStyles',
        {
            lid: 313,
            block: 6134,
            data: {
                '.landing-block-node-text': {
                    classList: [
                        'landing-block-node-text',
                        'g-color-white',
                        'text-right'
                    ],
                    affect: [
                        'text-align',
                        'color'
                    ],
                    style: {
                        'font-weight': '700'
                    }
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
        'landing.block.updateStyles',
        [
            'lid' => 313,
            'block' => 6134,
            'data' => [
                '.landing-block-node-text' => [
                    'classList' => [
                        'landing-block-node-text',
                        'g-color-white',
                        'text-right',
                    ],
                    'affect' => [
                        'text-align',
                        'color',
                    ],
                    'style' => [
                        'font-weight' => '700',
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
        "start": 1774520356,
        "finish": 1774520356.142134,
        "duration": 0.1421339511871338,
        "processing": 0,
        "date_start": "2026-03-26T13:19:16+03:00",
        "date_finish": "2026-03-26T13:19:16+03:00",
        "operating_reset_at": 1774520956,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат обновления стилей. При успешном выполнении метод возвращает `true` ||
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
|| `ACCESS_DENIED` | Недостаточно прав для редактирования сайта||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден на странице `lid` или недоступен в версии страницы для редактирования ||
|| `TYPE_ERROR` | Передан неверный тип одного из параметров метода, например `data` в неподходящем формате ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-update-nodes.md)
- [{#T}](./landing-block-update-attrs.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](./landing-block-get-manifest.md)
- [{#T}](../../page/methods/landing-landing-publication.md)
