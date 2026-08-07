# Плитка в контакт-центре CONTACT_CENTER

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, contact_center`](../scopes/permissions.md)

Виджет добавляет плитку приложения в контакт-центр — туда же, где пользователь подключает почту, телефонию и мессенджеры. По клику на плитке открывается интерфейс приложения: обычно это форма подключения своего канала связи.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](./placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `CONTACT_CENTER` | Плитка в контакт-центре ||
|#

### Где находится в интерфейсе

Откройте контакт-центр по адресу `/contact_center/`. Плитка приложения выводится внизу страницы, в блоке *Решения от партнеров*.

![Плитка в контакт-центре](./_images/CONTACT_CENTER.png "Плитка в контакт-центре")

Название плитки задается параметром `TITLE` при регистрации. Если параметр не передан, выводится название приложения. У активного приложения плитка отмечена галочкой, как у подключенных встроенных каналов.

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 0123456789abcdef0123456789abcdef
    [AUTH_ID] => 6061e72600631fcd00005a4b00000001f0f1076700000000f69dd5fc643d9ce2fdbc1
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 50e00aa340631fcd00005a4b00000001f0f1071111116580a5b83c2de639ef28c12
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => contact_center,imopenlines,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => CONTACT_CENTER
    [PLACEMENT_OPTIONS] => {"ID":"717","URI":"\/contact_center\/"}
)
```

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

{% include notitle [описание стандартных данных](./_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

#|
|| **Ключ** | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор регистрации обработчика — тот же, что приходит в поле `id` ответа метода [placement.get](./placement-get.md).

Приложение может зарегистрировать несколько плиток с разными обработчиками. По этому ключу обработчик определяет, какую из них открыл пользователь ||
|| **URI**
[`string`](../data-types.md) | Адрес страницы контакт-центра, с которой открыт виджет ||
|#

Точка не поддерживает параметр `OPTIONS` метода [placement.bind](./placement-bind.md): переданные значения не сохраняются, [placement.get](./placement-get.md) возвращает пустой массив.

## Связь с другими объектами

**Открытые линии.** Плитка в контакт-центре — точка входа в подключение канала. Сам канал приложение регистрирует методами раздела [{#T}](../imopenlines/imconnector/index.md), а не через эту точку встраивания.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CONTACT_CENTER",
        "HANDLER": "https://your-domain.com/widgets/contact-center-handler.php",
        "TITLE": "Мой канал связи",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой канал связи"
          },
          "en": {
            "TITLE": "My communication channel"
          }
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/placement.bind
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'placement.bind',
        params: {
          PLACEMENT: 'CONTACT_CENTER',
          HANDLER: 'https://your-domain.com/widgets/contact-center-handler.php',
          TITLE: 'Мой канал связи',
          LANG_ALL: {
            ru: {
              TITLE: 'Мой канал связи',
            },
            en: {
              TITLE: 'My communication channel',
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // Данные доступны только при успешном ответе
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Placement bound successfully:', result)
      }
    } catch (error) {
      // Ошибки транспорта и SDK (AjaxError, SdkError и другие)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Подключение SDK (UMD-сборка), глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function bindContactCenter() {
        try {
          // Инициализация SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CONTACT_CENTER',
              HANDLER: 'https://your-domain.com/widgets/contact-center-handler.php',
              TITLE: 'Мой канал связи',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой канал связи',
                },
                en: {
                  TITLE: 'My communication channel',
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // Данные доступны только при успешном ответе
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Placement bound successfully:', result)
        } catch (error) {
          // Ошибки транспорта и SDK (AjaxError, SdkError и другие)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindContactCenter)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bind',
                [
                    'PLACEMENT' => 'CONTACT_CENTER',
                    'HANDLER' => 'https://your-domain.com/widgets/contact-center-handler.php',
                    'TITLE' => 'Мой канал связи',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой канал связи',
                        ],
                        'en' => [
                            'TITLE' => 'My communication channel',
                        ],
                    ],
                ]
            );

        $result = $response->getResponseData()->getResult();
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.bind',
        {
            PLACEMENT: 'CONTACT_CENTER',
            HANDLER: 'https://your-domain.com/widgets/contact-center-handler.php',
            TITLE: 'Мой канал связи',
            LANG_ALL: {
                ru: {
                    TITLE: 'Мой канал связи'
                },
                en: {
                    TITLE: 'My communication channel'
                }
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bind',
        [
            'PLACEMENT' => 'CONTACT_CENTER',
            'HANDLER' => 'https://your-domain.com/widgets/contact-center-handler.php',
            'TITLE' => 'Мой канал связи',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой канал связи',
                ],
                'en' => [
                    'TITLE' => 'My communication channel',
                ],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./placement-bind.md)
- [{#T}](./placement-list.md)
- [{#T}](./placement-unbind.md)
- [{#T}](./ui-interaction/index.md)
- [{#T}](./bx24-widget-methods.md)
- [{#T}](../imopenlines/imconnector/index.md)
- [{#T}](../../settings/interactivity/index.md)
