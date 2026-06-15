# Получить файл манифеста блока landing.block.getmanifestfile

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к разделу «Сайты и магазины»

Метод `landing.block.getmanifestfile` возвращает исходный манифест блока из файлового репозитория.

В отличие от [landing.block.getmanifest](./landing-block-get-manifest.md), метод возвращает манифест в исходном виде — так, как он указан в файле `.description.php`. Он не добавляет служебные поля, например `code`, `preview`, `timestamp`. 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **code***
[`string`](../../../data-types.md) | Код блока из файлового репозитория. 

Можно передать короткий код, например `01.big_with_text`. Тогда метод будет искать блок только в пространстве имен `bitrix` и автоматически добавит префикс `bitrix:`.

Если нужен блок из другого пространства имен, передайте полный код в формате `<namespace>:<code>`.

В коде можно использовать только латинские буквы, цифры и символы `.` `_` `-` `:` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "code": "01.big_with_text"
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.getmanifestfile.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "code": "01.big_with_text",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.getmanifestfile.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ManifestFileResult = {
      block?: Record<string, unknown>
      cards?: Record<string, unknown>
      nodes?: Record<string, unknown>
      style?: Record<string, unknown>
      attrs?: Record<string, unknown>
      assets?: Record<string, unknown>
      menu?: Record<string, unknown>
    }

    try {
      const response = await $b24.actions.v2.call.make<ManifestFileResult>({
        method: 'landing.block.getmanifestfile',
        params: {
          code: '01.big_with_text',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.block, result.nodes)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function getManifestFile() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.block.getmanifestfile',
            params: {
              code: '01.big_with_text',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.block, result.nodes)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getManifestFile)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.block.getmanifestfile',
                [
                    'code' => '01.big_with_text',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting block manifest file: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getmanifestfile',
        {
            code: '01.big_with_text'
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
        'landing.block.getmanifestfile',
        [
            'code' => '01.big_with_text',
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
    "result": {
        "block": {
            "name": "Обложка с меняющимися на фоне картинками",
            "section": [
                "cover"
            ],
            "dynamic": false
        },
        "cards": {
            ".landing-block-card-img": {
                "name": "Фоновая картинка",
                "label": [
                    ".landing-block-card-img"
                ]
            }
        },
        "nodes": {
            ".landing-block-node-small-title": {
                "name": "Подзаголовок",
                "type": "text"
            },
            ".landing-block-node-title": {
                "name": "Заголовок",
                "type": "text"
            },
            ".landing-block-node-text": {
                "name": "Текст",
                "type": "text"
            },
            ".landing-block-node-button": {
                "name": "Кнопка",
                "type": "link"
            },
            ".landing-block-card-img": {
                "name": "Фоновая картинка",
                "type": "img",
                "dimensions": {
                    "width": 1920,
                    "height": 1080
                },
                "allowInlineEdit": false,
                "useInDesigner": false,
                "create2xByDefault": false
            }
        },
        "style": {
            "block": {
                "type": [
                    "display"
                ],
                "additional": {
                    "name": "Слайдер",
                    "attrsType": [
                        "autoplay",
                        "autoplay-speed",
                        "pause-hover",
                        "dots"
                    ]
                }
            },
            "nodes": {
                ".landing-block-node-text-container": {
                    "title": "Набор элементов",
                    "type": [
                        "background-color",
                        "animation"
                    ]
                },
                ".landing-block-node-small-title": {
                    "title": "Подзаголовок",
                    "type": [
                        "typo",
                        "heading"
                    ]
                },
                ".landing-block-node-title": {
                    "title": "Заголовок",
                    "type": [
                        "typo",
                        "heading"
                    ]
                },
                ".landing-block-node-text": {
                    "title": "Текст",
                    "type": "typo"
                },
                ".landing-block-node-button": {
                    "title": "Кнопка",
                    "type": "button"
                },
                ".landing-block-card-img": {
                    "name": "Фоновая картинка",
                    "type": [
                        "background-overlay",
                        "height-vh"
                    ]
                }
            }
        },
        "assets": {
            "ext": [
                "landing_carousel"
            ]
        }
    },
    "time": {
        "start": 1774521452,
        "finish": 1774521452.955493,
        "duration": 0.9554929733276367,
        "processing": 0,
        "date_start": "2026-03-26T13:37:32+03:00",
        "date_finish": "2026-03-26T13:37:32+03:00",
        "operating_reset_at": 1774522052,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Исходный манифест блока из файлового репозитория.

Общий формат файла манифеста описан в статье [Файл манифеста](../manifest.md).

Если блок не найден, код содержит недопустимые символы или передан код локального репозиторного блока вида `repo_<ID>`, метод вернет пустой массив `[]` без ошибки ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **block**
[`object`](../../../data-types.md) | Описание блока из раздела `block` файла манифеста. Обычно содержит поля: `name`, `section`, `dynamic`, `type`, `system`, `description`, `version`, `id`, `only_for_license` ||
|| **cards**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Описание карточек блока, если они есть ||
|| **nodes**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Описание редактируемых узлов блока ||
|| **style**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Описание доступных настроек стилей блока в том виде, в котором они объявлены в манифесте ||
|| **attrs**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Описание настраиваемых атрибутов блока, если они заданы ||
|| **assets**
[`object`](../../../data-types.md) | Ресурсы, явно объявленные в манифесте блока.

Например, в ответ может прийти `assets.ext`, если расширения объявлены прямо в `.description.php` ||
|| **menu**
[`object`](../../../data-types.md) \| [`array`](../../../data-types.md) | Описание меню блока, если оно есть ||
|#

В `result` могут быть и другие ключи. Их состав зависит от конкретного блока и содержимого манифеста.

Во вложенных объектах, например `nodes`, `cards` и `style.nodes`, набор полей тоже зависит от конкретного блока. Метод возвращает эти данные в исходном виде, поэтому в одном блоке может использоваться поле `title`, а в другом `name`.

Локализуемые названия и подписи метод возвращает на языке портала, если они заданы в манифесте через языковые файлы.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: code"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `code` ||
|| `ACCESS_DENIED` | Доступ запрещен: у пользователя нет доступа к разделу «Сайты и магазины» ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-manifest.md)
- [{#T}](./landing-block-get-repository.md)
- [{#T}](./landing-block-get-content-from-repository.md)
