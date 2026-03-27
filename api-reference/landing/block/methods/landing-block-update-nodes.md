# Обновить ноды блока landing.block.updatenodes

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на «редактирование» сайта

Метод `landing.block.updatenodes` обновляет ноды блока в черновике страницы. Если страница уже опубликована, изменения станут видны посетителям после повторной публикации через интерфейс или методом [landing.landing.publication](../../page/methods/landing-landing-publication.md).

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
[`object`](../../../data-types.md) | Набор изменений для нод блока и параметров компонента, доступных для редактирования [(подробное описание)](#data) ||
|| **additional**
[`object`](../../../data-types.md) | Дополнительные параметры сохранения [(подробное описание)](#additional) ||
|| **preventHistory**
[`boolean`](../../../data-types.md) | Если передать `true`, метод не добавит действие в историю изменений страницы. По умолчанию `false` ||
|#

### Параметр data {#data}

#|
|| **Ключ**
`тип` | **Описание** ||
|| **<селектор>**
[`string`](../../../data-types.md) \| [`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Ключ должен совпадать с селектором из манифеста блока.

Для повторяющихся элементов можно указать позицию через `@`, например `.landing-block-node-text@1`. Позиции нумеруются с `0`.

Если позиция не указана, поведение зависит от формата значения:

- для значения ноды метод изменяет первый найденный элемент,
- для значения вида `{attrs: {...}}` у обычного селектора метод обновляет все найденные элементы,
- для селектора компонента с `:`, например `bitrix:catalog.section`, позиция не используется.

Формат значения зависит от типа ноды [(подробное описание)](#value-formats) ||
|#

### Форматы значений в data {#value-formats}

#|
|| **Тип ноды** | **Пример значения** ||
|| `text` | `'Новый текст блока'` или `{text: 'Новый текст блока'}` ||
|| `img` | `{src: 'https://example.com/banner.jpg', alt: 'Новый баннер', src2x: 'https://example.com/banner@2x.jpg'}` ||
|| `link` | `{text: 'Подробнее', href: 'https://example.com', target: '_blank', query: 'utm_source=test'}` ||
|| `icon` | `['fa', 'fa-telegram']` ||
|| `embed` | `{src: '//www.youtube.com/embed/q4d8g9Dn3ww?autoplay=1&controls=0&loop=1&mute=1&rel=0', source: 'https://www.youtube.com/watch?v=q4d8g9Dn3ww', ratio: 'embed-responsive-16by9'}` ||
|#

Форматы остальных типов нод описаны в статье [Типы нод](../node-types.md).

Дополнительные особенности форматов:

- `link` поддерживает поля `text`, `href`, `query`, `target`, `skipContent` и `attrs`
- в `link.attrs` сохраняются только атрибуты `data-embed` и `data-url`
- если не передать `link.text`, метод обновит `href`, `target` и допустимые атрибуты, но текст ссылки не изменит
- если передать объект ссылки без `target`, текущее значение `target` будет очищено
- если не передать `link.attrs` или передать пустой объект, текущие `data-embed` и `data-url` будут удалены
- `img` дополнительно поддерживает поля `src2x`, `id`, `id2x`, `isLazy`, `lazyOrigSrc`, `lazyOrigSrc2x`, `lazyOrigSrcset`, `lazyOrigStyle`
- для `img` рекомендуется передавать полный объект изображения. Если не передать `src`, текущий адрес изображения будет очищен. Если не передать `src2x`, значение для retina-версии будет очищено
- для `img` адреса `src` и `src2x` с `http://` сервер заменяет на `https://`
- для `img` ленивую загрузку включает только значение `isLazy = 'Y'`
- `embed` дополнительно поддерживает поля `preview` и `ratio`
- для `embed` рекомендуется передавать полный объект. Если не передать `preview`, текущее превью будет удалено
- для `embed` поле `ratio` применяется только вместе с новым `src`

Если передать значение вида `{attrs: {...}}`, метод работает по-разному в зависимости от селектора:

- для обычного селектора обновляет атрибуты ноды,
- для селектора компонента с `:`, например `bitrix:catalog.section`, обновляет только те параметры компонента, которые доступны для редактирования в манифесте блока.

Селекторы, которых нет в манифесте блока, метод игнорирует. То же самое касается параметров компонента, которых нет среди доступных для редактирования.

### Параметр additional {#additional}

#|
|| **Название**
`тип` | **Описание** ||
|| **appendMenu**
[`boolean`](../../../data-types.md) | Добавляет новые пункты к текущему меню вместо полной замены. Работает только для блоков, в манифесте которых описан раздел `menu`.

По умолчанию `false` ||
|#

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
          ".landing-block-node-text": "Новый текст блока",
          ".landing-block-node-img": {
            "src": "https://cdn.bitrix24.site/bitrix/images/landing/business/1920x1280/img12.jpg",
            "alt": "Новый баннер"
          },
          ".landing-block-node-link": {
            "text": "Подробнее",
            "href": "https://www.bitrix24.ru",
            "target": "_blank"
          },
          ".landing-block-node-icon": [
            "fa",
            "fa-telegram"
          ],
          ".landing-block-node-embed": {
            "src": "//www.youtube.com/embed/q4d8g9Dn3ww?autoplay=1&controls=0&loop=1&mute=1&rel=0",
            "source": "https://www.youtube.com/watch?v=q4d8g9Dn3ww"
          }
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.updatenodes.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 311,
        "block": 6058,
        "data": {
          ".landing-block-node-text": "Новый текст блока",
          ".landing-block-node-img": {
            "src": "https://cdn.bitrix24.site/bitrix/images/landing/business/1920x1280/img12.jpg",
            "alt": "Новый баннер"
          },
          ".landing-block-node-link": {
            "text": "Подробнее",
            "href": "https://www.bitrix24.ru",
            "target": "_blank"
          },
          ".landing-block-node-icon": [
            "fa",
            "fa-telegram"
          ],
          ".landing-block-node-embed": {
            "src": "//www.youtube.com/embed/q4d8g9Dn3ww?autoplay=1&controls=0&loop=1&mute=1&rel=0",
            "source": "https://www.youtube.com/watch?v=q4d8g9Dn3ww"
          }
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.updatenodes.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.updatenodes',
    		{
    			lid: 311,
    			block: 6058,
    			data: {
    				'.landing-block-node-text': 'Новый текст блока',
    				'.landing-block-node-img': {
    					src: 'https://cdn.bitrix24.site/bitrix/images/landing/business/1920x1280/img12.jpg',
    					alt: 'Новый баннер'
    				},
    				'.landing-block-node-link': {
    					text: 'Подробнее',
    					href: 'https://www.bitrix24.ru',
    					target: '_blank'
    				},
    				'.landing-block-node-icon': ['fa', 'fa-telegram'],
    				'.landing-block-node-embed': {
    					src: '//www.youtube.com/embed/q4d8g9Dn3ww?autoplay=1&controls=0&loop=1&mute=1&rel=0',
    					source: 'https://www.youtube.com/watch?v=q4d8g9Dn3ww'
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
                'landing.block.updatenodes',
                [
                    'lid' => 311,
                    'block' => 6058,
                    'data' => [
                        '.landing-block-node-text' => 'Новый текст блока',
                        '.landing-block-node-img' => [
                            'src' => 'https://cdn.bitrix24.site/bitrix/images/landing/business/1920x1280/img12.jpg',
                            'alt' => 'Новый баннер',
                        ],
                        '.landing-block-node-link' => [
                            'text' => 'Подробнее',
                            'href' => 'https://www.bitrix24.ru',
                            'target' => '_blank',
                        ],
                        '.landing-block-node-icon' => ['fa', 'fa-telegram'],
                        '.landing-block-node-embed' => [
                            'src' => '//www.youtube.com/embed/q4d8g9Dn3ww?autoplay=1&controls=0&loop=1&mute=1&rel=0',
                            'source' => 'https://www.youtube.com/watch?v=q4d8g9Dn3ww',
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
        echo 'Error updating block nodes: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.updatenodes',
        {
            lid: 311,
            block: 6058,
            data: {
                '.landing-block-node-text': 'Новый текст блока',
                '.landing-block-node-img': {
                    src: 'https://cdn.bitrix24.site/bitrix/images/landing/business/1920x1280/img12.jpg',
                    alt: 'Новый баннер'
                },
                '.landing-block-node-link': {
                    text: 'Подробнее',
                    href: 'https://www.bitrix24.ru',
                    target: '_blank'
                },
                '.landing-block-node-icon': ['fa', 'fa-telegram'],
                '.landing-block-node-embed': {
                    src: '//www.youtube.com/embed/q4d8g9Dn3ww?autoplay=1&controls=0&loop=1&mute=1&rel=0',
                    source: 'https://www.youtube.com/watch?v=q4d8g9Dn3ww'
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
        'landing.block.updatenodes',
        [
            'lid' => 311,
            'block' => 6058,
            'data' => [
                '.landing-block-node-text' => 'Новый текст блока',
                '.landing-block-node-img' => [
                    'src' => 'https://cdn.bitrix24.site/bitrix/images/landing/business/1920x1280/img12.jpg',
                    'alt' => 'Новый баннер',
                ],
                '.landing-block-node-link' => [
                    'text' => 'Подробнее',
                    'href' => 'https://www.bitrix24.ru',
                    'target' => '_blank',
                ],
                '.landing-block-node-icon' => ['fa', 'fa-telegram'],
                '.landing-block-node-embed' => [
                    'src' => '//www.youtube.com/embed/q4d8g9Dn3ww?autoplay=1&controls=0&loop=1&mute=1&rel=0',
                    'source' => 'https://www.youtube.com/watch?v=q4d8g9Dn3ww',
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

### Обновление параметров компонента

Некоторые блоки содержат компонент, например каталог. В таком случае методом можно менять только те параметры компонента, которые доступны для редактирования в манифесте блока.

Чтобы понять, какие параметры можно менять, сначала получите манифест блока методом [landing.block.getmanifest](./landing-block-get-manifest.md) и проверьте раздел `attrs` у нужного селектора компонента.

После этого передайте в `data` селектор компонента и объект с ключом `attrs`:

```js
BX24.callMethod(
    'landing.block.updatenodes',
    {
        lid: 5597,
        block: 44131,
        data: {
            'bitrix:catalog.section': {
                attrs: {
                    MESS_BTN_BUY: 'Купить'
                }
            }
        }
    }
);
```

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
[`boolean`](../../../data-types.md) | Результат обновления блока. При успешном выполнении метод возвращает `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "NODES_NOT_FOUND",
    "error_description": "Не найдено ни одной ноды на изменение"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid`, `block` или `data` ||
|| `TYPE_ERROR` | Передан неверный тип в параметре `lid`, `block`, `data`, `additional` или `preventHistory` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден на странице `lid` или недоступен в версии страницы для редактирования ||
|| `ACCESS_DENIED` | Недостаточно прав для редактирования сайта ||
|| `NODES_NOT_FOUND` | В параметре `data` не передано ни одного изменения для блока ||
|| `INCORRECT_AFFECTED` | Сервер не смог подтвердить сохранение измененного HTML после обновления нод при включенной дополнительной проверке ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-update-attrs.md)
- [{#T}](./landing-block-update-styles.md)
- [{#T}](./landing-block-get-manifest.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](./landing-block-update-content.md)
