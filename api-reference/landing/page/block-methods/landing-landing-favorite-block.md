# Сохранить в список блоков landing.landing.favoriteBlock

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.favoriteBlock` создает копию блока страницы и сохраняет ее в список блоков как шаблон. При успешном выполнении метод возвращает идентификатор новой копии блока.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](../methods/landing-landing-get-list.md), а также из результата методов [landing.landing.add](../methods/landing-landing-add.md), [landing.landing.addByTemplate](../methods/landing-landing-add-by-template.md) и [landing.landing.copy](../methods/landing-landing-copy.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока.

Идентификатор блока можно получить методом [landing.block.getList](../../block/methods/landing-block-get-list.md) с параметром `params.edit_mode = 1` ||
|| **meta**
[`object`](../../../data-types.md) | Параметры сохраненного блока [(подробное описание)](#meta).

Если параметр не передан, метод сохраняет копию блока без дополнительных переопределений ||
|#

### Параметр meta {#meta}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Название сохраненной копии блока в списке блоков.

Это пользовательское название сохраненной копии. Оно не заменяет стандартное название блока. Если параметр не передан, используется исходное название блока ||
|| **section**
[`array`](../../../data-types.md) \| [`string`](../../../data-types.md) | Раздел или список разделов, в которых будет показан сохраненный блок. Если параметр не передан, блок будет показан в тех же разделах, что и исходный блок.

Можно использовать коды разделов из метода [landing.block.getrepository](../../block/methods/landing-block-get-repository.md). Если передать код, которого нет в стандартном репозитории, для него будет создан отдельный раздел ||
|| **preview**
[`integer`](../../../data-types.md) | Идентификатор файла картинки превью.

Передайте ID файла с картинкой, заранее загруженного методом [landing.block.uploadfile](../../block/methods/landing-block-upload-file.md) для исходного блока. Метод сохраняет этот ID как превью сохраненной копии блока.

Если файл уже привязан к исходному блоку как пользовательское превью, эта привязка изменится только после успешного завершения метода. Если метод завершится ошибкой, привязка к исходному блоку не изменится. Если параметр не передан или равен `0`, пользовательское превью не сохраняется ||
|| **tpl_code**
[`string`](../../../data-types.md) | Код шаблона страницы, с которым нужно связать сохраненный блок.

Передача этого параметра эквивалентна включенному чекбоксу «Привязать к текущему стилю» в редакторе. Значение можно взять из поля `TPL_CODE` страницы, например из ответа метода [landing.landing.getList](../methods/landing-landing-get-list.md).

Этот параметр сохраняется вместе с метаданными сохраненного блока и используется редактором при работе с такими блоками. Если параметр не передан, специальная привязка к коду шаблона не сохраняется ||
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
        "block": 6428,
        "meta": {
          "name": "Блок с преимуществами",
          "section": ["text", "features"],
          "preview": 918273,
          "tpl_code": "bitrix24"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.favoriteBlock.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "block": 6428,
        "meta": {
          "name": "Блок с преимуществами",
          "section": ["text", "features"],
          "preview": 918273,
          "tpl_code": "bitrix24"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.favoriteBlock.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.landing.favoriteBlock',
            {
                lid: 351,
                block: 6428,
                meta: {
                    name: 'Блок с преимуществами',
                    section: ['text', 'features'],
                    preview: 918273,
                    tpl_code: 'bitrix24'
                }
            }
        );

        const result = response.getData().result;
        console.info('ID сохраненной копии:', result);
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
                'landing.landing.favoriteBlock',
                [
                    'lid' => 351,
                    'block' => 6428,
                    'meta' => [
                        'name' => 'Блок с преимуществами',
                        'section' => ['text', 'features'],
                        'preview' => 918273,
                        'tpl_code' => 'bitrix24',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Успех: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Ошибка при сохранении блока в список блоков: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.favoriteBlock',
        {
            lid: 351,
            block: 6428,
            meta: {
                name: 'Блок с преимуществами',
                section: ['text', 'features'],
                preview: 918273,
                tpl_code: 'bitrix24'
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
                console.info('ID сохраненной копии:', result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.landing.favoriteBlock',
        [
            'lid' => 351,
            'block' => 6428,
            'meta' => [
                'name' => 'Блок с преимуществами',
                'section' => ['text', 'features'],
                'preview' => 918273,
                'tpl_code' => 'bitrix24',
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
    "result": 28619,
    "time": {
        "start": 1773958609,
        "finish": 1773958609.566006,
        "duration": 0.5660059452056885,
        "processing": 0,
        "date_start": "2026-03-20T01:16:49+03:00",
        "date_finish": "2026-03-20T01:16:49+03:00",
        "operating_reset_at": 1773959209,
        "operating": 0.21611928939819336
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) | Идентификатор сохраненной копии блока ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BLOCK_NOT_FOUND",
    "error_description": "Блок не найден в лендинге"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` или `block` ||
|| `TYPE_ERROR` | Передан неверный тип в параметре `lid`, `block` или `meta` ||
|| `LANDING_NOT_EXIST` | Страница не найдена или недоступна текущему пользователю. Ошибка может относиться как к странице `lid`, так и к странице, которой принадлежит копируемый блок ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден среди блоков исходной страницы или недоступен для копирования. Если не найдена страница, которой принадлежит блок, метод обычно возвращает `LANDING_NOT_EXIST` ||
|| `BLOCK_CANT_BE_ADDED` | Не удалось создать копию блока в репозитории блоков ||
|| `BLOCK_WRONG_VERSION` | Версия блока не поддерживается текущей версией продукта ||
|| `ACCESS_DENIED` | Недостаточно прав на изменение блока ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add-block.md)
- [{#T}](./landing-landing-copy-block.md)
- [{#T}](./landing-landing-delete-block.md)
- [{#T}](./landing-landing-down-block.md)
- [{#T}](./landing-landing-hide-block.md)
- [{#T}](./landing-landing-mark-deleted-block.md)
- [{#T}](./landing-landing-mark-undeleted-block.md)
- [{#T}](./landing-landing-move-block.md)
- [{#T}](./landing-landing-show-block.md)
- [{#T}](./landing-landing-unfavorite-block.md)
- [{#T}](./landing-landing-up-block.md)
